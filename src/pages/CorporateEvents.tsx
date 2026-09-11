import React from 'react'
import {
  BarChart3,
  Building2,
  CalendarCheck,
  Palette,
  Presentation,
  Trophy,
  Users,
} from 'lucide-react'
import Seo from '../components/Seo'
import ProofGrid from '../components/ProofGrid'
import { CTABand, FeatureCard, PageHero, SectionHeading } from '../components/Primitives'
import { CORPORATE_IMAGES } from '../data/gallery'
import { IMAGES } from '../data/images'
import { CORPORATE_TESTIMONIALS } from '../data/testimonials'
import { SITE_URL } from '../data/site'

const USE_CASES = [
  {
    icon: <Users size={32} />,
    title: 'Team Building',
    body: 'A shared activity that does not force anyone into a trust fall. Teams rotate through the bay, the leaderboard does the rest, and the competition runs itself.',
  },
  {
    icon: <Trophy size={32} />,
    title: 'Corporate Golf Days',
    body: 'Run a longest-drive or closest-to-the-pin contest alongside the main event, or bring the whole day indoors when the Cape weather refuses to cooperate.',
  },
  {
    icon: <Presentation size={32} />,
    title: 'Conferences & Trade Shows',
    body: 'A simulator bay stops foot traffic dead. Delegates queue for a swing, and your team gets a natural opening for a conversation that is not a cold pitch.',
  },
  {
    icon: <Building2 size={32} />,
    title: 'Brand Activations',
    body: 'Printed branding across the outdoor enclosure turns the bay into a stand people walk towards. The setup becomes the photo everyone posts.',
  },
]

const CorporateEvents: React.FC = () => (
  <>
    <Seo
      title="Corporate Golf Simulator Hire | Team Building & Events | Sim2U"
      description="Mobile golf simulator hire for corporate events in Cape Town and the Winelands. Live leaderboards, branded enclosure prints and team building people actually enjoy."
      path="/corporate-events"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Corporate golf simulator hire',
        serviceType: 'Corporate event entertainment',
        provider: { '@type': 'LocalBusiness', name: 'Sim2U Mobile Golf' },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Western Cape, South Africa',
        },
        url: `${SITE_URL}/corporate-events`,
      }}
    />

    <PageHero
      eyebrow="Corporate Events & Activations"
      title={
        <>
          Corporate golf that
          <br />
          <span className="text-gold italic">everyone joins in.</span>
        </>
      }
      intro="Team building, golf days, conference stands and brand activations across Cape Town and the Winelands — with live leaderboards, precision shot tracking and logistics you never have to think about."
      image={IMAGES.corporateHero}
      primary={{ label: 'Request a Quote', to: '/contact' }}
      secondary={{ label: 'See Packages', to: '/packages' }}
    />

    {/* --------------------------- The three pillars ------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-mountainGreen">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          dark
          eyebrow="What Sets It Apart"
          title="Three things that make it work in a business setting."
          subtitle="A simulator on its own is a novelty. These are what turn it into an event people talk about on Monday."
        />

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BarChart3 size={44} />}
            title="Live Leaderboards"
            body="Scoring runs live on the bay screen for the whole session, and the format that lands best is closest-to-the-pin on a world-famous par 3 — one shot, instant ranking, bragging rights settled. Add our live leaderboard and the standings follow your guests onto their own phones or a second screen anywhere at the venue, so the competition stays alive across the room."
          />
          <FeatureCard
            icon={<Palette size={44} />}
            title="Branded Enclosure Prints"
            body="Custom printed panels fitted to the outdoor enclosure — your logo, event branding or campaign artwork, sized and mounted by us. It turns the bay into the backdrop guests photograph. Artwork needs to reach us at least 10 business days out; we handle print and fitting."
          />
          <FeatureCard
            icon={<CalendarCheck size={44} />}
            title="Seamless Logistics"
            body="We arrive ahead of your start time, build the bay, calibrate it and test every mode before your first guest walks in. Our technician runs the session end to end. Pack-down happens once your guests have gone. Your team never touches a cable."
          />
        </div>
      </div>
    </section>

    {/* ------------------------------- Use cases ----------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Where It Fits"
          title="Four formats we run most often."
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {USE_CASES.map((item) => (
            <div
              key={item.title}
              className="bg-white p-9 md:p-10 rounded-[32px] border border-mountainGreen/5 shadow-[0_20px_50px_-30px_rgba(33,54,49,0.3)] hover:-translate-y-1 hover:border-gold/40 transition-all duration-500 group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif text-mountainGreen mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* --------------------------- Photos & reviews -------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Proof"
          title="Corporate events we've run."
          subtitle="Photographs from real bookings, and what the people who booked them said afterwards."
        />
        <ProofGrid
          quotes={CORPORATE_TESTIMONIALS}
          images={CORPORATE_IMAGES}
          context="corporate event"
        />
      </div>
    </section>

    <CTABand
      title="Tell us about your event."
      body="Send through your date, venue and delegate numbers and we'll come back with a fixed quote and a recommended format."
      primaryLabel="Request a Corporate Quote"
    />
  </>
)

export default CorporateEvents
