import { useLayoutEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
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
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/skills" element={<SkillsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
