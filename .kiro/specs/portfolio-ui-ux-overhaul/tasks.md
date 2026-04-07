# Tasks: Portfolio UI/UX Overhaul

## Task List

- [x] 1. Fix CSS color tokens and surface depth
  - [x] 1.1 Add semantic `--green`, `--yellow`, `--red`, `--pink` values to `:root` (dark mode) in `index.css`
  - [x] 1.2 Add semantic `--green`, `--yellow`, `--red`, `--pink` values to `[data-theme="light"]` in `index.css`
  - [x] 1.3 Update `[data-theme="light"]` to set `--surface: #ffffff` and `--surface2: #f4f4f5`
  - [x] 1.4 Replace `--shadow-sm: none` and `--shadow-md: none` with real box-shadow values in both `:root` and `[data-theme="light"]`
  - [x] 1.5 Replace `--radius-sm: 0px`, `--radius-md: 0px`, `--radius-lg: 0px` with `6px`, `10px`, `16px` respectively

- [x] 2. Add hero profile photo
  - [x] 2.1 Create `HeroPhoto` sub-component inside `Hero.jsx` that renders `<img src="/himanshu.jpg" alt="Himanshu Nakrani" loading="lazy" />` in a circular frame
  - [x] 2.2 Add `HeroPhoto` to the Hero section layout alongside the existing `.hero-copy` block
  - [x] 2.3 Add responsive CSS in the Hero `<style>` block to size the photo to 180 px and center it above the copy on mobile (≤ 768 px)

- [x] 3. Consolidate Projects page filter UX
  - [x] 3.1 Extract a `FilterBar` component (can be defined in `ProjectsPage.jsx`) that wraps the search input, status pills, and tag pills in a single container with a shared border and background
  - [x] 3.2 Move the result count display inside `FilterBar`, inline with the search input row
  - [x] 3.3 Replace the three separate filter blocks in `ProjectsPage` with a single `<FilterBar>` usage
  - [x] 3.4 Add mobile stacking styles so status pills and tag pills stack vertically on narrow viewports

- [x] 4. Fix mobile routing deep-link behaviour
  - [x] 4.1 Add a `mobileRouteMap` constant in `App.jsx` mapping each sub-route path to its section ID
  - [x] 4.2 Update `MobileAwareRoute` to render `<MobileAllInOnePage scrollToSection={sectionId} />` instead of `<Navigate to="/" replace />`
  - [x] 4.3 Update all `<Route>` elements in `App.jsx` to pass the correct `sectionId` prop to `MobileAwareRoute`
  - [x] 4.4 Add a `scrollToSection` prop to `MobileAllInOnePage` and implement the `useEffect` scroll-on-mount logic using `requestAnimationFrame`

- [x] 5. Add skeleton loading states to LiveMetricsDashboard
  - [x] 5.1 Add `@keyframes shimmer` and `.skeleton-shimmer` CSS class to `index.css`
  - [x] 5.2 Create a `SkeletonCard` component (inside `LiveMetricsDashboard.jsx`) that renders N shimmer rows matching the real card layout
  - [x] 5.3 Add `isLoading` state to `LiveMetricsDashboard` (initially `true`, set to `false` when metrics populate)
  - [x] 5.4 Wrap the card rendering in `AnimatePresence` and conditionally render `SkeletonCard` components when `isLoading` is `true`

- [x] 6. Standardise PageHeader spacing
  - [x] 6.1 Add `margin-top: 0.5rem` to the `.mvp2-page-lede` rule in `index.css`
  - [x] 6.2 Update the `marginBottom` default prop in `PageHeader.jsx` from `'2.25rem'` to `'2.5rem'`
