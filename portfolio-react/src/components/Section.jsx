import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const sectionNumbers = {}
let sectionCounter = 0

function getSectionNumber(id) {
  if (!sectionNumbers[id]) {
    sectionCounter++
    sectionNumbers[id] = String(sectionCounter).padStart(2, '0')
  }
  return sectionNumbers[id]
}

/**
 * Section — primary content section with a numbered, bracketed kicker
 * (`[ 01 ]  HIGHLIGHTS`), a calm display headline, optional eyebrow lede,
 * and a clip-path reveal for the body when it scrolls into view.
 * 
 * @param {string} number - Optional explicit section number (e.g. "02")
 */
export default function Section({ id, title, subtitle, alt, children, number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduceMotion = useReducedMotion()

  // Use explicit number prop if provided, otherwise auto-generate
  const num = number || (id ? getSectionNumber(id) : null)

  const headerAnim = reduceMotion
    ? { initial: false, animate: {} }
    : {
        initial: { opacity: 0, y: 24 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      }

  return (
    <section
      id={id}
      style={{
        padding: 'var(--section-pad-y) var(--page-pad-x)',
        background: alt ? 'var(--color-surface)' : 'var(--color-bg)',
        position: 'relative',
      }}
    >
      <div ref={ref} style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <motion.div {...headerAnim}>
          {num && (
            <div className="section-kicker" aria-hidden="true">
              <span style={{ opacity: 0.55 }}>[</span>
              <span style={{ fontFeatureSettings: '"tnum" 1' }}>{num}</span>
              <span style={{ opacity: 0.55 }}>]</span>
              <span style={{ opacity: 0.55 }}>·</span>
              <span>{title}</span>
            </div>
          )}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--section-title-weight)',
              fontSize: 'clamp(2rem, 5vw, 2.85rem)',
              lineHeight: 1.05,
              letterSpacing: 'var(--section-title-tracking)',
              color: 'var(--color-text)',
              marginBottom: subtitle ? '1rem' : '3rem',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '1.0625rem',
                maxWidth: '38rem',
                marginBottom: '3rem',
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </p>
          )}
        </motion.div>
        <div className={`section-reveal ${inView ? 'is-visible' : ''}`}>
          {children}
        </div>
      </div>
    </section>
  )
}
