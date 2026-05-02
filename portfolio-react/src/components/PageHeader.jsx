/**
 * Page title block with enhanced kicker + H1 + lede.
 */
export default function PageHeader({ kicker, title, description, marginBottom = '2.5rem' }) {
  return (
    <header style={{ marginBottom, position: 'relative' }}>
      {kicker && (
        <p className="mvp2-kicker">{kicker}</p>
      )}
      <h1 className="mvp2-page-title">{title}</h1>
      {description && (
        <p className="mvp2-page-lede">{description}</p>
      )}
    </header>
  )
}
