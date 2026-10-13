import { useEffect, useState } from 'react'

/**
 * Tracks which section the reader is currently inside, for the navigation's
 * active state.
 *
 * A "reading line" a quarter of the way down the viewport is compared against
 * each section's top on every scroll frame. That is more predictable than
 * intersection ratios here: above the first section nothing is highlighted, and
 * reaching the bottom of the page always resolves to the last section.
 *
 * `ids` must be referentially stable (a module-level array, not a new literal on
 * every render).
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return

    let frame = 0

    const measure = () => {
      frame = 0

      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null)

      if (sections.length === 0) {
        setActiveId(null)
        return
      }

      const readingLine = window.innerHeight * 0.25

      let next: string | null = null
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) next = section.id
      }

      // A short final section may never cross the reading line, so pin the last
      // one once the page is scrolled to the end.
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atBottom) next = sections[sections.length - 1].id

      setActiveId(next)
    }

    const schedule = () => {
      if (frame !== 0) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return activeId
}
