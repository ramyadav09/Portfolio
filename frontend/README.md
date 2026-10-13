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
| Hero | `src/components/hero/Hero.tsx` | Headline, intro, CTAs, social links |
| System overview panel | `src/components/hero/SystemOverview.tsx` | Build / Integrate / Orchestrate — a map, not a dashboard |
| Projects grid | `src/components/projects/ProjectsSection.tsx` | Featured card + two supporting cards |
| Project card | `src/components/projects/ProjectCard.tsx` | Status, stack, links, case-study trigger |
| Case study | `src/components/projects/ProjectCaseStudy.tsx` | Problem → solution → flow → AI → agentic → quality → trade-offs → results |
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
    projects/{ProjectsSection,ProjectCard,ProjectCaseStudy,ProjectPreviewFrame}.tsx
    sections/{TechStack,About,Contact}.tsx
    ui/{Button,buttonVariants,BrandGlyphs,BrandMark,Container,LinkChip,Pill,Reveal,Section,SectionHeading,Stagger}.tsx
  data/{types,profile,projects,skills,architecture,navigation}.ts
  hooks/useActiveSection.ts
  lib/{motion,icons,projectStatus,utils}.ts
  styles → src/index.css   (design tokens live here)
```

---

## Editing content

**Everything you need to change is a `.ts` file in `src/data/` — no component edits required.**

1. **`src/data/profile.ts`** — name, role, headline, intro, about paragraphs, links,
   `isSampleContent`. This is already `false`: the profile describes the owner, so the notice
   now tracks the outstanding projects only.
2. **`src/data/projects.ts`** — the three featured projects. Replace each entry, then set
   `isPlaceholder: false` on it.
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
| Accents | `--color-violet` `#A77BFF`, `--color-mint` `#8DE8C0`, `--color-info` `#A9C6FF`, `--color-caution` `#FFCF8F` |
| Text | `--color-fg` `#F4F5FC`, `--color-fg-muted` `#B8BED2`, `--color-fg-subtle` `#8B93AD` |
| Lines | `--color-line` `#262C48`, `--color-line-strong` `#3B4470`, `--color-focus` `#8DE8C0` |
| Type | Space Grotesk (display), Inter (body), system monospace (labels) |
| Radii / shadow / motion | `--radius-*`, `--shadow-ambient|panel|glow`, `--ease-out-soft`, `--duration-fast|base|slow` |

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
uses near-black text on the bright accent instead of the more obvious white-on-violet.

---

## Motion

Motion for React drives four things and nothing else:

1. A staggered hero entrance (`StaggerGroup` / `StaggerItem`, mount-time).
2. Scroll-triggered section reveals (`Reveal`, `whileInView` + `once`).
3. A short cross-fade when the selected case study changes (`AnimatePresence mode="wait"`).
4. A small layout animation on the active navigation underline.

Restraint is deliberate: no parallax, no looping ambient animation, no scroll-jacking, no
custom cursor, and no animation that content depends on.

**Reduced motion is handled twice.** `<MotionConfig reducedMotion="user">` in `src/main.tsx`
makes Motion honour the OS setting, and `Reveal`, `StaggerGroup`, `StaggerItem` and the case
study additionally check `useReducedMotion()` and render plain markup in the final state, so
nothing can be left invisible. `src/index.css` also disables CSS transitions and smooth
scrolling under `prefers-reduced-motion: reduce`.

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
- **No analytics, no tracking, no cookies.**

### Bundle (production, measured)

| Chunk | Raw | Gzip |
| --- | --- | --- |
| React + scheduler | 210.5 kB | 65.7 kB |
| Motion for React | 131.7 kB | 43.4 kB |
| App code | 81.1 kB | 24.6 kB |
| Lucide icons (tree-shaken) | 23.7 kB | 8.8 kB |
| CSS | 42.6 kB | 7.9 kB |
| **Total JS** | **446.4 kB** | **142.5 kB** |

Motion is the largest avoidable cost. Converting the components from `motion.*` to
`m.*` under `<LazyMotion features={domAnimation}>` would remove roughly 20 kB gzip, at the
cost of also dropping the layout-animated nav underline (that needs `domMax`). It was left as
the straightforward API deliberately; revisit if the budget tightens.

---

