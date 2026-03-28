import { useSyncExternalStore } from 'react'

function subscribe(callback) {
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mqFine = window.matchMedia('(pointer: fine)')
  mqReduce.addEventListener('change', callback)
  mqFine.addEventListener('change', callback)
  return () => {
    mqReduce.removeEventListener('change', callback)
    mqFine.removeEventListener('change', callback)
  }
}

function getSnapshot() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(pointer: fine)').matches
  return Boolean(fine && !reduced)
}

function getServerSnapshot() {
  return false
}

/**
 * Custom cursor only with fine pointer and without prefers-reduced-motion (Aura-style; a11y).
 */
export function useCustomCursorAllowed() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
