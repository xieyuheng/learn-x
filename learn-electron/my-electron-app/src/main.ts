import { app, BrowserWindow } from "electron"
import Path from "path"

function createWindow(): void {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: Path.join(__dirname, "preload.js"),
    },
  })

  win.loadFile(Path.join(__dirname, "../public/index.html"))
}

async function start(): Promise<void> {
  await app.whenReady()

  createWindow()

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
  })

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
}

start()
