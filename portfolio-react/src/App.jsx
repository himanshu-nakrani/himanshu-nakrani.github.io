import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from './lib/theme'
import { getRouteLoader } from './lib/routePrefetch'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import RouteFallback from './components/RouteFallback'

const AboutPage = lazy(getRouteLoader('/about'))
const ProjectsPage = lazy(getRouteLoader('/projects'))
const ExperiencePage = lazy(getRouteLoader('/experience'))
const ProfilesPage = lazy(getRouteLoader('/profiles'))
const ResearchPage = lazy(getRouteLoader('/research'))
const SkillsPage = lazy(getRouteLoader('/skills'))
const StyleguidePage = lazy(getRouteLoader('/styleguide'))
const OnePager = lazy(getRouteLoader('/minimal'))
const ThreeDAdaptiveNavDemo = lazy(getRouteLoader('/demo/3d-nav'))
const SpotlightCardDemo = lazy(getRouteLoader('/demo/spotlight-card'))

/**
 * Re-reads the persisted theme on navigation so the host app stays in sync
 * when the standalone one-pager (which manages the theme on its own) returns
 * control.
 */
function ThemeSync({ onSync }) {
  const location = useLocation()

  useEffect(() => {
    onSync(getPreferredTheme() === 'dark')
  }, [location.pathname, onSync])

  return null
}

export default function App() {
  const [isDark, setIsDark] = useState(() => getPreferredTheme() === 'dark')

  useLayoutEffect(() => {
    applyTheme(isDark ? 'dark' : 'light')
  }, [isDark])

  const handleThemeChange = (newIsDark) => {
    setIsDark(newIsDark)
    localStorage.setItem(THEME_STORAGE_KEY, newIsDark ? 'dark' : 'light')
  }

  return (
    <>
      <BrowserRouter>
        <ThemeSync onSync={setIsDark} />
        <Suspense fallback={<RouteFallback />}>
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
                />
              }
            >
              <Route path="/"           element={<HomePage />} />
              <Route path="/about"      element={<AboutPage />} />
              <Route path="/projects"   element={<ProjectsPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/profiles"   element={<ProfilesPage />} />
              <Route path="/research"   element={<ResearchPage />} />
              <Route path="/skills"     element={<SkillsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
