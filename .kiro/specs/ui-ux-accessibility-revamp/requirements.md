# Requirements Document

## Introduction

This document defines the requirements for the UI/UX Accessibility Revamp of the React portfolio application. The revamp transforms the site from an engineer-built portfolio into a deliberately refined product experience across six phases: global accessibility foundation, navigation and hero polish, section and content restructuring, projects accessibility, trust and CTA layer, and React cleanup. All requirements preserve existing content, brand tone, and static deployment model while making the site fully keyboard-operable, screen-reader friendly, and visually consistent across desktop and mobile.

## Glossary

- **SkipLink**: A visually hidden anchor element rendered as the first child of the page body that allows keyboard users to bypass navigation and jump directly to the main content area.
- **MainLayout**: The shared shell component wrapping all routes, containing Navbar, the page Outlet, and Footer.
- **FeaturedHighlightsRail**: A new component replacing `LiveMetricsDashboard` as the primary proof section on `HomePage`, surfacing 3–5 high-signal proof points as scannable cards.
- **ProofBar**: A minimal horizontal navigation bar providing fast access to high-trust external profiles (GitHub, Kaggle, LeetCode, LinkedIn, Research, Resume).
- **ArchitectureSnapshotCard**: A new component visualizing a representative AI system pipeline as a horizontal flow diagram.
- **CurrentFocus**: A new component communicating what is currently being researched, built, or optimized.
- **AvailabilityCtaPanel**: A new end-of-page section communicating current availability, collaboration interest, and best next actions.
- **ParticleBackground**: A subtle ambient canvas layer rendered behind page content.
- **FilterBar**: The search and filter controls on `ProjectsPage`.
- **ProjectCard**: An individual project entry in the projects grid that opens a detail modal on activation.
- **ProjectModal**: The detail dialog opened when a ProjectCard is activated.
- **sr-only**: A CSS utility class that visually hides an element while keeping it accessible to screen readers.
- **focus-visible**: A CSS pseudo-class that applies focus styles only when focus is reached via keyboard or equivalent non-pointer input.
- **aria-current**: An ARIA attribute indicating the current item within a set, used on the active navigation link with value `"page"`.
- **aria-expanded**: An ARIA attribute indicating whether a collapsible element is currently expanded or collapsed.
- **aria-pressed**: An ARIA attribute indicating the pressed state of a toggle button.
- **prefers-reduced-motion**: A CSS media feature and browser API that reflects the user's preference to minimize non-essential motion.
- **Highlight**: A data record representing a single proof point in the FeaturedHighlightsRail (id, icon, category, headline, subtext, optional metric, optional link).
- **ProofLink**: A data record representing a single entry in the ProofBar (label, href, optional sublabel, optional icon).
- **PipelineStage**: A data record representing one stage in the ArchitectureSnapshotCard pipeline (id, label, icon, optional detail).
- **AvailabilityStatus**: A data record describing current availability state, status label, description, and an array of CTA actions.
- **FocusItem**: A data record representing one entry in the CurrentFocus component (area, description, optional tags).

---

## Requirements

### Requirement 1: Skip Link and Main Landmark

**User Story:** As a keyboard user, I want to skip past the navigation and jump directly to the main content, so that I can reach the page content without tabbing through every navigation item on every page load.

#### Acceptance Criteria

1. THE SkipLink SHALL render as the first focusable child of the page body via `MainLayout`.
2. WHILE the SkipLink does not have focus, THE SkipLink SHALL remain visually hidden (positioned off-screen).
3. WHEN the SkipLink receives keyboard focus, THE SkipLink SHALL become visible at the top of the viewport.
4. WHEN the SkipLink is activated via Enter or Space, THE SkipLink SHALL move browser focus to the element with `id="main-content"`.
5. THE MainLayout SHALL render a `<main>` element with `id="main-content"` as the skip link target.
6. THE MainLayout SHALL render a `<header>` element with `role="banner"` wrapping the Navbar.
7. THE MainLayout SHALL render a `<footer>` element with `role="contentinfo"`.
8. THE Navbar SHALL wrap navigation links in a `<nav>` element with `aria-label="Main navigation"`.

---

### Requirement 2: Global Focus Styles and CSS Tokens

