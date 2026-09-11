import React from 'react'
import { Facebook, Instagram, MessageCircle } from 'lucide-react'
import { FACEBOOK_URL, INSTAGRAM_URL, WHATSAPP_URL } from '../data/site'

/**
 * Social links in each platform's own brand colour.
 *
 * Colour is what makes these readable at icon size — people recognise the
 * Instagram gradient and WhatsApp green before they parse the glyph. A row of
 * identical grey circles makes someone stop and look, which is the opposite of
 * what a 32px button should do.
 *
 * Single source of truth: the nav, the mobile menu and the Gallery page all
 * read from here, so the colours can never drift apart.
 */
export const SOCIAL_BRANDS = [
  {
    name: 'Instagram',
    href: INSTAGRAM_URL,
    label: 'Sim2U on Instagram',
    icon: Instagram,
    // The official Instagram gradient, corner to corner.
    brand:
      'bg-[linear-gradient(45deg,#FEDA75_0%,#FA7E1E_25%,#D62976_50%,#962FBF_75%,#4F5BD5_100%)]',
  },
  {
    name: 'Facebook',
    href: FACEBOOK_URL,
    label: 'Sim2U on Facebook',
    icon: Facebook,
    brand: 'bg-[#1877F2]',
  },
  {
    name: 'WhatsApp',
    href: WHATSAPP_URL,
    label: 'WhatsApp Sim2U',
    icon: MessageCircle,
    brand: 'bg-[#25D366]',
  },
]

interface SocialIconsProps {
  /** 'nav' is the compact top-bar row; 'menu' is the larger mobile-menu row. */
  variant?: 'nav' | 'menu'
  className?: string
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  variant = 'nav',
  className = '',
}) => {
  const box =
    variant === 'nav'
      ? 'w-8 h-8 2xl:w-9 2xl:h-9 rounded-full'
      : 'w-12 h-12 rounded-2xl'
  const glyph = variant === 'nav' ? 17 : 22

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SOCIAL_BRANDS.map(({ name, href, label, icon: Icon, brand }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`${box} ${brand} text-white flex items-center justify-center shadow-lg ring-1 ring-white/20 hover:scale-110 hover:ring-white/50 transition-all duration-200`}
        >
          <Icon size={glyph} />
        </a>
      ))}
    </div>
  )
}

export default SocialIcons
