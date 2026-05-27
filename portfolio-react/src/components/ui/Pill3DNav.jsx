import { motion, useReducedMotion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const LAYOUT_ID = 'uplift-nav-active-pill'

export default function Pill3DNav({ items, isActive, onItemClick }) {
  const reduce = useReducedMotion()

  return (
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
        position: 'relative',
      }}
    >
      {items.map((item) => {
        const active = isActive(item.label)
        const isSecondary = item.isSecondary
        return (
          <li key={item.label} style={{ flexShrink: 0, position: 'relative' }}>
            <NavLink
              to={item.to}
              onClick={(event) => onItemClick(item, event)}
              aria-current={active ? 'page' : undefined}
              className={active ? 'nav-link-active' : ''}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isSecondary ? '8px 12px 10px' : '8px 14px 10px',
                textDecoration: 'none',
                fontSize: isSecondary ? '0.75rem' : '0.8125rem',
                fontWeight: isSecondary ? 400 : 500,
                color: active ? 'var(--color-accent)' : isSecondary ? 'var(--color-text-subtle)' : 'var(--color-text-muted)',
                background: 'transparent',
                transition: 'color 0.2s ease',
                borderRadius: 9999,
                fontFamily: isSecondary ? 'var(--font-mono)' : undefined,
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--color-text)' }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = isSecondary ? 'var(--color-text-subtle)' : 'var(--color-text-muted)' }}
            >
              {active && (
                <motion.span
                  layoutId={LAYOUT_ID}
                  aria-hidden="true"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 32, mass: 0.6 }
                  }
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 9999,
                    background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                    boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-accent) 25%, transparent), 0 6px 20px -8px color-mix(in srgb, var(--color-accent) 50%, transparent)',
                    zIndex: 0,
                  }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
