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
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.2rem', color: '#ffa116', marginBottom: '0.6rem' }}>@himanshunakrani0</p>
          <p style={{ color: 'var(--text2)', fontSize: '0.9rem', marginBottom: '1.4rem', lineHeight: 1.6 }}>
            Consistent problem solver — sharpening DSA skills alongside AI/ML work.
          </p>
          <motion.a
            href="https://leetcode.com/u/himanshunakrani0/"
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.04, borderColor: '#ffa116' }}
            style={{
              display: 'inline-block', border: '1px solid var(--border2)',
              color: 'var(--text)', padding: '10px 22px', borderRadius: 10,
              textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500,
              transition: 'border-color 0.2s',
            }}
          >
            View Profile →
          </motion.a>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          src="https://leetcard.jacoblin.cool/himanshunakrani0?theme=dark&font=Fira%20Code&ext=heatmap&border=0&radius=12"
          alt="LeetCode Stats"
          style={{ borderRadius: 14, maxWidth: 500, width: '100%', flex: 2 }}
          loading="lazy"
        />
      </div>
    </Section>
  )
}
