import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { FileText, Menu, Moon, Sun, X } from 'lucide-react'
import { navSections, resumeUrl } from '../content'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  return (
    <div className="progress-rail" aria-hidden="true">
      <motion.div className="progress-rail__bar" style={{ scaleX }} />
    </div>
  )
}

export default function Nav({ isDark, onThemeChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = navSections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        // ⚡ Bolt: Use a single-pass loop instead of filter/sort to find the most visible entry,
        // reducing O(N log N) overhead and intermediate array allocations in high-frequency callbacks.
        let mostVisible = null
        let maxRatio = -1
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            mostVisible = entry
            maxRatio = entry.intersectionRatio
          }
        }
        if (mostVisible) setActiveId(mostVisible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5] }
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const linkList = (isMobile) =>
    navSections.map(({ id, label }) => (
      <li key={id}>
        <a
          href={`#${id}`}
          className={isMobile ? 'nav__mobile-link' : 'nav__link'}
          aria-current={!isMobile && activeId === id ? 'true' : undefined}
          {...(!isMobile && activeId === id ? { 'data-active': true } : {})}
          onClick={closeMenu}
        >
          {label}
        </a>
      </li>
    ))

  return (
    <>
      <ScrollProgress />
      <header className={scrolled ? 'nav is-scrolled' : 'nav'}>
        <div className="nav__inner">
          <a href="#top" className="nav__brand" aria-label="Himanshu Nakrani — back to top">
            <span className="nav__brand-mark" aria-hidden="true">HN</span>
            <span>Himanshu Nakrani</span>
          </a>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {linkList(false)}
            </ul>
          </nav>

          <div className="nav__actions">
            <Link to="/" className="nav__back" title="Back to the full portfolio">
              ← Full portfolio
            </Link>
            <a
              href={resumeUrl}
              className="btn btn--ghost btn--sm nav__resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={14} aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              className="theme-toggle"
              onClick={onThemeChange}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              className="nav__burger"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="mobile-nav"
            className="nav__mobile"
            aria-label="Mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <ul className="nav__mobile-list">
              {linkList(true)}
              <li>
                <Link to="/" className="nav__mobile-link" onClick={closeMenu}>
                  ← Full portfolio
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
