import React from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  CheckCircle2,
  ChevronRight,
  PartyPopper,
  Target,
  Trophy,
  Truck,
  Zap,
} from 'lucide-react'
import Seo from '../components/Seo'
import VideoReel from '../components/VideoReel'
import Testimonials from '../components/Testimonials'
import { CTABand, Eyebrow, PageHero, SectionHeading } from '../components/Primitives'
import { EXPERIENCE_IMAGES, HERO_IMAGE } from '../data/gallery'
import { INCLUDED_IN_EVERY_PACKAGE, TIERS, priceFor } from '../data/packages'
import { CLIENT_LOGOS } from '../data/testimonials'
import { SITE_URL } from '../data/site'

const VALUE_PROPS = [
  {
    icon: <Truck size={40} />,
    title: 'We Come To You',
    body: 'Your venue, your garden, your conference floor. We arrive, build the bay, calibrate it and take it all away again. You do nothing.',
  },
  {
    icon: <Zap size={40} />,
    title: 'Tour-Level Tech',
    body: 'Ball speed, spin and carry measured on every strike, played out across faithful recreations of famous championship courses. Real data, not an arcade game.',
  },
  {
    icon: <Trophy size={40} />,
    title: 'Run For You',
    body: 'A professional technician runs every session — keeping the rotation moving, coaching beginners and managing the leaderboard.',
  },
  {
    icon: <Target size={40} />,
    title: 'Anyone Can Play',
    body: 'Multiplayer games and skills challenges built for complete beginners. In practice the non-golfers have the best time.',
  },
]

