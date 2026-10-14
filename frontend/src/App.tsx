import { useEffect } from 'react'
import { ArchitectureSection } from './components/architecture/ArchitectureDiagram'
import { Hero } from './components/hero/Hero'
import { ContentStatusNotice } from './components/layout/ContentStatusNotice'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { AboutSection } from './components/sections/About'
import { ContactSection } from './components/sections/Contact'
import { TechStackSection } from './components/sections/TechStack'

export default function App() {
  /**
   * The browser resolves a URL fragment before React has rendered the sections,
   * so opening a deep link directly (/#work, /#contact, a shared link) would
   * otherwise land at the top of the page. Re-apply the jump once the sections
   * exist — instantly, since this is the arrival, not a user-initiated scroll.
   */
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ''))
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    const jump = () => target.scrollIntoView({ block: 'start', behavior: 'instant' })

    // Jump immediately so the arrival does not depend on an animation frame,
    // then once more on the next frame in case late-loading fonts shifted the
    // layout underneath the target.
    jump()
    const frame = window.requestAnimationFrame(jump)
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:bg-violet focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        Skip to content
      </a>

      <div className="flex min-h-dvh flex-col">
        <Navbar />
        <ContentStatusNotice />

        <main id="main" className="flex-1">
          <Hero />
          <ProjectsSection />
          <ArchitectureSection />
          <TechStackSection />
          <AboutSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  )
}
