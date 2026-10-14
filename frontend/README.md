# Intelligence Workspace

A personal portfolio for a full-stack developer working with Generative AI and agentic
systems. Static-first, single page, built to be edited: all content lives in typed data
files, and every placeholder is visibly marked rather than quietly faked.

Built with **React 19 · Vite 8 · TypeScript 6 · Tailwind CSS 4 · Motion for React · Lucide**.

---

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server with HMR (http://localhost:5173)
npm run build      # typecheck, then production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # tsc -b, no emit
npm run lint       # oxlint
```

Requires Node.js 20+ (developed on Node 24).

---

## What is actually in here

| Section | File | Notes |
| --- | --- | --- |
| Navigation | `src/components/layout/Navbar.tsx` | Sticky, section-aware active state, accessible mobile menu |
| Theme + accent picker | `src/components/theme/ThemeMenu.tsx` | Header popover: twelve accents, a free colour input, Dark / Light / System |
| Hero | `src/components/hero/Hero.tsx` | Headline, intro, CTAs, social links |
| System overview panel | `src/components/hero/SystemOverview.tsx` | Build / Integrate / Orchestrate — a map, not a dashboard |
| Projects grid | `src/components/projects/ProjectsSection.tsx` | An index of seven equally sized cards, three across at desktop |
| Project card | `src/components/projects/ProjectCard.tsx` | Status pill, title, tagline, one way in — nothing else |
| Case-study page | `src/components/projects/CaseStudyPage.tsx` | One project at `#/work/:id`, with previous/next and a way back |
| Case study body | `src/components/projects/ProjectCaseStudy.tsx` | Problem → who it is for → solution → flow → AI → agentic → quality → trade-offs → results |
| Router | `src/lib/router.ts`, `src/hooks/useRoute.ts` | Hand-written hash router; no dependency, no server routes needed |
| Architecture | `src/components/architecture/ArchitectureDiagram.tsx` | Interface → Service → Persistence, with AI as a branch |
| Technical toolkit | `src/components/sections/TechStack.tsx` | Grouped by discipline, labelled by how much is claimed |
| About | `src/components/sections/About.tsx` | Prose plus "currently exploring" |
| Contact + footer | `src/components/sections/Contact.tsx`, `src/components/layout/Footer.tsx` | Real links only; no form that cannot deliver |
| Sample-content notice | `src/components/layout/ContentStatusNotice.tsx` | Self-clearing build-time honesty marker |

### Component structure

```
src/
  components/
    architecture/ArchitectureDiagram.tsx
    hero/{Hero,SystemOverview}.tsx
    layout/{Navbar,Footer,ContentStatusNotice}.tsx
    projects/{ProjectsSection,ProjectCard,CaseStudyPage,ProjectCaseStudy,ProjectPreviewFrame}.tsx
    sections/{TechStack,About,Contact}.tsx
    theme/ThemeMenu.tsx
    ui/{Button,buttonVariants,BrandGlyphs,BrandMark,Container,LinkChip,Pill,Reveal,Section,SectionHeading,Stagger}.tsx
  data/{types,profile,projects,skills,architecture,navigation,theme}.ts
  hooks/{useActiveSection,useRoute,useTheme}.ts
  lib/{motion,icons,projectStatus,router,theme,utils}.ts
  styles → src/index.css   (design tokens and the theme layer live here)
```

### Routing

Two kinds of destination share the URL fragment, told apart by a leading slash:

| URL | Renders |
| --- | --- |
| `/`, or no fragment | Home, top of page |
| `#work`, `#stack`, `#contact`, … | Home, scrolled to that section |
| `#/work/smartfind` | The SmartFind case study, as its own page |

Hash routes rather than real paths, deliberately: the site is static with no server routes, so a
path-based URL would 404 when refreshed or shared unless the host rewrites unknown paths to
`index.html`. `#/work/:id` is a real, refreshable, shareable link on any static host, and the
router costs nothing — `src/lib/router.ts` is a pure parse plus an href helper, and
`src/hooks/useRoute.ts` reads the hash through `useSyncExternalStore`, so back, forward and a
pasted URL all work without rendering a frame of the wrong route.

An id that matches no project renders an explanation and a link back rather than a blank page,
because the id is editable by hand in the address bar.

Two details the routing had to respect:

- **The skip link.** `#main` is a bare fragment, and bare fragments are home-page section
  anchors — so following it from a case study would navigate home instead of skipping the
  navigation. It moves focus directly and leaves the route alone; the `href` stays for the
  no-JavaScript case.
- **The active nav item.** No home section is in view on a case-study route, so the nav would go
  completely unhighlighted. It keeps **Work** current there, because that is where the reader is.

---

## Editing content

**Everything you need to change is a `.ts` file in `src/data/` — no component edits required.**

1. **`src/data/profile.ts`** — name, role, headline, intro, about paragraphs, links,
   `isSampleContent`. This is already `false`: the profile describes the owner, so the notice
   now tracks the outstanding projects only.
2. **`src/data/projects.ts`** — the seven projects, all `isPlaceholder: false`. Five are public
   GitHub repositories; two (Job Portal, Real Estate Platform) are private and were written up
   from their local source trees. Every entry's stack and features come from the code and
   manifests, not from the project's own README, which had drifted in both private repos.
   `featured: true` marks which project leads the grid; since every card is the same shape now,
   that only affects order. Adding or removing a project needs no component change, and its case
   study appears at `#/work/<id>` with no route to register.
3. **`src/data/skills.ts`** — the toolkit. Labels are `primary` / `working` / `exploring`;
   there are deliberately no percentages or progress bars.
4. **`src/data/architecture.ts`** — the "How I build" stages.
5. **`src/data/navigation.ts`** — nav labels and the section ids the observer watches.

### Three rules the code enforces

- **No dead links.** A `MaybeLink` with `href: null` renders as a dashed, non-interactive
  chip that announces "link not available yet" to screen readers. Fill in the `href` and it
  becomes a real link with `target="_blank" rel="noopener noreferrer"`. There is no
  `href="#"` anywhere.
- **No invented results.** `caseStudy.results` is a typed list of measured metrics. While it
  is empty, the case study says so in plain words instead of showing a number.
- **No fake screenshots.** `ProjectPreview` is either a real `image` with `alt` and
  dimensions, or a labelled placeholder. Nothing draws a mock UI.
- **No case study without a problem and a solution.** `caseStudy.problem`,
  `caseStudy.intendedUsers` and `caseStudy.solution` are required, non-optional strings, so a
  project cannot be added with a title and a pitch and nothing underneath. All seven render the
  same order; only the AI and agentic panels are optional, and they are `null` on exactly the
  projects that do not have one.

The notice under the navbar lists exactly what is still placeholder and disappears on its own.
It tracks the profile (`profile.isSampleContent`) and the projects (`project.isPlaceholder`)
independently, so finishing the profile does not silence a warning about unfinished project
briefs, and vice versa.

---

## Design tokens

All tokens are declared once in `src/index.css` inside Tailwind v4's `@theme` block, which
turns them into both CSS variables and utility classes (`bg-ink`, `text-fg-muted`,
`border-line`, `font-display`, `shadow-panel`, and so on).

| Token group | Values |
| --- | --- |
| Surfaces | `--color-ink` `#11152A`, `--color-surface` `#191E37`, `--color-surface-raised` `#1F2441`, `--color-surface-inset` `#151A34` |
| Accents (derived) | `--color-violet` `#A77BFF`, `--color-mint` `#8DE8C0`, `--color-info` `#A9C6FF`, `--color-on-accent` `#0B0E1C` — all computed from the user's pick, see Theming |
| Semantic | `--color-caution` `#FFCF8F` — fixed amber in every theme, never derived |
| Text | `--color-fg` `#F4F5FC`, `--color-fg-muted` `#B8BED2`, `--color-fg-subtle` `#8B93AD` |
| Lines | `--color-line` `#262C48`, `--color-line-strong` `#3B4470`, `--color-focus` `#8DE8C0` |
| Type | Space Grotesk (display), Inter (body), system monospace (labels) |
| Radii | `--radius-xs`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl` |
| Shadow | `--shadow-ambient`, `--shadow-panel`, `--shadow-glow` |
| Motion | `--ease-out-soft`, `--ease-in-out-soft`, `--duration-fast`, `--duration-base`, `--duration-slow` |
| Page scale | `--ui-scale` `90%` — applied as `font-size` on `html`; rescales the whole page |

### Page scale

`--ui-scale` is the single lever for the size of everything. It is applied as `font-size` on
`html`, and because there is not one hard-coded `px` value anywhere in `src/`, it scales text,
spacing, radii and container widths together — the effect of zooming the browser out, but at
100%. It is set to **90%**, the level the page was signed off at. Change that one number to
re-scale the entire design.

Two consequences are worth knowing:

- **Breakpoints deliberately do not move with it.** `rem` inside a media query resolves against
  the *initial* font size, never against a `font-size` set on `html`, so the responsive layout
  still switches at the original viewport widths. Verified rather than assumed: at a 980 px
  viewport `(width >= 64rem)` is **false** while `(width >= 922px)` is **true**, i.e. `64rem`
  still resolves to 1024 px. Real browser zoom would additionally have treated the viewport as
  10% wider; this does not, which is the one way the two differ.
- **Small things get smaller.** The uppercase mono labels land at **9 px**, and the mobile menu
  toggle falls from 44×44 to **39.6×39.6 px** — still clear of the 24 px WCAG 2.5.8 minimum, but
  no longer the 44 px enhanced target it used to be. Any control that must keep its physical
  size should be pinned in `px` rather than `rem`.

### Theming

The whole theme is two things on `<html>`: `--accent-source` (one colour) and
`data-theme="light" | "dark"`. Everything else is derived in `src/index.css`, so adding a
themeable token never means touching the theme code.

The picker offers **twelve** accent presets plus a free colour input, and an appearance switch
of **Dark / Light / System**. Presets are in `src/data/theme.ts`; storage, mode resolution and
painting are in `src/lib/theme.ts`.

**Only hue and chroma come from the pick.** Lightness is clamped into a band measured per mode
(`--accent-band-dark-*`, `--accent-band-light-*`) and chroma is capped at
`--accent-chroma-cap`, the accent chroma the design was built with. That is what makes an
arbitrary colour safe: the user chooses the hue, not the contrast. Two supporting hues are
rotated off the same pick by the offsets the original palette used (support at −132°, info at
−33°), so a theme stays internally consistent. `--color-caution` is deliberately *not* derived:
a warning that changes colour with someone's taste stops being a warning.

**The default is exact.** The original violet measures `oklch(0.68496 0.189227 296.46)`, which
its own band contains untouched, so the default theme is byte-identical to the pre-theming
design. Verified by resolving all 18 colour tokens through a canvas and diffing the sRGB output
against the original hex values: **zero drift**.

**Measured, not assumed.** Contrast was computed for every preset and for deliberately hostile
seeds (pure blue, pure green, black, white, mid-grey) across 14 text pairs in both modes:
**350 checks per mode, none below 4.5:1**. Worst case is 5.32:1 dark, 4.74:1 light. Two results
from that exercise are why the bands are what they are:

- Equal OKLCH lightness does **not** mean equal contrast. A green at L 0.56 carries far more
  relative luminance than a violet, so the first light-mode band failed for green and cyan
  (Emerald reached only 3.85:1) despite looking the same weight by eye.
- Uncapped chroma broke pure blue (`#0000ff`, chroma ~0.31). Forced to the band lightness it
  falls outside sRGB, and gamut mapping drags it darker than asked for — 3.44:1 on the dark
  surface. Capping chroma and lifting the band floor fixed it.

**No flash, and no trust in storage.** An inline script in `index.html` applies the stored
choice before first paint. It necessarily restates the read/validate/resolve logic from
`src/lib/theme.ts`, because it cannot import a module that early — keep the two in step.
Stored values are treated as untrusted in both places: a mode of `neon` or an accent of
`javascript:alert(1)` falls back to the defaults rather than reaching a CSS custom property
(verified).

Two implementation notes that are easy to get wrong:

- **Swatch previews are derived per element, not inherited.** Custom properties substitute
  their `var()` references where they are *declared*, so a swatch that merely set
  `--accent-source` would preview the *page's* accent, not its own. `.accent-swatch` therefore
  declares the seed and the formula together on the element.
- **The panel is anchored to the header row, not to the button.** The button sits mid-cluster,
  so a 21rem panel anchored to it ran off the *left* edge at 320 px. Anchoring to the row and
  clamping to `100%` keeps it on screen at every width.

### Contrast (measured, WCAG 2.1)

| Pair | Ratio | Level |
| --- | --- | --- |
| `#F4F5FC` on `#11152A` | 16.58:1 | AAA |
| `#B8BED2` on `#11152A` | 9.73:1 | AAA |
| `#8B93AD` on `#11152A` | 5.90:1 | AA |
| `#A77BFF` on `#11152A` | 5.94:1 | AA |
| `#8DE8C0` on `#11152A` | 12.40:1 | AAA |
| `#11152A` on `#A77BFF` (primary button) | 5.94:1 | AA |

White text on the violet accent would only reach **2.79:1**, which is why the primary button
uses near-black text (`--color-on-accent`) on the bright accent rather than the more obvious
white-on-violet. That token is what makes the button survive a theme change: in light mode the
accent is dark, so `--color-on-accent` flips to white.

Those ratios hold for the default theme, which is what this table documents. The themed case is
covered separately, and measured, under Theming.

---

## Motion

Motion for React drives five things and nothing else:

1. A staggered hero entrance (`StaggerGroup` / `StaggerItem`, mount-time).
2. Scroll-triggered section reveals (`Reveal`, `whileInView` + `once`).
3. A short cross-fade when the selected case study changes (a keyed remount, **not**
   `AnimatePresence` — see the decisions below).
4. A small layout animation on the active navigation underline.
5. The theme picker popover appearing, and hover/tap feedback on its swatches.

Restraint is deliberate: no parallax, no looping ambient animation, no scroll-jacking, no
custom cursor, and no animation that content depends on.

**Reduced motion is handled twice.** `<MotionConfig reducedMotion="user">` in `src/main.tsx`
makes Motion honour the OS setting, and `Reveal`, `StaggerGroup`, `StaggerItem` and the case
study additionally check `useReducedMotion()` and render plain markup in the final state, so
nothing can be left invisible. `src/index.css` also disables CSS transitions and smooth
scrolling under `prefers-reduced-motion: reduce`.

The theme cross-fade is CSS rather than Motion — a class is added to `<html>` for the duration
of the switch and removed afterwards, so the page does not carry a permanent `transition` on
every element. It is gated behind `prefers-reduced-motion: no-preference`, and verified to be
present mid-swap and gone afterwards.

---

## Decisions worth knowing about

- **No React Router.** The case study is a full-width region below the project grid, selected
  in place. That keeps a single route, shareable anchors, and no focus-trap to get wrong.
- **Inline case study, not a dialog.** Long-form content belongs in the page flow; the region
  takes `tabIndex={-1}` and receives focus when a card is activated so keyboard users follow
  the change.
- **`overflow-x: clip` on `<body>`** plus a shared `Container` width means no section can
  introduce horizontal scroll.
- **Brand icons are local SVG** (`src/components/ui/BrandGlyphs.tsx`) because lucide-react v1
  removed third-party brand marks. Two glyphs did not justify a second icon package.
- **The active nav link is computed from a reading line**, not intersection ratios: above the
  first section nothing is highlighted, and reaching the bottom always resolves to the last
  section (`src/hooks/useActiveSection.ts`).
- **`cn` joins class names, it does not merge them** (`src/lib/utils.ts`). A dependency on
  `clsx` + `tailwind-merge` was not justified for a site this size. The consequence is a real
  footgun: never pass a display utility (`hidden`, `block`, `flex`, …) to a component that sets
  its own `display`, because both classes land on the element and stylesheet order — not your
  intent — decides the winner. Wrap the component in an element that carries the display
  utility instead. This is exactly what went wrong with the header résumé chip: `hidden
  lg:inline-flex` lost to `LinkChip`'s own `inline-flex`, so the chip stayed visible on mobile
  and squeezed the brand name down to an ellipsis.
- **No contact form.** There is no backend and no email service, so a form could not deliver
  anything. The links are the mechanism, and the section says so.
- **Private projects are described but not linked.** A private repository returns 404 for every
  visitor, so both private projects use `repo: { label: 'Private repository', href: null }`,
  which renders as a disabled chip and keeps the "no dead links" rule intact. Both were
  verified 404 anonymously before being written up this way. A note in each case study says the
  source is not public.
- **`status: 'built'` was added for the in-between case.** The original four statuses had no
  honest label for finished code that is not hosted: `live` would overclaim, `in-progress`
  would undersell completed work, and `concept` would be false. Six of the seven projects are
  `built`; Job Portal is `in-progress`. Nothing is `live`.
- **The case study is not wrapped in `AnimatePresence`.** It previously used
  `mode="wait"`, which does not mount the incoming project until the outgoing one finishes
  exiting — so *which* case study you could read depended on an animation frame arriving. When
  frames are dropped or throttled the panel sat at `opacity: 0` still showing the previous
  project's markup. The component is now keyed by project id at the call site, so selection is
  an immediate remount with a fade, and an escape hatch renders it statically if the entrance
  animation has not resolved. Same rule as `Reveal`: an animation must never be the reason
  content is missing.
- **No analytics, no tracking, no cookies.**

### Bundle (production, measured)

These are the figures `npm run build` prints, restated as its three artefacts rather than as a
per-chunk split, because the previous table's per-chunk rows no longer summed to the total it
quoted.

| Artefact | Raw | Gzip |
| --- | --- | --- |
| `dist/index.html` | 3.9 kB | 1.7 kB |
| `dist/assets/style-*.css` | ≈50 kB | ≈9.2 kB |
| `dist/assets/index-*.js` | 500.2 kB | 157.7 kB |

The CSS figure is deliberately approximate: Tailwind v4 scans every non-ignored file for
candidate class names, and this README counts — rewriting a sentence that mentions a utility
shifts the stylesheet by a few hundred bytes. Watch the build output rather than this table if
you need the exact number.

The build also prints Vite's "some chunks are larger than 500 kB" notice, because the one JS
chunk now sits a few hundred bytes over that default threshold. It is a heuristic rather than an
error, and code-splitting the case-study route is the obvious way to clear it — worth doing when
the bundle is next touched, since a case study is only ever requested on its own URL.

The JS is a single chunk holding React, Motion for React, lucide-react and the app code. An
earlier per-chunk analysis put Motion at roughly 132 kB raw / 43 kB gzip, the largest avoidable
cost. Converting the components from `motion.*` to `m.*` under
`<LazyMotion features={domAnimation}>` would remove roughly 20 kB gzip, at the cost of also
dropping the layout-animated nav underline (that needs `domMax`). It was left as the
straightforward API deliberately; revisit if the budget tightens.

---

## Verification performed

Everything below was executed, not assumed:

- `npm run build` — TypeScript 6 (`tsc -b`) clean, Vite production build succeeds.
- `npm run lint` (`oxlint`, 116 rules over 45 files) — **0 warnings, 0 errors**.
- Browser, via the dev server at 1440 / 768 / 390 / 320 px:
  - **No console errors** or failed requests.
  - **No horizontal overflow** at any of those widths (measured against
    `scrollWidth`, with a per-element bounding-box sweep as a fallback). Re-run at 320, 390,
    768, 1024 and 1440 px after the page scale change: zero overflow, zero elements past the
    right edge at every width.
  - **Heading order has no skipped levels** (`h1 → h2 → h3 …`) and no duplicate `id`s.
  - **320 px sweep** caught the header résumé chip rendering at mobile widths, which pushed the
    right-hand cluster to 161 px and truncated the brand to `Rom …`. Fixed by wrapping the chip
    (see the `cn` decision above); the brand now renders in full, untruncated, and the
    right-hand cluster is 39.6 px wide.
  - Active nav tracking verified for all five sections, at the bottom of the page, and
    cleared at the top.
  - Mobile menu: opens with `aria-expanded="true"`, locks background scroll, moves focus to
    the first link, closes on <kbd>Esc</kbd> and returns focus to the toggle. Toggle measures
    39.6×39.6 px at the 90% page scale (44×44 px before it), so it still clears the 24 px
    minimum but no longer meets the 44 px enhanced target.
  - **Routing driven for real.** Clicking a card's "Read the case study" changed the URL to
    `#/work/smartfind` and replaced the page: one `h1`, the home sections gone from the DOM,
    Work shown as the current nav item, and the page at `scrollY 0`. Back returned to the
    previous route.
  - **Deep links survive a refresh**, in the production build of `dist/`, not just the dev
    server: `#/work/codeguard-ai` loaded cold and rendered its case study with no home sections
    and no console errors.
  - **An unknown id is handled**: `#/work/does-not-exist` rendered "No case study at this
    address" with a working way back and no prev/next, instead of a blank page.
  - **Prev/next wraps.** From SmartFind, Previous is the last project and Next is the second —
    the set is a loop, not a dead end at either end.
  - **Nav links work from a case study**: `#work` returned home and landed on the section, its
    top at 80 px, below the sticky header.
  - **The skip link does not navigate.** On a case-study route, <kbd>Tab</kbd> then
    <kbd>Enter</kbd> moved focus to `main#main`, left the hash at `#/work/smartfind` and kept the
    case study mounted — following the `href` would have sent the reader home instead.
  - **The grid is uniform.** All seven cards measured identically — 389 × 343 px at 1440 (three
    columns, three rows, no overflow), 342 × 267 px at 320 (one column, all at `left 18`) — with
    two links each, and no case-study markup anywhere in the grid. Nothing on the main page is
    larger than anything else.
  - **A case study's heading outline has no skipped levels** (`h1 → h2 → h3`) — rechecked after
    the panel headings were re-mapped from `h3`/`h4` to `h1`/`h2`/`h3`.
  - Contrast ratios computed for every token pair (table above).
  - WCAG 2.2 SC 2.5.8 target sizes: footer links and the "back to top" control were
    undersized at 17–20 px and were fixed to clear 24 px. Re-measured after the page scale
    change: the smallest control is "back to top" at **25.2 px** tall, then footer links at
    28.8 px — all still above the floor, and a sweep of every anchor and button found only the
    deliberately 1×1 visually-hidden skip link below it.
  - No empty, `#`, or placeholder `href` anywhere; every anchor and button has an accessible
    name; all nine not-yet-available links are `aria-disabled` and announce their state in text —
    7 live-demo chips, one inside each case study, and the 2 private-repository chips on Job
    Portal and Real Estate Platform. **Zero are on the main page**, which is a change: the cards
    used to repeat every project's demo chip. Re-measured in the browser per route after the
    cards were reduced; the count was 10 while the cards carried those chips.
  - `public/og-image.png` (1200×630) was generated from `public/og-image.svg` and visually
    confirmed to render its text correctly.
  - All seven case studies were opened on their own route and asserted one by one: the `h1`
    names the project, a problem and a solution are present with real body text (250–486 and
    411–1026 characters respectively), each renders 11–13 `h2` panels, the AI panel appears on
    the five projects that describe one, the agentic panel on CodeGuard AI only, and every case
    study states that no measured results are recorded.
  - **Theme: contrast audited, not eyeballed.** 14 text pairs × 25 accent seeds × 2 modes
    (350 checks each), computing WCAG contrast from sRGB pixels read back through a canvas
    rather than from the `oklch()` strings the browser reports. Zero failures; worst 5.32:1
    dark, 4.74:1 light. Seeds included pure blue, pure green, black, white and mid-grey.
  - **Theme: the default is provably unchanged.** All 18 colour tokens resolved back to sRGB
    and diffed against the original hex values — zero drift, so the default theme still
    renders the signed-off design exactly.
  - **Theme: the picker driven for real.** Opened, a swatch selected (page accent changed, a
    live primary button recoloured, `aria-pressed` moved, choice persisted), Dark → Light →
    Dark switched, a custom colour applied, Escape closed the panel and returned focus to the
    trigger, and a reload restored the stored choice with the boot script applying it before
    React ran.
  - **Theme: `system` follows the OS in both directions**, with the emulated OS preference
    flipped at runtime and on a fresh load. An earlier implementation read the preference into
    state from an effect and could paint a stale mode until the next change; it now reads live
    via `useSyncExternalStore`.
  - **Theme: hostile storage rejected.** A stored mode of `neon` and an accent of
    `javascript:alert(1)` both fell back to the defaults without reaching CSS.
  - **Theme: the picker cannot overflow.** The panel is 267 px wide inside a 303 px viewport at
    320 px, and inside at 390 / 1440 px — checked on both edges, since a left-edge overflow was
    the bug the original right-edge-only sweep missed.
  - **Theme: works in the production build**, not just the dev server — 12 distinct swatches,
    a working selection, and no console errors from a `vite preview` of `dist/`.
  - All five public repository links were requested and returned **HTTP 200** — no dead links.
    The two private repositories were confirmed to return **404** anonymously, which is why they
    carry a disabled chip rather than a link.
  - Job Portal and Real Estate Platform case studies were opened and asserted: no AI or agentic
    panel renders where `ai` and `agentic` are `null`, rather than an empty panel appearing.
  - `LangGraph` was checked while sourcing projects and is an empty repository, so it was left
    out rather than written up as work that does not exist.

### Not verified

- **The OS-level `prefers-reduced-motion` path.** The reduced-motion CSS was confirmed present
  in the built stylesheet, and the components' `useReducedMotion()` branches are in the code,
  but this environment had no way to emulate the OS setting, so the rendered reduced-motion
  state was not observed in a browser. The theme cross-fade's reduced-motion branch
  (`applyTheme` skipping the transition class) falls under the same gap — the class was
  confirmed to be applied and then removed under normal motion, but never observed *not* being
  applied.
- **Animated smooth scrolling, and any motion-driven unmount, in the preview browser.** The
  embedded preview's compositor wedged partway through the session and never recovered;
  `requestAnimationFrame` was measured firing **0 times in 500 ms**, so Motion's exit
  animations cannot complete there. Navigation and scroll-triggered state were therefore
  verified with instant scrolling, and menu close was verified by state
  (`aria-expanded="false"`, scroll lock released, focus returned to the toggle) rather than by
  watching the panel finish animating out. Smooth scrolling is plain CSS
  (`scroll-behavior: smooth`) with `scroll-margin-top` on every anchor, and is verified by
  code, not by observation.
- **Lighthouse / real device testing.** Not run.

---

## Still needed from you

Nothing below is invented by the code; each item renders as a marked placeholder until you
supply it.

1. **Confirm your contribution on each project** — `src/data/projects.ts` describes each
   repository's scope, taken from its README and source tree. That is not the same as saying
   which parts *you* wrote. If any of these were team or hackathon builds, narrow the
   `contribution` field on each to your own part. This is the one claim on the page a reader
   cannot check, so it is the one worth getting exactly right.
2. ~~**Résumé**~~ — **done.** `resume.href` now points at a Google Drive file, so all five
   résumé chips (header, hero, mobile menu, contact, footer) render as live links instead of
   disabled ones. One thing worth confirming: a Drive link that is not shared as
   "anyone with the link" sends visitors to a Google sign-in wall instead of the file, and it
   exposes the file id in the URL. A PDF in `public/` pointed at `/resume.pdf` has neither
   problem and costs nothing to host here.
3. **Screenshots** — every project still uses the labelled placeholder. Export 1600×900 PNG
   or WebP, drop them in `public/`, then switch `preview` to
   `{ kind: 'image', src, alt, width, height }`. SmartFind's README lists the four screens
   worth capturing.
4. **Demos, if you deploy any** — six of the seven projects are `status: 'built'`, which means
   the code runs but nothing is hosted, and Job Portal is `in-progress`. Nothing is `live`, and
   every `demo.href` is `null`. If you deploy one, set the URL and move its status to `live` —
   that is the only status that reads as a shipped achievement.
5. **Verified results** — `caseStudy.results` is empty on all seven projects, and each case
   study says so in plain words. Fill it only with numbers you have actually measured.
6. **Availability wording** — `profile.availability` is `null`, which hides the pill. Set it
   only with wording you can stand behind. `profile.location` is also `null`.
7. **Confirm the toolkit labels** — `src/data/skills.ts` was written from the stack you
   supplied, with your five headline areas as `primary` and the rest as `working`. Every label
   is a claim, so downgrade anything you could not defend in an interview. The three
   `exploring` items are the only ones that claim less than `working`.
8. **Read the copy as a claim** — the `intro`, `about` paragraphs and `exploring` list in
   `src/data/profile.ts` are written in the first person from the details you supplied.
   Reword anything that does not sound like you.
9. **Decide the default appearance.** `DEFAULT_THEME` in `src/data/theme.ts` ships as
   `mode: 'dark'` with the original violet, so a first-time visitor sees the design that was
   signed off. Retarget that one line to `'system'` if you would rather light-OS visitors land
   in light mode — the rest of the system already handles it.

### After deploying

Social crawlers do not resolve relative image paths. In `index.html`:

- point `og:image` at the absolute URL (`https://your-domain/og-image.png`),
- add `<meta property="og:url" content="https://your-domain/" />`,
- update `meta[name="author"]` and the `<title>` if you change the headline.

If you edit `public/og-image.svg`, regenerate the PNG with any SVG→PNG tool at 1200×630.

Because this is a static SPA with no server routes, any static host works (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3). If you add a real contact form later, it needs a
server-side endpoint that holds the email provider key — never a key in the client bundle.
