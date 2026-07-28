## 2024-06-23 - Command Palette Empty State
**Learning:** The Command Palette lacked a clear empty state and actionable fallback when a search yielded no results, leading to a dead-end UI.
**Action:** Always provide an actionable empty state (e.g., a "Clear search" button) and clear messaging when dynamic lists or searches return empty results to prevent dead-ends.
## 2024-06-27 - Command Palette Empty State Clear Button Focus
**Learning:** The Command Palette 'Clear search' button in the empty state removed search text but left keyboard focus lost in the document, breaking the user's flow.
**Action:** When implementing 'clear search' functionality or similar in-input buttons, always programmatically refocus the associated input element after the clear action to preserve keyboard accessibility context.
## 2024-07-20 - Skip Link Target Accessibility
**Learning:** Skip-to-content links require the target container (e.g., `<main id="main-content">`) to be programmatically focusable so keyboard flow correctly moves there upon clicking the skip link. Without this, focus is lost or incorrectly handled by the browser.
**Action:** When implementing 'Skip to content' or similar anchor-based skip links, ensure the target destination element (e.g., `<main>`) has `tabIndex={-1}` so it can receive programmatic focus, and optionally `style={{ outline: 'none' }}` to prevent visual artifacts on focus.
## 2025-02-28 - Dynamic Search ARIA Status
**Learning:** Screen readers won't naturally announce text changes on the page unless explicitly told to. This applies to dynamic search result counts or filter counts in single-page apps.
**Action:** When implementing any search or filter UI that updates a result count dynamically, always ensure the container holding the count has `role="status"` and `aria-live="polite"` so screen readers will announce the updated count non-disruptively.
