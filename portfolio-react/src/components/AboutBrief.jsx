import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, Award, Lightbulb, Target, Zap, BookOpen, Users } from 'lucide-react'

/* ========================================
   UTILITY: Animated Counter
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
   ANIMATION VARIANTS
   ======================================== */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

/* ========================================
   DATA
   ======================================== */
const stats = [
  { value: '2+', label: 'Years Experience', icon: Briefcase },
  { value: '100+', label: 'Users Served', icon: Users },
  { value: '75%', label: 'Latency Reduction', icon: Zap },
  { value: '2', label: 'IEEE Publications', icon: BookOpen },
]

const expertise = [
  {
    title: 'LLM Engineering',
    description: 'Building production LLM systems including Text-to-SQL, RAG pipelines, and AI agent platforms at enterprise scale.',
    icon: Target,
  },
  {
    title: 'Research & Publication',
    description: 'Published at IEEE FLLM 2025 and CSCI 2025 on Graph-of-Thoughts reasoning for data augmentation and fine-tuning.',
    icon: GraduationCap,
  },
  {
    title: 'Performance Engineering',
    description: 'Obsessed with latency and reliability. Achieved 75% response time reduction through caching and architectural improvements.',
    icon: Zap,
  },
  {
    title: 'Full-Stack AI',
    description: 'End-to-end ownership from fine-tuning models to shipping production APIs that serve real users in financial services.',
    icon: Lightbulb,
  },
]

const values = [
  {
    title: 'Ship What Works',
    description: 'I focus on building AI systems that solve real problems, not just demos. Production-first mindset.',
  },
  {
    title: 'Continuous Learning',
    description: 'Always exploring new research, tools, and frameworks to push the boundaries of what is possible.',
  },
  {
    title: 'Collaborate & Share',
    description: 'Open to collaboration on AI/ML projects and contributing to the open-source community.',
  },
]

const journey = [
  {
    year: '2023 - Present',
    role: 'AI Software Developer',
    company: 'State Street Corporation',
    description: 'Building enterprise LLM systems for financial data analysis. Leading development of Text-to-SQL chatbots and RAG pipelines serving 100+ users.',
  },
  {
    year: '2025',
    role: 'Published Researcher',
    company: 'IEEE FLLM & CSCI',
    description: 'Published research on Graph-of-Thoughts reasoning for Text-to-SQL data augmentation and fine-tuning methodologies.',
  },
  {
    year: '2022',
    role: 'ML Summer School',
    company: 'Amazon',
    description: 'Selected for Amazon Machine Learning Summer School. Completed deep dives into production ML systems and best practices.',
  },
]

const certifications = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle' },
  { name: 'AWS ML Foundations', issuer: 'Udacity' },
  { name: 'Generative AI Fundamentals', issuer: 'Databricks' },
]

/* ========================================
   SUB-COMPONENTS
   ======================================== */
function StatCard({ value, label, icon: Icon, delay, inView }) {
  const { numeric, suffix } = parseStatValue(value)
  const count = useCountUp(numeric, 800, inView)

  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'var(--space-6)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        flex: '1 1 140px',
        minWidth: '140px',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-md)',
          background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-4)',
        }}
      >
        <Icon size={22} style={{ color: 'var(--color-accent)' }} />
      </div>
      <div
        style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text)',
          lineHeight: 1,
          marginBottom: 'var(--space-2)',
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}

function ExpertiseCard({ title, description, icon: Icon, index, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 'var(--space-6)',
        background: hovered ? 'var(--color-surface-raised)' : 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-lg)',
        transition: 'all var(--motion-duration-base) var(--motion-ease)',
        cursor: 'default',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-md)',
          background: hovered
            ? 'var(--color-accent)'
            : 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-4)',
          transition: 'background var(--motion-duration-base) var(--motion-ease)',
        }}
      >
        <Icon
          size={20}
          style={{
            color: hovered ? 'var(--color-accent-fg)' : 'var(--color-accent)',
            transition: 'color var(--motion-duration-base) var(--motion-ease)',
          }}
        />
      </div>
      <h3
        style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-2)',
          lineHeight: 'var(--line-height-tight)',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          lineHeight: 'var(--line-height-relaxed)',
          margin: 0,
        }}
      >
        {description}
      </p>
    </motion.div>
  )
}

