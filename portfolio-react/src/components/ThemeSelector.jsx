import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette } from 'lucide-react'
import { COLOR_THEMES, getColorTheme, applyColorTheme } from '../lib/colorTheme'

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(getColorTheme)
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    applyColorTheme(currentTheme)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Focus the first theme button when opened
      const firstButton = dropdownRef.current?.querySelector('button')
      firstButton?.focus()
    } else if (isOpen === false && document.activeElement && dropdownRef.current?.contains(document.activeElement)) {
      triggerRef.current?.focus()
    }
  }, [isOpen])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      triggerRef.current?.focus()
      return
    }

    if (!dropdownRef.current) return

    const buttons = Array.from(dropdownRef.current.querySelectorAll('button'))
    const currentIndex = buttons.indexOf(document.activeElement)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % buttons.length
      buttons[nextIndex]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length
      buttons[prevIndex]?.focus()
    }
  }

  const selectTheme = (theme) => {
    applyColorTheme(theme.id)
    setCurrentTheme(theme.id)
    setIsOpen(false)
  }

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        ref={triggerRef}
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={isOpen ? 'theme-selector-dropdown' : undefined}
        style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--text)',
        }}
        title="Change theme"
      >
        <Palette size={18} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="theme-selector-dropdown"
            ref={dropdownRef}
            onKeyDown={handleKeyDown}
            role="menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '1rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 1000,
              minWidth: 200,
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text2)' }}>
              Choose Theme
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {COLOR_THEMES.map((theme) => (
                <motion.button
                  key={theme.id}
                  type="button"
                  role="menuitem"
                  whileHover={{ x: 4 }}
                  onClick={() => selectTheme(theme)}
                  style={{
                    background: currentTheme === theme.id ? 'var(--surface2)' : 'transparent',
                    border: `1px solid ${currentTheme === theme.id ? 'var(--accent)' : 'transparent'}`,
                    borderRadius: 8,
                    padding: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: theme.primary }} />
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: theme.secondary }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{theme.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text2)' }}>{theme.description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
