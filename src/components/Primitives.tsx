import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '../data/site'
import { DESKTOP_QUERY, REDUCED_MOTION_QUERY, useMediaQuery } from '../hooks/useMediaQuery'

/* --------------------------------- Eyebrow -------------------------------- */

export const Eyebrow: React.FC<{ children: React.ReactNode; dark?: boolean }> = ({
  children,
  dark,
}) => (
  <div className="flex items-center gap-4">
    <span className={`h-px w-10 ${dark ? 'bg-gold/60' : 'bg-gold/50'}`} />
    <span className="text-gold font-black uppercase tracking-[0.5em] text-[10px]">
      {children}
    </span>
  </div>
)

/* ------------------------------ SectionHeading ---------------------------- */

interface SectionHeadingProps {
  title: React.ReactNode
  subtitle?: string
  eyebrow?: string
  dark?: boolean
  left?: boolean
  /** Render as h1 instead of h2 — use once per page, on the hero. */
  as?: 'h1' | 'h2'
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  eyebrow,
  dark,
  left,
  as: Tag = 'h2',
}) => (
  <div className={`${left ? 'text-left' : 'text-center'} mb-16`}>
    {eyebrow && (
      <div className={`mb-6 ${left ? '' : 'flex justify-center'}`}>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </div>
    )}
    <Tag
      className={`text-4xl md:text-6xl font-serif mb-6 leading-[1.1] tracking-tight ${
        dark ? 'text-white' : 'text-mountainGreen'
      }`}
    >
      {title}
    </Tag>
    <div
      className={`w-24 h-1.5 bg-gold mb-8 rounded-full ${left ? 'ml-0' : 'mx-auto'}`}
    />
    {subtitle && (
      <p
        className={`max-w-2xl text-lg md:text-xl font-light leading-relaxed ${
          dark ? 'text-white/60' : 'text-gray-600'
        } ${left ? 'ml-0' : 'mx-auto'}`}
      >
        {subtitle}
      </p>
    )}
  </div>
)

/* --------------------------------- PageHero ------------------------------- */

/**
 * An optional moving background for the hero.
 *
 * Everything here is optional and the hero works with none of it — leave
 * `video` off entirely and you get the still image, exactly as before. See
 * HeroBackground below for how the cuts are chosen.
 */
export interface HeroVideo {
  /** Landscape cut, shown at md and up. */
  desktop: string
  /**
   * Portrait cut for phones. LEAVE THIS OFF unless you have a cut framed for
   * a tall crop — the hero is full-height, so a phone shows roughly the middle
   * quarter of a 16:9 frame and the composition falls apart. With no mobile
   * cut, phones get the still image, which is the better outcome and costs
   * the visitor nothing on mobile data.
   */
  mobile?: string
  /**
   * First frame, shown instantly while the video loads. Defaults to the hero
   * image. Do not remove it — without a poster the hero is black until the
   * video has buffered, and that black frame is what Google measures.
   */
  poster?: string
}

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  intro: string
  image: string
  video?: HeroVideo
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
  /** A third, quieter link. Reads as "and if you're not ready, start here". */
  tertiary?: { label: string; to: string }
  /** One short credibility line under the buttons. */
  badge?: React.ReactNode
  /** Full viewport height. Home only. */
  tall?: boolean
  children?: React.ReactNode
}

/**
 * The hero's background layer: still image, with video over it when there is
 * one to show.
 *
 * The image is ALWAYS rendered, never swapped out. It is what the pre-rendered
 * HTML ships, what fills the frame while a video buffers, and what remains if
 * the video fails to load, is still downloading, or was never provided. The
 * video is a layer on top that fades in once it can actually play — so there
 * is no blank moment and no flash between the two.
 *
 * Which cut plays:
 *   · reduced motion requested  → no video at all
 *   · desktop                   → video.desktop
 *   · phone, mobile cut given   → video.mobile
 *   · phone, no mobile cut      → image only
 */
