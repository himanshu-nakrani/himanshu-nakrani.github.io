import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import {
  applyDesignMode,
  applyTheme,
  DESIGN_STORAGE_KEY,
  getPreferredDesignMode,
  getPreferredTheme,
  THEME_STORAGE_KEY,
} from './lib/theme'
import { setItem } from './lib/storage'
import { routeImporters } from './lib/routePrefetch'
import MainLayout from './layouts/MainLayout'
import RouteLoadingBar from './components/RouteLoadingBar'

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
const AboutPage = lazy(routeImporters['/about'])
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
        <Suspense fallback={<RouteLoadingBar />}>
          <Routes>
            <Route path="/demo/3d-nav" element={<ThreeDAdaptiveNavDemo />} />
            <Route path="/demo/spotlight-card" element={<SpotlightCardDemo />} />
            <Route path="/styleguide" element={<StyleguidePage />} />
            <Route path="/minimal" element={<OnePager />} />
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
              <Route path="/"           element={<HomePage />} />
              <Route path="/about"      element={<AboutPage />} />
              <Route path="/projects"   element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/profiles"   element={<ProfilesPage />} />
              <Route path="/research"   element={<ResearchPage />} />
              <Route path="/research/:slug" element={<ResearchDeepDivePage />} />
              <Route path="/skills"     element={<SkillsPage />} />
              <Route path="/projects/:slug" element={<ProjectDeepDivePage />} />
              <Route path="/lab"        element={<LabPage />} />
            </Route>
          </Routes>
        </Suspense>
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