function ValueCard({ title, description, index, inView }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: 'flex',
        gap: 'var(--space-4)',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--color-accent)',
          color: 'var(--color-accent-fg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-bold)',
          flexShrink: 0,
        }}
      >
        {index + 1}
      </div>
      <div>
        <h4
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-1)',
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--line-height-relaxed)',
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function JourneyItem({ year, role, company, description, index, inView }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: 'flex',
        gap: 'var(--space-6)',
        position: 'relative',
      }}
    >
      {/* Timeline line */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: 20,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            zIndex: 1,
          }}
        />
        <div
          style={{
            width: 2,
            flex: 1,
            background: 'var(--color-border)',
            marginTop: 'var(--space-2)',
          }}
        />
      </div>
      
      {/* Content */}
      <div style={{ paddingBottom: 'var(--space-8)', flex: 1 }}>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {year}
        </span>
        <h4
          style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text)',
            marginTop: 'var(--space-1)',
            marginBottom: 'var(--space-1)',
          }}
        >
          {role}
        </h4>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-2)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {company}
        </p>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--line-height-relaxed)',
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function CertificationBadge({ name, issuer }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-4)',
        background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
        border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text)',
      }}
    >
      <Award size={14} style={{ color: 'var(--color-accent)' }} />
      <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{name}</span>
      <span style={{ color: 'var(--color-text-muted)' }}>|</span>
      <span style={{ color: 'var(--color-text-muted)' }}>{issuer}</span>
    </div>
  )
}

/* ========================================
   MAIN COMPONENT
   ======================================== */
export default function AboutBrief() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref}>
      {/* ========================================
         SECTION 1: Bio Introduction
         ======================================== */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'var(--space-8)',
          marginBottom: 'var(--space-16)',
        }}
      >
        <motion.div variants={fadeUp}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-4)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            About Me
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text)',
              lineHeight: 'var(--line-height-tight)',
              marginBottom: 'var(--space-6)',
              maxWidth: '28ch',
            }}
          >
            Building AI systems that work at scale
          </h2>
          <div
            style={{
              borderLeft: '3px solid var(--color-accent)',
              paddingLeft: 'var(--space-6)',
              maxWidth: '680px',
            }}
          >
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                margin: 0,
                marginBottom: 'var(--space-4)',
              }}
            >
              I'm an AI Software Developer at State Street Corporation, building enterprise LLM systems 
              that turn complex financial data into accessible insights.
            </p>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                margin: 0,
              }}
            >
              I work across the full stack—from fine-tuning models to shipping production APIs—with 
              a focus on systems that actually work at scale. My recent research on Graph-of-Thoughts 
              reasoning has been published at IEEE conferences.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* ========================================
         SECTION 2: Stats Grid
         ======================================== */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-16)',
        }}
      >
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            delay={0.1 + i * 0.08}
            inView={inView}
          />
        ))}
      </motion.div>

      {/* ========================================
         SECTION 3: Expertise Grid
         ======================================== */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{ marginBottom: 'var(--space-16)' }}
      >
        <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-8)' }}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-3)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            Expertise
          </span>
          <h3
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            What I Do Best
          </h3>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {expertise.map((item, i) => (
            <ExpertiseCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </motion.div>

      {/* ========================================
         SECTION 4: Journey / Timeline
         ======================================== */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'var(--space-12)',
          marginBottom: 'var(--space-16)',
        }}
      >
        {/* Journey Timeline */}
        <div>
          <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-8)' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-3)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              Journey
            </span>
            <h3
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text)',
                margin: 0,
              }}
            >
              Career Path
            </h3>
          </motion.div>

          <div>
            {journey.map((item, i) => (
              <JourneyItem
                key={item.year}
                {...item}
                index={i}
                inView={inView}
              />
            ))}
          </div>
        </div>

        {/* Values + Certifications */}
        <div>
          <motion.div variants={fadeUp} style={{ marginBottom: 'var(--space-8)' }}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-3)',
                fontWeight: 'var(--font-weight-medium)',
              }}
            >
              Philosophy
            </span>
            <h3
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-text)',
                margin: 0,
              }}
            >
              How I Work
            </h3>
          </motion.div>

          <motion.div
            variants={stagger}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
            }}
          >
            {values.map((item, i) => (
              <ValueCard
                key={item.title}
                {...item}
                index={i}
                inView={inView}
              />
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div variants={fadeUp}>
            <h4
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text)',
                marginBottom: 'var(--space-4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Certifications
            </h4>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
              }}
            >
              {certifications.map((cert) => (
                <CertificationBadge key={cert.name} {...cert} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ========================================
         RESPONSIVE STYLES
         ======================================== */}
      <style>{`
        @media (max-width: 768px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          .about-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
