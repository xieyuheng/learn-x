import { createServer } from "node:http"
import type { IncomingMessage, ServerResponse } from "node:http"
import { servePublic } from "./public.ts"
import { render, renderPage } from "./views.ts"

const port = Number(process.env.PORT ?? 3000)

function sendHtml(response: ServerResponse, html: string, status = 200): void {
  response.writeHead(status, {
    "content-type": "text/html; charset=utf-8",
  })
  response.end(html)
}

async function readForm(request: IncomingMessage): Promise<URLSearchParams> {
  const chunks: Buffer[] = []
  for await (const chunk of request) {
    chunks.push(chunk as Buffer)
  }
  return new URLSearchParams(Buffer.concat(chunks).toString("utf8"))
}

const server = createServer(async (request, response) => {
  const method = request.method ?? "GET"
  const url = new URL(request.url ?? "/", "http://localhost")
  const path = url.pathname

  try {
    // Every page goes through a handlebars layout.
    if (method === "GET" && path === "/") {
      sendHtml(response, await renderPage("pages/index", { title: "notebook" }))
      return
    }

    // Fragments: the server returns HTML, htmx swaps it in. No JSON.
    if (method === "GET" && path === "/fragments/hello") {
      sendHtml(
        response,
        await render("fragments/hello", {
          now: new Date().toLocaleTimeString(),
        }),
      )
      return
    }

    if (method === "POST" && path === "/fragments/greet") {
      const form = await readForm(request)
      const name = (form.get("name") ?? "").trim()

      // htmx 4 swaps 4xx responses too, so a validation fragment just works.
      if (name === "") {
        sendHtml(
          response,
          await render("fragments/error", { message: "Please enter a name." }),
          422,
        )
        return
      }

      sendHtml(response, await render("fragments/greet", { name }))
      return
    }

    // Static assets: `/app.css` and `/vendor/*`. `public/` is build output.
    if (method === "GET" && (await servePublic(path, response))) {
      return
    }

    sendHtml(
      response,
      await renderPage("pages/not-found", { title: "404", path }),
      404,
    )
  } catch (error) {
    console.error(error)
    sendHtml(
      response,
      await renderPage("pages/server-error", { title: "500" }),
      500,
    )
  }
})

server.listen(port, () => {
  console.log(`notebook: http://localhost:${port}`)
})
