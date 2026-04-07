# UI/UX Accessibility Revamp PRD

## Project

React portfolio application in `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react`

## Objective

Revamp the portfolio's UI/UX and accessibility so the site feels more intentional, easier to navigate, and more polished across desktop and mobile, while preserving the existing content, personal brand, and static deployment model.

## Scope

### In Scope

- Visual hierarchy improvements
- Navigation UX improvements
- Accessibility hardening
- Mobile responsiveness refinements
- Motion and interaction polish
- React implementation cleanup that directly supports the UI revamp
- Build/lint stability improvements related to the revamp

### Out of Scope

- Payments
- Database integration
- Backend/API work
- Authentication
- CMS/content pipeline changes
- Major content rewrites beyond clarity/presentation improvements

## Background

The current app already has a solid portfolio foundation and strong content, but it still behaves like an engineer-built portfolio more than a deliberately refined product experience. The most important gaps are:

- Inconsistent focus and hover behavior
- Some controls that are visually interactive but not fully accessible
- Motion and smooth-scroll behavior that should better respect reduced-motion preferences
- Section hierarchy that can feel visually repetitive
- Mobile navigation and anchored navigation that can be more robust
- React structure issues contributing to lint failures and maintainability friction

## Goals

1. Make the first screen communicate identity, value, and next steps faster.
2. Improve scanability and section hierarchy across the site.
3. Ensure the site is fully usable by keyboard users.
4. Improve focus visibility and semantic structure for assistive technology.
5. Reduce UI inconsistency in cards, buttons, links, filters, and navigation.
6. Preserve the current brand personality while making it feel more intentional and production-ready.

## User Experience Goals

### Primary Users

- Recruiters evaluating fit quickly
- Hiring managers reviewing experience and project quality
- Technical peers assessing depth and polish
- Potential collaborators reaching out through contact links

### Desired Experience

- Users understand the portfolio owner's role and strengths within a few seconds.
- Navigation feels obvious and stable.
- Content feels polished rather than dense or improvised.
- Interaction feedback is clear across mouse, keyboard, and touch.
- Mobile users get the same sense of quality as desktop users.

## Functional Requirements

### 1. Global Accessibility and Structure

- Add a skip-to-content link at the top of the page.
- Ensure the page uses clear semantic landmarks: `header`, `nav`, `main`, `footer`.
- Maintain heading hierarchy so section headings remain predictable and screen-reader friendly.
- Ensure all non-decorative images have meaningful alt text.
- Decorative visuals should not create noise for assistive technologies.

### 2. Navigation

- Desktop nav must clearly show the active page or section.
- Mobile navigation must be keyboard-operable and screen-reader friendly.
- The mobile menu toggle must expose accurate labels and state.
- Anchored navigation must scroll consistently beneath the fixed header.
- Hash navigation should behave reliably on route changes and direct entry.

### 3. Focus and Interaction States

- All interactive elements must show a visible focus state.
- Focus styling must work in both dark and light themes.
- Hover-only affordances must have keyboard-accessible equivalents.
- Interactive cards must use button semantics or equivalent keyboard support if they open detail views.
- Search, filter, and theme controls must provide clear interaction feedback.

### 4. Motion and Reduced Motion

- Scroll behavior and entrance animations must respect `prefers-reduced-motion`.
- Motion should support the experience rather than dominate it.
- Reduced-motion users should not be forced through smooth scrolling or unnecessary animation.

### 5. Hero and Information Hierarchy

- Hero must communicate:
  - who the portfolio belongs to
  - what they do
  - why it matters
  - what the user should do next
- The primary and secondary actions in the hero should be visually distinct.
- Supporting metrics and trust signals should remain readable and not feel decorative only.

### 6. Section Presentation

- Major sections should feel distinct in rhythm and hierarchy.
- Section titles and subtitles should better support scanning.
- Text width, spacing, and density should be optimized for readability.
- Repeated visual treatments should be simplified where they create monotony.
- Replace the current "Live Activity" emphasis with a higher-signal featured proof section.

### 7. Featured Highlights Rail

