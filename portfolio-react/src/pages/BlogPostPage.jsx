import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { blogPosts } from '../data'
import Tag from '../components/Tag'

export default function BlogPostPage() {
  const { id } = useParams()
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Post not found</h1>
        <Link to="/blog" style={{ color: 'var(--accent)' }}>← Back to Blog</Link>
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 4rem) var(--page-pad-x)',
      }}
    >
      <Link
        to="/blog"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--accent)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.2 }}>
        {post.title}
      </h1>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text2)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={16} />
          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={16} />
          {post.readTime} read
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
        {post.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>

      <div
        style={{
          fontSize: '1.05rem',
          lineHeight: 1.8,
          color: 'var(--text2)',
          whiteSpace: 'pre-wrap',
        }}
      >
        {post.content}
      </div>
    </motion.article>
  )
}
