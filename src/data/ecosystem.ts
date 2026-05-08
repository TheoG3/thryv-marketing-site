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

export interface Neighborhood {
  slug: string;
  name: string;
  desc: string;
  citySlug: string;
  cityName: string;
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
    price: '$497/mo',
    defaultIncludes: [
      'Keyword research and targeting',
      'On-page optimization (titles, meta, headers, schema)',
      'Local citation building (50+ directories)',
      'Google Maps optimization',
      'Monthly rankings report',
      'Monthly strategy call',
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
    price: '$197/mo',
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
  },
  {
    slug: 'wynwood',
    name: 'Wynwood',
    desc: "Miami's arts and culture district, home to boutique businesses, galleries, and a mix of creative professionals and tourists. High foot traffic and strong social media presence.",
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'coral-gables',
    name: 'Coral Gables',
    desc: 'The "City Beautiful" — an affluent, tree-lined community with high household incomes and a preference for established, trusted local businesses.',
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'hialeah',
    name: 'Hialeah',
    desc: "Miami's second-largest city and the heart of Cuban-American culture in South Florida. A dense market of working families, small businesses, and Spanish-speaking consumers.",
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'doral',
    name: 'Doral',
    desc: "One of Miami-Dade's fastest-growing business hubs with a large Venezuelan and Latin American population, significant corporate presence, and strong B2B opportunities.",
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'kendall',
    name: 'Kendall',
    desc: 'A sprawling suburban market in southwest Miami-Dade with large residential footprint, family households, and strong demand for home services and professional services.',
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'miami-beach',
    name: 'Miami Beach',
    desc: 'A world-famous destination with year-round tourism, luxury hospitality, and a premium consumer base. High competition, but high willingness to pay for quality.',
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'aventura',
    name: 'Aventura',
    desc: "An affluent city on Miami-Dade's northern edge known for luxury condos and a high concentration of wealth. A strong market for premium services.",
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'coconut-grove',
    name: 'Coconut Grove',
    desc: "Miami's oldest neighborhood — waterfront, tree-canopied, and wealthy. A boutique market of established families and an appreciation for quality over price.",
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'north-miami',
    name: 'North Miami',
    desc: 'A diverse, growing city with a mix of Haitian-American, Caribbean, and Latin communities. Strong demand for bilingual services and a growing small business ecosystem.',
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'little-havana',
    name: 'Little Havana',
    desc: "The cultural heart of Miami's Cuban community along Calle Ocho. A dense, Spanish-speaking market with deep community ties and strong word-of-mouth networks.",
    citySlug: 'miami',
    cityName: 'Miami',
  },
  {
    slug: 'homestead',
    name: 'Homestead',
    desc: "A fast-growing agricultural and residential city at Miami-Dade's southern edge. Home to a large Hispanic workforce and a rapidly expanding housing market.",
    citySlug: 'miami',
    cityName: 'Miami',
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
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management', 'website-design'],
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
        a: 'Reviews and Google Business Profile optimization are the highest-leverage moves. A cleaning company with 80 verified reviews, professional photos, and an active GBP will win over a competitor with a better website but no social proof.',
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
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management'],
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
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management'],
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
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management'],
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
    pillarHeadline: 'Marketing for Miami Med Spas That Turns Browsers Into Booked Appointments',
    pillarLead: "Miami's med spa market is growing fast and getting more competitive. We build the multi-channel marketing system that keeps your treatment rooms booked with clients who are ready to spend.",
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
        headline: 'SEO for Miami Med Spas',
        lead: 'Rank for the treatments your best clients search: botox in Miami, filler in Brickell, laser hair removal in Wynwood, microneedling in Coral Gables.',
        problem: 'Treatment-specific searches have high intent and high value. A client searching "botox Miami Beach" is ready to book. Ranking for these terms requires procedure-specific pages and local content that generic med spa websites do not have.',
        includes: [
          'Treatment-specific keyword targeting (botox, filler, laser, etc.)',
          'Neighborhood pages for Miami areas you serve',
          'On-page optimization for each treatment page',
          'Medical spa directory citations',
          'Monthly organic traffic and ranking report',
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
    services: ['google-business-profile', 'seo', 'google-ads', 'website-design'],
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
        a: 'The highest-ROI approach for individual agents is neighborhood SEO and a strong Google Business Profile. Rank for "[your farm area] real estate agent" and you capture buyers and sellers who are actively looking — without competing on Zillow with 50 other agents.',
      },
      {
        q: 'Do social media ads work for real estate agents?',
        a: 'Yes — especially for listing promotion and building local name recognition in your farm area. Instagram and Facebook ads for new listings, market updates, and neighborhood content position you as the local expert.',
      },
      {
        q: 'Should real estate agents invest in a personal website?',
        a: "Yes. Your brokerage website does not rank for your name or your farm area — you need your own property. A personal site with neighborhood guides, market data, and your transaction history builds the SEO authority that generates direct leads over time.",
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
          'Farm area neighborhood keyword targeting',
          'Blog content strategy for local market authority',
          'Citation building in real estate directories',
          'Monthly search ranking and lead source report',
        ],
      },
      'google-ads': {
        headline: 'Google Ads for Miami Real Estate Agents',
        lead: 'Capture buyers and sellers searching for an agent in your farm area — before another agent wins the click.',
        problem: 'Google Ads for real estate agents are competitive but targeted correctly, they deliver direct buyer and seller inquiries without platform fees. We build campaigns around your farm area, buyer type, and property specialties.',
        includes: [
          'Farm area keyword campaigns',
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
        lead: 'Promote your listings, build neighborhood authority, and stay top of mind with buyers and sellers in your farm area.',
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
        a: 'Google Business Profile and SEO are the two highest-leverage channels. Immigration searches are specific and urgent — "deportation lawyer Miami," "DACA lawyer Hialeah," "green card lawyer Little Havana." Showing up at the top of these searches, in Spanish, with strong reviews, converts at very high rates.',
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
    services: ['google-business-profile', 'seo', 'google-ads', 'reputation-management'],
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
    services: ['google-business-profile', 'seo', 'reputation-management', 'social-media-ads'],
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
