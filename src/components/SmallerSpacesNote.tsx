import React from 'react'
import { HelpCircle } from 'lucide-react'
import { SMALLER_SPACES_NOTE } from '../data/tech'

/**
 * Shown wherever the site prints hard dimensions — the Site Requirements
 * section on How It Works, and under the pricing calculator on Packages.
 *
 * One component rather than the same paragraph typed twice, because the
 * wording is doing legal work as well as sales work: see the comment on
 * SMALLER_SPACES_NOTE in src/data/tech.ts before changing a word of it.
 */
const SmallerSpacesNote: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`bg-cream border border-gold/50 border-l-[6px] border-l-gold rounded-r-3xl p-7 md:p-8 flex items-start gap-5 ${className}`}
  >
    <span className="bg-gold text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
      <HelpCircle size={22} />
    </span>
    <div>
      <h3 className="font-serif text-xl md:text-2xl text-mountainGreen mb-2.5">
        {SMALLER_SPACES_NOTE.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{SMALLER_SPACES_NOTE.body}</p>
    </div>
  </div>
)

export default SmallerSpacesNote
