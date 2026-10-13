import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { BASE } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds to hold before animating — used to stagger sibling reveals. */
  delay?: number
  /** Distance in px the element travels. Keep it small; this is polish, not a show. */
  y?: number
}

/** How long to wait for the observer before assuming it will not report. */
const OBSERVER_GRACE_MS = 900

/**
 * Fades and lifts its children in once, when they first scroll into view.
 *
 * Two escape hatches keep content readable rather than merely pretty:
 *
 * 1. `useReducedMotion()` renders plain markup in the final state, so an
 *    animation-based reveal can never be the reason something is invisible.
 * 2. A grace timer checks, once, whether the element is sitting in the viewport
 *    and shows it without animation if the observer never reported. The initial
 *    `opacity: 0` is written as an inline style, so without this a stalled
 *    IntersectionObserver would leave whole sections permanently blank.
 */
export function Reveal({ children, className, delay = 0, y = 22 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [forceVisible, setForceVisible] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || inView || forceVisible) return

    const timer = window.setTimeout(() => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0
      if (onScreen) setForceVisible(true)
    }, OBSERVER_GRACE_MS)

    return () => window.clearTimeout(timer)
  }, [prefersReducedMotion, inView, forceVisible])

  if (prefersReducedMotion || forceVisible) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ ...BASE, delay }}
    >
      {children}
    </motion.div>
  )
}
