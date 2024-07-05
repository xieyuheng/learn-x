import WebGL from "three/addons/capabilities/WebGL.js"

export function assertWebGL(): void {
  if (!WebGL.isWebGL2Available()) {
    window.alert(WebGL.getWebGL2ErrorMessage().innerText)
  }
}
