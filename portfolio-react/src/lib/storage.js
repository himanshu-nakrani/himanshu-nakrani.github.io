export function getItem(key, fallback = null) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback
    const value = window.localStorage.getItem(key)
    return value ?? fallback
  } catch {
    return fallback
  }
}

export function setItem(key, value) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}
