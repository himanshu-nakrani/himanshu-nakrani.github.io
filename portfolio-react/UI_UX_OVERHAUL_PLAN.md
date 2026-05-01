# UI/UX Overhaul Plan — Himanshu Nakrani Portfolio

A comprehensive, end-to-end plan for overhauling the user interface and user experience of the React portfolio in `portfolio-react/`. This document complements the existing `UI_REVAMP_PRD.md`, `DESIGN_SYSTEM.md`, and `ENHANCEMENTS.md` by formalizing the discovery, design, validation, and delivery process — not just the tactical changes — and by hardening the product for accessibility, responsiveness, and long-term scalability.

---

## 1. Executive Summary

The portfolio is a Vite + React single-page application deployed as a static site. Content is strong and the token-driven design system is already in place, but the experience still presents friction in three areas:

1. **Visual hierarchy and information density** — sections compete for attention; the hero does not communicate value within the first viewport on all breakpoints; "live activity" content over-indexes on novelty rather than proof.
2. **Interaction and accessibility quality** — focus visibility, keyboard operability of card-as-button patterns, modal focus management, and `prefers-reduced-motion` coverage are inconsistent across components.
3. **Responsive parity** — the dedicated `MobileAllInOnePage` diverges from the desktop information architecture, creating two products to maintain and two QA surfaces.

The overhaul will deliver a single cohesive experience that is faster to scan, fully keyboard-navigable, accessible at WCAG 2.2 AA, and architected so future content (case studies, writing, talks) can be added without re-designing the system.

---

## 2. Goals and Non-Goals

### 2.1 Goals

- Communicate identity, capability, and call-to-action within the first screen on every breakpoint.
- Reduce visual noise by consolidating repeated card and pill treatments into shared primitives.
- Reach WCAG 2.2 AA conformance for color, focus, motion, and semantics.
- Achieve mobile parity by collapsing `MobileAllInOnePage` into the same route tree as desktop.
- Establish a measurable baseline (Lighthouse, axe, CWV) and improve it.
- Make the design system extensible so new content types and pages can be added in hours, not days.

### 2.2 Non-Goals

- Backend, auth, CMS, or database introduction.
- A full content rewrite — copy edits are limited to clarity and scannability.
- Adopting a UI framework migration (e.g., Next.js) within this overhaul.
- New brand identity work — the existing warm-amber-on-cream/dark palette is retained.

---

## 3. Current-State Analysis

### 3.1 Inventory

The application currently exposes the following routes via `App.jsx`:

- `/` — `HomePage` (hero, featured highlights, current focus, projects, contact)
- `/projects` — `ProjectsPage`
- `/experience` — `ExperiencePage`
- `/skills` — `SkillsPage`
- `/research` — `ResearchPage`
- `/profiles` — `ProfilesPage`
- `/styleguide` — `StyleguidePage`
- Mobile bypass — `MobileAllInOnePage`

A token-driven design system is defined in `src/styles/tokens.css` and surfaced through primitives in `src/components/ui/primitives.jsx` and `src/components/ui/layout-primitives.jsx`.

### 3.2 Findings

Findings are grouped by severity. Severity drives prioritization in Section 7.

#### Critical (blocks accessibility or correctness)

- **Card-as-button accessibility** in `Projects.jsx`, `ExperienceCard.jsx`, and `FeaturedHighlightsRail.jsx`: clickable cards are rendered as `div` and rely on `onClick` without `role="button"`, `tabIndex`, or `Enter`/`Space` handlers.
- **Modal focus management** in `ProjectDetailModal.jsx` and `ExperienceDetailModal.jsx`: focus is not trapped, the trigger element is not restored on close, and `Escape` handling is inconsistent.
- **Reduced motion gaps**: `ParticleBackground.jsx`, `GravityCursor.jsx`, and entrance animations driven by IntersectionObserver do not all gate on `prefers-reduced-motion: reduce`.
- **Heading hierarchy drift**: multiple pages render an `h1` inside `PageHeader` while a sibling section also emits an `h1`, breaking single-`h1`-per-document expectations.

#### High (degrades usability)

- **Mobile fork**: `MobileAllInOnePage` duplicates information architecture and creates a parallel layout that is not regression-tested against the desktop variant.
- **Focus-visible inconsistency**: focus rings appear strong on links but are suppressed or invisible on filter pills, search inputs, and toggle buttons.
- **Active-route signaling** in `Navbar.jsx` is visually subtle and not announced to assistive tech.
- **Anchor scroll offset**: hash navigation lands beneath the fixed header on direct entry to in-page anchors.

#### Medium (polish and consistency)

