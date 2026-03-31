import { useLayoutEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useIsMobile } from './hooks/useIsMobile'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import MobileAllInOnePage from './pages/MobileAllInOnePage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencePage from './pages/ExperiencePage'
import ProfilesPage from './pages/ProfilesPage'
import ResearchPage from './pages/ResearchPage'
import SkillsPage from './pages/SkillsPage'

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return savedTheme ? savedTheme === 'dark' : prefersDark
  })

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleThemeChange = (newIsDark) => {
    setIsDark(newIsDark)
    document.documentElement.setAttribute('data-theme', newIsDark ? 'dark' : 'light')
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout isDark={isDark} setIsDark={handleThemeChange} />}>
            <Route path="/" element={<MobileAwareHome />} />
            <Route path="/projects" element={<MobileAwareRoute component={ProjectsPage} />} />
            <Route path="/experience" element={<MobileAwareRoute component={ExperiencePage} />} />
            <Route path="/profiles" element={<MobileAwareRoute component={ProfilesPage} />} />
            <Route path="/research" element={<MobileAwareRoute component={ResearchPage} />} />
            <Route path="/skills" element={<MobileAwareRoute component={SkillsPage} />} />
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
function MobileAwareRoute({ component: Component }) {
  const isMobile = useIsMobile()
  return isMobile ? <Navigate to="/" replace /> : <Component />
}
