import React from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import LegalPage from '../components/LegalPage'
import { PRIVACY_CLAUSES, PRIVACY_LAST_UPDATED } from '../data/terms'
import { CONTACT_EMAIL, SITE_URL } from '../data/site'

const Privacy: React.FC = () => (
  <>
    <Seo
      title="Privacy Policy | Sim2U Mobile Golf"
      description="What Sim2U Mobile Golf collects when you enquire, what we use it for, who else sees it, how long we keep it and how to have it deleted."
      path="/privacy"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy',
        url: `${SITE_URL}/privacy`,
        description: 'Privacy policy for Sim2U Mobile Golf.',
        publisher: { '@type': 'Organization', name: 'Sim2U Mobile Golf' },
      }}
    />

    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="A short policy, because we run a short list. We collect what you type into a form on this site, use it to quote and run your event, and nothing else."
      lastUpdated={PRIVACY_LAST_UPDATED}
      clauses={PRIVACY_CLAUSES}
      cta={{
        title: 'Rather just talk to a person?',
        body: 'Send us your date and venue and we will come back to you. No list, no follow-up sequence — just an answer.',
        primaryLabel: 'Get In Touch',
      }}
      closing={
        <>
          <h2 className="font-black text-mountainGreen text-xs uppercase tracking-widest mb-3">
            Contact us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about this policy, or want your details removed? Email{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-mountainGreen font-bold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            . Our{' '}
            <Link
              to="/terms"
              className="text-mountainGreen font-bold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold transition-colors"
            >
              booking terms
            </Link>{' '}
            cover the rest of the arrangement.
          </p>
        </>
      }
    />
  </>
)

export default Privacy
