import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Section({ id, title, subtitle, alt, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} style={{
      padding: 'var(--section-pad-y) var(--page-pad-x)',
      background: alt ? 'var(--bg2)' : 'var(--bg)',
      position: 'relative',
    }}>
      <div ref={ref} style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 style={{
            fontSize: 'clamp(2.05rem, 5vw, 2.95rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--section-title-weight)',
            marginBottom: subtitle ? '1rem' : '3rem',
            letterSpacing: 'var(--section-title-tracking)',
            color: 'var(--text)',
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{
              color: 'var(--text2)',
              fontSize: '1.05rem',
              maxWidth: 600,
              marginBottom: '3rem',
              lineHeight: 1.7,
              fontWeight: 500,
            }}>
              {subtitle}
            </p>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
