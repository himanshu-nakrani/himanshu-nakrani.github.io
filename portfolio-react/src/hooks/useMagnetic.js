import { useEffect, useRef } from 'react'

/**
 * useMagnetic — subtly pulls an element toward the cursor when within
 * `radius` pixels. The pull is capped at `strength` pixels, so it's
 * felt rather than seen. Touch and reduced-motion safe.
 *
 * Sets `--mag-x` / `--mag-y` CSS variables on the element. Pair with
 * the `.magnetic` utility class which reads those variables.
 *
 * Usage:
 *   const ref = useMagnetic({ radius: 80, strength: 6 })
 *   <a ref={ref} className="magnetic">…</a>
 */
export function useMagnetic({ radius = 80, strength = 6 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return

    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isCoarse || reduce) return

    let rafId = 0
    let mouseX = 0
    let mouseY = 0

    const apply = () => {
      rafId = 0
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = mouseX - cx
      const dy = mouseY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        const factor = (1 - dist / radius) * strength
        const ux = (dx / (dist || 1)) * factor
        const uy = (dy / (dist || 1)) * factor
        el.style.setProperty('--mag-x', `${ux.toFixed(2)}px`)
        el.style.setProperty('--mag-y', `${uy.toFixed(2)}px`)
      } else {
        el.style.setProperty('--mag-x', '0px')
        el.style.setProperty('--mag-y', '0px')
      }
    }

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      el.style.setProperty('--mag-x', '0px')
      el.style.setProperty('--mag-y', '0px')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [radius, strength])

  return ref
}
