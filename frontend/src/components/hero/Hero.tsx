import { ArrowRight, CircleDot, FileText } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubGlyph, LinkedinGlyph } from '../ui/BrandGlyphs'
import { ButtonLink } from '../ui/Button'
import { buttonClasses } from '../ui/buttonVariants'
import { Container } from '../ui/Container'
import { LinkChip } from '../ui/LinkChip'
import { Pill } from '../ui/Pill'
import { StaggerGroup, StaggerItem } from '../ui/Stagger'
import { SystemOverview } from './SystemOverview'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Blueprint texture: one decorative layer, no motion, no particles. */}
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 -z-10" />

      <Container className="pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <StaggerGroup className="flex flex-col items-start gap-6">
            <StaggerItem>
              <div className="flex flex-wrap items-center gap-2.5">
                <Pill tone="violet">{profile.role}</Pill>
                {profile.availability ? (
                  <Pill tone="mint" icon={<CircleDot aria-hidden="true" className="size-3" />}>
                    {profile.availability.label}
                    {profile.availability.note ? (
                      <span className="sr-only"> — {profile.availability.note}</span>
                    ) : null}
                  </Pill>
                ) : null}
                {profile.location ? (
                  <span className="text-sm text-fg-subtle">{profile.location}</span>
                ) : null}
              </div>
            </StaggerItem>

            <StaggerItem className="w-full">
              <h1
                id="hero-heading"
                className="max-w-[20ch] bg-gradient-to-br from-fg via-fg to-violet-bright bg-clip-text text-[clamp(2.25rem,6.4vw,3.9rem)] font-semibold text-transparent"
              >
                {profile.headline}
              </h1>
            </StaggerItem>

            <StaggerItem className="w-full">
              <p className="max-w-[52ch] text-lg text-fg sm:text-xl">{profile.subheadline}</p>
            </StaggerItem>

            <StaggerItem className="w-full">
              <p className="max-w-[64ch] text-[0.9375rem] text-fg-muted">{profile.intro}</p>
            </StaggerItem>

            <StaggerItem className="w-full">
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <ButtonLink href="#work" size="lg">
                  Explore my work
                  <ArrowRight aria-hidden="true" className="size-4" />
                </ButtonLink>

                {profile.resume.href ? (
                  <ButtonLink href={profile.resume.href} variant="secondary" size="lg">
                    <FileText aria-hidden="true" className="size-4" />
                    View résumé
                  </ButtonLink>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Add your résumé URL in src/data/profile.ts to activate this button."
                    className={buttonClasses(
                      { variant: 'secondary', size: 'lg' },
                      'cursor-not-allowed border-dashed text-fg-subtle',
                    )}
                  >
                    <FileText aria-hidden="true" className="size-4" />
                    View résumé
                    <span className="sr-only"> — résumé not available yet</span>
                  </span>
                )}
              </div>
            </StaggerItem>

            <StaggerItem className="w-full">
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="mono-label mr-1">Elsewhere</span>
                <LinkChip label="GitHub" href={profile.github.href} icon={GithubGlyph} size="sm" />
                <LinkChip
                  label="LinkedIn"
                  href={profile.linkedin.href}
                  icon={LinkedinGlyph}
                  size="sm"
                />
              </div>
            </StaggerItem>
          </StaggerGroup>

          <StaggerGroup className="lg:pl-2">
            <StaggerItem>
              <SystemOverview />
            </StaggerItem>
          </StaggerGroup>
        </div>
      </Container>
    </section>
  )
}
