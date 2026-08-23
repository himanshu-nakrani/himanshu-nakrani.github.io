import { useOutletContext } from 'react-router-dom'
import HeroEnhanced from '../components/HeroEnhanced'
import HomeBentoDashboard from '../components/HomeBentoDashboard'
import SectionNav from '../components/SectionNav'
import SEO from '../components/SEO'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'highlights', label: 'Selected Work' },
]

export default function HomePage() {
  const { designMode = 'classic' } = useOutletContext() || {}

  return (
    <>
      <SEO
        title="Home | Himanshu Nakrani"
        description="Production LLM systems, RAG pipelines, Text-to-SQL work, research deep dives, and contact details for Himanshu Nakrani."
      />
      {/* Desktop section navigation */}
      <SectionNav sections={sections} />

      {/* 1 — Hero */}
      <HeroEnhanced designMode={designMode} />

      {/* 2 — Balanced bento overview */}
      <HomeBentoDashboard />
    </>
  )
}
