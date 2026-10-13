import { BrainCircuit, Info, Layers, Workflow } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Pill } from '../ui/Pill'
import { StaggerGroup, StaggerItem } from '../ui/Stagger'

/**
 * The three ideas the portfolio is organised around. This is a map of how the
 * work fits together, deliberately not a live status board: nothing here ticks,
 * counts, or pretends to measure anything.
 */
const concepts = [
  {
    id: 'build',
    step: '01',
    verb: 'Build',
    subject: 'Full-stack engineering',
    detail: 'Interfaces, APIs and data models that survive past the first demo.',
    icon: Layers,
    accent: 'text-violet',
    ring: 'border-violet/40 bg-violet/10',
  },
  {
    id: 'integrate',
    step: '02',
    verb: 'Integrate',
    subject: 'Generative AI',
    detail: 'Retrieval, grounding and evaluation wired into real product flows.',
    icon: BrainCircuit,
    accent: 'text-mint',
    ring: 'border-mint/40 bg-mint/10',
  },
  {
    id: 'orchestrate',
    step: '03',
    verb: 'Orchestrate',
    subject: 'Agentic workflows',
    detail: 'Tools, durable state and human checkpoints wrapped around a model.',
    icon: Workflow,
    accent: 'text-info',
    ring: 'border-info/40 bg-info/10',
  },
] as const

export function SystemOverview() {
  return (
    <section aria-labelledby="system-overview-heading" className="panel p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
        {/* A real h2, so the hero's panel introduces sub-headings in order
            rather than jumping straight from the h1 to h3s. */}
        <h2 id="system-overview-heading" className="mono-label text-fg-muted">
          System overview
        </h2>
        <Pill tone="muted" icon={<Info aria-hidden="true" className="size-3" />}>
          Illustrative
        </Pill>
      </div>

      <StaggerGroup className="relative mt-5">
        {/* The rail is the connective tissue between the three ideas. */}
        <span
          aria-hidden="true"
          className="absolute top-3 bottom-4 left-[1.0625rem] w-px bg-gradient-to-b from-violet/50 via-mint/40 to-info/40"
        />

        <ul className="flex flex-col gap-5">
          {concepts.map((concept) => (
            <StaggerItem key={concept.id} as="li" className="relative flex gap-4">
              <span
                className={cn(
                  'relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border',
                  concept.ring,
                  concept.accent,
                )}
              >
                <concept.icon aria-hidden="true" className="size-4" />
              </span>

              <div className="min-w-0 pt-0.5">
                <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <span className="mono-label text-[0.625rem]">{concept.step}</span>
                  {/* Label, not a heading: these are list items in one panel. */}
                  <span
                    className={cn('font-display text-[1.0625rem] font-semibold', concept.accent)}
                  >
                    {concept.verb}
                  </span>
                  <span className="text-sm text-fg-muted">{concept.subject}</span>
                </p>
                <p className="mt-1 text-sm text-fg-muted">{concept.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </ul>
      </StaggerGroup>

      <p className="mt-6 border-t border-line pt-4 text-xs text-fg-subtle">
        A description of how the work fits together — not live telemetry.
      </p>
    </section>
  )
}
