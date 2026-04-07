# Requirements: Portfolio UI/UX Overhaul

## Introduction

This document derives formal requirements from the design document for the portfolio UI/UX overhaul. Six improvement areas are addressed: color token semantics, hero profile photo, projects filter UX, mobile routing, loading skeleton states, and PageHeader spacing consistency.

---

## Requirements

### Requirement 1: Semantic Color Token Differentiation

**User Story**: As a visitor, I want status indicators (success, warning, error, highlight) to use visually distinct colors so I can quickly parse the meaning of badges and labels across the portfolio.

#### Acceptance Criteria

1.1. GIVEN the dark theme is active, WHEN any component references `--green`, `--yellow`, `--red`, or `--pink`, THEN each token resolves to a color value that is distinct from `--accent` and distinct from every other semantic token in the set.

1.2. GIVEN the light theme is active, WHEN any component references `--green`, `--yellow`, `--red`, or `--pink`, THEN each token resolves to a color value that is distinct from `--accent` and distinct from every other semantic token in the set.

1.3. GIVEN the light theme is active, WHEN a card component is rendered, THEN `--surface` resolves to `#ffffff` and `--bg` resolves to `#fafafa`, making cards visually distinct from the page background.

1.4. GIVEN either theme is active, WHEN a component uses `--shadow-sm` or `--shadow-md`, THEN neither token resolves to `none`; both provide a non-zero box-shadow value.

1.5. GIVEN either theme is active, WHEN a component uses `--radius-sm`, `--radius-md`, or `--radius-lg`, THEN none of these tokens resolves to `0px`.

---

### Requirement 2: Hero Section Profile Photo

**User Story**: As a visitor, I want to see a profile photo of Himanshu in the hero section so I can put a face to the portfolio and feel a stronger personal connection.

#### Acceptance Criteria

2.1. GIVEN the hero section is rendered on desktop, WHEN the page loads, THEN an `<img>` element with `src="/himanshu.jpg"` is present in the hero section DOM.

2.2. GIVEN the hero photo is rendered, WHEN the DOM is inspected, THEN the `<img>` element has a non-empty `alt` attribute describing the subject.

2.3. GIVEN the hero photo is rendered, WHEN the DOM is inspected, THEN the `<img>` element has `loading="lazy"` to avoid blocking the initial render.

2.4. GIVEN the hero photo is rendered, WHEN the DOM is inspected, THEN the `<img>` element has explicit `width` and `height` attributes to prevent Cumulative Layout Shift.

2.5. GIVEN the viewport width is ≤ 768 px, WHEN the hero section is rendered, THEN the profile photo is displayed above the text copy block and is centered horizontally.

2.6. GIVEN the `/public/himanshu.jpg` file fails to load, WHEN the hero section is rendered, THEN the layout degrades gracefully with the `alt` text visible and no JavaScript error is thrown.

---

### Requirement 3: Projects Page Filter UX Consolidation

**User Story**: As a visitor browsing projects, I want all filter controls to be visually grouped together so I can understand the filtering options at a glance without scanning three separate UI regions.

#### Acceptance Criteria

3.1. GIVEN the Projects page is rendered, WHEN the filter area is inspected, THEN the search input, status badge pills, and tag pills are all children of a single shared container element.

3.2. GIVEN the Projects page is rendered, WHEN the filter area is inspected, THEN the result count is displayed inline within the filter container (not as a separate paragraph below).

3.3. GIVEN any combination of filter state (query, activeFilter, activeTag), WHEN filters are applied, THEN the number of displayed projects is always less than or equal to the total number of projects.

3.4. GIVEN no filters are active (query is empty, activeFilter is 'All', activeTag is 'All'), WHEN the Projects page renders, THEN all projects are displayed.

3.5. GIVEN the viewport width is ≤ 768 px, WHEN the filter container is rendered, THEN the status pills and tag pills stack vertically within the same container without horizontal overflow.

