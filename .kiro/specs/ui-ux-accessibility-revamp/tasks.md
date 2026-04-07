# Implementation Plan: UI/UX Accessibility Revamp

## Overview

Six-phase implementation transforming the React portfolio into a fully accessible, keyboard-operable, screen-reader-friendly product experience. Phases build on each other: global CSS foundation first, then navigation/hero, then new home page components, then projects accessibility, then the trust/CTA layer, and finally React cleanup.

All code is React 19 JSX with plain CSS, framer-motion, and lucide-react. Tests use Vitest + fast-check.

## Tasks

- [x] 1. Phase 1 — Global CSS Foundation
  - [x] 1.1 Extend `src/index.css` with new CSS custom properties and utility classes
    - Add `--focus-ring`, `--focus-ring-offset`, `--focus-ring-radius`, `--interactive-hover-bg`, `--interactive-active-bg`, `--border-strong`, `--border-interactive`, `--particle-opacity`, `--particle-color` to `:root`
    - Override `--border-strong` and `--particle-opacity` in the light theme selector
    - Add `--navbar-height: 76px` to `:root`; add `@media (max-width: 768px)` override to `72px`
    - Add `section[id] { scroll-margin-top: var(--navbar-height); }`
    - Add `:focus-visible` rule with `outline: var(--focus-ring)` and `outline-offset: var(--focus-ring-offset)`
    - Add `:focus:not(:focus-visible) { outline: none; }` to suppress double rings for pointer users
    - Add `.sr-only` utility class
    - Add `.btn`, `.btn--primary`, `.btn--ghost` utility classes
    - Add `.interactive-card` utility class with hover and focus-visible lift behavior
    - Add `.status-dot` and `.status-dot--pulse` (pulse animation gated on `prefers-reduced-motion: no-preference`)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 4.8_

  - [x] 1.2 Create `src/components/SkipLink.jsx`
    - Render an `<a href="#main-content">Skip to content</a>` as the first focusable element
    - Apply `.skip-link` CSS: `position: absolute; top: -100%` at rest, `top: 0` on `:focus`
    - Accept `targetId` prop (default `"main-content"`)
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 1.3 Update `src/layouts/MainLayout.jsx` with semantic landmarks
    - Import and render `<SkipLink targetId="main-content" />` as the first child
    - Wrap Navbar in `<header role="banner">`
    - Add `id="main-content"` to the existing `<main>` element
    - Add `role="contentinfo"` to the existing `<footer>` element
    - Import and render `<ParticleBackground />` (stub import — component created in Phase 5)
    - _Requirements: 1.1, 1.5, 1.6, 1.7_

  - [ ]* 1.4 Write unit tests for SkipLink
    - Test that SkipLink renders with `href="#main-content"`
    - Test that SkipLink is the first focusable element in the DOM
    - _Requirements: 1.1, 1.4_

- [x] 2. Phase 2 — Navigation and Hero Accessibility
  - [x] 2.1 Update `src/components/Navbar.jsx` for full keyboard and screen-reader support
    - Add `aria-expanded={open}` to the mobile toggle button
    - Add `aria-controls="mobile-nav-menu"` to the mobile toggle button
    - Add `id="mobile-nav-menu"` to the mobile menu panel element
    - Add `role="list"` and `aria-label="Navigation links"` to the mobile menu `<ul>`
    - Wrap desktop nav links in `<nav aria-label="Main navigation">`
    - Add `aria-current={isActive ? 'page' : undefined}` to each `NavLink`
    - Apply active pill background style: `color-mix(in srgb, var(--accent) 10%, transparent)` with `border-radius: 9999px; padding: 4px 12px`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 1.8_

  - [ ]* 2.2 Write property test for Navbar ARIA state
    - **Property 2: Navbar ARIA state reflects menu open/closed**
    - **Validates: Requirements 4.1, 4.2, 4.5, 4.6**

  - [x] 2.3 Update `src/components/Hero.jsx` for heading hierarchy, CTAs, and reduced motion
    - Ensure the owner's name renders as `<h1>` (sole h1 on the page)
    - Add primary CTA anchor/button using `.btn--primary` class
    - Add secondary CTA anchor/button using `.btn--ghost` class
    - Update hero photo `alt` to `"Himanshu Nakrani, Generative AI Engineer"`
    - Move `.hero-stat` `fadeInUp` animation into `@media (prefers-reduced-motion: no-preference)` block
    - Add `@media (prefers-reduced-motion: reduce) { .hero-stat { opacity: 1; transform: none; } }`
    - _Requirements: 3.1, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 2.4 Write unit tests for Hero reduced-motion behavior
    - Test that `.hero-stat` has `opacity: 1` and no animation when reduced-motion is set
    - _Requirements: 5.5, 5.6_

