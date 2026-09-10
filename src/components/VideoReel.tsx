import React, { useState } from 'react'
import { PlayCircle } from 'lucide-react'

interface VideoReelProps {
  /**
   * YouTube video ID. Leave undefined to render the placeholder.
   * NOTE FOR DYLAN: drop your reel's ID in here (the part after `v=`)
   * and the player wires itself up.
   */
  videoId?: string
  poster: string
  title: string
  caption?: string
}

/**
 * Click-to-load video embed. The iframe is only injected after the user
 * clicks, so an unplayed reel costs nothing in page weight or Core Web Vitals.
 */
const VideoReel: React.FC<VideoReelProps> = ({
  videoId,
  poster,
  title,
  caption,
}) => {
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="relative">
      <div className="relative rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(33,54,49,0.4)] aspect-video bg-mountainGreen">
        {playing && videoId ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={poster}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mountainGreen/90 via-mountainGreen/30 to-transparent" />

            <button
              type="button"
              onClick={() => setPlaying(true)}
              disabled={!videoId}
              className="absolute inset-0 flex flex-col items-center justify-center gap-5 group disabled:cursor-default"
              aria-label={videoId ? `Play ${title}` : 'Video reel coming soon'}
            >
              <span className="w-24 h-24 rounded-full bg-gold/90 text-mountainGreen flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 group-disabled:group-hover:scale-100">
                <PlayCircle size={48} />
              </span>
              <span className="text-white font-black uppercase tracking-[0.3em] text-xs">
                {videoId ? 'Watch the reel' : 'Reel coming soon'}
              </span>
            </button>
          </>
        )}
      </div>

      {caption && (
        <figcaption className="text-center text-gray-500 text-sm mt-6 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default VideoReel
