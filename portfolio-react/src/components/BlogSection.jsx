import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Tag from './Tag'

export default function BlogSection({ posts }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          style={{
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.4 }}>
              {post.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.6 }}>
              {post.excerpt}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text2)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {post.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>

          <Link
            to={`/blog/${post.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginTop: 'auto',
            }}
          >
            Read More
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
