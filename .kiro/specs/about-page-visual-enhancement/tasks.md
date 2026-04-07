# Implementation Plan: About Page Visual Enhancement

## Overview

Enhance `AboutBrief.jsx` with animated count-up stats, a left-accent bio block, and richer highlight cards using existing CSS variables and Framer Motion. All changes are self-contained within the component file.

## Tasks

- [x] 1. Implement `parseStatValue` utility and `useCountUp` hook
  - [x] 1.1 Add `parseStatValue` function inside `AboutBrief.jsx`
    - Extract leading integer and trailing suffix (`+`, `%`, or empty) from a stat value string
    - Return `{ numeric, suffix }` such that `String(numeric) + suffix` reconstructs the original value
    - Handle edge case where no digits are present (return `{ numeric: 0, suffix: value }`)
    - _Requirements: design §parseStatValue_

  - [x] 1.2 Write unit tests for `parseStatValue`
    - Test inputs: `"2+"`, `"100+"`, `"75%"`, `"2"`, `"N/A"`
    - Assert reconstruction invariant: `String(numeric) + suffix === value` for all digit-containing inputs
    - _Requirements: design §Testing Strategy_

  - [x] 1.3 Add `useCountUp(target, duration, active)` hook inside `AboutBrief.jsx`
    - Return `0` when `active` is `false`
    - On `active` flip to `true`, start a `requestAnimationFrame` loop from `0` to `target` over `duration` ms using cubic ease-out: `1 - (1 - progress)^3`
    - Guard with a `started` ref so the animation fires at most once per lifecycle
    - Cancel the rAF loop on unmount to prevent memory leaks
    - _Requirements: design §useCountUp_

  - [x] 1.4 Write property test for `useCountUp`
    - **Property 1: Count never exceeds target** — for any `target >= 0`, all intermediate values returned by `useCountUp` are in `[0, target]`
    - **Validates: design §Correctness Properties**

  - [x] 1.5 Write property test for `parseStatValue`
    - **Property 2: Round-trip reconstruction** — for any string matching `/^\d+[+%]?$/`, `parseStatValue` must reconstruct the original string via `String(numeric) + suffix`
    - **Validates: design §Correctness Properties**

- [x] 2. Implement `AnimatedStat` component
  - [x] 2.1 Create `AnimatedStat` as a local component inside `AboutBrief.jsx`
    - Accept props: `value: string`, `label: string`, `delay: number`, `inView: boolean`
    - Use `parseStatValue` to split value into numeric and suffix
    - Use `useCountUp` to drive the displayed number; append suffix after the count
    - Wrap in a `motion.div` with `initial={{ opacity: 0, y: 12 }}` and `animate` tied to `inView`
    - Apply stagger via the `delay` prop on the transition
    - _Requirements: design §AnimatedStat_

  - [x] 2.2 Write unit test for `AnimatedStat`
    - Verify final displayed value matches original `value` string after animation completes
    - _Requirements: design §Correctness Properties_

- [x] 3. Implement `HighlightCard` component
  - [x] 3.1 Create `HighlightCard` as a local component inside `AboutBrief.jsx`
    - Accept props: `title: string`, `description: string`, `index: number`, `inView: boolean`
    - Remove emoji icon; replace with a `var(--accent)` horizontal rule (2rem wide, 2px tall) above the title
    - On hover, expand the accent rule to full card width via CSS `transition: width 0.3s ease`
    - Use `motion.div` with `fadeInUp` (`initial={{ opacity: 0, y: 20 }}`) tied to `inView` with stagger via `index`
    - Apply `whileHover={{ y: -3 }}` lift; keep `border: 1px solid var(--border)` at rest, no shadow
    - _Requirements: design §HighlightCard_

- [x] 4. Update `AboutBrief` root component
  - [x] 4.1 Update the `highlights` data array — remove `icon` field from each entry
    - _Requirements: design §Highlight data shape_

  - [x] 4.2 Replace the bio `<motion.p>` with a `motion.div` wrapping a left accent bar
    - Add `borderLeft: '2px solid var(--accent)'` and `paddingLeft: '1.25rem'` to the wrapper
    - Keep the existing fade-in animation on the wrapper
    - _Requirements: design §Bio block_

  - [x] 4.3 Replace inline stat `motion.div` elements with `<AnimatedStat>` components
    - Pass `value`, `label`, `delay`, and `inView` props
    - _Requirements: design §Stats row_

  - [x] 4.4 Replace inline highlight `motion.div` elements with `<HighlightCard>` components
    - Pass `title`, `description`, `index`, and `inView` props
    - _Requirements: design §Highlight cards grid_

- [x] 5. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Verify no new CSS variables, box shadows, or border-radius values were introduced
  - Confirm all color references use existing CSS variables (`--accent`, `--text`, `--text2`, `--border`, `--surface`, `--surface2`)

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All changes are confined to `AboutBrief.jsx` — no other files need modification
- Property tests use fast-check (already available or easily added as a dev dependency)
- The design uses pseudocode-style specs but the implementation language is React/JSX (matching the existing codebase)
