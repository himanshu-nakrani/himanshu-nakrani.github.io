import { useOutletContext } from 'react-router-dom'
import HeroEnhanced from '../components/HeroEnhanced'
import HomeBentoDashboard from '../components/HomeBentoDashboard'
import SEO from '../components/SEO'

export default function HomePage() {
  const { designMode = 'classic' } = useOutletContext() || {}

  return (
    <>
      <SEO
        title="Home | Himanshu Nakrani"
        description="Production LLM systems, RAG pipelines, Text-to-SQL work, research deep dives, and contact details for Himanshu Nakrani."
      />

      {/* 1 — Hero */}
      <HeroEnhanced designMode={designMode} />

      {/* 2 — Balanced bento overview */}
      <HomeBentoDashboard />
    </>
  )
}