- Repeated inline styling for hover and pressed states across feature components instead of shared primitive variants.
- `LiveMetricsDashboard` competes with `FeaturedHighlightsRail` for the same "proof" slot on the homepage.
- Theme transitions briefly flash unstyled tokens on first paint when localStorage is hydrated post-mount.
- `LazyImage` lacks an explicit width/height or aspect-ratio reservation, causing CLS during load.

#### Low (nice to have)

- Decorative SVGs lack `aria-hidden="true"`.
- Some `Tag` usages render as `span` where `button` would be appropriate (filterable tags).
- The `/styleguide` route is not linked from the footer, making it hard to discover for contributors.

### 3.3 Quantitative Baseline

Baselines must be captured before any change ships. The metrics below are the canonical tracking set.

| Metric | Tool | Target |
| --- | --- | --- |
| Lighthouse Performance | Lighthouse CI, mobile preset | ≥ 90 |
| Lighthouse Accessibility | Lighthouse CI | ≥ 100 |
| Lighthouse Best Practices | Lighthouse CI | ≥ 95 |
| Lighthouse SEO | Lighthouse CI | ≥ 95 |
| Largest Contentful Paint | Web Vitals, p75 | ≤ 2.5s |
| Interaction to Next Paint | Web Vitals, p75 | ≤ 200ms |
| Cumulative Layout Shift | Web Vitals, p75 | ≤ 0.1 |
| axe-core violations | `@axe-core/playwright` | 0 serious, 0 critical |
| Keyboard reachability | Manual checklist | 100% of interactive elements |
| Bundle size (gzipped, initial) | `vite build` report | ≤ 180 KB |

---

## 4. Personas and Jobs To Be Done

The audience is narrow but high-intent. Designs must be optimized for fast evaluation, not casual browsing.

| Persona | Primary Job | Time Budget | Decision Criteria |
| --- | --- | --- | --- |
| Recruiter | Confirm fit for a role | 30–60 seconds | Role signal, current focus, contact path |
| Hiring manager | Assess depth and seniority | 2–5 minutes | Project complexity, impact metrics, system thinking |
| Technical peer | Gauge credibility and overlap | 3–10 minutes | Architecture, research, repos, problem complexity |
| Collaborator | Find a way to reach out | 1–2 minutes | Availability signal, contact channel, response expectation |

### 4.1 Top User Journeys

1. **Recruiter scan** — Land on `/`, read hero in ≤ 5 seconds, scan featured highlights, click contact or resume.
2. **Hiring manager evaluation** — Land on `/`, scan, deep-link into `/projects`, open a project modal, read impact, return to home, click contact.
3. **Peer technical review** — Land on `/`, jump to `/research` or `/profiles` (GitHub, Kaggle, LeetCode), inspect external proof.
4. **Direct deep-link** — Arrive from a shared link to `/projects#text-to-sql`, expect anchored scroll to land correctly under the fixed nav.

Each journey is the basis for a usability test scenario in Section 8.

---

## 5. Design Principles

These principles are enforced at code review time. They extend, not replace, the principles in `DESIGN_SYSTEM.md`.

1. **Proof over decoration.** Every visual element earns its space by communicating capability, recency, or trust.
2. **Hierarchy over symmetry.** Sections may differ in rhythm and density; uniform card grids are not a goal.
3. **One product across breakpoints.** The mobile experience uses the same routes, components, and data as desktop. No forks.
4. **Accessibility is a contract, not a pass.** Every interactive element ships with a label, a focus state, and a keyboard path.
5. **Motion serves comprehension.** If an animation does not aid understanding, it does not ship.
6. **Tokens, not hex codes.** Components reference semantic tokens; raw colors live only in `tokens.css`.
7. **Composable primitives.** Feature components compose `Button`, `Card`, `Stack`, `Grid`, `Heading`, never re-implement them.

---

## 6. Target Architecture

### 6.1 Information Architecture

Single canonical route tree, used on all breakpoints:

```
/                  Home (hero, proof bar, highlights, focus, featured projects, CTA)
/projects          Projects index, filters, search
/projects/:id      Project detail (replaces modal-only pattern; modal kept as overlay alt)
/experience        Timeline + detailed roles
/skills            Tech stack + relationships
/research          Publications and writing
/profiles          External proof aggregations (GitHub, Kaggle, LeetCode)
/styleguide        Design system reference (linked from footer)
```

### 6.2 Component Architecture

Three-layer hierarchy, enforced by lint and import boundaries:

