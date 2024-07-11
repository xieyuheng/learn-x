import * as THREE from "three"

// threejs 的基本的用法，包含如下部分：
// - Scene -- 包含很多三维 Objects
// - Camera -- 代表不同的将三维模型投影到二维的方式
// - Renderer -- 代表具体的投影方式

// Canvas
const canvas = document.querySelector("canvas.webgl")
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 1
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
