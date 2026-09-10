import React from 'react'
import {
  Baby,
  Cake,
  Flame,
  Gamepad2,
  Heart,
  Home as HomeIcon,
  Sun,
  Users,
} from 'lucide-react'
import Seo from '../components/Seo'
import Testimonials from '../components/Testimonials'
import { CTABand, FeatureCard, PageHero, SectionHeading } from '../components/Primitives'
import { EXPERIENCE_IMAGES } from '../data/gallery'
import { SITE_URL } from '../data/site'

const OCCASIONS = [
  {
    icon: <Cake size={28} />,
    title: 'Birthday Parties',
    body: 'From fourteenth birthdays to fiftieths. Game modes scale to the room, and nobody sits out because they have never held a club.',
    image: EXPERIENCE_IMAGES[3],
  },
  {
    icon: <Users size={28} />,
    title: 'Bachelor Parties',
    body: 'A full round, a longest-drive contest and a leaderboard with everyone on it. Considerably easier to organise than a day at a course.',
    image: EXPERIENCE_IMAGES[6],
  },
  {
    icon: <Heart size={28} />,
    title: 'Weddings',
    body: 'Cocktail-hour entertainment while photographs happen, or a garden setup that keeps guests occupied between the ceremony and the meal.',
    image: EXPERIENCE_IMAGES[10],
  },
  {
    icon: <Flame size={28} />,
    title: 'Braais & Get-Togethers',
    body: 'Fire going, drinks poured, simulator running in the corner of the garden. The lowest-effort way to make an ordinary Saturday memorable.',
    image: EXPERIENCE_IMAGES[8],
  },
  {
    icon: <Baby size={28} />,
    title: 'Baby Showers & Milestones',
    body: 'Something for the guests who would otherwise be standing around. We have run more of these than you would expect, and they work.',
    image: EXPERIENCE_IMAGES[12],
  },
  {
    icon: <Gamepad2 size={28} />,
    title: 'Just Because',
    body: 'No occasion required. Book a bay for an afternoon, invite whoever is around, and let the leaderboard sort out the bragging rights.',
    image: EXPERIENCE_IMAGES[14],
  },
]

const PrivateParties: React.FC = () => (
  <>
    <Seo
      title="Golf Simulator Hire for Parties & Home Events | Sim2U"
      description="Hire a mobile golf simulator for birthdays, bachelor parties, weddings and braais across the Western Cape. Multiplayer games for all ages, indoors or in your garden."
      path="/private-parties"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Golf simulator hire for private parties',
        serviceType: 'Party entertainment hire',
        provider: { '@type': 'LocalBusiness', name: 'Sim2U Mobile Golf' },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Western Cape, South Africa',
        },
        url: `${SITE_URL}/private-parties`,
      }}
    />

    <PageHero
      eyebrow="Private Parties & Functions"
      title={
        <>
          The party everyone
          <br />
          <span className="text-gold italic">actually plays at.</span>
        </>
      }
      intro="Birthdays, bachelor parties, weddings and braais across the Western Cape. We set up in your garden, your garage or your venue — and every guest gets a turn, whether they golf or not."
      image={EXPERIENCE_IMAGES[4]}
      primary={{ label: 'Check My Date', to: '/contact' }}
      secondary={{ label: 'See Packages', to: '/packages' }}
    />

    {/* --------------------------- The three pillars ------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-mountainGreen">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          dark
          eyebrow="Why It Works At Home"
          title="Built for guests who have never played."
          subtitle="The failure mode of hiring a golf simulator for a party is that three people monopolise it. Here is how we stop that happening."
        />

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Gamepad2 size={44} />}
            title="Multiplayer Mini-Games"
            body="Closest-to-the-pin, longest drive, target challenges and team formats — short rounds that keep people rotating instead of one person playing eighteen holes while everyone watches. Scores go up on a live leaderboard nobody can argue with."
          />
          <FeatureCard
            icon={<Users size={44} />}
            title="Genuinely Family-Friendly"
            body="Children, grandparents and complete beginners all get a swing. Our technician sets up each player, adjusts the difficulty and coaches first-timers through their opening shots. No equipment of your own required — we bring clubs."
          />
          <FeatureCard
            icon={<HomeIcon size={44} />}
            title="Indoors Or Outdoors"
            body="Three enclosure sizes, the smallest fitting most residential lawns, patios and double garages at 2.5m of height. If the Cape wind turns, we move the whole thing inside — that decision gets made on the day, with you."
          />
        </div>
      </div>
    </section>

    {/* ------------------------------- Occasions ----------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Occasions"
          title="What people book us for."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {OCCASIONS.map((occ) => (
            <article key={occ.title} className="group">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-7 shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={occ.image}
                  alt={`Sim2U golf simulator at a ${occ.title.toLowerCase()} event`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mountainGreen/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-mountainGreen shadow-lg">
                  {occ.icon}
                </div>
              </div>
              <h3 className="text-2xl font-serif text-mountainGreen mb-3 group-hover:text-gold transition-colors italic">
                {occ.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">{occ.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* -------------------------- Weather reassurance ------------------------ */}
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-cream rounded-[40px] p-10 md:p-14 border border-gold/20 flex flex-col md:flex-row gap-10 items-start">
          <div className="bg-gold p-5 rounded-3xl text-mountainGreen shadow-xl flex-shrink-0">
            <Sun size={36} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-mountainGreen mb-4">
              What if the weather turns?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              It is the Western Cape, so it is a fair question. The simulator runs
              high-end electronics, which means our limit is sustained or gusting
              wind of 30 km/h, and rain is a no-go. We watch the forecast in the
              days before your event and talk to you early rather than on the
              morning.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If we can move indoors, we will. If conditions force a cancellation,
              you reschedule to an agreed date at no extra charge. You are never
              left paying for an event that could not happen.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <Testimonials limit={6} heading="From private hosts" />
      </div>
    </section>

    <CTABand
      title="Got a date in mind?"
      body="Send it through with your suburb and rough guest numbers. We'll confirm availability and price, usually within the day."
      primaryLabel="Check Availability"
    />
  </>
)

export default PrivateParties
