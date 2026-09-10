import React from 'react'
import {
  BarChart3,
  Building2,
  CalendarCheck,
  Clock,
  Palette,
  Presentation,
  Trophy,
  Users,
} from 'lucide-react'
import Seo from '../components/Seo'
import Testimonials from '../components/Testimonials'
import { CTABand, FeatureCard, PageHero, SectionHeading } from '../components/Primitives'
import { EXPERIENCE_IMAGES } from '../data/gallery'
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
      image={EXPERIENCE_IMAGES[0]}
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
            body="Real-time scoring on screen for the whole session. Teams, departments or individuals — we agree the competition format before the doors open, keep the standings visible throughout, and announce the winners at the end with everyone watching."
          />
          <FeatureCard
            icon={<Palette size={44} />}
            title="Branded Enclosure Prints"
            body="Custom printed panels fitted to the outdoor enclosure — your logo, event branding or campaign artwork, sized and mounted by us. It turns the bay into the backdrop guests photograph. Artwork needs to reach us two weeks out; we handle print and fitting."
          />
          <FeatureCard
            icon={<CalendarCheck size={44} />}
            title="Seamless Logistics"
            body="We arrive around 90 minutes before your start, build, calibrate and test. Our technician runs the session end to end. Pack-down happens after your guests leave. Your team never touches a cable."
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

    {/* ------------------------------ Throughput ----------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-mountainGreen rounded-[48px] p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full -mr-40 -mt-40 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gold p-4 rounded-2xl text-mountainGreen shadow-xl">
                <Clock size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                Planning for guest numbers
              </h2>
            </div>

            <p className="text-white/60 leading-relaxed text-lg mb-10 max-w-3xl font-light">
              The most common planning mistake is underestimating throughput. One
              bay handles a party comfortably; a conference floor is a different
              problem. Rough numbers to budget against:
            </p>

            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { n: '30–40', l: 'Guests per bay', s: 'Over a 4-hour party format' },
                { n: '60+', l: 'Book a second bay', s: 'Keeps queues under control' },
                { n: '~90 min', l: 'Setup before start', s: 'Outside your booked hours' },
              ].map((stat) => (
                <div
                  key={stat.l}
                  className="bg-white/10 border border-white/10 rounded-3xl p-7"
                >
                  <p className="text-gold text-4xl font-black mb-2">{stat.n}</p>
                  <p className="text-white font-bold text-sm mb-1">{stat.l}</p>
                  <p className="text-white/40 text-xs">{stat.s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <Testimonials limit={6} heading="From corporate clients" />
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
