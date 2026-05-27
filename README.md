# himanshu-nakrani.github.io

Personal portfolio &mdash; AI/ML engineer focused on production LLM systems, RAG pipelines, and model fine-tuning.

**Live:** [himanshu-nakrani.github.io](https://himanshu-nakrani.github.io)

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS 3, Framer Motion |
| Routing | React Router v6 |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| Hosting | GitHub Pages (via Vercel) |

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
portfolio-react/     # React SPA (current site)
  src/
    components/      # Reusable UI components
    pages/           # Route-level page components
    layouts/         # Main layout shell
    hooks/           # Custom React hooks
    lib/             # Theme + utility helpers
    data.js          # All portfolio data (projects, skills, publications, etc.)
assets/              # Static assets (OG image, favicon)
index.html           # Root redirect to built SPA
```

## Development

```bash
cd portfolio-react
npm install
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview production build
```

## License

MIT &mdash; feel free to use as a portfolio template with attribution.
