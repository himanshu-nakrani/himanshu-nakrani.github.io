I have found several opportunities for performance optimization in the `portfolio-react` app.

**1. Optimization 1: Batching state updates in ScrollProgressRail & SectionNav**
Currently, `ScrollProgressRail` and `SectionNav` have multiple state updates per scroll event.
* However, `ScrollProgressRail` is using `requestAnimationFrame`, and `SectionNav` has an `IntersectionObserver` that tracks the active section instead of triggering continuously on scroll events.
* `window.addEventListener('scroll', ...)` appears in several components, but it is typically debounced or handles simple state changes. `Navbar` and `Nav` trigger `setScrolled` on scroll.
* I will look into pre-computing data structures for static data instead, as suggested by the `Bolt` journal.

**2. Optimization 2: Pre-computing static data structures**
The `projects` array and `caseStudies` array are frequently filtered and searched.
In `ProjectsPage.jsx`:
`const filteredProjects = useMemo(...)` is used, which is good.
However, in `HomeBentoDashboard.jsx`, there are several `.find()` operations on arrays like `projects` and `modelOpsSnapshots` at the module level.
`const featured = projects.find(...)`

**3. Optimization 3: Combining useMemo hooks in LabPage.jsx**
There are `useMemo` hooks in `LabPage.jsx` that might be combinable, or we can look for other anti-patterns mentioned in the Bolt journal.

Let's look closely at `src/components/SectionNav.jsx`.
`window.addEventListener('scroll', scrollHandler, { passive: true })`
`scrollHandler` is `() => setIsVisible(window.scrollY > 300)`. This triggers a React state update on *every* scroll event, which causes re-renders of the `SectionNav` component.

Wait, `window.scrollY > 300` evaluates to a boolean. React batches state updates, but `setIsVisible` will be called with the same boolean value repeatedly. React bails out of rendering if the state is exactly the same, but it still has to evaluate the state.

Instead of `SectionNav.jsx`, let's check `portfolio-react/src/components/Navbar.jsx`.
```javascript
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
```
This is a very common performance issue. On every scroll event, `window.scrollY > 20` is evaluated. If it's `true`, `setScrolled(true)` is called. If the user scrolls down 1000px, it calls `setScrolled(true)` hundreds of times. While React bails out of updates if the new state is identical to the old state, the function is still called on every scroll.

However, a better optimization is in `src/pages/ProjectsPage.jsx` or `src/components/HomeBentoDashboard.jsx`.
Wait, in `src/components/HomeBentoDashboard.jsx`:
```javascript
const featured = projects.find(project => project.title === 'Agent Forge')
const selectedProjects = [
  projects.find(project => project.title === 'Alpha Copilot'),
  projects.find(project => project.title === 'Sourceful'),
].filter(Boolean)
const research = modelOpsSnapshots.find(model => model.id === 'tinymathReason')
```
These are module level constants, they only run once.

Let's check the `.filter()` in `src/onepager/components/Projects.jsx`.
```javascript
const FILTER_COUNTS = FILTERS.reduce((acc, filter) => {
  acc[filter.id] = filter.id === 'all' ? projects.length : projects.filter(filter.match).length
  return acc
}, {})
```
This runs once at module level.

Let's look for `Math.max(...arr.map())` or similar. I didn't find any.

Let's check `src/lib/heatmapView.js`.
```javascript
  let calculatedTotal = 0
  for (const d of days) {
    if (d.count > best.count) best = d
    calculatedTotal += (d.count || 0)
  }
```
This is already optimized (single pass).

What about `src/components/LiveContributionStream.jsx`?
It was already optimized to use single-pass max calculation.

Let's look at `src/components/CommandPalette.jsx`.
```javascript
  const { filteredItems, groupedItems, renderedItems } = useMemo(() => {
    // ...
```
Already combined `useMemo` hooks.

Let's look at `src/components/RetrievalInspector.jsx`.
```javascript
function RerankPanel({ module }) {
  // ⚡ Bolt Optimization: Memoize sorted array to avoid O(N log N) re-evaluations and allocations on every render
  const sorted = useMemo(() => [...module.chunks].sort((a, b) => a.reranked - b.reranked), [module.chunks])
```
Already optimized.

Let's find `useMemo` or `.sort()` in `src/components/ui/` or `src/components/`.
In `src/components/AgentForgeTopology.jsx`:
```javascript
const byId = Object.fromEntries(nodes.map(node => [node.id, node]))
```

In `src/pages/ExperiencePage.jsx`:
```javascript
const EXPERIENCE_WITH_METRICS = experience.map((item) => ({
  ...item,
  progressionSteps: item.progressionSteps?.map((step) => ({
    ...step,
    metrics: extractMetrics(step.bullets),
  })),
}))
```
This is module-level.

Let's check `src/pages/ResearchPage.jsx`.
```javascript
export default function ResearchPage() {
  const published = publications.filter((p) => p.link).length
  const accepted = publications.filter((p) => !p.link).length

  // ...
  return ( ...
```
Here, `published` and `accepted` are calculated on every render of `ResearchPage`. They are derived from the static `publications` array.
`publications` comes from `../data/research`.
Since `publications` is static data, calculating `published` and `accepted` inside the component on every render causes unnecessary O(N) array iterations. We can hoist this calculation outside the component to the module level.
This matches the journal entry:
`**Learning:** To avoid O(N * M) overhead during React renders, pre-calculate derived metrics from static data (such as counts of filtered items) at the module level outside the component, rather than recalculating them inline on every state update.`
Wait, does it say that in memory? Yes!
"To avoid O(N * M) overhead during React renders, pre-calculate derived metrics from static data (such as counts of filtered items) at the module level outside the component, rather than recalculating them inline on every state update."

Let's check `src/pages/ResearchPage.jsx` completely.
