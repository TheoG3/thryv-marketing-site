/**
 * Thryv ADA Scanner — standalone Cloudflare Worker.
 *
 * POST { url, turnstileToken } -> { score, label, severities, topIssues, reportToken, engine }
 *
 * Primary engine: Cloudflare Browser Rendering + axe-core.
 * Auto-fallback: Google PageSpeed Insights API once the daily browser cap is hit.
 *
 * NOTE: first pass, written without a live deploy. Validate against real sites
 * and the SSRF cases (see BUILD-PLAN.md) on the first *.workers.dev preview.
 */
import puppeteer from '@cloudflare/puppeteer';

const AXE_CDN = 'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js';
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const IMPACT_WEIGHT = { critical: 15, serious: 10, moderate: 4, minor: 1 };

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, cors);

    let body;
    try { body = await request.json(); } catch { return json({ error: 'bad_request' }, 400, cors); }
    const { url: rawUrl, turnstileToken } = body || {};

    // 1) anti-abuse: Turnstile
    if (!(await verifyTurnstile(turnstileToken, request, env))) {
      return json({ error: 'captcha_failed', message: 'Please complete the verification and try again.' }, 403, cors);
    }

    // 2) SSRF guard + normalize
    const target = sanitizeUrl(rawUrl);
    if (!target) return json({ error: 'invalid_url', message: 'Enter a valid public website address.' }, 400, cors);

    // 3) per-IP rate limit (3/hour, 8/day) + global daily ceiling
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const ipCheck = await underPerIpLimit(ip, env);
    if (!ipCheck.ok) return json({ error: 'rate_limited', message: ipCheck.message }, 429, cors);
    if (!(await underGlobalCap(env))) {
      return json({ error: 'busy', message: "Our scanner is at capacity for today. Book a free audit and we'll run yours by hand." }, 503, cors);
    }

    // 4) engine selection: Browser Rendering until daily cap, then Google PSI
    const useBrowser = await tryClaimBrowserSlot(env);

    let result;
    try {
      result = useBrowser ? await scanWithAxe(target, env) : await scanWithPSI(target, env);
    } catch (_e) {
      // safety net: if the browser path fails for any reason, fall back to PSI
      try { result = await scanWithPSI(target, env); }
      catch { return json({ error: 'scan_failed', message: "We couldn't reach that site. Check the address and try again." }, 502, cors); }
    }

    // 5) persist for the report link (30 days)
    const reportToken = crypto.randomUUID();
    await env.SCAN_KV.put(
      `report:${reportToken}`,
      JSON.stringify({ target, result, ts: Date.now() }),
      { expirationTtl: 60 * 60 * 24 * 30 }
    );

    // 6) usage tracking (fire-and-forget): PostHog dashboard + spike alert
    ctx.waitUntil(trackScan(env, { ip, domain: hostnameOf(target), score: result.score, engine: result.engine, total: result.totalIssues }));

    return json({ ...result, reportToken }, 200, cors);
  }
};

/* ---------- engines ---------- */

async function scanWithAxe(target, env) {
  const browser = await puppeteer.launch(env.BROWSER);
  try {
    const page = await browser.newPage();
    await page.goto(target, { waitUntil: 'networkidle0', timeout: 20000 });
    await page.addScriptTag({ url: AXE_CDN });
    const violations = await page.evaluate(async (tags) => {
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: tags }, resultTypes: ['violations'] });
      return r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        wcag: (v.tags || []).filter((t) => t.startsWith('wcag')),
        nodes: v.nodes.length,
      }));
    }, AXE_TAGS);
    return summarizeAxe(violations, 'axe');
  } finally {
    await browser.close();
  }
}

async function scanWithPSI(target, env) {
  const key = env.PSI_API_KEY ? `&key=${env.PSI_API_KEY}` : '';
  const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(target)}&category=ACCESSIBILITY&strategy=mobile${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('psi_failed');
  const data = await res.json();
  const lh = data.lighthouseResult || {};
  const cat = (lh.categories && lh.categories.accessibility) || {};
  const audits = lh.audits || {};
  const score = Math.round((cat.score || 0) * 100);

  const failing = (cat.auditRefs || [])
    .map((ref) => audits[ref.id])
    .filter((a) => a && a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'manual')
    .map((a) => ({ id: a.id, help: a.title }));

  // PSI gives one 0-100 score directly; approximate severity buckets from count.
  const severities = { serious: Math.min(failing.length, 3), moderate: Math.max(failing.length - 3, 0), minor: 0, critical: 0 };
  return {
    engine: 'psi',
    score,
    label: scoreLabel(score),
    severities,
    topIssues: failing.slice(0, 3).map((f) => ({ help: f.help, wcag: [] })),
    totalIssues: failing.length,
  };
}

