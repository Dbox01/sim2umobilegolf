import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Seo from '../components/Seo'
import { FEATURED_LINK, NAV_LINKS } from '../data/site'

const NotFound: React.FC = () => (
  <>
    <Seo
      title="Page Not Found | Sim2U Mobile Golf"
      description="That page doesn't exist. Find mobile golf simulator hire packages, corporate events and contact details for Sim2U across the Western Cape."
      path="/404"
      noindex
    />

    <section className="min-h-[80vh] flex items-center px-6 bg-mountainGreen pt-32 pb-20">
      <div className="container mx-auto max-w-3xl text-center">
        <p className="text-gold font-black uppercase tracking-[0.5em] text-xs mb-8">
          Error 404
        </p>
        <h1 className="hero-text text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
          That one went
          <br />
          <span className="text-gold italic">out of bounds.</span>
        </h1>
        <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto leading-relaxed font-light">
          The page you were looking for doesn&apos;t exist — it may have moved
          when we rebuilt the site. Here&apos;s where everything lives now.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[...NAV_LINKS, FEATURED_LINK, { name: 'Contact', to: '/contact' }].map(
            (link) => (
              <Link
                key={link.to}
                to={link.to}
                className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-gold hover:text-mountainGreen hover:border-gold transition-all"
              >
                {link.name}
              </Link>
            ),
          )}
        </div>

        <Link
          to="/"
          className="group inline-flex items-center gap-3 bg-gold text-mountainGreen px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-2xl"
        >
          Back to home
          <ChevronRight
            size={20}
            className="group-hover:translate-x-1.5 transition-transform"
          />
        </Link>
      </div>
    </section>
  </>
)

export default NotFound
