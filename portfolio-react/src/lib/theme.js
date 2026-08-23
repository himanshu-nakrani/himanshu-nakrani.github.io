export const THEME_STORAGE_KEY = 'theme'

const THEME_META_SELECTOR = 'meta[name="theme-color"]'

/**
 * Get preferred theme from localStorage or system preference
 * @returns 'dark' | 'light'
 */
export function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  // Default to light (cream) unless system prefers dark
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
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
    meta.setAttribute('content', theme === 'dark' ? '#0d0d0f' : '#f5f0e8')
  }
}
