import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { featuredProject, projects } from '../../data/projects'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { CASE_STUDY_PANEL_ID, ProjectCard } from './ProjectCard'
import { ProjectCaseStudy } from './ProjectCaseStudy'

const supportingProjects = projects.filter((project) => project.id !== featuredProject?.id)

export function ProjectsSection() {
  const [selectedId, setSelectedId] = useState(featuredProject?.id ?? '')
  // Bumped on every selection so re-clicking an open card still moves focus.
  const [focusRequest, setFocusRequest] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  const selectedProject = projects.find((project) => project.id === selectedId) ?? featuredProject

  useEffect(() => {
    if (focusRequest === 0) return

    const node = panelRef.current
    if (!node) return

    // Focus first without scrolling, then scroll once — avoids a double jump.
    node.focus({ preventScroll: true })
    node.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [focusRequest, prefersReducedMotion])

  if (!selectedProject) return null

  return (
    <Section id="work" labelledBy="work-heading">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Projects, with the reasoning attached."
            lead="Each project below opens into the full case study: the problem, the architecture, the trade-offs I would defend in a review, and the security and failure behaviour that usually gets left out of a portfolio."
            titleId="work-heading"
          />
        </Reveal>

        <Reveal delay={0.04} className="mt-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredProject ? (
              <div className="lg:col-span-2">
                <ProjectCard
                  project={featuredProject}
                  isSelected={selectedProject.id === featuredProject.id}
                  onSelect={(id) => {
                    setSelectedId(id)
                    setFocusRequest((value) => value + 1)
                  }}
                />
              </div>
            ) : null}

            {supportingProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProject.id === project.id}
                onSelect={(id) => {
                  setSelectedId(id)
                  setFocusRequest((value) => value + 1)
                }}
              />
            ))}
          </div>
        </Reveal>

        <div
          id={CASE_STUDY_PANEL_ID}
          ref={panelRef}
          tabIndex={-1}
          role="region"
          aria-label={`${selectedProject.title} — full case study`}
          className="panel mt-8 p-5 outline-none sm:p-7"
        >
          <ProjectCaseStudy project={selectedProject} />
        </div>
      </Container>
    </Section>
  )
}
