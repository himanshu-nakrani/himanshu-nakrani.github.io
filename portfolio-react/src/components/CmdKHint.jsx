import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Command, X } from 'lucide-react'

const STORAGE_KEY = 'cmdk-hint-dismissed'
const SHOW_DELAY = 3500

/**
 * CmdKHint — one-time discoverability nudge for the command palette.
 * Appears bottom-right after a short delay on first visit only.
 * Auto-dismisses on first ⌘K press, X click, or after 12s.
 */
export default function CmdKHint() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(STORAGE_KEY)) return

    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY)
    const hideTimer = setTimeout(() => dismiss(), SHOW_DELAY + 12000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    // Auto-dismiss when user opens the palette
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        dismiss()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
            right: 'max(1.25rem, env(safe-area-inset-right))',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.7rem 0.85rem 0.7rem 1rem',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturation))',
            WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-saturation))',
            border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--color-text)',
            fontSize: '0.8125rem',
            boxShadow: 'var(--shadow-md)',
            maxWidth: 'calc(100vw - 2.5rem)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'var(--color-accent-soft)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--color-accent)',
            }}
          >
            <Command size={14} strokeWidth={2.25} />
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
            <span>Press</span>
            <kbd
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                padding: '2px 6px',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 4,
                color: 'var(--color-text)',
                lineHeight: 1,
              }}
            >
              {isMac ? '⌘' : 'Ctrl'} K
            </kbd>
            <span style={{ color: 'var(--color-text-muted)' }}>to search</span>
          </span>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss hint"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text)'
              e.currentTarget.style.background = 'var(--color-surface-raised)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-muted)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
