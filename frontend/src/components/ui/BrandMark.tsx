import { cn } from '../../lib/utils'

/**
 * The brand mark: three connected nodes — the same Build / Integrate /
 * Orchestrate story the hero tells, reduced to a glyph. Decorative wherever it
 * appears next to the site name, so it is hidden from assistive technology.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn('size-8', className)}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="0.7"
        y="0.7"
        width="30.6"
        height="30.6"
        rx="8.5"
        fill="#11152A"
        stroke="#3b4470"
        strokeWidth="1.2"
      />
      <g stroke="#5b4a9c" strokeWidth="1.5" strokeLinecap="round">
        <path d="M16 8.6 9.4 22.6" />
        <path d="M16 8.6 22.6 22.6" />
        <path d="M9.4 22.6h13.2" />
      </g>
      <circle cx="16" cy="8.6" r="3" fill="#8de8c0" />
      <circle cx="9.4" cy="22.6" r="3" fill="#a77bff" />
      <circle cx="22.6" cy="22.6" r="3" fill="#a77bff" />
    </svg>
  )
}
