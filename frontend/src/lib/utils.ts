/**
 * Minimal class-name joiner.
 * A dependency (clsx / tailwind-merge) is not justified for a site this size,
 * so conditional classes are joined with a two-line helper instead.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/**
 * Resolves external URLs intelligently: on Android mobile devices, converts Play Store
 * web URLs to native `market://details?id=...` deep links to directly launch the
 * Play Store application, while preserving the standard HTTPS URL for desktop and other platforms.
 */
export function resolvePlayStoreUrl(url: string | null): string | null {
  if (!url) return null
  if (typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)) {
    const match = url.match(/play\.google\.com\/store\/apps\/details\?id=([a-zA-Z0-9._]+)/)
    if (match?.[1]) {
      return `market://details?id=${match[1]}`
    }
  }
  return url
}
