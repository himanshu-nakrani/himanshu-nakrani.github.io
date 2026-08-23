import { availabilityStatus } from '../data'

export default function AvailabilityCtaPanel({ status = availabilityStatus }) {
  return (
    <section
      aria-label="Availability and contact"
      className="glass"
      style={{
        textAlign: 'center',
        padding: 'clamp(3rem, 8vw, 5rem) var(--page-pad-x)',
        borderRadius: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <span
        role="status"
        aria-label={`Availability: ${status.statusLabel}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: 'var(--green)',
          letterSpacing: '0.03em',
          marginBottom: '1.5rem',
        }}
      >
        <span aria-hidden="true" className="status-dot status-dot--pulse" />
        {status.statusLabel}
      </span>

      <h2
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text)',
          marginBottom: '1rem',
          lineHeight: 1.2,
        }}
      >
        Let&apos;s build something.
      </h2>

      <p
        style={{
          color: 'var(--text2)',
          fontSize: '1rem',
          lineHeight: 1.7,
          maxWidth: '36rem',
          margin: '0 auto 2rem',
        }}
      >
        {status.description}
      </p>

      <div
        role="group"
        aria-label="Contact options"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
        }}
      >
        {status.actions.map(action => (
          <a
            key={action.label}
            href={action.href}
            className={`btn btn--${action.variant === 'primary' ? 'primary' : 'ghost'}`}
          >
            {action.label}
          </a>
        ))}
      </div>
    </section>
  )
}
