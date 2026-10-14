import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { DEFAULT_THEME, type ThemeChoice, type ThemeMode } from '../data/theme'
import { DARK_QUERY, applyTheme, readStoredTheme, resolveMode, storeTheme } from '../lib/theme'

/**
 * The operating system's preference, read through `useSyncExternalStore` rather
 * than mirrored into state.
 *
 * A mirrored copy has to be seeded by an effect, which races: if the preference
 * changes between the first render and the effect running, nothing corrects it
 * and `system` mode silently paints the wrong theme until the next change.
 * `useSyncExternalStore` reads the live value on every render and subscribes to
 * changes, so there is no window to go stale — and no setState inside an effect.
 */
function subscribeToSystemPreference(onChange: () => void) {
  const query = window.matchMedia(DARK_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getSystemPrefersDark = () => window.matchMedia(DARK_QUERY).matches

/** No OS to consult while server-rendering, so keep the project's dark default. */
const getServerPrefersDark = () => true

/**
 * Owns the theme choice and keeps the document in sync with it.
 *
 * React state is the source of truth after hydration; the inline script in
 * `index.html` has already painted the same values before first paint, so the
 * first render never animates or flashes. Only the first effect run — which
 * re-applies what the boot script already did — is excluded from the cross-fade.
 */
export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>(() => readStoredTheme() ?? DEFAULT_THEME)
  const prefersDark = useSyncExternalStore(
    subscribeToSystemPreference,
    getSystemPrefersDark,
    getServerPrefersDark,
  )
  const isFirstRun = useRef(true)

  const resolved = resolveMode(choice.mode, prefersDark)

  useEffect(() => {
    applyTheme(resolved, choice.accent, !isFirstRun.current)
    isFirstRun.current = false
  }, [resolved, choice.accent])

  useEffect(() => {
    storeTheme(choice)
  }, [choice])

  const setMode = useCallback((mode: ThemeMode) => {
    setChoice((previous) => ({ ...previous, mode }))
  }, [])

  const setAccent = useCallback((accent: string) => {
    setChoice((previous) => ({ ...previous, accent }))
  }, [])

  const reset = useCallback(() => setChoice(DEFAULT_THEME), [])

  return { choice, resolved, setMode, setAccent, reset }
}
