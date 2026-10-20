import {
  CONTACT_EMAIL,
  CONTACT_PHONE_INTL,
  FACEBOOK_URL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_URL,
  LOGO_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from './site'

/**
 * ============================================================
 *  THE BUSINESS, DECLARED ONCE.
 * ============================================================
 *
 * Every page used to invent its own:
 *
 *     provider: { '@type': 'LocalBusiness', name: 'Sim2U Mobile Golf' }
 *
 * Six pages did that, some saying LocalBusiness and some Organization, none
 * carrying a phone number, a service area or a link to anything. To a search
 * engine that is not one business described eleven times — it is eleven
 * anonymous mentions of a name, with no way to tell they are the same company
 * or to connect any of them to the Google Business Profile that holds the
 * twenty five-star reviews.
 *
 * So the business is declared once here, with a stable @id, and emitted on
 * every page by Seo.tsx. Pages that describe a service now point at it
 * (`provider: { '@id': BUSINESS_ID }`) instead of describing it again.
 *
 * ------------------------------------------------------------
 *  WHY sameAs IS THE MOST IMPORTANT LINE
 * ------------------------------------------------------------
 * The Google Business Profile is the strongest local asset this business has
 * and the website never referenced it. `sameAs` is the explicit statement
 * that this site and that profile are one entity, which is exactly the
 * connection a search like "golf simulator cape town" is trying to make.
 *
 * The URL is the canonical ?cid= form rather than the share.google link
 * Dylan sent. Share links are redirects tied to the session that made them;
 * the cid is the permanent identifier for the listing. (Same reasoning as the
 * note on the Facebook share link in site.ts.)
 *
 * ------------------------------------------------------------
 *  WHAT IS DELIBERATELY ABSENT
 * ------------------------------------------------------------
 *  · aggregateRating. Twenty reviews at 5.0 is tempting to mark up and it
 *    would be two lines. Google's structured data policy does not allow
 *    self-serving review markup for your own business, and reviews collected
 *    on Google cannot be republished as your own schema. The downside is a
 *    manual action against the whole site. Those reviews already work where
 *    they live.
 *
 *  · a street address or coordinates. This is a service-area business with
 *    no premises. The locality below is kept because it was already live in
 *    index.html and is true — a town and region with no street number is an
 *    honest way to say "we are based here and travel"; a made-up street
 *    address would contradict the Business Profile, which is the one thing
 *    this file exists to agree with.
 *
 *  · openingHours. The Business Profile says "open 24 hours", which is a
 *    convenience setting rather than a fact about a mobile golf simulator.
 *    Publishing it as structured data makes it a claim. Left out until it is
 *    true in both places.
 */

export const BUSINESS_ID = `${SITE_URL}/#business`

/**
 * Towns the Business Profile's service area actually covers.
 *
 * This replaced a single `AdministrativeArea` of "Western Cape, South
 * Africa". A geo query is matched against place names, and "Western Cape" is
 * not the phrase anyone types — they type the town they are in. Keep this
 * list matching the service area on the Business Profile; the point of the
 * whole file is that the two agree.
 */
const SERVICE_AREAS = [
  'Cape Town',
  'Somerset West',
  'Stellenbosch',
  'Paarl',
  'Franschhoek',
  'Hermanus',
  'Kleinmond',
  'Worcester',
  'Montagu',
  'Bredasdorp',
]

export const BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BUSINESS_ID,
  name: SITE_NAME,
  url: SITE_URL,
  /* E.164, no spaces — the format Google parses rather than guesses at. */
  telephone: CONTACT_PHONE_INTL.replace(/\s/g, ''),
  email: CONTACT_EMAIL,
  logo: `${SITE_URL}${LOGO_URL}`,
  image: SOCIAL_IMAGE,
  description:
    'Mobile golf simulator hire for corporate events, conferences, ' +
    'activations and private functions across Cape Town and the Western Cape. ' +
    'We bring the simulator, the enclosure and a technician to your venue.',
  /* Locality only, no street. Carried over from the hand-written block that
     used to live in index.html — it predates this file and it is accurate. */
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Somerset West',
    addressRegion: 'Western Cape',
    addressCountry: 'ZA',
  },
  areaServed: SERVICE_AREAS.map((name) => ({ '@type': 'City', name })),
  sameAs: [GOOGLE_BUSINESS_URL, INSTAGRAM_URL, FACEBOOK_URL],
  priceRange: 'R3500–R12000',
}

/**
 * Point a page's Service/Event schema at the business instead of redescribing
 * it. One line, and it is the whole reason the @id above exists.
 */
export const PROVIDED_BY = { '@id': BUSINESS_ID }
