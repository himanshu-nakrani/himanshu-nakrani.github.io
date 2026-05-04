import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, GraduationCap, Award, Target, Zap, BookOpen, Users, 
  Brain, Database, Code2, Layers, Cpu, Network, GitBranch,
  ArrowRight, ExternalLink, Mail, Github, Linkedin, Terminal,
  Sparkles, ChevronRight, Play, Star, TrendingUp, Coffee
} from 'lucide-react'

/* ========================================
   GLASS CARD COMPONENT
   ======================================== */
function GlassCard({ children, className = '', gradient = false, glow = false, hover = true, style = {} }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.3 }}
      className={className}
      style={{
        position: 'relative',
        background: gradient 
          ? 'linear-gradient(135deg, rgba(100, 255, 218, 0.08) 0%, rgba(17, 34, 64, 0.9) 50%, rgba(100, 255, 218, 0.05) 100%)'
          : 'rgba(17, 34, 64, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(100, 255, 218, 0.15)',
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered && glow
          ? '0 0 40px rgba(100, 255, 218, 0.15), 0 20px 40px rgba(0, 0, 0, 0.3)'
          : '0 8px 32px rgba(0, 0, 0, 0.2)',
        ...style,
      }}
    >
      {/* Animated border gradient */}
      {isHovered && glow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            inset: -1,
            background: 'linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.4), transparent)',
            borderRadius: 20,
            zIndex: -1,
            animation: 'borderGlow 2s linear infinite',
          }}
        />
      )}
      {children}
    </motion.div>
  )
}

/* ========================================
   FLOATING PARTICLES BACKGROUND
   ======================================== */
function FloatingParticles() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return null
  
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }))
  
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
          animate={{
            y: [`${p.y}%`, `${p.y - 30}%`, `${p.y}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  )
}

/* ========================================
   ANIMATED COUNTER
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

/* ========================================
   BENTO STAT CARD
   ======================================== */
function BentoStatCard({ value, label, icon: Icon, color = 'var(--color-accent)', size = 'normal', index, inView }) {
  const numericMatch = value.match(/^(\d+)(.*)$/)
  const numeric = numericMatch ? parseInt(numericMatch[1], 10) : 0
  const suffix = numericMatch ? numericMatch[2] : value
  const count = useCountUp(numeric, 1200, inView)
  const [hovered, setHovered] = useState(false)
  
  const isLarge = size === 'large'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: isLarge ? '2rem' : '1.5rem',
        background: hovered
          ? `linear-gradient(135deg, ${color}15 0%, rgba(17, 34, 64, 0.8) 100%)`
          : 'rgba(17, 34, 64, 0.5)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? color + '40' : 'rgba(100, 255, 218, 0.1)'}`,
        borderRadius: 16,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          animate={{ rotate: hovered ? 360 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: isLarge ? 56 : 44,
            height: isLarge ? 56 : 44,
            borderRadius: 14,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: isLarge ? '1.25rem' : '1rem',
          }}
        >
          <Icon size={isLarge ? 26 : 20} color={color} />
        </motion.div>
        
        <div style={{
          fontSize: isLarge ? 'clamp(2.5rem, 5vw, 3.5rem)' : 'clamp(1.75rem, 3vw, 2.25rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text)',
          lineHeight: 1,
          marginBottom: 6,
        }}>
          <span style={{ color }}>{count}</span>{suffix}
        </div>
        
        <div style={{
          fontSize: isLarge ? '0.95rem' : '0.8rem',
          color: 'var(--color-text-muted)',
          fontWeight: 500,
        }}>
          {label}
        </div>
      </div>
    </motion.div>
  )
}

/* ========================================
   SKILL PILL WITH GLOW
   ======================================== */
function SkillPill({ name, category, delay }) {
  const [hovered, setHovered] = useState(false)
  const categoryColors = {
    'Language': '#64ffda',
    'Framework': '#bd93f9',
    'ML': '#ff79c6',
    'Backend': '#8be9fd',
    'Frontend': '#ffb86c',
    'Database': '#50fa7b',
    'Cloud': '#f1fa8c',
    'DevOps': '#ff5555',
  }
  const color = categoryColors[category] || 'var(--color-accent)'
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '1rem 1.25rem',
        background: hovered
          ? `linear-gradient(135deg, ${color}15 0%, rgba(17, 34, 64, 0.8) 100%)`
          : 'rgba(17, 34, 64, 0.4)',
        border: `1px solid ${hovered ? color + '50' : 'rgba(100, 255, 218, 0.1)'}`,
        borderRadius: 14,
        transition: 'all 0.3s ease',
        cursor: 'default',
        boxShadow: hovered ? `0 0 20px ${color}20` : 'none',
      }}
    >
      <span style={{
        fontSize: '0.95rem',
        fontWeight: 600,
        color: hovered ? color : 'var(--color-text)',
        transition: 'color 0.3s ease',
      }}>
        {name}
      </span>
      <span style={{
        fontSize: '0.65rem',
        fontFamily: 'var(--font-mono)',
        color: color,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        opacity: 0.8,
      }}>
        {category}
      </span>
    </motion.div>
  )
}

