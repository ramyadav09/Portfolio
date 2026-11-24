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

      // Reading line at ~42% of the viewport ensures sections trigger as soon as
      // the user enters them, while keeping the indicator smooth and stable.
      const readingLine = window.innerHeight * 0.42

      let next: string | null = null
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) next = section.id
      }

      // Pin the final section when scrolled near the end of the page.
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60
      if (atBottom && sections.length > 0) next = sections[sections.length - 1].id

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
