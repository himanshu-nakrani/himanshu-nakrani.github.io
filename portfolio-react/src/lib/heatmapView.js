const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function normalizeHeatmapPayload(data) {
  if (!data) return null

  if (data.years) {
    const availableYears = data.availableYears
      || Object.keys(data.years).sort((a, b) => {
        if (a === 'last') return 1
        if (b === 'last') return -1
        return Number(b) - Number(a)
      })

    return {
      ...data,
      availableYears,
      defaultYear: data.defaultYear ?? availableYears[0],
    }
  }

  if (!Array.isArray(data.contributions) || data.contributions.length === 0) return null

  const total = typeof data.total === 'number'
    ? data.total
    : data.contributions.reduce((sum, day) => sum + (day.count || 0), 0)

  return {
    user: data.user,
    fetchedAt: data.fetchedAt,
    defaultYear: 'last',
    availableYears: ['last'],
    years: {
      last: {
        label: 'Last 12 months',
        total,
        contributions: data.contributions,
      },
    },
  }
}

export function buildHeatmapView(days, totalOverride) {
  if (!days?.length) return null

  const firstDate = new Date(days[0].date + 'T00:00:00')
  const lead = firstDate.getDay()

  const formatter = new Intl.DateTimeFormat(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })
  const singleDate = new Date()

  const cols = []
  let week = Array(7).fill(null)
  for (let i = 0; i < lead; i++) week[i] = null
  let row = lead
  for (const d of days) {
    singleDate.setTime(Date.parse(d.date + 'T00:00:00'))
    week[row] = { ...d, formattedDate: formatter.format(singleDate) }
    row++
    if (row === 7) {
      cols.push(week)
      week = Array(7).fill(null)
      row = 0
    }
  }
  if (week.some((c) => c !== null)) cols.push(week)

  const monthLabels = []
  let prev = -1
  cols.forEach((col, ci) => {
    const firstCell = col.find((c) => c)
    if (!firstCell) return
    const m = parseInt(firstCell.date.substring(5, 7), 10) - 1
    if (m !== prev) {
      if (ci === 0 || ci > 1) monthLabels.push({ col: ci, label: MONTHS[m] })
      prev = m
    }
  })

  let longest = 0
  let run = 0
  let current = 0
  for (const d of days) {
    if (d.count > 0) {
      run++
      if (run > longest) longest = run
    } else {
      run = 0
    }
  }
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++
    else break
  }

  const best = days.reduce((acc, d) => (d.count > acc.count ? d : acc), { count: 0, date: '' })

  return {
    cols,
    monthLabels,
    total: totalOverride ?? days.reduce((s, d) => s + (d.count || 0), 0),
    longest,
    current,
    best,
  }
}

export function yearLabel(yearKey, yearEntry) {
  if (yearEntry?.label) return yearEntry.label
  if (yearKey === 'last') return 'Last 12 months'
  return String(yearKey)
}

export function yearSummaryText(yearKey, unitPlural) {
  if (yearKey === 'last') return `${unitPlural} in the last year`
  return `${unitPlural} in ${yearKey}`
}