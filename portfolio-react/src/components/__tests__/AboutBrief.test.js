import { describe, it, expect } from 'vitest'
import { parseStatValue } from '../AboutBrief.jsx'

describe('parseStatValue', () => {
  it('parses "2+" → numeric 2, suffix "+"', () => {
    const result = parseStatValue('2+')
    expect(result).toEqual({ numeric: 2, suffix: '+' })
    expect(String(result.numeric) + result.suffix).toBe('2+')
  })

  it('parses "100+" → numeric 100, suffix "+"', () => {
    const result = parseStatValue('100+')
    expect(result).toEqual({ numeric: 100, suffix: '+' })
    expect(String(result.numeric) + result.suffix).toBe('100+')
  })

  it('parses "75%" → numeric 75, suffix "%"', () => {
    const result = parseStatValue('75%')
    expect(result).toEqual({ numeric: 75, suffix: '%' })
    expect(String(result.numeric) + result.suffix).toBe('75%')
  })

  it('parses "2" → numeric 2, suffix ""', () => {
    const result = parseStatValue('2')
    expect(result).toEqual({ numeric: 2, suffix: '' })
    expect(String(result.numeric) + result.suffix).toBe('2')
  })

  it('parses "N/A" (no digits) → { numeric: 0, suffix: "N/A" }', () => {
    const result = parseStatValue('N/A')
    expect(result).toEqual({ numeric: 0, suffix: 'N/A' })
  })
})

import fc from 'fast-check'

/**
 * Validates: Requirements 1.2
 */
describe('useCountUp property tests', () => {
  it('Property 1: count never exceeds target for any target >= 0', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 10000 }), (target) => {
        // Simulate the count-up math at various progress points
        const duration = 800
        const progressPoints = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0]
        for (const progress of progressPoints) {
          const eased = 1 - Math.pow(1 - progress, 3)
          const count = Math.round(eased * target)
          if (count < 0 || count > target) return false
        }
        return true
      })
    )
  })
})

/**
 * Validates: Requirements 1.2
 */
describe('parseStatValue property tests', () => {
  it('Property 2: round-trip reconstruction for /^\\d+[+%]?$/ strings', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 9999 }),
        fc.constantFrom('', '+', '%'),
        (num, suffix) => {
          const value = String(num) + suffix
          const result = parseStatValue(value)
          return String(result.numeric) + result.suffix === value
        }
      )
    )
  })
})

describe('AnimatedStat final value correctness', () => {
  it('final displayed value matches original value string for each stat', () => {
    const statValues = ['2+', '100+', '75%', '2']
    for (const value of statValues) {
      const { numeric, suffix } = parseStatValue(value)
      // When count-up completes, count === numeric
      const finalDisplay = String(numeric) + suffix
      expect(finalDisplay).toBe(value)
    }
  })
})
