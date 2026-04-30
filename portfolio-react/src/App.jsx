import { useLayoutEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { useIsMobile } from './hooks/useIsMobile'
import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from './lib/theme'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import MobileAllInOnePage from './pages/MobileAllInOnePage'
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
            <Route path="/" element={<MobileAwareHome />} />
            <Route path="/projects"   element={<MobileAwareRoute component={ProjectsPage}   sectionId="projects"   />} />
            <Route path="/experience" element={<MobileAwareRoute component={ExperiencePage} sectionId="experience" />} />
            <Route path="/profiles"   element={<MobileAwareRoute component={ProfilesPage}   sectionId="profiles"   />} />
            <Route path="/research"   element={<MobileAwareRoute component={ResearchPage}   sectionId="research"   />} />
            <Route path="/skills"     element={<MobileAwareRoute component={SkillsPage}     sectionId="skills"     />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

// Component that shows single page on mobile, regular home on desktop
function MobileAwareHome() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileAllInOnePage /> : <HomePage />
}

// Component that redirects to home on mobile, shows page on desktop
function MobileAwareRoute({ component, sectionId }) {
  const isMobile = useIsMobile()
  if (isMobile) return <MobileAllInOnePage scrollToSection={sectionId} />

  const RouteComponent = component
  return <RouteComponent />
}
