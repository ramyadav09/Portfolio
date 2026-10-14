import { useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'
import type { Project } from '../../data/types'
import { caseStudyHref } from '../../lib/router'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { ProjectCaseStudy } from './ProjectCaseStudy'

interface CaseStudyPageProps {
  projectId: string
}

/**
 * One project's full write-up, at its own address.
 *
 * This is a page rather than a panel inside the projects grid: it is long, it
 * is the thing a visitor is most likely to want to link to or share, and
 * `#/work/smartfind` is a real URL that survives a refresh on any static host.
 *
 * An id that matches nothing renders an explanation with a way back rather than
 * a blank page, because the id is editable by hand in the address bar.
 */
export function CaseStudyPage({ projectId }: CaseStudyPageProps) {
  const index = projects.findIndex((project) => project.id === projectId)
  const project = index === -1 ? undefined : projects[index]

  // Arriving at a new page starts at the top of it. `instant`, because this is
  // not a scroll the reader asked for.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [projectId])

  if (!project) {
    return (
      <div className="py-20">
        <Container>
          <h1 className="font-display text-2xl font-semibold text-balance">
            No case study at this address
          </h1>
          <p className="mt-3 max-w-[62ch] text-sm text-fg-muted">
            Nothing in this portfolio matches{' '}
            <code className="font-mono text-[0.8rem] text-fg">{projectId}</code>. The project may
            have been renamed, or the link may be mistyped.
          </p>
          <ButtonLink href="#work" variant="primary" size="sm" className="mt-6">
            <ArrowLeft aria-hidden="true" className="size-4" />
            All projects
          </ButtonLink>
        </Container>
      </div>
    )
  }

  const hasSiblings = projects.length > 1
  const previous = hasSiblings ? projects[(index - 1 + projects.length) % projects.length] : null
  const next = hasSiblings ? projects[(index + 1) % projects.length] : null

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <ButtonLink href="#work" variant="ghost" size="sm" className="-ml-2">
          <ArrowLeft aria-hidden="true" className="size-4" />
          All projects
        </ButtonLink>

        <div className="mt-6">
          {/* Keyed by project so moving between two case studies replays the
              entrance instead of reusing the mounted panel. */}
          <ProjectCaseStudy key={project.id} project={project} />
        </div>

        {previous && next ? (
          <nav aria-label="Other case studies" className="mt-12 border-t border-line pt-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              <li>
                <SiblingLink direction="Previous" project={previous} />
              </li>
              <li className="sm:text-right">
                <SiblingLink direction="Next" project={next} />
              </li>
            </ul>
          </nav>
        ) : null}
      </Container>
    </div>
  )
}

/**
 * Reading order for a set of case studies is linear, so the previous/next pair
 * wraps around rather than dead-ending on the first and last project.
 */
function SiblingLink({ direction, project }: { direction: 'Previous' | 'Next'; project: Project }) {
  const isNext = direction === 'Next'

  return (
    <a
      href={caseStudyHref(project.id)}
      className="group/sibling flex flex-col gap-1 rounded-md border border-line p-4 transition-colors duration-[var(--duration-fast)] hover:border-violet/50 hover:bg-surface/60"
    >
      <span className="mono-label inline-flex items-center gap-1.5">
        {isNext ? null : <ArrowLeft aria-hidden="true" className="size-3" />}
        {direction}
        {isNext ? <ArrowRight aria-hidden="true" className="size-3" /> : null}
      </span>
      <span className="font-display text-[0.9375rem] font-semibold text-fg transition-colors group-hover/sibling:text-violet-bright">
        {project.title}
      </span>
    </a>
  )
}
