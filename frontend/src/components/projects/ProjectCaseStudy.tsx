import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Compass,
  ExternalLink,
  Layers,
  Lightbulb,
  Scale,
  ShieldCheck,
  Target,
  TestTube2,
  TriangleAlert,
  UserCheck,
  Users,
  Workflow,
} from 'lucide-react'
import type { Project } from '../../data/types'
import { projectStatusMeta } from '../../lib/projectStatus'
import { cn } from '../../lib/utils'
import { GithubGlyph } from '../ui/BrandGlyphs'
import { LinkChip } from '../ui/LinkChip'
import { Pill } from '../ui/Pill'

/* --------------------------------------------------------------------------
   Local presentational helpers
   -------------------------------------------------------------------------- */

interface SubPanelProps {
  id: string
  title: string
  icon: typeof Target
  accent?: string
  children: ReactNode
  className?: string
}

function SubPanel({ id, title, icon: Icon, accent = 'text-violet', children, className }: SubPanelProps) {
  return (
    <section aria-labelledby={id} className={cn('panel-flat p-5', className)}>
      <h2 id={id} className="flex items-center gap-2.5 font-display text-[0.9375rem] font-semibold">
        <Icon aria-hidden="true" className={cn('size-4 shrink-0', accent)} />
        {title}
      </h2>
      <div className="mt-3.5">{children}</div>
    </section>
  )
}

