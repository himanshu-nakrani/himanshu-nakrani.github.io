export default function CurrentFocus({ items, lastUpdated }) {
  return (
    <section aria-label="Current focus">
      <style>{`
        .focus-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .focus-item {
          padding: 1rem 1.25rem;
          background: var(--card-bg, var(--bg2));
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 10px);
        }

        .focus-area {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          margin-bottom: 0.4rem;
        }

        .focus-description {
          margin: 0 0 0.75rem;
          font-size: 0.9rem;
          color: var(--text);
          line-height: 1.55;
        }

        .focus-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .focus-tag {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 9999px;
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          color: var(--accent);
          border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
        }

        .focus-last-updated {
          margin-top: 1rem;
          font-size: 0.75rem;
          color: var(--text2, var(--muted));
        }
      `}</style>

      <h3 style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--text2, var(--muted))',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '1rem',
      }}>
        What I&apos;m working on
      </h3>

      <ul className="focus-list">
        {items.map(item => (
          <li key={item.area} className="focus-item">
            <strong className="focus-area">{item.area}</strong>
            <p className="focus-description">{item.description}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="focus-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="focus-tag">{tag}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {lastUpdated && (
        <p className="focus-last-updated">Updated {lastUpdated}</p>
      )}
    </section>
  )
}