const HeroBackground: React.FC<{ image: string; video?: HeroVideo; tall?: boolean }> = ({
  image,
  video,
  tall,
}) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  const [canShowVideo, setCanShowVideo] = useState(false)

  const src = !video || prefersReducedMotion
    ? undefined
    : isDesktop
      ? video.desktop
      : video.mobile

  // Drop back to the still image if the file 404s or the browser refuses the
  // codec, rather than leaving a dead black rectangle over the hero.
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    setCanShowVideo(false)
    setFailed(false)
  }, [src])

  const showVideo = Boolean(src) && !failed

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-mountainGreen via-mountainGreen/85 to-mountainGreen/40 z-10" />
      <div className="absolute inset-0 bg-black/40 z-[11]" />

      <img
        src={image}
        alt=""
        aria-hidden="true"
        className={`w-full h-full object-cover ${
          // The slow zoom is the still image's job. When a video is playing it
          // has motion of its own, and two competing drifts look like a bug.
          tall && !showVideo ? 'scale-105 animate-slowZoom' : ''
        }`}
      />

      {showVideo && (
        <video
          key={src}
          src={src}
          poster={video?.poster ?? image}
          // All four are required for an autoplaying background. Without
          // `muted` no browser will autoplay at all; without `playsInline`
          // iOS Safari takes the video fullscreen the moment it starts.
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setCanShowVideo(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            canShowVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  )
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  intro,
  image,
  video,
  primary,
  secondary,
  tertiary,
  badge,
  tall,
  children,
}) => (
  <header
    /* The tall hero needs its own padding, not just a min-height.
       `min-h-screen` with `items-center` and no padding centres the content in
       the viewport — which is fine until the content is taller than the
       viewport, and then it overflows EQUALLY in both directions: the eyebrow
       slides up behind the fixed nav and the bottom line is cut off. That is
       exactly what a small phone does with a three-line headline, a five-line
       intro and three stacked buttons.
       With padding, min-h-screen becomes a floor rather than a ceiling — short
       content still centres, tall content grows the header and scrolls. The
       bottom padding is the larger of the two so the floating WhatsApp button
       has somewhere to sit that is not on top of a link. */
    className={`relative flex items-center overflow-hidden ${
      tall ? 'min-h-screen pt-32 pb-28' : 'min-h-[65vh] pt-32 pb-20'
    }`}
  >
    <HeroBackground image={image} video={video} tall={tall} />

    <div className="container mx-auto px-6 relative z-20 text-white max-w-7xl">
      <div className="max-w-4xl animate-fadeInUp">
        <div className="mb-8">
          <Eyebrow dark>{eyebrow}</Eyebrow>
        </div>

        <h1
          className={`hero-text font-black mb-8 tracking-tighter leading-[1.05] drop-shadow-[0_15px_20px_rgba(0,0,0,0.5)] ${
            tall
              ? 'text-4xl md:text-6xl lg:text-7xl'
              : 'text-4xl md:text-5xl lg:text-6xl'
          }`}
        >
          {title}
        </h1>

        <p className="text-lg md:text-2xl mb-8 md:mb-10 font-medium tracking-wide text-white/90 max-w-3xl leading-relaxed drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
          {intro}
        </p>

        {/* Three levels of commitment, three levels of visual weight: solid
            gold for the one we want, outlined for the ready-to-book, and a
            plain link for someone still working out whether this suits them.
            flex-wrap matters — three buttons at this padding will not fit one
            line on a small laptop, and wrapping beats shrinking the type. */}
        {(primary || secondary || tertiary) && (
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            {primary && (
              <Link
                to={primary.to}
                className="group bg-gold text-mountainGreen px-10 py-5 rounded-2xl text-base font-black hover:bg-white transition-all shadow-2xl hover:shadow-gold/50 flex items-center justify-center gap-3 tracking-[0.1em] uppercase"
              >
                {primary.label}
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1.5 transition-transform"
                />
              </Link>
            )}
            {secondary && (
              <Link
                to={secondary.to}
                className="bg-white/10 backdrop-blur-md border-2 border-white/40 text-white px-10 py-5 rounded-2xl text-base font-black hover:bg-white hover:text-mountainGreen transition-all uppercase tracking-[0.1em] flex items-center justify-center gap-3"
              >
                {secondary.label}
              </Link>
            )}
            {tertiary && (
              <Link
                to={tertiary.to}
                className="group text-white/80 hover:text-white px-4 sm:px-6 py-5 text-base font-black uppercase tracking-[0.1em] flex items-center justify-center gap-2 transition-colors underline decoration-gold/50 decoration-2 underline-offset-8 hover:decoration-gold"
              >
                {tertiary.label}
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            )}
          </div>
        )}

        {badge && (
          <div className="mt-7 md:mt-10 flex items-center gap-3 text-white/70">
            <span className="h-px w-8 bg-gold/50 flex-shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-[0.28em]">
              {badge}
            </span>
          </div>
        )}

        {children}
      </div>
    </div>
  </header>
)

