## 2026-05-02 - Pre-fetching DOM Elements for O(1) Updates
**Learning:** Calling `document.querySelector` repeatedly inside a loop is an (N \times M)$ operation (where M is the DOM size). In our app, meta tag updates via `SEO.jsx` occur on every route change, causing unnecessary overhead.
**Action:** Always pre-fetch existing DOM elements with a single `document.querySelectorAll` call before iterating, and store them in an O(1) Map for constant-time lookup to improve rendering performance.

## 2024-05-15 - React Event Delegation
**Learning:** React synthetic events create anonymous functions for every element if bound directly in `.map` calls (e.g. `onMouseEnter={() => setSelectedIndex(idx)}`). This causes significant memory churn and garbage collection pressure in long lists or interactive grids (like the CommandPalette).
**Action:** Implement event delegation using `onMouseOver` on the parent container, and use `e.target.closest('[data-index]')` to determine which child was interacted with. Use `useCallback` to memoize the event handler.
