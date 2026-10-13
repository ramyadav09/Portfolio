import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import type { Project } from '../../data/types'
import { projectStatusMeta } from '../../lib/projectStatus'
import { cn } from '../../lib/utils'
import { GithubGlyph } from '../ui/BrandGlyphs'
import { Button } from '../ui/Button'
import { LinkChip } from '../ui/LinkChip'
import { Pill } from '../ui/Pill'
import { ProjectPreviewFrame } from './ProjectPreviewFrame'

interface ProjectCardProps {
  project: Project
  isSelected: boolean
  onSelect: (id: string) => void
}

/** Id of the single case-study region every card points at with aria-controls. */
export const CASE_STUDY_PANEL_ID = 'case-study-panel'

export function ProjectCard({ project, isSelected, onSelect }: ProjectCardProps) {
  const status = projectStatusMeta[project.status]
  const previewAspect = project.featured ? 'aspect-[16/10] lg:aspect-[4/3]' : 'aspect-[16/10]'

  return (
    <article
      aria-labelledby={`project-${project.id}-title`}
      className={cn(
        'panel group flex h-full flex-col overflow-hidden',
        'transition-[border-color,box-shadow,transform] duration-[var(--duration-base)] ease-[var(--ease-out-soft)]',
        'hover:-translate-y-px hover:border-violet/40 hover:shadow-[var(--shadow-glow)]',
        project.featured && 'lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]',
      )}
    >
      <div
        className={cn(
          'relative shrink-0 border-b border-line',
          previewAspect,
          project.featured && 'lg:border-r lg:border-b-0',
        )}
      >
        <ProjectPreviewFrame preview={project.preview} className="absolute inset-0" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone={status.tone}>{status.label}</Pill>
          {project.featured ? <Pill tone="violet">Featured case study</Pill> : null}
          {project.isPlaceholder ? <Pill tone="muted">Sample brief</Pill> : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <h3
            id={`project-${project.id}-title`}
            className={cn(
              'font-display font-semibold',
              project.featured ? 'text-[clamp(1.3rem,2.6vw,1.7rem)]' : 'text-xl',
            )}
          >
            {project.title}
          </h3>
          <p className="text-[0.9375rem] text-violet-bright/90">{project.tagline}</p>
        </div>

        <p className="text-sm text-fg-muted">{project.summary}</p>

        {project.highlights.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {project.highlights.slice(0, project.featured ? 4 : 3).map((highlight) => (
              <li key={highlight} className="flex gap-2.5 text-sm text-fg-muted">
                <span
                  aria-hidden="true"
                  className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-mint/80"
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} technology stack`}>
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-sm border border-line bg-surface-inset/80 px-2 py-1 font-mono text-[0.6875rem] text-fg-muted"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <div className="flex flex-wrap gap-2">
            <LinkChip
              label={project.repo.label}
              href={project.repo.href}
              icon={GithubGlyph}
              size="sm"
              pendingHint="Add the repository URL in src/data/projects.ts once it is public."
            />
            <LinkChip
              label={project.demo.label}
              href={project.demo.href}
              icon={ExternalLink}
              size="sm"
              pendingHint="Add the live demo URL in src/data/projects.ts once it is deployed."
            />
          </div>

          <Button
            variant={isSelected ? 'secondary' : 'primary'}
            size="sm"
            className="self-start"
            aria-expanded={isSelected}
            aria-controls={CASE_STUDY_PANEL_ID}
            onClick={() => onSelect(project.id)}
          >
            {isSelected ? (
              <>
                <Check aria-hidden="true" className="size-4" />
                Case study shown below
              </>
            ) : (
              <>
                Read the case study
                <ArrowRight aria-hidden="true" className="size-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  )
}
