import { lazy, Suspense, useLayoutEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
const MinimalSPA = lazy(getRouteLoader('/minimal'))
const ThreeDAdaptiveNavDemo = lazy(getRouteLoader('/demo/3d-nav'))
const SpotlightCardDemo = lazy(getRouteLoader('/demo/spotlight-card'))

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
        <Suspense fallback={<RouteFallback />}>
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
