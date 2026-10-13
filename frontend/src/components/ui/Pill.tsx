import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type PillTone = 'neutral' | 'violet' | 'mint' | 'caution' | 'muted'

const toneClasses: Record<PillTone, string> = {
  neutral: 'border-line-strong bg-surface-raised/80 text-fg-muted',
  violet: 'border-violet/45 bg-violet/12 text-violet-bright',
  mint: 'border-mint/45 bg-mint/12 text-mint',
  caution: 'border-caution/45 bg-caution/12 text-caution',
  muted: 'border-dashed border-line-strong bg-transparent text-fg-subtle',
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
        'font-mono text-[0.6875rem] leading-5 tracking-[0.08em] uppercase',
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
