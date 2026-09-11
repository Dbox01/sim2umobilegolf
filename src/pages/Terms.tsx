import React from 'react'
import { Link } from 'react-router-dom'
import { CalendarX2, CloudRain, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'
import LegalPage, { type LegalHighlight } from '../components/LegalPage'
import {
  TERMS_CLAUSES,
  TERMS_HIGHLIGHTS,
  TERMS_LAST_UPDATED,
} from '../data/terms'
import { CONTACT_EMAIL, SITE_URL } from '../data/site'

/** Same order as TERMS_HIGHLIGHTS: deposit, cancellations, weather. */
const HIGHLIGHT_ICONS = [
  <ShieldCheck size={24} key="deposit" />,
  <CalendarX2 size={24} key="cancel" />,
  <CloudRain size={24} key="weather" />,
]

const highlights: LegalHighlight[] = TERMS_HIGHLIGHTS.map((h, i) => ({
  ...h,
  icon: HIGHLIGHT_ICONS[i] ?? <ShieldCheck size={24} />,
}))

const Terms: React.FC = () => (
  <>
    <Seo
      title="Booking Terms & Conditions | Sim2U Mobile Golf"
      description="The full booking terms for Sim2U Mobile Golf hire: deposits and payment, site requirements for each enclosure, cancellations, weather policy, liability and branding deadlines."
      path="/terms"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Booking Terms & Conditions',
        url: `${SITE_URL}/terms`,
        description:
          'Booking terms and conditions for Sim2U Mobile Golf simulator hire.',
        publisher: { '@type': 'Organization', name: 'Sim2U Mobile Golf' },
      }}
    />

    <LegalPage
      eyebrow="Booking Terms"
      title="Terms & Conditions"
      intro="These terms form part of every Sim2U quote. They cover what we bring, what your venue needs to provide, and what happens if a date or the weather changes."
      lastUpdated={TERMS_LAST_UPDATED}
      clauses={TERMS_CLAUSES}
      highlights={highlights}
      cta={{
        title: 'Ready to lock in a date?',
        body: "Send your date, venue and guest count and we'll come back with a fixed price in writing, with these terms attached.",
        primaryLabel: 'Request a Quote',
      }}
      closing={
        <>
          <h2 className="font-black text-mountainGreen text-xs uppercase tracking-widest mb-3">
            Questions about any of this
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If something here does not fit your venue or your date, tell us
            before you accept the quote rather than after — most of it can be
            planned around.{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-mountainGreen font-bold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            , or see the{' '}
            <Link
              to="/packages"
              className="text-mountainGreen font-bold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold transition-colors"
            >
              rates and packages
            </Link>
            .
          </p>
        </>
      }
    />
  </>
)

export default Terms
