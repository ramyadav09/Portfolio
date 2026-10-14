import { useMemo, useSyncExternalStore } from 'react'
import { parseRoute, type Route } from '../lib/router'

/**
 * The current route, tracked from `location.hash`.
 *
 * `useSyncExternalStore` rather than `location` state in an effect: the hash is
 * genuinely external state that can change without React knowing (back and
 * forward buttons, a pasted URL, a link inside the case study), and reading it
 * live means a round trip through the history API can never render one frame of
 * the wrong route.
 */
function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getHash = () => window.location.hash

/** No location to read while server-rendering, so start at home. */
const getServerHash = () => ''

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash)

  // `hash` is a primitive, so this only re-parses when it actually changes.
  return useMemo(() => parseRoute(hash), [hash])
}
