import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X, Search, Command } from 'lucide-react'
import DesignModeToggle from './DesignModeToggle'
import ThemeToggle from './ThemeToggle'
import Pill3DNav from './ui/Pill3DNav'
import { prefetchRoute } from '../lib/routePrefetch'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

import { NavLink, useLocation } from 'react-router-dom'

// Capped at 8 items — logo handles "/" navigation
const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Research', to: '/research' },
  { label: 'Lab', to: '/lab' },
  { label: 'Profiles', to: '/profiles' },
  { label: 'Minimal', to: '/minimal', isSecondary: true },
]

const contactItem = { label: 'Contact', to: '/#contact' }
const navItems = [...navLinks, { ...contactItem, isContact: true }]

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Navbar({ isDark, setIsDark, designMode, setDesignMode }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduceMotion = usePrefersReducedMotion()
  const hamburgerRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isPageActive = (label) => {
    if (label === 'Projects')    return location.pathname === '/projects' || location.pathname.startsWith('/projects/')
    if (label === 'Experience')  return location.pathname === '/experience'
    if (label === 'Profiles')    return location.pathname === '/profiles'
    if (label === 'Research')    return location.pathname === '/research' || location.pathname.startsWith('/research/')
    if (label === 'Skills')      return location.pathname === '/skills'
    if (label === 'About')       return location.pathname === '/about'
    if (label === 'Lab')         return location.pathname === '/lab'
    if (label === 'Minimal')     return location.pathname === '/minimal'
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

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

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
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
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
        <div
          className="glass-nav"
          data-reduce-motion={reduceMotion ? 'true' : 'false'}
          data-scrolled={scrolled ? 'true' : 'false'}
          onPointerMove={(event) => {
            if (reduceMotion) return
            const bounds = event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--glass-x', `${event.clientX - bounds.left}px`)
            event.currentTarget.style.setProperty('--glass-y', `${event.clientY - bounds.top}px`)
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.removeProperty('--glass-x')
            event.currentTarget.style.removeProperty('--glass-y')
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 52,
            padding: '6px 8px 6px 14px',
            borderRadius: 9999,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Logo — calm dot + monogram */}
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            onPointerEnter={() => prefetchRoute('/')}
            onFocus={() => prefetchRoute('/')}
            className="nav-brand"
            aria-label="Himanshu Nakrani — Home"
          >
            <span className="nav-brand__mark" aria-hidden="true"><span /></span>
            <span className="nav-brand__name">Himanshu</span>
          </NavLink>

          {/* Desktop nav links */}
          <nav aria-label="Main navigation" className="nav-desktop" style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: 0 }}>
            <Pill3DNav
              items={navLinks}
              isActive={isPageActive}
              onItemClick={handleNavClick}
            />
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
            {/* Command Palette Trigger */}
            <button
              onClick={() => {
                document.dispatchEvent(new CustomEvent('open-command-palette'))
              }}
              className="nav-cmd-btn"
              aria-label="Open command palette (Cmd+K)"
            >
              <Search size={13} />
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 2,
                padding: '2px 4px',
                background: 'var(--color-bg)',
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
              }}>
                <Command size={9} />K
              </span>
            </button>
            <DesignModeToggle designMode={designMode} setDesignMode={setDesignMode} compact />
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} compact />
            <NavLink
              to={contactItem.to}
              onClick={(event) => handleNavClick({ ...contactItem, isContact: true }, event)}
              onPointerEnter={() => prefetchRoute(contactItem.to)}
              onFocus={() => prefetchRoute(contactItem.to)}
              className="glass-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'var(--color-text)',
                padding: '6px 14px',
                borderRadius: 9999,
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                position: 'relative',
                overflow: 'hidden',
                borderColor: 'var(--color-border-strong)',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Contact</span>
            </NavLink>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="nav-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <DesignModeToggle designMode={designMode} setDesignMode={setDesignMode} compact />
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
        </div>

        {/* Mobile dropdown menu */}
        {open && (
            <div
              ref={menuRef}
              className="nav-mobile-only glass nav-mobile-menu"
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
                      <NavLink
                        to={item.to}
                        onClick={(event) => handleNavClick(item, event)}
                        onPointerEnter={() => prefetchRoute(item.to)}
                        onFocus={() => prefetchRoute(item.to)}
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
                            ? 'color-mix(in srgb, var(--color-accent) 12%, transparent)'
                            : active
                            ? 'color-mix(in srgb, var(--color-accent) 8%, transparent)'
                            : 'transparent',
                          border: item.isContact ? '1px solid color-mix(in srgb, var(--color-accent) 30%, var(--ghost-border))' : 'none',
                          textAlign: item.isContact ? 'center' : 'left',
                          minHeight: item.isContact ? 48 : 44,
                          borderLeft: (!item.isContact && active)
                            ? '2px solid var(--color-accent)'
                            : (!item.isContact ? '2px solid transparent' : 'none'),
                          transition: 'color 0.2s, background 0.2s',
                        }}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
      </div>

      <style>{`
        .nav-pill-links::-webkit-scrollbar { display: none; }
        .nav-pill-links { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-nav {
          animation: nav-shell-enter 0.35s cubic-bezier(0.25, 0.1, 0.25, 1) both;
        }
        .glass-nav[data-reduce-motion="true"] {
          animation: none;
        }
        .glass-nav a:hover {
          opacity: 0.88;
        }
        .nav-mobile-menu {
          animation: nav-menu-enter 0.2s cubic-bezier(0.25, 0.1, 0.25, 1) both;
        }
        @keyframes nav-shell-enter {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes nav-menu-enter {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .glass-nav,
          .nav-mobile-menu {
            animation: none;
          }
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
