import { motion, useReducedMotion } from 'framer-motion'

/**
 * HeroPipelineSchematic — signature hero visual.
 * Pre-projected isometric SVG of an LLM pipeline (query → retrieval →
 * LLM → answer). Token-themed via CSS vars so light/dark are free.
 * Decorative only: aria-hidden, pointer-events none.
 */

const SLAB_W = 46
const SLAB_H = 23
const DEPTH = 12

const stages = [
  { x: 72,  y: 64,  label: 'QUERY' },
  { x: 152, y: 116, label: 'RETRIEVAL' },
  { x: 232, y: 168, label: 'LLM', emphasis: true },
  { x: 312, y: 220, label: 'ANSWER' },
]

const ROUTE = `M ${stages[0].x},${stages[0].y} L ${stages[1].x},${stages[1].y} L ${stages[2].x},${stages[2].y} L ${stages[3].x},${stages[3].y}`

function Slab({ x, y, label, emphasis }) {
  const topStroke = emphasis ? 'var(--color-accent)' : 'var(--color-border-strong)'
  const topFill = emphasis
    ? 'color-mix(in srgb, var(--color-accent) 14%, var(--color-surface))'
    : 'var(--color-surface)'
  const sideFill = emphasis
    ? 'color-mix(in srgb, var(--color-accent) 22%, var(--color-surface-raised))'
    : 'var(--color-surface-raised)'

  return (
    <g>
      {/* left side face */}
      <path
        d={`M ${x - SLAB_W},${y} L ${x},${y + SLAB_H} L ${x},${y + SLAB_H + DEPTH} L ${x - SLAB_W},${y + DEPTH} Z`}
        fill={sideFill}
        stroke={topStroke}
        strokeWidth="1"
      />
      {/* right side face */}
      <path
        d={`M ${x + SLAB_W},${y} L ${x},${y + SLAB_H} L ${x},${y + SLAB_H + DEPTH} L ${x + SLAB_W},${y + DEPTH} Z`}
        fill={sideFill}
        stroke={topStroke}
        strokeWidth="1"
        opacity="0.8"
      />
      {/* top face (rhombus) */}
      <path
        d={`M ${x},${y - SLAB_H} L ${x + SLAB_W},${y} L ${x},${y + SLAB_H} L ${x - SLAB_W},${y} Z`}
        fill={topFill}
        stroke={topStroke}
        strokeWidth="1.25"
      />
      <text
        x={x}
        y={y + 3}
        textAnchor="middle"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.08em',
          fill: emphasis ? 'var(--color-accent)' : 'var(--color-text-muted)',
        }}
      >
        {label}
      </text>
    </g>
  )
}

export default function HeroPipelineSchematic() {
  const reduceMotion = useReducedMotion()

  const svg = (
    <svg
      viewBox="0 0 372 286"
      width="100%"
      height="auto"
      role="presentation"
      focusable="false"
      style={{ display: 'block', maxWidth: 420, overflow: 'visible' }}
    >
      {/* soft glow behind the LLM slab */}
      <ellipse
        cx={stages[2].x}
        cy={stages[2].y}
        rx="78"
        ry="44"
        fill="color-mix(in srgb, var(--color-accent-secondary) 12%, transparent)"
        style={{ filter: 'blur(18px)' }}
      />

      {/* connector route */}
      <path
        d={ROUTE}
        fill="none"
        stroke="var(--color-border-strong)"
        strokeWidth="1.25"
        strokeDasharray="5 5"
        className={reduceMotion ? undefined : 'hps-route'}
      />

      {/* travelling packets (animation only when motion allowed) */}
      {!reduceMotion && (
        <>
          {[0, 2.4, 4.8].map((delay, i) => (
            <circle
              key={i}
              r="3.5"
              fill={i === 1 ? 'var(--color-accent-secondary)' : 'var(--color-accent)'}
            >
              <animateMotion
                dur="7.2s"
                begin={`${delay}s`}
                repeatCount="indefinite"
                path={ROUTE}
              />
            </circle>
          ))}
        </>
      )}

      {/* slabs drawn back-to-front */}
      {stages.map((s) => (
        <Slab key={s.label} {...s} />
      ))}

      {/* in/out annotations */}
      <text
        x={stages[0].x - SLAB_W}
        y={stages[0].y - SLAB_H - 12}
        style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, fill: 'var(--color-text-subtle)', letterSpacing: '0.08em' }}
      >
        “top funds last quarter?”
      </text>
      <text
        x={stages[3].x + SLAB_W}
        y={stages[3].y + SLAB_H + DEPTH + 16}
        textAnchor="end"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, fill: 'var(--color-text-subtle)', letterSpacing: '0.08em' }}
      >
        SELECT … → answer
      </text>
    </svg>
  )

  if (reduceMotion) {
    return (
      <div aria-hidden="true" style={{ pointerEvents: 'none' }}>
        {svg}
      </div>
    )
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {svg}
    </motion.div>
  )
}
