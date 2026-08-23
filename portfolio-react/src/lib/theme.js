import { getItem } from './storage'

export const THEME_STORAGE_KEY = 'theme'
export const DESIGN_STORAGE_KEY = 'design-mode'

const THEME_META_SELECTOR = 'meta[name="theme-color"]'
const DESIGN_MODES = new Set(['classic', 'instrument'])

/**
 * Get preferred theme from localStorage or system preference
 * @returns 'dark' | 'light'
 */
export function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  // Default to light (cream) unless system prefers dark
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Get selected design version from localStorage.
 * @returns 'classic' | 'instrument'
 */
export function getPreferredDesignMode() {
  if (typeof window === 'undefined') return 'instrument'

  const savedDesignMode = getItem(DESIGN_STORAGE_KEY)
  return DESIGN_MODES.has(savedDesignMode) ? savedDesignMode : 'instrument'
}

/**
 * Apply theme to document.
 * Light = default :root (cream), Dark = data-theme="dark"
 * @param {string} theme - 'dark' or 'light'
 */
export function applyTheme(theme) {
  if (typeof document === 'undefined') return

  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
    document.documentElement.style.colorScheme = 'dark'
  } else {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = 'light'
  }

  const meta = document.querySelector(THEME_META_SELECTOR)
  if (meta) {
    const isInstrument = document.documentElement.getAttribute('data-design') === 'instrument'
    meta.setAttribute('content', isInstrument ? '#eee8dc' : theme === 'dark' ? '#0d0d0f' : '#f5f0e8')
  }
}

/**
 * Apply design version to document.
 * Instrument = default Living Research Instrument, Classic = previous application theme.
 * @param {string} designMode - 'classic' or 'instrument'
 */
export function applyDesignMode(designMode) {
  if (typeof document === 'undefined') return

  if (designMode === 'instrument') {
    document.documentElement.setAttribute('data-design', 'instrument')
  } else {
    document.documentElement.removeAttribute('data-design')
  }

  const meta = document.querySelector(THEME_META_SELECTOR)
  if (meta && designMode === 'instrument') {
    meta.setAttribute('content', '#eee8dc')
  } else if (meta) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
    meta.setAttribute('content', isDark ? '#0d0d0f' : '#f5f0e8')
  }
}
