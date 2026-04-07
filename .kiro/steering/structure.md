# Project Structure

The active React app lives entirely inside `portfolio-react/`. The root-level files (`index.html`, `style.css`, `script.js`, `assets/`) are a legacy static site — ignore them.

```
portfolio-react/
├── public/                  # Static assets (favicon, images, SVGs)
├── scripts/
│   └── fetch-ghchart-svg.mjs  # Pre-build script to fetch GitHub contributions SVG
├── src/
│   ├── main.jsx             # React entry point
│   ├── App.jsx              # Router setup, theme state, mobile-aware routing
│   ├── index.css            # Global styles, CSS variables, theming
│   ├── App.css              # App-level styles
│   ├── data.js              # All static content (experience, projects, skills, publications, etc.)
│   ├── assets/              # Imported image assets
│   ├── hooks/
│   │   └── useIsMobile.js   # Breakpoint hook (default 768px)
│   ├── layouts/
│   │   └── MainLayout.jsx   # Shared shell: Navbar + Outlet + Footer
│   ├── pages/
│   │   ├── HomePage.jsx         # Desktop home (Hero + brief sections)
│   │   ├── MobileAllInOnePage.jsx  # Mobile single-page (all sections combined)
│   │   ├── ProjectsPage.jsx
│   │   ├── ExperiencePage.jsx
│   │   ├── SkillsPage.jsx
│   │   ├── ResearchPage.jsx
│   │   └── ProfilesPage.jsx
│   └── components/
│       ├── __tests__/       # Vitest test files
│       └── *.jsx            # Feature components (one per concept)
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Conventions

- All portfolio content (text, links, metrics) lives in `src/data.js` — components import from there, not hardcode content
- Pages compose components; components don't import pages
- `MainLayout` wraps all routes via React Router's `<Outlet>`
- Mobile routing: `useIsMobile()` in `App.jsx` renders `MobileAllInOnePage` at `/` and redirects all sub-routes to `/` on mobile
- CSS variables are the only theming mechanism — never hardcode colors in components, always use `var(--token)`
- Inline `style` props are the primary styling pattern inside components; global/shared styles go in `index.css`
- Animations use framer-motion or CSS `@keyframes` — no JS timers for visual transitions
- `scroll-margin-top` on `section[id]` elements accounts for the fixed navbar height
