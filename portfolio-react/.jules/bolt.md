## 2026-05-02 - Pre-fetching DOM Elements for O(1) Updates
**Learning:** Calling `document.querySelector` repeatedly inside a loop is an (N \times M)$ operation (where M is the DOM size). In our app, meta tag updates via `SEO.jsx` occur on every route change, causing unnecessary overhead.
**Action:** Always pre-fetch existing DOM elements with a single `document.querySelectorAll` call before iterating, and store them in an O(1) Map for constant-time lookup to improve rendering performance.
