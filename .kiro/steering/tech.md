# Tech Stack

## Framework & Runtime
- React 19 (JSX, functional components, hooks only)
- Vite 8 (build tool + dev server)
- React Router DOM v6 (client-side routing)

## Key Libraries
- framer-motion — animations and transitions
- lucide-react — icons
- canvas-confetti — confetti effects
- fast-check — property-based testing (vitest)

## Styling
- Plain CSS via `index.css` and `App.css` — no CSS-in-JS framework
- Inline styles used heavily in components (style prop objects)
- CSS custom properties (variables) for all theming — defined on `:root`, overridden by `[data-theme="dark"]` / `[data-theme="light"]`
- Theme is toggled by setting `data-theme` attribute on `document.documentElement`
- No Tailwind, no CSS modules, no styled-components

## Testing
- Vitest + fast-check for property-based tests
- Test files live in `src/components/__tests__/`
- Vitest configured with `environment: 'node'` in `vite.config.js`

## Pre-build Scripts
- `scripts/fetch-ghchart-svg.mjs` runs automatically before `dev` and `build` via npm `pre*` hooks to fetch the GitHub contributions SVG

## Common Commands
All commands run from `portfolio-react/`:

```bash
npm run dev        # start dev server (runs fetch-ghchart-svg first)
npm run build      # production build (runs fetch-ghchart-svg first)
npm run preview    # preview production build
npm run lint       # ESLint
npm run heatmap    # manually fetch GitHub contributions SVG
npx vitest --run   # run tests once (no watch mode)
```

## ESLint
- Flat config (`eslint.config.js`) using `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- `no-unused-vars` ignores uppercase/underscore-prefixed names and `motion.*` components