- **Tokens** — `src/styles/tokens.css`. Only place raw colors, type scale, motion, spacing live.
- **Primitives** — `src/components/ui/`. `Button`, `Card`, `Tag`, `Heading`, `Lead`, `Stack`, `Cluster`, `Grid`, `Badge`, `HighlightCard`, `ListItem`, `StatusDot`. No business logic.
- **Features** — `src/components/`. Compose primitives; own data binding; no inline styling beyond layout escape hatches.

### 6.3 Mobile Strategy

Retire `MobileAllInOnePage`. Replace with a single responsive `HomePage` that:

- Uses CSS container queries (`@container`) for component-level responsiveness where supported, falling back to viewport breakpoints.
- Routes the same components through a `useIsMobile` hook only for genuinely different behaviors (e.g., bottom-sheet vs. dialog), never for parallel content.
- Treats touch targets as a first-class constraint: minimum 44×44 CSS pixels.

### 6.4 Theming

- Default to `data-theme="dark"`; resolve light/dark from `prefers-color-scheme` on first paint with an inline script in `index.html` to prevent FOUC.
- Persist override to `localStorage` and re-apply synchronously before React hydration.
- Theme transitions limited to `color` and `background-color` over 240ms; no transition on `box-shadow` or `transform`.

---

## 7. Phased Delivery

Each phase ends with a demoable preview branch and a manual QA pass. No phase ships without lint, build, and the automated checks in Section 9 passing.

### Phase 0 — Discovery and Baseline

Deliverables:

- Annotated screenshots of every route in light and dark mode at 320, 768, 1024, 1440 px widths.
- Recorded baseline of the metrics in Section 3.3.
- A Figma board (or equivalent) with the inventory of components and their current variants.
- Stakeholder review of this plan and sign-off on goals.

Exit criteria: baseline numbers committed to `docs/baseline.md`; goals signed off.

### Phase 1 — Foundation Hardening

Scope:

- Add `<SkipLink>` (already present at `src/components/SkipLink.jsx`) verification and ensure it is the first focusable element.
- Strengthen global `:focus-visible` ring tokens; remove ad-hoc focus suppressors.
- Inline theme-resolution script in `index.html` to eliminate first-paint flash.
- Audit semantic landmarks (`header`, `nav`, `main`, `footer`) and heading hierarchy on every page.
- Centralize anchor-scroll offset in a single `useAnchorScroll` hook so the fixed navbar height is honored on direct entry and route change.

Exit criteria: zero axe-core serious or critical issues on the homepage; keyboard tab order matches visual order on every page.

### Phase 2 — Navigation and Hero

Scope:

- Refactor `Navbar.jsx` so the active route is announced via `aria-current="page"` and is visually prominent.
- Rebuild the mobile menu using a focus-trapped dialog pattern with `Escape` and outside-click dismiss.
- Rework `Hero.jsx` to a one-screen layout at every breakpoint. Primary CTA contrasts; secondary CTA uses the `ghost` variant.
- Tune anchored scroll behavior; confirm direct deep-link to `/projects#id` lands correctly.

Exit criteria: keyboard-only user can open the mobile menu, tab through all items, activate one, and have focus restored on close.

### Phase 3 — Section Hierarchy and Proof

Scope:

- Replace `LiveMetricsDashboard` prominence on the homepage with `FeaturedHighlightsRail` as the primary proof device.
- Add `ProofBar` below the hero with five high-trust external destinations.
- Add `ArchitectureSnapshotCard` to communicate systems thinking.
- Add `CurrentFocus` block under the hero to signal recency.
- Standardize section spacing using a single `<Section>` primitive with consistent vertical rhythm.

Exit criteria: a recruiter can identify role, focus, and primary proof in the first viewport on mobile and desktop.

### Phase 4 — Projects Experience

Scope:

- Convert project cards to real `<button>` elements where they trigger detail views, or wrap content in `<a>` to a real `/projects/:id` route.
- Implement focus trap and focus restoration in `ProjectDetailModal.jsx` (consider switching to native `<dialog>` with the polyfill removed for modern browsers).
- Make filter pills keyboard-operable with `aria-pressed`; expose live counts via `aria-live="polite"`.
- Give the search input a programmatic label and an empty-state message that is announced.

Exit criteria: a keyboard-only user can filter, search, open a project, read it, and close it without using a pointer.

### Phase 5 — Mobile Unification

Scope:

- Decommission `MobileAllInOnePage` after confirming feature parity in the unified responsive layout.
- Audit each page at 320, 360, 390, 414, 768 px widths.
- Replace `useIsMobile` viewport branching with container queries for components that benefit from layout-driven responsiveness.

Exit criteria: a single home route renders cleanly at all target widths; `MobileAllInOnePage` removed from the route table; no regressions in QA.

