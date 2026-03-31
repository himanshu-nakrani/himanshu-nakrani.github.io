const techStack = [
  { category: 'AI/ML', items: ['LLMs', 'RAG', 'Text-to-SQL', 'Fine-tuning', 'Prompt Engineering'] },
  { category: 'Frameworks', items: ['LangChain', 'FastAPI', 'React', 'Node.js'] },
  { category: 'Cloud & Tools', items: ['Azure OpenAI', 'Docker', 'Git', 'PostgreSQL'] },
  { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
]

export default function TechStack() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', 
      gap: 'clamp(2rem, 5vw, 3rem)',
      marginTop: '2rem',
    }}>
      {techStack.map((stack, i) => (
        <div 
          key={stack.category}
          style={{
            opacity: 0,
            animation: `fadeInUp 0.6s ease forwards ${i * 0.1 + 0.2}s`,
          }}
        >
          <h3 
            style={{ 
              fontSize: 'clamp(0.8125rem, 2vw, 0.875rem)',
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              position: 'relative',
              paddingBottom: '0.75rem',
            }}
          >
            {stack.category}
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '2rem',
                height: '1px',
                background: 'var(--accent)',
              }}
            />
          </h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.625rem, 2vw, 0.75rem)',
          }}>
            {stack.items.map((item) => (
              <li 
                key={item}
                style={{
                  fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)',
                  color: 'var(--text2)',
                  fontWeight: 400,
                  paddingLeft: '1rem',
                  position: 'relative',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text2)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '4px',
                    background: 'var(--accent)',
                    borderRadius: '50%',
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
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
