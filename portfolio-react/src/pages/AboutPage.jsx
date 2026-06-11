import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { 
  Briefcase, Award, Target, Zap, BookOpen, Users, GitBranch,
  Github, Linkedin, Terminal, TrendingUp
} from 'lucide-react'
import SEO from '../components/SEO'
import { useCountUp } from '../hooks/useCountUp'

/* ========================================
   STAT CARD (minimal)
   ======================================== */
function StatCard({ value, label, icon: Icon, index, inView }) {
  const numericMatch = value.match(/^(\d+)(.*)$/)
  const numeric = numericMatch ? parseInt(numericMatch[1], 10) : 0
  const suffix = numericMatch ? numericMatch[2] : value
  const count = useCountUp(numeric, 1200, inView)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        padding: '1.5rem',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
      }}
    >
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
      }}>
        <Icon size={18} color="var(--color-accent)" />
      </div>
      
      <div style={{
        fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
        fontWeight: 700,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-text)',
        lineHeight: 1,
        marginBottom: 4,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{count}</span>{suffix}
      </div>
      
      <div style={{
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)',
        fontWeight: 500,
      }}>
        {label}
      </div>
    </motion.div>
  )
}

/* ========================================
   SKILL PILL (minimal)
   ======================================== */
function SkillPill({ name, category, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '0.85rem 1.1rem',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
      }}
    >
      <span style={{
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--color-text)',
      }}>
        {name}
      </span>
      <span style={{
        fontSize: '0.65rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {category}
      </span>
    </motion.div>
  )
}

/* ========================================
   TIMELINE (minimal)
   ======================================== */
function Timeline({ items }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Vertical line */}
      <div
        style={{
          position: 'absolute',
          left: 6,
          top: 0,
          bottom: 0,
          width: 1,
          background: 'var(--color-border)',
        }}
      />
      
      {items.map((item, i) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          style={{
            display: 'flex',
            gap: '1.25rem',
            paddingBottom: i === items.length - 1 ? 0 : '1.5rem',
            position: 'relative',
          }}
        >
          {/* Dot */}
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'var(--color-accent)',
              border: '2px solid var(--color-bg)',
              flexShrink: 0,
              zIndex: 1,
            }}
          />
          
          {/* Content */}
          <div style={{
            flex: 1,
            padding: '1rem 1.25rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 10,
          }}>
            <span style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              {item.year}
            </span>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              margin: '4px 0',
            }}>
              {item.title}
            </h4>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              margin: 0,
              marginBottom: item.description ? 6 : 0,
            }}>
              {item.subtitle}
            </p>
            {item.description && (
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-subtle)',
                margin: 0,
                lineHeight: 1.55,
              }}>
                {item.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ========================================
   DATA
   ======================================== */
const stats = [
  { value: '2+', label: 'Years Experience', icon: Briefcase },
  { value: '10+', label: 'Business Units', icon: Users },
  { value: '200+', label: 'Total Users', icon: Users },
  { value: '75%', label: 'Avg Latency Cut', icon: Zap },
  { value: '2', label: 'Publications', icon: BookOpen },
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
    description: 'Building LLM systems for financial-data workflows: Text-to-SQL, RAG, agent tooling, and evaluation.',
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
  { name: 'OCI Generative AI Professional', issuer: 'Oracle' },
  { name: 'AWS ML Foundations', issuer: 'Udacity' },
  { name: 'Generative AI Fundamentals', issuer: 'Databricks' },
]

/* ========================================
   MAIN PAGE
   ======================================== */
export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const reduceMotion = useReducedMotion()
  
  return (
    <>
      <SEO
        title="About | Himanshu Nakrani"
        description="Learn about Himanshu Nakrani's AI engineering background, production LLM work, skills, and career focus."
      />
      <div className="mvp2-page">
      {/* Hero Section */}
      <section ref={heroRef} style={{ marginBottom: '4rem' }}>
        {/* Intro */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2.5rem' }}
        >
          {/* Kicker */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 20,
            marginBottom: '1.25rem',
          }}>
            <span style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent)',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}>
              AI Engineer
            </span>
          </div>
          
          {/* Name */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            color: 'var(--color-text)',
          }}>
            Himanshu Nakrani
          </h1>
          
          {/* Description */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
            maxWidth: 600,
          }}>
            I build <strong style={{ color: 'var(--color-text)' }}>LLM systems for financial-data workflows</strong> at 
            State Street Corporation — Text-to-SQL, RAG, agent tooling, and evaluation infrastructure. 
            My work spans backend APIs, retrieval systems, model adaptation, and observability.
          </p>
          
          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/himanshu-nakrani"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Github size={16} />
              View GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/himanshu-nakrani/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
        }}>
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} inView={heroInView} />
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section style={{ marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1.25rem' }}
        >
          <h2 style={{
            fontSize: '1.35rem',
            fontWeight: 600,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <Terminal size={20} color="var(--color-accent)" />
            Tech Stack
          </h2>
        </motion.div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          {techStack.map((tech, i) => (
            <SkillPill key={tech.name} {...tech} delay={i * 0.03} />
          ))}
        </div>
      </section>

      {/* Journey + Values Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2.5rem',
        marginBottom: '4rem',
      }} className="about-journey-grid">
        {/* Journey */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: '1.25rem',
            }}
          >
            <Briefcase size={20} color="var(--color-accent)" />
            Journey
          </motion.h2>
          <Timeline items={journey} />
        </div>
        
        {/* Values + Certifications */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: '1.25rem',
            }}
          >
            <Target size={20} color="var(--color-accent)" />
            Philosophy
          </motion.h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  padding: '1rem 1.25rem',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <v.icon size={16} color="var(--color-accent)" />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: 2,
                    }}>
                      {v.title}
                    </h4>
                    <p style={{
                      fontSize: '0.82rem',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}>
                      {v.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Certifications */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
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
              marginBottom: '0.85rem',
            }}
          >
            <Award size={18} color="var(--color-accent)" />
            Certifications
          </motion.h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
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
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
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
        @media (max-width: 1024px) {
          .about-journey-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      </div>
    </>
  )
}