**User Story:** As a keyboard user, I want to see a clear focus indicator on every interactive element, so that I always know which element is currently focused regardless of the active theme.

#### Acceptance Criteria

1. THE index.css SHALL define a `:focus-visible` rule applying `outline: var(--focus-ring)` and `outline-offset: var(--focus-ring-offset)` to all elements.
2. THE index.css SHALL define CSS custom properties `--focus-ring`, `--focus-ring-offset`, and `--focus-ring-radius` on `:root`.
3. THE index.css SHALL define CSS custom properties `--interactive-hover-bg`, `--interactive-active-bg`, `--border-strong`, `--border-interactive`, `--particle-opacity`, and `--particle-color` on `:root`.
4. THE index.css SHALL override `--border-strong` and `--particle-opacity` in the light theme selector to maintain sufficient contrast.
5. THE index.css SHALL define a `:focus:not(:focus-visible)` rule removing the default outline to avoid double focus rings for pointer users.
6. THE index.css SHALL define a `.sr-only` utility class that visually hides content while keeping it accessible to screen readers.
7. THE index.css SHALL define `.btn`, `.btn--primary`, and `.btn--ghost` utility classes providing consistent button styling.
8. THE index.css SHALL define an `.interactive-card` utility class providing consistent hover and focus-visible lift behavior.
9. THE index.css SHALL define a `.status-dot` utility class and a `.status-dot--pulse` variant gated on `prefers-reduced-motion: no-preference`.

---

### Requirement 3: Heading Hierarchy

**User Story:** As a screen reader user, I want the page heading structure to follow a logical hierarchy, so that I can navigate sections predictably using heading shortcuts.

#### Acceptance Criteria

1. THE Hero component SHALL render the portfolio owner's name as an `<h1>` element — the sole `<h1>` per page.
2. WHEN a page section renders a title, THE Section component SHALL render it as an `<h2>` element.
3. WHEN a card within a section renders a title, THE card component SHALL render it as an `<h3>` element.
4. THE page SHALL NOT skip heading levels (e.g., jumping from `<h1>` to `<h3>` without an intervening `<h2>`).

---

### Requirement 4: Navigation Accessibility

**User Story:** As a keyboard and screen reader user, I want the navigation to clearly communicate the current page and allow me to operate the mobile menu without a mouse, so that I can navigate the site fully without pointer input.

#### Acceptance Criteria

1. WHEN the mobile menu is closed, THE Navbar mobile toggle button SHALL have `aria-expanded="false"`.
2. WHEN the mobile menu is open, THE Navbar mobile toggle button SHALL have `aria-expanded="true"`.
3. THE Navbar mobile toggle button SHALL have an `aria-controls` attribute whose value matches the `id` of the mobile menu panel element.
4. THE mobile menu panel SHALL have a `role="list"` and `aria-label="Navigation links"`.
5. WHEN a NavLink corresponds to the currently active route, THE Navbar SHALL set `aria-current="page"` on that NavLink.
6. WHEN a NavLink does not correspond to the currently active route, THE Navbar SHALL NOT set `aria-current` on that NavLink.
7. THE active NavLink SHALL render with a background pill style using `color-mix(in srgb, var(--accent) 10%, transparent)` to provide a visible active indicator beyond the dot alone.
8. THE index.css SHALL define a `--navbar-height` CSS custom property used as the value for `scroll-margin-top` on `section[id]` elements.

---

### Requirement 5: Hero Hierarchy and Reduced Motion

**User Story:** As a visitor, I want the hero section to immediately communicate who this portfolio belongs to, what they do, and what I should do next, so that I can decide within seconds whether to explore further.

#### Acceptance Criteria

1. THE Hero component SHALL render the portfolio owner's name as an `<h1>` element.
2. THE Hero component SHALL render a primary CTA as a styled anchor or button using the `.btn--primary` class.
3. THE Hero component SHALL render a secondary CTA as a styled anchor or button using the `.btn--ghost` class.
4. THE Hero component SHALL render the hero photo `<img>` with a descriptive `alt` attribute that includes the owner's name and role (e.g., "Himanshu Nakrani, Generative AI Engineer").
5. WHEN `prefers-reduced-motion: no-preference` applies, THE Hero component SHALL animate `.hero-stat` elements using the `fadeInUp` keyframe.
6. WHEN `prefers-reduced-motion: reduce` applies, THE Hero component SHALL render `.hero-stat` elements with `opacity: 1` and `transform: none` without animation.

