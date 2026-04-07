import { useLayoutEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useIsMobile } from './hooks/useIsMobile'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import MobileAllInOnePage from './pages/MobileAllInOnePage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import ProfilesPage from './pages/ProfilesPage'
import ResearchPage from './pages/ResearchPage'
import SkillsPage from './pages/SkillsPage'

const mobileRouteMap = {
  '/projects':   'projects',
  '/experience': 'experience',
  '/profiles':   'profiles',
  '/research':   'research',
  '/skills':     'skills',
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return savedTheme ? savedTheme === 'dark' : prefersDark
  })

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleThemeChange = (newIsDark) => {
    setIsDark(newIsDark)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout isDark={isDark} setIsDark={handleThemeChange} />}>
            <Route path="/" element={<MobileAwareHome />} />
            <Route path="/projects"   element={<MobileAwareRoute component={ProjectsPage}   sectionId="projects"   />} />
            <Route path="/experience" element={<MobileAwareRoute component={ExperiencePage} sectionId="experience" />} />
            <Route path="/profiles"   element={<MobileAwareRoute component={ProfilesPage}   sectionId="profiles"   />} />
            <Route path="/research"   element={<MobileAwareRoute component={ResearchPage}   sectionId="research"   />} />
            <Route path="/skills"     element={<MobileAwareRoute component={SkillsPage}     sectionId="skills"     />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

// Component that shows single page on mobile, regular home on desktop
function MobileAwareHome() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileAllInOnePage /> : <HomePage />
}

// Component that redirects to home on mobile, shows page on desktop
function MobileAwareRoute({ component: Component, sectionId }) {
  const isMobile = useIsMobile()
  return isMobile ? <MobileAllInOnePage scrollToSection={sectionId} /> : <Component />
}
