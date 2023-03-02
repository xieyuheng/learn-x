import fs from "node:fs"

export function getChar(): Promise<string> {
  const buffer = Buffer.alloc(1)
  return new Promise((resolve) => {
    fs.read(0, buffer, 0, 1, null, () => {
      resolve(buffer.toString("utf8"))
    })
  })
}
