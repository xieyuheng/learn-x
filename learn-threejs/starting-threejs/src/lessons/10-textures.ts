import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// 知识点：
// - 加载 Image，用来构造 Texture。
//   - 可以用 image.onload 和 texture.needsUpdate 来实现。
//   - 也可以用 threejs 自带的 TextureLoader。
// - UV unwrapping -- 把矩形的 texture 图片映射到曲面上。
// - Texture 在二维平面的变换。
// - Mip Mapping 和 filter。
//   - Mip Mapping 是对 texture 的预处理，递归地去准备好更小的 texture。
//     可以用 texture.generateMipmaps 来控制是否生成这些预处理的数据。
//   - minFilter 控制的是对象相对于 texture 变小时，应该如何改变 texture。
//     magFilter 控制的是对象相对于 texture 变大时，应该如何改变 texture。
//   - minFilter 如果用了 NearestFilter，换成 checkerboard-1024 看看，
//     就会发现有很强的 Moire pattern 现象。
//   - 相反 magFilter 如果用了 NearestFilter，会保持 texture sharp。

// Loading
const loadingManager = new THREE.LoadingManager()

// Textures
const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load("/textures/door/color.jpg")
// const colorTexture = textureLoader.load("/textures/checkerboard-1024x1024.png")
const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png")
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const heightTexture = textureLoader.load("/textures/door/height.jpg")
const normalTexture = textureLoader.load("/textures/door/normal.jpg")
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg",
)
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg")

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.1
// colorTexture.offset.y = 0.1

// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
// colorTexture.rotation = Math.PI / 4

colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

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
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
// const geometry = new THREE.SphereGeometry(1, 32, 32)
// const geometry = new THREE.ConeGeometry(1, 1, 32)
// const geometry = new THREE.TorusGeometry(1, 0.32, 32, 100)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
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
