## 2024-04-28 - Dynamic Context for Generic "View Details" Buttons
**Learning:** In reusable cards displaying lists of items (like `ExperienceCard.jsx`), generic "View all details →" buttons lack necessary context for screen reader users if they don't include dynamic `aria-label` properties based on the list item content.
**Action:** When adding accessibility properties to interactive elements mapped from a list, always embed unique identifying information from the item (e.g., `item.role`, `item.company`) into the `aria-label` to provide complete context.
## 2026-04-29 - Expand/Collapse Accessibility State
**Learning:** Accordion or expandable components lack sufficient context for screen reader users without proper ARIA attributes to indicate visibility state and define content relationship.
**Action:** Always add `aria-expanded={isOpen}` and `aria-controls={contentId}` to the toggle button, and ensure the collapsible content element has a matching `id={contentId}`.

## 2026-05-18 - State Management for Toggle Groups and Accodions
**Learning:** Found multiple instances where toggleable filter buttons and collapsible accordions lacked ARIA state attributes (`aria-pressed` and `aria-expanded`), rendering their visual state inaccessible to screen readers.
**Action:** When creating toggle groups or collapsible elements, always bind `aria-pressed` to the active state condition (e.g., `activeFilter === f`) and `aria-expanded` to the expansion boolean.
