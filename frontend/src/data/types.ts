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

/** City and state, kept apart so either can be omitted or reworded. */
export interface Location {
  city: string
  /** Region between city and country — a state or province. */
  state?: string
  /**
   * Country. Optional, and currently unset, so the hero reads
   * `Bhubaneswar, Odisha`. Set it to `'India'` and it renders
   * `Bhubaneswar, Odisha, India` — no component change.
   */
  country?: string
}

/**
 * One qualification. `null` on the profile omits the whole block from the UI —
 * an empty "Education" heading is worse than no heading.
 */
export interface Education {
  degree: string
  institution: string
  /** A year or range, e.g. `2026` or `2022 — 2026`. */
  graduationYear: string
  /** Optional qualifier, e.g. `Expected` or `First class`. */
  note?: string
}

/** One role, internship or freelance engagement. */
export interface ExperienceEntry {
  role: string
  organisation: string
  /** Free text, e.g. `Jun 2025 — Aug 2025`. */
  period: string
  summary: string
}

export interface Profile {
  /**
   * Whether the profile and About copy are still sample content. Projects are
   * tracked separately by `Project.isPlaceholder`, so the notice can stay up for
   * unfinished projects after the profile itself is real.
   */
  isSampleContent: boolean
  /**
   * Full published name — the hero, the footer and the document author.
   * Nothing derives this from `name`, so the two can differ deliberately.
   */
  fullName: string
  /** Short display name, also used as the navigation brand. */
  name: string
  /** Short brand suffix shown next to the name in the navbar. */
  brand: string
  /** The role being applied for. Shown as the hero's role pill. */
  role: string
  /**
   * Headshot path under `public/`, e.g. `/headshot.jpg`. While this is `null`
   * the hero draws a monogram instead of a photo — never a stock face.
   */
  photoUrl: string | null
  location: Location | null
  /** Hero headline. Keep it short: it is the largest text on the page. */
  headline: string
  /** One-line support under the headline. */
  subheadline: string
  /** Lead paragraph of the About section. Kept out of the hero on purpose. */
  intro: string
  email: string | null
  github: MaybeLink
  linkedin: MaybeLink
  resume: MaybeLink
  /** Set to null to hide the availability pill entirely. */
  availability: Availability | null
  /**
   * About section body, one paragraph per entry, rendered under `intro`.
   * Keep these about approach and judgement — the stack belongs in `intro` and
   * in the skills data, not repeated here.
   */
  about: string[]
  /**
   * The kind of work being looked for, as short phrases. Rendered as a list in
   * About; distinct from `exploring`, which is what is being learned.
   */
  careerInterests: string[]
  /** `null` omits the education block from About entirely. */
  education: Education | null
  /** Empty omits the experience block from About entirely. */
  experience: ExperienceEntry[]
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
