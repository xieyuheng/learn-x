import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { RGBELoader } from "three/addons/loaders/RGBELoader.js"

const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping

const container = document.createElement("div")
document.body.appendChild(container)
container.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.25,
  20,
)
camera.position.set(-1.8, 0.6, 2.7)

init()
render()

function init() {
  new RGBELoader()
    .setPath("textures/equirectangular/")
    .load("royal_esplanade_1k.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping

      scene.background = texture
      scene.environment = texture

      render()

      new GLTFLoader()
        .setPath("models/gltf/DamagedHelmet/glTF/")
        .load("DamagedHelmet.gltf", (gltf) => {
          scene.add(gltf.scene)

          render()
        })
    })

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener("change", render) // use if there is no animation loop
  controls.minDistance = 2
  controls.maxDistance = 10
  controls.target.set(0, 0, -0.2)
  controls.update()

  window.addEventListener("resize", onWindowResize)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)

  render()
}

function render() {
  renderer.render(scene, camera)
}
