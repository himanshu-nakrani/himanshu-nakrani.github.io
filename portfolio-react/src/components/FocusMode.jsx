import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { getItem, setItem } from '../lib/storage'

/**
 * FocusMode — distraction-free reading mode style injection.
 * State lives in FocusModeToggle and the html data attribute.
 */
export default function FocusMode() {
  return (
    <div className="focus-mode-container">
      <style>{`
        [data-focus-mode="true"] {
          --color-accent: var(--color-accent-dim);
        }
        [data-focus-mode="true"] .decorative-element,
        [data-focus-mode="true"] .ornament,
        [data-focus-mode="true"] .glyph-divider {
          opacity: 0;
          pointer-events: none;
        }
        [data-focus-mode="true"] main {
          max-width: 65ch;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}

export function FocusModeToggle() {
  const [focusMode, setFocusMode] = useState(() => getItem('focusMode') === 'true')

  const setMode = (newMode) => {
    setFocusMode(newMode)
    document.documentElement.setAttribute('data-focus-mode', String(newMode))
    setItem('focusMode', String(newMode))
  }

  const handleToggle = () => setMode(!focusMode)

  useEffect(() => {
    document.documentElement.setAttribute('data-focus-mode', String(focusMode))
  }, [focusMode])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'f') {
        event.preventDefault()
        setMode(!focusMode)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [focusMode])

  return (
    <button
      onClick={handleToggle}
      className="focus-mode-btn"
      aria-label={`${focusMode ? 'Exit' : 'Enter'} focus mode`}
      aria-pressed={focusMode}
      title="Focus mode (⌘⇧F)"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 8,
        border: '1px solid var(--color-border)',
        background: focusMode ? 'var(--color-surface-raised)' : 'var(--color-surface)',
        color: focusMode ? 'var(--color-accent)' : 'var(--color-text-muted)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
        e.currentTarget.style.color = 'var(--color-text)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.color = focusMode ? 'var(--color-accent)' : 'var(--color-text-muted)'
      }}
    >
      {focusMode ? <Eye size={18} /> : <EyeOff size={18} />}
    </button>
  )
}
