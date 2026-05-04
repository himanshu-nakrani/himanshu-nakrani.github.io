import React from 'react'
import { Github, Award, Code2, Linkedin, BookOpen, FileText } from 'lucide-react'

const iconMap = {
  GitHub: Github,
  Kaggle: Award,
  LeetCode: Code2,
  LinkedIn: Linkedin,
  Research: BookOpen,
  Resume: FileText,
}

export default function ProofBar({ links = [] }) {
  return (
    <nav
      aria-label="External profiles and proof links"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem',
        padding: '1.25rem',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 400,
        letterSpacing: '0.02em',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {links.map((link, idx) => {
        const Icon = iconMap[link.label]
        const isResume = link.label === 'Resume'
        return (
          <span key={link.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href={link.href}
              target={link.href.startsWith('#') || link.href.startsWith('/') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={link.sublabel ? `${link.label}, ${link.sublabel}` : link.label}
              className={isResume ? 'glass-btn-primary' : ''}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: isResume ? '0.4rem 0.95rem' : '0',
                borderRadius: isResume ? 9999 : 0,
                color: isResume ? 'var(--color-bg)' : 'var(--color-accent)',
                textDecoration: 'none',
                fontSize: isResume ? '0.75rem' : '0.7rem',
                fontWeight: isResume ? 600 : 400,
                fontFamily: isResume ? 'var(--font-mono)' : 'var(--font-mono)',
                transition: 'opacity 0.18s ease, transform 0.18s ease',
                position: 'relative',
                opacity: isResume ? 1 : 0.7,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = isResume ? '0.9' : '1'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = isResume ? '1' : '0.7'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {Icon && (
                <Icon
                  size={12}
                  style={{ opacity: 0.75, flexShrink: 0 }}
                />
              )}
              <span>{link.label}</span>
            </a>
            {idx < links.length - 1 && (
              <span style={{ width: 1, height: 12, background: 'var(--color-border)', opacity: 0.4 }} />
            )}
          </span>
        )
      })}
    </nav>
  )
}
