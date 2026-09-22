import React from 'react'
import { Link } from 'react-router-dom'
import {
  Gauge,
  Laptop,
  MessageSquare,
  Radar,
  Target,
  UserCheck,
} from 'lucide-react'
import Seo from '../components/Seo'
import { CTABand, Eyebrow, PageHero, SectionHeading } from '../components/Primitives'
import { byName } from '../data/gallery'
import { CONTACT_PHONE, SITE_URL, TEL_HREF } from '../data/site'

/**
 * ============================================================
 *  EQUIPMENT HIRE — the launch monitor on its own.
 * ============================================================
 *
 * This page exists because the phone kept ringing for it: golf days wanting
 * the launch monitor and someone to run it, with no enclosure involved.
 *
 * ------------------------------------------------------------
 *  TWO DELIBERATE DECISIONS, BOTH EASY TO UNDO BY ACCIDENT
 * ------------------------------------------------------------
 *
 * 1. NO PRICES. Every one of these days is shaped differently — how long,
 *    how far, how much of the kit comes along — so it is quoted per event.
 *    If prices ever go on this page they should be a clear "from", not a
 *    rate card, or the flexibility that makes this work disappears.
 *
 * 2. THE MANUFACTURER IS NAMED HERE, AND ONLY HERE. Everywhere else on the
 *    site we keep equipment brands out of the copy and crop them out of
 *    photographs. This page is the exception on purpose: people ring up
 *    asking for the Mevo by name, which means they search for it by name,
 *    and a page that coyly says "a professional launch monitor" is invisible
 *    to exactly the person looking for it. Renting a specific device means
 *    naming the device. Do not "fix" this for consistency.
 *
 * The page is also written to send the wrong reader away. Somebody who
 * actually wants the full simulator experience should end up on /packages,
 * not booking a bare launch monitor and being disappointed on the day.
 */

const WHAT_YOU_GET = [
  {
    icon: <Radar size={28} />,
    title: 'The launch monitor',
    body: 'A FlightScope Mevo+ Gen 2, tracking every shot your players hit — carry, total, ball speed, club speed, launch angle, spin and shot shape.',
  },
  {
    icon: <UserCheck size={28} />,
    title: 'An operator for the day',
    body: 'One of our team on site to set it up, calibrate it, keep it running and help your players read what they are looking at. You are not handed a case and left to it.',
  },
  {
    icon: <Laptop size={28} />,
    title: 'The software and the screen',
    body: 'The system we run at our own events, so numbers appear the moment the ball is struck — and stay on screen long enough for the next person in the queue to be impressed by them.',
  },
]

const GOOD_FOR = [
  {
    title: 'Golf days and club days',
    body: 'Put it on a par three for a nearest-the-pin, or on the range at registration so players warm up with numbers in front of them.',
  },
  {
    title: 'Longest drive competitions',
    body: 'Measured properly, settled by carry distance rather than by argument, with a number everyone can see.',
  },
  {
    title: 'Corporate golf days',
    body: 'A branded hole that gives every fourball a reason to stop, and gives you something to hand out a prize for afterwards.',
  },
  {
    title: 'Practice and fitting sessions',
    body: 'A coaching morning, a club day at the range, or a session where a group wants real numbers on their own swings.',
  },
]

