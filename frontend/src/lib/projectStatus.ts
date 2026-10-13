import type { PillTone } from '../components/ui/Pill'
import type { ProjectStatus } from '../data/types'

/**
 * Status is always rendered as a word, never as a colour swatch on its own.
 * `concept` and `archived` are deliberately low-key; `live` is the only status
 * that reads as an achievement, and it should only be set once something really
 * is deployed.
 *
 * `built` exists for the common middle case: the code is finished and runs, but
 * nothing is hosted. Without it the only honest options were overclaiming
 * (`live`) or underselling finished work as `in-progress`.
 */
export const projectStatusMeta: Record<ProjectStatus, { label: string; tone: PillTone }> = {
  concept: { label: 'Concept', tone: 'muted' },
  'in-progress': { label: 'In progress', tone: 'caution' },
  built: { label: 'Built', tone: 'violet' },
  live: { label: 'Live', tone: 'mint' },
  archived: { label: 'Archived', tone: 'neutral' },
}
