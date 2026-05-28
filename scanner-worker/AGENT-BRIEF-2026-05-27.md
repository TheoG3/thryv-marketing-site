# ADA Scanner — Bring-to-Approval-Gate Brief (2026-05-27)

## Goal
The ADA/WCAG scanner Worker was BUILT earlier but BLOCKED on missing API keys. Those keys are now configured and working (verified this session): Google PageSpeed API, Resend, Gemini all functional; Resend sending domain `thryvmarketingsolutions.com` verified. **Your job: take this project from "blocked" to "staged and ready for Theodore's one approval to go live."** Do NOT do the final production go-live (deploying the public `/services/ada-compliance/` page or wiring the live site form) — that's his gate. Everything up to it, do.

## Context files (read first)
- `~/Desktop/Thryv/thryv-marketing-site/scanner-worker/BUILD-PLAN.md` — the architecture + intended build steps.
- `~/Desktop/Thryv/thryv-marketing-site/scanner-worker/` — existing worker code. Read what's there before changing anything.
- ADA page prototype: `~/Desktop/Thryv/thryv-marketing-site/docs/ada-audit-2026-05-23/ada-compliance-page-PROTOTYPE-v2.html` (slug `/services/ada-compliance/`, pricing $297 audit / $997 audit+fix / $97-mo monitoring).

## Architecture (from BUILD-PLAN)
Cloudflare Worker: Browser Rendering + axe-core (primary, free ~30/day) → auto-fallback to Google PageSpeed API past the daily cap. Guards: Turnstile + SSRF guard + per-IP limit (3/hr, 8/day) + global 500/day cap. PostHog event per scan. Email results via Resend.

## Keys / env (already in `~/.claude/.env` and/or `~/.zshrc` — read names, NEVER print values)
- Google PageSpeed: working key present (added this session).
- `RESEND_API_KEY` — present + verified, domain `thryvmarketingsolutions.com` verified.
- Gemini key — present + working.
- `CLOUDFLARE_API_TOKEN` — present (theodoreg3@gmail.com account), used for wrangler.
- PostHog: `PUBLIC_POSTHOG_KEY` pattern (gitignored .env). Use placeholder in source, inject at deploy.

## What to DO (up to the gate)
1. Read existing worker code + BUILD-PLAN. Inventory what's done vs missing.
2. Finish the worker code: axe-core scan path, PageSpeed fallback, all guards (Turnstile verify, SSRF allowlist/denylist for private IPs, per-IP + global rate limits via KV), Resend results email, PostHog event.
3. Validate LOCALLY as far as possible: `wrangler dev` or a local Node harness running axe-core against a couple of real public URLs + SSRF test cases (e.g. reject `http://169.254.169.254`, `http://localhost`, private ranges). Capture evidence it works.
4. Prepare — but do NOT execute — the cloud-provisioning + deploy steps as a single copy-paste **DEPLOY-CHECKLIST.md** in the scanner-worker folder: exact `wrangler kv namespace create`, Turnstile widget creation, Browser Rendering binding, `wrangler secret put <NAME>` (one per secret, values from env, never inline), and `wrangler deploy` to a `*.workers.dev` test URL. List every CF resource that will be created and confirm all are free-tier.
5. Verify the worker BUILDS (`wrangler deploy --dry-run` or equivalent) with zero errors.

## STOP HERE (the approval gate)
Do NOT: create CF KV namespaces / Turnstile widgets, run `wrangler secret put`, run a real `wrangler deploy`, deploy the public ADA page, or touch the production site. Leave those for Theodore to approve.

## Rules
- No keys/secrets ever printed in output or committed to any file — env + `wrangler secret put` only ([[feedback_no_keys_in_public_output]], [[feedback_never_paste_keys_in_chat]]).
- No fabricated scan data shown anywhere; the ADA page stays held until the scanner is genuinely live (Theodore's standing call).
- Be economical with tokens.

## Deliverable
A short report: what was missing vs finished, local validation evidence (incl. SSRF rejections), the exact DEPLOY-CHECKLIST contents, and the one sentence describing what Theodore needs to approve to go live.
