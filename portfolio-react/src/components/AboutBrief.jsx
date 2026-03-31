export default function AboutBrief() {
  const highlights = [
    {
      title: 'Production AI Systems',
      description: 'Building LLM-powered applications serving 100+ users at State Street Corporation',
    },
    {
      title: 'Research to Reality',
      description: 'Translating cutting-edge AI research into practical, scalable solutions',
    },
    {
      title: 'Performance Focused',
      description: 'Achieved 75% latency reduction through optimization and architectural improvements',
    },
  ]

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', 
      gap: 'clamp(1.5rem, 4vw, 2.5rem)',
      marginTop: '2rem',
    }}>
      {highlights.map((item, i) => (
        <div 
          key={item.title}
          style={{
            padding: 'clamp(1.5rem, 4vw, 2rem) 0',
            borderTop: '1px solid var(--border)',
            opacity: 0,
            animation: `fadeInUp 0.6s ease forwards ${i * 0.15}s`,
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderTopColor = 'var(--accent)'}
          onMouseLeave={(e) => e.currentTarget.style.borderTopColor = 'var(--border)'}
        >
          <h3 
            style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              fontWeight: 600,
              color: 'var(--text)',
              marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)',
              letterSpacing: '-0.01em',
            }}
          >
            {item.title}
          </h3>
          <p 
            style={{
              fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)',
              color: 'var(--text2)',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            {item.description}
          </p>
        </div>
      ))}
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
