import * as THREE from "three"

// Canvas
const canvas = document.querySelector("canvas.webgl")
if (canvas === null) throw new Error()

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = { width: 800, height: 600 }

// Camera
const aspectRatio =  sizes.width / sizes.height
// const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// AxesHelper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

// Animations
function tick() {
  // Animation as a function of time.

  const elapsedTime = clock.getElapsedTime()

  mesh.rotation.y = elapsedTime * (Math.PI / 4)

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
