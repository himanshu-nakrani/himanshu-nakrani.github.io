import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Tag from './Tag'

const techRelations = {
  'FastAPI': ['SQLAlchemy', 'PostgreSQL', 'Azure', 'Python'],
  'LangChain': ['OpenAI API', 'RAG', 'pgvector', 'Python'],
  'Azure OpenAI': ['LLMs', 'Fine-tuning', 'LoRA/PEFT'],
  'PostgreSQL': ['pgvector', 'SQLAlchemy'],
  'React': ['TypeScript', 'Vite'],
}

export default function TechStackVisualization({ skills }) {
  const [selectedTech, setSelectedTech] = useState(null)
  const [filterCategory, setFilterCategory] = useState('all')

  // ⚡ Bolt: Optimize relatedTechs lookup (O(1) Set instead of O(n) Array)
  const { relatedTechs, relatedTechsSet } = useMemo(() => {
    const arr = selectedTech ? techRelations[selectedTech] || [] : []
    return { relatedTechs: arr, relatedTechsSet: new Set(arr) }
  }, [selectedTech])

  // ⚡ Bolt: Memoize categories calculation to prevent array recreation on every render
  const categories = useMemo(() => ['all', ...skills.map(s => s.label)], [skills])

  return (
    <div>
      <div
        role="group"
        aria-label="Filter technologies"
        style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
      >
        {categories.map((cat) => (
          <motion.button
            type="button"
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterCategory(cat)}
            aria-pressed={filterCategory === cat}
            aria-label={`Filter by ${cat}`}
            style={{
              background: filterCategory === cat ? 'var(--accent)' : 'var(--surface2)',
              color: filterCategory === cat ? 'white' : 'var(--text2)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {skills
          .filter(category => filterCategory === 'all' || filterCategory === category.label)
          .map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent)' }}>
                {category.label}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {category.items.map((tech, techIndex) => {
                  const isSelected = selectedTech === tech
                  // ⚡ Bolt: Use O(1) Set lookup instead of O(n) array .includes()
                  const isRelated = relatedTechsSet.has(tech)
                  const shouldHighlight = !selectedTech || isSelected || isRelated

                  return (
                    <motion.button
                      type="button"
                      key={tech}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: shouldHighlight ? 1 : 0.3,
                        x: 0,
                        scale: isSelected ? 1.05 : 1,
                      }}
                      transition={{ delay: catIndex * 0.1 + techIndex * 0.05 }}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedTech(isSelected ? null : tech)}
                      aria-pressed={isSelected}
                      style={{
                        background: isSelected ? 'var(--accent)' : 'var(--surface2)',
                        color: isSelected ? 'white' : 'var(--text)',
                        border: `1px solid ${isRelated ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 8,
                        padding: '0.75rem 1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        position: 'relative',
                        textAlign: 'left',
                        width: '100%',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{tech}</span>
                        {techRelations[tech] && (
                          <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                            {techRelations[tech].length} connections
                          </span>
                        )}
                      </div>
                      {isRelated && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            height: 2,
                            background: 'var(--accent)',
                          }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ))}
      </div>

      {selectedTech && relatedTechs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'var(--surface2)',
            border: '1px solid var(--accent)',
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: '0.75rem' }}>
            <strong style={{ color: 'var(--accent)' }}>{selectedTech}</strong> connects with:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {relatedTechs.map(tech => <Tag key={tech}>{tech}</Tag>)}
          </div>
        </motion.div>
      )}
    </div>
  )
}
