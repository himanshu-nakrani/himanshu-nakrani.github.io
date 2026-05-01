import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

import { NavLink, useLocation } from 'react-router-dom'

const MotionNavLink = motion(NavLink)

const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Profiles', to: '/profiles' },
  { label: 'Research', to: '/research' },
  { label: 'Skills', to: '/skills' },
]

const contactItem = { label: 'Contact', to: '/#contact' }
const navItems = [...navLinks, { ...contactItem, isContact: true }]

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Navbar({ isDark, setIsDark }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const hamburgerRef = useRef(null)
  const menuRef = useRef(null)

  const isPageActive = (label) => {
    if (label === 'Projects')    return location.pathname === '/projects'
    if (label === 'Experience')  return location.pathname === '/experience'
    if (label === 'Profiles')    return location.pathname === '/profiles'
    if (label === 'Research')    return location.pathname === '/research'
    if (label === 'Skills')      return location.pathname === '/skills'
    if (label === 'About')       return location.pathname === '/'
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

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!open) return
    // Move focus to first focusable item in menu
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
          className="glass-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 52,
            padding: '6px 8px 6px 14px',
            borderRadius: 9999,
            position: 'relative',
            overflow: 'hidden',
            transition: 'box-shadow 0.25s ease',
          }}
        >
          {/* Logo */}
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
                background: 'var(--color-accent)',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: '0.875rem',
                letterSpacing: '0.08em',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-display)',
              }}
            >
              HN.AI
            </span>
          </MotionNavLink>

          {/* Desktop nav links */}
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
                      whileTap={{ scale: 0.98 }}
                      onClick={(event) => handleNavClick(item, event)}
                      aria-current={active ? 'page' : undefined}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        minWidth: 52,
                        padding: '4px 10px 6px',
                        textDecoration: 'none',
                        fontSize: '0.8125rem',
                        fontWeight: active ? 600 : 500,
                        color: active ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        transition: 'color 0.2s ease',
                        borderRadius: 8,
                        background: active ? 'color-mix(in srgb, var(--color-accent) 10%, transparent)' : 'transparent',
                        position: 'relative',
                      }}
                    >
                      <span style={{ lineHeight: 1.2 }}>{item.label}</span>
                      {/* Active underline indicator */}
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 2,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: active ? '60%' : '0%',
                          height: 2,
                          borderRadius: 2,
                          background: 'var(--color-accent)',
                          transition: 'width 0.22s var(--motion-ease-out)',
                        }}
                      />
                    </MotionNavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Desktop right side */}
          <div
            className="nav-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
              paddingLeft: 8,
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} compact />
            <MotionNavLink
              to={contactItem.to}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(event) => handleNavClick({ ...contactItem, isContact: true }, event)}
              className="glass-btn"
              style={{
                display: 'inline-block',
                color: 'var(--color-text)',
                padding: '8px 16px',
                borderRadius: 9999,
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Contact</span>
            </MotionNavLink>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="nav-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} compact />
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="nav-mobile-btn glass-btn"
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
                color: 'var(--color-text)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span className="sr-only">{open ? 'Close navigation menu' : 'Open navigation menu'}</span>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="nav-mobile-only glass"
              style={{
                marginTop: 10,
                borderRadius: 16,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <ul
                id="mobile-nav-menu"
                role="list"
                aria-label="Navigation links"
                style={{ listStyle: 'none', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}
              >
                {navItems.map((item) => {
                  const active = !item.isContact && isPageActive(item.label)
                  return (
                    <li key={item.label}>
                      <MotionNavLink
                        to={item.to}
                        onClick={(event) => handleNavClick(item, event)}
                        whileHover={{ x: 2 }}
                        aria-current={active ? 'page' : undefined}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: item.isContact ? 'center' : 'flex-start',
                          padding: item.isContact ? '12px 14px' : '12px 12px',
                          borderRadius: item.isContact ? 9999 : 10,
                          color: active ? 'var(--color-accent)' : item.isContact ? 'var(--color-text)' : 'var(--color-text-muted)',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: (item.isContact || active) ? 600 : 500,
                          background: item.isContact
                            ? 'var(--pill-contact-mobile-bg)'
                            : active
                            ? 'color-mix(in srgb, var(--color-accent) 8%, transparent)'
                            : 'transparent',
                          border: item.isContact ? '1px solid var(--ghost-border)' : 'none',
                          textAlign: item.isContact ? 'center' : 'left',
                          minHeight: item.isContact ? 48 : 44,
                          borderLeft: (!item.isContact && active)
                            ? '2px solid var(--color-accent)'
                            : (!item.isContact ? '2px solid transparent' : 'none'),
                        }}
                      >
                        {item.label}
                      </MotionNavLink>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .nav-pill-links::-webkit-scrollbar { display: none; }
        .nav-pill-links { -ms-overflow-style: none; scrollbar-width: none; }
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
