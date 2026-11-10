// Importers shared with App.jsx lazy() so prefetch and render resolve the same chunk.
export const routeImporters = {
  '/': () => import('../pages/HomePage'),
  '/projects': () => import('../pages/ProjectsPage'),
  '/projects/:slug': () => import('../pages/ProjectDeepDivePage'),
  '/experience': () => import('../pages/ExperiencePage'),
  '/profiles': () => import('../pages/ProfilesPage'),
  '/research': () => import('../pages/ResearchPage'),
  '/research/:slug': () => import('../pages/ResearchDeepDivePage'),
  '/skills': () => import('../pages/SkillsPage'),
  '/lab': () => import('../pages/LabPage'),
  '/minimal': () => import('../onepager/OnePager'),
}

const modules = new Map()
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

export function getLoadedPage(path) {
  const routeKey = getRouteKey(path)
  return routeKey ? modules.get(routeKey)?.default ?? null : null
}

export function prefetchRoute(path) {
  const routeKey = getRouteKey(path)
  if (!routeKey) return undefined
  if (modules.has(routeKey)) return Promise.resolve(modules.get(routeKey))
  if (pending.has(routeKey)) return pending.get(routeKey)

  const request = routeImporters[routeKey]()
    .then((module) => {
      modules.set(routeKey, module)
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

  const currentKey = getRouteKey(currentPath) || currentPath
  const queue = ['/', '/projects', '/experience', '/research', '/lab', '/profiles', '/skills', '/minimal']
    .filter((path) => path !== currentKey && path !== currentPath)
  let cancelled = false
  let index = 0
  let idleId = 0
  let timerId = 0

  const step = () => {
    if (cancelled || index >= queue.length) return
    const batch = queue.slice(index, index + 2)
    index += batch.length
    Promise.all(batch.map((path) => prefetchRoute(path)?.catch(() => {}))).finally(() => {
      if (cancelled || index >= queue.length) return
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(step, { timeout: 700 })
      } else {
        timerId = window.setTimeout(step, 120)
      }
    })
  }

  const start = () => {
    if (!cancelled) step()
  }

  if ('requestIdleCallback' in window) {
    idleId = window.requestIdleCallback(start, { timeout: 350 })
  } else {
    timerId = window.setTimeout(start, 120)
  }

  return () => {
    cancelled = true
    if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
    window.clearTimeout(timerId)
  }
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
  root.addEventListener('pointerdown', prefetchFromEvent, { passive: true })
  root.addEventListener('focusin', prefetchFromEvent)
  root.addEventListener('touchstart', touchIntent, { passive: true })

  return () => {
    window.clearTimeout(touchTimer)
    root.removeEventListener('pointerover', prefetchFromEvent)
    root.removeEventListener('pointerdown', prefetchFromEvent)
    root.removeEventListener('focusin', prefetchFromEvent)
    root.removeEventListener('touchstart', touchIntent)
  }
}
