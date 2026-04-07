export const THEME_STORAGE_KEY = 'theme'

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
