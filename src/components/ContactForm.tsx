import React from 'react'
import { Send } from 'lucide-react'
import { useFormspree } from '../hooks/useFormspree'

const inputClass =
  'w-full bg-cream border-2 border-transparent focus:border-gold/40 p-4 rounded-2xl focus:ring-0 outline-none transition-all placeholder:text-gray-300'
const labelClass =
  'text-[10px] font-black uppercase tracking-widest text-gray-400 ml-3 block mb-2'

const Field: React.FC<{
  label: string
  name: string
  children?: React.ReactNode
  type?: string
  placeholder?: string
  required?: boolean
  hint?: string
}> = ({ label, name, children, type = 'text', placeholder, required, hint }) => (
  <div>
    <label className={labelClass} htmlFor={name}>
      {label}
      {required && <span className="text-gold ml-1">*</span>}
    </label>
    {children ?? (
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    )}
    {hint && <p className="text-[10px] text-gray-400 mt-2 ml-3 italic">{hint}</p>}
  </div>
)

const ContactForm: React.FC = () => {
  const { status, errorMessage, handleSubmit } = useFormspree()

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 md:p-12 rounded-[40px] space-y-5 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-mountainGreen/5 rounded-full -mr-16 -mt-16 blur-3xl" />

      <div className="relative z-10 space-y-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-mountainGreen mb-2">
            Request a Quote
          </h2>
          <p className="text-gray-500 text-sm">
            The more you can tell us, the faster we can come back with an exact
            price. We reply to every enquiry within one business day.
          </p>
        </div>

        {status === 'success' && (
          <div
            role="status"
            className="bg-[#25D366]/10 border border-[#25D366]/30 text-mountainGreen p-5 rounded-2xl"
          >
            <p className="font-bold text-lg">Quote request sent.</p>
            <p className="text-sm">
              We&apos;ve got it and we&apos;ll be back to you shortly. If it&apos;s
              urgent, WhatsApp is the fastest way to reach us.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-800 p-5 rounded-2xl"
          >
            <p className="font-bold text-lg">Couldn&apos;t send that.</p>
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Full Name" name="name" required placeholder="John Player" />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            placeholder="john@company.co.za"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <Field
            label="Phone"
            name="phone"
            type="tel"
            required
            placeholder="082 123 4567"
          />
          <Field label="Event Date" name="event_date" type="date" required />
        </div>

        <Field
          label="Event Location"
          name="location"
          required
          placeholder="Venue or suburb — e.g. Lourensford Estate, Somerset West"
        />

        <div className="grid md:grid-cols-2 gap-5">
          <Field
            label="Guest Count"
            name="guest_count"
            required
            placeholder="e.g. 45"
          />
          <Field
            label="Available Space"
            name="dimensions"
            placeholder="Height x Width x Depth"
            hint="Ceiling height is the one that catches people out. Rough is fine."
          />
        </div>

        <Field label="Event Type" name="event_type">
          <select id="event_type" name="event_type" className={inputClass}>
            <option>Corporate event or activation</option>
            <option>Team building</option>
            <option>Golf day</option>
            <option>Trade show or conference</option>
            <option>Wedding</option>
            <option>Birthday party</option>
            <option>Private function at home</option>
            <option>Practice session</option>
            <option>Other</option>
          </select>
        </Field>

        <Field label="Anything else?" name="message">
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Indoor or outdoor, branding requirements, timings…"
            className={`${inputClass} resize-y`}
          />
        </Field>

        <input type="hidden" name="_subject" value="New Sim2U quote request" />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-mountainGreen text-white font-black py-5 rounded-2xl hover:bg-maroon transition-all shadow-xl hover:scale-[1.01] active:scale-[0.99] uppercase tracking-[0.25em] text-sm flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending…' : 'Request a Quote'}
          <Send size={18} className={status === 'submitting' ? 'animate-pulse' : ''} />
        </button>
      </div>
    </form>
  )
}

export default ContactForm
