import { GitBranch } from 'lucide-react'
import { architectureNote, architectureStages } from '../../data/architecture'
import { getIcon } from '../../lib/icons'
import { cn } from '../../lib/utils'
import { Container } from '../ui/Container'
import { Pill } from '../ui/Pill'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const primaryStages = architectureStages.filter((stage) => stage.id !== 'ai')
const aiStage = architectureStages.find((stage) => stage.id === 'ai')
const AiIcon = aiStage ? getIcon(aiStage.icon) : null

/** Accent per boundary: active accent token and surface border. */
const stageAccent: Record<string, { text: string; rule: string }> = {
  client: { text: 'text-violet', rule: 'border-violet/40' },
  api: { text: 'text-violet', rule: 'border-violet/40' },
  data: { text: 'text-violet', rule: 'border-violet/40' },
  ai: { text: 'text-violet', rule: 'border-violet/40' },
}

export function ArchitectureSection() {
  return (
    <Section labelledBy="how-i-build-heading" className="border-t border-line/60">
      <Container id="how-i-build" className="scroll-mt-16">
        <Reveal>
          <SectionHeading
            eyebrow="How I build"
            title="One request, four deliberate boundaries."
            lead="The same shape covers most of my full-stack work: an interface that never talks to a database directly, a service layer that validates and authorizes before anything happens, persistence as the single source of truth, and AI services reached only through that same controlled path."
            titleId="how-i-build-heading"
          >
            <Pill tone="muted">Illustrative architecture</Pill>
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <ol className="flex flex-col lg:flex-row lg:items-stretch">
            {primaryStages.map((stage, index) => {
              const Icon = getIcon(stage.icon)
              const accent = stageAccent[stage.id]

              return (
                <li key={stage.id} className="flex flex-col lg:flex-1 lg:flex-row lg:items-stretch">
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="flex shrink-0 flex-col items-center justify-center py-2 lg:flex-row lg:px-2 lg:py-0"
                    >
                      {/* Mobile vertical pulse path */}
                      <svg
                        viewBox="0 0 16 32"
                        className="h-8 w-4 text-line-strong lg:hidden"
                        fill="none"
                      >
                        <path
                          d="M8 0 V24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="signal-path text-violet"
                        />
                        <path
                          d="M4 20 L8 26 L12 20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* Desktop horizontal pulse path */}
                      <svg
                        viewBox="0 0 36 16"
                        className="hidden h-4 w-9 text-line-strong lg:block"
                        fill="none"
                      >
                        <path
                          d="M0 8 H28"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="signal-path text-violet"
                        />
                        <path
                          d="M24 4 L30 8 L24 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}

                  <div
                    className={cn(
                      'panel-flat flex flex-1 flex-col gap-3 border-t-2 p-5 lg:border-t-0 lg:border-l-2',
                      accent.rule,
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface-inset">
                        <Icon aria-hidden="true" className={cn('size-4', accent.text)} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-semibold">{stage.title}</h3>
                        <p className="mono-label text-[0.625rem]">{stage.subtitle}</p>
                      </div>
                    </div>

                    <ul className="flex flex-col gap-1.5">
                      {stage.items.map((item) => (
                        <li key={item} className="text-sm text-fg-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ol>

          {aiStage && AiIcon ? (
            <>
              <div aria-hidden="true" className="mx-auto flex h-8 items-center justify-center">
                <svg viewBox="0 0 16 32" className="h-8 w-4 text-line-strong" fill="none">
                  <path
                    d="M8 0 V24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="signal-path text-violet"
                  />
                  <circle cx="8" cy="26" r="2" fill="currentColor" className="text-violet" />
                </svg>
              </div>

              <div className="panel-flat flex flex-col gap-3.5 border-l-2 border-dashed border-violet/40 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface-inset">
                    <AiIcon aria-hidden="true" className="size-4 text-violet" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">{aiStage.title}</h3>
                    <p className="mono-label text-[0.625rem]">{aiStage.subtitle}</p>
                  </div>
                  <Pill className="ml-auto" tone="muted" icon={<GitBranch aria-hidden="true" className="size-3" />}>
                    Reached only through the service layer
                  </Pill>
                </div>

                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {aiStage.items.map((item) => (
                    <li key={item} className="text-sm text-fg-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}

          <p className="mt-6 max-w-[86ch] text-sm text-fg-subtle">{architectureNote}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
