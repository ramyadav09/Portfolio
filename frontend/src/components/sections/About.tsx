import type { ReactNode } from 'react'
import { Briefcase, Compass, FileText, GraduationCap, Mail, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { formatLocation } from '../../lib/identity'
import { cn } from '../../lib/utils'
import { GithubGlyph, LinkedinGlyph } from '../ui/BrandGlyphs'
import { ButtonLink } from '../ui/Button'
import { buttonClasses } from '../ui/buttonVariants'
import { Container } from '../ui/Container'
import { LinkChip } from '../ui/LinkChip'
import { Pill } from '../ui/Pill'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * One titled block inside the profile panel.
 *
 * Blocks rather than a definition list: a two-column key/value grid is exactly
 * the résumé table this section is meant not to be.
 */
function PanelBlock({
  title,
  icon: Icon,
  accent = 'text-mint',
  children,
}: {
  title: string
  icon: typeof Compass
  accent?: string
  children: ReactNode
}) {
  return (
    <div className="border-t border-line pt-5 first:border-t-0 first:pt-0">
      <h3 className="flex items-center gap-2.5 font-display text-[1.0625rem] font-semibold">
        <Icon aria-hidden="true" className={cn('size-4 shrink-0', accent)} />
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

/**
 * The personal profile: who I am, where I am, what I am looking for, and what I
 * have done.
 *
 * Education and experience render only when the data exists — an empty
 * "Education" heading would tell a reader less than saying nothing. Both are
 * documented with examples in `src/data/profile.ts` so filling them in is a
 * data edit, not a component edit.
 */
export function AboutSection() {
  const location = formatLocation(profile.location)
  const { education, experience } = profile

  return (
    <Section id="about" labelledBy="about-heading" className="border-t border-line/60">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="I care about how it is built, not only that it runs."
              lead={profile.intro}
              titleId="about-heading"
            />

            {location ? (
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-violet-bright/80" />
                  {location}
                </span>
                {profile.availability ? (
                  <Pill tone="mint">{profile.availability.label}</Pill>
                ) : null}
              </div>
            ) : null}

            {/* The lead carries the stack summary, so these are the paragraphs
                about how I work rather than a second list of technologies. */}
            <div className="mt-5 flex flex-col gap-4">
              {profile.about.map((paragraph) => (
                <p key={paragraph} className="max-w-[70ch] text-[0.9375rem] text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {profile.careerInterests.length > 0 ? (
              <div className="mt-8">
                <h3 className="mono-label">What I am looking for</h3>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {profile.careerInterests.map((interest) => (
                    <li key={interest} className="flex gap-2.5 text-sm text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-violet/70"
                      />
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.05}>
            <div className="panel flex h-full flex-col gap-5 p-5 sm:p-6">
              {education ? (
                <PanelBlock title="Education" icon={GraduationCap} accent="text-violet-bright">
                  <p className="font-display text-[0.9375rem] font-semibold text-fg">
                    {education.degree}
                  </p>
                  <p className="mt-1 text-sm text-fg-muted">{education.institution}</p>
                  <p className="mt-0.5 text-sm text-fg-subtle">
                    {education.graduationYear}
                    {education.note ? ` · ${education.note}` : ''}
                  </p>
                </PanelBlock>
              ) : null}

              {experience.length > 0 ? (
                <PanelBlock title="Experience" icon={Briefcase} accent="text-info">
                  <ul className="flex flex-col gap-4">
                    {experience.map((entry) => (
                      <li key={`${entry.role}-${entry.organisation}-${entry.period}`}>
                        <p className="text-sm font-medium text-fg">{entry.role}</p>
                        <p className="text-sm text-fg-muted">
                          {entry.organisation} · {entry.period}
                        </p>
                        <p className="mt-1 text-sm text-fg-muted">{entry.summary}</p>
                      </li>
                    ))}
                  </ul>
                </PanelBlock>
              ) : null}

              <PanelBlock title="Currently exploring" icon={Compass} accent="text-mint">
                <ul className="flex flex-col gap-2.5">
                  {profile.exploring.map((topic) => (
                    <li key={topic} className="flex gap-2.5 text-sm text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-mint/70"
                      />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </PanelBlock>

              <div className="mt-auto border-t border-line pt-5">
                <h3 className="mono-label">Find me</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <LinkChip
                    label="Email"
                    href={profile.email ? `mailto:${profile.email}` : null}
                    icon={Mail}
                    size="sm"
                    pendingHint="Add your email address in src/data/profile.ts to activate this link."
                  />
                  <LinkChip label="GitHub" href={profile.github.href} icon={GithubGlyph} size="sm" />
                  <LinkChip
                    label="LinkedIn"
                    href={profile.linkedin.href}
                    icon={LinkedinGlyph}
                    size="sm"
                  />
                </div>

                {profile.resume.href ? (
                  <ButtonLink
                    href={profile.resume.href}
                    variant="secondary"
                    size="sm"
                    className="mt-3"
                  >
                    <FileText aria-hidden="true" className="size-4" />
                    View résumé
                  </ButtonLink>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Add your résumé URL in src/data/profile.ts to activate this button."
                    className={buttonClasses(
                      { variant: 'secondary', size: 'sm' },
                      'mt-3 cursor-not-allowed border-dashed text-fg-subtle',
                    )}
                  >
                    <FileText aria-hidden="true" className="size-4" />
                    View résumé
                    <span className="sr-only"> — résumé not available yet</span>
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
