## 2025-04-26 - [Performance] Date Iteration Optimization

**Learning:** When building heatmaps or continuous timeline visualizations across a full year (53 weeks * 7 days = 371 days), creating a `new Date()` object for every cell iteration leads to high object churn and garbage collection pressure. This app previously instantiated over 750 intermediate `Date` objects in a single `useMemo` block just to calculate cell coordinates.

**Action:** To apply next time: when looping across sequential days, declare a single mutable `Date` object outside the loop and increment it inside using `cell.setDate(cell.getDate() + 1)`. Extract formatting outputs directly from the mutated instance. This avoids O(N) object allocations in loops.

## 2026-04-28 - [Performance] O(1) Lookup in Nested Loops

**Learning:** Using `Array.includes` inside nested map/filter operations leads to (N \times M \times K)$ complexity. Converting the target array to a `Set` before the loops reduces lookups to (1)$, significantly improving rendering performance when highlighting related items in large datasets.

**Action:** Wrap the `Set` creation in `useMemo` to prevent redundant re-allocations on every render. Use `Set.has()` instead of `Array.includes()` for member checks in tech stacks or relationship visualizations.

## 2024-04-29 - O(n) array lookup in nested loop rendering
**Learning:** Checking for elements in an array using `.includes()` within a nested loop inside a React component's render function can become a performance bottleneck, as it creates an O(n) operation inside the nested loop iteration. Array mappings that are derived from props and don't change frequently also cause redundant array memory allocations on every render.
**Action:** Convert arrays meant for fast inclusion checks into a `Set` via `useMemo` for O(1) lookups. Memoize any constant derivations from props to prevent redundant recreation on re-renders.
## 2024-06-13 - O(n) String Transformations in Filtering Loops
**Learning:** Calling string transformations like `.toLowerCase()` inside a `.filter` or `.map` loop causes unnecessary object allocations and redundant calculations, negatively impacting performance when typing rapidly into search fields.
**Action:** When filtering lists, always hoist redundant standardizations (like query lowercasing) outside of the loop mapping/filtering functions to achieve O(1) evaluation per render.

## 2025-06-30 - [Performance] DOM-Level Animations using Framer Motion
**Learning:** React state updates (via `useState`) triggered repeatedly within a `requestAnimationFrame` loop (e.g. for count-up animations) cause severe garbage collection churn and layout thrashing as React continuously re-renders the component on the main thread during the animation.
**Action:** Replace custom `requestAnimationFrame` state updates with Framer Motion's `useMotionValue`, `useSpring`, and `useTransform`. Returning the `MotionValue` and wrapping the render node in `<motion.span>` allows the DOM to update directly, completely bypassing the React render cycle for massive performance gains.

## 2023-10-27 - Pre-computing RegExp metrics inside React render loop
**Learning:** Instantiating arrays of Regular Expressions and executing `.test()` within a component's render loop (like `extractMetrics` in `ExperiencePage.jsx`) causes unnecessary string allocations and O(n) re-evaluations, especially when triggered repeatedly by scroll-based intersection observers (`useInView`).
**Action:** When deriving static values from constant data objects using Regex, hoist the patterns outside the function and pre-compute the derived metrics into a static array outside of the component definition, passing the result down as a prop or iterating over the pre-computed array directly.
