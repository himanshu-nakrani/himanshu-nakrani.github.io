import { useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'
import AmbientAtmosphere from '../components/AmbientAtmosphere'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import SkipLink from '../components/SkipLink'
import BackToTop from '../components/BackToTop'
import CommandPalette from '../components/CommandPalette'

const footerSocials = [
  { icon: Github, href: 'https://github.com/himanshu-nakrani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himanshu-nakrani/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:himanshunakrani0@gmail.com', label: 'Email' },
]

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
        <CommandPalette />
        <div className="app-shell-content">
          <Navbar isDark={isDark} setIsDark={setIsDark} />

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

          {/* Editorial footer — minimal */}
          <footer
            role="contentinfo"
            style={{
              padding: 'clamp(3rem, 8vw, 4rem) var(--page-pad-x)',
              color: 'var(--color-text-muted)',
              fontSize: '0.875rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1.5rem',
              }}>
                {/* Left: Copyright */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontWeight: 400,
                    color: 'var(--color-text)',
                    fontSize: '0.9rem',
                  }}>
                    himanshu<span style={{ color: 'var(--color-text-subtle)' }}>—</span>nakrani
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
                    © {new Date().getFullYear()}
                  </span>
                </div>

                {/* Right: Socials */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  {footerSocials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      aria-label={label}
                      style={{
                        color: 'var(--color-text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)' }}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
