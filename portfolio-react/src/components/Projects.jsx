import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Bot, Wrench, Briefcase, FileSearch, BookOpen,
  Shield, Bitcoin, Medal,
} from 'lucide-react'
import Section from './Section'
import Tag from './Tag'
import ProjectDetailModal from './ProjectDetailModal'
import { projects } from '../data'

const projectIconMap = {
  'Alpha Copilot': Bot,
  'Agent Forge': Wrench,
  'WealthAI': Briefcase,
  'Fund Prospectus RAG': FileSearch,
  'Document QA': BookOpen,
  'Intrusion Detection System': Shield,
  'Cryptocurrency Price Prediction': Bitcoin,
  'Gold Price Prediction': Medal,
}

const badgeStyle = {
  Production: { bg: 'rgba(74,158,255,0.1)', color: 'var(--accent)', border: 'var(--border2)' },
  'In Progress': { bg: 'rgba(107,124,255,0.1)', color: 'var(--accent2)', border: 'var(--border2)' },
}

function ProjectCard({ item, index, onClick, cardRef }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)
  const Icon = projectIconMap[item.title] || Bot
  const isFeatured = item.badge === 'Production'

  return (
    <motion.article
      ref={(el) => { ref.current = el; if (cardRef) cardRef.current = el }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${item.title}`}
      className="glass-card"
      style={{
        padding: '1.5rem',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        overflow: 'hidden',
      }}
    >
      {item.badge && (
        <motion.span
          animate={{ y: hovered ? -2 : 0 }}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            fontSize: '0.68rem', fontFamily: "'Fira Code', monospace",
            background: badgeStyle[item.badge]?.bg,
            color: badgeStyle[item.badge]?.color,
            border: `1px solid ${badgeStyle[item.badge]?.border}`,
            padding: '4px 11px', borderRadius: 20,
            transition: 'all 0.3s',
            zIndex: 2,
          }}>
          ● {item.badge}
        </motion.span>
      )}

      <motion.div
        animate={{ scale: hovered ? 1.1 : 1, y: hovered ? -2 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isFeatured
            ? 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 20%, transparent), color-mix(in srgb, var(--accent2) 12%, transparent))'
            : 'color-mix(in srgb, var(--accent) 10%, transparent)',
          border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Icon size={22} style={{ color: 'var(--accent)' }} />
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

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', position: 'relative', zIndex: 1, marginTop: 4 }}>
        {item.link && (
          <motion.a
            whileHover={{ x: 4, color: 'var(--accent2)' }}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none',
              fontFamily: "'Fira Code', monospace",
              transition: 'color 0.2s',
            }}
          >
            View on GitHub →
          </motion.a>
        )}
        {item.liveLink && (
          <motion.a
            whileHover={{ x: 4, color: 'var(--accent2)' }}
            href={item.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontSize: '0.78rem', color: 'var(--accent2)', textDecoration: 'none',
              fontFamily: "'Fira Code', monospace",
              transition: 'color 0.2s',
            }}
          >
            Live Demo →
          </motion.a>
        )}
      </div>

      {/* Spotlight glow for featured projects */}
      {isFeatured && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
            opacity: hovered ? 0.8 : 0.3,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
    </motion.article>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  // Store one ref per card keyed by project title to fix the shared-ref bug
  const cardRefs = useRef({})

  return (
    <>
      <Section id="projects" title="Projects" alt>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.4rem' }}>
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              item={p}
              index={i}
              onClick={() => setSelectedProject(p)}
              cardRef={{ get current() { return cardRefs.current[p.title] }, set current(el) { cardRefs.current[p.title] = el } }}
            />
          ))}
        </div>
      </Section>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          triggerRef={{ current: cardRefs.current[selectedProject.title] }}
        />
      )}
    </>
  )
}
