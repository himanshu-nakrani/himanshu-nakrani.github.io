import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Award, Sparkles, Layers, TrendingUp, ExternalLink, ChevronRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { skills, certifications } from '../data'

/* Primary tools - showcased in a bento grid */
const PRIMARY_STACK = [
  { name: 'Python',       icon: '🐍', note: 'Primary language', years: 4, featured: true },
  { name: 'FastAPI',      icon: '⚡', note: 'Backend APIs', years: 2 },
  { name: 'LangChain',    icon: '🔗', note: 'LLM orchestration', years: 1.5 },
  { name: 'Azure OpenAI', icon: '☁️', note: 'LLM infrastructure', years: 1.5, featured: true },
  { name: 'PostgreSQL',   icon: '🐘', note: 'Primary database', years: 3 },
  { name: 'pgvector',     icon: '🔢', note: 'Vector search', years: 1 },
  { name: 'RAG',          icon: '📚', note: 'Retrieval AI', years: 1.5 },
  { name: 'Docker',       icon: '🐳', note: 'Containers', years: 2 },
]

/* Cert accent colors */
const CERT_COLORS = [
  { bg: 'rgba(255,80,0,0.12)', border: 'rgba(255,80,0,0.3)', accent: '#ff5000' },
  { bg: 'rgba(255,153,0,0.12)', border: 'rgba(255,153,0,0.3)', accent: '#ff9900' },
  { bg: 'rgba(74,158,255,0.12)', border: 'rgba(74,158,255,0.3)', accent: '#4a9eff' },
  { bg: 'rgba(255,60,60,0.12)', border: 'rgba(255,60,60,0.3)', accent: '#ff3c3c' },
  { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.3)', accent: '#4ade80' },
]

function SectionLabel({ children, icon: Icon }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      marginBottom: '1.25rem',
    }}>
      {Icon && (
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
          border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon size={14} color="var(--color-accent)" />
        </div>
      )}
      <p style={{
        fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent)',
        textTransform: 'uppercase', letterSpacing: '0.12em',
        margin: 0,
      }}>
        {children}
      </p>
    </div>
  )
}

/* Hero stat card with animated reveal */
function HeroStatCard({ icon: Icon, value, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '1rem 1.25rem', borderRadius: 14,
        background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
        border: '1px solid var(--color-border)',
        flex: 1, minWidth: 140,
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color="var(--color-accent)" />
      </div>
      <div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
          {label}
        </div>
      </div>
    </motion.div>
  )
}

/* Bento-style tool card */
function BentoToolCard({ tool, index, large }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        gridColumn: large ? 'span 2' : 'span 1',
        padding: large ? '1.5rem' : '1.1rem',
        borderRadius: 16,
        background: hovered 
          ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 8%, var(--color-surface)) 0%, var(--color-surface-raised) 100%)'
          : 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
        border: `1px solid ${hovered ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border))' : 'var(--color-border)'}`,
        cursor: 'default',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px color-mix(in srgb, var(--color-accent) 12%, transparent)' : 'var(--shadow-xs)',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: large ? 'row' : 'column',
        alignItems: large ? 'center' : 'flex-start',
        gap: large ? '1.25rem' : '0.6rem',
      }}
    >
      <div style={{
        fontSize: large ? '2.5rem' : '1.6rem',
        lineHeight: 1,
        filter: hovered ? 'none' : 'grayscale(20%)',
        transition: 'filter 0.2s',
      }}>
        {tool.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontSize: large ? '1.1rem' : '0.85rem', 
          fontWeight: 700, 
          color: 'var(--color-text)',
          marginBottom: 2,
        }}>
          {tool.name}
        </div>
        <div style={{ 
          fontSize: '0.7rem', 
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          {tool.note}
        </div>
      </div>
      {tool.years && (
        <div style={{
          fontSize: '0.65rem',
          fontFamily: 'var(--font-mono)',
          color: hovered ? 'var(--color-accent)' : 'var(--color-text-muted)',
          padding: '3px 8px',
          borderRadius: 20,
          background: hovered ? 'color-mix(in srgb, var(--color-accent) 12%, transparent)' : 'var(--color-surface-raised)',
          border: `1px solid ${hovered ? 'color-mix(in srgb, var(--color-accent) 30%, transparent)' : 'var(--color-border)'}`,
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
        }}>
          {tool.years}+ yrs
        </div>
      )}
    </motion.div>
  )
}

