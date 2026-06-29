/**
 * Prebuild fetch for LeetCode profile stats and submission calendar.
 *
 * Uses LeetCode's public GraphQL API. Writes public/leetcode-contributions.json
 * in the same shape as gh-contributions.json for the shared heatmap component.
 * Committed output is the fallback when the API is unreachable.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')
const JSON_OUT = join(PUBLIC_DIR, 'leetcode-contributions.json')

const USERNAME = 'himanshunakrani0'
const GRAPHQL_URL = 'https://leetcode.com/graphql/'
const TIMEOUT_MS = 10000
const LOOKBACK_DAYS = 366

const PROFILE_QUERY = `
  query leetCodeProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum { difficulty count }
      }
      profile { ranking reputation }
      userCalendar { activeYears }
    }
  }
`

const CALENDAR_QUERY = `
  query leetCodeCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
      }
    }
  }
`

function countToLevel(count) {
  if (!count) return 0
  if (count === 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

function epochToDate(epochSec) {
  return new Date(Number(epochSec) * 1000).toISOString().slice(0, 10)
}

function buildDailyContributions(byDate) {
  const days = []
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  for (let offset = LOOKBACK_DAYS; offset >= 0; offset--) {
    const d = new Date(today)
    d.setUTCDate(d.getUTCDate() - offset)
    const date = d.toISOString().slice(0, 10)
    const count = byDate.get(date) || 0
    days.push({ date, count, level: countToLevel(count) })
  }

  return days
}

async function graphql(query, variables) {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`LeetCode GraphQL failed: ${res.status}`)
  const body = await res.json()
  if (body.errors?.length) {
    throw new Error(body.errors.map((e) => e.message).join('; '))
  }
  return body.data
}

function parseSubmissionCalendar(raw) {
  if (!raw) return {}
  const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
  return parsed
}

export function buildLeetCodePayload(profileData, calendarsByYear) {
  const matched = profileData?.matchedUser
  if (!matched) throw new Error('LeetCode user not found')

  const byDifficulty = Object.fromEntries(
    (matched.submitStats?.acSubmissionNum || []).map((row) => [row.difficulty, row.count]),
  )

  const byDate = new Map()
  for (const calendar of Object.values(calendarsByYear)) {
    const entries = parseSubmissionCalendar(calendar)
    for (const [epoch, count] of Object.entries(entries)) {
      const date = epochToDate(epoch)
      byDate.set(date, (byDate.get(date) || 0) + Number(count))
    }
  }

  const contributions = buildDailyContributions(byDate)

  return {
    user: matched.username || USERNAME,
    fetchedAt: new Date().toISOString(),
    total: contributions.reduce((sum, day) => sum + day.count, 0),
    stats: {
      solved: byDifficulty.All ?? 0,
      easy: byDifficulty.Easy ?? 0,
      medium: byDifficulty.Medium ?? 0,
      hard: byDifficulty.Hard ?? 0,
      ranking: matched.profile?.ranking ?? null,
    },
    contributions,
  }
}

async function fetchPayload() {
  const profileData = await graphql(PROFILE_QUERY, { username: USERNAME })
  const activeYears = profileData.matchedUser?.userCalendar?.activeYears || []
  const currentYear = new Date().getUTCFullYear()
  const years = [...new Set([...activeYears, currentYear])].sort()

  const calendarsByYear = {}
  await Promise.all(
    years.map(async (year) => {
      const data = await graphql(CALENDAR_QUERY, { username: USERNAME, year })
      calendarsByYear[year] = data.matchedUser?.userCalendar?.submissionCalendar
    }),
  )

  return buildLeetCodePayload(profileData, calendarsByYear)
}

async function main() {
  mkdirSync(PUBLIC_DIR, { recursive: true })

  try {
    const payload = await fetchPayload()
    writeFileSync(JSON_OUT, JSON.stringify(payload), 'utf8')
    console.log(
      'Wrote',
      JSON_OUT,
      `(${payload.contributions.length} days, ${payload.total} submissions in window, ${payload.stats.solved} solved)`,
    )
  } catch (error) {
    if (existsSync(JSON_OUT)) {
      console.warn('LeetCode fetch failed, using committed fallback')
      console.warn(error.message || error)
      return
    }
    throw error
  }
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]

if (isDirectRun) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}