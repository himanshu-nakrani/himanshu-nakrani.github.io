import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
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

  return (
    <>
      <SEO />
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <main>
        <Outlet />
      </main>

      <footer
        style={{
          textAlign: 'center',
          padding: '4rem max(var(--page-pad-x), env(safe-area-inset-right)) max(4rem, env(safe-area-inset-bottom)) max(var(--page-pad-x), env(safe-area-inset-left))',
          color: 'var(--text2)',
          fontSize: '0.875rem',
          background: 'var(--bg)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
          <p style={{ marginBottom: '1rem' }}>
            © 2025 Himanshu Nakrani ·{' '}
            <a
              href="https://github.com/himanshu-nakrani"
              target="_blank"
              rel="noopener"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              himanshu-nakrani
            </a>
          </p>
          <p className="footer-note">
            Crafted with passion for AI, LLMs, and scalable systems.
          </p>
        </div>
      </footer>
    </>
  )
}

