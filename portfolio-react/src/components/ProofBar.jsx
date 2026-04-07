import React from 'react'

/**
 * ProofBar — minimal horizontal nav bar of labeled external profile links.
 * @param {{ links: Array<{ label: string, href: string, sublabel?: string, icon?: string }> }} props
 */
export default function ProofBar({ links = [] }) {
  return (
    <nav
      aria-label="External profiles and proof links"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.25rem',
        padding: '0.625rem 1rem',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        fontSize: '0.8125rem',
        color: 'var(--text2)',
      }}
    >
      {links.map((link, i) => (
        <React.Fragment key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.sublabel ? `${link.label}, ${link.sublabel}` : link.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text2)',
              textDecoration: 'none',
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onFocus={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onBlur={e => { e.currentTarget.style.color = 'var(--text2)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)' }}
          >
            <span>{link.label}</span>
            {link.sublabel && (
              <span
                className="proof-sublabel"
                style={{
                  fontSize: '0.7rem',
                  opacity: 0.7,
                  fontWeight: 500,
                }}
              >
                {link.sublabel}
              </span>
            )}
          </a>
          {i < links.length - 1 && (
            <span aria-hidden="true" className="proof-sep" style={{ opacity: 0.35, userSelect: 'none' }}>
              ·
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
