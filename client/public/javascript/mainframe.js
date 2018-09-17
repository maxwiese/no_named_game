let  three = require("three");

function animate() {
    requestAnimationFrame(animate)
    console.log(cube.position)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}

let scene = new three.Scene()
let camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )

let renderer = new three.WebGLRenderer()
renderer.setSize(window.innerWidth-100, window.innerHeight-100)
document.getElementById('canvas').appendChild(renderer.domElement)

let geometrie = new three.BoxGeometry(1, 1, 1)
let material = new three.MeshBasicMaterial({color: 0xff0000})
let cube = new three.Mesh(geometrie, material)

scene.add(cube)
camera.position.z = 5
animate()