## 2024-05-27 - Enhance Command Palette accessibility
**Learning:** Command palettes without proper ARIA roles (listbox, option, group) are difficult for screen reader users to navigate.
**Action:** When building or modifying search inputs and command palettes, implement the standard ARIA combobox pattern by setting `role="listbox"` on the results container and dynamically updating `aria-activedescendant` on the input to match the active `role="option"` ID.
