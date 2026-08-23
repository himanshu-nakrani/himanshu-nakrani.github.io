import { createContext, useContext, useState, useCallback, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { duration, ease } from '../../lib/motion'

/**
 * DisclosureGroup — Accordion-style collapsible sections
 * Only one item can be open at a time within a group.
 * 
 * Usage:
 * <DisclosureGroup>
 *   <DisclosureItem id="item-1" title="First Section">
 *     Content here...
 *   </DisclosureItem>
 *   <DisclosureItem id="item-2" title="Second Section">
 *     More content...
 *   </DisclosureItem>
 * </DisclosureGroup>
 */

const DisclosureContext = createContext({
  openId: null,
  toggle: () => {},
  allowMultiple: false,
})

export function DisclosureGroup({ 
  children, 
  defaultOpen = null,
  allowMultiple = false,
  className = '',
  gap = '0.5rem',
}) {
  const [openId, setOpenId] = useState(
    allowMultiple ? (defaultOpen ? [defaultOpen] : []) : defaultOpen
  )

  const toggle = useCallback((id) => {
    if (allowMultiple) {
      setOpenId((prev) => 
        prev.includes(id) 
          ? prev.filter((i) => i !== id)
          : [...prev, id]
      )
    } else {
      setOpenId((prev) => (prev === id ? null : id))
    }
  }, [allowMultiple])

  const isOpen = useCallback((id) => {
    if (allowMultiple) {
      return openId?.includes(id) || false
    }
    return openId === id
  }, [openId, allowMultiple])

  return (
    <DisclosureContext.Provider value={{ openId, toggle, isOpen, allowMultiple }}>
      <div 
        className={`disclosure-group ${className}`}
        style={{ display: 'flex', flexDirection: 'column', gap }}
      >
        {children}
      </div>
    </DisclosureContext.Provider>
  )
}

export const DisclosureItem = forwardRef(function DisclosureItem({
  id,
  title,
  subtitle,
  icon: Icon,
  badge,
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
  disabled = false,
}, ref) {
  const { toggle, isOpen } = useContext(DisclosureContext)
  const open = isOpen(id)

  return (
    <div 
      ref={ref}
      className={`disclosure-item ${open ? 'disclosure-item--open' : ''} ${className}`}
      data-state={open ? 'open' : 'closed'}
    >
      <button
        type="button"
        className={`disclosure-trigger ${headerClassName}`}
        onClick={() => !disabled && toggle(id)}
        disabled={disabled}
        aria-expanded={open}
        aria-controls={`disclosure-content-${id}`}
      >
        <div className="disclosure-trigger-content">
          {Icon && (
            <span className="disclosure-icon">
              <Icon size={18} />
            </span>
          )}
          <div className="disclosure-trigger-text">
            <span className="disclosure-title">{title}</span>
            {subtitle && (
              <span className="disclosure-subtitle">{subtitle}</span>
            )}
          </div>
          {badge && (
            <span className="disclosure-badge">{badge}</span>
          )}
        </div>
        <motion.span 
          className="disclosure-chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: duration.fast, ease: ease.out }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`disclosure-content-${id}`}
            className={`disclosure-content ${contentClassName}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: { duration: duration.base, ease: ease.out },
                opacity: { duration: duration.fast, delay: 0.05 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: duration.fast, ease: ease.default },
                opacity: { duration: duration.fast }
              }
            }}
          >
            <div className="disclosure-content-inner">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .disclosure-item {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-surface);
          overflow: hidden;
          transition: border-color var(--motion-duration-fast) var(--motion-ease);
        }
        .disclosure-item:hover {
          border-color: var(--color-border-strong);
        }
        .disclosure-item--open {
          border-color: var(--color-border-strong);
        }

        .disclosure-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1rem 1.25rem;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--color-text);
          transition: background var(--motion-duration-fast) var(--motion-ease);
        }
        .disclosure-trigger:hover {
          background: var(--color-surface-raised);
        }
        .disclosure-trigger:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .disclosure-trigger-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
        }

        .disclosure-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: var(--color-accent-soft);
          border-radius: var(--radius-md);
          color: var(--color-accent);
          flex-shrink: 0;
        }

        .disclosure-trigger-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
          min-width: 0;
        }

        .disclosure-title {
          font-size: var(--text-base);
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
        }

        .disclosure-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }

        .disclosure-badge {
          padding: 0.2rem 0.5rem;
          background: var(--color-accent-soft);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
        }

        .disclosure-chevron {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-subtle);
          flex-shrink: 0;
        }

        .disclosure-content {
          overflow: hidden;
        }

        .disclosure-content-inner {
          padding: 0 1.25rem 1.25rem;
          color: var(--color-text-muted);
          font-size: var(--text-sm);
          line-height: var(--line-height-relaxed);
        }

        /* Nested list styling */
        .disclosure-content-inner ul {
          padding-left: 1rem;
          margin: 0.5rem 0;
        }
        .disclosure-content-inner li {
          margin-bottom: 0.35rem;
          position: relative;
        }
        .disclosure-content-inner li::before {
          content: '▹';
          position: absolute;
          left: -1rem;
          color: var(--color-accent);
        }
      `}</style>
    </div>
  )
})

// Simple standalone disclosure (not part of a group)
export function Disclosure({
  title,
  subtitle,
  icon: Icon,
  badge,
  children,
  defaultOpen = false,
  className = '',
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <DisclosureGroup defaultOpen={defaultOpen ? 'solo' : null}>
      <DisclosureItem
        id="solo"
        title={title}
        subtitle={subtitle}
        icon={Icon}
        badge={badge}
        className={className}
      >
        {children}
      </DisclosureItem>
    </DisclosureGroup>
  )
}

export default DisclosureGroup
