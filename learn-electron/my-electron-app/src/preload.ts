window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
    }
  }

  for (const dependency of ["chrome", "node", "electron"]) {
    if (dependency !== undefined) {
      const value = process.versions[dependency]
      if (value) {
        replaceText(`${dependency}-version`, value)
      }
    }
  }
})
