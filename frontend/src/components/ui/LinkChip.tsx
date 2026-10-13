import { ArrowUpRight, Link2Off } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { IconComponent } from './BrandGlyphs'

interface LinkChipProps {
  label: string
  /** `null` renders a visibly disabled chip instead of a link to nowhere. */
  href: string | null
  icon?: IconComponent
  /** Explains what is missing while the link is pending. Shown as a tooltip. */
  pendingHint?: string
  size?: 'sm' | 'md'
  className?: string
}

/**
 * A link that is honest about not existing yet.
 *
 * Portfolio placeholders are the usual source of dead links. Rather than
 * shipping an anchor with a `#` or a made-up URL, a missing target renders as a
 * dashed, non-interactive chip whose state is announced in text, not by colour.
 */
export function LinkChip({
  label,
  href,
  icon: Icon,
  pendingHint,
  size = 'md',
  className,
}: LinkChipProps) {
  const dimensions = size === 'sm' ? 'h-8 gap-1.5 px-2.5 text-xs' : 'h-10 gap-2 px-3.5 text-sm'
  const shape = 'inline-flex items-center rounded-md border font-medium'

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title={pendingHint ?? 'This link has not been added yet.'}
        className={cn(
          shape,
          dimensions,
          'cursor-not-allowed border-dashed border-line-strong/80 text-fg-subtle',
          className,
        )}
      >
        {Icon ? <Icon aria-hidden="true" className="size-4 shrink-0 opacity-70" /> : null}
        {label}
        <Link2Off aria-hidden="true" className="size-3.5 shrink-0 opacity-60" />
        <span className="sr-only"> — link not available yet</span>
      </span>
    )
  }

  const isExternal = /^https?:/i.test(href)

  return (
    <a
      href={href}
      className={cn(
        shape,
        dimensions,
        'border-line-strong bg-surface/70 text-fg transition-colors',
        'duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]',
        'hover:border-violet/70 hover:bg-surface-raised hover:text-violet-bright',
        className,
      )}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {Icon ? <Icon aria-hidden="true" className="size-4 shrink-0" /> : null}
      {label}
      {isExternal ? (
        <>
          <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : null}
    </a>
  )
}
