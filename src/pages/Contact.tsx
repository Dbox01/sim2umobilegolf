import React from 'react'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import ContactForm from '../components/ContactForm'
import CoverageMap from '../components/CoverageMap'
import FaqAccordion from '../components/FaqAccordion'
import { PageHero, SectionHeading } from '../components/Primitives'
import { IMAGES } from '../data/images'
import { FAQS } from '../data/faqs'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_URL,
  TEL_HREF,
  WHATSAPP_URL,
} from '../data/site'

const CHANNELS = [
  {
    icon: <Phone size={26} />,
    label: 'Call Dylan',
    value: CONTACT_PHONE,
    href: TEL_HREF,
    note: 'Fastest for date checks',
  },
  {
    icon: <MessageCircle size={26} />,
    label: 'WhatsApp',
    value: 'Message Us',
    href: WHATSAPP_URL,
    note: 'Send photos of your space',
    external: true,
  },
  {
    icon: <Mail size={26} />,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    note: 'Best for detailed briefs',
  },
]

const Contact: React.FC = () => (
  <>
    <Seo
      title="Contact & FAQs | Book a Golf Simulator | Sim2U Western Cape"
      description="Check availability for mobile golf simulator hire in Cape Town, Somerset West and the Winelands. Answers on setup, space, deposits and weather."
      path="/contact"
      schema={[
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE_URL}/contact`,
          name: 'Contact Sim2U Mobile Golf',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        },
      ]}
    />

    <PageHero
      eyebrow="Contact & FAQs"
      title={
        <>
          Let&apos;s check
          <br />
          <span className="text-gold italic">your date.</span>
        </>
      }
      intro="Tell us when and where, and roughly how many guests. We reply to every enquiry within one business day — usually a lot sooner."
      image={IMAGES.contactHero}
    />

    {/* ------------------------------- Channels ------------------------------ */}
    <section className="py-16 md:py-20 px-6 bg-cream">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-5">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="bg-white p-8 rounded-[32px] border border-mountainGreen/5 shadow-[0_20px_50px_-35px_rgba(33,54,49,0.4)] hover:border-gold hover:-translate-y-1 transition-all duration-500 group flex items-start gap-5"
            >
              <div className="w-14 h-14 bg-gold rounded-2xl flex items-center justify-center text-mountainGreen shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                {c.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  {c.label}
                </p>
                <p className="text-mountainGreen font-serif text-xl mb-1 break-words">
                  {c.value}
                </p>
                <p className="text-gray-400 text-xs">{c.note}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* --------------------------- Form + coverage --------------------------- */}
    <section className="pb-24 md:pb-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>
        <div className="lg:col-span-2">
          <CoverageMap />
        </div>
      </div>
    </section>

    {/* ---------------------------------- FAQ -------------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Frequently Asked"
          title="The questions we get every week."
          subtitle="If yours isn't here, WhatsApp us — we'd rather answer it now than have you guess."
        />
        <FaqAccordion />
      </div>
    </section>
  </>
)

export default Contact
