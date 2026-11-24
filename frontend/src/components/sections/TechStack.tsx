import { proficiencyMeta, proficiencyOrder, skillCategories } from '../../data/skills'
import { getIcon } from '../../lib/icons'
import { cn } from '../../lib/utils'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function TechStackSection() {
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Section id="stack" labelledBy="stack-heading" className="border-t border-line/60">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Technical toolkit"
            title="What I work with, labelled honestly."
            lead="Grouped by discipline rather than dumped into one wall of badges, and labelled by how much I would actually claim for each — no percentages, no progress bars, nothing I cannot back up in a conversation."
            titleId="stack-heading"
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = getIcon(category.icon)
            const isLast = index === skillCategories.length - 1

            return (
              <Reveal
                key={category.id}
                delay={0.03 * index}
                className={isLast ? 'md:col-span-2 lg:col-span-3' : undefined}
              >
                <article
                  aria-labelledby={`stack-${category.id}`}
                  onPointerMove={handlePointerMove}
                  className="panel-flat group relative flex h-full flex-col gap-5 overflow-hidden p-5"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(280px circle at var(--mx, -200px) var(--my, -200px), color-mix(in oklab, var(--color-violet) 12%, transparent), transparent 70%)',
                    }}
                  />
                  <header className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface-inset">
                      <Icon aria-hidden="true" className="size-4 text-violet" />
                    </span>
                    <div className="min-w-0">
                      <h3
                        id={`stack-${category.id}`}
                        className="font-display text-[1.0625rem] font-semibold"
                      >
                        {category.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-fg-muted">{category.blurb}</p>
                    </div>
                  </header>

                  <div className={cn('flex flex-col gap-4', isLast && 'md:grid md:grid-cols-3 md:gap-6')}>
                    {proficiencyOrder.map((level) => {
                      const items = category.items.filter((item) => item.level === level)
                      if (items.length === 0) return null

                      return (
                        <div key={level} className="flex flex-col gap-2">
                          <h4>
                            <span className="mono-label">{proficiencyMeta[level].label}</span>
                          </h4>

                          <ul className="flex flex-wrap gap-1.5">
                            {items.map((item) => (
                              <li
                                key={item.name}
                                title={item.context}
                                className="rounded-sm border border-line bg-surface-inset/80 px-2 py-1 font-mono text-[0.6875rem] text-fg-muted"
                              >
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <dl className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
          {proficiencyOrder.map((level) => (
            <div key={level} className="flex flex-col gap-1">
              <dt>
                <span className="mono-label">{proficiencyMeta[level].label}</span>
              </dt>
              <dd className="text-sm text-fg-muted">{proficiencyMeta[level].description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
