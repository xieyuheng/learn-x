import Handlebars from "handlebars"
import { readFile, readdir } from "node:fs/promises"
import { join, resolve } from "node:path"

// Templates live next to this file: src/layouts, src/pages, src/components.
const templatesRoot = import.meta.dirname

const templates = new Map<string, Handlebars.TemplateDelegate>()

let partialsLoaded = false

async function loadPartials(): Promise<void> {
  if (partialsLoaded) {
    return
  }
  partialsLoaded = true

  const dir = join(templatesRoot, "partials")

  let entries: string[]
  try {
    entries = await readdir(dir)
  } catch {
    return
  }

  for (const entry of entries) {
    if (!entry.endsWith(".hbs")) {
      continue
    }
    const name = entry.slice(0, -".hbs".length)
    const source = await readFile(join(dir, entry), "utf8")
    Handlebars.registerPartial(name, source)
  }
}

async function loadTemplate(
  name: string,
): Promise<Handlebars.TemplateDelegate> {
  const cached = templates.get(name)
  if (cached !== undefined) {
    return cached
  }

  const source = await readFile(join(templatesRoot, `${name}.hbs`), "utf8")
  const template = Handlebars.compile(source, { noEscape: false })
  templates.set(name, template)
  return template
}

/** Render a fragment (what htmx swaps into the page). */
export async function render(
  name: string,
  data: unknown = {},
): Promise<string> {
  await loadPartials()
  const template = await loadTemplate(name)
  return template(data)
}

/** Render a full page: the template goes into `src/layouts/main.hbs`. */
export async function renderPage(
  name: string,
  data: Record<string, unknown> = {},
): Promise<string> {
  const body = await render(name, data)
  const layout = await loadTemplate("layouts/main")
  return layout({ ...data, body })
}
