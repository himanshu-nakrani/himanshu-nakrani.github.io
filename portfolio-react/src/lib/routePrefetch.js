// Importers shared with App.jsx lazy() so prefetch and render resolve the same chunk.
export const routeImporters = {
  '/': () => import('../pages/HomePage'),
  '/about': () => import('../pages/AboutPage'),
  '/projects': () => import('../pages/ProjectsPage'),
  '/experience': () => import('../pages/ExperiencePage'),
  '/profiles': () => import('../pages/ProfilesPage'),
  '/research': () => import('../pages/ResearchPage'),
  '/skills': () => import('../pages/SkillsPage'),
  '/lab': () => import('../pages/LabPage'),
  '/minimal': () => import('../pages/MinimalSPA'),
}

const prefetched = new Set()

export function prefetchRoute(path) {
  if (typeof path !== 'string') return
  const clean = path.split('#')[0].split('?')[0] || '/'
  const importer = routeImporters[clean]
  if (!importer || prefetched.has(clean)) return
  prefetched.add(clean)
  importer().catch(() => prefetched.delete(clean))
}

function connectionAllowsPrefetch() {
  const conn = typeof navigator !== 'undefined' && navigator.connection
  if (!conn) return true
  if (conn.saveData) return false
  return !['slow-2g', '2g'].includes(conn.effectiveType)
}

export function warmTopRoutes() {
  if (typeof window === 'undefined') return
  const warm = () => {
    if (!connectionAllowsPrefetch()) return
    ;['/about', '/projects', '/experience'].forEach(prefetchRoute)
  }
  const schedule = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(warm, { timeout: 3000 })
    } else {
      setTimeout(warm, 2500)
    }
  }
  if (document.readyState === 'complete') {
    schedule()
  } else {
    window.addEventListener('load', schedule, { once: true })
  }
}
