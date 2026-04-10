## 2024-04-10 - Icon-only Buttons Missing Accessibility Patterns
**Learning:** Found an accessibility pattern specific to this app: icon-only buttons (like ThemeSelector and ThemeToggle) rely solely on the `title` attribute, lacking proper `aria-label` and state attributes like `aria-expanded`. This makes keyboard and screen reader navigation less intuitive.
**Action:** Always ensure icon-only interactive elements explicitly define `aria-label` and relevant state attributes (`aria-expanded`, `aria-pressed`) alongside `title` for better assistive tech support.
