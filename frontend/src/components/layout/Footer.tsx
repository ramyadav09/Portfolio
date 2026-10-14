import { ArrowUp, FileText, Mail } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { profile } from '../../data/profile'
import { sectionHref } from '../../lib/router'
import { BrandMark } from '../ui/BrandMark'
import { GithubGlyph, LinkedinGlyph } from '../ui/BrandGlyphs'
import { Container } from '../ui/Container'
import { LinkChip } from '../ui/LinkChip'

/** Evaluated once at module load, outside the render path. */
const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <BrandMark className="size-8 shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-[0.9375rem] font-semibold">{profile.name}</span>
                <span className="mono-label text-[0.625rem]">{profile.brand}</span>
              </div>
            </div>
            <p className="max-w-[42ch] text-sm text-fg-muted">
              Open to conversations about full-stack and applied-AI work. The quickest way to
              reach me is email, or a message on LinkedIn.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mono-label mb-3">Sections</h2>
            {/* py-1.5 keeps each link at a 29px target, clearing the 24px
                minimum in WCAG 2.2 SC 2.5.8 without adding visual noise. */}
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={sectionHref(item.id)}
                    className="block py-1.5 text-sm text-fg-muted transition-colors duration-[var(--duration-fast)] hover:text-violet-bright"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mono-label mb-3">Elsewhere</h2>
            <div className="flex flex-wrap gap-2">
              <LinkChip
                label={profile.email ?? 'Email'}
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

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {currentYear} {profile.name}. {profile.footerNote}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 self-start py-1 text-sm text-fg-muted transition-colors duration-[var(--duration-fast)] hover:text-violet-bright sm:self-auto"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
