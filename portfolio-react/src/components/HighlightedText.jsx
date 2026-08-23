export default function HighlightedText({ text }) {
  if (!text) return null;

  const parts = text.split(/(Alpha Copilot|WealthAI|Agent Forge|75%|25%|95%\+|87%|40%|100\+)/g);

  return (
    <span>
      {parts.map((part, i) => {
        // Since we are splitting by the exact terms and capturing them,
        // the captured terms will always be at odd indices (1, 3, 5, etc.)
        if (i % 2 === 1) {
          return (
            <strong key={i} style={{ color: 'var(--accent2)' }}>
              {part}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
