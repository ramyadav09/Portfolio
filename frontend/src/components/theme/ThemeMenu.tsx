import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Monitor, Moon, Palette, RotateCcw, Sun } from 'lucide-react'
import { ACCENT_PRESETS, THEME_MODES, type ThemeMode } from '../../data/theme'
import { useTheme } from '../../hooks/useTheme'
import { BASE } from '../../lib/motion'
import { cn } from '../../lib/utils'

const MODE_ICONS: Record<ThemeMode, typeof Moon> = {
  dark: Moon,
  light: Sun,
  system: Monitor,
}

const PANEL_ID = 'theme-panel'

/**
 * The theme control: a palette button in the header that opens a panel with
 * three appearance modes, twelve accent swatches and a free colour input.
 *
 * The panel is a non-modal popover rather than a dialog — the page stays
 * readable behind it — so it closes on Escape, on an outside press and on a
 * choice, and hands focus back to the button that opened it.
 */
export function ThemeMenu() {
  const { choice, setMode, setAccent, reset } = useTheme()
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const close = () => {
      setOpen(false)
      triggerRef.current?.focus()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  // Move focus into the panel so keyboard users are not left behind the button.
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('button, input')?.focus()
  }, [open])

  return (
    // Deliberately *not* `relative`. The panel is positioned against the header
    // row instead — see the comment in Navbar.tsx — and clamping to `100%` of
    // that row is what keeps it on screen at 320px.
    <div>
      <button
        ref={triggerRef}
        type="button"
        className={cn(
          'inline-flex size-11 items-center justify-center rounded-md border border-line-strong',
          'bg-surface/70 text-fg-muted transition-colors duration-[var(--duration-fast)]',
          'hover:border-violet/60 hover:bg-surface-raised hover:text-fg',
          open && 'border-violet/70 text-fg',
        )}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label="Theme and accent colour"
        onClick={() => setOpen((value) => !value)}
      >
        <Palette aria-hidden="true" className="size-5" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={PANEL_ID}
            ref={panelRef}
            key={PANEL_ID}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={BASE}
            className="panel absolute top-full right-0 z-50 mt-2 w-[min(21rem,100%)] p-4"
          >
            <fieldset>
              <legend className="mono-label">Accent</legend>

              <div className="mt-3 grid grid-cols-6 gap-2">
                {ACCENT_PRESETS.map((preset) => {
                  const isActive = choice.accent.toLowerCase() === preset.value.toLowerCase()

                  return (
                    <motion.button
                      key={preset.value}
                      type="button"
                      whileHover={{ scale: 1.14 }}
                      whileTap={{ scale: 0.92 }}
                      transition={BASE}
                      onClick={() => setAccent(preset.value)}
                      aria-pressed={isActive}
                      aria-label={`${preset.name} accent`}
                      title={preset.name}
                      className={cn(
                        'accent-swatch relative flex size-8 items-center justify-center rounded-full',
                        'border border-line-strong transition-shadow duration-[var(--duration-fast)]',
                        isActive && 'ring-2 ring-fg ring-offset-2 ring-offset-surface',
                      )}
                      // The seed for this swatch only. `.accent-swatch` derives the
                      // preview from it on the element itself.
                      style={{ '--swatch-seed': preset.value } as CSSProperties}
                    >
                      {isActive ? (
                        <Check
                          aria-hidden="true"
                          className="size-4 text-[light-dark(white,var(--color-on-accent))]"
                        />
                      ) : null}
                    </motion.button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-5">
              <span className="mono-label">Appearance</span>

              <div
                role="group"
                aria-label="Appearance"
                className="mt-3 grid grid-cols-3 gap-1 rounded-md border border-line p-1"
              >
                {THEME_MODES.map((mode) => {
                  const Icon = MODE_ICONS[mode.value]
                  const isActive = choice.mode === mode.value

                  return (
                    <button
                      key={mode.value}
                      type="button"
                      onClick={() => setMode(mode.value)}
                      aria-pressed={isActive}
                      className={cn(
                        'inline-flex items-center justify-center gap-1.5 rounded-sm py-2 text-sm',
                        'transition-colors duration-[var(--duration-fast)]',
                        isActive
                          ? 'bg-violet text-[var(--color-on-accent)]'
                          : 'text-fg-muted hover:bg-surface/70 hover:text-fg',
                      )}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                      {mode.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
              <label className="flex items-center gap-2.5 text-sm text-fg-muted">
                <input
                  type="color"
                  value={choice.accent}
                  onChange={(event) => setAccent(event.target.value)}
                  className="size-8 cursor-pointer rounded-sm border border-line-strong bg-surface-inset p-0.5"
                />
                Custom
              </label>

              <button
                type="button"
                onClick={reset}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm text-fg-muted',
                  'transition-colors duration-[var(--duration-fast)] hover:bg-surface/70 hover:text-fg',
                )}
              >
                <RotateCcw aria-hidden="true" className="size-3.5" />
                Reset
              </button>
            </div>

            <p className="mt-3 text-xs text-fg-subtle">
              The accent sets the hue. Lightness stays fixed so every combination keeps its
              contrast.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
