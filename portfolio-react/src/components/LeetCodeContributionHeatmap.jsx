import ContributionHeatmap from './ContributionHeatmap'

export default function LeetCodeContributionHeatmap({
  src = 'leetcode-contributions.json',
  username = 'himanshunakrani0',
}) {
  return (
    <ContributionHeatmap
      src={src}
      username={username}
      profileHref={`https://leetcode.com/u/${username}/`}
      title="Submission heatmap"
      unitSingular="submission"
      unitPlural="submissions"
      summaryLabel="submissions in the last year"
      ariaLabel="LeetCode daily submission heatmap"
    />
  )
}