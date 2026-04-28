const fs = require('fs');

// We can't easily parse GLB natively in Node without a library.
// But we have 'three' in node_modules!
const THREE = require('three');
// Actually, THREE.GLTFLoader is an example in 'three/examples/jsm/loaders/GLTFLoader.js', which requires DOM.

// Let's just read the file as strings and grep for material names.
const buffer = fs.readFileSync('./public/models/iphone.glb');
const content = buffer.toString('utf8');

const materials = content.match(/"name":"[^"]+"/g);
const unique = [...new Set(materials)];
console.log("Found names:", unique.join(', '));
