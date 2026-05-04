import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitBranch, BookOpen, Network, FileText, Award, TrendingUp, Brain, ChevronRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { publications } from '../data'

/* ─── Sub-components ───────────────────────────────────── */
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

function PaperCard({ pub, index, isExpanded, onToggle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isPublished = !!pub.link
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderRadius: 20,
        border: `1px solid ${hovered || isExpanded ? 'color-mix(in srgb, var(--color-accent) 35%, var(--color-border))' : 'var(--color-border)'}`,
        background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        boxShadow: hovered || isExpanded ? '0 8px 32px color-mix(in srgb, var(--color-accent) 12%, transparent)' : 'var(--shadow-xs)',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: isPublished
          ? 'linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 25%, transparent))'
          : 'linear-gradient(90deg, var(--color-info), color-mix(in srgb, var(--color-info) 20%, transparent))',
      }} />

      {/* Header - always visible */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.5rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            {/* Venue + status badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                color: 'var(--color-accent)', 
                background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-accent) 28%, transparent)',
                padding: '3px 10px', borderRadius: 6,
              }}>
                {pub.venue}
              </span>
              <span style={{
                fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                color: isPublished ? 'var(--color-success)' : 'var(--color-info)',
                background: isPublished ? 'rgba(74,222,128,0.1)' : 'rgba(59,130,246,0.1)',
                border: `1px solid ${isPublished ? 'rgba(74,222,128,0.3)' : 'rgba(59,130,246,0.3)'}`,
                padding: '3px 10px', borderRadius: 6,
              }}>
                {isPublished ? 'IEEE Published' : 'Accepted'}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.45,
              color: 'var(--color-text)',
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              {pub.title}
            </h3>
          </div>

          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: isExpanded ? 'color-mix(in srgb, var(--color-accent) 15%, transparent)' : 'var(--color-surface-raised)',
              border: `1px solid ${isExpanded ? 'color-mix(in srgb, var(--color-accent) 30%, transparent)' : 'var(--color-border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ChevronRight size={16} color={isExpanded ? 'var(--color-accent)' : 'var(--color-text-muted)'} />
          </motion.div>
        </div>
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
            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              {/* Description */}
              <p style={{
                fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.75,
                marginBottom: '1.25rem',
                padding: '1rem 1.25rem',
                background: 'color-mix(in srgb, var(--color-accent) 5%, var(--color-bg))',
                borderLeft: '3px solid var(--color-accent)',
                borderRadius: '0 10px 10px 0',
              }}>
                {pub.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
                {pub.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>

              {/* Link */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                    style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <ExternalLink size={13} /> View on IEEE Xplore
                  </a>
                ) : (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: '0.78rem', color: 'var(--color-info)',
                    fontFamily: 'var(--font-mono)',
                    padding: '8px 14px', borderRadius: 10,
                    background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                  }}>
                    <BookOpen size={13} /> Proceedings pending
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Interactive methodology node ─────────────────────── */
function MethodologyNode({ label, description, icon: Icon, delay, inView, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: '1rem 1.25rem',
        borderRadius: 14,
        border: `1px solid ${isActive ? 'var(--color-accent)' : hovered ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border))' : 'var(--color-border)'}`,
        background: isActive 
          ? 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))'
          : hovered 
            ? 'color-mix(in srgb, var(--color-accent) 6%, var(--color-surface))'
            : 'var(--color-surface)',
        cursor: 'pointer',
        flex: 1,
        minWidth: 140,
        textAlign: 'center',
        transform: hovered || isActive ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isActive ? '0 4px 16px color-mix(in srgb, var(--color-accent) 20%, transparent)' : 'var(--shadow-xs)',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: isActive 
          ? 'var(--color-accent)'
          : 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
        border: `1px solid ${isActive ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-accent) 25%, transparent)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 0.6rem',
        transition: 'all 0.2s',
      }}>
        <Icon size={18} color={isActive ? 'white' : 'var(--color-accent)'} />
      </div>
      <p style={{ 
        fontSize: '0.82rem', 
        fontWeight: 700, 
        color: isActive ? 'var(--color-accent)' : 'var(--color-text)', 
        lineHeight: 1.3,
        margin: 0,
        transition: 'color 0.2s',
      }}>
        {label}
      </p>
    </motion.button>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ResearchPage() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })
  const methodRef = useRef(null)
  const methodInView = useInView(methodRef, { once: true, margin: '-40px' })
  
  const [expandedPaper, setExpandedPaper] = useState(0) // First paper expanded by default
  const [activeMethodNode, setActiveMethodNode] = useState(0)

  const published = publications.filter(p => p.link).length
  const accepted = publications.filter(p => !p.link).length

  const methodologySteps = [
    { 
      label: 'NL Query', 
      icon: FileText,
      description: 'Natural language question input from user - e.g., "What were the top performing funds last quarter?"'
    },
    { 
      label: 'GoT Reasoning', 
      icon: Network,
      description: 'Graph-of-Thoughts decomposes complex queries into sub-problems, exploring multiple reasoning paths simultaneously.'
    },
    { 
      label: 'SQL Augmentation', 
      icon: GitBranch,
      description: 'High-quality synthetic SQL examples generated for training data, improving model accuracy on edge cases.'
    },
    { 
      label: 'Fine-tuned LLM', 
      icon: Brain,
      description: 'Domain-adapted language model trained on augmented data, optimized for structured query generation.'
    },
  ]

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Research"
        title="Publications"
        description="Graph-of-Thoughts reasoning, Text-to-SQL augmentation, and LLM fine-tuning for structured data."
      />

      {/* Stats grid - modern bento style */}
      <div ref={statsRef} style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '0.75rem', 
        marginBottom: '2.5rem',
      }} className="research-stats-grid">
        {[
          { value: publications.length, label: 'Papers', icon: FileText },
          { value: published, label: 'Published', icon: Award },
          { value: accepted, label: 'Accepted', icon: TrendingUp },
          { value: 'GoT', label: 'Core Method', icon: Network },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '1rem 1.1rem', borderRadius: 14,
              background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <s.icon size={18} color="var(--color-accent)" />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Papers - collapsible cards */}
      <SectionLabel icon={FileText}>Selected Papers</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '3rem' }}>
        {publications.map((p, i) => (
          <PaperCard 
            key={i} 
            pub={p} 
            index={i}
            isExpanded={expandedPaper === i}
            onToggle={() => setExpandedPaper(expandedPaper === i ? -1 : i)}
          />
        ))}
      </div>

      {/* Interactive GoT methodology diagram */}
      <div ref={methodRef} style={{ marginBottom: '2.5rem' }}>
        <SectionLabel icon={Network}>Core Methodology</SectionLabel>

        <div style={{
          padding: '1.75rem',
          borderRadius: 20,
          border: '1px solid var(--color-border)',
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
        }}>
          {/* Pipeline title */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8, 
            marginBottom: '1.5rem',
            padding: '0.5rem 0.85rem',
            background: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
            borderRadius: 10,
            width: 'fit-content',
          }}>
            <Brain size={16} color="var(--color-accent)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Graph-of-Thoughts Pipeline
            </span>
          </div>

          {/* Interactive pipeline nodes */}
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}>
            {methodologySteps.map((step, i) => (
              <MethodologyNode
                key={step.label}
                {...step}
                delay={0.1 * i}
                inView={methodInView}
                isActive={activeMethodNode === i}
                onClick={() => setActiveMethodNode(i)}
              />
            ))}
          </div>

          {/* Active step description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethodNode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 12,
                background: 'color-mix(in srgb, var(--color-accent) 6%, var(--color-bg))',
                border: '1px solid color-mix(in srgb, var(--color-accent) 15%, var(--color-border))',
              }}
            >
              <p style={{ 
                fontSize: '0.88rem', 
                color: 'var(--color-text-muted)', 
                lineHeight: 1.7, 
                margin: 0,
              }}>
                <strong style={{ color: 'var(--color-accent)' }}>
                  {methodologySteps[activeMethodNode].label}:
                </strong>{' '}
                {methodologySteps[activeMethodNode].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Research interests tags */}
      <div style={{ marginBottom: '2rem' }}>
        <SectionLabel icon={TrendingUp}>Research Interests</SectionLabel>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['Graph-of-Thoughts', 'Text-to-SQL', 'LLM Fine-tuning', 'Data Augmentation', 'Structured Reasoning', 'NL Interfaces'].map(t => (
            <span key={t} style={{
              fontSize: '0.76rem', padding: '6px 14px', borderRadius: 10,
              border: '1px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border))',
              background: 'color-mix(in srgb, var(--color-accent) 8%, var(--color-surface))',
              color: 'var(--color-accent)', fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Research focus callout */}
      <div style={{
        padding: '1.5rem 1.75rem', 
        borderRadius: 16,
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 6%, var(--color-surface)) 0%, var(--color-surface-raised) 100%)',
        border: '1px solid var(--color-border)', 
        borderLeft: '4px solid var(--color-accent)',
        display: 'flex', 
        gap: '1rem', 
        alignItems: 'flex-start',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
          border: '1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <GitBranch size={18} color="var(--color-accent)" />
        </div>
        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
            Research Focus
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.75, margin: 0 }}>
            My research bridges structured reasoning and LLM capabilities — specifically how Graph-of-Thoughts frameworks improve data augmentation and fine-tuning pipelines for Text-to-SQL tasks. The goal is connecting academic NLP advances with production-grade enterprise systems.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .research-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .research-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
