import { DEFAULT_THEME, type ResolvedMode, type ThemeChoice, type ThemeMode } from '../data/theme'

/**
 * Theme plumbing: read the stored choice, work out which mode that means right
 * now, and write the result onto the document.
 *
 * The whole theme is expressed as exactly two things on `<html>`:
 *
 *   - `--accent-source` (one colour, the user's pick)
 *   - `data-theme="light" | "dark"`
 *
 * Everything else — the accent family, the support hue, every surface — is
 * derived in `src/index.css`. Nothing here knows about individual colours, so
 * adding a themeable token never means touching this file.
 */

export const THEME_STORAGE_KEY = 'iw-theme'

/** Matches `--duration-base` in index.css; the cross-fade is time-boxed to it. */
const SWITCH_ANIMATION_MS = 260

const HEX_PATTERN = /^#[0-9a-f]{6}$/i

/**
 * `system` is resolved through this so the hook and the inline boot script in
 * `index.html` agree on what "system" currently means.
 */
export const DARK_QUERY = '(prefers-color-scheme: dark)'

/** Turn a stored preference into the mode that should actually be painted. */
export function resolveMode(mode: ThemeMode, prefersDark: boolean): ResolvedMode {
  if (mode === 'system') return prefersDark ? 'dark' : 'light'
  return mode
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system'
}

function isAccent(value: unknown): value is string {
  return typeof value === 'string' && HEX_PATTERN.test(value)
}

/**
 * Read the stored choice, discarding anything malformed.
 *
 * Storage is user-writable and survives deploys, so it is treated as untrusted
 * input: an unknown mode or a non-hex accent falls back to the default rather
 * than being written into a CSS custom property.
 */
export function readStoredTheme(): ThemeChoice | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null

    const { mode, accent } = parsed as Record<string, unknown>
    return {
      mode: isThemeMode(mode) ? mode : DEFAULT_THEME.mode,
      accent: isAccent(accent) ? accent : DEFAULT_THEME.accent,
    }
  } catch {
    // Private mode, disabled storage, or corrupt JSON — the default is fine.
    return null
  }
}

export function storeTheme(choice: ThemeChoice): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(choice))
  } catch {
    // Not being able to remember the choice must not break applying it.
  }
}

/**
 * Paint the choice onto `<html>`, optionally cross-fading from the old theme.
 *
 * The transition class is added for the duration of the change only, so the
 * document never carries a permanent transition on every element — which would
 * tax every hover and scroll on a page this size. Reduced motion skips it.
 */
let switchTimer = 0

export function applyTheme(resolved: ResolvedMode, accent: string, animate = false): void {
  const root = document.documentElement

  const paint = () => {
    root.style.setProperty('--accent-source', accent)
    root.dataset.theme = resolved

    // Chrome renders its own UI (scrollbars, form controls) from this, and the
    // mobile address bar is tinted from the meta tag.
    const themeColor = document.querySelector('meta[name="theme-color"]')
    themeColor?.setAttribute('content', resolved === 'light' ? '#f6f7fb' : '#11152a')
  }

  if (!animate || prefersReducedMotion()) {
    paint()
    return
  }

  root.classList.add('theme-switching')
  // Flush styles so the transition is registered *before* the values change;
  // without this the class and the change land in the same frame and nothing
  // animates.
  void root.offsetWidth
  paint()

  window.clearTimeout(switchTimer)
  switchTimer = window.setTimeout(() => {
    root.classList.remove('theme-switching')
  }, SWITCH_ANIMATION_MS)
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
