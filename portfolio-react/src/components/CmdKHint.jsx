import { useCallback, useEffect, useState } from 'react'
import { Command, X } from 'lucide-react'
import { getItem, setItem } from '../lib/storage'

const STORAGE_KEY = 'cmdk-hint-dismissed'
const SHOW_DELAY = 3500
const EXIT_MS = 300

/**
 * CmdKHint — one-time discoverability nudge for the command palette.
 * Appears bottom-right after a short delay on first visit only.
 * Auto-dismisses on first ⌘K press, X click, or after 12s.
 */
export default function CmdKHint() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  const dismiss = useCallback(() => {
    setVisible(false)
    setItem(STORAGE_KEY, '1')
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (getItem(STORAGE_KEY)) return
    // Don't show on small screens or touch-primary devices — not relevant there
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) return

    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY)
    const hideTimer = setTimeout(() => dismiss(), SHOW_DELAY + 12000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [dismiss])

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setMounted(true), 0)
      return () => clearTimeout(t)
    }
    if (!mounted) return undefined
    const t = setTimeout(() => setMounted(false), EXIT_MS)
    return () => clearTimeout(t)
  }, [visible, mounted])

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
  }, [visible, dismiss])


  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  if (!mounted) return null

  return (
    <div
      className="cmdk-hint"
      data-visible={visible ? 'true' : 'false'}
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
      <style>{`
        .cmdk-hint {
          opacity: 0;
          transform: translateY(16px) scale(0.96);
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cmdk-hint[data-visible="true"] {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .cmdk-hint { transition: none; }
        }
      `}</style>
    </div>
  )
}
