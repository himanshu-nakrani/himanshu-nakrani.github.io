const items = [
  'Text-to-SQL',
  'RAG Systems',
  'AI Agents',
  'LLM Evals',
  'Fine-tuning',
  'FastAPI',
  'Vector Search',
  'Observability',
]

/**
 * MarqueeStrip — full-bleed capability ticker between hero and first section.
 * Content is duplicated for a seamless CSS loop; the clone is aria-hidden and
 * hidden entirely under reduced motion (static centered row instead).
 */
export default function MarqueeStrip() {
  const group = (clone) => (
    <div className="marquee-group" data-clone={clone || undefined} aria-hidden={clone || undefined}>
      {items.map((item) => (
        <span key={item} className="marquee-item">{item}</span>
      ))}
    </div>
  )

  return (
    <div className="marquee-strip" role="presentation">
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}
