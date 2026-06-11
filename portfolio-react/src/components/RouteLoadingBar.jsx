let stylesInjected = false
const BAR_CSS = `
  .route-loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    z-index: 9999;
    overflow: hidden;
    background: transparent;
    pointer-events: none;
  }
  .route-loading-bar::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, var(--color-accent), var(--color-accent-secondary, var(--color-accent)));
    animation: route-loading-slide 1s ease-in-out infinite;
  }
  @keyframes route-loading-slide {
    from { transform: translateX(-100%); }
    to   { transform: translateX(350%); }
  }
  @media (prefers-reduced-motion: reduce) {
    .route-loading-bar::before {
      animation: none;
      width: 100%;
      opacity: 0.6;
    }
  }
`

function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return
  const styleEl = document.createElement('style')
  styleEl.setAttribute('data-route-loading-bar', '')
  styleEl.textContent = BAR_CSS
  document.head.appendChild(styleEl)
  stylesInjected = true
}

export default function RouteLoadingBar() {
  injectStyles()
  return <div className="route-loading-bar" role="status" aria-label="Loading page" />
}