## Verification performed

Everything below was executed, not assumed:

- `npm run build` — TypeScript 6 (`tsc -b`) clean, Vite production build succeeds.
- `npm run lint` (`oxlint`, 116 rules over 37 files) — **0 warnings, 0 errors**.
- Browser, via the dev server at 1440 / 768 / 390 / 320 px:
  - **No console errors** or failed requests.
  - **No horizontal overflow** at any of those widths (measured against
    `scrollWidth`, with a per-element bounding-box sweep as a fallback).
  - **Heading order has no skipped levels** (`h1 → h2 → h3 …`) and no duplicate `id`s.
  - **320 px sweep** caught the header résumé chip rendering at mobile widths, which pushed the
    right-hand cluster to 161 px and truncated the brand to `Rom …`. Fixed by wrapping the chip
    (see the `cn` decision above); the brand now renders in full and the cluster is 44 px.
  - Active nav tracking verified for all five sections, at the bottom of the page, and
    cleared at the top.
  - Mobile menu: opens with `aria-expanded="true"`, locks background scroll, moves focus to
    the first link, closes on <kbd>Esc</kbd> and returns focus to the toggle. Toggle measures
    44×44 px.
  - Case-study switching: `aria-expanded` correct per card, focus moves to the region, and
    the non-AI project correctly omits the AI and agentic panels.
  - Contrast ratios computed for every token pair (table above).
  - WCAG 2.2 SC 2.5.8 target sizes: footer links and the "back to top" control were
    undersized at 17–20 px and were fixed to clear 24 px.
  - No empty, `#`, or placeholder `href` anywhere; every anchor and button has an accessible
    name; all 24 not-yet-available links are `aria-disabled` and announce their state in text.
  - `public/og-image.png` (1200×630) was generated from `public/og-image.svg` and visually
    confirmed to render its text correctly.

### Not verified

- **The OS-level `prefers-reduced-motion` path.** The reduced-motion CSS was confirmed present
  in the built stylesheet, and the components' `useReducedMotion()` branches are in the code,
  but this environment had no way to emulate the OS setting, so the rendered reduced-motion
  state was not observed in a browser.
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

1. **Résumé** — `resume.href` is `null`, so that chip renders as disabled. GitHub, LinkedIn
   and email are already set and link correctly. Put the résumé in `public/` (e.g.
   `public/resume.pdf`) and point at `/resume.pdf`.
2. **Real projects** — replace all three entries in `src/data/projects.ts`: titles, problem,
   users, solution, data flow, stack, trade-offs, lessons, and your own contribution. Flip
   `isPlaceholder` to `false` per project. The briefs are still the neutral placeholders, so
   they do not yet describe a FastAPI/LangGraph build even though the toolkit now does.
3. **Screenshots** — export 1600×900 PNG or WebP, drop them in `public/`, then switch
   `preview` to `{ kind: 'image', src, alt, width, height }`.
4. **Verified results** — fill `caseStudy.results` only with numbers you have actually
   measured.
5. **Availability wording** — `profile.availability` is `null`, which hides the pill. Set it
   only with wording you can stand behind. `profile.location` is also `null`.
6. **Confirm the toolkit labels** — `src/data/skills.ts` was written from the stack you
   supplied, with your five headline areas as `primary` and the rest as `working`. Every label
   is a claim, so downgrade anything you could not defend in an interview. The three
   `exploring` items are the only ones that claim less than `working`.
7. **Read the copy as a claim** — the `intro`, `about` paragraphs and `exploring` list in
   `src/data/profile.ts` are written in the first person from the details you supplied.
   Reword anything that does not sound like you.

### After deploying

Social crawlers do not resolve relative image paths. In `index.html`:

- point `og:image` at the absolute URL (`https://your-domain/og-image.png`),
- add `<meta property="og:url" content="https://your-domain/" />`,
- update `meta[name="author"]` and the `<title>` if you change the headline.

If you edit `public/og-image.svg`, regenerate the PNG with any SVG→PNG tool at 1200×630.

Because this is a static SPA with no server routes, any static host works (Netlify, Vercel,
Cloudflare Pages, GitHub Pages, S3). If you add a real contact form later, it needs a
server-side endpoint that holds the email provider key — never a key in the client bundle.
