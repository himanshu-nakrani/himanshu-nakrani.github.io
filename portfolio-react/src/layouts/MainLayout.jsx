import { useEffect } from 'react'
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
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.hash, reduceMotion])

  const pageVariants = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
        exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } },
      }

  return (
    <>
      <SkipLink targetId="main-content" />
      <SEO />
      <div className="app-shell">
        <AmbientAtmosphere enableAnimation intensity="subtle" />
        <CursorHalo />
        <ScrollProgressRail />
        <CommandPalette />
        <CmdKHint />
        <div className="app-shell-content">
          <Navbar
            isDark={isDark}
            setIsDark={setIsDark}
          />

          <main id="main-content">
            <AnimatePresence mode="wait">
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
