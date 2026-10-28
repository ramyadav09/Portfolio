import { cn } from '../../lib/utils'
import { getInitials } from '../../lib/identity'

interface AvatarProps {
  /** Full name: the monogram is derived from it and it names the image. */
  name: string
  /** Resolved image URL, or `null` to draw the monogram. */
  photoUrl: string | null
  size?: 'md' | 'lg'
  className?: string
}

const shape: Record<'md' | 'lg', string> = {
  md: 'size-10 rounded-md',
  lg: 'size-16 rounded-lg sm:size-[4.5rem]',
}

const monogram: Record<'md' | 'lg', string> = {
  md: 'text-sm',
  lg: 'text-xl sm:text-[1.5rem]',
}

/**
 * The portrait treatment: a real headshot when `photoUrl` is set, and a
 * monogram in the same frame when it is not.
 *
 * The monogram is built from the name rather than from any image, so an
 * unfinished profile can never accidentally ship a stock face, and it uses the
 * same grid texture and accent gradient as the brand mark so the placeholder
 * looks designed rather than missing.
 */
export function Avatar({ name, photoUrl, size = 'lg', className }: AvatarProps) {
  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        // The full name is always rendered directly beside this in the hero, so
        // a non-empty alt would announce the person twice. An empty alt is the
        // correct pattern for a redundant image, not an oversight.
        alt=""
        // No `width`/`height`: the frame is a fixed square in CSS, so there is
        // no layout shift to reserve space against, and declaring a square
        // intrinsic size for a portrait photo would be a false statement in the
        // markup. `object-cover` crops to the centre of the frame instead.
        decoding="async"
        className={cn('shrink-0 border border-line-strong object-cover', shape[size], className)}
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden border border-line-strong bg-surface-inset',
        shape[size],
        className,
      )}
    >
      <span className="grid-texture absolute inset-0 opacity-70" />
      <span className="absolute inset-0 bg-gradient-to-br from-violet/30 via-transparent to-mint/20" />
      <span
        className={cn(
          'relative font-display font-semibold tracking-[0.04em] text-fg',
          monogram[size],
        )}
      >
        {getInitials(name)}
      </span>
    </span>
  )
}
