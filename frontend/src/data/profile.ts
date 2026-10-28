import headshot from '../assets/Profile.jpeg'
import type { Profile } from './types'
/**
 * ---------------------------------------------------------------------------
 * PROFILE — edit this file first.
 * ---------------------------------------------------------------------------
 * Every personal fact on the site comes from here. Nothing is repeated in a
 * component, so changing a name, a city or a résumé link is a one-line edit.
 *
 * Two conventions keep the page honest:
 *
 *  - A `MaybeLink` with `href: null` renders as a visibly disabled "pending"
 *    chip, never as a link that goes nowhere.
 *  - A `null` block — `photoUrl`, `location`, `education` — is omitted from the
 *    UI rather than shown empty. `experience` follows the same rule when the
 *    list is empty.
 *
 * Nothing here is invented: no years of experience, employers, clients, awards,
 * grades or metrics.
 */
export const profile: Profile = {
  isSampleContent: false,

  fullName: 'Ram Kumar Yadav',
  /** Short form, kept for the navbar where the full name would crowd the mark. */
  name: 'Ram',
  brand: 'Intelligence Workspace',
  role: 'Full-Stack Developer · GenAI & Agentic AI',

  /**
   * The headshot, imported rather than referenced by path so Vite fingerprints
   * it and copies it into the build the same way it handles the bundled CSS.
   * Replace `src/assets/Profile.jpeg` with a new file and leave this line alone.
   *
   * Set this to `null` to fall back to the initials monogram in `Avatar` — the
   * monogram is what renders when no photo exists, never a stock portrait.
   * The photo is not square (864 × 1184), so `Avatar` crops it to the centre of
   * a square frame; if the crop lands badly, adjust the `object-position` there.
   */
  photoUrl: headshot,

  /**
   * Renders as `Bhubaneswar, Odisha`. Add `country: 'India'` and the hero, About
   * and Contact read `Bhubaneswar, Odisha, India` with no other change — the
   * country is deliberately left unset because it is not a fact stated here.
   */
  location: { city: 'Bhubaneswar', state: 'Odisha' },

  headline: 'I build software that thinks, connects, and works.',
  subheadline:
    'An entry-level developer building full-stack applications, GenAI experiences and agentic systems that solve real problems.',

  /**
   * Lead paragraph of the About section — deliberately not shown in the hero,
   * which stays identity, headline, one supporting line and the two actions.
   */
  intro:
    'I build full-stack and AI-powered applications. Most of my work is Python and FastAPI behind a React or React Native client, backed by PostgreSQL or MongoDB. Lately my focus is on practical AI: retrieval that returns the right context, LangChain and LangGraph pipelines, and agentic workflows that know where a human belongs in the loop.',

  email: 'rkramyadav2063@gmail.com',
  github: { label: 'GitHub', href: 'https://github.com/ramyadav09' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ram-kumar-yadav09' },
  resume: { label: 'Résumé', href: 'https://drive.google.com/file/d/1dTq94OQFRtlQ9jmDd07Wkr-mqmb8fv-W/view?usp=drive_link' },

  /**
   * The availability pill is hidden while this is null. Only enable it with
   * wording you can stand behind, e.g.
   *   availability: { label: 'Open to full-stack roles', note: 'From March 2026' }
   */
  availability: null,

  /** Paragraphs under `intro`. Anything repeating that stack summary is omitted. */
  about: [
    'I care about clean, readable and maintainable code, and I learn best by building real things: most of what I know came from hitting a wall in a project and having to work out why.',
    'I care about the unglamorous parts: validation, honest error states, and code that is still easy to reason about months later. That is usually the difference between a demo and something someone can actually use.',
  ],

  /**
   * What I am looking for. Short phrases because they render as a list — see
   * `exploring` below for what is being learned rather than sought.
   */
  careerInterests: [
    'Full-stack engineering, entry level, with AI features built in rather than bolted on',
    'Applied Generative AI: retrieval, grounding and evaluation inside real product flows',
    'Agentic systems with tools, durable state and human checkpoints',
  ],

  /**
   * TODO(owner): supply this and the block appears in About with no other
   * change. Left null on purpose — a degree, an institution and a year are
   * facts only you can state. For example:
   *
   *   education: {
   *     degree: 'B.Tech in Computer Science',
   *     institution: 'Your university',
   *     graduationYear: '2026',
   *     note: 'Expected',
   *   },
   */
  education: null,

  /**
   * TODO(owner): add internships, freelance work or part-time roles here and the
   * block appears in About. Empty on purpose — this is the one claim a reader
   * cannot check, so it is left out rather than guessed at. For example:
   *
   *   { role: 'Backend Intern', organisation: 'Company', period: 'Jun — Aug 2025',
   *     summary: 'What you built and what changed because of it.' }
   */
  experience: [],

  exploring: [
    'Evaluating retrieval quality in RAG pipelines, rather than trusting the output',
    'Multi-agent coordination patterns beyond a single LangGraph workflow',
    'Background jobs and long-running AI work that outlives the request that started it',
  ],

  footerNote: 'Designed and built with React, Vite, TypeScript and Tailwind CSS.',
}
