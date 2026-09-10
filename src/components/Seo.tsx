import React from 'react'
import { Head } from 'vite-react-ssg'
import { IS_PRODUCTION, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from '../data/site'

interface SeoProps {
  /** Page <title>. Keep under ~60 characters so Google doesn't truncate it. */
  title: string
  /** Meta description. Aim for 140–158 characters. */
  description: string
  /** Route path, e.g. '/corporate-events'. Used for the canonical URL. */
  path: string
  image?: string
  /** Any JSON-LD blocks specific to this page. */
  schema?: Record<string, unknown> | Record<string, unknown>[]
  /** Force noindex even in production — used by the 404 page. */
  noindex?: boolean
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  image = SOCIAL_IMAGE,
  schema,
  noindex = false,
}) => {
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`
  const blocks = schema ? (Array.isArray(schema) ? schema : [schema]) : []

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Staging and preview builds must never be indexed. Only a build run
          with VITE_SITE_ENV=production is allowed into search results. */}
      {(noindex || !IS_PRODUCTION) && (
        <meta name="robots" content="noindex, nofollow" />
      )}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_ZA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Head>
  )
}

export default Seo
