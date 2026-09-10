import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Clock, Maximize } from 'lucide-react'
import { TIERS, priceFor } from '../data/packages'

const PricingTiers: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const tier = TIERS[activeTab]
  const [hours, setHours] = useState(tier.minHours)

  const selectTier = (idx: number) => {
    setActiveTab(idx)
    setHours(TIERS[idx].minHours)
  }

  const price = priceFor(tier, hours)

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
        {TIERS.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => selectTier(idx)}
            className={`relative px-6 md:px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs md:text-sm transition-all duration-300 ${
              activeTab === idx
                ? 'bg-mountainGreen text-white shadow-xl shadow-mountainGreen/20 scale-105'
                : 'bg-white text-gray-400 hover:bg-gold/10 hover:text-mountainGreen border border-gray-200'
            }`}
          >
            {t.name}
            {t.popular && (
              <span className="absolute -top-2 -right-2 bg-gold text-mountainGreen text-[9px] px-2 py-0.5 rounded-full font-black tracking-tight">
                POPULAR
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-mountainGreen/5 flex flex-col lg:flex-row animate-fadeIn">
        <div className="lg:w-1/2 relative min-h-[280px] lg:min-h-[560px] bg-mountainGreen/5">
          <img
            src={tier.image}
            alt={`${tier.name} golf simulator enclosure`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent lg:hidden" />
          <h3 className="absolute bottom-6 left-6 text-3xl font-serif text-white lg:hidden">
            {tier.name}
          </h3>
        </div>

        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between gap-8">
          <div>
            <h3 className="hidden lg:block text-4xl font-serif text-mountainGreen mb-3">
              {tier.name}
            </h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-6">
              {tier.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {tier.bestFor.map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-black uppercase tracking-widest bg-cream text-mountainGreen px-3 py-1.5 rounded-full border border-gold/20"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="bg-cream/60 p-6 rounded-2xl border border-gold/20">
              <div className="flex items-center gap-2 mb-4">
                <Maximize size={18} className="text-gold" />
                <span className="font-bold text-mountainGreen text-xs uppercase tracking-widest">
                  Space Required
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {(
                  [
                    ['Height', tier.specs.h],
                    ['Width', tier.specs.w],
                    ['Depth', tier.specs.d],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <p className="text-mountainGreen font-black text-lg">{value}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gold" />
              <span className="font-bold text-mountainGreen text-xs uppercase tracking-widest">
                Select Duration
              </span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {tier.durations.map((h) => (
                <button
                  key={h}
                  onClick={() => setHours(h)}
                  className={`flex-1 py-3 px-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all min-w-[64px] border-2 ${
                    hours === h
                      ? 'bg-gold text-mountainGreen border-gold shadow-md'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-gold/40'
                  }`}
                >
                  {tier.isCustomQuote
                    ? h === 4
                      ? 'Half Day'
                      : 'Full Day'
                    : `${h} Hrs`}
                </button>
              ))}
            </div>

            <div className="pt-5 border-t border-gray-100 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                  {tier.isCustomQuote ? 'Custom Rate' : 'Total Investment'}
                </p>
                <div className="text-3xl md:text-4xl font-black text-mountainGreen">
                  {price}
                </div>
                {!tier.isCustomQuote && (
                  <p className="text-[10px] text-gray-400 mt-1 font-semibold uppercase tracking-wider">
                    Excludes travel beyond 20km
                  </p>
                )}
              </div>

              <Link
                to="/contact"
                className="bg-mountainGreen text-white px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.1em] hover:bg-maroon hover:scale-105 transition-all shadow-xl shadow-mountainGreen/20 flex items-center gap-2"
              >
                Book <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PricingTiers
