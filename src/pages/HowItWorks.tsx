import React from 'react'
import {
  ClipboardCheck,
  Cpu,
  Maximize,
  MonitorPlay,
  PlayCircle,
  Plug,
  Truck,
} from 'lucide-react'
import Seo from '../components/Seo'
import { CTABand, FeatureCard, PageHero, SectionHeading } from '../components/Primitives'
import { EXPERIENCE_IMAGES } from '../data/gallery'
import {
  CAPABILITIES,
  PLAY_MODES,
  POWER_REQUIREMENT,
  SETUP_REQUIREMENTS,
  TRACKING_TECH,
} from '../data/tech'
import { SITE_URL } from '../data/site'

const STEPS = [
  {
    step: '01',
    title: 'You Book It',
    desc: 'Send us your date, venue and guest numbers. We confirm availability, quote a fixed price including travel, and hold the date on deposit.',
    icon: <ClipboardCheck size={26} />,
  },
  {
    step: '02',
    title: 'We Deliver & Set Up',
    desc: 'We arrive around 90 minutes before your start time, build the enclosure, calibrate the tracking system and test every game mode before a single guest arrives.',
    icon: <Truck size={26} />,
  },
  {
    step: '03',
    title: 'We Run The Whole Thing',
    desc: 'Our technician stays for the duration — setting up players, coaching beginners, managing the leaderboard and keeping the rotation moving. Then we pack it all away.',
    icon: <PlayCircle size={26} />,
  },
]

const HowItWorks: React.FC = () => (
  <>
    <Seo
      title="How It Works & Our Tech | Setup Requirements | Sim2U"
      description="What a mobile golf simulator needs on site: ceiling height, width, depth and power. Plus the tracking technology and course play behind every Sim2U booking."
      path="/how-it-works"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How Sim2U mobile golf simulator hire works',
        url: `${SITE_URL}/how-it-works`,
        step: STEPS.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.title,
          text: s.desc,
        })),
      }}
    />

    <PageHero
      eyebrow="How It Works & The Tech"
      title={
        <>
          What we need,
          <br />
          <span className="text-gold italic">and what we bring.</span>
        </>
      }
      intro="Three steps from enquiry to pack-down, the exact space and power the bay needs, and the tracking technology that makes the numbers on screen trustworthy."
      image={EXPERIENCE_IMAGES[2]}
      primary={{ label: 'Check My Space', to: '/contact' }}
    />

    {/* --------------------------------- Steps ------------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Seamless Logistics"
          title="Three steps. That's the whole process."
        />

        <div className="space-y-8 relative">
          <div className="absolute left-8 top-6 bottom-6 w-px bg-gold/30 hidden md:block" />
          {STEPS.map((item) => (
            <div key={item.step} className="flex gap-6 md:gap-8 relative z-10 group">
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gold shadow-xl group-hover:bg-gold group-hover:text-white transition-all duration-500 border border-gold/20">
                {item.icon}
              </div>
              <div className="pt-1">
                <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em] block mb-2">
                  Step {item.step}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-mountainGreen mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-2xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* --------------------------- Space requirements ------------------------ */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Site Requirements"
          title="Measure your ceiling first."
          subtitle="Height is the constraint that catches almost everyone out. Width and depth are usually fine; a low ceiling is not something we can work around."
        />

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {SETUP_REQUIREMENTS.map((req) => (
            <div
              key={req.name}
              className="bg-cream rounded-[32px] p-8 border border-mountainGreen/5 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <Maximize size={18} className="text-gold" />
                <h3 className="font-black text-mountainGreen text-sm uppercase tracking-widest">
                  {req.name}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {(
                  [
                    ['Height', req.height],
                    ['Width', req.width],
                    ['Depth', req.depth],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="bg-white rounded-2xl p-4 text-center">
                    <p className="text-mountainGreen font-black text-lg">{value}</p>
                    <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm leading-relaxed">{req.note}</p>
            </div>
          ))}
        </div>

        <div className="bg-mountainGreen rounded-[32px] p-8 md:p-10 flex flex-col sm:flex-row items-start gap-6">
          <div className="bg-gold p-4 rounded-2xl text-mountainGreen shadow-lg flex-shrink-0">
            <Plug size={26} />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-3">Power Access</h3>
            <p className="text-white/60 leading-relaxed">{POWER_REQUIREMENT}</p>
          </div>
        </div>
      </div>
    </section>

    {/* -------------------------------- Tracking ----------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-mountainGreen">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          dark
          eyebrow="The Tracking"
          title="Measured, not estimated."
          subtitle="Different spaces demand different tracking technology. We bring the system that will actually be accurate where you are putting us, and calibrate it on the day."
        />

        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {TRACKING_TECH.map((hw) => (
            <div
              key={hw.name}
              className="bg-white/5 border border-white/10 rounded-[32px] p-9 hover:border-gold transition-colors group"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-gold text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                    {hw.role}
                  </p>
                  <h3 className="text-2xl font-serif text-white">{hw.name}</h3>
                </div>
                <Cpu
                  size={28}
                  className="text-gold/40 flex-shrink-0 group-hover:text-gold transition-colors"
                />
              </div>
              <p className="text-white/55 leading-relaxed text-sm">{hw.detail}</p>
            </div>
          ))}
        </div>

        <SectionHeading
          dark
          eyebrow="On Screen"
          title="Where the golf actually happens."
        />

        <div className="grid sm:grid-cols-2 gap-6 mb-20">
          {PLAY_MODES.map((sw) => (
            <div
              key={sw.name}
              className="bg-gold/10 border border-gold/30 rounded-[32px] p-9"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-gold text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                    {sw.role}
                  </p>
                  <h3 className="text-2xl font-serif text-white">{sw.name}</h3>
                </div>
                <MonitorPlay size={28} className="text-gold flex-shrink-0" />
              </div>
              <p className="text-white/60 leading-relaxed text-sm">{sw.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap) => (
            <FeatureCard
              key={cap.title}
              icon={<Cpu size={40} />}
              title={cap.title}
              items={cap.items}
            />
          ))}
        </div>
      </div>
    </section>

    <CTABand
      title="Not sure your space works?"
      body="Send us your ceiling height and rough dimensions and we'll tell you straight away which enclosure fits — or whether it doesn't."
      primaryLabel="Ask About My Venue"
    />
  </>
)

export default HowItWorks
