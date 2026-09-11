/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Set to "production" only by the GitHub Actions deploy. Gates indexing. */
  readonly VITE_SITE_ENV?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
