import { describe, it, expect } from 'vitest'
import {
  buildHeatmapView,
  normalizeHeatmapPayload,
  yearSummaryText,
} from '../heatmapView'

describe('normalizeHeatmapPayload', () => {
  it('wraps legacy single-year payloads', () => {
    const normalized = normalizeHeatmapPayload({
      user: 'demo',
      total: 3,
      contributions: [
        { date: '2026-01-01', count: 1, level: 1 },
        { date: '2026-01-02', count: 2, level: 2 },
      ],
    })

    expect(normalized.defaultYear).toBe('last')
    expect(normalized.availableYears).toEqual(['last'])
    expect(normalized.years.last.total).toBe(3)
  })

  it('preserves multi-year payloads', () => {
    const normalized = normalizeHeatmapPayload({
      defaultYear: '2025',
      availableYears: ['2025', '2024'],
      years: {
        2025: { total: 10, contributions: [{ date: '2025-01-01', count: 10, level: 4 }] },
        2024: { total: 2, contributions: [{ date: '2024-06-01', count: 2, level: 2 }] },
      },
    })

    expect(normalized.defaultYear).toBe('2025')
    expect(normalized.availableYears).toEqual(['2025', '2024'])
  })
})

describe('buildHeatmapView', () => {
  it('computes totals and streak stats', () => {
    const view = buildHeatmapView([
      { date: '2026-01-05', count: 0, level: 0 },
      { date: '2026-01-06', count: 2, level: 2 },
      { date: '2026-01-07', count: 1, level: 1 },
    ], 3)

    expect(view.total).toBe(3)
    expect(view.longest).toBe(2)
    expect(view.current).toBe(2)
    expect(view.best.count).toBe(2)
  })
})

describe('yearSummaryText', () => {
  it('formats rolling and calendar year labels', () => {
    expect(yearSummaryText('last', 'submissions')).toBe('submissions in the last year')
    expect(yearSummaryText('2024', 'contributions')).toBe('contributions in 2024')
  })
})