### Phase 6 — Motion, Atmosphere, and Performance

Scope:

- Gate `ParticleBackground`, `GravityCursor`, and entrance animations behind `prefers-reduced-motion: no-preference`.
- Reserve image dimensions in `LazyImage` to eliminate CLS.
- Code-split route components and lazy-load below-the-fold widgets.
- Inline critical CSS for the hero; defer the rest.

Exit criteria: CLS ≤ 0.1, LCP ≤ 2.5s on a throttled 4G profile.

### Phase 7 — Validation and Launch

Scope:

- Run usability tests per Section 8.
- Triage findings; ship critical and high-severity fixes inside the launch window.
- Run the full automated suite in Section 9.
- Update `README.md`, `DESIGN_SYSTEM.md`, and the `/styleguide` route to reflect the final system.

Exit criteria: all targets in Section 3.3 met; usability test severity-1 and severity-2 findings resolved; launch checklist signed.

---

## 8. Research and User Testing

### 8.1 Generative Research (Phase 0)

- Five 30-minute interviews: two recruiters, two hiring managers, one peer engineer.
- Script focuses on what they look for in a portfolio in the first 30 seconds and what makes them lose trust.
- Output: a short findings document and three updated job-to-be-done statements.

### 8.2 Wireframing and Prototyping (Phase 1–3)

- Low-fidelity wireframes for the hero, homepage proof stack, and project detail at three breakpoints. Reviewed internally before pixel work.
- High-fidelity prototypes built directly in code using existing primitives. The `/styleguide` route is the source of truth.
- Each new component lands in `/styleguide` before it lands on a feature page.

### 8.3 Usability Testing (Phase 7)

- Five moderated remote sessions, 30 minutes each, two recruiters and three engineers, balanced across mobile and desktop.
- Tasks map to the journeys in Section 4.1:
  1. "In 30 seconds, tell me what this person does and how to contact them."
  2. "Find the project most relevant to a senior backend role and read its impact."
  3. "Open the project detail and return to where you started, using only your keyboard."
  4. "On your phone, find the most recent thing they are working on."
- Severity rubric: 1 (blocker), 2 (frustration), 3 (polish), 4 (preference). Severity 1 and 2 must be resolved before launch.

### 8.4 Continuous Validation

- A lightweight feedback link in the footer routes to a Formspree (or equivalent) endpoint.
- Web Vitals reported via `web-vitals` to a console-only sink in development and to Vercel Analytics in production.

---

## 9. Accessibility Strategy

Targeting **WCAG 2.2 AA** as the contractual baseline.

### 9.1 Standards

- Color contrast: 4.5:1 body, 3:1 large text, both themes. Verified in `tokens.css` via documented contrast ratios.
- Keyboard: every interactive element reachable, operable, and visible on focus.
- Screen reader: meaningful names on icon-only buttons, accurate landmark structure, no skipped heading levels.
- Motion: all non-essential animation gated on `prefers-reduced-motion: no-preference`.
- Forms: programmatic labels, error association via `aria-describedby`, status updates via `aria-live`.

### 9.2 Tooling

- `eslint-plugin-jsx-a11y` set to error level on lint.
- `@axe-core/react` injected in development builds for runtime warnings.
- `@axe-core/playwright` runs in CI against the homepage, projects index, and project detail.
- Manual audits with VoiceOver + Safari and NVDA + Firefox at minimum.

### 9.3 Patterns Catalog

Documented in `/styleguide` and referenced from this plan:

- Card-as-link vs. card-as-button decision tree.
- Modal/dialog focus management recipe.
- Filter pill toggle with `aria-pressed`.
- Live region usage for search result counts.
- Skip-link placement and styling.

---

## 10. Responsive Design Strategy

### 10.1 Breakpoints

Aligned to the existing token scale, expressed as min-width queries:

| Token | Width | Use |
| --- | --- | --- |
| `sm` | 640px | Two-column stacks where helpful |
| `md` | 768px | Tablet layouts, side-by-side hero |
| `lg` | 1024px | Desktop navigation, three-column grids |
| `xl` | 1280px | Wide layouts, project detail two-pane |

### 10.2 Techniques

- **Container queries** for components whose layout depends on their parent, not the viewport (cards, list items, project tiles).
- **Fluid type and spacing** via `clamp()` already established in `tokens.css`. Extend to gap and section padding.
- **Logical properties** (`padding-inline`, `margin-block`) to make future i18n cheaper.
- **Touch targets** minimum 44×44 CSS pixels for any tap target.

### 10.3 Image Strategy