/* ------------------------------- FeatureCard ------------------------------ */

export const FeatureCard: React.FC<{
  icon: React.ReactNode
  title: string
  items?: string[]
  body?: string
  dark?: boolean
}> = ({ icon, title, items, body, dark = true }) => (
  <div
    className={`p-10 rounded-[32px] border transition-all duration-500 group relative overflow-hidden ${
      dark
        ? 'bg-white/5 border-white/10 hover:border-gold'
        : 'bg-white border-mountainGreen/5 shadow-[0_15px_40px_-20px_rgba(33,54,49,0.2)] hover:border-gold hover:-translate-y-1'
    }`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-gold/10 transition-colors" />
    <div className="text-gold mb-7 group-hover:scale-110 group-hover:-rotate-6 transition-transform relative">
      {icon}
    </div>
    <h3
      className={`text-2xl font-serif mb-5 relative ${
        dark ? 'text-white' : 'text-mountainGreen'
      }`}
    >
      {title}
    </h3>
    {body && (
      <p
        className={`text-sm leading-relaxed relative ${
          dark ? 'text-white/60' : 'text-gray-500'
        }`}
      >
        {body}
      </p>
    )}
    {items && (
      <ul className="space-y-3 relative">
        {items.map((item) => (
          <li
            key={item}
            className={`flex items-start text-sm leading-relaxed transition-colors ${
              dark ? 'text-white/50 group-hover:text-white/80' : 'text-gray-500'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 mr-3 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
)

/* --------------------------------- StatCard ------------------------------- */

export const StatCard: React.FC<{
  value: string
  label: string
  note?: string
}> = ({ value, label, note }) => (
  <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
    <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">
      {label}
    </p>
    <p className="text-white font-bold text-xl uppercase italic">{value}</p>
    {note && (
      <p className="text-white/40 text-[10px] mt-1 font-bold italic uppercase">
        {note}
      </p>
    )}
  </div>
)

/* --------------------------------- CTABand -------------------------------- */

export const CTABand: React.FC<{
  title: string
  body: string
  primaryLabel?: string
  primaryTo?: string
}> = ({
  title,
  body,
  primaryLabel = 'Check Availability',
  primaryTo = '/contact',
}) => (
  <section className="py-20 px-6 bg-mountainGreen relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full -mr-48 -mt-48 blur-3xl" />
    <div className="container mx-auto max-w-5xl relative z-10 text-center">
      <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
        {title}
      </h2>
      <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
        {body}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to={primaryTo}
          className="group bg-gold text-mountainGreen px-12 py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-sm hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-3"
        >
          {primaryLabel}
          <ChevronRight
            size={20}
            className="group-hover:translate-x-1.5 transition-transform"
          />
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-sm hover:bg-white hover:text-mountainGreen transition-all flex items-center justify-center gap-3"
        >
          <MessageCircle size={20} />
          WhatsApp Us
        </a>
      </div>
    </div>
  </section>
)
