import type { Location } from '../data/types'

/**
 * Small pure helpers shared by every component that renders identity.
 *
 * They live here rather than in each component because the same two rules —
 * how a location reads and how initials are derived — are needed by the hero,
 * the About section and the contact block, and a second implementation of
 * either would eventually disagree with the first.
 */

/**
 * Renders the location as city, then region, then country — each part optional,
 * and any part that merely repeats an earlier one dropped.
 *
 *   { city: 'Bhubaneswar', state: 'Odisha' }            → "Bhubaneswar, Odisha"
 *   { city: 'Bhubaneswar', state: 'Odisha', country: 'India' }
 *                                                       → "Bhubaneswar, Odisha, India"
 *   { city: 'Nepal', country: 'Nepal' }                 → "Nepal"
 *
 * The repetition rule exists because the alternatives are worse: "Nepal, Nepal"
 * looks like a bug, and silently dropping the country would hide real data.
 */
export function formatLocation(location: Location | null): string | null {
  if (!location) return null

  const parts = [location.city, location.state, location.country]
    .map((part) => (part ?? '').trim())
    .filter(Boolean)

  const seen = new Set<string>()
  const unique = parts.filter((part) => {
    const key = part.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return unique.length > 0 ? unique.join(', ') : null
}

/**
 * Two letters at most, from the first and last word of a full name:
 * "Ram Kumar Yadav" → "RY". A single-word name gives one letter.
 *
 * Explicitly not `slice(0, 2)`, which would produce "RA" and read as a typo to
 * anyone whose name is more than one word.
 */
export function getInitials(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''

  const first = words[0][0] ?? ''
  const last = words.length > 1 ? (words[words.length - 1][0] ?? '') : ''

  return (first + last).toUpperCase()
}