/* Skill category card with expandable items */
function SkillCategoryCard({ group, index, isExpanded, onToggle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: isExpanded 
          ? `linear-gradient(135deg, color-mix(in srgb, ${group.color} 8%, var(--color-surface)) 0%, var(--color-surface-raised) 100%)`
          : 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
        border: `1px solid ${isExpanded ? group.color : hovered ? 'color-mix(in srgb, var(--color-accent) 30%, var(--color-border))' : 'var(--color-border)'}`,
        transition: 'all 0.3s ease',
        boxShadow: isExpanded ? `0 0 0 1px color-mix(in srgb, ${group.color} 20%, transparent), var(--shadow-md)` : 'var(--shadow-xs)',
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.25rem 1.4rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          textAlign: 'left',
        }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: `color-mix(in srgb, ${group.color} 15%, transparent)`,
          border: `1px solid color-mix(in srgb, ${group.color} 30%, transparent)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.35rem',
          transition: 'all 0.25s',
        }}>
          {group.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            color: isExpanded ? group.color : 'var(--color-text)',
            transition: 'color 0.25s',
            marginBottom: 2,
          }}>
            {group.label}
          </div>
          <div style={{
            fontSize: '0.68rem',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            {group.items.length} skills
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            width: 28, height: 28, borderRadius: 8,
            background: isExpanded ? `color-mix(in srgb, ${group.color} 15%, transparent)` : 'var(--color-surface-raised)',
            border: `1px solid ${isExpanded ? `color-mix(in srgb, ${group.color} 30%, transparent)` : 'var(--color-border)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronRight size={14} color={isExpanded ? group.color : 'var(--color-text-muted)'} />
        </motion.div>
      </button>
      
      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ 
              padding: '0 1.4rem 1.4rem',
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 6,
            }}>
              {group.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  style={{
                    fontSize: '0.75rem',
                    padding: '5px 12px',
                    borderRadius: 20,
                    background: `color-mix(in srgb, ${group.color} 10%, var(--color-surface-raised))`,
                    border: `1px solid color-mix(in srgb, ${group.color} 25%, var(--color-border))`,
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* Modern certification card */
function CertCard({ cert, index, colors }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.25rem',
        borderRadius: 14,
        background: hovered ? colors.bg : 'var(--color-surface)',
        border: `1px solid ${hovered ? colors.border : 'var(--color-border)'}`,
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'all 0.22s ease',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.3rem',
        flexShrink: 0,
      }}>
        {cert.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ 
          fontSize: '0.85rem', 
          fontWeight: 600, 
          color: 'var(--color-text)',
          lineHeight: 1.4,
        }}>
          {cert.title}
        </div>
      </div>
      <Award 
        size={16} 
        color={hovered ? colors.accent : 'var(--color-text-muted)'} 
        style={{ 
          flexShrink: 0, 
          opacity: hovered ? 1 : 0.4,
          transition: 'all 0.2s',
        }} 
      />
    </motion.div>
  )
}

export default function SkillsPage() {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const totalSkills = skills.reduce((acc, g) => acc + g.items.length, 0)

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Tech Stack"
        title="Skills & Tools"
        description="Technologies I work with daily — from LLM backends to cloud infrastructure."
      />

      {/* Hero stats row */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
      }}>
        <HeroStatCard icon={Layers} value={`${totalSkills}+`} label="Total Skills" delay={0} />
        <HeroStatCard icon={Sparkles} value={skills.length} label="Domains" delay={0.08} />
        <HeroStatCard icon={TrendingUp} value="3" label="Cloud Platforms" delay={0.16} />
        <HeroStatCard icon={Award} value={certifications.length} label="Certifications" delay={0.24} />
      </div>

      {/* Primary Stack - Bento Grid */}
      <div style={{ marginBottom: '2.75rem' }}>
        <SectionLabel icon={Sparkles}>Core Technologies</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.75rem',
        }} className="skills-bento-grid">
          {PRIMARY_STACK.map((tool, i) => (
            <BentoToolCard 
              key={tool.name} 
              tool={tool} 
              index={i}
              large={tool.featured}
            />
          ))}
        </div>
      </div>

      {/* Skill Categories */}
      <div style={{ marginBottom: '2.75rem' }}>
        <SectionLabel icon={Layers}>All Skills by Domain</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '0.85rem',
        }}>
          {skills.map((group, i) => (
            <SkillCategoryCard
              key={group.label}
              group={group}
              index={i}
              isExpanded={expandedCategory === group.label}
              onToggle={() => setExpandedCategory(
                expandedCategory === group.label ? null : group.label
              )}
            />
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
        <SectionLabel icon={Award}>Certifications</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '0.65rem',
        }}>
          {certifications.map((cert, i) => (
            <CertCard 
              key={i} 
              cert={cert} 
              index={i}
              colors={CERT_COLORS[i % CERT_COLORS.length]}
            />
          ))}
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 900px) {
          .skills-bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 520px) {
          .skills-bento-grid {
            grid-template-columns: 1fr !important;
          }
          .skills-bento-grid > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
