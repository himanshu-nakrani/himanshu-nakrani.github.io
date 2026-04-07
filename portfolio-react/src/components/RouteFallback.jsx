export default function RouteFallback() {
  return (
    <div className="route-fallback" aria-live="polite">
      <div className="route-fallback__pulse" />
      <p>Loading the next section…</p>
    </div>
  )
}
