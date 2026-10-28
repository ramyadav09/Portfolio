/**
 * Keeps the document title and meta description in step with the route.
 *
 * The site is a hash-routed SPA, so opening `#/work/smartfind` is still the
 * same document: without this the browser tab, a bookmark and a shared link all
 * carried the home page's title and description whatever the reader was
 * actually looking at.
 *
 * The home values are captured from `index.html` on first import rather than
 * repeated here, so there is exactly one place to edit them. Callers pass the
 * complete title — composing a brand prefix is a content decision, not this
 * module's.
 */

const homeTitle = document.title
const descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
const homeDescription = descriptionTag?.content ?? ''

function setDescription(value: string) {
  if (descriptionTag && value) descriptionTag.content = value
}

export function setDocumentMeta({ title, description }: { title: string; description?: string }) {
  document.title = title
  setDescription(description ?? homeDescription)
}

/** Returns the tab to the home page's title and description. */
export function resetDocumentMeta() {
  document.title = homeTitle
  setDescription(homeDescription)
}
