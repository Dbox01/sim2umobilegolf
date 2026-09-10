import React, { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { EXPERIENCE_IMAGES } from '../data/gallery'

const GalleryGrid: React.FC<{ images?: string[] }> = ({
  images = EXPERIENCE_IMAGES,
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const close = useCallback(() => setOpenIdx(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpenIdx((i) =>
        i === null ? i : (i + delta + images.length) % images.length,
      ),
    [images.length],
  )

  useEffect(() => {
    if (openIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIdx, close, step])

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((src, idx) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIdx(idx)}
            className={`group relative overflow-hidden rounded-3xl bg-mountainGreen/5 focus:outline-none focus:ring-4 focus:ring-gold/40 ${
              // Every fifth tile spans two columns for a less uniform grid.
              idx % 7 === 0 ? 'col-span-2 aspect-[4/3]' : 'aspect-square'
            }`}
            aria-label={`View gallery image ${idx + 1} of ${images.length}`}
          >
            <img
              src={src}
              alt={`Sim2U mobile golf simulator setup ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading={idx < 4 ? 'eager' : 'lazy'}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-mountainGreen/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[120] bg-mountainGreen/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery viewer"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-10"
            aria-label="Close gallery viewer"
          >
            <X size={36} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            className="absolute left-4 md:left-10 text-white/70 hover:text-gold transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={44} />
          </button>

          <img
            src={images[openIdx]}
            alt={`Sim2U mobile golf simulator setup ${openIdx + 1}`}
            className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            className="absolute right-4 md:right-10 text-white/70 hover:text-gold transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={44} />
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-black uppercase tracking-[0.3em]">
            {openIdx + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  )
}

export default GalleryGrid
