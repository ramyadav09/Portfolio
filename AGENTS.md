# AGENTS.md

## Project

- Static HTML/CSS website.

## Development

- Open `index.html` with Live Server or press F5 to preview locally.
- Edit HTML and CSS directly; no compilation step required.

## File structure

- HTML files: `frontend/index.html`

## Key Conventions

- Navigation uses anchor links to `#section-id` within `index.html`.
- Keep assets local; no external dependencies or CDN links unless strictly necessary.

## Comment style

- Never place comments on the first two lines of a source file; start with imports or declarations.
- Prefer concise section headings such as `// ── Constants ──` or a three-line banner for major sections so files remain easy to scan.
- Use JSDoc blocks only when an API, intent, edge case, or constraint needs explanation; do not restate the code.

## Boundaries

- Do not add build tools or `package.json` unless explicitly requested.
- Do not introduce JavaScript frameworks; the project is vanilla HTML/CSS.
