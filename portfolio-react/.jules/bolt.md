## 2026-05-02 - Pre-fetching DOM Elements for O(1) Updates
**Learning:** Calling `document.querySelector` repeatedly inside a loop is an (N \times M)$ operation (where M is the DOM size). In our app, meta tag updates via `SEO.jsx` occur on every route change, causing unnecessary overhead.
**Action:** Always pre-fetch existing DOM elements with a single `document.querySelectorAll` call before iterating, and store them in an O(1) Map for constant-time lookup to improve rendering performance.

## 2026-05-21 - Flattened Array mapping for O(1) List Event Delegation
**Learning:** When using event delegation to optimize React lists that map over grouped data structures (e.g. `Object.entries(groups).map`), tracking which item corresponds to which `data-index` can be tricky, making lookups complex.
**Action:** When implementing event delegation for grouped or nested React lists, compute a flattened 1D array of the rendered items using `useMemo` first, so you can do O(1) item lookups via `data-index` attributes directly in the event handler.
