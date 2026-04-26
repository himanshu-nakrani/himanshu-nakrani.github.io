## 2025-04-26 - [Performance] Date Iteration Optimization

**Learning:** When building heatmaps or continuous timeline visualizations across a full year (53 weeks * 7 days = 371 days), creating a `new Date()` object for every cell iteration leads to high object churn and garbage collection pressure. This app previously instantiated over 750 intermediate `Date` objects in a single `useMemo` block just to calculate cell coordinates.

**Action:** To apply next time: when looping across sequential days, declare a single mutable `Date` object outside the loop and increment it inside using `cell.setDate(cell.getDate() + 1)`. Extract formatting outputs directly from the mutated instance. This avoids O(N) object allocations in loops.
