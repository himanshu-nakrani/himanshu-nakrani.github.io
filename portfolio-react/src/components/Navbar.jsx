import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import StyleModeSelector from './StyleModeSelector'
import { useIsMobile } from '../hooks/useIsMobile'

import { NavLink, useLocation } from 'react-router-dom'

const MotionNavLink = motion(NavLink)

const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/experience', mobileHash: '#experience' },
  { label: 'Projects', to: '/projects', mobileHash: '#projects' },
  { label: 'Profiles', to: '/profiles', mobileHash: '#profiles' },
  { label: 'Research', to: '/research', mobileHash: '#research' },
  { label: 'Skills', to: '/skills', mobileHash: '#skills' },
]

const contactItem = { label: 'Contact', to: '/#contact' }

const navItems = [...navLinks, { ...contactItem, isContact: true }]

export default function Navbar({ isDark, setIsDark, styleMode, setStyleMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  const isPageActive = (label) => {
    if (label === 'Projects') return location.pathname === '/projects'
    if (label === 'Experience') return location.pathname === '/experience'
    if (label === 'Profiles') return location.pathname === '/profiles'
    if (label === 'Research') return location.pathname === '/research'
    if (label === 'Skills') return location.pathname === '/skills'
    if (label === 'About') return location.pathname === '/'
    return false
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (item, event) => {
    setOpen(false)

    // On mobile, use hash navigation for smooth scrolling
    if (isMobile && item.mobileHash) {
      event.preventDefault()
      const id = item.mobileHash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      }
      return
    }

    if (!item.to.startsWith('/#')) return
    if (location.pathname !== '/') return

    event.preventDefault()
    const id = item.to.replace('/#', '')
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
      window.history.replaceState(null, '', `/#${id}`)
    }
  }

  const pillBg = scrolled ? 'color-mix(in srgb, var(--surface2) 86%, transparent)' : 'color-mix(in srgb, var(--surface) 70%, transparent)'
  const pillBorder = '1px solid color-mix(in srgb, var(--border2) 82%, transparent)'

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: 'max(12px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) 12px max(16px, env(safe-area-inset-left))',
        pointerEvents: 'none',
      }}
    >
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', pointerEvents: 'auto' }}>
        <motion.div
          initial={reduceMotion ? false : { y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 52,
            padding: '6px 8px 6px 14px',
            borderRadius: 9999,
            border: pillBorder,
            background: pillBg,
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
            transition: 'background 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          <MotionNavLink
            to="/"
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
              paddingRight: 8,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--nav-dot)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.08em',
                color: 'var(--text)',
                fontFamily: 'var(--font-display)',
              }}
            >
              HN.AI
            </span>
          </MotionNavLink>

          <nav aria-label="Main navigation" className="nav-desktop" style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
            <ul
              className="nav-pill-links"
              style={{
                listStyle: 'none',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                margin: 0,
                padding: '0 4px',
                minWidth: 0,
                overflowX: 'auto',
              }}
            >
              {navLinks.map((item) => {
                const active = isPageActive(item.label)
                return (
                  <li key={item.label} style={{ flexShrink: 0 }}>
                    <MotionNavLink
                      to={item.to}
                      whileHover={{ color: 'var(--text)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(event) => handleNavClick(item, event)}
                      aria-current={active ? 'page' : undefined}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        minWidth: 52,
                        padding: active ? '4px 12px' : '4px 8px 2px',
                        textDecoration: 'none',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: active ? 'var(--text)' : 'var(--text2)',
                        transition: 'color 0.2s ease',
                        background: active ? 'color-mix(in srgb, var(--accent) 10%, transparent)' : 'transparent',
                        borderRadius: active ? 9999 : undefined,
                      }}
                    >
                      <span style={{ lineHeight: 1.2 }}>{item.label}</span>
                      {!active && (
                        <span
                          style={{
                            height: 12,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            width: '100%',
                          }}
                        />
                      )}
                    </MotionNavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div
            className="nav-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
              paddingLeft: 8,
              borderLeft: '1px solid var(--border)',
            }}
          >
            <StyleModeSelector styleMode={styleMode} setStyleMode={setStyleMode} compact />
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} compact />
            <MotionNavLink
              to={contactItem.to}
              whileHover={{ borderColor: 'var(--ghost-hover-border)', background: 'var(--ghost-hover-bg)' }}
              whileTap={{ scale: 0.98 }}
              onClick={(event) => handleNavClick({ ...contactItem, isContact: true }, event)}
              style={{
                display: 'inline-block',
                border: '1px solid var(--ghost-border)',
                color: 'var(--text)',
                background: 'var(--ghost-bg)',
                padding: '8px 16px',
                borderRadius: 9999,
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Contact
            </MotionNavLink>
          </div>

          <div className="nav-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} compact />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="nav-mobile-btn"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 9999,
                border: '1px solid var(--border2)',
                background: 'rgba(var(--bg-rgb), 0.35)',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              <span className="sr-only">{open ? 'Close navigation menu' : 'Open navigation menu'}</span>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="nav-mobile-only"
              style={{
                marginTop: 10,
                borderRadius: 16,
                border: pillBorder,
                background: 'rgba(var(--bg-rgb), 0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ padding: '12px 14px 0' }}>
                <StyleModeSelector styleMode={styleMode} setStyleMode={setStyleMode} />
              </div>
              <ul id="mobile-nav-menu" role="list" aria-label="Navigation links" style={{ listStyle: 'none', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <MotionNavLink
                      to={item.to}
                      onClick={(event) => handleNavClick(item, event)}
                      whileHover={{ x: 2 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: item.isContact ? 'center' : 'flex-start',
                        padding: item.isContact ? '12px 14px' : '12px 12px',
                        borderRadius: item.isContact ? 9999 : 10,
                        color: item.isContact ? 'var(--text)' : 'var(--text2)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        fontWeight: item.isContact ? 600 : 500,
                        background: item.isContact ? 'var(--pill-contact-mobile-bg)' : 'transparent',
                        border: item.isContact ? '1px solid var(--ghost-border)' : 'none',
                        textAlign: item.isContact ? 'center' : 'left',
                        minHeight: item.isContact ? 48 : 44,
                      }}
                    >
                      {item.label}
                    </MotionNavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .nav-pill-links::-webkit-scrollbar { display: none; }
        .nav-pill-links { -ms-overflow-style: none; scrollbar-width: none; }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        @media (min-width: 769px) {
          .nav-mobile-only { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
