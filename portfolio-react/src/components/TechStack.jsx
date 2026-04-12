import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Brain, Bot, Database, Cloud, Code2, Layers,
  Cpu, Sparkles, Search, Wrench, Server, Globe,
  FileCode, Terminal, Braces, Hash,
  HardDrive, BarChart3, Warehouse, Zap,
  Container, GitBranch, CloudCog, Lock,
} from 'lucide-react'

const iconFor = (name) => {
  const map = {
    'LLMs': Brain, 'RAG': Search, 'Text-to-SQL': Database, 'Fine-tuning': Wrench,
    'Prompt Engineering': Sparkles, 'AI Agents': Bot, 'OpenAI API': Cpu,
    'Azure OpenAI': Cloud, 'LangChain': Layers, 'Google ADK': Globe,
    'CNNs': Cpu, 'LSTM': BarChart3, 'XGBoost': Zap, 'Random Forest': Layers,
    'Feature Engineering': Wrench, 'Model Deployment': Server,
    'scikit-learn': Braces, 'TensorFlow': Brain,
    'FastAPI': Zap, 'ASP.NET Core': Server, 'REST APIs': Globe,
    'SQLAlchemy': Database, 'WebSocket': Zap, 'Microservices': Layers,
    'Python': FileCode, 'SQL': Database, 'TypeScript': Braces,
    'Java': Code2, 'C#': Hash, 'C/C++': Terminal, 'Shell/Perl': Terminal,
    'PostgreSQL': Database, 'pgvector': Search, 'SQLite': HardDrive,
    'Vector DBs': Search, 'Semantic Search': Sparkles, 'Redis': Zap,
    'Pandas': BarChart3, 'NumPy': Hash,
    'Azure': Cloud, 'AWS': CloudCog, 'OCI': Cloud, 'Databricks': Warehouse,
    'CI/CD': GitBranch, 'Docker': Container, 'Azure OpenAI Studio': Lock,
  }
  return map[name] || Code2
}

const techStack = [
  { category: 'AI & LLMs', icon: '🤖', color: 'var(--accent)', items: ['LLMs', 'RAG', 'Text-to-SQL', 'Fine-tuning', 'Prompt Engineering', 'AI Agents', 'OpenAI API', 'Azure OpenAI', 'LangChain', 'Google ADK'] },
  { category: 'Machine Learning', icon: '🧠', color: 'var(--accent2)', items: ['CNNs', 'LSTM', 'XGBoost', 'Random Forest', 'Feature Engineering', 'Model Deployment', 'scikit-learn', 'TensorFlow'] },
  { category: 'Backend & APIs', icon: '⚙️', color: 'var(--accent3)', items: ['FastAPI', 'ASP.NET Core', 'REST APIs', 'SQLAlchemy', 'WebSocket', 'Microservices'] },
  { category: 'Languages', icon: '💻', color: 'var(--nav-dot)', items: ['Python', 'SQL', 'TypeScript', 'Java', 'C#', 'C/C++', 'Shell/Perl'] },
  { category: 'Data & Databases', icon: '🗄️', color: 'var(--green)', items: ['PostgreSQL', 'pgvector', 'SQLite', 'Vector DBs', 'Semantic Search', 'Redis', 'Pandas', 'NumPy'] },
  { category: 'Cloud & DevOps', icon: '☁️', color: 'var(--accent)', items: ['Azure', 'AWS', 'OCI', 'Databricks', 'CI/CD', 'Docker', 'Azure OpenAI Studio'] },
]

function TechPill({ name, color, delay }) {
  const Icon = iconFor(name)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-card"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.45rem 0.85rem',
        borderRadius: 9999,
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      <Icon size={14} style={{ color, flexShrink: 0, position: 'relative', zIndex: 1 }} />
      <span style={{
        fontSize: '0.8rem',
        fontWeight: 500,
        color: 'var(--text)',
        whiteSpace: 'nowrap',
        position: 'relative',
        zIndex: 1,
      }}>
        {name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 5vw, 3rem)', marginTop: '1rem' }}>
      {techStack.map((group, gi) => (
        <div key={group.category}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.1rem' }}>{group.icon}</span>
            <h3 style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}>
              {group.category}
            </h3>
            <span style={{ flex: 1, height: 1, background: 'var(--glass-border)', marginLeft: '0.5rem' }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {group.items.map((item, ii) => (
              inView ? (
                <TechPill key={item} name={item} color={group.color} delay={gi * 0.06 + ii * 0.03} />
              ) : (
                <div key={item} style={{ opacity: 0, padding: '0.45rem 0.85rem' }} />
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
