import type { Proficiency, SkillCategory } from './types'

/**
 * ---------------------------------------------------------------------------
 * TECHNICAL TOOLKIT — edit freely.
 * ---------------------------------------------------------------------------
 * Skills are grouped by discipline instead of one wall of badges, and each one
 * carries an honest label rather than a percentage:
 *
 *   primary    — you reach for it by default and could defend the choices
 *   working    — you have built something real with it
 *   exploring  — you are learning it now; do not overstate it
 *
 * Keep the labels truthful. A recruiter who catches one inflated claim stops
 * believing the rest of the page. Remove anything you cannot talk about.
 *
 * The split below follows the stack as described in the owner's own profile:
 * the five areas they lead with are `primary`, everything else they listed is
 * `working`, and only the `exploring` group claims any less than that. Python
 * and JavaScript appear once each, in the discipline where they do the work,
 * rather than being repeated under a fundamentals heading.
 */
/** Display order for the proficiency groups. */
export const proficiencyOrder: Proficiency[] = ['primary', 'working', 'exploring']

/** Short group headings plus the sentence that explains them on the page. */
export const proficiencyMeta: Record<Proficiency, { label: string; description: string }> = {
  primary: { label: 'Default choice', description: 'I reach for these first and can justify the trade-offs.' },
  working: { label: 'Used to build with', description: 'I have built something real with these.' },
  exploring: { label: 'Currently learning', description: 'Picking these up now — not claiming depth yet.' },
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Web interfaces that stay fast and usable on a small screen.',
    icon: 'layout',
    items: [
      { name: 'React', level: 'primary' },
      { name: 'JavaScript', level: 'primary' },
      { name: 'HTML', level: 'working' },
      { name: 'CSS', level: 'working' },
      { name: 'Tailwind CSS', level: 'working' },
      { name: 'Redux', level: 'working' },
      { name: 'React Query', level: 'working' },
      { name: 'React Router', level: 'working' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'APIs with real validation, honest errors and predictable contracts.',
    icon: 'server',
    items: [
      { name: 'Python', level: 'primary' },
      { name: 'FastAPI', level: 'primary' },
      { name: 'Pydantic', level: 'working' },
      { name: 'Node.js', level: 'working' },
      { name: 'Express.js', level: 'working' },
      { name: 'Socket.IO', level: 'working' },
      { name: 'REST API design', level: 'working' },
    ],
  },
  {
    id: 'data',
    title: 'Databases & caching',
    blurb: 'Schema first: model the data properly and the API gets simpler.',
    icon: 'database',
    items: [
      { name: 'PostgreSQL', level: 'working' },
      { name: 'MySQL', level: 'working' },
      { name: 'MongoDB', level: 'working' },
      { name: 'Redis', level: 'working' },
      { name: 'SQL & query design', level: 'working' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    blurb: 'One codebase, shipped to both phone platforms.',
    icon: 'mobile',
    items: [
      { name: 'React Native', level: 'primary' },
      { name: 'Cross-platform app structure', level: 'working' },
      { name: 'Consuming REST APIs from a client', level: 'working' },
    ],
  },
  {
    id: 'ai',
    title: 'Generative & agentic AI',
    blurb: 'Retrieval and orchestration around a model — not prompt tricks.',
    icon: 'brain',
    items: [
      { name: 'LangChain', level: 'primary' },
      { name: 'LangGraph', level: 'primary' },
      { name: 'LLM integration', level: 'working' },
      { name: 'RAG', level: 'working' },
      { name: 'AI agents', level: 'working' },
      { name: 'Agentic workflows', level: 'working' },
      { name: 'Prompt design & grounding', level: 'working' },
      { name: 'Vector search & embeddings', level: 'working' },
      { name: 'Retrieval quality evaluation', level: 'exploring' },
      { name: 'Multi-agent coordination', level: 'exploring' },
      { name: 'Background jobs for AI workloads', level: 'exploring' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Languages & CS fundamentals',
    blurb: 'The part underneath the frameworks — still the thing that decides the design.',
    icon: 'braces',
    items: [
      { name: 'Java', level: 'working' },
      { name: 'C', level: 'working' },
      { name: 'Object-oriented programming', level: 'working' },
      { name: 'Data structures & algorithms', level: 'working' },
    ],
  },
  {
    id: 'tools',
    title: 'DevOps & tools',
    blurb: 'The parts that decide whether software survives its second month.',
    icon: 'git',
    items: [
      { name: 'Git', level: 'primary' },
      { name: 'GitHub', level: 'primary' },
      { name: 'Docker', level: 'working' },
      { name: 'Debugging & root-cause analysis', level: 'working' },
      { name: 'Testing (unit & integration)', level: 'working' },
      { name: 'Deployment & environment config', level: 'working' },
    ],
  },
]