/* ========================================
   TIMELINE WITH GLOW LINE
   ======================================== */
function GlowTimeline({ items }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Glowing vertical line */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: 6,
          top: 0,
          width: 2,
          background: 'linear-gradient(to bottom, var(--color-accent), var(--color-accent) 50%, transparent)',
          boxShadow: '0 0 10px var(--color-accent)',
          zIndex: 0,
        }}
      />
      
      {items.map((item, i) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '1.25rem',
            paddingBottom: i === items.length - 1 ? 0 : '1.75rem',
            position: 'relative',
          }}
        >
          {/* Dot */}
          <motion.div
            whileHover={{ scale: 1.5 }}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: 'var(--color-accent)',
              border: '3px solid var(--color-bg)',
              boxShadow: '0 0 12px var(--color-accent)',
              flexShrink: 0,
              zIndex: 1,
            }}
          />
          
          {/* Content */}
          <GlassCard hover={false} style={{ padding: '1.25rem', flex: 1 }}>
            <span style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}>
              {item.year}
            </span>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              margin: '6px 0 4px',
            }}>
              {item.title}
            </h4>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              margin: 0,
              marginBottom: item.description ? 8 : 0,
            }}>
              {item.subtitle}
            </p>
            {item.description && (
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-subtle)',
                margin: 0,
                lineHeight: 1.6,
              }}>
                {item.description}
              </p>
            )}
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}

/* ========================================
   3D TILT CARD
   ======================================== */
function TiltCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')
  const reduceMotion = useReducedMotion()
  
  const handleMouseMove = (e) => {
    if (reduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }
  
  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)')
  }
  
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ========================================
   DATA
   ======================================== */
const stats = [
  { value: '2+', label: 'Years Experience', icon: Briefcase, color: '#64ffda' },
  { value: '100+', label: 'Users Served', icon: Users, color: '#bd93f9' },
  { value: '75%', label: 'Latency Reduction', icon: Zap, color: '#ffb86c' },
  { value: '2', label: 'Publications', icon: BookOpen, color: '#ff79c6' },
]

const techStack = [
  { name: 'Python', category: 'Language' },
  { name: 'LangChain', category: 'Framework' },
  { name: 'PyTorch', category: 'ML' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'React', category: 'Frontend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'LlamaIndex', category: 'Framework' },
  { name: 'Transformers', category: 'ML' },
]

const journey = [
  {
    year: '2023 - Present',
    title: 'AI Software Developer',
    subtitle: 'State Street Corporation',
    description: 'Building enterprise LLM systems for financial data analysis. Leading Text-to-SQL and RAG pipelines.',
  },
  {
    year: '2025',
    title: 'Published Researcher',
    subtitle: 'IEEE FLLM & CSCI',
    description: 'Graph-of-Thoughts reasoning for Text-to-SQL augmentation.',
  },
  {
    year: '2022',
    title: 'ML Summer School',
    subtitle: 'Amazon',
    description: 'Selected for Amazon ML Summer School program.',
  },
]

const values = [
  { icon: Target, title: 'Ship What Works', description: 'Production-first mindset. AI that solves real problems.' },
  { icon: TrendingUp, title: 'Continuous Growth', description: 'Always exploring new research and pushing boundaries.' },
  { icon: GitBranch, title: 'Open Source', description: 'Contributing to community and sharing knowledge.' },
]

const certifications = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle', color: '#ff0000' },
  { name: 'AWS ML Foundations', issuer: 'Udacity', color: '#ff9900' },
  { name: 'Generative AI Fundamentals', issuer: 'Databricks', color: '#ff3621' },
]

/* ========================================
   MAIN PAGE
   ======================================== */
