## 2024-06-17 - Added Missing aria-label for Details Buttons in Mapped Project Cards
**Learning:** Reusable mapping components often inherit generic strings ("Details", "More") which limits context for screen readers traversing lists of items (like projects).
**Action:** When adding generic buttons within mapped lists, ensure to bind dynamic item properties (like item.title) into their aria-label to maintain accessibility in lists.
