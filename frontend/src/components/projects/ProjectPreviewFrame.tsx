import { ImageIcon } from 'lucide-react'
import type { ProjectPreview } from '../../data/types'
import { cn } from '../../lib/utils'

interface ProjectPreviewFrameProps {
  preview: ProjectPreview
  className?: string
}

/**
 * Renders a real screenshot when one exists and an explicitly labelled
 * placeholder when it does not. It deliberately does not draw a fake product
 * UI: an invented screenshot is a misleading claim about software that may not
 * exist yet.
 */
export function ProjectPreviewFrame({ preview, className }: ProjectPreviewFrameProps) {
  if (preview.kind === 'image') {
    return (
      <img
        src={preview.src}
        alt={preview.alt}
        width={preview.width}
        height={preview.height}
        loading="lazy"
        decoding="async"
        className={cn('size-full object-cover object-top', className)}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`Project preview pending. ${preview.caption}`}
      className={cn(
        'relative flex size-full items-center justify-center overflow-hidden',
        'bg-surface-inset',
        className,
      )}
    >
      <div aria-hidden="true" className="grid-texture absolute inset-0 opacity-60" />

      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="size-10 opacity-55"
          focusable="false"
        >
          <g stroke="#5b4a9c" strokeWidth="1.5" strokeLinecap="round">
            <path d="M16 8.6 9.4 22.6" />
            <path d="M16 8.6 22.6 22.6" />
            <path d="M9.4 22.6h13.2" />
          </g>
          <circle cx="16" cy="8.6" r="3" fill="#8de8c0" />
          <circle cx="9.4" cy="22.6" r="3" fill="#a77bff" />
          <circle cx="22.6" cy="22.6" r="3" fill="#a77bff" />
        </svg>

        <p className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-3 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-fg-subtle uppercase">
          <ImageIcon aria-hidden="true" className="size-3" />
          No screenshot yet
        </p>

        <p className="max-w-[34ch] text-xs text-fg-subtle">{preview.caption}</p>
      </div>
    </div>
  )
}
