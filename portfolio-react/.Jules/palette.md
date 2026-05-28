## 2024-05-06 - Accessible Toggle Groups
**Learning:** Found multiple instances of toggleable lists/filters (e.g., density toggles, category filters, timeline layers) missing proper `role="group"` and `aria-pressed` states. This makes it difficult for screen reader users to understand the current active state within a group of options.
**Action:** When creating toggle button groups or filters, always wrap the buttons in a container with `role="group"` and a descriptive `aria-label`, and use `aria-pressed="true/false"` on the buttons to indicate the active selection state.
## 2024-05-28 - ARIA Combobox Pattern for Command Palette
**Learning:** Found the command palette input component in `CommandPalette.jsx` was missing a complete ARIA combobox pattern. Simply adding `role="combobox"` without `aria-expanded` mapped to the open state and `aria-haspopup` is considered an anti-pattern.
**Action:** When implementing command palettes or search inputs that render a listbox, always include `role="combobox"`, map `aria-expanded` dynamically to the toggle state, and explicitly define `aria-haspopup="listbox"`.
