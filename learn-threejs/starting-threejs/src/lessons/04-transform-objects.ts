import * as THREE from "three"

// Canvas
const canvas = document.querySelector("canvas.webgl")
if (canvas === null) {
  throw new Error()
}

// Scene
const scene = new THREE.Scene()

// Objects

const group = new THREE.Group()
group.position.y = 1
group.rotation.y = Math.PI / 4
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red", wireframe: true }),
)
group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "green", wireframe: true }),
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue", wireframe: true }),
)
cube3.position.x = 2
group.add(cube3)

// Sizes
const sizes = { width: 800, height: 600 }

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
camera.lookAt(group.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

renderer.render(scene, camera)
