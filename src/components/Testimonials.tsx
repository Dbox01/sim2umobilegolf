import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '../data/testimonials'

const Testimonials: React.FC<{ limit?: number; heading?: string }> = ({
  limit,
  heading = 'What our clients say',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const items = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({
      left: direction === 'left' ? -el.offsetWidth : el.offsetWidth,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-end mb-8 px-2 gap-6">
        <h2 className="text-3xl md:text-4xl font-serif text-mountainGreen">
          {heading}
        </h2>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => scroll('left')}
            className="bg-white hover:bg-gold hover:text-white text-mountainGreen p-3 rounded-full shadow-sm hover:shadow-md transition-all border border-mountainGreen/5"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-white hover:bg-gold hover:text-white text-mountainGreen p-3 rounded-full shadow-sm hover:shadow-md transition-all border border-mountainGreen/5"
            aria-label="Next testimonials"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 no-scrollbar items-stretch"
      >
        {items.map((t, idx) => (
          <blockquote
            key={idx}
            className="w-[85%] sm:w-[60%] lg:w-[calc(33.333%-1.35rem)] flex-shrink-0 snap-start"
          >
            <div className="relative h-full flex flex-col justify-between p-9 bg-white rounded-[32px] border border-mountainGreen/[0.04] shadow-[0_15px_30px_-10px_rgba(33,54,49,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(197,160,89,0.18)] transition-all duration-500 hover:-translate-y-2">
              <span className="absolute top-3 left-6 text-8xl font-serif text-gold/15 select-none pointer-events-none leading-none">
                &ldquo;
              </span>

              <div className="relative z-10">
                <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold text-lg" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 italic text-base leading-relaxed font-medium mb-6">
                  {t.quote}
                </p>

                {t.photo && (
                  <div className="w-full mb-6 rounded-2xl overflow-hidden border border-mountainGreen/5 h-44">
                    <img
                      src={t.photo}
                      alt={`Sim2U at ${t.author}'s event`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <footer className="pt-6 border-t border-mountainGreen/5 mt-auto">
                <cite className="not-italic">
                  <span className="text-mountainGreen font-black uppercase tracking-wider text-sm block">
                    {t.author}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold mt-1 block">
                    {t.role}
                    {t.location ? ` — ${t.location}` : ''}
                  </span>
                </cite>
              </footer>
            </div>
          </blockquote>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
