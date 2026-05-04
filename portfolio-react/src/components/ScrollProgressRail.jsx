import { useEffect, useRef } from 'react'

/**
 * ScrollProgressRail — a 2px rail along the right edge of the viewport
 * that fills from 0 → 1 as the user scrolls the page. Set as a CSS
 * variable on the fill element so we don't trigger React re-renders.
 *
 * - Hidden under 768px (the rail competes with thumb scroll on touch)
 * - Throttled via rAF
 */
export default function ScrollProgressRail() {
  const fillRef = useRef(null)
  const rafId = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => {
      rafId.current = 0
      const el = fillRef.current
      if (!el) return
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0
      el.style.setProperty('--scroll', String(progress))
    }

    const onScroll = () => {
      if (rafId.current) return
      rafId.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="scroll-progress-rail" aria-hidden="true">
      <div className="scroll-progress-rail__track" />
      <div ref={fillRef} className="scroll-progress-rail__fill" style={{ '--scroll': 0 }} />
    </div>
  )
}
