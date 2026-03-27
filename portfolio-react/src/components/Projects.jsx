import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { projects } from '../data'

const badgeStyle = {
  Production: { bg: 'rgba(22,163,74,0.12)', color: 'var(--green)', border: 'rgba(74,222,128,0.4)', glow: 'rgba(74,222,128,0.15)' },
  'In Progress': { bg: 'rgba(180,83,9,0.12)', color: 'var(--yellow)', border: 'rgba(251,191,36,0.4)', glow: 'rgba(251,191,36,0.15)' },
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
      whileHover={{
        y: -12,
        rotateX: 5,
        rotateY: -5,
      }}
      style={{
        background: hovered ? 'linear-gradient(135deg, rgba(124,111,255,0.12) 0%, rgba(79,195,247,0.08) 100%), rgba(14, 14, 26, 0.85)' : 'linear-gradient(135deg, rgba(14, 14, 26, 0.9) 0%, rgba(20, 20, 40, 0.9) 100%)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? 'rgba(79, 195, 247, 0.5)' : 'rgba(124,111,255,0.2)'}`,
        borderRadius: 16, padding: '1.5rem',
        position: 'relative', cursor: 'default',
        transform: hovered ? 'perspective(1000px) translateY(-12px) rotateX(5deg) rotateY(-5deg)' : 'perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: hovered ? '0 0 50px rgba(124,111,255,0.3), 0 0 100px rgba(79,195,247,0.2), 0 20px 80px rgba(0,0,0,0.4)' : '0 0 20px rgba(124,111,255,0.08), 0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column', gap: '0.6rem',
        overflow: 'hidden',
        gridColumn: item.badge === 'Production' ? 'span 1' : 'span 1',
      }}
    >
      {/* Gradient overlay on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'radial-gradient(circle at top right, rgba(124,111,255,0.1), transparent 50%)' : 'transparent',
        pointerEvents: 'none',
        transition: 'background 0.3s',
      }} />
      
      {item.badge && (
        <motion.span
          animate={{ y: hovered ? -2 : 0 }}
          whileHover={{ scale: 1.08 }}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            fontSize: '0.68rem', fontFamily: "'Fira Code', monospace",
            background: badgeStyle[item.badge].bg,
            color: badgeStyle[item.badge].color,
            border: `1px solid ${badgeStyle[item.badge].border}`,
            padding: '4px 11px', borderRadius: 20,
            transition: 'all 0.3s',
            boxShadow: hovered ? `0 0 15px ${badgeStyle[item.badge].glow}` : 'none',
          }}>
          ● {item.badge}
        </motion.span>
      )}
      
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1, filter: hovered ? 'drop-shadow(0 0 15px rgba(124, 111, 255, 0.4))' : 'drop-shadow(0 0 0px rgba(124, 111, 255, 0))' }}
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
          whileHover={{ x: 4 }}
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
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.4rem',
        '@media (min-width: 768px)': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (min-width: 1024px)': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        }
      }}>
        {projects.map((p, i) => {
          // Make every 3rd card (Production projects) span 2 columns on larger screens
          const isLarger = p.badge === 'Production' && i % 3 === 0
          return (
            <div
              key={i}
              style={{
                gridColumn: isLarger ? 'span 1' : 'span 1',
              }}
            >
              <ProjectCard item={p} index={i} />
            </div>
          )
        })}
      </div>
    </Section>
  )
}
