import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { staggerGroup, staggerItem } from '../../lib/motion'

/**
 * Mount-time entrance for the hero: a parent that sequences its children.
 * Falls back to plain markup under reduced motion, so nothing depends on an
 * animation to become visible.
 */
export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={staggerGroup} initial="hidden" animate="show">
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  /** Use `li` when the item is a direct child of a list. */
  as?: 'div' | 'li'
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    if (as === 'li') return <li className={className}>{children}</li>
    return <div className={className}>{children}</div>
  }

  if (as === 'li') {
    return (
      <motion.li className={className} variants={staggerItem}>
        {children}
      </motion.li>
    )
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}
