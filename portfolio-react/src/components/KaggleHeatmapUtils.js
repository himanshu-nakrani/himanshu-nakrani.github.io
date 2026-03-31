export function pad2(n) {
  return String(n).padStart(2, '0')
}

export function toKey(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}
