# Project Taste Profile
Last updated: 2026-05-01
Project: Thryv Marketing Solutions

## Design Register
Brand/Marketing

## Audience
Miami-area local business owners (plumbers, HVAC, contractors) making a vendor decision — practical, skeptical of agency BS, mobile-first, majority bilingual.

## Brand Personality
- Transparent (no lock-ins, no hidden fees)
- Bold but not arrogant
- Miami-specific, not generic national
- Tech-forward (AI) without being intimidating
- Results-obsessed

## Typography Direction
- Typeface: Plus Jakarta Sans, 400–800 weights only
- Scale ratio: ~1.33 — clamp() fluid sizing throughout
- Hero h1: clamp(36px,5vw,58px), weight 800, letter-spacing -0.02em (tighten tracking at large sizes)
- Section h2: clamp(28px,4vw,42px), weight 800, line-height 1.15
- Body / .lead: 17px, line-height 1.7
- Cards / small copy: 14px minimum, never below 13px
- Labels: 12px, weight 700, uppercase, tracked +0.12em — these are SHORT (2–3 words max)
- Measure: all body blocks max-width constrained (520–640px). Never full-width paragraphs.

## Color Direction
- Primary blue: #1B4FA8
- Dark blue: #0F3272
- Deepest blue: #070F2B
- Orange accent: #F5A623 (sparingly — CTAs, highlights, never backgrounds)
- Light blue: #EEF4FF (surface tint)
- Gray body text: #4B5563 (not #9CA3AF for readable text)
- Surface hierarchy: deep blue → blue → white → light (#F8F9FB) — no two adjacent sections same value
- Never: pure white text below 65% opacity on blue backgrounds for body-size text

## Spacing & Density
- Desktop section padding: 96px
- Mobile section padding: 64px (minimum — never below)
- Card internal padding: 28–36px
- Grid gaps: 24px cards, 32–64px major layout gaps
- 4/8pt grid — all values divisible by 4

## Motion Character
- Easing personality: cubic-bezier(.22,1,.36,1) — ease-out spring. No bounce.
- Hero entrance: staggered 55–65s range, last element visible by 900ms max
- Scroll reveals: opacity+translateY(24px), 600ms, IntersectionObserver threshold 0.15
- Stats count-up: 1100ms, cubic ease-out, fires at threshold 0.6
- Hover micro-interactions: 200–300ms
- Always: @media (prefers-reduced-motion: reduce) kills all animations
- Never: width/height animation, decorative-only animations, delay > 600ms on any hero element

## Approved Patterns
- Orange accent bar / rule as a brand signature element
- Dark blue (#070F2B) hero gradient — brand-rationale justified, not generic purple
- Trust chips (pill badges) for feature/benefit scanning
- Bilingual trust signal (Hablamos Español) as a primary, not afterthought
- Result callout (before→after) as social proof substitute when no named testimonials exist
- Competitive gap table (Thryv vs. Typical Agency) to frame positioning
- Sticky mobile CTA bar — conversion utility on programmatic pages

## Rejected Patterns
- Glassmorphism cards in the hero (backdrop-filter: blur) — feels dated, AI-generated default
- Generic "Get Found. Get Reviews. Get Revenue." headline — too agency-generic
- Gray text (#9CA3AF) used as readable body copy — fails contrast AA
- Fabricated competitor names or invented research claims in gap tables
- Box-shadow stacking (more than 1 shadow per element)
- Hero sequence delays past 600ms on any visible element
