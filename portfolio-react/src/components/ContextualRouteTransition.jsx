import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { useDisplayLocation } from '../lib/displayLocation'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const FADE_MS = 180

const routeMeta = (pathname) => {
  if (pathname.startsWith('/projects/')) return 'architecture'
  if (pathname.startsWith('/research/')) return 'telemetry'
  if (pathname === '/experience') return 'trajectory'
  if (pathname === '/profiles') return 'signal'
  if (pathname === '/research') return 'experiment'
  if (pathname === '/projects') return 'systems'
  if (pathname === '/skills') return 'stack'
  if (pathname === '/lab') return 'prototype'
  return 'signal-field'
}

export default function ContextualRouteTransition({ context }) {
  const live = useLocation()
  const display = useDisplayLocation()
  const outlet = useOutlet(context)
  const reduceMotion = usePrefersReducedMotion()
  const pathname = display?.pathname ?? live.pathname
  const hash = display?.hash ?? live.hash
  const outletRef = useRef(outlet)
  const [view, setView] = useState(() => ({ pathname, node: outlet }))
  const [shown, setShown] = useState(true)

  outletRef.current = outlet

  useLayoutEffect(() => {
    if (hash || view.pathname !== pathname) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [hash, pathname, view.pathname])

  useEffect(() => {
    if (pathname === view.pathname) return undefined
    if (reduceMotion) {
      setView({ pathname, node: outletRef.current })
      setShown(true)
      return undefined
    }

    setShown(false)
    const swap = window.setTimeout(() => {
      setView({ pathname, node: outletRef.current })
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setShown(true))
      })
    }, FADE_MS)

    return () => window.clearTimeout(swap)
  }, [pathname, reduceMotion, view.pathname])

  return (
    <div className={`context-route context-route--${routeMeta(view.pathname)}${shown ? '' : ' is-fading'}`}>
      <div className="context-route__accent" aria-hidden="true" key={view.pathname} />
      {view.node}
    </div>
  )
}
