import { useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

// Pipeline steps matching the reference
const pipelineSteps = [
  { label: 'USER QUERY', time: '0ms' },
  { label: 'SCHEMA LINKING', time: '200ms' },
  { label: 'CACHE', time: '50ms' },
  { label: 'LLM', time: '3-4s' },
  { label: 'VALIDATION', time: '800ms' },
  { label: 'EXECUTE', time: '1-2s' },
]

// Stats as horizontal text
const stats = [
  '100+ USERS',
  '75% FASTER', 
  '2 IEEE PUBS',
  '2 YEARS PRODUCTION',
]

function PipelineArrow() {
  return (
    <svg 
      width="32" 
      height="12" 
      viewBox="0 0 32 12" 
      fill="none" 
      style={{ flexShrink: 0 }}
    >
      <path 
        d="M0 6H28M28 6L22 1M28 6L22 11" 
        stroke="var(--color-accent)" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PipelineStep({ label, time, index, isLast }) {
  const reduceMotion = useReducedMotion()
  
  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.08, duration: 0.4 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            padding: '0.6rem 1rem',
            border: '1px solid var(--color-accent)',
            borderRadius: 4,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'var(--color-text)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-accent)',
            letterSpacing: '0.02em',
          }}
        >
          {time}
        </div>
      </div>
      {!isLast && <PipelineArrow />}
    </motion.div>
  )
}

export default function HeroEnhanced() {
  const reduceMotion = useReducedMotion()

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }, [reduceMotion])

  return (
    <section 
      id="hero" 
      style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'var(--navbar-height)',
        paddingBottom: '2rem',
      }}
    >
      <div style={{ 
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 var(--page-pad-x)',
        width: '100%',
      }}>
        {/* Kicker */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            justifyContent: 'center',
          }}
        >
          <span 
            style={{ 
              width: '2rem', 
              height: '1px', 
              background: 'var(--color-text-subtle)' 
            }} 
          />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-text-subtle)',
            }}
          >
            CURRENTLY
          </span>
          <span style={{ color: 'var(--color-text-subtle)', fontSize: '0.75rem' }}>·</span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-accent)',
            }}
          >
            GENERATIVE AI ENGINEER AT STATE STREET
          </span>
        </motion.div>

        {/* Main headline — editorial serif */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              marginBottom: 0,
            }}
          >
            Building production AI
            <br />
            systems that <em style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>ship</em>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            textAlign: 'center',
            maxWidth: '640px',
            margin: '0 auto 3rem',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
          }}
        >
          I deploy LLM systems used by 100+ analysts daily — RAG pipelines,
          Text-to-SQL, agent orchestration. I cut query latency 75% on production
          retrieval, and publish what I learn in IEEE.
        </motion.p>

        {/* Pipeline visualization */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '3rem',
            overflowX: 'auto',
            padding: '1rem 0',
          }}
          className="pipeline-scroll"
        >
          {pipelineSteps.map((step, index) => (
            <PipelineStep 
              key={step.label} 
              label={step.label} 
              time={step.time} 
              index={index}
              isLast={index === pipelineSteps.length - 1}
            />
          ))}
        </motion.div>

        {/* Stats row — horizontal text */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '4rem',
            padding: '1.25rem 2rem',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: 'var(--color-text)',
                }}
              >
                {stat}
              </span>
              {index < stats.length - 1 && (
                <span style={{ color: 'var(--color-text-subtle)', fontSize: '0.5rem' }}>•</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          onClick={() => scrollToSection('highlights')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <ArrowDown size={14} color="var(--color-text-muted)" />
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 400,
              color: 'var(--color-text-muted)',
              position: 'relative',
            }}
          >
            Scroll
            <span
              style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                right: 0,
                height: 1,
                background: 'var(--color-accent)',
              }}
            />
          </span>
        </motion.div>
      </div>

      <style>{`
        .pipeline-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .pipeline-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .pipeline-scroll::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 2px;
        }
        
        @media (max-width: 900px) {
          .pipeline-scroll {
            justify-content: flex-start !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </section>
  )
}
