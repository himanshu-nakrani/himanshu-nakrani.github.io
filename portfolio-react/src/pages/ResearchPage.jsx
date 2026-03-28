import PageHeader from '../components/PageHeader'
import Research from '../components/Research'

export default function ResearchPage() {
  return (
    <>
      <section className="mvp2-page" style={{ paddingBottom: '1.5rem' }}>
        <PageHeader
          kicker="Research"
          title="Publications"
          description="Text-to-SQL, Graph-of-Thoughts, and reasoning-driven augmentation."
          marginBottom="0"
        />
      </section>
      <Research embedded />
    </>
  )
}
