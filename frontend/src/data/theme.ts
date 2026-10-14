/**
 * The accent palette offered in the theme picker.
 *
 * These are *hues*, not literal paint values: the theme layer takes the hue and
 * chroma from the chosen entry and clamps lightness itself, so every one of
 * these renders at the same visual weight and contrast. That is why they are
 * spread evenly around the wheel rather than tuned per colour.
 *
 * The first entry is the original violet the design shipped with, so
 * "default" is a real, reachable state rather than a special case.
 */
export interface AccentPreset {
  name: string
  /** Seed colour. Only its hue and chroma reach the page — see index.css. */
  value: string
}

export const ACCENT_PRESETS: readonly AccentPreset[] = [
  { name: 'Violet', value: '#a77bff' },
  { name: 'Indigo', value: '#7c86ff' },
  { name: 'Blue', value: '#3b9bff' },
  { name: 'Sky', value: '#22b8e6' },
  { name: 'Teal', value: '#10bfa8' },
  { name: 'Emerald', value: '#16c57f' },
  { name: 'Lime', value: '#8cc63f' },
  { name: 'Amber', value: '#f0b429' },
  { name: 'Orange', value: '#ff8b4d' },
  { name: 'Rose', value: '#ff5f7e' },
  { name: 'Pink', value: '#ff6fc8' },
  { name: 'Magenta', value: '#d45cff' },
] as const

/** `system` follows the operating system and keeps following it. */
export type ThemeMode = 'light' | 'dark' | 'system'

/** What the user picked, before the OS is consulted. */
export interface ThemeChoice {
  mode: ThemeMode
  accent: string
}

/** The mode actually applied to the document. */
export type ResolvedMode = 'light' | 'dark'

export const DEFAULT_THEME: ThemeChoice = {
  // Dark by default rather than `system`: the design was signed off dark, and
  // most operating systems default to light, so `system` would silently change
  // the first impression for most visitors. Light and system are one click away.
  mode: 'dark',
  accent: ACCENT_PRESETS[0].value,
}

export const THEME_MODES: readonly { value: ThemeMode; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
]
