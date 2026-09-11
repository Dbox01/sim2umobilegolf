import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FEATURED_LINK,
  LOGO_URL,
  NAV_LINKS,
  SERVICE_AREAS,
  TEL_HREF,
  WHATSAPP_URL,
} from '../data/site'

const Footer: React.FC = () => (
  <footer className="bg-mountainGreen pt-20 pb-12 px-6 relative overflow-hidden">
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

    <div className="container mx-auto max-w-7xl relative z-10">
      <div className="grid gap-12 lg:grid-cols-4 pb-14 border-b border-white/10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={LOGO_URL}
              alt="Sim2U Mobile Golf"
              className="w-16 h-16 object-contain"
              width={64}
              height={64}
            />
            <div className="flex flex-col -space-y-1">
              <span className="text-3xl font-serif font-black text-white tracking-tighter italic">
                Sim2U
              </span>
              <span className="text-[11px] text-gold font-bold uppercase tracking-[0.35em]">
                Mobile Golf
              </span>
            </div>
          </div>
          <p className="text-white/50 max-w-md leading-relaxed">
            Premium mobile golf simulator hire across the Western Cape. We bring the
            course, the tech and the competition to your venue — and run the whole
            thing for you.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={TEL_HREF}
              className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm font-semibold"
            >
              <Phone size={16} className="text-gold" />
              {CONTACT_PHONE}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm font-semibold"
            >
              <Mail size={16} className="text-gold" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6">
            Explore
          </h3>
          <ul className="space-y-3">
            {[...NAV_LINKS, FEATURED_LINK, { name: 'Contact', to: '/contact' }].map(
              (link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/50 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-6">
            Where We Operate
          </h3>
          <ul className="space-y-2">
            {SERVICE_AREAS.map((area) => (
              <li
                key={area}
                className="text-white/50 text-sm flex items-center gap-2"
              >
                <MapPin size={12} className="text-gold/60 flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-10 text-center md:text-left">
        <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Sim2U Mobile Golf. Western Cape, South Africa.
        </p>
        <div className="flex items-center gap-6">
          <Link
            to="/privacy"
            className="text-white/40 hover:text-gold text-sm transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-white/40 hover:text-gold text-sm transition-colors"
          >
            Booking Terms
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Sim2U"
            className="text-[#25D366] hover:brightness-125 transition-all"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
