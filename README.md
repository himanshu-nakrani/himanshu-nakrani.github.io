# himanshu-nakrani.github.io

Personal portfolio &mdash; AI/ML engineer focused on production LLM systems, RAG pipelines, and model fine-tuning.

**Live:** [www.himanshunakrani.me](https://www.himanshunakrani.me)

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS 3, Framer Motion |
| Routing | React Router v6 |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| Hosting | Vercel (`portfolio-react/` project root) |

The legacy `himanshu-nakrani.github.io` GitHub Pages URL is retained only as a redirect to the Vercel-hosted production domain. For the cleanest retirement, disable GitHub Pages in repository Settings → Pages.

## Pages

- **Home** &mdash; hero, featured projects, case study workbench, technical rail
- **Projects** &mdash; full portfolio with search, status/tech filters, detail modals, deep-dive pages
- **Research** &mdash; LLM fine-tuning, pretraining, and publications
- **Experience** &mdash; career timeline with progression steps
- **Skills** &mdash; categorized skill matrix
- **Profiles** &mdash; GitHub, Kaggle, LeetCode, and LinkedIn stats
- **Lab** &mdash; interactive demos (trace replay, agent run viewer, RAG retrieval inspector, model training panel)
- **Minimal SPA** &mdash; lightweight alternate view at `/minimal`

## Project structure

```
portfolio-react/     # React SPA (current site; Vercel project root)
  public/            # Static public assets (favicon, OG image, sitemap, robots)
  src/
    components/      # Reusable UI components
    pages/           # Route-level page components
    layouts/         # Main layout shell
    hooks/           # Custom React hooks
    lib/             # Theme + utility helpers
    data.js          # Portfolio data entry point
index.html           # Minimal GitHub Pages redirect to the Vercel domain
```

## Development

```bash
cd portfolio-react
pnpm install
pnpm run dev        # Start Vite dev server
pnpm run lint       # ESLint quality gate
pnpm test           # Vitest suite
pnpm run build      # Production build
pnpm run preview    # Preview production build
```

## License

MIT &mdash; feel free to use as a portfolio template with attribution.
