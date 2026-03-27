import { useState } from 'react'
import { motion } from 'framer-motion'
import Tag from './Tag'

function highlightBullets(html) {
  return html.replace(
    /(Alpha Copilot|WealthAI|Agent Forge|75%|25%|95%\+|87%|40%)/g,
    '<strong style="color:var(--accent2)">$1</strong>',
  )
}

export default function ExperienceCard({ item, index = 0, animateEntry = true }) {
  const [hovered, setHovered] = useState(false)

  const inner = (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, var(--nav-dot) 0%, var(--accent) 45%, rgba(74, 158, 255, 0.15) 100%)',
          opacity: hovered ? 1 : 0.9,
          transition: 'opacity 0.3s ease',
        }}
      />

      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0.6,
          transition: 'opacity 0.35s ease',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: '1.5rem 1.5rem 1.45rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.15rem',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontSize: '1.08rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: 6,
                color: 'var(--text)',
                lineHeight: 1.3,
              }}
            >
              {item.role}
            </h3>
            {item.progression && (
              <p
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text2)',
                  fontFamily: "'Fira Code', monospace",
                  marginBottom: 8,
                  lineHeight: 1.5,
                }}
              >
                {item.progression}
              </p>
            )}
            <p
              style={{
                fontSize: '0.86rem',
                color: hovered ? 'var(--accent3)' : 'var(--text2)',
                fontWeight: 500,
                transition: 'color 0.25s ease',
              }}
            >
              {item.company}
              <span style={{ opacity: 0.5, margin: '0 0.35rem' }}>·</span>
              {item.location}
            </p>
          </div>

          <span
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.72rem',
              color: 'var(--nav-dot)',
              background: 'rgba(167, 139, 250, 0.1)',
              border: '1px solid rgba(167, 139, 250, 0.28)',
              padding: '6px 14px',
              borderRadius: 9999,
              whiteSpace: 'nowrap',
              boxShadow: hovered ? '0 0 20px rgba(167, 139, 250, 0.15)' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {item.period}
          </span>
        </div>

        <div
          style={{
            borderLeft: '2px solid rgba(74, 158, 255, 0.28)',
            marginBottom: '1.15rem',
            paddingLeft: '1rem',
            marginLeft: 2,
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {item.bullets.map((b, i) => (
              <li
                key={i}
                style={{
                  position: 'relative',
                  paddingLeft: 14,
                  paddingBottom: i === item.bullets.length - 1 ? 0 : 10,
                  color: 'var(--text2)',
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.55em',
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    boxShadow: '0 0 8px rgba(74, 158, 255, 0.45)',
                  }}
                />
                <span dangerouslySetInnerHTML={{ __html: highlightBullets(b) }} />
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
            marginBottom: '1rem',
            opacity: 0.85,
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {item.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </>
  )

  const shellStyle = {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    border: '1px solid',
    borderColor: hovered ? 'rgba(167, 139, 250, 0.35)' : 'var(--border)',
    background: 'linear-gradient(155deg, var(--surface) 0%, var(--surface2) 52%, rgba(var(--bg-rgb), 0.4) 100%)',
    boxShadow: hovered
      ? '0 12px 40px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(167, 139, 250, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
      : '0 4px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
    transition: 'border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
  }

  if (animateEntry) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={shellStyle}
      >
        {inner}
      </motion.article>
    )
  }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={shellStyle}
    >
      {inner}
    </article>
  )
}
