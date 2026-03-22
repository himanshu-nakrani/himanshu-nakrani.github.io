import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Section({ id, title, alt, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} style={{ padding: '90px 2rem', background: alt ? 'var(--bg2)' : 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{
            fontSize: '2rem', fontWeight: 800, marginBottom: '3rem',
            position: 'relative', display: 'inline-block', letterSpacing: '-0.02em',
          }}>
            {title}
            <span style={{
              position: 'absolute', bottom: -8, left: 0,
              width: 40, height: 3,
              background: 'linear-gradient(90deg, var(--accent), var(--accent3))',
              borderRadius: 2, display: 'block',
            }} />
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  )
}
