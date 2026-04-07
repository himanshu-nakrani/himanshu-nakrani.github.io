export const THEME_STORAGE_KEY = 'theme'
export const STYLE_MODE_STORAGE_KEY = 'style-mode'
export const DEFAULT_STYLE_MODE = 'editorial'
export const STYLE_MODES = ['luxe', 'editorial', 'noir']

const THEME_META_SELECTOR = 'meta[name="theme-color"]'

export function getPreferredTheme() {
  if (typeof window === 'undefined') return 'dark'

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return

  const resolvedTheme = theme === 'light' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', resolvedTheme)
  document.documentElement.style.colorScheme = resolvedTheme

  const meta = document.querySelector(THEME_META_SELECTOR)
  if (meta) {
    meta.setAttribute('content', resolvedTheme === 'dark' ? '#1a1a1a' : '#fafafa')
  }
}

export function getPreferredStyleMode() {
  if (typeof window === 'undefined') return DEFAULT_STYLE_MODE

  const savedMode = window.localStorage.getItem(STYLE_MODE_STORAGE_KEY)
  if (savedMode && STYLE_MODES.includes(savedMode)) return savedMode
  return DEFAULT_STYLE_MODE
}

export function applyStyleMode(mode) {
  if (typeof document === 'undefined') return DEFAULT_STYLE_MODE

  const resolvedMode = STYLE_MODES.includes(mode) ? mode : DEFAULT_STYLE_MODE
  document.documentElement.setAttribute('data-style-mode', resolvedMode)
  return resolvedMode
}
