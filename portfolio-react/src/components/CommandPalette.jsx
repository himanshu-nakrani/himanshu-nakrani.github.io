// Command Palette - custom implementation (React + framer-motion only)
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, User, Briefcase, Code2, FolderGit2, BookOpen,
  ExternalLink, Github, Linkedin, Mail, Sun, Moon,
  Search, Command as CommandIcon, ArrowRight, CornerDownLeft,
  FlaskConical, Activity, FileText
} from 'lucide-react'
import { projects } from '../data/projects'
import { skills } from '../data/skills'

/**
 * CommandPalette — lightweight command palette built with React + framer-motion
 * No external dependencies required. Supports fuzzy search, keyboard navigation.
 */

const pages = [
  { id: 'home', name: 'Home', icon: Home, path: '/', keywords: 'start main home' },
  { id: 'experience', name: 'Experience', icon: Briefcase, path: '/experience', keywords: 'work jobs career' },
  { id: 'skills', name: 'Skills', icon: Code2, path: '/skills', keywords: 'tech stack languages' },
  { id: 'projects', name: 'Projects', icon: FolderGit2, path: '/projects', keywords: 'portfolio work apps' },
  { id: 'research', name: 'Research', icon: BookOpen, path: '/research', keywords: 'papers publications' },
  { id: 'lab', name: 'Demo Lab', icon: FlaskConical, path: '/lab', keywords: 'lab demo interactive trace agent retrieval' },
  { id: 'profiles', name: 'Profiles', icon: User, path: '/profiles', keywords: 'social links contact' },
]

const deepDivePages = [
  { id: 'alpha-copilot', name: 'Alpha Copilot Deep Dive', icon: Activity, path: '/projects/alpha-copilot', keywords: 'alpha copilot text-to-sql case study production' },
  { id: 'agent-forge', name: 'Agent Forge Deep Dive', icon: Activity, path: '/projects/agent-forge', keywords: 'agent forge builder case study production' },
  { id: 'fund-rag', name: 'Prospectus RAG Deep Dive', icon: Activity, path: '/projects/fund-prospectus-rag', keywords: 'fund prospectus rag retrieval case study production' },
  { id: 'llama-reasoning', name: 'LLaMA Reasoning Research', icon: FileText, path: '/research/llama-3b-reasoning', keywords: 'llama reasoning fine-tuning qlora research' },
  { id: 'tinymath', name: 'TinyMathReason Research', icon: FileText, path: '/research/tinymathreason-1b', keywords: 'tinymathreason pretraining tpu research' },
]

