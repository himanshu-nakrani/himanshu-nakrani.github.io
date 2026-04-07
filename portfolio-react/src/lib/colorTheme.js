export const COLOR_THEME_KEY = 'color-theme'
export const COLOR_THEME_ATTR = 'data-color-theme'

export const COLOR_THEMES = [
  {
    id: 'lux',
    name: 'Lux',
    description: 'Luxury gold',
    primary: '#d4a017',
    secondary: '#f5c518',
    tertiary: '#b8890a',
    stats: {
      dark: {
        bg: '0f0c00',
        title: 'f5c518',
        text: 'e8d5a3',
        icon: 'd4a017',
        border: '2a2100',
        ring: 'd4a017',
        streak: {
          background: '0f0c00',
          ring: 'd4a017',
          fire: 'f5c518',
          currStreakLabel: 'f5c518',
          sideLabels: 'e8d5a3',
          dates: 'e8d5a3',
        },
      },
      light: {
        bg: 'fffbf0',
        title: '8b6914',
        text: '5c4a1e',
        icon: 'b8890a',
        border: 'f0d080',
        ring: 'b8890a',
        streak: {
          background: 'fffbf0',
          ring: 'b8890a',
          fire: 'd4a017',
          currStreakLabel: '8b6914',
          sideLabels: '5c4a1e',
          dates: '5c4a1e',
        },
      },
    },
  },
  {
    id: 'noir',
    name: 'Noir',
    description: 'Dark monochrome',
    primary: '#9ca3af',
    secondary: '#d1d5db',
    tertiary: '#6b7280',
    stats: {
      dark: {
        bg: '0a0a0a',
        title: 'ffffff',
        text: '9ca3af',
        icon: '6b7280',
        border: '1f2937',
        ring: '9ca3af',
        streak: {
          background: '0a0a0a',
          ring: '9ca3af',
          fire: 'd1d5db',
          currStreakLabel: 'ffffff',
          sideLabels: '9ca3af',
          dates: '9ca3af',
        },
      },
      light: {
        bg: 'f9fafb',
        title: '111827',
        text: '4b5563',
        icon: '6b7280',
        border: 'e5e7eb',
        ring: '6b7280',
        streak: {
          background: 'f9fafb',
          ring: '6b7280',
          fire: '9ca3af',
          currStreakLabel: '111827',
          sideLabels: '4b5563',
          dates: '4b5563',
        },
      },
    },
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Professional blue',
    primary: '#2b6dc2',
    secondary: '#3d8bf2',
    tertiary: '#5268d9',
    stats: {
      dark: {
        bg: '0b1120',
        title: '7db3f9',
        text: 'a3b1c7',
        icon: '3d8bf2',
        border: '1e2d4a',
        ring: '7db3f9',
        streak: {
          background: '0b1120',
          ring: '7db3f9',
          fire: '3d8bf2',
          currStreakLabel: '7db3f9',
          sideLabels: 'a3b1c7',
          dates: 'a3b1c7',
        },
      },
      light: {
        bg: 'f5f7fb',
        title: '1e3a5f',
        text: '4b5974',
        icon: '2b6dc2',
        border: 'd2ddec',
        ring: '2b6dc2',
        streak: {
          background: 'f5f7fb',
          ring: '2b6dc2',
          fire: '3d8bf2',
          currStreakLabel: '1e3a5f',
          sideLabels: '4b5974',
          dates: '4b5974',
        },
      },
    },
  },
]

export function getColorTheme() {
  if (typeof window === 'undefined') return 'editorial'
  return localStorage.getItem(COLOR_THEME_KEY) || 'editorial'
}

export function applyColorTheme(themeId) {
  const theme = COLOR_THEMES.find((t) => t.id === themeId)
  if (!theme) return

  document.documentElement.style.setProperty('--accent', theme.primary)
  document.documentElement.style.setProperty('--accent2', theme.secondary)
  document.documentElement.style.setProperty('--accent3', theme.tertiary)
  document.documentElement.setAttribute(COLOR_THEME_ATTR, themeId)
  localStorage.setItem(COLOR_THEME_KEY, themeId)
}
