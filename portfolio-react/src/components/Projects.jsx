import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { projects } from '../data'

const badgeStyle = {
  Production: { bg: 'rgba(74,158,255,0.1)', color: 'var(--accent)', border: 'var(--border2)' },
  'In Progress': { bg: 'rgba(107,124,255,0.1)', color: 'var(--accent2)', border: 'var(--border2)' },
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
      style={{
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 16, padding: '1.5rem',
        position: 'relative', cursor: 'default',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column', gap: '0.6rem',
        overflow: 'hidden',
      }}
    >
      {item.badge && (
        <motion.span
          animate={{ y: hovered ? -2 : 0 }}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            fontSize: '0.68rem', fontFamily: "'Fira Code', monospace",
            background: badgeStyle[item.badge].bg,
            color: badgeStyle[item.badge].color,
            border: `1px solid ${badgeStyle[item.badge].border}`,
            padding: '4px 11px', borderRadius: 20,
            transition: 'all 0.3s',
          }}>
          ● {item.badge}
        </motion.span>
      )}
      
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: '2rem', position: 'relative', zIndex: 1 }}>
        {item.icon}
      </motion.div>
      
      <h3 style={{ fontSize: '1rem', fontWeight: 700, paddingRight: item.badge ? '5rem' : 0, position: 'relative', zIndex: 1 }}>
        {item.title}
      </h3>
      
      <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6, flex: 1, position: 'relative', zIndex: 1 }}>
        {item.desc}
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, position: 'relative', zIndex: 1 }}>
        {item.tags.map(t => <Tag key={t}>{t}</Tag>)}
      </div>
      
      {item.link && (
        <motion.a
          whileHover={{ x: 4, color: 'var(--accent2)' }}
          href={item.link}
          target="_blank"
          rel="noopener"
          style={{
            fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none',
            fontFamily: "'Fira Code', monospace", marginTop: 4, position: 'relative', zIndex: 1,
            transition: 'color 0.2s',
          }}
        >
View on GitHub →
        </motion.a>
      )}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects" alt>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.4rem' }}>
        {projects.map((p, i) => <ProjectCard key={i} item={p} index={i} />)}
      </div>
    </Section>
  )
}
