import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Nav from './Nav'
import Footer from './Footer'
import { WHATSAPP_URL } from '../data/site'

/** SPA navigation doesn't reset scroll position on its own. */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const Layout: React.FC = () => (
  <div className="bg-cream selection:bg-gold selection:text-mountainGreen overflow-x-hidden min-h-screen flex flex-col">
    <ScrollToTop />
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
