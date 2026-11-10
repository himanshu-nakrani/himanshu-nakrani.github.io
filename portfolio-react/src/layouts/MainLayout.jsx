import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import AmbientAtmosphere from '../components/AmbientAtmosphere'
import Navbar from '../components/Navbar'
import SkipLink from '../components/SkipLink'
import BackToTop from '../components/BackToTop'
import CursorHalo from '../components/CursorHalo'
import ScrollProgressRail from '../components/ScrollProgressRail'
import CmdKHint from '../components/CmdKHint'
import ContextualRouteTransition from '../components/ContextualRouteTransition'
import RouteLoadingBar from '../components/RouteLoadingBar'
import { installLinkPrefetching, warmPrimaryRoutes } from '../lib/routePrefetch'
import { useDisplayLocation } from '../lib/displayLocation'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const CommandPalette = lazy(() => import('../components/CommandPalette'))


export default function MainLayout({ isDark, setIsDark, designMode, setDesignMode }) {
  const location = useLocation()
  const displayLocation = useDisplayLocation()
  const pageReady = !displayLocation || displayLocation.pathname === location.pathname
  const reduceMotion = usePrefersReducedMotion()
  const [commandPaletteLoaded, setCommandPaletteLoaded] = useState(false)
  const toggleTheme = useCallback(() => setIsDark(!isDark), [isDark, setIsDark])
  const outletContext = useMemo(() => ({ designMode }), [designMode])

  useEffect(() => {
    if (commandPaletteLoaded) return undefined
    const loadCommandPalette = (event) => {
      if (event.type === 'keydown') {
        if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return
        event.preventDefault()
      }
      setCommandPaletteLoaded(true)
    }

    document.addEventListener('open-command-palette', loadCommandPalette)
    document.addEventListener('keydown', loadCommandPalette)
    return () => {
      document.removeEventListener('open-command-palette', loadCommandPalette)
      document.removeEventListener('keydown', loadCommandPalette)
    }
  }, [commandPaletteLoaded])

  useLayoutEffect(() => {
    if (!pageReady) return undefined
    const hash = location.hash
    if (hash) {
      const id = hash.replace('#', '')
      const scrollToTarget = () => {
        const el = document.getElementById(id)
        if (!el) return
        const navbarHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '76',
          10
        )
        const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 8
        window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' })
      }
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(scrollToTarget)
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
      }
    }
  }, [location.hash, location.pathname, pageReady, reduceMotion])

  useEffect(() => installLinkPrefetching(document), [])

  useEffect(() => warmPrimaryRoutes(location.pathname), [location.pathname])

  return (
    <>
      <SkipLink targetId="main-content" />
      <div className="app-shell">
        <AmbientAtmosphere enableAnimation />
        <CursorHalo />
        <ScrollProgressRail />
        {commandPaletteLoaded && (
          <Suspense fallback={null}>
            <CommandPalette toggleTheme={toggleTheme} initiallyOpen />
          </Suspense>
        )}
        <CmdKHint />
        <div className="app-shell-content">
          <Navbar
            isDark={isDark}
            setIsDark={setIsDark}
            designMode={designMode}
            setDesignMode={setDesignMode}
          />

          <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
            <Suspense fallback={<RouteLoadingBar />}>
              <ContextualRouteTransition context={outletContext} />
            </Suspense>
          </main>

          <BackToTop />
        </div>
      </div>
    </>
  )
}
