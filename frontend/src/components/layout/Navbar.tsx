import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FileText, Menu, X } from 'lucide-react'
import { navItems, sectionIds } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useRoute } from '../../hooks/useRoute'
import { BASE } from '../../lib/motion'
import { sectionHref } from '../../lib/router'
import { cn } from '../../lib/utils'
import { ThemeMenu } from '../theme/ThemeMenu'
import { BrandMark } from '../ui/BrandMark'
import { Container } from '../ui/Container'
import { LinkChip } from '../ui/LinkChip'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const route = useRoute()
  const sectionId = useActiveSection(sectionIds)

  /**
   * A case study is part of the work section even though no section is in view
   * on its own route, so the nav keeps showing where the reader is. Without
   * this the whole nav goes unhighlighted the moment a card is opened.
   */
  const activeId = route.name === 'case-study' ? 'work' : sectionId

  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Solidify the bar only once the page has moved, so the hero reads edge to edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the menu and hands focus back to the button that opened it.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  // Move focus into the panel so keyboard users are not left behind the button.
  useEffect(() => {
    if (!menuOpen) return
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
  }, [menuOpen])

  // If the viewport grows past the mobile breakpoint, drop the menu entirely.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (query.matches) setMenuOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors',
        'duration-[var(--duration-base)] ease-[var(--ease-out-soft)]',
        scrolled ? 'border-line bg-ink/85 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <Container>
        {/*
          `relative` here is load-bearing: the theme panel is absolutely
          positioned against this row rather than against the button that opens
          it. The button sits mid-cluster, so anchoring a 21rem panel to it runs
          off the left edge of a 320px viewport.
        */}
        <div className="relative flex h-[var(--header-height)] items-center gap-4">
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-2.5 rounded-md py-1"
            onClick={() => setMenuOpen(false)}
          >
            <BrandMark className="size-8 shrink-0" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-display text-[0.9375rem] font-semibold text-fg">
                {profile.name}
              </span>
              <span className="mono-label truncate text-[0.625rem]">{profile.brand}</span>
            </span>
            <span className="sr-only">— back to top</span>
          </a>

          <nav aria-label="Sections" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={sectionHref(item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative block rounded-md px-3 py-2 text-sm transition-colors',
                        'duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]',
                        isActive
                          ? 'text-fg'
                          : 'text-fg-muted hover:bg-surface/60 hover:text-fg',
                      )}
                    >
                      {item.label}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-2.5 -bottom-px h-px bg-violet"
                          transition={BASE}
                        />
                      ) : null}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-3">
            <ThemeMenu />

            {/*
              Wrapped rather than handed a display utility directly. LinkChip sets
              its own `inline-flex`, and `cn` deliberately does not merge conflicting
              classes, so a `hidden` passed straight in would be settled by stylesheet
              order instead of intent — which left the chip visible on mobile and
              squeezed the brand name down to an ellipsis.
            */}
            <span className="hidden lg:flex">
              <LinkChip
                label="Résumé"
                href={profile.resume.href}
                icon={FileText}
                size="sm"
                pendingHint="Add your résumé URL in src/data/profile.ts to activate this link."
              />
            </span>

            <button
              ref={toggleRef}
              type="button"
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-md border border-line-strong',
                'bg-surface/70 text-fg transition-colors duration-[var(--duration-fast)] lg:hidden',
                'hover:border-violet/60 hover:bg-surface-raised',
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-navigation"
            ref={panelRef}
            key="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={BASE}
            className="absolute inset-x-0 top-full border-b border-line bg-ink/97 backdrop-blur-md lg:hidden"
          >
            <Container>
              <nav aria-label="Sections (mobile)" className="py-3">
                <ul className="flex flex-col">
                  {navItems.map((item) => {
                    const isActive = activeId === item.id
                    return (
                      <li key={item.id} className="border-b border-line/70 last:border-b-0">
                        <a
                          href={sectionHref(item.id)}
                          aria-current={isActive ? 'true' : undefined}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            'flex items-center justify-between gap-3 py-3.5 text-[1.0625rem]',
                            isActive ? 'text-violet-bright' : 'text-fg',
                          )}
                        >
                          {item.label}
                          {isActive ? (
                            <span className="mono-label text-[0.625rem] text-violet-bright">
                              Current
                            </span>
                          ) : null}
                        </a>
                      </li>
                    )
                  })}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 pb-5">
                  <LinkChip
                    label="Résumé"
                    href={profile.resume.href}
                    icon={FileText}
                    size="sm"
                    pendingHint="Add your résumé URL in src/data/profile.ts to activate this link."
                  />
                </div>
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
