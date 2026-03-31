import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react'
import Tag from './Tag'

export default function InteractiveTimeline({ experiences }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} style={{ position: 'relative', padding: '2rem 0' }}>
      <div style={{ position: 'absolute', left: '2rem', top: 0, bottom: 0, width: 2, background: 'var(--border)' }} />

      {experiences.map((exp, index) => {
        const isActive = activeIndex === index
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 }}
            onHoverStart={() => setActiveIndex(index)}
            style={{
              position: 'relative',
              paddingLeft: '5rem',
              paddingBottom: '3rem',
              cursor: 'pointer',
            }}
          >
            <motion.div
              animate={{
                scale: isActive ? 1.5 : 1,
                background: isActive ? 'var(--accent)' : 'var(--surface2)',
              }}
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '0.5rem',
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: '2px solid var(--accent)',
                zIndex: 2,
              }}
            />

            <motion.div
              animate={{
                borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                boxShadow: isActive ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
              }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '1.5rem',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Briefcase size={18} style={{ color: 'var(--accent)' }} />
                    {exp.role}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: '0.25rem' }}>
                    {exp.company}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text2)', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={14} />
                      {exp.period}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                style={{ overflow: 'hidden' }}
              >
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6, paddingLeft: '1.25rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {exp.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </motion.div>

              {!isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '0.5rem', fontStyle: 'italic' }}
                >
                  Hover to see details →
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
