// profession-vocabulary.ts
// Industry-insider vocabulary, operational tech stack, and marketing tech
// per vertical. Injected into vertical pillar + city pages so each page
// reads like a researched insider wrote it, not a templated agency.
//
// Authoring rules:
// - Slang must be real industry jargon (verifiable in trade publications,
//   industry forums, or operator-facing software docs). No invented terms.
// - Each slang entry needs a one-line "what it means" gloss so the page
//   teaches the reader something even if they already work in the industry.
// - Ops-tech list = software the business runs operations on (PMS,
//   scheduling, payments, inventory). Not marketing tools.
// - Mkt-tech list = software AND practices specific to marketing this
//   profession (review platforms, vertical-specific directories, ad
//   formats, schema types, content patterns competitors miss).
// - Tone: small-operator first-person, no jargon outside the slang section,
//   no em-dashes, percent signs over the word, no named competitors of Thryv.

export interface SlangTerm {
  term: string;
  meaning: string;
}

export interface ProfessionVocabulary {
  /** Tagline intro to the vocabulary section. Sets tone. */
  intro: string;
  /** Industry-insider slang + jargon, with plain-English meanings. */
  slang: SlangTerm[];
  /** Operational software the profession runs the business on. */
  opsTech: string[];
  /** Marketing tech and practices specific to this profession. */
  marketingTech: string[];
  /** One-line proof-of-research signature (what we know that generic agencies don't). */
  insiderEdge: string;
}

