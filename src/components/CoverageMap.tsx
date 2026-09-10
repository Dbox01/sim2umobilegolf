import React from 'react'
import { MapPin, Navigation, Truck } from 'lucide-react'
import { SERVICE_AREAS } from '../data/site'
import { TRAVEL_POLICY } from '../data/packages'

/**
 * Service-area panel. Deliberately not a third-party map embed — an iframe
 * here would cost a render-blocking round trip and leak visitors to Google
 * on a page whose entire job is conversion.
 */
const CoverageMap: React.FC = () => (
  <div className="bg-mountainGreen rounded-[40px] p-10 md:p-14 shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-72 h-72 bg-gold/10 rounded-full -mr-36 -mt-36 blur-3xl" />

    <div className="relative z-10">
      <div className="flex items-start gap-5 mb-10">
        <div className="bg-gold p-4 rounded-2xl text-mountainGreen shadow-xl flex-shrink-0">
          <Navigation size={28} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">
            Where We Operate
          </h2>
          <p className="text-white/50 text-sm uppercase tracking-widest font-bold">
            Western Cape, South Africa
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-10">
        {SERVICE_AREAS.map((area) => (
          <div
            key={area}
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 hover:border-gold/50 transition-colors"
          >
            <MapPin size={16} className="text-gold flex-shrink-0" />
            <span className="text-white font-semibold text-sm">{area}</span>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-start gap-5">
          <div className="bg-gold/20 p-3 rounded-2xl text-gold flex-shrink-0">
            <Truck size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-2">Travel &amp; Logistics</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Distances are measured from {TRAVEL_POLICY.origin}. Outside the
              areas listed above? Ask anyway — we travel further for full-day and
              multi-day bookings.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">
                  First {TRAVEL_POLICY.freeRadius}
                </p>
                <p className="text-white font-bold text-xl">100% FREE</p>
              </div>
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">
                  Thereafter
                </p>
                <p className="text-white font-bold text-xl">{TRAVEL_POLICY.rate}</p>
                <p className="text-white/40 text-[10px] mt-1 font-bold italic uppercase">
                  {TRAVEL_POLICY.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CoverageMap
