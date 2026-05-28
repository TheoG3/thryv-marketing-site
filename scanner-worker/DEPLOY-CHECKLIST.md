# ADA Scanner — Deploy Checklist

All commands run from `~/Desktop/Thryv/thryv-marketing-site/scanner-worker/`.
Keys are injected via `wrangler secret put` (typed at the prompt, NEVER pasted into any file or chat).

## Pre-flight status
- [x] Worker code complete + validated locally (28/28 tests pass)
- [x] Dry-run build clean (589 KiB, zero errors)
- [x] SSRF guard: blocks localhost, private ranges, metadata IP, non-http schemes, `*.local`, `*.internal`, `internal.*`
- [x] Score math verified
- [x] PSI fallback path code complete (live API test skipped locally — key not auto-sourced in that shell; key is valid in ~/.zshrc)
- [x] PostHog key placeholder in wrangler.toml (inject at deploy step 5)

---

## Step 1 — Create KV namespace (free, one-time)

```bash
npx wrangler kv namespace create SCAN_KV
```

Copy the `id` from the output and paste it into `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "SCAN_KV"
id = "PASTE_ID_HERE"
```

## Step 2 — Enable Browser Rendering (Cloudflare dashboard, free ~30/day)

1. dash.cloudflare.com → Workers & Pages → your account → Settings
2. Enable **Browser Rendering** (free tier)
3. No changes to wrangler.toml needed — binding is already declared

## Step 3 — Create Turnstile widget (free)

1. dash.cloudflare.com → Turnstile → Add site
2. Site name: `Thryv ADA Scanner` | Domains: `thryvmarketingsolutions.com`
3. Widget type: **Managed** (invisible to humans, blocks bots)
4. Copy the **Site Key** (public — goes into the front-end HTML widget)
5. Copy the **Secret Key** (never shown again — set it as a Worker secret now):

```bash
npx wrangler secret put TURNSTILE_SECRET
# paste the secret key at the prompt
```

Keep the Site Key handy for Step 6 (front-end wiring).

## Step 4 — Set API secrets

```bash
npx wrangler secret put PSI_API_KEY
# paste value of $GOOGLE_PAGESPEED_API_KEY from ~/.zshrc

npx wrangler secret put RESEND_API_KEY
# paste value of $RESEND_API_KEY from ~/.zshrc
```

## Step 5 — Inject PostHog key + deploy to *.workers.dev (preview)

```bash
# Inject the real PostHog project key before deploying
sed "s/POSTHOG_KEY_PLACEHOLDER/$POSTHOG_PROJECT_KEY_THRYV/" wrangler.toml > wrangler.deploy.toml

npx wrangler deploy --config wrangler.deploy.toml
rm wrangler.deploy.toml
```

Wrangler will print the preview URL: `thryv-ada-scanner.<subdomain>.workers.dev`

## Step 6 — Smoke test the preview worker

```bash
# Should return a scan result (score + issues)
curl -s -X POST https://thryv-ada-scanner.<subdomain>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","turnstileToken":""}' | python3 -m json.tool

# Should return {"error":"invalid_url"} — SSRF guard working
curl -s -X POST https://thryv-ada-scanner.<subdomain>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"url":"http://169.254.169.254","turnstileToken":""}' | python3 -m json.tool
```

Note: Turnstile is gated by `if (!env.TURNSTILE_SECRET) return true` in preview mode if the secret isn't set yet — add it in Step 4 before this test.

## Step 7 — Wire front-end (Theodore's approval gate)

1. Add Turnstile Site Key to the ADA page form widget
2. Point the form `fetch()` at the `*.workers.dev` preview URL (or custom domain once ready)
3. Deploy the ADA page: `src/pages/services/ada-compliance.astro` (from prototype at `docs/ada-audit-2026-05-23/ada-compliance-page-PROTOTYPE-v2.html`)
4. Test end-to-end in browser
5. Set `ALLOWED_ORIGIN` in wrangler.toml to `https://thryvmarketingsolutions.com` (already set) and re-deploy

## Resources created (all free tier)
| Resource | Type | Cost |
|---|---|---|
| `SCAN_KV` KV namespace | Cloudflare KV | Free (100k reads/day) |
| Browser Rendering | Cloudflare | Free (~30 renders/day) |
| Turnstile widget | Cloudflare | Free (unlimited) |
| Worker | Cloudflare Workers | Free (100k req/day) |
| PSI API | Google Cloud | Free (25k req/day) |
| Resend | Email (v1.1) | Free (100 emails/day) |

**Total deploy cost: $0**
