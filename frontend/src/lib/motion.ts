import type { Transition, Variants } from 'motion/react'

/**
 * Shared motion vocabulary.
 * Everything here is short and easing-driven: reveals settle in a few hundred
 * milliseconds so the page never feels slower than the reading it supports.
 */

/** Soft deceleration curve, matching `--ease-out-soft` in index.css. */
export const EASE_OUT_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const FAST: Transition = { duration: 0.24, ease: EASE_OUT_SOFT }
export const BASE: Transition = { duration: 0.42, ease: EASE_OUT_SOFT }

/** Fired once, when ~20% of an element has entered the viewport. */
export const revealViewport = { once: true, amount: 0.2 } as const

/** Parent that staggers its direct children. */
export const staggerGroup: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

/** Child item for `staggerGroup`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: BASE },
}

/** Default single-element scroll reveal. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: BASE },
}

/** Horizontal variant used by the architecture diagram, which grows to the right. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: BASE },
}
