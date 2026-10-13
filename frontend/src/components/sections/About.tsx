import { Compass, FileText, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubGlyph, LinkedinGlyph } from '../ui/BrandGlyphs'
import { Container } from '../ui/Container'
import { LinkChip } from '../ui/LinkChip'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutSection() {
  return (
    <Section id="about" labelledBy="about-heading" className="border-t border-line/60">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="I care about how it is built, not only that it runs."
              titleId="about-heading"
            />

            <div className="mt-6 flex flex-col gap-4">
              {profile.about.map((paragraph) => (
                <p key={paragraph} className="max-w-[70ch] text-[0.9375rem] text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="panel flex h-full flex-col gap-5 p-5 sm:p-6">
              <div>
                <h3 className="flex items-center gap-2.5 font-display text-[1.0625rem] font-semibold">
                  <Compass aria-hidden="true" className="size-4 text-mint" />
                  Currently exploring
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
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
              </div>

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
                  <LinkChip label="Résumé" href={profile.resume.href} icon={FileText} size="sm" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
