import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { projects } from '../data'

const badgeStyle = {
  Production: { bg: 'rgba(74,222,128,0.1)', color: '#4ade80', border: 'rgba(74,222,128,0.3)' },
  'In Progress': { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
}

function ProjectCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate2={{ y: hovered ? -4 : 0 }}
      style={{
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        border: `1px solid ${hovered ? 'rgba(124,111,255,0.5)' : 'var(--border)'}`,
        borderRadius: 16, padding: '1.5rem',
        position: 'relative', cursor: 'default',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 12px 40px rgba(124,111,255,0.12)' : 'none',
        display: 'flex', flexDirection: 'column', gap: '0.6rem',
      }}
    >
      {item.badge && (
        <span style={{
          position: 'absolute', top: '1rem', right: '1rem',
          fontSize: '0.68rem', fontFamily: "'Fira Code', monospace",
          background: badgeStyle[item.badge].bg,
          color: badgeStyle[item.badge].color,
          border: `1px solid ${badgeStyle[item.badge].border}`,
          padding: '2px 9px', borderRadius: 20,
        }}>
          {item.badge}
        </span>
      )}
      <div style={{ fontSize: '2rem' }}>{item.icon}</div>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, paddingRight: item.badge ? '5rem' : 0 }}>{item.title}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {item.tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener"
          style={{ fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none', fontFamily: "'Fira Code', monospace", marginTop: 4 }}
        >
          View on GitHub →
        </a>
      )}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects" alt>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
        {projects.map((p, i) => <ProjectCard key={i} item={p} index={i} />)}
      </div>
    </Section>
  )
}
