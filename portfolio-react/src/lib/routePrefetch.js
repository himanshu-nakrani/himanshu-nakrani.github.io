// Importers shared with App.jsx lazy() so prefetch and render resolve the same chunk.
export const routeImporters = {
  '/': () => import('../pages/HomePage'),
  '/about': () => import('../pages/AboutPage'),
  '/projects': () => import('../pages/ProjectsPage'),
  '/projects/:slug': () => import('../pages/ProjectDeepDivePage'),
  '/experience': () => import('../pages/ExperiencePage'),
  '/profiles': () => import('../pages/ProfilesPage'),
  '/research': () => import('../pages/ResearchPage'),
  '/research/:slug': () => import('../pages/ResearchDeepDivePage'),
  '/skills': () => import('../pages/SkillsPage'),
  '/lab': () => import('../pages/LabPage'),
  '/minimal': () => import('../pages/MinimalSPA'),
}

const prefetched = new Set()
const pending = new Map()

function getRouteKey(path) {
  if (typeof path !== 'string') return null

  let clean = path
  try {
    clean = new URL(path, window.location.origin).pathname
  } catch {
    clean = path.split('#')[0].split('?')[0]
  }

  if (clean !== '/') clean = clean.replace(/\/+$/, '')
  if (routeImporters[clean]) return clean
  if (/^\/projects\/[^/]+$/.test(clean)) return '/projects/:slug'
  if (/^\/research\/[^/]+$/.test(clean)) return '/research/:slug'
  return null
}

export function prefetchRoute(path) {
  const routeKey = getRouteKey(path)
  if (!routeKey || prefetched.has(routeKey)) return pending.get(routeKey)
  if (pending.has(routeKey)) return pending.get(routeKey)

  const request = routeImporters[routeKey]()
    .then((module) => {
      prefetched.add(routeKey)
      pending.delete(routeKey)
      return module
    })
    .catch((error) => {
      pending.delete(routeKey)
      throw error
    })

  pending.set(routeKey, request)
  return request
}

function canWarmRoutes() {
  if (typeof navigator === 'undefined') return false
  const connection = navigator.connection
  return !connection?.saveData && !['slow-2g', '2g'].includes(connection?.effectiveType)
}

export function warmPrimaryRoutes(currentPath = '/') {
  if (!canWarmRoutes()) return () => {}

  const priorities = ['/projects', '/experience', '/about', '/research', '/skills', '/profiles']
    .filter((path) => path !== currentPath)
  let cancelled = false
  let index = 0

  const warmNext = (deadline) => {
    if (cancelled) return
    while (index < priorities.length && (!deadline || deadline.timeRemaining() > 5 || deadline.didTimeout)) {
      prefetchRoute(priorities[index])?.catch(() => {})
      index += 1
      if (!deadline) break
    }
    if (index < priorities.length) schedule()
  }

  const schedule = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(warmNext, { timeout: 1800 })
    } else {
      window.setTimeout(() => warmNext(), 350)
    }
  }

  schedule()
  return () => { cancelled = true }
}

export function installLinkPrefetching(root = document) {
  if (typeof window === 'undefined') return () => {}
  let touchTimer = 0

  const getInternalHref = (target) => {
    const anchor = target.closest?.('a[href]')
    if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return null
    const url = new URL(anchor.href, window.location.href)
    return url.origin === window.location.origin ? `${url.pathname}${url.search}${url.hash}` : null
  }

  const prefetchFromEvent = (event) => {
    const href = getInternalHref(event.target)
    if (href) prefetchRoute(href)?.catch(() => {})
  }

  const touchIntent = (event) => {
    const href = getInternalHref(event.target)
    if (!href) return
    window.clearTimeout(touchTimer)
    touchTimer = window.setTimeout(() => prefetchRoute(href)?.catch(() => {}), 40)
  }

  root.addEventListener('pointerover', prefetchFromEvent, { passive: true })
  root.addEventListener('focusin', prefetchFromEvent)
  root.addEventListener('touchstart', touchIntent, { passive: true })

  return () => {
    window.clearTimeout(touchTimer)
    root.removeEventListener('pointerover', prefetchFromEvent)
    root.removeEventListener('focusin', prefetchFromEvent)
    root.removeEventListener('touchstart', touchIntent)
  }
}
