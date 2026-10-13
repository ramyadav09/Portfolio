import {
  Blocks,
  Boxes,
  Braces,
  BrainCircuit,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  LayoutDashboard,
  Network,
  Plane,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TestTube2,
  Terminal,
  Wand2,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icon registry.
 * Content files reference icons by name so `data/*.ts` stays free of JSX and
 * the set of usable icons stays explicit.
 */
export const ICONS = {
  blocks: Blocks,
  boxes: Boxes,
  braces: Braces,
  brain: BrainCircuit,
  cloud: Cloud,
  code: Code2,
  compass: Compass,
  cpu: Cpu,
  database: Database,
  git: GitBranch,
  globe: Globe,
  layers: Layers,
  layout: LayoutDashboard,
  mobile: Smartphone,
  network: Network,
  plane: Plane,
  server: Server,
  shield: ShieldCheck,
  sparkles: Sparkles,
  terminal: Terminal,
  test: TestTube2,
  wand: Wand2,
  workflow: Workflow,
  wrench: Wrench,
} as const satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS

export function getIcon(name: IconName): LucideIcon {
  return ICONS[name]
}