---

### Requirement 6: HomePage Composition

**User Story:** As a desktop visitor, I want the home page to present a clear, high-signal narrative flow from introduction through proof points to a closing call to action, so that I can quickly assess the portfolio owner's value and decide to reach out.

#### Acceptance Criteria

1. THE HomePage SHALL render components in the following order: Hero, ProofBar, FeaturedHighlightsRail, ArchitectureSnapshotCard, CurrentFocus, TechStack, AvailabilityCtaPanel, Contact.
2. THE HomePage SHALL NOT render `LiveMetricsDashboard` as a primary section.
3. THE MobileAllInOnePage SHALL render the same new components (ProofBar, FeaturedHighlightsRail, ArchitectureSnapshotCard, CurrentFocus, AvailabilityCtaPanel) in the same relative order as `HomePage`.

---

### Requirement 7: FeaturedHighlightsRail

**User Story:** As a recruiter or hiring manager, I want to see a scannable set of high-signal proof points near the top of the home page, so that I can quickly understand the portfolio owner's most significant achievements without reading dense paragraphs.

#### Acceptance Criteria

1. THE FeaturedHighlightsRail SHALL accept a `highlights` prop of type `Highlight[]` and render one `<article>` element per highlight.
2. THE FeaturedHighlightsRail SHALL render the section as a `<section>` element with `aria-label="Featured highlights"`.
3. WHEN a highlight has a `link` property, THE FeaturedHighlightsRail SHALL wrap the card in an `<a>` element with `target="_blank"`, `rel="noopener"`, and an `aria-label` containing the headline and the text "(opens in new tab)".
4. WHEN a highlight has a `metric` property, THE FeaturedHighlightsRail SHALL render the metric value visually distinct within the card footer.
5. THE FeaturedHighlightsRail SHALL render as a CSS grid with `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` on viewports wider than 640px.
6. WHEN the viewport is 640px or narrower, THE FeaturedHighlightsRail SHALL render as a horizontally scrollable flex container with `scroll-snap-type: x mandatory`.
7. THE `featuredHighlights` data array SHALL be defined in `src/data.js` and imported by `FeaturedHighlightsRail`.

---

### Requirement 8: ProofBar

**User Story:** As a visitor, I want fast access to the portfolio owner's external profiles and proof points in a clean, minimal bar, so that I can quickly verify credentials without hunting through the page.

#### Acceptance Criteria

1. THE ProofBar SHALL accept a `links` prop of type `ProofLink[]` and render one `<a>` element per link.
2. THE ProofBar SHALL render as a `<nav>` element with `aria-label="External profiles and proof links"`.
3. WHEN a ProofLink has a `sublabel` property, THE ProofBar SHALL include the sublabel in the `<a>` element's `aria-label` in the format `"{label}, {sublabel}"`.
4. WHEN a ProofLink does not have a `sublabel` property, THE ProofBar SHALL use only the `label` as the accessible name.
5. THE ProofBar SHALL render visual separator elements between links with `aria-hidden="true"`.
6. ALL ProofBar `<a>` elements SHALL have `target="_blank"` and `rel="noopener noreferrer"` for external links.
7. THE `proofLinks` data array SHALL be defined in `src/data.js` and imported by `ProofBar`.

---

### Requirement 9: ArchitectureSnapshotCard

**User Story:** As a technical reviewer, I want to see a visual representation of a production AI pipeline, so that I can quickly assess the portfolio owner's systems thinking and architectural depth.

#### Acceptance Criteria

1. THE ArchitectureSnapshotCard SHALL accept a `pipeline` prop of type `ArchitecturePipeline` and render one stage element per entry in `pipeline.stages`.
2. THE ArchitectureSnapshotCard SHALL render as a `<section>` element with `aria-label` set to `"Architecture snapshot: {pipeline.title}"`.
3. WHEN a stage has a `detail` property, THE ArchitectureSnapshotCard SHALL render each stage element with `role="img"` and `aria-label="{stage.label}: {stage.detail}"`.
4. WHEN `prefers-reduced-motion: no-preference` applies, THE ArchitectureSnapshotCard SHALL animate connector elements using the `drawIn` CSS keyframe.
5. WHEN `prefers-reduced-motion: reduce` applies, THE ArchitectureSnapshotCard SHALL render connector elements without animation.
6. THE `architecturePipeline` data object SHALL be defined in `src/data.js` and imported by `ArchitectureSnapshotCard`.

