import Hero from '../components/Hero'
import AboutBrief from '../components/AboutBrief'
import TechStack from '../components/TechStack'
import LiveMetricsDashboard from '../components/LiveMetricsDashboard'
import Section from '../components/Section'
import Contact from '../components/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <Section id="about" title="What I Do" subtitle="Focused on building production-ready AI systems that solve real problems">
        <AboutBrief />
      </Section>

      <Section id="tech" title="Tech Stack" subtitle="Tools and technologies I work with" alt>
        <TechStack />
      </Section>
      
      <Section id="metrics" title="Live Activity" subtitle="Real-time stats from GitHub, Kaggle, and LeetCode">
        <LiveMetricsDashboard />
      </Section>

      <Contact />
    </>
  )
}
