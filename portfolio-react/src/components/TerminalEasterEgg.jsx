import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X } from 'lucide-react'

const commands = {
  help: 'Available commands: about, skills, projects, experience, contact, clear, exit',
  about: 'AI Software Developer at State Street Corporation. Building production LLM systems.',
  skills: 'LLMs • RAG • Text-to-SQL • FastAPI • Python • Azure OpenAI • LangChain',
  projects: 'Alpha Copilot • Agent Forge • WealthAI • Fund Prospectus RAG',
  experience: '2+ years in AI/ML • 100+ users served • 2 publications',
  contact: 'GitHub: himanshu-nakrani • LinkedIn: himanshu-nakrani',
  clear: '__CLEAR__',
  exit: '__EXIT__',
  ls: 'projects/ experience/ skills/ research/ contact/',
  whoami: 'himanshu-nakrani',
  pwd: '/home/himanshu/portfolio',
}

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState([{ type: 'output', text: 'Welcome to Himanshu\'s Portfolio Terminal! Type "help" for commands.' }])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const historyRef = useRef(null)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    setHistory((prev) => [...prev, { type: 'input', text: `$ ${cmd}` }])

    if (trimmed === '') return

    if (commands[trimmed]) {
      if (commands[trimmed] === '__CLEAR__') {
        setHistory([])
      } else if (commands[trimmed] === '__EXIT__') {
        setIsOpen(false)
        setHistory([{ type: 'output', text: 'Welcome to Himanshu\'s Portfolio Terminal! Type "help" for commands.' }])
      } else {
        setHistory((prev) => [...prev, { type: 'output', text: commands[trimmed] }])
      }
    } else {
      setHistory((prev) => [...prev, { type: 'error', text: `Command not found: ${trimmed}. Type "help" for available commands.` }])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--accent)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          zIndex: 999,
        }}
        title="Open Terminal (Ctrl + `)"
      >
        <Terminal size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '6rem',
              right: '2rem',
              width: 'min(600px, calc(100vw - 4rem))',
              height: 400,
              background: '#1e1e1e',
              border: '1px solid #333',
              borderRadius: 12,
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div style={{ background: '#2d2d2d', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={16} style={{ color: '#4ade80' }} />
                <span style={{ fontSize: '0.85rem', color: '#e5e5e5', fontFamily: "'Fira Code', monospace" }}>
                  terminal@portfolio
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={historyRef}
              style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                fontFamily: "'Fira Code', monospace",
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}
            >
              {history.map((item, i) => (
                <div
                  key={i}
                  style={{
                    color: item.type === 'input' ? '#4ade80' : item.type === 'error' ? '#ef4444' : '#e5e5e5',
                    marginBottom: '0.5rem',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {item.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1rem', borderTop: '1px solid #333', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: '#4ade80', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem' }}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#e5e5e5',
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '0.85rem',
                }}
                placeholder="Type a command..."
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
