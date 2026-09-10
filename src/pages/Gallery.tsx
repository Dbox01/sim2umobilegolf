import React from 'react'
import Seo from '../components/Seo'
import GalleryGrid from '../components/GalleryGrid'
import VideoReel from '../components/VideoReel'
import Testimonials from '../components/Testimonials'
import { CTABand, PageHero, SectionHeading } from '../components/Primitives'
import { EXPERIENCE_IMAGES } from '../data/gallery'
import { SITE_URL } from '../data/site'

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
        associatedMedia: EXPERIENCE_IMAGES.slice(0, 12).map((src) => ({
          '@type': 'ImageObject',
          contentUrl: src,
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
      image={EXPERIENCE_IMAGES[7]}
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
          poster={EXPERIENCE_IMAGES[6]}
          title="Sim2U Mobile Golf — event reel"
          caption="Add your reel's YouTube ID in VideoReel to switch this on."
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

    <CTABand
      title="Want your event in here?"
      body="Send us your date and venue. We'll confirm availability and put together a quote — and if it goes well, we'll ask before we photograph anything."
      primaryLabel="Book Your Date"
    />
  </>
)

export default Gallery
