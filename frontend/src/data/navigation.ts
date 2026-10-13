export interface NavItem {
  /** Must match the `id` of the rendered section. */
  id: string
  label: string
}

/**
 * Single source of truth for section order, navigation labels and the
 * active-section observer. The order here matches the order sections appear on
 * the page, so the navbar always reads top-to-bottom.
 */
export const navItems: NavItem[] = [
  { id: 'work', label: 'Work' },
  { id: 'how-i-build', label: 'How I build' },
  { id: 'stack', label: 'Stack' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

/** Stable array identity — safe to pass straight into useActiveSection. */
export const sectionIds: readonly string[] = navItems.map((item) => item.id)
