// city-character.ts
// Unique per-city facts, landmarks, demographics, and search-behavior angles.
// Injected into the programmatic city template to push content uniqueness
// above the 15% sibling-page threshold (Nico Gorrono "Find The Fix" 2026-05-21).
//
// Authoring rules:
// - Every entry must reference at least one named landmark or neighborhood the
//   other cities do NOT share.
// - Every entry must include a demographic or buyer-behavior fact unique to
//   the city.
// - Every entry must include a search-pattern hook (what real residents type
//   that they don't in the next city over). This is what drives uniqueness
//   in service + location combinations.
// - Tone: small-operator first-person, no jargon, no em-dashes, percent signs
//   over the word, no named competitors.

export interface CityCharacter {
  /** Common nickname or identity hook ("Venice of America", "Most Fun Small Town", etc.) */
  nickname: string;
  /** Tagline-style identity sentence used in the city-character section heading. */
  identity: string;
  /** Two to four named landmarks or districts unique to this city. */
  landmarks: string[];
  /** Population, demographic, or economic detail unique to this city. */
  demographic: string;
  /** One paragraph weaving the unique facts into a search-pattern observation. */
  searchAngle: string;
  /** Local micro-markets or sub-areas worth naming inside the city. */
  subAreas: string[];
  /** Common cross-county buyer pattern (e.g. "books contractors out of Broward, prices out of Palm Beach"). */
  buyerPattern: string;
}

