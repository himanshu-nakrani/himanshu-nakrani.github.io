## 2024-06-23 - Command Palette Empty State
**Learning:** The Command Palette lacked a clear empty state and actionable fallback when a search yielded no results, leading to a dead-end UI.
**Action:** Always provide an actionable empty state (e.g., a "Clear search" button) and clear messaging when dynamic lists or searches return empty results to prevent dead-ends.
## 2024-06-27 - Command Palette Empty State Clear Button Focus
**Learning:** The Command Palette 'Clear search' button in the empty state removed search text but left keyboard focus lost in the document, breaking the user's flow.
**Action:** When implementing 'clear search' functionality or similar in-input buttons, always programmatically refocus the associated input element after the clear action to preserve keyboard accessibility context.