- [x] 3. Checkpoint — Phase 1 & 2 complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Phase 3 — Data Layer and New Home Page Components
  - [x] 4.1 Add new static data exports to `src/data.js`
    - Export `featuredHighlights` array (`Highlight[]`) with at least 3 entries
    - Export `proofLinks` array (`ProofLink[]`) with GitHub, Kaggle, LeetCode, LinkedIn, Research, Resume entries
    - Export `architecturePipeline` object (`ArchitecturePipeline`) with 5 stages and 4 connections
    - Export `currentFocusItems` array (`FocusItem[]`) with Researching, Building, Optimizing entries
    - Export `availabilityStatus` object (`AvailabilityStatus`) with `available: true`, statusLabel, description, and 3 actions
    - _Requirements: 7.7, 8.7, 9.6, 10.5, 14.8_

  - [x] 4.2 Create `src/components/FeaturedHighlightsRail.jsx`
    - Accept `highlights: Highlight[]` prop
    - Render as `<section aria-label="Featured highlights">`
    - Render one `<article>` per highlight with icon, category badge, `<h3>` headline, subtext, and optional metric chip in footer
    - When `highlight.link` is present, wrap card in `<a target="_blank" rel="noopener" aria-label="{headline} (opens in new tab)">`
    - Apply `.highlights-rail` CSS: `display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` on desktop
    - Apply mobile CSS: `display: flex; overflow-x: auto; scroll-snap-type: x mandatory` at `max-width: 640px`
    - Apply `.interactive-card` class to each card
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]* 4.3 Write property test for FeaturedHighlightsRail card count
    - **Property 3: FeaturedHighlightsRail renders exactly N cards**
    - **Validates: Requirements 7.1**

  - [ ]* 4.4 Write property test for linked highlight accessible labels
    - **Property 4: Linked highlight cards have accessible open-in-new-tab label**
    - **Validates: Requirements 7.3**

  - [x] 4.5 Create `src/components/ProofBar.jsx`
    - Accept `links: ProofLink[]` prop
    - Render as `<nav aria-label="External profiles and proof links">`
    - Render one `<a>` per link with `target="_blank" rel="noopener noreferrer"`
    - Set `aria-label="{label}, {sublabel}"` when sublabel present; `aria-label="{label}"` otherwise
    - Render `<span aria-hidden="true" class="proof-sep">·</span>` between links
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ]* 4.6 Write property test for ProofBar links
    - **Property 5: ProofBar links all have non-empty href and correct aria-label**
    - **Validates: Requirements 8.1, 8.3, 8.4**

  - [x] 4.7 Create `src/components/ArchitectureSnapshotCard.jsx`
    - Accept `pipeline: ArchitecturePipeline` prop
    - Render as `<section aria-label="Architecture snapshot: {pipeline.title}">`
    - Render one stage element per `pipeline.stages` entry; when stage has `detail`, set `role="img" aria-label="{stage.label}: {stage.detail}"`
    - Render arrow connector elements between stages
    - Gate connector `drawIn` animation on `@media (prefers-reduced-motion: no-preference)`
    - Render as single horizontal row on desktop; wrap to 2-column grid on mobile
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 4.8 Write property test for ArchitectureSnapshotCard stage rendering
    - **Property 6: ArchitectureSnapshotCard renders all stages with accessible labels**
    - **Validates: Requirements 9.1, 9.3**

  - [x] 4.9 Create `src/components/CurrentFocus.jsx`
    - Accept `items: FocusItem[]` and optional `lastUpdated?: string` props
    - Render one entry per item displaying `area` as a visible heading/label and `description` as body text
    - When item has `tags`, render each tag as a chip/badge
    - When `lastUpdated` is provided, render as supplementary text (e.g., "Updated June 2025")
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [ ]* 4.10 Write property test for CurrentFocus item rendering
    - **Property 7: CurrentFocus renders all items with area labels**
    - **Validates: Requirements 10.1, 10.2**

  - [x] 4.11 Update `src/pages/HomePage.jsx` with new composition order
    - Import and render components in order: Hero, ProofBar, FeaturedHighlightsRail, ArchitectureSnapshotCard, CurrentFocus, TechStack, AvailabilityCtaPanel, Contact
    - Remove `LiveMetricsDashboard` from this page
    - Pass data from `src/data.js` to each new component
    - _Requirements: 6.1, 6.2_

  - [x] 4.12 Update `src/pages/MobileAllInOnePage.jsx` to mirror new components
    - Import and render ProofBar, FeaturedHighlightsRail, ArchitectureSnapshotCard, CurrentFocus, AvailabilityCtaPanel in the same relative order as `HomePage`
    - Pass data from `src/data.js` to each new component
    - _Requirements: 6.3_

