import type { IconName } from '../lib/icons'

/* ---------------------------------------------------------------------------
   Shared
   --------------------------------------------------------------------------- */

/**
 * A link that may not exist yet.
 * `href: null` renders as a visibly disabled "pending" chip instead of a link,
 * so the site never ships a control that looks clickable but goes nowhere.
 */
export interface MaybeLink {
  label: string
  href: string | null
}

/** Honest, non-numeric proficiency labels — never percentages or progress bars. */
export type Proficiency = 'primary' | 'working' | 'exploring'

/* ---------------------------------------------------------------------------
   Profile
   --------------------------------------------------------------------------- */

export interface Availability {
  label: string
  note?: string
}

export interface Profile {
  /**
   * Whether the profile and About copy are still sample content. Projects are
   * tracked separately by `Project.isPlaceholder`, so the notice can stay up for
   * unfinished projects after the profile itself is real.
   */
  isSampleContent: boolean
  /** Display name, also used as the navigation brand. */
  name: string
  /** Short brand suffix shown next to the name in the navbar. */
  brand: string
  role: string
  location: string | null
  /** Hero headline. Keep it short: it is the largest text on the page. */
  headline: string
  /** One-line support under the headline. */
  subheadline: string
  /** Two or three sentences of introduction, shown in the hero. */
  intro: string
  email: string | null
  github: MaybeLink
  linkedin: MaybeLink
  resume: MaybeLink
  /** Set to null to hide the availability pill entirely. */
  availability: Availability | null
  /** About section, one paragraph per entry. */
  about: string[]
  /** "Currently exploring" list shown at the end of the About section. */
  exploring: string[]
  /** Optional footnote rendered in the footer. */
  footerNote: string
}

/* ---------------------------------------------------------------------------
   Skills
   --------------------------------------------------------------------------- */

export interface Skill {
  name: string
  level: Proficiency
  /** Optional, short, evidence-based context (e.g. "used in Agentic Task Assistant"). */
  context?: string
}

export interface SkillCategory {
  id: string
  title: string
  blurb: string
  icon: IconName
  items: Skill[]
}

/* ---------------------------------------------------------------------------
   Architecture (the illustrative "How I build" diagram)
   --------------------------------------------------------------------------- */

export type ArchitectureStageId = 'client' | 'api' | 'data' | 'ai'

export interface ArchitectureStage {
  id: ArchitectureStageId
  title: string
  subtitle: string
  icon: IconName
  items: string[]
}

/* ---------------------------------------------------------------------------
   Projects
   --------------------------------------------------------------------------- */

export type ProjectStatus = 'concept' | 'in-progress' | 'built' | 'live' | 'archived'

/**
 * How a project card is illustrated.
 * Until real screenshots exist, projects use an explicit, labelled placeholder
 * rather than a fabricated mock-up of a product.
 */
export type ProjectPreview =
  | { kind: 'placeholder'; caption: string }
  | { kind: 'image'; src: string; alt: string; width: number; height: number }

/** A measured, verifiable outcome. Leave the list empty until one exists. */
export interface Metric {
  label: string
  value: string
  note?: string
}

export interface CaseStudyStep {
  label: string
  detail: string
}

export interface AiDetail {
  summary: string
  model: string
  /** Retrieval / tool-calling / evaluation steps, in execution order. */
  pipeline: CaseStudyStep[]
}

export interface AgenticDetail {
  summary: string
  tools: Array<{ name: string; purpose: string }>
  stateManagement: string
  /** Ordered execution flow the agent follows for one request. */
  executionFlow: string[]
  permissions: string[]
  /** Points where a human must confirm before the agent acts. */
  humanApproval: string[]
}

export interface StackGroup {
  label: string
  items: string[]
}

export interface Tradeoff {
  decision: string
  rationale: string
}

export interface CaseStudy {
  /**
   * Rendered first, in a caution panel. Set this whenever the project is not
   * finished, so intent is never mistaken for shipped work.
   */
  disclaimer: string | null
  problem: string
  intendedUsers: string
  solution: string
  /** Ordered architecture / data-flow steps. */
  dataFlow: CaseStudyStep[]
  stack: StackGroup[]
  ai: AiDetail | null
  agentic: AgenticDetail | null
  errorHandling: string[]
  security: string[]
  testing: string[]
  tradeoffs: Tradeoff[]
  lessons: string[]
  /** Empty until outcomes have actually been measured. */
  results: Metric[]
}

export interface Project {
  id: string
  title: string
  /** One-line descriptor used on the card. */
  tagline: string
  summary: string
  status: ProjectStatus
  /** Exactly one project should be `featured: true`; it becomes the lead card. */
  featured: boolean
  /** True while the content is still sample copy that the owner must replace. */
  isPlaceholder: boolean
  /** The tools and languages the project is (or will be) built with. */
  stack: string[]
  repo: MaybeLink
  demo: MaybeLink
  preview: ProjectPreview
  /** Short, scannable capability bullets. */
  highlights: string[]
  /** What *you* did, specifically. Keep it honest and first-person-plural-free. */
  contribution: string
  caseStudy: CaseStudy
}
