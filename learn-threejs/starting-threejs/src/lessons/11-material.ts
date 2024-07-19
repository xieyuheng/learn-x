import GUI from "lil-gui"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

// 知识点：
// - material 用来给每个像素染色。
//   material 是用 shader 代码实现的，这些代码要送给 GPU 去运行。
// - MeshNormalMaterial 可以用来给曲面上每一个点一个法向量，
//   - 注意，法向量是相对于 camera 的，
//     所以转换 camera 视角的时候，material 效果不变。
//     - 这些 Material 所创造的光影效果，都是假象，
//       好像有 light 在 camera 后面，但是其实没有 light。
//   因为不能用 mesh 本身的面片的法向量。
//   - 通过设置 material.flatShading 可以改成用面片的法向量。
// - MeshMatcapMaterial -- material captures，
//   是把点的 normal，映射到一个圆盘上，非常有意思。
// - MeshLambertMaterial -- 这个就需要 light 了。
//   其他参数与 MeshBasicMaterial 类似。
// - MeshStandardMaterial -- 具有更逼真的效果。

const gui = new GUI({
  title: "Learning Debug GUI",
  width: 300,
})

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
const matcapTexture = textureLoader.load("/textures/matcaps/4.png")
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg")

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// Objects

// const material = new THREE.MeshBasicMaterial({ map: matcapTexture })
// material.transparent = true
// material.opacity = 0.5
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.transparent = true
// material.side = THREE.DoubleSide
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshDepthMaterial()
// material.side = THREE.DoubleSide

// const material = new THREE.MeshLambertMaterial()
// material.side = THREE.DoubleSide

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color("red")
// material.side = THREE.DoubleSide

// const material = new THREE.MeshToonMaterial()
// material.side = THREE.DoubleSide
// gradientTexture.magFilter = THREE.NearestFilter
// // gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial()
material.side = THREE.DoubleSide
material.metalness = 0.45
material.roughness = 0.45

const materialTweaks = gui.addFolder("materialTweaks")
materialTweaks.add(material, "metalness").min(0).max(1).step(0.001)
materialTweaks.add(material, "roughness").min(0).max(1).step(0.001)

const ambientLight = new THREE.AmbientLight("#ffffff", 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight("#ffffff", 30)
pointLight.position.x = 2
pointLight.position.y = 2
pointLight.position.z = 2
scene.add(pointLight)

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
