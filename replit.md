# Himanshu Nakrani — AI Engineer Portfolio

React + Vite portfolio site for Himanshu Nakrani, a Generative AI engineer at State Street.

## Stack
- **React 19** + **Vite 8** (in `portfolio-react/` subdirectory)
- **Framer Motion 12** — animations (pre-existing `motion()` deprecation warnings; use `motion.create()` in new code)
- **Tailwind 3** — utility classes
- **lucide-react** — icons
- **react-router-dom v6** — routing

## Running
```
cd portfolio-react && npm run dev
```
Configured as a Replit workflow: `Start application`

## Pages & Routes
| Route | Page | Status |
|-------|------|--------|
| `/` | HomePage | ✅ polished |
| `/experience` | ExperiencePage | ✅ redesigned |
| `/projects` | ProjectsPage | ✅ redesigned |
| `/profiles` | ProfilesPage | ✅ rebuilt |
| `/research` | ResearchPage | ✅ polished |
| `/skills` | SkillsPage | ✅ polished |

## Design Token System
All tokens defined in `portfolio-react/src/styles/tokens.css`.

**Short aliases (use these in JSX inline styles):**
- `--text`, `--text2`, `--text3` — text hierarchy
- `--surface`, `--surface2` — card backgrounds
- `--border`, `--border2` — border weights
- `--accent`, `--accent2`, `--accent3` — brand colors (amber-based)
- `--color-accent` — primary amber (`#d4a24c` dark / `#9c6b21` light)
- `--color-success`, `--color-warning`, `--color-danger`, `--color-info` — status
- `--nav-dot` = `--color-accent`

**Dead tokens (DO NOT USE — will render transparent):**
- `--color-surface` ❌ (use `--surface`)
- `--color-border` ❌ (use `--border`)
- `--color-text` ❌ (use `--text`)
- `--color-text-muted` ❌ (use `--text2`)
- `--green` ❌ (use `#4ade80` or `--color-success`)

## Key Files
- `portfolio-react/src/data.js` — all content (projects, skills, certs, kaggle, publications)
- `portfolio-react/src/index.css` — global styles, btn classes
- `portfolio-react/src/styles/tokens.css` — design token definitions
- `portfolio-react/src/pages/` — page components
- `portfolio-react/src/components/` — shared components

## Page Architecture Notes

### ProjectsPage
- Stats strip (total / production / open source / with metrics)
- **Featured Production** row: 2-col large cards for top production projects
- Regular grid below for remaining projects
- Filter bar: 4 status pills + 8 curated tech tag pills + search
- Click-to-open `ProjectModal` with full details

### ProfilesPage
- 4 platform hub cards (GitHub / Kaggle / LeetCode / LinkedIn) with live stats
- GitHub Activity section: stat grid + contribution heatmap (graceful 404 fallback) + readme-stats images
- Kaggle section: Expert tier cards + counter grid + 6 pinned works
- LeetCode section: stats + leetcard.jacoblin.cool embed

### ExperiencePage
- Career snapshot stats strip (2+yr / 100+ users / 75% / 95%+)
- Company monogram badges (SS / TC)
- Visual progression stepper (Intern → Assoc.2 → Sr.Assoc. → Lead)
- Color-coded achievement categories

### ResearchPage
- Stats strip with icons (Papers / IEEE Published / Accepted / GoT method)
- Paper cards with accent bar, venue + status badges, blockquote description
- Graph-of-Thoughts pipeline diagram
- Research focus callout

### SkillsPage
- Stats strip (46+ skills / 6 domains / 3 cloud / 2+ years)
- "Daily Drivers" spotlight: 8 primary tools as hoverable tiles
- Category filter pills + click-to-focus skill group cards
- Certifications grid with color-coded org accents

## Known Warnings (pre-existing, non-breaking)
- `motion() is deprecated` — Framer Motion v12 API change; use `motion.create()` in new components
- React Router v7 future flags — cosmetic, no behavior impact
