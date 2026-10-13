import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  /** Small uppercase eyebrow above the title. */
  eyebrow: string
  title: string
  /** Supporting sentence under the title. */
  lead?: ReactNode
  /** Id applied to the h2 so the section can be labelled by it. */
  titleId: string
  className?: string
  align?: 'start' | 'center'
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  titleId,
  className,
  align = 'start',
  children,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-3',
        // Without `items-start` the default `stretch` makes short children such
        // as status pills span the full container width.
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <p className="mono-label text-violet-bright/85">{eyebrow}</p>
      <h2
        id={titleId}
        className="max-w-[24ch] text-[clamp(1.75rem,4.4vw,2.6rem)] font-semibold"
      >
        {title}
      </h2>
      {lead ? (
        <p className="max-w-[68ch] text-[1.0625rem] text-fg-muted">{lead}</p>
      ) : null}
      {children}
    </header>
  )
}