- Use `srcset` and `sizes` for the hero and project thumbnails.
- Reserve dimensions in `LazyImage` to remove CLS.
- Serve modern formats (AVIF, WebP) with PNG/JPG fallbacks.

---

## 11. Performance Strategy

### 11.1 Loading

- Route-level code splitting via `React.lazy` and `Suspense` (already partially in place; extend coverage).
- Lazy-load below-the-fold widgets (`InteractiveTimeline`, `KaggleHeatmap`, `TechStackVisualization`).
- Preload the hero image and the primary font via `<link rel="preload">`.
- Inline critical CSS for above-the-fold rendering; defer the rest.

### 11.2 Runtime

- Memoize expensive list rendering in `Projects.jsx` with `useMemo`.
- Replace `IntersectionObserver` per-component with a single shared observer via a hook.
- Debounce search input changes; avoid layout-thrashing reads in scroll handlers.

### 11.3 Budgets

| Asset | Budget |
| --- | --- |
| Initial JS, gzipped | ≤ 180 KB |
| Initial CSS, gzipped | ≤ 30 KB |
| Hero image | ≤ 120 KB AVIF |
| LCP element | First viewport, no JS gating |

Budgets are enforced via `vite-plugin-bundle-analyzer` in CI; regressions fail the build.

---

## 12. Scalability and Future-Proofing

### 12.1 Content

- Project, experience, research, and post data live in `src/data.js`. Plan to migrate each to a discrete file under `src/content/` so contributors can add a project without re-reading the whole module.
- A typed schema (using Zod or PropTypes) per content type catches malformed entries at build time.

### 12.2 Code

- Enforce import boundaries: features may import primitives; primitives may not import features.
- All new components are added to `/styleguide` first.
- Lint rules: `jsx-a11y/recommended`, `react/jsx-no-leaked-render`, custom rule disallowing raw color literals outside `tokens.css`.

### 12.3 Internationalization-Ready

- Use logical CSS properties.
- Extract user-visible strings to a single module so future translation is mechanical.
- Avoid hard-coded English in `aria-label` attributes scattered through components.

### 12.4 New Capabilities Without Rework

The architecture is designed to accept the following without re-design:

- A `/writing` route with MDX posts.
- A `/talks` route reusing the project card primitive.
- A self-hosted contact form once a backend is introduced.
- A second locale.

---

## 13. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Over-polish weakens the existing understated tone | Brand drift | Hold copy and palette stable; review changes against Section 5 principles |
| Mobile unification breaks parity in production | Regression | Phase 5 ships behind a feature flag; staged rollout |
| Modal focus changes break existing flows | Critical UX | Use the native `<dialog>` element with a tested polyfill; full keyboard QA pass |
| Performance budget exceeded by atmosphere effects | Slower LCP | Atmosphere components are reduced-motion-gated and lazy-loaded |
| Scope creep from "while we're in there" rewrites | Delay | Each phase has explicit exit criteria; out-of-scope items are filed for a follow-up |

---

## 14. Acceptance and Definition of Done

The overhaul is complete when:

- All metrics in Section 3.3 meet target.
- Every page passes axe-core with zero serious or critical violations.
- Every interactive element on the homepage, projects index, and project detail is reachable, operable, and visibly focused via keyboard.
- `MobileAllInOnePage` is removed and a single responsive layout serves all breakpoints.
- `/styleguide` documents every primitive in use.
- `npm run lint` and `npm run build` pass.
- Usability findings at severity 1 and 2 are resolved.
- This document, `DESIGN_SYSTEM.md`, and `README.md` are updated to reflect the final system.

---

## 15. Appendix — Working Files

Primary files expected to change during the overhaul:

- `src/App.jsx`
- `src/layouts/MainLayout.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/ProjectsPage.jsx`
- `src/components/Navbar.jsx`
- `src/components/Hero.jsx`
- `src/components/ProjectDetailModal.jsx`
- `src/components/ExperienceDetailModal.jsx`
- `src/components/Projects.jsx`
- `src/components/FeaturedHighlightsRail.jsx`
- `src/components/ProofBar.jsx`
- `src/components/ArchitectureSnapshotCard.jsx`
- `src/components/CurrentFocus.jsx`
- `src/components/AvailabilityCtaPanel.jsx`
- `src/components/ParticleBackground.jsx`
- `src/components/LazyImage.jsx`
- `src/components/SkipLink.jsx`
- `src/components/ui/primitives.jsx`
- `src/components/ui/layout-primitives.jsx`
- `src/styles/tokens.css`
- `src/index.css`
- `index.html`

Files expected to be removed:

- `src/pages/MobileAllInOnePage.jsx` (after Phase 5 verification)
