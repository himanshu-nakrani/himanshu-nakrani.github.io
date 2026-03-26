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
      <div ref={ref} style={{ textAlign: 'center', position: 'relative' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            color: 'var(--text2)', fontSize: '1.05rem', marginBottom: '2.5rem',
            maxWidth: 520, margin: '0 auto 2.5rem', lineHeight: 1.7,
          }}
        >
          Open to interesting problems in AI, LLMs, and building things that matter.
        </motion.p>

        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{
                scale: 1.08,
                y: -6,
                boxShadow: `0 12px 32px ${l.color}33`,
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: `1px solid var(--border)`,
                color: 'var(--text)', textDecoration: 'none',
                padding: '12px 24px', borderRadius: 12,
                fontSize: '0.9rem', fontWeight: 600,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${l.color}15, transparent)`,
                opacity: 0,
                transition: 'opacity 0.3s',
              }} />
              <span style={{ position: 'relative', zIndex: 1, fontSize: '1rem' }}>{l.icon}</span>
              <span style={{ position: 'relative', zIndex: 1 }}>{l.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  )
}