3.6. GIVEN a filter is active, WHEN the user changes any single filter dimension, THEN the other two filter dimensions retain their current values.

---

### Requirement 4: Mobile Routing Deep-Link Fix

**User Story**: As a mobile visitor who receives a shared link to `/projects` or `/skills`, I want to land on the correct content section instead of being silently redirected to the home page.

#### Acceptance Criteria

4.1. GIVEN the viewport is mobile (≤ 768 px) and the user navigates to `/projects`, WHEN the route resolves, THEN `MobileAllInOnePage` is rendered and the `#projects` section is scrolled into view.

4.2. GIVEN the viewport is mobile and the user navigates to `/skills`, WHEN the route resolves, THEN `MobileAllInOnePage` is rendered and the `#skills` section is scrolled into view.

4.3. GIVEN the viewport is mobile and the user navigates to `/experience`, `/profiles`, or `/research`, WHEN the route resolves, THEN `MobileAllInOnePage` is rendered and the corresponding section is scrolled into view.

4.4. GIVEN the viewport is mobile and the user navigates to any sub-route, WHEN the route resolves, THEN the URL in the browser address bar is NOT changed (no redirect occurs).

4.5. GIVEN the viewport is desktop (> 768 px) and the user navigates to `/projects`, WHEN the route resolves, THEN `ProjectsPage` is rendered (existing desktop behaviour is unchanged).

4.6. GIVEN the viewport is mobile and the scroll target section ID does not exist in the DOM, WHEN the route resolves, THEN the page renders from the top without throwing a JavaScript error.

---

### Requirement 5: LiveMetricsDashboard Loading Skeleton

**User Story**: As a visitor, I want to see placeholder content while the metrics dashboard is loading so the page doesn't show a jarring blank space before data arrives.

#### Acceptance Criteria

5.1. GIVEN `LiveMetricsDashboard` mounts, WHEN the component first renders (before the data timeout resolves), THEN skeleton placeholder cards are visible in place of the real metric cards.

5.2. GIVEN `LiveMetricsDashboard` has mounted and the data timeout has resolved, WHEN the component re-renders, THEN the skeleton cards are replaced by real metric cards containing the loaded values.

5.3. GIVEN the skeleton state is active, WHEN the skeleton cards are rendered, THEN they occupy the same grid layout (columns, gap, card dimensions) as the real metric cards to prevent layout shift.

5.4. GIVEN a `SkeletonCard` is rendered with a `rows` prop of value N, WHEN the DOM is inspected, THEN exactly N shimmer row elements are present inside the card.

5.5. GIVEN the transition from skeleton to real cards occurs, WHEN the swap happens, THEN the transition is animated (fade or similar) rather than an abrupt swap.

---

### Requirement 6: PageHeader Spacing Consistency

**User Story**: As a developer maintaining the portfolio, I want `PageHeader` to produce consistent spacing between the lede text and the page content below it so all pages feel rhythmically uniform without per-page overrides.

#### Acceptance Criteria

6.1. GIVEN `PageHeader` is rendered with a `description` prop, WHEN the DOM is inspected, THEN the lede `<p>` element has a `margin-top` of `0.5rem` (applied via the `.mvp2-page-lede` CSS class).

6.2. GIVEN `PageHeader` is rendered without a `marginBottom` prop, WHEN the wrapper `<header>` element is inspected, THEN its `marginBottom` style is `2.5rem`.

6.3. GIVEN `PageHeader` is rendered with a custom `marginBottom` prop value, WHEN the wrapper `<header>` element is inspected, THEN its `marginBottom` style matches the provided value.

6.4. GIVEN `PageHeader` is rendered without a `description` prop, WHEN the DOM is inspected, THEN no lede `<p>` element is rendered.

6.5. GIVEN `PageHeader` is rendered without a `kicker` prop, WHEN the DOM is inspected, THEN no kicker `<p>` element is rendered.
