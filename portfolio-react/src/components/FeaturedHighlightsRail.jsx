import DataIcon from './DataIcon'
import { useUplift } from '../lib/uplift'
import SpotlightGlowCard from './ui/SpotlightGlowCard'

/**
 * FeaturedHighlightsRail
 * Renders a scannable grid/rail of high-signal proof point cards.
 */

const cardStyle = {
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 'var(--radius-lg)',
}

function CardInner({ highlight }) {
  return (
    <>
      <header style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span className="highlights-icon" aria-hidden="true" style={{ lineHeight: 1, color: 'var(--color-accent)' }}>
          <DataIcon name={highlight.icon} size={18} />
        </span>
        <span
          className="highlights-category"
          style={{
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)',
            background: 'transparent',
            padding: '0.2rem 0',
            borderRadius: '9999px',
          }}
        >
          {highlight.category}
        </span>
      </header>

      <h3
        style={{
          fontSize: '0.95rem',
          fontWeight: 600,
          color: 'var(--text)',
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {highlight.headline}
      </h3>

      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--text2)',
          lineHeight: 1.5,
          margin: 0,
          flexGrow: 1,
        }}
      >
        {highlight.subtext}
      </p>

      <footer style={{ marginTop: '0.25rem' }}>
        {highlight.metric && (
          <span
            className="highlights-metric count-up"
            style={{
              display: 'inline-block',
              fontSize: '0.8rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-accent)',
              background: 'transparent',
              border: '1px solid var(--color-border-strong)',
              padding: '0.3rem 0.65rem',
              borderRadius: '9999px',
              fontFeatureSettings: '"tnum" 1',
            }}
          >
            {highlight.metric}
          </span>
        )}
      </footer>
    </>
  )
}

/**
 * @param {{ highlights: Highlight[] }} props
 */
export default function FeaturedHighlightsRail({ highlights }) {
  const uplift = useUplift()
  const Wrap = uplift
    ? ({ children }) => (
        <SpotlightGlowCard size={300} style={{ display: 'block', borderRadius: 'var(--radius-lg)', height: '100%' }}>
          {children}
        </SpotlightGlowCard>
      )
    : ({ children }) => children

  return (
    <section aria-label="Featured highlights">
      <div className="highlights-rail">
        {highlights.map((highlight) => {
          const card = (
            <article className="interactive-card highlights-card glass-card" style={cardStyle}>
              <CardInner highlight={highlight} />
            </article>
          )

          if (highlight.link) {
            return (
              <a
                key={highlight.id}
                href={highlight.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${highlight.headline} (opens in new tab)`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <Wrap>{card}</Wrap>
              </a>
            )
          }

          return <Wrap key={highlight.id}>{card}</Wrap>
        })}
      </div>
    </section>
  )
}
