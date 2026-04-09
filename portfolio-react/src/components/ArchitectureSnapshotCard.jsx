import React from 'react'

export default function ArchitectureSnapshotCard({ pipeline }) {
  return (
    <section aria-label={`Architecture snapshot: ${pipeline.title}`}>
      <style>{`
        .arch-pipeline {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: nowrap;
          gap: 0.25rem;
        }

        .arch-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 0.75rem 1rem;
          background: var(--card-bg, var(--bg2));
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 10px);
          min-width: 90px;
          flex: 1;
          text-align: center;
        }

        .arch-stage-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

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

        .arch-connector {
          font-size: 1.1rem;
          color: var(--accent);
          flex-shrink: 0;
          display: inline-block;
          opacity: 0;
          animation: none;
        }

        @media (prefers-reduced-motion: no-preference) {
          .arch-connector {
            animation: drawIn 0.4s ease forwards;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .arch-connector {
            opacity: 1;
          }
        }

        @keyframes drawIn {
          from { opacity: 0; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
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

          .arch-stage-label {
            font-size: 0.7rem;
          }

          .arch-detail {
            display: none;
          }
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
            <div
              className="arch-stage"
              role={stage.detail ? 'img' : undefined}
              aria-label={stage.detail ? `${stage.label}: ${stage.detail}` : stage.label}
            >
              <span className="arch-stage-icon" aria-hidden="true">{stage.icon}</span>
              <span className="arch-stage-label">{stage.label}</span>
              {stage.detail && (
                <span className="arch-detail" aria-hidden="true">{stage.detail}</span>
              )}
            </div>
            {i < pipeline.stages.length - 1 && (
              <span
                className="arch-connector"
                aria-hidden="true"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      </div>
    </section>
  )
}
