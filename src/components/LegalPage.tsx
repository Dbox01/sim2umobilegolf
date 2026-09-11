import React from 'react'
import { FileText, Ruler } from 'lucide-react'
import { CTABand, Eyebrow } from '../components/Primitives'
import { SITE_CLEARANCES, type TermsClause, type TermsItem } from '../data/terms'

/**
 * Shared chrome for the legal pages (/terms and /privacy).
 *
 * Deliberately NOT a PageHero. Every other page opens on a photograph because
 * it is selling something; these are the contract and the data policy, and a
 * legal document that arrives behind a marketing image reads as though the
 * terms are part of the pitch. Text-first, high contrast, generous line length.
 */

const Item: React.FC<{ item: TermsItem }> = ({ item }) => (
  <li className="flex gap-4">
    <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
    <p className="text-gray-600 leading-relaxed">
      {item.label && (
        <strong className="text-mountainGreen font-bold">{item.label}: </strong>
      )}
      {item.body}
    </p>
  </li>
)

/**
 * Clause 2 of the booking terms carries the per-enclosure clearances. Showing
 * them as a table is the whole point — the agreement used to carry one blanket
 * minimum that was larger than two of the three setups we actually sell.
 */
const ClearanceTable: React.FC = () => (
  <div className="mb-7 rounded-3xl border border-gold/30 overflow-hidden">
    <div className="bg-mountainGreen px-6 py-4 flex items-center gap-3">
      <Ruler size={18} className="text-gold flex-shrink-0" />
      <h3 className="text-white font-black text-[11px] uppercase tracking-[0.2em]">
        Minimum clear space by setup
      </h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[420px]">
        <thead>
          <tr className="bg-cream text-mountainGreen">
            {['Setup', 'Width', 'Depth', 'Height'].map((head) => (
              <th
                key={head}
                className="text-left font-black uppercase tracking-widest text-[10px] px-6 py-3"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SITE_CLEARANCES.map((row) => (
            <tr key={row.name} className="border-t border-gold/15">
              <td className="px-6 py-4 font-bold text-mountainGreen">{row.name}</td>
              <td className="px-6 py-4 text-gray-600">{row.width}</td>
              <td className="px-6 py-4 text-gray-600">{row.depth}</td>
              <td className="px-6 py-4 text-gray-600">{row.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export interface LegalHighlight {
  title: string
  body: string
  icon: React.ReactNode
}

interface LegalPageProps {
  eyebrow: string
  title: string
  intro: string
  lastUpdated: string
  clauses: TermsClause[]
  highlights?: LegalHighlight[]
  /** Rendered in a cream card below the last clause. */
  closing: React.ReactNode
  cta: { title: string; body: string; primaryLabel: string }
}

const LegalPage: React.FC<LegalPageProps> = ({
  eyebrow,
  title,
  intro,
  lastUpdated,
  clauses,
  highlights,
  closing,
  cta,
}) => (
  <>
    {/* ------------------------------- Masthead ------------------------------ */}
    <header className="bg-mountainGreen pt-36 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gold/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-8">
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl">
          {intro}
        </p>
        <div className="mt-8 inline-flex items-center gap-3 bg-white/[0.07] border border-white/15 rounded-full px-5 py-2.5">
          <FileText size={16} className="text-gold" />
          <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">
            Last updated {lastUpdated}
          </span>
        </div>
      </div>
    </header>

    {/* ------------------------------ Highlights ----------------------------- */}
    {/* The handful of points people scroll looking for. Full clauses below. */}
    {highlights && highlights.length > 0 && (
      <section className="py-16 md:py-20 px-6 bg-cream">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-3 gap-5">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="bg-white rounded-3xl p-7 border border-gold/25 flex items-start gap-4"
            >
              <span className="text-gold flex-shrink-0 mt-0.5">{h.icon}</span>
              <div>
                <h2 className="font-black text-mountainGreen text-xs uppercase tracking-widest mb-2">
                  {h.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* -------------------------------- Clauses ------------------------------ */}
    <section className="py-16 md:py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Contents — sticky on desktop, a plain list on mobile. */}
        <nav
          aria-label="Contents"
          className="mb-12 lg:mb-0 lg:sticky lg:top-28 lg:self-start"
        >
          <h2 className="font-black text-mountainGreen text-[11px] uppercase tracking-[0.2em] mb-5">
            Contents
          </h2>
          <ol className="space-y-3">
            {clauses.map((clause) => (
              <li key={clause.id}>
                <a
                  href={`#${clause.id}`}
                  className="text-gray-500 hover:text-gold text-sm leading-snug transition-colors flex gap-2"
                >
                  <span className="text-gold/70 font-bold">{clause.number}.</span>
                  {clause.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-14">
          {clauses.map((clause) => (
            <article key={clause.id} id={clause.id} className="scroll-mt-28">
              <h2 className="text-2xl md:text-3xl font-serif text-mountainGreen mb-5 leading-tight">
                <span className="text-gold">{clause.number}.</span> {clause.title}
              </h2>

              {clause.intro && (
                <p className="text-gray-600 leading-relaxed mb-6">{clause.intro}</p>
              )}

              {clause.showClearances && <ClearanceTable />}

              {clause.body && (
                <p className="text-gray-600 leading-relaxed">{clause.body}</p>
              )}

              {clause.items && (
                <ul className="space-y-4">
                  {clause.items.map((item, i) => (
                    <Item key={i} item={item} />
                  ))}
                </ul>
              )}

              {clause.subsections && (
                <div className="space-y-9 mt-2">
                  {clause.subsections.map((sub) => (
                    <div key={sub.number}>
                      <h3 className="font-black text-mountainGreen text-xs uppercase tracking-widest mb-4">
                        {sub.number} {sub.title}
                      </h3>
                      {sub.intro && (
                        <p className="text-gray-600 leading-relaxed mb-5">
                          {sub.intro}
                        </p>
                      )}
                      {sub.body && (
                        <p className="text-gray-600 leading-relaxed">{sub.body}</p>
                      )}
                      {sub.items && (
                        <ul className="space-y-4">
                          {sub.items.map((item, i) => (
                            <Item key={i} item={item} />
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}

          <div className="bg-cream rounded-3xl p-8 border border-gold/25">{closing}</div>
        </div>
      </div>
    </section>

    <CTABand title={cta.title} body={cta.body} primaryLabel={cta.primaryLabel} />
  </>
)

export default LegalPage
