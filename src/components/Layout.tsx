import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Nav from './Nav'
import Footer from './Footer'
import { WHATSAPP_URL } from '../data/site'
import { trackOutboundContactClicks } from '../lib/analytics'

/**
 * Counts taps on phone and WhatsApp links anywhere on the site.
 *
 * Mounted here rather than on each link: one listener covers the nav, the
 * mobile menu, the footer, the floating button and the contact page, and keeps
 * covering any link added later.
 */
const ContactClickTracking: React.FC = () => {
  useEffect(() => trackOutboundContactClicks(), [])
  return null
}

/**
 * SPA navigation doesn't reset scroll position on its own.
 *
 * Honours a hash when there is one (/how-it-works#technology), otherwise goes
 * to the top. Without the hash branch, a deep link would land at the top of
 * the page and the anchor would look broken.
 */
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame: the lazy-loaded page may not be in the DOM yet.
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else window.scrollTo(0, 0)
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

/**
 * Note the wrapper uses overflow-x-CLIP, not overflow-x-hidden.
 *
 * `overflow-x: hidden` computes `overflow-y` to `auto`, which turns this div
 * into a scroll container — and a `position: sticky` descendant then sticks to
 * this box instead of the viewport. That silently killed the contents sidebar
 * on /terms. `clip` does the same visual job without creating the scroll box,
 * so do not "simplify" it back to hidden.
 */
const Layout: React.FC = () => (
  <div className="bg-cream selection:bg-gold selection:text-mountainGreen overflow-x-clip min-h-screen flex flex-col">
    <ScrollToTop />
    <ContactClickTracking />
    <Nav />

    <main className="flex-1">
      <Outlet />
    </main>

    <Footer />

    {/* Persistent WhatsApp CTA */}
    <div className="fixed bottom-6 left-6 z-[70]">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group relative"
        aria-label="WhatsApp Sim2U"
      >
        <MessageCircle size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[180px] transition-all duration-500 whitespace-nowrap font-bold text-sm">
          WhatsApp Us
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-[#25D366] animate-pulse" />
      </a>
    </div>
  </div>
)

export default Layout
