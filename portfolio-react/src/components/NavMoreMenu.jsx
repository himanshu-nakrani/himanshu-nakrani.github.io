import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

import { prefetchRoute } from '../lib/routePrefetch'

/**
 * NavMoreMenu — desktop overflow dropdown for secondary destinations.
 * Keeps the primary nav to a scannable set while preserving access to
 * Research / Lab / Profiles / Skills / Minimal behind one control.
 */
export default function NavMoreMenu({ items, isActive, onItemClick }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const wrapRef = useRef(null)
  const triggerRef = useRef(null)

  const close = useCallback(() => setOpen(false), [])

  // Any secondary destination active highlights the trigger.
  const anyActive = items.some((item) => isActive(item.label))

  // Close on route change.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) close()
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
    <div ref={wrapRef} style={{ position: 'relative', flexShrink: 0 }}>
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

      {open && (
        <div
          aria-label="More destinations"
          className="glass nav-more-menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: 180,
            padding: 6,
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 120,
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
        </div>
      )}
    </div>
  )
}
