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
