import { pad2, toKey } from './KaggleHeatmapUtils.js'

describe('KaggleHeatmap utilities', () => {
  describe('pad2', () => {
    test('pads single digit number with 0', () => {
      expect(pad2(5)).toBe('05')
      expect(pad2(9)).toBe('09')
    })

    test('does not pad double digit number', () => {
      expect(pad2(10)).toBe('10')
      expect(pad2(25)).toBe('25')
    })

    test('handles 0 correctly', () => {
      expect(pad2(0)).toBe('00')
    })
  })

  describe('toKey', () => {
    test('formats date correctly for single digit month and day', () => {
      const date = new Date(2023, 0, 5) // January 5th, 2023
      expect(toKey(date)).toBe('2023-01-05')
    })

    test('formats date correctly for double digit month and day', () => {
      const date = new Date(2023, 10, 25) // November 25th, 2023
      expect(toKey(date)).toBe('2023-11-25')
    })

    test('formats date correctly for end of year', () => {
      const date = new Date(2023, 11, 31) // December 31st, 2023
      expect(toKey(date)).toBe('2023-12-31')
    })

    test('handles leap year correctly', () => {
      const date = new Date(2024, 1, 29) // February 29th, 2024
      expect(toKey(date)).toBe('2024-02-29')
    })
  })
})
