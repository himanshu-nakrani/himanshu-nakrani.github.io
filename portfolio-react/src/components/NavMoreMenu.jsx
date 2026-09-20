import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

import { prefetchRoute } from '../lib/routePrefetch'

/**
 * NavMoreMenu — desktop overflow dropdown for secondary destinations.
 * Keeps the primary nav to a scannable set while preserving access to
 * Research / Lab / Profiles / Skills / Minimal behind one control.
 *
 * The dropdown is portaled to <body> because the navbar shell (`.glass-nav`)
 * uses `overflow: hidden` to clip its glass glow — an in-flow menu would be
 * clipped and unreachable. Positioning is computed from the trigger rect;
 * the navbar is `position: fixed`, so viewport coordinates stay stable.
 */
export default function NavMoreMenu({ items, isActive, onItemClick }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const location = useLocation()
  const triggerRef = useRef(null)
  const menuRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])

  // Any secondary destination active highlights the trigger.
  const anyActive = items.some((item) => isActive(item.label))

  const updateCoords = useCallback(() => {
    // The desktop trigger is hidden ≤768px (matches .nav-desktop CSS). If the
    // viewport crosses into mobile while open, close rather than orphan the menu.
    if (window.innerWidth <= 768) {
      setOpen(false)
      return
    }
    const rect = triggerRef.current?.getBoundingClientRect()
    if (!rect) return
    setCoords({ top: rect.bottom + 8, right: Math.max(8, window.innerWidth - rect.right) })
  }, [])

  // Close on route change.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Position before paint when opening, and keep it aligned on resize/scroll.
  useLayoutEffect(() => {
    if (!open) return undefined
    updateCoords()
    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords, { passive: true })
    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords)
    }
  }, [open, updateCoords])

  // Move focus into the portaled menu when it opens: it renders after the app
  // in DOM order, so without this Tab would skip past it into page content.
  useLayoutEffect(() => {
    if (!open || !coords) return
    menuRef.current?.querySelector('a')?.focus()
  }, [open, coords])

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (triggerRef.current?.contains(event.target)) return
      if (menuRef.current?.contains(event.target)) return
      close()
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close()
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, close])

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        ref={triggerRef}
        type="button"
        className={`nav-pill-link${anyActive ? ' nav-link-active' : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 3, border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        {anyActive && <span className="nav-pill-link__lens" aria-hidden="true" />}
        <span className="nav-pill-link__label">More</span>
        <ChevronDown size={12} aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {open && coords && createPortal(
        <div
          ref={menuRef}
          aria-label="More destinations"
          className="glass nav-more-menu"
          style={{
            position: 'fixed',
            top: coords.top,
            right: coords.right,
            minWidth: 180,
            padding: 6,
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 200,
          }}
        >
          {items.map((item) => {
            const active = isActive(item.label)
            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={(event) => {
                  close()
                  onItemClick(item, event)
                }}
                onPointerEnter={() => prefetchRoute(item.to)}
                onFocus={() => prefetchRoute(item.to)}
                aria-current={active ? 'page' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 9,
                  color: active ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.8125rem',
                  fontWeight: active ? 600 : 500,
                  background: active ? 'color-mix(in srgb, var(--color-accent) 8%, transparent)' : 'transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </NavLink>
            )
          })}
        </div>,
        document.body,
      )}
    </div>
  )
}
