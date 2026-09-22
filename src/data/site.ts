export const SITE_URL = 'https://sim2umobilegolf.co.za'
export const SITE_NAME = 'Sim2U Mobile Golf'
export const SOCIAL_IMAGE = `${SITE_URL}/social-preview.png`

export const CONTACT_PHONE = '083 318 2565'
export const CONTACT_PHONE_INTL = '+27 83 318 2565'
export const CONTACT_EMAIL = 'info@sim2umobilegolf.co.za'
export const WHATSAPP_URL = 'https://wa.me/27833182565'
export const TEL_HREF = `tel:${CONTACT_PHONE.replace(/\s/g, '')}`
export const FORMSPREE_URL = 'https://formspree.io/f/mwvoapnp'

/**
 * Social profiles.
 *
 * The Instagram link is the clean profile URL. The one Dylan sent carried a
 * `?stkn=` share token on the end — those are tied to the account that
 * generated them and have no business being published on a website.
 *
 * NOTE FOR DYLAN: the Facebook link is a share redirect (/share/...). It works,
 * but the canonical page URL (facebook.com/YourPageName) is better — it is
 * stable, readable, and stronger as a search signal. Grab it from the address
 * bar when you are on your page and swap it in here.
 */
export const INSTAGRAM_URL = 'https://www.instagram.com/sim2umobilegolf/'
export const FACEBOOK_URL = 'https://www.facebook.com/share/1Bdf3PtjdY/'

/** Feeds the sameAs array in the LocalBusiness schema. */
export const SOCIAL_PROFILES = [INSTAGRAM_URL, FACEBOOK_URL]

/**
 * Served from our own public/ folder, NOT hotlinked.
 *
 * This used to point at a Google Drive share link
 * (lh3.googleusercontent.com/d/...). Those are not a CDN: Drive rate-limits
 * them, changes them and blocks them without notice, and when it does every
 * page on the site shows a broken-image icon where the logo should be. Which
 * is exactly what happened. The file is 25KB — host it ourselves.
 */
export const LOGO_URL = '/logo.webp'

/** Build-time flag. Only the production build is indexable. */
export const IS_PRODUCTION = import.meta.env.VITE_SITE_ENV === 'production'

export interface NavChild {
  name: string
  to: string
  /** One line under the name in the dropdown. Say what the page answers. */
  blurb: string
}

export type NavEntry =
  | { kind: 'link'; name: string; to: string }
  | { kind: 'group'; name: string; items: NavChild[] }

/**
 * The top bar.
 *
 * Grouped rather than flat because six links plus a tour pill, a phone number
 * and a quote button had the bar running to the edge of a laptop screen. Two
 * dropdowns and one flat link leave room to breathe — and room to add pages
 * without starting this argument again.
 *
 * Split by question rather than by audience: "what do you do" and "what does
 * it cost" are the two things a first-time visitor wants, and a person who
 * doesn't yet know whether we suit them cannot pick between "Corporate" and
 * "Social" on their own.
 */
export const NAV: NavEntry[] = [
  {
    kind: 'group',
    name: 'What We Do',
    items: [
      {
        name: 'Corporate Events',
        to: '/corporate-events',
        blurb: 'Team building, conferences and brand activations',
      },
      {
        name: 'Social Events',
        to: '/social-events',
        blurb: 'Birthdays, weddings, braais and private functions',
      },
      {
        name: 'Equipment Hire',
        to: '/equipment-hire',
        blurb: 'Launch monitor and operator for golf days',
      },
    ],
  },
  {
    kind: 'group',
    name: 'Pricing',
    items: [
      {
        name: 'Packages & Rates',
        to: '/packages',
        blurb: 'Three enclosures, hourly pricing, what is included',
      },
      {
        name: 'How It Works',
        to: '/how-it-works',
        blurb: 'Space, ceiling height, power and setup times',
      },
    ],
  },
  { kind: 'link', name: 'Gallery', to: '/gallery' },
]

/**
 * Every page in NAV, flattened — the footer and the 404 page list them all.
 *
 * Derived rather than written out a second time, so a page added to a
 * dropdown can never go missing from the footer.
 */
export const NAV_LINKS: { name: string; to: string }[] = NAV.flatMap((entry) =>
  entry.kind === 'group'
    ? entry.items.map(({ name, to }) => ({ name, to }))
    : [{ name: entry.name, to: entry.to }],
)

/** Shown as a highlighted pill, separate from the main nav run. */
export const FEATURED_LINK = { name: 'Joburg Tour', to: '/joburg-tour' }

/**
 * The primary call to action in the top bar.
 *
 * It is deliberately the only SOLID gold element up there: Joburg Tour is an
 * outlined pill and the phone number is maroon, so filled-gold reads as the
 * one thing the bar is asking you to do. Keep that hierarchy if you add
 * anything else to the nav.
 */
export const QUOTE_LINK = { name: 'Request a Quote', to: '/contact', short: 'Quote' }

/** Drives sitemap.xml. Add a page here when you add a route. */
export const SITEMAP_ROUTES: { path: string; priority: string }[] = [
  { path: '/', priority: '1.0' },
  { path: '/corporate-events', priority: '0.9' },
  { path: '/social-events', priority: '0.9' },
  { path: '/packages', priority: '0.9' },
  { path: '/how-it-works', priority: '0.7' },
  // Its own search term ("launch monitor hire", "mevo hire") that no other
  // page competes for, so it earns a higher priority than the gallery.
  { path: '/equipment-hire', priority: '0.7' },
  { path: '/gallery', priority: '0.6' },
  { path: '/joburg-tour', priority: '0.8' },
  { path: '/contact', priority: '0.8' },
  // Low priority on purpose: it should be indexed and findable, but it is
  // not a page we want ranking ahead of the ones that sell anything.
  { path: '/terms', priority: '0.3' },
  { path: '/privacy', priority: '0.3' },
]

export const SERVICE_AREAS = [
  'Cape Town',
  'Somerset West',
  'Stellenbosch',
  'Cape Winelands',
  'Paarl',
  'Franschhoek',
  'Hermanus',
  'Durbanville',
]
