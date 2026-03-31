import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollProgress from '../components/ScrollProgress'
import ParticleBackground from '../components/ParticleBackground'
import SEO from '../components/SEO'

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
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      }
      // Paint route first, then scroll (double rAF — faster than setTimeout)
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

  const pageTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.14, ease: [0.25, 0.1, 0.25, 1] }

  return (
    <>
      <SEO />
      <ScrollProgress />
      <ParticleBackground />
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <AnimatePresence initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={pageTransition}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          padding: '2.75rem max(var(--page-pad-x), env(safe-area-inset-right))  max(2.75rem, env(safe-area-inset-bottom)) max(var(--page-pad-x), env(safe-area-inset-left))',
          color: 'var(--text2)',
          fontSize: '0.82rem',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
          <p style={{ marginBottom: '1rem' }}>
            © 2025 Himanshu Nakrani ·{' '}
            <motion.a
              href="https://github.com/himanshu-nakrani"
              target="_blank"
              rel="noopener"
              whileHover={{ color: 'var(--accent)' }}
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              himanshu-nakrani
            </motion.a>
          </p>
          <p className="footer-note">
            Crafted with passion for AI, LLMs, and scalable systems.
          </p>
        </div>
      </motion.footer>
    </>
  )
}

