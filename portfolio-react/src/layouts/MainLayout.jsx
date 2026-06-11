import { useCallback, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

import AmbientAtmosphere from '../components/AmbientAtmosphere'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import SkipLink from '../components/SkipLink'
import BackToTop from '../components/BackToTop'
import CursorHalo from '../components/CursorHalo'
import ScrollProgressRail from '../components/ScrollProgressRail'
import CommandPalette from '../components/CommandPalette'
import CmdKHint from '../components/CmdKHint'



export default function MainLayout({ isDark, setIsDark }) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const toggleTheme = useCallback(() => setIsDark(!isDark), [isDark, setIsDark])

  useEffect(() => {
    const hash = location.hash
    if (hash) {
      const id = hash.replace('#', '')
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (!el) return
        const navbarHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '76',
          10
        )
        const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 8
        window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' })
      }
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(scrollToTarget)
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
      }
    }
  }, [location.pathname, location.hash, reduceMotion])

  const pageVariants = reduceMotion
    ? {}
    : {
        initial: { clipPath: 'inset(0 0 100% 0)', y: 14, opacity: 0.6 },
        animate: {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          opacity: 1,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
        exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: 'easeIn' } },
      }

  return (
    <>
      <SkipLink targetId="main-content" />
      <SEO />
      <div className="app-shell">
        <AmbientAtmosphere enableAnimation />
        <CursorHalo />
        <ScrollProgressRail />
        <CommandPalette toggleTheme={toggleTheme} />
        <CmdKHint />
        <div className="app-shell-content">
          <Navbar
            isDark={isDark}
            setIsDark={setIsDark}
          />

          <main id="main-content">
            <AnimatePresence mode="wait" onExitComplete={() => { if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }}>
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>

          <BackToTop />
        </div>
      </div>
    </>
  )
}
