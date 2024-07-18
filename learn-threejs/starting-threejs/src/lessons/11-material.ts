import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// 知识点：
// - material 用来给每个像素染色。
//   material 是用 shader 代码实现的，这些代码要送给 GPU 去运行。

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

// Textures
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
)
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg")
const matcapTexture = textureLoader.load("/textures/matcaps/1.png")
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Objects
const material = new THREE.MeshBasicMaterial({ map: matcapTexture })
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16), material)
sphere.position.x = -1.5
scene.add(sphere)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
plane.position.x = 0
scene.add(plane)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.15, 16, 32),
  material,
)
torus.position.x = 1.5
scene.add(torus)

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

// AxesHelper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100)
camera.position.z = 3
camera.lookAt(axesHelper.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

// Animations
function tick() {
  // Animation as a function of time.

  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = -0.15 * elapsedTime
  plane.rotation.x = -0.15 * elapsedTime
  torus.rotation.x = -0.15 * elapsedTime

  // 用 threejs 内部的 controls：
  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
