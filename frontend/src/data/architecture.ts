import type { ArchitectureStage } from './types'

/**
 * ---------------------------------------------------------------------------
 * "HOW I BUILD" — illustrative reference architecture.
 * ---------------------------------------------------------------------------
 * This is the shape most of my full-stack work follows, labelled on the page as
 * illustrative rather than as a diagram of any single shipped system. Replace
 * the item lists with the real stack of a project once it is public.
 */
export const architectureStages: ArchitectureStage[] = [
  {
    id: 'client',
    title: 'Interface',
    subtitle: 'Frontend',
    icon: 'layout',
    items: [
      'React + TypeScript',
      'Responsive, accessible layout',
      'Explicit loading, empty and error states',
      'Typed client generated from the API contract',
    ],
  },
  {
    id: 'api',
    title: 'Service',
    subtitle: 'API / backend',
    icon: 'server',
    items: [
      'Validated request boundaries',
      'Authorisation before handler logic',
      'Typed, versioned response contracts',
      'Async work pushed to a queue',
    ],
  },
  {
    id: 'data',
    title: 'Persistence',
    subtitle: 'Database & storage',
    icon: 'database',
    items: [
      'PostgreSQL as the source of truth',
      'Forward-only migrations',
      'Indexes designed from real queries',
      'Object storage for files and uploads',
    ],
  },
  {
    id: 'ai',
    title: 'Intelligence',
    subtitle: 'AI services',
    icon: 'brain',
    items: [
      'Retrieval before generation',
      'Typed tool calls with schema validation',
      'Bounded retries and fallbacks',
      'Provider kept swappable',
    ],
  },
]

/** Shown under the diagram so the drawing is never mistaken for a live system. */
export const architectureNote =
  'Illustrative reference architecture, not a diagram of production telemetry. A request enters at the interface, is validated and authorised by the service layer, reads or writes persistence, and reaches AI services only through the same controlled path.'
