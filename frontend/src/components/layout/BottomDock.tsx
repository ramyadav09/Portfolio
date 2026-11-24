import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Briefcase, Cpu, Home, Mail, Palette, User, Workflow } from 'lucide-react'
import { useRoute } from '../../hooks/useRoute'
import { useActiveSection } from '../../hooks/useActiveSection'
import { sectionIds } from '../../data/navigation'
import { sectionHref } from '../../lib/router'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/utils'

interface DockItem {
  id: string
  label: string
  href: string
  icon: typeof Home
}

const dockItems: DockItem[] = [
  { id: 'top', label: 'Home', href: '#top', icon: Home },
  { id: 'work', label: 'Work', href: sectionHref('work'), icon: Briefcase },
  { id: 'how-i-build', label: 'How I build', href: sectionHref('how-i-build'), icon: Workflow },
  { id: 'stack', label: 'Stack', href: sectionHref('stack'), icon: Cpu },
  { id: 'about', label: 'About', href: sectionHref('about'), icon: User },
  { id: 'contact', label: 'Contact', href: sectionHref('contact'), icon: Mail },
]

export function BottomDock() {
  const route = useRoute()
  const activeSection = useActiveSection(sectionIds)
  const { choice, setMode } = useTheme()
  const [footerVisible, setFooterVisible] = useState(false)

  // In case studies, active is work
  const currentActive = route.name === 'case-study' ? 'work' : activeSection

  const toggleThemeMode = () => {
    const nextMode = choice.mode === 'light' ? 'dark' : 'light'
    setMode(nextMode)
  }

  // Smoothly hide dock when footer enters the viewport so it never obscures copyright
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.15 },
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <aside
      aria-label="Quick navigation dock"
      className={cn(
        'fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transform-gpu transition-[transform,opacity] duration-300 ease-[var(--ease-out-soft)]',
        footerVisible && 'pointer-events-none translate-y-16 opacity-0',
      )}
    >
      <nav className="flex items-center gap-1 rounded-full border border-line bg-surface/90 px-3 py-1.5 shadow-lg backdrop-blur-md">
        {dockItems.map((item) => {
          const isActive = currentActive === item.id || (item.id === 'top' && !currentActive)
          const Icon = item.icon

          return (
            <motion.a
              key={item.id}
              href={item.href}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              whileHover={{ y: -4, scale: 1.06 }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'relative flex size-9 items-center justify-center rounded-full transition-colors',
                isActive
                  ? 'bg-violet/15 text-violet'
                  : 'text-fg-muted hover:bg-surface-inset hover:text-fg',
              )}
            >
              <Icon aria-hidden="true" className="size-4" />
            </motion.a>
          )
        })}

        <span className="mx-1 h-4 w-px bg-line" aria-hidden="true" />

        <motion.button
          type="button"
          onClick={toggleThemeMode}
          title={`Switch to ${choice.mode === 'light' ? 'Dark' : 'Light'} mode`}
          aria-label="Toggle theme mode"
          whileHover={{ y: -4, scale: 1.06 }}
          whileTap={{ y: 0, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="flex size-9 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-inset hover:text-fg"
        >
          <Palette aria-hidden="true" className="size-4" />
        </motion.button>
      </nav>
    </aside>
  )
}
