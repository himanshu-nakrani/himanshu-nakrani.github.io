1. **Identify Performance Bottleneck**: `portfolio-react/src/onepager/hooks/useCountUp.js` uses `requestAnimationFrame` and `useState` for numeric count-up animations. This is a known anti-pattern (documented in memory) as it triggers a React re-render on every frame, causing unnecessary garbage collection churn and potential layout thrashing on the main thread.
2. **Implement Solution**: Refactor `portfolio-react/src/onepager/hooks/useCountUp.js` to use `framer-motion` hooks (`useMotionValue`, `useSpring`, `useTransform`). This will allow DOM-level updates that completely bypass React re-renders. The hook should return an object `{ value: MotionValue | string, suffix: string }`.
3. **Verify Functionality**: Update `portfolio-react/src/onepager/components/Hero.jsx` (which consumes `useCountUp`) to use `<motion.span>` for displaying the animated value `count`.
4. **Testing & Linting**: Run `pnpm lint` and `pnpm test` to ensure no regressions.
5. **Pre-commit Steps**: Run `pre_commit_instructions` tool.
6. **Submit PR**: Create a PR with title "⚡ Bolt: [performance improvement]".
