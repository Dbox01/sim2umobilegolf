import React from 'react'
import { CheckCircle2, PlusCircle, Truck, Wind } from 'lucide-react'
import Seo from '../components/Seo'
import PricingTiers from '../components/PricingTiers'
import { CTABand, PageHero, SectionHeading, StatCard } from '../components/Primitives'
import { EXPERIENCE_IMAGES } from '../data/gallery'
import {
  ADD_ONS,
  INCLUDED_IN_EVERY_PACKAGE,
  TIERS,
  TRAVEL_POLICY,
  WEATHER_POLICY,
  formatRand,
  priceFor,
} from '../data/packages'
import { PLAY_MODES, TRACKING_TECH } from '../data/tech'
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
          price: tier.id === 'backyard' ? 3500 : tier.basePrice,
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
      image={EXPERIENCE_IMAGES[1]}
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
      </div>
    </section>

    {/* --------------------------- Included in every -------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Standard On Every Booking"
          title="What the price already covers."
          subtitle="No line items for setup, no charge for the technician, no equipment hire on top."
        />

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {INCLUDED_IN_EVERY_PACKAGE.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 bg-cream p-6 rounded-2xl border border-mountainGreen/5 hover:border-gold/40 transition-colors"
            >
              <CheckCircle2 className="text-gold flex-shrink-0" size={24} />
              <span className="text-mountainGreen font-medium">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-mountainGreen rounded-[40px] p-10 md:p-14">
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">
            The technology that comes with it
          </h3>
          <p className="text-white/50 mb-10 max-w-2xl leading-relaxed">
            We match the tracking system to your venue and format, and calibrate
            it on site. Every booking runs on professional equipment — never a
            consumer toy.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {TRACKING_TECH.map((hw) => (
              <div
                key={hw.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/50 transition-colors"
              >
                <p className="text-gold text-[10px] font-black uppercase tracking-widest mb-2">
                  {hw.role}
                </p>
                <p className="text-white font-bold">{hw.name}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {PLAY_MODES.map((sw) => (
              <div
                key={sw.name}
                className="bg-gold/10 border border-gold/30 rounded-2xl p-6"
              >
                <p className="text-gold text-[10px] font-black uppercase tracking-widest mb-2">
                  {sw.role}
                </p>
                <p className="text-white font-bold">{sw.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* --------------------------------- Add-ons ------------------------------ */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Optional Extra"
          title="One add-on, quoted per event."
          subtitle="Added at the time of booking and quoted alongside your package."
        />

        <div className="max-w-3xl mx-auto">
          {ADD_ONS.map((addon) => (
            <div
              key={addon.name}
              className="bg-white p-9 md:p-12 rounded-[36px] border border-gold/25 shadow-[0_30px_70px_-40px_rgba(33,54,49,0.5)] flex flex-col sm:flex-row gap-8"
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
            <p className="text-white/60 leading-relaxed mb-8 font-light">
              Our equipment is high-end electronics in an outdoor enclosure, so we
              hold firm limits. If conditions force a cancellation, you reschedule
              at no extra cost.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <StatCard
                label="Max Wind"
                value={WEATHER_POLICY.maxWind}
                note={WEATHER_POLICY.windNote}
              />
              <StatCard
                label="Rain Policy"
                value={WEATHER_POLICY.rain}
                note={WEATHER_POLICY.rainNote}
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ------------------------------ Quick table ---------------------------- */}
    <section className="pb-24 md:pb-32 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-serif text-mountainGreen mb-8 text-center">
          At a glance
        </h2>
        <div className="overflow-x-auto rounded-[28px] border border-mountainGreen/10">
          <table className="w-full min-w-[560px] text-left bg-white">
            <thead>
              <tr className="bg-cream">
                {['Setup', 'Minimum', 'From', 'Extra hour', 'Footprint'].map((h) => (
                  <th
                    key={h}
                    className="p-5 text-[10px] font-black uppercase tracking-widest text-mountainGreen"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIERS.map((tier) => (
                <tr key={tier.id} className="border-t border-mountainGreen/5">
                  <td className="p-5 font-bold text-mountainGreen">{tier.name}</td>
                  <td className="p-5 text-gray-500 text-sm">
                    {tier.isCustomQuote ? 'Half day' : `${tier.minHours} hrs`}
                  </td>
                  <td className="p-5 text-gold font-black">
                    {priceFor(tier, tier.minHours)}
                  </td>
                  <td className="p-5 text-gray-500 text-sm">
                    {tier.isCustomQuote
                      ? 'On quote'
                      : formatRand(tier.hourlyRate)}
                  </td>
                  <td className="p-5 text-gray-500 text-sm whitespace-nowrap">
                    {tier.specs.h} × {tier.specs.w} × {tier.specs.d}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <CTABand
      title="Ready for an exact number?"
      body="Send your date, venue and guest count. We'll confirm the package, add travel and give you a fixed price in writing."
      primaryLabel="Get My Quote"
    />
  </>
)

export default Packages
