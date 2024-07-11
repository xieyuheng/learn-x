import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// 知识点：
// - 通过鼠标的坐标获得用于控制 camera 的输入信息。
// - 手动实现就展示模型而言的 camera 运动。
// - 用 threejs 内部在带的 control 实现 camera 运动。

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
const sizes = { width: 800, height: 600 }

// Camera
const aspectRatio = sizes.width / sizes.height
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