- Replace or de-emphasize the current live metrics dashboard with a `Featured Highlights Rail`.
- The rail should surface 3 to 5 high-signal proof points such as:
  - production AI systems
  - Text-to-SQL / RAG specialization
  - latency or performance wins
  - published research
  - enterprise impact
- Each highlight card should be scannable, visually distinct, and useful without interaction.
- The section should feel more persuasive than decorative.

### 8. Proof Bar

- Add a clean `Proof Bar` near the hero or before the closing CTA.
- The bar should provide fast access to high-trust external destinations such as GitHub, Kaggle, LeetCode, LinkedIn, research, and resume.
- The design should stay minimal and premium rather than looking like a social icon strip.
- Links must be keyboard accessible and visibly focused.

### 9. Architecture Snapshot Card

- Add an `Architecture Snapshot Card` that visualizes a representative AI system pipeline.
- The card should communicate system thinking, not just technology branding.
- It may show flows such as ingestion, retrieval, prompt orchestration, evaluation, and delivery surfaces.
- It should remain lightweight and readable on mobile.

### 10. Now Exploring / Current Focus

- Add a `Now Exploring / Current Focus` section or card.
- It should communicate what is currently being researched, built, or optimized.
- Content should feel current and credible rather than sounding like generic trend-following.
- This section should make the portfolio feel active without requiring a blog.

### 11. Projects Experience

- Project filters must be labeled and keyboard accessible.
- The project search input must have a proper accessible name.
- Project cards that open detail views must be operable without a mouse.
- Empty states and filter counts must remain understandable.
- Modal interactions must support focus management and dismiss behavior expectations.

### 12. Contact and CTA Experience

- Add a stronger `Availability CTA Panel` near the end of the site.
- The panel should clearly communicate current availability, collaboration interest, and best next actions.
- Contact section should feel like a strong end-of-page CTA rather than a passive list of links.
- Contact options must remain easy to scan on mobile.
- Link styling should remain consistent with the rest of the system.
- CTA hierarchy should encourage action without feeling noisy.

### 13. Background Atmosphere

- Introduce a lightweight particle background or similarly subtle ambient layer.
- The effect must remain restrained and low-noise.
- It must respect reduced-motion preferences.
- It must not degrade readability, contrast, or scrolling performance.
- It should feel atmospheric rather than gimmicky.

### 14. Theme and Global UI Consistency

- Theme switching should remain available and intuitive.
- Theme-related styles should be centralized where practical.
- Global interaction patterns for buttons, pills, cards, and links should be standardized.
- Contrast and borders should be improved where current styling is too faint.

## Non-Functional Requirements

- Keep the app static and easy to deploy.
- Avoid unnecessary new dependencies.
- Preserve current content and personal brand tone.
- Ensure code changes remain maintainable and readable.
- Keep performance stable or slightly improved.
- Ensure `lint` and `build` pass after the revamp.

## Design Principles

- Clarity over decoration
- Strong hierarchy over visual sameness
- Accessibility as a first-class requirement
- Motion with purpose
- Mobile quality equal to desktop quality
- Shared UI patterns over one-off inline behaviors
- Proof over decoration
- Ambient visuals should support the content, never compete with it

## Technical Requirements

### React Implementation

- Clean existing lint issues relevant to the UI layer.
- Move reusable helpers out of component files where appropriate.
- Reduce direct DOM styling in event handlers where shared CSS patterns are better.
- Consolidate theme handling to avoid repeated localStorage and document mutations.
- Improve mobile detection and route behavior if that supports a better UX.

### CSS / Styling

- Strengthen global tokens for focus, border contrast, spacing, and interactive states.
- Introduce shared utility classes or patterns where repeated inline interaction styles currently exist.
- Keep the visual language consistent with the current portfolio aesthetic.

## Target Files

Primary files likely to change:

- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/App.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/layouts/MainLayout.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/pages/HomePage.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/Navbar.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/Hero.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/Contact.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/pages/ProjectsPage.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/index.css`

Secondary/supporting files likely to change:

- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/hooks/useIsMobile.js`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/ThemeToggle.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/AboutBrief.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/LiveMetricsDashboard.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/pages/MobileAllInOnePage.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/ProjectDetailModal.jsx`

New components likely to be introduced:

- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/FeaturedHighlightsRail.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/ProofBar.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/AvailabilityCtaPanel.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/CurrentFocus.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/ArchitectureSnapshotCard.jsx`
- `/Users/himanshu/Git/himanshu-nakrani.github.io/portfolio-react/src/components/ParticleBackground.jsx`

## Acceptance Criteria

### Accessibility

- Keyboard users can reach all major navigation, controls, filters, links, and modal actions.
- Focus indicators are clearly visible across the site.
- Interactive cards are keyboard accessible if they trigger actions.
- Reduced-motion preferences are respected for scrolling and animations.
- Key sections and controls expose appropriate semantics and labels.

### UX / Visual Quality

- Hero presents a clearer value proposition and action path.
- Navigation feels clearer on both desktop and mobile.
- Section hierarchy is more readable and less repetitive.
- Live metrics are no longer the primary proof device; a featured highlights section carries that role.
- Proof Bar provides faster access to trust-building external profiles.
- Architecture Snapshot Card communicates systems thinking clearly.
- Current Focus section makes the portfolio feel active and current.
- Contact section and Availability CTA feel like a stronger closing CTA.
- Projects search/filter experience is clearer and easier to use.
- Background atmosphere remains subtle and does not distract from content.

### Technical Quality

- `npm run lint` passes.
- `npm run build` passes.
- No obvious regressions to current routes or content.
- Mobile layouts remain stable across major pages.

## Risks

- Over-polishing visuals could weaken the existing understated aesthetic.
- Large styling changes may create regressions on mobile if not tested carefully.
- Accessibility improvements on interactive cards/modals may require small structural changes rather than superficial CSS edits.

## Implementation Phases

### Phase 1: Global Foundation

- Add skip link
- Add shared focus-visible styles
- Improve theme and global interaction tokens
- Audit landmark and heading structure

### Phase 2: Navigation and Hero

- Refine navbar interaction and active states
- Improve mobile menu behavior
- Rework hero hierarchy and CTA clarity
- Tune anchored scroll behavior

### Phase 3: Section and Content Polish

- Refine section spacing and rhythm
- Replace live metrics emphasis with Featured Highlights Rail
- Add Architecture Snapshot Card
- Add Current Focus section
- Improve About and Contact presentation
- Standardize link and button behavior

### Phase 4: Projects Accessibility

- Improve search/filter accessibility
- Make project cards keyboard-operable
- Improve modal usability and focus behavior

### Phase 5: Trust and CTA Layer

- Add Proof Bar
- Add stronger Availability CTA Panel
- Add lightweight particle background if performance and readability remain strong

### Phase 6: React Cleanup and Verification

- Clean lint issues
- Consolidate helper logic where useful
- Run lint/build
- Perform manual keyboard and mobile QA

## QA Checklist

- Can tab through the whole page in a logical order.
- Skip link appears and works.
- Focus ring is visible on links, buttons, pills, inputs, and cards.
- Mobile nav opens/closes correctly and can be navigated without a mouse.
- Direct navigation to anchored sections lands correctly.
- Theme toggle works and remains understandable.
- Featured Highlights Rail reads clearly on mobile and desktop.
- Proof Bar is useful and not visually noisy.
- Architecture Snapshot Card remains legible on small screens.
- Current Focus content feels current and intentional.
- Projects search can be used with keyboard only.
- Project detail interactions can be triggered and dismissed accessibly.
- Reduced-motion preference removes forced smooth scrolling and excessive animation.
- Particle background, if implemented, stays subtle and honors reduced motion.
- Home, projects, and contact experiences still feel cohesive on mobile.

## Definition of Done

The revamp is complete when the app presents a clearer and more polished experience, keyboard and accessibility gaps are meaningfully reduced, the React UI layer is cleaner to maintain, and the project passes local validation with no backend or product-scope expansion beyond UI/UX/accessibility.
