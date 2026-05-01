import { useLayoutEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from './lib/theme'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import ProfilesPage from './pages/ProfilesPage'
import ResearchPage from './pages/ResearchPage'
import SkillsPage from './pages/SkillsPage'
import StyleguidePage from './pages/StyleguidePage'
import ThreeDAdaptiveNavDemo from './components/ui/3d-adaptive-navigation-bar-demo'
import SpotlightCardDemo from './components/ui/spotlight-card-demo'

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
        <Routes>
          <Route path="/demo/3d-nav" element={<ThreeDAdaptiveNavDemo />} />
          <Route path="/demo/spotlight-card" element={<SpotlightCardDemo />} />
          <Route path="/styleguide" element={<StyleguidePage />} />
          <Route
            element={
              <MainLayout
                isDark={isDark}
                setIsDark={handleThemeChange}
              />
            }
          >
            <Route path="/"           element={<HomePage />} />
            <Route path="/projects"   element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/profiles"   element={<ProfilesPage />} />
            <Route path="/research"   element={<ResearchPage />} />
            <Route path="/skills"     element={<SkillsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
