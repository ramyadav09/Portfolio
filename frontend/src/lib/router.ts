/**
 * A hash router, deliberately hand-written rather than pulled from a package.
 *
 * The site is a static SPA on a host with no server routes, so path-based
 * routing would mean a case-study URL 404s on refresh or when shared unless the
 * host is configured to rewrite unknown paths to `index.html`. Hash routes have
 * no such requirement: every URL is a real, refreshable, shareable link on any
 * static host, and the router costs nothing in bundle size.
 *
 * The URL space is tiny and overlaps with the section anchors that were already
 * in use, so the two are distinguished by a leading slash:
 *
 *   #work               -> home, scrolled to the section with id="work"
 *   #/work/smartfind    -> the SmartFind case study
 *   (empty)             -> home, top of page
 *
 * Anything unrecognised falls back to home rather than rendering a dead page.
 */

export const CASE_STUDY_PATH = '/work/'

export type Route =
  | { name: 'home'; anchor: string | null }
  | { name: 'case-study'; projectId: string }

/** Accepts either a full `location.hash` or the raw fragment. */
export function parseRoute(hash: string): Route {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash

  if (raw.startsWith(CASE_STUDY_PATH)) {
    const projectId = safeDecode(raw.slice(CASE_STUDY_PATH.length))
    if (projectId) return { name: 'case-study', projectId }
  }

  return { name: 'home', anchor: raw ? safeDecode(raw) : null }
}

/** The link target for a project's case study. */
export function caseStudyHref(projectId: string): string {
  return `#${CASE_STUDY_PATH}${encodeURIComponent(projectId)}`
}

/** The in-page target a nav link should point at, from any route. */
export function sectionHref(sectionId: string): string {
  return `#${sectionId}`
}

/**
 * A malformed percent-escape in the hash throws in `decodeURIComponent`, and a
 * hand-edited URL must not take the page down.
 */
function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}
