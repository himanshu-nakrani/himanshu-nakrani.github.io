import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, GraduationCap, Award, Target, Zap, BookOpen, Users, 
  Brain, Database, Code2, Layers, Cpu, Network, GitBranch,
  ArrowRight, ExternalLink, Mail, Github, Linkedin, Terminal,
  Sparkles, ChevronRight
} from 'lucide-react'
import PageHeader from '../components/PageHeader'

/* ========================================
   ANIMATED STAT COUNTER
   ======================================== */
function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    let rafId
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, duration])

  return active ? count : 0
}

function parseStatValue(value) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { numeric: 0, suffix: value }
  return { numeric: parseInt(match[1], 10), suffix: match[2] }
}

/* ========================================
   STAT CARD WITH ICON AND COUNT-UP
   ======================================== */
function StatCard({ value, label, icon: Icon, index, inView }) {
  const { numeric, suffix } = parseStatValue(value)
  const count = useCountUp(numeric, 1000, inView)
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem 1.5rem',
        background: hovered 
          ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 10%, var(--color-surface)) 0%, var(--color-surface) 100%)'
          : 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 14,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px -8px color-mix(in srgb, var(--color-accent) 20%, transparent)' : 'none',
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 12,
        background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'transform 0.3s ease',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        <Icon size={22} color="var(--color-accent)" />
      </div>
      <div>
        <div style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text)',
          lineHeight: 1,
        }}>
          {count}{suffix}
        </div>
        <div style={{
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
          marginTop: 4,
        }}>
          {label}
        </div>
      </div>
    </motion.div>
  )
}

/* ========================================
   TECH STACK GRID
   ======================================== */
const techStack = [
  { name: 'Python', category: 'Language' },
  { name: 'LangChain', category: 'Framework' },
  { name: 'PyTorch', category: 'ML' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'React', category: 'Frontend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
]

function TechStackGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '0.75rem',
    }} className="tech-stack-grid">
      {techStack.map((tech, i) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -2, borderColor: 'var(--color-accent)' }}
          style={{
            padding: '0.85rem',
            background: 'var(--color-surface-raised)',
            border: '1px solid var(--color-border)',
            borderRadius: 10,
            textAlign: 'center',
            transition: 'all 0.2s ease',
            cursor: 'default',
          }}
        >
          <div style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: 2,
          }}>
            {tech.name}
          </div>
          <div style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {tech.category}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ========================================
   TIMELINE ITEM
   ======================================== */
function TimelineItem({ year, title, subtitle, description, isLast, index }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{
        display: 'flex',
        gap: '1rem',
        position: 'relative',
      }}
    >
      {/* Timeline line */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        width: 20,
      }}>
        <motion.div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            zIndex: 1,
          }}
          whileHover={{ scale: 1.3 }}
        />
        {!isLast && (
          <div style={{
            width: 2,
            flex: 1,
            background: 'linear-gradient(to bottom, var(--color-accent), var(--color-border))',
            marginTop: 4,
          }} />
        )}
      </div>
      
      {/* Content */}
      <div 
        style={{ 
          paddingBottom: isLast ? 0 : '1.5rem', 
          flex: 1,
          cursor: description ? 'pointer' : 'default',
        }}
        onClick={() => description && setExpanded(!expanded)}
      >
        <span style={{
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          {year}
        </span>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: '4px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          {title}
          {description && (
            <ChevronRight 
              size={14} 
              style={{ 
                transform: expanded ? 'rotate(90deg)' : 'rotate(0)', 
                transition: 'transform 0.2s',
                color: 'var(--color-text-muted)',
              }} 
            />
          )}
        </h4>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}>
          {subtitle}
        </p>
        <AnimatePresence>
          {expanded && description && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                marginTop: 8,
                lineHeight: 1.6,
                paddingLeft: 12,
                borderLeft: '2px solid var(--color-border)',
              }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ========================================
   VALUE CARD
   ======================================== */
function ValueCard({ icon: Icon, title, description, index }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.25rem',
        background: hovered ? 'var(--color-surface-raised)' : 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <motion.div
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: hovered 
              ? 'var(--color-accent)' 
              : 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s ease',
          }}
        >
          <Icon
            size={18}
            color={hovered ? 'var(--color-accent-fg)' : 'var(--color-accent)'}
          />
        </motion.div>
        <div>
          <h4 style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: 4,
          }}>
            {title}
          </h4>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
            margin: 0,
          }}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/* ========================================
   MAIN DATA
   ======================================== */
const stats = [
  { value: '2+', label: 'Years Experience', icon: Briefcase },
  { value: '100+', label: 'Users Served', icon: Users },
  { value: '75%', label: 'Latency Cut', icon: Zap },
  { value: '2', label: 'Publications', icon: BookOpen },
]

