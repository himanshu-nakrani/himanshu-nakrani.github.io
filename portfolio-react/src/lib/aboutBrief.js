export function parseStatValue(value) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { numeric: 0, suffix: value }
  return { numeric: Number.parseInt(match[1], 10), suffix: match[2] }
}
