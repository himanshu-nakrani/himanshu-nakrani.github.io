import { useEffect, useLayoutEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from './lib/theme'
import { SkipLink } from './components/SkipLink'
import Nav from './components/Nav'
import Hero from './components/Hero'
import StackStrip from './components/StackStrip'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Research from './components/Research'
import Skills from './components/Skills'
import Profiles from './components/Profiles'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [isDark, setIsDark] = useState(() => getPreferredTheme() === 'dark')

  useLayoutEffect(() => {
    applyTheme(isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
      return next
    })
  }

  // Sections render client-side after the browser's native fragment jump,
  // so replay any #hash once they exist.
  useEffect(() => {
    const { hash } = window.location
    if (!hash) return undefined
    const raf = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <SkipLink targetId="main-content" />
      <Nav isDark={isDark} onThemeChange={toggleTheme} />

      <main id="main-content">
        <Hero />
        <StackStrip />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Profiles />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <Analytics />
      <SpeedInsights />
    </>
  )
}
