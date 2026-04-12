import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedConnector({ delay = 0 }) {
  return (
    <div
      className="arch-connector-wrap"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        position: 'relative',
        width: 32,
        height: 24,
        overflow: 'hidden',
      }}
    >
      <svg width="32" height="24" viewBox="0 0 32 24" style={{ position: 'absolute', inset: 0 }}>
        <line
          x1="0" y1="12" x2="32" y2="12"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        <polygon
          points="24,7 32,12 24,17"
          fill="var(--accent)"
          fillOpacity="0.4"
        />
      </svg>
      <motion.div
        initial={{ x: -6, opacity: 0 }}
        animate={{ x: [-6, 28], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.4,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: 'easeInOut',
        }}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 8px var(--accent)',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}
      />
    </div>
  )
}

export default function ArchitectureSnapshotCard({ pipeline }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section ref={ref} aria-label={`Architecture snapshot: ${pipeline.title}`}>
      <style>{`
        .arch-pipeline {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: nowrap;
          gap: 0;
        }

        .arch-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 0.75rem 1rem;
          background:
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--surface) 72%, transparent) 0%,
              color-mix(in srgb, var(--surface2) 60%, transparent) 100%
            );
          backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
          -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md, 10px);
          box-shadow:
            0 2px 8px color-mix(in srgb, var(--glass-shadow) 30%, transparent),
            inset 0 1px 0 var(--glass-specular);
          min-width: 90px;
          flex: 1;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.22s ease,
                      border-color 0.22s ease;
        }

        .arch-stage::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(168deg, var(--glass-highlight) 0%, transparent 38%);
          pointer-events: none;
        }

        .arch-stage:hover {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--accent) 30%, var(--glass-border));
          box-shadow:
            0 6px 16px color-mix(in srgb, var(--glass-shadow) 50%, transparent),
            inset 0 1px 0 var(--glass-specular);
        }

        .arch-stage-icon { font-size: 1.5rem; line-height: 1; }
        .arch-stage-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
        }
        .arch-detail {
          font-size: 0.65rem;
          color: var(--text2, var(--muted));
          line-height: 1.3;
          margin-top: 0.1rem;
        }

        @media (max-width: 640px) {
          .arch-pipeline {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            gap: 0.25rem;
          }
          .arch-stage {
            min-width: unset;
            padding: 0.6rem 0.5rem;
          }
          .arch-stage-label { font-size: 0.7rem; }
          .arch-detail { display: none; }
          .arch-connector-wrap { width: 24px; }
        }
      `}</style>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg, 16px)',
        padding: 'clamp(1.2rem, 3vw, 2rem)',
      }}>
      <h3 style={{
        fontWeight: 600,
        color: 'var(--text2, var(--muted))',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '1.25rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
      }}>
        {pipeline.title}
      </h3>

      <div className="arch-pipeline">
        {pipeline.stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <motion.div
              className="arch-stage"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              role={stage.detail ? 'img' : undefined}
              aria-label={stage.detail ? `${stage.label}: ${stage.detail}` : stage.label}
            >
              <span className="arch-stage-icon" aria-hidden="true">{stage.icon}</span>
              <span className="arch-stage-label">{stage.label}</span>
              {stage.detail && (
                <span className="arch-detail" aria-hidden="true">{stage.detail}</span>
              )}
            </motion.div>
            {i < pipeline.stages.length - 1 && inView && (
              <AnimatedConnector delay={i * 0.25 + 0.5} />
            )}
            {i < pipeline.stages.length - 1 && !inView && (
              <div className="arch-connector-wrap" style={{ width: 32, height: 24 }} />
            )}
          </React.Fragment>
        ))}
      </div>
      </div>
    </section>
  )
}
