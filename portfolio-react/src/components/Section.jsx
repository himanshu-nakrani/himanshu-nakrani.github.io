import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Section({ id, title, subtitle, alt, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} style={{
      padding: 'var(--section-pad-y) var(--page-pad-x)', background: alt ? 'var(--bg2)' : 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', position: 'relative', zIndex: 1 }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.35rem)',
            fontWeight: 700, marginBottom: subtitle ? '0.5rem' : '3rem',
            position: 'relative', display: 'inline-block', letterSpacing: '-0.03em',
            color: 'var(--text)',
          }}>
            {title}
            {!subtitle && (
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: 60 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: 'absolute', bottom: -12, left: 0,
                height: 2,
                background: 'var(--accent)',
                borderRadius: 1, display: 'block',
              }}
            />
            )}
          </h2>
          {subtitle && (
            <p style={{
              color: 'var(--text2)',
              fontSize: '0.95rem',
              maxWidth: 520,
              marginBottom: '2.5rem',
              lineHeight: 1.6,
            }}>
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  )
}
