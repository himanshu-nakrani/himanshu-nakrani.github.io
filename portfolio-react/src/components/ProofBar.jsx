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
      className="glass"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        padding: '0.75rem 1.25rem',
        borderRadius: 0,
        borderLeft: 'none',
        borderRight: 'none',
        fontSize: '0.8125rem',
        color: 'var(--text2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {links.map((link) => {
        const Icon = iconMap[link.label]
        const isResume = link.label === 'Resume'
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('#') || link.href.startsWith('/') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={link.sublabel ? `${link.label}, ${link.sublabel}` : link.label}
            className={isResume ? 'glass-btn-primary' : ''}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: isResume ? '0.35rem 0.85rem' : '0.3rem 0.65rem',
              borderRadius: 9999,
              color: isResume ? '#fff' : 'var(--text2)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              fontWeight: isResume ? 600 : 500,
              transition: 'color 0.18s ease, background 0.18s ease, transform 0.18s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              if (!isResume) {
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'var(--glass-bg)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={e => {
              if (!isResume) {
                e.currentTarget.style.color = 'var(--text2)'
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {Icon && <Icon size={14} style={{ position: 'relative', zIndex: 1, opacity: 0.8 }} />}
            <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
            {link.sublabel && (
              <span
                style={{
                  fontSize: '0.68rem',
                  opacity: 0.6,
                  fontWeight: 500,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {link.sublabel}
              </span>
            )}
          </a>
        )
      })}
    </nav>
  )
}
