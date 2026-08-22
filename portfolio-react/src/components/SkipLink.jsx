export function SkipLink({ targetId }) {
  return (
    <a className="skip-link" href={`#${targetId}`}>
      Skip to content
    </a>
  )
}
