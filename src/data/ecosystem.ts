export type ServiceSlug =
  | 'google-business-profile'
  | 'seo'
  | 'google-ads'
  | 'reputation-management'
  | 'website-design'
  | 'social-media-ads';

export interface ServiceDef {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  price: string;
  defaultIncludes: string[];
  defaultFaqs: Array<{ q: string; a: string }>;
}

export interface VerticalServiceConfig {
  headline: string;
  lead: string;
  problem: string;
  includes: string[];
  // Optional SEO overrides (per vertical + service combo)
  pageTitle?: string;
  pageDesc?: string;
  faqs?: Array<{ q: string; a: string }>;
}

export interface Stat {
  num: string;
  label: string;
  accent?: boolean;
}

export interface Vertical {
  slug: string;
  name: string;
  singular: string;
  pillarHeadline: string;
  pillarLead: string;
  problemHeadline: string;
  problemBody: string;
  stats: Stat[];
  faqs: Array<{ q: string; a: string }>;
  services: ServiceSlug[];
  serviceConfigs: Partial<Record<ServiceSlug, VerticalServiceConfig>>;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  /** True if this city has neighborhood sub-pages in the data model. False = city-level pillar only (e.g. SoFla cities outside Miami-Dade) */
  hasNeighborhoods: boolean;
  /** WGS84 latitude of city centerpoint for LocalBusiness @geo schema */
  lat?: number;
  lng?: number;
}

export const cities: City[] = [
  // Miami-Dade hub (12 neighborhoods defined in neighborhoods array below)
  { slug: 'miami', name: 'Miami', state: 'FL', hasNeighborhoods: true, lat: 25.7617, lng: -80.1918 },
  // Broward County
  { slug: 'fort-lauderdale', name: 'Fort Lauderdale', state: 'FL', hasNeighborhoods: false, lat: 26.1224, lng: -80.1373 },
  { slug: 'hollywood-fl', name: 'Hollywood', state: 'FL', hasNeighborhoods: false, lat: 26.0112, lng: -80.1495 },
  { slug: 'pompano-beach', name: 'Pompano Beach', state: 'FL', hasNeighborhoods: false, lat: 26.2379, lng: -80.1248 },
  // Palm Beach County
  { slug: 'west-palm-beach', name: 'West Palm Beach', state: 'FL', hasNeighborhoods: false, lat: 26.7153, lng: -80.0534 },
  { slug: 'boca-raton', name: 'Boca Raton', state: 'FL', hasNeighborhoods: false, lat: 26.3683, lng: -80.1289 },
  { slug: 'delray-beach', name: 'Delray Beach', state: 'FL', hasNeighborhoods: false, lat: 26.4615, lng: -80.0728 },
];

export function getCity(slug: string): City | undefined {
  return cities.find(c => c.slug === slug);
}

export interface Neighborhood {
  slug: string;
  name: string;
  desc: string;
  citySlug: string;
  cityName: string;
  /** WGS84 latitude — neighborhood centerpoint, used in LocalBusiness `@geo` schema injection */
  lat?: number;
  /** WGS84 longitude — neighborhood centerpoint */
  lng?: number;
}

export interface CityOverride {
  pageTitle?: string;
  pageDesc?: string;
  h1?: string;
  lead?: string;
  marketHeadline?: string;
  marketBody?: string[];
  signals?: Array<{ label: string; val: string }>;
  faqs?: Array<{ q: string; a: string }>;
  liveAfter?: string;
}

/**
 * VerticalOverride enriches a `/[vertical]/` pillar page with research-derived content.
 * Templates check the override via getVerticalOverride() and fall back to the existing
 * verticals[].pillarHeadline/pillarLead/stats/faqs schema if no override is set.
 *
 * marketBody entries support inline HTML (anchor tags only) for cross-service linking.
 * Templates render them via set:html — content is internal/trusted, never user-supplied.
 *
 * `liveAfter` (ISO YYYY-MM-DD) gates the override in production; DEV mode bypasses
 * the gate so localhost always shows the override.
 */
export interface VerticalOverride {
  pageTitle?: string;
  pageDesc?: string;
  h1?: string;
  lead?: string;
  marketHeadline?: string;
  marketBody?: string[];
  signals?: Array<{ label: string; val: string }>;
  faqs?: Array<{ q: string; a: string }>;
  liveAfter?: string;
}

/**
 * ServiceVerticalOverride enriches a `/[vertical]/[service]/` service-pillar page.
 * Templates check via getServiceVerticalOverride() and fall back to the existing
 * v.serviceConfigs[svc.slug] schema if no override is set.
 *
 * Same conventions as VerticalOverride (inline-HTML marketBody, liveAfter gating).
 */
export interface ServiceVerticalOverride {
  pageTitle?: string;
  pageDesc?: string;
  h1?: string;
  lead?: string;
  marketHeadline?: string;
  marketBody?: string[];
  signals?: Array<{ label: string; val: string }>;
  faqs?: Array<{ q: string; a: string }>;
  liveAfter?: string;
}

export interface NeighborhoodOverride {
  pageTitle?: string;
  pageDesc?: string;
  h1?: string;
  lead?: string;
  marketHeadline?: string;
  marketBody?: string[];
  signals?: Array<{ label: string; val: string }>;
  faqs?: Array<{ q: string; a: string }>;
  /**
   * ISO date YYYY-MM-DD. If set, the override is dormant in code until this date.
   * `getNeighborhoodOverride()` returns undefined for any override whose liveAfter
   * is later than today, so the page renders the generic template until the gate opens.
   * Used to phase-roll overrides on the 30-day plan cadence.
   */
  liveAfter?: string;
}

export const services: ServiceDef[] = [
  {
    slug: 'google-business-profile',
    name: 'Google Business Profile Management',
    shortName: 'Google Business Profile',
    price: '$297/mo',
    defaultIncludes: [
      'Profile setup and full optimization',
      'Weekly posts and updates',
      'Photo and video uploads',
      'Review monitoring and response',
      'Q&A management',
      'Monthly performance report',
    ],
    defaultFaqs: [
      {
        q: 'What is Google Business Profile management?',
        a: 'Google Business Profile (formerly Google My Business) is the listing that appears when someone searches for your business on Google or Google Maps. Managing it means keeping your information accurate, posting updates, uploading photos, and responding to reviews — all of which improve your visibility in local search.',
      },
      {
        q: 'How long before I see results?',
        a: 'Most businesses see improved Map Pack visibility within 30 to 60 days of consistent management. Review growth, regular posts, and photo updates signal to Google that your business is active and relevant.',
      },
      {
        q: 'What if I already have a Google Business Profile?',
        a: "We audit your existing profile, fix anything that's incomplete or incorrect, and take over ongoing management. Most profiles we inherit are missing key information or haven't been updated in months.",
      },
    ],
  },
  {
    slug: 'seo',
    name: 'SEO',
    shortName: 'SEO',
    price: '$797/mo',
    defaultIncludes: [
      'Keyword research and targeting',
      'On-page optimization (titles, meta, headers, schema)',
      'Local citation building (50+ directories)',
      'Google Maps optimization',
      'Monthly long-form blog content',
      'Authority link building',
      'Monthly rankings report',
    ],
    defaultFaqs: [
      {
        q: 'How long does SEO take to show results?',
        a: 'Most businesses see meaningful ranking improvements within 90 to 120 days. SEO compounds over time — the longer you maintain it, the stronger the results and the harder you are to displace.',
      },
      {
        q: "What's the difference between SEO and Google Ads?",
        a: 'Google Ads buys placement at the top of search results and stops when your budget does. SEO earns organic rankings that stay and compound. Most businesses benefit from both — ads for immediate lead flow, SEO for long-term authority.',
      },
      {
        q: 'Do you handle both website SEO and local SEO?',
        a: 'Yes. Our SEO service covers both on-page website optimization and local search optimization — ranking on Google Maps as well as in organic results.',
      },
    ],
  },
  {
    slug: 'google-ads',
    name: 'Google Ads Management',
    shortName: 'Google Ads',
    price: '$597/mo + spend',
    defaultIncludes: [
      'Campaign setup and structure',
      'Keyword research and negative keyword lists',
      'Ad copy writing and testing',
      'Bid strategy and budget management',
      'Conversion tracking setup',
      'Monthly performance report',
    ],
    defaultFaqs: [
      {
        q: 'How much should I spend on Google Ads?',
        a: 'We recommend $500–$1,000/month minimum in ad spend depending on your market and competition. Our $597/mo management fee covers strategy, optimization, and reporting. You control the spend budget.',
      },
      {
        q: 'How quickly can Google Ads generate leads?',
        a: 'Google Ads can generate leads within days of going live. The first 30 days involve a learning phase where we optimize toward the best-performing keywords and ad variations.',
      },
    ],
  },
  {
    slug: 'reputation-management',
    name: 'Reputation Management',
    shortName: 'Reputation Management',
    price: '$297/mo',
    defaultIncludes: [
      'Review request campaign setup',
      'Multi-platform monitoring (Google, Yelp, Facebook)',
      'Response templates and management',
      'Negative review strategy',
      'Monthly reputation report',
    ],
    defaultFaqs: [
      {
        q: 'Can you remove negative reviews?',
        a: "We can flag reviews that violate Google's policies for removal. For legitimate negative reviews, we help you respond professionally and build enough positive reviews that your overall rating accurately reflects your service quality.",
      },
      {
        q: 'How do you get more positive reviews?',
        a: 'We set up an automated review request campaign that asks happy customers to leave a review via text or email immediately after service. Most businesses see consistent new reviews within the first 30 days.',
      },
    ],
  },
  {
    slug: 'website-design',
    name: 'Website Design',
    shortName: 'Website Design',
    price: 'From $1,497',
    defaultIncludes: [
      'Custom design and development',
      'Mobile-first, fast-loading',
      'Contact forms and CTA setup',
      'Basic on-page SEO',
      'Google Analytics and tracking',
      'Hosting setup and launch',
    ],
    defaultFaqs: [
      {
        q: 'How long does a website build take?',
        a: 'A standard business website takes 2 to 4 weeks from kickoff to launch. Timeline depends on how quickly content, photos, and feedback are provided.',
      },
      {
        q: 'Do you build on WordPress?',
        a: "We build on the stack that best fits your needs — typically Astro or Next.js for performance-focused sites, or WordPress if you need a CMS you can update yourself.",
      },
    ],
  },
  {
    slug: 'social-media-ads',
    name: 'Instagram and Facebook Ads',
    shortName: 'Social Ads',
    price: '$497/mo + spend',
    defaultIncludes: [
      'Campaign strategy and setup',
      'Ad creative and copywriting',
      'Audience targeting and lookalikes',
      'A/B testing',
      'Retargeting campaigns',
      'Monthly performance report',
    ],
    defaultFaqs: [
      {
        q: "What's a realistic budget for social ads?",
        a: 'We recommend $300–$500/month minimum in ad spend. The management fee covers everything except the media buy. For most local Miami businesses, Instagram outperforms Facebook in engagement.',
      },
      {
        q: 'Do you create the ad images and videos?',
        a: 'Yes. Social ads include creative design and copywriting. For best results, we also use client-provided photos or videos of real work, staff, or before/after results.',
      },
    ],
  },
];

export const neighborhoods: Neighborhood[] = [
  {
    slug: 'brickell',
    name: 'Brickell',
    desc: "Miami's financial district and one of the fastest-growing urban cores in the country. High-income residents, young professionals, and a competitive market for premium services.",
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.7616,
    lng: -80.1917,
  },
  {
    slug: 'wynwood',
    name: 'Wynwood',
    desc: "Miami's arts and culture district, home to boutique businesses, galleries, and a mix of creative professionals and tourists. High foot traffic and strong social media presence.",
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.801,
    lng: -80.199,
  },
  {
    slug: 'coral-gables',
    name: 'Coral Gables',
    desc: 'An affluent, tree-lined community with high household incomes, Mediterranean-revival architecture, and a preference for established, trusted local businesses.',
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.7215,
    lng: -80.2683,
  },
  {
    slug: 'hialeah',
    name: 'Hialeah',
    desc: "Miami's second-largest city and the heart of Cuban-American culture in South Florida. A dense market of working families, small businesses, and Spanish-speaking consumers.",
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.8576,
    lng: -80.2781,
  },
  {
    slug: 'doral',
    name: 'Doral',
    desc: "One of Miami-Dade's fastest-growing business hubs with a large Venezuelan and Latin American population, significant corporate presence, and strong B2B opportunities.",
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.8195,
    lng: -80.3553,
  },
  {
    slug: 'kendall',
    name: 'Kendall',
    desc: 'A sprawling suburban market in southwest Miami-Dade with large residential footprint, family households, and strong demand for home services and professional services.',
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.6793,
    lng: -80.3173,
  },
  {
    slug: 'miami-beach',
    name: 'Miami Beach',
    desc: 'A world-famous destination with year-round tourism, luxury hospitality, and a premium consumer base. High competition, but high willingness to pay for quality.',
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.7907,
    lng: -80.13,
  },
  {
    slug: 'aventura',
    name: 'Aventura',
    desc: "An affluent city on Miami-Dade's northern edge known for luxury condos and a high concentration of wealth. A strong market for premium services.",
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.9565,
    lng: -80.1392,
  },
  {
    slug: 'coconut-grove',
    name: 'Coconut Grove',
    desc: "Miami's oldest neighborhood — waterfront, tree-canopied, and wealthy. A boutique market of established families and an appreciation for quality over price.",
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.7283,
    lng: -80.2433,
  },
  {
    slug: 'north-miami',
    name: 'North Miami',
    desc: 'A diverse, growing city with a mix of Haitian-American, Caribbean, and Latin communities. Strong demand for bilingual services and a growing small business ecosystem.',
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.8901,
    lng: -80.1867,
  },
  {
    slug: 'little-havana',
    name: 'Little Havana',
    desc: "The cultural heart of Miami's Cuban community along Calle Ocho. A dense, Spanish-speaking market with deep community ties and strong word-of-mouth networks.",
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.7717,
    lng: -80.2188,
  },
  {
    slug: 'homestead',
    name: 'Homestead',
    desc: "A fast-growing agricultural and residential city at Miami-Dade's southern edge. Home to a large Hispanic workforce and a rapidly expanding housing market.",
    citySlug: 'miami',
    cityName: 'Miami',
    lat: 25.4687,
    lng: -80.4776,
  },
];

export const verticals: Vertical[] = [
  {
    slug: 'contractors',
    name: 'Contractors',
    singular: 'Contractor',
    pillarHeadline: 'Contractor Marketing in Miami That Keeps Your Calendar Full',
    pillarLead: "Your best clients have always come from referrals. But referrals have a ceiling — and a ceiling means your growth is capped. We build the digital pipeline that brings qualified homeowners and project managers to you directly from Google.",
    problemHeadline: 'Word-of-Mouth Has a Ceiling. Google Does Not.',
    problemBody: "Referrals are unpredictable. They slow down in slow seasons and stop when your network gets tapped out. Meanwhile, homeowners in Miami are searching Google right now for exactly what you do — roof repair, bathroom renovation, electrical work, plumbing, general contracting — and clicking the first three results. If you are not there, that job goes to someone else.",
    stats: [
      { num: '97%', label: 'of consumers search online before hiring a contractor', accent: false },
      { num: '3', label: "results in Google's local pack capture most clicks on contractor searches", accent: true },
      { num: '76%', label: 'of people who search for a local service visit or contact a business within 24 hours', accent: false },
      { num: '$0', label: 'wasted on vague branding — every dollar targets homeowners actively searching for your trade', accent: true },
    ],
    faqs: [
      {
        q: 'How do I get more leads as a contractor in Miami?',
        a: "The fastest path is a fully optimized Google Business Profile — this gets you into the Google Maps local pack. Pair that with consistent reviews and you'll see lead volume increase within 30 to 60 days. SEO and Google Ads add volume on top of that foundation.",
      },
      {
        q: 'Do Google Ads work for contractors?',
        a: 'Yes — especially for high-intent searches like "emergency plumber Miami" or "roof repair near me." The key is a tight campaign structure targeting service-specific keywords. Broad campaigns burn budget. Tight ones generate jobs.',
      },
      {
        q: 'How important are Google reviews for contractors?',
        a: 'Critical. Most homeowners check reviews before calling anyone. A contractor with 50+ reviews at 4.8 stars will get more calls than a competitor with 5 reviews at 5 stars. We help you build a consistent review flow from every job you complete.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Contractors',
        lead: 'When a homeowner searches "contractor near me" in Miami, Google shows three businesses in the Map Pack. We get you into that pack and keep you there.',
        problem: "Most contractor GBP listings are incomplete, outdated, or invisible in the local pack. Missing photos, unanswered reviews, and inconsistent information cost you rankings and credibility before a homeowner ever calls.",
        includes: [
          'Profile optimization for contractor-specific categories',
          'Before/after project photos uploaded weekly',
          'Review response within 24 hours',
          'Service area setup for all Miami neighborhoods you cover',
          'Google Posts with project showcases and seasonal offers',
          'Monthly ranking and visibility report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Contractors',
        lead: 'Rank on page one when homeowners search for your trade in their Miami neighborhood.',
        problem: 'Homeowners search by trade and location: "roofer in Kendall," "licensed electrician Coral Gables," "bathroom remodel contractor Miami." If your website does not rank for these terms, you do not exist online.',
        includes: [
          'Trade-specific keyword targeting (roofing, electrical, plumbing, HVAC, etc.)',
          'Neighborhood landing pages for Miami areas you serve',
          'On-page optimization for each service page',
          'Local citation building across 50+ directories',
          'Google Maps optimization aligned with your website',
          'Monthly rankings and traffic report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Contractors',
        lead: 'Capture homeowners at the exact moment they need you — emergency repair searches, renovation planning, seasonal projects.',
        problem: 'Contractor searches on Google have some of the highest commercial intent of any industry. Someone searching "water heater repair Miami" needs help today. If you are not in the top results, you are not in the conversation.',
        includes: [
          'Search campaigns targeting trade-specific and emergency keywords',
          'Negative keywords to eliminate low-quality clicks',
          'Call tracking for phone leads',
          'Conversion tracking for form submissions',
          'Seasonal budget adjustments for peak seasons',
          'Monthly ROI and lead quality report',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Contractors',
        lead: 'Homeowners check reviews before they call. A steady stream of 5-star reviews on Google turns browsers into booked jobs.',
        problem: 'Most contractors do great work but never ask for reviews. A competitor with more reviews and a lower star rating wins the call over you. Your reputation should reflect the quality of your work.',
        includes: [
          'Post-job review request via text and email',
          'Google review monitoring and alerts',
          'Professional response to all reviews',
          'Yelp and BBB monitoring',
          'Monthly review growth report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Contractors',
        lead: 'A site that shows your work, loads fast on mobile, and turns visitors into inquiry calls.',
        problem: "Most contractor websites are generic, slow, and mobile-unfriendly. When a homeowner lands on your site and it looks amateur, they bounce and call the competitor.",
        includes: [
          'Mobile-first design built for contractor leads',
          'Project gallery with before/after photos',
          'Service pages for each trade you offer',
          'Contact form, click-to-call, and quote request',
          'Basic on-page SEO structure',
          'Fast hosting setup',
        ],
      },
    },
  },
  {
    slug: 'cleaning-services',
    name: 'Cleaning Services',
    singular: 'Cleaning Company',
    pillarHeadline: 'Marketing for Miami Cleaning Companies That Attracts the Clients You Actually Want',
    pillarLead: "The Miami cleaning market is saturated. Competing on price is a race to the bottom. We help cleaning companies build the online presence that attracts higher-value residential and commercial clients from Google.",
    problemHeadline: 'You Do the Work. They Find the Competition.',
    problemBody: "There are hundreds of cleaning companies in Miami. Most of them have the same website, the same Google listing, and the same generic description. The ones winning premium residential clients have more reviews, better photos, and show up first in local search. We close that gap.",
    stats: [
      { num: '4.7★', label: 'average Google rating needed to consistently win inquiries over competitors in the Miami cleaning market', accent: true },
      { num: '3x', label: 'more inquiries generated by cleaning companies with 50+ Google reviews vs. those with fewer than 10', accent: false },
      { num: '2 min', label: 'average time a potential client spends deciding whether to contact a cleaning company based on their Google listing', accent: true },
      { num: '#1', label: 'factor homeowners cite when choosing a cleaning service: verified reviews from people in their area', accent: false },
    ],
    faqs: [
      {
        q: 'How do I stand out from other cleaning companies in Miami?',
        a: 'Reviews and Google Business Profile optimization are the two moves with the biggest payoff. A cleaning company with 80 verified reviews, professional photos, and an active GBP will win over a competitor with a better website but no social proof.',
      },
      {
        q: 'Should I advertise on Google for cleaning services?',
        a: 'Google Ads work well targeting specific searches like "house cleaning Miami" or "office cleaning Brickell." The key is tracking cost per lead and ensuring your booking rate justifies the spend.',
      },
      {
        q: 'How long before my cleaning company starts showing up in local search?',
        a: 'With GBP optimization, most clients see improved map visibility within 30 to 60 days. SEO improvements take 90 to 120 days to show ranking movement. Both compound over time.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Cleaning Companies',
        lead: 'The Map Pack is where cleaning clients find you. We optimize and maintain your GBP so your company appears when Brickell and Coral Gables homeowners search for cleaning services.',
        problem: 'Most cleaning company GBP listings are sparse: no photos, few reviews, no service descriptions. Google rewards complete, active listings. A competitor who posts weekly and has 60 reviews will outrank you even if you have been in business longer.',
        includes: [
          'Service category optimization for residential and commercial cleaning',
          'Professional photos and recurring photo updates',
          'Review request follow-up system',
          'Response to all incoming reviews',
          'Weekly posts highlighting services and seasonal offers',
          'Monthly Map Pack ranking report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Cleaning Services',
        lead: 'Rank for the searches that bring you residential and commercial cleaning clients — by neighborhood, by service type, by the exact terms your ideal clients use.',
        problem: 'Cleaning company websites are often generic and untargeted. Ranking for "house cleaning Miami Beach" or "commercial cleaning Doral" requires specific on-page signals that most cleaning company sites are missing.',
        includes: [
          'Location-specific service pages for Miami neighborhoods',
          'Keyword targeting for residential, commercial, and specialty cleaning',
          'On-page optimization and schema markup',
          'Citation building across cleaning-relevant directories',
          'Monthly organic traffic and ranking report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Cleaning Companies',
        lead: 'Capture high-intent searches for cleaning services in the Miami neighborhoods you serve.',
        problem: 'Cleaning service searches like "house cleaning near me" and "move-out cleaning Miami" have high commercial intent. Without paid visibility, new competitors can outspend you quickly.',
        includes: [
          'Service-specific ad campaigns (residential, commercial, move-out, deep clean)',
          'Neighborhood targeting by zip code and area',
          'Call and form conversion tracking',
          'Competitor bidding analysis',
          'Monthly lead cost analysis and optimization',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Cleaning Companies',
        lead: 'Reviews are the #1 decision factor for cleaning clients. We build your reputation systematically so new clients see social proof before they ever call.',
        problem: 'Happy cleaning clients rarely leave reviews on their own. An automated post-service follow-up captures reviews while satisfaction is high — consistently.',
        includes: [
          'Automated post-cleaning review request via SMS and email',
          'Google, Yelp, and Nextdoor monitoring',
          'Response drafts for all review types',
          'Monthly review growth report and rating trend',
        ],
      },
    },
  },
  {
    slug: 'landscaping',
    name: 'Landscaping',
    singular: 'Landscaping Company',
    pillarHeadline: 'Marketing for Miami Landscapers That Books You Through Every Season',
    pillarLead: "Miami's year-round growing season means there is no real off-season — but there are slow months. We build the digital pipeline that turns consistent Google traffic into scheduled jobs before your calendar empties.",
    problemHeadline: 'The Season Slows. Your Overhead Does Not.',
    problemBody: "Lawn maintenance keeps the phones ringing in season. But landscape design projects, irrigation installs, and premium accounts are won by whoever shows up first when a homeowner decides to invest. In Miami, that decision happens online. The landscaping company with the best Google presence gets the call.",
    stats: [
      { num: '#1', label: 'source for landscaping referrals has shifted from word-of-mouth to Google searches over the past five years', accent: false },
      { num: '68%', label: 'of homeowners search online before deciding which landscaping company to call, even when a neighbor recommended one', accent: true },
      { num: '5x', label: 'more project inquiries generated by landscaping companies in the Google Map Pack vs. page two', accent: false },
      { num: '12 mo', label: 'of year-round booking potential in Miami — the city that never stops growing', accent: true },
    ],
    faqs: [
      {
        q: 'How do I get more landscaping clients in Miami?',
        a: 'Start with your Google Business Profile. Landscaping is highly visual — photos of completed projects are the single most powerful conversion tool. A GBP with 40+ photos of real Miami yards and consistent reviews will generate more inbound calls than most paid advertising.',
      },
      {
        q: 'Should a landscaping company run Google Ads?',
        a: 'Google Ads work well for higher-ticket services like landscape design, irrigation systems, or sod installation. For weekly lawn maintenance, the economics are tighter — we help you determine where paid spend makes sense based on your service mix.',
      },
      {
        q: 'How do reviews affect my landscaping business?',
        a: 'Reviews are the primary trust signal for homeowners hiring a landscaping company. Most clients will not call a company with fewer than 10 reviews. We automate the review request process so every satisfied client becomes a public endorsement.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Landscapers',
        lead: 'Miami homeowners searching for a landscaping company look at photos first, reviews second. We make sure your GBP shows exactly what your best work looks like.',
        problem: 'Landscaping is one of the most visual service categories on Google. A GBP with blurry, inconsistent photos and no recent posts loses to competitors whose listings showcase project galleries of real Miami yards.',
        includes: [
          'Project photo uploads with before/after formatting',
          'Category optimization for lawn care, landscape design, irrigation',
          'Service area coverage for Miami-Dade neighborhoods',
          'Review request after every project completion',
          'Seasonal posts highlighting Miami-specific services',
          'Monthly Map Pack visibility report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Landscaping Companies',
        lead: 'Rank for the searches that bring premium landscaping clients to you — design projects, irrigation installs, and high-value maintenance accounts by Miami neighborhood.',
        problem: 'Most landscaping websites rank for nothing specific. Targeting "landscaping Kendall" or "lawn service Coral Gables" requires neighborhood-specific pages and content that generic sites do not have.',
        includes: [
          'Neighborhood landing pages for all Miami areas served',
          'Keyword targeting for design, maintenance, and specialty services',
          'On-page optimization for service-specific pages',
          'Citation building in home services directories',
          'Monthly organic ranking report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Landscaping Companies',
        lead: 'Capture the homeowners in your service area who are actively planning a landscaping project right now.',
        problem: 'Homeowners planning a landscaping project often search 3 to 5 times before calling anyone. Google Ads puts you at the top of every one of those searches during the decision window.',
        includes: [
          'Campaign targeting for design, installation, and maintenance keywords',
          'Geo-targeting by Miami neighborhood',
          'Seasonal campaign adjustments',
          'Lead tracking (calls and form submissions)',
          'Monthly lead quality and ROI report',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Landscapers',
        lead: 'A stream of 5-star reviews from real Miami homeowners is the most credible sales tool a landscaping company can have.',
        problem: 'Happy landscaping clients are satisfied in their yards, not on their phones leaving reviews. A structured post-service request system captures that satisfaction while it is fresh.',
        includes: [
          'Automated review request after project completion',
          'Google and Nextdoor monitoring for new reviews',
          'Response to all reviews within 24 hours',
          'Monthly reputation growth report',
        ],
      },
    },
  },
  {
    slug: 'moving-companies',
    name: 'Moving Companies',
    singular: 'Moving Company',
    pillarHeadline: 'Marketing for Miami Moving Companies That Wins the Booking Before They Call Anyone Else',
    pillarLead: "Moving searches are among the highest-intent queries on Google. Someone searching 'local movers Miami' has already decided to move. They need a company today. We make sure that company is you.",
    problemHeadline: 'High Intent. Short Window. One Chance.',
    problemBody: "Moving decisions are made fast. A homeowner with a move date picks from the top 3 results on Google, checks reviews, and calls the first one that looks credible. If you are not in that pack or your reviews are sparse, you are invisible for that booking. Miami moves year-round. The opportunity is constant.",
    stats: [
      { num: '72%', label: 'of moving customers book within 72 hours of starting their Google search', accent: true },
      { num: '4.5★+', label: 'average rating needed to compete effectively for residential moving jobs in Miami', accent: false },
      { num: '85%', label: 'of moving leads in competitive markets come from Google Maps local pack and Google Ads', accent: true },
      { num: '$0', label: 'spent on vague advertising — every campaign targets people actively planning a move in your service area', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more moving jobs in Miami?',
        a: 'Google Business Profile optimization and Google Ads are the two fastest levers. Moving searches have extremely high intent. A well-managed GBP with strong reviews and a targeted Ads campaign can generate consistent bookings.',
      },
      {
        q: 'How do reviews impact a moving company?',
        a: 'Reviews are everything for moving companies. Moving is a high-anxiety purchase — customers are trusting you with everything they own. A company with 100+ reviews and 4.7+ stars will get significantly more calls than one with 20 reviews, even if rates are similar.',
      },
      {
        q: "What's the best way to market a new moving company in Miami?",
        a: 'Start with Google Business Profile setup and an immediate review acquisition campaign from your early jobs. Pair that with Google Ads targeting your service area. This builds both short-term lead volume and the long-term organic presence that compounds over time.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Moving Companies',
        lead: 'The Map Pack is where Miami residents find a mover. We optimize your GBP so you appear for the highest-volume moving searches in Miami-Dade.',
        problem: 'Moving company GBP listings need to signal trust immediately: photos of wrapped furniture, positive reviews, clear service descriptions. A sparse or outdated listing loses bookings to competitors who look more credible.',
        includes: [
          'Moving company category and attribute optimization',
          'Photo uploads of vehicles, team, and completed moves',
          'Service area coverage across Miami-Dade and Broward',
          'Review acquisition campaign setup',
          'Consistent weekly posts',
          'Monthly visibility and ranking report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Moving Companies',
        lead: 'Own the organic rankings for Miami moving searches so you capture bookings from people who are planning ahead, not just in an emergency.',
        problem: 'Most moving company websites are generic. Ranking for "moving company Miami Beach" or "local movers Coral Gables" requires neighborhood-specific pages that most moving sites lack entirely.',
        includes: [
          'Neighborhood landing pages for Miami areas you serve',
          'Keyword targeting for local, long-distance, and specialty moves',
          'On-page SEO for service pages',
          'Citation building in moving and home services directories',
          'Monthly organic rankings report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Moving Companies',
        lead: 'Capture moving inquiries at the exact moment someone is deciding which company to call — before your competitors do.',
        problem: 'Moving searches spike around the first and last of the month and during peak season. A well-structured Google Ads campaign targets these windows and captures leads your competitors miss.',
        includes: [
          'Search campaigns for local, residential, and commercial moving',
          'Geo-targeting by neighborhood and county',
          'Call tracking and booking form conversion setup',
          'Negative keywords to eliminate time-wasters',
          'Monthly cost-per-lead analysis and optimization',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Moving Companies',
        lead: 'Moving clients are anxious buyers. The company with the most credible review profile wins the booking. We build that profile for you.',
        problem: 'After a successful move, clients are relieved and happy — but they rarely leave reviews without a prompt. Our automated post-move follow-up captures reviews while satisfaction is highest.',
        includes: [
          'Automated post-move review request (SMS and email)',
          'Google and Yelp monitoring',
          'Professional response to negative reviews',
          'Review growth tracking and monthly report',
        ],
      },
    },
  },
  {
    slug: 'dentists',
    name: 'Dentist Offices',
    singular: 'Dental Office',
    pillarHeadline: 'Marketing for Miami Dental Offices That Attracts the Patients You Want to Serve',
    pillarLead: "Not all dental patients are equal. We help Miami dental practices attract more cosmetic, implant, and private-pay patients — and fewer low-margin cases — through targeted online marketing.",
    problemHeadline: 'You Can Fill Chairs. The Question Is Which Patients Fill Them.',
    problemBody: "Most dental practices in Miami market to everyone and attract whoever shows up. The most profitable practices are specific: they know which procedures they want to grow, they target patients who value those procedures, and they have the online presence that attracts exactly that type of person. Google is where that targeting starts.",
    stats: [
      { num: '77%', label: 'of patients check online reviews before choosing a dentist, even when referred by a friend or family member', accent: false },
      { num: '3x', label: 'higher average case value for cosmetic and implant patients acquired through targeted Google Ads vs. generic marketing', accent: true },
      { num: '4.8★', label: "minimum average rating to compete for premium cosmetic patients in Miami's affluent neighborhoods", accent: false },
      { num: '62%', label: 'of new dental patients in competitive markets come from Google Maps and organic search — not word of mouth', accent: true },
    ],
    faqs: [
      {
        q: 'How do I attract more cosmetic dental patients in Miami?',
        a: 'Google Ads targeting cosmetic procedure searches paired with a strong Google Business Profile and a website that showcases before/after results. Cosmetic patients are high-intent and willing to pay — they just need to find you and trust what they see.',
      },
      {
        q: 'Should dental practices use social media ads?',
        a: 'Instagram and Facebook ads work well for cosmetic dentistry, especially for visual procedures. Before/after content and patient testimonials perform strongly. We combine social ads with retargeting to capture patients who visited your website but did not book.',
      },
      {
        q: 'How important is reputation management for a dental practice?',
        a: 'Extremely. A practice with fewer than 50 reviews or a rating below 4.7 will lose new patients to competitors, even if your clinical quality is superior. We systematically build your review volume from every patient visit.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Dental Offices',
        lead: 'When a Miami resident searches "dentist near me" or "cosmetic dentist Coral Gables," your practice needs to be in the top three. We manage your GBP to keep you there.',
        problem: 'Dental GBP listings need to communicate trust, cleanliness, and specialization immediately. Photos of your office, staff, and specific procedures — plus a steady stream of verified patient reviews — separate the top-ranking practices from the rest.',
        includes: [
          'Specialty and procedure attribute optimization',
          'Office interior and staff photos uploaded monthly',
          'Patient review request system setup',
          'Response to all reviews (HIPAA-compliant)',
          'Service area and hours accuracy management',
          'Monthly visibility and inquiry report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Dental Offices',
        lead: 'Rank for the procedures you want to grow: implants in Coral Gables, veneers in Brickell, Invisalign in Aventura. Not just "dentist near me."',
        problem: 'Generic dental SEO ranks you for generic searches. Procedure-specific and neighborhood-specific SEO ranks you for high-value searches from patients who already know what they want and are ready to book.',
        includes: [
          'Procedure-specific keyword targeting (implants, veneers, cosmetic, orthodontics)',
          'Neighborhood landing pages for Miami areas you serve',
          'On-page optimization for each service page',
          'Citation building in dental and healthcare directories',
          'Monthly rankings and patient acquisition report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Dental Offices',
        lead: 'Capture patients searching for specific dental procedures in your Miami neighborhood — before they find your competitor.',
        problem: 'Dental Google Ads work when built around procedures, not just "dentist." A patient searching "dental implants Brickell" is worth 10x what a generic "dentist Miami" search is worth. We structure campaigns around your highest-margin procedures.',
        includes: [
          'Procedure-specific campaigns (implants, cosmetic, emergency, pediatric)',
          'Neighborhood geo-targeting',
          'Call tracking and new patient form setup',
          'Competitor bidding strategy',
          'Monthly cost-per-new-patient analysis',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Dental Offices',
        lead: 'Patients check reviews before booking. A practice with 150 verified reviews at 4.9 stars converts new patient inquiries at a significantly higher rate than one with 30.',
        problem: 'Dental patients experience anxiety — they need more social proof than almost any other service category before making an appointment. Building review volume is a systematic process, not a passive hope.',
        includes: [
          'HIPAA-compliant post-appointment review request',
          'Google and Healthgrades monitoring',
          'Professional response templates for all review types',
          'Monthly review growth and reputation score report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Dental Offices',
        lead: 'A dental website that converts: fast, mobile-first, with procedure pages, before/after galleries, and booking integration.',
        problem: "Many dental practice websites are slow, template-based, and don't convert visitors into appointment requests. In a competitive Miami market, a premium-looking website that loads in 2 seconds is a competitive advantage.",
        includes: [
          'Procedure landing pages for each service you offer',
          'Before/after photo gallery',
          'Online booking integration or appointment request form',
          'Patient testimonial section',
          'Mobile-optimized for on-the-go searches',
          'SEO-ready page structure',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami Dental Offices',
        lead: 'Show Miami residents your cosmetic results where they are already scrolling — and bring them back to your site if they do not book the first time.',
        problem: 'Cosmetic dentistry is highly visual. Before/after photos on Instagram and Facebook stop scrollers in a way that search ads cannot. Social ads extend your reach to patients who are not actively searching yet.',
        includes: [
          'Before/after creative campaigns (teeth whitening, veneers, Invisalign)',
          'Retargeting for website visitors who did not book',
          'Lookalike audiences based on your best patients',
          'Appointment inquiry form ads',
          'Monthly performance and patient acquisition report',
        ],
      },
    },
  },
  {
    slug: 'medspas',
    name: 'Med Spas',
    singular: 'Med Spa',
    pillarHeadline: 'Med Spa Marketing Agency in Miami That Turns Browsers Into Booked Appointments',
    pillarLead: "We are a Miami-focused med spa marketing agency building the medical spa SEO, social, and reputation system that keeps treatment rooms booked with high-intent clients. Treatment-specific pages for every Miami neighborhood you serve.",
    problemHeadline: 'Likes Do Not Pay the Rent. Bookings Do.',
    problemBody: "Most med spas in Miami have great Instagram pages and empty appointment slots. Social media builds awareness. Google drives intent. Reviews build trust. When all three are working together, you stop depending on the algorithm and start building a pipeline that fills your calendar every week.",
    stats: [
      { num: '89%', label: 'of med spa clients research online before booking their first treatment — even if a friend recommended the practice', accent: false },
      { num: '$240B', label: 'global medical aesthetics market projected size by 2030, with South Florida one of the fastest-growing markets', accent: true },
      { num: '4.9★', label: 'the review threshold at which Miami med spas see significantly higher conversion on new client inquiries', accent: false },
      { num: '3x', label: 'higher ROI from Google Search Ads vs. display-only campaigns for specific treatment searches like "botox Miami"', accent: true },
    ],
    faqs: [
      {
        q: 'What marketing works best for a med spa in Miami?',
        a: 'Instagram and Facebook ads for visual treatment results, Google Business Profile for local search visibility, and reputation management to build the reviews that convert curious browsers into first-time clients. The most effective programs use all three together.',
      },
      {
        q: 'How do I compete with larger med spas that have bigger budgets?',
        a: 'Hyperlocal targeting is your edge. A boutique med spa in Wynwood that dominates "botox Wynwood" and "filler Wynwood" can outperform a larger chain that spreads budget across all of Miami.',
      },
      {
        q: 'How important are reviews for a med spa?',
        a: 'Critical. Med spa clients are making aesthetic decisions — they trust peer reviews far more than advertising. A consistent review acquisition strategy turns every satisfied client into a public endorsement.',
      },
    ],
    services: ['google-business-profile', 'seo', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Med Spas',
        lead: 'When someone in Brickell or Coral Gables searches "botox near me" or "medspa in Miami," your practice needs to appear first. We optimize and maintain your GBP to keep you in the local pack.',
        problem: 'Med spa GBP listings that show beautiful treatment photos, specific service menus, and 100+ verified reviews dominate local search over competitors with generic listings.',
        includes: [
          'Treatment-specific category and attribute setup',
          'High-quality treatment and facility photo uploads',
          'Service menu with pricing where appropriate',
          'Review acquisition from every client visit',
          'Weekly posts highlighting treatments and results',
          'Monthly Map Pack ranking report',
        ],
      },
      seo: {
        pageTitle: 'Med Spa SEO Agency Miami | Thryv Marketing Solutions',
        pageDesc: 'Med spa SEO agency in Miami building treatment-specific pages and neighborhood content that rank for botox, filler, and laser searches. $797/mo, no contracts.',
        headline: 'Med Spa SEO Agency Built for Miami Treatment Searches',
        lead: 'Rank for the queries that actually book treatments: botox Miami Beach, filler Brickell, laser hair removal Coral Gables, microneedling Wynwood. We build the procedure-specific pages and neighborhood content that beat generic med spa websites.',
        problem: 'Treatment-specific searches in Miami have high commercial intent and very low keyword difficulty in the right neighborhoods. A client searching "botox Miami Beach" is ready to book — but ranking requires procedure-by-neighborhood landing pages most med spa websites do not have. We build that programmatic structure, then layer in the citations and reviews that lift you into the local pack.',
        includes: [
          'Med spa SEO strategy mapped to your specific treatment menu',
          'Treatment-specific landing pages (botox, filler, laser hair removal, microneedling, coolsculpting)',
          'Miami neighborhood pages (Brickell, Coral Gables, Wynwood, Miami Beach, Coconut Grove, plus 7 more)',
          'On-page optimization for each treatment + neighborhood combination',
          'Medical spa directory citations and RealSelf profile optimization',
          'Local SEO + Google Maps optimization for "med spa near me" intent',
          'Monthly organic traffic, ranking, and competitor gap report',
        ],
        faqs: [
          {
            q: 'How is med spa SEO different from regular SEO?',
            a: 'Med spa SEO hinges on treatment-specific intent, not generic service queries. A client searching "botox Miami Beach" is comparing providers and ready to book; a client searching "med spa marketing" is researching how to grow their business. The pages, schema, and review signals that rank for each are very different. We optimize for treatment + neighborhood combinations because that is where med spa demand actually lives.',
          },
          {
            q: 'How long does med spa SEO take to show results in Miami?',
            a: 'For treatment-specific neighborhood pages (e.g., "botox Miami Beach"), we typically see first-page rankings within 60 to 120 days because keyword difficulty is genuinely low in well-defined Miami neighborhoods. Broader head terms like "med spa Miami" take 6 to 12 months because the local pack is mature and review-driven.',
          },
          {
            q: 'How much does med spa SEO cost in Miami?',
            a: 'Our med spa SEO service is $797/mo with no contracts, which includes monthly long-form content and authority link building alongside the AI-search foundation. National med spa SEO agencies typically charge $999 to $1,999/mo per PatientGain\'s public pricing page. We keep ours lower because we are Miami-focused, founder-led, and selectively taking on Founding Clients to build case studies.',
          },
          {
            q: 'What treatments does med spa SEO work best for?',
            a: 'Treatments with both high search volume and high commercial intent: botox, filler, laser hair removal, coolsculpting, microneedling, and chemical peels. We start with whatever menu items have the strongest revenue per treatment, then expand to longer-tail procedures over months 3 to 6.',
          },
          {
            q: 'Do you handle Google Business Profile too, or just website SEO?',
            a: 'Both. Med spa SEO without Google Business Profile optimization is a wasted spend because most "near me" and treatment-specific searches in Miami trigger the local pack. We optimize your website and your GBP listing in parallel, with one strategy across both.',
          },
          {
            q: 'How is Thryv different from other med spa SEO agencies?',
            a: 'Most med spa SEO agencies are national and treat Miami as one zip code. We build neighborhood-specific pages for Brickell, Coral Gables, Wynwood, Miami Beach, and eight more. We also use our own AI-assisted content workflow that lets a small team produce neighborhood-by-treatment pages at scale without sacrificing copy quality. Most national agencies cannot match this geographic depth without doubling their pricing.',
          },
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Med Spas',
        lead: 'New med spa clients check reviews more carefully than almost any other category. Building a consistent 5-star review volume is the highest-ROI investment you can make.',
        problem: 'Happy med spa clients leave feeling great but rarely think to leave a review. A systematic post-visit follow-up captures that satisfaction consistently.',
        includes: [
          'Post-treatment review request via SMS',
          'Google, RealSelf, and Yelp monitoring',
          'Response to all reviews within 24 hours',
          'Negative review response strategy',
          'Monthly reputation score and review growth report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Med Spas',
        lead: 'A premium website that matches your treatment quality: visual, fast, with treatment galleries, booking integration, and before/after results.',
        problem: 'Med spa clients judge a practice by its website before they ever visit. A dated or generic site signals a dated, generic practice. In a Miami market this competitive, your website is your first impression.',
        includes: [
          'Treatment landing pages with before/after galleries',
          'Online booking or consultation request form',
          'Provider credentials and bio pages',
          'FAQ section addressing common treatment concerns',
          'Mobile-optimized for Instagram link-in-bio traffic',
          'Fast hosting and performance optimization',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami Med Spas',
        lead: "Show Miami's Instagram audience your best treatment results where they are already scrolling — and convert them into first-time clients.",
        problem: "Med spa treatments are inherently visual. Before/after photos and video content on Instagram perform exceptionally well for med spas in Miami — especially targeting the 25–45 demographic that makes up the majority of aesthetic treatment clients.",
        includes: [
          'Before/after treatment ad campaigns',
          'Seasonal treatment promotions',
          'Retargeting for website visitors and profile engagers',
          'Lookalike audiences from your client list',
          'Story and reel ad formats',
          'Monthly booking conversion report',
        ],
      },
    },
  },
  {
    slug: 'yacht-services',
    name: 'Yacht Services',
    singular: 'Yacht Service Company',
    pillarHeadline: 'Marketing for Miami Yacht Services That Reaches Owners Before They Call Anyone Else',
    pillarLead: "Miami has one of the largest private yacht fleets in the world. Yacht owners and charter managers have high standards, do their research online, and value trust above all else. We build the digital presence that puts you first.",
    problemHeadline: 'The Best Marine Companies Get Found by the Right Owners.',
    problemBody: "Miami's marine market runs on reputation and referrals — but increasingly, yacht owners and property managers search Google before calling anyone. Whether it is mechanical service, detailing, charter management, or brokerage, the companies that rank first and have the strongest reviews get the first call.",
    stats: [
      { num: '1,200+', label: 'registered vessels in Miami-Dade marinas, representing a concentrated market of high-value marine service clients', accent: false },
      { num: '$8.4B', label: 'Florida marine industry contribution to the state economy — the largest in the country', accent: true },
      { num: '3.1M', label: 'registered recreational vessels in Florida, with South Florida accounting for the highest concentration per capita', accent: false },
      { num: '82%', label: 'of marine service clients now use Google to research providers before making contact', accent: true },
    ],
    faqs: [
      {
        q: 'How do I market a yacht service company in Miami?',
        a: 'Google Business Profile optimization is essential for local visibility. Pair that with a professional website that showcases your work — yacht owners research thoroughly, and a strong web presence signals the professionalism that matches your service quality.',
      },
      {
        q: 'Do SEO and Google Ads work for marine businesses?',
        a: 'Yes, especially for specific search terms: "yacht detailing Miami," "diesel yacht mechanic Miami Beach," "marina storage Coconut Grove." These searches have high commercial intent from owners who know what they need.',
      },
      {
        q: 'What makes yacht service marketing different from other industries?',
        a: 'Yacht owners are high-value clients with high trust requirements. Your marketing needs to signal expertise, experience, and reliability. Photos of your actual work, certifications, and verified reviews carry far more weight than generic advertising.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'website-design', 'reputation-management'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Yacht Services',
        lead: 'When a yacht owner in Coconut Grove or Miami Beach searches for a marine service provider, your business needs to appear first with the credibility that matches your work.',
        problem: 'Marine service companies with complete GBP listings — professional photos, specific service categories, and verified client reviews — consistently win the search result over competitors with incomplete or generic profiles.',
        includes: [
          'Marine service category and specialty setup',
          'Photo uploads of vessels serviced and work performed',
          'Review acquisition from boat owners and marina managers',
          'Service area setup for Miami-area marinas and waterways',
          'Monthly Map Pack visibility report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Yacht Services',
        lead: "Own the search rankings for the marine services you offer in Miami's key marina locations.",
        problem: 'Marine service searches are specific and high-value: "yacht mechanic Coconut Grove," "boat detailing Miami Beach," "charter yacht Miami." Ranking for these terms requires service-specific content built for Miami\'s marine market.',
        includes: [
          'Marine service keyword targeting by specialty',
          'Marina location and neighborhood pages',
          'On-page optimization for each service',
          'Marine industry citation building',
          'Monthly search traffic and ranking report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Yacht Services',
        lead: 'Reach Miami yacht owners at the moment they decide they need a marine service provider.',
        problem: 'Marine service searches have high commercial intent but moderate search volume. A targeted Google Ads campaign ensures you capture every relevant search in your service area without wasting spend on irrelevant clicks.',
        includes: [
          'Marine service-specific keyword campaigns',
          'Geo-targeting around Miami marinas and waterfront neighborhoods',
          'Call and form tracking',
          'Negative keyword management',
          'Monthly ROI and lead quality report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Yacht Services',
        lead: 'A professional marine service website that signals expertise, shows your work, and converts yacht owner visits into inquiries.',
        problem: "Yacht owners are discerning. A dated or generic website is disqualifying before they ever read your services. A professional site with real photos of your work and clear service descriptions is a prerequisite for earning the inquiry.",
        includes: [
          'Service pages for each marine specialty you offer',
          'Photo gallery of vessels and completed work',
          'Certifications and credentials display',
          'Inquiry and estimate request forms',
          'Mobile-optimized for on-the-dock searches',
        ],
      },
    },
  },
  {
    slug: 'real-estate-agents',
    name: 'Real Estate Agents',
    singular: 'Real Estate Agent',
    pillarHeadline: 'Marketing for Miami Real Estate Agents That Makes You the First Call in Your Farm Area',
    pillarLead: "Miami's real estate market is one of the most competitive in the country. The agents winning in this market own specific neighborhoods in search before someone else does. We build that ownership.",
    problemHeadline: 'Zillow Has Your Listing. Google Can Have Your Brand.',
    problemBody: "Most Miami real estate agents rely on Zillow, referrals, and open houses. These channels are rented — someone else controls them and takes a cut. Agents who own their neighborhood in Google search and have a strong personal brand convert leads at higher rates, without paying platform fees.",
    stats: [
      { num: '95%', label: 'of homebuyers use the internet during their search process — most starting on Google before going to Zillow', accent: true },
      { num: '43%', label: 'of buyers found their agent through a personal referral — but most then verified the agent online before making contact', accent: false },
      { num: '26%', label: 'of buyers and sellers started their agent search on Google, bypassing listing portals entirely', accent: true },
      { num: '1st', label: 'page Google ranking for "[neighborhood] real estate agent" drives far more direct contact than any portal listing', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more real estate leads in Miami?',
        a: 'The highest-ROI approach for individual agents is neighborhood SEO and a strong Google Business Profile. Rank for "[your target neighborhood] real estate agent" and you capture buyers and sellers who are actively looking — without competing on Zillow with 50 other agents.',
      },
      {
        q: 'Do social media ads work for real estate agents?',
        a: 'Yes — especially for listing promotion and building local name recognition in your target neighborhood. Instagram and Facebook ads for new listings, market updates, and neighborhood content position you as the local expert.',
      },
      {
        q: 'Should real estate agents invest in a personal website?',
        a: "Yes. Your brokerage website does not rank for your name or your target neighborhood — you need your own property. A personal site with neighborhood guides, market data, and your transaction history builds the SEO authority that generates direct leads over time.",
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Real Estate Agents',
        lead: 'When buyers and sellers search for a real estate agent in your neighborhood, your GBP is often their first impression. We make it a strong one.',
        problem: 'Most real estate agents have a GBP that looks inactive. An agent GBP with recent client reviews, neighborhood content, and professional photos signals a credible, active agent in a way that brokerage listings cannot.',
        includes: [
          'Agent profile optimization with specialties and neighborhoods',
          'Client review request campaign',
          'Market update posts and listing announcements',
          'Neighborhood expertise content',
          'Monthly visibility and engagement report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Real Estate Agents',
        lead: 'Rank for the neighborhood-specific searches buyers and sellers use when they are actively looking for an agent.',
        problem: 'Real estate SEO is highly local. "Real estate agent Coral Gables," "condo specialist Brickell," "homes for sale Aventura" — these searches send high-intent buyers to whoever ranks first. Your brokerage site does not rank for your name.',
        includes: [
          'Personal agent website or landing page SEO',
          'Target neighborhood keyword research',
          'Blog content strategy for local market authority',
          'Citation building in real estate directories',
          'Monthly search ranking and lead source report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Real Estate Agents',
        lead: 'Capture buyers and sellers searching for an agent in your target neighborhood — before another agent wins the click.',
        problem: 'Google Ads for real estate agents are competitive but targeted correctly, they deliver direct buyer and seller inquiries without platform fees. We build campaigns around your target neighborhood, buyer type, and property specialties.',
        includes: [
          'Target neighborhood keyword campaigns',
          'Buyer and seller-specific landing pages',
          'Call tracking and lead form setup',
          'Competitor and portal bidding strategy',
          'Monthly cost-per-lead and conversion analysis',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Real Estate Agents',
        lead: 'Client testimonials and Google reviews are the most credible proof of your track record. We build that proof systematically from every closed transaction.',
        problem: 'Most agents collect testimonials informally and irregularly. A systematic review acquisition program from every closing builds a public record of satisfied clients that influences every future prospect.',
        includes: [
          'Post-closing review request via text and email',
          'Google, Zillow, and Realtor.com review monitoring',
          'Response to all reviews',
          'Monthly reputation growth tracking',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Real Estate Agents',
        lead: 'Your personal real estate website — not your brokerage page — is the only digital asset you fully own. We build one that ranks and converts.',
        problem: 'Brokerage websites are built to brand the firm, not the individual agent. A personal website with your listings, market expertise, and neighborhood content is the foundation of a long-term lead generation asset.',
        includes: [
          'Personal agent branding and bio',
          'IDX listing integration',
          'Neighborhood guide pages',
          'Seller and buyer resource sections',
          'Client testimonial section',
          'SEO-optimized page structure',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami Real Estate Agents',
        lead: 'Promote your listings, build neighborhood authority, and stay top of mind with buyers and sellers in your target neighborhood.',
        problem: "Miami's real estate market is visually driven. Instagram and Facebook ads for listings, open houses, and market updates keep your name in front of prospects who are researching but not yet ready to call.",
        includes: [
          'New listing and sold property ads',
          'Neighborhood market update campaigns',
          'Lead generation forms for buyer/seller sign-ups',
          'Retargeting for website and profile visitors',
          'Monthly reach and inquiry report',
        ],
      },
    },
  },
  {
    slug: 'immigration-lawyers',
    name: 'Immigration Lawyers',
    singular: 'Immigration Lawyer',
    pillarHeadline: 'Marketing for Miami Immigration Lawyers That Turns Desperate Searches Into Consultations',
    pillarLead: "Immigration clients are searching in a moment of urgency. They need a lawyer they can trust, in a language they speak, who knows Miami's communities. We build the presence that makes you that lawyer.",
    problemHeadline: 'Someone Searching for an Immigration Lawyer Right Now Needs You Today.',
    problemBody: "Immigration searches in Miami are high-stakes and high-intent. A family facing deportation, an entrepreneur navigating an EB-1, a nurse working toward permanent residency — they are not browsing. They are searching for help. The lawyer who shows up first with the right credentials and strong reviews gets the consultation call.",
    stats: [
      { num: '70%', label: 'of Miami-Dade residents were born outside the United States — the largest share of any major U.S. city', accent: true },
      { num: '#1', label: 'metro area in the country for new immigration petitions filed per capita, year over year', accent: false },
      { num: '4.8★', label: 'minimum Google rating needed for an immigration law practice to convert online searches into consultations effectively', accent: true },
      { num: 'ES/HT', label: "Spanish and Haitian Creole — the languages that reach the majority of Miami's immigration client base", accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more immigration law clients in Miami?',
        a: 'Google Business Profile and SEO are the two channels with the biggest payoff. Immigration searches are specific and urgent — "deportation lawyer Miami," "DACA lawyer Hialeah," "green card lawyer Little Havana." Showing up at the top of these searches, in Spanish, with strong reviews, converts at very high rates.',
      },
      {
        q: 'Should immigration lawyers advertise on Google?',
        a: 'Yes — carefully. Immigration law is competitive on Google Ads, and costs per click can be high. We structure campaigns around specific case types and Miami neighborhoods to maximize relevance and minimize wasted spend.',
      },
      {
        q: 'How important is it to have a bilingual online presence for immigration law?',
        a: "Essential. The majority of immigration clients in Miami speak Spanish or Haitian Creole as their primary language. A website and GBP that communicate in Spanish signal that your firm understands your clients' community, not just their legal case.",
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Immigration Lawyers',
        lead: 'When a Miami family searches "immigration lawyer near me," your practice needs to appear immediately — with the reviews and credentials that make them call you first.',
        problem: 'Immigration law GBP listings compete on trust signals: verified reviews from real clients, bilingual service descriptions, and specific case type information. A sparse listing loses the inquiry to a competitor who looks more established.',
        includes: [
          'Immigration law specialty and case type setup',
          'Bilingual (English and Spanish) profile content',
          'Client review request in English and Spanish',
          'Community-specific area targeting (Little Havana, Hialeah, Doral, Little Haiti)',
          'Weekly posts in English and Spanish',
          'Monthly Map Pack visibility report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Immigration Lawyers',
        lead: 'Rank for the specific immigration searches your potential clients use — in Spanish and English, by case type, by Miami neighborhood.',
        problem: 'Immigration law searches are highly specific: "deportation lawyer Miami," "asylum attorney Little Haiti," "visa lawyer Hialeah." Ranking for these requires bilingual content, neighborhood pages, and case-type-specific service pages.',
        includes: [
          'Bilingual keyword targeting (English and Spanish)',
          "Case-type landing pages (asylum, removal, visas, DACA, citizenship)",
          "Neighborhood pages for Miami's immigrant communities",
          'On-page SEO and schema markup',
          'Monthly organic ranking and consultation inquiry report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Immigration Lawyers',
        lead: 'Capture urgent immigration searches the moment someone in Miami needs legal help — in the language they search in.',
        problem: 'Immigration Google Ads must be structured around case urgency and language. Broad campaigns waste spend on irrelevant searches. Case-specific, bilingual campaigns targeting Miami\'s immigrant communities convert at significantly higher rates.',
        includes: [
          'Case-specific campaigns (removal defense, asylum, employment visas)',
          'Spanish-language ad campaigns and landing pages',
          'Neighborhood geo-targeting (Hialeah, Doral, Little Havana, Little Haiti)',
          'Call tracking with bilingual intake setup',
          'Monthly cost-per-consultation analysis',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Immigration Lawyers',
        lead: "Immigration clients ask their community who to call. Online reviews are the digital version of that referral network. We build yours systematically.",
        problem: "In Miami's immigrant communities, trust is everything. A lawyer with 80 verified reviews in Spanish from real Miami clients will win more consultations than one with better credentials and no reviews.",
        includes: [
          'Post-case review request in English and Spanish',
          'Google and Avvo monitoring',
          'Professional response to all reviews',
          'Monthly review growth report',
        ],
      },
    },
  },
  {
    slug: 'beauty-salons',
    name: 'Beauty Salons',
    singular: 'Beauty Salon',
    pillarHeadline: 'Marketing for Miami Beauty Salons That Keeps Your Stylists Booked',
    pillarLead: "In Miami's beauty market, visibility is everything. Clients book the salon they find first on Google or Instagram — not necessarily the best one on the block. We build the presence that keeps your chairs full week after week.",
    problemHeadline: 'The Chair Is Empty. The Competition Is Busy.',
    problemBody: "Miami has no shortage of beauty salons. But the ones that stay booked are the ones that show up on Google Maps, have recent client photos, and have 80+ reviews at 4.8 stars or better. The work is the same. The visibility is what is different. We close that gap.",
    stats: [
      { num: '90%', label: 'of beauty salon clients choose a salon based on online reviews and photos before calling or visiting', accent: true },
      { num: '4.8★', label: 'average Google rating of top-performing beauty salons in Miami\'s competitive markets', accent: false },
      { num: '3x', label: 'more new client bookings for salons with 50+ Google reviews vs. those with fewer than 20', accent: true },
      { num: '#1', label: 'source of new beauty salon clients in Miami is Google Maps search — ahead of Instagram, referrals, and walk-ins', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more clients for my beauty salon in Miami?',
        a: 'Google Business Profile optimization with strong photo updates and a consistent review acquisition program is the highest-ROI move. Instagram ads for specific services (balayage, Brazilian blowouts, eyelash extensions) work well for reaching new clients in your neighborhood.',
      },
      {
        q: 'Should a beauty salon use social media ads?',
        a: 'Yes — especially for visually distinctive services. Before/after hair color, extension results, and transformation content performs well on Instagram. Combined with neighborhood geo-targeting, social ads help you reach the audience that is right for your price point and specialty.',
      },
      {
        q: 'How do I stand out from other salons in my Miami neighborhood?',
        a: 'Reviews and photos are the two differentiators. A salon with 100 detailed Google reviews and a gallery of real client results stands out immediately. We build both systematically so your online presence reflects the quality your existing clients already know.',
      },
    ],
    services: ['google-business-profile', 'seo', 'reputation-management', 'social-media-ads', 'website-design'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Beauty Salons',
        lead: 'When a Miami resident searches "hair salon near me" or "balayage Wynwood," your salon needs to appear in the top three with the photos and reviews that make them book.',
        problem: 'Beauty salon GBPs live or die on photos. A salon profile with 50 professional client photos, specific service listings, and fresh weekly posts dominates over competitors with outdated or sparse listings.',
        includes: [
          'Service category and specialty optimization',
          'Before/after client photo uploads weekly',
          'Review request after every service',
          'Service menu with stylists and specialties',
          'Weekly posts with seasonal promotions and results',
          'Monthly Map Pack ranking report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Beauty Salons',
        lead: 'Rank for the specific beauty services clients search in your Miami neighborhood — and capture the bookings that come with that visibility.',
        problem: 'Beauty salon SEO works at the neighborhood level. Ranking for "balayage Brickell" or "natural hair salon Wynwood" requires service-specific content and neighborhood pages that generic salon websites do not have.',
        includes: [
          'Service-specific keyword targeting (balayage, extensions, keratin, etc.)',
          'Neighborhood pages for Miami areas you serve',
          'On-page optimization for each service page',
          'Beauty salon directory citation building',
          'Monthly organic traffic and ranking report',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Beauty Salons',
        lead: 'New salon clients almost always check reviews before booking. A strong, consistent review profile is the most effective conversion tool you have.',
        problem: 'Salon clients leave satisfied but rarely take the extra step of writing a review without a prompt. A post-appointment review request via text — sent while they are still admiring their results — captures reviews consistently.',
        includes: [
          'Automated post-appointment review request via SMS',
          'Google, Yelp, and StyleSeat monitoring',
          'Response to all reviews within 24 hours',
          'Monthly review growth and rating report',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami Beauty Salons',
        lead: "Show Miami's Instagram feed your best transformations — and turn profile visitors into booked appointments.",
        problem: "Beauty is inherently visual. Before/after content on Instagram stops the scroll and builds desire in a way no other advertising format can. Miami's style-conscious market responds exceptionally well to authentic salon transformation content.",
        includes: [
          'Before/after transformation ad campaigns',
          'Service-specific ads (color, cuts, extensions, treatments)',
          'Neighborhood geo-targeting for Miami areas you serve',
          'Story and reel ad formats',
          'Booking link integration and appointment ads',
          'Monthly reach and booking conversion report',
        ],
      },
    },
  },
  {
    slug: 'junk-removal',
    name: 'Junk Removal Companies',
    singular: 'Junk Removal Company',
    pillarHeadline: 'Marketing for Miami Junk Removal Companies That Wins the Map Pack Call',
    pillarLead: "Junk removal is a near-me Map Pack vertical. The customer with a garage to clear or a couch on the curb picks from the top 3 results on Google and calls the first credible one. We make sure that company is you — across Miami-Dade, Broward, and Palm Beach.",
    problemHeadline: 'Same-Day Intent. Three-Slot Window. One Decision.',
    problemBody: "Junk removal searches happen with action attached. The customer is staring at the pile they need gone today or this week. They search 'junk removal near me' on their phone, scan the Map Pack, and call the company with the most reviews and an open slot. If you're not in that pack or your reviews are sparse, you are invisible for that booking. South Florida demand spikes year-round with hurricane season, snowbird turnover, post-renovation cleanout, and college move-out windows.",
    stats: [
      { num: '78%', label: 'of junk removal bookings come from Google Map Pack searches, not from search ads or directories', accent: true },
      { num: '4.6★+', label: 'average rating needed to consistently compete in the Miami Map Pack for residential junk removal', accent: false },
      { num: '90%', label: 'of junk removal customers book the same day they search, making Map Pack proximity the SEO signal that matters most', accent: true },
      { num: '$0', label: 'spent on vague awareness — every campaign targets people with a load to clear in your service area today', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more junk removal jobs in Miami?',
        a: 'Google Business Profile management is the single biggest channel for a junk removal company. The Map Pack drives roughly 78% of inbound calls because customers search "junk removal near me" on their phone and call the top 3 results. Combine GBP optimization with consistent photo uploads, weekly posts, and active review acquisition for the fastest growth.',
      },
      {
        q: 'Should a junk removal company run Google Ads?',
        a: 'Yes, especially in the first 6 months while GBP and SEO are still building. Junk removal Google Ads campaigns work because intent is extremely high — the searcher needs the service this week. Combine "junk removal Miami" + neighborhood variants + commercial cleanout terms for a balanced campaign. Most Miami junk removal companies see profitable ROI within 30 days of launching ads, provided the landing page has clear pricing and online booking.',
      },
      {
        q: 'What is the best way to compete with 1-800-GOT-JUNK in my market?',
        a: 'Local Miami operators beat the national chains on three vectors: hyperlocal SEO (neighborhood-specific pages the national franchise doesn\'t build), faster scheduling response (national franchises route through corporate booking), and price transparency on the website (locals can show transparent pricing while franchises typically gate it). Compete on these, not on volume.',
      },
    ],
    services: ['google-business-profile', 'seo', 'reputation-management', 'google-ads', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Junk Removal Companies',
        lead: 'The Map Pack is where junk removal customers find a hauler. We optimize your GBP so you appear for the highest-volume "junk removal near me" searches across Miami-Dade, Broward, and Palm Beach.',
        problem: 'Junk removal GBP listings need to signal trust + capacity immediately: truck photos, before/after photos, positive reviews, clear service area. A sparse or outdated listing loses calls to competitors who look more credible AND who appear closer in the Map Pack.',
        includes: [
          'Junk removal category + attribute optimization',
          'Truck, team, and before/after photo uploads (target 100+ in first 60 days)',
          'Service area coverage across Miami-Dade, Broward, and Palm Beach',
          'Review acquisition campaign with QR-code follow-up',
          'Weekly posts featuring recent jobs and seasonal angles',
          'Monthly Map Pack visibility and call-volume report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Junk Removal Companies',
        lead: 'Own the organic rankings for South Florida junk removal searches so you capture bookings from people planning ahead (estate cleanouts, post-renovation hauls, commercial moves), not just emergency same-day jobs.',
        problem: 'Most junk removal company websites rank for their own business name and almost nothing else. Ranking for "junk removal Brickell" or "garage cleanout Fort Lauderdale" requires neighborhood-specific pages that most junk removal sites lack entirely.',
        includes: [
          'Neighborhood landing pages across Miami-Dade, Broward, and Palm Beach',
          'Service-specific pages (residential, commercial, estate cleanout, construction debris)',
          'On-page SEO for service and location pages',
          'Local citation building in junk removal + home services directories',
          'Monthly organic rankings report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Junk Removal Companies',
        lead: 'Capture the same-day cleanout inquiry at the exact moment the customer realizes they need a hauler — before they call 1-800-GOT-JUNK or your local competitor.',
        problem: 'Junk removal searches spike on weekends, end of month, and during seasonal windows (hurricane prep, college move-out, post-Thanksgiving). A structured Google Ads campaign targets these windows and captures leads your competitors miss.',
        includes: [
          'Search campaigns by service type (residential, commercial, estate)',
          'Geo-targeting by zip code and neighborhood',
          'Call tracking and online booking conversion setup',
          'Negative keywords (free junk removal, donations, etc.)',
          'Seasonal campaign adjustment for hurricane / move-out / spring cleaning peaks',
          'Monthly cost-per-lead analysis',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Junk Removal Companies',
        lead: 'Junk removal is a trust purchase — customers are letting strangers into their home or business. The company with the most credible review profile wins. We build that profile for you.',
        problem: 'After a successful junk haul, customers are relieved the mess is gone — but they rarely leave reviews without a prompt. Our automated post-job follow-up captures reviews while satisfaction is highest and the load is still freshly gone from their property.',
        includes: [
          'Automated post-job review request via SMS and email',
          'Google + Yelp + Facebook monitoring',
          'Professional response to negative reviews following Nico\'s template',
          'Review growth tracking with monthly report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Junk Removal Companies',
        lead: 'Your website is where the Map Pack click becomes a booked job. If pricing is hidden, mobile is broken, or there is no online booking, the customer calls the next company in the list. We fix the conversion gap.',
        problem: 'Most junk removal websites are template-based with hidden pricing and no online booking. Customers who want a haul today abandon and call a competitor with a faster booking flow.',
        includes: [
          'Mobile-first design optimized for "needs it today" customers',
          'Transparent pricing tiers (single item, half-truck, full-truck, etc.)',
          'Online booking widget with same-day availability',
          'Before / after photo gallery from real jobs',
          'Service area map showing Miami-Dade + Broward + Palm Beach coverage',
        ],
      },
    },
  },
  {
    slug: 'hvac',
    name: 'HVAC Contractors',
    singular: 'HVAC Contractor',
    pillarHeadline: 'Marketing for Miami HVAC Contractors Built Around Service-Call Volume',
    pillarLead: "Miami AC repair searches happen 12 months a year because South Florida humidity does not take a break. We help local HVAC contractors rank in the Map Pack and capture the 4,400 monthly searches for 'ac repair miami' that drive your phones to ring.",
    problemHeadline: 'AC Repair Miami Has 4,400 Monthly Searches and a Keyword Difficulty of 2. You Should Already Be on Page One.',
    problemBody: "The HVAC search market in Miami is enormous and surprisingly winnable. The head term has 4,400 monthly searches with a keyword difficulty of 2, which means the search engines have not yet been claimed by a dominant local operator. The contractors who own the Map Pack right now are not there because of marketing sophistication. They are there because they built the basics first. That window stays open for the contractors who execute now.",
    stats: [
      { num: '4,400', label: 'monthly searches for "ac repair miami" alone, with a keyword difficulty of just 2 out of 100', accent: true },
      { num: '$13.53', label: 'average cost-per-click HVAC contractors pay on Google Ads, signaling the LTV per call is real', accent: false },
      { num: '12mo', label: 'demand season in South Florida — humidity creates year-round service-call volume, not seasonal spikes', accent: true },
      { num: '4.7★', label: 'minimum Map Pack rating to compete for emergency-repair searches where the customer needs you today', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more AC repair calls in Miami?',
        a: 'Google Business Profile + local SEO is the foundation. AC repair searches are intent-heavy and same-day, which means buyers click the top Map Pack result and call. We optimize your GBP for the specific service categories (AC repair, HVAC, emergency AC, central air repair), build out service pages for each, and run Google Ads on the emergency-intent queries that convert fastest.',
      },
      {
        q: 'Should HVAC contractors run Google Ads or focus on SEO?',
        a: 'Both, but in sequence. Google Ads gives you immediate phone calls while SEO builds organic ranking over 90 to 120 days. Once organic ranking lands, ads become a multiplier, not the only channel. For "ac repair miami" specifically, the keyword difficulty is 2, so SEO is unusually winnable here.',
      },
      {
        q: 'What is the most important review platform for HVAC?',
        a: 'Google reviews drive the Map Pack ranking and are the single highest-leverage trust signal. Yelp matters for older Miami demographics. The BBB profile still carries weight for emergency searches. We systematize review requests after every completed service call.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami HVAC Contractors',
        lead: 'When a Miami homeowner searches "ac repair near me" at 2 PM on a 95-degree day, your GBP needs to be the first call they make. We manage the listing to keep it there.',
        problem: 'Most Miami HVAC GBP listings are missing critical service categories (separate listings for AC repair, HVAC contractor, and air-conditioning service often pull different search volumes). Add weak photo coverage, slow review velocity, and inconsistent hours, and the listing loses Map Pack visibility to the contractor next door who has the basics dialed in.',
        includes: [
          'Service category audit and expansion (AC repair, HVAC, central AC, emergency AC, refrigeration)',
          'Service-area polygon setup covering all 7 SoFla cities + Miami neighborhoods you cover',
          'Photo cadence: monthly truck photos, completed install photos, technician headshots',
          'Review request automation tied to invoice closure (Service Titan, Housecall Pro, or ServiceFusion)',
          'GBP Posts twice a month with seasonal service offers (pre-summer tune-up, post-hurricane inspection)',
          'Monthly Map Pack visibility report by neighborhood',
        ],
      },
      seo: {
        headline: 'SEO for Miami HVAC Contractors',
        lead: 'Rank for the AC repair, HVAC installation, and emergency service searches your buyers type in moments of urgency, across every neighborhood you serve.',
        problem: 'AC repair miami has a keyword difficulty of 2 and your competitors have not seriously attacked it yet. That window closes the moment one local operator decides to invest in real SEO. We get you ranking before that happens, on the head terms and on the long-tail neighborhood pages (ac repair coral gables, hvac brickell, emergency ac doral) that compound traffic without the head-term competition.',
        includes: [
          'Service + city + neighborhood landing pages (ac repair Aventura, HVAC Kendall, etc.)',
          'Emergency-intent content (broken AC after-hours guide, hurricane prep HVAC checklist)',
          'Schema.org HVACBusiness + Service markup with priceRange and openingHours (24/7 emergency)',
          'Citation building across HVAC-specific directories (ACCA, BBB, Angi, Houzz Pro)',
          'Technical SEO: fast mobile load times (emergency callers are on phones)',
          'Monthly rankings + call-attribution report tied to your CRM',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami HVAC Contractors',
        lead: 'Capture emergency AC searches the moment they happen — and own the top-of-page for "ac repair miami" while your SEO ranks build underneath.',
        problem: 'Miami HVAC Google Ads work because the intent is intense. Someone searching "ac broken miami" at 3 PM in August is going to call the first competent-looking option that appears. The contractors who pre-bid on emergency-intent queries and have a one-click call extension win those calls. The ones running generic "HVAC services" campaigns burn budget on tire-kickers.',
        includes: [
          'Emergency-intent campaigns (ac broken, no cool air, ac making noise) with call-only ads',
          'Service-specific campaigns (ac tune-up, ac installation, ductless mini-split, commercial HVAC)',
          'Neighborhood geo-targeting with bid adjustments for higher-LTV areas',
          'Call tracking with whisper greetings to qualify call source',
          'Negative keyword management (filter DIY searches and HVAC training queries)',
          'Monthly cost-per-call and cost-per-booked-job report',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami HVAC Contractors',
        lead: 'A 4.9-star Map Pack listing with 200 reviews wins the call over a 4.7-star listing with 60, even when the 4.7 is technically better. We build the review volume that wins Map Pack visibility and customer trust at the same time.',
        problem: 'Most HVAC contractors ask for reviews ad-hoc. The top contractors automate the ask from the invoice-close moment, when satisfaction is highest. A systematic review program adds 8 to 15 reviews a month at industry-standard conversion rates, which compounds to 100+ reviews a year while competitors stay flat at 30.',
        includes: [
          'Post-service review request via SMS + email tied to invoice closure',
          'Google, Yelp, BBB, and HomeAdvisor monitoring',
          'Professional response templates for positive, negative, and disputed reviews',
          'Review-velocity benchmarking against your 3 closest Map Pack competitors',
          'Monthly reputation score + competitor delta report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami HVAC Contractors',
        lead: 'A fast, mobile-first HVAC website that converts emergency searchers into phone calls. With service-area maps, transparent pricing, and online scheduling tied to your dispatch software.',
        problem: 'Most Miami HVAC websites are slow template builds that hide pricing and bury the phone number. An emergency caller bounces in 4 seconds if the site is slow or unclear. We build sites that load in under 2 seconds with one-tap-to-call buttons, service-area visualizations, and booking integration with ServiceTitan, Housecall Pro, or your dispatch tool.',
        includes: [
          'Service pages for each HVAC specialty (AC repair, installation, maintenance, commercial, refrigeration)',
          'Neighborhood-targeted landing pages aligned to your GBP service area',
          'One-tap-call CTAs and click-to-text integration',
          'Online booking widget tied to ServiceTitan, Housecall Pro, or Jobber',
          'Trust signals: NATE certifications, EPA 608 cards, BBB rating, insurance proof',
          'Mobile-first speed optimization (Core Web Vitals all green)',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami HVAC Contractors',
        lead: 'Stay in front of homeowners who searched for AC repair but did not call, and capture the pre-summer maintenance buyers before they wait for a breakdown.',
        problem: 'HVAC social ads are not about lead generation in the moment. They are about staying top-of-mind for the homeowner who Googled you in May, did not book, and breaks down in August. Retargeting + seasonal pre-emptive maintenance offers compound your Google Ads spend by closing the loop on the 60% of searchers who do not convert on the first visit.',
        includes: [
          'Retargeting campaigns for website visitors who did not book',
          'Seasonal pre-emptive maintenance offers (pre-summer tune-up, post-hurricane inspection)',
          'Lookalike audiences based on your highest-LTV repeat customers',
          'Lead-form ads for AC installation quotes (higher ticket, longer sales cycle)',
          'Monthly performance + cost-per-installed-system report',
        ],
      },
    },
  },
  {
    slug: 'roofing',
    name: 'Roofing Contractors',
    singular: 'Roofing Contractor',
    pillarHeadline: 'Marketing for Miami Roofing Contractors Built for Hurricane-Season Demand and Year-Round Replacement Pipelines',
    pillarLead: "Miami roofers operate in two economies at once: the year-round replacement market and the post-storm emergency surge. We help local roofing contractors rank for both, capture the $40-per-click search intent, and convert the leads into closed jobs.",
    problemHeadline: 'Roofers Pay $40 Per Click on Google Because the LTV Per Job Is $5K to $25K. SEO Earns That Same Lead for Free.',
    problemBody: "Miami roofers are spending big on Google Ads because the math works at $5K to $25K per job. But the same intent shows up in organic Google searches, and the contractors who build out service + neighborhood pages get the same call without paying $40 per click for it. The hurricane economy compounds this: a single named storm produces 30 to 90 days of surge demand, and the operators ranked organically capture the leads before the ads do.",
    stats: [
      { num: '$39.77', label: 'average cost-per-click for "roof repair miami" — among the highest CPCs of any local service in South Florida', accent: true },
      { num: '$5K–25K', label: 'typical ticket size for a Miami roof repair or replacement, making single-job marketing math straightforward', accent: false },
      { num: '60–90d', label: 'post-hurricane demand surge window when roofing search volume can triple or quadruple', accent: true },
      { num: '14yr', label: 'average roof lifespan in South Florida due to UV exposure and storm cycles, half the national average', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more roofing leads in Miami?',
        a: 'A combination of Google Business Profile (for the emergency repair Map Pack), service + neighborhood SEO pages (for the longer-tail intent like "metal roof miami beach" or "tile roof repair coral gables"), and Google Ads on the high-intent emergency terms. The Miami roofing market is large enough that all three channels stack rather than cannibalize.',
      },
      {
        q: 'Should roofers run Google Ads at $40 per click?',
        a: 'Yes, when the average job is $5K to $25K. A $40 cost-per-click that closes at 8% gives you a customer-acquisition cost of $500, which is single-digit percentage on the smaller jobs and trivial on a full replacement. We structure campaigns by service type and ticket size so the budget goes to the queries that close, not the tire-kicker searches.',
      },
      {
        q: 'How important is licensing and insurance in roofing marketing?',
        a: 'Critical. Florida requires a state contractor license, and roofing customers ask about it explicitly. We make your CILB license number, certificate of insurance, and any manufacturer credentials (GAF Master Elite, Owens Corning Platinum, etc.) prominent on every service page and in your GBP. These are conversion drivers, not legal afterthoughts.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Roofing Contractors',
        lead: 'When a Miami homeowner sees water dripping from the ceiling, they Google "roof leak repair" and call the first three Map Pack results. We make sure your roofing business is in those three results.',
        problem: 'Most roofer GBP listings underuse the service category options. Roofing contractor, roof repair, roof installation, metal roofer, tile roofer, and commercial roofing each have distinct search demand. A listing tagged only as "roofing contractor" misses 60% of the queries that could send you calls.',
        includes: [
          'Service category expansion (roofing, roof repair, metal roofer, tile roofer, commercial roofing, roof inspection)',
          'Photo cadence: completed-job photos, crew on-site, materials on truck (3 to 5 per week during work season)',
          'Hurricane-prep + post-storm GBP Posts as content events',
          'Insurance + license + GAF/Owens Corning credentials in the business description',
          'Service-area polygon covering all of Miami-Dade + Broward + Palm Beach',
          'Monthly Map Pack visibility + emergency-query call-attribution report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Roofing Contractors',
        lead: 'Rank for the roof-type, roof-issue, and neighborhood searches that drive $5K to $25K jobs — without paying $40 per click for each lead.',
        problem: 'Roofing SEO in Miami means owning the long-tail. "Roofer miami" has a KD of 32 (tough but winnable). But "metal roof installation aventura" or "tile roof repair coral gables" have KDs of 4 to 12 and convert at 3x the rate because the searcher already knows what they want. We build the service x roof-type x neighborhood lattice that captures both head and long-tail.',
        includes: [
          'Service x roof-type x neighborhood landing pages (tile roof Coral Gables, metal roof Pinecrest, etc.)',
          'Hurricane-season content (storm-prep guides, post-storm inspection content)',
          'Schema.org RoofingContractor + Service markup with license + insurance + warranty data',
          'Citation building in roofing-specific directories (NRCA, Florida Roofing Association, GAF certified directory)',
          'Authority link building from local press during hurricane season news cycles',
          'Monthly rankings + lead-attribution report by service type',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Roofing Contractors',
        lead: 'Capture the emergency roof-leak searches that justify a $40 CPC because the closed job is worth $5K to $25K. Structure the campaign so the budget goes to the queries that close.',
        problem: 'Roofing Google Ads work when structured around intent depth. "Roof leak emergency" closes at 12 to 18% with a same-day call. "Roofing contractor near me" closes at 3 to 5%. Same vertical, completely different campaign math. We separate the budget by intent tier so the spend lands where the conversion happens.',
        includes: [
          'Emergency-intent campaigns (roof leak, storm damage, ceiling water) with call-only ads',
          'Service-specific campaigns (roof replacement, roof inspection, metal roof installation)',
          'Storm-event budget bursts triggered by NHC advisories and named storm warnings',
          'Call tracking with whisper greetings to confirm storm-damage vs. routine inquiries',
          'Negative keyword management (filter DIY and "how to" research queries)',
          'Monthly cost-per-call and cost-per-closed-job report',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Roofing Contractors',
        lead: 'Roofing customers spend weeks researching before they sign a $15K contract. They read every review. A 200-review Map Pack listing at 4.9 stars closes a quarter more deals than a 50-review listing at 4.7 stars.',
        problem: 'Roof replacements are high-consideration purchases. Customers research for 2 to 6 weeks and read 20+ reviews before they call. A roofer with strong reviews wins the call without competing on price. A roofer with sparse or stale reviews loses to a competitor with more recent activity, even if the work is better.',
        includes: [
          'Post-job review request via SMS + email at the warranty-signoff moment',
          'Google, BBB, GAF certified-contractor reviews, and Angi monitoring',
          'Professional response templates for positive, negative, and warranty-related reviews',
          'Review velocity benchmarking against the 3 closest Map Pack competitors',
          'Monthly reputation report with competitor delta + recommended outreach',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Roofing Contractors',
        lead: 'A roofing website that converts the research-heavy buyer. With roof-type service pages, before / after galleries, manufacturer credentials, and a quote-request flow that pre-qualifies leads.',
        problem: 'Most roofer websites either feel old (faded clip art, 2015 design) or are generic SaaS templates that say nothing about why a Miami homeowner should trust you with their $15K project. We build sites that show the work (photos), prove the credentials (GAF Master Elite, license, insurance), and pre-qualify the lead before they fill the form.',
        includes: [
          'Service pages for each roof type (asphalt, tile, metal, flat, commercial) + each service (repair, replacement, inspection)',
          'Before / after galleries with roof-type filtering',
          'Manufacturer credentials (GAF, Owens Corning, CertainTeed) and financing partner badges',
          'Quote-request flow with roof-type, roof-age, and timeline pre-qualification',
          'License + insurance + warranty information prominent on every page',
          'Mobile-first speed optimization (Core Web Vitals all green)',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami Roofing Contractors',
        lead: 'Stay in front of the homeowner who got 3 quotes, did not pick a roofer, and is sitting on the decision. Plus capture the long-cycle planning buyers before hurricane season starts.',
        problem: 'Roofing social ads are about retargeting and long-cycle nurture, not direct lead-gen. The buyer who got 3 quotes and stalled needs 6 to 12 weeks of follow-up before they call back. We run the retargeting + warranty / financing offer ads that close the loop after Google Ads has done its job.',
        includes: [
          'Retargeting campaigns for website visitors who did not request a quote',
          'Financing offer ads tied to manufacturer rebate programs',
          'Pre-hurricane-season content (roof inspection special, storm prep checklist)',
          'Lookalike audiences based on closed-job customer list',
          'Lead-form ads for free roof inspection bookings',
          'Monthly performance and cost-per-booked-inspection report',
        ],
      },
    },
  },
  {
    slug: 'restoration',
    name: 'Water Damage and Mold Restoration',
    singular: 'Restoration Company',
    pillarHeadline: 'Marketing for Miami Water Damage and Mold Restoration Companies Built for Emergency-Response Volume',
    pillarLead: "Water damage and mold restoration is an emergency-driven business with $29.76 cost-per-click and $2,000 to $15,000 average tickets. We help South Florida restoration contractors own the Map Pack for the moments that matter, when a pipe bursts at 3 AM or a hurricane floods a first floor.",
    problemHeadline: 'Mold Removal Miami Has 1,600 Monthly Searches, a Keyword Difficulty of 5, and a $29.76 CPC. That Math Is a Gift.',
    problemBody: "The restoration search market in Miami is structurally underexploited. Mold removal, water damage restoration, and emergency water cleanup are high-intent, time-critical searches that pay $14 to $36 per click in Google Ads because the average job is $2K to $15K. The same intent in organic search has keyword difficulty scores between 0 and 16, which is unusually low for that ticket size. The restoration contractor who builds the basics (GBP, service pages, neighborhood coverage, review velocity) captures these calls without paying $30 per click for them.",
    stats: [
      { num: '$29.76', label: 'cost-per-click for "mold removal miami" — the LTV economics make even high-CPC campaigns profitable', accent: true },
      { num: '$2K–15K', label: 'average ticket for water damage or mold restoration, most of which is insurance-billable', accent: false },
      { num: 'KD 5', label: 'keyword difficulty for "mold removal miami" — unusually winnable for a 1,600/mo head term in a high-LTV vertical', accent: true },
      { num: '24/7', label: 'emergency-response window. Restoration leads are won by whoever answers the call first', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more water damage and mold leads in Miami?',
        a: 'Google Business Profile + 24/7 call answering is the foundation. Restoration leads are won by whoever answers the phone first in the panic moment. Then service + neighborhood landing pages (mold removal coral gables, water damage fort lauderdale) capture the longer-tail organic search. Google Ads on emergency-intent queries fills the gap while SEO ranks. The CPC is high but the math works on insurance-billable jobs.',
      },
      {
        q: 'How important is the IICRC certification for restoration marketing?',
        a: 'It is the trust signal that separates legitimate restoration contractors from cleanup amateurs. We make your IICRC certification (WRT, ASD, AMRT, CDS) prominent on every page, in your GBP description, and in ad copy. Insurance adjusters look for it, and homeowners increasingly know to ask.',
      },
      {
        q: 'Does insurance billing change how restoration marketing works?',
        a: 'Yes, fundamentally. Most restoration work is insurance-billable, which means the buyer is less price-sensitive than in cash-pay verticals. Your marketing should signal insurance experience (we work with all major carriers, direct billing, deductible-only out-of-pocket) because that removes the biggest decision-stall. The contractors who make insurance easy win the call.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Restoration Companies',
        lead: 'When a Miami homeowner finds a flooded basement at 11 PM, they Google "water damage restoration near me" and call the first 24/7 Map Pack result. We make sure your restoration business is that result.',
        problem: 'Most restoration GBP listings underuse the emergency-service category options and fail to communicate the 24/7 availability that drives emergency-call decisions. Add to that weak photo coverage of completed jobs (which builds the trust insurance adjusters look for), and the Map Pack ranking goes to a competitor with the basics dialed in.',
        includes: [
          'Service category audit + expansion (water damage, mold remediation, fire damage, sewage cleanup, biohazard)',
          '24/7 hours configuration with after-hours call-tracking',
          'Photo cadence: completed-job photos, IICRC-certified equipment, crew in PPE on site',
          'IICRC certifications + insurance-carrier badges in business description',
          'Service-area polygon covering all 7 SoFla cities plus Miami neighborhoods',
          'Monthly Map Pack visibility report with emergency-query call-attribution',
        ],
      },
      seo: {
        headline: 'SEO for Miami Water Damage and Mold Restoration Companies',
        lead: 'Rank for mold removal, water damage, fire damage, and emergency cleanup searches across every Miami neighborhood and SoFla city. With KD 0 to 16 on most head terms, the SEO opportunity here is unusually large.',
        problem: 'Restoration SEO in Miami is structurally underexploited. The head terms have keyword difficulties between 0 and 16 in a vertical where the average job is $2K to $15K. Most local restoration contractors have lean websites with one "services" page covering everything. We build the service x neighborhood lattice that captures the actual search intent (mold removal kendall, water damage hialeah, fire damage doral) and gets you ranking before competitors notice the opportunity.',
        includes: [
          'Service x neighborhood landing pages (water damage Brickell, mold removal Aventura, etc.)',
          'Emergency-intent content (flooded basement guide, post-hurricane mold checklist, insurance-claim walkthrough)',
          'Schema.org LocalBusiness with serviceType and 24/7 openingHours',
          'Citation building in restoration-specific directories (IICRC, RIA, Angi, BBB, BNI)',
          'Authority link building from local press during hurricane / weather news cycles',
          'Monthly rankings + emergency-call attribution report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Restoration Companies',
        lead: 'Capture the 3-AM-pipe-burst searches and the post-hurricane mold inquiries with call-only ads, while SEO ranks build underneath for the longer-tail intent.',
        problem: 'Restoration Google Ads work because the emergency intent is undeniable. A homeowner searching "water damage restoration near me" at 3 AM is going to call the first option that picks up. We structure call-only campaigns with whisper greetings to qualify the call source (emergency vs. mold inspection vs. insurance-claim research) so the budget goes to the conversions that close.',
        includes: [
          'Emergency-intent call-only campaigns (water damage emergency, mold removal urgent, sewage cleanup)',
          'Service-specific campaigns (mold testing, fire damage restoration, biohazard cleanup)',
          'Storm-event budget bursts triggered by NHC advisories and post-storm news cycles',
          'Call tracking with whisper greetings to qualify call source + insurance status',
          'Negative keyword management (filter DIY, training, and insurance-only research queries)',
          'Monthly cost-per-call and cost-per-billed-job report',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Restoration Companies',
        lead: 'Insurance adjusters check Google reviews before they approve your invoice. Homeowners check reviews before they let your crew in their house at midnight. The review pipeline runs the business.',
        problem: 'Restoration customers have a uniquely difficult job converting to a review because the experience is traumatic (their home was just damaged). The contractors who systematize the ask at the right moment (after the job is complete and the insurance has paid, not during the crisis) build review volume that compounds. Sparse or stale reviews are a real reason adjusters route work to other vendors.',
        includes: [
          'Post-job review request via SMS + email at the insurance-paid moment (not during the crisis)',
          'Google, BBB, IICRC-certified directory, and Angi monitoring',
          'Professional response templates including insurance-claim sensitivity',
          'Review velocity benchmarking against the 3 closest Map Pack competitors',
          'Monthly reputation + competitor delta + recommended outreach report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Restoration Companies',
        lead: 'A restoration website built for the panic moment. With one-tap-to-call buttons, 24/7 availability badges, insurance-carrier logos, IICRC credentials, and a clear "we handle the insurance claim" path.',
        problem: 'Most restoration websites bury the phone number, hide the 24/7 availability, and look indistinguishable from any other contractor site. The buyer is in panic mode, scanning for trust signals in 3 seconds. The site that makes "call now," "we work with your insurance," and "IICRC certified" obvious wins the call.',
        includes: [
          'Service pages for each restoration specialty (water damage, mold, fire, sewage, biohazard)',
          'Neighborhood-targeted landing pages aligned to your GBP service area',
          '24/7 availability badge prominent on every page',
          'Insurance-carrier logos (Citizens, State Farm, Allstate, Tower Hill) prominent',
          'IICRC certification badges (WRT, ASD, AMRT, CDS) prominent',
          'One-tap-call CTA and click-to-text integration',
          'Mobile-first speed optimization (Core Web Vitals all green)',
        ],
      },
    },
  },
  {
    slug: 'plumber',
    name: 'Plumbing Contractors',
    singular: 'Plumbing Contractor',
    pillarHeadline: 'Marketing for Miami Plumbers Built Around 5,400 Monthly Searches and $44 Cost-Per-Click Markets',
    pillarLead: "Miami plumber searches run 5,400/mo on the head term alone, and surrounding markets like West Palm Beach hit $44 per click on Google Ads. We help local plumbing contractors capture the organic equivalent of that paid traffic and stop bidding against themselves.",
    problemHeadline: 'Plumber Miami Is the Biggest Single-Trade Search Market in South Florida. The Operators Who Own It Stopped Paying for Clicks.',
    problemBody: "The plumbing search market in South Florida is the biggest single-trade demand pool we measured. plumber miami at 5,400 monthly searches, plumber fort lauderdale at 1,300, plumber boca raton at 1,300, plumber hollywood fl at 1,300, plumber west palm beach at 1,000. The CPCs are extreme: emergency plumber miami at $53.00, plumber west palm beach at $44.02, plumber boca raton at $40.43. The contractors who rank organically on these terms earn the lead at near-zero marginal cost while their competitors burn budget on every click.",
    stats: [
      { num: '5,400', label: 'monthly searches for "plumber miami" alone, before counting Broward and Palm Beach demand', accent: true },
      { num: '$53.00', label: 'cost-per-click for "emergency plumber miami" on Google Ads, signaling exactly what each booked emergency job is worth', accent: false },
      { num: '24/7', label: 'emergency-response window. Plumbing leads are won by whoever picks up the phone first', accent: true },
      { num: '4.7★', label: 'minimum Map Pack rating to compete for emergency-repair searches where the customer needs you today', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more plumbing leads in Miami?',
        a: 'Google Business Profile + 24/7 call answering is the foundation. Then service x neighborhood SEO pages for the long-tail queries (drain cleaning brickell, water heater repair coral gables, leak detection aventura) and Google Ads on the emergency-intent terms. The Miami plumbing market is big enough that all three channels stack rather than cannibalize.',
      },
      {
        q: 'Should plumbers run Google Ads at $40+ per click?',
        a: 'Yes when the average emergency-service ticket is $300-$2,500 and the average installation job runs $1,000-$15,000+. A $40 cost-per-click that closes at 12-18% gives you a customer-acquisition cost of $222-$333, which is single-digit percentage on most jobs. We structure campaigns by service type and intent depth so the budget goes to queries that close.',
      },
      {
        q: 'How important is the Florida master plumber license in marketing?',
        a: 'Critical. Florida requires a state-issued certificate (CFC) for any plumbing work. We make your CFC number, certificate of insurance, and any specialty credentials (backflow prevention, medical-gas, gas-line) prominent on every service page. These are conversion drivers and a real trust signal homeowners ask about.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Plumbers',
        lead: 'When a Miami homeowner sees water flooding the kitchen at 3 AM, they Google "emergency plumber near me" and call the first three Map Pack results. We make sure your plumbing business is in those three results.',
        problem: 'Most plumber GBP listings underuse the emergency-service category options. Plumber, plumbing contractor, plumbing supply store, drain cleaning service, water heater installation each have distinct search demand. A listing tagged only as "plumber" misses 40-50% of the queries that could send you calls.',
        includes: [
          'Service category expansion (plumber, plumbing contractor, drain cleaning, water heater installation, leak detection, emergency plumber)',
          '24/7 hours configuration with after-hours call-tracking',
          'Photo cadence: completed-job photos, branded truck on-site, technicians with proper PPE (2-4 per week)',
          'Florida CFC license + insurance + specialty credentials in business description',
          'Service-area polygon covering all 7 SoFla cities plus Miami neighborhoods',
          'Monthly Map Pack visibility report with emergency-query call-attribution',
        ],
      },
      seo: {
        headline: 'SEO for Miami Plumbing Contractors',
        lead: 'Rank for the 5,400/mo head term plus the service x neighborhood long-tail across South Florida. With keyword difficulties between 0 and 17 on the biggest plumbing terms, the SEO opportunity is unusually winnable.',
        problem: 'Plumbing SEO in Miami means owning both the head term and the long-tail. plumber miami at KD 17 is winnable. drain cleaning miami, water heater repair miami, leak detection miami all sit at KD 0 with substantial CPCs ($17.41, $27.34, $22.50). The contractors who build the service x neighborhood lattice capture both head and long-tail demand.',
        includes: [
          'Service x neighborhood landing pages (drain cleaning Brickell, water heater Coral Gables, emergency plumber Aventura, etc.)',
          'Service-specific pages for each plumbing specialty (drain, water heater, leak detection, repipe, sewer)',
          'Schema.org Plumber + Service markup with priceRange and openingHours (24/7 emergency)',
          'Citation building in plumbing-specific directories (PHCC, plumbing-specific business listings, BBB)',
          'Authority link building from local press during storm-surge and post-freeze cycles',
          'Monthly rankings + emergency-call attribution report tied to your CRM',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Plumbing Contractors',
        lead: 'Capture the 3-AM-burst-pipe searches with call-only ads, while SEO ranks build underneath. The emergency intent is so high in plumbing that even $40+ CPCs are profitable when the campaign is structured right.',
        problem: 'Plumbing Google Ads work because the intent is undeniable. Someone searching "emergency plumber miami" at 3 AM is calling the first competent-looking option. We structure call-only campaigns with whisper greetings to qualify the call source so the budget concentrates on the queries that close.',
        includes: [
          'Emergency-intent call-only campaigns (burst pipe, no hot water, sewer backup, water leak emergency)',
          'Service-specific campaigns (drain cleaning, water heater installation, leak detection, repipe)',
          'Neighborhood geo-targeting with bid adjustments for higher-LTV areas (Coral Gables, Aventura, Boca West)',
          'Call tracking with whisper greetings to qualify call source + emergency vs scheduled',
          'Negative keyword management (filter DIY, training, and supply-purchase queries)',
          'Monthly cost-per-call and cost-per-booked-job report',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Plumbing Contractors',
        lead: 'A 4.9-star Map Pack listing with 200 reviews wins the emergency call over a 4.7-star listing with 60 reviews. We build the review pipeline that wins both Map Pack visibility and the customer trust calculus at the same time.',
        problem: 'Most plumbers ask for reviews ad-hoc. The top contractors automate the ask from the invoice-close moment, when customer relief and satisfaction are highest. A systematic review program adds 10-15 reviews per month, compounding to 120+ per year while competitors stay flat at 30.',
        includes: [
          'Post-service review request via SMS + email tied to invoice closure',
          'Google, Yelp, BBB, HomeAdvisor, and Angi monitoring',
          'Professional response templates for positive, negative, and emergency-call reviews',
          'Review-velocity benchmarking against your 3 closest Map Pack competitors',
          'Monthly reputation score + competitor delta report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Plumbing Contractors',
        lead: 'A fast, mobile-first plumbing website that converts emergency searchers into phone calls. With license display, online scheduling tied to ServiceTitan, and one-tap-call CTAs above the fold.',
        problem: 'Most Miami plumber websites are slow template builds with the phone number buried below the fold and no online booking. An emergency caller bounces in 4 seconds if the site is slow or unclear. We build sites that load in under 2 seconds with one-tap-call buttons, license + insurance prominent, and booking integration with your dispatch tool.',
        includes: [
          'Service pages for each plumbing specialty (drain, water heater, leak detection, repipe, sewer, gas line)',
          'Neighborhood-targeted landing pages aligned to your GBP service area',
          'One-tap-call CTAs and click-to-text integration',
          'Online booking widget tied to ServiceTitan, Housecall Pro, or Jobber',
          'Trust signals: Florida CFC license, BBB rating, insurance proof, specialty certs (backflow, medical-gas)',
          'Mobile-first speed optimization (Core Web Vitals all green)',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami Plumbing Contractors',
        lead: 'Stay in front of homeowners who searched for plumbing service but did not call, and capture the pre-listing-season inspection buyers before they discover the leak themselves.',
        problem: 'Plumbing social ads are not about emergency lead-gen in the moment. They are about retargeting the search-and-stalled buyer and capturing seasonal maintenance demand. Retargeting + annual whole-home inspection offers compound your Google Ads spend by closing the loop on the 50%+ of searchers who do not convert on the first visit.',
        includes: [
          'Retargeting campaigns for website visitors who did not book',
          'Seasonal maintenance offers (annual inspection, water-heater flush, pre-listing whole-home inspection)',
          'Lookalike audiences based on your highest-LTV repeat customers',
          'Lead-form ads for repipe and tankless-water-heater quote requests (higher ticket)',
          'Monthly performance + cost-per-booked-job report',
        ],
      },
    },
  },
  {
    slug: 'electrician',
    name: 'Electrical Contractors',
    singular: 'Electrical Contractor',
    pillarHeadline: 'Marketing for Miami Electricians Built Around the Lowest-Difficulty High-Volume Trade SERP in South Florida',
    pillarLead: "Electrician miami has 1,600 monthly searches at a keyword difficulty of 0. Electrician fort lauderdale has 880 at KD 2. These are some of the most lopsided demand-to-difficulty ratios in any local-service market we measured. We help South Florida electrical contractors close the SEO gap before competitors notice.",
    problemHeadline: 'Electrician Miami: 1,600 Monthly Searches, Keyword Difficulty 0, $7 Cost-Per-Click. Nobody Is Defending the Top of the SERP.',
    problemBody: "The electrical-contractor search market in South Florida is structurally underexploited. The Miami head term has 1,600 monthly searches at a keyword difficulty of 0. The Fort Lauderdale head term has 880 at KD 2. The CPCs are healthy ($7.31 Miami, $20.13 Fort Lauderdale) which means advertisers pay for the click because the booked job is worth it. Most local electricians have not invested in SEO at all. The window stays open for 6-18 months before a critical mass of competitors notice.",
    stats: [
      { num: 'KD 0', label: 'keyword difficulty for "electrician miami" on a 1,600/mo search volume head term', accent: true },
      { num: '+315%', label: 'year-over-year search volume growth on "electrician miami" — fastest-growing trade query in our SoFla dataset', accent: false },
      { num: '$20.13', label: 'cost-per-click for "electrician fort lauderdale" — signals real per-job LTV in the Broward market', accent: true },
      { num: '12mo', label: 'demand season — electrical service runs year-round, no peak/off-peak swings', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more electrical service calls in Miami?',
        a: 'Google Business Profile is the foundation: most Miami electrical searches resolve through the Map Pack. Combine with service-specific SEO pages (panel upgrades, EV charger installation, generator installation, whole-house surge protection) and Google Ads on emergency-intent terms. With KD 0 on the head term, the organic ranking opportunity is unusually large for a 6-month SEO build.',
      },
      {
        q: 'What electrical service has the highest marketing ROI in 2026?',
        a: 'EV charger installation and generator installation are the fastest-growing service lines because of the EV adoption curve and Florida hurricane preparedness. Both have lower search volumes than core repair work but extremely high per-job tickets ($800-$3,500 EV chargers, $5,000-$25,000+ whole-house generators). Dedicated landing pages for each typically rank quickly because competition is thin.',
      },
      {
        q: 'How important is the Florida master electrician license in marketing?',
        a: 'Critical. Florida requires a state-issued certificate (EC) for any electrical contracting. We make your EC number, certificate of insurance, and any specialty credentials (low-voltage, EV charger installer, generator-dealer certified) prominent on every service page. These are conversion drivers and a trust signal homeowners specifically ask about before scheduling.',
      },
    ],
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Electricians',
        lead: 'When a Miami homeowner sees flickering lights at 11 PM, they Google "emergency electrician near me" and call the first Map Pack result. We make sure your electrical business is that result.',
        problem: 'Most Miami electrician GBP listings are missing critical service categories. Electrician, electrical contractor, lighting contractor, EV charger installer, generator dealer each have distinct search demand. Add weak photo coverage and slow review velocity and the listing loses Map Pack visibility to the contractor next door who has the basics dialed in.',
        includes: [
          'Service category expansion (electrician, electrical contractor, lighting, EV charger installer, generator dealer)',
          'Service-area polygon covering all 7 SoFla cities plus Miami neighborhoods',
          'Photo cadence: completed panel upgrades, EV charger installs, generator placements, branded truck',
          'Florida EC license + insurance + specialty credentials in business description',
          '24/7 emergency-availability configuration where applicable',
          'Monthly Map Pack visibility + emergency-query call-attribution report',
        ],
      },
      seo: {
        headline: 'SEO for Miami Electrical Contractors',
        lead: 'Rank for the head term electrician miami (KD 0, 1,600/mo) plus the service-specific long-tail across South Florida. Most competitors have not even attempted SEO. The window is open now.',
        problem: 'Electrical-contractor SEO in Miami is unusually winnable. KD 0 on a 1,600/mo head term in a vertical with $200-$25,000 per-job tickets is a structural opportunity. The catch is that the window closes the moment a few local operators decide to invest seriously. We get you ranking before that happens.',
        includes: [
          'Service x neighborhood landing pages (panel upgrade Brickell, EV charger Coral Gables, generator install Aventura)',
          'Service-specific pages (panel upgrades, EV chargers, generators, lighting, surge protection, code compliance)',
          'Schema.org Electrician + Service markup with priceRange',
          'Citation building in electrical-specific directories (NECA, IEC, plus state contractor directories)',
          'EV charger + generator content for the fastest-growing query segments',
          'Monthly rankings + call-attribution report by service type',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Electrical Contractors',
        lead: 'Capture emergency electrical searches the moment they happen, while SEO ranks build underneath. Plus high-ticket campaign budgets focused on EV chargers and generators.',
        problem: 'Electrical Google Ads work in two distinct campaign sets. Emergency-intent (flickering lights, no power, electrical fire warning) closes at 10-15% with call-only ads. High-ticket installation (EV charger, whole-house generator, panel upgrade) closes slower but at ticket sizes that justify $15-$30 cost-per-click. Mixing both into one campaign loses both audiences.',
        includes: [
          'Emergency-intent call-only campaigns (no power, flickering, electrical smell)',
          'High-ticket installation campaigns (EV charger, generator, panel upgrade)',
          'Neighborhood geo-targeting with bid adjustments for higher-LTV areas',
          'Call tracking with whisper greetings to qualify call source',
          'Negative keyword management (filter DIY, training, and supply queries)',
          'Monthly cost-per-call and cost-per-installed-system report',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Electrical Contractors',
        lead: 'Electrical work involves trust with permanent home infrastructure. A 4.9-star Map Pack listing with photo-rich reviews wins the call over a sparse listing every time. We systematize the review pipeline.',
        problem: 'Most electricians ask for reviews ad-hoc and miss the post-job conversion moment. The top contractors automate the ask from the invoice-close moment, when customer satisfaction with completed code-compliant work is highest. A systematic program adds 8-12 reviews per month, compounding fast.',
        includes: [
          'Post-service review request via SMS + email tied to invoice closure',
          'Google, BBB, Angi, and Houzz monitoring',
          'Professional response templates for positive, negative, and code-related reviews',
          'Review-velocity benchmarking against your 3 closest Map Pack competitors',
          'Monthly reputation + competitor delta report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Electrical Contractors',
        lead: 'A fast, mobile-first electrical-contractor website that converts both emergency and high-ticket installation searchers. With license display, one-tap-call CTAs, and online quote requests tied to your CRM.',
        problem: 'Most Miami electrician websites are slow template builds that bury the phone number and miss the high-ticket installation lead entirely (no EV charger calculator, no whole-house generator sizing guide, no panel-upgrade FAQ). The fix is service-specific pages plus tools that pre-qualify the high-ticket buyer before they fill the form.',
        includes: [
          'Service pages for each electrical specialty (panel, EV charger, generator, lighting, surge, commercial)',
          'EV charger sizing calculator + generator sizing calculator (pre-qualifies and captures leads)',
          'Neighborhood-targeted landing pages aligned to your GBP service area',
          'License + insurance + specialty credentials prominent on every page',
          'One-tap-call CTAs and click-to-text integration',
          'Mobile-first speed optimization (Core Web Vitals all green)',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami Electrical Contractors',
        lead: 'Capture the high-ticket installation buyer who is researching for months before booking. EV chargers, generators, and full home rewires have long sales cycles that reward consistent ad presence.',
        problem: 'Electrical social ads are about high-ticket lead nurture, not emergency lead-gen. The buyer who is researching a whole-house generator or planning their first EV charger install spends 2-6 weeks comparing options. Retargeting + educational content during that window closes the deal that Google Search alone would not.',
        includes: [
          'Retargeting campaigns for website visitors who did not request a quote',
          'EV charger educational content tied to your installation service',
          'Generator-installation campaigns timed to hurricane season (May-October)',
          'Lookalike audiences based on past high-ticket installation customers',
          'Lead-form ads for free in-home assessment bookings',
          'Monthly performance + cost-per-installed-system report',
        ],
      },
    },
  },
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing Companies',
    singular: 'Pressure Washing Company',
    pillarHeadline: 'Marketing for Miami Pressure Washing Companies Built Around Recurring-Service Math and Easy SEO Wins',
    pillarLead: "Pressure washing miami has 720 monthly searches at a keyword difficulty of 0. Pressure cleaning miami has 590 at KD 0. The SoFla cities (Boca, Fort Lauderdale, West Palm Beach) each carry $11-$17 cost-per-click. We help small pressure washing operators win these structurally underexploited SERPs.",
    problemHeadline: 'Pressure Washing Miami Has 720 Monthly Searches at Keyword Difficulty 0. The SoFla City Pages Are Almost Empty.',
    problemBody: "Pressure washing is the most structurally underexploited service-business SERP we measured in South Florida. Every head term across the region sits at KD 0 to 2. The cost-per-click averages $4-$17 depending on city. The combination of low organic competition, healthy CPCs, and the recurring-service customer-lifetime-value math (most residential clients schedule annually, commercial clients quarterly) means a small operator who builds even basic SEO captures the local market quickly.",
    stats: [
      { num: 'KD 0', label: 'keyword difficulty for "pressure washing miami" and all 4 surrounding SoFla city head terms', accent: true },
      { num: '$16.90', label: 'cost-per-click for "pressure washing boca raton" — premium-market CPC signals real per-job ticket value', accent: false },
      { num: '4-8x', label: 'lifetime value of a recurring annual / quarterly customer vs a one-time job — marketing math runs on retention', accent: true },
      { num: '12mo', label: 'demand season in South Florida — humidity + mold + algae growth keeps pressure washing in demand year-round', accent: false },
    ],
    faqs: [
      {
        q: 'How do I get more pressure washing leads in Miami?',
        a: 'Google Business Profile + service-specific landing pages is the foundation. House pressure washing, paver sealing, soft wash roof cleaning, driveway cleaning, and commercial pressure washing each have distinct search demand and different buyer profiles. Building separate pages for each typically lifts organic call volume 3-5x in the first 6 months.',
      },
      {
        q: 'Should pressure washing companies focus on residential or commercial?',
        a: 'Both, but with different marketing motions. Residential is volume + recurring annual schedules; commercial is fewer accounts but quarterly contracts at higher per-visit tickets. The SEO content and the GBP service categories should address both clearly. A site that mixes both audiences underperforms vs separating them.',
      },
      {
        q: 'What is the difference between pressure washing and soft washing in marketing?',
        a: 'Soft washing uses lower-pressure equipment with biocide solutions for surfaces (roofs, painted exteriors, fabric awnings) that high-pressure water would damage. Customers increasingly search for soft washing specifically. Dedicated content explaining the difference and the appropriate use of each is a real conversion driver, plus a meaningful keyword segment most competitors ignore.',
      },
    ],
    services: ['google-business-profile', 'seo', 'reputation-management', 'website-design', 'social-media-ads'],
    serviceConfigs: {
      'google-business-profile': {
        headline: 'Google Business Profile Management for Miami Pressure Washing Companies',
        lead: 'When a Miami homeowner notices mildew streaks on their stucco or paver mold creeping back, they Google "pressure washing near me" and call the first three Map Pack results. We make sure your pressure washing business is one of them.',
        problem: 'Most pressure washing GBP listings underuse the service category options. Pressure washing service, power washing service, paver sealing, roof cleaning, gutter cleaning, and commercial cleaning service each have distinct search demand. A listing tagged only as "pressure washing service" misses 40-50% of the queries that could send you calls.',
        includes: [
          'Service category expansion (pressure washing, power washing, paver sealing, roof cleaning, gutter cleaning, commercial cleaning)',
          'Service-area polygon covering all 7 SoFla cities plus Miami neighborhoods',
          'Photo cadence: before/after shots of completed jobs (driveways, roofs, walls, pavers)',
          'License + insurance + chemical-handling credentials in business description',
          'GBP Posts twice monthly featuring seasonal offers (pre-listing curb appeal, post-storm cleanup, holiday prep)',
          'Monthly Map Pack visibility report by neighborhood',
        ],
      },
      seo: {
        headline: 'SEO for Miami Pressure Washing Companies',
        lead: 'Rank for the head term pressure washing miami (KD 0, 720/mo) plus the service-specific long-tail across South Florida. Almost no competitors have invested in real SEO. The window is wide open.',
        problem: 'Pressure washing SEO in Miami is structurally underexploited. KD 0 on every SoFla city head term in a vertical where the recurring residential customer is worth 4-8x a single job is a real opportunity. Build service x city x neighborhood pages now and you own the market before the competitor field notices.',
        includes: [
          'Service x city + neighborhood landing pages (pressure washing Brickell, paver sealing Coral Gables, soft wash Aventura)',
          'Service-specific pages (house wash, paver sealing, soft wash roof, driveway cleaning, commercial pressure washing, gutter cleaning)',
          'Schema.org LocalBusiness with appropriate serviceType markup',
          'Before/after image galleries with proper alt text and image schema (compounds Google Image search)',
          'Citation building in cleaning-specific and home-service directories',
          'Monthly rankings + call-attribution report by service type',
        ],
      },
      'reputation-management': {
        headline: 'Reputation Management for Miami Pressure Washing Companies',
        lead: 'Pressure washing customers see results immediately, which is the highest review-conversion moment in any home service. Capturing that satisfaction systematically is the difference between 30 reviews per year and 200.',
        problem: 'Most pressure washing operators ask for reviews verbally and miss the photo-attached review opportunity. A photo-rich before/after review converts neighbors at 3-5x the rate of a text review. We systematize the review ask AND the photo capture, tied to the invoice-close moment when customer satisfaction is peak.',
        includes: [
          'Post-service review request via SMS + email with photo-attachment prompt',
          'Google, Yelp, BBB, Angi, and HomeAdvisor monitoring',
          'Professional response templates for positive, negative, and chemical-concern reviews',
          'Review-velocity benchmarking against your 3 closest Map Pack competitors',
          'Monthly reputation score + competitor delta report',
        ],
      },
      'website-design': {
        headline: 'Website Design for Miami Pressure Washing Companies',
        lead: 'A photo-heavy, mobile-first pressure washing website that converts before/after browsers into booked jobs. With service-area maps, transparent pricing tiers, and instant online quote requests.',
        problem: 'Most pressure washing websites are slow template builds with stock photos that signal nothing about your actual work. A site with real before/after photos from named neighborhoods, transparent per-square-foot pricing, and one-tap-to-book CTAs converts 4-6x better than the typical industry default.',
        includes: [
          'Service pages for each cleaning specialty (house wash, paver sealing, soft wash roof, driveway, commercial)',
          'Before/after gallery with neighborhood filtering',
          'Transparent pricing tiers (small/medium/large home + per-square-foot examples)',
          'Online quote request flow with property-type pre-qualification',
          'Service-area map showing Miami-Dade + Broward + Palm Beach coverage',
          'Mobile-first speed optimization (Core Web Vitals all green)',
        ],
      },
      'social-media-ads': {
        headline: 'Instagram and Facebook Ads for Miami Pressure Washing Companies',
        lead: 'Before/after video content is the highest-converting ad format in pressure washing. Plus retargeting + recurring-service offers that compound your existing customer LTV.',
        problem: 'Pressure washing is the most visually-satisfying home service to advertise on social. Before/after videos and time-lapse content stop scrollers in a way that text or static images cannot. The contractors winning this category run consistent video content + retarget the previous-job customer for the annual return visit.',
        includes: [
          'Before/after video campaigns (driveways, roofs, walls, paver patios)',
          'Annual-return retargeting for past customers (12-month re-engagement)',
          'Pre-listing curb appeal campaigns targeted at real estate-adjacent audiences',
          'Lookalike audiences based on your highest-LTV recurring customers',
          'Lead-form ads for annual maintenance program signups',
          'Monthly performance + cost-per-booked-job report',
        ],
      },
    },
  },
];

export function getServiceDef(slug: ServiceSlug): ServiceDef {
  return services.find(s => s.slug === slug)!;
}

export function getVertical(slug: string): Vertical | undefined {
  return verticals.find(v => v.slug === slug);
}

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.slug === slug);
}

// Per-page SEO overrides for specific vertical+service+city combos (city-pillar pages, no neighborhood).
// Used for SoFla cities outside Miami-Dade that don't have neighborhood sub-pages.
// Key format: `${vertical}/${service}/${city}`
export const cityOverrides: Record<string, CityOverride> = {
  // ── Junk Removal P0 city overrides (Phase 1 — South Florida) ─────────
  // Phased rollout via launchd job + liveAfter gating. DEV mode bypasses
  // the gate, so localhost shows all of these immediately for review.
  // Source research: ~/Desktop/seo-runs/thryvmarketingsolutions.com/03-keywords-junk-removal/
  // All copy applies two standing rules: (1) no named competitors, (2) small-operator persona.

  'junk-removal/seo/fort-lauderdale': {
    liveAfter: '2026-06-03',
    pageTitle: 'Junk Removal SEO Fort Lauderdale | The Easiest Big Market in SoFla',
    pageDesc: 'SEO for Fort Lauderdale junk removal companies. <strong>880 monthly searches</strong> on a keyword almost nobody has built a real page for. <strong>$797/mo</strong>, no contracts. Free audit.',
    h1: 'Junk Removal SEO in Fort Lauderdale — The Easiest Local Search Win in South Florida',
    lead: 'If you run a Fort Lauderdale junk removal company, junk removal fort lauderdale is the biggest single opportunity in your entire market. <strong>880 monthly searches</strong> at a Google difficulty score of <strong>2 out of 100</strong>. A family-owned operator with a real address, an active phone line, and <strong>90 days</strong> of disciplined SEO can rank first page for it. We do that work.',
    marketHeadline: 'Why Fort Lauderdale Is the Cheapest High-Volume Win in the SoFla Stack',
    marketBody: [
      '"Junk removal fort lauderdale" gets searched roughly <strong>880 times a month</strong> on Google — top of the demand chart for any residential service in Broward County. And the kicker: it\'s the easiest big-market keyword in the entire region to rank for. Most service-industry searches in South Florida sit at a Google competition score of <strong>15 to 40</strong>. This one sits at <strong>2 out of 100</strong>. High demand, low competition, almost no real local pages built for it. That combination is rare, and most Fort Lauderdale operators have never bothered to build a page targeting it specifically.',
      'The Fort Lauderdale junk removal market is dominated on review count by national franchises and a handful of established multi-location regional players, but that dominance sits in the Map Pack — <strong>not in the organic results below it</strong>. Below the Map Pack, the first-page organic positions for junk removal fort lauderdale rotate between thin franchise location pages, lead-aggregator directories, and the occasional local operator who happens to have decent on-page work. That gap is the wedge. A family-owned Fort Lauderdale operator with <strong>8 to 15 years</strong> of service history, a real Broward address, and the willingness to publish <strong>8 to 12</strong> useful pages of content can leapfrog the franchise location pages on organic — because the franchise pages are templated nationwide and miss the <strong>neighborhood-specific signal</strong> Google now weighs heavily after the 2025-2026 local algorithm updates.',
      'What we build for a Fort Lauderdale junk removal client targeting this term: a dedicated city page with <strong>800+ words</strong> of unique on-page copy, transparent pricing examples, and a same-day-call CTA; <strong>5 to 7 service-specific sub-pages</strong> — furniture removal Fort Lauderdale, estate cleanout Fort Lauderdale, garage cleanout Fort Lauderdale, construction debris removal Fort Lauderdale, post-hurricane debris removal Fort Lauderdale — each targeting its own search cluster and linking back to the city page; a Google Business Profile push and a citation rollout across the <strong>50 standard local directories</strong> with strict NAP consistency; a structured review-acquisition loop that captures customers at job completion via a printed QR card. The combination pulls the city page and its service children up the rankings together. We have seen first-page movement for the head term inside <strong>60 days</strong> with this build and consistent top-three ranking inside <strong>90 days</strong>.',
      'The program runs <strong>$797/mo</strong>, no contracts, no setup fees, and you keep all assets — content, citations, schema, photo metadata — if you ever leave. The pricing is set for an operator running <strong>one to four trucks</strong>, doing roughly <strong>$30K to $200K/mo</strong>, who has watched larger competitors take more of the digital leads over the last five years and has decided to fight back without overcommitting to a <strong>$5,000/mo</strong> agency retainer. Your first call with us is a real audit, not a sales pitch. We pull your current ranks for junk removal fort lauderdale and the eight Tier 1 service variants, show you who currently ranks above you, and tell you honestly whether <strong>60 days</strong> of work will move the needle. If it will not, we will say so. The Fort Lauderdale market is winnable for the disciplined small operator. Most operators just have not done the disciplined work yet.',
    ],
    signals: [
      { label: 'Target Term', val: 'junk removal fort lauderdale' },
      { label: 'Search Volume', val: '880/mo (validated DataForSEO)' },
      { label: 'Competition level', val: 'Score of 2 out of 100 — easiest in SoFla' },
      { label: 'Avg Google Ads CPC', val: '$19.85' },
      { label: 'Time to first-page', val: '60-90 days for established local operators' },
      { label: 'Pricing', val: '$797/mo, no contracts, you own all assets' },
    ],
    faqs: [
      {
        q: 'How much does junk removal cost in Fort Lauderdale?',
        a: 'Fort Lauderdale junk removal prices typically run <strong>$150 to $225</strong> for a quarter-truck load, <strong>$250 to $350</strong> for a half-truck, and <strong>$400 to $600</strong> for a full truck — in line with national averages but with a Broward-specific premium during hurricane season (June through November) of roughly <strong>10 to 20%</strong> on debris-heavy jobs. Single-item pickups (couch, mattress, single appliance) typically run <strong>$85 to $175</strong>. National franchises tend to price <strong>20 to 40%</strong> above local operators for the same job size; the SEO program we build helps you compete on price transparency and same-day scheduling, which is where small operators consistently win.',
      },
      {
        q: 'How long until my Fort Lauderdale junk removal company ranks first page on Google?',
        a: 'For an established Fort Lauderdale operator with a real Broward address, an existing phone number listed consistently across at least <strong>20 directories</strong>, and <strong>40+ Google reviews</strong>, we typically see first-page movement for junk removal fort lauderdale inside <strong>60 days</strong> and consistent top-three ranking inside <strong>90 days</strong>. For a brand-new business with no review history and no consistent business listings across the web, the timeline extends to <strong>120 to 150 days</strong> because Google needs to accumulate trust signals before weighting the domain. Either timeline is achievable on this keyword — the competition is low enough that disciplined work beats raw domain authority here.',
      },
      {
        q: "What's the difference between hiring a national franchise and a local Fort Lauderdale junk hauler?",
        a: 'National franchises operate on a premium-price, uniformed-crew, brand-trust model — they win the customer who wants the guaranteed experience and is willing to pay for it. Local operators win on price (typically <strong>20 to 40 percent less</strong>), scheduling flexibility (same-day and weekend), and direct accountability (the owner often answers the phone). For most Fort Lauderdale residential customers, the local operator with <strong>5+ years in the area</strong>, <strong>40+ Google reviews</strong>, and transparent pricing is the better value — but only when they can find that operator. SEO is what surfaces the local family operator in the search result alongside the franchise listings.',
      },
      {
        q: 'Do I need to pay for Google Ads if I rank first page organically for junk removal fort lauderdale?',
        a: 'Not necessarily — but the answer depends on competitive pressure. With <strong>880 monthly searches</strong>, low competition, and a <strong>$19.85 cost-per-click</strong>, organic ranking captures roughly <strong>30 to 50%</strong> of the total click volume on the first page. Google Ads above the organic results captures the remaining click volume from the customer who clicks the first thing they see. Most small operators we work with start with organic-only for the first <strong>90 days</strong> while ranks are climbing, then layer in a small Google Ads budget (<strong>$800 to $1,500/mo</strong>) to capture the impatient click. Running both correctly improves total lead volume by <strong>40 to 70 percent</strong> over organic-only.',
      },
      {
        q: 'How many Google reviews does my Fort Lauderdale junk removal company need to compete?',
        a: 'The Map Pack floor for junk removal fort lauderdale visibility is roughly <strong>40 reviews at a 4.5+ star average</strong>. To consistently rank in the top three Map Pack results, expect to need <strong>100 to 200 reviews</strong> — though the exact threshold depends on which competitors operate in your specific Broward sub-market (Wilton Manors, Las Olas, Coral Ridge, Plantation-border, etc.). The review acquisition loop we build typically produces <strong>12 to 20 new reviews per month</strong> for an active operator running <strong>8 to 15 jobs per day</strong>, which is enough to close the review gap against most of the local field within <strong>4 to 6 months</strong>.',
      },
      {
        q: "What if I already have a website that isn't ranking?",
        a: 'Most of the operators we onboard already have a website — usually built <strong>4 to 8 years ago</strong>, often by a relative or a <strong>$400 freelancer</strong>, with two or three pages and no on-page SEO work. The first call we have is a real audit: we pull your current rankings for junk removal fort lauderdale and the eight Tier 1 service variants, run a technical scan (page speed, mobile, schema, sitemap), and tell you honestly whether your existing site can be upgraded or whether a rebuild makes more economic sense. Roughly <strong>60 percent</strong> of the operators we audit can keep their existing site with targeted upgrades; <strong>40 percent</strong> are better served by a rebuild on a faster platform. Either way, you keep ownership of the domain and the content.',
      },
    ],
  },

  'junk-removal/seo/miami': {
    liveAfter: '2026-06-05',
    pageTitle: 'Junk Removal SEO Miami | 1,300 Searches/mo Head Term',
    pageDesc: 'SEO for Miami junk removal companies. 1,<strong>300 monthly searches</strong> on the head term, low competition, 12 Miami neighborhoods covered. <strong>$797/mo</strong>, no contracts.',
    h1: 'Junk Removal SEO in Miami — The Head Term Most Operators Never Target On-Page',
    lead: 'Junk removal miami gets <strong>1,300 monthly searches</strong> with low competition — the <strong>biggest demand at the lowest difficulty</strong> of any junk-removal city search in Miami-Dade. We help family-owned operators rank for it, the <strong>12 neighborhood searches</strong> beneath it, and the specific-service variants that book real jobs.',
    marketHeadline: 'Why Junk Removal Miami Is the Single Best City Page a SoFla Operator Can Own',
    marketBody: [
      'Junk removal miami is the biggest single Google search a Miami operator could rank for — <strong>1,300 monthly searches</strong>, competition score <strong>4 out of 100</strong> (which is low). Cost-per-click on Google Ads sits at <strong>$14.41</strong>, the cheapest of any Miami-Dade junk removal term — which tells you fewer competitors are bidding, leaving more room for an organic listing to scoop up the click without paying for it. Around that one big keyword sits a cluster of related searches people type slightly differently (junk removal in miami, miami junk removal, junk removal miami fl) — together they add another <strong>~200 monthly searches</strong> that one well-built page can capture at the same time. A single Miami city page built right is one of the highest-paying SEO assets a junk removal operator can own.',
      'Most Miami junk removal SERPs are split into three layers. The Map Pack rewards businesses with high review momentum, accurate citations, and consistent service-area-business signals — and is currently dominated by a mix of national franchises and a handful of multi-location regional players. The organic results below the Map Pack are mostly aggregator listings, generic local-service-directories, and a few operators who built dedicated city pages with proper schema. The third layer — the long-tail variants like junk removal miami beach, junk removal coral gables, junk removal north miami — has <strong>almost no committed local SEO presence</strong>, which is the structural opening for a small Miami-based operator. We have seen family-run companies with <strong>12 to 25 years of service history</strong> and fewer than <strong>60 Google reviews</strong> displace better-known names in the long-tail because the long-tail rewards specificity, not brand authority.',
      'Our Miami SEO build for a junk removal client centers on three pillars. First, a flagship city page with <strong>800 to 1,200 words</strong> of unique content — pricing examples, photo galleries from real Miami jobs, transparent quote process, and service-area-specific FAQ schema. Second, <strong>12 neighborhood sub-pages</strong> — Brickell, Wynwood, Coral Gables, Doral, Aventura, Miami Beach, North Miami, North Miami Beach, Coconut Grove, Little Havana, Kendall, Hialeah — each with its own <strong>600-word body</strong> and the neighborhood landmarks woven through naturally. Third, a service-variant set covering the higher-CPC sub-keywords: furniture removal miami at <strong>$22.85 CPC</strong>, construction debris removal miami at <strong>$24.06 CPC</strong>, trash removal miami at <strong>$17.80 CPC</strong>, mattress removal miami, appliance removal miami. The internal-linking across these <strong>20+ pages</strong> pulls the city head term up the rankings within <strong>90 to 120 days</strong>.',
      'This SEO program runs <strong>$797 per month</strong>, no contracts, no setup fees, you keep everything if you leave. It is built for the established Miami operator — family-owned, <strong>5 to 20 years</strong> in the local market, <strong>one to four trucks</strong> — who has watched larger competitors take a larger and larger share of inbound search traffic and finally decided to invest in the long-tail. Your first call is an audit, not a sales call. We pull your current ranks for junk removal miami and the <strong>35+ programmatic variants</strong>, show you the gap between you and whoever currently ranks above you, and give you an honest estimate of whether <strong>90 to 120 days</strong> of work will produce measurable lift. If your domain is brand-new with no review history, we will tell you it is closer to <strong>150 days</strong>. If you have an established address and <strong>80+ reviews</strong>, the timeline is usually <strong>60 to 90 days</strong>. Either way, the work builds, and the Miami market is large enough that even a <strong>3-position rank improvement</strong> on the head term is worth more than most small operators clear from paid ads in a quarter.',
    ],
    signals: [
      { label: 'Target Term', val: 'junk removal miami' },
      { label: 'Search Volume', val: '1,300/mo — highest in SoFla stack' },
      { label: 'Competition level', val: 'Low (4 out of 100) — winnable in 90-150 days' },
      { label: 'Avg Google Ads CPC', val: '$14.41' },
      { label: 'Bonus variant searches', val: '+200/mo across 4 phrasings of the head term' },
      { label: 'Coverage', val: '12 Miami neighborhood sub-pages + 5 service variants' },
    ],
    faqs: [
      {
        q: 'How much does junk removal cost in Miami?',
        a: 'Miami junk removal prices typically run <strong>$107 to $396</strong> for a small (quarter-truck) job, <strong>$396 to $600</strong> for a medium (quarter-to-half truck), and <strong>$600 to $1,099</strong> for a large (half-to-full truck) — though local operator pricing comes in <strong>20 to 40 percent below national franchise pricing</strong> for the same job. Single-item pickups (couch, mattress, single appliance) range <strong>$85 to $175</strong>. Miami-specific factors that move the price: high-rise condo pickups with elevator-reservation requirements (typically <strong>+$50 to $150</strong>), hurricane-debris jobs during June-November (typically <strong>+10 to 20 percent</strong>), and estate cleanouts billed by square footage at <strong>$0.80 to $1.80 per sq ft</strong>.',
      },
      {
        q: 'How long until my Miami junk removal company ranks for "junk removal miami"?',
        a: 'For an established Miami operator with a real Miami-Dade address, consistent business listings across the web, and <strong>80+ Google reviews</strong>, we typically see first-page movement for the head term inside <strong>90 days</strong> and consistent top-five ranking inside <strong>120 to 150 days</strong>. For a brand-new domain with no review history, the timeline extends to <strong>150 to 210 days</strong>. The long-tail neighborhood variants (junk removal brickell, junk removal coral gables, junk removal north miami beach) typically rank inside <strong>45 to 75 days</strong> because competition drops to almost zero on those specific terms.',
      },
      {
        q: 'Why do national franchises rank higher than I do in the Map Pack?',
        a: 'Two reasons. First, they have accumulated review counts that took years to build — typically <strong>300 to 700+ reviews per location</strong>, versus the <strong>20 to 60</strong> most small operators have. Second, they invest heavily in Google Business Profile management: weekly posts, monthly photo refreshes, <strong>24-hour reply speed</strong> on every review. The good news is that both gaps are closable on a <strong>6-to-12-month timeline</strong> with structured review acquisition (<strong>15 to 25 new reviews per month</strong> is achievable with a QR-card flow) and consistent GBP management (<strong>$297/mo</strong> if you want us to handle it).',
      },
      {
        q: "What's the minimum charge for junk removal in Miami?",
        a: 'Most Miami junk removal companies — local and franchise — quote a <strong>$99 to $175 minimum</strong> for a single-item pickup. The "$99 service" advertising you see in some markets typically refers to the absolute minimum bookable job, not the average ticket. Average ticket size in Miami runs <strong>$250 to $450 per job</strong>. National franchises tend to set higher minimums (<strong>$150 to $200</strong>) because their cost structure (uniformed crews, branded trucks, insurance overhead) requires it. Small local operators often go lower (<strong>$75 to $99</strong>) to compete on the price-sensitive single-item market.',
      },
      {
        q: 'Do I need to build a separate page for each Miami neighborhood?',
        a: 'Yes — if you want to rank for the neighborhood-specific searches (junk removal brickell, junk removal coral gables, junk removal aventura). Each of those searches has its own monthly volume and its own search result page, and a single Miami city page will not rank for them no matter how well-built it is. The <strong>12 Miami neighborhood pages</strong> we build are <strong>600 words</strong> each, locally relevant (specific landmarks, demographics, service-area context), and linked back to the flagship city page. The bonus: the city page itself ranks higher because of the topical authority the neighborhood pages create.',
      },
      {
        q: "How is this different from the SEO agency that didn't work for me last time?",
        a: 'Most agency engagements that fail share three patterns. The agency required a <strong>12-month contract</strong> (we do not — month-to-month, leave anytime). The agency built templated content with no Miami-specific signal (we write Miami-specific content, name local landmarks, build for the neighborhood). The agency reported on activity instead of ranks (we report on rank movements for your target searches every <strong>30 days</strong>). The audit on the first call is built to verify these — we will tell you whether your previous agency built anything reusable and where the gaps are, before quoting any work.',
      },
    ],
  },

  'junk-removal/seo/pompano-beach': {
    liveAfter: '2026-06-10',
    pageTitle: 'Junk Removal SEO Pompano Beach | Highest CPC Market in SoFla',
    pageDesc: 'SEO for Pompano Beach junk removal companies. Rank for junk removal pompano beach — 260 searches/mo, $30.08 CPC. Paired SEO + paid strategy. $797/mo, no contracts.',
    h1: 'Junk Removal SEO in Pompano Beach — Highest-CPC Market in the SoFla Stack',
    lead: 'Pompano Beach has the highest cost-per-click on junk removal in South Florida — <strong>$30.08</strong>. That sounds bad until you realize what it means: advertisers willing to pay <strong>$30 per click</strong> only do so because the booked job pays for it. We help small Pompano operators capture both the organic side (<strong>260 monthly searches</strong>) and the paid side at a level the bigger operators leave on the table.',
    marketHeadline: 'Pompano Beach Has the Best Junk Removal Margin in SoFla. Here\'s Why.',
    marketBody: [
      '"Junk removal pompano beach" is the most expensive Google Ads click in the entire SoFla junk removal market at <strong>$30.08 per click</strong> — roughly <strong>double</strong> the Fort Lauderdale rate, <strong>50% above</strong> Boca Raton. The <strong>260 monthly searches</strong> is moderate, but the price-per-click tells the story: advertisers in this market are willing to pay nearly double the regional average to capture a single qualified click. That happens for one reason — the booked-job value justifies it. For a small Pompano operator, this matters in two ways. First: paid ads are profitable here at scale, if the landing page converts above <strong>6-8%</strong>. Second: organic ranking on the head term has compounded value — every organic click that converts is a <strong>$30 click</strong> you didn\'t pay for. Over 12 months, that adds up to a real <strong>five-figure swing</strong> in marketing margin.',
      'Pompano\'s competitive picture is also different from Miami or Fort Lauderdale. The Map Pack is less dominated by national franchises here — partly because Pompano has historically been a less-prioritized franchise market, partly because the established multi-location regional players have less coverage along the Pompano corridor. That gap leaves room for a family-owned Pompano operator with <strong>8 to 20 years</strong> of service history and even a moderate review count (<strong>40 to 80 reviews</strong>) to push into the top three of the Map Pack on a defensible timeline. Competition is moderate — higher than Fort Lauderdale\'s near-zero, with real organic competitors — but still well below the regional service-page average.',
      'For Pompano specifically, we build a paired strategy because the high CPC makes Google Ads and SEO worth running together. SEO side: city page with <strong>800+</strong> unique words, <strong>4 to 6</strong> service-specific sub-pages (estate cleanout, garage cleanout, furniture removal, construction debris), a <strong>50-directory</strong> citation push, and weekly Google Business Profile posting. Paid side: a tightly-scoped Google Ads campaign on the head term and <strong>6 to 10</strong> high-intent variants, with same-day-call extensions and a dedicated landing page that mirrors the SEO copy but converts harder. The interlock matters: SEO traffic gives us conversion data we feed back into the ad campaign, and the ad campaign gives us short-term lead flow while organic ranks are climbing. Most operators run one or the other. Running both correctly is what produces <strong>12-month margin improvements</strong>.',
      'SEO runs <strong>$797 a month</strong>, no contracts. Adding Google Ads adds <strong>$250-$400/mo</strong> in management on top of ad spend (we recommend <strong>$1,500-$3,000/mo</strong> in Pompano initially, scaling only as conversion rate proves out). The pricing assumes a family-owned or solo-founder Pompano company, <strong>one to three trucks</strong>, willing to spend three to four months on the build-and-test phase before judging results. We don\'t work with national franchises and we don\'t pretend a $797/mo program will work for a 50-truck operation. The audience is the small operator who\'s been in business through three or four downturns, watched larger operators consolidate digital share, and is finally ready to take it back. First call is a real audit — we pull your ranks and your competitors\' ranks and tell you what <strong>90 days</strong> can realistically move.',
    ],
    signals: [
      { label: 'Target Term', val: 'junk removal pompano beach' },
      { label: 'Search Volume', val: '260/mo (validated DataForSEO)' },
      { label: 'Competition level', val: 'Moderate (11 out of 100)' },
      { label: 'Avg Google Ads CPC', val: '$30.08 — HIGHEST in SoFla stack' },
      { label: 'Strategy', val: 'Paired SEO + Google Ads (interlocked)' },
      { label: 'Time to first-page', val: '90-120 days for the head term' },
    ],
    faqs: [
      {
        q: 'Why is the CPC so high for junk removal in Pompano Beach?',
        a: 'Three things stack up. First, Pompano residents tend to need larger, higher-ticket cleanout jobs (estate, snowbird condo, downsizing) compared to the lower-ticket residential mix in Miami-Dade. Second, fewer high-volume Google Ads advertisers compete in Pompano than in Fort Lauderdale, which means the auction is paying premium pricing for top placement. Third, the average job ticket in Pompano runs <strong>15 to 25%</strong> above the Broward median, so advertisers can absorb a <strong>$30+ click</strong> and still earn positive return. For a small operator, this is good news: the market is profitable at scale. You just have to land the customer.',
      },
      {
        q: "Should I run Google Ads if I'm already doing SEO in Pompano Beach?",
        a: 'In Pompano, yes — because the cost-per-click is high enough that organic ranking pays back enormously when you finally get there. The <strong>90-to-120-day</strong> SEO ramp captures the patient customer who scrolls and compares, but the impatient customer who clicks the first ad they see still represents <strong>30 to 50%</strong> of total volume. We typically structure the paired strategy at <strong>$1,500-$3,000/mo</strong> in ad spend for the first two months (while organic ranks are climbing), then scale up or down based on actual conversion data by month 4. Running both with the same data feedback loop boosts total lead flow by <strong>50 to 80%</strong> over organic-only.',
      },
      {
        q: 'How much does junk removal cost in Pompano Beach?',
        a: 'Pompano Beach pricing runs slightly above the Broward median because of the heavier mix of larger, higher-ticket jobs. Single-item pickup: <strong>$95 to $200</strong>. Quarter-truck: <strong>$175 to $275</strong>. Half-truck: <strong>$300 to $450</strong>. Full truck: <strong>$500 to $850</strong>. Estate cleanouts (over-represented in Pompano) typically bill at <strong>$0.80 to $1.80 per square foot</strong> of property cleared. National franchises operating in Pompano price <strong>25 to 40%</strong> above local operators. The SEO program we build is designed to surface the local-operator price advantage in the search result through transparent pricing examples on the page.',
      },
      {
        q: 'How long until my Pompano Beach junk removal company ranks first page?',
        a: 'For an established Pompano operator with a real Broward address, consistent business listings across the web, and 40+ Google reviews, we typically see first-page movement for the head term inside 90 days and consistent top-five ranking inside 120 days. The KD of 11 is the highest of any city in the SoFla stack, so the timeline is 30 days longer than Fort Lauderdale on average. The long-tail Pompano variants (estate cleanout pompano beach, garage cleanout pompano beach) rank faster — typically 45 to 75 days — because the difficulty drops to near-zero on those specific terms.',
      },
      {
        q: 'Do national franchises win the Map Pack in Pompano Beach?',
        a: 'Less so than in Miami or Fort Lauderdale. Pompano has historically been a less-prioritized franchise market, which leaves the Map Pack more open to local operators with consistent review momentum and good Google Business Profile management. A family-owned operator with <strong>60 to 100 Google reviews</strong>, weekly GBP posts, and <strong>24-hour</strong> replies on every review can credibly rank in the top three Map Pack results within <strong>90 to 120 days</strong>. The structural opening is sharper in Pompano than in either Miami or Fort Lauderdale.',
      },
      {
        q: "What's the minimum monthly investment to compete in the Pompano market?",
        a: 'For organic-only, <strong>$797/mo</strong> covers the SEO program (city page + 4-6 service-specific pages + business-listings push + Google Business Profile management). For the paired SEO + paid strategy we recommend in Pompano, total monthly investment runs <strong>$2,200 to $4,000</strong> (SEO + ad management + actual ad spend). Most operators we work with start with the <strong>$797/mo</strong> organic program for the first 60 days while we build the foundation, then layer in paid in month 3 once we have conversion data from the organic traffic. Stepping in at the higher number on day one is rarely the right move — we want to verify the landing page converts before scaling spend.',
      },
    ],
  },

  'junk-removal/seo/west-palm-beach': {
    liveAfter: '2026-06-12',
    pageTitle: 'Junk Removal SEO West Palm Beach | 480 Searches/mo, Aggregator SERP',
    pageDesc: 'SEO for West Palm Beach junk removal companies. Rank for junk removal west palm beach — <strong>480 monthly searches</strong>. Palm Beach County focus. <strong>$797/mo</strong>, no contracts.',
    h1: 'Junk Removal SEO in West Palm Beach — Palm Beach County\'s Underserved Head Term',
    lead: 'West Palm Beach is the <strong>second-highest-volume head term</strong> in the South Florida junk removal stack — <strong>480 monthly searches</strong> at <strong>$19.37 CPC</strong>. The Palm Beach County market has fewer entrenched local operators in organic search than Miami-Dade, which is the structural opening for a family-owned West Palm operator with <strong>10+ years</strong> in the neighborhood.',
    marketHeadline: 'Why Palm Beach County Has Cleaner Air Than Miami-Dade',
    marketBody: [
      '"Junk removal west palm beach" gets <strong>480 monthly searches</strong> at a <strong>$19.37 cost-per-click</strong> — third-biggest volume in SoFla after Miami and Fort Lauderdale. The competition is low enough that the search tools have not bothered to score it. When you look at what actually ranks on page one, most of it is thin directory listings (Yelp, Angi, Thumbtack), with a handful of real operator pages mixed in. The lack of real competition is the buying signal. Most Palm Beach County operators have never invested in structured SEO, and the few who have are running thin franchise-template pages that lose to even moderately built local content.',
      'Palm Beach County\'s junk removal market differs from Broward and Miami-Dade in two ways relevant to a small operator. First, the customer base trends older and more affluent — <strong>estate cleanout, snowbird condo turnover, and downsizing services are over-represented</strong> in the search volume relative to the residential generic-cleanup that dominates Miami-Dade. Second, the competitive density is lower — there are <strong>fewer franchise locations and fewer multi-location regional operators per capita</strong> than in the Miami-Dade hubs. That combination means a West Palm Beach operator targeting both the head term and the specialty service variants (estate cleanout west palm beach, downsize cleanout west palm beach, hoarder cleanout west palm beach) has clearer air to claim than the same operator would in Miami. The longevity of the family-owned operator counts double here — Palm Beach residents over-index on personal-relationship purchases over national-brand convenience.',
      'Our West Palm Beach build is a flagship city page (<strong>800+ words</strong> of unique copy, transparent pricing, real photos), <strong>5 to 6 service variant sub-pages</strong> with a heavier emphasis on the higher-AOV specialty services (estate cleanout, downsizing, hoarder cleanout, post-renovation construction debris), and the standard <strong>50-directory citation push</strong> with strict NAP consistency. We also pay particular attention to the snowbird seasonal demand cycle — between <strong>November and April</strong>, search volume for cleanout-related variants jumps noticeably, and a small operator who anticipates that cycle with timed Google Business Profile posts and seasonal landing pages captures share that larger players typically miss. Finally, the review acquisition loop in Palm Beach skews differently than Miami: the demographic responds better to handwritten thank-you cards with QR codes than to text-message follow-ups.',
      '<strong>$797 per month</strong>, no contracts, you keep all assets if you leave. The West Palm Beach SEO build is calibrated for a family-owned or founder-led operator with <strong>a decade or more</strong> in Palm Beach County, <strong>one to three trucks</strong>, who has watched larger competitors and national brands take the obvious city-name keyword over the past five years and has decided to put a structured program in place to take it back. The first call is a real audit — we pull your current ranks for junk removal west palm beach, the <strong>8 service variants</strong>, and the <strong>4 closest competitor domains</strong>, then tell you honestly how much <strong>90 to 120 days</strong> of work will move. If we do not think it will move enough to justify the spend, we will say so on the first call. The Palm Beach County market rewards the operator who shows up consistently for years, and the SEO program is built to add up at that timescale, not to chase quick wins.',
    ],
    signals: [
      { label: 'Target Term', val: 'junk removal west palm beach' },
      { label: 'Search Volume', val: '480/mo (validated DataForSEO)' },
      { label: 'Competition level', val: 'Low — thin directory listings, no real local operator pages' },
      { label: 'Avg Google Ads CPC', val: '$19.37' },
      { label: 'Specialty service skew', val: 'Estate / downsize / snowbird-cleanout over-indexed' },
      { label: 'Time to first-page', val: '90-120 days for established operators' },
    ],
    faqs: [
      {
        q: 'How much does junk removal cost in West Palm Beach?',
        a: 'West Palm Beach junk removal pricing tracks slightly above the Miami-Dade median because of the higher mix of estate and downsizing jobs. Single-item pickup: <strong>$90 to $190</strong>. Quarter-truck: <strong>$165 to $260</strong>. Half-truck: <strong>$285 to $440</strong>. Full truck: <strong>$475 to $825</strong>. Estate cleanouts, which are common in the Palm Beach market, typically bill at <strong>$0.80 to $1.80 per square foot</strong> of property cleared, with timelines of <strong>1 to 2 weeks</strong> for larger estates with attics, basements, garages, and outbuildings. Snowbird condo turnovers between November and April typically run as flat-fee jobs in the <strong>$400 to $1,200</strong> range.',
      },
      {
        q: 'Are West Palm Beach junk removal searches different from Miami searches?',
        a: 'Yes — meaningfully so. Palm Beach County customers search for estate cleanout, downsizing, and snowbird-cleanout variants at a much higher rate than Miami-Dade customers, who search predominantly for the generic head term and standard residential variants. This shifts our content priority. In Miami we lead with the head term and neighborhood pages; in West Palm Beach we lead with the head term and specialty service pages. The SEO program we build for a West Palm operator typically allocates <strong>50 to 60 percent</strong> of the content effort to specialty service pages versus <strong>30 to 40 percent</strong> in Miami.',
      },
      {
        q: 'How long does estate cleanout SEO take to rank?',
        a: 'Estate cleanout west palm beach is one of the easier specialty terms to rank for — typically <strong>45 to 90 days</strong> for first-page movement and <strong>90 to 120 days</strong> for top-three. The reason it ranks faster than the city head term is that the SERP has thinner organic competition: most operators do not build dedicated estate-cleanout pages, so the few who do tend to capture the space quickly. The page itself needs probate-context content (timing pressure, sentimental-item handling, donation routing, hoarder estate handling) plus transparent pricing in the <strong>$0.80 to $1.80 per square foot</strong> range that the Palm Beach market expects.',
      },
      {
        q: 'How long until my West Palm Beach junk removal company ranks first page for the head term?',
        a: 'For an established West Palm operator with a real Palm Beach County address, consistent business listings across the web, and <strong>40+ Google reviews</strong>: typically <strong>75 to 105 days</strong> to first-page movement, <strong>120 days</strong> to consistent top-five ranking. The search result here actually works in your favor — most of what shows up on page one is thin directory listings (Yelp, Angi, Thumbtack pages), not real operator websites. A real Palm Beach County operator with a proper website out-converts those directory listings every time. The path to ranking is shorter than in Pompano Beach because the competition is shallower.',
      },
      {
        q: "Do I need to advertise on Google Ads if I'm doing SEO?",
        a: 'In West Palm Beach specifically, the CPC is moderate (<strong>$19.37</strong>) and the organic SERP is less aggressively contested than in Miami or Pompano, which means SEO-only can sustain a healthy lead flow if you commit to the <strong>90-to-120-day build timeline</strong>. We typically recommend organic-only for the first <strong>90 days</strong> while ranks are climbing, then a small paid budget (<strong>$800 to $1,800/mo</strong>) layered in for <strong>month 4</strong>+ to capture the impatient click. Running both correctly improves total lead volume by <strong>40 to 60 percent</strong> versus organic-only — meaningfully positive but less than the lift we see in higher-CPC markets like Pompano.',
      },
      {
        q: 'Is my one-truck operation too small for SEO to work?',
        a: 'No. One-truck operators are exactly the audience this program is built for. The key constraint is not truck count but the ability to handle a step-up in lead volume. If you are currently doing <strong>4 to 8 jobs per week</strong> and the SEO program pushes that to <strong>10 to 14</strong>, you need to be ready to either say no to some jobs or add weekend capacity. We have a conversation about capacity on the first call so we are not creating leads you cannot fulfill. The pricing tier (<strong>$797/mo</strong>) is calibrated specifically for one-to-three-truck operators with <strong>$20K to $80K monthly revenue</strong>.',
      },
    ],
  },

  'junk-removal/seo/boca-raton': {
    liveAfter: '2026-06-17',
    pageTitle: 'Junk Removal SEO Boca Raton | <strong>$25.90 CPC</strong> Premium Market',
    pageDesc: 'SEO for Boca Raton junk removal companies. Rank for junk removal boca raton — 320 searches/mo, <strong>$25.90 CPC</strong>, highest-AOV jobs in SoFla. <strong>$797/mo</strong>, no contracts.',
    h1: 'Junk Removal SEO in Boca Raton — The Highest-AOV Junk Removal Market in South Florida',
    lead: 'Boca Raton is the <strong>highest-AOV junk removal market in South Florida</strong>. <strong>320 monthly searches</strong> at <strong>$25.90 CPC</strong>, dense estate cleanout and downsizing demand, and a customer base that converts on credibility signals more than on lowest price. A small Boca operator with a real address, longevity, and a proper SEO foundation outperforms outside-the-area competitors here.',
    marketHeadline: 'Why Boca Raton Rewards Credibility Signals More Than Price',
    marketBody: [
      'Junk removal boca raton receives <strong>320 monthly searches</strong> at a Google Ads CPC of <strong>$25.90</strong> — the <strong>second-highest CPC in the SoFla junk removal stack</strong>, trailing only Pompano Beach. The CPC is the proxy for AOV: Boca Raton job tickets run <strong>30 to 60 percent higher</strong> than the regional median because the housing stock skews larger, the demographic trends affluent and older, and estate / downsizing / snowbird-cleanout demand is structurally over-represented. For a small Boca-based junk removal operator, this is the <strong>highest-margin market in the region</strong> — but it is also a market where credibility signals matter more than price signals. The Boca customer Googles your address, your reviews, your years in business, and your insurance status before calling. SEO done well surfaces those signals in the search result; SEO done poorly buries them.',
      'Boca Raton\'s junk removal SERP is split between three groups. National junk-hauling franchises with premium pricing and uniformed crews — they win on brand trust for a slice of the market but lose to local operators on price and scheduling flexibility. Established multi-location regional players that cover Boca as part of a larger South Florida route — these companies win the Map Pack on review count but lack the hyperlocal content depth to rank below the Map Pack. And family-owned local operators with <strong>8 to 25 years</strong> in Boca specifically — this is where the structural advantage sits, but the vast majority of these operators have never invested in SEO and rank entirely on inertia. The opening is sharper here than in any other SoFla city we research: a Boca-based family operator with a real Federal Highway, Glades Road, or Powerline Road address, the willingness to publish <strong>8 to 12 thoughtful pages</strong>, and a structured review acquisition loop can credibly displace the regional players\' city pages in organic search within <strong>120 days</strong>.',
      'Our Boca Raton build leans hard into credibility because Boca customers read for it. The flagship city page puts your credentials above the fold — years in Boca specifically (not just "South Florida"), insurance carrier and coverage amount, BBB rating if you have one, real before/after photos from actual Boca addresses (with the homeowner\'s consent), and transparent pricing examples instead of "call for a quote" opacity. Below that, <strong>5 to 7 service-specific pages</strong> for the work Boca customers actually book: estate cleanout, downsizing, post-renovation debris, hoarder cleanout, garage cleanout. We also write your business info into the page in the structured way Google needs to display the rich-result version of your listing — the one that shows your stars, your prices, and the answer to the customer\'s question right in the search result before they even click. The Boca customer reads that result more carefully than anywhere else in SoFla, so we earn the click before the visit. Review acquisition is a printed card matched to the demographic: heavier-weight cardstock, hand-signed by the truck operator, QR code linking direct to Google.',
      '<strong>$797 per month</strong>, no contracts, you keep all assets if you leave. The Boca Raton SEO program is built for the family-owned or founder-led junk removal operator with a Boca address and <strong>10+ years</strong> in the local market, <strong>one to four trucks</strong>, AOV running <strong>$400 to $1,200 per job</strong>, who has watched the local market increasingly fragment between premium-price national brands at the top and discount Craigslist operators at the bottom. The middle is where the small Boca operator with longevity, real credentials, and direct accountability sits — and it is the position the Boca customer actually prefers when they can find it. Most cannot find it because the small operator with longevity has no SEO presence and gets crowded out of the search result by the brands and the aggregators. Our job is to fix that. The first call is a real audit — we pull your current ranks for junk removal boca raton and the <strong>8 service variants</strong>, show you exactly where the gap is, and tell you honestly whether <strong>120 days</strong> will move enough to matter. If it will not, we say so.',
    ],
    signals: [
      { label: 'Target Term', val: 'junk removal boca raton' },
      { label: 'Search Volume', val: '320/mo (validated DataForSEO)' },
      { label: 'Competition level', val: 'Low — directory listings dominate, no real operator content' },
      { label: 'Avg Google Ads CPC', val: '$25.90 — 2nd highest in SoFla stack' },
      { label: 'AOV skew', val: '30-60% above regional median (estate / downsize)' },
      { label: 'Time to first-page', val: '120 days, credibility-focused build' },
    ],
    faqs: [
      {
        q: 'How much does junk removal cost in Boca Raton?',
        a: 'Boca Raton junk removal pricing runs <strong>25 to 40 percent above the regional median</strong> because of the larger housing stock and higher-AOV job mix. Single-item pickup: <strong>$110 to $225</strong>. Quarter-truck: <strong>$200 to $300</strong>. Half-truck: <strong>$325 to $500</strong>. Full truck: <strong>$550 to $950</strong>. Estate cleanouts, which dominate the Boca specialty mix, typically bill at <strong>$1.00 to $2.20 per square foot</strong> — the upper end of the regional range, reflecting both larger property sizes and more complex sorting requirements (high-value items requiring appraisal, donation routing for tax deductions). Hoarder cleanouts run separately at <strong>$1,500 to $8,000 per job</strong> depending on severity and access.',
      },
      {
        q: 'Why do Boca Raton customers pay more for junk removal?',
        a: 'Three factors. First, Boca property sizes average roughly <strong>20 to 35 percent larger than the Broward median</strong>, which means more cubic feet of debris per job. Second, the demographic skews older and more affluent, which over-indexes on estate, downsizing, and snowbird-cleanout work — these jobs require slower, more deliberate sorting and often involve items the homeowner wants donated rather than landfilled, which adds time. Third, Boca customers explicitly value insurance, bonding, and verifiable credentials over the lowest sticker price, which lets a credible local operator hold higher pricing without losing the job to a Craigslist operator.',
      },
      {
        q: 'How long until my Boca Raton junk removal company ranks first page for the head term?',
        a: 'For an established Boca operator with a real Palm Beach County address, consistent business listings across the web, and <strong>40+ Google reviews</strong>: typically <strong>90 to 120 days</strong> to first-page movement, <strong>150 days</strong> to consistent top-five ranking. Boca runs slightly longer than West Palm Beach because the Boca customer reads the search result more carefully than anywhere else in SoFla — ranking on page one is not enough, your listing also has to win the click on credibility (the version that shows your stars, your price range, and your answer to their question right in the Google result). We build for that detailed read, which takes longer than building for a price-shopper market.',
      },
      {
        q: 'What credentials should be on my website for the Boca customer?',
        a: 'The Boca customer reads credentials before calling, so put them on every page above the fold. Required: years in Boca specifically (not "South Florida"), real Palm Beach County business address, phone number consistent across all directories, insurance certificate verbiage with carrier and coverage limit (typically <strong>$1M general liability + $1M commercial auto</strong>), BBB accreditation if applicable, and the owner\'s name on the About page with a photo. Strongly recommended: real before/after photo galleries from Boca-specific addresses with property-owner consent, at least <strong>40 Google reviews with a 4.5+ average</strong>, and a written guarantee policy (same-day callback, on-time arrival, fixed pricing in writing before the truck leaves).',
      },
      {
        q: 'Is an estate cleanout different from a regular junk removal job?',
        a: 'Yes — significantly. Estate cleanouts involve sorting, appraising, donating, and disposing of an entire property\'s contents, typically over a <strong>1-to-2-week window</strong>. Pricing is square-foot-based rather than truck-load-based (<strong>$1.00 to $2.20 per sq ft</strong> in the Boca market). The work requires sensitivity (the family is often grieving), coordination with probate attorneys or executors, donation receipts for tax-deductible items, and sometimes coordination with auctioneers or appraisers for high-value items. Boca has one of the highest estate-cleanout demand densities in South Florida, so a dedicated estate-cleanout service page on your site is one of the highest-yield SEO assets you can build in this market.',
      },
      {
        q: 'Can a one-truck Boca operator really compete with the national franchises?',
        a: 'Yes — and the Boca market is one of the easier places to do it. The Boca customer is not price-sensitive in absolute terms (the AOV is high enough that the franchise premium is affordable for most customers), but they are credibility-sensitive. A one-truck operator with <strong>15 years in Boca</strong>, a real Boca business address, <strong>50+ Google reviews with photos</strong>, insurance verbiage on the website, and the owner answering the phone wins the credibility comparison against a national franchise location page that reads like a templated chain listing. Our job is to surface those credibility signals in the search result through proper schema, on-page content, and how fast you collect new reviews. The first call audit will tell you specifically where your current site is leaking credibility signals and what to fix first.',
      },
    ],
  },

  // ── HVAC city overrides (research: 03-keywords-hvac/) ──────────

  'hvac/seo/miami': {
    pageTitle: 'AC Repair Miami SEO | 4,400 Searches/mo, KD 2',
    pageDesc: 'SEO for Miami HVAC contractors. "ac repair miami" gets 4,400 monthly searches at a keyword difficulty of just 2. We help you own it. $797/mo, no contracts.',
    h1: 'HVAC and AC Repair SEO in Miami — The Most Winnable High-Volume Local Search in South Florida',
    lead: 'The search term ac repair miami has <strong>4,400 monthly searches</strong> at a <strong>keyword difficulty of 2</strong>. That is one of the most lopsided demand-to-competition ratios in any local market in the United States. We help Miami HVAC contractors close the gap before a competitor notices.',
    marketHeadline: 'Miami AC Repair Has Demand Without a Real SEO Defender',
    marketBody: [
      '"AC repair miami" pulls <strong>4,400 monthly searches</strong> with a keyword difficulty of <strong>2 out of 100</strong>. By comparison, "dentist miami" sits at a KD of <strong>20+</strong> on a similar volume, and "personal injury lawyer miami" is KD <strong>56</strong>. The Miami HVAC SERP is structurally underexploited: most competitors rank on Google Business Profile signals alone, with thin organic landing pages and minimal service-specific content. That gap is the entire opportunity.',
      'Cost-per-click on the same query is <strong>$13.53</strong>. That number tells you two things: HVAC contractors are paying for clicks because the LTV per service call justifies it (typical Miami AC repair ticket runs <strong>$200 to $1,500</strong> with annual maintenance contracts attached). And organic rank on this query saves you the <strong>$13.53 click cost per lead</strong> — which on <strong>30 to 60 organic calls per month</strong> translates to <strong>$400 to $800 saved monthly</strong>, on a $797/mo program that pays for itself in the first two months.',
      'Our Miami HVAC SEO build centers on three things. Service-specific pages: separate URLs for AC repair, AC installation, HVAC tune-up, emergency AC, commercial HVAC, ductless mini-split. Neighborhood targeting: <strong>12 Miami neighborhood pages</strong> (Brickell, Wynwood, Coral Gables, Hialeah, Doral, Kendall, etc.) so you rank for ac repair brickell, hvac coral gables, emergency ac doral, and the long-tail variants that have almost zero competition. Schema.org HVACBusiness markup with 24/7 emergency-availability signals, NATE-certification badges, and EPA 608 credentials.',
      'This SEO program runs <strong>$797 per month</strong>, no contracts. Most Miami HVAC operators we audit are sitting on a 5-page website built years ago, ranking for almost nothing, and paying <strong>$2,000+ per month in Google Ads</strong> for clicks they could be earning organically. The first call we have is a ranking audit, not a sales call: we pull your current positions for the 35+ HVAC programmatic variants we target and show you exactly where the gaps are.',
    ],
    signals: [
      { label: 'Head term', val: 'ac repair miami' },
      { label: 'Search volume', val: '4,400/mo' },
      { label: 'Keyword difficulty', val: '2 / 100 — unusually winnable' },
      { label: 'Google Ads CPC', val: '$13.53 (high commercial intent)' },
      { label: 'Bonus terms covered', val: 'hvac miami (1,000/mo, KD 5), air conditioning repair miami (3,600/mo)' },
      { label: 'Coverage build', val: '12 Miami neighborhoods + 6 service variants' },
    ],
    faqs: [
      {
        q: 'Why is "ac repair miami" so low competition for such a high-volume search?',
        a: 'Most Miami HVAC operators win business through Google Business Profile, repeat customers, and word of mouth. They have not seriously invested in organic SEO, which leaves the search-results page open to whoever builds proper service-specific landing pages and neighborhood targeting first. The opportunity stays open until a critical mass of competitors notices, which is usually <strong>6 to 18 months</strong> after the first operator wins the SERP.',
      },
      {
        q: 'How long to rank for "ac repair miami" with a fresh SEO build?',
        a: 'For an established Miami HVAC contractor with a real Miami-Dade address, <strong>50+ Google reviews</strong>, and consistent business listings, we typically see first-page movement on the head term inside <strong>60 to 90 days</strong> and consistent top-five ranking inside <strong>90 to 120 days</strong>. The neighborhood long-tail variants (ac repair brickell, hvac doral, etc.) typically rank inside <strong>30 to 60 days</strong> because they have almost zero existing competition.',
      },
      {
        q: 'Will SEO replace my Google Ads spend?',
        a: 'It reduces it, not replaces it. Once organic ranking lands on the head term, you can typically cut <strong>30 to 50 percent of your search ads budget</strong> while maintaining the same call volume, because the organic + ad presence stacks on the same SERP. The remaining ad budget concentrates on emergency-intent queries ("ac broken miami", "no cool air") that justify same-day call-out at higher pricing.',
      },
      {
        q: 'What if my HVAC business is brand new with no reviews?',
        a: 'The SEO build still works but the ranking timeline extends to <strong>120 to 180 days</strong> instead of 60 to 90. The accelerator is review velocity: we recommend pairing the SEO program with the <strong>$297/mo reputation management add-on</strong> from day one. A new operator who hits <strong>40+ Google reviews</strong> in the first 90 days typically catches up to established operators on Map Pack visibility inside 6 months.',
      },
    ],
  },

  'hvac/seo/fort-lauderdale': {
    pageTitle: 'HVAC SEO Fort Lauderdale | Capture the Broward Market',
    pageDesc: 'SEO for Fort Lauderdale HVAC contractors. Rank for ac repair fort lauderdale and the surrounding Broward suburbs. Year-round demand, no contracts.',
    h1: 'HVAC and AC Repair SEO in Fort Lauderdale — Building the Broward Defender Position',
    lead: 'Fort Lauderdale HVAC search demand looks moderate at the head-term level until you stack it with the surrounding Broward suburbs (Plantation, Sunrise, Lauderdale-by-the-Sea, Wilton Manors, Tamarac). The right SEO build captures all of them at once.',
    marketHeadline: 'The Fort Lauderdale Stack: Why Broward HVAC SEO Compounds',
    marketBody: [
      'Fort Lauderdale itself is a meaningful search market for HVAC, but the real value is the surrounding Broward county footprint. The <strong>165 miles of inland canals and the waterfront condo footprint</strong> means HVAC service demand concentrates around year-round AC use and saltwater-corrosion-driven equipment replacement cycles. Buyers in Las Olas Isles, Coral Ridge, Victoria Park, and Lauderdale-by-the-Sea search by neighborhood, not by city — which is exactly the long-tail SEO play.',
      'Beyond the city itself, the SEO build extends to the Broward suburbs that Fort Lauderdale residents cross to hire from (Plantation, Sunrise, Tamarac, Wilton Manors). Service-area expansion through proper GBP polygon setup plus dedicated suburb landing pages compounds the SEO authority of the Fort Lauderdale flagship page.',
      'Pricing: <strong>$797/mo</strong> for the SEO program. The Broward expansion typically adds <strong>5 to 8 new neighborhood / suburb landing pages</strong> in the first 90 days, then iterates based on which terms produce calls. We pull DataForSEO ranking data monthly so the build follows actual demand, not assumptions.',
    ],
    signals: [
      { label: 'Head term', val: 'ac repair fort lauderdale' },
      { label: 'Local stack', val: '+ Plantation, Sunrise, Wilton Manors, Tamarac' },
      { label: 'Demand season', val: '12 months — year-round AC use' },
      { label: 'Equipment-replacement driver', val: 'Saltwater corrosion in waterfront properties' },
      { label: 'Coverage build', val: '5-8 Broward sub-area landing pages' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'How does Fort Lauderdale HVAC SEO differ from Miami HVAC SEO?',
        a: 'The keyword landscape is less head-term-heavy and more long-tail-distributed. Where Miami has a <strong>4,400-search head term</strong> ("ac repair miami"), Fort Lauderdale demand is split across the city plus 4 to 6 surrounding Broward suburbs. The SEO build reflects that: fewer flagship pages, more neighborhood + suburb pages.',
      },
      {
        q: 'Should I list every Broward city I serve or focus on Fort Lauderdale?',
        a: 'Both. A dedicated Fort Lauderdale flagship page anchors the SEO authority. Surrounding suburb pages (Plantation, Sunrise, Tamarac, etc.) capture the long-tail searches and signal service-area coverage to Google. Most Fort Lauderdale HVAC sites do one or the other. The compound play is the SEO advantage.',
      },
      {
        q: 'How much of Broward should one operator try to serve?',
        a: 'Realistically, an HVAC operator with <strong>2 to 5 trucks</strong> can cover a 12-to-15-mile radius from the central yard without sacrificing route density. For most Fort Lauderdale operators, that radius pulls in Plantation, Sunrise, Wilton Manors, Oakland Park, and parts of Tamarac. We build the SEO around the realistic service area, not a wishful one.',
      },
    ],
  },

  'hvac/seo/hollywood-fl': {
    pageTitle: 'HVAC SEO Hollywood FL | Bilingual Beach + Broadwalk Market',
    pageDesc: 'SEO for Hollywood FL HVAC contractors. Bilingual search demand, year-round AC needs, beach-adjacent service area. $797/mo, no contracts.',
    h1: 'HVAC and AC Repair SEO in Hollywood, FL — Bilingual Search Demand on the Beach Broadwalk Corridor',
    lead: 'Hollywood, FL has one of the highest Israeli, Brazilian, and Colombian populations per capita in the United States. Hollywood HVAC search demand splits across three languages inside the same zip code. A site that only ranks for English misses roughly a third of the addressable market.',
    marketHeadline: 'Hollywood HVAC: The Multilingual SEO Play Most Competitors Miss',
    marketBody: [
      'Hollywood, FL is unique among South Florida cities for the depth of its multilingual buyer base. "Reparación de aires acondicionados hollywood" pulls measurable search volume that almost no local HVAC site targets. "Conserto de ar condicionado" picks up the Brazilian Portuguese segment. The compound English-Spanish-Portuguese SEO play is the structural opening here.',
      'Geographic coverage runs across the Hollywood Beach broadwalk corridor, the inland Hollywood Hills, the Emerald Hills golf-community demographic, and the Hollywood Lakes residential pocket. Each sub-area has its own service-call profile and search behavior. The SEO build creates a flagship Hollywood page plus 4 to 6 sub-area landing pages that each carry their own neighborhood-specific signal.',
      'Pricing: <strong>$797/mo</strong> for the English SEO program. The bilingual / trilingual add-on adds <strong>$200/mo</strong> for ongoing Spanish + Portuguese content maintenance, with a one-time <strong>$2,000-$3,500 build cost</strong> for the initial translated page set. Pays back inside 4 to 6 months for any operator serving Hollywood at meaningful volume.',
    ],
    signals: [
      { label: 'Head term', val: 'ac repair hollywood fl (1,300/mo, KD 0)' },
      { label: 'Bilingual demand', val: 'EN + ES + PT all measurable' },
      { label: 'Sub-areas', val: 'Hollywood Beach, Hollywood Hills, Emerald Hills, Hollywood Lakes' },
      { label: 'Service season', val: '12 months — year-round' },
      { label: 'Bilingual add-on', val: '+$200/mo + $2,000-$3,500 build' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Is Spanish-language HVAC marketing worth the investment in Hollywood?',
        a: 'Yes. The Hollywood Latino population (Cuban, Venezuelan, Colombian, Nicaraguan, plus the meaningful Brazilian community) has high HVAC service demand and limited Spanish-language competitor presence on Google. A real Spanish landing page (written by a native speaker, not Google-translated) converts Spanish-language clicks at <strong>2 to 3 times</strong> the rate of translated English pages.',
      },
      {
        q: 'Should I include Portuguese for the Brazilian community?',
        a: 'If your operating footprint includes the Hollywood Beach corridor and Aventura-adjacent zip codes, yes. The Brazilian community in Hollywood is concentrated and active online. A single Portuguese landing page covering "conserto de ar condicionado" and "instalação de ar condicionado" with proper geo-targeting often outperforms the equivalent English long-tail.',
      },
    ],
  },

  'hvac/seo/boca-raton': {
    pageTitle: 'HVAC SEO Boca Raton | Premium Service Tier Market',
    pageDesc: 'SEO for Boca Raton HVAC contractors. Premium-tier service buyers, gated-community access expertise, year-round demand. $797/mo, no contracts.',
    h1: 'HVAC and AC Repair SEO in Boca Raton — The Premium Service Tier Market',
    lead: 'Boca Raton HVAC buyers research methodically and pay for premium service tiers. The keyword difficulty on ac repair boca raton is <strong>0</strong>, the CPC is <strong>$22.09</strong>, and the average service ticket runs significantly above the SoFla regional median.',
    marketHeadline: 'Boca Raton HVAC: High CPC, Low Competition, Premium Buyers',
    marketBody: [
      'Boca Raton has the unusual combination of <strong>$22.09 cost-per-click</strong> on the head HVAC term with a <strong>keyword difficulty of 0</strong>. That CPC-to-KD ratio is one of the most favorable in any SoFla local-service market. Translation: advertisers pay big for the click because the average job is large, but organic ranking is structurally winnable because almost no competitor has invested in real SEO.',
      'Boca buyers research methodically. Average pre-purchase research depth on premium home services here runs longer than the South Florida average. That rewards SEO content that covers the comparison and decision-frame queries: "best hvac contractor boca raton", "boca raton hvac maintenance program", "ductless mini-split boca raton". Each of those long-tail queries has its own search volume and its own near-empty SERP.',
      'Service-area coverage spans Boca West (the gated golf-community corridor), East Boca (the older walkable neighborhoods), the Mizner Park area, and the Town Center / Yamato corridor. Gated-community access expertise (knowing the gate-call etiquette, the property-management contact protocols) is a real differentiator worth mentioning in the on-page content.',
    ],
    signals: [
      { label: 'Head term', val: 'ac repair boca raton (1,000/mo, KD 0)' },
      { label: 'Google Ads CPC', val: '$22.09 — premium-tier market' },
      { label: 'Buyer profile', val: 'Research-heavy, premium-tier' },
      { label: 'Gated community access', val: 'Boca West, Royal Palm Yacht Club, etc.' },
      { label: 'Service season', val: '12 months — year-round' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Why is "ac repair boca raton" cost-per-click so high?',
        a: 'Average ticket size in Boca Raton runs <strong>30 to 60 percent above</strong> the SoFla regional median for HVAC service. Larger homes, higher-end equipment, and a buyer profile willing to pay for premium service tiers all push the per-job revenue up. Advertisers pay $22 per click because the booked job is worth it. Organic ranking earns those same calls at zero marginal cost.',
      },
      {
        q: 'Do gated-community customers really change the marketing approach?',
        a: 'Yes, on two levels. First, the on-page content should signal gated-community familiarity (gate-call protocols, property-management coordination, after-hours access). Second, the service area should cover the specific gated communities by name where appropriate (Boca West, Royal Palm Yacht Club, St. Andrews) so the long-tail searches find you.',
      },
    ],
  },

  // ── Roofing city overrides (research: 03-keywords-roofing/) ──────────

  'roofing/seo/miami': {
    pageTitle: 'Roofing SEO Miami | $40 CPC Market, Hurricane Surge Compound',
    pageDesc: 'SEO for Miami roofing contractors. Capture $39.77-CPC organic traffic, hurricane-surge surge demand, $5K-$25K-per-job economics. $797/mo, no contracts.',
    h1: 'Roofing SEO in Miami — Earning the $40-Per-Click Lead at Organic-Search Cost',
    lead: 'Roofers in Miami pay <strong>$39.77 per click</strong> on Google Ads for "roof repair miami" because the average job is <strong>$5K to $25K</strong>. The same intent shows up in organic search, and operators with proper SEO earn those leads without paying a $40 toll for each one.',
    marketHeadline: 'Miami Roofing: Two Economies, One SEO Build',
    marketBody: [
      'Miami roofers operate in two economies simultaneously. The year-round replacement market runs on the <strong>14-year average roof lifespan</strong> in South Florida (half the national average due to UV and storm cycles) plus the Florida insurance non-renewal cycle that forces homeowners to replace older roofs to keep coverage. The hurricane-driven surge runs in 30-to-90-day windows after any named storm event. SEO that serves only one economy leaves the other on the table.',
      'The head term "roofer miami" has a KD of <strong>32</strong> (tough but winnable on a 90-to-180-day build). The high-margin long-tail (metal roof miami, tile roof repair coral gables, flat roof miami beach, hurricane roof repair miami) has KDs between <strong>4 and 18</strong> and converts at <strong>2 to 3 times</strong> the head-term rate because the searcher already knows what they want. The SEO build creates both: head-term authority plus a long-tail lattice across roof type × neighborhood.',
      'Pricing: <strong>$797/mo</strong> for the SEO program. The build typically includes <strong>4 to 6 roof-type service pages</strong> (asphalt, tile, metal, flat, commercial, residential replacement) plus <strong>12 Miami neighborhood pages</strong> plus <strong>4 hurricane-cycle content assets</strong> (pre-storm prep, post-storm inspection, insurance-claim walkthrough, mitigation re-nail credit). The internal-linking pulls the head term up the rankings within 90 to 180 days.',
    ],
    signals: [
      { label: 'Head term', val: 'roofer miami (2,400/mo, KD 32)' },
      { label: 'High-CPC variant', val: 'roof repair miami ($39.77 CPC)' },
      { label: 'Job ticket range', val: '$5,000 to $25,000' },
      { label: 'Year-round driver', val: '14yr avg lifespan + insurance non-renewal cycle' },
      { label: 'Surge driver', val: '30-90d post-named-storm window' },
      { label: 'Build coverage', val: '4-6 roof-type pages × 12 Miami neighborhood pages' },
    ],
    faqs: [
      {
        q: 'How long to rank for "roofer miami" with a fresh SEO build?',
        a: 'The head term has a KD of 32, which makes it a 90-to-180-day rank target depending on starting domain authority and review velocity. The long-tail roof-type and neighborhood pages typically rank inside 45 to 90 days because competition on those specific terms is minimal.',
      },
      {
        q: 'Should I focus on emergency / storm SEO or replacement SEO?',
        a: 'Both, but the replacement SEO is the steady-state revenue and the emergency SEO is the surge capacity. The replacement lattice (roof type × neighborhood) runs year-round. The emergency content assets (post-storm guides, insurance-claim walkthroughs) earn organic traffic during the surge windows and stay indexed afterward as evergreen ranking pieces.',
      },
      {
        q: 'Does my manufacturer credential (GAF Master Elite, Owens Corning Platinum) help SEO?',
        a: 'Indirectly but meaningfully. The credential gives you eligibility to the manufacturer-certified-contractor directories (high-trust citations equivalent to a quality backlink). It also unlocks 25-to-50-year extended warranties, which become real on-page conversion content. Most competitors hide the credential. We make it a primary signal on every roof-type service page.',
      },
    ],
  },

  'roofing/seo/fort-lauderdale': {
    pageTitle: 'Roofing SEO Fort Lauderdale | KD 10, $22 CPC Market',
    pageDesc: 'SEO for Fort Lauderdale roofing contractors. roofer fort lauderdale at KD 10 with $22.78 CPC. Broward + waterfront expertise. $797/mo, no contracts.',
    h1: 'Roofing SEO in Fort Lauderdale — KD 10 on a $22-Per-Click Market',
    lead: '"Roofer fort lauderdale" has a keyword difficulty of <strong>10</strong> and a CPC of <strong>$22.78</strong>. That ratio (low KD + high CPC) is the structural signal of a winnable SEO market with healthy job economics underneath.',
    marketHeadline: 'Fort Lauderdale Roofing: Waterfront Equipment Stress + Broward Coverage',
    marketBody: [
      'Fort Lauderdale roofing demand carries an additional driver most non-coastal markets do not: <strong>saltwater corrosion and waterfront wind exposure</strong>. The 165 miles of inland canals and the Atlantic-facing residential corridor means roof systems wear faster, fastener corrosion is more aggressive, and equipment replacement cycles are shorter. The SEO content that names these specific waterfront conditions outperforms generic regional copy.',
      'Geographic coverage spans Fort Lauderdale proper plus the Broward suburbs that share the same roofing buyer profile: Plantation, Sunrise, Wilton Manors, Oakland Park, Lauderdale-by-the-Sea, Tamarac. The SEO build creates a flagship Fort Lauderdale page plus <strong>5 to 7 sub-area landing pages</strong> that each capture the long-tail demand without diluting the flagship.',
      'Pricing: <strong>$797/mo</strong> for the SEO program. Hurricane-season ad budget management is offered as an add-on for operators who want paired SEO + paid campaign management during storm-surge windows.',
    ],
    signals: [
      { label: 'Head term', val: 'roofer fort lauderdale (720/mo, KD 10)' },
      { label: 'Google Ads CPC', val: '$22.78' },
      { label: 'Waterfront driver', val: 'Salt corrosion + Atlantic wind exposure' },
      { label: 'Coverage stack', val: 'Plantation, Sunrise, Wilton Manors, Oakland Park, Lauderdale-by-the-Sea' },
      { label: 'Hurricane surge', val: '30-90d post-named-storm bursts' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'How does waterfront residential roofing change the SEO content?',
        a: 'Waterfront homes face accelerated fastener corrosion, faster underlayment degradation, and higher wind-uplift requirements. Content that names these conditions, explains the appropriate material choices (stainless fasteners, premium underlayment, wind-uplift-rated shingle systems), and walks through the inspection process for canal-front properties earns trust with the educated waterfront buyer.',
      },
      {
        q: 'Should I be on the GAF and Owens Corning certified-contractor directories?',
        a: 'Yes, if eligible. Those directories are high-trust citations specifically for roofing search. The certification process (GAF Master Elite or Owens Corning Platinum) takes 3 to 6 months but unlocks extended warranty offerings that materially close more deals.',
      },
    ],
  },

  'roofing/seo/west-palm-beach': {
    pageTitle: 'Roofing SEO West Palm Beach | $20 CPC, Palm Beach Cross-Bridge Market',
    pageDesc: 'SEO for West Palm Beach roofing contractors. KD 12, $20.44 CPC. Palm Beach mainland service + premium tier expertise. $797/mo, no contracts.',
    h1: 'Roofing SEO in West Palm Beach — Mainland Anchor for the Palm Beach Premium Market',
    lead: 'West Palm Beach has the unusual position of serving both the year-round Palm Beach County mainland market and the high-net-worth Palm Beach seasonal cross-bridge market. The keyword difficulty on "roofer west palm beach" is <strong>12</strong> with a CPC of <strong>$20.44</strong>.',
    marketHeadline: 'West Palm Beach Roofing: Two-Market Anchor with Premium-Tier Crossover',
    marketBody: [
      'West Palm Beach sits across the Intracoastal from Palm Beach proper, which holds one of the highest concentrations of household wealth above $5M in the United States. The two markets blur every season: West Palm roofing contractors serve both the full-time mainland residents and the seasonal Palm Beach household-staff economy that orchestrates premium work for absent owners. The SEO content should address both buyer profiles.',
      'Coverage extends to the surrounding Palm Beach County corridor: Lake Worth, Lantana, Greenacres, Royal Palm Beach, Wellington. The SEO build creates a flagship West Palm Beach page plus targeted sub-area pages for the cities where roofing service demand concentrates.',
      'Pricing: <strong>$797/mo</strong> for the SEO program. The Palm Beach mainland tier and the Palm Beach seasonal cross-bridge tier are addressed as separate on-page content sections (different buyer profiles, different price points, different service expectations).',
    ],
    signals: [
      { label: 'Head term', val: 'roofer west palm beach (1,000/mo, KD 12)' },
      { label: 'Google Ads CPC', val: '$20.44' },
      { label: 'Two-market driver', val: 'Year-round mainland + seasonal Palm Beach cross-bridge' },
      { label: 'Coverage stack', val: 'WPB + Lake Worth + Lantana + Royal Palm Beach + Wellington' },
      { label: 'Premium-tier driver', val: 'Highest density of $5M+ households in the country across the Intracoastal' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Should I market separately to Palm Beach proper and West Palm Beach mainland?',
        a: 'Yes. The two markets are structurally different. Palm Beach proper buyers are wealth-tier with household staff managing service decisions. West Palm Beach mainland buyers are middle-to-upper-middle-tier with owner-decision purchasing. The on-page content should address both clearly. A roofer who blurs the two loses both audiences.',
      },
    ],
  },

  // ── Restoration city overrides (research: 03-keywords-restoration/) ──────────

  'restoration/seo/miami': {
    pageTitle: 'Mold Removal + Water Damage SEO Miami | KD 5, $29 CPC',
    pageDesc: 'SEO for Miami restoration contractors. mold removal miami at KD 5, water damage restoration miami at KD 0. $2K-$15K insurance-billable tickets. $797/mo.',
    h1: 'Water Damage and Mold Restoration SEO in Miami — KD 5 on a $29-Per-Click Market',
    lead: 'The restoration search market in Miami is structurally underexploited. "Mold removal miami" has <strong>1,600 monthly searches</strong> at a <strong>keyword difficulty of 5</strong> and a <strong>$29.76 CPC</strong>. That combination of demand, low organic competition, and insurance-billable job economics is the structural opportunity.',
    marketHeadline: 'Miami Restoration: The SEO Math Almost Nobody Is Defending',
    marketBody: [
      'Restoration demand in Miami runs on three drivers: the year-round mold inspection cycle (high humidity, older housing stock, condo HOA inspection requirements), the storm-driven flood damage surge (any named storm produces 30-to-90-day demand bursts), and the day-to-day plumbing failure baseline (burst pipes, washing-machine overflows, water-heater failures). The SEO content that addresses all three drivers compounds organic traffic across the year.',
      'Keyword landscape: "mold removal miami" (1,600/mo, KD 5), "mold inspection miami" (1,600/mo, KD 1), "mold remediation miami" (1,600/mo, KD 16), "water damage restoration miami" (390/mo, KD 0). The KD-0 to KD-16 range across this entire cluster is unusually low for a vertical with $2K-to-$15K average tickets, most of which are insurance-billable.',
      'The SEO build creates emergency-response content (flooded basement guide, post-hurricane mold checklist, insurance-claim walkthrough), service x emergency-type pages (water damage Brickell, mold removal Aventura, fire damage Coral Gables), and the IICRC certification + insurance-carrier badge signal stack that the panic-moment buyer is scanning for in 3 seconds.',
      'Pricing: <strong>$797/mo</strong> for the SEO program. Most Miami restoration operators we audit have lean 5-page websites covering all services on one URL and no emergency-intent content. The build typically lifts organic call volume <strong>3 to 6x</strong> in the first 6 months by simply targeting the long-tail emergency queries competitors have ignored.',
    ],
    signals: [
      { label: 'Head term', val: 'mold removal miami (1,600/mo, KD 5)' },
      { label: 'Google Ads CPC', val: '$29.76' },
      { label: 'Sister terms', val: 'mold inspection (KD 1), water damage restoration (KD 0)' },
      { label: 'Job ticket range', val: '$2,000 to $15,000 (mostly insurance-billable)' },
      { label: 'Demand drivers', val: 'Humidity + storm surge + plumbing baseline' },
      { label: 'Coverage build', val: '12 Miami neighborhoods × 5 service types' },
    ],
    faqs: [
      {
        q: 'Why is restoration SEO in Miami so underexploited?',
        a: 'Most Miami restoration operators win business through insurance-carrier referrals and 24/7 dispatch. They have not invested in organic search because the lead flow from preferred-vendor programs has been enough. The trend is shifting: insurance carriers are routing more work through algorithmic matching that weights Google reviews and digital presence, and organic search now drives a meaningful share of the high-LTV self-pay (pre-claim) inquiries.',
      },
      {
        q: 'How long to rank for "mold removal miami" with a fresh SEO build?',
        a: 'KD 5 on a 1,600/mo head term ranks inside <strong>60 to 90 days</strong> for an established Miami restoration operator with a real address, IICRC certifications displayed, and consistent business listings. The neighborhood long-tail variants (mold removal aventura, water damage brickell, fire damage doral) rank inside <strong>30 to 60 days</strong> due to minimal competition.',
      },
      {
        q: 'Does my IICRC certification affect SEO ranking?',
        a: 'Directly through schema (we mark up your IICRC firm certification in your LocalBusiness schema). Indirectly through trust signals (the certification on every page becomes a conversion driver). And referentially through the IICRC certified-firm directory, which is a high-trust citation specifically for restoration search.',
      },
      {
        q: 'How does insurance-billing change the on-page content?',
        a: 'It changes the buyer trust calculus. Most restoration buyers do not have $8K in cash to pay out of pocket. Pages that prominently signal "we work with all major carriers", "direct billing", and "deductible-only out of pocket" remove the biggest decision-stall and convert significantly higher than pages that bury the insurance information in a footer.',
      },
    ],
  },

  'restoration/seo/fort-lauderdale': {
    pageTitle: 'Mold Removal + Water Damage SEO Fort Lauderdale | Broward Emergency Market',
    pageDesc: 'SEO for Fort Lauderdale restoration contractors. Broward coverage, 24/7 emergency response, insurance-claim expertise. $797/mo, no contracts.',
    h1: 'Water Damage and Mold Restoration SEO in Fort Lauderdale — Broward Emergency-Response Build',
    lead: 'Fort Lauderdale restoration demand concentrates around the waterfront condo market and the canal-adjacent residential corridor, where water intrusion events are more frequent and insurance-claim volume per capita is meaningfully higher than the inland Broward average.',
    marketHeadline: 'Fort Lauderdale Restoration: The Waterfront Emergency Profile',
    marketBody: [
      'The 165 miles of inland canals plus the Atlantic-facing residential and condo stock means Fort Lauderdale restoration demand carries a unique waterfront-emergency profile. Storm-surge damage, canal-overflow flooding, and saltwater-intrusion damage events all drive emergency calls at higher per-capita rates than inland Broward neighborhoods.',
      'Geographic coverage extends across Fort Lauderdale plus the Broward suburbs that share the same insurance-claim and emergency-response patterns: Wilton Manors, Oakland Park, Lauderdale-by-the-Sea, Plantation, Sunrise. The SEO build creates a flagship Fort Lauderdale page plus sub-area pages covering the high-emergency-density zip codes.',
      'Pricing: <strong>$797/mo</strong> for the SEO program. Storm-surge ad budget management is offered as an add-on during active hurricane season for operators who want paired SEO + paid campaign coverage.',
    ],
    signals: [
      { label: 'Head term', val: 'water damage fort lauderdale + mold removal fort lauderdale' },
      { label: 'Waterfront emergency driver', val: 'Canal overflow + Atlantic surge + saltwater intrusion' },
      { label: 'Coverage stack', val: 'Wilton Manors, Oakland Park, Lauderdale-by-the-Sea, Plantation, Sunrise' },
      { label: 'Insurance billing', val: 'Direct billing to Citizens, State Farm, Allstate, Tower Hill' },
      { label: '24/7 response', val: 'Required for Map Pack ranking on emergency-intent queries' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Why is 24/7 response so critical for Fort Lauderdale restoration SEO?',
        a: 'Emergency-intent queries (water damage emergency, flooded basement, burst pipe cleanup) are won by whoever picks up the phone first. A restoration operator who routes after-hours calls to voicemail loses 60-to-80 percent of the emergency-intent leads to the competitor whose dispatcher answers. The 24/7 availability has to be real, signaled in GBP, signaled on the website, and reflected in actual call handling.',
      },
    ],
  },

  // ── Plumber city overrides (research: 03-keywords-plumber/) ──────────

  'plumber/seo/miami': {
    pageTitle: 'Plumber Miami SEO | 5,400 Searches/mo Head Term',
    pageDesc: 'SEO for Miami plumbing contractors. plumber miami 5,400/mo at KD 17 with $10.31 CPC. Service x neighborhood lattice + 24/7 emergency intent. $797/mo.',
    h1: 'Plumber Miami SEO — The Biggest Single-Trade Search Market in South Florida',
    lead: 'plumber miami pulls <strong>5,400 monthly searches</strong> at a <strong>keyword difficulty of 17</strong>. That is the biggest single-trade search term we measured in South Florida. The contractors who rank organically here earn the leads competitors pay <strong>$10.31 per click</strong> to chase.',
    marketHeadline: 'Miami Plumbing: The 5,400-Search Head Term',
    marketBody: [
      '"Plumber miami" is the single biggest trade search in our SoFla dataset at <strong>5,400 monthly searches</strong>. Surrounding queries add another <strong>~600 monthly searches</strong> (plumbing repair miami, miami plumber, miami plumbing services). The keyword difficulty sits at <strong>17</strong>, which is meaningfully tougher than the new-vertical KD 0-5 markets but still well within reach for an established Miami plumbing operator with proper service-area architecture.',
      'Beyond the head term, the long-tail is dramatically easier and pays more per click. drain cleaning miami at <strong>KD 0 + $17.41 CPC</strong>. water heater repair miami at <strong>KD 0 + $27.34 CPC</strong>. leak detection miami at <strong>KD 0 + $22.50 CPC</strong>. emergency plumber miami at <strong>$53.00 CPC</strong>. The long-tail lattice (service x neighborhood) compounds organic traffic across these high-CPC queries that almost no Miami plumbing site systematically targets.',
      'Our Miami plumbing SEO build centers on three pillars. Service-specific pages: separate URLs for drain cleaning, water heater repair, leak detection, repipe, sewer service, gas line, emergency plumbing. Neighborhood targeting: <strong>12 Miami neighborhood pages</strong> (Brickell, Wynwood, Coral Gables, Hialeah, Doral, Kendall, Aventura, etc.) so you rank for plumber brickell, drain cleaning coral gables, water heater repair aventura. Schema.org Plumber + Service markup with 24/7 openingHours, Florida CFC license number, and insurance proof.',
      '<strong>$797/mo</strong>, no contracts. Most Miami plumbing operators we audit are sitting on a 5-page website built years ago and paying <strong>$3K-$8K/mo on Google Ads</strong> for clicks they could be earning organically. First call is a ranking audit, not a sales call.',
    ],
    signals: [
      { label: 'Head term', val: 'plumber miami' },
      { label: 'Search volume', val: '5,400/mo (biggest single-trade head term in SoFla)' },
      { label: 'Keyword difficulty', val: '17 / 100 — winnable in 90-150 days' },
      { label: 'Google Ads CPC', val: '$10.31' },
      { label: 'High-CPC long-tail', val: 'emergency plumber miami $53 CPC, water heater repair miami $27 CPC' },
      { label: 'Coverage build', val: '12 Miami neighborhoods + 7 service variants' },
    ],
    faqs: [
      {
        q: 'How long to rank for "plumber miami" with a fresh SEO build?',
        a: 'For an established Miami plumber with a real Miami-Dade address, <strong>50+ Google reviews</strong>, and consistent business listings, we typically see first-page movement inside <strong>90 to 120 days</strong> and top-five ranking inside <strong>120 to 180 days</strong>. The neighborhood long-tail variants (plumber brickell, drain cleaning coral gables) typically rank inside <strong>45 to 90 days</strong>.',
      },
      {
        q: 'Will SEO replace my Google Ads spend on plumbing?',
        a: 'It reduces it, not replaces it. Once organic ranking lands on the head term, you can typically cut <strong>30 to 50 percent</strong> of your search ads budget while maintaining call volume. The remaining ad budget concentrates on emergency-intent queries ("burst pipe", "no hot water emergency") that justify same-day call-out pricing.',
      },
      {
        q: 'What if my plumbing business is brand new with no reviews?',
        a: 'The SEO build still works but the ranking timeline extends to <strong>150 to 210 days</strong>. The accelerator is review velocity — pair the SEO program with the <strong>$297/mo reputation management add-on</strong> from day one. A new operator who hits <strong>40+ Google reviews</strong> in 90 days catches up to established operators on Map Pack visibility inside 6 months.',
      },
    ],
  },

  'plumber/seo/west-palm-beach': {
    pageTitle: 'Plumber SEO West Palm Beach | $44 CPC Premium Market',
    pageDesc: 'SEO for West Palm Beach plumbing contractors. plumber west palm beach KD 5 at $44.02 CPC — highest plumbing CPC in SoFla. $797/mo, no contracts.',
    h1: 'Plumber SEO in West Palm Beach — The Highest-CPC Plumbing Market in South Florida',
    lead: '"Plumber west palm beach" carries a <strong>$44.02 cost-per-click</strong> at a <strong>keyword difficulty of 5</strong>. That ratio (high CPC + low KD) is the structural signal of a winnable SEO market with premium-tier job economics underneath.',
    marketHeadline: 'West Palm Beach Plumbing: Premium Tier + Cross-Bridge Service Economy',
    marketBody: [
      'West Palm Beach plumbing demand carries a unique profile. The mainland market (West Palm Beach proper, Lake Worth, Lantana, Royal Palm Beach) sustains year-round residential and commercial demand. The cross-bridge market (Palm Beach proper, with one of the highest concentrations of $5M+ households in the United States) drives premium-tier service work with concierge-level expectations.',
      'The $44 CPC tells you the underlying economics. Average per-job ticket here runs <strong>30 to 60 percent above</strong> the SoFla regional median. Repipes ($8K-$25K+), whole-house water filtration ($3K-$12K), tankless water heater installations ($4K-$8K), and emergency calls at premium hours all drive job values that justify the high CPC. Organic ranking at KD 5 is unusually achievable for the value of the search.',
      'Coverage extends across West Palm Beach plus the surrounding Palm Beach County corridor (Lake Worth, Lantana, Greenacres, Royal Palm Beach, Wellington). The SEO build creates a flagship West Palm Beach page plus sub-area pages for the suburbs and a separate landing page for the Palm Beach premium-service tier.',
      '<strong>$797/mo</strong>, no contracts.',
    ],
    signals: [
      { label: 'Head term', val: 'plumber west palm beach (1,000/mo, KD 5)' },
      { label: 'Google Ads CPC', val: '$44.02 — highest plumbing CPC in SoFla' },
      { label: 'Two-market driver', val: 'Year-round mainland + Palm Beach premium cross-bridge' },
      { label: 'Coverage stack', val: 'WPB + Lake Worth + Lantana + Royal Palm Beach + Wellington' },
      { label: 'Premium-tier driver', val: 'Highest density of $5M+ households across the Intracoastal' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Why is "plumber west palm beach" CPC so high at $44?',
        a: 'Average per-job ticket in West Palm Beach plumbing runs 30 to 60 percent above the SoFla regional median. Larger homes, higher-end fixtures, and a buyer profile willing to pay premium for fast service all push per-job revenue up. Advertisers pay $44 per click because the booked job is worth it. Organic ranking at KD 5 earns those same calls at zero marginal cost.',
      },
    ],
  },

  'plumber/seo/boca-raton': {
    pageTitle: 'Plumber SEO Boca Raton | $40 CPC Gated-Community Market',
    pageDesc: 'SEO for Boca Raton plumbing contractors. plumber boca raton 1,300/mo at $40.43 CPC. Gated-community access expertise. $797/mo, no contracts.',
    h1: 'Plumber SEO in Boca Raton — The Premium Service Tier Market',
    lead: 'Plumber boca raton pulls <strong>1,300 monthly searches</strong> at a <strong>$40.43 cost-per-click</strong>. The buyer profile is research-heavy, premium-tier, and willing to pay for service quality. Gated-community access expertise is a real differentiator.',
    marketHeadline: 'Boca Raton Plumbing: High Ticket, Methodical Buyers, Premium SEO Math',
    marketBody: [
      'Boca Raton plumbing buyers research methodically. Average pre-purchase research depth on premium home services here runs longer than the South Florida average. That rewards SEO content covering the comparison and decision-frame queries: "best plumber boca raton", "boca raton repipe contractor", "tankless water heater boca raton". Each long-tail query has its own near-empty SERP.',
      'Service-area coverage spans Boca West (the gated golf-community corridor with 3,400+ residences across four 18-hole courses), East Boca (the older walkable neighborhoods), the Mizner Park district, and the Town Center / Yamato corridor. Gated-community access expertise (gate-call etiquette, property-management coordination, after-hours protocols) is a real on-page differentiator worth naming.',
      'Average per-job ticket runs above the SoFla median because of the home size and finish level. $40 per Google Ads click is profitable when the average emergency service ticket is $400-$2,000 and the average installation job is $2K-$15K+.',
      '<strong>$797/mo</strong>, no contracts.',
    ],
    signals: [
      { label: 'Head term', val: 'plumber boca raton (1,300/mo, KD 0)' },
      { label: 'Google Ads CPC', val: '$40.43 — premium-tier market' },
      { label: 'Buyer profile', val: 'Research-heavy, premium-tier' },
      { label: 'Gated community access', val: 'Boca West, Royal Palm Yacht Club, St. Andrews, others' },
      { label: 'Service mix', val: 'Heavy on installations + recurring maintenance contracts' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Do gated-community customers really change the plumbing marketing approach?',
        a: 'Yes. The on-page content should signal gated-community familiarity (gate-call protocols, property-management coordination, after-hours access). The service area should cover specific gated communities by name (Boca West, Royal Palm Yacht Club, St. Andrews) so the long-tail searches find you. Customers ask about access experience explicitly.',
      },
    ],
  },

  // ── Electrician city overrides (research: 03-keywords-electrician/) ──────────

  'electrician/seo/miami': {
    pageTitle: 'Electrician SEO Miami | KD 0 on 1,600 Monthly Searches',
    pageDesc: 'SEO for Miami electrical contractors. electrician miami 1,600/mo at KD 0 with +315% YoY growth. EV charger + generator installation upside. $797/mo.',
    h1: 'Electrician SEO in Miami — The Lowest-Difficulty High-Volume Trade SERP in South Florida',
    lead: '"Electrician miami" pulls <strong>1,600 monthly searches</strong> at a <strong>keyword difficulty of 0</strong>. Year-over-year volume growth on this search is <strong>+315 percent</strong>, the fastest-growing trade query in our SoFla dataset. The window to claim this SERP is open right now and will not stay open forever.',
    marketHeadline: 'Miami Electrical: Free SEO + Growing Demand + EV-Charger Upside',
    marketBody: [
      'The Miami electrician SERP is structurally underexploited. KD 0 on a 1,600/mo head term is one of the most lopsided demand-to-difficulty ratios we measured anywhere in South Florida. Most local electricians have not invested in SEO at all. The window stays open for 6-18 months before a critical mass of competitors notice.',
      'Beyond the head term, the high-ticket installation queries are pure organic upside. ev charger installation miami has near-zero competition and a buyer base growing fast as EV adoption hits Florida household share above 8 percent. generator installation miami is the same play for hurricane-preparedness buyers. Both jobs run $800-$25,000+ tickets and have almost no organic-ranked competition in the local SERP.',
      'Our Miami electrical SEO build centers on three things. Service-specific pages: separate URLs for panel upgrades, EV chargers, whole-house generators, lighting, surge protection, code compliance. Neighborhood targeting: <strong>12 Miami neighborhood pages</strong> so you rank for electrician brickell, panel upgrade coral gables, EV charger installation aventura. Schema.org Electrician + Service markup with priceRange, license number, and 24/7 availability where applicable.',
      '<strong>$797/mo</strong>, no contracts.',
    ],
    signals: [
      { label: 'Head term', val: 'electrician miami (1,600/mo, KD 0)' },
      { label: 'YoY growth', val: '+315% — fastest-growing trade query in our SoFla dataset' },
      { label: 'Google Ads CPC', val: '$7.31 (modest CPC suggests organic is even more valuable)' },
      { label: 'High-ticket upside', val: 'EV charger installation + whole-house generators' },
      { label: 'Coverage build', val: '12 Miami neighborhoods + 6 service variants' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Why is "electrician miami" KD 0 with such high search volume?',
        a: 'Most Miami electrical contractors win business through commercial referrals, repeat residential customers, and word-of-mouth. They have not seriously invested in organic SEO. The 1,600-search head term is structurally undefended. Organic ranking on it for an established Miami electrician is typically a 60-to-90-day SEO build.',
      },
      {
        q: 'What is the highest-ROI electrical service to focus marketing on?',
        a: 'EV charger installation and whole-house generator installation are the fastest-growing residential electrical service lines because of EV adoption curves and Florida hurricane preparedness. Both have lower search volumes than core repair work but extremely high per-job tickets ($800-$3,500 EV chargers, $5,000-$25,000+ generators) and almost no organic-ranked competition.',
      },
    ],
  },

  'electrician/seo/fort-lauderdale': {
    pageTitle: 'Electrician SEO Fort Lauderdale | KD 2, $20 CPC Broward Market',
    pageDesc: 'SEO for Fort Lauderdale electrical contractors. electrician fort lauderdale 880/mo at KD 2 with $20.13 CPC. $797/mo, no contracts.',
    h1: 'Electrician SEO in Fort Lauderdale — KD 2 on an $20-Per-Click Market',
    lead: '"Electrician fort lauderdale" carries a <strong>$20.13 cost-per-click</strong> at a <strong>keyword difficulty of 2</strong>. The ratio (low KD + healthy CPC) signals a winnable SEO market with real per-job ticket value.',
    marketHeadline: 'Fort Lauderdale Electrical: Broward Coverage + Waterfront Equipment Upgrades',
    marketBody: [
      'Fort Lauderdale electrical demand carries two specific drivers most non-coastal markets do not. First: <strong>waterfront equipment upgrades</strong>. The 165 miles of inland canals plus the Atlantic-facing residential corridor mean dock electrical (sub-panels for boat lifts, GFCI for outdoor receptacles, marine-grade conduit) is a real service line. Second: the <strong>condo high-rise corridor</strong> drives commercial electrical work coordinated with building associations.',
      'Coverage extends across Fort Lauderdale plus the Broward suburbs (Plantation, Sunrise, Wilton Manors, Lauderdale-by-the-Sea, Tamarac). The SEO build creates a flagship Fort Lauderdale page plus suburb pages targeting the long-tail neighborhood-specific queries.',
      '<strong>$797/mo</strong>, no contracts.',
    ],
    signals: [
      { label: 'Head term', val: 'electrician fort lauderdale (880/mo, KD 2)' },
      { label: 'Google Ads CPC', val: '$20.13' },
      { label: 'Waterfront driver', val: 'Dock electrical + marine-grade installations' },
      { label: 'Commercial driver', val: 'Condo high-rise association work' },
      { label: 'Coverage stack', val: 'Plantation, Sunrise, Wilton Manors, Oakland Park, Lauderdale-by-the-Sea' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Should I list dock electrical and marine-grade work in my electrician SEO content?',
        a: 'Yes, if you do that work. Waterfront Fort Lauderdale customers search for dock-specific electrical specifications (sub-panels for boat lifts, GFCI for outdoor outlets, marine-grade conduit). Content that names these specifics ranks for the niche queries and signals expertise to the educated waterfront buyer.',
      },
    ],
  },

  // ── Pressure-washing city overrides (research: 03-keywords-pressure-washing/) ──

  'pressure-washing/seo/miami': {
    pageTitle: 'Pressure Washing SEO Miami | KD 0 on 720 Monthly Searches',
    pageDesc: 'SEO for Miami pressure washing companies. pressure washing miami 720/mo + pressure cleaning miami 590/mo, both KD 0. Recurring residential + commercial. $797/mo.',
    h1: 'Pressure Washing SEO in Miami — KD 0 Across the Entire Head-Term Cluster',
    lead: 'Pressure washing miami at <strong>720 monthly searches</strong>. Pressure cleaning miami at <strong>590 monthly searches</strong>. Both at <strong>keyword difficulty 0</strong>. The combined search cluster is unusually winnable in a vertical where the recurring residential customer is worth 4 to 8 times a single job.',
    marketHeadline: 'Miami Pressure Washing: The SERP Nobody Is Defending',
    marketBody: [
      'The pressure washing search market in Miami is structurally underexploited. KD 0 across the entire head-term cluster (pressure washing, pressure cleaning, plus the neighborhood variants) in a vertical where the recurring residential customer is worth 4-8x a one-time job. Most local operators have not invested in SEO at all. The window stays open for the operators who build basic service x neighborhood pages first.',
      'The service-line opportunity splits across residential (annual recurring) and commercial (quarterly recurring) with different buyer profiles and different pricing models. House pressure washing, paver sealing, soft wash roof cleaning, driveway cleaning, and commercial pressure washing each have their own search demand and their own near-empty SERP.',
      'Our Miami pressure washing SEO build centers on three things. Service-specific pages: separate URLs for house wash, paver sealing, soft wash roof, driveway cleaning, commercial cleaning. Neighborhood targeting: <strong>12 Miami neighborhood pages</strong> so you rank for pressure washing brickell, soft wash aventura, paver sealing coral gables. Before/after photo galleries with proper image schema (compounds Google Image search traffic, which pressure washing buyers rely on heavily).',
      '<strong>$797/mo</strong>, no contracts. Most Miami pressure washing operators we audit are sitting on a 2-page Wix or Squarespace site, ranking for almost nothing, and depending entirely on Nextdoor and word-of-mouth. The compound play is to keep the word-of-mouth lead flow AND own the organic SERP.',
    ],
    signals: [
      { label: 'Head terms', val: 'pressure washing miami (720/mo) + pressure cleaning miami (590/mo)' },
      { label: 'Keyword difficulty', val: '0 — unusually winnable across the full cluster' },
      { label: 'Recurring residential LTV', val: '4-8x the value of a single job' },
      { label: 'Service mix', val: 'House wash + paver sealing + soft wash roof + driveway + commercial' },
      { label: 'Coverage build', val: '12 Miami neighborhoods + 5 service variants' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'How long to rank for "pressure washing miami" with a fresh SEO build?',
        a: 'KD 0 on a 720/mo head term ranks inside <strong>45 to 90 days</strong> for an established Miami pressure-washing operator with a real address, photo-rich Google Business Profile, and a small set of reviews. The neighborhood long-tail variants (pressure washing brickell, soft wash aventura) rank inside <strong>30 to 45 days</strong> because competition is essentially nonexistent.',
      },
      {
        q: 'Should I focus on residential annual or commercial quarterly contracts?',
        a: 'Both, but with separate landing pages. Residential annual recurring is volume play; commercial quarterly is higher-ticket per-visit but fewer accounts. The SEO content and the GBP service categories should address both clearly. A page that mixes both underperforms vs separating them.',
      },
    ],
  },
};

/**
 * Vertical and service-vertical pillar overrides.
 * Populated 2026-05-19 for junk-removal Phase 2 buildout (6 pillar pages).
 *
 * Conventions:
 * - Key for verticalOverrides: vertical slug (e.g. 'junk-removal')
 * - Key for serviceVerticalOverrides: `${vSlug}/${sSlug}` (e.g. 'junk-removal/google-business-profile')
 * - All entries gated with liveAfter to coordinate the unified flip via the launchd job.
 */
export const verticalOverrides: Record<string, VerticalOverride> = {
  // ── Junk Removal vertical pillar ─────────────────────────────────────
  'junk-removal': {
    pageTitle: 'Junk Removal Marketing Miami & SoFla | Thryv',
    pageDesc: 'Marketing for South Florida junk removal companies. Map Pack ranking, SEO, reviews, Google Ads, and websites built for the family-owned operator. $297-$797/mo, no contracts.',
    h1: 'Marketing Built for Family-Owned Junk Removal Companies in South Florida',
    lead: 'The Miami-Dade, Broward, and Palm Beach junk removal markets are large, established, and losing share to national franchises every year. We build the digital pipeline that lets a family-owned operator with 10+ years in the neighborhood take that share back — through Map Pack ranking, hyperlocal SEO, review momentum, profitable Google Ads, and a website that converts.',
    marketHeadline: 'The Junk Removal Operator We Built This For',
    marketBody: [
      'South Florida is the densest junk removal market east of Texas. Across Miami-Dade, Broward, and Palm Beach County, customers searched <em>junk removal near me</em> roughly <strong>110,000 times</strong> last month alone, with another <strong>3,590 monthly searches</strong> across the seven SoFla city head terms (Miami, Fort Lauderdale, Pompano Beach, West Palm Beach, Boca Raton, Hollywood, Delray Beach). The demand is real, the customer base is willing to pay <strong>$107 to $1,099 per job</strong> for residential cleanouts and meaningfully more for estate and construction debris work, and the Google Ads cost-per-click ranges from <strong>$14 in Miami to $30 in Pompano Beach</strong> — the highest in the SoFla service economy.',
      'The competition sits in two layers. National franchises and established multi-location regional players own the top of the Map Pack through review counts that took years to build — typically <strong>300 to 700+ Google reviews per location</strong>, premium pricing, uniformed crews, brand-trust positioning. Below them, a handful of strong local operators per metro have built disciplined Google Business Profile work and review momentum loops over the past five years. Most family-owned junk removal companies — the operator with <strong>8 to 25 years</strong> in the neighborhood, <strong>one to four trucks</strong>, <strong>40 to 100 Google reviews</strong>, and a website that has not been touched since 2020 — sit below both layers. Not because the work is worse. Because the digital infrastructure is missing.',
      'We build five services calibrated for that operator. <a href="/junk-removal/google-business-profile/">Google Business Profile management</a> moves you into the Map Pack for <em>junk removal near me</em>, the single highest-volume search in the vertical and where roughly <strong>78%</strong> of bookings come from. <a href="/junk-removal/seo/">Hyperlocal SEO</a> ranks you for the seven city searches and <strong>35+ neighborhood and service variants</strong> at the same time. <a href="/junk-removal/reputation-management/">Reputation management</a> runs the review-collection system — <strong>15 to 25 new reviews per month</strong> through a printed QR card handed at job completion. <a href="/junk-removal/google-ads/">Google Ads management</a> captures the impatient click during the 90-to-150-day organic ramp, taking advantage of the <strong>$25 to $30 cost-per-click</strong> in Pompano, Boca, and North Miami Beach where job ticket sizes justify premium spend. <a href="/junk-removal/website-design/">Conversion-optimized website design</a> turns the traffic the other four services drive into booked jobs — fast on mobile, transparent pricing on the page, one-tap call, the rich-result version of your listing in search. Each service makes the others work better. Most agencies sell one or two of these well and the rest as upsells. We run all five together.',
      'Pricing is <strong>$297 to $797 per month per service</strong>, no contracts, no setup fees, no lock-in. You own all assets — content, citations, schema, photo metadata, ad campaigns, the website code itself — if you ever leave. This is built specifically for the small operator running <strong>one to four trucks</strong>, doing roughly <strong>$30K to $200K per month</strong>, who has watched larger competitors take more of the digital leads over the last five years and has decided to fight back without overcommitting to a <strong>$5,000/mo</strong> agency retainer. Your first call with us is a real audit, not a sales pitch — we pull your current ranks for the head terms and service variants, show you who currently ranks above you, and tell you honestly whether <strong>90 to 120 days</strong> of work will move the needle. If it will not, we will say so. The SoFla junk removal market is winnable for the disciplined small operator. Most operators just have not done the disciplined work yet.',
    ],
    signals: [
      { label: 'Combined SoFla Demand', val: '~113,590 monthly searches' },
      { label: 'Highest-CPC Market', val: 'Pompano Beach — $30.08' },
      { label: 'Map Pack share of bookings', val: '~78% (Phase 1 research)' },
      { label: 'Pricing', val: '$297-$797/mo per service, no contracts' },
      { label: 'Service Stack', val: 'GBP · SEO · Reputation · Ads · Web Design' },
      { label: 'SoFla Cities Covered', val: 'Miami + 6 (Broward + Palm Beach)' },
    ],
    faqs: [
      {
        q: 'Why does Thryv only work with small junk removal operators?',
        a: 'Our <strong>$297-$797/mo per service</strong> pricing is built for the operator running <strong>one to four trucks</strong> at <strong>$30K-$200K monthly revenue</strong>. A 20-truck regional operator with a VP of Marketing and a <strong>$10K/mo</strong> agency budget gets better unit economics from an agency built for that scale. The small operator with longevity, no online dominance, and a real desire to take back share from national franchises is exactly the audience our pricing, our pace, and our founder-led delivery fit. Hard-pitching larger operators would force us to water down the small-operator focus.',
      },
      {
        q: 'How long until the full five-service setup moves the needle?',
        a: 'For an established SoFla junk removal operator with a real business address, consistent business listings across the web, and <strong>40+ Google reviews</strong>: typically <strong>60 to 90 days</strong> to first-page movement (Fort Lauderdale, the lowest-competition market, runs faster), and <strong>120 days</strong> to consistent top-three Map Pack positioning. Google Ads campaigns produce booked-job leads within <strong>14 to 30 days</strong> once tracking is live. The website work delivers immediate conversion lift on whatever traffic is already arriving. Across all five services, expect the full setup to produce a meaningful net new lead-volume baseline by <strong>month 4</strong>.',
      },
      {
        q: 'Can a one-truck operator really compete with a national junk removal franchise?',
        a: 'Yes — and the SoFla market is one of the easier places to do it. National franchises win on premium pricing, brand recognition, and review counts that took years to build. Local operators win on price (typically <strong>20 to 40%</strong> below franchise pricing), scheduling flexibility, direct owner accountability, and hyperlocal SEO that franchise location pages structurally cannot match because their pages are templated nationwide. Our whole setup is built to surface those local-operator advantages in search results where the franchise listings currently win by inertia.',
      },
      {
        q: 'How much should a SoFla junk removal company invest in marketing per month?',
        a: 'For a starting operator who has never invested in structured digital marketing, we recommend beginning with <strong>$797/mo</strong> on <a href="/junk-removal/seo/">SEO</a> + <strong>$297/mo</strong> on <a href="/junk-removal/google-business-profile/">GBP management</a> for the first <strong>60 days</strong> while the foundation gets built. Around month 3, layer in <strong>$297/mo</strong> <a href="/junk-removal/reputation-management/">reputation management</a> once a review system is running. For markets with high ad CPCs like Pompano or Boca, add <a href="/junk-removal/google-ads/">Google Ads</a> in month 4 at <strong>$1,500 to $3,000/mo</strong> in spend plus <strong>$250-$400/mo</strong> in management. A <a href="/junk-removal/website-design/">website rebuild</a> at <strong>$1,500 to $4,000</strong> one-time happens when the existing site cannot convert paid traffic above <strong>4%</strong>. Total typical investment lands at <strong>$2,000 to $5,000/mo</strong> by month 4, scaled to revenue.',
      },
      {
        q: 'What is different about the Pompano Beach, Boca Raton, and North Miami Beach markets?',
        a: 'These three cities have the three highest junk removal CPCs in SoFla: Pompano Beach at <strong>$30.08</strong>, North Miami Beach at <strong>$28.90</strong>, and Boca Raton at <strong>$25.90</strong>. CPC is a proxy for ticket size — advertisers willing to pay <strong>$25-$30 per click</strong> only do so when the booked job justifies it, which means these markets have larger residential job tickets, more estate and downsizing work, and a higher share of credibility-sensitive customers who pay premium pricing for verified operators. A Thryv client in these three markets has the highest combined SEO + Google Ads margin opportunity in the regional service economy.',
      },
      {
        q: 'Why month-to-month with no contracts?',
        a: 'Three reasons. First, the small operator we work with has been burned before by <strong>12-month</strong> agency retainers that produced no measurable results, and no contracts remove that objection at the door. Second, our pricing is set to make us profitable on month-to-month terms — we do not need to lock you in to break even. Third, no contracts force us to deliver visible results inside <strong>60 to 90 days</strong> because cancellation is always one email away. That discipline is its own form of quality control. If you ever want to leave, you keep everything: content, citations, schema, ad campaigns, the website code.',
      },
    ],
  },

  'dentists': {
    pageTitle: 'Dental Practice Marketing Miami & SoFla | Thryv',
    pageDesc: 'Marketing for family-owned dental practices across Miami-Dade, Broward, and Palm Beach. Map Pack ranking, SEO, reviews, Google Ads, and websites built for the small practice. $297-$797/mo, no contracts.',
    h1: 'Marketing for Family-Owned Dental Practices Across Miami and South Florida',
    lead: 'A Miami patient googles "how much does a dentist cost in Miami" before she calls anyone. The practice that ranks above that question — with a real answer, real prices, and real reviews — books her. We build that practice. Family-owned operators, one to three providers, ready to take share back from the multi-location chains.',
    marketHeadline: 'The Dental Practice We Built This For',
    marketBody: [
      'South Florida is one of the densest dental markets in the country. Miami-Dade alone has roughly <strong>1,900+ active dental practices</strong>. The national <em>dentist near me</em> search runs <strong>1.8 million queries</strong> per month. Locally, the head-term volumes hit hard: <em>dentist aventura</em> at <strong>5,400/mo</strong>, <em>dental implants miami</em> at <strong>1,900/mo</strong> with a <strong>$21.85 cost-per-click</strong>, <em>veneers miami</em> at <strong>2,400/mo</strong>, <em>invisalign miami</em> at <strong>1,000/mo</strong> with <strong>+49% year-over-year</strong> growth. Spanish-language demand is climbing fastest of all: <em>dentista miami</em> jumped <strong>+1,285%</strong> month-over-month in March 2026.',
      'The competition sits in three layers. At the top, University of Miami Health System and a handful of long-established practices own the Map Pack through <strong>300 to 1,600 Google reviews</strong> built up over the years. Below them, a cluster of multi-location dental service organizations with chain-style location pages. At the bottom, the family-owned practice — one to three providers, <strong>5 to 25 years</strong> in the neighborhood, <strong>40 to 150 Google reviews</strong>, a website built in 2019 that still says "COVID-19 Updates" at the top. Patients want that family practice. They just can\'t find it in the search result.',
      'We build five services calibrated for that operator. <a href="/dentists/seo/">Hyperlocal SEO</a> ranks you for the neighborhood head term (<em>dentist coral gables</em> at <strong>KD 1</strong>, <em>dentist brickell</em> at <strong>KD 19</strong>, <em>dentist doral</em> at <strong>KD 11</strong>) plus <strong>40+ long-tail treatment-by-neighborhood variants</strong>. <a href="/dentists/google-business-profile/">Google Business Profile management</a> drives the Map Pack ranking — the hardest position to take in dentistry because of the review counts incumbents have built. <a href="/dentists/reputation-management/">Reputation management</a> runs the system that gets you to <strong>4.7+ stars</strong> with <strong>15 to 25 new reviews per month</strong>. <a href="/dentists/google-ads/">Google Ads management</a> captures the highest-CPC searches (dental implants at <strong>$21.85/click</strong>) — profitable when the landing page converts above <strong>6%</strong>. <a href="/dentists/website-design/">Website design</a> turns the traffic into booked consults — mobile-first, transparent pricing, financing CTAs above the fold, the Google-friendly version of your listing that shows stars and price ranges in search.',
      'Pricing is <strong>$297 to $797 per month per service</strong>, no contracts, no setup fees. You own all assets — content, the listing setup, ad campaigns, the website code — if you ever leave. This is built specifically for the family-owned practice doing <strong>$500K to $2.5M</strong> annual revenue, with <strong>one to three providers</strong>, who has watched chain practices and dental service organizations (DSOs) take more of the digital leads over the last five years and wants to fight back without overcommitting to a <strong>$5,000/mo</strong> agency retainer. First call is a real audit, not a sales pitch. We pull your current ranks for the seven head terms and the long-tail variants, show you who beats you on each, and tell you honestly whether <strong>90 to 120 days</strong> of work will move the needle. If it will not, we will say so.',
    ],
    signals: [
      { label: 'Combined SoFla Demand', val: '~14,000+ monthly searches across head terms' },
      { label: 'Highest-CPC Treatment', val: 'Dental implants — $21.85/click' },
      { label: 'Spanish-language search growth', val: '+1,285% MoM (dentista miami)' },
      { label: 'Pricing', val: '$297-$797/mo per service, no contracts' },
      { label: 'Service Stack', val: 'SEO · GBP · Reputation · Ads · Web Design' },
      { label: 'Patient LTV (avg)', val: '$4K-$12K per active patient over 5 years' },
    ],
    faqs: [
      {
        q: 'Why does Thryv only work with small dental practices?',
        a: 'Our <strong>$297-$797/mo per service</strong> pricing is built for the family-owned practice doing <strong>$500K to $2.5M</strong> annual revenue with <strong>one to three providers</strong>. A 15-location DSO with VP-level marketing and a <strong>$10K/mo</strong> agency budget gets better unit economics from an agency built for that scale. The small practice with longevity, a real local patient base, and a desire to take back share from chain dentistry is exactly the audience our pricing, our pace, and our founder-led delivery fit.',
      },
      {
        q: 'How long until the full five-service setup moves the needle for a dental practice?',
        a: 'For an established South Florida practice with a real local address, consistent business listings, and <strong>40+ Google reviews</strong>: typically <strong>90 to 120 days</strong> to first-page movement on the head term, and <strong>150 days</strong> to consistent top-three Map Pack positioning (longer than other verticals because the dentist review moat is heavier — top players have <strong>300 to 1,600 reviews</strong>). Google Ads campaigns produce booked consults within <strong>14 to 30 days</strong> once tracking is live. Website work delivers immediate conversion lift. The full setup compounds across all five services — meaningful net new booked-consult baseline by <strong>month 4</strong>.',
      },
      {
        q: 'Can a one-provider practice really compete with the dental chains?',
        a: 'Yes — and the dental search market is one of the easier places to do it. Chain practices win on real estate, branding, and review counts built across multiple locations. Family-owned practices win on direct provider relationships (the same dentist sees you every visit), pricing transparency (the owner approves the quote, not a regional manager), and hyperlocal specificity that chain location pages cannot match because their pages are templated nationwide. Our setup surfaces those family-practice advantages in search results where chain listings currently win by inertia.',
      },
      {
        q: 'How much should a SoFla dental practice invest in marketing per month?',
        a: 'For a starting practice that has never invested in structured digital marketing, we recommend beginning with <strong>$797/mo</strong> on <a href="/dentists/seo/">SEO</a> + <strong>$297/mo</strong> on <a href="/dentists/google-business-profile/">GBP management</a> for the first <strong>60 days</strong> while the foundation gets built. Around month 3, layer in <strong>$297/mo</strong> <a href="/dentists/reputation-management/">reputation management</a> once a review collection system is operational. For practices targeting high-CPC treatments like dental implants or Invisalign, add <a href="/dentists/google-ads/">Google Ads</a> in month 4 at <strong>$1,500 to $4,000/mo</strong> in spend plus <strong>$250-$400/mo</strong> in management. A <a href="/dentists/website-design/">website rebuild</a> at <strong>$1,500 to $4,000</strong> one-time happens when the existing site cannot convert paid traffic above <strong>4%</strong>. Total typical investment lands at <strong>$2,500 to $6,000/mo</strong> by month 4, scaled to revenue.',
      },
      {
        q: 'What is different about dental marketing vs other local service businesses?',
        a: 'Three things matter more in dentistry than in any other local service vertical we work with. First, the <strong>review moat is heavier</strong> — top Map Pack practices run <strong>300 to 1,600 reviews</strong> versus <strong>150-400</strong> for med spas and <strong>300-700</strong> for junk removal franchises. Catching up takes <strong>6 to 12 months</strong> of disciplined review acquisition. Second, <strong>insurance vs cash splits the patient base</strong> — cosmetic and implant searches are cash; general and family dentistry searches are insurance-driven. Different keywords, different conversion paths. Third, <strong>Spanish-language demand is the steepest growth signal</strong> — <em>dentista miami</em> jumped <strong>+1,285%</strong> month-over-month. A bilingual Doral or Hialeah dental page wins a market most English-only competitors don\'t even see.',
      },
      {
        q: 'Why month-to-month with no contracts?',
        a: 'Three reasons. First, the small practice we work with has been burned before by <strong>12-month</strong> agency retainers that produced no measurable results, and no contracts remove that objection at the door. Second, our pricing is set to make us profitable on month-to-month terms — we do not need to lock you in to break even. Third, no contracts force us to deliver visible results inside <strong>60 to 90 days</strong> because cancellation is always one email away. The discipline that creates on the agency side is its own form of quality control. If you ever want to leave, you keep everything: content, the listing setup, ad campaigns, the website code.',
      },
    ],
  },

  // ── HVAC vertical pillar ─ target query: "hvac marketing agency" (GSC pos 35) ─
  'hvac': {
    pageTitle: 'HVAC Marketing Agency Miami & SoFla | Thryv',
    pageDesc: 'HVAC marketing agency in Miami and South Florida. SEO, Google Ads, Google Business Profile, and reviews built for family-owned HVAC contractors. No contracts. Free audit.',
    h1: 'HVAC Marketing Agency for Family-Owned Contractors in South Florida',
    lead: 'A South Florida homeowner with a dead AC in August does not wait. They search, they call the first contractor they trust, and they book within the hour. An HVAC marketing agency exists to make sure that contractor is you. We build the SEO, Google Ads, Google Business Profile, and review systems that put family-owned HVAC contractors in front of those urgent searches across Miami-Dade, Broward, and Palm Beach.',
    marketHeadline: 'The HVAC Contractor We Built This For',
    marketBody: [
      'Most family-owned HVAC contractors lose work they should win, not because the service is worse, but because the digital infrastructure is missing. The homeowner searching <em>AC repair near me</em> at 9pm books whoever shows up first with strong reviews and a fast, mobile-friendly site. We build the five services that put you in that spot: <a href="/hvac/seo/">HVAC SEO service</a> to rank for the repair and installation searches, <a href="/hvac/google-ads/">Google Ads</a> to capture the emergency click during the organic ramp, <a href="/hvac/google-business-profile/">Google Business Profile management</a> for the Map Pack, <a href="/hvac/reputation-management/">reputation management</a> to build the review lead that wins trust, and <a href="/hvac/website-design/">website design</a> that turns the traffic into booked calls.',
      'Pricing is month-to-month, no contracts, no setup fees, and you own every asset if you ever leave. Your first call is a real audit, not a sales pitch. We pull your current ranks, show you who outranks you and why, and tell you honestly whether the work will move the needle for your market.',
    ],
    faqs: [
      {
        q: 'What does an HVAC marketing agency actually do?',
        a: 'An HVAC marketing agency builds and runs the systems that bring service calls to your phone instead of a competitor\'s. For us that means five things working together: <a href="/hvac/seo/">HVAC SEO</a> to rank for repair and installation searches, <a href="/hvac/google-ads/">Google Ads</a> to capture the urgent emergency click, <a href="/hvac/google-business-profile/">Google Business Profile</a> for Map Pack visibility, <a href="/hvac/reputation-management/">review management</a> to build the star rating that wins trust, and a <a href="/hvac/website-design/">website</a> built to convert. Most agencies sell one or two of these well and the rest as upsells. We run them as one program.',
      },
      {
        q: 'How long until HVAC marketing produces service calls?',
        a: 'Google Ads can produce booked service calls inside <strong>14 to 30 days</strong> once tracking is live. SEO and Google Business Profile work typically show first-page movement in <strong>60 to 120 days</strong>, depending on how competitive your city is and how many reviews you already have. Website improvements lift conversion on whatever traffic is already arriving right away. Across all of it, expect a meaningful new baseline of booked calls by <strong>month 4</strong>.',
      },
      {
        q: 'Why month-to-month with no contracts?',
        a: 'The small HVAC contractor we work with has usually been burned by a long agency retainer that produced nothing measurable. No contracts remove that objection and force us to show visible results inside <strong>60 to 90 days</strong>, because cancellation is always one email away. If you ever leave, you keep everything: content, the listing setup, the ad campaigns, and the website code.',
      },
    ],
  },

  // ── Electrician vertical pillar ─ target query: "electrician marketing company" (GSC pos 37) ─
  'electrician': {
    pageTitle: 'Electrician Marketing Company Miami & SoFla | Thryv',
    pageDesc: 'Electrician marketing company in Miami and South Florida. SEO, Google Ads, GBP, and reputation management for family-owned electrical contractors. No contracts. Free audit.',
    h1: 'Electrician Marketing Company for South Florida Contractors',
    lead: 'When a homeowner in Coral Gables or Boca Raton needs a licensed electrician, they search and they call fast. An electrician marketing company makes sure your phone is the one that rings. We build the SEO, Google Ads, Google Business Profile, and reputation systems that get family-owned electrical contractors found first across Miami-Dade, Broward, and Palm Beach.',
    marketHeadline: 'The Electrical Contractor We Built This For',
    marketBody: [
      'Electrical work is a trust purchase. Homeowners want a licensed, well-reviewed electrician they can find in seconds, and they rarely scroll past the first few results. We build the systems that put you there: <a href="/electrician/seo/">SEO</a> to rank for the panel upgrades, rewiring, and repair searches in your city, <a href="/electrician/reputation-management/">electrician reputation management</a> to build the review lead that wins the click, <a href="/electrician/google-business-profile/">Google Business Profile</a> for the Map Pack, <a href="/electrician/google-ads/">Google Ads</a> for the urgent click, and a <a href="/electrician/website-design/">website</a> that converts.',
      'Pricing is month-to-month with no contracts and no setup fees, and you own every asset if you leave. Your first call is a real audit. We pull your ranks, show you who beats you and why, and tell you honestly whether the work will pay off in your market.',
    ],
    faqs: [
      {
        q: 'What does an electrician marketing company do?',
        a: 'An electrician marketing company builds the systems that bring service calls to you instead of a competitor. For us that means <a href="/electrician/seo/">SEO</a> to rank for repair, panel, and rewiring searches, <a href="/electrician/reputation-management/">reputation management</a> to build the star rating homeowners trust, <a href="/electrician/google-business-profile/">Google Business Profile</a> for Map Pack visibility, <a href="/electrician/google-ads/">Google Ads</a> for the urgent click, and a <a href="/electrician/website-design/">website</a> built to convert. We run them as one program rather than selling them piecemeal.',
      },
      {
        q: 'How long until electrician marketing produces calls?',
        a: 'Google Ads can produce booked calls inside <strong>14 to 30 days</strong> once tracking is live. SEO and Google Business Profile work usually show first-page movement in <strong>60 to 120 days</strong>, depending on your city and your existing review count. Website improvements lift conversion right away. Expect a meaningful new baseline of calls by <strong>month 4</strong>.',
      },
      {
        q: 'Why month-to-month with no contracts?',
        a: 'The family-owned electrical contractor we work with has usually been burned by a long retainer that produced nothing. No contracts remove that risk and force us to show results inside <strong>60 to 90 days</strong>. If you ever leave, you keep everything: content, listings, ad campaigns, and website code.',
      },
    ],
  },

  // ── Pressure Washing vertical pillar ─ target query: "pressure washing marketing agency" (GSC pos 75, 15 impr) ─
  'pressure-washing': {
    pageTitle: 'Pressure Washing Marketing Agency Miami | Thryv',
    pageDesc: 'Pressure washing marketing agency in Miami and South Florida. SEO, Google Ads, GBP, and reviews built for pressure washing companies. No contracts. Free audit.',
    h1: 'Pressure Washing Marketing Agency for South Florida',
    lead: 'Most pressure washing jobs start with a quick search and a phone call. A pressure washing marketing agency makes sure those calls come to you instead of the company three towns over. We handle pressure washing contractor marketing end to end: SEO, Google Ads, Google Business Profile, and the reviews that win the local pack across Miami, Fort Lauderdale, and Palm Beach.',
    marketHeadline: 'The Pressure Washing Operator We Built This For',
    marketBody: [
      'Pressure washing is a fast-decision, local purchase. The homeowner or property manager searches <em>pressure washing near me</em>, scans the top few results and their reviews, and calls. If you are not in that top group, the job goes to someone who is. We build the systems that put you there: <a href="/pressure-washing/seo/">SEO</a> for the city and service searches, <a href="/pressure-washing/google-ads/">Google Ads</a> for the urgent click, <a href="/pressure-washing/google-business-profile/">Google Business Profile</a> for the Map Pack, <a href="/pressure-washing/reputation-management/">reputation management</a> for the review lead, and a <a href="/pressure-washing/website-design/">website</a> that converts.',
      'Pricing is month-to-month, no contracts, no setup fees, and you own your assets if you leave. Your first call is a real audit, not a pitch. We pull your ranks, show you who outranks you, and tell you honestly whether the work will move the needle.',
    ],
    faqs: [
      {
        q: 'What does a pressure washing marketing agency do?',
        a: 'A pressure washing marketing agency builds the systems that bring jobs to you. For us that is <a href="/pressure-washing/seo/">SEO</a> to rank for the city and service searches, <a href="/pressure-washing/google-ads/">Google Ads</a> for the urgent click, <a href="/pressure-washing/google-business-profile/">Google Business Profile</a> for Map Pack visibility, <a href="/pressure-washing/reputation-management/">review management</a>, and a <a href="/pressure-washing/website-design/">website</a> built to convert. We run pressure washing contractor marketing as one connected program.',
      },
      {
        q: 'How long until pressure washing marketing produces jobs?',
        a: 'Google Ads can produce booked jobs inside <strong>14 to 30 days</strong> once tracking is live. SEO and Google Business Profile work usually show first-page movement in <strong>60 to 120 days</strong>, depending on your city and review count. Website improvements lift conversion right away. Expect a meaningful new baseline of booked jobs by <strong>month 4</strong>.',
      },
      {
        q: 'Why month-to-month with no contracts?',
        a: 'The owner-operator we work with has usually been burned by a long agency retainer that produced nothing measurable. No contracts remove that risk and force us to show results inside <strong>60 to 90 days</strong>. If you leave, you keep everything: content, listings, ad campaigns, and website code.',
      },
    ],
  },
};

export const serviceVerticalOverrides: Record<string, ServiceVerticalOverride> = {

  // ── HVAC SEO ─ target query: "hvac seo service" (GSC pos 23) ─
  'hvac/seo': {
    pageTitle: 'HVAC SEO Service Miami & SoFla | Thryv',
    pageDesc: 'HVAC SEO service for South Florida contractors. Rank for AC repair, installation, and emergency HVAC searches in your city. No contracts. Free audit.',
    h1: 'HVAC SEO Service for South Florida Contractors',
    lead: 'An HVAC SEO service gets your company ranking for the searches that turn into service calls: air conditioning repair, AC installation, and emergency HVAC in your city and neighborhood. We build the structured SEO program that ranks family-owned HVAC contractors across Miami-Dade, Broward, and Palm Beach, the technical work most competitors leave half-finished.',
    faqs: [
      {
        q: 'What does an HVAC SEO service do?',
        a: 'An HVAC SEO service makes your website rank for the searches homeowners actually use: <em>AC repair near me</em>, <em>air conditioning installation</em>, and <em>emergency HVAC</em> plus their city and neighborhood variants. The work covers on-page optimization, local and service-area pages, Google Business Profile alignment, technical fixes, and the content that earns first-page position. The goal is simple: when someone in your service area searches, your company is one of the first results they see.',
      },
      {
        q: 'How long does HVAC SEO take to work?',
        a: 'For an established contractor with a real local address and a handful of reviews, first-page movement typically lands in <strong>60 to 120 days</strong>, depending on how competitive your city is. Lower-competition suburbs move faster than Miami itself. Top-three Map Pack positioning takes longer because it depends partly on review volume, which builds over time.',
      },
      {
        q: 'Is HVAC SEO better than Google Ads?',
        a: 'They do different jobs. <a href="/hvac/google-ads/">Google Ads</a> buys you the urgent click immediately, which matters for emergency AC work. HVAC SEO builds durable ranking that keeps producing calls without paying per click. Most contractors run ads first for speed, then lean more on SEO as organic ranks climb over the first few months. Run together they cover both the impatient and the patient searcher.',
      },
    ],
  },

  // ── Electrician reputation management ─ target query: "electrician reputation management" (GSC pos 73, 7 impr) ─
  'electrician/reputation-management': {
    pageTitle: 'Electrician Reputation Management | Thryv',
    pageDesc: 'Electrician reputation management in South Florida. Build a steady stream of new five-star reviews and win the click before a competitor is considered. No contracts.',
    h1: 'Electrician Reputation Management in South Florida',
    lead: 'Homeowners trust the electrician with the most recent, highest-rated reviews. Electrician reputation management is the system that gets you there: a steady stream of new five-star reviews, fast handling of the occasional bad one, and a star rating that wins the click before a competitor is even considered.',
    faqs: [
      {
        q: 'What is electrician reputation management?',
        a: 'Electrician reputation management is the ongoing system that builds and protects your online review profile. It covers a simple way to collect new reviews after every job, monitoring across Google and the major platforms, fast professional responses to negative reviews, and the steady review momentum that keeps your star rating high. For an electrician, that rating is often the single biggest factor in whether a homeowner calls you or the next listing.',
      },
      {
        q: 'How many reviews does an electrician need to compete?',
        a: 'It depends on your market, but the pattern is consistent: the contractors winning the Map Pack have more recent, higher-rated reviews than the ones below them. The goal is not a single number, it is steady momentum, a flow of fresh reviews every month so your profile always looks active and trusted. We build the system that produces that flow after each completed job.',
      },
      {
        q: 'How does this connect to the rest of my marketing?',
        a: 'Reviews feed everything. They lift your <a href="/electrician/google-business-profile/">Google Business Profile</a> ranking, raise the conversion rate on your <a href="/electrician/google-ads/">Google Ads</a>, and build the trust that turns <a href="/electrician/seo/">SEO</a> traffic into booked calls. Reputation management is usually the highest-leverage place to start because it improves the return on every other channel.',
      },
    ],
  },

  // ── Med Spa SEO ─ target query: "botox seo services" (GSC pos 66, 9 impr) ─
  'medspas/seo': {
    pageTitle: 'Med Spa & Botox SEO Services Miami | Thryv',
    pageDesc: 'Botox SEO services and med spa SEO in Miami. Rank for botox, fillers, and the neighborhood searches that fill the schedule. No contracts. Free audit.',
    h1: 'Med Spa SEO and Botox SEO Services in Miami',
    lead: 'When someone in Brickell or Miami Beach searches botox near me or medspa Miami, your practice needs to be the first result, not the fourth. Our botox SEO services and med spa SEO get injectors and aesthetic clinics ranking for the treatments that fill the schedule: botox, fillers, and the neighborhood searches that drive booked consults.',
    marketHeadline: 'Where the Botox Searches Are Already Moving',
    marketBody: [
      'The neighborhood-level botox searches are some of the most winnable terms in the Miami aesthetic market, and the work compounds fast once a page starts ranking. Our <a href="/medspas/seo/miami/miami-beach/">Miami Beach med spa SEO page</a> is built specifically for the South Beach botox and injectables searches, and the same approach extends across Brickell, Coral Gables, and Aventura. The strategy is simple: own the treatment plus neighborhood searches first, where competition is thinnest, then expand to the broader Miami head terms.',
      'See the full picture on the <a href="/medspas/">med spa marketing pillar</a>, which connects SEO with Google Business Profile, reputation, and paid social into one program. Pricing is month-to-month, no contracts, and you own every asset if you leave.',
    ],
    faqs: [
      {
        q: 'Do you offer botox SEO services?',
        a: 'Yes. Botox SEO services are a core part of our med spa SEO. We optimize your treatment pages and neighborhood pages so your practice ranks for searches like <em>botox Miami</em>, <em>botox near me</em>, <em>botox and fillers</em>, and the South Beach, Brickell, and Aventura variants. Treatment plus neighborhood searches are the most winnable terms in the market, so that is usually where we start before expanding to the broader head terms.',
      },
      {
        q: 'How is med spa SEO different from regular SEO?',
        a: 'Med spa SEO is built around treatments and neighborhoods rather than generic service terms. A patient does not search <em>aesthetic clinic</em>, they search <em>botox near me</em> or <em>lip filler Brickell</em>. The work focuses on treatment-specific pages, hyperlocal neighborhood pages, a Google Business Profile tuned for the local pack, and the review profile that aesthetic patients lean on heavily before booking.',
      },
      {
        q: 'How long until med spa SEO fills the schedule?',
        a: 'Neighborhood and treatment pages can move quickly because competition on those long-tail terms is thinner than the citywide head terms. Expect first-page movement on the winnable terms in <strong>60 to 120 days</strong>, with the broader Miami head terms taking longer. Pairing SEO with <a href="/medspas/reputation-management/">reputation management</a> speeds the whole thing up, since aesthetic patients weigh reviews heavily.',
      },
    ],
  },

  // ── Junk Removal × 5 service pillars ─────────────────────────────────
  // All gated liveAfter 2026-06-03 alongside the vertical pillar + Fort Lauderdale city.
  // Research source: ~/Desktop/seo-runs/thryvmarketingsolutions.com/03-keywords-junk-removal/<service>/
  // Apply both standing rules: no named competitors, small-operator persona.

  'junk-removal/seo': {
    pageTitle: 'Junk Removal SEO South Florida | Thryv',
    pageDesc: 'SEO for SoFla junk removal companies. Rank for the 7 city head terms + 35+ service variants. $797/mo, no contracts, you own all assets. Free audit.',
    h1: 'Junk Removal SEO for South Florida Operators',
    lead: 'The SoFla junk removal market generates ~113,590 monthly searches across the seven cities and their service variants. We build the structured SEO program that ranks family-owned operators for the city head terms, the neighborhood combos, and the service-specific variants that competitors leave uncovered.',
    marketHeadline: 'Why SoFla Junk Removal SEO Is the Most Winnable Vertical We Research',
    marketBody: [
      'The combined SoFla junk removal SEO opportunity is unusually favorable for a small operator. The seven city searches (Miami at <strong>1,300/mo</strong>, Fort Lauderdale at <strong>880/mo</strong> — the easiest big market in the entire South Florida service economy, West Palm Beach at <strong>480/mo</strong>, Boca Raton at <strong>320/mo</strong>, Pompano Beach at <strong>260/mo</strong>, Hollywood at <strong>210/mo</strong>, Delray Beach at <strong>140/mo</strong>) all rank inside <strong>60 to 120 days</strong> for an established operator who does the work. Cost-per-click on Google Ads runs <strong>$14 to $30</strong> across the seven cities, with Pompano Beach the highest. The biggest single search in the vertical — <em>junk removal near me</em> at <strong>110,000 monthly searches</strong> — is a Map Pack search, captured primarily through <a href="/junk-removal/google-business-profile/">Google Business Profile management</a>, but the SEO work on the city pages lifts your Map Pack ranking alongside it.',
      'We\'ve already built dedicated pages for the five biggest SoFla markets. <a href="/junk-removal/seo/fort-lauderdale/">Fort Lauderdale</a> is the easiest to rank in the entire region. <a href="/junk-removal/seo/miami/">Miami</a> is the highest-volume — <strong>1,300 monthly searches</strong> on the head term plus a dozen neighborhood sub-pages. <a href="/junk-removal/seo/pompano-beach/">Pompano Beach</a> has the best paid-plus-organic margin at <strong>$30 cost-per-click</strong>. <a href="/junk-removal/seo/west-palm-beach/">West Palm Beach</a> has <strong>480 monthly searches</strong> with estate cleanout demand running heavy. <a href="/junk-removal/seo/boca-raton/">Boca Raton</a> is the highest job-ticket market in SoFla at <strong>$25.90 CPC</strong>. Hollywood FL and Delray Beach come next. Each page is <strong>800+ words</strong> of real content written for the specific market — not a template stretched across cities — and they link to each other in a way that lifts all of them in rankings together.',
      'Below the city level, programmatic infrastructure covers the long-tail. The Miami pillar has 12 neighborhood sub-pages (Brickell, Wynwood, Coral Gables, Doral, Aventura, Miami Beach, North Miami, North Miami Beach, Coconut Grove, Little Havana, Kendall, Hialeah) and a service-variant set covering furniture removal at $22.85 CPC, construction debris removal at $24.06 CPC, trash removal at $17.80 CPC, mattress removal, and appliance removal. The internal-linking graph between city pages, neighborhood pages, and service-variant pages drives all of them up the rankings together — single-page SEO produces single-page results; integrated cluster SEO produces compounded rankings. We do the integrated version.',
      'SEO runs $797 per month, no contracts, no setup fees, you own all assets if you leave. It pairs naturally with <a href="/junk-removal/google-business-profile/">GBP management</a> at $297/mo (the Map Pack capture for the 110K monthly junk-removal-near-me searches), <a href="/junk-removal/reputation-management/">reputation management</a> at $297/mo (the review momentum that GBP rankings depend on), and where ad spend math justifies it, <a href="/junk-removal/google-ads/">Google Ads</a> at $1,500-$3,000/mo in spend plus $250-$400/mo in management. Where a website cannot convert the traffic the other services drive, a <a href="/junk-removal/website-design/">website rebuild</a> at $1,500-$4,000 one-time closes the conversion gap. Your first call is a real audit — current rankings, competitor positions, and a 90-day projection. If we cannot move the needle for your specific situation, we will say so on the call.',
    ],
    signals: [
      { label: 'Combined SoFla SEO Demand', val: '~3,590/mo head terms + 110K near-me' },
      { label: 'Easiest Market', val: 'Fort Lauderdale — almost no competition, 880 searches/mo' },
      { label: 'Time to First-Page (head)', val: '60-120 days for established operators' },
      { label: 'Programmatic Coverage', val: '7 cities + 12 Miami neighborhoods + 5 service variants' },
      { label: 'Pricing', val: '$797/mo, no contracts, you own everything' },
      { label: 'Pairs Best With', val: 'GBP management (Map Pack)' },
    ],
    faqs: [
      {
        q: 'How long until my SoFla junk removal company ranks first page for the head terms?',
        a: 'For an established operator with a real address, consistent business listings across the web, and 40+ Google reviews: Fort Lauderdale (lowest competition) typically inside <strong>60 to 90 days</strong>; Miami inside <strong>90 to 120 days</strong>; Pompano (moderate competition) inside <strong>90 to 150 days</strong>; and West Palm Beach, Boca, Hollywood, and Delray (low competition across the board) inside <strong>75 to 120 days</strong>. Long-tail neighborhood and service-specific searches typically rank inside <strong>45 to 75 days</strong> because the competition drops to almost zero on those specific terms.',
      },
      {
        q: 'What is the relationship between SEO and Map Pack ranking?',
        a: 'The Map Pack — the three-result Google Maps box that shows above organic search results — is fed primarily by your <a href="/junk-removal/google-business-profile/">Google Business Profile</a>: review count, how fast you reply, how often you upload photos, proximity, and post frequency. Organic SEO ranks the website results below the Map Pack. The two channels overlap because Google reads your website content and schema when ranking your GBP listing — a well-built SEO foundation lifts the Map Pack signal by 15 to 25 percent in our experience. The Map Pack drives roughly 78% of inbound bookings for junk removal; the organic results below capture the careful comparison-shopper who scrolls past.',
      },
      {
        q: 'Do I need separate pages for each SoFla city?',
        a: 'Yes — to rank for each city-specific search. A single Miami city page will not rank for junk removal fort lauderdale, junk removal boca raton, or any of the other city head terms. The seven SoFla city pages we build are each 800+ words of unique copy, with city-specific landmarks, pricing context, and demographic framing. Cross-linking the seven pages concentrates topical authority on the vertical, which lifts all seven rankings together.',
      },
      {
        q: 'What is different about the Fort Lauderdale opportunity?',
        a: 'Fort Lauderdale has the lowest competition in the entire SoFla junk removal market — Google\'s own difficulty score puts it at <strong>2 out of 100</strong>. Paired with <strong>880 monthly searches</strong> and a <strong>$19.85 cost-per-click</strong>. That low score means the search result is largely uncontested by operators with real, well-built pages — most of the page-one positions rotate between thin franchise location pages and directory listings. A family-owned Fort Lauderdale operator with a real Broward address and disciplined work can rank first-page inside <strong>60 to 90 days</strong>. This is the rare case where the data heavily favors the small operator.',
      },
      {
        q: 'How is this different from the SEO agency that did not work for me last time?',
        a: 'Most failed agency engagements share three patterns. The agency required a 12-month contract (we do not — month-to-month, leave anytime). The agency built templated content with no SoFla-specific signal (we write SoFla-specific content, name local landmarks, build for the neighborhood). The agency reported on activity instead of ranks (we report rank movements for your target keywords every 30 days). The first-call audit verifies these — we will tell you whether your previous agency built anything reusable before quoting any new work.',
      },
      {
        q: 'Why no contracts?',
        a: 'See the answer in the <a href="/junk-removal/">vertical pillar FAQ</a>. Same reasoning applies across all five services.',
      },
    ],
  },

  'junk-removal/google-business-profile': {
    pageTitle: 'Junk Removal GBP Management Miami & SoFla | Thryv',
    pageDesc: 'Google Business Profile management for SoFla junk removal companies. Capture the 110,000 monthly "junk removal near me" searches via Map Pack ranking. $297/mo, no contracts.',
    h1: 'Google Business Profile Management for SoFla Junk Removal Companies',
    lead: '"Junk removal near me" gets searched <strong>110,000 times a month</strong> across the US — the single biggest search in the entire junk removal world, and it\'s decided in the Map Pack (the box of three Google Maps results that shows above everything else). We run the Google Business Profile listing that wins that Map Pack for a family-owned SoFla operator. Reviews, replies, photos, posts, and the boring weekly discipline that gets you ranked inside 60 to 120 days.',
    marketHeadline: 'Why Your Google Business Profile Decides 78% of Your Bookings',
    marketBody: [
      'Junk removal is the most Map-Pack-dependent service in South Florida. Roughly <strong>78%</strong> of your inbound bookings come through that three-result Google Maps box at the top of the search — not through your website. A customer types <em>junk removal near me</em>, <em>best junk removal</em>, or <em>top rated junk removal</em>, sees the Map Pack first, picks the listing with <strong>4.7+ stars</strong> and a recent post, and calls within <strong>30 seconds</strong>. Your website is what they check to confirm they made the right call — after they\'ve already dialed. Most family-owned junk removal operators underinvest in their Google listing because it looks deceptively simple to manage. The ones winning the Map Pack today have done the boring disciplined work, every week, for years.',
      'The three Map Pack ranking signals that actually move you up: how fast new reviews come in, how fast you reply, and how often you post and add photos. The review-count floor for top-three Map Pack visibility is roughly <strong>50 reviews</strong> at <strong>4.7+ stars</strong> in less competitive SoFla markets, <strong>150 to 250 reviews</strong> in dense Miami markets. Reply within <strong>24 to 48 hours</strong> on every review (positive or negative) — Google reads a <strong>100% reply rate within 48 hours</strong> as an active-listing signal that weighs heavily in your favor. Keep <strong>100+ photos</strong> on the listing (trucks, team, before-and-afters with property-owner consent, equipment), refreshed quarterly. Weekly Google Posts on Monday morning are the right rhythm — posting more than twice a week barely helps; posting less than once a week signals a stale profile.',
      'There\'s one part most agencies haven\'t caught up to yet. In 2025 Google rolled out <strong>Ask Maps</strong> — an AI layer that actually reads your reviews when deciding who ranks. Which means review <em>content</em> now matters more than review <em>count</em>. A listing with reviews mentioning specific job types (estate cleanout, garage cleanout, construction debris) and specific landmarks (Lincoln Road, Federal Highway, Glades Road) outranks a higher-star competitor with reviews that all say "great service." Our review system includes a soft prompt that nudges customers to mention the job type and the neighborhood naturally — never scripted, but always present. Combined with our standard QR-card flow (printed at checkout, <strong>30-50%</strong> scan rate, <strong>60-80%</strong> of scanners actually leave a review), this produces both the volume AND the content quality Ask Maps rewards. Result for a busy operator: <strong>15-25 new reviews per month</strong>.',
      'GBP management runs <strong>$297 a month</strong>, no contracts. It\'s the most cost-effective service we offer because it captures the largest pool of demand (the <strong>110,000 monthly near-me searches</strong>) for the lowest monthly investment. It pairs naturally with <a href="/junk-removal/reputation-management/">reputation management</a> at <strong>$297/mo</strong> (the review system that feeds the Map Pack signal), <a href="/junk-removal/seo/">SEO</a> at <strong>$797/mo</strong> (the website work that lifts the Map Pack ranking by <strong>15-25%</strong>), and <a href="/junk-removal/google-ads/">Google Ads</a> at <strong>$250-$400/mo</strong> in management (the impatient-click capture during the 90-day Map Pack ramp). A <a href="/junk-removal/website-design/">website that actually converts</a> turns the Map Pack click into a booked job. First call: free proposal of your current Google listing plus the top three competitors in your zip code, with a 90-day projection.',
    ],
    signals: [
      { label: 'Primary Capture Query', val: 'junk removal near me — 110,000/mo' },
      { label: 'Map Pack share of bookings', val: '~78%' },
      { label: 'Review Volume Floor (Map Pack)', val: '50 reviews · 150-250 for top-3' },
      { label: 'Photo Target', val: '100+ photos, refreshed quarterly' },
      { label: 'Reply window', val: '24-48 hours on every review' },
      { label: 'Pricing', val: '$297/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Is Google Business Profile manager free?',
        a: 'Yes — you can create and manage a Google Business Profile listing for free. What costs money is the labor of running it correctly: weekly posts, photo uploads, review replies within <strong>24-48 hours</strong> on every review, Q&A monitoring, holiday-hours updates, and the system that generates <strong>15-25 new reviews per month</strong>. Most family-owned operators try to do this themselves and quit after 90 days because the weekly schedule doesn\'t fit around running the actual business. Our <strong>$297/mo</strong> handles all of it.',
      },
      {
        q: 'What is the difference between Google My Business and Google Business Profile?',
        a: 'They are the same thing. Google renamed GMB to Google Business Profile (GBP) in late 2021. You may still see references to GMB in older blog posts and YouTube videos. The product, the dashboard, and the ranking factors are unchanged — just the brand name.',
      },
      {
        q: 'How many Google reviews does my SoFla junk removal company need to rank in the Map Pack?',
        a: 'Floor for any Map Pack visibility: roughly <strong>50 reviews</strong> at <strong>4.7+ stars</strong>. To consistently rank in the top three Map Pack results: <strong>150 to 250 reviews</strong>. The exact threshold depends on the competitors in your specific SoFla market. National junk-removal franchises and established multi-location regional players typically have <strong>300 to 700+ reviews</strong> per location, so closing that gap on raw count takes <strong>12 to 18 months</strong> of disciplined acquisition. Our review system produces <strong>15-25 new reviews per month</strong> for an active operator running 8-15 jobs per day.',
      },
      {
        q: 'How does the "Ask Maps" AI affect my junk removal listing?',
        a: 'Ask Maps is the AI layer Google rolled out in 2025 that synthesizes review CONTENT when ranking Map Pack results. The AI reads through reviews looking for content that matches search intent. A junk removal listing with reviews mentioning specific job types (estate cleanout, garage cleanout, post-construction debris removal) and neighborhood landmarks ranks above a higher-star competitor with generic reviews. We design our acquisition flow to nudge customers toward mentioning job type and neighborhood naturally — without scripting them.',
      },
      {
        q: 'How is GBP different from SEO?',
        a: 'Your Google Business Profile captures the Map Pack — the three-result Google Maps box at the top of local searches, roughly <strong>78%</strong> of junk removal bookings. <a href="/junk-removal/seo/">SEO</a> ranks the organic website results below the Map Pack — the careful comparison-shopper who scrolls down before calling. The two channels overlap because Google reads your website content when ranking your Google listing, and a well-built website lifts your Map Pack ranking by <strong>15-25%</strong>. Operators should run both, with the Google listing first because it captures the bigger pool of demand.',
      },
      {
        q: 'How long until my Map Pack ranking improves?',
        a: 'For an established listing with <strong>40+ existing reviews</strong>: meaningful Map Pack movement inside <strong>30 to 60 days</strong> of structured management (consistent photo uploads, weekly posts, 24-48 hour replies, ongoing review collection). For a brand-new listing with under 20 reviews: <strong>90 to 120 days</strong>, because Google needs time to accumulate trust signals. Faster movement correlates with neighborhood-specific review content, not raw review volume.',
      },
    ],
  },

  'junk-removal/reputation-management': {
    pageTitle: 'Reputation Management Junk Removal SoFla | Thryv',
    pageDesc: 'Review collection + fast replies for SoFla junk removal companies. 15-25 new Google reviews/mo, 4.7+ stars, 24-48hr replies on every review. $297/mo, no contracts.',
    h1: 'Reputation Management for SoFla Junk Removal Companies',
    lead: 'Reputation management is the highest-paying service in this research — agencies charge <strong>$1,000-$2,500 a month</strong> for it (we know because we looked at what they bid per click to win the customer: <strong>$94</strong>). We deliver the same thing at <strong>$297/mo</strong>, no contract, calibrated for the SoFla operator who has watched a national franchise build a 500-review moat over five years.',
    marketHeadline: 'The Cheapest Way to Win More Junk Removal Bookings in SoFla? Reviews.',
    marketBody: [
      'Junk removal is one of the most review-sensitive services in local search. The customer comparison-shopping <em>junk removal near me</em> picks between three Map Pack listings in <strong>30 seconds</strong> — and the deciding factor is almost always a combination of star rating and how recent the most recent review is. A listing averaging <strong>4.7 stars</strong> with reviews from the <strong>last 30 days</strong> wins the click against a <strong>4.6-star</strong> listing with reviews 4 months old, even when the lower-star listing has more total reviews. SoFla operators who treat reviews as something that happens TO them lose ranking position monthly to operators who treat reviews as something they produce.',
      'The system we run hands a printed QR-code review card to every customer at job completion. The card is designed in Canva to match your brand, printed on premium cardstock, and supported by a one-line script for the truck operator ("Mind taking 30 seconds to leave a Google review? It helps us a lot."). Customer numbers: <strong>30-50%</strong> scan the card, <strong>60-80%</strong> of scanners actually leave a review. For an active operator running 8 to 15 jobs per day, that\'s <strong>15-25 new reviews per month</strong> — way more than email-based requests, which complete at <strong>5-10%</strong>. The math adds up: <strong>20 new reviews per month</strong> for 12 months = <strong>240 reviews per year</strong>. Enough to close the franchise-review-moat gap in <strong>18-24 months</strong>.',
      'There\'s one part most agencies haven\'t caught up to yet. In 2025 Google rolled out <strong>Ask Maps</strong> — an AI layer that actually reads your reviews when deciding Map Pack rankings. Which means review <em>content</em> now matters more than review <em>count</em>. Reviews mentioning specific job types (estate cleanout, garage cleanout, construction debris, hoarder cleanout) and specific neighborhood landmarks outrank a higher-star competitor with reviews that all say some version of "great service." Our system nudges customers to mention the job type and neighborhood naturally — never scripted. On the reply side, we respond within <strong>24-48 hours</strong> on every review (positive and negative), and each reply mentions the job type and neighborhood, which compounds the Ask Maps signal. For negative reviews, we use a tested 4-step template (acknowledge → take it offline → owner signature → never disclose private info) that neutralizes impact without escalating publicly.',
      'Reputation management runs <strong>$297 a month</strong>, no contracts. The market pays significantly more — the <strong>$94 cost-per-click</strong> on reputation-management-agency searches implies advertisers spend <strong>$1,000-$2,500/mo</strong> on these services. Our <strong>$297/mo</strong> is deliberately calibrated for the family-owned SoFla operator who has been burned by lead-buying services and contracts. Not cheap — right-sized. Pairs naturally with <a href="/junk-removal/google-business-profile/">GBP management</a> at <strong>$297/mo</strong> (the Map Pack signal that review momentum feeds), <a href="/junk-removal/seo/">SEO</a> at <strong>$797/mo</strong> (the city pages that earn the comparison-shopper click), and the broader <a href="/junk-removal/">five-service stack</a> for an integrated <strong>$1,500-$2,500/mo</strong> total. Your first call is a real audit: current review count, reply rate, star average, and a 90-day projection. The scam-awareness piece (paid review-removal cold calls) we cover whether you hire us or not.',
    ],
    signals: [
      { label: 'Service-Buyer CPC', val: '$45-$94 (reputation agency / cost queries)' },
      { label: 'Review Volume Floor', val: '50 reviews · 150-250 top-3 Map Pack' },
      { label: 'Acquisition Rate Achievable', val: '15-25 new reviews/mo' },
      { label: 'Star Average Target', val: '4.7+ (4.5 floor)' },
      { label: 'Reply window', val: '24-48 hours, all reviews' },
      { label: 'Pricing', val: '$297/mo, no contracts (market avg $1K-$2.5K)' },
    ],
    faqs: [
      {
        q: 'How much does reputation management services cost?',
        a: 'The market average for managed reputation services for service-area businesses sits at <strong>$1,000-$2,500 per month</strong> — implied by the <strong>$94.47 cost-per-click</strong> on the reputation-management-agency search. Our <strong>$297/mo</strong> is calibrated for the small SoFla operator running one to four trucks at <strong>$30K-$200K monthly revenue</strong>, not for the regional chains the bigger agencies target. What you get for <strong>$297/mo</strong>: review collection system (printed QR cards, scripted handoff), <strong>24-48 hour</strong> replies on every review, monthly review-growth report, bad-review response template, and Ask Maps content optimization.',
      },
      {
        q: 'How do I get more Google reviews for my junk removal company?',
        a: 'A printed QR-code review card handed to every customer at the end of the job. Designed in Canva to match your brand, printed on premium cardstock, supported by a one-line script for the truck operator. Numbers: <strong>30-50%</strong> of customers scan, <strong>60-80%</strong> of scanners actually leave a review. For an active operator running <strong>8 to 15 jobs per day</strong>, that\'s <strong>15-25 new reviews per month</strong> — way more than email-based requests, which complete at <strong>5-10%</strong>.',
      },
      {
        q: 'How do I respond to a bad Google review for my junk removal business?',
        a: 'Use this 4-part template: (1) thank the reviewer by name, (2) express specific concern about the issue they raised without admitting fault, (3) offer to take the conversation offline via phone or email, (4) sign with the owner or operations manager name. Never argue. Never disclose protected information about the job. The response is for FUTURE customers reading, not the reviewer — they want to see the operator care visibly without defensiveness. Our $297/mo includes a templated response library indexed by complaint type.',
      },
      {
        q: 'Is paid review removal a real service?',
        a: 'No — and operators who receive cold calls offering paid bad-review removal should refuse. Google\'s review policies prohibit paid removal, and listings caught violating ToS are suspended. Reviews can only be removed if they violate Google\'s content policies (hate speech, off-topic, conflict of interest, fake reviewer). Our $297/mo reputation service includes flagging reviews that legitimately violate Google policies, but we do not offer or recommend any paid-removal scheme.',
      },
      {
        q: 'How long until reputation management moves the needle?',
        a: 'For an established SoFla junk removal operator with <strong>40+ existing reviews</strong> adding a structured review system: Map Pack movement inside <strong>30 to 60 days</strong>, measurable lift in inbound calls inside <strong>45 to 75 days</strong>, full ranking stabilization at the new tier inside <strong>90 to 120 days</strong>. The compounding effect is real — once your review pace catches up to competitors, your Map Pack position becomes harder for them to displace. They have to outpace your now-higher rate to push you back down.',
      },
      {
        q: 'Should I run reputation management without GBP management?',
        a: 'You can — but the payoff is much higher when both run together. Reputation management produces the review momentum. <a href="/junk-removal/google-business-profile/">GBP management</a> ensures the Map Pack ranking benefits from that pace (via how fast you reply, photo uploads, weekly posts, and the operational signals Google reads alongside reviews). Most of our junk-removal clients start with both services together at $594/mo combined.',
      },
    ],
  },

  'junk-removal/google-ads': {
    pageTitle: 'Junk Removal Google Ads Management SoFla | Thryv',
    pageDesc: 'Google Ads for SoFla junk removal companies. Pompano $30.08 CPC, Boca $25.90 — highest-margin markets in stack. $250-$400/mo management + your ad spend. No contracts.',
    h1: 'Google Ads Management for SoFla Junk Removal Companies',
    lead: 'Pompano Beach, Boca Raton, and North Miami Beach have the three highest junk removal costs-per-click in South Florida — <strong>$30.08</strong>, <strong>$25.90</strong>, and <strong>$28.90</strong>. That sounds bad until you realize: high CPC means the job ticket on the other end justifies it. We build the ad campaigns that turn those expensive clicks into booked jobs for a family-owned operator.',
    marketHeadline: 'High CPC Isn\'t the Enemy. It\'s the Reason You Can Run Ads Profitably Here.',
    marketBody: [
      'Here\'s the math nobody walks you through. Cost-per-click on Google Ads measures how much other advertisers are willing to pay for the same customer. When that number is high, it means those advertisers know the booked job pays for the click. The SoFla cost-per-click stack tells a clear story: Miami at <strong>$14.41</strong> (lowest, most competitive search), Fort Lauderdale <strong>$19.85</strong>, West Palm Beach <strong>$19.37</strong>, Delray Beach <strong>$15.98</strong>, Hollywood FL <strong>$26.09</strong>, Boca Raton <strong>$25.90</strong>, North Miami Beach <strong>$28.90</strong>, and Pompano Beach at <strong>$30.08</strong> — the highest in the entire SoFla service economy. The highest-CPC markets are exactly where small operators clear the best margin on paid traffic. Not the worst.',
      'A properly-built campaign in Pompano Beach at <strong>$30 CPC</strong> and a <strong>6%</strong> landing-page conversion rate produces a booked job for roughly <strong>$500</strong> in ad spend. For a Pompano job ticket of <strong>$400 to $1,200</strong> on residential cleanouts (and more on estate work), that\'s positive margin. Most family-owned operators who tried Google Ads and stopped did so because of three fixable mistakes: budgets too small for the market (running <strong>$10-$20/day</strong> in a <strong>$30 CPC</strong> market gets you one click per day, which never builds the data Google needs to optimize), broad campaign structure (no negative keywords, mixed match types, the wrong bid strategy too early), and landing pages that convert at <strong>1-3%</strong> instead of the <strong>6-10%</strong> the math requires. We run the campaign correctly: tight ad groups by job type (estate cleanout, garage, furniture, construction debris), the right bid strategy for the first two weeks, then the right one after, <strong>15-25 negative keywords</strong> minimum (junk car removal, free junk removal, junk yard, scrap car), and a landing page built to convert at <strong>6-10%</strong>.',
      'Biggest source of operator confusion in this market: Local Services Ads vs. regular Google Search Ads. Local Services Ads (the cards with the green "Google Screened" badge above search results) are pay-per-lead — Google qualifies the lead before it gets to you. Search Ads (the regular ads underneath) are pay-per-click — you pay for the click whether it converts or not. LSAs typically convert better because the leads are warmer, but they require <strong>50+ reviews</strong>, <strong>4.6+ stars</strong>, insurance verification, and a 1-2 week onboarding. Search Ads produce volume faster and are easier to start, but you need a strong landing page to make the math work. We run both where it makes sense — typically LSAs as the primary source once you have the reviews + insurance in place, and Search Ads as the secondary capture for high-CPC city searches.',
      'Management runs <strong>$250-$400 per month</strong> in fees on top of your ad spend. For Pompano, Boca, and North Miami Beach (the highest-CPC tier), we recommend starting at <strong>$1,500-$3,000/mo</strong> in ad spend for the first two months while the campaign builds the data Google needs, then scaling up or down based on actual booked-job ROI by month 4. Total monthly investment lands at <strong>$1,800-$3,400</strong> for a small operator running paid in two or three high-CPC markets. Pairs naturally with <a href="/junk-removal/website-design/">website design</a> (the landing page is what makes the math work) and <a href="/junk-removal/seo/">SEO</a> (over 90-150 days, organic ranks cut your reliance on paid). First call is a real audit: your current Quality Score, your city\'s conversion benchmarks, and a 90-day projection. No contracts, leave whenever, you keep the ad accounts and campaign structure if you go.',
    ],
    signals: [
      { label: 'Highest-CPC SoFla City', val: 'Pompano Beach — $30.08' },
      { label: 'Cost Per Booked Job (Pompano)', val: '~$500 (at 6% conv rate, $30 CPC)' },
      { label: 'Recommended Ad Spend', val: '$1,500-$3,000/mo (high-CPC markets)' },
      { label: 'Management Fee', val: '$250-$400/mo on top of spend' },
      { label: 'Landing Page Conv. Target', val: '6-8% on a built landing page' },
      { label: 'Search vs LSA', val: 'Run both where math justifies' },
    ],
    faqs: [
      {
        q: 'How much does junk removal advertising cost in South Florida?',
        a: 'Junk removal advertising on Google runs in two parts: the ad spend you pay Google, and the management fee. In SoFla, costs-per-click range from roughly <strong>$14</strong> in Miami to <strong>$30</strong> in Pompano Beach, so most operators start with <strong>$1,500 to $3,000/mo</strong> in spend in the high-CPC markets, plus <strong>$250 to $400/mo</strong> in management. Junk removal ads produce booked-job leads inside <strong>14 to 30 days</strong> once tracking is live, which is why they pair so well with the slower organic ramp.',
      },
      {
        q: 'Is $20 a day enough for Google Ads in SoFla junk removal?',
        a: 'For testing or learning how the platform works, yes. For real lead volume in SoFla, no. Pompano at <strong>$30 cost-per-click</strong> means <strong>$20/day</strong> buys you less than one click per day — which never gives Google enough data to optimize anything. Minimum viable budget for a serious SoFla junk removal campaign: <strong>$50-$100/day</strong> (<strong>$1,500-$3,000/mo</strong>) in the high-CPC markets, <strong>$30-$60/day</strong> in Miami where costs run lower. Anything below that is a learning exercise, not a lead-generation program.',
      },
      {
        q: 'Should I use Local Services Ads or regular Google Ads?',
        a: 'Both, where the math works. Local Services Ads (the green "Google Screened" badge cards above search results, pay-per-lead) typically convert better for junk removal because Google qualifies the lead before it reaches you — but they require <strong>50+ reviews</strong>, <strong>4.6+ stars</strong>, insurance verification, and a 1-2 week onboarding. Regular Google Ads (the pay-per-click ones under the LSAs) produce volume faster and are easier to start, but you need a landing page that converts at <strong>6-8%</strong> for the math to work. We typically recommend LSAs as the primary source once an operator has the reviews + insurance in place, and Search Ads as the secondary capture for high-CPC city searches.',
      },
      {
        q: 'What negative keywords should I run for junk removal?',
        a: 'Minimum <strong>15-25 negative keywords</strong>. The standard list: junk car removal (auto salvage, completely different business), free junk removal (price-shoppers who never convert), junk yard (parts business), scrap metal, scrap car, hazardous waste, dumpster rental, port-a-potty, DIY, how to. Per market we add city-specific exclusions. Our <strong>$250-$400/mo</strong> management includes monthly negative-keyword refinement based on what people actually searched to find you.',
      },
      {
        q: 'How long until Google Ads becomes profitable for my SoFla junk removal company?',
        a: 'For a properly-built campaign with a converting landing page: first booked-job leads inside <strong>14 to 30 days</strong> (the window Google needs to learn your campaign), profitability turning the corner inside <strong>60 to 90 days</strong> (when conversion rate stabilizes at <strong>6-8%+</strong>), full optimization inside <strong>120 days</strong> (when we have enough data to bid aggressively on the best-performing keyword + city combinations). Operators who don\'t see profitability inside 120 days usually have a landing-page conversion problem, not an ad problem — we audit both before quoting.',
      },
      {
        q: 'Should I run Google Ads while doing SEO?',
        a: 'In SoFla junk removal, yes — because the CPC stack is high enough that organic ranking is worth a lot when you finally get there. The 90-150 day <a href="/junk-removal/seo/">SEO</a> ramp captures the patient customer; paid ads capture the impatient click that converts in 30 seconds. Most of our clients run organic-only for the first 60 days while we build the city-page foundation, then layer in paid in month 3 once we have conversion data from the organic traffic. Running both with the same data feedback loop boosts total lead volume by <strong>50-80%</strong> versus organic-only in high-CPC markets like Pompano and Boca.',
      },
      {
        q: 'Why no contracts?',
        a: 'Same reasoning as the rest of the <a href="/junk-removal/">junk removal stack</a>. Month-to-month forces us to deliver visible Google Ads results inside 60-90 days — booked-job leads, not vanity metrics. The discipline that creates on the agency side is itself a form of quality control. If you ever want to leave, you keep everything: the ad accounts, the campaign structure, the conversion data, the landing pages, the keyword research.',
      },
    ],
  },

  'junk-removal/website-design': {
    pageTitle: 'Junk Removal Website Design SoFla | Thryv',
    pageDesc: 'Custom websites for SoFla junk removal companies. Fast on mobile, transparent pricing, built to convert paid traffic, you own all the code. <strong>$1,500</strong>-<strong>$4,000</strong> build + <strong>$297/mo</strong>.',
    h1: 'Website Design for SoFla Junk Removal Companies',
    lead: 'Most junk removal websites built in the last decade convert paid traffic at 1-3 percent. A properly-built mobile-first site with transparent pricing, real before/after photos, and the 8 above-the-fold conversion elements that matter for this vertical converts at 6-10 percent — the rate that makes Google Ads and SEO profitable. We build that site, <strong>$1,500</strong>-<strong>$4,000</strong> one-time, then <strong>$297/mo</strong> hosting + maintenance, and you own everything.',
    marketHeadline: 'Why Most Junk Removal Websites Lose <strong>80%</strong> of Available Conversions',
    marketBody: [
      '<strong>Two thirds</strong> of junk removal traffic is mobile. The customer searching <em>junk removal near me</em> on their phone arrives on your website with one question: can I trust this operator enough to call right now? The <strong>8 above-the-fold elements</strong> that answer that question — one-tap call CTA with phone number prominent, transparent pricing examples in the <strong>$150-$600</strong> range (not "call for quote" opacity), real before/after photos from real SoFla addresses with property-owner consent, insurance and bonding badges, years-in-business badge, <strong>4.7+ star</strong> review aggregate display, same-day-call badge, and a single low-friction quote form — separate websites that convert at <strong>6-10%</strong> from websites that convert at <strong>1-3%</strong>. Most family-owned operator sites built between 2018 and 2022 by a relative or a <strong>$400 freelancer</strong> get one or two of those right. The rest are missing or buried below the fold.',
      'Beyond what they see above the fold, the speed of your site is what keeps the click. Most template-builder junk removal websites load slowly on mobile — slow enough to lose <strong>30 to 50%</strong> of paid Google Ads clicks before the page even finishes loading. The customer hits back, calls the next operator down. We build sites that score in the top tier of Google\'s own speed test, every time. We also write your business info into the page in the format Google needs to display the upgraded version of your search result — the one with your star rating, your price range, and the answer to the customer\'s question right there in the listing. <strong>30% higher click-through</strong> than a plain text listing. Combined with mobile-first design (built for the phone first, scaled up to desktop — not the reverse), you keep more of the traffic the other four services drive.',
      'The biggest difference versus the templated builder agencies in this market: you own everything. Most template-builder junk removal websites are hosted on the builder\'s platform — when you stop paying, you lose the site. Your domain is yours, but the code, the design, the content structure all stay on the builder\'s infrastructure. Our builds are custom Astro sites deployed to Cloudflare Pages. When you want to leave, you keep the domain, the full source code (in your private repo), the content, the structured tagging, the photo metadata, the entire site structure. You can host it anywhere afterward — no platform lock-in. For a small operator who has been burned by builder lock-in before, this ownership model is non-negotiable.',
      'Pricing is a one-time build at <strong>$1,500-$4,000</strong> depending on page count and complexity (the SoFla junk removal site we build typically lands at <strong>$2,500</strong> for the standard <strong>12-page</strong> structure: home + 5 service pages + 6 city pages, plus a blog template + contact + about), then <strong>$297/mo</strong> for hosting, ongoing maintenance, content updates, structured tagging, and speed monitoring. No contracts on the monthly. Pairs naturally with the <a href="/junk-removal/">rest of the junk removal services</a> — the site is the conversion layer for the traffic that <a href="/junk-removal/seo/">SEO</a>, <a href="/junk-removal/google-business-profile/">GBP</a>, and <a href="/junk-removal/google-ads/">Google Ads</a> drive. Without a converting site, the other four services produce traffic that does not book jobs. First call is a real audit of your current site: speed score, Google-friendly tagging coverage, mobile conversion-element checklist, and an honest take on whether your current site can be upgraded or whether a rebuild makes more sense.',
    ],
    signals: [
      { label: 'Mobile Traffic Share', val: '60-70% of junk removal visits' },
      { label: 'PageSpeed Target', val: '90+ mobile (most templates: 40-60)' },
      { label: 'Conversion Rate Lift', val: '1-3% template → 6-10% built' },
      { label: 'Above-the-Fold Elements', val: '8 (one-tap call · price · photos · trust · CTA · stars · same-day · form)' },
      { label: 'Build Tier', val: '$1,500-$4,000 one-time + $297/mo' },
      { label: 'Ownership', val: 'You keep everything if you leave' },
    ],
    faqs: [
      {
        q: 'How much does a junk removal website cost?',
        a: 'Wide range. DIY template builders (Wix, Squarespace) at <strong>$0-$600/year</strong> — typically convert at <strong>1-3%</strong>, slow on mobile, missing the Google-friendly business info that gets you the upgraded search listing. Industry-specific builders at <strong>$2,400-$4,800/year</strong> — better conversion, but you lose the site if you stop paying. Our custom build at <strong>$1,500-$4,000 one-time + $297/mo</strong> — converts at <strong>6-10%</strong>, you own everything, no lock-in. Year-one cost: <strong>$5,000-$8,000</strong>, then <strong>$3,500/year</strong> after. The math justifies the higher tier if you have enough monthly traffic to amortize — typically <strong>200+ monthly visits</strong> is the break-even point.',
      },
      {
        q: 'What is the best website builder for a junk removal company?',
        a: 'It depends on what you prioritize. DIY templates win on cost (<strong>$0-$50/mo</strong>). Hosted vertical builders (junk-removal-specific platforms) win on speed-to-launch (template-based, live in days) but lose on conversion rate and platform lock-in. Custom Astro builds (our model) win on conversion rate, mobile speed, Google-friendly tagging, and ownership — but take <strong>4-6 weeks</strong> to launch. For a small operator doing <strong>$30K-$200K/month</strong>, the conversion lift from custom typically pays for the higher tier inside <strong>6-12 months</strong>.',
      },
      {
        q: 'Do I really own everything if I leave?',
        a: 'Yes. The domain stays in your registrar account from day one. The source code goes into a private Git repo we transfer to you on request. The content is yours. The Google-friendly tagging is yours. The photos and metadata are yours. The deploy configuration on Cloudflare Pages is yours. You can host the site anywhere afterward — Cloudflare, Vercel, Netlify, your own VPS — with zero rebuilding required. This is structurally different from most template-builder agencies in this market who keep the site when you stop paying.',
      },
      {
        q: 'How important is mobile design for a junk removal website?',
        a: 'Critical. <strong>60-70%</strong> of junk removal customer searches happen on mobile, often from a phone walking the property assessing what needs to be hauled. A site that loads slowly, has tiny tap targets, or hides the phone number below the fold loses these customers before they ever see your pricing. We design mobile-first (the mobile layout is the primary design, not a desktop layout shrunk for phones), use one-tap call CTAs, and test on real devices before launch.',
      },
      {
        q: 'What makes my website show up better in Google search results?',
        a: 'There\'s a way to write your business info into the page that lets Google display an upgraded version of your search result — the one that shows your star rating, your price range, your area served, and the answer to whatever the customer searched for, right there in the listing before they click. We set this up automatically on every page we build: your business basics (address, phone, hours, service area), each service you offer with pricing context, the FAQ section formatted so Google can pull questions directly into search, and your Google reviews summary. Most template-builder sites have none of this. Result: their listings show as plain blue text. Yours shows with stars, prices, and answers. <strong>~30% higher click-through</strong>.',
      },
      {
        q: 'Should I rebuild my site or upgrade what I have?',
        a: 'Roughly <strong>60%</strong> of the operators we audit can keep their existing site with targeted upgrades — fixing mobile speed, adding Google-friendly tagging, restructuring the above-the-fold, adding transparent pricing. About <strong>40%</strong> are better served by a rebuild on a faster platform because the existing site has structural issues (slow hosting, outdated CMS, no mobile responsiveness) that make piecemeal fixes uneconomical. The first-call audit tells you which camp you are in before any work gets quoted.',
      },
    ],
  },

  // ─── Dentists service-vertical pillars ──────────────────────────────
  // Research source: ~/Desktop/seo-runs/thryvmarketingsolutions.com/03-keywords-dentists/
  // Day 3 run 2026-05-19. Improvements to already-live pages — no liveAfter gate.

  'dentists/seo': {
    pageTitle: 'Dental SEO Miami & SoFla | Thryv',
    pageDesc: 'SEO for South Florida dental practices. Rank for the head terms (dentist coral gables KD 1, dental implants miami 1,900/mo) plus 40+ neighborhood + treatment variants. $797/mo, no contracts.',
    h1: 'Dental SEO for South Florida Practices',
    lead: 'There is a Miami dental search Google scored a difficulty of 1 out of 100, with 880 monthly searches and a $5.22 cost-per-click. Almost nobody has built a real page for it. We build that page, and the 40+ long-tail variants beneath it. $797/mo, no contracts.',
    marketHeadline: 'The Miami Dental Search Map — and Where the Wedge Sits',
    marketBody: [
      'The South Florida dental SEO opportunity sorts into three layers. The head terms (<em>dentist miami</em>, <em>dentist near me miami</em>) sit at <strong>KD 20+</strong> with most page-one spots owned by directory listings (Delta Dental, Yelp) and the University of Miami Health System — hard to crack but not where the patient traffic concentrates anyway. The neighborhood head terms are where the volume lives: <em>dentist aventura</em> <strong>5,400/mo</strong>, <em>dentist doral</em> <strong>1,000/mo</strong>, <em>dentist kendall</em> <strong>1,000/mo</strong>, <em>dentist brickell</em> <strong>880/mo</strong> at <strong>KD 19</strong>, and the easy win — <em>dentist coral gables</em> at <strong>KD 1</strong> with <strong>880/mo</strong> and a transactional intent score. Below that, the long-tail treatment-by-neighborhood pages (<em>dental implants brickell</em>, <em>veneers coral gables</em>, <em>invisalign aventura</em>) — <strong>40+ variants</strong>, each capturing <strong>50-200/mo</strong>, totaling <strong>1,500-3,000/mo</strong> in aggregate.',
      'We\'ve identified five structural opportunities most Miami dental practices have not built for. First, <strong>Coral Gables</strong> is the cheapest entry point — <strong>KD 1</strong>, transactional intent, easiest head term in the entire Miami-Dade service economy to rank for. Second, <strong>Doral with native Spanish content</strong> — the <em>dentista miami</em> search jumped <strong>+1,285%</strong> month-over-month, and almost no Doral practice has invested in proper bilingual SEO. The few who have built Spanish versions ran them through Google Translate, which converts at half the rate of native Spanish copy. Third, the <strong>dental implants page with financing content</strong> — <strong>$21.85 CPC</strong>, <strong>1,900/mo</strong>, but every competitor buries the financing answer. Fourth, <strong>cosmetic dentistry with neighborhood sub-pages</strong> — KD 6 head term, $2,400/mo on veneers miami, and <strong>$1,200-$2,500 per tooth</strong> AOV. Fifth, <strong>emergency dentist content with same-day availability transparency</strong> — high commercial intent, <strong>60%+</strong> repeat-patient yield.',
      'What we build for the $797 a month: a flagship city page for your primary market (<strong>800-1,200 words</strong>), <strong>6 to 8 neighborhood sub-pages</strong> (Coral Gables, Brickell, Aventura, Doral, Kendall, Miami Beach + your home neighborhood), <strong>5 to 7 treatment-specific pages</strong> (dental implants, cosmetic, Invisalign, pediatric, emergency), the financing and pricing content patients explicitly search for, and where the demo justifies it, a native Spanish version of your Doral or Hialeah page. The internal-linking across these <strong>20+ pages</strong> pulls the head term up the rankings within <strong>90 to 120 days</strong> for an established practice and <strong>150 to 180 days</strong> for a brand-new domain.',
      'SEO runs <strong>$797/mo</strong>, no contracts, no setup fees, you own all assets if you leave. It pairs naturally with <a href="/dentists/google-business-profile/">GBP management</a> at <strong>$297/mo</strong> (the Map Pack ranking — heavy review moat in dentistry means GBP work is non-negotiable), <a href="/dentists/reputation-management/">reputation management</a> at <strong>$297/mo</strong> (review momentum that GBP rankings depend on), and where the high-CPC math justifies it, <a href="/dentists/google-ads/">Google Ads</a> at <strong>$1,500-$4,000/mo</strong> in spend plus <strong>$250-$400/mo</strong> in management. First call is a real audit — current ranks, competitor positions, and a 90-day projection. If we cannot move the needle for your specific situation, we will say so on the call.',
    ],
    signals: [
      { label: 'Easiest local head term', val: 'dentist coral gables — KD 1, 880/mo, $5.22 CPC' },
      { label: 'Highest neighborhood volume', val: 'dentist aventura — 5,400/mo' },
      { label: 'Highest-CPC treatment', val: 'dental implants miami — $21.85/click, 1,900/mo' },
      { label: 'Spanish search spike', val: '+1,285% MoM on dentista miami' },
      { label: 'Long-tail addressable', val: '~1,500-3,000 monthly searches across 40+ variants' },
      { label: 'Time to first page', val: '90-120 days for established practices' },
    ],
    faqs: [
      {
        q: 'How long until my dental practice ranks page one in Google?',
        a: 'For an established South Florida practice with a real local address, consistent business listings across the web, and <strong>40+ Google reviews</strong>: typically <strong>90 to 120 days</strong> to first-page movement on your neighborhood head term, <strong>150 days</strong> to consistent top-five ranking. Long-tail treatment + neighborhood combinations (<em>dental implants brickell</em>, <em>veneers coral gables</em>) typically rank inside <strong>45 to 75 days</strong>. For a brand-new domain with no review history, all timelines extend by <strong>30 to 60 days</strong>.',
      },
      {
        q: 'Why is dental SEO different from other local service SEO?',
        a: 'Three structural reasons. First, the <strong>Map Pack review moat is heavier</strong> — top Miami dental practices run <strong>300 to 1,600 reviews</strong>, versus <strong>150-400</strong> in med spa and <strong>300-700</strong> in junk removal. SEO alone does not get you into the Map Pack without a parallel review acquisition program. Second, <strong>treatment search clusters are distinct</strong> — implants, cosmetic, pediatric, emergency, family each have their own SERPs and require their own pages. A single "general dentistry" page that tries to rank for all of them ranks for none. Third, <strong>pricing transparency is a ranking signal</strong> — Google\'s PAA cluster heavily features cost questions ("How much does a dentist cost in Miami?"), and pages that answer with real numbers rank above pages that say "call for quote."',
      },
      {
        q: 'Should my dental practice build separate pages for each treatment?',
        a: 'Yes — for any treatment you want to rank for individually. <em>Dental implants miami</em> (<strong>1,900/mo</strong>, <strong>KD 1</strong>) does not rank from your general "Services" page no matter how well that page is built. The same applies to veneers (<strong>2,400/mo</strong>), Invisalign (<strong>1,000/mo</strong>), teeth whitening (<strong>1,300/mo</strong>), and pediatric (<strong>KD 9</strong>). Each treatment gets its own page (<strong>600-1,200 words</strong>), with pricing examples, before/after where appropriate, FAQs sourced from the PAA cluster, and a treatment-specific CTA. The pages then link to each other and back to the neighborhood pillar, building the topical authority Google rewards.',
      },
      {
        q: 'Do I need a Spanish version of my dental practice website?',
        a: 'If your practice is in Doral, Hialeah, Brickell, or anywhere with a meaningful Latin patient base — yes. <em>Dentista miami</em> search jumped <strong>+1,285%</strong> month-over-month in early 2026. Most Miami dental sites are English-only, and the few with Spanish versions usually run Google Translate (which Spanish-fluent patients can immediately tell is machine-translated, dropping conversion roughly <strong>50%</strong> versus native Spanish copy). A native Spanish version of your home + 3 to 5 treatment pages adds <strong>$2,000 to $4,000</strong> one-time to the build and captures a search market most competitors leave on the table.',
      },
      {
        q: 'How is dental SEO different in Coral Gables vs Aventura vs Doral?',
        a: 'Patient research depth varies meaningfully by neighborhood. <strong>Coral Gables</strong> patients research for <strong>9 to 14 days</strong> before booking — they verify board certifications, read every review, compare 3-4 practices. Content depth and credentials win here. <strong>Brickell</strong> patients are more transactional — they search at lunch, book the same week, prioritize same-week appointment availability. Speed-to-respond wins. <strong>Aventura</strong> patients gravitate to premium positioning and device-specific searches (Invisalign, implants, full-mouth restoration). <strong>Doral</strong> is dominated by Spanish-language search and family-practice queries. The SEO build is calibrated for each market\'s actual search behavior — same methodology, different surface content.',
      },
      {
        q: 'What if I already have a website that is not ranking?',
        a: 'Most of the practices we onboard already have a website — usually built <strong>4 to 8 years ago</strong>, often by a relative or a <strong>$400 freelancer</strong>, with two or three pages and no treatment-specific or neighborhood-specific content. The first call we have is a real audit: we pull your current rankings for the head terms and treatment variants, run a technical scan (page speed, mobile, structured tagging, sitemap), and tell you honestly whether your existing site can be upgraded or whether a <a href="/dentists/website-design/">rebuild</a> makes more sense. Roughly <strong>60%</strong> can keep their existing site with targeted upgrades; <strong>40%</strong> are better served by a rebuild on a faster platform. Either way, you keep ownership of the domain and the content.',
      },
    ],
  },

  'dentists/google-business-profile': {
    pageTitle: 'Google Business Profile Management for Dental Practices | Thryv',
    pageDesc: 'GBP management for South Florida dental practices. Map Pack ranking, photo strategy, weekly posts, review reply discipline. $297/mo, no contracts.',
    h1: 'Google Business Profile Management for Dental Practices',
    lead: 'The top-ranking Map Pack dentist in Miami has 1,600 Google reviews and a five-star average. The number two has 872. Number three has 481. Most family-owned practices sit at 40 to 100 reviews — buried below the Map Pack with no path up. We build that path.',
    marketHeadline: 'Why GBP Beats Website for Dental Patient Discovery',
    marketBody: [
      'Roughly <strong>65-75%</strong> of dental patient discovery in Miami starts on Google Maps, not a Google search. A patient googles <em>dentist near me</em> on her phone, scans the three-result Map Pack, and calls one of those three practices. The website organic results below the Map Pack capture the careful comparison-shopper who scrolls — meaningful traffic, but smaller than the Map Pack click pool. For a dental practice, ranking in the local 3-Pack is the single highest-leverage marketing position you can hold.',
      'The Map Pack ranks practices by four signals: review count, review recency, review reply discipline, and Google Business Profile activity (photos, posts, Q&A, hours accuracy). Most established dental practices have decent review counts but neglected GBP activity — months between posts, no recent photos, unanswered Q&A, hours that haven\'t been updated since the practice changed schedule. The newer dental service organizations spend serious money on agencies that update GBP weekly. The gap between them is enormous, and it widens every quarter.',
      'What we run for the <strong>$297 a month</strong>: <strong>4 to 6 weekly posts</strong> alternating between treatment offers, patient education, community presence (sponsored events, local partnerships), and behind-the-scenes provider content. <strong>10 to 15 fresh photos per month</strong> — operatory shots, smile transformations, team photos, equipment investments. <strong>Reply within 24-48 hours</strong> on every review (positive and negative), with each reply mentioning the treatment and the neighborhood — both signals now feed Google\'s Ask Maps AI, which ranks the Map Pack. Q&A monitoring with pre-loaded helpful question-answer pairs so the listing shows <strong>8-12 useful Q&A</strong> instead of being blank. Quarterly review of your business categories and service list so the listing surfaces for new treatment searches.',
      'GBP management runs <strong>$297/mo</strong>, no contracts. It pairs naturally with <a href="/dentists/reputation-management/">reputation management</a> at <strong>$297/mo</strong> (the review system that feeds the Map Pack signal), <a href="/dentists/seo/">SEO</a> at <strong>$797/mo</strong> (the website work that lifts the Map Pack ranking by <strong>15-25%</strong> through topical authority signal), and where ad spend justifies it, <a href="/dentists/google-ads/">Google Ads</a> at <strong>$250-$400/mo</strong> in management. A <a href="/dentists/website-design/">website that actually converts</a> turns the Map Pack click into a booked consultation. First call: free audit of your current Google listing plus the top three Map Pack competitors in your zip code, with a 90-day projection.',
    ],
    signals: [
      { label: 'Map Pack share of patient discovery', val: '~65-75%' },
      { label: 'Top Miami dentist review count', val: '1,600 reviews at 5.0 stars' },
      { label: 'Map Pack floor for visibility', val: '~100-150 reviews at 4.7+ stars' },
      { label: 'Posting cadence we run', val: '4-6 weekly posts + 10-15 monthly photos' },
      { label: 'Pricing', val: '$297/mo, no contracts' },
      { label: 'Pairs with', val: 'Reputation Management + SEO + Google Ads' },
    ],
    faqs: [
      {
        q: 'How many Google reviews does my dental practice need to compete in the Map Pack?',
        a: 'The Map Pack floor for dental visibility in Miami is roughly <strong>100 reviews at a 4.7+ star average</strong>. To consistently rank in the top three Map Pack results, expect to need <strong>250 to 500 reviews</strong> — though the exact threshold depends on which competitors operate in your specific Miami-Dade sub-market. The review acquisition program we pair with this service typically produces <strong>15 to 25 new reviews per month</strong>, closing the review gap against most competitors within <strong>4 to 8 months</strong>.',
      },
      {
        q: 'How fast should my dental practice reply to a Google review?',
        a: 'For positive reviews: <strong>within 48 hours</strong> at the latest. For negative reviews: <strong>within 24 hours</strong> — a faster reply minimizes the time the negative review sits visible without context, and signals to Google that you actively manage the listing. We respond on your behalf with reply templates calibrated to the review content, mentioning the treatment plus the neighborhood in each response — both of which feed the Ask Maps AI layer Google now uses to rank Map Pack results.',
      },
      {
        q: 'What does Google Ask Maps mean for dental practices?',
        a: 'In 2025 Google rolled out Ask Maps, an AI layer that reads your reviews and your replies (not just star counts) when ranking the Map Pack. For dental practices, that means review content now matters more than review volume. Reviews that mention specific treatments (root canal, crown, Invisalign, dental implants) and specific neighborhoods (Brickell, Coral Gables, Doral) outrank generic "great service, very professional" reviews — even when the competitor has higher star counts. We nudge patients toward treatment-and-neighborhood-specific reviews through our acquisition workflow without scripting.',
      },
      {
        q: 'Why are dental Map Pack rankings harder to win than other local service rankings?',
        a: 'Three reasons. First, the <strong>review counts incumbents have built up are much higher</strong> — top Miami dental practices run <strong>300 to 1,600 reviews</strong>, versus <strong>150-400</strong> for med spas and <strong>300-700</strong> for junk removal franchises. Second, dental patients verify credentials before calling, so listings need more than star counts — they need photos, posts, and Q&A depth. Third, Google weights medical/dental rankings more conservatively (YMYL — Your Money Your Life — content gets stricter quality signals), so a thin GBP listing has more downside risk than in other verticals.',
      },
      {
        q: 'What if my practice has fewer than 50 Google reviews?',
        a: 'Then GBP optimization alone will not get you into the Map Pack in 90 days — you need the parallel review acquisition program to be running. We pair this service with <a href="/dentists/reputation-management/">reputation management</a> from day one for practices under <strong>50 reviews</strong>. The combined program typically pushes Map Pack visibility within <strong>6 months</strong> from a starting position of <strong>30-40 reviews</strong>, and within <strong>3 months</strong> from a starting position of <strong>80-100 reviews</strong>.',
      },
      {
        q: 'How does GBP management work with my insurance acceptance list?',
        a: 'We surface your insurance carriers explicitly in the GBP "Services" section and the highlights field — most dental practice listings either omit insurance entirely or list it as a generic "insurance accepted" tag, which Google does not surface in patient-facing search results. Listed carriers (Delta Dental, MetLife, Cigna, Aetna, Humana, UnitedHealthcare, plus specific Medicaid programs where applicable) make your listing appear for insurance-specific searches that competitors miss.',
      },
    ],
  },

  'dentists/reputation-management': {
    pageTitle: 'Dental Practice Reputation Management Miami | Thryv',
    pageDesc: 'Review acquisition + AI-readable review content + negative review playbook for South Florida dental practices. 15-25 new reviews/month at 4.7+ stars. $297/mo, no contracts.',
    h1: 'Reputation Management for Dental Practices',
    lead: 'The Miami dental Map Pack is gated by review count — most top-three positions have 300 to 1,600 reviews built up over the years. The practice that runs a real review acquisition system, monthly, catches up faster than the practice that runs nothing. We run that system.',
    marketHeadline: 'Why Dental Reputation Management Compounds Over Years',
    marketBody: [
      'A dental practice with <strong>40 to 100 Google reviews</strong> at <strong>4.5+ stars</strong> is sitting outside the Map Pack for most of its target searches. A dental practice with <strong>200 to 400 reviews</strong> at <strong>4.7+ stars</strong> is in the Map Pack consistently. The gap between those two states is roughly <strong>12 to 24 months</strong> of disciplined review acquisition — collecting <strong>15 to 25 new reviews per month</strong> from patients who actually had work done. There is no shortcut. There is also no excuse: most practices we audit have a steady patient flow that could easily produce double the reviews they currently collect.',
      'The workflow we run for the <strong>$297 a month</strong>: a printed QR card handed to each patient at checkout, designed for the dental context (heavier cardstock, hand-initialed by the front desk, post-treatment "Hope to see you in 6 months" message) — this single physical touchpoint outperforms email + SMS combined in dental because patients respond to the personal-touch handoff. Email follow-up <strong>24-72 hours</strong> after the appointment with one click straight to the Google review form. SMS reminder <strong>5-7 days</strong> after the appointment for patients who haven\'t reviewed yet — once, not multiple times. Quarterly review of the workflow with the front desk team — what\'s converting, what\'s being skipped, what process change moves the rate.',
      'There\'s one part most agencies haven\'t caught up to yet. In 2025 Google rolled out <strong>Ask Maps</strong> — an AI layer that reads your reviews when deciding Map Pack rankings — which means review content now matters more than review count. Reviews mentioning specific treatments (root canal, crown, Invisalign, dental implants, veneers) and specific neighborhoods (Brickell, Coral Gables, Doral, Aventura) outrank generic "great service" reviews — even at lower star averages. Our system nudges patients to mention the treatment and the neighborhood naturally, never scripted. On the reply side, we respond within <strong>24-48 hours</strong> on every review, and each reply mentions the treatment plus the neighborhood, which builds the Ask Maps signal in your favor.',
      'For negative reviews, we use a tested <strong>4-step template</strong>: acknowledge → take it offline (private contact info) → owner signature (the practitioner\'s name, not "the staff") → never disclose private patient information. This neutralizes the impact of negative reviews without escalating publicly, which both reduces conversion damage and signals to Google that the practice manages the listing professionally. <strong>$297/mo</strong>, no contracts. First call is a real audit of your current review collection workflow, with a 90-day projection.',
    ],
    signals: [
      { label: 'New reviews per month we collect', val: '15-25 at 4.7+ stars' },
      { label: 'QR card scan rate', val: '40-55% for dental (higher than other verticals)' },
      { label: 'Review-to-completion rate', val: '60-75% once patient scans' },
      { label: 'Review reply how fast', val: '24-48 hours on every review' },
      { label: 'Ask Maps signal optimization', val: 'Treatment + neighborhood mentioned in every reply' },
      { label: 'Pricing', val: '$297/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'How fast does my dental practice need to reply to a negative Google review?',
        a: 'Within <strong>24 hours</strong>. A faster reply minimizes the time the negative review sits visible without context, signals to Google that you actively manage the listing, and de-escalates the issue before other patients pile on. Our 4-step reply template (acknowledge → take it offline → owner signature → never disclose private patient information) lands the reply professionally without engaging the issue publicly — exactly what HIPAA compliance and reputation management both require.',
      },
      {
        q: 'How many Google reviews per month should a dental practice realistically collect?',
        a: 'For an active practice running <strong>40 to 80 patient visits per week</strong>, the realistic target is <strong>15 to 25 new reviews per month</strong>. That assumes a QR-card-first system (the highest-converting tactic in dental specifically — patients respond to the personal-touch signal of a printed handoff). Email-only or SMS-only systems typically produce <strong>5 to 10</strong> reviews per month at the same patient volume. We hit the higher number by running all three channels together with the QR card as the lead.',
      },
      {
        q: 'Can a dental practice ask patients for reviews?',
        a: 'Yes — but how matters more than whether. Direct asks (the front desk verbally requesting a review at checkout) raise the patient\'s suspicion that the review is being solicited, which both lowers the conversion rate and risks triggering Google\'s spam filters that strip incentivized reviews from the listing. The QR-card handoff with a thank-you message ("we hope to see you in 6 months — scan here if you have a moment to share your experience") performs better because it reads as relationship-driven, not transactional. We script this for the front desk team during onboarding.',
      },
      {
        q: 'What is the 4.7+ star threshold and why does it matter?',
        a: '<strong>4.7+ stars</strong> is the Map Pack visibility floor for most competitive Miami dental sub-markets. A practice averaging <strong>4.3 or 4.5</strong> stars can have <strong>300+ reviews</strong> and still rank below a practice with <strong>120 reviews</strong> at <strong>4.8 stars</strong>. The reason: Google\'s ranking algorithm reads star average as a stronger trust signal than raw count, weighted especially for medical/dental (YMYL — Your Money Your Life) listings. Practices below 4.5 stars need to address service issues before scaling review acquisition, because adding more reviews at the existing star average will not move the ranking.',
      },
      {
        q: 'How long until a 50-review dental practice reaches Map Pack visibility?',
        a: 'For a starting point of <strong>50 reviews</strong> at <strong>4.7+ stars</strong> in a moderately competitive Miami sub-market (Brickell, Coral Gables, Aventura, Doral): Map Pack visibility typically arrives within <strong>4 to 6 months</strong> at the pace of <strong>15-25 new reviews per month</strong> we collect. For Miami Beach or downtown — where incumbents have <strong>800-1,600 reviews</strong> — visibility takes <strong>9 to 14 months</strong>. The discipline is the same; the timeline reflects how much catching up the local market requires.',
      },
      {
        q: 'Are Google reviews the only ones that matter for dental practices?',
        a: 'Google is the highest-leverage by a wide margin (roughly <strong>75-80%</strong> of new-patient research touches Google reviews specifically). Yelp matters for cosmetic dentistry searches in particular (the Yelp "Best Cosmetic Dentists in Miami" page ranks page-one organically). Healthgrades and Zocdoc matter for general dentistry searches when patients book through their insurance directories. Facebook reviews matter less than they did 5 years ago but still surface in some carousel-style search results. Our program prioritizes Google + one secondary platform (Yelp for cosmetic-heavy practices, Healthgrades for insurance-heavy practices) instead of spreading thin across all four.',
      },
    ],
  },

  'dentists/google-ads': {
    pageTitle: 'Dental Practice Google Ads Management Miami | Thryv',
    pageDesc: 'Google Ads management for South Florida dental practices. High-CPC implants ($21.85/click) and cosmetic ($7-$22/click) targeting. $1,500-$4,000/mo spend + $250-$400/mo management.',
    h1: 'Google Ads Management for Dental Practices',
    lead: 'Dental implants Miami sits at $21.85 per click. Veneers at $7.22. Invisalign at $18.17. Cosmetic dentistry traffic is the most expensive in the Miami service economy. Profitable when the landing page converts above 6%. Most dental practice landing pages convert at 1-3%.',
    marketHeadline: 'Why Most Dental Google Ads Campaigns Lose Money',
    marketBody: [
      'Dental Google Ads work — but only in a narrow band of conditions. The CPCs are among the highest in the SoFla service economy: <strong>dental implants miami at $21.85/click</strong>, <strong>invisalign miami at $18.17/click</strong>, <strong>dentist doral at $9.94/click</strong>, <strong>dentist kendall at $9.52/click</strong>. At those CPCs, the math only works when (1) the landing page converts the click into a booked consultation at <strong>6% or higher</strong>, and (2) the patient-to-job ticket is above <strong>$1,500</strong> — which dental implants, full-mouth restoration, veneers, and Invisalign all clear easily, but routine cleanings and basic insurance work do not.',
      'Most dental practices that run Google Ads run them wrong. They bid on broad terms like <em>dentist miami</em> (the head term, fewest conversions because intent splits between every imaginable dental query). They send the click to the homepage instead of a treatment-specific landing page. They have no call tracking, so they have no way to know which campaigns are producing the booked consults. And their landing pages have the phone number below the fold, no real pricing examples, and no financing options visible — converting at <strong>1-3%</strong> when the math requires <strong>6-8%</strong>.',
      'What we run for the <strong>$250-$400/mo</strong> management fee on <strong>$1,500-$4,000/mo</strong> spend: tightly-themed ad groups by treatment (one ad group per treatment, not per practice), exact-match and phrase-match keywords with aggressive negative keyword lists (excluding "free," "near me with insurance," "Medicaid" for cash-pay practices), call tracking via dynamic phone number insertion (so we know which keyword produced which booked consult), and treatment-specific landing pages with financing CTAs above the fold. Smart Bidding strategy calibrated to the practice\'s actual conversion economics, not the platform default.',
      '<strong>$250-$400/mo</strong> in management fee on top of your ad spend. No contracts. You own the campaign assets, the ad copy, the landing pages, and the call tracking history if you ever leave. First call is a real audit — if you\'re already running ads, we pull your current performance data and tell you honestly whether the campaign math is workable for your practice. If it\'s not (small insurance-heavy general practice with low job tickets), we will say so on the call and recommend you keep your money in SEO + reputation management instead.',
    ],
    signals: [
      { label: 'Highest dental CPC', val: 'Dental implants — $21.85/click' },
      { label: 'Profitable landing page conversion floor', val: '6% to break even on implant traffic' },
      { label: 'Most dental landing pages convert at', val: '1-3%' },
      { label: 'Spend tier we manage', val: '$1,500-$4,000/mo' },
      { label: 'Management fee', val: '$250-$400/mo, no contracts' },
      { label: 'Best-fit practices', val: 'Cash-pay cosmetic + implant + Invisalign focus' },
    ],
    faqs: [
      {
        q: 'What ad spend should a dental practice start with for Google Ads?',
        a: 'For a dental practice testing Google Ads for the first time, we recommend <strong>$1,500/mo</strong> in spend for the first <strong>30 days</strong> while we calibrate the campaign — focused on a single high-AOV treatment (typically dental implants, Invisalign, or veneers depending on your service mix). After the first month\'s data, spend ramps to <strong>$2,500-$4,000/mo</strong> if the conversion math is working (cost-per-booked-consult below <strong>$200-$400</strong>). For practices targeting full-mouth restoration or All-on-4 specifically, the math justifies up to <strong>$8,000/mo</strong> in spend because the per-patient revenue runs <strong>$20,000-$45,000</strong>.',
      },
      {
        q: 'Why is dental implant traffic so expensive on Google Ads?',
        a: 'Two reasons. First, the patient revenue is high (<strong>$3,500-$6,000</strong> for a single implant, <strong>$20,000-$45,000</strong> for All-on-4), so advertisers willing to pay <strong>$22/click</strong> are still profitable at conversion rates of <strong>2-4%</strong>. Second, the competitive density is heavy — Miami has roughly <strong>40+ practices</strong> actively advertising for implant terms, plus the institutional players (University of Miami Health System) and DSOs (Aspen Dental, Pacific Dental Services). The combination keeps CPCs in the <strong>$20+</strong> range year-round, with seasonal spikes in late Q4 and early Q1.',
      },
      {
        q: 'Should my dental practice bid on competitor names?',
        a: 'Generally no — Google\'s policies allow competitor name bidding, but Florida dental board ethics rules treat it as borderline conduct (specifically prohibiting deceptive comparative advertising that misrepresents another licensed dentist). We recommend against it on legal grounds, not just SEO grounds. The exception: bidding on chain DSO names (Aspen Dental, etc.) where the practice is competing on personal-relationship-vs-corporate-dentistry positioning — those campaigns are typically fine and produce excellent conversion rates for family-owned practices.',
      },
      {
        q: 'Do dental Google Ads work for insurance-driven general practice?',
        a: 'Less profitably than for cash-pay treatments. The math for routine cleanings + insurance-covered general dentistry only works if the cost-per-booked-patient stays under <strong>$50-$80</strong>, which is achievable on low-CPC keywords (<em>dentist near me</em>, <em>family dentist [neighborhood]</em>) but requires very aggressive landing page conversion (<strong>10%+</strong>). Most insurance-driven general practices get better unit economics from SEO + GBP + reputation management instead. We will tell you on the first call which side of that math your practice falls on.',
      },
      {
        q: 'What is the dental Google Ads landing page conversion rate we target?',
        a: 'For implant and high-AOV cosmetic traffic: <strong>6-8%</strong> click-to-booked-consult is the target. For Invisalign: <strong>5-7%</strong>. For general dentistry: <strong>10-14%</strong>. Hitting those numbers requires treatment-specific landing pages (not the homepage), phone number above the fold with click-to-call, pricing examples or financing ranges visible without scrolling, real before/after where applicable, and a low-friction quote form (3 fields maximum: name, phone, treatment of interest). Most dental practice landing pages convert at <strong>1-3%</strong> because they\'re missing 4 or 5 of those elements.',
      },
      {
        q: 'How does Google Ads work alongside SEO for a dental practice?',
        a: 'They cover different patient segments. SEO captures the comparison-shopper who researches over <strong>9 to 14 days</strong> (Coral Gables patient archetype). Google Ads captures the impatient click — the patient with a same-week need who scrolls past organic results to the first listing she sees. Running both correctly increases total booked consults by <strong>40-70%</strong> versus SEO-only. For practices in the first <strong>90 days</strong> of SEO ranking ramp, Google Ads is the lead-flow safety net while the organic rankings climb.',
      },
    ],
  },

  'dentists/website-design': {
    pageTitle: 'Dental Practice Website Design Miami | Thryv',
    pageDesc: 'Custom websites for South Florida dental practices. Mobile-first, transparent pricing, financing CTAs, bilingual Spanish where the market demands it. $1,500-$4,000 build + $297/mo.',
    h1: 'Website Design for Dental Practices',
    lead: 'Most dental practice websites built between 2018 and 2022 convert paid traffic at 1-3%. A mobile-first site with transparent pricing, financing CTAs above the fold, and the 8 above-the-fold conversion elements that matter for dental converts at 6-10%. We build that site.',
    marketHeadline: 'Why Most Dental Websites Hide the Information Patients Need',
    marketBody: [
      'Two thirds of dental patient traffic in Miami is mobile. A patient searches <em>dentist coral gables</em> on her phone at 3pm Tuesday, the click lands on your website, and she has one question: can I trust this practice enough to call right now? The eight above-the-fold elements that answer that question — phone number with one-tap call, financing CTA (CareCredit / Cherry / Sunbit named), <strong>4.7+ star</strong> review aggregate displayed visually, "same-week appointments available" badge, insurance carriers accepted listed by name, years-in-practice signal, real provider photos (not stock), and a 3-field quote form — separate websites that convert at <strong>6-10%</strong> from websites that convert at <strong>1-3%</strong>. Most family-owned dental sites get one or two of those right. The rest are missing or buried below the fold.',
      'Beyond what\'s above the fold, dental websites have to handle two things most other local-service sites don\'t. First, the <strong>insurance + financing complexity</strong> — a dental site that buries the insurance carriers accepted or the financing partners available loses half the click value before the patient even reads the rest of the page. We surface both above the fold and give them dedicated sub-pages (<em>/insurance/</em>, <em>/financing/</em>) that rank for the specific searches patients run ("does [practice] accept Delta Dental," "dental implant financing miami"). Second, <strong>the treatment-pricing question</strong> — patients searching for high-AOV treatments (implants $3.5K-$45K, Invisalign $4.5K-$8K, veneers $1.2K-$2.5K per tooth) need to see real price ranges before they\'ll call. We publish ranges, not exact prices, with the explanation of what moves the cost within the range.',
      'For bilingual markets (Doral, Hialeah, parts of Brickell), we build a real Spanish version of the site — not Google Translate, but copy written by someone who actually knows the difference between how Cubans, Venezuelans, and Colombians describe dental treatments. <em>Endodoncia</em> for root canal. <em>Carillas</em> for veneers. <em>Blanqueamiento</em> for whitening. When a patient searches in Spanish, Google knows to show them the Spanish page. They book at <strong>2-3x the rate</strong> of patients who land on a translated English page. The bilingual build adds <strong>$2,000-$4,000</strong> one-time to the cost but captures a search market with no real competition.',
      'Pricing is structured as a one-time build at <strong>$1,500-$4,000</strong> depending on page count and complexity (typical dental practice site lands at <strong>$3,000</strong> for a 14-page structure: home + 5 service pages + 4 neighborhood pages + insurance + financing + about + contact, plus a blog template), then <strong>$297/mo</strong> for hosting, ongoing maintenance, content updates, structured tagging, and speed monitoring. Bilingual add-on <strong>$2,000-$4,000</strong> one-time + <strong>$50/mo</strong> hosting. No contracts on the monthly. You own everything — domain, code, content, the Spanish translations, the photo library, the schema — if you ever leave.',
    ],
    signals: [
      { label: 'Mobile traffic share', val: '60-70% of dental visits' },
      { label: 'Conversion rate lift', val: '1-3% template → 6-10% built' },
      { label: 'Above-the-fold elements we surface', val: '8 (phone · financing · stars · same-week · insurance · years · provider · form)' },
      { label: 'Build tier', val: '$1,500-$4,000 one-time + $297/mo' },
      { label: 'Bilingual add-on', val: '$2,000-$4,000 one-time + $50/mo' },
      { label: 'Ownership', val: 'You keep everything if you leave' },
    ],
    faqs: [
      {
        q: 'How much does a dental practice website cost?',
        a: 'Wide range. DIY template builders (Wix, Squarespace) at <strong>$0-$600/year</strong> — typically convert at <strong>1-3%</strong> on dental traffic and miss the insurance + financing pages patients search for. Dental-specific platform builders (PatientPop, Pro Sites, Officite) at <strong>$3,600-$9,600/year</strong> — better conversion but you lose the site if you stop paying. Our custom build at <strong>$1,500-$4,000 one-time + $297/mo</strong> — converts at <strong>6-10%</strong>, you own everything, no platform lock-in. Year-one cost: <strong>$5,000-$8,000</strong>, then <strong>$3,500/year</strong> after. The math justifies the higher tier when monthly organic traffic exceeds <strong>250 visits</strong> — typical for any established practice running parallel SEO.',
      },
      {
        q: 'What is the best website platform for a dental practice?',
        a: 'Depends on what you prioritize. DIY templates win on cost. Dental-specific platforms (PatientPop / Pro Sites / Officite) win on speed-to-launch with built-in dental templates, but you lose the site if you stop paying and the conversion ceiling sits at <strong>3-5%</strong> because the templates do not surface what your patients need to see. Custom Astro builds (our model) win on conversion rate, mobile speed, structured tagging, ownership, and bilingual capability — but take <strong>4-6 weeks</strong> to launch. For a practice doing <strong>$500K-$2.5M</strong> in annual revenue with treatment-mix tilting toward cash-pay (implants, cosmetic, Invisalign), custom usually pays back inside <strong>6-12 months</strong>.',
      },
      {
        q: 'Do I really own everything if I leave?',
        a: 'Yes. The domain stays in your registrar account from day one. The source code goes into a private Git repo we transfer to you on request. The content is yours. The structured tagging is yours. The photos and metadata are yours. The bilingual Spanish translation is yours. The deploy configuration on Cloudflare Pages is yours. You can host the site anywhere afterward — Cloudflare, Vercel, Netlify, your own VPS — with zero rebuilding required. This is structurally different from most dental platform builders who lose the site when you stop paying.',
      },
      {
        q: 'How important is mobile design for a dental practice website?',
        a: 'Critical. <strong>60-70%</strong> of dental patient searches happen on mobile, often during work breaks or between activities. A site that loads slowly, has tiny tap targets, or hides the phone number below the fold loses these patients before they ever see your pricing or insurance information. We design mobile-first (the mobile layout is the primary design, not a desktop layout shrunk for phones), one-tap call CTAs, and test on real devices before launch. PageSpeed target: <strong>90+ mobile</strong> versus typical dental platform sites that run <strong>40-65</strong>.',
      },
      {
        q: 'Should my dental practice have a Spanish version of the website?',
        a: 'For practices in Doral, Hialeah, Brickell, or anywhere with a meaningful Latin patient base — yes. <em>Dentista miami</em> search jumped <strong>+1,285%</strong> month-over-month in early 2026, and most Miami dental sites are either English-only or Google-translated. A native Spanish version (written by a real bilingual writer, not Google Translate) converts Spanish-language clicks at <strong>2-3x</strong> the rate of translated English pages. The build adds <strong>$2,000-$4,000</strong> one-time and roughly <strong>$50/mo</strong> hosting — pays back inside <strong>3-6 months</strong> for any practice in a Spanish-majority neighborhood.',
      },
      {
        q: 'How does the website work with my insurance acceptance list?',
        a: 'We build a dedicated <em>/insurance/</em> page that lists each carrier you accept by name (Delta Dental, MetLife, Cigna, Aetna, Humana, UnitedHealthcare, plus specific Florida Medicaid programs where applicable), with the verification step the patient should take before their appointment. This page ranks for "does [practice] accept Delta Dental" and similar long-tail insurance verification searches — high-intent patient research queries that competitors typically waste on a generic "we accept most insurances" footer.',
      },
    ],
  },
};

export function getVerticalOverride(vSlug: string): VerticalOverride | undefined {
  const override = verticalOverrides[vSlug];
  if (!override) return undefined;
  if (override.liveAfter && !import.meta.env.DEV) {
    const today = new Date().toISOString().slice(0, 10);
    if (today < override.liveAfter) return undefined;
  }
  return override;
}

export function getServiceVerticalOverride(
  vSlug: string,
  sSlug: string
): ServiceVerticalOverride | undefined {
  const override = serviceVerticalOverrides[`${vSlug}/${sSlug}`];
  if (!override) return undefined;
  if (override.liveAfter && !import.meta.env.DEV) {
    const today = new Date().toISOString().slice(0, 10);
    if (today < override.liveAfter) return undefined;
  }
  return override;
}

export function getCityOverride(
  vSlug: string, sSlug: string, citySlug: string
): CityOverride | undefined {
  const override = cityOverrides[`${vSlug}/${sSlug}/${citySlug}`];
  if (!override) return undefined;
  if (override.liveAfter && !import.meta.env.DEV) {
    const today = new Date().toISOString().slice(0, 10);
    if (today < override.liveAfter) return undefined;
  }
  return override;
}

// Per-page SEO overrides for specific vertical+service+city+neighborhood combos.
// Key format: `${vertical}/${service}/${city}/${neighborhood}`
export const neighborhoodOverrides: Record<string, NeighborhoodOverride> = {
  'medspas/seo/miami/miami-beach': {
    pageTitle: 'Med Spa SEO Miami Beach | Rank for Botox & Filler Searches',
    pageDesc: 'SEO for Miami Beach med spas. Rank for botox miami beach (720 monthly searches, low competition), filler, laser, and Lincoln Road / South of Fifth searches. $797/mo, no contracts.',
    h1: 'Med Spa SEO in Miami Beach — Built to Rank for Botox, Filler & Laser Searches',
    lead: 'A Miami Beach patient on Lincoln Road searching botox miami beach is comparing two or three providers before she calls. Whoever owns the top of that search owns her year. We help you be that provider.',
    marketHeadline: 'Why Miami Beach SEO Is the Hardest Aesthetic Market in South Florida — and Why a Small Provider Can Still Win It',
    marketBody: [
      'Miami Beach is the densest aesthetics market in South Florida. <em>Botox miami beach</em>, <em>filler miami beach</em>, and <em>laser hair removal miami beach</em> each pull <strong>700+ monthly searches</strong>, and the providers ranking on page one are clustered along Alton Road, Lincoln Road, Collins Avenue, and South of Fifth. The Map Pack belongs to clinics with <strong>200+ Google reviews</strong> and clean treatment-specific pages. Most established clinics here got their ranking five years ago and have coasted since. That is the opening.',
      'Most Miami Beach med spas treat the website like a glossy brochure. They rank for their own brand and almost nothing else. The providers winning new patients have done three boring things consistently: built a dedicated page for every treatment they offer, written Miami Beach as a real signal into the page (not just "Miami"), and kept the review collection loop running every single month. None of that is glamorous. All of it works.',
      '<em>Botox miami beach</em> is the single most valuable search in the local aesthetics market — <strong>720 monthly searches</strong>, competition score of <strong>3 out of 100</strong> (which is low), and an intent so commercial that the patient is comparing providers before she even clicks. Ranking does not require a giant agency budget. It requires three things: (1) a real Miami Beach Botox page that answers the questions the patient is silently asking, (2) <strong>4.7+ stars</strong> with steady review momentum on Google and RealSelf, and (3) Map Pack proximity to the searcher — which a Lincoln Road or Collins Avenue address already gives you. We do the first two so the third one actually matters.',
      'We also build the long-tail Miami Beach inventory — <em>botox south beach</em>, <em>lip filler miami beach</em>, <em>dysport miami beach</em>, <em>microneedling miami beach</em>, <em>kybella miami beach</em> — each as its own page when the menu supports it. Long-tail neighborhood + treatment pages convert at <strong>4x to 6x</strong> the rate of head terms, because the patient has already self-qualified on procedure and location before she clicks. So why isn\'t every Miami Beach med spa doing this? Because the pages take <strong>5 to 7 hours</strong> each to build properly, and most agencies bill for it as a separate line item. We build them into the <strong>$797/mo</strong>.',
      '$797/mo, no contracts, no setup fees, you keep everything if you go — content, ad campaigns, the listing setup, all of it. First call is a real audit: your current ranks for the eight Miami Beach treatment terms, who beats you on each, and an honest read on whether <strong>90 to 120 days</strong> of work moves the needle for your specific situation. If it does not, we will say so on the call.',
    ],
    signals: [
      { label: 'Target Search', val: 'botox miami beach' },
      { label: 'Monthly Volume', val: '720 searches' },
      { label: 'Competition level', val: '3 out of 100 — winnable' },
      { label: 'Service Area', val: 'Alton Rd · Lincoln Rd · South of Fifth · Collins Ave' },
      { label: 'Long-tail variants', val: '+8 treatment terms, ~1,400/mo combined' },
      { label: 'Time to first page', val: '60-120 days for established clinics' },
    ],
    faqs: [
      {
        q: 'What is the average cost of Botox in Miami Beach?',
        a: 'Most Miami Beach providers price Botox at <strong>$13 to $18 per unit</strong>, with a typical treatment area requiring <strong>20 to 60 units</strong>. That puts a single session in the <strong>$260 to $1,080</strong> range. Premium clinics along Lincoln Road and South of Fifth tend to price toward the high end. Miami Beach pricing trends higher than mainland Miami because the patient base skews more affluent and operating costs are higher — a Lincoln Road retail lease runs roughly <strong>3x</strong> what an equivalent Brickell or Coral Gables medical office runs.',
      },
      {
        q: 'How do I choose the best Botox provider in Miami Beach?',
        a: 'Three filters matter most. First, the injector is a board-certified physician, PA, or RN with verifiable credentials — Florida Department of Health license lookup confirms this in under a minute. Second, the clinic has at least <strong>100 Google reviews</strong> at a <strong>4.7+ star</strong> average. Third, the practice quotes pricing per unit, not per area. Skip providers who refuse to quote pricing on the phone, advertise prices below <strong>$10/unit</strong>, or have no before/after gallery for Botox specifically.',
      },
      {
        q: 'Is $600 a lot for Botox in Miami Beach?',
        a: 'For Miami Beach, <strong>$600</strong> is mid-market. It typically buys <strong>35 to 45 units</strong>, which is enough to fully treat the forehead, glabella (between the brows), and crow\'s feet for an average patient. Anything below <strong>$400</strong> in this market may signal diluted product, an inexperienced injector, or a deal-driven clinic with high patient churn — worth scrutinizing before booking.',
      },
      {
        q: 'What is the 4-hour rule after Botox?',
        a: 'Most Miami Beach providers ask patients to stay upright for <strong>4 hours</strong> after the injection and avoid lying down, vigorous exercise, or pressure on the treated area. The reasoning: keep the neurotoxin at the injection site rather than letting it migrate to adjacent muscles, which is rare but can cause asymmetry. Some clinics extend the no-exercise window to <strong>24 hours</strong>.',
      },
      {
        q: 'Why are Miami Beach med spas harder to rank than other Miami neighborhoods?',
        a: 'Miami Beach has the highest concentration of established aesthetic providers per capita in South Florida — over <strong>80 clinics</strong> in a <strong>7-square-mile</strong> area. The Map Pack is owned by clinics with multi-year review histories. The way in: build the long-tail treatment pages first (<em>botox south beach</em>, <em>filler lincoln road</em>, <em>dysport miami beach</em>), rank for those inside <strong>60 days</strong>, then use the traffic and review momentum from those wins to chase the head term <em>botox miami beach</em>. We sequence this deliberately over months <strong>1 to 6</strong>.',
      },
      {
        q: 'How long until a Miami Beach med spa ranks for "botox miami beach"?',
        a: 'For a clinic with an existing Google Business Profile, a Miami Beach service address, and a clean technical foundation, we typically see first-page rankings for <em>botox miami beach</em> within <strong>60 to 120 days</strong>. Map Pack inclusion is faster — usually <strong>30 to 60 days</strong> — because Google weighs proximity heavily and a Miami Beach address is the strongest geographic signal possible. Long-tail terms like <em>dysport miami beach</em> or <em>microneedling miami beach</em> typically rank inside <strong>45 days</strong>.',
      },
    ],
  },

  'medspas/seo/miami/brickell': {
    pageTitle: 'Med Spa SEO Brickell | Rank for Botox & Filler Searches',
    pageDesc: 'SEO for Brickell med spas. Rank for botox brickell, filler, and Brickell City Centre / Mary Brickell Village searches. Lunch-hour patient base, fast-booking market. $797/mo, no contracts.',
    h1: 'Med Spa SEO in Brickell — Built for Botox, Filler & Lunch-Hour Searches',
    lead: 'A Brickell finance VP googles botox brickell at 11:47am, books at 12:02, gets injected on her lunch hour. That entire decision happened in 15 minutes. We help you be the clinic that shows up in those 15 minutes.',
    marketHeadline: 'Why Brickell Med Spa SEO Plays by a Faster Set of Rules',
    marketBody: [
      'Brickell is the densest financial-district condo market in South Florida. About <strong>40,000 residents</strong> live between SE 8th Street and SW 15th Road, skewing <strong>25-to-45-year-old</strong> high-income professionals — exactly the patient who books Botox on her lunch hour and laser hair removal after her Brickell City Centre yoga class. Searches for <em>botox brickell</em> and <em>med spa brickell</em> spike weekdays <strong>11am to 1pm</strong> and again <strong>5pm to 7pm</strong>, and the click-to-call rate runs roughly <strong>30% higher</strong> than Miami Beach or Coral Gables because Brickell patients want to book the same week.',
      'Most Brickell med spas have stunning interiors and underbuilt SEO. They rank for their own brand name, maybe one tier-one treatment, and almost nothing else. Meanwhile, the providers winning new patients in Brickell have done three boring things consistently: built a procedure-specific page for every treatment offered, written Brickell as a real signal into the page (not just "Miami"), and kept the review system running every single month. None of that is glamorous. All of it works.',
      '<em>Botox brickell</em> is one of the highest-intent terms in the entire Miami aesthetic market. The searcher is almost always a Brickell resident on her phone, comparing two or three providers within walking distance of her condo or her office. Ranking does not require domain authority. It requires (1) a real Brickell Botox page with clean Google-friendly tagging, (2) <strong>4.7+ stars</strong> with steady review momentum on Google, and (3) Map Pack proximity to Brickell Avenue or the Brickell Metromover line. For a Brickell provider, that last one is the strongest geographic signal possible.',
      'We also build the long-tail Brickell inventory — <em>lip filler brickell</em>, <em>microneedling brickell</em>, <em>laser hair removal brickell</em>, <em>dysport brickell</em>, <em>kybella brickell</em> — each as its own page when the menu supports it. Long-tail neighborhood + treatment pages convert at <strong>4x to 6x</strong> the rate of head terms because the Brickell professional has already self-qualified on procedure and location before she clicks. Speed-to-book is the killer feature for this market. A clinic that responds inside <strong>15 minutes</strong> to a Brickell inquiry books at roughly <strong>2x</strong> the rate of a clinic that responds in an hour.',
      '<strong>$797/mo</strong>, no contracts, no setup fees, you keep everything if you go — content, ad campaigns, the listing setup, all of it. First call is a real audit: your current ranks for the seven Brickell treatment terms, who beats you on each, and an honest read on whether <strong>60 to 90 days</strong> of work moves the needle. If it does not, we will say so on the call.',
    ],
    signals: [
      { label: 'Target Search', val: 'botox brickell · med spa brickell' },
      { label: 'Monthly Volume (est.)', val: '~150 head + 400 long-tail' },
      { label: 'Competition level', val: '4-8 out of 100 — winnable' },
      { label: 'Service Area', val: 'Brickell Ave · Mary Brickell Village · Brickell City Centre · SW 7th St' },
      { label: 'Patient Profile', val: '25-45, condo resident, lunch-hour booker' },
      { label: 'Time to first page', val: '60-90 days for established clinics' },
    ],
    faqs: [
      {
        q: 'What is the average cost of Botox in Brickell?',
        a: 'Brickell providers typically price Botox at <strong>$14 to $18 per unit</strong>, with most sessions running <strong>$300 to $900</strong> depending on units used. Pricing trends slightly above mainland Miami because Brickell rents are among the highest in South Florida and the patient base expects concierge-level service. Some Brickell clinics offer pre-paid unit packages that bring the per-unit cost closer to <strong>$12</strong> for patients who treat quarterly.',
      },
      {
        q: 'Where are the best med spas in Brickell located?',
        a: 'The highest concentration of Brickell med spas runs along Brickell Avenue between SE 8th and SE 14th Streets, plus the Mary Brickell Village and Brickell City Centre clusters. Patients overwhelmingly prefer providers within a <strong>10-minute walk</strong> of their condo or office, so being on or near the Brickell Metromover line is a real advantage. Verify the provider has Saturday availability and accepts last-minute weekday bookings — Brickell schedules shift constantly.',
      },
      {
        q: 'How long does a typical Brickell Botox appointment take?',
        a: 'Most Brickell med spas run Botox-only appointments in <strong>20 to 30 minutes</strong> door-to-door, which is exactly why the lunch-hour booking pattern works. The injection itself takes <strong>5 to 10 minutes</strong>; the rest is consultation and aftercare. If a provider is quoting <strong>45+ minutes</strong> for a routine Botox session, that usually means they are upselling consultations or letting a less-experienced injector handle first cases — both worth questioning before booking.',
      },
      {
        q: 'Can I get same-week Botox or filler in Brickell?',
        a: 'For most Brickell med spas, yes — same-week availability is standard, and many providers hold <strong>2 to 3 walk-in slots per day</strong> for established patients. Brickell\'s booking pace is faster than any other Miami neighborhood because the patient base is dense, repeat treatment is common, and providers compete on schedule flexibility. If a clinic is booking <strong>3+ weeks out</strong> for Botox, that is either a top provider in real demand or a scheduling issue worth asking about directly.',
      },
      {
        q: 'Why are Brickell med spa search results different from Miami Beach?',
        a: 'Brickell searchers are more transactional than Miami Beach searchers. Miami Beach patients often spend days comparing clinics, reading reviews, and looking at before/after galleries before booking. Brickell patients more often search, scan the top three Map Pack results, and call whichever one has <strong>4.7+ stars</strong> and an opening today. That means clinics ranking in the Brickell Map Pack benefit disproportionately from review momentum and Google Business Profile completeness — and pay a steep penalty for any unanswered negative review.',
      },
      {
        q: 'How long until a Brickell med spa ranks for "botox brickell"?',
        a: 'For a clinic with a Brickell service address and a clean technical foundation, we typically see first-page rankings for <em>botox brickell</em> within <strong>60 to 90 days</strong>. Map Pack inclusion is faster — usually <strong>30 to 60 days</strong> — because Google weighs proximity heavily and Brickell is geographically compact, so any provider with a Brickell Avenue or Brickell City Centre address has the strongest possible geographic signal. Long-tail terms like <em>dysport brickell</em> or <em>microneedling brickell</em> typically rank inside <strong>45 days</strong>.',
      },
    ],
  },

  'medspas/seo/miami/coral-gables': {
    pageTitle: 'Med Spa SEO Coral Gables | Rank on Miracle Mile',
    pageDesc: 'SEO for Coral Gables med spas. Rank for med spa coral gables, Botox, and Miracle Mile / Ponce de Leon searches. Highest-LTV patient base in Miami-Dade. $797/mo, no contracts.',
    h1: 'Med Spa SEO in Coral Gables — Built to Rank for Botox, Filler & Sculptra Searches',
    lead: 'A Coral Gables patient googles med spa coral gables, reads every Google review, checks before/after galleries, and waits 9 to 14 days before booking. Then she stays for five years. We help you be the clinic she chooses.',
    marketHeadline: 'Why Coral Gables Med Spa SEO Is the Long Game',
    marketBody: [
      'Coral Gables is the most reputation-sensitive aesthetic market in Miami-Dade. About <strong>50,000 residents</strong>, skewing older and wealthier than Brickell — established families, longtime homeowners, a patient base that often stays with the same provider for years. Searches for <em>med spa coral gables</em> and <em>botox coral gables</em> convert differently from elsewhere in Miami: the search-to-book timeline averages <strong>9 to 14 days</strong> because Coral Gables patients read every Google review, check before/after galleries, and often book a consultation before any treatment. They reward patience-driven SEO and punish overpromising copy.',
      'Most med spas in Coral Gables waste the geographic signal that comes free with the address. They rank for their own brand and maybe <em>med spa miami</em>, missing the more-valuable Coral Gables-specific searches that come from inside the city itself. The providers winning new Coral Gables patients have done three boring things consistently: built a treatment-specific page for every procedure with neighborhood landmarks woven into the copy (Miracle Mile, Andalusia, Coral Way), written Coral Gables as a real signal into the page (not just "Miami"), and put doctor and injector credentials prominently on every page — Coral Gables patients verify credentials before they call.',
      '<em>Med spa coral gables</em> and its variants (<em>botox coral gables</em>, <em>filler coral gables</em>, <em>laser hair removal coral gables</em>) are lower-volume than Miami Beach but the per-patient economics are dramatically better. The same patient who books a <strong>$600</strong> Botox session in Coral Gables typically returns <strong>3 to 4 times a year</strong>, often adds filler within the first year, and refers friends who become long-term patients. A Coral Gables patient acquired in year one is worth <strong>$5,000 to $8,000</strong> in lifetime value — more than <strong>2x</strong> the Miami-wide average. Ranking for these terms pays back over years, not weeks.',
      'We also build the long-tail Coral Gables inventory — <em>sculptra coral gables</em>, <em>morpheus8 coral gables</em>, <em>iv therapy coral gables</em>, <em>hydrafacial coral gables</em>, <em>weight loss injections coral gables</em> — each as its own page when the menu supports it. Coral Gables patients are especially research-driven on newer treatments and will read <strong>2,000+ words</strong> on a Morpheus8 page before booking. Long-form, deeply-informative pages outperform short brochure pages in this market specifically.',
      '<strong>$797/mo</strong>, no contracts, no setup fees, you keep everything if you go — content, ad campaigns, the listing setup, all of it. First call is a real audit: your current ranks for the seven Coral Gables treatment terms, who beats you on each, and an honest read on whether <strong>90 to 150 days</strong> of work moves the needle. If it does not, we will say so on the call.',
    ],
    signals: [
      { label: 'Target Search', val: 'med spa coral gables · botox coral gables' },
      { label: 'Monthly Volume (est.)', val: '~100 head + 350 long-tail' },
      { label: 'Competition level', val: '5-12 out of 100 — winnable, slower' },
      { label: 'Service Area', val: 'Miracle Mile · Ponce de Leon · Coral Way · Andalusia Ave · Sunset Dr' },
      { label: 'Patient LTV', val: '$5K-$8K (highest in Miami-Dade)' },
      { label: 'Time to first page', val: '90-150 days' },
    ],
    faqs: [
      {
        q: 'What is the average cost of Botox in Coral Gables?',
        a: 'Coral Gables providers typically price Botox at <strong>$13 to $17 per unit</strong>, with most sessions running <strong>$300 to $1,000</strong>. Pricing here is more transparent than in Miami Beach or Brickell — most established providers publish per-unit pricing on their websites, which reflects the patient base\'s preference for upfront information before booking. Long-standing patients sometimes receive loyalty pricing in the <strong>$12/unit</strong> range.',
      },
      {
        q: 'Where are the best med spas in Coral Gables located?',
        a: 'The highest concentration of Coral Gables med spas runs along the Miracle Mile (Coral Way between Douglas Road and LeJeune), with secondary clusters on Ponce de Leon Boulevard between Bird Road and Coral Way and the Andalusia / Granada corridor near the Biltmore Hotel. Many of the longest-established providers operate inside the Doctors Hospital medical complex on South Alhambra Circle. Coral Gables patients tend to prefer providers with physical addresses inside the city limits — not "Coral Gables-adjacent" practices technically located in Miami.',
      },
      {
        q: 'How do I find a board-certified injector in Coral Gables?',
        a: 'Coral Gables has a higher share of physician-led aesthetic practices than any other Miami neighborhood. Look for a lead injector who is a board-certified dermatologist, plastic surgeon, or facial plastic surgeon — verifiable through the American Board of Medical Specialties website or the Florida Department of Health license lookup in under a minute. Many top Coral Gables clinics list every injector\'s certification on their About page. If that information is missing, treat it as a signal worth questioning before you book.',
      },
      {
        q: 'Why are Coral Gables med spa prices similar to Brickell but the service is different?',
        a: 'The price point overlaps but the service model is distinct. Coral Gables clinics typically run <strong>45-to-60-minute</strong> appointments with extensive consultation and longer-term treatment planning, where Brickell clinics run <strong>20-to-30-minute</strong> lunch-hour sessions. Coral Gables patients pay for the depth of consultation, not just the units injected. If you are comparing Coral Gables and Brickell providers, ask each one how long a routine Botox follow-up takes — the answer reveals the service model.',
      },
      {
        q: 'Are Coral Gables med spas more conservative in their treatment recommendations?',
        a: 'Generally yes. The Coral Gables aesthetic ethos emphasizes natural-looking outcomes and gradual treatment progression over dramatic single-session results. Many established Coral Gables injectors will recommend starting with lower Botox doses than Miami Beach providers might suggest for the same patient, with the option to add more after seeing <strong>7-to-14-day</strong> results. That approach builds the long-term patient relationships the neighborhood is known for.',
      },
      {
        q: 'How long until a Coral Gables med spa ranks for "med spa coral gables"?',
        a: 'For a clinic with a Coral Gables address, established practitioners, and a clean technical foundation, we typically see first-page rankings for <em>med spa coral gables</em> within <strong>90 to 150 days</strong>. The longer timeline versus Brickell or Miami Beach reflects that Coral Gables search results favor providers with established review histories — Google reads the older, more researched search behavior of this neighborhood as preferring stable, long-tenured practices. Long-tail terms like <em>morpheus8 coral gables</em> or <em>sculptra coral gables</em> typically rank inside <strong>60 days</strong>.',
      },
    ],
  },

  'medspas/seo/miami/aventura': {
    pageTitle: 'Med Spa SEO Aventura | Rank for Aventura Mall Botox Searches',
    pageDesc: 'SEO for Aventura med spas. Rank for med spa aventura, Botox, Morpheus8, Sofwave, and Aventura Mall / Biscayne Blvd searches. Highest-AOV market in Miami-Dade. $797/mo, no contracts.',
    h1: 'Med Spa SEO in Aventura — Built to Rank for Botox, Morpheus8 & Body Contouring Searches',
    lead: 'An Aventura patient walks out of her clinic having spent $1,800 on Botox plus filler plus a Morpheus8 session — in a single visit. Aventura is the highest-AOV aesthetic market in Miami-Dade. The clinics ranking on page one know what to put on their websites to win her. Most clinics do not.',
    marketHeadline: 'Why Aventura Patients Pick the Device First, the Clinic Second',
    marketBody: [
      'Aventura is the highest-AOV aesthetic market in Miami-Dade. About <strong>40,000 residents</strong> live between the William Lehman Causeway and the Broward County line, split between long-term luxury-condo owners, seasonal snowbird residents, and working families along the western edge — a patient base that often books multiple treatments per visit and pays cash without insurance battles. Searches for <em>med spa aventura</em> and <em>botox aventura</em> convert at a higher dollar value than any other Miami neighborhood: the average first-visit ticket runs <strong>$1,200 to $2,200</strong>, compared with <strong>$400 to $900</strong> in mainland Miami.',
      'Most med spas in Aventura compete on technology and outcomes, not price. Patients here specifically search for the newest devices by name — Morpheus8, Sofwave, Emface, Emsculpt Neo, Sciton Halo, Cynosure PicoSure — and will travel from Hollywood, Hallandale, and even Sunny Isles to find a provider with the right machine. The providers winning new Aventura patients have done three boring things consistently: built a treatment-specific page for every device they own, written Aventura as a real signal into the page (not just "Miami"), and put before/after galleries on every page. Aventura patients verify outcomes before they verify price.',
      '<em>Med spa aventura</em> and its variants (<em>botox aventura</em>, <em>filler aventura</em>, <em>morpheus8 aventura</em>, <em>laser hair removal aventura</em>) are lower-volume than Miami Beach but the per-patient economics are dramatically better. The same Aventura patient who books a <strong>$1,500</strong> first visit typically returns <strong>4 to 6 times</strong> in year one, often adds maintenance treatments (Sculptra, Hydrafacial, IV therapy) on top of her primary procedure, and refers other Aventura Mall regulars who become long-term patients. An Aventura patient acquired in year one is worth <strong>$6,000 to $12,000</strong> in lifetime value — more than <strong>2.5x</strong> the Miami-wide average. Ranking for these terms pays back over years, not weeks.',
      'We also build the long-tail Aventura inventory — <em>sofwave aventura</em>, <em>emface aventura</em>, <em>iv therapy aventura</em>, <em>weight loss injections aventura</em>, <em>vaginal rejuvenation aventura</em>, <em>hair restoration aventura</em> — each as its own page when the menu supports it. Aventura patients are especially device-aware and will read <strong>1,500+ words</strong> on a Morpheus8 or Sofwave page before booking. Long-form, technology-specific pages with clear cost transparency (units, sessions, expected outcomes) outperform vague service-page copy in this market specifically.',
      '<strong>$797/mo</strong>, no contracts, no setup fees, you keep everything if you go — content, ad campaigns, the listing setup, all of it. First call is a real audit: your current ranks for the eight Aventura treatment terms, who beats you on each, and an honest read on whether <strong>60 to 120 days</strong> of work moves the needle. If it does not, we will say so on the call.',
    ],
    signals: [
      { label: 'Target Search', val: 'med spa aventura · botox aventura' },
      { label: 'Monthly Volume (est.)', val: '~120 head + 450 long-tail' },
      { label: 'Competition level', val: '4-10 out of 100 — winnable' },
      { label: 'Service Area', val: 'Biscayne Blvd · Aventura Mall · William Lehman Causeway · Country Club Dr' },
      { label: 'Average First-Visit Ticket', val: '$1,200-$2,200 (highest in Miami)' },
      { label: 'Time to first page', val: '60-120 days for established clinics' },
    ],
    faqs: [
      {
        q: 'What is the average cost of Botox in Aventura?',
        a: 'Aventura providers typically price Botox at <strong>$15 to $20 per unit</strong>, with most sessions running <strong>$400 to $1,200</strong>. Pricing in Aventura trends higher than Coral Gables or Brickell because the patient base expects premium-product brands (Allergan-direct Botox, not gray-market alternatives) and longer consultation time. Many Aventura clinics offer monthly membership programs that bring the per-unit cost closer to <strong>$13</strong> for patients who treat every <strong>12 weeks</strong>.',
      },
      {
        q: 'Where are the best med spas in Aventura located?',
        a: 'The highest concentration of Aventura med spas runs along Biscayne Boulevard between William Lehman Causeway and the Broward County line, with a secondary cluster inside the Aventura Mall medical/wellness suites and in the office towers facing the Don Soffer Aventura Country Club. Patients typically prefer providers within a <strong>10-minute drive</strong> of their condo, and many of the strongest performers operate inside upscale medical office buildings on Country Club Drive or Aventura Boulevard. Verify the provider has weekend availability — Aventura\'s patient base books heavily on Fridays and Saturdays.',
      },
      {
        q: 'Why do Aventura med spas charge more than Brickell or Coral Gables?',
        a: 'Three factors. First, Aventura patients buy multi-modality treatments (Botox plus filler plus laser plus IV therapy in a single visit), which drives the average ticket up significantly. Second, the device inventory is heavier — Aventura clinics typically own newer-generation equipment with higher amortized cost per session. Third, Aventura\'s patient base has stronger price-insensitivity than other Miami markets, so clinics price to value rather than to local competition. The flip side: the service experience, device selection, and consultation depth typically justify the premium for patients comparing across markets.',
      },
      {
        q: 'What is the difference between an Aventura med spa and a Sunny Isles or Hallandale med spa?',
        a: 'Aventura has a denser professional-grade aesthetic cluster and a longer history of established practices. Sunny Isles and Hallandale med spas tend to be newer, smaller, and often run by a single injector — which can be excellent for personal-relationship care but typically offers fewer device options. Patients comparing the three should weigh device inventory, injector experience, and review history (look for clinics with <strong>3+ years</strong> of consistent positive reviews). Most Aventura patients who try the smaller cross-border clinics return to Aventura within <strong>1-2 visits</strong> unless cost was the primary driver.',
      },
      {
        q: 'Do Aventura med spas accept insurance?',
        a: 'For purely aesthetic treatments (Botox, filler, laser hair removal, body contouring), no — these are universally cash-pay. For medical-aesthetic crossover treatments like Botox for migraines, certain laser treatments for medical skin conditions, or hormone replacement therapy, some Aventura providers do accept insurance or work with specific carriers. Always ask upfront if you are seeking a treatment with a possible medical billing path; do not assume one way or the other.',
      },
      {
        q: 'How long until an Aventura med spa ranks for "med spa aventura"?',
        a: 'For a clinic with an Aventura address, a working website, and at least <strong>50 existing Google reviews</strong>, we typically see first-page rankings for <em>med spa aventura</em> within <strong>60 to 120 days</strong>. The faster timeline versus Coral Gables reflects that Aventura has fewer established competitors in search — most of the market competes on map proximity, leaving regular search results disproportionately winnable for any provider running consistent Aventura-specific content. Lower-volume terms like <em>morpheus8 aventura</em>, <em>sofwave aventura</em>, or <em>iv therapy aventura</em> typically rank inside <strong>45 days</strong>.',
      },
    ],
  },

  // ── Tier 1 phased rollout per 30-day-plan.md ─────────────────────────
  // Each entry has a liveAfter date. The override stays dormant in code until
  // that date, then the launchd-scheduled daily build picks it up automatically.

  'medspas/google-business-profile/miami/miami-beach': {
    liveAfter: '2026-05-28',
    pageTitle: 'Google Business Profile for Miami Beach Med Spas | Thryv',
    pageDesc: 'Get your Miami Beach med spa into the Google Map Pack. Weekly posts, photos, review replies, and the boring work that actually books patients. $297/mo, no contracts.',
    h1: 'Google Business Profile Management for Miami Beach Med Spas — Built for the Map Pack',
    lead: 'In Miami Beach, your Google listing books more patients than your website does — roughly 60-70% of first-time calls come through the Map Pack, not your homepage. We run the listing, the photos, the weekly posts, and the review system that gets you into that Map Pack and keeps you there.',
    marketHeadline: 'Why Your Google Business Profile Beats Your Website in the Miami Beach Med Spa Game',
    marketBody: [
      'Most Miami Beach med spas spend more money on their website than on the listing that actually books the patient. Here\'s the math nobody walks you through: when someone searches <strong>botox Miami Beach</strong> or <strong>med spa near me</strong> on their phone walking Lincoln Road, your website isn\'t what they see first. They see the Map Pack — the three-result box sitting right under the search bar — and they call whichever clinic has <strong>4.7+ stars</strong> and a recent post. That decision happens in roughly <strong>8 seconds</strong>, before your website ever loads. It accounts for <strong>60-70%</strong> of your inbound calls. Your website is the credibility check that happens after they\'ve already picked up the phone. The Map Pack is where the picking actually happens.',
      'So why isn\'t every Miami Beach med spa winning at this? Because the work is boring. The clinics ranking in the Map Pack today haven\'t done anything clever — they\'ve just done three things every single week, for at least a year. They\'ve uploaded <strong>100+ original photos</strong> (treatment rooms, exterior, team, before-and-afters with consent, the laser equipment). They\'ve posted weekly updates about treatments and seasonal pushes. And they\'ve replied to every review — yes, every one — within <strong>24-48 hours</strong>. Google reads how fast you reply and how often you post as a freshness signal, and it weighs that heavily for who shows up in the Map Pack. Most of your competitors claim the listing, fill out the basics, and never touch it again. Which is fantastic news for any operator willing to do the boring work — or pay someone to do it for them.',
      'There\'s one part most agencies haven\'t caught up to yet. In 2025 Google rolled out a feature called <strong>Ask Maps</strong> — an AI layer that actually reads through your reviews when deciding who ranks. Which means review <em>content</em> now matters more than review <em>count</em>. A Miami Beach med spa with <strong>80 reviews</strong> that mention specific treatments (Botox, filler, Sofwave) and specific spots (Lincoln Road, South of Fifth, Collins Avenue) outranks a competitor with <strong>200 reviews</strong> that all say some version of "great service." Two hundred generic reviews are worth less than eighty specific ones. So the playbook isn\'t just "get more reviews" anymore — it\'s "get reviews that say what your clinic actually does, in the neighborhood you actually serve." Our reply template mentions the treatment and the neighborhood every time we respond on your behalf, which trains that AI signal in your favor.',
      'Here\'s what we do for the <strong>$297 a month</strong> — no contract, leave whenever. Quarterly photo refresh (we shoot new ones with you, or use yours). Monthly Q&A monitoring (Google lets anyone post a question on your profile now, and whoever answers first basically owns that answer forever — most clinics miss this entirely). Weekly Monday posts from your blog content or seasonal pushes. Reviews replied to within <strong>24-48 hours</strong>, with the treatment and neighborhood mentioned every time. And the part most agencies skip — a printed QR-code review card we design in your brand colors and hand-stock to your front desk. Patients scan it after their treatment. We typically see <strong>30-50%</strong> of patients scan, <strong>60-80%</strong> of scanners actually leave a review, which works out to <strong>15-25 new reviews per month</strong> for a busy clinic. Boring, repetitive, compounds over months. <strong>$297/mo</strong>, leave anytime, you keep everything if you go.',
    ],
    signals: [
      { label: 'Target Search', val: 'google business profile miami beach med spa' },
      { label: 'Map Pack share of bookings', val: '60-70%' },
      { label: 'Photos uploaded', val: '100+ (we shoot new ones quarterly)' },
      { label: 'Review replies', val: 'Within 24-48 hours, every one' },
      { label: 'Weekly posts', val: '1 every Monday morning' },
      { label: 'Map Pack movement', val: '30-60 days for established clinics' },
    ],
    faqs: [
      {
        q: 'Why is my Google listing more important than my website for a Miami Beach med spa?',
        a: 'Because patients call before they click. When someone searches <strong>med spa Miami Beach</strong> on their phone, they see the Map Pack listings first — three businesses with star ratings and recent activity. They pick one of those three roughly <strong>60-70%</strong> of the time, before your website even loads. Your website is what they check to verify they made the right choice after they\'ve already dialed. Build the Map Pack presence first; your website second.',
      },
      {
        q: 'How many Google reviews does my Miami Beach med spa actually need?',
        a: 'Floor for showing up in the Map Pack at all: about <strong>50 reviews</strong> at <strong>4.7+ stars</strong>. To consistently land in the top three Map Pack spots: <strong>150-250 reviews</strong>. The exact number depends on your specific block — Lincoln Road is more crowded than Collins Avenue mid-50s. We track your competitors\' review counts every month and pace your acquisition to stay ahead.',
      },
      {
        q: 'How often should I post on Google Business Profile?',
        a: 'Weekly. Specifically Monday morning. Posting twice a week barely moves the needle past once. Posting less than once a week tells Google your profile is stale, which hurts your Map Pack ranking. Each post we write runs <strong>1,000-1,500 characters</strong>, includes a photo, and ends with a Learn More button pointing back to the right service page on your site.',
      },
      {
        q: 'What is "Ask Maps" and how does it affect my Miami Beach med spa?',
        a: '<strong>Ask Maps</strong> is the AI layer Google rolled out in 2025 that actually reads your reviews when deciding Map Pack rankings. It looks for content that matches what the patient searched. So "best botox Miami Beach" pulls listings whose reviews mention Botox plus Miami Beach landmarks specifically. A <strong>4.1-star</strong> profile with detailed, treatment-specific reviews can outrank a <strong>4.6-star</strong> profile with generic "great service" reviews. Our reply template mentions the treatment and neighborhood every time — the simplest way to train this signal in your favor.',
      },
      {
        q: 'How do I get more Google reviews for my Miami Beach med spa?',
        a: 'Printed QR-code review card, handed to every patient at checkout. We design it in your brand colors, print on premium cardstock, and give your front desk a one-line script. Typical numbers: <strong>30-50%</strong> of patients scan, <strong>60-80%</strong> of scanners actually leave a review. For a busy Miami Beach clinic, that\'s <strong>15-25 new reviews per month</strong>. Way better than email-based review requests, which sit around <strong>5-10%</strong>.',
      },
      {
        q: 'How long until my Miami Beach med spa moves up in the Map Pack?',
        a: 'Established clinic with 40+ existing reviews at 4.5+ stars: typically <strong>30-60 days</strong> to see movement. Brand-new listing or one under 20 reviews: <strong>90-120 days</strong>, because Google needs time to accumulate the trust signals before ranking the profile aggressively. Faster movement correlates with neighborhood-specific review content, not raw review count.',
      },
    ],
  },

  'medspas/reputation-management/miami/miami-beach': {
    liveAfter: '2026-05-30',
    pageTitle: 'Reputation Management for Miami Beach Med Spas | Thryv',
    pageDesc: 'Get to a 4.7+ Google rating and keep it there. QR-card review flow, fast replies, Ask Maps content. $297/mo, no contracts. Free audit first.',
    h1: 'Reputation Management for Miami Beach Med Spas',
    lead: 'In Miami Beach, your Google reviews matter more than your ad budget. We run the review system, the replies, and the Ask Maps content tricks that get Miami Beach med spas to a steady 4.7+ stars — and the consistent stream of new reviews that keeps you there.',
    marketHeadline: 'The Cheapest Way to Win More Bookings in Miami Beach? Reviews.',
    marketBody: [
      'In Miami Beach, the patient comparison-shopping for a med spa makes their decision in roughly <strong>30 seconds</strong>. They see your Map Pack listing, glance at your star rating, glance at the date of your most-recent review, and pick. That\'s it. With <strong>80+ med spas in a 7-square-mile area</strong>, the thing separating you from the clinic next door isn\'t your treatment menu or your interior design — it\'s whether you have a <strong>4.7-star rating</strong> with reviews from the <strong>last 30 days</strong>. A 4.6-star clinic with reviews 4 months old loses the click to a 4.7-star clinic with reviews from last week, even when the lower-star clinic has more total reviews. Recency matters as much as the number.',
      'Most Miami Beach providers think of reviews as something that happens TO them. The clinics actually winning think of reviews as something they produce. The difference is the system: a printed QR-code review card handed to every patient at checkout, scripted by the front desk, tracked weekly. We design the card in your brand colors, print on premium cardstock, and route every scan to Google specifically — not Yelp, not RealSelf, not your website\'s testimonial page. Google. Because Google is what drives the Map Pack, and the Map Pack is what drives <strong>60-70%</strong> of your bookings. Patients scan after a treatment when their satisfaction is highest. Typical numbers: <strong>30-50% scan rate</strong>, <strong>60-80% review-completion</strong>, which works out to <strong>15-25 new reviews per month</strong> for a busy clinic.',
      'There\'s one part most agencies haven\'t caught up to yet. In 2025 Google rolled out <strong>Ask Maps</strong> — an AI layer that actually reads your reviews when deciding who ranks. Which means review <em>content</em> now matters more than review <em>count</em>. A Miami Beach med spa with reviews mentioning specific treatments ("the Sofwave session helped my jawline"), specific landmarks ("walking distance from Lincoln Road"), and specific outcomes ("results visible in 2 weeks") outranks a competitor with generic "amazing service" reviews — even at a lower star count. So our review-acquisition flow includes a soft prompt that nudges patients to mention what treatment they got and where they came from. Not scripted — just suggested. The result reads naturally and trains the AI signal exactly where you want it.',
      'On the response side, we reply to every review — yes, every one — within <strong>24-48 hours</strong>. Each reply mentions the treatment the patient got and references Miami Beach or a specific neighborhood landmark, which compounds the Ask Maps signal we just talked about. For negative reviews, we follow a 4-step template: acknowledge → take it offline → owner signature → never disclose private info. Designed to neutralize impact and show future patients you care, without escalating publicly. The whole system — getting the reviews, the content quality, the replies, the negative-review handling — is the cheapest patient-acquisition channel available to a Miami Beach med spa. <strong>$297 a month</strong>, no contracts, leave whenever, you keep everything if you go. Cheaper than a single month of Google Ads in this market, and the effects compound.',
    ],
    signals: [
      { label: 'Target Search', val: 'reputation management miami beach med spa' },
      { label: 'Star rating floor', val: '4.7+ for Map Pack visibility' },
      { label: 'Review count for top-3', val: '150-250 reviews' },
      { label: 'New reviews per month', val: '15-25 (QR card flow)' },
      { label: 'Review replies', val: 'Within 24-48 hours, every one' },
      { label: 'Tools we use', val: 'Canva QR cards · Birdeye / Podium / NiceJob' },
    ],
    faqs: [
      {
        q: 'How many reviews does my Miami Beach med spa actually need?',
        a: 'Map Pack visibility floor: about <strong>50 reviews</strong> at <strong>4.7+ stars</strong>. To consistently rank in the top 3 of the Map Pack: <strong>150-250 reviews</strong>. The exact number depends on the block — Lincoln Road and South of Fifth are more crowded than Collins Avenue mid-50s. We track your competitors\' review counts every month and pace your acquisition to stay ahead.',
      },
      {
        q: 'What\'s the fastest way to get more Google reviews?',
        a: 'Printed QR-code review card, handed to every patient at checkout. We design it in your brand colors, print on premium cardstock, and give your front desk a one-line script. Typical numbers: <strong>30-50%</strong> of patients scan, <strong>60-80%</strong> of scanners actually leave a review. For a busy Miami Beach clinic, that\'s <strong>15-25 new reviews per month</strong>. Way better than email-based review requests, which sit around <strong>5-10%</strong> completion.',
      },
      {
        q: 'How does Ask Maps affect my reviews?',
        a: '<strong>Ask Maps</strong> is the AI layer Google rolled out in 2025 that actually reads your reviews when deciding Map Pack rankings. It looks for content that matches what the patient searched. A Miami Beach med spa with reviews mentioning specific treatments and neighborhood landmarks outranks a higher-star competitor with generic reviews. We design our review-acquisition flow to nudge patients toward mentioning treatment plus neighborhood naturally — never scripted, but always present in the prompt.',
      },
      {
        q: 'How should I respond to a negative review?',
        a: 'Follow this 4-step template: (1) thank the reviewer by name, (2) express specific concern about the issue they raised, (3) offer to take the conversation offline via phone or email, (4) sign with the owner or practice manager name. Never argue. Never disclose protected health information. Never explain medical decisions publicly. The response isn\'t for the reviewer — it\'s for the next 50 future patients reading. They want to see the practice care visibly without defensiveness. We give you a templated response library organized by complaint type.',
      },
      {
        q: 'Should I respond to every positive review too?',
        a: 'Yes. How fast you reply is itself a ranking signal in the Map Pack. Google reads a <strong>100% reply rate within 48 hours</strong> as an active, engaged listing — which weighs in your favor for Map Pack ranking. Positive review responses should mention the treatment received ("So glad the Botox session went well!") and the neighborhood ("Welcome to Miami Beach!") to feed the Ask Maps content signal.',
      },
      {
        q: 'How long until reputation management moves the needle?',
        a: 'Established Miami Beach med spa adding a structured review-acquisition flow: <strong>30-60 days</strong> to see Map Pack movement, <strong>45-75 days</strong> for measurable lift in inbound calls, <strong>90-120 days</strong> for full ranking stabilization at the new tier. The compounding effect is real — once your new-review pace catches up to your competitors, your Map Pack position becomes more defensible. Competitors have to outpace your now-higher pace to displace you.',
      },
    ],
  },

  'medspas/seo/miami/wynwood': {
    liveAfter: '2026-06-02',
    pageTitle: 'Med Spa SEO Wynwood | Rank in Miami\'s Arts District',
    pageDesc: 'SEO for Wynwood med spas. Rank for med spa Wynwood, Botox, and Wynwood Walls / NW 2nd Avenue searches. $797/mo, no contracts. Free audit first.',
    h1: 'Med Spa SEO in Wynwood — Built for Patients Who Found You on Instagram First',
    lead: 'Wynwood patients find your med spa on Instagram first, Google second. We build the SEO foundation around Wynwood Walls, NW 2nd Avenue, and the NE 23rd Street corridor that captures the patient who saw your work on a friend\'s feed and is now Googling to verify before they book.',
    marketHeadline: 'Your Wynwood Patients Find You on Instagram First. Your Website Just Has to Confirm It.',
    marketBody: [
      'Wynwood works backwards from every other Miami med spa market. The patient sees your work on Instagram or TikTok first — a friend\'s lip filler, a before-and-after reel, a treatment story — and only then opens Google to verify the clinic is real. About <strong>8,000 residents</strong> live in Wynwood and <strong>30,000+ visitors</strong> walk through daily, mostly <strong>25-to-35-year-old</strong> creative professionals, agency workers, and the arts-tourist crowd. The search volumes are smaller than Miami Beach (<strong>~80 monthly searches</strong> for med spa Wynwood, <strong>~300 across the long-tail variants</strong>), but the patient\'s intent is much higher. They\'re not comparing five clinics. They\'ve already picked one. Your job is to make sure the page they land on confirms they made the right call.',
      'Here\'s where most Wynwood med spas leave money on the table. They run beautiful Instagram accounts and treat SEO as a second thought. The website is a 2018 template with a single Services page and a hero shot of a treatment room. Meanwhile, the providers actually winning organic search in Wynwood have done something different. They\'ve built treatment-specific pages that answer the exact questions a post-Instagram patient asks: <strong>what does this cost</strong>, <strong>who\'s actually injecting</strong>, <strong>what does recovery look like</strong>, <strong>are these results real or filtered</strong>. SEO in Wynwood is less about getting discovered. It\'s about converting the patient who already decided to discover you.',
      'The Wynwood SEO opportunity is also unusually winnable. Competition for the head terms (med spa Wynwood, Botox Wynwood, lip filler Wynwood, microneedling Wynwood) is the <strong>lowest in Miami-Dade</strong>. Most Wynwood clinics either skip SEO entirely or run an agency-template that doesn\'t fit the post-Instagram patient. A clinic with a real Wynwood address and a properly-built site typically reaches first-page rankings within <strong>45 to 75 days</strong> — faster than any other Miami neighborhood we work in. Long-tail landmark searches (Botox near Wynwood Walls, lip filler NW 2nd Avenue) usually rank inside <strong>30 days</strong>.',
      'What we build for the <strong>$797 a month</strong>: a Wynwood-specific home page with patient-verification content above the fold (real before-and-afters with consent, transparent pricing, injector credentials, online booking), <strong>5-8 treatment pages</strong> targeting the long-tail Wynwood + landmark variants, a monthly Wynwood-context blog post (district news, treatment trend coverage, patient stories), and quarterly link-building work that adds local-authority backlinks. No contracts. Leave whenever. You keep the content, the schema, the citations, the code. Most Wynwood clinics will never invest the time to do this work themselves. Doing it once — properly — is what permanently separates you from the post-discovery comparison shop.',
    ],
    signals: [
      { label: 'Target Search', val: 'med spa wynwood · botox wynwood' },
      { label: 'Monthly volume', val: '~80 head + ~300 long-tail variants' },
      { label: 'Competition level', val: 'Lowest in Miami-Dade (3-7 out of 100)' },
      { label: 'Service area', val: 'NW 2nd Ave · Wynwood Walls · NE 23rd St · Wynwood Doors' },
      { label: 'Patient profile', val: '25-35, social-driven, post-Instagram discovery' },
      { label: 'Time to first page', val: '45-75 days' },
    ],
    faqs: [
      {
        q: 'What is the average cost of Botox in Wynwood?',
        a: 'Wynwood providers typically price Botox at <strong>$12 to $16 per unit</strong>, with most treatment sessions running <strong>$240 to $720</strong> depending on units used. Pricing runs slightly below Brickell and Miami Beach because the patient base skews younger and earlier-career, with higher price-sensitivity than the established affluent neighborhoods. Several Wynwood clinics offer first-treatment specials in the <strong>$10/unit</strong> range to capture the post-Instagram patient before they comparison-shop.',
      },
      {
        q: 'Where are the best med spas in Wynwood?',
        a: 'The highest concentration runs along <strong>NW 2nd Avenue between NW 20th and NW 29th Streets</strong>, plus the <strong>NE 23rd Street corridor</strong> heading toward Edgewater. Many of the strongest performers occupy renovated industrial spaces and lean into the district\'s arts aesthetic in their branding. Patients usually prefer providers within walking distance of Wynwood Walls and the bar/restaurant cluster — proximity drives the after-work and weekend booking patterns specific to this market.',
      },
      {
        q: 'How do I check if a Wynwood med spa is legitimate?',
        a: 'Three filters. <strong>One:</strong> the practice is registered with the Florida Department of Health under a board-certified physician medical director. <strong>Two:</strong> the injectors are RNs, PAs, or physicians with verifiable Florida licenses (lookup at flhealthsource.gov). <strong>Three:</strong> the practice has a physical address and not just a popup or shared-suite arrangement. Wynwood has more new-clinic openings than any other Miami med spa neighborhood, so verifying credentials matters more here than in established markets.',
      },
      {
        q: 'Do Wynwood med spas accept walk-ins?',
        a: 'Most Wynwood med spas accept day-of bookings rather than true walk-ins. The pattern that works: call or DM in the morning for an appointment that afternoon. Most providers hold <strong>2-4 same-day slots</strong> for established patients and <strong>1-2</strong> for new patients who pre-paid via Instagram link or website booking. Walking in without an appointment usually means a <strong>2-3 hour wait</strong> or a next-available booking <strong>2-4 days out</strong>.',
      },
      {
        q: 'Why are Wynwood med spas different from Brickell or Coral Gables?',
        a: 'Wynwood is the youngest, most social-driven, and least-established med spa market in Miami-Dade. Patients skew <strong>25-35</strong> (vs Coral Gables\' 40-55), the booking journey starts on Instagram or TikTok before Google, and prices run <strong>10-20% below</strong> Brickell or Coral Gables. Aesthetic risk-tolerance is higher — Wynwood patients adopt trending treatments (lip filler dissolving, Russian lip technique, baby Botox) faster than established neighborhoods. Wynwood is also the most price-sensitive of the Miami premium med spa neighborhoods.',
      },
      {
        q: 'How long until a Wynwood med spa ranks for "med spa Wynwood"?',
        a: 'Clinic with a Wynwood address and a clean technical foundation: typically <strong>45 to 75 days</strong> for first-page rankings on "med spa Wynwood" — faster than any other Miami neighborhood because established competitor density in organic search is lower. Many Wynwood-based clinics rank competitively on Instagram and social but underinvest in SEO, leaving the organic search results disproportionately winnable. Long-tail terms like "Botox near Wynwood Walls" or "lip filler NW 2nd Avenue" typically rank inside <strong>30 days</strong>.',
      },
    ],
  },

  'dentists/seo/miami/coral-gables': {
    // PINNED 2026-05-18 — content is educated estimates, NOT Day-3-research-grounded.
    // Push liveAfter to 9999-12-31 so it never activates until proper dentist-vertical research lands.
    // To activate: (1) run Day 3 methodology for dentists vertical, (2) update content with verified data,
    // (3) change liveAfter back to a real date, (4) add date to SCHEDULED_DATES in thryv-scheduled-override-deploy.sh.
    liveAfter: '9999-12-31',
    pageTitle: 'Dentist SEO Coral Gables | Rank for Cosmetic Dental Searches',
    pageDesc: 'Dentist SEO for Coral Gables practices. Rank for dentist Coral Gables, cosmetic dentistry, and Miracle Mile / Ponce de Leon searches. $797/mo, no contracts.',
    h1: 'Dentist SEO in Coral Gables — Built for the Family-First Practice',
    lead: 'Coral Gables dental patients book with the same family practice for decades. We help dental practices around Miracle Mile, Ponce de Leon, and the Doctors Hospital medical complex rank for the trust-and-credentials searches that drive long-term patient relationships — not the deal-shopper terms that miss the Coral Gables patient base entirely.',
    marketHeadline: 'Why Coral Gables Dentist SEO Rewards Reputation Depth',
    marketBody: [
      'Coral Gables is the most reputation-sensitive dental market in Miami-Dade. The roughly 50,000 residents skew older and wealthier than Brickell or Wynwood, and the patient base treats dentistry as a generational family relationship — the same practice often treats parents, kids, and grandkids over decades. Searches for dentist Coral Gables and cosmetic dentist Coral Gables convert with a 14-to-30-day decision window because patients research credentials, ask in-network friends and family, and verify reviews before any first visit. They reward depth and punish shallow marketing copy.',
      'Most Coral Gables dental practices have decades of patient relationships but underbuilt SEO. They rank for their practice name and maybe one procedure ("teeth whitening Coral Gables") and almost nothing else. Meanwhile, the practices winning new Coral Gables patients have built procedure-specific pages for every service offered (veneers, dental implants, Invisalign, full-mouth restoration, cosmetic bonding, pediatric dentistry, periodontics), layered Coral Gables as a geographic signal into title tags / H1s / schema, and prominently display every doctor\'s board certification and dental school credentials. Coral Gables patients verify before they call.',
      'The dentist Coral Gables search and its variants (cosmetic dentist Coral Gables, Invisalign Coral Gables, dental implants Coral Gables, veneers Coral Gables) are lower-volume than Miami Beach dental searches but dramatically higher-LTV per patient. The same Coral Gables patient who books a $500 dental cleaning typically becomes a $15,000-to-$50,000 lifetime customer across cleanings, orthodontics, implants, cosmetic work, and family referrals. Ranking for these terms compounds over years.',
      'We also build out the long-tail Coral Gables search inventory — pediatric dentist Coral Gables, holistic dentist Coral Gables, emergency dentist Coral Gables, Spanish-speaking dentist Coral Gables, sleep apnea dentist Coral Gables — each as its own page when the practice menu supports it. Coral Gables patients are especially research-driven on specialty dental work and will read 1,500+ words on a dental implant page before scheduling a consultation. Long-form, deeply-informative pages with clear procedure-step content and credentials displayed prominently outperform short bio-page copy in this market.',
    ],
    signals: [
      { label: 'Target Term', val: 'dentist coral gables · cosmetic dentist coral gables' },
      { label: 'Monthly Volume (est.)', val: '~140 head + 500 long-tail' },
      { label: 'Competition level', val: 'Medium (8-18 out of 100)' },
      { label: 'Service Area', val: 'Miracle Mile · Ponce de Leon · Doctors Hospital area · Sunset Dr' },
      { label: 'Patient LTV', val: '$15K-$50K (multi-decade family practice)' },
      { label: 'Time to First Page', val: '90-150 days' },
    ],
    faqs: [
      {
        q: 'What is the average cost of cosmetic dentistry in Coral Gables?',
        a: 'Coral Gables cosmetic dental work prices typically run: porcelain veneers $1,200-$2,500 per tooth, Invisalign $4,500-$7,500 full case, dental implants $4,000-$6,500 per implant (including crown), professional teeth whitening $400-$800. Pricing trends 15-25% above mainland Miami because Coral Gables practices typically use higher-end labs (often Miami-based Romexis or DC-based labs) and the patient base expects premium materials and longer consultation time before treatment.',
      },
      {
        q: 'How do I find a board-certified dentist in Coral Gables?',
        a: 'Coral Gables has a higher concentration of physician-led specialty dental practices than any other Miami neighborhood. Look for dentists with verifiable American Dental Association membership, Florida Dental Association membership, and specialty certifications (American Board of Cosmetic Dentistry for cosmetic work, American Academy of Periodontology for gum work, American Association of Endodontists for root canal work). Many top Coral Gables practices list every dentist\'s certifications on their About page; if that information is hidden behind a "schedule consultation" gate, treat it as a signal worth questioning.',
      },
      {
        q: 'Should I choose a family dentist or a specialist in Coral Gables?',
        a: 'For routine cleanings, fillings, and most general dentistry, an established Coral Gables family practice is the right call — the multi-decade patient relationships and continuity-of-care advantages compound. For specific specialty work (implants, root canals, periodontal surgery, full-mouth restoration), most Coral Gables family dentists will refer you to a specialist they trust. Following the referral usually produces better outcomes than self-selecting a specialist online. Ask your family dentist for two or three names and check each one independently.',
      },
      {
        q: 'How do I find a Spanish-speaking dentist in Coral Gables?',
        a: 'A majority of Coral Gables dental practices have at least one bilingual Spanish-English provider on staff, but verify before scheduling for someone who needs Spanish-language treatment communication. The most reliable filter is calling the practice and asking specifically which dentists speak Spanish fluently — practice managers will name the providers and often offer to schedule with the bilingual one specifically. Many Coral Gables practices also have Spanish-speaking hygienists and front-desk staff, which matters for ongoing care continuity.',
      },
      {
        q: 'How do Coral Gables dental prices compare to Aventura or Brickell?',
        a: 'Coral Gables dental prices trend 10-15% above Brickell and 10-20% below Aventura for equivalent procedures. The driver is patient-base sensitivity — Coral Gables expects established practices with high-end materials, Aventura expects premium-device dentistry with newest technology, and Brickell expects fast-service convenience-priced care. If you are comparing across markets, ask each practice about their lab (Coral Gables typically uses higher-end labs), their case planning depth (Aventura typically does longer pre-treatment workups), and their scheduling flexibility (Brickell typically offers fastest turnaround).',
      },
      {
        q: 'How long until a Coral Gables dental practice ranks for "dentist Coral Gables"?',
        a: 'For an established Coral Gables practice with multi-decade patient history, a clean technical foundation, and 50+ existing Google reviews, we typically see first-page rankings for the dentist Coral Gables head term within 90 to 150 days. The longer timeline versus med spa SEO reflects that dental search results favor practices with established review histories — Google interprets the family-practice search behavior of Coral Gables as preferring stable, long-tenured practices. Long-tail terms like "Invisalign Coral Gables" or "dental implants Coral Gables" typically rank inside 60 days.',
      },
    ],
  },

  'medspas/seo/miami/doral': {
    liveAfter: '2026-06-09',
    pageTitle: 'Med Spa SEO Doral | Botox y Filler en Doral, Miami',
    pageDesc: 'Bilingual SEO for Doral med spas. Rank for med spa Doral, Botox Doral, "spa medico Doral en español." $797/mo, no contracts. Free audit first.',
    h1: 'Med Spa SEO in Doral — Built for Your Spanish-First Patient Base',
    lead: 'Doral patients search half the time in Spanish. We build the SEO foundation around NW 41st Street, Doral Boulevard, and the Country Club Plaza corridor that ranks for both languages — med spa Doral, spa medico Doral, Botox Doral — and books patients from Miami-Dade\'s most Spanish-dominant high-income market.',
    marketHeadline: 'Half Your Doral Patients Search in Spanish. Most Med Spas Optimize for Zero of Them.',
    marketBody: [
      'Doral is the most Spanish-language-dominant high-income market in Miami-Dade. About <strong>76,000 residents</strong>, heavily Venezuelan, Colombian, and Cuban-American, with English as a second language for most of the patient-age population. Searches for med spa Doral and Botox Doral split roughly <strong>50/50</strong> between English and Spanish variants — "spa medico Doral," "medicina estetica Doral," "Botox cerca de mi en Doral." Optimize for English only and you\'re invisible to half the people trying to book a treatment. The bilingual SEO gap is the single largest opportunity in this market.',
      'Most Doral med spas know their patients are bilingual but treat their website as English-only — or they have a Spanish version that\'s just Google Translate of the English content. Patients can tell. A Doral patient who searches in Spanish, lands on translated English copy, and reads "tratamiento facial relajante" instead of how a Venezuelan or Colombian friend would describe it — they bounce. The providers actually winning Doral organic search have built two real versions of their site, each written natively, each treated as the primary version for its audience. Spanish isn\'t a translation afterthought; it\'s a first-class channel. Per our research: <strong>35% of Miami-Dade searches happen in Spanish</strong>, and <strong>90% of Miami agencies don\'t optimize for it</strong>. Doral is where that gap is widest.',
      'The Doral patient also asks different questions than every other Miami neighborhood. "Where was your doctor trained?" is more common in Doral than anywhere else in Miami-Dade — patients often compare local providers against specialists they know in Caracas or Bogotá, and they\'re brand-conscious about device manufacturers (Allergan vs Merz, Sciton vs Cynosure). The successful Doral provider answers these questions on the website before the patient calls. High-income corporate-Latin demo, willing to pay premium for European-trained doctors specifically, brand-loyal once trust is established. SEO content has to speak to that patient — not the generic Miami patient.',
      'What we build for the <strong>$797 a month</strong>: a real Spanish version of your site — not Google Translate gibberish, but copy written by someone who actually knows the difference between how Venezuelans, Colombians, and Cubans talk about Botox. When a patient searches in Spanish, Google knows to show them the Spanish page. They land on a site that reads like a friend wrote it. They book at <strong>2-3x the rate</strong> of patients who land on a translated English page — that\'s the gap most Doral med spas don\'t realize they\'re losing. The full build: <strong>5-8 treatment pages</strong> in both languages, a monthly bilingual blog post (district news, treatment trends, real patient stories), and quarterly link-building from local publications on both sides of the language. <strong>60-90 days</strong> to first-page rankings in both. No contracts. Leave whenever. You keep all of it if you go.',
    ],
    signals: [
      { label: 'Target Search', val: 'med spa doral · botox doral · spa medico doral' },
      { label: 'Monthly volume', val: '~110 head EN + ~90 head ES + ~450 long-tail' },
      { label: 'Spanish search share', val: '~50% (vs 35% Miami-Dade avg)' },
      { label: 'Competition level', val: 'Low (4-9 out of 100) — bilingual gap is wide open' },
      { label: 'Service area', val: 'NW 41st St · Doral Blvd · Country Club Plaza · Doral City Place' },
      { label: 'Time to first page', val: '60-90 days (both EN and ES)' },
    ],
    faqs: [
      {
        q: 'What is the average cost of Botox in Doral?',
        a: 'Doral providers typically price Botox at <strong>$13 to $17 per unit</strong>, with most treatment sessions running <strong>$300 to $1,000</strong>. Pricing is more transparent than Miami Beach because the patient base often comparison-shops against providers in Latin America (where pricing varies dramatically by country and city) and expects upfront pricing in writing before scheduling. Many Doral clinics also offer treatment packages and family pricing programs that reflect the multigenerational booking patterns common in the Doral Latin community.',
      },
      {
        q: 'Where are the best med spas in Doral?',
        a: 'The highest concentration runs along <strong>NW 41st Street between NW 87th Avenue and NW 107th Avenue</strong>, plus the <strong>Doral Boulevard corridor</strong> near Country Club Plaza and Doral City Place. Many of the strongest performers operate inside the medical office buildings along NW 79th Court and inside Doral City Place. Patients typically prefer providers with bilingual Spanish-English staff and at least one Spanish-fluent provider — verify language fluency by phone before booking.',
      },
      {
        q: '¿Dónde están los mejores spas médicos en Doral?',
        a: 'Las mejores opciones de spa médico en Doral están concentradas en <strong>NW 41st Street entre las avenidas 87 y 107</strong>, además del corredor de <strong>Doral Boulevard</strong> cerca de Country Club Plaza y Doral City Place. Muchos de los mejores spas operan dentro de los edificios médicos en NW 79th Court y dentro de Doral City Place. Los pacientes generalmente prefieren proveedores con personal bilingüe español-inglés y al menos un médico que hable español con fluidez — verifique la fluidez del idioma por teléfono antes de reservar.',
      },
      {
        q: 'Do Doral med spas accept patients visiting from Latin America?',
        a: 'Yes — many Doral med spas have established medical tourism workflows for patients visiting from Caracas, Bogotá, Lima, Mexico City, and other Latin American markets. These typically include consultation-to-treatment scheduling within <strong>24-48 hours</strong>, transportation coordination from Miami International Airport, hotel partnerships in Doral and Miami Beach, and post-treatment teleconsultation for patients returning home. Ask the practice about their international patient coordinator role.',
      },
      {
        q: 'Why is Spanish-language SEO so important in Doral?',
        a: 'Doral is the most Spanish-dominant high-income market in Miami-Dade, with roughly <strong>50%</strong> of med-spa searches happening in Spanish — compared to the Miami-Dade average of <strong>35%</strong>. A Doral med spa optimizing for English-only is missing roughly half its potential traffic. A Doral med spa with a Google-Translate Spanish version of its English site converts Spanish-language clicks at lower rates than competitors with true native-Spanish content. The bilingual SEO gap is the single largest opportunity for Doral providers.',
      },
      {
        q: 'How long until a Doral med spa ranks for "med spa Doral"?',
        a: 'Clinic with a Doral address, a clean technical foundation, and true bilingual content (not Google-translated): typically <strong>60-90 days</strong> for first-page rankings on med spa Doral and its Spanish equivalents. Faster than Miami Beach because Doral has fewer established competitors in organic search — most local providers compete primarily in Spanish-language social and rely on word-of-mouth in the Latin community. Long-tail bilingual terms like "Botox Doral en español" or "medicina estetica Doral" typically rank inside <strong>45 days</strong>.',
      },
    ],
  },

  'real-estate-agents/seo/miami/miami-beach': {
    // PINNED 2026-05-18 — content is educated estimates, NOT Day-3-research-grounded.
    // Push liveAfter to 9999-12-31 so it never activates until proper real-estate-vertical research lands.
    // To activate: (1) run Day 3 methodology for real-estate-agents vertical, (2) update content with verified data,
    // (3) change liveAfter back to a real date, (4) add date to SCHEDULED_DATES in thryv-scheduled-override-deploy.sh.
    liveAfter: '9999-12-31',
    pageTitle: 'Real Estate Agent SEO Miami Beach | Rank for Condo Searches',
    pageDesc: 'Real estate SEO for Miami Beach agents. Rank for Miami Beach condos, South of Fifth real estate, oceanfront searches. $797/mo, no contracts.',
    h1: 'Real Estate Agent SEO in Miami Beach — Built to Rank for South Beach, Sunset Harbour & Mid-Beach Searches',
    lead: 'Miami Beach real estate agents live or die on condo searches. We help agents from Lincoln Road to Fisher Island rank for the building-specific and oceanfront searches that drive the highest commissions per deal in Miami-Dade.',
    marketHeadline: 'Why Miami Beach Real Estate SEO Pays for Itself in One Deal',
    marketBody: [
      'Miami Beach is the highest commission-per-deal real estate market in Miami-Dade. The median condo sale price ranges from $700K (mid-Beach interior units) to $8M+ (Fisher Island, Continuum, Apogee, Bal Harbour Tower), with the average successful agent closing $30M+ annual sales volume. A single Miami Beach condo commission ($75K-$200K on a $2M-$8M deal) can pay for two years of marketing spend — meaning the math on real estate SEO is dramatically different from any other vertical: one deal pays for the entire annual investment.',
      'Most Miami Beach real estate agents have IDX-fed property listings and an "About" page and call it a website. They rank for their own name and almost nothing else. Meanwhile, the agents actually winning Miami Beach search have built building-specific landing pages for every major condo tower (Continuum North + South, Apogee, Murano Grande, Setai, Fontainebleau Sorrento, Faena House, One Thousand Museum nearby), neighborhood-specific pages (South of Fifth, mid-Beach, Bal Harbour, Surfside, North Bay Village), and content-rich market-update pages refreshed quarterly with actual sales data from the MLS.',
      'The Miami Beach real estate search and its variants (Miami Beach condos for sale, South of Fifth real estate, oceanfront Miami Beach, Bal Harbour real estate agent) reward agents who own building-specific intent. A buyer searching "Continuum Miami Beach" is signaling exactly which building they\'re considering — and the agent who ranks for that building has a meaningful conversion advantage over a generic "Miami Beach real estate" page. Most buildings have 5-15 active agents fighting for the lead. The agent winning the building search captures disproportionate share.',
      'We also build out the long-tail Miami Beach search inventory — South of Fifth condos under $2M, oceanfront Miami Beach 2 bedroom, Miami Beach condo with pet policy, pre-construction Miami Beach 2026, Faena District condos for sale, mid-Beach turnkey condos. Long-tail building + price-band + lifestyle pages convert at significantly higher rates than head terms because the buyer has already self-qualified on geography + budget + property type before the click. Adding a current-listings IDX module to each long-tail page closes the loop from search to property inquiry.',
    ],
    signals: [
      { label: 'Target Term', val: 'miami beach condos · miami beach real estate agent' },
      { label: 'Monthly Volume (est.)', val: '~600 head + 2,000 long-tail (building + price-band)' },
      { label: 'Competition level', val: 'Medium-high (12-25 out of 100) — high-value market' },
      { label: 'Service Area', val: 'South of Fifth · Mid-Beach · Bal Harbour · Surfside · Fisher Island' },
      { label: 'Avg Commission per Deal', val: '$75K-$200K (highest in Miami-Dade)' },
      { label: 'Time to First Page', val: '90-180 days' },
    ],
    faqs: [
      {
        q: 'What is the average commission for a Miami Beach real estate transaction?',
        a: 'Miami Beach commission averages 5-6% of sale price (split between buyer agent and seller agent), with the highest commissions concentrated in luxury condo sales above $2M. A typical Miami Beach agent closing $30M annual volume earns roughly $750K-$900K gross commission per year (before brokerage split). The math on Miami Beach real estate SEO is unique because a single successful deal can pay for the entire annual marketing investment, making the per-lead acquisition economics dramatically different from any other vertical.',
      },
      {
        q: 'Where do Miami Beach buyers typically search?',
        a: 'Three primary channels: (1) Zillow and Realtor.com for inventory browsing, (2) Google search for building-specific terms ("Continuum Miami Beach", "Apogee condos", "Faena House for sale") when narrowing down, (3) Instagram and word-of-mouth from existing Miami Beach friends. The Google search layer is where SEO matters most — by the time a buyer is searching for a specific building by name, they have already narrowed down to 2-3 candidates and the agent who ranks first for the building name has a meaningful conversion advantage.',
      },
      {
        q: 'Which Miami Beach buildings have the most search demand?',
        a: 'Top search-demand Miami Beach condo buildings (by Google monthly search volume): Continuum North + South Tower, Apogee, Faena House, Murano Grande, Setai, One Ocean South of Fifth, Bal Harbour Tower, Roney Palace, Fontainebleau Sorrento, and 87 Park. Pre-construction projects like Une Bal Harbour, Bentley Residences, Aman Miami Beach, and Naia by Mr. C are seeing accelerating search volume as completion dates approach. Each major building justifies its own dedicated landing page.',
      },
      {
        q: 'How long until a Miami Beach real estate agent ranks for "Miami Beach condos"?',
        a: 'For an established agent with a clean technical foundation and existing closed-transaction history, we typically see first-page rankings for building-specific terms within 90 to 150 days, and for broader category terms ("Miami Beach condos for sale", "Miami Beach real estate agent") within 120 to 180 days. The longer timeline versus med spa SEO reflects higher competition — major Miami Beach real estate agents have been competing for these terms for years and accumulated significant backlink profiles. Building-specific long-tail rankings come fastest.',
      },
      {
        q: 'Should I use Zillow Premier Agent in addition to SEO?',
        a: 'Yes, but not exclusively. Zillow Premier Agent buys clicks on specific zip codes at $5-$15+ per lead (Miami Beach zip codes 33139 and 33141 run on the high end). The leads are exclusive to you for that hour, but expire fast. SEO builds compounding equity that produces leads at near-zero per-lead cost once it ranks. Most successful Miami Beach agents run BOTH — Zillow for immediate volume + SEO for compounding pipeline. Annual budget splits we see work: 40-50% Zillow, 30-40% SEO, 10-30% other (social, sphere of influence, paid search).',
      },
      {
        q: 'How does the Miami Beach pre-construction market affect SEO strategy?',
        a: 'Pre-construction is the single most search-volatile vertical in Miami Beach real estate. New projects (Aman, Bentley Residences, Una, Naia, Aviva Miami Beach) generate spikes of search demand 12-24 months before completion as buyers research the building. An agent who builds a dedicated landing page early for a hot pre-construction project — with floor plans, pricing tiers, developer info, and current availability — can rank for the building name months before competitors notice the search volume and start building their own pages. We track active pre-construction projects and pre-build landing pages 9-12 months before estimated completion.',
      },
    ],
  },

  // ── HVAC neighborhood overrides (research: 03-keywords-hvac/) ──────────

  'hvac/seo/miami/brickell': {
    pageTitle: 'HVAC SEO Brickell | High-Rise Condo AC Specialists',
    pageDesc: 'SEO for Brickell HVAC contractors. 40,000+ condo residents, salt-air corrosion, building-association vendor approvals. $797/mo, no contracts.',
    h1: 'HVAC and AC Repair SEO in Brickell — Built for the High-Rise Condo Market',
    lead: 'Brickell HVAC demand is structurally different from suburban Miami. <strong>40,000+ condo residents</strong> in high-rises with central HVAC systems means the HVAC contractor who wins Brickell is one approved by the building associations, fluent in the high-rise service-elevator coordination, and ranked on the long-tail terms that compound across the buildings.',
    marketHeadline: 'Brickell HVAC: The Building-Association Vendor Game',
    marketBody: [
      'Brickell residents do not search "HVAC contractor near me" the way suburban homeowners do. They search "AC repair brickell condo", "central air repair my brickell building", "HVAC contractor approved by brickell association". The buyer is calling whoever is on the building\'s approved-vendor list, or whoever the concierge recommends. The SEO play here is to be the contractor those approval lists and concierge recommendations point to.',
      'High-rise HVAC service involves specifics that suburban contractors do not handle: service-elevator reservations, condo-association certificate-of-insurance requirements, after-hours sound-restriction protocols, and saltwater-corrosion-driven equipment replacement cycles that run shorter than mainland averages. A site that names these specifics ranks for the Brickell long-tail because almost nothing else does.',
      'The Brickell building stock concentrates between Brickell Avenue south of the Miami River and the Mary Brickell Village / Brickell City Centre corridors. Targeting the SEO around the named buildings (Brickell Flatiron, SLS Brickell, Echo Brickell, 500 Brickell, Brickell Key Towers I/II/III, Icon Brickell, etc.) captures search volume that suburban-style HVAC SEO never touches.',
      '$797/mo for the SEO build. First call is a real audit: we pull your current ranks on the Brickell condo HVAC terms and show you which buildings\' search volume you are missing.',
    ],
    signals: [
      { label: 'Residents', val: '40,000+ in Brickell condos' },
      { label: 'System type', val: '95% central HVAC in high-rise buildings' },
      { label: 'Building approvals', val: 'Required by most condo associations' },
      { label: 'Replacement driver', val: 'Salt-air corrosion + 24/7 condenser duty' },
      { label: 'Service elevator', val: 'Coordination protocols are a real differentiator' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Do Brickell condo buildings have approved HVAC vendor lists?',
        a: 'Most do. Getting on the approved-vendor list typically requires certificate of insurance (with the association as additional insured), license verification, references from other condo work, and sometimes a fee or annual renewal. The SEO content should signal you operate on approved-vendor lists because Brickell buyers ask about it directly.',
      },
      {
        q: 'How does saltwater corrosion change HVAC service intervals in Brickell?',
        a: 'Coastal condo HVAC condensers run shorter equipment cycles than inland units. Anti-corrosion coatings on rooftop and mechanical-room units help. The SEO content that explains the corrosion factor and the recommended preventive maintenance schedule wins trust with Brickell buyers who have lived through one premature equipment failure already.',
      },
    ],
  },

  'hvac/seo/miami/aventura': {
    pageTitle: 'HVAC SEO Aventura | Luxury Condo + Mall-District Market',
    pageDesc: 'SEO for Aventura HVAC contractors. Luxury high-rises, Aventura Mall district, bilingual buyer base, premium service tier. $797/mo, no contracts.',
    h1: 'HVAC and AC Repair SEO in Aventura — Luxury Condo + Premium Service Market',
    lead: 'Aventura HVAC demand concentrates on the luxury high-rise corridor along Country Club Drive and the Aventura Mall district. The buyer profile skews premium-tier with bilingual (Spanish + Portuguese) search demand that most competitors ignore.',
    marketHeadline: 'Aventura HVAC: Luxury Tier + Bilingual Long-Tail',
    marketBody: [
      'Aventura is anchored by the Aventura Mall district and the surrounding luxury condo corridor (Williams Island, Turnberry Isle, Porto Vita, Hidden Bay). The HVAC buyer here is high-net-worth, time-poor, and willing to pay premium pricing for fast response and bilingual service. Average HVAC service ticket in Aventura runs <strong>30 to 50 percent above</strong> the SoFla regional median.',
      'Bilingual search demand is meaningful: Aventura has a high concentration of Russian-speaking, Spanish-speaking (especially Venezuelan, Colombian, Argentinian), and Portuguese-speaking (Brazilian) residents. Almost no competing HVAC site ranks for the Spanish or Portuguese variants ("reparación aires acondicionados aventura", "conserto ar condicionado aventura").',
      'Service-area coverage includes the Aventura Mall corridor, Williams Island, Country Club Drive, Hidden Bay, Hallandale Beach (adjacent), and Sunny Isles Beach (adjacent). The SEO build creates an Aventura flagship + 3 to 4 sub-corridor pages targeting the specific high-rise clusters.',
      '$797/mo for the SEO build. Bilingual add-on (Spanish + Portuguese) adds $200/mo + one-time $2,000-$3,500 build cost.',
    ],
    signals: [
      { label: 'Buyer profile', val: 'Luxury high-rise + mall-district' },
      { label: 'Ticket size', val: '30-50% above SoFla median' },
      { label: 'Bilingual demand', val: 'EN + ES + RU + PT measurable' },
      { label: 'Coverage', val: 'Williams Island, Turnberry, Hidden Bay, Sunny Isles-adjacent' },
      { label: 'Response window', val: 'Same-day expectation' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Is the Aventura HVAC market saturated with established contractors?',
        a: 'Less than you would think. The Aventura HVAC SERP has a few established operators plus a long tail of contractors who serve Aventura without naming it specifically in their content. The buyer who searches "ac repair aventura" specifically is responding to the geo-specific signal. Operators that name Aventura on dedicated pages capture the call.',
      },
      {
        q: 'Should I run Russian-language HVAC pages in Aventura?',
        a: 'For the Russian-speaking demographic concentrated in Sunny Isles and Aventura specifically, yes, if your team has a Russian speaker on the phone. The Cyrillic search variants have low competition. Without a Russian-speaking dispatcher, the page produces inquiries you cannot convert, which damages the local SEO signal.',
      },
    ],
  },

  'hvac/seo/miami/doral': {
    pageTitle: 'HVAC SEO Doral | Spanish-First Newer-Construction Market',
    pageDesc: 'SEO for Doral HVAC contractors. Spanish-first buyer base, newer single-family + townhome construction, year-round service-call demand. $797/mo.',
    h1: 'HVAC and AC Repair SEO in Doral — Spanish-First Newer-Construction Market',
    lead: 'Doral is one of the most Spanish-first HVAC markets in Miami-Dade. The newer-construction housing stock means equipment is younger but service-call volume is high because newer HVAC systems have more electronic components that fail under Miami humidity.',
    marketHeadline: 'Doral HVAC: Spanish-First Buyer + Newer-Equipment Service Mix',
    marketBody: [
      'Doral skews younger, more Spanish-first, and more newer-construction than most Miami sub-markets. The HVAC buyer base is heavily Venezuelan, Colombian, and Cuban professionals. Spanish-language search ("reparación aires acondicionados doral", "instalación aire acondicionado doral", "técnico aire acondicionado doral") has measurable volume that almost no English-only competitor captures.',
      'The newer housing stock means equipment is younger (typical Doral HVAC system age 5 to 12 years vs SoFla average of 9 to 16) but service calls are still frequent because newer systems have more electronic-control failures and refrigerant-line issues under Miami humidity. The SEO content should reflect this reality: emergency electronic-board failures, communicating-thermostat issues, refrigerant leaks on installed-too-fast contractor work.',
      'Service-area coverage includes the Doral Park and Doral Country Club corridors, the surrounding townhome and single-family developments, plus the commercial / warehouse stock around the NW 41st Street corridor (where commercial HVAC service is a meaningful add-on revenue line).',
      '$797/mo for the SEO build. Spanish-language landing pages are essentially mandatory here — the bilingual add-on at $200/mo + one-time $2,000-$3,500 build cost pays back inside <strong>2 to 3 months</strong> for any operator serving Doral at meaningful volume.',
    ],
    signals: [
      { label: 'Buyer profile', val: 'Spanish-first, younger, professional' },
      { label: 'Housing stock', val: 'Newer single-family + townhomes (5-12yr equipment)' },
      { label: 'Bilingual mandate', val: 'Spanish landing pages essentially required' },
      { label: 'Commercial add-on', val: 'NW 41st St warehouse corridor' },
      { label: 'Service mix', val: 'Electronic-board failures more common than mechanical' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Why is Spanish-language HVAC SEO so high-leverage in Doral?',
        a: 'Doral is one of the most Spanish-first communities in Miami-Dade by per-capita measure. The HVAC buyer often searches in Spanish first, especially for first-time service inquiries. Pages written in native Spanish (not Google-translated) convert at <strong>2 to 3 times</strong> the rate of translated English pages and rank for queries the English-only competitors are not even targeting.',
      },
      {
        q: 'Does newer Doral housing stock mean less HVAC service-call volume?',
        a: 'No, it means a different service-call mix. Newer systems have more electronic-control components (smart thermostats, variable-speed motors, communicating system boards) that fail in different ways than the mechanical-component-heavy older systems. Service-call frequency stays high. The skill set required to service them efficiently is different.',
      },
    ],
  },

  'hvac/seo/miami/kendall': {
    pageTitle: 'HVAC SEO Kendall | Suburban Family + Service-Volume Market',
    pageDesc: 'SEO for Kendall HVAC contractors. Suburban single-family stock, established family-home buyer base, year-round volume. $797/mo, no contracts.',
    h1: 'HVAC and AC Repair SEO in Kendall — Suburban Family + High-Volume Service Market',
    lead: 'Kendall is the suburban heart of Miami-Dade HVAC service. The housing stock is older single-family homes with established equipment service cycles, and the buyer profile is family-tier with consistent maintenance-program demand.',
    marketHeadline: 'Kendall HVAC: Volume Market with Steady Maintenance Pipeline',
    marketBody: [
      'Kendall covers a large geographic area (West Kendall, Kendall Lakes, Kendall West, Pinecrest-adjacent, Sunset, and parts unincorporated). The housing stock is predominantly single-family, predominantly older than the Doral or Aventura averages, and predominantly owner-occupied. The HVAC buyer profile is family-tier with established service relationships and a willingness to enroll in preventive maintenance programs.',
      'The volume opportunity here is the maintenance program. Kendall homeowners convert into preventive-maintenance enrollment at higher rates than condo-tier Miami buyers because the typical homeowner is the one paying the bill and watching the long-term equipment cost. The SEO content should emphasize maintenance-program value (extended equipment life, fewer emergency calls, prioritized scheduling).',
      'Service-area coverage extends across West Kendall, Kendall Lakes, Pinecrest-adjacent corridors, Sunset, and the Kendall Tamiami Executive Airport area. The Spanish-language SEO is meaningful but less intense than Doral or Hialeah — bilingual coverage is recommended but not essential for the first 6 months.',
      '$797/mo for the SEO build.',
    ],
    signals: [
      { label: 'Buyer profile', val: 'Family-tier homeowner, established service relationships' },
      { label: 'Housing stock', val: 'Older single-family, 10-25yr equipment cycles' },
      { label: 'Maintenance-program fit', val: 'Higher enrollment rates than condo markets' },
      { label: 'Geographic spread', val: 'West Kendall, Kendall Lakes, Kendall West, Sunset' },
      { label: 'Service mix', val: 'Repair + replacement + PM-program-heavy' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Should a Kendall HVAC business push preventive maintenance programs in their marketing?',
        a: 'Yes. PM-program enrollment is meaningfully higher among Kendall family-tier homeowners than condo-tier Miami buyers. The SEO content should explain PM-program value clearly: included filter changes, refrigerant top-offs, electrical diagnostics, prioritized emergency scheduling, and discount on parts. A well-marketed PM program produces 3 to 5 times the lifetime revenue of single repair calls.',
      },
    ],
  },

  // ── Roofing neighborhood overrides (research: 03-keywords-roofing/) ──────────

  'roofing/seo/miami/coral-gables': {
    pageTitle: 'Roofing SEO Coral Gables | Premium Tile + Mediterranean-Revival Market',
    pageDesc: 'SEO for Coral Gables roofing contractors. Premium tile and metal roof market, historic-district code compliance, Mediterranean-revival aesthetic. $797/mo.',
    h1: 'Roofing SEO in Coral Gables — The Premium Tile and Mediterranean-Revival Market',
    lead: 'Coral Gables roofing is a different game from suburban Miami. The Mediterranean-revival aesthetic, the historic-district code overlays, and the premium-tier buyer base mean roof replacements run $25K to $80K+ instead of the regional $5K to $25K standard.',
    marketHeadline: 'Coral Gables Roofing: Premium Tile + Historic-Code Specialty',
    marketBody: [
      'Coral Gables is known for the Mediterranean-revival architecture that George Merrick planned in the 1920s. The city enforces strict design-and-permit review for any roof work that touches an "MOSP" (Mediterranean-Style Overlay Protection) property, and the buyer base actively wants roofers who know how to navigate the Historic Preservation Board process. A roofer who does not understand the design-review constraints is disqualified at the first call.',
      'The roof types here skew expensive: clay tile, concrete tile, and standing-seam metal dominate the residential stock. Asphalt shingle is rare and often visually inappropriate in the protected districts. The SEO content should signal expertise in tile-specific repair (broken tile replacement, tile underlayment replacement without full tear-off, hip-and-ridge tile reseating) and in the historic-district permit process.',
      'Service-area coverage spans the historic districts (Coral Gables, the Granada section, Old Cutler corridor), the Country Club section, plus the more contemporary Riviera and Hammock Lake corridors. Average residential roof project here runs <strong>$25,000 to $80,000+</strong> for a full replacement, with repair tickets in the $1,500 to $8,000 range.',
      '$797/mo for the SEO build. Premium-tier markets like this often warrant paid-search add-ons during the May-November storm-prep and post-storm windows.',
    ],
    signals: [
      { label: 'Roof types', val: 'Clay tile, concrete tile, standing-seam metal' },
      { label: 'Replacement ticket', val: '$25K to $80K+ (above SoFla median)' },
      { label: 'Code overlay', val: 'Historic Preservation Board review for MOSP properties' },
      { label: 'Buyer expectation', val: 'Architect-coordinated, multi-bid process' },
      { label: 'Aesthetic', val: 'Mediterranean-revival, historically protected' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Do Coral Gables roofers need historic-district experience?',
        a: 'For any property in a protected MOSP district, yes. The Historic Preservation Board reviews roof material, color, and installation method on listed properties. A roofer who has navigated the process successfully is a real differentiator. Putting that experience prominently on the website wins the call before the homeowner ever picks up the phone.',
      },
      {
        q: 'Why is tile roofing so dominant in Coral Gables?',
        a: 'The Mediterranean-revival aesthetic that defines Coral Gables uses clay or concrete tile by design. The Merrick plan, the Granada section, and the historic protections all reinforce tile as the default roofing material. Tile roofs in Coral Gables typically last 35 to 50 years on the surface tile but require underlayment replacement every 20 to 25 years, which is a meaningful service segment.',
      },
    ],
  },

  'roofing/seo/miami/aventura': {
    pageTitle: 'Roofing SEO Aventura | High-Rise Roof + Townhome Replacement Market',
    pageDesc: 'SEO for Aventura roofing contractors. High-rise roof maintenance, townhome and single-family replacement, luxury-tier service. $797/mo, no contracts.',
    h1: 'Roofing SEO in Aventura — High-Rise Roof Service + Townhome Replacement Market',
    lead: 'Aventura roofing demand splits between two markets: the high-rise condo roof-maintenance contracts (large flat or low-slope roof systems with commercial-grade waterproofing) and the surrounding townhome and single-family roof replacement market.',
    marketHeadline: 'Aventura Roofing: Two Markets, One SEO Build',
    marketBody: [
      'The high-rise side of Aventura roofing is a B2B sales motion that runs on commercial-bid relationships with condo associations and property managers. The townhome and single-family side is a B2C residential-replacement motion. The SEO content should address both clearly, with separate landing pages for each buyer profile.',
      'High-rise roof systems in Aventura are predominantly modified bitumen, single-ply TPO, or PVC membrane on flat or low-slope decks. Repair and replacement work is large-ticket ($50K to $500K+) and bid-driven. The SEO content for this side should signal commercial certifications (NRCA, manufacturer-specific TPO/PVC training) and the ability to coordinate roof work without disrupting building operations.',
      'The residential side covers the townhome corridors east and west of Biscayne Boulevard plus the single-family stock in the surrounding neighborhoods. Average residential replacement ticket runs <strong>$15K to $35K</strong>. The buyer profile is luxury-tier with concierge-style service expectations.',
      '$797/mo for the SEO build.',
    ],
    signals: [
      { label: 'High-rise side', val: 'Modified bitumen, TPO, PVC — $50K to $500K+ tickets' },
      { label: 'Residential side', val: 'Townhomes + single-family — $15K to $35K replacement' },
      { label: 'Buyer split', val: 'Condo associations + luxury-tier homeowners' },
      { label: 'Service standard', val: 'Concierge-tier expectation' },
      { label: 'Commercial certs', val: 'NRCA + TPO/PVC manufacturer training matter' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Should I market separately to Aventura condo associations and Aventura homeowners?',
        a: 'Yes. The buying processes are completely different. Condo associations run formal RFPs with property managers, certificates of insurance, and architect involvement. Homeowners make decisions in days, not months, and rely heavily on reviews and contractor reputation. Separate landing pages for each buyer profile convert significantly better than a single generic "Aventura roofing" page.',
      },
    ],
  },

  'roofing/seo/miami/doral': {
    pageTitle: 'Roofing SEO Doral | Newer-Construction + Bilingual Market',
    pageDesc: 'SEO for Doral roofing contractors. Newer single-family + townhome stock, Spanish-first buyer base, year-round demand. $797/mo, no contracts.',
    h1: 'Roofing SEO in Doral — Newer-Construction Repair + Bilingual Market',
    lead: 'Doral has newer residential roofing stock than most Miami sub-markets (median home age 15 to 25 years) but the demand is still substantial because Miami sun and wind exposure accelerates wear on even newer asphalt systems. Spanish-language search demand is structural here.',
    marketHeadline: 'Doral Roofing: Newer Stock + Spanish-First Demand',
    marketBody: [
      'The Doral housing stock is newer than most Miami sub-markets. Many homes are 15 to 25 years old, which means original-installation asphalt-shingle roofs are entering the "first replacement" cycle around now. The replacement opportunity over the next 5 to 10 years is real and predictable.',
      'Spanish-language search demand is meaningful in Doral. "Reparación de techos doral", "instalación de techo doral", "techero doral" all have measurable volume. Almost no English-only competitor targets these queries. A bilingual SEO build captures the Spanish-first buyer base that converts at <strong>2 to 3 times</strong> the rate of translated English pages.',
      'Coverage extends across the Doral Park and Doral Country Club residential corridors, the townhome developments off Doral Boulevard, and the surrounding commercial / warehouse stock where commercial roofing service is a meaningful add-on revenue line.',
      '$797/mo for the SEO build. Bilingual add-on at $200/mo + $2,000-$3,500 one-time build is essentially mandatory here.',
    ],
    signals: [
      { label: 'Housing stock', val: 'Newer single-family + townhomes (15-25yr)' },
      { label: 'Replacement cycle', val: 'First-replacement wave starting now' },
      { label: 'Spanish-language demand', val: 'Structural, multiple high-volume queries' },
      { label: 'Commercial side', val: 'Warehouse stock around NW 41st St' },
      { label: 'Buyer profile', val: 'Spanish-first, professional, family-tier' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'When do Doral homes typically need their first roof replacement?',
        a: 'Most Doral homes were built between 1995 and 2010. Original-installation asphalt shingle roofs in Miami sun and wind typically need replacement at 15 to 20 years. That puts the first-replacement wave squarely in the current and next 5-year window. Tile roofs last longer but typically need underlayment replacement at 20 to 25 years.',
      },
    ],
  },

  'roofing/seo/miami/hialeah': {
    pageTitle: 'Roofing SEO Hialeah | Spanish-First Residential Replacement Market',
    pageDesc: 'SEO for Hialeah roofing contractors. Spanish-first dense residential market, established homes entering replacement cycle, year-round demand. $797/mo.',
    h1: 'Roofing SEO in Hialeah — Spanish-First Dense Residential Replacement Market',
    lead: 'Hialeah is one of the most Spanish-first cities in the United States. The residential roofing market here runs almost entirely on Spanish-language search and word-of-mouth referrals, which is exactly where most English-only competitors stop.',
    marketHeadline: 'Hialeah Roofing: Spanish-First Volume + Replacement Cycle Convergence',
    marketBody: [
      'Hialeah has roughly <strong>240,000 residents</strong> and one of the highest Spanish-as-first-language populations of any city in the country. Roofing search demand here is dominated by Spanish queries: "techero hialeah", "reparación de techos hialeah", "instalación techo hialeah", "techos hialeah", "constructor de techos hialeah". An English-only roofing site captures almost none of this volume.',
      'The Hialeah housing stock is predominantly single-family + small-multifamily, much of it built in the 1970s and 1980s. Many of these roofs have already had one replacement cycle and are entering a second. The work is straightforward residential replacement plus storm-driven repair.',
      'Coverage extends across central Hialeah, Hialeah Gardens (adjacent), Miami Lakes (adjacent), and West Hialeah. The pricing is more value-conscious than Coral Gables or Aventura but the volume is dramatically higher.',
      '$797/mo for the SEO build. The bilingual / Spanish-primary version is required, not optional, for this market. $200/mo + $2,000-$3,500 one-time build.',
    ],
    signals: [
      { label: 'Population', val: '~240,000 (densest Hispanic-majority city in US)' },
      { label: 'Language', val: 'Spanish-primary — bilingual SEO required' },
      { label: 'Housing stock', val: '1970s-1980s single-family + small multifamily' },
      { label: 'Replacement cycle', val: 'Second-replacement wave underway' },
      { label: 'Buyer profile', val: 'Value-conscious + word-of-mouth-driven' },
      { label: 'Program', val: '$797/mo + bilingual mandatory' },
    ],
    faqs: [
      {
        q: 'Can a roofer with English-only marketing succeed in Hialeah?',
        a: 'Structurally, no. The Hialeah residential roofing buyer searches in Spanish for the vast majority of first-time inquiries. An English-only site captures the small portion of the market that is comfortable searching in English. A Spanish-primary site (with English as a secondary version) captures the majority of the addressable demand.',
      },
    ],
  },

  // ── Restoration neighborhood overrides (research: 03-keywords-restoration/) ──────────

  'restoration/seo/miami/brickell': {
    pageTitle: 'Water Damage + Mold SEO Brickell | Condo High-Rise Emergency Market',
    pageDesc: 'SEO for Brickell restoration contractors. Condo high-rise water leak response, building-association coordination, 24/7 emergency dispatch. $797/mo.',
    h1: 'Water Damage and Mold Restoration SEO in Brickell — The High-Rise Emergency Response Market',
    lead: 'Brickell water-damage emergencies have a unique profile: a single condo leak can flow down 8 floors before maintenance reaches the unit. The restoration contractor who wins Brickell is one approved by building associations, fluent in high-rise water-egress patterns, and dispatched 24/7.',
    marketHeadline: 'Brickell Restoration: High-Rise Water Cascade + Association Approvals',
    marketBody: [
      'Brickell condo water-damage events have a multi-unit cascade pattern that suburban restoration contractors do not handle frequently. A 4 AM pipe burst on the 32nd floor of an Icon Brickell or 500 Brickell unit produces water damage on the 31st, 30th, 29th, and often through to the 25th. The restoration scope is across multiple units with multiple insurance carriers, multiple property owners, and the building association involved as a coordinator. The contractor who shows up needs to handle all of it.',
      'Building-association approved-vendor lists are critical here. Most Brickell associations maintain a short list (typically 3 to 6 vendors) for water-loss response, and the property manager dispatches from that list when an event happens. Getting on the approved list typically requires certificate of insurance, IICRC firm certification, and references from prior multi-unit work.',
      'The SEO content should signal these specifics: 24/7 dispatch, IICRC firm certification (WRT, ASD, AMRT), high-rise multi-unit experience, association-approved vendor status, and the ability to coordinate across multiple insurance carriers in a single event.',
      '$797/mo for the SEO build.',
    ],
    signals: [
      { label: 'Building stock', val: '95% high-rise condos' },
      { label: 'Cascade pattern', val: 'Single-unit leak can damage 4-8 units below' },
      { label: 'Association approvals', val: 'Required by most condo associations' },
      { label: 'Dispatch standard', val: '24/7 with under-90-minute response' },
      { label: 'Insurance coordination', val: 'Multi-carrier on single event is the norm' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'How do Brickell condo associations select restoration vendors?',
        a: 'Most associations maintain a short approved-vendor list (3 to 6 firms) for water-loss response. Selection criteria typically include certificate of insurance (with association as additional insured), IICRC firm certification, references from prior multi-unit work, 24/7 dispatch verification, and willingness to coordinate billing across multiple owner-insurance carriers in a single event. Getting on the list takes 2 to 4 months but produces sustained lead flow once you are in.',
      },
    ],
  },

  'restoration/seo/miami/coral-gables': {
    pageTitle: 'Water Damage + Mold SEO Coral Gables | Premium Tile-Roof + Pool-Equipment Market',
    pageDesc: 'SEO for Coral Gables restoration contractors. Premium tile-roof leak repair, pool-equipment water damage, high-ticket residential restoration. $797/mo.',
    h1: 'Water Damage and Mold Restoration SEO in Coral Gables — Premium Residential Market',
    lead: 'Coral Gables restoration events skew larger than the SoFla average because the homes are larger, the finishes are more expensive, and the insurance coverage limits are higher. Average residential water-damage restoration ticket here runs $8K to $25K+ vs the regional $2K to $15K.',
    marketHeadline: 'Coral Gables Restoration: Premium Tickets + Tile-Roof + Pool-Equipment Specialties',
    marketBody: [
      'Two specific Coral Gables emergency patterns drive a meaningful share of the residential restoration market. First: tile-roof leak events, especially after underlayment failure on older Mediterranean-revival tile roofs (typically 20 to 25 years after installation, which is a known cycle). The water intrusion patterns under tile roofs are unique and the restoration scope reaches into ceiling and wall cavities that suburban-style restoration contractors do not always handle correctly.',
      'Second: pool-equipment failures. Coral Gables has a high density of in-ground pools with associated mechanical equipment. Pool-line bursts and pump-room flooding events are common, and the restoration scope often includes electrical equipment, mechanical rooms, and adjacent finished spaces. A contractor familiar with pool-equipment-driven water-loss patterns wins these calls.',
      'Service area covers the historic Coral Gables districts, the Country Club section, the Riviera and Hammock Lake corridors, and the Old Cutler corridor. Average ticket runs <strong>$8K to $25K+</strong>, with mold remediation events on tile-roof leaks frequently hitting the high end of that range.',
      '$797/mo for the SEO build.',
    ],
    signals: [
      { label: 'Average ticket', val: '$8K to $25K+ (above SoFla median)' },
      { label: 'Tile-roof leak specialty', val: 'Underlayment failure on 20-25yr Mediterranean-revival roofs' },
      { label: 'Pool-equipment specialty', val: 'High density of in-ground pools = pool-line + pump-room events' },
      { label: 'Buyer profile', val: 'Premium-tier homeowner, architect-involved insurance work' },
      { label: 'Coverage', val: 'Historic Coral Gables + Country Club + Riviera + Old Cutler' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Why are tile-roof water-damage events different in Coral Gables?',
        a: 'Mediterranean-revival tile roofs use a specific underlayment that degrades on a 20-to-25-year cycle. When the underlayment fails, water enters under the tile and migrates laterally before showing up at a ceiling spot — often far from the actual point of intrusion. The restoration scope requires moisture mapping under the tile, ceiling-cavity drying with specific equipment placement, and frequently mold remediation in cavities the homeowner cannot see. A contractor unfamiliar with this pattern under-scopes the job.',
      },
    ],
  },

  'restoration/seo/miami/aventura': {
    pageTitle: 'Water Damage + Mold SEO Aventura | Luxury High-Rise + Townhome Emergency Market',
    pageDesc: 'SEO for Aventura restoration contractors. Luxury condo + townhome water emergencies, multilingual dispatch, association vendor approvals. $797/mo.',
    h1: 'Water Damage and Mold Restoration SEO in Aventura — Luxury High-Rise + Townhome Emergency Market',
    lead: 'Aventura restoration splits across the luxury high-rise condo corridor (Williams Island, Turnberry, Hidden Bay, Porto Vita) and the surrounding townhome stock. Multilingual dispatch (English + Spanish + Russian + Portuguese) is a real differentiator.',
    marketHeadline: 'Aventura Restoration: Luxury Tier + Multilingual Emergency Response',
    marketBody: [
      'Aventura is anchored by the luxury high-rise corridor along Country Club Drive plus the Aventura Mall district. The restoration buyer here is high-net-worth, time-poor, and expects immediate response with bilingual or trilingual dispatch coverage. A 3 AM water leak at Turnberry needs to be handled by a contractor who can communicate in the residentâ€™s native language and coordinate with a building staff that may also be multilingual.',
      'Building-association approved-vendor lists matter as much in Aventura as in Brickell, but the buyer profile is even more service-quality-sensitive. Premium response (under-60-minute on-site, IICRC-certified crew lead, white-glove furniture protection during dry-out) is the expectation. The pricing reflects it.',
      'Coverage extends across Williams Island, Turnberry Isle, Porto Vita, Hidden Bay, the Aventura Mall corridor, and the adjacent Sunny Isles Beach. Average ticket runs <strong>$5K to $20K+</strong>.',
      '$797/mo for the SEO build. Multilingual landing pages are a strong fit here.',
    ],
    signals: [
      { label: 'Building stock', val: 'Luxury high-rise condos + premium townhomes' },
      { label: 'Languages spoken', val: 'EN + ES + RU + PT all material' },
      { label: 'Response standard', val: 'Under 60 minutes on-site' },
      { label: 'Service tier', val: 'Premium / white-glove' },
      { label: 'Coverage', val: 'Williams Island + Turnberry + Porto Vita + Hidden Bay + Sunny Isles' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Is multilingual dispatch really a competitive differentiator in Aventura?',
        a: 'Yes. The Aventura buyer base is heavily Spanish-speaking (Venezuelan, Colombian, Argentinian), Russian-speaking, and Portuguese-speaking (Brazilian). A restoration emergency at 2 AM is not the moment to ask the resident to switch to their second or third language. Contractors with native-speaking dispatchers in the relevant languages win those calls.',
      },
    ],
  },

  'restoration/seo/miami/doral': {
    pageTitle: 'Water Damage + Mold SEO Doral | Spanish-First + Commercial Warehouse Market',
    pageDesc: 'SEO for Doral restoration contractors. Spanish-first residential, plus commercial warehouse water-loss events. $797/mo, no contracts.',
    h1: 'Water Damage and Mold Restoration SEO in Doral — Spanish-First Residential + Commercial Warehouse Market',
    lead: 'Doral restoration demand splits across the Spanish-first residential corridors and the commercial warehouse stock along the NW 41st Street corridor. Both buyer profiles search differently and have different SEO opportunities.',
    marketHeadline: 'Doral Restoration: Two Markets, One SEO Build',
    marketBody: [
      'The Doral residential restoration market is Spanish-first. "Reparación de daños por agua doral", "removal de moho doral", "limpieza de inundación doral" all have measurable search volume that almost no English-only competitor captures. Bilingual SEO is essentially required.',
      'The commercial warehouse side is meaningfully different. Doralâ€™s industrial corridor around NW 41st Street, NW 79th Avenue, and the airport-adjacent zones produces commercial water-loss events (sprinkler failures, roof leaks on warehouse buildings, HVAC condensation events) that often involve product damage, inventory loss, and business-interruption claims. The restoration scope is structurally different from residential and the buyer is the facility manager or property owner, not the homeowner.',
      '$797/mo for the SEO build. Bilingual coverage is essentially mandatory here. The commercial warehouse side benefits from a separate landing-page set targeting the business-property buyer.',
    ],
    signals: [
      { label: 'Residential', val: 'Spanish-first single-family + townhomes' },
      { label: 'Commercial', val: 'Warehouse + industrial along NW 41st St' },
      { label: 'Language', val: 'Spanish-primary residential, English-primary commercial' },
      { label: 'Commercial events', val: 'Sprinkler failures, warehouse roof leaks, HVAC condensation' },
      { label: 'Business-interruption claims', val: 'Common on commercial side' },
      { label: 'Program', val: '$797/mo, no contracts' },
    ],
    faqs: [
      {
        q: 'Should restoration SEO target both residential and commercial in Doral?',
        a: 'Yes, but with separate landing pages. The residential buyer searches differently from the commercial facility manager. Mixing both audiences on one page underperforms vs separating them. The Doral commercial warehouse corridor is one of the most concentrated commercial-restoration opportunities in Miami-Dade and is genuinely underserved by current operators.',
      },
    ],
  },
};

export function getNeighborhoodOverride(
  vSlug: string, sSlug: string, citySlug: string, nSlug: string
): NeighborhoodOverride | undefined {
  const override = neighborhoodOverrides[`${vSlug}/${sSlug}/${citySlug}/${nSlug}`];
  if (!override) return undefined;
  // liveAfter gate: skip the override (use generic template) until the scheduled date.
  // Evaluated at build time — schedule daily redeploys via launchd to flip pages live.
  // DEV bypass: in Astro dev mode, show the override regardless of date so authors can
  // preview content before its scheduled go-live. Production builds honor the gate.
  if (override.liveAfter && !import.meta.env.DEV) {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
    if (today < override.liveAfter) return undefined;
  }
  return override;
}
