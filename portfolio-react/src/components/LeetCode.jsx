import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'

export default function LeetCode() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="leetcode" title="LeetCode" alt>
      <div ref={ref} style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ flex: 1, minWidth: 200 }}
        >
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '1rem', color: 'var(--yellow)', marginBottom: '0.8rem', letterSpacing: '0.05em' }}>@himanshunakrani0</p>
          <p style={{ color: 'var(--text2)', fontSize: '0.95rem', marginBottom: '1.6rem', lineHeight: 1.7 }}>
            Consistent problem solver — sharpening DSA skills alongside AI/ML work.
          </p>
          <motion.a
            href="https://leetcode.com/u/himanshunakrani0/"
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.02, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderColor: 'var(--border2)' }}
            style={{
              display: 'inline-block', border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)', padding: '11px 24px', borderRadius: 10,
              textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600,
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
View Profile →
          </motion.a>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -8 }}
          src="https://leetcard.jacoblin.cool/himanshunakrani0?theme=dark&font=Fira%20Code&ext=heatmap&border=0&radius=12"
          alt="LeetCode Stats"
          style={{ borderRadius: 14, maxWidth: 500, width: '100%', flex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.2)', border: '1px solid rgba(167, 139, 250, 0.15)', transition: 'box-shadow 0.2s ease' }}
          loading="lazy"
        />
      </div>
    </Section>
  )
}
