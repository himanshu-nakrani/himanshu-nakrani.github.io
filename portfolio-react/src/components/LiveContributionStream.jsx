import useSWR from 'swr'
import { motion, useReducedMotion } from 'framer-motion'
const fetcher=url=>fetch(url).then(response=>{if(!response.ok)throw new Error('Activity unavailable');return response.json()})

function getContributionDays(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.contributions)) return data.contributions
  if (Array.isArray(data?.days)) return data.days

  const selectedYear = data?.defaultYear
  const year = data?.years?.[selectedYear] || Object.values(data?.years || {})[0]
  return Array.isArray(year?.contributions) ? year.contributions : []
}

function normalizeGithub(data) {
  return getContributionDays(data)
    .map((item) => ({ date: item.date || item.day, count: Number(item.count || item.contributionCount || 0), source: 'GitHub' }))
    .filter((item) => item.date && item.count > 0)
}

function normalizeLeetCode(data) {
  return getContributionDays(data)
    .map((item) => ({ date: item.date || item.day, count: Number(item.count || item.submissions || 0), source: 'LeetCode' }))
    .filter((item) => item.date && item.count > 0)
}
export default function LiveContributionStream(){ const reduce=useReducedMotion(); const github=useSWR('/gh-contributions.json',fetcher); const leetcode=useSWR('/leetcode-contributions.json',fetcher); const events=[...normalizeGithub(github.data),...normalizeLeetCode(leetcode.data)].sort((a,b)=>a.date.localeCompare(b.date)).slice(-42); const max=Math.max(1,...events.map(event=>event.count)); return <section className="signature-visual activity-stream" aria-labelledby="activity-stream-title"><header className="signature-visual__header"><div><span>Local activity datasets</span><h2 id="activity-stream-title">Live contribution stream</h2></div><p>Recent contribution intensity derived from the generated GitHub and LeetCode snapshots.</p></header>{events.length?<div className="activity-stream__track" role="img" aria-label={`${events.length} recent contribution events`}><div className="activity-stream__line"/>{events.map((event,index)=><motion.div key={`${event.source}-${event.date}`} className={`activity-stream__event is-${event.source.toLowerCase()}`} style={{'--event-size':`${8+(event.count/max)*18}px`}} title={`${event.source}: ${event.count} on ${event.date}`} initial={reduce?false:{opacity:0,scale:.4}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:index*.025}}><span className="sr-only">{event.source}: {event.count} contributions on {event.date}</span></motion.div>)}</div>:<p className="activity-stream__empty">Loading local activity snapshots…</p>}<div className="activity-stream__legend"><span>Older</span><span><i className="is-github"/>GitHub</span><span><i className="is-leetcode"/>LeetCode</span><span>Recent</span></div></section> }
