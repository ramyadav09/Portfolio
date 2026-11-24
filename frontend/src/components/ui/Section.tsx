import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionProps {
  id?: string
  labelledBy: string
  children: ReactNode
  className?: string
}

export function Section({ id, labelledBy, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-12 md:py-16', className)}>
      {children}
    </section>
  )
}
