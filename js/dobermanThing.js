import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.125.2/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.125.2/examples/jsm/controls/OrbitControls.js";

import { vertexShader } from "./vertex.js";
import { fragmentShader } from "./fragment.js";











let clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  canvas: document.getElementById("canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 1000);
camera.position.set(0, 0, 20);
const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// CONTROL4
const controls = new OrbitControls(camera, renderer.domElement);
controls.dampingFactor = 0.8;
controls.enableZoom = false;
controls.autoRotate = false;
controls.autoRotateSpeed = 1;
controls.enableRotate = false;

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function animate(time) {
  time *= 0.001; // seconds
  resizeCanvasToDisplaySize();
  controls.update();
  material.uniforms.uTime.value = clock.getElapsedTime();


  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

//TEXTURE
const texture = new THREE.TextureLoader().load(
  "./assets/blueorange.png",
  (texture) => {
    texture.minFilter = THREE.NearestFilter;
  }
);

// MATERIAL:
let material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0.01 },
    uTexture: { value: texture },
  },
  transparent: true,
  side: THREE.DoubleSide,
});



//ADDING TEXT
const font = await new Promise((res) =>
  new THREE.FontLoader().load("fonts/gerst.json", res)
);

const params = {
  font,
  size: 1.5,
  height: 2,
  curveSegments: 100,
  bevelEnabled: false,
};

function addLetter(string) {
  const geo = new THREE.TextGeometry(string, params);
  const mesh = new THREE.Mesh(geo, material);
  return mesh;
}

const mesh = addLetter("C L C  2022");
mesh.position.y = 1;
mesh.position.x = -9;
scene.add(mesh);




