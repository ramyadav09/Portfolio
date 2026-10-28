import { featuredProject, projects } from '../../data/projects'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from './ProjectCard'

/**
 * The project index.
 *
 * This section used to double as the case-study reader: selecting a card
 * swapped a long panel in below the grid, which made the page carry every
 * project's full write-up at once and left one card privileged over the others.
 * Case studies now live on their own route (`#/work/:id`), so this is only ever
 * an index — no selected state, no focus juggling, no panel.
 *
 * The featured project still leads, because that ordering is a judgement about
 * which one to read first; it no longer gets a different card for it.
 */
const orderedProjects = featuredProject
  ? [featuredProject, ...projects.filter((project) => project.id !== featuredProject.id)]
  : [...projects]

export function ProjectsSection() {
  return (
    <Section id="work" labelledBy="work-heading">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects, with the reasoning attached."
            lead="Each project opens into a full case study: the problem, the architecture, the trade-offs I would defend in a review, and the security and failure behaviour that usually gets left out of a portfolio."
            titleId="work-heading"
          />
        </Reveal>

        <Reveal delay={0.04} className="mt-10">
          {/* `min-w-0` on each item is load-bearing: a grid item's automatic
              minimum size is its content, and the card's nowrap stack line would
              otherwise widen the item past its column and push the page into
              horizontal overflow at narrow widths. */}
          <ul className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {orderedProjects.map((project) => (
              <li key={project.id} className="h-full min-w-0">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
