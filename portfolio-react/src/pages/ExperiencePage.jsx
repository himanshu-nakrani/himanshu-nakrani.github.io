import PageHeader from '../components/PageHeader'
import CareerTimeline from '../components/CareerTimeline'
import SEO from '../components/SEO'

export default function ExperiencePage() {
  return (
    <>
      <SEO
        title="Experience | Himanshu Nakrani"
        description="Career timeline covering LLM backends, RAG pipelines, Text-to-SQL systems, and agent tooling for financial workflows."
      />
      <section className="mvp2-page">
      <PageHeader
        kicker="Experience"
        title="Career Timeline"
        description="LLM backends, RAG pipelines, Text-to-SQL systems, and agent tooling for financial-data workflows."
      />
      <CareerTimeline />
      </section>
    </>
  )
}
