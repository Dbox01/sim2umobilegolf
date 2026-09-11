import React from 'react'
import {
  BadgeCheck,
  CalendarX2,
  CheckCircle2,
  ChevronRight,
  Hand,
  PackageOpen,
  PlayCircle,
  Plug,
  PlusCircle,
  ShieldCheck,
  Truck,
  Wind,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PricingTiers from '../components/PricingTiers'
import SmallerSpacesNote from '../components/SmallerSpacesNote'
import { CTABand, PageHero, SectionHeading, StatCard } from '../components/Primitives'
import { IMAGES } from '../data/images'
import {
  ADD_ONS,
  CANCELLATION_POLICY,
  DEPOSIT,
  INCLUDED_IN_EVERY_PACKAGE,
  TIERS,
  TRAVEL_POLICY,
  WEATHER_POLICY,
} from '../data/packages'
import { SITE_URL } from '../data/site'

const Packages: React.FC = () => (
  <>
    <Seo
      title="Golf Simulator Hire Prices & Packages | Sim2U Western Cape"
      description="Transparent mobile golf simulator hire rates from R3,500. Three enclosure sizes, hourly pricing and what every booking includes, for events across the Western Cape."
      path="/packages"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Sim2U Mobile Golf hire packages',
        url: `${SITE_URL}/packages`,
        itemListElement: TIERS.filter((t) => !t.isCustomQuote).map((tier) => ({
          '@type': 'Offer',
          name: tier.name,
          description: tier.tagline,
          priceCurrency: 'ZAR',
          price: tier.basePrice,
          availability: 'https://schema.org/InStock',
          areaServed: 'Western Cape, South Africa',
        })),
      }}
    />

    <PageHero
      eyebrow="Packages & Rates"
      title={
        <>
          Clear pricing.
          <br />
          <span className="text-gold italic">No surprises on the day.</span>
        </>
      }
      intro="Three enclosure sizes, priced by the hour. Pick the setup that fits your venue, choose your duration, and the number you see is the number you pay — travel beyond 20km aside."
      image={IMAGES.packagesHero}
      primary={{ label: 'Request a Quote', to: '/contact' }}
    />

    {/* --------------------------- Interactive tiers ------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Choose Your Setup"
          title="Three enclosures. Pick your hours."
          subtitle="Most bookings run a minimum of four hours, with a three-hour option available for backyard setups."
        />
        <PricingTiers />

        <SmallerSpacesNote className="mt-10" />

        {/* The things worth knowing before you commit: how the date is held,
            what happens if it moves, and the two practical constraints that
            catch people out. All four match the booking terms — see
            src/data/terms.ts before changing any of the wording here. */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {[
            {
              icon: <ShieldCheck size={24} />,
              title: 'Securing your date',
              body: DEPOSIT.summary,
            },
            {
              icon: <Plug size={24} />,
              title: 'Power within 30m',
              body: 'We need a standard 220V plug point within 30 metres of where the bay will stand — that is the length of the industrial extension lead we bring. If your only outlet is further away, tell us when you enquire so we can plan for it.',
            },
            {
              icon: <Hand size={24} />,
              title: 'Right-handed clubs only',
              body: 'The club set we bring is right-handed. Left-handed guests are welcome to bring their own clubs — just let us know when you book so we can plan the bay around it.',
            },
            {
              icon: <CalendarX2 size={24} />,
              title: 'If the date has to move',
              body: `${CANCELLATION_POLICY.early} ${CANCELLATION_POLICY.late}`,
            },
          ].map((note) => (
            <div
              key={note.title}
              className="bg-white rounded-3xl p-7 border border-gold/25 flex items-start gap-4"
            >
              <span className="text-gold flex-shrink-0 mt-0.5">{note.icon}</span>
              <div>
                <h3 className="font-black text-mountainGreen text-xs uppercase tracking-widest mb-2">
                  {note.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{note.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ------------------------- What the price covers ------------------------ */}
    <section className="py-24 md:py-32 px-6 bg-mountainGreen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gold/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gold text-mountainGreen px-6 py-2.5 rounded-full mb-8 shadow-xl">
            <BadgeCheck size={18} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">
              No hidden costs
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
            One price.
            <br />
            <span className="text-gold italic">Everything in it.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed">
            The number on the calculator above is what you pay. Delivery, build,
            calibration, the technician who runs your whole session, and
            pack-down at the end are all inside it.
          </p>
        </div>

        {/* The three phases — this is the part people are actually worried about */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            {
              icon: <Truck size={30} />,
              step: 'Before',
              title: 'We deliver and build',
              body: 'Transport, assembly, calibration and testing — finished before your first guest arrives, outside your booked hours.',
            },
            {
              icon: <PlayCircle size={30} />,
              step: 'During',
              title: 'We run the session',
              body: 'A professional technician stays for the duration, setting up players, coaching beginners and keeping the rotation moving.',
            },
            {
              icon: <PackageOpen size={30} />,
              step: 'After',
              title: 'We pack it all down',
              body: 'Everything comes apart and goes back in the van once your guests have gone. Your venue is left exactly as we found it.',
            },
          ].map((phase) => (
            <div
              key={phase.step}
              className="bg-white/[0.06] border border-white/10 rounded-[32px] p-9 hover:border-gold/60 transition-colors group"
            >
              <div className="flex items-center justify-between mb-7">
                <span className="text-gold group-hover:scale-110 transition-transform">
                  {phase.icon}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25">
                  {phase.step}
                </span>
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{phase.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{phase.body}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-14">
          {INCLUDED_IN_EVERY_PACKAGE.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 bg-white/[0.04] border border-white/10 p-5 rounded-2xl"
            >
              <CheckCircle2 className="text-gold flex-shrink-0" size={20} />
              <span className="text-white/85 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
          No setup fee. No technician fee. No equipment hire on top. Travel
          beyond the first 20km is the one thing quoted separately, and we
          confirm it in writing before you commit. Anything else only ever
          applies in the situations set out in our{' '}
          <Link
            to="/terms"
            className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold transition-colors"
          >
            booking terms
          </Link>{' '}
          — a site that turns out to be unusable, or a pack-down the venue
          delays past the agreed time.
        </p>

        <div className="text-center mt-12">
          <Link
            to="/how-it-works#technology"
            className="group inline-flex items-center gap-3 border-2 border-gold/60 text-gold px-10 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs hover:bg-gold hover:text-mountainGreen transition-all"
          >
            See the technology we bring
            <ChevronRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>

    {/* --------------------------------- Add-ons ------------------------------ */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Optional Extras"
          title="Raise the stakes."
          subtitle="Two ways to make the day land harder — put your brand on the bay, or put the competition in everyone's pocket. Both quoted alongside your package."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {ADD_ONS.map((addon) => (
            <div
              key={addon.name}
              className="bg-white p-9 md:p-10 rounded-[36px] border border-gold/25 shadow-[0_30px_70px_-40px_rgba(33,54,49,0.5)] flex flex-col gap-6"
            >
              <div className="bg-gold/15 text-gold w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0">
                <PlusCircle size={30} />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 mb-4">
                  <h3 className="text-2xl md:text-3xl font-serif text-mountainGreen">
                    {addon.name}
                  </h3>
                  <span className="text-gold font-black text-xs uppercase tracking-[0.2em]">
                    {addon.price}
                  </span>
                </div>
                <p className="text-gray-500 leading-relaxed">{addon.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* -------------------------- Travel + weather --------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-8">
        <div className="bg-mountainGreen rounded-[40px] p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <div className="bg-gold p-5 rounded-3xl text-mountainGreen shadow-xl inline-flex mb-8">
              <Truck size={32} />
            </div>
            <h2 className="text-3xl font-serif text-white mb-4">
              Travel &amp; Logistics
            </h2>
            <p className="text-white/60 leading-relaxed mb-8 font-light">
              Distance is measured from {TRAVEL_POLICY.origin}. It is the only
              variable that sits outside the package price, and we confirm it in
              writing before you commit.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <StatCard
                label={`First ${TRAVEL_POLICY.freeRadius}`}
                value="100% Free"
              />
              <StatCard
                label="Thereafter"
                value={TRAVEL_POLICY.rate}
                note={TRAVEL_POLICY.note}
              />
            </div>
          </div>
        </div>

        <div className="bg-mountainGreen rounded-[40px] p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10">
            <div className="bg-gold p-5 rounded-3xl text-mountainGreen shadow-xl inline-flex mb-8">
              <Wind size={32} />
            </div>
            <h2 className="text-3xl font-serif text-white mb-4">
              Weather &amp; Safety
            </h2>
            {/* No wind speed here on purpose — see WEATHER_POLICY. The
                agreement makes this a judgement call, so a published number
                would be a threshold the contract does not contain. */}
            <p className="text-white/60 leading-relaxed mb-8 font-light">
              Our equipment is high-end electronics in an outdoor enclosure, so
              we stop for weather rather than risk it. What you get back depends
              on whether we have already built the bay.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <StatCard
                label="Wind"
                value={WEATHER_POLICY.maxWind}
                note={WEATHER_POLICY.windNote}
              />
              <StatCard
                label="Rain"
                value={WEATHER_POLICY.rain}
                note={WEATHER_POLICY.rainNote}
              />
            </div>
            <div className="mt-4">
              <StatCard
                label="Cancelled before we load"
                value={WEATHER_POLICY.refund}
                note={WEATHER_POLICY.refundNote}
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <CTABand
      title="Ready for an exact number?"
      body="Send your date, venue and guest count. We'll confirm the package, add travel and give you a fixed price in writing."
      primaryLabel="Get My Quote"
    />

    {/* Every quote carries the booking terms, so the page that sets the price
        should be one click from them. */}
    <section className="bg-white py-10 px-6">
      <p className="container mx-auto max-w-3xl text-center text-gray-500 text-sm leading-relaxed">
        Deposits, site requirements, cancellations and our weather policy are set
        out in full in our{' '}
        <Link
          to="/terms"
          className="text-mountainGreen font-bold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold transition-colors"
        >
          booking terms and conditions
        </Link>
        , which form part of every quote.
      </p>
    </section>
  </>
)

export default Packages
