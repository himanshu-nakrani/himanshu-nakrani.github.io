import { createElement, lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'

import { BrowserRouter, Navigate, Route, useLocation } from 'react-router-dom'

import {
  applyDesignMode,
  applyTheme,
  DESIGN_STORAGE_KEY,
  getPreferredDesignMode,
  getPreferredTheme,
  THEME_STORAGE_KEY,
} from './lib/theme'
import { setItem } from './lib/storage'
import { getLoadedPage, routeImporters } from './lib/routePrefetch'
import MainLayout from './layouts/MainLayout'
import RouteLoadingBar from './components/RouteLoadingBar'
import SmoothRoutes from './components/SmoothRoutes'

/**
 * Re-reads persisted theme/design-mode on navigation so the host app adopts
 * changes made by the standalone one-pager (which manages them directly).
 */
function RouteSync({ onThemeSync, onDesignSync }) {
  const location = useLocation()

  useEffect(() => {
    onThemeSync(getPreferredTheme() === 'dark')
    onDesignSync(getPreferredDesignMode())
  }, [location.pathname, onThemeSync, onDesignSync])

  return null
}

const HomePage = lazy(routeImporters['/'])
const ProjectsPage = lazy(routeImporters['/projects'])
const ExperiencePage = lazy(routeImporters['/experience'])
const ProfilesPage = lazy(routeImporters['/profiles'])
const ResearchPage = lazy(routeImporters['/research'])
const SkillsPage = lazy(routeImporters['/skills'])
const StyleguidePage = lazy(() => import('./pages/StyleguidePage'))
const OnePager = lazy(routeImporters['/minimal'])
const ThreeDAdaptiveNavDemo = lazy(() => import('./components/ui/3d-adaptive-navigation-bar-demo'))
const SpotlightCardDemo = lazy(() => import('./components/ui/spotlight-card-demo'))
const ProjectDeepDivePage = lazy(routeImporters['/projects/:slug'])
const ResearchDeepDivePage = lazy(routeImporters['/research/:slug'])
const LabPage = lazy(routeImporters['/lab'])

const lazyPages = {
  '/': HomePage,
  '/projects': ProjectsPage,
  '/projects/:slug': ProjectDeepDivePage,
  '/experience': ExperiencePage,
  '/profiles': ProfilesPage,
  '/research': ResearchPage,
  '/research/:slug': ResearchDeepDivePage,
  '/skills': SkillsPage,
  '/lab': LabPage,
  '/minimal': OnePager,
}

function ResolvedPage({ routeKey }) {
  const loaded = getLoadedPage(routeKey)
  if (loaded) return createElement(loaded)
  const LazyPage = lazyPages[routeKey]
  return createElement(LazyPage)
}

function Standalone({ children }) {
  return <Suspense fallback={<RouteLoadingBar />}>{children}</Suspense>
}

export default function App() {
  const [isDark, setIsDark] = useState(() => getPreferredTheme() === 'dark')
  const [designMode, setDesignMode] = useState(() => getPreferredDesignMode())
  const [analyticsComponents, setAnalyticsComponents] = useState(null)

  useLayoutEffect(() => {
    applyTheme(isDark ? 'dark' : 'light')
  }, [isDark])

  useLayoutEffect(() => {
    applyDesignMode(designMode)
  }, [designMode])

  useEffect(() => {
    const mountAnalytics = () => {
      Promise.all([
        import('@vercel/analytics/react'),
        import('@vercel/speed-insights/react'),
      ]).then(([analytics, speedInsights]) => {
        setAnalyticsComponents({
          Analytics: analytics.Analytics,
          SpeedInsights: speedInsights.SpeedInsights,
        })
      }).catch(() => {})
    }
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(mountAnalytics, { timeout: 5000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(mountAnalytics, 3000)
    return () => clearTimeout(id)
  }, [])

  const handleThemeChange = (newIsDark) => {
    setIsDark(newIsDark)
    setItem(THEME_STORAGE_KEY, newIsDark ? 'dark' : 'light')
  }

  const handleDesignModeChange = (newDesignMode) => {
    setDesignMode(newDesignMode)
    setItem(DESIGN_STORAGE_KEY, newDesignMode)
  }

  return (
    <>
      <BrowserRouter>
        <RouteSync onThemeSync={setIsDark} onDesignSync={setDesignMode} />
        <SmoothRoutes>
          <Route path="/demo/3d-nav" element={<Standalone><ThreeDAdaptiveNavDemo /></Standalone>} />
          <Route path="/demo/spotlight-card" element={<Standalone><SpotlightCardDemo /></Standalone>} />
          <Route path="/styleguide" element={<Standalone><StyleguidePage /></Standalone>} />
          <Route path="/minimal" element={<Standalone><ResolvedPage routeKey="/minimal" /></Standalone>} />
          <Route
            element={
              <MainLayout
                isDark={isDark}
                setIsDark={handleThemeChange}
                designMode={designMode}
                setDesignMode={handleDesignModeChange}
              />
            }
          >
            <Route path="/"           element={<ResolvedPage routeKey="/" />} />
            <Route path="/about"      element={<Navigate to="/" replace />} />
            <Route path="/projects"   element={<ResolvedPage routeKey="/projects" />} />
            <Route path="/experience" element={<ResolvedPage routeKey="/experience" />} />
            <Route path="/profiles"   element={<ResolvedPage routeKey="/profiles" />} />
            <Route path="/research"   element={<ResolvedPage routeKey="/research" />} />
            <Route path="/research/:slug" element={<ResolvedPage routeKey="/research/:slug" />} />
            <Route path="/skills"     element={<ResolvedPage routeKey="/skills" />} />
            <Route path="/projects/:slug" element={<ResolvedPage routeKey="/projects/:slug" />} />
            <Route path="/lab"        element={<ResolvedPage routeKey="/lab" />} />
          </Route>
        </SmoothRoutes>
      </BrowserRouter>
      {analyticsComponents && (
        <>
          <analyticsComponents.Analytics />
          <analyticsComponents.SpeedInsights />
        </>
      )}
    </>
  )
}
