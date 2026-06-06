const moduleLoaders = {
  '/about': () => import('../pages/AboutPage.jsx'),
  '/projects': () => import('../pages/ProjectsPage.jsx'),
  '/experience': () => import('../pages/ExperiencePage.jsx'),
  '/profiles': () => import('../pages/ProfilesPage.jsx'),
  '/research': () => import('../pages/ResearchPage.jsx'),
  '/skills': () => import('../pages/SkillsPage.jsx'),
  '/styleguide': () => import('../pages/StyleguidePage.jsx'),
  '/minimal': () => import('../pages/MinimalSPA.jsx'),
  '/demo/3d-nav': () => import('../components/ui/3d-adaptive-navigation-bar-demo'),
  '/demo/spotlight-card': () => import('../components/ui/spotlight-card-demo'),
}

const loadedRoutes = new Set()

export function getRouteLoader(path) {
  return moduleLoaders[path]
}

export function normalizeRoutePath(to) {
  if (!to || /^https?:|^mailto:/.test(to)) return ''
  const path = to.split('#')[0] || '/'
  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
}

export function prefetchRoute(to) {
  const path = normalizeRoutePath(to)
  const loader = moduleLoaders[path]

  if (!loader || loadedRoutes.has(path)) return
  loadedRoutes.add(path)
  loader().catch(() => loadedRoutes.delete(path))
}

export function prefetchRoutesDuringIdle(routes, delay = 120) {
  if (typeof window === 'undefined') return () => {}

  let cancelled = false
  const timers = []
  const runWhenIdle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1))
  const cancelIdle = window.cancelIdleCallback || window.clearTimeout

  const idleId = runWhenIdle(() => {
    routes.forEach((route, index) => {
      const timerId = window.setTimeout(() => {
        if (!cancelled) prefetchRoute(route)
      }, index * delay)
      timers.push(timerId)
    })
  }, { timeout: 1800 })

  return () => {
    cancelled = true
    cancelIdle(idleId)
    timers.forEach(window.clearTimeout)
  }
}
