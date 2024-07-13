import * as THREE from "three"

export function loadTexture(src: string): THREE.Texture {
  const image = new Image()
  const texture = new THREE.Texture(image)
  image.onload = () => {
    texture.needsUpdate = true
  }
  image.src = src
  return texture
}
