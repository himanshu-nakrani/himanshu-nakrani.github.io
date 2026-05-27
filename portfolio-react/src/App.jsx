import { lazy, Suspense, useLayoutEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from './lib/theme'
import MainLayout from './layouts/MainLayout'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const ProfilesPage = lazy(() => import('./pages/ProfilesPage'))
const ResearchPage = lazy(() => import('./pages/ResearchPage'))
const SkillsPage = lazy(() => import('./pages/SkillsPage'))
const StyleguidePage = lazy(() => import('./pages/StyleguidePage'))
const MinimalSPA = lazy(() => import('./pages/MinimalSPA'))
const ThreeDAdaptiveNavDemo = lazy(() => import('./components/ui/3d-adaptive-navigation-bar-demo'))
const SpotlightCardDemo = lazy(() => import('./components/ui/spotlight-card-demo'))

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
        <Suspense fallback={null}>
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
