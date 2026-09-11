import React, { useId } from 'react'
import { ArrowRight } from 'lucide-react'
import { useFormspree } from '../hooks/useFormspree'

const inputClass =
  'w-full bg-white/10 border-2 border-white/15 text-white p-4 rounded-2xl focus:border-gold focus:ring-0 outline-none transition-all placeholder:text-white/30'
const labelClass =
  'text-[10px] font-black uppercase tracking-widest text-gold ml-3 block mb-2'

/**
 * Sign-up for the Gauteng pop-up.
 *
 * The offer has to read in one pass: signing up is free, and the people on
 * the list get the dates by email before anyone else, with first choice of
 * slots. No jargon — not "priority access", not "waitlist".
 *
 * The page renders this twice, so field ids are namespaced with useId and
 * only the first instance claims the #sign-up anchor.
 */
const LeadCaptureForm: React.FC<{ anchorId?: string }> = ({ anchorId }) => {
  const { status, errorMessage, handleSubmit } = useFormspree()
  const uid = useId()
  const fid = (name: string) => `${uid}-${name}`

  return (
    <form
      onSubmit={handleSubmit}
      id={anchorId}
      className="bg-mountainGreen/80 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/15 rounded-full blur-3xl" />

      <div className="relative z-10 space-y-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">
            Get the dates first
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Signing up is free. When the Joburg dates are set, everyone on this
            list gets them by email before they go public — and first choice of
            slots. That is the whole deal. No cost, no commitment.
          </p>
        </div>

        {status === 'success' && (
          <div
            role="status"
            className="bg-gold/20 border border-gold/40 text-white p-5 rounded-2xl"
          >
            <p className="font-bold text-lg">You&apos;re on the list.</p>
            <p className="text-sm text-white/80">
              We&apos;ll email you the Joburg dates as soon as they&apos;re set —
              before anyone else sees them.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="bg-red-500/15 border border-red-400/40 text-white p-5 rounded-2xl"
          >
            <p className="font-bold text-lg">Couldn&apos;t send that.</p>
            <p className="text-sm text-white/80">{errorMessage}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor={fid('name')}>
              Full Name <span className="text-gold">*</span>
            </label>
            <input
              id={fid('name')}
              name="name"
              required
              placeholder="John Player"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor={fid('email')}>
              Email <span className="text-gold">*</span>
            </label>
            <input
              id={fid('email')}
              name="email"
              type="email"
              required
              placeholder="john@company.co.za"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor={fid('phone')}>
              Phone <span className="text-gold">*</span>
            </label>
            <input
              id={fid('phone')}
              name="phone"
              type="tel"
              required
              placeholder="082 123 4567"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor={fid('area')}>
              Area in Gauteng
            </label>
            <input
              id={fid('area')}
              name="area"
              placeholder="Sandton, Pretoria East, Midrand…"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor={fid('type')}>
              Event Type
            </label>
            <select id={fid('type')} name="event_type" className={inputClass}>
              <option className="text-mountainGreen">Corporate event</option>
              <option className="text-mountainGreen">Team building</option>
              <option className="text-mountainGreen">Golf day</option>
              <option className="text-mountainGreen">Private party</option>
              <option className="text-mountainGreen">Trade show</option>
              <option className="text-mountainGreen">Not sure yet</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor={fid('guests')}>
              Approx. Guests
            </label>
            <input
              id={fid('guests')}
              name="guest_count"
              placeholder="e.g. 60"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor={fid('dates')}>
            Any timing preference?
          </label>
          <input
            id={fid('dates')}
            name="preferred_dates"
            placeholder="Weekends suit us best, or midweek is fine"
            className={inputClass}
          />
        </div>

        <input
          type="hidden"
          name="_subject"
          value="Joburg Tour — sign-up"
        />
        <input type="hidden" name="lead_source" value="Joburg Tour sign-up" />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-gold text-mountainGreen font-black py-5 rounded-2xl hover:bg-white transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] uppercase tracking-[0.25em] text-sm flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending…' : 'Sign Up — Free'}
          <ArrowRight size={18} />
        </button>

        <p className="text-white/30 text-[10px] text-center uppercase tracking-widest font-bold">
          Free. No spam. One email when the dates are locked in.
        </p>
      </div>
    </form>
  )
}

export default LeadCaptureForm
