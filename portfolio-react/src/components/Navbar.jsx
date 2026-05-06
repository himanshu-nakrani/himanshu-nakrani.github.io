import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { NavLink, useLocation } from 'react-router-dom'

const MotionNavLink = motion(NavLink)

// Minimal navigation — matches editorial reference
const navLinks = [
  { label: 'Work', to: '/projects' },
  { label: 'Writing', to: '/research' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/#contact' },
]

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Navbar({ isDark, setIsDark }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const hamburgerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to) => {
    if (to === '/projects') return location.pathname === '/projects'
    if (to === '/research') return location.pathname === '/research'
    if (to === '/about') return location.pathname === '/about'
    return false
  }

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    const navbarHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '76',
      10
    )
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 8
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [reduceMotion])

  const handleNavClick = (item, event) => {
    setOpen(false)
    if (!item.to.startsWith('/#')) return
    if (location.pathname !== '/') return
    event.preventDefault()
    const id = item.to.replace('/#', '')
    scrollToId(id)
    window.history.replaceState(null, '', `/#${id}`)
  }

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!open) return
    requestAnimationFrame(() => {
      const focusable = menuRef.current?.querySelectorAll(FOCUSABLE)
      focusable?.[0]?.focus()
    })

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        hamburgerRef.current?.focus()
        return
      }
      if (e.key === 'Tab') {
        const focusable = Array.from(menuRef.current?.querySelectorAll(FOCUSABLE) || [])
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header
      className="editorial-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled 
          ? 'color-mix(in srgb, var(--color-bg) 95%, transparent)' 
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div 
        style={{ 
          maxWidth: 'var(--container)', 
          margin: '0 auto',
          padding: '0 var(--page-pad-x)',
        }}
      >
        <motion.nav
          initial={reduceMotion ? false : { y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'var(--navbar-height)',
          }}
        >
          {/* Logo — himanshu—nakrani */}
          <MotionNavLink
            to="/"
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(false)}
            style={{
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontWeight: 400,
                fontSize: '1rem',
                letterSpacing: '-0.01em',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
              }}
            >
              himanshu<span style={{ color: 'var(--color-text-subtle)' }}>—</span>nakrani
            </span>
          </MotionNavLink>

          {/* Desktop nav links — Work · Writing · About · Contact */}
          <div 
            className="nav-desktop" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2rem',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                margin: 0,
                padding: 0,
              }}
            >
              {navLinks.map((item, index) => {
                const active = isActive(item.to)
                return (
                  <li key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
                    <MotionNavLink
                      to={item.to}
                      whileTap={{ scale: 0.97 }}
                      onClick={(event) => handleNavClick(item, event)}
                      aria-current={active ? 'page' : undefined}
                      style={{
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: active ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        transition: 'color 0.2s ease',
                        padding: '0.5rem 0',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) e.currentTarget.style.color = 'var(--color-text)'
                      }}
                      onMouseLeave={(e) => {
                        if (!active) e.currentTarget.style.color = 'var(--color-text-muted)'
                      }}
                    >
                      {item.label}
                    </MotionNavLink>
                    {index < navLinks.length - 1 && (
                      <span 
                        style={{ 
                          color: 'var(--color-text-subtle)', 
                          margin: '0 0.75rem',
                          fontSize: '0.75rem',
                        }}
                      >
                        ·
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>

            <ThemeToggle isDark={isDark} setIsDark={setIsDark} compact />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="nav-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} compact />
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setOpen((prev) => !prev)}
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
                borderRadius: 8,
                background: 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                cursor: 'pointer',
              }}
            >
              <span className="sr-only">{open ? 'Close navigation menu' : 'Open navigation menu'}</span>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile dropdown menu */}
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              ref={menuRef}
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="nav-mobile-only"
              style={{
                paddingBottom: '1.5rem',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <ul
                id="mobile-nav-menu"
                role="list"
                aria-label="Navigation links"
                style={{ 
                  listStyle: 'none', 
                  padding: 0,
                  margin: 0,
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 4 
                }}
              >
                {navLinks.map((item) => {
                  const active = isActive(item.to)
                  return (
                    <li key={item.label}>
                      <NavLink
                        to={item.to}
                        onClick={(event) => handleNavClick(item, event)}
                        aria-current={active ? 'page' : undefined}
                        style={{
                          display: 'block',
                          padding: '0.75rem 0',
                          color: active ? 'var(--color-accent)' : 'var(--color-text-muted)',
                          textDecoration: 'none',
                          fontSize: '1rem',
                          fontWeight: active ? 500 : 400,
                          transition: 'color 0.2s',
                        }}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
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
