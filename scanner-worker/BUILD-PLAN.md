# ADA Scanner — Build Plan

Standalone Cloudflare Worker that powers the free ADA/WCAG scanner on `/services/ada-compliance/`.
Kept SEPARATE from the static Astro site so it never affects the 1,993-page deploy.

## Architecture
```
visitor → ADA page (static) → fetch() → thryv-ada-scanner (Worker)
                                            ├─ Turnstile verify (anti-abuse)
                                            ├─ SSRF URL guard
                                            ├─ per-IP rate limit (KV)
                                            ├─ engine pick:
                                            │    • Browser Rendering + axe-core   (primary, free ~30/day)
                                            │    • Google PageSpeed API           (auto-fallback past cap)
                                            └─ store result in KV → return score + top issues + reportToken
```

## Engine logic
- **Primary:** Cloudflare Browser Rendering loads the URL, injects axe-core 4.10, runs WCAG 2.x AA ruleset. Real, matches our own-site methodology.
- **Daily cap counter** in KV. Once we cross the free browser budget (~30 scans/day), new scans auto-route to **Google PageSpeed Insights API** (free, Lighthouse a11y = also axe-based). Resets daily. Visitor never sees a difference.
- **Score:** 100 minus weighted violations (critical −15 / serious −10 / moderate −4 / minor −1), floored at 0. Labeled a "snapshot," never "compliant."

## Fail-safes
- **SSRF guard:** only public http/https; blocks localhost, *.local/*.internal, private + reserved + 169.254 metadata IP ranges, IPv6 literals.
- **Turnstile** (free CAPTCHA) required on every scan.
- **Per-IP rate limit:** 3 scans/day (KV).
- **Single page-load, 20s timeout.** No crawl.
- Disclaimer on the page: automated snapshot, not a full audit or legal advice.

## Files
- `wrangler.toml` — Worker config + bindings (BROWSER, SCAN_KV, vars)
- `package.json` — deps (@cloudflare/puppeteer, wrangler)
- `src/index.js` — the Worker (CORS, Turnstile, SSRF, rate limit, scan, fallback, KV store)

## Bindings / secrets needed (set at deploy)
| Name | Type | Where it comes from |
|---|---|---|
| `BROWSER` | Browser Rendering binding | Cloudflare (I enable via token/dashboard) |
| `SCAN_KV` | KV namespace | `wrangler kv namespace create` (I do this) |
| `TURNSTILE_SECRET` | secret | Cloudflare Turnstile (I create keys) |
| `PSI_API_KEY` | secret | **Theodore** → Google Cloud (free) |
| `RESEND_API_KEY` | secret | **Theodore** → Resend (free) — for report emails (v1.1) |

Secrets are set with `wrangler secret put NAME` (typed into the terminal prompt, **never pasted into chat**).

## Status
- [x] Worker scaffolded (this folder) — UNTESTED until first deploy with bindings
- [ ] Cloudflare: create KV, enable Browser Rendering, create Turnstile keys (me)
- [ ] Theodore: Google PSI key + Resend signup/domain verify
- [ ] Deploy Worker to a *.workers.dev preview, test against real sites + SSRF cases
- [ ] Port PROTOTYPE-v2 into real Astro page, wire front-end fetch + Turnstile widget
- [ ] v1.1: Resend auto-PDF report email
- [ ] Launch (page + scanner together)

## Deploy (later)
```
cd scanner-worker
npm install
npx wrangler kv namespace create SCAN_KV   # paste id into wrangler.toml
npx wrangler secret put TURNSTILE_SECRET
npx wrangler secret put PSI_API_KEY
npx wrangler deploy
```
