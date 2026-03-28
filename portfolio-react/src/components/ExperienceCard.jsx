import { useState } from 'react'
import { motion } from 'framer-motion'
import Tag from './Tag'

export default function ExperienceCard({ item, index = 0, animateEntry = true, onCardClick = null }) {
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
          <div style={{ minWidth: 0, flex: 1 }}>
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
              flexShrink: 0,
            }}
          >
            {item.period}
          </span>
        </div>

        {item.description && (
          <p
            style={{
              color: 'var(--text2)',
              fontSize: '0.9rem',
              lineHeight: 1.65,
              marginBottom: '1.15rem',
            }}
          >
            {item.description}
          </p>
        )}

        {onCardClick && (
          <button
            onClick={onCardClick}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              marginTop: 8,
              fontSize: '0.8rem',
              color: 'var(--accent)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.25s ease',
              opacity: hovered ? 1 : 0.8,
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = hovered ? '1' : '0.8'
            }}
          >
            View all details →
          </button>
        )}

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
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    border: '1px solid',
    borderColor: hovered ? 'var(--border2)' : 'var(--border)',
    background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
    boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
    cursor: onCardClick ? 'pointer' : 'default',
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
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onCardClick}
      animate={animateEntry ? 'show' : 'hidden'}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      style={shellStyle}
    >
      {inner}
    </motion.div>
  )
}
