import { ArrowRight } from 'lucide-react'
import type { Project } from '../../data/types'
import { projectStatusMeta } from '../../lib/projectStatus'
import { caseStudyHref } from '../../lib/router'
import { ButtonLink } from '../ui/Button'
import { Pill } from '../ui/Pill'
import { ProjectPreviewFrame } from './ProjectPreviewFrame'

interface ProjectCardProps {
  project: Project
}

/**
 * A compact card: preview, status, title, tagline, and one way in.
 *
 * Everything else the project has to say — the summary, the highlights, the
 * stack, the repository links — lives in the case study now, so the grid reads
 * as an index rather than seven competing essays. That is also why every card
 * is the same size and shape: nothing on the main page is privileged, and
 * `line-clamp` keeps a long tagline from pushing one card taller than its row.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const status = projectStatusMeta[project.status]
  const href = caseStudyHref(project.id)

  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className="panel group flex h-full flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-soft)] hover:-translate-y-px hover:border-violet/40 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="relative aspect-[16/10] shrink-0 border-b border-line">
        <ProjectPreviewFrame preview={project.preview} className="absolute inset-0" />
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

        <ButtonLink href={href} variant="secondary" size="sm" className="mt-auto self-start">
          Read the case study
          {/* Repeated link text is ambiguous in a link list, so the name carries
              the project even though the visible words stay short. */}
          <span className="sr-only"> for {project.title}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </ButtonLink>
      </div>
    </article>
  )
}
