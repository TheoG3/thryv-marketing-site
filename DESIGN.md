---
name: Thryv Marketing Solutions
description: Miami-based growth marketing agency — direct, local, confident
colors:
  miami-night: "#070F2B"
  harbor-blue: "#1B4FA8"
  deep-navy: "#0F3272"
  gulf-tint: "#EEF4FF"
  sunrise-orange: "#F5A623"
  amber-deep: "#D4890A"
  ink: "#0D1B2A"
  slate: "#4B5563"
  pearl: "#9CA3AF"
  divider: "#E5E7EB"
  off-white: "#F8F9FB"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(36px, 5vw, 58px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "clamp(28px, 4vw, 42px)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  nav: "8px"
  card: "12px"
  card-lg: "20px"
  pill: "100px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.sunrise-orange}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.amber-deep}"
  button-blue:
    backgroundColor: "{colors.harbor-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-blue-hover:
    backgroundColor: "{colors.deep-navy}"
  button-nav:
    backgroundColor: "{colors.harbor-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.nav}"
    padding: "9px 22px"
  label-chip:
    backgroundColor: "{colors.gulf-tint}"
    textColor: "{colors.harbor-blue}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
---

# Design System: Thryv Marketing Solutions

## 1. Overview

**Creative North Star: "The Local Authority"**

Thryv's design system is built for credibility earned through specificity, not performed through flash. The visual language strips away everything that doesn't pull its weight. No gradient orbs. No glassmorphism-as-identity. No SaaS-cream neutrals. Every surface decision is an act of confidence: a deep navy that commands attention, an orange that earns its intensity by appearing exactly when trust needs a signal.

This is a brand register site — the agency's portfolio IS the website. Every design choice proves or disproves the craft being sold. Rhythm and whitespace do more work here than decoration. The Miami market demands bilingual confidence and local specificity; the design must feel like it knows Brickell from Overtown, not "businesses like yours somewhere else."

Sections move through three moods: daylight (white, off-white, tinted) for familiar business context, authority (deep navy) for commanding expertise, signal (orange accents) for moments of action. The progression is deliberate — visitor arrives in a known environment, passes through dark sections that establish credibility, exits through clear action.

**Key Characteristics:**
- Two-color palette strictly applied: Harbor Blue (#1B4FA8) and Sunrise Orange (#F5A623)
- Single typeface (Plus Jakarta Sans) at extreme weight contrast: 800 display / 400 body
- Pill-shaped buttons (100px radius) everywhere except navigation (8px radius exception)
- Tonal surface system: white, off-white, gulf-tint, deep navy — hierarchy without complexity
- Orange appears as accent, signal, or CTA only — never as a section fill or decoration

## 2. Colors: The Miami Authority Palette

Two primaries strictly applied; everything else is neutral depth. Orange is the rarest and most powerful element on any screen.

### Primary
- **Harbor Blue** (#1B4FA8): The primary interactive and brand color. Used on blue CTA buttons, active nav states, service icon backgrounds (Gulf Tint pair), price pills, and section labels. Not used as a full-section background — that role belongs to Miami Night.
- **Deep Navy** (#0F3272): Hover state for blue buttons, overlay in hero gradient. Signals depth without switching hue families. Never used at rest on interactive elements.
- **Miami Night** (#070F2B): Full-section dark backgrounds — AI section, Why Thryv, Contact. The "authority" surface. Never used for text on light backgrounds.

### Secondary
- **Sunrise Orange** (#F5A623): The signal color. Reserved for: primary CTAs (btn-primary), hero H1 accent text (`em`), stat numbers, icon accents on dark surfaces, eyebrow labels, and badge treatments. Appears on approximately 8-12% of any screen — its scarcity is the point.
- **Amber Deep** (#D4890A): Orange hover state only. Never used at rest.

### Neutral
- **Gulf Tint** (#EEF4FF): Blue-tinted light fill for label chips, service icon backgrounds, and nav hover states. Keeps the blue family cohesive at low intensity.
- **Off-White** (#F8F9FB): Alternating section background (about, tools, trust bar). Separates content zones without a hard break.
- **Ink** (#0D1B2A): Primary text on light surfaces. Slightly blue-pulled rather than neutral black.
- **Slate** (#4B5563): Body copy and card descriptions. Primary → secondary text hierarchy.
- **Pearl** (#9CA3AF): Tertiary UI text — sub-labels, timestamps, icon strokes requiring reduced prominence.
- **Divider** (#E5E7EB): Card borders, horizontal rules, section separators. Cool-neutral, harmonizes with Gulf Tint.
- **White** (#FFFFFF): Primary surface. Cards, nav, form inputs.

### Named Rules
**The Signal Rule.** Sunrise Orange appears on ≤12% of any screen. Every orange element is a signal: CTA, stat, badge, eyebrow. Using orange as a background fill or repeated decoration destroys the signal.
**The Three-Surface Rule.** Light sections: White or Off-White. Transitional: Gulf Tint accents. Authority sections: Miami Night. No section breaks this progression without a structural reason.

## 3. Typography

**Single Typeface:** Plus Jakarta Sans (geometric humanist sans, system fallback: sans-serif)

**Character:** One family at extreme weight contrast. 800 for everything that commands attention; 400 for everything that informs. No decorative pairing, no serif accent — confidence comes from weight and negative tracking at scale, not ornamentation. The tightest tracking (-0.02em) appears at the largest sizes, reinforcing authority.

### Hierarchy
- **Display** (800, clamp(36px, 5vw, 58px), line-height 1.1, letter-spacing -0.02em): Hero H1 only. Single dominant statement per page. Tightest tracking at largest size.
- **Headline** (800, clamp(28px, 4vw, 42px), line-height 1.15, letter-spacing -0.015em): Section H2s. Same weight family as display, slightly loosened tracking at the smaller scale.
- **Title** (700-800, 18-20px, line-height 1.3): Card H3s, subheadings within sections.
- **Body** (400-500, 16-17px, line-height 1.7): Paragraph copy. Max 65-75ch line length enforced through container constraints. Never below 14px on any platform.
- **Label** (700, 12px, tracking +0.12em, uppercase): Section category labels and category tags. The uppercase treatment signals "category" without competing with H2.

### Named Rules
**The Contrast Rule.** Headline weight is always 800. Body weight is always 400-500. The 300-unit gap between them is what makes hierarchy legible. Never use 600-700 as standalone heading weight — it collapses the contrast.
**The No-Second-Typeface Rule.** Plus Jakarta Sans only. No display serif, icon font, or monospace accent. The weight range of this family covers all cases.

## 4. Elevation

Flat by default, elevation earned. Surfaces rest flat; shadows appear only as responses to hover state or as persistent signals for featured/selected items. No ambient layering — no cards cast shadows at rest unless they're specifically the recommended or featured option.

### Shadow Vocabulary
- **Ambient** (`0 4px 24px rgba(0,0,0,0.08)`): Default hover lift on tool preview cards. Lightweight, barely perceptible.
- **Structural** (`0 12px 48px rgba(0,0,0,0.14)`): Service card hover and founder photo. Signals meaningful interactivity.
- **Featured** (`0 8px 40px rgba(27,79,168,0.18)`): Persistent elevation on the Growth pricing tier. Blue tint in the shadow reinforces brand — deliberate, not incidental.
- **CTA Glow** (`0 4px 16px rgba(245,166,35,0.35)` at rest / `0 6px 20px rgba(245,166,35,0.45)` on hover): Primary orange button only. Glow matches the button color; purposeful, not decorative.
- **Blue CTA** (`0 4px 16px rgba(27,79,168,0.30)`): Resting state on btn-blue. Lower intensity than orange glow — secondary action hierarchy.

### Named Rules
**The Flat-by-Default Rule.** A card does not cast a shadow at rest unless it's the featured/selected/recommended item. Hover shadows must be noticeably larger than the resting state — the jump signals interactivity. If an element is always at the same elevation, remove the shadow.

## 5. Components

### Buttons
All CTAs use pill shape (100px radius). The nav Contact button is the only exception: 8px radius, matching the nav container's component geometry.

- **btn-primary** (orange): Sunrise Orange bg, white text, 14px 28px padding, pill. Orange glow at rest; Amber Deep hover + -1px lift + intensified glow. The highest-hierarchy action on any page.
- **btn-blue**: Harbor Blue bg, white text, same padding, pill. Blue shadow at rest; Deep Navy hover + -1px lift. Use for secondary CTAs and "see more" actions.
- **btn-outline**: Transparent bg, white text, rgba(255,255,255,.4) border — only valid on dark backgrounds where an orange or blue button would compete or look wrong.
- **nav-button** (Contact): Harbor Blue bg, 8px radius, 9px 22px padding, 14px text. Scoped override in Nav.astro, not a global variant.

### Label Chips
Pill shape, 12px/700/uppercase/+0.12em tracking. Gulf Tint bg, Harbor Blue text on light backgrounds. On dark surfaces: rgba(27,79,168,.15) bg with #7EB3FF text (or orange variant: rgba(245,166,35,.15) bg with Amber Deep text).

### Service Cards
White bg, Divider border, 20px radius, 32px padding. A 3px blue bottom-edge reveal animates via `scaleX(0→1)` on hover — the only approved full-width-bottom accent. Hover transforms: shadow-lg + translateY(-4px) + border-color transparent. Service icon inverts to blue-on-blue on hover with a subtle rotate(-4deg) — this animation is unique to service grids.

### Cards (general)
Light surfaces: White or Off-White bg, Divider border, 12px or 20px radius. Dark surfaces (on Miami Night): rgba(255,255,255,.04-0.07) bg, rgba(255,255,255,.08-0.10) border. This low-opacity treatment on dark is structural — not a decorative glass effect to be replicated on light backgrounds.

### Navigation
White bg, Divider border-bottom, 72px height, sticky at top. Nav links: 14px/600, Slate at rest; Harbor Blue + Gulf Tint bg on hover; Harbor Blue text for active. Dropdowns: White bg, 14px radius, shadow-lg, chevron rotates 180deg when open. Mobile: full-height overlay slide-in, accordion for Services and Consulting.

### Blockquotes (founder quote)
Gulf Tint background, 3px Harbor Blue left border, right-side radius only (0 12px 12px 0). Text in Deep Navy, italic. This is the one approved border-left treatment — it signals a direct quote, not a decorative callout. Do not extend this pattern to other card or section types.

### Pricing Cards
Same base as general light-surface cards. Featured tier: persistent Harbor Blue border + blue-tinted shadow + scale(1.03) at rest. The Most Popular badge is Harbor Blue pill, absolute-positioned above the card top edge.

## 6. Do's and Don'ts

### Do:
- **Do** keep Sunrise Orange on ≤12% of any screen. Its rarity is the signal. Every orange element is an action, a stat, or an emphasis — never background fill.
- **Do** use Ink (#0D1B2A) for primary text on light surfaces. Never pure #000.
- **Do** follow the three-surface rhythm: white → off-white → deep navy as sections alternate. Breaks from this rhythm need a structural reason.
- **Do** use 800 weight for all display and headline text. The weight contrast between 800 headlines and 400 body is the hierarchy. Never use 600-700 for a section heading.
- **Do** make CTAs earn their placement. One primary orange CTA per hero or key section. Blue is secondary. Outline/ghost is for dark backgrounds only.
- **Do** honor `prefers-reduced-motion: reduce` — all entrance animations, counter animations, and float loops must disable on this preference.
- **Do** include Spanish trust signals on key conversion sections. The Miami market is roughly 30% Spanish-dominant.
- **Do** animate entrances with cubic-bezier(.22, 1, .36, 1) — exponential ease-out. Never bounce, elastic, or linear.

### Don't:
- **Don't** use glassmorphism (backdrop-filter: blur + rgba bg) on light backgrounds. The hero dark-bg glass cards are structural; that treatment does not transfer to white or off-white surfaces.
- **Don't** use gradient text (background-clip: text + gradient fill). Emphasis comes from weight and size.
- **Don't** use border-left or border-right greater than 1px as a decorative accent stripe on cards, callouts, or list items. The one exception is a genuine semantic blockquote, and even then, prefer a background tint.
- **Don't** replicate the generic SaaS template: gradient hero orb, "platform for growth" copy, identical 6-card feature grids with icon + heading + 2 lines.
- **Don't** add a second typeface. Plus Jakarta Sans handles all cases with its weight range.
- **Don't** use color as the only state differentiator. Hover and focus states must also shift transform, shadow, or background — not just color.
- **Don't** fabricate social proof — no invented client counts, results, or testimonials. Authority comes from specificity: real prices, real neighborhood names, real certification names.
- **Don't** add decorative animations: no shimmer sweeps, no gradient-border pulses, no idle rotation. Motion is reserved for state transitions and entrance reveals.
- **Don't** stack 3 or more box-shadow layers on one element. Two is the maximum, and that should be rare.
- **Don't** use agency brag patterns: awards badges, "we've helped 500+ brands" without specifics, client logo carousels, or case study decks that say nothing.
