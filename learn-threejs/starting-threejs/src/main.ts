import * as THREE from "three"
import { assertWebGL } from "./assertWebGL.js"

assertWebGL()

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500,
)
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0)
// camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const line = new THREE.Line( geometry, material );
scene.add(line)

function animate() {
line.rotation.x += 0.01
line.rotation.y += 0.01

  renderer.render(scene, camera)
}
