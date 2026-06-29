import ContributionHeatmap from './ContributionHeatmap'

export default function GitHubContributionHeatmap({
  src = 'gh-contributions.json',
  username = 'himanshu-nakrani',
}) {
  return (
    <ContributionHeatmap
      src={src}
      username={username}
      profileHref={`https://github.com/${username}`}
      title="Contribution heatmap"
      unitSingular="contribution"
      unitPlural="contributions"
      summaryLabel="contributions in the last year"
      ariaLabel="GitHub daily contribution heatmap"
    />
  )
}