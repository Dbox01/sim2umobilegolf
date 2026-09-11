import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { Testimonial } from '../data/testimonials'

interface ProofGridProps {
  quotes: Testimonial[]
  images: string[]
  /** Alt-text context, e.g. 'corporate event' */
  context: string
}

/**
 * Photos and written reviews in one mosaic.
 *
 * Built this way deliberately: there are only two corporate reviews, and a
 * carousel of two looks thin. Mixed into a grid of real event photography the
 * same two quotes read as evidence rather than as everything we could find.
 * Add more quotes here as they come in and the grid absorbs them.
 */
const ProofGrid: React.FC<ProofGridProps> = ({ quotes, images, context }) => {
  // Interleave so quotes land at visually spaced positions rather than
  // clumping at the front of the grid.
  const tiles: Array<
    { kind: 'quote'; data: Testimonial } | { kind: 'photo'; src: string }
  > = []
  const quotePositions = new Set([1, 5])
  let qi = 0
  let ii = 0
  const total = quotes.length + images.length

  for (let i = 0; i < total; i++) {
    if (quotePositions.has(i) && qi < quotes.length) {
      tiles.push({ kind: 'quote', data: quotes[qi++] })
    } else if (ii < images.length) {
      tiles.push({ kind: 'photo', src: images[ii++] })
    } else if (qi < quotes.length) {
      tiles.push({ kind: 'quote', data: quotes[qi++] })
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {tiles.map((tile, idx) =>
          tile.kind === 'photo' ? (
            <div
              key={`p-${idx}`}
              className="relative rounded-[28px] overflow-hidden aspect-[4/5] bg-mountainGreen/5 group"
            >
              <img
                src={tile.src}
                alt={`Sim2U mobile golf simulator at a ${context}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading={idx < 3 ? 'eager' : 'lazy'}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-mountainGreen/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ) : (
            <blockquote
              key={`q-${idx}`}
              className="relative rounded-[28px] bg-white border border-gold/25 p-8 md:p-9 flex flex-col justify-between shadow-[0_20px_50px_-30px_rgba(33,54,49,0.35)] min-h-[320px]"
            >
              <span className="absolute top-2 left-6 text-8xl font-serif text-gold/15 select-none pointer-events-none leading-none">
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
                <p className="text-gray-600 italic leading-relaxed font-medium">
                  {tile.data.quote}
                </p>
              </div>

              <footer className="pt-6 mt-6 border-t border-mountainGreen/5 relative z-10">
                <cite className="not-italic">
                  <span className="text-mountainGreen font-black uppercase tracking-wider text-sm block">
                    {tile.data.author}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold mt-1 block">
                    {tile.data.role}
                    {tile.data.location ? ` — ${tile.data.location}` : ''}
                  </span>
                </cite>
              </footer>
            </blockquote>
          ),
        )}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/gallery"
          className="group inline-flex items-center gap-3 text-mountainGreen font-black uppercase tracking-[0.2em] text-xs border-b-2 border-gold pb-2 hover:text-gold transition-colors"
        >
          See the full gallery
          <ChevronRight
            size={16}
            className="group-hover:translate-x-1.5 transition-transform"
          />
        </Link>
      </div>
    </div>
  )
}

export default ProofGrid
