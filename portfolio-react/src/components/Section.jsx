import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Section({ id, title, subtitle, alt, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} style={{
      padding: '90px 2rem', background: alt ? 'var(--bg2)' : 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative gradient blur */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-200px',
        width: 400, height: 400,
        background: alt ? 'radial-gradient(circle, rgba(74,158,255,0.03), transparent)' : 'radial-gradient(circle, rgba(90,142,224,0.02), transparent)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(50px)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }} ref={ref}>
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
