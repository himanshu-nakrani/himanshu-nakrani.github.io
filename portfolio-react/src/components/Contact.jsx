import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'

const links = [
  { label: 'Email', href: 'mailto:himanshunakrani0@gmail.com', color: '#7c6fff', icon: '✉️' },
  { label: 'GitHub', href: 'https://github.com/himanshu-nakrani', color: '#fff', icon: '🐙' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-nakrani/', color: '#0a66c2', icon: '💼' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/himanshunakrani0/', color: '#ffa116', icon: '⚡' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/himanshunakrani', color: '#20beff', icon: '🏆' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="contact" title="Get in Touch" alt>
      <div ref={ref} style={{ textAlign: 'center' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ color: 'var(--text2)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: 480, margin: '0 auto 2.5rem' }}
        >
          Open to interesting problems in AI, LLMs, and building things that matter.
        </motion.p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.05, borderColor: l.color, boxShadow: `0 4px 20px ${l.color}22` }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--surface)', border: '1px solid var(--border)',
                color: 'var(--text)', textDecoration: 'none',
                padding: '12px 22px', borderRadius: 10,
                fontSize: '0.9rem', fontWeight: 500,
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            >
              <span>{l.icon}</span>
              {l.label}
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  )
}
