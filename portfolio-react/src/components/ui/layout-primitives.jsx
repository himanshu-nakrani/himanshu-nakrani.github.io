import React from 'react'

/**
 * Container components for layout
 */

export function Stack({
  gap = 'var(--space-4)',
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function Cluster({
  gap = 'var(--space-4)',
  children,
  className = '',
  wrap = true,
  ...props
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        gap,
        alignItems: 'center',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function Grid({
  min = '280px',
  gap = 'var(--space-4)',
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))`,
        gap,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Text containers
 */

export function TextBlock({
  children,
  maxWidth = '40rem',
  className = '',
  ...props
}) {
  return (
    <div
      className={className}
      style={{
        maxWidth,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card variants
 */

export function HighlightCard({
  icon: Icon,
  label,
  value,
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`interactive-card ${className}`}
      style={{
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        textAlign: 'center',
        ...props.style,
      }}
      {...props}
    >
      {Icon && (
        <div style={{ marginBottom: 'var(--space-4)', fontSize: '2rem' }}>
          <Icon size={32} />
        </div>
      )}
      {label && (
        <div
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-2)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--letter-spacing-wide)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {label}
        </div>
      )}
      {value && (
        <div
          style={{
            fontSize: 'var(--text-2xl)',
            color: 'var(--color-text)',
            fontWeight: 'var(--font-weight-bold)',
            fontFamily: 'var(--font-display)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {value}
        </div>
      )}
      {children && (
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

/**
 * List item for structured content
 */

export function ListItem({
  icon: Icon,
  title,
  subtitle,
  description,
  tags,
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`interactive-card ${className}`}
      style={{
        padding: 'var(--space-6)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        ...props.style,
      }}
      {...props}
    >
      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        {Icon && (
          <div style={{ flexShrink: 0, opacity: 0.7 }}>
            <Icon size={24} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {title && (
            <h3
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text)',
                marginBottom: 'var(--space-1)',
              }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-2)',
              }}
            >
              {subtitle}
            </p>
          )}
          {description && (
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-relaxed)',
                marginBottom: tags ? 'var(--space-3)' : 0,
              }}
            >
              {description}
            </p>
          )}
          {tags && tags.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: 'var(--space-1) var(--space-3)',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)',
                    background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {children && <div style={{ marginTop: 'var(--space-3)' }}>{children}</div>}
        </div>
      </div>
    </div>
  )
}

/**
 * Badge for status/labels
 */

export function Badge({
  children,
  variant = 'neutral',
  className = '',
  ...props
}) {
  const variants = {
    neutral: {
      bg: 'color-mix(in srgb, var(--color-border) 40%, transparent)',
      fg: 'var(--color-text-muted)',
    },
    accent: {
      bg: 'color-mix(in srgb, var(--color-accent) 20%, transparent)',
      fg: 'var(--color-accent)',
    },
    success: {
      bg: 'color-mix(in srgb, var(--color-success) 16%, transparent)',
      fg: 'var(--color-success)',
    },
    warning: {
      bg: 'color-mix(in srgb, var(--color-warning) 16%, transparent)',
      fg: 'var(--color-warning)',
    },
    danger: {
      bg: 'color-mix(in srgb, var(--color-danger) 16%, transparent)',
      fg: 'var(--color-danger)',
    },
  }

  const style = variants[variant] || variants.neutral

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-weight-semibold)',
        background: style.bg,
        color: style.fg,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </span>
  )
}
