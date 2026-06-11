import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from './lib/theme'
import { setItem } from './lib/storage'
import { routeImporters, warmTopRoutes } from './lib/routePrefetch'
import MainLayout from './layouts/MainLayout'
import RouteLoadingBar from './components/RouteLoadingBar'

const HomePage = lazy(routeImporters['/'])
const AboutPage = lazy(routeImporters['/about'])
const ProjectsPage = lazy(routeImporters['/projects'])
const ExperiencePage = lazy(routeImporters['/experience'])
const ProfilesPage = lazy(routeImporters['/profiles'])
const ResearchPage = lazy(routeImporters['/research'])
const SkillsPage = lazy(routeImporters['/skills'])
const StyleguidePage = lazy(() => import('./pages/StyleguidePage'))
const MinimalSPA = lazy(routeImporters['/minimal'])
const ThreeDAdaptiveNavDemo = lazy(() => import('./components/ui/3d-adaptive-navigation-bar-demo'))
const SpotlightCardDemo = lazy(() => import('./components/ui/spotlight-card-demo'))
const ProjectDeepDivePage = lazy(() => import('./pages/ProjectDeepDivePage'))
const ResearchDeepDivePage = lazy(() => import('./pages/ResearchDeepDivePage'))
const LabPage = lazy(routeImporters['/lab'])

export default function App() {
  const [isDark, setIsDark] = useState(() => getPreferredTheme() === 'dark')
  const [analyticsReady, setAnalyticsReady] = useState(false)

  useLayoutEffect(() => {
    applyTheme(isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    warmTopRoutes()
    const mountAnalytics = () => setAnalyticsReady(true)
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

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<RouteLoadingBar />}>
          <Routes>
            <Route path="/demo/3d-nav" element={<ThreeDAdaptiveNavDemo />} />
            <Route path="/demo/spotlight-card" element={<SpotlightCardDemo />} />
            <Route path="/styleguide" element={<StyleguidePage />} />
            <Route path="/minimal" element={<MinimalSPA />} />
            <Route
              element={
                <MainLayout
                  isDark={isDark}
                  setIsDark={handleThemeChange}
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
      {analyticsReady && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  )
}
