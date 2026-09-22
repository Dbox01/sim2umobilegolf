import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, MessageCircle, Phone, Send, X } from 'lucide-react'
import SocialIcons from './SocialLinks'
import {
  CONTACT_PHONE,
  FEATURED_LINK,
  LOGO_URL,
  NAV,
  QUOTE_LINK,
  TEL_HREF,
  WHATSAPP_URL,
  type NavEntry,
} from '../data/site'

/**
 * True only on devices that genuinely hover — a mouse or trackpad.
 *
 * Touchscreens fire a synthetic mouseenter on tap. With hover wired up
 * unconditionally, one tap on a touchscreen laptop opens the menu via
 * mouseenter and immediately closes it again via the click, so the menu can
 * never be opened at all. Gating the hover handlers on this is the fix.
 *
 * Starts false so the static build renders the tap-friendly version, then
 * upgrades on the client.
 */
function useHoverCapable(): boolean {
  const [canHover, setCanHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setCanHover(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return canHover
}

/**
 * One dropdown in the desktop bar.
 *
 * Opens on hover where hovering exists, and on click everywhere. Hover alone
 * is a trap: it is unreachable by keyboard and misfires on touch, so the
 * trigger is a real button and the hover is a convenience layered on top.
 *
 * The panel is wrapped in a padded container rather than offset with a margin.
 * A gap between the trigger and the panel would close the menu as the pointer
 * crossed it; padding keeps the hover target continuous.
 */
const NavDropdown: React.FC<{
  entry: Extract<NavEntry, { kind: 'group' }>
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}> = ({ entry, isOpen, onOpen, onClose, onToggle }) => {
  const { pathname } = useLocation()
  const canHover = useHoverCapable()
  const hasActiveChild = entry.items.some((i) => i.to === pathname)

  return (
    <div
      className="relative"
      {...(canHover ? { onMouseEnter: onOpen, onMouseLeave: onClose } : {})}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`text-sm font-semibold uppercase tracking-widest border-b-2 py-1 transition-all whitespace-nowrap flex items-center gap-1.5 ${
          hasActiveChild || isOpen
            ? 'text-gold border-gold'
            : 'text-white/80 border-transparent hover:text-gold hover:border-gold'
        }`}
      >
        {entry.name}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full pt-4 w-[19rem] z-50">
          <div className="bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(33,54,49,0.45)] border border-gold/25 p-2.5 animate-fadeIn">
            {entry.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 transition-colors ${
                    isActive ? 'bg-cream' : 'hover:bg-cream'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`block font-black text-[13px] uppercase tracking-wider ${
                        isActive ? 'text-gold' : 'text-mountainGreen'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="block text-[11.5px] text-gray-500 mt-1 leading-snug normal-case tracking-normal font-medium">
                      {item.blurb}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  /** Which desktop dropdown is open, by name. Only ever one at a time. */
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setIsOpen(false), [pathname])

  // Close any open dropdown on navigation, on Escape, and on a click outside
  // the bar. Without the last two a menu opened by click has no way back.
  useEffect(() => setOpenMenu(null), [pathname])

  useEffect(() => {
    if (!openMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    const onClick = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [openMenu])

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
      <div
        ref={barRef}
        className="container mx-auto px-6 md:px-12 flex justify-between items-center gap-6"
      >
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
          {NAV.map((entry) =>
            entry.kind === 'group' ? (
              <NavDropdown
                key={entry.name}
                entry={entry}
                isOpen={openMenu === entry.name}
                onOpen={() => setOpenMenu(entry.name)}
                onClose={() => setOpenMenu(null)}
                onToggle={() =>
                  setOpenMenu((cur) => (cur === entry.name ? null : entry.name))
                }
              />
            ) : (
              <NavLink
                key={entry.to}
                to={entry.to}
                className={({ isActive }) =>
                  `text-sm font-semibold uppercase tracking-widest border-b-2 py-1 transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-gold border-gold'
                      : 'text-white/80 border-transparent hover:text-gold hover:border-gold'
                  }`
                }
              >
                {entry.name}
              </NavLink>
            ),
          )}

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
            {/* No dropdowns on mobile — a full-screen menu has room to show
                everything at once, and a tap-to-expand here would just hide
                pages behind an extra tap for no gain. The group names become
                quiet headings instead. */}
            {NAV.map((entry) =>
              entry.kind === 'group' ? (
                <div key={entry.name} className="space-y-4">
                  <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-gold/70">
                    {entry.name}
                  </span>
                  {entry.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `block text-3xl font-serif transition-colors ${
                          isActive ? 'text-gold' : 'text-white/60 hover:text-gold'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={entry.to}
                  to={entry.to}
                  className={({ isActive }) =>
                    `text-3xl font-serif transition-colors ${
                      isActive ? 'text-gold' : 'text-white/60 hover:text-gold'
                    }`
                  }
                >
                  {entry.name}
                </NavLink>
              ),
            )}
            <NavLink
              to={FEATURED_LINK.to}
              className={({ isActive }) =>
                `text-3xl font-serif transition-colors ${
                  isActive ? 'text-gold' : 'text-white/60 hover:text-gold'
                }`
              }
            >
              {FEATURED_LINK.name}
            </NavLink>
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
