# Design System Documentation

## Overview

This portfolio uses a unified, token-driven design system based on semantic color tokens, fluid typography scales, and motion primitives. The system supports light/dark themes while maintaining a single, cohesive visual identity.

## Color Tokens

All colors are managed through CSS custom properties in `/src/styles/tokens.css`. Components should **never** use hard-coded colors — only token variables.

### Semantic Tokens (what components use)

```
--color-bg                /* Page background */
--color-surface           /* Card/elevated elements */
--color-surface-raised    /* Hover states, modals */
--color-surface-elev      /* Highest elevation */

--color-border            /* Default borders */
--color-border-strong     /* Active/focused borders */

--color-text              /* Primary text (warm cream) */
--color-text-muted        /* Secondary text */
--color-text-subtle       /* Tertiary text, captions */

--color-accent            /* Brand color (warm amber) */
--color-accent-fg         /* Text on accent background */

--color-success / --color-warning / --color-danger / --color-info
```

### Light/Dark Theming

Tokens automatically adjust based on `data-theme` attribute:
- `<html data-theme="dark">` (default)
- `<html data-theme="light">`

## Typography

### Fonts

- **Display**: Playfair Display (headings)
- **Body**: Inter Variable (body text, UI)
- **Mono**: Inter Variable (when needed)

### Fluid Type Scale

All text sizes use CSS `clamp()` for fluid scaling:

```
--text-xs  through --text-4xl
```

Usage:
```jsx
<h1 style={{ fontSize: 'var(--text-4xl)' }}>Hero Title</h1>
```

### Typography Classes

```
.display     /* Playfair, --text-4xl, tight leading */
.lead        /* Large muted body text */
.kicker      /* Uppercase label, uppercase */
```

## Layout & Spacing

### Container Sizes

```
--container-narrow: 720px    /* Prose, single column */
--container: 1120px          /* Main page max */
--container-wide: 1280px     /* Case studies */
```

### 4px Base Scale

```
--space-1: 0.25rem   (4px)
--space-2: 0.5rem    (8px)
--space-4: 1rem      (16px)
--space-6: 1.5rem    (24px)
--space-8: 2rem      (32px)
```

Use `gap` for layout spacing, never mix margin/padding with gap on same element.

## Motion

Motion tokens standardize timing and easing:

```
--motion-duration-fast: 150ms
--motion-duration-base: 240ms
--motion-duration-slow: 480ms

--motion-ease: cubic-bezier(0.25, 0.1, 0.25, 1)
--motion-ease-out: cubic-bezier(0.22, 1, 0.36, 1)
--motion-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

Usage:
```css
transition: 
  color var(--motion-duration-base) var(--motion-ease),
  transform var(--motion-duration-base) var(--motion-ease);
```

### Prefers Reduced Motion

All motion automatically respects `prefers-reduced-motion: reduce` via the token system.

## UI Primitive Components

Located in `/src/components/ui/`:

### Core Primitives (`primitives.jsx`)

- `<Button variant="primary|ghost|link" />`
- `<Card interactive={true} />`
- `<Tag variant="neutral|accent|success" />`
- `<Heading level={1-4} />`
- `<Lead>Subtitle text</Lead>`
- `<StatusDot color="success|warning|danger" pulse />`

### Layout Primitives (`layout-primitives.jsx`)

- `<Stack gap="var(--space-4)">` — Vertical flex
- `<Cluster gap="var(--space-4)">` — Horizontal wrap flex
- `<Grid min="280px">` — Auto-fit responsive grid
- `<HighlightCard label="Metric" value="42K" />`
- `<ListItem title="" subtitle="" tags={[]} />`
- `<Badge variant="accent" />`

### Import Pattern

```jsx
import {
  Button,
  Card,
  Stack,
  Grid,
  Heading,
} from '../components/ui'
```

## Accessibility

### Focus States

Global focus ring applies to all interactive elements:

```
outline: var(--focus-ring);
outline-offset: var(--focus-ring-offset);
```

Focus color matches the accent for consistency.

### Semantic HTML

- Always use `<button>` for actions, `<a>` for navigation
- Use `<main>`, `<nav>`, `<header>`, `<footer>` landmarks
- One `<h1>` per page
- No skipped heading levels
- `aria-label` for icon-only buttons
- `aria-pressed` for toggle states

### Screen Reader Support

- `.sr-only` class for hidden text (skip links, announcements)
- `aria-hidden="true"` for decorative elements
- Meaningful alt text for all images

### Color Independence

Status indicators (dots) must include a text label—color alone is insufficient.

### Contrast

All text/background pairs meet WCAG 2.2 AA (4.5:1 body, 3:1 large text) in both themes.

## Common Patterns

### Button with Icon

```jsx
<Button variant="primary">
  <Icon size={20} />
  Download Resume
</Button>
```

### Grid of Cards

```jsx
<Grid min="280px" gap="var(--space-4)">
  {items.map(item => (
    <Card key={item.id} interactive>
      {item.content}
    </Card>
  ))}
</Grid>
```

### Responsive Stack

```jsx
<Stack gap={isMobile ? 'var(--space-4)' : 'var(--space-8)'}>
  {children}
</Stack>
```

## Theming

### Switching Themes

The app supports light/dark toggling via the `ThemeToggle` button in the navbar. Theme preference persists to localStorage.

### Adding a New Color Token

1. Add to `:root` in `/src/styles/tokens.css`
2. Add light theme override in `:root[data-theme="light"]`
3. Reference in Tailwind config `/tailwind.config.js` if used in utility classes

Example:

```css
/* tokens.css */
:root {
  --color-new: #d4a24c;
}

:root[data-theme="light"] {
  --color-new: #9c6b21;
}
```

## Deprecations

The following have been removed:

- `data-style-mode` (luxe/editorial/noir variants)
- `--accent2`, `--accent3` (use --color-accent only)
- `--nav-dot` (use --color-accent)
- `--text`, `--text2` (use --color-text, --color-text-muted)
- `--glass-*` tokens (glass surfaces restricted to navbar/modals only)
- Drifting orbs in `AmbientAtmosphere` (performance, mobile optimization)

## Development

### Styleguide

A live component reference is available at `/styleguide` showing all tokens, primitives, and color combinations in both themes.

### No Inline Styles in Feature Components

All feature components should use CSS class or token references, not inline `style={{}}` except for escape hatches in primitives. This keeps the code maintainable and consistent.

## Verifying the System

- Check `/styleguide` route to verify all colors, typography, and components
- Run `axe` browser extension in both light/dark modes to verify contrast
- Test theme toggle, verify localStorage persistence
- Test `prefers-reduced-motion` with system accessibility settings