export const cityCharacter: Record<string, CityCharacter> = {

  'fort-lauderdale': {
    nickname: 'Venice of America',
    identity: '165 miles of inland canals and a yacht buyer in every other zip code.',
    landmarks: [
      'Las Olas Boulevard',
      'Port Everglades cruise terminal',
      'the Riverwalk',
      'Lauderdale-by-the-Sea',
    ],
    demographic: 'Fort Lauderdale residents skew older and wealthier than the South Florida average. Median household income runs about 20% above the state median, and the city hosts the largest concentration of resident yacht owners in North America.',
    searchAngle: 'Fort Lauderdale buyers search differently from neighbors to the south. Queries cluster around the waterfront lifestyle (dock services, marina concierges, yacht maintenance, boat detailing) and the cruise economy (port transfers, Las Olas restaurants, hotel-to-Port-Everglades shuttles). A service business here gets found by mapping its offering to one of those two engines, not by chasing generic "fort lauderdale" head terms.',
    subAreas: ['Las Olas Isles', 'Victoria Park', 'Coral Ridge', 'Lauderdale-by-the-Sea', 'Wilton Manors (adjacent)', 'Sunrise (adjacent)'],
    buyerPattern: 'Fort Lauderdale residents will hire from Coral Springs and Plantation but rarely from Miami. The mental county line is real.',
  },

  'hollywood-fl': {
    nickname: 'The Beach Broadwalk City',
    identity: 'A 2.5-mile paved beachfront promenade and one of the most internationally diverse buyer bases in South Florida.',
    landmarks: [
      'the Hollywood Beach Broadwalk',
      'ArtsPark at Young Circle',
      'Margaritaville Beach Resort',
      'Topeekeegee Yugnee Park',
    ],
    demographic: 'Hollywood holds one of the largest Israeli, Brazilian, and Colombian populations in the United States. Spanish, Portuguese, and Hebrew bilingual presence is a real ranking and conversion lever here, not a checkbox.',
    searchAngle: 'Hollywood searches blur three buyer languages. The same service can be queried as "fontanero hollywood fl", "encanador hollywood florida", or "plumber near hollywood beach" inside a single zip code. A business that only ranks for one of those captures roughly a third of the addressable market. Multilingual landing pages compound here in a way they do not anywhere else in Broward.',
    subAreas: ['Hollywood Beach', 'Downtown Hollywood', 'Emerald Hills', 'Hollywood Hills', 'East Hollywood', 'Hollywood Lakes'],
    buyerPattern: 'Hollywood residents commute roughly evenly to FLL and to Aventura. Service businesses that anchor between the two pick up overflow from both.',
  },

  'pompano-beach': {
    nickname: 'Fishing Capital of the East Coast',
    identity: 'Home to one of the longest fishing piers on the Atlantic and a fast-growing condo skyline that flips the local buyer mix every year.',
    landmarks: [
      'Pompano Beach Fishing Pier',
      'Pompano Beach Cultural Center',
      'Goodyear Blimp base',
      'the Isle Casino',
    ],
    demographic: 'Pompano Beach has one of the highest year-over-year condo construction rates in Broward County. The buyer base is shifting from longtime fishing-community residents to newly arrived condo owners, which means a service business now needs to rank for two distinct demographic search patterns at the same time.',
    searchAngle: 'A Pompano Beach business that only chases the longtime-resident query set will miss the newer condo buyers searching from a phone they unboxed last quarter. The fix is keyword pairs: serve "pompano beach handyman" alongside "condo handyman pompano", "fishing charter pompano" alongside "boat detailing pompano marina". The split is roughly 60 percent legacy, 40 percent condo, and the 40 percent is the share that grows every year.',
    subAreas: ['Old Pompano', 'Pompano Beach Highlands', 'Cresthaven', 'Hillsboro Shores', 'Pompano Isles', 'Lighthouse Point (adjacent)'],
    buyerPattern: 'Pompano buyers research locally but hire from the same vendors as Lighthouse Point and Deerfield Beach. Targeting all three together is the standard play.',
  },

  'west-palm-beach': {
    nickname: 'Brightline North',
    identity: 'The mainland anchor for one of the highest-net-worth zip codes in America and the fastest-growing intercity rail hub in Florida.',
    landmarks: [
      'CityPlace (now Rosemary Square)',
      'the Norton Museum of Art',
      'the Brightline West Palm station',
      'Clematis Street',
    ],
    demographic: 'West Palm Beach sits across the Intracoastal from Palm Beach proper, which holds one of the highest concentrations of household wealth above $5M in the United States. The two markets blur every season: West Palm businesses serve full-time mainland residents and the seasonal Palm Beach household-staff economy on alternating weeks.',
    searchAngle: 'West Palm searches split sharply by season. October through April brings a 30 percent to 60 percent volume bump on premium-service queries (private chef, estate management, boat captain, art installation) as Palm Beach households restart. May through September trends toward year-round-resident maintenance queries. A West Palm service business that ignores the seasonal shift in keyword mix leaves both audiences underserved.',
    subAreas: ['Downtown WPB', 'El Cid', 'Flamingo Park', 'Northwood', 'SoSo (South of Southern)', 'Palm Beach (across the bridge)'],
    buyerPattern: 'West Palm residents will cross the bridge to serve Palm Beach but Palm Beach residents almost never cross to West Palm to hire. Service businesses need landing pages in both directions.',
  },

  'boca-raton': {
    nickname: 'Birthplace of the IBM PC',
    identity: 'A planned Mediterranean-revival city with the highest concentration of corporate tech relocations in Palm Beach County.',
    landmarks: [
      'Mizner Park',
      'Town Center at Boca Raton',
      'Florida Atlantic University',
      'Boca West Country Club',
    ],
    demographic: 'Boca Raton has the highest density of gated golf communities in Palm Beach County (Boca West alone holds about 3,400 residences across four 18-hole courses) and a sizable retiree-corporate-relocation mix. The IBM-PC heritage left a lasting tech-employer base that still anchors the local job market.',
    searchAngle: 'Boca Raton buyers research methodically. Average pre-purchase research depth on home and personal services here runs longer than the South Florida average. That rewards a service business that ranks for the long-tail comparison queries ("X vs Y in boca", "best Z in boca west", "Z near mizner park") rather than just the short head terms. FAQs and detailed comparison pages convert disproportionately well here.',
    subAreas: ['Boca West', 'Royal Palm Yacht Club', 'East Boca', 'Mizner Park district', 'Town Center area', 'Highland Beach (adjacent)'],
    buyerPattern: 'Boca residents will hire from Delray and West Palm but rarely cross south into Broward. The county line is a hiring barrier here too.',
  },

  'delray-beach': {
    nickname: 'Most Fun Small Town in USA',
    identity: 'A walkable downtown built around one street and an arts-district revival that pulls weekend buyers from three counties.',
    landmarks: [
      'Atlantic Avenue',
      'Pineapple Grove Arts District',
      'the Morikami Museum and Japanese Gardens',
      'Old School Square',
    ],
    demographic: 'Delray Beach has the highest per-capita restaurant and gallery density in southern Palm Beach County and a year-round walkable downtown rare in South Florida. That walkability shapes a buyer base that researches dining, services, and retail at street-level pedestrian intent more than drive-by car intent.',
    searchAngle: 'Delray searches over-index on walkability-adjacent terms ("near atlantic ave", "pineapple grove", "walking distance to atlantic") and on weekend visitor intent (Boca, Boynton, and West Palm residents who park downtown for the day). A service business off Atlantic that does not name itself by walking-distance landmarks gets passed for the one that does, even when both rank for the same generic city keyword.',
    subAreas: ['Atlantic Avenue corridor', 'Pineapple Grove', 'Lake Ida', 'Tropic Isle', 'Seagate', 'Gulf Stream (adjacent)'],
    buyerPattern: 'Delray buyers will travel from Boca for service but will not travel to Boca. The Atlantic-Avenue gravitational pull is real and measurable in foot-traffic data.',
  },

};

/** Lookup helper. Returns null if the city has no character entry yet. */
export function getCityCharacter(citySlug: string): CityCharacter | null {
  return cityCharacter[citySlug] ?? null;
}
