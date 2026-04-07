import GitHub from '../components/GitHub'
import Kaggle from '../components/Kaggle'
import LeetCode from '../components/LeetCode'
import LiveMetricsDashboard from '../components/LiveMetricsDashboard'
import PageHeader from '../components/PageHeader'
import Research from '../components/Research'

export default function ProfilesPage() {
  return (
    <>
      <section className="mvp2-page" style={{ paddingBottom: '2.5rem' }}>
        <PageHeader
          kicker="Presence"
          title="Profiles & activity"
          description="GitHub, Kaggle, LeetCode, and research — in one scroll."
          marginBottom="0"
        />
      </section>
      <LiveMetricsDashboard />
      <GitHub />
      <Kaggle />
      <LeetCode />
      <Research />
    </>
  )
}
