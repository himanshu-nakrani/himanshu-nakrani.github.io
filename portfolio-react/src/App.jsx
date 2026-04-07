import { useLayoutEffect, useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import { useIsMobile } from './hooks/useIsMobile'
import { applyStyleMode, applyTheme, getPreferredStyleMode, getPreferredTheme, STYLE_MODE_STORAGE_KEY, THEME_STORAGE_KEY } from './lib/theme'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import MobileAllInOnePage from './pages/MobileAllInOnePage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import ProfilesPage from './pages/ProfilesPage'
import ResearchPage from './pages/ResearchPage'
import SkillsPage from './pages/SkillsPage'

export default function App() {
  const [isDark, setIsDark] = useState(() => getPreferredTheme() === 'dark')
  const [styleMode, setStyleMode] = useState(() => getPreferredStyleMode())

  useLayoutEffect(() => {
    applyTheme(isDark ? 'dark' : 'light')
  }, [isDark])

  useLayoutEffect(() => {
    applyStyleMode(styleMode)
  }, [styleMode])

  const handleThemeChange = (newIsDark) => {
    setIsDark(newIsDark)
    localStorage.setItem(THEME_STORAGE_KEY, newIsDark ? 'dark' : 'light')
  }

  const handleStyleModeChange = (nextMode) => {
    const resolvedMode = applyStyleMode(nextMode)
    setStyleMode(resolvedMode)
    localStorage.setItem(STYLE_MODE_STORAGE_KEY, resolvedMode)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <MainLayout
                isDark={isDark}
                setIsDark={handleThemeChange}
                styleMode={styleMode}
                setStyleMode={handleStyleModeChange}
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