export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const reduceMotion = useReducedMotion()
  
  return (
    <div className="mvp2-page" style={{ position: 'relative' }}>
      <FloatingParticles />
      
      {/* Hero Bento Grid */}
      <section ref={heroRef} style={{ marginBottom: '5rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: '1.25rem',
        }} className="about-hero-grid">
          
          {/* Main intro card - spans 2 rows */}
          <TiltCard style={{ gridRow: '1 / 3' }}>
            <GlassCard gradient glow style={{ height: '100%', padding: '2.5rem' }}>
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.15) 0%, rgba(100, 255, 218, 0.05) 100%)',
                    border: '1px solid rgba(100, 255, 218, 0.3)',
                    borderRadius: 30,
                    marginBottom: '1.5rem',
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles size={16} color="var(--color-accent)" />
                  </motion.div>
                  <span style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}>
                    AI Engineer
                  </span>
                </motion.div>
                
                {/* Name with gradient */}
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.03em',
                }}>
                  <span style={{ color: 'var(--color-text)' }}>Himanshu </span>
                  <span style={{
                    background: 'linear-gradient(135deg, var(--color-accent) 0%, #8be9fd 50%, var(--color-accent) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Nakrani
                  </span>
                </h1>
                
                {/* Description */}
                <p style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                  maxWidth: 550,
                }}>
                  I build <strong style={{ color: 'var(--color-accent)' }}>production AI systems</strong> at 
                  State Street Corporation — enterprise LLM pipelines that transform complex financial data 
                  into actionable insights. From fine-tuning models to shipping scalable APIs.
                </p>
                
                {/* CTAs */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <motion.a
                    href="https://github.com/himanshu-nakrani"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '0.9rem 1.75rem',
                      background: 'var(--color-accent)',
                      color: 'var(--color-accent-fg)',
                      borderRadius: 12,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(100, 255, 218, 0.3)',
                    }}
                  >
                    <Github size={18} />
                    View GitHub
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/himanshu-nakrani/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, borderColor: 'var(--color-accent)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '0.9rem 1.75rem',
                      background: 'transparent',
                      border: '1px solid var(--color-border-strong)',
                      color: 'var(--color-text)',
                      borderRadius: 12,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                  >
                    <Linkedin size={18} />
                    LinkedIn
                  </motion.a>
                </div>
              </motion.div>
            </GlassCard>
          </TiltCard>
          
          {/* Large stat card */}
          <BentoStatCard
            value="2+"
            label="Years Building Production AI"
            icon={Briefcase}
            color="#64ffda"
            size="large"
            index={0}
            inView={heroInView}
          />
          
          {/* Mini stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <BentoStatCard value="100+" label="Users Served" icon={Users} color="#bd93f9" index={1} inView={heroInView} />
            <BentoStatCard value="75%" label="Latency Cut" icon={Zap} color="#ffb86c" index={2} inView={heroInView} />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{ marginBottom: '5rem', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1.5rem' }}
        >
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <Terminal size={24} color="var(--color-accent)" />
            Tech Stack
          </h2>
        </motion.div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {techStack.map((tech, i) => (
            <SkillPill key={tech.name} {...tech} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* Journey + Values Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2.5rem',
        marginBottom: '5rem',
        position: 'relative',
        zIndex: 1,
      }} className="about-journey-grid">
        {/* Journey */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: '1.5rem',
            }}
          >
            <Briefcase size={24} color="var(--color-accent)" />
            Journey
          </motion.h2>
          <GlowTimeline items={journey} />
        </div>
        
        {/* Values + Certifications */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: '1.5rem',
            }}
          >
            <Target size={24} color="var(--color-accent)" />
            Philosophy
          </motion.h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: 'rgba(100, 255, 218, 0.1)',
                      border: '1px solid rgba(100, 255, 218, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <v.icon size={20} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: 4,
                      }}>
                        {v.title}
                      </h4>
                      <p style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}>
                        {v.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
          
          {/* Certifications */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: '1rem',
            }}
          >
            <Award size={20} color="var(--color-accent)" />
            Certifications
          </motion.h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6, borderColor: cert.color + '60' }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '1rem 1.25rem',
                  background: `linear-gradient(135deg, ${cert.color}08 0%, transparent 100%)`,
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                  borderRadius: 12,
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
              >
                <Award size={18} color={cert.color} />
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}>
                    {cert.name}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: cert.color,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.05em',
                  }}>
                    {cert.issuer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Responsive Styles */}
      <style>{`
        @keyframes borderGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @media (max-width: 1024px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .about-hero-grid > div:first-child {
            grid-row: auto !important;
          }
          .about-journey-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        @media (max-width: 600px) {
          .about-hero-grid > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
