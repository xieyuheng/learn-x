import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import type { ServerResponse } from "node:http"
import { extname, resolve, sep } from "node:path"

const root = resolve(import.meta.dirname, "..", "public")

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
}

/**
 * Serve a file from `public/`. Returns false when the path does not name an
 * existing file, so the caller can fall through to other routes.
 */
export async function servePublic(
  pathname: string,
  response: ServerResponse,
): Promise<boolean> {
  let decoded: string
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return false
  }

  const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "")
  const filePath = resolve(root, relative)

  // Block `..` from escaping `public/`.
  if (filePath !== root && !filePath.startsWith(root + sep)) {
    return false
  }

  const fileStat = await stat(filePath).catch(() => null)
  if (fileStat === null || !fileStat.isFile()) {
    return false
  }

  response.writeHead(200, {
    "content-type":
      contentTypes[extname(filePath).toLowerCase()] ??
      "application/octet-stream",
    "content-length": fileStat.size,
    "cache-control": "no-cache",
  })

  createReadStream(filePath).pipe(response)
  return true
}
