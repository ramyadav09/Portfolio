import { FileText, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubGlyph, LinkedinGlyph } from '../ui/BrandGlyphs'
import { Container } from '../ui/Container'
import { LinkChip } from '../ui/LinkChip'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="border-t border-line/60">
      <Container>
        <Reveal>
          <div className="panel p-6 sm:p-9">
            <SectionHeading
              eyebrow="Contact"
              title="If you are hiring, or building something adjacent, I would like to hear about it."
              lead="I am most useful on work that needs both sides of the stack: a product surface people actually use, backed by an API and a data model that will still make sense in a year. Send the problem, not a polished brief — I am happy to talk through scope."
              titleId="contact-heading"
            />

            <div className="mt-8 flex flex-wrap gap-2.5">
              <LinkChip
                label={profile.email ?? 'Email'}
                href={profile.email ? `mailto:${profile.email}` : null}
                icon={Mail}
                pendingHint="Add your email address in src/data/profile.ts to activate this link."
              />
              <LinkChip label="GitHub" href={profile.github.href} icon={GithubGlyph} />
              <LinkChip label="LinkedIn" href={profile.linkedin.href} icon={LinkedinGlyph} />
              <LinkChip label="Résumé" href={profile.resume.href} icon={FileText} />
            </div>

            <p className="mt-6 max-w-[74ch] text-sm text-fg-subtle">
              There is deliberately no contact form here. A form that cannot deliver a message is
              worse than no form at all, and this site has no server to send one from — so the
              links above are the real route in.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
