## 2025-09-25 - Redundant Screen Reader Announcements for Icons
**Learning:** Decorative SVG icons (like Lucide's Play/Pause) inside interactive controls that already have an `aria-label` or visible text cause redundant announcements if they lack `aria-hidden="true"`.
**Action:** Always append `aria-hidden="true"` to SVG elements that are purely visual complements to an explicitly labelled control.
