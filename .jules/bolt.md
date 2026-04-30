## 2025-04-26 - [Performance] Date Iteration Optimization

**Learning:** When building heatmaps or continuous timeline visualizations across a full year (53 weeks * 7 days = 371 days), creating a `new Date()` object for every cell iteration leads to high object churn and garbage collection pressure. This app previously instantiated over 750 intermediate `Date` objects in a single `useMemo` block just to calculate cell coordinates.

**Action:** To apply next time: when looping across sequential days, declare a single mutable `Date` object outside the loop and increment it inside using `cell.setDate(cell.getDate() + 1)`. Extract formatting outputs directly from the mutated instance. This avoids O(N) object allocations in loops.
## 2024-04-29 - O(n) array lookup in nested loop rendering
**Learning:** Checking for elements in an array using `.includes()` within a nested loop inside a React component's render function can become a performance bottleneck, as it creates an O(n) operation inside the nested loop iteration. Array mappings that are derived from props and don't change frequently also cause redundant array memory allocations on every render.
**Action:** Convert arrays meant for fast inclusion checks into a `Set` via `useMemo` for O(1) lookups. Memoize any constant derivations from props to prevent redundant recreation on re-renders.
