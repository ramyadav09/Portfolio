import type { PillTone } from '../components/ui/Pill'
import type { ProjectStatus } from '../data/types'

/**
 * Status is always rendered as a word, never as a colour swatch on its own.
 * `concept` and `archived` are deliberately low-key; `live` is the only status
 * that reads as an achievement, and it should only be set once something really
 * is deployed.
 */
export const projectStatusMeta: Record<ProjectStatus, { label: string; tone: PillTone }> = {
  concept: { label: 'Concept', tone: 'muted' },
  'in-progress': { label: 'In progress', tone: 'caution' },
  live: { label: 'Live', tone: 'mint' },
  archived: { label: 'Archived', tone: 'neutral' },
}
