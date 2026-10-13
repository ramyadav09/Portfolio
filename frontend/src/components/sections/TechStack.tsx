import { proficiencyMeta, proficiencyOrder, skillCategories } from '../../data/skills'
import { getIcon } from '../../lib/icons'
import { cn } from '../../lib/utils'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const levelDot: Record<string, string> = {
  primary: 'bg-violet',
  working: 'bg-mint',
  exploring: 'bg-caution',
}

export function TechStackSection() {
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

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = getIcon(category.icon)

            return (
              <Reveal key={category.id} delay={0.03 * index}>
                <article
                  aria-labelledby={`stack-${category.id}`}
                  className="panel-flat flex h-full flex-col gap-5 p-5"
                >
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

                  <div className="flex flex-col gap-4">
                    {proficiencyOrder.map((level) => {
                      const items = category.items.filter((item) => item.level === level)
                      if (items.length === 0) return null

                      return (
                        <div key={level} className="flex flex-col gap-2">
                          <h4 className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className={cn('size-1.5 rounded-full', levelDot[level])}
                            />
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
              <dt className="flex items-center gap-2">
                <span aria-hidden="true" className={cn('size-1.5 rounded-full', levelDot[level])} />
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
