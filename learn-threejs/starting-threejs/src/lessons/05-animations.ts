import gsap from "gsap"
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// Animations
function tick() {
  // Animation as a function of time.

  const elapsedTime = clock.getElapsedTime()

  // mesh.rotation.y = elapsedTime * Math.PI * 2
  // mesh.position.x = Math.sin(elapsedTime)
  // mesh.position.y = Math.cos(elapsedTime)

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
