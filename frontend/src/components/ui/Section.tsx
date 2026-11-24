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
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('pt-6 pb-12 md:pt-8 md:pb-14', className)}
    >
      {children}
    </section>
  )
}
