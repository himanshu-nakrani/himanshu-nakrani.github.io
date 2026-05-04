import { useState, useEffect, useCallback } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, User, Briefcase, Code2, FolderGit2, BookOpen,
  ExternalLink, Github, Linkedin, Mail, Sun, Moon,
  Search, Command as CommandIcon, ArrowRight
} from 'lucide-react'
import { projects, skillCategories, experiences } from '../data'

const pages = [
  { id: 'home', name: 'Home', icon: Home, path: '/', keywords: ['start', 'main'] },
  { id: 'experience', name: 'Experience', icon: Briefcase, path: '/experience', keywords: ['work', 'jobs', 'career'] },
  { id: 'skills', name: 'Skills', icon: Code2, path: '/skills', keywords: ['tech', 'stack', 'languages'] },
  { id: 'projects', name: 'Projects', icon: FolderGit2, path: '/projects', keywords: ['portfolio', 'work', 'apps'] },
  { id: 'research', name: 'Research', icon: BookOpen, path: '/research', keywords: ['papers', 'publications'] },
  { id: 'profiles', name: 'Profiles', icon: User, path: '/profiles', keywords: ['social', 'links', 'contact'] },
]

const quickActions = [
  { id: 'github', name: 'Open GitHub', icon: Github, url: 'https://github.com/himanshu-nakrani', external: true },
  { id: 'linkedin', name: 'Open LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/himanshu-nakrani', external: true },
  { id: 'email', name: 'Send Email', icon: Mail, url: 'mailto:him.nakrani@gmail.com', external: true },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  // Toggle with Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((callback) => {
    setOpen(false)
    setSearch('')
    callback()
  }, [])

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    document.documentElement.style.colorScheme = next
    localStorage.setItem('theme', next)
  }, [])

  const currentTheme = typeof document !== 'undefined' 
    ? document.documentElement.getAttribute('data-theme') 
    : 'dark'

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="cmd-trigger"
        aria-label="Open command palette (Cmd+K)"
      >
        <Search size={14} />
        <span className="cmd-trigger-text">Search...</span>
        <kbd className="cmd-trigger-kbd">
          <CommandIcon size={10} />K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="cmd-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
            />
            
            {/* Command dialog */}
            <motion.div
              className="cmd-dialog-wrapper"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <Command
                className="cmd-dialog"
                loop
                shouldFilter={true}
              >
                <div className="cmd-input-wrapper">
                  <Search size={16} className="cmd-input-icon" />
                  <Command.Input
                    className="cmd-input"
                    placeholder="Search pages, projects, skills..."
                    value={search}
                    onValueChange={setSearch}
                    autoFocus
                  />
                </div>

                <Command.List className="cmd-list">
                  <Command.Empty className="cmd-empty">
                    No results found.
                  </Command.Empty>

                  {/* Navigation */}
                  <Command.Group heading="Navigation" className="cmd-group">
                    {pages.map((page) => (
                      <Command.Item
                        key={page.id}
                        value={`${page.name} ${page.keywords.join(' ')}`}
                        onSelect={() => runCommand(() => navigate(page.path))}
                        className="cmd-item"
                      >
                        <page.icon size={16} />
                        <span>{page.name}</span>
                        <ArrowRight size={12} className="cmd-item-arrow" />
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Projects */}
                  <Command.Group heading="Projects" className="cmd-group">
                    {projects.slice(0, 5).map((project) => (
                      <Command.Item
                        key={project.id}
                        value={`${project.title} ${project.tags?.join(' ') || ''}`}
                        onSelect={() => runCommand(() => {
                          navigate('/projects')
                          // Could implement project detail modal here
                        })}
                        className="cmd-item"
                      >
                        <FolderGit2 size={16} />
                        <span>{project.title}</span>
                        {project.badge && (
                          <span className="cmd-item-badge">{project.badge}</span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Skills */}
                  <Command.Group heading="Skills" className="cmd-group">
                    {skillCategories.slice(0, 4).map((cat) => (
                      <Command.Item
                        key={cat.title}
                        value={`${cat.title} ${cat.items?.map(i => i.name).join(' ') || ''}`}
                        onSelect={() => runCommand(() => navigate('/skills'))}
                        className="cmd-item"
                      >
                        <Code2 size={16} />
                        <span>{cat.title}</span>
                        <span className="cmd-item-count">{cat.items?.length || 0}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Quick Actions */}
                  <Command.Group heading="Quick Actions" className="cmd-group">
                    {quickActions.map((action) => (
                      <Command.Item
                        key={action.id}
                        value={action.name}
                        onSelect={() => runCommand(() => window.open(action.url, '_blank'))}
                        className="cmd-item"
                      >
                        <action.icon size={16} />
                        <span>{action.name}</span>
                        <ExternalLink size={12} className="cmd-item-arrow" />
                      </Command.Item>
                    ))}
                    
                    {/* Theme toggle */}
                    <Command.Item
                      value="toggle theme dark light mode"
                      onSelect={() => runCommand(toggleTheme)}
                      className="cmd-item"
                    >
                      {currentTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                      <span>Toggle {currentTheme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                <div className="cmd-footer">
                  <span>Navigate with <kbd>↑↓</kbd></span>
                  <span>Select with <kbd>↵</kbd></span>
                  <span>Close with <kbd>Esc</kbd></span>
                </div>
              </Command>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .cmd-trigger {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.75rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text-muted);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }
        .cmd-trigger:hover {
          border-color: var(--color-border-strong);
          color: var(--color-text);
        }
        .cmd-trigger-text {
          display: none;
        }
        @media (min-width: 640px) {
          .cmd-trigger-text { display: inline; }
        }
        .cmd-trigger-kbd {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 0.15rem 0.35rem;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--color-text-subtle);
        }

        .cmd-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 25, 47, 0.8);
          backdrop-filter: blur(4px);
          z-index: 9998;
        }

        .cmd-dialog-wrapper {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: min(90vw, 560px);
          z-index: 9999;
        }

        .cmd-dialog {
          background: var(--color-surface);
          border: 1px solid var(--color-border-strong);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          overflow: hidden;
        }

        .cmd-input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--color-border);
        }
        .cmd-input-icon {
          color: var(--color-text-subtle);
          flex-shrink: 0;
        }
        .cmd-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-text);
          font-size: var(--text-base);
          font-family: var(--font-body);
        }
        .cmd-input::placeholder {
          color: var(--color-text-subtle);
        }

        .cmd-list {
          max-height: 360px;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .cmd-empty {
          padding: 2rem;
          text-align: center;
          color: var(--color-text-muted);
          font-size: var(--text-sm);
        }

        .cmd-group {
          padding-bottom: 0.5rem;
        }
        .cmd-group [cmdk-group-heading] {
          padding: 0.5rem 0.75rem 0.25rem;
          font-size: 0.7rem;
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-accent);
          font-family: var(--font-mono);
        }

        .cmd-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-md);
          color: var(--color-text-muted);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: background var(--motion-duration-fast) var(--motion-ease);
        }
        .cmd-item[data-selected="true"],
        .cmd-item:hover {
          background: var(--color-surface-raised);
          color: var(--color-text);
        }
        .cmd-item[data-selected="true"] svg:first-child,
        .cmd-item:hover svg:first-child {
          color: var(--color-accent);
        }
        .cmd-item-arrow {
          margin-left: auto;
          opacity: 0;
          color: var(--color-text-subtle);
          transition: opacity var(--motion-duration-fast) var(--motion-ease);
        }
        .cmd-item[data-selected="true"] .cmd-item-arrow,
        .cmd-item:hover .cmd-item-arrow {
          opacity: 1;
        }
        .cmd-item-badge {
          margin-left: auto;
          padding: 0.1rem 0.4rem;
          background: var(--color-accent-soft);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-size: 0.65rem;
          font-family: var(--font-mono);
          color: var(--color-accent);
          text-transform: uppercase;
        }
        .cmd-item-count {
          margin-left: auto;
          font-size: 0.7rem;
          font-family: var(--font-mono);
          color: var(--color-text-subtle);
        }

        .cmd-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 0.75rem;
          border-top: 1px solid var(--color-border);
          background: var(--color-bg);
          font-size: 0.7rem;
          color: var(--color-text-subtle);
        }
        .cmd-footer kbd {
          padding: 0.1rem 0.3rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xs);
          font-family: var(--font-mono);
          font-size: 0.65rem;
        }
      `}</style>
    </>
  )
}