function summarizeAxe(violations, engine) {
  const severities = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  let penalty = 0;
  for (const v of violations) {
    const imp = v.impact || 'minor';
    severities[imp] = (severities[imp] || 0) + 1;
    penalty += (IMPACT_WEIGHT[imp] || 1);
  }
  const score = Math.max(0, 100 - penalty);
  const order = { critical: 0, serious: 1, moderate: 2, minor: 3 };
  const topIssues = [...violations]
    .sort((a, b) => (order[a.impact] ?? 9) - (order[b.impact] ?? 9))
    .slice(0, 3)
    .map((v) => ({ help: v.help, wcag: v.wcag, impact: v.impact }));
  return { engine, score, label: scoreLabel(score), severities, topIssues, totalIssues: violations.length };
}

function scoreLabel(s) {
  if (s >= 90) return 'Looking strong';
  if (s >= 70) return 'Needs work';
  return 'At risk';
}

/* ---------- safety / limits ---------- */

function sanitizeUrl(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let s = raw.trim();
  // block non-http/s schemes (ftp://, file://, etc.) BEFORE prepending https://
  if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//i.test(s) && !/^https?:\/\//i.test(s)) return null;
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  let u;
  try { u = new URL(s); } catch { return null; }
  if (!/^https?:$/.test(u.protocol)) return null;
  const host = u.hostname.toLowerCase();
  const labels = host.split('.');
  // block localhost, *.local, any label == 'internal' (covers internal.service, foo.internal, etc.)
  if (host === 'localhost' || labels.includes('local') || labels.includes('internal')) return null;
  if (host === 'metadata.google.internal') return null; // belt-and-suspenders
  if (host.includes(':')) return null; // crude IPv6-literal block
  const m = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const a = +m[1], b = +m[2];
    // block private + reserved + link-local/metadata + multicast ranges
    if (a === 10 || a === 127 || a === 0 || a >= 224 ||
        (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31) || (a === 169 && b === 254)) return null;
  }
  return u.toString();
}

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET) return true; // not configured yet (preview) → allow
  if (!token) return false;
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
  const data = await res.json().catch(() => ({}));
  return !!data.success;
}

async function underPerIpLimit(ip, env) {
  const hourly = parseInt(env.PER_IP_HOURLY_LIMIT || '3', 10);
  const daily = parseInt(env.PER_IP_DAILY_LIMIT || '8', 10);
  const hKey = `ip:${ip}:h:${hourStamp()}`;
  const dKey = `ip:${ip}:d:${today()}`;
  const h = parseInt((await env.SCAN_KV.get(hKey)) || '0', 10);
  const d = parseInt((await env.SCAN_KV.get(dKey)) || '0', 10);
  if (h >= hourly) return { ok: false, message: "You've run a few scans this hour. Give it a little while, or book a full audit." };
  if (d >= daily) return { ok: false, message: "You've hit today's scan limit. Try again tomorrow, or book a full audit." };
  await env.SCAN_KV.put(hKey, String(h + 1), { expirationTtl: 60 * 70 });
  await env.SCAN_KV.put(dKey, String(d + 1), { expirationTtl: 60 * 60 * 26 });
  return { ok: true };
}

// Hard global backstop so distributed abuse can't run the account up.
async function underGlobalCap(env) {
  const cap = parseInt(env.GLOBAL_DAILY_CAP || '500', 10);
  const k = `global:${today()}`;
  const n = parseInt((await env.SCAN_KV.get(k)) || '0', 10);
  if (n >= cap) return false;
  await env.SCAN_KV.put(k, String(n + 1), { expirationTtl: 60 * 60 * 26 });
  return true;
}

// Returns true if a Browser Rendering slot is available today (else use PSI).
async function tryClaimBrowserSlot(env) {
  const cap = parseInt(env.DAILY_BROWSER_CAP || '30', 10);
  const k = `browser:${today()}`;
  const n = parseInt((await env.SCAN_KV.get(k)) || '0', 10);
  if (n >= cap) return false;
  await env.SCAN_KV.put(k, String(n + 1), { expirationTtl: 60 * 60 * 26 });
  return true;
}

function today() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
}

function hourStamp() {
  return new Date().toISOString().slice(0, 13); // YYYY-MM-DDTHH (UTC)
}

function hostnameOf(u) {
  try { return new URL(u).hostname; } catch { return 'unknown'; }
}

// Fire-and-forget usage event → PostHog (dashboard + spike alert). Never blocks a scan.
async function trackScan(env, props) {
  if (!env.POSTHOG_KEY) return;
  const host = env.POSTHOG_HOST || 'https://app.posthog.com';
  try {
    await fetch(`${host}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: env.POSTHOG_KEY,
        event: 'ada_scan',
        distinct_id: props.ip || 'anon',
        properties: {
          domain: props.domain,
          score: props.score,
          engine: props.engine,
          total_issues: props.total,
          $lib: 'thryv-ada-scanner',
        },
      }),
    });
  } catch (_e) { /* tracking must never break a scan */ }
}

/* ---------- http helpers ---------- */

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGIN || '').split(',').map((s) => s.trim());
  const ok = allowed.includes(origin) || allowed.includes('*');
  return {
    'Access-Control-Allow-Origin': ok ? origin : allowed[0] || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
