import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import AmbientAtmosphere from '../components/AmbientAtmosphere'
import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import SkipLink from '../components/SkipLink'
import BackToTop from '../components/BackToTop'

const footerNav = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Research', href: '/research' },
  { label: 'Skills', href: '/skills' },
  { label: 'Profiles', href: '/profiles' },
]

const footerSocials = [
  { icon: Github, href: 'https://github.com/himanshu-nakrani', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himanshu-nakrani/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:himanshunakrani0@gmail.com', label: 'Email' },
  { icon: FileText, href: '/resume.pdf', label: 'Resume' },
]

const builtWith = ['React', 'Vite', 'Framer Motion', 'Vercel']

export default function MainLayout({ isDark, setIsDark, styleMode, setStyleMode }) {
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
      <SkipLink targetId="main-content" />
      <SEO />
      <div className="app-shell">
        <AmbientAtmosphere enableAnimation intensity="subtle" />
        <div className="app-shell-content">
          <Navbar
            isDark={isDark}
            setIsDark={setIsDark}
            styleMode={styleMode}
            setStyleMode={setStyleMode}
          />

          <main id="main-content">
            <Outlet />
          </main>

          <BackToTop />

          <footer
            role="contentinfo"
            className="glass"
            style={{
              padding: 'clamp(3rem, 8vw, 4.5rem) max(var(--page-pad-x), env(safe-area-inset-right)) max(2rem, env(safe-area-inset-bottom)) max(var(--page-pad-x), env(safe-area-inset-left))',
              color: 'var(--text2)',
              fontSize: '0.875rem',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 0,
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: 'none',
            }}
          >
            <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
                gap: 'clamp(2rem, 5vw, 3rem)',
                marginBottom: '2.5rem',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--nav-dot)' }} />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                      HN.AI
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.65, maxWidth: 280, color: 'var(--text2)' }}>
                    Building production AI systems that turn research into real-world impact.
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'var(--text)' }}>
                    Navigation
                  </h4>
                  <nav aria-label="Footer navigation" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {footerNav.map(item => (
                      <a
                        key={item.label}
                        href={item.href}
                        style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.15s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)' }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: 'var(--text)' }}>
                    Connect
                  </h4>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {footerSocials.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('mailto') || href.startsWith('/') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="glass-btn"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text2)',
                          textDecoration: 'none',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <Icon size={16} style={{ position: 'relative', zIndex: 1 }} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--glass-border)',
                paddingTop: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <p style={{ margin: 0 }}>
                  © {new Date().getFullYear()} Himanshu Nakrani
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>Built with</span>
                  {builtWith.map(tech => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.68rem',
                        padding: '2px 8px',
                        borderRadius: 9999,
                        border: '1px solid var(--glass-border)',
                        background: 'var(--glass-bg)',
                        color: 'var(--text2)',
                      }}
                    >
                      {tech}
                    </span>
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
