import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  ssgOptions: {
    // One .html file per route: /corporate-events -> dist/corporate-events.html
    // GitHub Pages and Cloudflare Pages both serve this at /corporate-events
    // with no redirect hop.
    dirStyle: 'flat',
    formatting: 'minify',
    // Leave the entry script as the default (deferred, in order). Making it
    // async lets the bundle run before the inline __VITE_REACT_SSG_HASH__
    // assignment, which breaks loader-data lookup and hydration.
  },
})