---

### Requirement 10: CurrentFocus

**User Story:** As a visitor, I want to see what the portfolio owner is currently researching, building, and optimizing, so that I can assess their current technical direction and engagement with the field.

#### Acceptance Criteria

1. THE CurrentFocus component SHALL accept an `items` prop of type `FocusItem[]` and render one entry per item.
2. WHEN a FocusItem is rendered, THE CurrentFocus component SHALL display the `area` label (e.g., "Researching", "Building", "Optimizing") as a visible heading or label for that entry.
3. WHEN a FocusItem has a `tags` array, THE CurrentFocus component SHALL render each tag as a visible chip or badge.
4. WHEN a `lastUpdated` prop is provided, THE CurrentFocus component SHALL render it as supplementary text (e.g., "Updated June 2025").
5. THE `currentFocusItems` data array SHALL be defined in `src/data.js` and imported by `CurrentFocus`.

---

### Requirement 11: Projects FilterBar Accessibility

**User Story:** As a keyboard user, I want to search and filter projects without a mouse, so that I can find relevant projects using only keyboard input.

#### Acceptance Criteria

1. THE FilterBar SHALL render a `<label>` element with `htmlFor="project-search"` and the `.sr-only` class providing an accessible name for the search input.
2. THE FilterBar search input SHALL have `id="project-search"`, `type="search"`, and `aria-label="Search projects"`.
3. THE FilterBar SHALL render a result count element with `id="project-count"`, `aria-live="polite"`, and `aria-atomic="true"` displaying the count in the format `"{resultCount} of {totalCount} projects"`.
4. THE FilterBar search input SHALL have `aria-describedby="project-count"` linking it to the live result count.
5. THE FilterBar SHALL wrap status filter buttons in a `<fieldset>` with a `<legend>` using the `.sr-only` class containing "Filter by status".
6. WHEN a status filter button is the active filter, THE FilterBar SHALL set `aria-pressed="true"` on that button.
7. WHEN a status filter button is not the active filter, THE FilterBar SHALL set `aria-pressed="false"` on that button.
8. THE FilterBar SHALL wrap the search and filter controls in a `<div>` with `role="search"` and `aria-label="Filter and search projects"`.
9. WHEN the search query or active filter changes, THE filtered result count SHALL always be less than or equal to the total project count.

---

### Requirement 12: ProjectCard Keyboard Operability

**User Story:** As a keyboard user, I want to open project detail views without a mouse, so that I can explore project details using only keyboard input.

#### Acceptance Criteria

1. THE ProjectCard SHALL have `tabIndex={0}` making it reachable via keyboard Tab navigation.
2. THE ProjectCard SHALL have `role="button"` or equivalent button semantics.
3. THE ProjectCard SHALL have `aria-label` set to `"View details for {project.title}"`.
4. WHEN the ProjectCard has focus and the Enter key is pressed, THE ProjectCard SHALL invoke the `onClick` handler.
5. WHEN the ProjectCard has focus and the Space key is pressed, THE ProjectCard SHALL invoke the `onClick` handler and prevent default scroll behavior.

---

### Requirement 13: ProjectModal Focus Management

**User Story:** As a keyboard user, I want the project detail modal to manage focus correctly when it opens and closes, so that I can navigate modal content and return to my previous position without losing my place.

#### Acceptance Criteria

