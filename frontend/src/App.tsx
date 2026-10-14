import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import { ArchitectureSection } from './components/architecture/ArchitectureDiagram'
import { Hero } from './components/hero/Hero'
import { ContentStatusNotice } from './components/layout/ContentStatusNotice'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { CaseStudyPage } from './components/projects/CaseStudyPage'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { AboutSection } from './components/sections/About'
import { ContactSection } from './components/sections/Contact'
import { TechStackSection } from './components/sections/TechStack'
import { useRoute } from './hooks/useRoute'

export default function App() {
  const route = useRoute()
  const anchor = route.name === 'home' ? route.anchor : null

  /**
   * The browser resolves a URL fragment before React has rendered the sections,
   * so opening a deep link directly (/#work, /#contact, a shared link) would
   * otherwise land at the top of the page. Re-apply the jump once the sections
   * exist — instantly, since this is the arrival, not a user-initiated scroll.
   *
   * This runs when the home sections mount from a case study too, so a nav link
   * pressed on `#/work/smartfind` lands on the section rather than at the top.
   */
  useEffect(() => {
    if (!anchor) return

    const target = document.getElementById(anchor)
    if (!target) return

    const jump = () => target.scrollIntoView({ block: 'start', behavior: 'instant' })

    // Jump immediately so the arrival does not depend on an animation frame,
    // then once more on the next frame in case late-loading fonts shifted the
    // layout underneath the target.
    jump()
    const frame = window.requestAnimationFrame(jump)
    return () => window.cancelAnimationFrame(frame)
  }, [anchor])

  /**
   * `#main` is a bare fragment, and bare fragments are home-page section
   * anchors — so following the skip link from a case study would navigate back
   * to the home page instead of skipping the navigation. Moving focus directly
   * keeps the skip link working on every route; the `href` remains for the
   * no-JavaScript case.
   */
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('main')
    if (!target) return

    event.preventDefault()
    target.focus()
  }

  return (
    <>
      <a
        href="#main"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:bg-violet focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        Skip to content
      </a>

      <div className="flex min-h-dvh flex-col">
        <Navbar />
        <ContentStatusNotice />

        <main id="main" tabIndex={-1} className="flex-1">
          {route.name === 'case-study' ? (
            <CaseStudyPage projectId={route.projectId} />
          ) : (
            <>
              <Hero />
              <ProjectsSection />
              <ArchitectureSection />
              <TechStackSection />
              <AboutSection />
              <ContactSection />
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  )
}
