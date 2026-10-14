import type { Profile } from './types'

/**
 * ---------------------------------------------------------------------------
 * PROFILE — edit this file first.
 * ---------------------------------------------------------------------------
 * Every field marked `null` renders as a visibly disabled "pending" chip, never
 * as a link that goes nowhere. `isSampleContent` covers this file only — it is
 * false now that the profile and About copy describe Ram; the projects in
 * `projects.ts` carry their own `isPlaceholder` flag and still keep the banner
 * up on their own.
 *
 * Nothing here is invented: no years of experience, employers, clients, awards
 * or metrics.
 */
export const profile: Profile = {
  isSampleContent: false,

  name: 'Ram',
  brand: 'Intelligence Workspace',
  role: 'Full-Stack Developer · GenAI & Agentic AI',
  location: null,

  headline: 'I build software that thinks, connects, and works.',
  subheadline:
    'Full-stack applications, GenAI experiences, and agentic systems built to solve real problems.',
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

  about: [
    'I am a developer focused on building full-stack and AI-powered applications. I care about clean, readable and maintainable code, and I learn best by building real things: most of what I know came from hitting a wall in a project and having to work out why.',
    'What I build runs the length of the stack. Full-stack web applications, backend APIs with Python and FastAPI, cross-platform mobile apps with React Native. On the AI side that means Generative AI with LLMs and LangChain, agentic systems and autonomous workflows with LangGraph, and RAG-powered search. I am equally at home on REST APIs and real-time features.',
    'I care about the unglamorous parts: validation, honest error states, and code that is still easy to reason about months later. That is usually the difference between a demo and something someone can actually use.',
  ],
  exploring: [
    'Evaluating retrieval quality in RAG pipelines, rather than trusting the output',
    'Multi-agent coordination patterns beyond a single LangGraph workflow',
    'Background jobs and long-running AI work that outlives the request that started it',
  ],

  footerNote: 'Designed and built with React, Vite, TypeScript and Tailwind CSS.',
}
