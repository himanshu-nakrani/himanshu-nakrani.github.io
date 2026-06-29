// Barrel re-export — keeps existing `import { foo } from '../data'` callers working
// while the underlying data lives in per-page modules under ./data/.
// Combined with Vite's tree-shaking, importers pull only what they use.
export * from './data/experience'
export * from './data/projects'
export * from './data/research'
export * from './data/skills'
export * from './data/profiles'
export * from './data/lab'
export * from './data/hero'
export * from './data/misc'
export * from './data/stats'
