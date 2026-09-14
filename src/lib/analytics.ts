/**
 * ============================================================
 *  CONVERSION TRACKING
 * ============================================================
 *
 * Until this file existed, Google Analytics could tell us how many people
 * arrived and nothing at all about how many of them made contact. Every "key
 * events" figure in six months of reporting was zero.
 *
 * These are the three things worth counting:
 *
 *   generate_lead      someone submitted the quote form
 *   contact_phone      someone tapped the phone number
 *   contact_whatsapp   someone opened WhatsApp from the site
 *
 * `generate_lead` is one of Google's own recommended event names, so GA
 * understands it without being told. The other two are ours.
 *
 * ------------------------------------------------------------
 *  WHY EVERYTHING HERE IS DEFENSIVE
 * ------------------------------------------------------------
 * Analytics is never allowed to break the website. gtag is absent during
 * local development, absent on any preview build (index.html only loads it on
 * the live hostname), and blocked outright for a meaningful share of real
 * visitors by ad blockers and privacy browsers. All of those are normal, not
 * faults — so every path here is a silent no-op rather than an error.
 *
 * The practical consequence, worth knowing before comparing numbers: GA will
 * always under-count against the Formspree inbox, because a blocked visitor
 * still sends the enquiry. Treat the Formspree inbox as the truth for "how
 * many enquiries", and GA as the truth for "which pages and channels produce
 * them".
 */

type TrackParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: TrackParams) => void
  }
}

export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return // static build, no browser
  const gtag = window.gtag
  if (typeof gtag !== 'function') return // dev, preview, or blocked

  try {
    gtag('event', event, params)
  } catch {
    // Swallowed on purpose. A failed measurement call must never surface to
    // someone trying to book a golf simulator.
  }
}

/**
 * One document-level click listener instead of an onClick on every phone and
 * WhatsApp link across the nav, the mobile menu, the footer, the floating
 * button and the contact page.
 *
 * Delegation matters here beyond tidiness: any link added to the site later is
 * counted automatically, with no chance of someone adding a "call us" button
 * in six months and quietly losing the data.
 *
 * Registered once by Layout. Returns its own cleanup.
 */
export function trackOutboundContactClicks(): () => void {
  if (typeof document === 'undefined') return () => {}

  const onClick = (e: MouseEvent) => {
    const target = e.target as Element | null
    const link = target?.closest?.('a')
    if (!link) return

    const href = link.getAttribute('href') || ''
    // Where on the site the click happened — this is the whole point. It tells
    // you whether the Packages page or the Corporate page actually drives
    // contact, which no amount of pageview data can.
    const from = window.location.pathname

    if (href.startsWith('tel:')) {
      track('contact_phone', { method: 'phone', page_path: from })
    } else if (href.includes('wa.me') || href.includes('whatsapp.com')) {
      track('contact_whatsapp', { method: 'whatsapp', page_path: from })
    }
  }

  // Capture phase: the click is recorded even if something downstream stops
  // propagation, and before the browser hands off to the phone or WhatsApp app.
  document.addEventListener('click', onClick, true)
  return () => document.removeEventListener('click', onClick, true)
}
