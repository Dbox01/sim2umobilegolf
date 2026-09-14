/**
 * ============================================================
 *  WHERE DID THIS ENQUIRY COME FROM?
 * ============================================================
 *
 * Google Analytics answers that in monthly totals, and only for the visitors
 * it is allowed to watch — ad blockers and privacy browsers stop the script
 * but not the enquiry. This file answers it per enquiry, in the email, for
 * everyone, because it rides along with the form post itself.
 *
 * So the quote email stops saying "someone enquired" and starts saying
 * "someone who first arrived from the Instagram bio link a week ago, and was
 * reading the Packages page when they filled this in".
 *
 * ------------------------------------------------------------
 *  FIRST TOUCH AND LAST TOUCH — BOTH, ON PURPOSE
 * ------------------------------------------------------------
 * Someone sees a reel, visits, thinks about it for a week, then Googles
 * "sim2u" and enquires. First touch says Instagram; last touch says Google.
 * Both are true and they answer different questions — first touch tells you
 * what to keep spending on, last touch tells you what closed it. Reporting
 * only one of them is how a channel gets wrongly killed.
 *
 * First touch is kept for 90 days. Beyond that the link between the first
 * visit and the enquiry is too thin to claim, and a stale campaign name in an
 * email is worse than no campaign name.
 */

const KEY = 'sim2u_attr_v1'
const SESSION_KEY = 'sim2u_visit_v1'
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000

interface Touch {
  /** e.g. "instagram", "google", "facebook.com", or "direct" */
  source: string
  /** e.g. "social", "organic", "paid_social", "referral", "none" */
  medium: string
  campaign?: string
  content?: string
  /** Where they landed on that visit. */
  landing: string
  referrer?: string
  at: string
}

interface Stored {
  first: Touch
  savedAt: number
}

/** Safe storage access — private mode and blocked cookies both throw. */
function readStore(): Stored | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Stored
    if (!parsed?.first || Date.now() - parsed.savedAt > NINETY_DAYS) return null
    return parsed
  } catch {
    return null
  }
}

function writeStore(value: Stored): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // Storage unavailable. The current visit is still described from the URL
    // below, so the enquiry keeps its last-touch source and only loses the
    // first-touch history.
  }
}

/**
 * Work out where this particular visit came from.
 *
 * UTM tags win when present, because they are what we chose to put on our own
 * links. Otherwise we fall back to reading the referring domain, which is how
 * an untagged Instagram or Google visit still gets named rather than being
 * dumped into "direct".
 */
function currentTouch(): Touch {
  const params = new URLSearchParams(window.location.search)
  const utmSource = params.get('utm_source')
  const referrer = document.referrer || ''
  let host = ''
  try {
    host = referrer ? new URL(referrer).hostname.replace(/^www\./, '') : ''
  } catch {
    host = ''
  }

  // A referrer on our own domain is internal navigation, not a new arrival.
  const external = host && host !== window.location.hostname

  let source = 'direct'
  let medium = 'none'

  if (utmSource) {
    source = utmSource
    medium = params.get('utm_medium') || 'unknown'
  } else if (external) {
    source = host
    // Named rather than guessed: these are the referrers that actually matter
    // for this business, and anything else is honestly labelled a referral.
    if (/instagram|facebook|fb\.|l\.facebook|lm\.facebook/.test(host)) medium = 'social'
    else if (/google|bing|duckduckgo|yahoo|ecosia/.test(host)) medium = 'organic'
    else medium = 'referral'
  }

  return {
    source,
    medium,
    campaign: params.get('utm_campaign') || undefined,
    content: params.get('utm_content') || undefined,
    landing: window.location.pathname,
    referrer: external ? referrer : undefined,
    at: new Date().toISOString(),
  }
}

/**
 * This visit's entry point, frozen at arrival.
 *
 * It has to be frozen. A visitor lands on "/?utm_source=instagram", clicks
 * through to Packages and then Contact, and by the time they submit, the URL
 * carries no tags and document.referrer is our own site — read it then and
 * every Instagram lead is labelled "direct". Which is precisely what the first
 * version of this file did, and why this function exists.
 */
function readVisit(): Touch | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as Touch) : null
  } catch {
    return null
  }
}

/**
 * Record where this visit came from, and — if we have never seen this person
 * before — where they first ever came from.
 *
 * Called once, by Layout, on mount: early enough that the UTM tags are still
 * on the URL and the referrer still points off-site.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return

  const touch = currentTouch()

  // This visit — written once per browser session/tab.
  try {
    if (!window.sessionStorage.getItem(SESSION_KEY)) {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(touch))
    }
  } catch {
    // No session storage. attributionFields falls back to reading the URL,
    // which is right on a single-page visit and wrong after navigating —
    // degraded, but never blocking the enquiry.
  }

  // First ever touch — kept across visits for 90 days.
  if (!readStore()) writeStore({ first: touch, savedAt: Date.now() })
}

function describe(t: Touch): string {
  const bits = [t.source, t.medium]
  if (t.campaign) bits.push(t.campaign)
  return bits.filter(Boolean).join(' / ')
}

/**
 * The fields attached to every enquiry. Plain, readable keys, because these
 * are read by a person in an email, not by a machine.
 */
export function attributionFields(): Record<string, string> {
  if (typeof window === 'undefined') return {}

  // The visit's entry point, not wherever they happen to be standing when
  // they hit send.
  const now = readVisit() ?? currentTouch()
  const stored = readStore()
  const first = stored?.first

  const fields: Record<string, string> = {
    'Came from': describe(now),
    'Landed on': now.landing,
  }

  if (now.referrer) fields['Referring link'] = now.referrer

  if (first && describe(first) !== describe(now)) {
    fields['First came from'] = describe(first)
    fields['First visit'] = new Date(first.at).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } else if (first) {
    fields['First visit'] = new Date(first.at).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return fields
}

/** The same summary, for tagging the Analytics event. */
export function attributionSummary(): { source: string; medium: string; campaign?: string } {
  if (typeof window === 'undefined') return { source: 'unknown', medium: 'unknown' }
  const t = readVisit() ?? currentTouch()
  return { source: t.source, medium: t.medium, campaign: t.campaign }
}
