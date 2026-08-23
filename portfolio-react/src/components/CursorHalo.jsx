import { useEffect, useRef } from 'react'

/**
 * CursorHalo — a soft, calm radial wash that follows the pointer
 * on desktop only. No visible dot, no chromatic flash. The native
 * cursor is preserved; this is purely atmospheric lighting.
 *
 * - Hidden on touch devices and prefers-reduced-motion
 * - rAF only runs while easing toward the pointer; idles to zero CPU at rest
 * - Hides when pointer leaves the window
 */
export default function CursorHalo() {
  const haloRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId = useRef(0)
  const lastTime = useRef(0)
  const visible = useRef(false)

  useEffect(() => {
    // Bail early on touch / reduced-motion. The CSS class also hides it,
    // but skipping the listeners avoids any work.
    if (typeof window === 'undefined') return
    const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isCoarse || reduceMotion) return

    const el = haloRef.current
    if (!el) return

    const HALO_SIZE = 480
    const SMOOTHNESS = 9
    const EPSILON = 0.25

    const setPos = (x, y) => {
      el.style.transform = `translate3d(${x - HALO_SIZE / 2}px, ${y - HALO_SIZE / 2}px, 0)`
    }

    const tick = (time) => {
      if (document.hidden) {
        rafId.current = 0
        return
      }
      const dt = lastTime.current ? Math.min((time - lastTime.current) / 1000, 0.1) : 1 / 60
      lastTime.current = time

      const k = 1 - Math.exp(-SMOOTHNESS * dt)
      current.current.x += (target.current.x - current.current.x) * k
      current.current.y += (target.current.y - current.current.y) * k

      const dx = target.current.x - current.current.x
      const dy = target.current.y - current.current.y

      if (dx * dx + dy * dy < EPSILON) {
        current.current.x = target.current.x
        current.current.y = target.current.y
        setPos(current.current.x, current.current.y)
        rafId.current = 0
        return
      }
      setPos(current.current.x, current.current.y)
      rafId.current = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (rafId.current || document.hidden) return
      lastTime.current = 0
      rafId.current = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!visible.current) {
        visible.current = true
        current.current.x = e.clientX
        current.current.y = e.clientY
        setPos(e.clientX, e.clientY)
        el.style.opacity = '1'
        return
      }
      startLoop()
    }

    const onLeave = () => {
      el.style.opacity = '0'
      visible.current = false
    }

    const onVisibility = () => {
      if (document.hidden && rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = 0
        lastTime.current = 0
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return <div ref={haloRef} aria-hidden="true" className="cursor-halo" />
}
