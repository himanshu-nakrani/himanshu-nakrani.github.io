import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, GraduationCap, Award, Target, Zap, BookOpen, Users, 
  Brain, Database, Code2, Layers, Cpu, Network, GitBranch,
  ArrowRight, ExternalLink, Mail, Github, Linkedin, Terminal
} from 'lucide-react'
import PageHeader from '../components/PageHeader'

/* ========================================
   ANIMATED AVATAR GRAPHIC
   An animated, abstract representation 
   using SVG and motion
   ======================================== */
function AnimatedAvatar() {
  const reduceMotion = useReducedMotion()
  const [hoveredNode, setHoveredNode] = useState(null)
  
  // Neural network nodes
  const nodes = [
    { id: 'core', x: 100, y: 100, size: 24, label: 'AI/ML', icon: Brain },
    { id: 'llm', x: 50, y: 50, size: 16, label: 'LLMs', icon: Cpu },
    { id: 'rag', x: 150, y: 40, size: 16, label: 'RAG', icon: Database },
    { id: 'sql', x: 170, y: 100, size: 14, label: 'SQL', icon: Code2 },
    { id: 'api', x: 150, y: 160, size: 14, label: 'APIs', icon: Network },
    { id: 'research', x: 50, y: 150, size: 14, label: 'Research', icon: BookOpen },
    { id: 'deploy', x: 30, y: 100, size: 12, label: 'Deploy', icon: Layers },
  ]
  
  // Connection lines between nodes
  const connections = [
    ['core', 'llm'], ['core', 'rag'], ['core', 'sql'], 
    ['core', 'api'], ['core', 'research'], ['core', 'deploy'],
    ['llm', 'rag'], ['rag', 'sql'], ['sql', 'api'], ['api', 'deploy'],
    ['research', 'llm'], ['research', 'deploy']
  ]
  
  const getNode = (id) => nodes.find(n => n.id === id)
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: 320,
      aspectRatio: '1',
      margin: '0 auto',
    }}>
      {/* Glowing background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, color-mix(in srgb, var(--color-accent) 15%, transparent) 0%, transparent 70%)',
        }}
        animate={reduceMotion ? {} : {
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Main SVG */}
      <svg
        viewBox="0 0 200 200"
        style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
      >
        {/* Connection lines */}
        {connections.map(([from, to], i) => {
          const n1 = getNode(from)
          const n2 = getNode(to)
          const isActive = hoveredNode === from || hoveredNode === to
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke={isActive ? 'var(--color-accent)' : 'var(--color-border-solid)'}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={isActive ? 0.8 : 0.4}
              initial={reduceMotion ? {} : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            />
          )
        })}
        
        {/* Data flow animation along connections */}
        {!reduceMotion && connections.slice(0, 6).map(([from, to], i) => {
          const n1 = getNode(from)
          const n2 = getNode(to)
          return (
            <motion.circle
              key={`pulse-${from}-${to}`}
              r={2}
              fill="var(--color-accent)"
              initial={{ cx: n1.x, cy: n1.y, opacity: 0 }}
              animate={{
                cx: [n1.x, n2.x],
                cy: [n1.y, n2.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )
        })}
        
        {/* Nodes */}
        {nodes.map((node, i) => {
          const Icon = node.icon
          const isHovered = hoveredNode === node.id
          const isCore = node.id === 'core'
          
          return (
            <motion.g
              key={node.id}
              initial={reduceMotion ? {} : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Node glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size + 8}
                fill={isHovered || isCore ? 'color-mix(in srgb, var(--color-accent) 20%, transparent)' : 'transparent'}
                style={{ transition: 'fill 0.2s ease' }}
              />
              
              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill={isCore ? 'var(--color-accent)' : 'var(--color-surface-raised)'}
                stroke={isHovered ? 'var(--color-accent)' : 'var(--color-border-solid)'}
                strokeWidth={isHovered ? 2 : 1}
                animate={isCore && !reduceMotion ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Icon (foreignObject for React icons) */}
              <foreignObject
                x={node.x - node.size * 0.5}
                y={node.y - node.size * 0.5}
                width={node.size}
                height={node.size}
                style={{ overflow: 'visible' }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon
                    size={node.size * 0.6}
                    color={isCore ? 'var(--color-accent-fg)' : 'var(--color-accent)'}
                  />
                </div>
              </foreignObject>
            </motion.g>
          )
        })}
      </svg>
      
      {/* Hover label */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '4px 12px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-accent)',
              borderRadius: 6,
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent)',
              whiteSpace: 'nowrap',
            }}
          >
            {nodes.find(n => n.id === hoveredNode)?.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
   BENTO GRID CARD
   ======================================== */
function BentoCard({ children, span = 1, rowSpan = 1, highlight = false, style = {} }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      style={{
        gridColumn: `span ${span}`,
        gridRow: `span ${rowSpan}`,
        background: highlight 
          ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 8%, var(--color-surface)) 0%, var(--color-surface) 100%)'
          : 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 16,
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered 
          ? '0 20px 40px -10px color-mix(in srgb, var(--color-accent) 15%, transparent)'
          : 'var(--shadow-sm)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

/* ========================================
   SKILL ORBIT
   ======================================== */
function SkillOrbit() {
  const reduceMotion = useReducedMotion()
  const skills = [
    { name: 'Python', angle: 0 },
    { name: 'LangChain', angle: 45 },
    { name: 'RAG', angle: 90 },
    { name: 'PyTorch', angle: 135 },
    { name: 'SQL', angle: 180 },
    { name: 'FastAPI', angle: 225 },
    { name: 'React', angle: 270 },
    { name: 'AWS', angle: 315 },
  ]
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Center label */}
      <div style={{
        position: 'absolute',
        zIndex: 2,
        textAlign: 'center',
      }}>
        <Terminal size={24} color="var(--color-accent)" />
        <div style={{
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)',
          marginTop: 4,
        }}>
          Core Stack
        </div>
      </div>
      
      {/* Orbit ring */}
      <motion.div
        style={{
          position: 'absolute',
          width: 160,
          height: 160,
          borderRadius: '50%',
          border: '1px dashed var(--color-border)',
        }}
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {skills.map((skill, i) => {
          const rad = (skill.angle * Math.PI) / 180
          const x = Math.cos(rad) * 80
          const y = Math.sin(rad) * 80
          
          return (
            <motion.div
              key={skill.name}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              animate={reduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div style={{
                padding: '4px 8px',
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-border)',
                borderRadius: 6,
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text)',
                whiteSpace: 'nowrap',
              }}>
                {skill.name}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ========================================
   TIMELINE ITEM
   ======================================== */
function TimelineItem({ year, title, subtitle, description, isLast }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
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
          paddingBottom: isLast ? 0 : '2rem', 
          flex: 1,
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
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
        }}>
          {title}
        </h4>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}>
          {subtitle}
        </p>
        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                marginTop: 8,
                lineHeight: 1.6,
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
   ANIMATED VALUE CARD
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
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        background: hovered ? 'var(--color-surface-raised)' : 'transparent',
        borderRadius: 12,
        transition: 'all 0.2s ease',
        cursor: 'default',
      }}
    >
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
  
  return (
    <div style={{ padding: '0 var(--space-4)' }}>
      <PageHeader
        title="About"
        subtitle="AI engineer building production systems that scale"
      />
      
      {/* Hero Bento Grid */}
      <div 
        ref={heroRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '1rem',
          marginBottom: '4rem',
        }}
        className="about-bento-grid"
      >
        {/* Main intro card - spans 7 columns */}
        <BentoCard span={7} rowSpan={2} highlight className="about-intro-card">
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '1rem',
            }}>
              Hello, I&apos;m
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}>
              Himanshu Nakrani
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              flex: 1,
            }}>
              I&apos;m an <strong style={{ color: 'var(--color-text)' }}>AI Software Developer</strong> at State Street Corporation, 
              building enterprise LLM systems that turn complex financial data into accessible insights. 
              From fine-tuning models to shipping production APIs, I focus on systems that actually work at scale.
            </p>
            
            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://github.com/himanshu-nakrani"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  background: 'var(--color-accent)',
                  color: 'var(--color-accent-fg)',
                  borderRadius: 8,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/himanshu-nakrani/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  borderRadius: 8,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a
                href="mailto:himanshu.nakrani@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  borderRadius: 8,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <Mail size={16} />
                Email
              </a>
            </div>
          </div>
        </BentoCard>
        
        {/* Animated avatar - spans 5 columns */}
        <BentoCard span={5} rowSpan={2} className="about-avatar-card">
          <AnimatedAvatar />
        </BentoCard>
        
        {/* Stats row - 4 cards spanning 3 columns each */}
        {stats.map((stat, i) => {
          const { numeric, suffix } = parseStatValue(stat.value)
          const Icon = stat.icon
          return (
            <BentoCard key={stat.label} span={3} className="about-stat-card">
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem',
                }}>
                  <Icon size={18} color="var(--color-accent)" />
                </div>
                <StatDisplay value={stat.value} inView={heroInView} />
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  marginTop: 4,
                }}>
                  {stat.label}
                </div>
              </div>
            </BentoCard>
          )
        })}
      </div>
      
      {/* Skills + Journey Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '1rem',
        marginBottom: '4rem',
      }} className="about-content-grid">
        {/* Skill Orbit */}
        <BentoCard span={5} className="about-skills-card">
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: '1rem',
          }}>
            Tech Stack
          </h3>
          <SkillOrbit />
        </BentoCard>
        
        {/* Journey Timeline */}
        <BentoCard span={7} className="about-journey-card">
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: '1.5rem',
          }}>
            Journey
          </h3>
          {journey.map((item, i) => (
            <TimelineItem
              key={item.year}
              {...item}
              isLast={i === journey.length - 1}
            />
          ))}
        </BentoCard>
      </div>
      
      {/* Values + Certifications */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '1rem',
        marginBottom: '4rem',
      }} className="about-values-grid">
        {/* Values */}
        <BentoCard span={7} className="about-values-card">
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: '1rem',
          }}>
            Philosophy
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {values.map((value, i) => (
              <ValueCard key={value.title} {...value} index={i} />
            ))}
          </div>
        </BentoCard>
        
        {/* Certifications */}
        <BentoCard span={5} className="about-certs-card">
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: '1rem',
          }}>
            Certifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)',
                  borderRadius: 8,
                }}
              >
                <Award size={16} color="var(--color-accent)" />
                <div>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}>
                    {cert.name}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: 'var(--color-text-muted)',
                  }}>
                    {cert.issuer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </BentoCard>
      </div>
      
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .about-bento-grid,
          .about-content-grid,
          .about-values-grid {
            grid-template-columns: 1fr !important;
          }
          .about-intro-card,
          .about-avatar-card,
          .about-stat-card,
          .about-skills-card,
          .about-journey-card,
          .about-values-card,
          .about-certs-card {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
        @media (max-width: 600px) {
          .about-bento-grid {
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ========================================
   STAT DISPLAY WITH COUNT-UP
   ======================================== */
function StatDisplay({ value, inView }) {
  const { numeric, suffix } = parseStatValue(value)
  const count = useCountUp(numeric, 800, inView)
  
  return (
    <div style={{
      fontSize: '1.75rem',
      fontWeight: 700,
      color: 'var(--color-text)',
      fontFamily: 'var(--font-mono)',
    }}>
      {count}{suffix}
    </div>
  )
}
