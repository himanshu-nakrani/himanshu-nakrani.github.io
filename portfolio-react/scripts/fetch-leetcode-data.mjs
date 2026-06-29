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

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function buildDailyContributionsForYear(year, calendarEntries) {
  const byDate = new Map()
  for (const [epoch, count] of Object.entries(calendarEntries)) {
    const date = epochToDate(epoch)
    if (!date.startsWith(`${year}-`)) continue
    byDate.set(date, (byDate.get(date) || 0) + Number(count))
  }

  const daysInYear = isLeapYear(year) ? 366 : 365
  const days = []
  const cursor = new Date(Date.UTC(year, 0, 1))

  for (let i = 0; i < daysInYear; i++) {
    const date = cursor.toISOString().slice(0, 10)
    const count = byDate.get(date) || 0
    days.push({ date, count, level: countToLevel(count) })
    cursor.setUTCDate(cursor.getUTCDate() + 1)
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

  const years = {}
  for (const [yearKey, calendar] of Object.entries(calendarsByYear)) {
    const entries = parseSubmissionCalendar(calendar)
    const contributions = buildDailyContributionsForYear(Number(yearKey), entries)
    years[yearKey] = {
      label: String(yearKey),
      total: contributions.reduce((sum, day) => sum + day.count, 0),
      contributions,
    }
  }

  const availableYears = Object.keys(years)
    .map(Number)
    .sort((a, b) => b - a)
    .map(String)
  const currentYear = String(new Date().getUTCFullYear())
  const defaultYear = availableYears.includes(currentYear)
    ? currentYear
    : availableYears[0]

  return {
    user: matched.username || USERNAME,
    fetchedAt: new Date().toISOString(),
    defaultYear,
    availableYears,
    activeYears: availableYears.map(Number),
    stats: {
      solved: byDifficulty.All ?? 0,
      easy: byDifficulty.Easy ?? 0,
      medium: byDifficulty.Medium ?? 0,
      hard: byDifficulty.Hard ?? 0,
      ranking: matched.profile?.ranking ?? null,
    },
    years,
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
    const defaultView = payload.years[payload.defaultYear]
    console.log(
      'Wrote',
      JSON_OUT,
      `(${payload.availableYears.length} years, ${defaultView?.contributions.length ?? 0} days in ${payload.defaultYear}, ${payload.stats.solved} solved)`,
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