const quickActions = [
  { id: 'github', name: 'Open GitHub', icon: Github, url: 'https://github.com/himanshu-nakrani', external: true },
  { id: 'linkedin', name: 'Open LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/himanshu-nakrani', external: true },
  { id: 'email', name: 'Send Email', icon: Mail, url: 'mailto:himanshunakrani0@gmail.com', external: true },
  { id: 'resume', name: 'View Resume', icon: FileText, url: '/resume.pdf', external: true },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const listRef = useRef(null)

  // Build all searchable items
  const allItems = useMemo(() => {
    const items = []

    // Pages
    pages.forEach((page) => {
      items.push({
        id: `page-${page.id}`,
        type: 'page',
        name: page.name,
        icon: page.icon,
        keywords: `${page.name} ${page.keywords}`.toLowerCase(),
        action: () => navigate(page.path),
      })
    })

    // Deep-dive pages
    deepDivePages.forEach((page) => {
      items.push({
        id: `deepdive-${page.id}`,
        type: 'page',
        name: page.name,
        icon: page.icon,
        keywords: `${page.name} ${page.keywords}`.toLowerCase(),
        action: () => navigate(page.path),
      })
    })

    // Projects (top 5)
    projects.slice(0, 5).forEach((p) => {
      items.push({
        id: `project-${p.id || p.title}`,
        type: 'project',
        name: p.title,
        badge: p.badge,
        icon: FolderGit2,
        keywords: `${p.title} ${p.tags?.join(' ') || ''} ${p.description || ''}`.toLowerCase(),
        action: () => navigate('/projects'),
      })
    })

    // Skills (top 4)
    skills.slice(0, 4).forEach((cat) => {
      items.push({
        id: `skill-${cat.label}`,
        type: 'skill',
        name: cat.label,
        count: cat.items?.length || 0,
        icon: Code2,
        keywords: `${cat.label} ${cat.items?.join(' ') || ''}`.toLowerCase(),
        action: () => navigate('/skills'),
      })
    })

    // Quick actions
    quickActions.forEach((action) => {
      items.push({
        id: `action-${action.id}`,
        type: 'action',
        name: action.name,
        icon: action.icon,
        external: true,
        keywords: action.name.toLowerCase(),
        action: () => window.open(action.url, '_blank', 'noopener,noreferrer'),
      })
    })

    // Theme toggle
    items.push({
      id: 'action-theme',
      type: 'action',
      name: 'Toggle Theme',
      icon: Sun,
      keywords: 'toggle theme dark light mode',
      action: () => {
        const current = document.documentElement.getAttribute('data-theme')
        const next = current === 'dark' ? 'light' : 'dark'
        if (next === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark')
          document.documentElement.style.colorScheme = 'dark'
        } else {
          document.documentElement.removeAttribute('data-theme')
          document.documentElement.style.colorScheme = 'light'
        }
        localStorage.setItem('theme', next)
      },
    })

    return items
  }, [navigate])

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!search.trim()) return allItems
    const query = search.toLowerCase()
    return allItems.filter((item) => item.keywords.includes(query))
  }, [search, allItems])

  // Group by type
  const groupedItems = useMemo(() => {
    const groups = { page: [], project: [], skill: [], action: [] }
    filteredItems.forEach((item) => {
      if (groups[item.type]) groups[item.type].push(item)
    })
    return groups
  }, [filteredItems])

  // Create a flattened array of items in the exact render order
  // to enable O(1) lookup during delegated events via data-index
  const renderedItems = useMemo(() => {
    return [
      ...groupedItems.page,
      ...groupedItems.project,
      ...groupedItems.skill,
      ...groupedItems.action
    ]
  }, [groupedItems])

  const groupLabels = { page: 'Navigation', project: 'Projects', skill: 'Skills', action: 'Quick Actions' }

  // Route path hints for pages
  const pagePaths = {
    'Home': '/',
    'Experience': '/experience',
    'Skills': '/skills',
    'Projects': '/projects',
    'Research': '/research',
    'Demo Lab': '/lab',
    'Profiles': '/profiles',
    'Alpha Copilot Deep Dive': '/projects/alpha-copilot',
    'Agent Forge Deep Dive': '/projects/agent-forge',
    'Prospectus RAG Deep Dive': '/projects/fund-prospectus-rag',
    'LLaMA Reasoning Research': '/research/llama-3b-reasoning',
    'TinyMathReason Research': '/research/tinymathreason-1b',
  }

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  // Memoized event handlers for delegation
  const handleListMouseOver = useCallback((e) => {
    const itemEl = e.target.closest('[data-index]')
    if (itemEl) {
      const idx = parseInt(itemEl.getAttribute('data-index'), 10)
      if (!isNaN(idx)) {
        setSelectedIndex(idx)
      }
    }
  }, [])

  const handleListClick = useCallback((e) => {
    const itemEl = e.target.closest('[data-index]')
    if (itemEl) {
      const idx = parseInt(itemEl.getAttribute('data-index'), 10)
      if (!isNaN(idx)) {
        const item = renderedItems[idx]
        if (item) {
          item.action()
          setOpen(false)
        }
      }
    }
  }, [renderedItems])

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setSearch('')
      setSelectedIndex(0)
    }
  }, [open])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const item = filteredItems[selectedIndex]
        if (item) {
          item.action()
          setOpen(false)
        }
      }
    },
    [filteredItems, selectedIndex]
  )

  // Scroll selected into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  let globalIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10, 25, 47, 0.75)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 9998,
            }}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
            style={{
              position: 'fixed',
              top: '18%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(90vw, 520px)',
              maxHeight: '65vh',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 16,
              boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
              overflow: 'hidden',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 18px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <Search size={17} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                aria-label="Search command palette"
                placeholder="Search pages, projects, skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.95rem',
                  color: 'var(--color-text)',
                  fontFamily: 'inherit',
                }}
              />
              <kbd
                style={{
                  padding: '4px 8px',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 6,
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-muted)',
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              style={{ flex: 1, overflowY: 'auto', padding: 8 }}
              onClick={handleListClick}
              onMouseOver={handleListMouseOver}
            >
              {filteredItems.length === 0 ? (
                <div style={{ padding: '28px 16px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                  No results found for "{search}"
                </div>
              ) : (
                Object.entries(groupedItems).map(([type, items], groupIndex, arr) => {
                  if (items.length === 0) return null
                  const isLastGroup = groupIndex === arr.length - 1
                  return (
                    <div key={type} style={{ marginBottom: isLastGroup ? 0 : 10 }}>
                      <div
                        style={{
                          padding: '6px 10px 3px',
                          fontSize: '0.62rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--color-text-subtle)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {groupLabels[type]}
                      </div>
                      {items.map((item) => {
                        globalIndex++
                        const idx = globalIndex
                        const isSelected = idx === selectedIndex
                        const Icon = item.icon
                        const routePath = pagePaths[item.name]
                        return (
                          <div
                            key={item.id}
                            data-index={idx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '8px 10px',
                              borderRadius: 8,
                              cursor: 'pointer',
                              background: isSelected ? 'var(--color-surface-raised)' : 'transparent',
                              transition: 'background 0.1s ease',
                            }}
                          >
                            <Icon
                              size={15}
                              style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text-muted)', flexShrink: 0 }}
                            />
                            <span style={{ flex: 1, fontSize: '0.84rem', color: 'var(--color-text)', fontWeight: 500 }}>
                              {item.name}
                            </span>
                            {routePath && (
                              <span style={{
                                fontSize: '0.62rem',
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--color-text-subtle)',
                                opacity: 0.5,
                              }}>
                                {routePath}
                              </span>
                            )}
                            {item.badge && (
                              <span
                                style={{
                                  padding: '2px 6px',
                                  fontSize: '0.6rem',
                                  fontFamily: 'var(--font-mono)',
                                  textTransform: 'uppercase',
                                  background: 'var(--color-bg)',
                                  border: '1px solid var(--color-border)',
                                  borderRadius: 4,
                                  color: 'var(--color-accent)',
                                }}
                              >
                                {item.badge}
                              </span>
                            )}
                            {item.count !== undefined && (
                              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                                {item.count}
                              </span>
                            )}
                            {item.external && <ExternalLink size={12} style={{ color: 'var(--color-text-muted)' }} />}
                            {isSelected && !item.external && (
                              <CornerDownLeft size={13} style={{ color: 'var(--color-text-muted)' }} />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                padding: '10px 14px',
                borderTop: '1px solid var(--color-border)',
                fontSize: '0.68rem',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
                background: 'var(--color-bg)',
              }}
            >
              <span><kbd style={{ padding: '2px 5px', background: 'var(--color-surface)', borderRadius: 4 }}>↑↓</kbd> navigate</span>
              <span><kbd style={{ padding: '2px 5px', background: 'var(--color-surface)', borderRadius: 4 }}>↵</kbd> select</span>
              <span style={{ marginLeft: 'auto' }}>{filteredItems.length} results</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
