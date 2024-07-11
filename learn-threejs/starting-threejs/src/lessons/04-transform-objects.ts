import * as THREE from "three"

// 知识点：
// - Mesh 与 Camera 都是 Object3D。
// - 通过修改 Object3D 的属性来实现 transform：
//   - position: Vector3
//   - scale: Vector3
//   - rotation: Euler
//   它们会被翻译为代表 transformation 矩阵操作。
// - Group 也是 Object3D，并且可以用来形成嵌套的结构。
// - 可以用 AxesHelper 来显示坐标系。

// Canvas
const canvas = document.querySelector("canvas.webgl")
if (canvas === null) throw new Error()

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

// AxesHelper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
