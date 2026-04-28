import { useState } from 'react'
import { motion } from 'framer-motion'
import Tag from './Tag'

function ProgressionRail({ steps = [], currentStep }) {
  if (!steps.length) return null

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          alignItems: 'center',
        }}
      >
        {steps.map((step, idx) => {
          const isCurrent = step === currentStep || (!currentStep && idx === steps.length - 1)
          return (
            <span
              key={step}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  color: isCurrent ? 'var(--accent2)' : 'var(--text2)',
                  border: `1px solid ${isCurrent ? 'color-mix(in srgb, var(--accent2) 68%, transparent)' : 'var(--border)'}`,
                  background: isCurrent ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'color-mix(in srgb, var(--surface2) 72%, transparent)',
                  borderRadius: 9999,
                  padding: '4px 9px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isCurrent ? 600 : 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {step}
              </span>
              {idx < steps.length - 1 && <span style={{ color: 'var(--text2)', opacity: 0.5, fontSize: '0.72rem' }}>→</span>}
            </span>
          )
        })}
      </div>
    </div>
  )
}

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
            {item.progression && !item.progressionSteps?.length && (
              <p
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text2)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 8,
                  lineHeight: 1.5,
                }}
              >
                {item.progression}
              </p>
            )}
            {item.progressionSteps && (
              <ProgressionRail steps={item.progressionSteps} currentStep={item.currentRoleStep} />
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
            aria-label={`View all details for ${item.role} at ${item.company}`}
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
    overflow: 'hidden',
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
        className="glass-card"
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
      className="glass-card"
      style={shellStyle}
    >
      {inner}
    </motion.div>
  )
}