function BulletGroup({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null

  return (
    <section aria-labelledby={`quality-${title}`}>
      {/* h3, not h2: this group sits inside a `SubPanel` section, so it is
          already one level below the panel heading. */}
      <h3 id={`quality-${title}`} className="mono-label">
        {title}
      </h3>
      <ul className="mt-2.5 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-fg-muted">
            <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-violet/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="max-w-[74ch] text-sm text-fg-muted">{children}</p>
}

/* --------------------------------------------------------------------------
   Case study
   -------------------------------------------------------------------------- */

export function ProjectCaseStudy({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const [forceVisible, setForceVisible] = useState(false)
  const status = projectStatusMeta[project.status]
  const study = project.caseStudy
  const headingId = `case-study-${project.id}-heading`

  /**
   * Same escape hatch as `Reveal`: if the entrance animation has not resolved
   * shortly after mount, render the panel statically instead.
   *
   * The previous implementation wrapped this in `AnimatePresence mode="wait"`,
   * which does not mount the incoming project until the outgoing one finishes
   * exiting. That made which case study you can read depend on an animation
   * frame arriving — so when frames are throttled or dropped, the panel sat at
   * `opacity: 0` still showing the previous project's markup.
   */
  useEffect(() => {
    if (prefersReducedMotion) return

    const timer = window.setTimeout(() => {
      const node = panelRef.current
      if (node && Number.parseFloat(getComputedStyle(node).opacity) < 1) setForceVisible(true)
    }, 600)

    return () => window.clearTimeout(timer)
  }, [prefersReducedMotion])

  const content = (
    <>
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="neutral">Case study</Pill>
          <Pill tone={status.tone}>{status.label}</Pill>
          {project.isPlaceholder ? <Pill tone="muted">Sample brief</Pill> : null}
        </div>

        <div className="flex flex-col gap-2">
          <h1
            id={headingId}
            className="text-[clamp(1.45rem,3vw,2rem)] font-semibold"
          >
            {project.title}
            <span className="sr-only"> — case study</span>
          </h1>
          <p className="max-w-[72ch] text-[0.9375rem] text-violet-bright/90">{project.tagline}</p>
        </div>

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

        {study.disclaimer ? (
          <p className="flex gap-3 rounded-md border border-caution/35 bg-caution/8 p-3.5 text-sm text-caution">
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>{study.disclaimer}</span>
          </p>
        ) : null}
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SubPanel id={`${project.id}-problem`} title="The problem" icon={Target}>
          <Prose>{study.problem}</Prose>
        </SubPanel>

        <SubPanel id={`${project.id}-users`} title="Who it is for" icon={Users} accent="text-info">
          <Prose>{study.intendedUsers}</Prose>
        </SubPanel>
      </div>

      <div className="mt-4">
        <SubPanel id={`${project.id}-solution`} title="The proposed solution" icon={Compass} accent="text-mint">
          <Prose>{study.solution}</Prose>
        </SubPanel>
      </div>

      {study.dataFlow.length > 0 ? (
        <div className="mt-4">
          <SubPanel
            id={`${project.id}-dataflow`}
            title="Architecture & data flow"
            icon={Workflow}
            accent="text-info"
          >
            <ol className="relative flex flex-col gap-5">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-gradient-to-b from-violet/45 via-info/35 to-mint/35"
              />
              {study.dataFlow.map((step, index) => (
                <li key={step.label} className="relative flex gap-4">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-0.5 flex size-[1.375rem] shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface-inset font-mono text-[0.625rem] text-fg-subtle"
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold text-fg">{step.label}</h3>
                    <p className="mt-1 max-w-[80ch] text-sm text-fg-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SubPanel>
        </div>
      ) : null}

      {study.stack.length > 0 ? (
        <div className="mt-4">
          <SubPanel id={`${project.id}-stack`} title="Technical choices" icon={Layers}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {study.stack.map((group) => (
                <div key={group.label}>
                  <h3 className="mono-label">{group.label}</h3>
                  <ul className="mt-2.5 flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-fg-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-mint/70"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SubPanel>
        </div>
      ) : null}

      {study.ai ? (
        <div className="mt-4">
          <SubPanel
            id={`${project.id}-ai`}
            title="How the AI capability works"
            icon={BrainCircuit}
            accent="text-mint"
          >
            <Prose>{study.ai.summary}</Prose>

            <p className="mt-4 flex flex-wrap items-baseline gap-x-2 text-sm text-fg-muted">
              <span className="mono-label">Model</span>
              {study.ai.model}
            </p>

            <h3 className="mono-label mt-5">Pipeline</h3>
            <ol className="mt-2.5 flex flex-col gap-3">
              {study.ai.pipeline.map((step, index) => (
                <li key={step.label} className="flex gap-3 text-sm">
                  <span className="font-mono text-[0.6875rem] text-mint/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-fg-muted">
                    <span className="font-medium text-fg">{step.label} — </span>
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </SubPanel>
        </div>
      ) : null}

      {study.agentic ? (
        <div className="mt-4">
          <SubPanel
            id={`${project.id}-agentic`}
            title="Orchestration, permissions and approval"
            icon={Bot}
            accent="text-info"
          >
            <Prose>{study.agentic.summary}</Prose>

            <h3 className="mono-label mt-5">Tools</h3>
            <ul className="mt-2.5 flex flex-col gap-2">
              {study.agentic.tools.map((tool) => (
                <li key={tool.name} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-2">
                  <span className="font-mono text-[0.8125rem] text-info">{tool.name}</span>
                  <span className="text-fg-muted">{tool.purpose}</span>
                </li>
              ))}
            </ul>

            <h3 className="mono-label mt-5">State</h3>
            <p className="mt-2 text-sm text-fg-muted">{study.agentic.stateManagement}</p>

            <h3 className="mono-label mt-5">Execution flow</h3>
            <ol className="mt-2.5 flex flex-col gap-2">
              {study.agentic.executionFlow.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-fg-muted">
                  <span className="font-mono text-[0.6875rem] text-info/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 mono-label">
                  <ShieldCheck aria-hidden="true" className="size-3.5 text-info" />
                  Permissions
                </h3>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {study.agentic.permissions.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-info/70"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 mono-label">
                  <UserCheck aria-hidden="true" className="size-3.5 text-caution" />
                  Human approval points
                </h3>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {study.agentic.humanApproval.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-caution/70"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SubPanel>
        </div>
      ) : null}

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <SubPanel
          id={`${project.id}-errors`}
          title="Error handling"
          icon={TriangleAlert}
          accent="text-caution"
        >
          <BulletGroup title="Failure modes addressed" items={study.errorHandling} />
        </SubPanel>

        <SubPanel
          id={`${project.id}-security`}
          title="Security"
          icon={ShieldCheck}
          accent="text-mint"
        >
          <BulletGroup title="Controls and boundaries" items={study.security} />
        </SubPanel>

        <SubPanel
          id={`${project.id}-testing`}
          title="Testing"
          icon={TestTube2}
          accent="text-info"
        >
          <BulletGroup title="How it would be verified" items={study.testing} />
        </SubPanel>
      </div>

      {study.tradeoffs.length > 0 ? (
        <div className="mt-4">
          <SubPanel
            id={`${project.id}-tradeoffs`}
            title="Trade-offs"
            icon={Scale}
            accent="text-violet-bright"
          >
            <ul className="grid gap-4 md:grid-cols-2">
              {study.tradeoffs.map((tradeoff) => (
                <li key={tradeoff.decision} className="border-l border-line-strong pl-4">
                  <h3 className="font-display text-sm font-semibold text-fg">{tradeoff.decision}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{tradeoff.rationale}</p>
                </li>
              ))}
            </ul>
          </SubPanel>
        </div>
      ) : null}

      {study.lessons.length > 0 ? (
        <div className="mt-4">
          <SubPanel
            id={`${project.id}-lessons`}
            title="What I would take forward"
            icon={Lightbulb}
            accent="text-caution"
          >
            <ul className="flex flex-col gap-2">
              {study.lessons.map((lesson) => (
                <li key={lesson} className="flex gap-2.5 text-sm text-fg-muted">
                  <span aria-hidden="true" className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-caution/70" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </SubPanel>
        </div>
      ) : null}

      <div className="mt-4">
        <SubPanel
          id={`${project.id}-results`}
          title="Verified results"
          icon={BarChart3}
          accent="text-mint"
        >
          {study.results.length > 0 ? (
            <dl className="grid gap-5 sm:grid-cols-3">
              {study.results.map((metric) => (
                <div key={metric.label}>
                  <dt className="mono-label">{metric.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-fg">{metric.value}</dd>
                  {metric.note ? <p className="mt-1 text-xs text-fg-subtle">{metric.note}</p> : null}
                </div>
              ))}
            </dl>
          ) : (
            <p className="max-w-[74ch] text-sm text-fg-subtle">
              No measured results recorded. Numbers belong here only once they have actually been
              measured — add them to <code className="font-mono text-[0.8rem]">caseStudy.results</code> in{' '}
              <code className="font-mono text-[0.8rem]">src/data/projects.ts</code>.
            </p>
          )}
        </SubPanel>
      </div>
    </>
  )

  // No `AnimatePresence` here on purpose: an exit animation must not gate which
  // project is mounted. The caller keys this component by project id, so
  // arriving from another case study is a fresh mount and the fade still plays.
  if (prefersReducedMotion || forceVisible) {
    return <div className="text-fg">{content}</div>
  }

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="text-fg"
    >
      {content}
    </motion.div>
  )
}
