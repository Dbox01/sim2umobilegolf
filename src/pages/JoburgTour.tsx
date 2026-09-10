import React from 'react'
import { CalendarClock, Flame, MapPin, Timer, Trophy, Users } from 'lucide-react'
import Seo from '../components/Seo'
import LeadCaptureForm from '../components/LeadCaptureForm'
import Testimonials from '../components/Testimonials'
import { Eyebrow, SectionHeading } from '../components/Primitives'
import { EXPERIENCE_IMAGES } from '../data/gallery'
import { SITE_URL } from '../data/site'

/**
 * NOTE FOR DYLAN: the tour month, year and slot count below are placeholders.
 * Replace them with real numbers before this page goes live — scarcity claims
 * that turn out to be untrue do more damage than no scarcity at all.
 */
const TOUR = {
  window: 'One month only',
  month: 'March 2027',
  slotsNote: 'Limited event slots',
  areas: ['Sandton', 'Rosebank', 'Midrand', 'Pretoria East', 'Fourways', 'Centurion'],
}

const JoburgTour: React.FC = () => (
  <>
    <Seo
      title="Golf Simulator Hire Johannesburg | Sim2U Joburg Tour"
      description="Sim2U brings its mobile golf simulators to Gauteng for one month a year. Register for priority access to Johannesburg and Pretoria event dates before they open."
      path="/joburg-tour"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'Sim2U Joburg Tour',
        description:
          'Annual one-month mobile golf simulator pop-up tour across Johannesburg and Pretoria.',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Gauteng, South Africa',
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'Gauteng',
            addressCountry: 'ZA',
          },
        },
        organizer: { '@type': 'Organization', name: 'Sim2U Mobile Golf' },
        url: `${SITE_URL}/joburg-tour`,
      }}
    />

    {/* --------------------------------- Hero -------------------------------- */}
    <header className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon via-mountainGreen to-mountainGreen z-10 opacity-95" />
        <div className="absolute inset-0 bg-black/40 z-[11]" />
        <img
          src={EXPERIENCE_IMAGES[15]}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-105 animate-slowZoom"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-white animate-fadeInUp">
            <div className="inline-flex items-center gap-3 bg-gold text-mountainGreen px-5 py-2.5 rounded-full mb-8 shadow-xl">
              <Flame size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                {TOUR.window} · {TOUR.month}
              </span>
            </div>

            <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter leading-[1.05] drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)]">
              We&apos;re bringing
              <br />
              Sim2U to Joburg.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer bg-[length:200%_auto] italic">
                Get priority access.
              </span>
            </h1>

            <p className="text-lg md:text-2xl mb-10 font-medium text-white/90 max-w-2xl leading-relaxed drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              Once a year we load the whole operation into a truck and run a
              one-month stint in Gauteng. Dates go to our priority list first, and
              they go quickly.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: <Timer size={20} />, label: TOUR.window },
                { icon: <CalendarClock size={20} />, label: TOUR.month },
                { icon: <Trophy size={20} />, label: TOUR.slotsNote },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-3"
                >
                  <span className="text-gold flex-shrink-0">{item.icon}</span>
                  <span className="text-white font-bold text-sm">{item.label}</span>
                </div>
              ))}
            </div>

            <a
              href="#priority-access"
              className="inline-flex items-center gap-3 bg-gold text-mountainGreen px-10 py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-sm hover:bg-white transition-all shadow-2xl"
            >
              Get Priority Access
            </a>
          </div>

          <div className="lg:pl-8">
            <LeadCaptureForm anchorId="priority-access" />
          </div>
        </div>
      </div>
    </header>

    {/* ------------------------------ Why it matters -------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How The Tour Works"
          title="One month. Then the truck goes home."
          subtitle="This is not a permanent Gauteng operation. Everything below is why the dates fill the way they do."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Timer size={36} />,
              title: 'A Fixed Window',
              body: 'The full rig — enclosures, launch monitors, screens and our technician — is in Gauteng for four weeks, then it returns to the Cape. There is no overflow week and no second visit.',
            },
            {
              icon: <Users size={36} />,
              title: 'Priority List First',
              body: 'Before dates are advertised anywhere, everyone on the priority list gets an email with the calendar and first choice of slots. Most of the month is committed before it goes public.',
            },
            {
              icon: <MapPin size={36} />,
              title: 'Across Gauteng',
              body: 'Johannesburg, Pretoria and everything between. Same enclosures, same tech and the same technician running your event as our Western Cape bookings get.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white p-9 md:p-10 rounded-[32px] border border-mountainGreen/5 shadow-[0_20px_50px_-30px_rgba(33,54,49,0.3)] hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-serif text-mountainGreen mb-4">
                {item.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* --------------------------------- Areas -------------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-mountainGreen">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="flex justify-center mb-6">
          <Eyebrow dark>Areas We Cover</Eyebrow>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-12 leading-tight">
          Johannesburg, Pretoria
          <br />
          and everything between.
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TOUR.areas.map((area) => (
            <span
              key={area}
              className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"
            >
              <MapPin size={14} className="text-gold" />
              {area}
            </span>
          ))}
        </div>

        <p className="text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
          Not on the list? Register anyway and tell us where you are. If enough
          requests come from one area we route the tour through it.
        </p>
      </div>
    </section>

    {/* ------------------------------ Testimonials ---------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <Testimonials limit={6} heading="What Cape clients said" />
      </div>
    </section>

    {/* ------------------------------ Closing CTA ----------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-mountainGreen mb-6 leading-tight">
            Get on the list before the dates open.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            It takes thirty seconds, costs nothing and commits you to nothing —
            but it does put you ahead of everyone who waits for the announcement.
          </p>
        </div>
        <LeadCaptureForm />
      </div>
    </section>
  </>
)

export default JoburgTour
