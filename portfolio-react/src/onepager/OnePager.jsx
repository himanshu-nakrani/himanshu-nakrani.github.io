import { useEffect, useLayoutEffect, useState } from 'react'

import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY } from '../lib/theme'
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
import './onepager.css'

/**
 * The redesigned one-pager. Mounted at /minimal from the host portfolio.
 * All styles are scoped under `.op`; page-level background is swapped via
 * the `op-active` class while this route is mounted.
 */
export default function OnePager() {
  const [isDark, setIsDark] = useState(() => getPreferredTheme() === 'dark')

  // Take over the page shell (background, smooth scrolling) while mounted.
  useLayoutEffect(() => {
    const { documentElement: html, body } = document
    const hadSmooth = html.style.scrollBehavior
    html.classList.add('op-active')
    body.classList.add('op-active')
    return () => {
      html.classList.remove('op-active')
      body.classList.remove('op-active')
      if (hadSmooth === '') html.style.scrollBehavior = ''
    }
  }, [])

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
  // so replay any #hash once they exist. Fresh route entry scrolls to top.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    const { hash } = window.location
    if (!hash) return undefined
    const raf = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="op">
      <SkipLink targetId="op-main-content" />
      <Nav isDark={isDark} onThemeChange={toggleTheme} />

      <main id="op-main-content">
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
    </div>
  )
}