const EquipmentHire: React.FC = () => (
  <>
    <Seo
      title="Launch Monitor Hire | Mevo+ & Operator | Sim2U"
      description="Hire a FlightScope Mevo+ Gen 2 launch monitor with an operator for golf days, longest-drive competitions and practice sessions across the Western Cape. Quoted per event."
      path="/equipment-hire"
      image={byName('14bc34d1-eb70-4c95-8f87-3ea98b35621c_thwydl')}
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Golf launch monitor hire with operator',
        name: 'Launch monitor and operator hire',
        description:
          'FlightScope Mevo+ Gen 2 launch monitor hire with an operator for golf days, longest-drive competitions, corporate golf and practice sessions.',
        provider: {
          '@type': 'Organization',
          name: 'Sim2U Mobile Golf',
          url: SITE_URL,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Western Cape, South Africa',
        },
        url: `${SITE_URL}/equipment-hire`,
      }}
    />

    <PageHero
      eyebrow="Equipment Hire"
      title={
        <>
          Just the launch monitor.
          <br />
          <span className="text-gold italic">And someone to run it.</span>
        </>
      }
      intro="Sometimes you do not need a whole simulator — you need accurate numbers on a tee box and a person who knows how to get them. We hire out the launch monitor with an operator for the day."
      image={byName('14bc34d1-eb70-4c95-8f87-3ea98b35621c_thwydl')}
      primary={{ label: 'Ask for a quote', to: '/contact' }}
      secondary={{ label: 'See the full packages', to: '/packages' }}
    />

    {/* ------------------------------------------------ what you get */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What Comes With It"
          title="The kit, and a person who knows it."
          subtitle="What travels to you depends on the day. This is the core of it."
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {WHAT_YOU_GET.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-[32px] p-9 border border-mountainGreen/5 shadow-[0_15px_40px_-20px_rgba(33,54,49,0.2)]"
            >
              <span className="text-gold block mb-6">{item.icon}</span>
              <h3 className="text-xl font-serif text-mountainGreen mb-4 leading-snug">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-mountainGreen rounded-[32px] p-9 md:p-11">
          <h3 className="text-2xl font-serif text-white mb-4">
            And the rest of what we own, if the day needs it.
          </h3>
          <p className="text-white/70 leading-relaxed max-w-3xl">
            Mats, nets, screens, an enclosure, the live leaderboard — we run a
            mobile simulator company, so most of what you might want already
            exists in the trailer. Tell us what the day looks like and we will
            tell you what is worth bringing. That conversation is quicker than
            any price list, which is why there isn&apos;t one on this page.
          </p>
        </div>
      </div>
    </section>

    {/* ------------------------------------------------ good for */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Where It Works"
          title="Built for days played outdoors."
          subtitle="Real balls, real ball flight, measured properly."
        />

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {GOOD_FOR.map((use) => (
            <div
              key={use.title}
              className="border-l-2 border-gold/40 pl-7 py-2"
            >
              <h3 className="text-lg font-black text-mountainGreen uppercase tracking-wider mb-3">
                {use.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{use.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ------------------------------------------------ pricing + the fork */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-5xl grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[32px] p-9 md:p-11 border border-gold/25">
          <span className="text-gold block mb-6">
            <Gauge size={28} />
          </span>
          <Eyebrow>What It Costs</Eyebrow>
          <h3 className="text-2xl md:text-3xl font-serif text-mountainGreen mt-4 mb-5 leading-tight">
            Quoted per event.
          </h3>
          <p className="text-gray-600 leading-relaxed mb-5">
            Half days and full days both work, and what it costs depends on how
            long you need it, how far we travel and how much of the kit comes
            along. Tell us the date, the venue and roughly what you have in
            mind, and you will have a number back within one business day.
          </p>
          <a
            href={TEL_HREF}
            className="inline-flex items-center gap-3 text-mountainGreen font-black uppercase tracking-[0.15em] text-xs border-b-2 border-gold pb-2 hover:text-gold transition-colors"
          >
            <MessageSquare size={15} />
            Or call {CONTACT_PHONE}
          </a>
        </div>

        {/* Sends the wrong reader somewhere better rather than letting them
            book the wrong thing and be disappointed on the day. */}
        <div className="bg-mountainGreen rounded-[32px] p-9 md:p-11">
          <span className="text-gold block mb-6">
            <Target size={28} />
          </span>
          <Eyebrow dark>Not Quite It?</Eyebrow>
          <h3 className="text-2xl md:text-3xl font-serif text-white mt-4 mb-5 leading-tight">
            If you want people playing a course, you want the simulator.
          </h3>
          <p className="text-white/70 leading-relaxed mb-7">
            This page is for measuring real shots hit outdoors. If what you
            actually picture is guests taking turns in a bay, playing famous
            courses on a screen with a leaderboard running, that is the
            full setup — three enclosure sizes, priced by the hour.
          </p>
          <Link
            to="/packages"
            className="inline-flex items-center gap-3 text-gold font-black uppercase tracking-[0.15em] text-xs border-b-2 border-gold pb-2 hover:text-white hover:border-white transition-colors"
          >
            See the packages
          </Link>
        </div>
      </div>
    </section>

    <CTABand
      title="Tell us about the day."
      body="Date, venue and what you have in mind. We will come back with a quote and an honest view on what is worth bringing."
      primaryLabel="Request a Quote"
    />
  </>
)

export default EquipmentHire
