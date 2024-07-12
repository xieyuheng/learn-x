import gsap from "gsap"
import GUI from "lil-gui"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// 知识点：
// - 介绍一个 debug ui 的 library -- lil-gui

const gui = new GUI({
  title: "Learning Debug GUI",
  width: 300,
})

const debugObject: Record<string, any> = {}

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
debugObject.color = "#e481b6"

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder("cubeTweaks")

cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01)
cubeTweaks.add(material, "wireframe")
cubeTweaks.addColor(debugObject, "color").onChange(() => {
  // threejs 为了渲染效率，对颜色进行了处理，
  // 所以这里 log 出来的颜色和 GUI 显示的将会不一样。
  console.log(material.color.getHexString())

  material.color.set(debugObject.color)
})

debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + Math.PI * 2,
  })
}

cubeTweaks.add(debugObject, "spin")

debugObject.subdivision = 2
cubeTweaks
  .add(debugObject, "subdivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose() // 这里需要手动垃圾回收。
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision,
    )
  })

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

const axesTweaks = gui.addFolder("axesTweaks")

axesTweaks.add(axesHelper, "visible").name("axesHelper")

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

// Animations
function tick() {
  // Animation as a function of time.

  const elapsedTime = clock.getElapsedTime()

  // 用 threejs 内部的 controls：
  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