const Home: React.FC = () => (
  <>
    <Seo
      title="Mobile Golf Simulator Hire | Cape Town & Winelands | Sim2U"
      description="Premium mobile golf simulator hire across the Western Cape. Corporate events, team building, weddings and private parties — we deliver, set up and run the whole experience."
      path="/"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Mobile golf simulator hire',
        provider: { '@type': 'LocalBusiness', name: 'Sim2U Mobile Golf' },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Western Cape, South Africa',
        },
        url: SITE_URL,
      }}
    />

    <PageHero
      tall
      eyebrow="Western Cape · Mobile Golf Simulators"
      title={
        <>
          Mobile Golf
          <br />
          Simulator Hire
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer bg-[length:200%_auto] italic">
            In The Western Cape.
          </span>
        </>
      }
      intro="We bring a full golf simulator — the tech, the courses and the competition — directly to your corporate event, wedding or private party. You host. We run it."
      image={HERO_IMAGE}
      primary={{ label: 'View Packages', to: '/packages' }}
      secondary={{ label: 'Check Availability', to: '/contact' }}
    />

    {/* ------------------------------ Value props ---------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Sim2U"
          title="A real golf experience, delivered."
          subtitle="Everything that makes a simulator worth having, packed into a van and set up at your venue in under 90 minutes."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PROPS.map((prop) => (
            <div
              key={prop.title}
              className="bg-white p-9 rounded-[32px] border border-mountainGreen/5 shadow-[0_20px_50px_-30px_rgba(33,54,49,0.3)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgba(197,160,89,0.35)] transition-all duration-500 group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                {prop.icon}
              </div>
              <h3 className="text-2xl font-serif text-mountainGreen mb-4">
                {prop.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">{prop.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ------------------------------- Video reel ---------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="See It In Action"
          title="Ninety seconds of what your guests get."
          subtitle="Setups, swings and leaderboards from events across the Winelands and Cape Town."
        />
        <VideoReel
          poster={EXPERIENCE_IMAGES[5]}
          title="Sim2U Mobile Golf — event reel"
          caption="Add your reel's YouTube ID in VideoReel to switch this on."
        />
      </div>
    </section>

    {/* --------------------------- Who it's for split ------------------------ */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Two Ways To Book"
          title="Built for boardrooms and back gardens."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Briefcase size={32} />,
              title: 'Corporate Events',
              body: 'Team building, golf days, conferences and trade show stands. Live leaderboards, optional branded enclosure prints and logistics that do not need managing.',
              to: '/corporate-events',
              image: EXPERIENCE_IMAGES[0],
            },
            {
              icon: <PartyPopper size={32} />,
              title: 'Private Parties',
              body: 'Birthdays, bachelor parties, weddings and braais. Multiplayer games the whole family can play, indoors or in your garden.',
              to: '/private-parties',
              image: EXPERIENCE_IMAGES[4],
            },
          ].map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group relative rounded-[40px] overflow-hidden min-h-[440px] flex items-end shadow-2xl"
            >
              <img
                src={card.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mountainGreen via-mountainGreen/70 to-transparent" />

              <div className="relative z-10 p-10 md:p-12">
                <div className="text-gold mb-5">{card.icon}</div>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                  {card.body}
                </p>
                <span className="inline-flex items-center gap-3 text-gold font-black uppercase tracking-[0.2em] text-xs">
                  Explore
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* -------------------------- Package snapshot --------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Packages"
          title="Three setups. Transparent pricing."
          subtitle="Most bookings run a minimum of four hours, with a three-hour option for backyard setups."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-[32px] p-9 border transition-all duration-500 hover:-translate-y-2 ${
                tier.popular
                  ? 'bg-mountainGreen border-gold shadow-2xl'
                  : 'bg-cream border-mountainGreen/5 hover:border-gold/40'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-9 bg-gold text-mountainGreen text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest uppercase">
                  Most Booked
                </span>
              )}

              <h3
                className={`text-2xl font-serif mb-3 ${
                  tier.popular ? 'text-white' : 'text-mountainGreen'
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-7 ${
                  tier.popular ? 'text-white/60' : 'text-gray-500'
                }`}
              >
                {tier.tagline}
              </p>

              <div className="mb-7">
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                    tier.popular ? 'text-gold' : 'text-gray-400'
                  }`}
                >
                  {tier.isCustomQuote ? 'On Quote' : `From (${tier.minHours} hrs)`}
                </p>
                <p
                  className={`text-4xl font-black ${
                    tier.popular ? 'text-white' : 'text-mountainGreen'
                  }`}
                >
                  {priceFor(tier, tier.minHours)}
                </p>
              </div>

              <div
                className={`text-xs font-bold uppercase tracking-widest ${
                  tier.popular ? 'text-white/40' : 'text-gray-400'
                }`}
              >
                {tier.specs.h} H · {tier.specs.w} W · {tier.specs.d} D
              </div>
            </div>
          ))}
        </div>

        <div className="bg-cream rounded-[40px] p-10 md:p-14 border border-mountainGreen/5">
          <h3 className="text-2xl md:text-3xl font-serif text-mountainGreen mb-2 text-center">
            Every Package Includes
          </h3>
          <p className="text-gray-400 uppercase tracking-widest text-[10px] font-bold text-center mb-10">
            The Sim2U Standard
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {INCLUDED_IN_EVERY_PACKAGE.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-mountainGreen/5"
              >
                <CheckCircle2 className="text-gold flex-shrink-0" size={22} />
                <span className="text-mountainGreen font-medium text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/packages"
              className="group inline-flex items-center gap-3 bg-mountainGreen text-white px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-mountainGreen transition-all shadow-xl"
            >
              See full pricing
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ------------------------ Clients + testimonials ----------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Eyebrow>Trusted By</Eyebrow>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {CLIENT_LOGOS.map((client, i) => (
              <span
                key={i}
                className="text-mountainGreen/30 font-serif text-xl md:text-2xl italic tracking-tight"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        <Testimonials limit={6} />
      </div>
    </section>

    <CTABand
      title="Let's get your date in the book."
      body="Tell us where you are, when it is and roughly how many guests. We'll come back with an exact price — usually the same day."
    />
  </>
)

export default Home
