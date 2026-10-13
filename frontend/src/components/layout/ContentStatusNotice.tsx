import { TriangleAlert } from 'lucide-react'
import { projects } from '../../data/projects'
import { profile } from '../../data/profile'
import { Container } from '../ui/Container'

/**
 * A build-time honesty marker.
 *
 * It lists exactly what is still sample content and disappears on its own once
 * the profile and every project are real — so a placeholder can never quietly
 * ship as if it were finished work.
 */
export function ContentStatusNotice() {
  const placeholderProjects = projects.filter((project) => project.isPlaceholder)
  const outstanding: string[] = []

  if (profile.isSampleContent) outstanding.push('the profile and About copy')
  if (placeholderProjects.length > 0) {
    outstanding.push(
      `${placeholderProjects.length} of ${projects.length} project briefs`,
    )
  }

  const missingLinks = [profile.github, profile.linkedin, profile.resume]
    .filter((link) => !link.href)
    .map((link) => link.label)

  if (!profile.email) missingLinks.push('email address')

  if (outstanding.length === 0 && missingLinks.length === 0) return null

  return (
    <div className="border-b border-caution/30 bg-caution/8">
      <Container className="py-2.5">
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.12em] text-caution uppercase">
            <TriangleAlert aria-hidden="true" className="size-3.5" />
            Sample content
          </span>
          <span>
            Still to replace: {outstanding.join(', ')}
            {outstanding.length > 0 && missingLinks.length > 0 ? ', and ' : ''}
            {missingLinks.length > 0
              ? `the ${missingLinks.join('/')} link${missingLinks.length === 1 ? '' : 's'}`
              : ''}
            .
          </span>
          <span className="text-fg-subtle">
            Edit <code className="font-mono text-[0.7rem]">src/data/</code> to swap this in.
          </span>
        </p>
      </Container>
    </div>
  )
}
