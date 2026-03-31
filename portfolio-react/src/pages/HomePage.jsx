import Hero from '../components/Hero'
import LiveMetricsDashboard from '../components/LiveMetricsDashboard'
import Section from '../components/Section'
import TestimonialsSection from '../components/TestimonialsSection'
import BlogSection from '../components/BlogSection'
import ContactForm from '../components/ContactForm'
import Contact from '../components/Contact'
import { testimonials, blogPosts } from '../data'

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <Section id="metrics" title="Live Activity" subtitle="Real-time stats from GitHub, Kaggle, and LeetCode">
        <LiveMetricsDashboard />
      </Section>

      <Section id="testimonials" title="Impact & Feedback" subtitle="What users say about the systems I've built" alt>
        <TestimonialsSection testimonials={testimonials} />
      </Section>

      <Section id="recent-posts" title="Latest Writing" subtitle="Technical insights and lessons learned">
        <BlogSection posts={blogPosts.slice(0, 3)} />
      </Section>

      <Section id="contact-form" title="Get in Touch" alt>
        <ContactForm />
      </Section>

      <Contact />
    </>
  )
}
