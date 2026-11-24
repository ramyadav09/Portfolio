import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type PillTone = 'neutral' | 'violet' | 'mint' | 'caution' | 'muted'

const toneClasses: Record<PillTone, string> = {
  neutral: 'border-line bg-surface-inset text-fg-muted',
  violet: 'border-violet/30 bg-violet/10 text-violet',
  mint: 'border-mint/30 bg-mint/10 text-mint',
  caution:
    'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-300',
  muted: 'border-line/70 bg-surface-inset/60 text-fg-subtle',
}

interface PillProps {
  children: ReactNode
  tone?: PillTone
  className?: string
  /** Optional leading glyph — never the only signal, always paired with text. */
  icon?: ReactNode
}

/**
 * Small status badge. Tone is decorative: every pill carries a text label, so
 * meaning is never conveyed by colour alone.
 */
export function Pill({ children, tone = 'neutral', className, icon }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5',
        'text-xs font-medium leading-5',
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
