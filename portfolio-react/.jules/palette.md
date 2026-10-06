## 2025-09-25 - Redundant Screen Reader Announcements for Icons
**Learning:** Decorative SVG icons (like Lucide's Play/Pause) inside interactive controls that already have an `aria-label` or visible text cause redundant announcements if they lack `aria-hidden="true"`.
**Action:** Always append `aria-hidden="true"` to SVG elements that are purely visual complements to an explicitly labelled control.
## 2024-03-07 - Screen reader warning for new tab links
**Learning:** External links (`target="_blank"`) that open in new tabs/windows can disorient screen reader users if they aren't warned in advance, disrupting their navigation flow. The `Contact.jsx` component generated several social links without contextual warnings.
**Action:** When creating links that use `target="_blank"`, ensure that an `aria-label` is applied dynamically to append a phrase like "(opens in a new tab)" to the link's text content, so screen readers can gracefully announce the context switch.
