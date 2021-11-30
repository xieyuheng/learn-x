const { app, BrowserWindow } = require("electron")
const Path = require("path")

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: Path.join(__dirname, "preload.js"),
    },
  })

  win.loadFile("index.html")
}

async function start() {
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
