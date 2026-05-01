import { useEffect, useRef } from 'react'

/**
 * Custom cursor: large dot using theme accent (--nav-dot).
 * Color automatically matches every theme/style-mode.
 * RAF only runs while catching up to pointer — zero CPU at rest.
 * Disabled entirely when prefers-reduced-motion is set.
 */
export default function GravityCursor() {
  // Honour prefers-reduced-motion: disable the custom cursor entirely
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }
  const cursorRef = useRef(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const curX = useRef(0)
  const curY = useRef(0)
  const rafId = useRef(0)
  const lastTime = useRef(0)
  const hasPointer = useRef(false)

  /** Higher = snappier, lower = more lag */
  const smoothness = 14
  const snapEpsilonSq = 0.04

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const setPos = (x, y) => {
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`
    }

    const tick = (time) => {
      if (document.hidden) { rafId.current = 0; return }

      const dt = lastTime.current ? Math.min((time - lastTime.current) / 1000, 0.1) : 1 / 60
      lastTime.current = time

      const t = 1 - Math.exp(-smoothness * dt)
      curX.current += (mouseX.current - curX.current) * t
      curY.current += (mouseY.current - curY.current) * t

      const dx = mouseX.current - curX.current
      const dy = mouseY.current - curY.current

      if (dx * dx + dy * dy < snapEpsilonSq) {
        curX.current = mouseX.current
        curY.current = mouseY.current
        setPos(curX.current, curY.current)
        rafId.current = 0
        return
      }

      setPos(curX.current, curY.current)
      rafId.current = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (document.hidden || rafId.current) return
      lastTime.current = 0
      rafId.current = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      if (!hasPointer.current) {
        hasPointer.current = true
        curX.current = e.clientX
        curY.current = e.clientY
        setPos(e.clientX, e.clientY)
        el.style.opacity = '1'
        return
      }
      startLoop()
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, label, [tabindex]')
      if (interactive) {
        el.style.width = '18px'
        el.style.height = '18px'
        el.style.opacity = '0.5'
      } else {
        el.style.width = '12px'
        el.style.height = '12px'
        el.style.opacity = '1'
      }
    }

    const onVisibility = () => {
      if (document.hidden && rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = 0
        lastTime.current = 0
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('visibilitychange', onVisibility)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'var(--nav-dot)',
          boxShadow: '0 0 10px color-mix(in srgb, var(--nav-dot) 70%, transparent)',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: 0,
          transform: 'translate3d(0,0,0) translate(-50%,-50%)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          contain: 'layout style paint',
          transition: 'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease',
        }}
      />
    </>
  )
}
