import Section from '../components/Section'
import BlogSection from '../components/BlogSection'
import { blogPosts } from '../data'

export default function BlogPage() {
  return (
    <Section id="blog" title="Blog & Writing" subtitle="Technical deep-dives and lessons learned">
      <BlogSection posts={blogPosts} />
    </Section>
  )
}