1. WHEN a ProjectModal opens, THE ProjectModal SHALL move focus to the modal container element via `requestAnimationFrame` after render.
2. WHEN a ProjectModal closes, THE ProjectModal SHALL return focus to the ProjectCard that triggered the modal open.
3. WHILE a ProjectModal is open and the Tab key is pressed, THE ProjectModal SHALL keep focus within the modal's focusable elements (focus trap).
4. WHILE a ProjectModal is open and Shift+Tab is pressed on the first focusable element, THE ProjectModal SHALL move focus to the last focusable element.
5. WHEN the Escape key is pressed while a ProjectModal is open, THE ProjectModal SHALL close the modal.
6. THE ProjectModal SHALL have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the modal title element's `id`.
7. THE ProjectModal title SHALL be rendered as an `<h2>` element with `id="modal-title"`.
8. THE ProjectModal SHALL render a close button with `aria-label="Close dialog"`.
9. IF a null or undefined project is passed to the modal open handler, THEN THE ProjectModal SHALL perform no action and not render a broken modal.

---

### Requirement 14: AvailabilityCtaPanel

**User Story:** As a recruiter or potential collaborator, I want to see a clear availability status and direct contact options at the end of the page, so that I know whether the portfolio owner is open to opportunities and how to reach them.

#### Acceptance Criteria

1. THE AvailabilityCtaPanel SHALL accept a `status` prop of type `AvailabilityStatus` and render the panel.
2. THE AvailabilityCtaPanel SHALL render as a `<section>` element with `aria-label="Availability and contact"`.
3. THE AvailabilityCtaPanel SHALL render a status badge as a `<span>` with `role="status"` and `aria-label="Availability: {status.statusLabel}"`.
4. THE AvailabilityCtaPanel SHALL render one action element per entry in `status.actions`.
5. WHEN an action has `variant: 'primary'`, THE AvailabilityCtaPanel SHALL apply the `.btn--primary` class to that action element.
6. WHEN an action has `variant: 'ghost'`, THE AvailabilityCtaPanel SHALL apply the `.btn--ghost` class to that action element.
7. THE AvailabilityCtaPanel SHALL render CTA action elements within a `<div>` with `role="group"` and `aria-label="Contact options"`.
8. THE `availabilityStatus` data object SHALL be defined in `src/data.js` and imported by `AvailabilityCtaPanel`.

---

### Requirement 15: ParticleBackground

**User Story:** As a visitor, I want a subtle ambient visual layer behind the page content, so that the site feels atmospheric and polished without distracting from the content or degrading performance.

#### Acceptance Criteria

1. THE ParticleBackground SHALL render a `<canvas>` element with `aria-hidden="true"` and `role="presentation"`.
2. THE ParticleBackground canvas SHALL have `pointer-events: none` so it never intercepts user interactions.
3. WHEN `prefers-reduced-motion: reduce` applies, THE ParticleBackground SHALL not initialize the canvas animation loop and SHALL render nothing.
4. IF the canvas 2D context is unavailable, THEN THE ParticleBackground SHALL degrade gracefully without throwing an error.
5. WHILE the ParticleBackground is mounted, THE ParticleBackground SHALL use `requestAnimationFrame` for the animation loop and cancel it via `cancelAnimationFrame` on unmount.
6. WHEN the viewport matches the mobile breakpoint, THE ParticleBackground SHALL cap the particle count at 25.
7. WHEN the viewport is desktop, THE ParticleBackground SHALL use the default particle count (40 unless overridden by the `count` prop).
8. THE ParticleBackground canvas SHALL be positioned `fixed` with `z-index: 0` behind the `#root` element.

---

### Requirement 16: React Cleanup and Theme Consolidation

**User Story:** As a developer maintaining this codebase, I want the React implementation to be clean, lint-free, and free of redundant DOM mutations, so that the code is easy to understand and extend.

#### Acceptance Criteria

1. THE App component SHALL set the `data-theme` attribute on `document.documentElement` exclusively within a `useLayoutEffect` hook that depends on the `isDark` state.
2. THE `handleThemeChange` function in App SHALL only call `setIsDark` and SHALL NOT directly call `document.documentElement.setAttribute`.
3. THE Contact component SHALL use CSS class-based hover styles instead of inline `onMouseEnter`/`onMouseLeave` handlers that mutate element styles directly.
4. WHEN `npm run lint` is executed from `portfolio-react/`, THE linter SHALL report zero errors.
5. WHEN `npm run build` is executed from `portfolio-react/`, THE build SHALL complete successfully with no errors.
6. THE `LiveMetricsDashboard` component SHALL remain available and rendered on `ProfilesPage`.
