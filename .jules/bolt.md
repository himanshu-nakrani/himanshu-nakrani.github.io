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

## 2023-11-04 - [Performance] Date String Parsing in Loops

**Learning:** When parsing ISO date strings (like 'YYYY-MM-DD') inside a loop (e.g. constructing a heatmap view across a year), calling `Date.parse()` or constructing a new `Date` object each iteration introduces significant overhead. However, attempting to optimize this by using a single mutable `Date` object and blindly incrementing it (`singleDate.setDate(singleDate.getDate() + 1)`) is brittle and assumes perfectly contiguous data. If a day is skipped in the payload, the rendered dates will silently drift out of sync.

**Action:** When extracting date components inside a loop where `Date.parse()` overhead is a concern, use `String.prototype.split()` to extract the year, month, and day strings. Then directly apply them to a single mutable `Date` object using `Date.prototype.setFullYear(year, month - 1, day)`. This avoids both O(N) `Date.parse()` instantiations and the risk of desync on sparse datasets.
## 2025-10-24 - [Performance] Memoizing Hover Grid Cells
**Learning:** In a highly dense visual grid (like a ~370-cell GitHub contribution heatmap), using React event delegation on the parent container (via `onMouseOver`) combined with a `hover` object in state causes massive re-renders. Without `React.memo()`, every time the mouse moves to a new cell, the component state changes, forcing all 371 `<motion.div>` cells to re-render simultaneously, leading to severe main-thread blocking and a sluggish hover UX.
**Action:** Extract individual cells in dense grids into separate components wrapped in `React.memo()`. Pass primitive props (`isHover`, `levelBg`, etc.) or stable references so that only the two cells whose `isHover` state changes (the one losing hover, and the one gaining hover) will re-render, reducing render workload by ~99%.

## 2024-07-22 - [Performance] Missing useMemo for Expensive Operations in Render
**Learning:** Performing `O(N log N)` array operations like `Array.prototype.sort()` directly inside a functional component's render body causes the expensive calculation and array allocation to re-run on every render cycle (e.g. state changes like hovering, selecting an item).
**Action:** Wrap computationally expensive array derivations (like sorting or filtering) in `useMemo` so they only re-evaluate when their specific dependencies change. This is especially critical when handling frequent interaction state updates in the same component.
## 2026-07-23 - [Performance] Memoize Sorting in React Render
**Learning:** Calling `.sort()` directly on an array prop inside a React component's render body (e.g., `module.chunks.sort()`) is a severe anti-pattern. Not only does it cause an expensive O(N log N) re-evaluation on every render cycle, but `.sort()` also mutates the original array in place, which can lead to unpredictable side effects and bugs in React's state management.
**Action:** When a sorted version of an array is needed for rendering, always copy the array first (e.g., `[...arr].sort()`) to prevent in-place mutation, and wrap the operation in a `useMemo` hook. This ensures the expensive sorting logic only runs when the underlying array reference actually changes.

## 2026-07-25 - [Performance] Move Static Data Arrays Outside Components
**Learning:** Initializing large arrays of objects with static properties inside a `useMemo` hook causes the array, its objects, and any string manipulations (e.g. `.toLowerCase()`) to be evaluated on component mount and every time dependencies change. In the case of `CommandPalette.jsx`, embedding `navigate` or `toggleTheme` callbacks directly inside the item objects forced the array to be bound to component state.
**Action:** Extract large, primarily static data structures out of the component entirely to ensure they are created only once per module load. Replace inline closure callbacks on the data objects with static strings (e.g. `actionType: 'navigate'`) and handle the execution logic using those identifiers in a centralized `useCallback` inside the component.

## 2024-05-15 - Fast aggregate calculation loops
**Learning:** Iterating over object arrays to find aggregate values (like min or max) using `.reduce` can be significantly slower than a single-pass `for` loop because of object allocation and closure overhead on large datasets. Using mapping combined with spreading (`Math.max(...arr.map(...))`) is even worse due to the large intermediate array allocation and call stack limits on very large inputs.
**Action:** In frequently rendered or large datasets (e.g., ContributionHeatmap stats calculation), replace `.reduce` and spreading with single-pass `for` loops or `for...of` loops, caching the results where appropriate.

## 2024-05-18 - [Performance] Combining Sequential useMemo Hooks

**Learning:** When multiple `useMemo` hooks depend strictly on each other's sequential output in a React component, keeping them separate forces React to evaluate the first, store the intermediate result, check the dependencies of the second, and then evaluate the second. This creates unnecessary hook tracking overhead, extra intermediate dependency allocations, and multiple evaluation steps for what is essentially a single synchronous data transformation pipeline.

**Action:** Combine tightly coupled, sequential data transformations into a single `useMemo` block that depends on the original upstream inputs. Return an object containing all the derived data slices needed by the component. This reduces hook overhead and ensures the entire transformation evaluates in one pass.
## 2026-07-26 - [Performance] Cascading Re-renders from Dependent State Updates
**Learning:** Using a `useEffect` hook to synchronize state variables in React (like resetting a `selectedIndex` when a `search` query state changes) is a common anti-pattern that causes severe cascading re-renders. React paints the DOM after the first state change, the `useEffect` fires, updates the second state, and React must paint the DOM a second time. This can halve performance during rapid typing.
**Action:** When one state change logically necessitates another (like a search change resetting selection), batch the state updates directly inside the event handler (e.g. `onChange` or `onClick`). This allows React to batch both updates into a single render pass, eliminating the cascading render completely.

## 2023-11-20 - [Performance] Refactoring in-render reduce to single pass loops
**Learning:** Using `Array.prototype.reduce` inside a React component's render body (e.g. `skills.reduce((acc, group) => acc + group.items.length, 0)`) evaluates an aggregate value on every render cycle. This generates O(N) intermediate function closures and object allocations per evaluation, negatively impacting frame rate.
**Action:** When calculating aggregate statistics over a static array, pre-compute the total via a single-pass `for...of` loop outside of the component definition, passing only the final primitive value into the React component. This completely eliminates O(N) calculations and closure allocations during rendering.

## 2026-07-27 - [Performance] O(N log N) Array Operations in High-Frequency Observer Callbacks
**Learning:** Using chained array methods like `.filter().sort()[0]` inside the callback of an `IntersectionObserver` (or similar high-frequency event listeners) introduces unnecessary O(N log N) computational overhead and intermediate array allocations on every scroll tick.
**Action:** Replace chained `.filter().sort()` calls with a single-pass `for...of` loop to find maximum values (like highest `intersectionRatio`). This guarantees O(N) performance and eliminates intermediate garbage collection pressure during critical rendering paths.
