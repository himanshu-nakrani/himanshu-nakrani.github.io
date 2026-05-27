import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { technicalCaseStudies, researchDeepDives } from '../data'

/* ───────── build combined list ───────── */

const items = [
  ...technicalCaseStudies.map((cs) => ({
    id: cs.id,
    slug: cs.slug,
    kind: 'case-study',
    badgeLabel: cs.status || 'Production',
    title: cs.shortTitle || cs.title,
    summary: cs.summary,
    metrics: (cs.metrics || []).slice(0, 3),
    to: `/projects/${cs.slug}`,
  })),
  ...researchDeepDives.map((rd) => ({
    id: rd.id,
    slug: rd.slug,
    kind: 'research',
    badgeLabel: rd.badge || 'Research',
    title: rd.shortTitle || rd.title,
    summary: rd.summary,
    metrics: (rd.metrics || []).slice(0, 3),
    to: `/research/${rd.slug}`,
  })),
]

/* ───────── badge colours by kind ───────── */

const badgeStyles = {
  'case-study': {
    color: 'var(--color-accent)',
    borderColor: 'var(--color-accent)',
    background: 'var(--color-accent-soft)',
  },
  research: {
    color: 'var(--color-text-subtle)',
    borderColor: 'var(--color-border-strong)',
    background: 'transparent',
  },
}

/* ───────── card component ───────── */

function DeepDiveCard({ item }) {
  const [hovered, setHovered] = useState(false)
  const badge = badgeStyles[item.kind] || badgeStyles.research

  return (
    <Link
      to={item.to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.55rem',
        padding: '1.25rem',
        minWidth: 280,
        maxWidth: 360,
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 12,
        background: 'var(--color-surface)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.18s, box-shadow 0.18s, transform 0.18s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        flex: '0 0 auto',
        position: 'relative',
      }}
    >
      {/* Type badge */}
      <span
        style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          padding: '0.15rem 0.55rem',
          fontSize: '0.65rem',
          fontWeight: 600,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          borderRadius: 'var(--radius-pill)',
          border: `1px solid ${badge.borderColor}`,
          color: badge.color,
          background: badge.background,
        }}
      >
        {item.badgeLabel}
      </span>

      {/* Title */}
      <h4
        style={{
          margin: 0,
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          lineHeight: 1.35,
        }}
      >
        {item.title}
      </h4>

      {/* Summary (2 lines max) */}
      <p
        style={{
          margin: 0,
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {item.summary}
      </p>

      {/* Metric tags */}
      {item.metrics.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.35rem',
            marginTop: '0.15rem',
          }}
        >
          {item.metrics.map((m) => (
            <span
              key={m.label}
              style={{
                display: 'inline-block',
                padding: '0.15rem 0.5rem',
                fontSize: '0.68rem',
                fontWeight: 500,
                fontFamily: 'var(--font-mono)',
                border: '1px solid var(--color-border-strong)',
                borderRadius: 'var(--radius-pill)',
                color: 'var(--color-text-muted)',
                background: 'transparent',
                fontFeatureSettings: '"tnum" 1',
                whiteSpace: 'nowrap',
              }}
            >
              {m.value} {m.label.toLowerCase()}
            </span>
          ))}
        </div>
      )}

      {/* Hover arrow */}
      <span
        style={{
          position: 'absolute',
          right: 14,
          top: 14,
          color: 'var(--color-accent)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
          transition: 'opacity 0.18s, transform 0.18s',
        }}
        aria-hidden="true"
      >
        <ArrowRight size={15} />
      </span>
    </Link>
  )
}

/* ───────── main component ───────── */

export default function TechnicalDeepDiveRail() {
  return (
    <div aria-label="Technical deep dives">
      {/* Scrollable rail */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x proximity',
        }}
      >
        {items.map((item) => (
          <div key={item.id} style={{ scrollSnapAlign: 'start' }}>
            <DeepDiveCard item={item} />
          </div>
        ))}
      </div>

      {/* Inline responsive style for mobile stacking */}
      <style>{`
        @media (max-width: 640px) {
          [aria-label="Technical deep dives"] > div:last-of-type {
            flex-direction: column;
          }
          [aria-label="Technical deep dives"] > div:last-of-type a {
            min-width: unset !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  )
}
