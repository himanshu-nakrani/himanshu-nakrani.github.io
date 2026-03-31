import { useEffect, useRef } from 'react'

/**
 * Custom cursor: single dot using theme accent (--nav-dot).
 * Optimized for low-end CPUs with CSS transforms and minimal RAF usage.
 * RAF runs only while the dot is catching up to the pointer — idle = zero CPU. Pauses when tab is hidden.
 */
export default function GravityCursor() {
  const cursorDotRef = useRef(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const dotX = useRef(0)
  const dotY = useRef(0)
  const rafId = useRef(0)
  const lastTime = useRef(0)
  const hasPointer = useRef(false)

  /** Lower = smoother. 10-12 for smooth movement. */
  const smoothness = 11

  /** Stop animating when within this distance of the target (px). */
  const snapEpsilon = 0.15

  /** Throttle updates to reduce CPU load */
  const minFrameTime = 1000 / 60 // 60fps max

  useEffect(() => {
    const setTransform = (x, y) => {
      const el = cursorDotRef.current
      if (!el) return
      // Use translate3d for GPU acceleration
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`
    }

    const tick = (time) => {
      if (document.hidden) {
        rafId.current = 0
        return
      }

      const prev = lastTime.current
      
      // Throttle to max 60fps to reduce CPU usage
      if (prev && (time - prev) < minFrameTime) {
        rafId.current = requestAnimationFrame(tick)
        return
      }
      
      lastTime.current = time
      const dt = prev ? Math.min((time - prev) / 1000, 0.1) : 1 / 60

      const mx = mouseX.current
      const my = mouseY.current
      
      // Smooth exponential interpolation
      const t = 1 - Math.exp(-smoothness * dt)
      
      dotX.current += (mx - dotX.current) * t
      dotY.current += (my - dotY.current) * t

      const dx = mx - dotX.current
      const dy = my - dotY.current
      const errSq = dx * dx + dy * dy

      if (errSq < snapEpsilon * snapEpsilon) {
        dotX.current = mx
        dotY.current = my
        setTransform(mx, my)
        rafId.current = 0
        return
      }

      setTransform(dotX.current, dotY.current)
      rafId.current = requestAnimationFrame(tick)
    }

    const ensureLoop = () => {
      if (document.hidden || rafId.current) return
      lastTime.current = 0
      rafId.current = requestAnimationFrame(tick)
    }

    const handleMouseMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      if (!hasPointer.current) {
        hasPointer.current = true
        dotX.current = e.clientX
        dotY.current = e.clientY
        setTransform(e.clientX, e.clientY)
        return
      }
      ensureLoop()
    }

    const onVisibility = () => {
      if (document.hidden && rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = 0
        lastTime.current = 0
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--nav-dot)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          contain: 'layout style paint',
        }}
      />
    </>
  )
}
