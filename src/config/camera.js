export default {
  fov: 45,
  aspect: window.innerWidth / window.innerHeight,
  near: 1,
  far: 1200,
  lookSpeed: 0.1,
  movementSpeed: 150,
  position: new THREE.Vector3( 0, 800, 0 ),
  target: new THREE.Vector3( 0, 0, 0 ),
  orbitControls: false,
  firstPersonControls: true
};