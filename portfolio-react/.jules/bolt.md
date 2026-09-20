## 2024-03-24 - Batching states in React events
**Learning:** In React, avoid calling setState synchronously within a useEffect body to synchronize state, as it triggers unnecessary cascading renders.
**Action:** Batch these state updates directly in the relevant event handlers (e.g., onChange or onClick).

## 2024-03-24 - Pre-computing data structures
**Learning:** When performing lookups within nested map/filter operations, convert the target array to a Set to achieve O(1) lookups instead of using Array.includes, which causes O(N x M) performance degradation.
**Action:** When optimizing static data arrays in React components, pre-compute these structures globally outside the component definition.

## 2024-03-24 - Hoisting redundant operations
**Learning:** In components that filter lists, redundant string transformations (like query.toLowerCase()) cause unnecessary O(n) string allocations and re-evaluations on every render.
**Action:** Hoist these operations outside of the render cycle or map loops.

## 2024-03-24 - Memoizing expensive operations
**Learning:** Avoid calling .sort() directly on props or state arrays within the render body. This anti-pattern mutates the original array in place and causes expensive O(N log N) re-evaluations on every render.
**Action:** Always copy the array first and wrap the operation in useMemo to cache the result.

## 2024-03-24 - Avoiding chained array methods
**Learning:** Chained array methods like .filter().sort()[0] inside high-frequency event listeners or observer callbacks introduce O(N log N) overhead and trigger unnecessary intermediate array allocations.
**Action:** Find maximum values using a single-pass for...of loop to ensure O(N) performance.

## 2024-03-24 - Combining useMemo hooks
**Learning:** When multiple useMemo hooks depend strictly on each other's sequential output, they incur React's internal hook tracking overhead, dependency array checking, and intermediate allocations during renders.
**Action:** Combine them into a single useMemo.
