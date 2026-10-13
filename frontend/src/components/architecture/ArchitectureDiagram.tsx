import { ChevronDown, ChevronRight, GitBranch } from 'lucide-react'
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

/** Accent per boundary: text colour and the rule that marks the stage. */
const stageAccent: Record<string, { text: string; rule: string }> = {
  client: { text: 'text-violet', rule: 'border-violet/40' },
  api: { text: 'text-info', rule: 'border-info/40' },
  data: { text: 'text-mint', rule: 'border-mint/40' },
  ai: { text: 'text-info', rule: 'border-info/45' },
}

export function ArchitectureSection() {
  return (
    <Section id="how-i-build" labelledBy="how-i-build-heading" className="border-t border-line/60">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How I build"
            title="One request, four deliberate boundaries."
            lead="The same shape covers most of my full-stack work: an interface that never talks to a database directly, a service layer that validates and authorises before anything happens, persistence as the single source of truth, and AI services reached only through that same controlled path."
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
                      className="flex shrink-0 flex-col items-center justify-center py-1.5 lg:flex-row lg:px-1.5 lg:py-0"
                    >
                      <span className="h-2.5 w-px bg-line-strong lg:h-px lg:w-3" />
                      <ChevronDown className="size-3.5 text-line-strong lg:hidden" />
                      <ChevronRight className="hidden size-3.5 text-line-strong lg:block" />
                      <span className="h-2.5 w-px bg-line-strong lg:h-px lg:w-3" />
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
              <span
                aria-hidden="true"
                className="mx-auto block h-6 w-0 border-l border-dashed border-line-strong"
              />

              <div className="panel-flat flex flex-col gap-3.5 border-l-2 border-dashed border-info/45 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-surface-inset">
                    <AiIcon aria-hidden="true" className="size-4 text-info" />
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
