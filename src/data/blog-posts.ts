// Central metadata for every blog post on the Thryv Marketing site.
//
// HOW TO ADD A NEW BLOG POST:
// 1. Create the .astro file under src/pages/blog/<slug>.astro
// 2. Add one entry to the `blogPosts` array below with the SAME slug
// 3. That's it. The blog index, category pages, related-articles sections,
//    and topic hubs all read from this file.
//
// Category taxonomy (broad buckets, used for hub-and-spoke SEO):
//   Med Spa Marketing, GBP Management, Local SEO, Agency Transparency,
//   Reputation, AI Automation
//
// Tag taxonomy (granular, cross-cutting; powers client-side filters and
// related-article scoring; pick 1-4 per post):
//   med-spa, miami, local-seo, gbp, reviews, agency, contracts, pricing,
//   google-ads, bilingual, ai-automation, content-strategy

export interface BlogPost {
  slug: string;             // canonical path, e.g. "/blog/foo/"
  title: string;
  date: string;             // human-readable, e.g. "May 18, 2026"
  category: string;         // single primary category (broad bucket)
  tags: string[];           // granular cross-cutting tags
  excerpt: string;
  readTime: string;
  heroImage?: string;
  topicHub?: { href: string; label: string };
  liveAfter?: string;       // ISO date (YYYY-MM-DD); post is hidden from all listings until this date passes
}

const MED_SPA_HUB = { href: "/medspas/", label: "All Med Spa Marketing" };
const LOCAL_SEO_HUB = { href: "/services/seo/", label: "All Local SEO Services" };
const GBP_HUB = { href: "/services/google-business-profile/", label: "Google Business Profile Services" };
const AGENCY_HUB = { href: "/pricing/", label: "See Transparent Pricing" };

