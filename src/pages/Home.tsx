import React from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Home as HomeIcon,
  Target,
  Tent,
  Trophy,
  Truck,
  Zap,
} from 'lucide-react'
import Seo from '../components/Seo'
import VideoReel from '../components/VideoReel'
import Testimonials from '../components/Testimonials'
import { CTABand, Eyebrow, PageHero, SectionHeading } from '../components/Primitives'
import { IMAGES } from '../data/images'
import { INCLUDED_IN_EVERY_PACKAGE, TIERS, priceFor } from '../data/packages'
import { CLIENT_LOGOS } from '../data/testimonials'
import { SITE_URL } from '../data/site'


/**
 * The three enclosure cards on the home page.
 *
 * Keyed by tier id so the name, tagline, price and dimensions all come from
 * packages.ts — the same source as the Packages page and the booking terms.
 * Only the things that are purely about the home page live here: which photo
 * to show and which page the card leads to.
 */
const ENCLOSURE_CARDS: Record<
  string,
  { icon: React.ReactNode; image: string; to: string; linkLabel: string }
> = {
  backyard: {
    icon: <HomeIcon size={30} />,
    image: IMAGES.homeBackyardCard,
    to: '/social-events',
    linkLabel: 'Parties at home',
  },
  outdoor: {
    icon: <Tent size={30} />,
    image: IMAGES.homeOutdoorCard,
    to: '/social-events',
    linkLabel: 'Weddings & big events',
  },
  corporate: {
    icon: <Building2 size={30} />,
    image: IMAGES.homeIndoorCard,
    to: '/corporate-events',
    linkLabel: 'Corporate & expos',
  },
}

const VALUE_PROPS = [
  {
    icon: <Truck size={28} />,
    title: 'We Come To You',
    body: 'Your venue, your garden, your conference floor. We arrive, build the bay, calibrate it and take it all away again. You do nothing.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Tour-Level Tech',
    body: 'Ball speed, spin and carry measured on every strike, played out across faithful recreations of famous championship courses. Real data, not an arcade game.',
  },
  {
    icon: <Trophy size={28} />,
    title: 'Run For You',
    body: 'A professional technician runs every session — keeping the rotation moving, coaching beginners and managing the leaderboard.',
  },
  {
    icon: <Target size={28} />,
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
      eyebrow="Western Cape · Mobile Golf Simulator Hire"
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
      image={IMAGES.homeHero}
      primary={{ label: 'View Packages', to: '/packages' }}
      secondary={{ label: 'Check Availability', to: '/contact' }}
    />

    {/* --------------------- Why Sim2U + the reel, together ------------------ */}
    {/* These were two stacked sections making the same argument — four reasons
        to book, then ninety seconds of footage proving them. Side by side, the
        reel is playing while you read the reasons, and the video sticks to the
        viewport on desktop so it stays in view for the whole column. */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          <div>
            <SectionHeading
              left
              eyebrow="Why Sim2U"
              title="A real golf experience, delivered."
              subtitle="Everything that makes a simulator worth having, packed into a van and built at your venue before your first guest arrives."
            />

            <div className="space-y-4">
              {VALUE_PROPS.map((prop) => (
                <div
                  key={prop.title}
                  className="bg-white p-6 md:p-7 rounded-3xl border border-mountainGreen/5 shadow-[0_20px_50px_-35px_rgba(33,54,49,0.35)] flex items-start gap-5 hover:border-gold/40 transition-colors group"
                >
                  <span className="text-gold flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {prop.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-serif text-mountainGreen mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {prop.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="mb-6">
              <Eyebrow>See It In Action</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-serif text-mountainGreen mt-4 leading-tight">
                Ninety seconds of what your guests get.
              </h2>
            </div>
            <VideoReel
              title="Sim2U Mobile Golf — event reel"
              caption="Setups, swings and leaderboards from events across the Winelands and Cape Town."
            />
          </div>
        </div>
      </div>
    </section>

    {/* ------------------------- Three ways to book -------------------------- */}
    {/* One section, not two. This used to be an audience split ("corporate vs
        social") sitting directly above a near-identical pricing grid of the
        same three enclosures. Merging them means a visitor sees the range,
        the feel and the number in one pass instead of the same three names
        twice. */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Three Ways To Book"
          title="One for every venue you have in mind."
          subtitle="A back garden, a wine estate or your own boardroom — same simulator, same technician, three enclosures sized to the space you have."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TIERS.map((tier) => {
            const card = ENCLOSURE_CARDS[tier.id]
            if (!card) return null
            return (
              <Link
                key={tier.id}
                to={card.to}
                className="group relative rounded-[36px] overflow-hidden min-h-[480px] flex items-end shadow-2xl"
              >
                <img
                  src={card.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Lighter than a full scrim: these are real photographs of the three
                    enclosures and the whole point of the card is that you can see
                    which one it is. Opaque at the bottom where the text sits,
                    clear at the top where the structure is. */}
                <div className="absolute inset-0 bg-gradient-to-t from-mountainGreen via-mountainGreen/75 to-transparent" />

                {tier.popular && (
                  <span className="absolute top-6 right-6 z-20 bg-gold text-mountainGreen text-[10px] px-4 py-1.5 rounded-full font-black tracking-widest uppercase shadow-lg">
                    Most Booked
                  </span>
                )}

                <div className="relative z-10 p-8 md:p-9 w-full">
                  <div className="text-gold mb-4">{card.icon}</div>

                  <h3 className="text-2xl lg:text-3xl font-serif text-white mb-3 leading-tight">
                    {tier.name}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    {tier.tagline}
                  </p>

                  <div className="flex items-end justify-between gap-4 pb-5 mb-5 border-b border-white/20">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-1">
                        {tier.isCustomQuote ? 'On Quote' : `From (${tier.minHours} hrs)`}
                      </p>
                      <p className="text-3xl font-black text-white leading-none">
                        {priceFor(tier, tier.minHours)}
                      </p>
                    </div>
                    {/* No `uppercase` here: it renders "2.5m" as "2.5M",
                        which is a megametre. Metres are lowercase. */}
                    <p className="text-[11px] font-bold tracking-wide text-white/45 text-right leading-snug">
                      {tier.specs.h} high
                      <br />
                      {tier.specs.w} &times; {tier.specs.d}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2.5 text-gold font-black uppercase tracking-[0.15em] text-[11px]">
                    {card.linkLabel}
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1.5 transition-transform"
                    />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>

    {/* -------------------------- What's included ---------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
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
