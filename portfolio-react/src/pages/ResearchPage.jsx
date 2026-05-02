import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, GitBranch, BookOpen, Network } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { publications } from '../data'

/* ─── Sub-components ───────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p style={{
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-accent)',
      textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: '1rem',
    }}>
      <span style={{ display: 'inline-block', width: 18, height: 1.5, background: 'var(--color-accent)', borderRadius: 2 }} />
      {children}
    </p>
  )
}

function PaperCard({ pub, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isPublished = !!pub.link

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      style={{
        borderRadius: 18,
        border: `1px solid color-mix(in srgb, var(--color-accent) ${isPublished ? 22 : 14}%, var(--border))`,
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: isPublished
          ? 'linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 25%, transparent))'
          : 'linear-gradient(90deg, var(--color-info), color-mix(in srgb, var(--color-info) 20%, transparent))',
      }} />

      <div style={{ padding: '1.6rem' }}>
        {/* Venue + status row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
            color: 'var(--color-accent)', background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-accent) 28%, transparent)',
            padding: '3px 11px', borderRadius: 20,
          }}>
            📍 {pub.venue}
          </span>
          <span style={{
            fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
            color: isPublished ? 'var(--color-success)' : 'var(--color-info)',
            background: isPublished ? 'rgba(74,222,128,0.08)' : 'rgba(59,130,246,0.08)',
            border: `1px solid ${isPublished ? 'rgba(74,222,128,0.25)' : 'rgba(59,130,246,0.25)'}`,
            padding: '3px 11px', borderRadius: 20,
          }}>
            {isPublished ? '● Published · IEEE Xplore' : '○ Accepted · Upcoming'}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.45,
          marginBottom: '0.75rem', color: 'var(--text)',
          letterSpacing: '-0.01em',
        }}>
          {pub.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.86rem', color: 'var(--text2)', lineHeight: 1.72,
          marginBottom: '1.1rem',
          padding: '0.75rem 1rem',
          background: 'color-mix(in srgb, var(--color-accent) 4%, var(--surface))',
          borderLeft: '2px solid color-mix(in srgb, var(--color-accent) 35%, transparent)',
          borderRadius: '0 8px 8px 0',
        }}>
          {pub.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1.1rem' }}>
          {pub.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>

        {/* Link */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingTop: '0.9rem', borderTop: '1px solid var(--border)' }}>
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
              padding: '6px 14px', borderRadius: 9,
              background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
            }}>
              <BookOpen size={12} /> Proceedings pending publication
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Methodology node ─────────────────────────────────── */
function GoTNode({ label, sub, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      style={{
        padding: '0.7rem 1rem', borderRadius: 10,
        border: '1px solid color-mix(in srgb, var(--color-accent) 28%, var(--border))',
        background: 'color-mix(in srgb, var(--color-accent) 6%, var(--surface))',
        textAlign: 'center', minWidth: 100,
      }}
    >
      <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25 }}>{label}</p>
      {sub && <p style={{ fontSize: '0.67rem', color: 'var(--text2)', marginTop: 3, fontFamily: 'var(--font-mono)' }}>{sub}</p>}
    </motion.div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ResearchPage() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })
  const methodRef = useRef(null)
  const methodInView = useInView(methodRef, { once: true, margin: '-40px' })

  const published = publications.filter(p => p.link).length
  const accepted  = publications.filter(p => !p.link).length

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Research"
        title="Publications"
        description="Graph-of-Thoughts reasoning, Text-to-SQL augmentation, and LLM fine-tuning for structured data."
      />

      {/* Stats strip */}
      <div ref={statsRef} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {[
          { value: publications.length, label: 'Papers',        icon: '📄' },
          { value: published,           label: 'IEEE Published', icon: '✅' },
          { value: accepted,            label: 'Accepted',       icon: '📬' },
          { value: 'GoT',               label: 'Core Method',    icon: '🧠' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              flex: 1, minWidth: 90,
              padding: '1rem 1.1rem', borderRadius: 12, textAlign: 'center',
              background: 'var(--surface)', border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}
          >
            <span style={{ fontSize: '1rem' }}>{s.icon}</span>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: '0.67rem', color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500 }}>{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Papers */}
      <SectionLabel>Selected Papers</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
        {publications.map((p, i) => <PaperCard key={i} pub={p} index={i} />)}
      </div>

      {/* GoT methodology callout */}
      <div ref={methodRef} style={{ marginBottom: '2.5rem' }}>
        <SectionLabel>Core Methodology</SectionLabel>

        {/* GoT pipeline diagram */}
        <div style={{
          padding: '1.5rem', borderRadius: 16,
          border: '1px solid color-mix(in srgb, var(--color-accent) 20%, var(--border))',
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
          marginBottom: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.25rem' }}>
            <Network size={15} color="var(--color-accent)" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Graph-of-Thoughts Pipeline
            </span>
          </div>

          {/* Pipeline nodes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[
              ['NL Query', 'input'],
              ['→'],
              ['GoT Reasoning', 'decompose'],
              ['→'],
              ['SQL Augmentation', 'generate'],
              ['→'],
              ['Fine-tuned LLM', 'train'],
              ['→'],
              ['SQL Output', 'output'],
            ].map((item, i) =>
              Array.isArray(item) && item.length === 1 ? (
                <span key={i} style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: '1rem' }}>{item[0]}</span>
              ) : (
                <GoTNode key={i} label={item[0]} sub={item[1]} delay={0.05 * i} inView={methodInView} />
              )
            )}
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text2)', lineHeight: 1.72, margin: 0 }}>
            The Graph-of-Thoughts framework structures multi-step SQL reasoning as a directed graph — enabling systematic exploration of sub-queries, joins, and aggregations. This produces higher-quality synthetic training data and improves fine-tuned model accuracy on complex Text-to-SQL tasks.
          </p>
        </div>

        {/* Research interests */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {['Graph-of-Thoughts', 'Text-to-SQL', 'LLM Fine-tuning', 'Data Augmentation', 'Structured Reasoning', 'NL → SQL'].map(t => (
            <span key={t} style={{
              fontSize: '0.73rem', padding: '4px 12px', borderRadius: 20,
              border: '1px solid color-mix(in srgb, var(--color-accent) 28%, var(--border))',
              background: 'color-mix(in srgb, var(--color-accent) 7%, var(--surface))',
              color: 'var(--color-accent)', fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Research focus */}
      <div style={{
        padding: '1.4rem 1.6rem', borderRadius: 14,
        background: 'color-mix(in srgb, var(--color-accent) 5%, var(--surface))',
        border: '1px solid var(--border)', borderLeft: '3px solid var(--color-accent)',
        display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
      }}>
        <GitBranch size={16} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: 3 }} />
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '0.4rem' }}>
            Research Focus
          </p>
          <p style={{ fontSize: '0.87rem', color: 'var(--text2)', lineHeight: 1.75, margin: 0 }}>
            My research sits at the intersection of structured reasoning and LLM capabilities — specifically how Graph-of-Thoughts frameworks improve data augmentation and fine-tuning pipelines for Text-to-SQL tasks. The goal is bridging the gap between academic NLP advances and production-grade enterprise systems.
          </p>
        </div>
      </div>
    </section>
  )
}
