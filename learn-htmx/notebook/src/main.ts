import { serve } from "@hono/node-server"
import { serveStatic } from "@hono/node-server/serve-static"
import { Hono } from "hono"
import { resolve } from "node:path"
import { render, renderPage } from "./views.ts"

const port = Number(process.env.PORT ?? 3000)

// Absolute, so the app does not depend on the working directory.
const publicRoot = resolve(import.meta.dirname, "..", "public")

const app = new Hono()

app.get("/", async (c) => {
  return c.html(await renderPage("pages/index", { title: "notebook" }))
})

app.get("/components/hello", async (c) => {
  return c.html(
    await render("components/hello", { now: new Date().toLocaleTimeString() }),
  )
})

app.post("/components/greet", async (c) => {
  const body = await c.req.parseBody()
  const value = body["name"]
  const name = typeof value === "string" ? value.trim() : ""

  // htmx 4 swaps 4xx responses too, so a validation fragment just works.
  if (name === "") {
    return c.html(
      await render("components/error", { message: "Please enter a name." }),
      422,
    )
  }

  return c.html(await render("components/greet", { name }))
})

// Everything else under public/: the tailwind output, the vendored htmx, and
// any hand written asset. Registered last, so it only sees unmatched paths.
app.use("/*", serveStatic({ root: publicRoot }))

app.notFound(async (c) => {
  return c.html(
    await renderPage("pages/not-found", { title: "404", path: c.req.path }),
    404,
  )
})

app.onError(async (error, c) => {
  console.error(error)
  return c.html(await renderPage("pages/server-error", { title: "500" }), 500)
})

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`notebook: http://localhost:${info.port}`)
})
