export const SITE_URL = 'https://sim2umobilegolf.co.za'
export const SITE_NAME = 'Sim2U Mobile Golf'
export const SOCIAL_IMAGE = `${SITE_URL}/social-preview.png`

export const CONTACT_PHONE = '083 318 2565'
export const CONTACT_PHONE_INTL = '+27 83 318 2565'
export const CONTACT_EMAIL = 'info@sim2umobilegolf.co.za'
export const WHATSAPP_URL = 'https://wa.me/27833182565'
export const TEL_HREF = `tel:${CONTACT_PHONE.replace(/\s/g, '')}`
export const FORMSPREE_URL = 'https://formspree.io/f/mwvoapnp'

export const LOGO_URL =
  'https://lh3.googleusercontent.com/d/1eXL8Q1M62yc2ztffpDIsa0hvm1_cONml'

/** Build-time flag. Only the production build is indexable. */
export const IS_PRODUCTION = import.meta.env.VITE_SITE_ENV === 'production'

export const NAV_LINKS = [
  { name: 'Corporate', to: '/corporate-events' },
  { name: 'Private Parties', to: '/private-parties' },
  { name: 'Packages', to: '/packages' },
  { name: 'How It Works', to: '/how-it-works' },
  { name: 'Gallery', to: '/gallery' },
]

/** Shown as a highlighted pill, separate from the main nav run. */
export const FEATURED_LINK = { name: 'Joburg Tour', to: '/joburg-tour' }

/** Drives sitemap.xml. Add a page here when you add a route. */
export const SITEMAP_ROUTES: { path: string; priority: string }[] = [
  { path: '/', priority: '1.0' },
  { path: '/corporate-events', priority: '0.9' },
  { path: '/private-parties', priority: '0.9' },
  { path: '/packages', priority: '0.9' },
  { path: '/how-it-works', priority: '0.7' },
  { path: '/gallery', priority: '0.6' },
  { path: '/joburg-tour', priority: '0.8' },
  { path: '/contact', priority: '0.8' },
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
