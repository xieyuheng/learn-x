import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// 知识点：
// - geometry 之类的 class 的目的，
//   是为 threejs 的 shader 生成 mesh 之类的数据。
// - 介绍 threejs 已有的 geometries。
// - 介绍如何自己构造 geometry。

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLElement
if (canvas === null) throw new Error()

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BufferGeometry()

// const positionArray = new Float32Array([0, 0, 0, 1, 0, 1, 1, 1, 0])
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
// geometry.setAttribute("position", positionAttribute)

const count = 100
const positionArray = new Float32Array(count * 3 * 3)
for (let i=0;i<count * 3 * 3;i++) {
  positionArray[i]= (Math.random() - 0.5) * 3
}

const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
geometry.setAttribute("position", positionAttribute)

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
  2
  aspectRatio = sizes.width / sizes.height

  camera.aspect = aspectRatio
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  renderer.render(scene, camera)
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

  // 用 threejs 内部的 controls：
  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
