import { useEffect, useState } from 'react'
import { Routes, useLocation } from 'react-router-dom'
import { DisplayLocationContext } from '../lib/displayLocation'
import { prefetchRoute } from '../lib/routePrefetch'
import RouteLoadingBar from './RouteLoadingBar'

function shellKey(pathname) {
  if (pathname === '/minimal' || pathname === '/styleguide' || pathname.startsWith('/demo/')) {
    return pathname
  }
  return 'site'
}

export default function SmoothRoutes({ children }) {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    const samePage = location.pathname === displayLocation.pathname
    if (samePage) {
      if (
        location.key !== displayLocation.key
        || location.hash !== displayLocation.hash
        || location.search !== displayLocation.search
      ) {
        setDisplayLocation(location)
      }
      return undefined
    }

    let cancelled = false
    setWaiting(true)
    Promise.resolve(prefetchRoute(location.pathname))
      .catch(() => {})
      .then(() => {
        if (cancelled) return
        setWaiting(false)
        setDisplayLocation(location)
      })

    return () => {
      cancelled = true
    }
  }, [displayLocation, location])

  return (
    <DisplayLocationContext.Provider value={displayLocation}>
      {waiting ? <RouteLoadingBar /> : null}
      <div key={shellKey(displayLocation.pathname)} className="shell-route shell-route--enter">
        <Routes location={displayLocation}>{children}</Routes>
      </div>
    </DisplayLocationContext.Provider>
  )
}
