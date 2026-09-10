import React from 'react'
import { Plus } from 'lucide-react'
import { FAQS, type Faq } from '../data/faqs'

/**
 * Built on <details>/<summary> so every answer is present in the
 * pre-rendered HTML and readable by crawlers with no JavaScript at all.
 * That is what makes the FAQPage schema on this page legitimate.
 */
const FaqAccordion: React.FC<{ items?: Faq[] }> = ({ items = FAQS }) => (
  <div className="space-y-4">
    {items.map((faq) => (
      <details
        key={faq.q}
        className="group bg-white rounded-3xl border border-mountainGreen/5 shadow-[0_10px_30px_-18px_rgba(33,54,49,0.25)] open:shadow-[0_20px_50px_-20px_rgba(33,54,49,0.25)] transition-shadow"
      >
        <summary className="flex items-start justify-between gap-6 cursor-pointer list-none p-7 md:p-8 [&::-webkit-details-marker]:hidden">
          <h3 className="text-lg md:text-xl font-serif text-mountainGreen leading-snug">
            {faq.q}
          </h3>
          <span className="flex-shrink-0 w-9 h-9 rounded-full bg-cream text-gold flex items-center justify-center transition-transform duration-300 group-open:rotate-45 group-open:bg-gold group-open:text-white">
            <Plus size={20} />
          </span>
        </summary>
        <div className="px-7 md:px-8 pb-8 -mt-2">
          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
        </div>
      </details>
    ))}
  </div>
)

export default FaqAccordion