export const blogPosts: BlogPost[] = [
  {
    slug: "/blog/how-miami-med-spas-rank-botox-near-me/",
    title: "How Miami Med Spas Rank for 'Botox Near Me'",
    date: "June 2, 2026",
    category: "Med Spa Marketing",
    tags: ["med-spa", "miami", "local-seo", "gbp"],
    excerpt: "When someone searches 'botox near me' in Miami, they are ready to book. The local SEO and Google Business Profile playbook to put your med spa in the map pack: ranking factors, review math, and a 30-day checklist.",
    readTime: "9 min read",
    heroImage: "/blog/hero-botox-near-me-miami.webp",
    topicHub: MED_SPA_HUB,
  },
  {
    slug: "/blog/botox-filler-marketing-what-books-consults/",
    title: "Botox & Filler Marketing: What Actually Books Consults",
    date: "June 2, 2026",
    category: "Med Spa Marketing",
    tags: ["med-spa", "miami", "content-strategy", "reviews"],
    excerpt: "Likes are not consults. What actually converts a botox inquiry into a booked appointment, backed by the data, and why the channel you obsess over is rarely the thing holding you back.",
    readTime: "9 min read",
    heroImage: "/blog/hero-botox-filler-marketing.webp",
    topicHub: MED_SPA_HUB,
  },
  {
    slug: "/blog/pressure-washing-marketing-south-florida-local-jobs/",
    title: "How South Florida Pressure Washing Companies Get More Local Jobs",
    date: "June 2, 2026",
    category: "Local SEO",
    tags: ["local-seo", "miami", "gbp"],
    excerpt: "Pressure washing is won locally, not nationally. The map pack, Google Business Profile, review, and recurring-revenue playbook that books more jobs for South Florida pressure washing companies.",
    readTime: "9 min read",
    heroImage: "/blog/hero-pressure-washing-local-jobs.webp",
    topicHub: LOCAL_SEO_HUB,
  },
  {
    slug: "/blog/pressure-washing-seo-vs-google-ads-miami/",
    title: "Pressure Washing Marketing in Miami: SEO vs Google Ads",
    date: "June 2, 2026",
    category: "Local SEO",
    tags: ["local-seo", "miami", "google-ads"],
    excerpt: "Honest breakdown of SEO vs Google Ads for Miami pressure washing companies. What each channel costs, when each wins, and the hybrid that books jobs now and compounds later.",
    readTime: "8 min read",
    heroImage: "/blog/hero-pressure-washing-seo-vs-ads.webp",
    topicHub: LOCAL_SEO_HUB,
  },
  {
    slug: "/blog/ai-marketing-agency-miami/",
    title: "AI Marketing Agency in Miami: What It Actually Means in 2026",
    date: "June 9, 2026",
    category: "AI Automation",
    tags: ["ai-automation", "miami", "local-seo", "content-strategy"],
    excerpt: "Most agencies say they are AI-powered. Most mean they use ChatGPT for subject lines. What AI actually changes for a Miami small business, the answer-engine opening nobody is pricing in, and 5 questions that expose the fakes.",
    readTime: "8 min read",
    heroImage: "/blog/hero-ai-marketing-agency-miami.webp",
    topicHub: LOCAL_SEO_HUB,
    liveAfter: "2026-06-09",
  },
  {
    slug: "/blog/no-contract-marketing-agency-miami/",
    title: "No-Contract Digital Marketing Agency in Miami: Month-to-Month Only",
    date: "June 23, 2026",
    category: "Agency Transparency",
    tags: ["agency", "contracts", "miami", "pricing"],
    excerpt: "Want a Miami marketing agency with no long-term contract? What separates a real month-to-month agreement from a lock-in dressed up as one, the red flags in the fine print, and what it actually costs.",
    readTime: "7 min read",
    heroImage: "/blog/hero-no-contract-marketing-agency-miami.webp",
    topicHub: AGENCY_HUB,
    liveAfter: "2026-06-23",
  },
  {
    slug: "/blog/miami-marketing-agency-pricing-2026/",
    title: "Miami Marketing Agency Pricing 2026: The Honest Breakdown",
    date: "May 20, 2026",
    category: "Agency Transparency",
    tags: ["miami", "agency", "pricing", "contracts"],
    excerpt: "What Miami digital marketing agencies actually charge for SEO, Google Business Profile, reputation, PR, and ads. Why 4 out of 5 hide their prices, what's inside each retainer, and the 5 questions to ask before you sign.",
    readTime: "9 min read",
    topicHub: AGENCY_HUB,
  },
  {
    slug: "/blog/best-med-spa-seo-agencies-miami-2026/",
    title: "13 Best Med Spa SEO Agencies in Miami 2026: Honest Profiles, Pricing, and How to Choose",
    date: "May 18, 2026",
    category: "Med Spa Marketing",
    tags: ["med-spa", "miami", "agency", "pricing"],
    excerpt: "A transparent guide to 12 national and local med spa marketing firms, plus one founder-led Miami boutique. Compare pricing, specialties, and service models to find the right fit.",
    readTime: "12 min read",
    heroImage: "/blog/hero-best-med-spa-seo-agencies-miami-2026.webp",
    topicHub: MED_SPA_HUB,
  },
  {
    slug: "/blog/med-spa-marketing-cost-miami/",
    title: "Med Spa Marketing Cost in Miami (2026 Pricing Guide)",
    date: "May 18, 2026",
    category: "Med Spa Marketing",
    tags: ["med-spa", "miami", "pricing", "google-ads"],
    excerpt: "What does med spa marketing actually cost? Pricing breakdown by service. Compare national agencies, local specialists, and when to DIY.",
    readTime: "9 min read",
    heroImage: "/blog/hero-med-spa-marketing-cost-miami.webp",
    topicHub: MED_SPA_HUB,
  },
  {
    slug: "/blog/med-spa-seo-vs-ppc-miami/",
    title: "Med Spa SEO vs PPC: Which Actually Drives More Patients in Miami (2026)",
    date: "May 19, 2026",
    category: "Med Spa Marketing",
    tags: ["med-spa", "miami", "google-ads", "local-seo", "pricing"],
    excerpt: "Honest breakdown of SEO vs Google Ads for Miami med spas. ROI math by year, when each channel wins, and the hybrid model that beats either alone.",
    readTime: "10 min read",
    heroImage: "/blog/hero-med-spa-seo-vs-ppc-miami.webp",
    topicHub: MED_SPA_HUB,
  },
  {
    slug: "/blog/optimize-google-business-profile-2026/",
    title: "How to Optimize Your Google Business Profile in 2026 (Step-by-Step)",
    date: "May 7, 2026",
    category: "GBP Management",
    tags: ["gbp", "local-seo"],
    excerpt: "A complete, practical guide to claiming your profile, filling it out correctly, adding photos, managing reviews, and using the new AI features Google rolled out this year.",
    readTime: "8 min read",
    topicHub: GBP_HUB,
  },
  {
    slug: "/blog/why-miami-local-businesses-lose-to-competitors/",
    title: "Why Miami Local Businesses Lose to Competitors with Worse Services",
    date: "April 28, 2026",
    category: "Local SEO",
    tags: ["miami", "local-seo", "gbp"],
    excerpt: "The business that ranks first on Google Maps isn't always the best one. It's the one that's been doing the right things consistently. Here's what that looks like in practice.",
    readTime: "6 min read",
    topicHub: LOCAL_SEO_HUB,
  },
  {
    slug: "/blog/google-business-profile-vs-website/",
    title: "Google Business Profile vs. Your Website: Which Actually Drives Calls?",
    date: "April 20, 2026",
    category: "GBP Management",
    tags: ["gbp", "local-seo"],
    excerpt: "For most local service businesses, the GBP listing drives more inbound calls than the website. Understanding why changes how you prioritize your marketing budget.",
    readTime: "5 min read",
    topicHub: GBP_HUB,
  },
  {
    slug: "/blog/how-many-reviews-to-beat-competition/",
    title: "How Many 5-Star Reviews Do You Actually Need to Beat Your Competition?",
    date: "April 12, 2026",
    category: "Reputation",
    tags: ["reviews", "local-seo"],
    excerpt: "It's not about having the most reviews. It's about having enough at the right rating threshold, with the right velocity. The math is simpler than you think.",
    readTime: "4 min read",
  },
  {
    slug: "/blog/why-agencies-lock-you-into-contracts/",
    title: "The Real Reason Agencies Lock You Into 12-Month Contracts",
    date: "April 5, 2026",
    category: "Agency Transparency",
    tags: ["agency", "contracts", "pricing"],
    excerpt: "Long-term contracts aren't about aligning incentives. They're about protecting agencies from the consequences of underperformance. Here's how to spot the red flags.",
    readTime: "6 min read",
  },
  {
    slug: "/blog/ai-phone-receptionist-local-business/",
    title: "AI Phone Receptionists: What Actually Works for Local Service Businesses",
    date: "March 28, 2026",
    category: "AI Automation",
    tags: ["ai-automation", "local-seo"],
    excerpt: "Small businesses miss a large share of incoming calls. AI receptionists cost 87% to 97% less than a human and handle bilingual calls 24/7. Here's what actually works.",
    readTime: "7 min read",
  },
  {
    slug: "/blog/bilingual-seo-miami/",
    title: "Bilingual SEO in Miami: The Opportunity Most Agencies Miss Completely",
    date: "March 20, 2026",
    category: "Local SEO",
    tags: ["miami", "local-seo", "bilingual"],
    excerpt: "A large share of Miami-Dade searches happen in Spanish, and most agencies ignore it completely. Here's the full bilingual SEO strategy to capture that audience.",
    readTime: "6 min read",
    topicHub: LOCAL_SEO_HUB,
  },
];

