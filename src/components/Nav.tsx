import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, MessageCircle, Phone, Send, X } from 'lucide-react'
import SocialIcons from './SocialLinks'
import {
  CONTACT_PHONE,
  FEATURED_LINK,
  LOGO_URL,
  NAV_LINKS,
  QUOTE_LINK,
  TEL_HREF,
  WHATSAPP_URL,
} from '../data/site'

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setIsOpen(false), [pathname])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const isHome = pathname === '/'
  // Interior pages have a light page background, so the bar needs a solid
  // ground from the start rather than only after scrolling.
  const solid = scrolled || !isHome

  return (
    <>
      {/* The mobile panel must NOT live inside <nav>. The bar uses
          backdrop-blur, and a backdrop-filter makes that element the
          containing block for any position:fixed descendant — which
          collapsed the full-screen menu to the height of the bar on every
          page where the bar is solid. Keeping it a sibling fixes that. */}
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        solid
          ? 'bg-mountainGreen/95 backdrop-blur-md py-3 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center gap-6">
        <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform overflow-hidden">
            <img
              src={LOGO_URL}
              alt="Sim2U Mobile Golf"
              className="w-full h-full object-contain"
              width={48}
              height={48}
            />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-serif font-black text-white tracking-tighter italic">
              Sim2U
            </span>
            <span className="text-[10px] text-gold font-bold uppercase tracking-[0.3em]">
              Mobile Golf
            </span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-widest border-b-2 py-1 transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-gold border-gold'
                    : 'text-white/80 border-transparent hover:text-gold hover:border-gold'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to={FEATURED_LINK.to}
            className={({ isActive }) =>
              `px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2 whitespace-nowrap ${
                isActive
                  ? 'bg-gold text-mountainGreen border-gold'
                  : 'border-gold/60 text-gold hover:bg-gold hover:text-mountainGreen'
              }`
            }
          >
            {FEATURED_LINK.name}
          </NavLink>

          <div className="flex items-center gap-2">
            {/* The social icons are the first thing to go when the bar gets
                tight — they are in the footer on every page, the quote button
                is not. Below 2xl they are hidden so the CTA always fits.
                Wrapped rather than passed a `hidden` class, because the
                component sets `flex` on its own root and the two would be
                fighting over `display`. */}
            <div className="hidden 2xl:block">
              <SocialIcons variant="nav" />
            </div>

            {/* Between 1280 and 1536 the bar cannot hold the number, the tour
                pill and the quote button without spilling past the container,
                so the number collapses to its icon there. Still one tap to
                call, and the full number is in the footer of every page. */}
            <a
              href={TEL_HREF}
              aria-label={`Call Sim2U on ${CONTACT_PHONE}`}
              title={CONTACT_PHONE}
              className="bg-maroon hover:bg-white hover:text-mountainGreen text-white p-2.5 2xl:pl-4 2xl:pr-5 rounded-full font-bold text-[13px] 2xl:text-sm flex items-center gap-2 transition-all shadow-xl ml-1 whitespace-nowrap"
            >
              <Phone size={16} />
              <span className="hidden 2xl:inline">{CONTACT_PHONE}</span>
            </a>

            <NavLink
              to={QUOTE_LINK.to}
              className="bg-gold text-mountainGreen hover:bg-white pl-4 pr-5 py-2.5 rounded-full font-black text-[13px] 2xl:text-sm flex items-center gap-2 transition-all shadow-xl whitespace-nowrap"
            >
              <Send size={16} />
              <span>{QUOTE_LINK.name}</span>
            </NavLink>
          </div>
        </div>

        {/* Mobile: the quote button sits in the BAR, not only inside the menu.
            Asking for a price is the one thing worth doing without opening a
            hamburger first. Short label on the narrowest phones so it never
            crowds the logo. */}
        <div className="xl:hidden flex items-center gap-2">
          <NavLink
            to={QUOTE_LINK.to}
            className="bg-gold text-mountainGreen font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-lg whitespace-nowrap"
          >
            <span className="hidden sm:inline">{QUOTE_LINK.name}</span>
            <span className="sm:hidden">{QUOTE_LINK.short}</span>
          </NavLink>

          <button
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu size={30} />
          </button>
        </div>
      </div>
    </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="xl:hidden bg-mountainGreen fixed inset-0 z-[100] flex flex-col p-8 sm:p-12 overflow-y-auto animate-fadeIn">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-3">
              <img
                src={LOGO_URL}
                alt=""
                className="w-12 h-12 object-contain"
                width={48}
                height={48}
              />
              <span className="text-3xl font-serif font-bold text-white tracking-tighter italic">
                Sim2U
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white"
              aria-label="Close menu"
            >
              <X size={36} />
            </button>
          </div>

          <div className="flex flex-col space-y-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-3xl font-serif transition-colors ${
                  isActive ? 'text-gold' : 'text-white/60 hover:text-gold'
                }`
              }
            >
              Home
            </NavLink>
            {[...NAV_LINKS, FEATURED_LINK].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-3xl font-serif transition-colors ${
                    isActive ? 'text-gold' : 'text-white/60 hover:text-gold'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to={QUOTE_LINK.to}
              className={({ isActive }) =>
                `text-3xl font-serif transition-colors ${
                  isActive ? 'text-gold' : 'text-white/60 hover:text-gold'
                }`
              }
            >
              {QUOTE_LINK.name}
            </NavLink>
          </div>

          <div className="mt-auto pt-12 space-y-4">
            <SocialIcons variant="menu" className="pb-2" />

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-black text-center text-xl flex items-center justify-center gap-3"
            >
              <MessageCircle size={24} />
              WHATSAPP US
            </a>
            <a
              href={TEL_HREF}
              className="w-full bg-gold text-mountainGreen py-5 rounded-2xl font-black text-center text-xl flex items-center justify-center gap-3"
            >
              <Phone size={24} />
              CALL NOW
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default Nav
