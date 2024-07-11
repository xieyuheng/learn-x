import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// 知识点：
// - 这一节是 WebAPI 的知识。
// - 只处理了全屏，当需要在某个 box 中最大化时，需要调整这里的方案。
// - 用双击来 toggle fullscreen：
//   - canvas.requestFullscreen()
//   - document.exitFullscreen()

// Cursor
const cursor = { x: 0, y: 0 }
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLElement
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
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

let aspectRatio = sizes.width / sizes.height

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  aspectRatio = sizes.width / sizes.height

  camera.aspect = aspectRatio
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.render(scene, camera)
})

window.addEventListener("dblclick", () => {
  // 注意苹果的浏览器不完全支持 requestFullscreen 和 exitFullscreen，
  // 所以需要检查这些 API 是否存在，才能安全使用（不 throw error）。
  // 或者用带有 webkit prefix 的 API。

  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

// Camera

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// AxesHelper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

// Animations
function tick() {
  // Animation as a function of time.

  const elapsedTime = clock.getElapsedTime()

  // 简单的平面运动：
  // camera.position.x = cursor.x * 10
  // camera.position.y = cursor.y * 10
  // camera.position.z = 3

  // 环绕物体的运动：
  // camera.position.x = Math.sin(cursor.x * Math.PI *2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI *2) * 3
  // camera.position.y = cursor.y * 5
  // camera.lookAt(mesh.position)

  // 用 threejs 内部的 controls：
  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