- [x] 5. Checkpoint — Phase 3 complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Phase 4 — Projects Page Accessibility
  - [x] 6.1 Update FilterBar in `src/pages/ProjectsPage.jsx` for full keyboard accessibility
    - Add `<label htmlFor="project-search" className="sr-only">Search projects</label>`
    - Add `id="project-search"`, `type="search"`, `aria-label="Search projects"`, `aria-describedby="project-count"` to the search input
    - Add `<span id="project-count" aria-live="polite" aria-atomic="true">{resultCount} of {totalCount} projects</span>`
    - Wrap search and filter controls in `<div role="search" aria-label="Filter and search projects">`
    - Wrap status filter buttons in `<fieldset>` with `<legend className="sr-only">Filter by status</legend>`
    - Add `aria-pressed={activeFilter === f}` to each status filter button
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

  - [ ]* 6.2 Write property test for FilterBar result count
    - **Property 8: Filter result count never exceeds total project count**
    - **Validates: Requirements 11.9**

  - [ ]* 6.3 Write property test for filter pill aria-pressed state
    - **Property 9: Filter pill aria-pressed reflects active state**
    - **Validates: Requirements 11.6, 11.7**

  - [x] 6.4 Update ProjectCard in `src/pages/ProjectsPage.jsx` for keyboard operability
    - Add `tabIndex={0}` to the `<motion.article>` element
    - Add `role="button"` to the `<motion.article>` element
    - Add `aria-label={"View details for " + project.title}` to the `<motion.article>` element
    - Add `onKeyDown` handler: invoke `onClick` on Enter; invoke `onClick` and `e.preventDefault()` on Space
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [ ]* 6.5 Write property test for ProjectCard keyboard activation
    - **Property 10: ProjectCard activates on Enter and Space**
    - **Validates: Requirements 12.4, 12.5**

  - [x] 6.6 Update `src/components/ProjectDetailModal.jsx` with focus management and ARIA
    - Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`, `tabIndex={-1}` to the modal container
    - Add `ref={modalRef}` to the modal container
    - Render modal title as `<h2 id="modal-title">`
    - Add close button with `aria-label="Close dialog"`
    - On open: call `requestAnimationFrame(() => modalRef.current?.focus())` to move focus into modal
    - On close: call `triggerRef.current?.focus()` to return focus to the triggering ProjectCard
    - Implement `onKeyDown` handler: close on Escape; trap Tab/Shift+Tab within focusable elements
    - Guard `openModal` against null/undefined project (no-op)
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9_

  - [ ]* 6.7 Write property test for modal focus round-trip
    - **Property 11: Modal focus returns to trigger after close (round-trip)**
    - **Validates: Requirements 13.2**

  - [ ]* 6.8 Write property test for modal focus trap
    - **Property 12: Modal focus trap keeps focus within modal**
    - **Validates: Requirements 13.3, 13.4**

- [x] 7. Checkpoint — Phase 4 complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Phase 5 — Trust and CTA Layer
  - [x] 8.1 Create `src/components/AvailabilityCtaPanel.jsx`
    - Accept `status: AvailabilityStatus` prop
    - Render as `<section aria-label="Availability and contact">`
    - Render status badge as `<span role="status" aria-label="Availability: {status.statusLabel}">` containing a `.status-dot--pulse` span and the label text
    - Render `<h2>` heading and `<p>` description
    - Render CTA actions in `<div role="group" aria-label="Contact options">`
    - Apply `.btn--primary` to actions with `variant: 'primary'`; `.btn--ghost` to actions with `variant: 'ghost'`
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [ ]* 8.2 Write property test for AvailabilityCtaPanel action rendering
    - **Property 13: AvailabilityCtaPanel renders all action elements**
    - **Validates: Requirements 14.4**

  - [x] 8.3 Create `src/components/ParticleBackground.jsx`
    - Render `<canvas aria-hidden="true" role="presentation">` with `pointer-events: none; position: fixed; z-index: 0`
    - Check `useReducedMotion()` from framer-motion; if true, return null (render nothing)
    - Check `useIsMobile()` to cap particle count at 25 on mobile; use `count` prop (default 40) on desktop
    - Initialize particles in `useEffect` with `canvas.getContext('2d')`; guard against null context (degrade gracefully)
    - Run `requestAnimationFrame` animation loop; cancel via `cancelAnimationFrame` on unmount
    - Use `ResizeObserver` to resize canvas on viewport changes
    - Accept `count?: number` and `speed?: number` props
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8_

  - [ ]* 8.4 Write property test for ParticleBackground reduced-motion and mobile count
    - **Property 14: ParticleBackground respects reduced-motion and mobile count**
    - **Validates: Requirements 15.3, 15.6**

- [x] 9. Phase 6 — React Cleanup and Heading Hierarchy Audit
  - [x] 9.1 Fix `src/App.jsx` theme consolidation
    - Move `document.documentElement.setAttribute('data-theme', ...)` exclusively into a `useLayoutEffect` that depends on `isDark`
    - Update `handleThemeChange` to only call `setIsDark` — remove any direct `setAttribute` call from the handler
    - _Requirements: 16.1, 16.2_

  - [x] 9.2 Fix `src/components/Contact.jsx` hover styles
    - Remove inline `onMouseEnter`/`onMouseLeave` handlers that mutate element styles directly
    - Replace with CSS class-based hover rules in `index.css`
    - _Requirements: 16.3_

  - [x] 9.3 Audit and fix heading hierarchy across all pages
    - Verify Hero renders the sole `<h1>` per page
    - Verify `Section` component renders section titles as `<h2>`
    - Verify card components (ExperienceCard, ProjectCard, highlight cards, etc.) render titles as `<h3>`
    - Fix any heading level skips found during audit
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ]* 9.4 Write property test for heading hierarchy
    - **Property 1: Heading hierarchy never skips levels**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**

  - [x] 9.5 Verify `LiveMetricsDashboard` remains on `ProfilesPage`
    - Confirm `LiveMetricsDashboard` is still imported and rendered in `src/pages/ProfilesPage.jsx`
    - _Requirements: 16.6, 6.2_

- [x] 10. Final Checkpoint — Ensure all tests pass
  - Run `npx vitest --run` from `portfolio-react/` — all tests must pass
  - Run `npm run lint` from `portfolio-react/` — zero errors
  - Run `npm run build` from `portfolio-react/` — build completes successfully
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Phases 1–2 are prerequisites for all later phases; complete them first
- Property tests use fast-check (already installed) with Vitest in `src/components/__tests__/`
- All new static content goes in `src/data.js` — never hardcode content in components
- CSS tokens only — never hardcode colors; always use `var(--token)`
- `ParticleBackground` stub can be added to `MainLayout` in Phase 1 and filled in during Phase 5
