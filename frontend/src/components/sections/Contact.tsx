import { FileText, Mail, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import { formatLocation } from '../../lib/identity'
import { GithubGlyph, LinkedinGlyph } from '../ui/BrandGlyphs'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { LinkChip } from '../ui/LinkChip'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function ContactSection() {
  const location = formatLocation(profile.location)

  return (
    <Section id="contact" labelledBy="contact-heading" className="border-t border-line/60">
      <Container>
        <Reveal>
          <div className="panel p-6 sm:p-9">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12">
              <div>
                <SectionHeading
                  eyebrow="Contact"
                  title="If you are hiring, or building something adjacent, I would like to hear about it."
                  lead="I am most useful on work that needs both sides of the stack: a product surface people actually use, backed by an API and a data model that will still make sense in a year. Send the problem, not a polished brief — I am happy to talk through scope."
                  titleId="contact-heading"
                />

                <p className="mt-6 text-sm text-fg-subtle">
                  There is deliberately no contact form here. A form that cannot deliver a message is
                  worse than no form at all, and this site has no server to send one from: so the
                  links are the direct route in.
                </p>
              </div>

              <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface-inset/60 p-5">
                <div>
                  <h3 className="mono-label">Get in touch</h3>
                  {location ? (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-fg-muted">
                      <MapPin aria-hidden="true" className="size-4 shrink-0 text-violet" />
                      Based in {location}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <LinkChip
                    label={profile.email ?? 'Email'}
                    href={profile.email ? `mailto:${profile.email}` : null}
                    icon={Mail}
                    pendingHint="Add your email address in src/data/profile.ts to activate this link."
                  />
                  <div className="flex flex-wrap gap-2">
                    <LinkChip label="GitHub" href={profile.github.href} icon={GithubGlyph} />
                    <LinkChip label="LinkedIn" href={profile.linkedin.href} icon={LinkedinGlyph} />
                  </div>
                </div>

                {profile.resume.href ? (
                  <ButtonLink
                    href={profile.resume.href}
                    variant="secondary"
                    size="sm"
                    className="mt-2 w-full justify-center"
                  >
                    <FileText aria-hidden="true" className="size-4" />
                    View résumé
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
