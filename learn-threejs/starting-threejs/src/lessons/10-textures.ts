import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { loadImageElement } from "../utils/loadImageElement.js"

// 知识点：
// TODO

main()

async function main() {
  // Textures

  const image = await loadImageElement("/textures/door/color.jpg")
  const texture = new THREE.Texture(image)

  console.log(image)
  console.log(texture)

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
}
