import { useEffect, useState } from 'react'

export const UPLIFT_KEY = 'ui:uplift'

function safeGet(key) {
  if (typeof window === 'undefined') return null
  try { return window.localStorage.getItem(key) } catch { return null }
}

function safeSet(key, value) {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(key, value) } catch { /* localStorage unavailable */ }
}

function readUrlOverride() {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const raw = params.get('uplift')
  if (raw === '1' || raw === 'on'  || raw === 'true')  return true
  if (raw === '0' || raw === 'off' || raw === 'false') return false
  return null
}

export function getUpliftEnabled() {
  if (typeof window === 'undefined') return false
  const override = readUrlOverride()
  if (override !== null) {
    safeSet(UPLIFT_KEY, override ? 'on' : 'off')
    return override
  }
  return safeGet(UPLIFT_KEY) === 'on'
}

export function useUplift() {
  const [enabled, setEnabled] = useState(() => getUpliftEnabled())

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === UPLIFT_KEY) setEnabled(getUpliftEnabled())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return enabled
}
