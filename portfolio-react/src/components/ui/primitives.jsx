import React from 'react'

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) {
  const baseClasses = 'btn'
  const variantClasses = {
    primary: 'btn--primary',
    ghost: 'btn--ghost',
    link: 'premium-link',
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Card({
  children,
  className = '',
  interactive = false,
  ...props
}) {
  return (
    <div
      className={`${interactive ? 'interactive-card' : ''} ${className}`}
      style={{
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        padding: 'var(--space-6)',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function Tag({
  children,
  variant = 'neutral',
  className = '',
  ...props
}) {
  const colors = {
    neutral: {
      bg: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
      fg: 'var(--color-text)',
    },
    accent: {
      bg: 'color-mix(in srgb, var(--color-accent) 24%, transparent)',
      fg: 'var(--color-accent)',
    },
    success: {
      bg: 'color-mix(in srgb, var(--color-success) 16%, transparent)',
      fg: 'var(--color-success)',
    },
  }
  
  const color = colors[variant] || colors.neutral
  
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-1) var(--space-3)',
        borderRadius: 'var(--radius-pill)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-weight-medium)',
        background: color.bg,
        color: color.fg,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </span>
  )
}

export function Kicker({
  children,
  withDot = true,
  className = '',
  ...props
}) {
  return (
    <div className={`kicker ${className}`} {...props}>
      {withDot && <span style={{ marginRight: 'var(--space-1)' }}>•</span>}
      {children}
    </div>
  )
}

export function Heading({
  level = 1,
  children,
  className = '',
  ...props
}) {
  const Tag = `h${level}`
  const sizeMap = {
    1: 'var(--text-4xl)',
    2: 'var(--text-3xl)',
    3: 'var(--text-2xl)',
    4: 'var(--text-xl)',
  }
  
  return (
    <Tag
      className={`display ${className}`}
      style={{
        fontSize: sizeMap[level],
        ...props.style,
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function Lead({
  children,
  className = '',
  ...props
}) {
  return (
    <p
      className={`lead ${className}`}
      {...props}
    >
      {children}
    </p>
  )
}

export function StatusDot({
  pulse = false,
  color = 'success',
  label,
  className = '',
  ...props
}) {
  const colors = {
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)',
    info: 'var(--color-info)',
  }
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
      <div
        className={`status-dot ${pulse ? 'status-dot--pulse' : ''} ${className}`}
        style={{
          backgroundColor: colors[color],
          ...props.style,
        }}
        {...props}
      />
      {label && <span style={{ fontSize: 'var(--text-sm)' }}>{label}</span>}
    </div>
  )
}

export function Section({
  id,
  children,
  tone = 'default',
  className = '',
  ...props
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: 'var(--section-pad-y)',
        paddingBottom: 'var(--section-pad-y)',
        paddingLeft: 'var(--page-pad-x)',
        paddingRight: 'var(--page-pad-x)',
        ...props.style,
      }}
      {...props}
    >
      {children}
    </section>
  )
}
