## 2025-04-26 - [Performance] Date Iteration Optimization

**Learning:** When building heatmaps or continuous timeline visualizations across a full year (53 weeks * 7 days = 371 days), creating a `new Date()` object for every cell iteration leads to high object churn and garbage collection pressure. This app previously instantiated over 750 intermediate `Date` objects in a single `useMemo` block just to calculate cell coordinates.

**Action:** To apply next time: when looping across sequential days, declare a single mutable `Date` object outside the loop and increment it inside using `cell.setDate(cell.getDate() + 1)`. Extract formatting outputs directly from the mutated instance. This avoids O(N) object allocations in loops.

## 2026-04-28 - [Performance] O(1) Lookup in Nested Loops

**Learning:** Using `Array.includes` inside nested map/filter operations leads to (N \times M \times K)$ complexity. Converting the target array to a `Set` before the loops reduces lookups to (1)$, significantly improving rendering performance when highlighting related items in large datasets.

**Action:** Wrap the `Set` creation in `useMemo` to prevent redundant re-allocations on every render. Use `Set.has()` instead of `Array.includes()` for member checks in tech stacks or relationship visualizations.
