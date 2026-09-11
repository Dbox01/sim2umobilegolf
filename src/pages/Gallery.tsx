import React from 'react'
import { Facebook, Instagram } from 'lucide-react'
import Seo from '../components/Seo'
import GalleryGrid from '../components/GalleryGrid'
import VideoReel from '../components/VideoReel'
import Testimonials from '../components/Testimonials'
import { CTABand, PageHero, SectionHeading } from '../components/Primitives'
import { GALLERY_ASSETS, GALLERY_IMAGES, imageUrl } from '../data/gallery'
import { IMAGES } from '../data/images'
import { FACEBOOK_URL, INSTAGRAM_URL, SITE_URL } from '../data/site'

const Gallery: React.FC = () => (
  <>
    <Seo
      title="Gallery | Mobile Golf Simulator Setups | Sim2U Western Cape"
      description="Photos and video from Sim2U mobile golf simulator setups at corporate events, weddings and private parties across Cape Town, Somerset West and the Winelands."
      path="/gallery"
      schema={{
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Sim2U Mobile Golf event gallery',
        url: `${SITE_URL}/gallery`,
        associatedMedia: GALLERY_ASSETS.slice(0, 12).map((a) => ({
          '@type': 'ImageObject',
          contentUrl: imageUrl(a),
        })),
      }}
    />

    <PageHero
      eyebrow="Gallery"
      title={
        <>
          Real setups.
          <br />
          <span className="text-gold italic">Real events.</span>
        </>
      }
      intro="Every photograph here is from an actual Sim2U booking across the Western Cape — no stock imagery, no renders. This is what arrives at your venue."
      image={IMAGES.galleryHero}
      primary={{ label: 'Book Your Date', to: '/contact' }}
    />

    {/* ------------------------------- Video reel ---------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="The Reel"
          title="Ninety seconds on site."
          subtitle="Setup, swings, leaderboards and the moment someone who has never played lands one on the green."
        />
        <VideoReel
          title="Sim2U Mobile Golf — event reel"
          caption="Setups, swings and leaderboards from recent bookings."
        />
      </div>
    </section>

    {/* --------------------------------- Grid -------------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Photography"
          title="From the Winelands to the city."
          subtitle="Click any image to open it full size."
        />
        <GalleryGrid />
      </div>
    </section>

    {/* ------------------------------ Testimonials --------------------------- */}
    <section className="py-24 md:py-32 px-6 bg-cream">
      <div className="container mx-auto max-w-7xl">
        <Testimonials heading="What people said afterwards" />
      </div>
    </section>

    {/* ------------------------------ Follow us ------------------------------ */}
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-mountainGreen mb-4">
          There&apos;s more on Instagram.
        </h2>
        <p className="text-gray-500 leading-relaxed mb-9 max-w-xl mx-auto">
          Setups, swings and the odd hole-in-one, posted as they happen. The
          fastest way to see what a Sim2U event actually looks like.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[linear-gradient(45deg,#FEDA75_0%,#FA7E1E_25%,#D62976_50%,#962FBF_75%,#4F5BD5_100%)] text-white px-9 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs hover:brightness-110 hover:scale-[1.03] transition-all shadow-xl"
          >
            <Instagram size={18} />
            Follow on Instagram
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#1877F2] text-white px-9 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs hover:brightness-110 hover:scale-[1.03] transition-all shadow-xl"
          >
            <Facebook size={18} />
            Find us on Facebook
          </a>
        </div>
      </div>
    </section>

    <CTABand
      title="Want your event in here?"
      body="Send us your date and venue. We'll confirm availability and put together a quote — and if it goes well, we'll ask before we photograph anything."
      primaryLabel="Book Your Date"
    />
  </>
)

export default Gallery
