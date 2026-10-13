import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/**
 * One page width for the whole site. `overflow-x: clip` on <body> plus this
 * container means no section can introduce horizontal scroll.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </div>
  )
}
