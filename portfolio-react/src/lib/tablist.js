/**
 * Roving tabindex keyboard handler for WAI-ARIA tablists.
 * @returns {number|null} Next tab index, or null if the key was not handled.
 */
export function getNextTabIndex(event, currentIndex, length) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return null
  event.preventDefault()
  if (event.key === 'Home') return 0
  if (event.key === 'End') return length - 1
  if (event.key === 'ArrowRight') return (currentIndex + 1) % length
  return (currentIndex - 1 + length) % length
}