export const professionVocabulary: Record<string, ProfessionVocabulary> = {

  'hvac': {
    intro: "HVAC marketing fails when it's written by people who have never sat in the dispatch office on a 95-degree August afternoon or run the call-by-call ROI on an emergency truck. Here's what we actually know about how a Miami AC and HVAC contractor runs, so your marketing is built on service-call volume and truck utilization, not generic lead-flow theory.",
    slang: [
      { term: 'Service-call ratio',  meaning: 'The percentage of incoming calls that convert to a paid service. Lead-gen marketing that drives a 70 percent service-call ratio beats one that drives twice the lead volume at 35 percent.' },
      { term: 'Run hours',           meaning: 'The compressor run hours that drive every PM (preventive maintenance) schedule. Marketing tied to PM-program signups compounds because PMs convert to repairs at 3 to 5 times standard call rate.' },
      { term: 'Sized at the manual J', meaning: 'A Manual J load calculation sizes a system to a home. Contractors who do real Manual J calcs vs eyeballing the BTU are a marketing differentiator on the high-end install side.' },
      { term: 'SEER vs SEER2',       meaning: 'The two efficiency-rating regimes for HVAC equipment. SEER2 is the current DOE standard. Customers searching by SEER ratings are educated buyers worth premium copy.' },
      { term: 'Ductless mini-split', meaning: 'Single-zone or multi-zone heat pump without ductwork. The fastest-growing HVAC search category in Miami because of older homes without duct chases.' },
      { term: 'Refrigerant transition (R-410A to R-454B)', meaning: 'The 2025 EPA-mandated refrigerant change. Customers Google "do I need to replace my AC for new refrigerant" and the contractors who answer honestly win the trust.' },
      { term: 'Comfort advisor',     meaning: 'The in-home sales role that closes install proposals. Marketing that pre-qualifies the lead for a comfort advisor visit (square footage, system age, current bill) closes at twice the rate of cold visits.' },
      { term: 'Hurricane prep tune-up', meaning: 'The May to June pre-season service push that protects systems from the storm-and-power-outage cycle. The single highest-ROI seasonal marketing event in Miami HVAC.' },
    ],
    opsTech: [
      'ServiceTitan, Housecall Pro, or ServiceFusion for dispatch, invoicing, and PM-program management',
      'measureQuick or AccuTools BluVac for digital refrigeration diagnostics with customer-facing reports',
      'CompanyCam for date-and-GPS-stamped jobsite photos that double as before / after marketing content',
      'GoodLeap, Sunbit, or Enhancify for in-home financing on bigger install proposals',
      'BillyGoat or Field Promax for the smaller residential-only contractor tier',
    ],
    marketingTech: [
      'Google Local Services Ads with verified Pro and Background-Checked badges (the trust signal that lets you skip the slow review-build phase)',
      'Schema.org HVACBusiness + Service markup with openingHours specifying 24/7 emergency availability',
      'ServiceTitan or Housecall Pro review-request automation tied to invoice closure (post-paid is the highest conversion moment)',
      'Angi Services Pro listing (still meaningful for high-ticket installs even as the platform has shifted models)',
      'NATE-certified contractor directory placement (the trade-specific equivalent of a citation)',
      'Hurricane-season ad-budget phasing (May to October spend cap 1.5 to 2x the off-season)',
      'Service x neighborhood landing pages (one URL per service per Miami area you serve)',
    ],
    insiderEdge: 'We build HVAC marketing tuned to your truck-utilization and service-call-ratio math, not just monthly lead volume. The right 40 service calls a month from your existing route beats 80 scattered calls that send your trucks chasing.',
  },

  'roofing': {
    intro: "Roofing marketing fails when it's written by people who have never priced a tear-off vs an overlay or sat through an insurance adjuster's inspection. Here's what we actually know about how a Miami roofing contractor runs, so your marketing reflects the realities of the storm-driven and replacement-driven sides of the business, the licensing requirements, and the $5K to $25K-per-job economics.",
    slang: [
      { term: 'Tear-off vs overlay', meaning: 'Tear-off removes the old roof down to the deck before installing the new one. Overlay installs over the existing shingle layer. Florida code increasingly restricts overlay, so the marketing copy should educate the customer on why a tear-off is the long-term answer.' },
      { term: 'Squares',             meaning: 'The roofing unit of measurement: one square equals 100 square feet. Material orders, labor estimates, and job quotes all run in squares.' },
      { term: 'Ice and water shield', meaning: 'The self-adhering underlayment installed at eaves, valleys, and penetrations. Miami code requires it more aggressively than most markets. A contractor who explains why it matters wins trust.' },
      { term: 'Drip edge',           meaning: 'The metal flashing along the roof edge. Skipping or improperly installing drip edge is one of the most common code-failure points and a common reason a homeowner asks for a roof inspection.' },
      { term: 'Re-nail inspection',  meaning: 'The Florida mitigation inspection that verifies fasteners meet hurricane code. A common upsell tied to insurance-premium reduction and a real lead source.' },
      { term: 'Manufacturer credentials (GAF Master Elite, Owens Corning Platinum, CertainTeed Master Shingle Applicator)', meaning: 'The vendor certifications that unlock extended warranties (25 to 50 years). Customers searching for "best roofer miami" filter by these credentials.' },
      { term: 'Public adjuster',     meaning: 'A licensed insurance representative who works for the homeowner. A common collaboration partner for roofers handling storm-damage claims, and a meaningful referral source.' },
      { term: 'Roof age vs roof condition', meaning: 'Insurance carriers in Florida increasingly underwrite based on roof age, not just condition. The 14-year-old roof is a real lead source: the carrier non-renewed and the homeowner has 30 days to act.' },
    ],
    opsTech: [
      'AccuLynx, JobNimbus, or Roofr for end-to-end roofing project management',
      'EagleView, GAF Roof It Right, or Pictometry for aerial measurements (replaces ladder time on the bid)',
      'CompanyCam for photo documentation that doubles as warranty + insurance + marketing content',
      'HOVER or RoofSnap for 3D modeling and material take-offs from a smartphone',
      'GoodLeap, Service Finance, or Enhancify for in-home financing on full replacements',
    ],
    marketingTech: [
      'Google Local Services Ads with verified Pro + Background-Checked + License-Verified badges',
      'GAF certified-contractor directory + Owens Corning Platinum directory listings (high-trust citation equivalents)',
      'Schema.org RoofingContractor + Service markup with priceRange, warranty info, and license numbers',
      'Hurricane / storm news cycle content (post-storm inspection guides, insurance-claim walkthroughs)',
      'Service x roof-type x neighborhood landing pages (metal roof Coral Gables, tile roof Pinecrest)',
      'Nextdoor neighborhood posts after every completed job (especially during insurance non-renewal cycles)',
      'CompanyCam Showcase auto-publishing for completed jobs (GPS-tagged organic SEO compounding)',
    ],
    insiderEdge: 'We build roofing marketing around the two-economy reality (year-round replacement + storm-driven surge) and the licensing-trust math. The contractor who makes their CILB number, GAF credential, and insurance-claim experience obvious in 3 seconds wins the $15K decision.',
  },

  'restoration': {
    intro: "Restoration marketing fails when it treats water damage, mold, fire, and biohazard as the same product. They are not. The intent is different, the IICRC certifications are different, and the insurance-claim mechanics are different. Here's what we actually know about how a Miami water-damage and mold-restoration company runs, so your marketing matches the panic-moment intent and the insurance-billable economics.",
    slang: [
      { term: 'IICRC WRT vs ASD vs AMRT', meaning: 'The IICRC certifications for Water Restoration Technician, Applied Structural Drying, and Applied Microbial Remediation Technician. Adjusters and educated homeowners filter by these credentials. Put them on every page.' },
      { term: 'Categories 1 / 2 / 3',     meaning: 'IICRC water-loss categories. Cat 1 is clean water, Cat 2 is gray water, Cat 3 is black water (sewage). Different scope, different price, different equipment. Marketing copy should educate on the difference because customers Google "is my water damage cat 2 or cat 3."' },
      { term: 'Class 1 / 2 / 3 / 4',      meaning: 'IICRC drying classes by surface area and saturation level. Pricing scales with class. Knowing the class lets you build trust in the initial call.' },
      { term: 'Mitigation vs reconstruction', meaning: 'Mitigation = stop the loss and dry it out (covered as emergency by most policies). Reconstruction = put it back together. Often separate invoices, sometimes separate vendors. Marketing should explain both sides.' },
      { term: 'Direct billing',          meaning: 'Billing the insurance carrier directly rather than collecting from the homeowner. A massive sales differentiator. Customers Google "water damage company that bills insurance directly" because they do not have $8K cash.' },
      { term: 'Xactimate',               meaning: 'The estimating software insurance adjusters and restoration contractors use. Being "Xactimate-trained" or "Xactimate-certified" signals you can communicate with the adjuster fluently. Adjusters route work to contractors they can work with.' },
      { term: 'Preferred Vendor Program', meaning: 'Insurance carrier networks (Allstate, State Farm, Citizens) that route claims to vetted contractors. Getting on a PVP is multi-month process, but it is a sustained lead-flow engine.' },
      { term: 'Containment + negative-air machine', meaning: 'The mold-remediation setup. Customers ask about it because they read about it on home-insurance forums. A site that explains containment + negative-air separates a real remediation contractor from a "spray and pray" cleaner.' },
    ],
    opsTech: [
      'DASH or Restoration Manager for restoration-specific job management, Xactimate integration, and insurance-claim tracking',
      'PSA Sapphire or Encircle for thermal-image documentation that adjusters accept as proof of loss',
      'CompanyCam for date-and-GPS-stamped jobsite photos (essential for insurance-claim documentation)',
      'Xactimate or Symbility for adjuster-compatible estimating',
      'iAuditor or Field Service Lightning for moisture mapping and drying logs',
    ],
    marketingTech: [
      'Google Local Services Ads with verified Pro + Background-Checked + 24/7 availability (the emergency-intent trust stack)',
      'IICRC certified-firm directory listing (one of the highest-trust citations in restoration)',
      'RIA (Restoration Industry Association) member directory placement',
      'Schema.org LocalBusiness with serviceType "water damage restoration" and openingHoursSpecification "Mo-Su 00:00-23:59"',
      'Service x emergency-type x neighborhood landing pages (water damage Brickell, mold removal Aventura, fire damage Coral Gables)',
      'Insurance-carrier badge displays (Citizens, State Farm, Allstate, Tower Hill) prominent on every service page',
      'Hurricane / weather news cycle content seeded 14 days before forecasted events for organic news search traffic',
    ],
    insiderEdge: 'We build restoration marketing around the 24/7 emergency-response trust stack and the insurance-billable economics, not generic home-service patterns. The contractor who makes "we handle the insurance claim" and "IICRC certified" obvious in 3 seconds wins the panic-moment call.',
  },

  'plumber': {
    intro: "Plumbing marketing fails when it's written by people who have never been on a 3 AM emergency call or priced a repipe job. Here's what we actually know about how a Miami plumbing business runs, so your marketing is built around the truck-utilization math, the emergency-vs-scheduled call mix, and the Florida-specific code realities that drive real revenue.",
    slang: [
      { term: 'Call-per-truck-per-day',  meaning: 'The dispatch metric that matters. A truck running 4 to 6 calls per day is at healthy utilization. A truck running 1 to 2 is leaking money. Marketing should optimize for fill rate on your existing trucks before adding more.' },
      { term: 'Emergency vs scheduled',  meaning: 'Emergency calls (burst pipe, no water, sewer backup) command premium pricing and same-day response. Scheduled calls (water heater install, repipe, fixture replacement) plan around customer convenience. Different campaigns, different conversion rates, different ticket sizes.' },
      { term: 'Repipe',                  meaning: 'Whole-home or partial replacement of supply lines (commonly polybutylene-to-PEX or galvanized-to-copper). $4K to $15K+ ticket. The kind of job that justifies a high-CPC paid campaign on the homeowner-research keywords.' },
      { term: 'PEX vs copper',           meaning: 'PEX (cross-linked polyethylene) is faster and cheaper to install. Copper is the longer-term Florida standard. Customers Google "PEX vs copper repipe Miami" before deciding. Content that explains the trade-offs wins the educated buyer.' },
      { term: 'Backflow prevention',     meaning: 'Florida code requires certified backflow prevention on most commercial and irrigation systems. The annual test is a real recurring-revenue line that most residential plumbers underprice in their marketing.' },
      { term: 'Medical gas',             meaning: 'Specialty plumbing for healthcare facilities (oxygen, nitrogen, vacuum lines). Requires NFPA 99 certification. Niche market with high ticket sizes and very low competition in the search results.' },
      { term: 'Slab leak',               meaning: 'Water leak under the concrete slab foundation. High-anxiety customer call ($1,500-$8,000 ticket). Content explaining detection methods (acoustic, thermal imaging) wins the educated panicky homeowner.' },
      { term: 'CFC license',             meaning: 'Certified Florida Contractor license required for any plumbing work. Customers ask about it. Put the CFC number prominently on every page. Real trust signal, real conversion lever.' },
    ],
    opsTech: [
      'ServiceTitan, Housecall Pro, or ServiceFusion for dispatch, invoicing, and recurring-service management',
      'CompanyCam for date-and-GPS-stamped jobsite photos (essential for warranty + insurance documentation)',
      'GoodLeap, Service Finance, or Enhancify for in-home financing on bigger jobs (repipes, water heaters, fixture replacements)',
      'PlumberPRO, Trade Service Cloud, or FieldEdge for the larger multi-truck operations',
      'FlowVision or Smart Service for accounting + recurring-service-program tracking',
    ],
    marketingTech: [
      'Google Local Services Ads with verified Pro and Background-Checked badges (the trust signal that lets you skip the slow review-build phase)',
      'Schema.org Plumber + Service markup with openingHours specifying 24/7 emergency availability',
      'ServiceTitan / Housecall Pro review-request automation tied to invoice closure',
      'Angi Services Pro listing (still meaningful for high-ticket installs like repipes and water heater replacements)',
      'Florida CFC license prominent in ad copy and on landing pages (real trust signal that converts)',
      'Hurricane / freeze content seeded 14 days before forecasted events for organic news search traffic',
      'Service x neighborhood landing pages (drain cleaning Brickell, water heater Coral Gables, etc.)',
    ],
    insiderEdge: 'We build plumbing marketing tuned to your truck-utilization and emergency-vs-scheduled call mix, not raw lead volume. The right 5 calls per day on your existing trucks beats 10 scattered calls that send your dispatchers chasing.',
  },

  'electrician': {
    intro: "Electrical-contractor marketing fails when it's written by people who have never pulled a permit through a Miami-Dade municipality or sized a panel upgrade. Here's what we actually know about how a Miami electrician runs, so your marketing reflects the licensing reality, the emergency-vs-installation mix, and the fastest-growing high-ticket service lines (EV chargers, generators) that most competitors are not even attempting to rank for.",
    slang: [
      { term: 'EC license',           meaning: 'Florida Certified Electrical Contractor license, state-issued. Customers and especially commercial accounts ask about it. Put the EC number prominently on every page.' },
      { term: 'Panel upgrade',        meaning: 'Replacing the electrical service panel, typically from 100A to 200A or higher. $1,800 to $4,500 ticket. A common upsell that pairs with EV charger installation, generator hookup, or whole-house solar.' },
      { term: 'Level 2 EV charger',   meaning: '240V EV charging station for residential or commercial. Installation is $800 to $3,500 depending on panel capacity and run distance. Fastest-growing residential electrical service in Florida 2024-2026.' },
      { term: 'Whole-house generator', meaning: 'Standby generator (Generac, Kohler, Briggs) with automatic transfer switch. $5,000 to $25,000+ installed. The highest-ticket residential electrical job in the typical service mix.' },
      { term: 'Aluminum branch wiring', meaning: 'Older homes built 1965-1972 often have aluminum branch-circuit wiring (vs copper) that carries a known fire risk. Insurance carriers increasingly require remediation. A meaningful service-line in older Miami neighborhoods.' },
      { term: 'GFCI / AFCI',          meaning: 'Ground Fault Circuit Interrupter and Arc Fault Circuit Interrupter. Code-required in most areas of a modern home. Compliance retrofits are a real recurring service line, especially during home-sale inspections.' },
      { term: 'Service entrance',     meaning: 'The point where utility power enters the home. Service-entrance upgrades are required for panel upgrades, generator installations, and increased load like EV chargers. A real upsell tied to almost every higher-ticket job.' },
      { term: 'Code-compliance retrofit', meaning: 'Bringing older homes up to current National Electrical Code (NEC) standards, especially during home-sale inspections. A high-volume service line in older Miami neighborhoods where 1960s-1980s wiring still dominates.' },
    ],
    opsTech: [
      'ServiceTitan, FieldEdge, or eMaint for dispatch, project management, and recurring-service tracking',
      'CompanyCam for jobsite photo documentation (essential for insurance + warranty + before/after marketing content)',
      'GoodLeap, Sunbit, or Enhancify for in-home financing on high-ticket installations (generators, panel upgrades, EV chargers)',
      'iSqFt or BuildingConnected for commercial bidding workflows',
      'QuickBooks Contractor edition or Foundation for job-costing and WIP reports',
    ],
    marketingTech: [
      'Google Local Services Ads with verified Pro + Background-Checked + EC-License-Verified badges',
      'Schema.org Electrician + Service markup with priceRange on each high-ticket service page',
      'Generac, Kohler, and Briggs certified-dealer directory listings (high-trust citations for generator buyers)',
      'EV charger installer directories (ChargePoint, Tesla, Wallbox certified-installer pages)',
      'Florida EC license prominent in ad copy and on landing pages',
      'EV charger sizing calculator + generator sizing calculator (pre-qualifies the high-ticket lead)',
      'Hurricane-season generator content (May-October) tied to NHC advisories for organic news traffic',
    ],
    insiderEdge: 'We build electrician marketing around the high-ticket installation pipeline (EV chargers, generators, panel upgrades) AND the emergency-service Map Pack. Most electricians win one or the other. The compound play is the one that scales the business.',
  },

  'pressure-washing': {
    intro: "Pressure-washing marketing fails when it treats every job as a one-time transaction. The healthy operator runs on recurring annual residential schedules plus quarterly commercial contracts, and the marketing math compounds across both. Here's what we actually know about how a Miami pressure washing business runs, so your marketing builds the lifetime-customer-value pipeline, not just the single-job inquiry.",
    slang: [
      { term: 'Soft wash vs pressure wash', meaning: 'Soft wash uses low pressure plus biocide solution for surfaces (roofs, painted exteriors, fabric awnings) that high pressure would damage. Pressure wash uses high-PSI water for hard surfaces (concrete, paver, fence). Pricing and skill set are different. Customers search by both terms.' },
      { term: 'PSI vs GPM',                 meaning: 'Pounds per square inch vs gallons per minute. PSI is the cutting force; GPM is the flow that actually removes the dirt. Commercial-grade equipment runs higher GPM at moderate PSI vs the consumer-tier equipment that runs high PSI at low flow.' },
      { term: 'Surface cleaner',            meaning: 'The rotating dual-jet attachment that cleans large flat surfaces (driveways, sidewalks, pool decks) in a fraction of the time of a wand. Equipment investment that signals professional operator vs DIY.' },
      { term: 'Paver sealing',              meaning: 'Applying a protective sealer to brick or concrete pavers after cleaning. High-margin recurring service ($800 to $3,500 per residential job) that most pressure washers undersell or miss entirely.' },
      { term: 'Sodium hypochlorite (SH)',   meaning: 'The bleach-based biocide solution used in soft washing for roof and exterior cleaning. Concentration ratios and dwell times are skill-dependent. The right operator never damages the surface; the wrong one strips paint.' },
      { term: 'Recurring contract',         meaning: 'Annual residential pressure-wash agreements plus quarterly commercial contracts. The recurring customer is worth 4-8 times the one-time job over their lifetime. Marketing should optimize for recurring enrollment, not one-time inquiries.' },
      { term: 'HOA approval',               meaning: 'Homeowner association approval often required for exterior cleaning in Miami condo and gated-community markets. Operators familiar with the HOA approval process win the call over those who do not understand it.' },
      { term: 'Per-square-foot pricing',    meaning: 'The industry-standard pricing model. Customers Google "pressure washing cost per square foot Miami" before booking. Transparent per-square-foot pricing on the website converts dramatically better than "call for quote" placeholders.' },
    ],
    opsTech: [
      'Jobber, Housecall Pro, or ServiceMonster for scheduling, dispatch, and recurring-service billing',
      'BookingKoala for instant online quote-to-book with property-size pre-qualification',
      'CompanyCam for before/after photos that double as warranty proof + marketing content',
      'Square Appointments or Stripe for card-on-file recurring annual charges',
      'GPS fleet trackers (Verizon Connect, Samsara) that pair with job-completion timestamps for proof-of-service',
    ],
    marketingTech: [
      'Google Local Services Ads with the Google Guaranteed badge (high-converting for residential pressure washing specifically)',
      'Nextdoor "Recommendations" prompts after every job (residential pressure washing is one of the strongest organic Nextdoor categories)',
      'GBP service categories that pressure washers underuse (PressureWashingService, ExteriorCleaningService, RoofCleaningService, PaverSealingService)',
      'Photo-rich review-request automation (before/after photos attached to the review request boosts review attach-rate 3-5x)',
      'Before/after video for social ads (single highest-converting visual format in pressure washing)',
      'Annual-renewal automation for recurring residential contracts (12-month re-engagement push)',
      'Per-square-foot pricing tables on every service page (transparency converts measurably better than "call for quote")',
    ],
    insiderEdge: 'We build pressure-washing marketing around lifetime customer value and recurring-service enrollment, not single-job inquiries. A residential annual-renewal customer is the asset. Everything else is the funnel that fills it.',
  },

  'contractors': {
    intro: "Contractor marketing fails when it's written by people who have never pulled a permit or chased a final inspection. Here's what we actually know about how a general contractor or specialty trade business runs, so your marketing is being built on the operational reality of permit pipelines, punch lists, and draw schedules.",
    slang: [
      { term: 'Pulling permits',     meaning: 'The submittal-and-approval gauntlet before any work can legally start. Permit-pull volume per month is the real leading indicator of revenue, not just lead count.' },
      { term: 'Punch list',          meaning: 'The final to-do list before a job closes out and the last draw releases. Reviews almost always get written within 2 weeks of punch-list signoff.' },
      { term: 'Change order',        meaning: 'A formal scope addition mid-project, signed by the client. A contractor without a tight change-order process loses margin on every job.' },
      { term: 'Draw schedule',       meaning: 'The agreed payment milestones across a project (deposit, rough-in, drywall, final). Marketing dollars get rationed against expected draw timing, not calendar months.' },
      { term: 'T&M vs fixed-fee',    meaning: 'Time-and-materials billing vs a quoted lump sum. The leads that match each pricing model are different, and the landing pages should be too.' },
      { term: 'Scope creep',         meaning: 'Unbilled work that crept in because the original scope was vague. The leads that cause it usually came from cheap channels with vague intent.' },
      { term: 'Lien waiver',         meaning: 'The signed paper protecting the owner from sub-contractor liens. The smoothness of the lien-waiver process is a real reputation-builder.' },
      { term: 'GC vs sub',           meaning: 'General contractor vs sub-contractor. A GC needs trust-based leads. A sub needs steady volume from a small number of GCs. Different marketing entirely.' },
    ],
    opsTech: [
      'ServiceTitan, Buildertrend, or JobNimbus for end-to-end project + job management',
      'CompanyCam for date-stamped, GPS-tagged jobsite photos that double as review content',
      'Procore or Houzz Pro for design-build and remodeler client portals',
      'QuickBooks Contractor edition or Foundation for job-costing and WIP reports',
      'iTrack, ContractorTools, or PlanGrid for permit + plan tracking on mobile',
    ],
    marketingTech: [
      'Google Local Services Ads with verified Pro and Background-Checked badges (the trust signal that lets you skip the slow review-build phase)',
      'Houzz Pro listing with awards, project portfolio, and review-import from Google',
      'Nextdoor neighborhood "Recommendations" feed (a real lead source for residential contractors in tight-knit zips)',
      'CompanyCam Showcase pages that auto-publish projects with location + date stamps (compounds local SEO on every job)',
      'Schema.org HomeAndConstructionBusiness + Service markup with priceRange and areaServed',
      'Permit-pull data scraping for past clients and competitor activity (Miami-Dade and Broward both expose this publicly)',
      'Before/after gallery pages built by trade (kitchen remodel, roof replacement, ADU build) rather than a single mega-portfolio',
    ],
    insiderEdge: 'We build contractor marketing around your permit-pull pipeline and your draw-schedule cash needs, not just monthly lead volume. The right 4 leads a month from the right channel beats 40 from the wrong one every time.',
  },

  'cleaning-services': {
    intro: "Cleaning company marketing fails when it treats residential recurring, one-time deep cleans, post-construction, and Airbnb turnover as the same product. They're not. Here's what we know about how the operational mix shapes lead intent, so your marketing pulls the customers that actually compound.",
    slang: [
      { term: 'Recurring vs one-time',  meaning: 'A recurring-cleaning client is worth 8 to 12 times what a one-time deep clean is over their lifetime. Marketing dollars belong on the recurring side.' },
      { term: 'Deep clean',             meaning: 'The first-time intensive that precedes a recurring schedule. Often a loss-leader entry point. Treat it as the trial offer, not the product.' },
      { term: 'Post-CO',                meaning: 'Post-construction clean after the certificate of occupancy is issued. High-margin, one-time, sourced almost entirely from GC referrals.' },
      { term: 'Turnover',               meaning: 'Airbnb / short-term-rental cleans between guests. Different SLA (same-day, no-show penalties), different software stack, different review platform.' },
      { term: 'End-of-tenancy',         meaning: 'Move-out cleaning, usually tied to a security-deposit timeline. The query intent here is urgent and price-sensitive.' },
      { term: 'Scope of work',          meaning: 'The checklist the client signed. Without one, scope creep eats your margin and your team\'s morale.' },
      { term: 'GBAC certification',     meaning: 'Global Biorisk Advisory Council certification. A real differentiator for medical-office and food-service commercial accounts.' },
      { term: 'Color-coded microfiber', meaning: 'The cross-contamination prevention protocol every commercial buyer asks about. Worth a callout on your services page.' },
    ],
    opsTech: [
      'Jobber, Housecall Pro, or ZenMaid for scheduling, dispatch, and recurring billing',
      'BookingKoala for instant online quote-to-book (huge conversion lift for residential)',
      'Swept or Janitorial Manager for the commercial cleaning ops layer',
      'CleanGuru or ServiceMonster for inspection checklists and quality scores',
      'Square Appointments or Stripe for card-on-file recurring charges',
    ],
    marketingTech: [
      'Google Local Services Ads with the Google Guaranteed badge (one of the highest-converting channels for residential cleaning)',
      'Thumbtack for one-time deep cleans (treat as acquisition funnel for recurring conversion, not as the channel itself)',
      'Yelp ads (yes, still works for cleaning specifically, the demographic match holds)',
      'Nextdoor Business Page + neighborhood "Recommendations" prompts after every job',
      'Recurring-service review velocity strategy (weekly clients = weekly review opportunities, compounds faster than any other home-service category)',
      'Airbnb / Vrbo co-host directories for the turnover side of the business',
      'GBP service categories that cleaners underuse (CommercialCleaningService, JanitorialService, MaidService, HouseCleaningService — list every one that applies)',
    ],
    insiderEdge: 'We build cleaning-company marketing around lifetime customer value, not lead volume. A recurring biweekly client is the asset. Everything else is the funnel that fills it.',
  },

  'landscaping': {
    intro: "Landscaping marketing fails when it ignores route density. A new client 18 minutes from your existing route costs you margin even at full price. Here's what we know about how a Miami landscape, lawn-care, or design-build business actually runs, so the leads we drive cluster where your trucks already roll.",
    slang: [
      { term: 'Route density',       meaning: 'The number of stops per square mile per day. The single best operational metric in lawn care. Marketing should be tuned to fill geographic gaps in your existing route.' },
      { term: 'Mow-blow-go',         meaning: 'The basic weekly lawn-maintenance package. The volume product. Margins are thin, retention is what makes it work.' },
      { term: 'Hardscape vs softscape', meaning: 'Hardscape = pavers, walls, outdoor kitchens. Softscape = plants, sod, mulch. Hardscape converts on showcase photos. Softscape converts on plant-knowledge content.' },
      { term: 'Design-build',        meaning: 'Full landscape design plus install, typically $15K to $150K+ jobs. Different funnel entirely: Houzz, portfolio sites, and architect referrals dominate.' },
      { term: 'Round 1 through 5',   meaning: 'The standard 5-step fertilization and weed-control program. Each round is a re-engagement touchpoint and a review opportunity.' },
      { term: 'Sod kill',            meaning: 'When a freshly installed lawn dies on the warranty window. The fastest way to lose a client and earn a 1-star review.' },
      { term: 'Fall cleanup vs mulch install', meaning: 'The seasonal upsell pair. Even in Miami where leaves do not fall hard, the mulch-install seasonal push is real.' },
      { term: 'The heavies',         meaning: 'The trailer-mounted equipment (ride-on mowers, skid-steers). The job estimate changes based on whether the crew has to deploy the heavies or not.' },
    ],
    opsTech: [
      'Aspire, LMN, or Service Autopilot for crew routing, job costing, and chemical tracking',
      'Jobber for residential-focused operations (lighter weight than Aspire)',
      'RealGreen for lawn-care chemical applications and EPA-compliant record-keeping',
      'ArborGold for tree-care and arborist-specific workflows',
      'GPS fleet trackers (Verizon Connect, Samsara) that pair with job-completion timestamps',
    ],
    marketingTech: [
      'Google Local Services Ads for "lawn care near me" verified-pro placement (huge in S. Florida)',
      'Nextdoor "recommend a landscaper" prompts (one of the highest-converting residential lead sources for this category)',
      'GBP service categories landscapers underuse (LawnMowingService, LandscapeArchitect, GardenerService, TreeCareService, IrrigationService — each one expands your eligibility surface)',
      'Before/after seasonal photo cadence on GBP (Miami buyers respond strongly to "this same yard 3 months ago" sequences)',
      'Irrigation-keyword tier (high-volume, low-competition in S. Florida due to year-round watering rules)',
      'Houzz Pro portfolio for the design-build side (different funnel entirely from mow-and-blow)',
      'Spanish-language landing pages (the residential demo here is heavily Spanish-first, and most competitors only run English)',
    ],
    insiderEdge: 'We build landscaping marketing tuned to your route density, not your raw lead count. The right 6 new neighbors on your existing Tuesday route beats 12 scattered leads 20 minutes apart every time.',
  },

  'moving-companies': {
    intro: "Moving-company marketing fails when it ignores the May-through-September peak. Half your year happens in 5 months. Here's what we know about how an interstate, local, or full-service mover actually runs, so your funnel fills the peak and protects you in the slow months.",
    slang: [
      { term: 'Peak season',          meaning: 'May through September. Roughly 60 percent of annual local-move volume and 70 percent of interstate. The marketing calendar should be 90 days ahead of it.' },
      { term: 'Local vs long-distance vs interstate', meaning: 'Three different regulatory regimes (state, multi-state, ICC). Three different lead sources. Treating them as one product loses you bookings.' },
      { term: 'Bill of lading',       meaning: 'The legal contract for any move. The way it is written changes the customer\'s perception of trust before the truck even arrives.' },
      { term: 'Full-service vs labor-only', meaning: 'Full-service includes packing and unpacking. Labor-only is muscle and truck. The Google query language is meaningfully different between the two.' },
      { term: 'COD',                  meaning: 'Cash on delivery. The riskiest payment model. Most quality movers have phased it out, which is itself a trust signal worth marketing.' },
      { term: 'DOT and MC numbers',   meaning: 'The U.S. DOT number and the FMCSA Motor Carrier number every legitimate mover must publish. Putting them in ad copy and on landing pages is a conversion driver, not a compliance afterthought.' },
      { term: 'White-glove',          meaning: 'Premium service tier with crating, padding, and specialty-item handling. Average ticket is 3 to 5 times standard. Targeted ads convert exceptionally well.' },
      { term: 'Storage-in-transit',   meaning: 'Short-term storage between a move-out and a move-in. A meaningful add-on revenue line most movers underprice in their marketing.' },
    ],
    opsTech: [
      'SmartMoving, MoverBase, or Movegistics for quote-to-completion job workflow',
      'Granot or Elromco for the dispatch and crew-management layer',
      'Move4U or MoverFlex for digital move surveys and visual inventories',
      'CompanyCam for jobsite photos that double as damage-claim documentation',
      'QuickBooks Online with moving-industry chart of accounts',
    ],
    marketingTech: [
      'MyMovingReviews (the dominant niche review platform for movers, treat as a Google-equivalent)',
      'Moving.com and MovingHelp.com directories (still major lead sources, especially for labor-only)',
      'Yelp ads (movers still convert here, the buyer demographic match holds)',
      'USDOT number prominently in all ad copy + landing pages (real trust signal, real conversion lift)',
      'GBP "Moving Company" + "Mover" + "Moving and Storage Service" categories (most movers only check one)',
      'Peak-season ad budget phasing 90 days ahead (April-August spend cap higher than Sept-March)',
      'Schema.org MovingCompany with sameAs links to FMCSA registry for verification',
    ],
    insiderEdge: 'We build moving-company marketing around the peak-season pipeline curve, not the calendar. The 90 days before May are where the year is won or lost.',
  },

  'medspas': {
    intro: "Med spa marketing fails when it treats aesthetic patients like any other consumer. They\'re not. They\'re researching for weeks, comparing injectors by Instagram before they ever Google you, and they buy on retention not acquisition. Here\'s what we know about how a Miami med spa actually runs, so your marketing builds the loyalty ladder, not just the front door.",
    slang: [
      { term: 'Tox / filler',         meaning: 'Neuromodulators (Botox, Dysport, Xeomin, Jeuveau) and hyaluronic-acid fillers (Juvederm, Restylane). The bread and butter. Search query language splits sharply between the two.' },
      { term: 'B&A',                  meaning: 'Before and after. The single highest-converting content type in aesthetics. Compliance rules vary by platform and state, and Florida has its own twist.' },
      { term: 'Injector tier',        meaning: 'RN vs PA vs MD oversight. Patients increasingly search by injector credentials, not clinic name. Inject the injector\'s name + credentials into every relevant page.' },
      { term: 'Package vs a-la-carte', meaning: 'Pre-paid treatment packages (3 SkinPen, 6 IPL, 4 areas of tox) vs single-session pricing. Package buyers have 4x the lifetime value. Marketing should pre-sort.' },
      { term: 'Retail attach',        meaning: 'The take-home skincare sold at checkout. Healthy med spas hit 15 to 25 percent of treatment revenue from retail. Marketing rarely talks about it. It should.' },
      { term: 'Recall',               meaning: 'The 3 or 4 month "time for your tox" outreach cycle. Email + SMS recall is the highest-ROI marketing channel in the practice. Period.' },
      { term: 'Morpheus8, Sculptra, EmSculpt', meaning: 'Brand-name device and biostimulator treatments with their own search query volumes. Each deserves its own landing page, not a paragraph on a "services" page.' },
      { term: 'Allergan ASCEND / Galderma Aspire', meaning: 'The two dominant brand loyalty programs. Patients in those programs visit more often. Promoting the loyalty enrollment is itself a marketing channel.' },
    ],
    opsTech: [
      'Aesthetic Record, Symplast, or PatientNow for med-spa-specific EHR + booking + payments',
      'Boulevard or Pabau for med-spa-friendly scheduling (more polished than generic salon software)',
      'Nextech or Modernizing Medicine for the larger plastic-surgery practice tier',
      'Square for retail product sales tied to the patient chart',
      'Touch MD or Concierge MD for in-treatment-room consult presentations',
    ],
    marketingTech: [
      'RealSelf provider profile (the dominant aesthetic research site, patients spend 4-7 days on RealSelf before booking)',
      'Aesthetic Record\'s embeddable booking widget on landing pages (kills the "fill out a form, hear back tomorrow" conversion leak)',
      'HIPAA-compliant forms and SMS (not optional, and most agencies miss this entirely)',
      'Instagram + TikTok B&A content with FDA-compliant disclosure overlays',
      'Schema.org MedicalBusiness with medicalSpecialty: CosmeticDermatology (and per-procedure pages get MedicalProcedure schema)',
      'Allergan ASCEND and Galderma Aspire enrollment funnels (treat as marketing channels, not loyalty afterthoughts)',
      'Local injector-credentialing pages (RN vs PA vs MD oversight is a real patient question, address it directly)',
    ],
    insiderEdge: 'We build med-spa marketing around retention and retail attach math, not just patient acquisition. A loyal recall patient with a healthy retail attach is worth 7 to 10 new-patient ads. We engineer the loyalty ladder first.',
  },

  'yacht-services': {
    intro: "Yacht-services marketing fails when it gets written like any other home-service business. Captains, brokers, marina managers, and yacht owners search differently than anyone else, and 80 percent of the year\'s business decisions happen in 4 months around FLIBS. Here\'s what we know about how a Fort Lauderdale or Miami yacht-services business actually runs, so your marketing matches the way the industry actually buys.",
    slang: [
      { term: 'Bottom job',             meaning: 'Hauling out and re-painting the antifouling on the hull. Typically every 12 to 18 months. A predictable recurring revenue cycle that marketing can pace against.' },
      { term: 'Splash',                 meaning: 'Re-launching after a haul-out. The captain\'s "splash date" drives the entire project timeline, and marketing should respect it.' },
      { term: 'Brightwork',             meaning: 'The varnished exterior teak. A specialty trade unto itself, and one of the highest-margin yacht services.' },
      { term: 'Tender',                 meaning: 'The smaller boat carried on a larger yacht. Tender service and storage is a meaningful add-on revenue line most yards underprice.' },
      { term: 'Wet vs dry storage',     meaning: 'In-water slip vs dry-rack storage. Different buyer profiles entirely. Dry-storage clients are wealthier and more service-needy.' },
      { term: 'Charter season vs term', meaning: 'Day-charter vs week-or-longer term charter. Term charters book 6 to 9 months out. Day charters book 3 to 14 days out. Two different SEO funnels.' },
      { term: 'FLIBS',                  meaning: 'Fort Lauderdale International Boat Show, late October. The largest in-water boat show in the world. The S. Florida yacht-industry news cycle revolves around it.' },
      { term: 'MIASF',                  meaning: 'Marine Industries Association of South Florida. Membership is a real trust signal and a directory placement worth optimizing.' },
    ],
    opsTech: [
      'DockMaster or Marina Office for marina, yard, and slip management',
      'Vessel Vanguard for owner-side maintenance scheduling and document storage',
      'Wheelhouse for the larger superyacht management tier',
      'Onspot or Yardbook for service-call dispatch and job invoicing',
      'Quickbooks Marine Edition or specialty marine accounting consultants',
    ],
    marketingTech: [
      'YachtWorld and Boats.com listings for brokerage adjacency (your service business gets discovered by buyers researching boats)',
      'BoatUS service-provider directory and Marinalife premium listing',
      'MIASF member directory placement (treat it as a citation-equivalent)',
      'FLIBS pre-show, during-show, and post-show content cadence (90-day window where industry attention concentrates)',
      'SuperYachtTimes or BoatInternational for the high-end tier (sponsored content, not just ads)',
      'IGFA captain directory for sportfishing-adjacent services',
      'Schema.org LocalBusiness with serviceType "marine services" and prominent USCG license + insurance signal blocks',
    ],
    insiderEdge: 'We build yacht-services marketing around the FLIBS news cycle and the bottom-job recurring rhythm, not generic monthly cadence. The S. Florida marine industry runs on a calendar most agencies have never seen.',
  },

  'real-estate-agents': {
    intro: "Real-estate-agent marketing fails when it just buys leads from the portals and calls it a strategy. Agents who scale build a sphere, farm a neighborhood, and use marketing to compound both. Here\'s what we know about how a Miami real-estate agent or team actually grows GCI, so your marketing builds the brand the portals can\'t take away from you.",
    slang: [
      { term: 'GCI',                   meaning: 'Gross commission income. The number that matters. Marketing should be measured in GCI-per-dollar, not lead-per-dollar.' },
      { term: 'Sphere of influence',   meaning: 'The 100 to 250 people who already know you. Past clients, family, neighbors, school parents. Sphere conversion is 8 to 15 times portal-lead conversion.' },
      { term: 'Farming',               meaning: 'Geographic neighborhood targeting through repetition (mailers, door hangers, sponsored open houses, neighborhood content). The compounding play that beats portal-buying long-term.' },
      { term: 'Expired listing',       meaning: 'A listing that came off the MLS without selling. A highly targetable lead segment with its own outreach cadence.' },
      { term: 'FSBO',                  meaning: 'For Sale By Owner. Self-listing seller. Specific scripts, specific timing, and a meaningful share of any agent\'s outbound funnel.' },
      { term: 'CMA',                   meaning: 'Comparative market analysis. The listing-appointment leave-behind. The quality of your CMA template is a real differentiator at the kitchen table.' },
      { term: 'Pre-approval vs pre-qual', meaning: 'A pre-approval is a real lender commitment. A pre-qual is a guess. Buyer agents who screen on the difference protect their sellers and themselves.' },
      { term: 'Days on market (DOM)',  meaning: 'How long a listing has been listed. Long DOM signals price problems. Marketing copy on listing pages should anticipate this question.' },
    ],
    opsTech: [
      'kvCORE, BoomTown, Follow Up Boss, or Chime for IDX site + CRM + nurturing',
      'Dotloop or DocuSign for transaction management and digital signatures',
      'ShowingTime for buyer-side appointment coordination',
      'SkySlope for broker-side compliance and file management',
      'Cloud CMA for branded comparative-market-analysis reports',
    ],
    marketingTech: [
      'Zillow Premier Agent + Realtor.com leads (treat as one funnel input, not the whole strategy)',
      'Hyper-local IDX search-page SEO (every neighborhood + price-range combo deserves its own URL)',
      'YouTube neighborhood tour videos (the highest-converting RE content type in 2026, by a wide margin)',
      'Instagram Reels of listings with proper MLS-rules-compliant disclosure',
      'Geographic Facebook ad farming around 2 to 4 zip codes (deeper beats wider)',
      'Sphere CRM nurturing with quarterly market reports tied to each contact\'s neighborhood',
      'Schema.org RealEstateAgent + Person + RealEstateListing markup (Google Business Profile alone is not enough)',
    ],
    insiderEdge: 'We build real-estate-agent marketing around sphere reactivation plus neighborhood farming, not just portal-lead buying. The portals are a tax. Your sphere is the asset. Marketing should build the second so you depend less on the first.',
  },

  'immigration-lawyers': {
    intro: "Immigration-law marketing fails when it ignores the niche within the niche. Family-based, employment-based, and removal defense have nothing to do with each other operationally, and prospective clients search using their specific case type. Here\'s what we know about how a Miami immigration firm actually runs, so your marketing speaks the right language to the right community.",
    slang: [
      { term: 'USCIS vs EOIR',         meaning: 'USCIS handles benefits applications. EOIR handles immigration court. Two completely different practice areas. A firm doing both needs separate landing pages.' },
      { term: 'RFE / NOID',            meaning: 'Request for Evidence and Notice of Intent to Deny. The case-management moments where a firm proves its value. Marketing content that walks clients through them earns trust before they ever call.' },
      { term: 'I-130, I-485, I-589, N-400', meaning: 'The most-searched USCIS form numbers. Family petition, adjustment of status, asylum, and naturalization. Each one deserves its own service page.' },
      { term: 'Removal proceedings',   meaning: 'Deportation defense. Marketing language has to be different here: less "how to" and more "how we will fight for you." Emotional register matters.' },
      { term: 'Master vs individual hearing', meaning: 'The two stages of removal court. Clients ask about the difference. Pages that explain both earn citations from AI assistants answering legal questions.' },
      { term: 'PD',                    meaning: 'Prosecutorial discretion. A real strategic option in some removal cases. Content that explains when it applies separates you from the form-filler firms.' },
      { term: 'NTA',                   meaning: 'Notice to Appear, the document that starts removal proceedings. "I got an NTA" is a real Google query. Be the answer.' },
      { term: 'Bond hearing',          meaning: 'The hearing to release a detained client from ICE custody. An urgent, high-intent search query, often by family members in Spanish.' },
    ],
    opsTech: [
      'Clio, MyCase, or PracticePanther for general legal practice management',
      'Docketwise or INSZoom for immigration-specific case management with USCIS form automation',
      'LawPay or Gravity Legal for trust-account-compliant payments',
      'Lawmatics or LawGrowth for intake automation and matter conversion tracking',
      'CourtCall or WebEx for remote immigration-court appearances',
    ],
    marketingTech: [
      'AILA (American Immigration Lawyers Association) member directory listing (a real referral source within the niche)',
      'Avvo, Justia, and Martindale-Hubbell legal profiles (still major in legal search)',
      'Bilingual landing pages for every service (Spanish-first for Cubano, Venezolano, Nicaragüense, Colombian, and Brazilian communities, each with their own dialect cues)',
      'Telemundo and Univision local sponsorship (still high-trust media for the Spanish-language immigration audience in S. Florida)',
      'Spanish-language Facebook groups (community-specific, e.g. "Venezolanos en Miami") as outreach channels, not as ad channels',
      'USCIS-field-office geographic SEO (Miami, Orlando, Tampa field offices each generate their own query clusters)',
      'Schema.org Attorney + LegalService markup with knowsAbout for each visa category you actually practice in',
    ],
    insiderEdge: 'We build immigration-law marketing around the specific national community and the specific case type, not generic "immigration lawyer Miami." Cubano family-petition clients, Venezolano TPS questions, and Brazilian employment-visa families all search differently. We meet them where they actually look.',
  },

  'beauty-salons': {
    intro: "Beauty-salon marketing fails when it treats every stylist like an employee. In 2026 most are renters or commission, building their own personal brands inside your space. Here\'s what we know about how a Miami salon actually works, so your marketing serves the chair-rental, commission, and employee models without choosing one and losing the others.",
    slang: [
      { term: 'Behind the chair',      meaning: 'The hours a stylist is actually serving clients. The marketing math is dollars-per-chair-hour, not just bookings.' },
      { term: 'Chair rental vs commission', meaning: 'Chair-rental stylists pay weekly rent and keep 100 percent. Commission stylists split with the salon. The marketing strategy for each is meaningfully different, and a single salon often has both.' },
      { term: 'Color correction',      meaning: 'Fixing a previous color (often a botched box-dye or another salon\'s work). The most-searched service in beauty. Worth its own landing page.' },
      { term: 'Balayage vs ombre vs babylights', meaning: 'Three different color techniques with three different price points and three different Instagram aesthetics. Each one is its own keyword cluster.' },
      { term: 'Retail attach',         meaning: 'Take-home product sold at checkout. A healthy salon hits 10 to 18 percent of service revenue. Marketing that promotes specific retail brands lifts this lever.' },
      { term: 'Olaplex / K18 round',   meaning: 'Branded bond-repair treatments added to color services. A specific upsell with its own search demand and its own retail-attach math.' },
      { term: 'Blowout',               meaning: 'The wash, dry, and style without color or cut. The volume product for non-event weeks. A meaningful subscription-package opportunity.' },
      { term: 'Formal hair',           meaning: 'Quinceañera, wedding, prom updos. Heavy seasonal demand in Miami. The booking funnel is mostly Instagram-first, not Google-first.' },
    ],
    opsTech: [
      'Mindbody, Vagaro, Booker, or Boulevard for full-salon booking and POS',
      'GlossGenius or Square Appointments for the solo and chair-rental stylist',
      'Phorest for European-style multi-stylist salons with retail focus',
      'Salon Iris for the larger multi-location operator',
      'Acuity for stylists who run primarily off Instagram DMs',
    ],
    marketingTech: [
      'Instagram (the platform for beauty, period; treat it as your primary funnel, not a social channel)',
      'TikTok transformation content (color correction, before/afters, technique demos) with end-of-video booking link',
      'StyleSeat and Booksy directory placements (still meaningful for "stylist near me" discovery)',
      'GlossGenius for solo stylists who want booking + invoicing + a directory in one',
      'Hashtag clusters per service + neighborhood (#miamibalayage #brickellbalayage compound separately)',
      'Schema.org BeautySalon with priceRange and openingHoursSpecification',
      'Stylist-specific landing pages tied to each rental-chair stylist\'s personal brand (especially when you have a roster of renters)',
    ],
    insiderEdge: 'We build beauty-salon marketing around stylist personal brands and retail attach math, not just the salon name. In 2026 the stylist is the brand. Smart marketing makes both the salon and the stylist look better, and the booking pipeline takes care of itself.',
  },

  'junk-removal': {
    intro: "Junk-removal marketing fails when it ignores truck utilization. A second stop on a half-empty truck is almost pure margin. A full truck at 4 PM is a missed booking. Here\'s what we know about how a Miami junk-removal business actually runs, so your marketing pipeline fills trucks instead of just inboxes.",
    slang: [
      { term: 'Full truckload vs partial', meaning: 'Full-truck pricing vs partial-truck pricing. Buyers shop both. The way you present them on a landing page determines which one most callers ask for.' },
      { term: 'Hot load',              meaning: 'A same-day or next-day urgent pickup, often eviction or foreclosure. Premium pricing, premium intent, separate ad campaign worth running.' },
      { term: 'OCC',                   meaning: 'One cubic yard of debris. The unit pricing scales from. Customers want to know what their pile costs, and the agencies that show the math win the lead.' },
      { term: 'Eviction cleanout',     meaning: 'Property cleanouts driven by a court eviction. B2B repeat revenue from landlords and property managers, not consumer one-offs. Different sales funnel entirely.' },
      { term: 'Hoarding cleanout',     meaning: 'A specialty service with mental-health sensitivity and biohazard considerations. Premium pricing, careful marketing language, often referral-driven.' },
      { term: 'Foreclosure cleanout',  meaning: 'Bank-owned property cleanouts on rapid turnaround. Sourced from preservation companies (Safeguard, Mortgage Contracting Services). B2B contract business.' },
      { term: 'E-waste',               meaning: 'Electronic waste. Specialty disposal with chain-of-custody documentation. A real differentiator for commercial accounts.' },
      { term: 'Single-item pickup',    meaning: 'One mattress, one couch, one fridge. Low ticket but high frequency. The volume play that keeps trucks busy between bigger jobs.' },
    ],
    opsTech: [
      'JunkBoss, Workiz, or Hauler Hero for junk-removal-specific dispatch and routing',
      'Service Fusion or ServiceMonster for the broader field-service tier',
      'BookingKoala for instant online quote-to-book',
      'CompanyCam for before/after photos that double as proof-of-completion and review content',
      'Stripe + Square for on-site card-on-file payments after the truck is loaded',
    ],
    marketingTech: [
      'Google Local Services Ads with the Google Guaranteed badge (the highest-conversion channel for junk removal in any major metro)',
      'Thumbtack (still works in this category, treat as a volume funnel for off-peak hours)',
      'Nextdoor neighborhood posts and "recommend a junk-removal" prompts',
      'Branded truck wraps as drive-by SEO (license plate + URL is a real query source, surprising but measurable)',
      'GBP photo cadence (daily new before/after photos lift Maps-pack visibility in this category more than most)',
      'B2B landing pages for property managers, real estate agents, and foreclosure preservation companies (separate funnels from residential)',
      'Schema.org LocalBusiness with serviceType and area-served geometry for each truck\'s service radius',
    ],
    insiderEdge: 'We build junk-removal marketing around truck utilization and driver-time-per-stop math, not raw lead volume. Filling the empty 4 PM slot is worth more than a 7th 9 AM call you can\'t take.',
  },

  'dentists': {
    intro: "Dental marketing fails when it's written by people who have never sat through a morning huddle or balanced a hygiene schedule. Here's what we actually know about how a dental practice runs, so you know your marketing is being built on operational reality, not generic templates.",
    slang: [
      { term: 'Chair time',         meaning: 'The minutes a producer spends in a treatment chair. Every marketing dollar should be measured in dollars-per-chair-minute, not just leads.' },
      { term: 'Perio recall',       meaning: 'The 3 or 4 month hygiene visit cycle for periodontal patients. A reliable recall pipeline is the difference between a stable practice and one that burns out front desk staff hunting cancellations.' },
      { term: 'FFS vs PPO',         meaning: 'Fee-for-service practices charge full UCR rates. PPO practices accept insurance-negotiated rates. The marketing strategy is genuinely different for each.' },
      { term: 'Production per hour', meaning: 'The single best operational metric in dentistry. Marketing for cosmetic or implant patients moves this number. Marketing for cleanings rarely does.' },
      { term: 'New patient exam',   meaning: 'The NPE visit. A practice that converts new patient calls to NPEs at 60% has a phone problem. One that converts at 85% has a marketing-fit problem (or no problem at all).' },
      { term: 'Hygiene re-care',    meaning: 'The recall hygiene appointment after the initial NPE. Loss here means your lifetime patient value is half what it could be.' },
      { term: 'Case acceptance',    meaning: 'The % of presented treatment plans that get scheduled. Cosmetic and implant case acceptance benchmarks differ wildly. Marketing should pre-qualify for both.' },
      { term: 'Same-day dentistry', meaning: 'Treatment delivered same visit (CEREC crowns, Invisalign scans). A real conversion driver for time-poor patients searching "dentist near me today".' },
    ],
    opsTech: [
      'Dentrix, Eaglesoft, Open Dental, or Curve Dental for practice management',
      'Weave, Yapi, or Solutionreach for appointment reminders and two-way patient SMS',
      'CareCredit, Sunbit, or Cherry for in-house financing on bigger cases',
      'CEREC, iTero, or 3Shape Trios for same-day digital impressions and crowns',
      'Pearl, Overjet, or VideaHealth for AI-assisted X-ray reads',
    ],
    marketingTech: [
      'LocalMed, NexHealth, or Zocdoc for direct-from-Google online booking',
      'Birdeye, Podium, or Doctible for review automation tied to the PMS',
      'Healthgrades, Vitals, and Zocdoc profile management (citation-equivalent for dental search)',
      'Google Ads with "Local Services Ads" verified provider badge for top-of-page placement',
      'Schema.org Dentist + MedicalProcedure markup on procedure pages (implants, veneers, Invisalign get individual schema)',
      'Procedure-specific landing pages (one URL per procedure × neighborhood) instead of a single "services" mega-page',
      'Before/after gallery pages with proper alt text and image schema (compounds Google Image search traffic, which dental patients rely on heavily)',
    ],
    insiderEdge: "We build dental marketing around the production-per-hour math, not the lead-volume math. That's the difference between filling chairs and filling them with the right patients.",
  },

};

/** Lookup helper. Returns null if the vertical has no vocabulary entry yet. */
export function getProfessionVocabulary(verticalSlug: string): ProfessionVocabulary | null {
  return professionVocabulary[verticalSlug] ?? null;
}