// Category metadata. Used by:
//   - /blog/category/[slug].astro for hero copy + SEO
//   - /blog/index.astro for filter pill labels
//   - Vertical landing pages (e.g. /medspas/) for cross-link sidebars
//
// `verticalLink` connects a category to its matching vertical landing page,
// closing the topic-cluster loop (vertical page <-> blog category page).
//
// `minPostsForRealPage` (default 3) controls when a category gets a standalone
// /blog/category/<slug>/ page. Categories below the threshold remain as
// client-side filters on /blog/ only (no thin indexable page).

export interface CategoryMeta {
  label: string;
  slug: string;
  description: string;        // 1-2 sentences, used in category page hero + meta
  heroEyebrow: string;        // small label above the H1 on the category page
  verticalLink?: { href: string; label: string };  // to a service or vertical page
}

// IMPORTANT: each `label` must EXACTLY match the `category` string used in
// blogPosts entries above. This is the canonical identifier used by
// getPostsByCategory() to map posts -> category. Keep them in sync.
export const categoryMeta: Record<string, CategoryMeta> = {
  "Med Spa Marketing": {
    label: "Med Spa Marketing",
    slug: "med-spa-marketing",
    description: "Practical playbooks for filling med spa schedules in Miami: pricing benchmarks, agency comparisons, SEO vs paid trade-offs, and the channels that actually move new-patient volume.",
    heroEyebrow: "Vertical Insights",
    verticalLink: { href: "/medspas/", label: "Med Spa marketing services" },
  },
  "GBP Management": {
    label: "GBP Management",
    slug: "google-business-profile",
    description: "Everything that controls whether your business shows up on Google Maps: profile setup, photo strategy, review velocity, and the optimization moves that actually move the rank.",
    heroEyebrow: "Local Visibility",
    verticalLink: { href: "/services/google-business-profile/", label: "GBP management service" },
  },
  "Local SEO": {
    label: "Local SEO",
    slug: "local-seo",
    description: "How small Miami operators win local search rankings against franchises and national agencies. Citations, on-page work, bilingual targeting, and competitive positioning.",
    heroEyebrow: "Search Strategy",
    verticalLink: { href: "/services/seo/", label: "SEO, AEO & GEO services" },
  },
  "Agency Transparency": {
    label: "Agency Transparency",
    slug: "agency-transparency",
    description: "What marketing agencies hide, why contracts get long, and how to read a retainer before you sign. Buyer-side intelligence for small operators evaluating agencies.",
    heroEyebrow: "Buyer Intelligence",
    verticalLink: { href: "/pricing/", label: "See our transparent pricing" },
  },
  "Reputation": {
    label: "Reputation",
    slug: "reputation",
    description: "Review velocity, response strategy, and how reputation reinforces Google ranking. The math behind how many reviews you really need to beat your competition.",
    heroEyebrow: "Trust Signals",
    verticalLink: { href: "/services/reputation-management/", label: "Reputation management service" },
  },
  "AI Automation": {
    label: "AI Automation",
    slug: "ai-automation",
    description: "Where AI actually pays back for a local service business: phone reception, bilingual handling, lead qualification, and the workflows that save real money.",
    heroEyebrow: "Automation",
    verticalLink: { href: "/ai/", label: "AI tools & automation" },
  },
};

