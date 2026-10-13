/**
 * Minimal class-name joiner.
 * A dependency (clsx / tailwind-merge) is not justified for a site this size,
 * so conditional classes are joined with a two-line helper instead.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
