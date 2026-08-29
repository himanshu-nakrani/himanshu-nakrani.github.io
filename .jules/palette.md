## 2024-06-23 - Command Palette Empty State
**Learning:** The Command Palette lacked a clear empty state and actionable fallback when a search yielded no results, leading to a dead-end UI.
**Action:** Always provide an actionable empty state (e.g., a "Clear search" button) and clear messaging when dynamic lists or searches return empty results to prevent dead-ends.
## 2024-06-27 - Command Palette Empty State Clear Button Focus
**Learning:** The Command Palette 'Clear search' button in the empty state removed search text but left keyboard focus lost in the document, breaking the user's flow.
**Action:** When implementing 'clear search' functionality or similar in-input buttons, always programmatically refocus the associated input element after the clear action to preserve keyboard accessibility context.
## 2024-07-20 - Project Clear Search/Filters Refocus Input
**Learning:** The Projects page "Clear all filters" button in the empty state resets filters and query but does not properly preserve keyboard accessibility by programmatically refocusing the search input in a reliable way for screen reader users or keyboard navigators. Although there is a `setTimeout` used, it points to a pattern that should be applied more consistently across the app. In `CommandPalette.jsx`, there is a clear search button that clears the search and calls `inputRef.current?.focus()`, but we can see in memory `.jules/palette.md` that an entry mentions to ALWAYS refocus the input when a search is cleared. We see `CommandPalette.jsx` does it, `ProjectsPage.jsx` does it via setTimeout. Let us check `CommandPalette.jsx` and other search components.
## 2024-07-20 - Skip Link Keyboard Accessibility
**Learning:** The `SkipLink` component was implemented as an anchor (`<a>`), but in many browsers (like Chrome/Safari) simply clicking a skip link or navigating via hash fragment doesn`t reliably move programmatic keyboard focus to the target element unless the target element has `tabIndex="-1"`. If the target element (`<main id="main-content">`) lacks this attribute, screen reader and keyboard users get visual scroll but focus remains near the top, making the skip link ineffective.
**Action:** Always ensure that the destination of a skip link (typically the `<main>` element) has `tabIndex={-1}` so that it can receive programmatic focus and properly shift the user`s keyboard navigation context.

## 2024-07-20 - Skip Link Target Accessibility
**Learning:** Skip-to-content links require the target container (e.g., `<main id="main-content">`) to be programmatically focusable so keyboard flow correctly moves there upon clicking the skip link. Without this, focus is lost or incorrectly handled by the browser.
**Action:** When implementing 'Skip to content' or similar anchor-based skip links, ensure the target destination element (e.g., `<main>`) has `tabIndex={-1}` so it can receive programmatic focus, and optionally `style={{ outline: 'none' }}` to prevent visual artifacts on focus.
## 2025-02-28 - Dynamic Search ARIA Status
**Learning:** Screen readers won't naturally announce text changes on the page unless explicitly told to. This applies to dynamic search result counts or filter counts in single-page apps.
**Action:** When implementing any search or filter UI that updates a result count dynamically, always ensure the container holding the count has `role="status"` and `aria-live="polite"` so screen readers will announce the updated count non-disruptively.

## 2024-05-18 - Add aria-hidden to decorative icons within interactive elements
**Learning:** Decorative SVG icons (like magnifying glasses or 'X' clear buttons) placed inside of buttons or labels that already have an explicit `aria-label` attribute can cause redundancy or confusion for screen reader users if left exposed.
**Action:** Always add `aria-hidden="true"` to SVG icons that do not provide additional semantic value beyond the explicit `aria-label` or surrounding text of their parent interactive elements.
## 2024-08-29 - Fixed CSS Exit Transition on BackToTop Button
**Learning:** Immediately unmounting conditionally visible React components (e.g., `if (!visible) return null`) prevents CSS exit transitions like fade-outs from playing.
**Action:** Keep the component in the DOM but make it semantically and functionally invisible using `aria-hidden={!visible}`, `tabIndex={visible ? 0 : -1}`, and `pointerEvents: visible ? 'auto' : 'none'` to ensure animations run while keeping the UI accessible and preventing unintended interaction.