/** All posts in a given category (broad bucket), newest first. */
// ── Publish gate ───────────────────────────────────────────────
// A post is live once its liveAfter date has passed (or if it has none).
// Evaluated at BUILD time, so a deploy/rebuild on or after the date reveals it.
const _BUILD_NOW = new Date();
export function isPublished(p: BlogPost): boolean {
  return !p.liveAfter || new Date(p.liveAfter).getTime() <= _BUILD_NOW.getTime();
}
/** Live posts only (respects the liveAfter gate). Use this for ALL public listings. */
export const publishedPosts: BlogPost[] = blogPosts.filter(isPublished);

export function getPostsByCategory(category: string): BlogPost[] {
  return publishedPosts
    .filter((p) => p.category === category)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** Categories with at least `minPosts` published posts. Used by category page generator. */
export function getRealCategories(minPosts = 3): CategoryMeta[] {
  return Object.values(categoryMeta).filter(
    (meta) => getPostsByCategory(meta.label).length >= minPosts
  );
}

/** All categories with their current post count, sorted by count desc. Used for filter pills. */
export function getAllCategoriesWithCount(): Array<{ meta: CategoryMeta; count: number; isRealPage: boolean }> {
  const minForRealPage = 3;
  return Object.values(categoryMeta)
    .map((meta) => {
      const count = getPostsByCategory(meta.label).length;
      return { meta, count, isRealPage: count >= minForRealPage };
    })
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
}

/**
 * Score and return up to `max` posts most related to `currentSlug`.
 * Scoring: 2 points per shared tag, 1 point for same category.
 * Falls back to most-recent posts (excluding current) if no scored matches.
 */
export function getRelatedPosts(currentSlug: string, max = 3): BlogPost[] {
  const current = blogPosts.find((p) => p.slug === currentSlug);
  const others = publishedPosts.filter((p) => p.slug !== currentSlug);
  if (!current) return others.slice(0, max);

  const scored = others
    .map((p) => {
      const sharedTags = p.tags.filter((t) => current.tags.includes(t)).length;
      const sameCategory = p.category === current.category ? 1 : 0;
      return { post: p, score: sharedTags * 2 + sameCategory };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.post);

  // Pad with most recent non-current posts if we don't have enough scored matches
  if (scored.length < max) {
    const fallback = others.filter((p) => !scored.includes(p));
    return [...scored, ...fallback].slice(0, max);
  }
  return scored.slice(0, max);
}
