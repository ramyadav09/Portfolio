import { motion } from 'motion/react'
import { ArrowRight, FileText, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { formatLocation } from '../../lib/identity'
import { GithubGlyph, LinkedinGlyph } from '../ui/BrandGlyphs'
import { Avatar } from '../ui/Avatar'
import { ButtonLink } from '../ui/Button'
import { buttonClasses } from '../ui/buttonVariants'
import { Container } from '../ui/Container'
import { LinkChip } from '../ui/LinkChip'
import { Pill } from '../ui/Pill'
import { SystemOverview } from './SystemOverview'

/**
 * Who this is, what they build, and where to go next — in that order.
 *
 * The identity block (portrait, full name, city) leads because a reader who
 * arrived from a résumé or a LinkedIn message is looking for a person first.
 * It is deliberately three short pieces: a paragraph of biography here pushed
 * both calls to action below the fold and repeated what About already says, so
 * the detail lives there and the hero stays identity, headline, one supporting
 * line and the two actions.
 *
 * The portrait is `Avatar`, which draws a monogram when no headshot is
 * configured — see `photoUrl` in `src/data/profile.ts`.
 */
export function Hero() {
  const location = formatLocation(profile.location)

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      {/* Blueprint texture: one decorative layer, no motion, no particles. */}
      <div aria-hidden="true" className="grid-texture pointer-events-none absolute inset-0 -z-10" />

      <Container className="pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start gap-5"
          >
            <div className="w-full">
              <div className="flex items-center gap-4">
                <Avatar name={profile.fullName} photoUrl={profile.photoUrl} />
                <div className="min-w-0">
                  <p className="font-display text-[1.125rem] leading-tight font-semibold sm:text-[1.3125rem]">
                    {profile.fullName}
                  </p>
                  {location ? (
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-fg-subtle">
                      <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                      {location}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-sm font-medium text-fg-muted">{profile.role}</span>
                {profile.availability ? (
                  <Pill tone="neutral">
                    {profile.availability.label}
                    {profile.availability.note ? (
                      <span className="sr-only">, {profile.availability.note}</span>
                    ) : null}
                  </Pill>
                ) : null}
              </div>
            </div>

            <div className="w-full">
              <h1
                id="hero-heading"
                className="max-w-[20ch] text-[clamp(2.25rem,6.4vw,3.9rem)] font-semibold text-fg"
              >
                {profile.headline}
              </h1>
            </div>

            <div className="w-full">
              <p className="max-w-[52ch] text-lg text-fg sm:text-xl">{profile.subheadline}</p>
            </div>

            <div className="w-full">
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
                    <span className="sr-only"> (résumé not available yet)</span>
                  </span>
                )}
              </div>
            </div>

            <div className="w-full">
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.09, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pl-2"
          >
            <SystemOverview />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
