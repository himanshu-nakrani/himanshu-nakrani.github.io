## 2024-03-07 - Refactor Focus Management for Clear Search Actions
**Learning:** Hardcoded timeouts (e.g., \`setTimeout(() => ref.current?.focus(), 50)\`) for refocusing inputs after clear actions are brittle, accessible-hostile, and race-condition prone. Synchronous \`.focus()\` during state transitions can also fail if the DOM hasn't repainted.
**Action:** Always use \`requestAnimationFrame(() => ref.current?.focus())\` to ensure the input receives focus predictably precisely after the next paint, keeping screen reader context steady and preventing unpredictable focus loss.
