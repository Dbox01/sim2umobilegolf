import React from 'react'
import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/Home')),
        entry: 'src/pages/Home.tsx',
      },
      {
        path: 'corporate-events',
        Component: React.lazy(() => import('./pages/CorporateEvents')),
        entry: 'src/pages/CorporateEvents.tsx',
      },
      {
        path: 'private-parties',
        Component: React.lazy(() => import('./pages/PrivateParties')),
        entry: 'src/pages/PrivateParties.tsx',
      },
      {
        path: 'packages',
        Component: React.lazy(() => import('./pages/Packages')),
        entry: 'src/pages/Packages.tsx',
      },
      {
        path: 'how-it-works',
        Component: React.lazy(() => import('./pages/HowItWorks')),
        entry: 'src/pages/HowItWorks.tsx',
      },
      {
        path: 'gallery',
        Component: React.lazy(() => import('./pages/Gallery')),
        entry: 'src/pages/Gallery.tsx',
      },
      {
        path: 'joburg-tour',
        Component: React.lazy(() => import('./pages/JoburgTour')),
        entry: 'src/pages/JoburgTour.tsx',
      },
      {
        path: 'contact',
        Component: React.lazy(() => import('./pages/Contact')),
        entry: 'src/pages/Contact.tsx',
      },
      // Pre-rendered to dist/404.html, which is what GitHub Pages serves
      // for any unknown path.
      {
        path: '404',
        Component: React.lazy(() => import('./pages/NotFound')),
        entry: 'src/pages/NotFound.tsx',
      },
      // Client-side catch-all for in-app navigation.
      {
        path: '*',
        Component: React.lazy(() => import('./pages/NotFound')),
        entry: 'src/pages/NotFound.tsx',
      },
    ],
  },
]
