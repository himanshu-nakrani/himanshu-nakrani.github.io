## 2026-05-02 - Pre-fetching DOM Elements for O(1) Updates
**Learning:** Calling `document.querySelector` repeatedly inside a loop is an (N \times M)$ operation (where M is the DOM size). In our app, meta tag updates via `SEO.jsx` occur on every route change, causing unnecessary overhead.
**Action:** Always pre-fetch existing DOM elements with a single `document.querySelectorAll` call before iterating, and store them in an O(1) Map for constant-time lookup to improve rendering performance.

## 2026-05-21 - Flattened Array mapping for O(1) List Event Delegation
**Learning:** When using event delegation to optimize React lists that map over grouped data structures (e.g. `Object.entries(groups).map`), tracking which item corresponds to which `data-index` can be tricky, making lookups complex.
**Action:** When implementing event delegation for grouped or nested React lists, compute a flattened 1D array of the rendered items using `useMemo` first, so you can do O(1) item lookups via `data-index` attributes directly in the event handler.

## 2026-05-26 - Avoiding O(N) array allocations in renders
**Learning:** Computing maximums or aggregates over arrays during render loops by spreading `.flatMap()` results (e.g. `Math.max(...arr.flatMap())`) creates multiple intermediate array allocations per render, causing significant garbage collection churn and memory overhead.
**Action:** For simple aggregate calculations like maximums, use a single-pass loop (e.g., `for...of`) over the original data structure within a `useMemo` hook to achieve O(1) memory footprint and eliminate allocations.

## 2024-05-18 - [Performance] Hover Re-renders and Date Formatting
**Learning:** React components that render large grids (like a 365-day GitHub heatmap) and have interactive states (like `onMouseEnter`/`onMouseLeave` triggering `setHover`) often suffer from sluggishness if they perform heavy computations during render. By default, `Date.prototype.toLocaleDateString()` instantiates a new `Intl.DateTimeFormat` object under the hood every time it is called. Running this 371 times per hover re-render is highly inefficient and causes significant garbage collection pressure.
**Action:** Pre-calculate dates once inside a `useMemo` block. Reuse a single `Intl.DateTimeFormat` instance and a single mutable `Date` object within the memoized calculation loop, storing the `formattedDate` strings in the objects to be rendered.
