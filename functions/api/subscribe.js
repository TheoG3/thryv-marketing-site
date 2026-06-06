// Cloudflare Pages Function — newsletter subscribe proxy.
// Keeps the Beehiiv API key server-side (never in public HTML, per RULE #1).
// The blog newsletter form (src/components/BlogAside.astro) POSTs here.
//
// Required Cloudflare Pages env vars (Project → Settings → Variables):
//   BEEHIIV_API_KEY        — Beehiiv → Settings → API (a v2 key)
//   BEEHIIV_PUBLICATION_ID — looks like "pub_xxxxxxxx-xxxx-..."
// Optional fallback (emails the signup if Beehiiv isn't configured/up):
//   WEB3FORMS_API_KEY      — already exists in the local env; add to CF too if wanted
//
// NOTE: runs only in the deployed Cloudflare Pages environment (and `wrangler
// pages dev`). It does NOT run under `npm run dev` (astro dev) — the form will
// get a 404 there, which is expected during local copy/design review.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  let email = "";
  let topic = "";
  let honeypot = "";

  const ct = request.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) {
      const body = await request.json();
      email = (body.email || "").trim();
      topic = (body.topic || "").trim();
      honeypot = (body.botcheck || "").toString();
    } else {
      const form = await request.formData();
      email = (form.get("email") || "").toString().trim();
      topic = (form.get("topic") || "").toString().trim();
      honeypot = (form.get("botcheck") || "").toString();
    }
  } catch {
    return json({ success: false, message: "Bad request." }, 400);
  }

  // Honeypot: silently accept bots without doing anything.
  if (honeypot) return json({ success: true });

  if (!EMAIL_RE.test(email)) {
    return json({ success: false, message: "Please enter a valid email." }, 422);
  }

  // Primary: Beehiiv
  if (env.BEEHIIV_API_KEY && env.BEEHIIV_PUBLICATION_ID) {
    try {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: "thryv-blog",
            utm_medium: "newsletter-sidebar",
            utm_campaign: topic || "blog",
            referring_site: request.headers.get("referer") || "thryvmarketingsolutions.com",
          }),
        }
      );
      if (res.ok) return json({ success: true });
      const detail = await safeText(res);
      // fall through to Web3Forms fallback if available
      if (!env.WEB3FORMS_API_KEY) {
        return json({ success: false, message: "Subscription service error.", detail }, 502);
      }
    } catch (err) {
      if (!env.WEB3FORMS_API_KEY) {
        return json({ success: false, message: "Could not reach subscription service." }, 502);
      }
    }
  }

  // Fallback: Web3Forms (emails the signup so nothing is lost)
  if (env.WEB3FORMS_API_KEY) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: env.WEB3FORMS_API_KEY,
          subject: `Newsletter Signup | ${topic || "Blog"}`,
          from_name: "Thryv Blog Newsletter",
          email,
        }),
      });
      if (res.ok) return json({ success: true });
      return json({ success: false, message: "Could not sign you up right now." }, 502);
    } catch {
      return json({ success: false, message: "Could not sign you up right now." }, 502);
    }
  }

  // Nothing configured yet.
  return json(
    { success: false, message: "Newsletter is not configured yet." },
    503
  );
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function safeText(res) {
  try { return await res.text(); } catch { return ""; }
}
