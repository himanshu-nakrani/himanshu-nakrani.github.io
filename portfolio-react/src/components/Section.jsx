import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Section({ id, title, alt, children }) {
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
        background: alt ? 'radial-gradient(circle, rgba(0,217,255,0.1), transparent)' : 'radial-gradient(circle, rgba(79,122,255,0.08), transparent)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(40px)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 2rem)',
            fontWeight: 800, marginBottom: '3rem',
            position: 'relative', display: 'inline-block', letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {title}
            <motion.span
              initial={{ width: 0 }}
              animate={inView ? { width: 60 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                position: 'absolute', bottom: -12, left: 0,
                height: 3,
                background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3), transparent)',
                borderRadius: 2, display: 'block',
                boxShadow: '0 0 20px var(--accent)',
              }}
            />
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  )
}
