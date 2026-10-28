import { ArrowRight } from 'lucide-react'
import type { Project } from '../../data/types'
import { projectStatusMeta } from '../../lib/projectStatus'
import { caseStudyHref } from '../../lib/router'
import { GithubGlyph } from '../ui/BrandGlyphs'
import { ButtonLink } from '../ui/Button'
import { Pill } from '../ui/Pill'
import { ProjectPreviewFrame } from './ProjectPreviewFrame'

interface ProjectCardProps {
  project: Project
}

/** How many technologies fit on one line before the line is summarised. */
const STACK_PREVIEW_COUNT = 4

/**
 * A compact card: preview, status, title, tagline, the stack in one line, and
 * the two places a reader goes next — the case study, and the repository where
 * one is public.
 *
 * Everything else the project has to say — the problem, the solution, the
 * architecture, the trade-offs — lives in the case study at `#/work/:id`, so
 * the grid reads as an index rather than seven competing essays. That is also
 * why every card is the same size and shape: nothing on the main page is
 * privileged, `line-clamp` keeps a long tagline from pushing one card taller
 * than its row, and the stack is sliced rather than wrapped so the one line it
 * occupies is exactly one line in every card.
 *
 * A repository that is not public is simply absent here rather than drawn as a
 * dead control; the case study says why in its disclaimer.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const status = projectStatusMeta[project.status]
  const href = caseStudyHref(project.id)

  const stackPreview = project.stack.slice(0, STACK_PREVIEW_COUNT)
  const hiddenStackItems = project.stack.length - stackPreview.length

  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className="panel group flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-violet/40 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="relative aspect-[16/10] shrink-0 border-b border-line">
        <ProjectPreviewFrame
          preview={project.preview}
          label={project.title}
          className="absolute inset-0"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={status.tone}>{status.label}</Pill>
        </div>

        <h3
          id={`project-${project.id}-title`}
          className="line-clamp-2 font-display text-base font-semibold text-balance"
        >
          <a href={href} className="rounded-sm transition-colors hover:text-violet-bright">
            {project.title}
          </a>
        </h3>

        <p className="line-clamp-2 text-sm text-violet-bright/90">{project.tagline}</p>

        {/* One line of real evidence, sliced rather than wrapped so it cannot
            make two cards in a row different heights. `title` carries the rest
            for a pointer, but the full stack is listed in the case study.

            The `+N` sits outside the truncating span so it survives a long
            entry: a reader can always see how much is not shown, even when the
            names either side of it are clipped. */}
        <p
          title={project.stack.join(', ')}
          className="flex min-w-0 items-baseline gap-1.5 font-mono text-[0.6875rem] tracking-[0.02em] text-fg-subtle"
        >
          <span className="min-w-0 truncate">{stackPreview.join(' · ')}</span>
          {hiddenStackItems > 0 ? <span className="shrink-0">+{hiddenStackItems}</span> : null}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <ButtonLink href={href} variant="secondary" size="sm">
            Read the case study
            {/* Repeated link text is ambiguous in a link list, so the name carries
                the project even though the visible words stay short. */}
            <span className="sr-only"> for {project.title}</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>

          {project.repo.href ? (
            <ButtonLink
              href={project.repo.href}
              variant="ghost"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubGlyph className="size-4" />
              Code
              <span className="sr-only">
                {' '}
                for {project.title} (opens in a new tab)
              </span>
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </article>
  )
}
