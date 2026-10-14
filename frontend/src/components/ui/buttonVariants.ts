import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
}

/**
 * `primary` is the bright accent with dark text rather than white text:
 * #F4F5FC on #A77BFF is only 2.7:1, while #11152A on #A77BFF is 6.3:1.
 *
 * The label colour is `--color-on-accent`, not `--color-ink`: in light mode the
 * accent is dark instead of bright, so the on-accent colour flips to white.
 * The hover glow is mixed from the live accent rather than a fixed violet, so
 * it follows the theme instead of staying purple.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-violet text-on-accent hover:bg-violet-bright shadow-[var(--shadow-glow)] hover:shadow-[0_28px_70px_-30px_color-mix(in_oklab,var(--color-violet)_85%,transparent)]',
  secondary:
    'border border-line-strong bg-surface/70 text-fg hover:border-violet/70 hover:bg-surface-raised',
  ghost: 'text-fg-muted hover:bg-surface/70 hover:text-fg',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-sm',
  md: 'h-11 gap-2 px-5 text-[0.9375rem]',
  lg: 'h-12 gap-2 px-6 text-base',
}

const baseClasses =
  'inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap ' +
  'transition-[background-color,border-color,color,box-shadow,transform] ' +
  'duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-45'

/**
 * Shared by <Button> and <ButtonLink>, and by the disabled stand-in used when a
 * link has no target yet — so a "pending" control still looks like its live
 * counterpart.
 */
export function buttonClasses(
  { variant = 'primary', size = 'md' }: ButtonStyleProps,
  className?: string,
) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className)
}
