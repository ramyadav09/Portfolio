import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionProps {
  id: string
  /** Id of the heading inside, so the section is announced with its title. */
  labelledBy: string
  children: ReactNode
  className?: string
}

/**
 * Consistent vertical rhythm and landmark semantics for every page section.
 * `scroll-margin-top` is applied globally in index.css so the sticky header
 * never covers an anchored section.
 */
export function Section({ id, labelledBy, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-20 sm:py-24', className)}>
      {children}
    </section>
  )
}