const journey = [
  {
    year: '2023 - Present',
    title: 'AI Software Developer',
    subtitle: 'State Street Corporation',
    description: 'Building enterprise LLM systems for financial data analysis. Leading development of Text-to-SQL chatbots and RAG pipelines serving 100+ users.',
  },
  {
    year: '2025',
    title: 'Published Researcher',
    subtitle: 'IEEE FLLM & CSCI',
    description: 'Published research on Graph-of-Thoughts reasoning for Text-to-SQL data augmentation and fine-tuning methodologies.',
  },
  {
    year: '2022',
    title: 'ML Summer School',
    subtitle: 'Amazon',
    description: 'Selected for Amazon Machine Learning Summer School. Completed deep dives into production ML systems.',
  },
]

const values = [
  { icon: Target, title: 'Ship What Works', description: 'Production-first mindset. Building AI that solves real problems.' },
  { icon: BookOpen, title: 'Continuous Learning', description: 'Always exploring new research and pushing boundaries.' },
  { icon: GitBranch, title: 'Open Collaboration', description: 'Contributing to open-source and sharing knowledge.' },
]

const certifications = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle' },
  { name: 'AWS ML Foundations', issuer: 'Udacity' },
  { name: 'Generative AI Fundamentals', issuer: 'Databricks' },
]

/* ========================================
   MAIN PAGE COMPONENT
   ======================================== */
export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const reduceMotion = useReducedMotion()
  
  return (
    <div className="mvp2-page">
      {/* Hero Section */}
      <section ref={heroRef} style={{ marginBottom: '4rem' }}>
        {/* Intro */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '6px 12px',
            background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
            borderRadius: 20,
            marginBottom: '1.25rem',
          }}>
            <Sparkles size={14} color="var(--color-accent)" />
            <span style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent)',
              fontWeight: 500,
            }}>
              AI Engineer
            </span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
          }}>
            Himanshu Nakrani
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            maxWidth: 700,
            marginBottom: '2rem',
          }}>
            I build <strong style={{ color: 'var(--color-text)' }}>production AI systems</strong> at State Street Corporation — 
            enterprise LLM pipelines that turn complex financial data into actionable insights. 
            From fine-tuning models to shipping APIs, I focus on <strong style={{ color: 'var(--color-text)' }}>systems that scale</strong>.
          </p>
          
          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/himanshu-nakrani"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.75rem 1.5rem',
                background: 'var(--color-accent)',
                color: 'var(--color-accent-fg)',
                borderRadius: 10,
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Github size={18} />
              View GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/himanshu-nakrani/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '1px solid var(--color-border-strong)',
                color: 'var(--color-text)',
                borderRadius: 10,
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href="mailto:himanshunakrani0@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '1px solid var(--color-border-strong)',
                color: 'var(--color-text)',
                borderRadius: 10,
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <Mail size={18} />
              Email
            </a>
          </div>
        </motion.div>
        
        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }} className="about-stats-grid">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} inView={heroInView} />
          ))}
        </div>
      </section>

      {/* Two Column Layout: Tech Stack + Journey */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '4rem',
      }} className="about-two-col">
        {/* Tech Stack */}
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Terminal size={20} color="var(--color-accent)" />
            Tech Stack
          </h2>
          <TechStackGrid />
        </div>
        
        {/* Journey */}
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Briefcase size={20} color="var(--color-accent)" />
            Journey
          </h2>
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 14,
            padding: '1.5rem',
          }}>
            {journey.map((item, i) => (
              <TimelineItem
                key={item.year}
                {...item}
                index={i}
                isLast={i === journey.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy + Certifications */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        marginBottom: '4rem',
      }} className="about-philosophy-grid">
        {/* Philosophy */}
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Target size={20} color="var(--color-accent)" />
            Philosophy
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }} className="values-grid">
            {values.map((value, i) => (
              <ValueCard key={value.title} {...value} index={i} />
            ))}
          </div>
        </div>
        
        {/* Certifications */}
        <div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Award size={20} color="var(--color-accent)" />
            Certifications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'color-mix(in srgb, var(--color-accent) 6%, var(--color-surface))',
                  border: '1px solid color-mix(in srgb, var(--color-accent) 15%, var(--color-border))',
                  borderRadius: 10,
                  transition: 'all 0.2s ease',
                }}
              >
                <Award size={18} color="var(--color-accent)" />
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}>
                    {cert.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {cert.issuer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .about-two-col {
            grid-template-columns: 1fr !important;
          }
          .about-philosophy-grid {
            grid-template-columns: 1fr !important;
          }
          .values-grid {
            grid-template-columns: 1fr !important;
          }
          .tech-stack-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .about-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
