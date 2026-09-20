1. **Optimize SectionNav & ScrollProgressRail Event Listeners**
   - In `src/components/SectionNav.jsx` and `src/components/ScrollProgressRail.jsx`, state is being set inside a scroll event listener.
   - I'll need to check the event listener batching but actually `SectionNav` uses IntersectionObserver which sets active section, and it uses `addEventListener('scroll')` to set `isVisible`. `window.scrollY > 300` returns the same boolean value repeatedly, and React bails out if the state doesn't change. However, executing `setIsVisible(window.scrollY > 300)` on *every* scroll still incurs overhead. Wait, the `Bolt` persona guidelines specify: "Debounce search input to reduce API calls" or "Move expensive operation outside of render loop".

Let's look at a better candidate:
2. **Optimize `ResearchPage` Pre-computing Stats**
   - In `src/pages/ResearchPage.jsx`, inside `export default function ResearchPage() {`, we have:
     ```javascript
     const published = publications.filter((p) => p.link).length
     const accepted = publications.filter((p) => !p.link).length
     ```
   - These compute values every single render by iterating over `publications`.
   - We can hoist them outside the component definition to avoid O(N) operations on every render.
   - This directly aligns with the memory: "To avoid O(N * M) overhead during React renders, pre-calculate derived metrics from static data (such as counts of filtered items) at the module level outside the component, rather than recalculating them inline on every state update."

3. **Complete pre-commit steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

4. **Submit PR**
   - Name: `⚡ Bolt: [performance improvement]`
   - Description matching guidelines.
