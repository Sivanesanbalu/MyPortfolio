import * as THREE from "three";

const container = document.getElementById("hero-3d");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    55,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(0,0,12);

const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio,2)
);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

container.innerHTML="";
container.appendChild(renderer.domElement);
const ambient = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambient);

const cyan = new THREE.PointLight(
    0x00eaff,
    8,
    30
);

cyan.position.set(
    5,
    5,
    5
);

scene.add(cyan);

const pink = new THREE.PointLight(
    0xff00ff,
    5,
    25
);

pink.position.set(
    -5,
    2,
    -4
);

scene.add(pink);
const particleCount = 1200;

const geometry = new THREE.BufferGeometry();

const positions = [];

for(let i=0;i<particleCount;i++){

    positions.push(

        (Math.random()-0.5)*40,

        (Math.random()-0.5)*20,

        (Math.random()-0.5)*20

    );

}

geometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        positions,
        3
    )

);

const material = new THREE.PointsMaterial({

    color:0x00eaff,

    size:0.05,

    transparent:true,

    opacity:0.8

});

const particles = new THREE.Points(
    geometry,
    material
);

scene.add(particles);
// ==========================================
// Part 4 - Mouse Parallax + Animation
// ==========================================

const mouse = new THREE.Vector2();
const targetMouse = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {

    targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

});

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Smooth Mouse
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // Rotate entire particle field
    particles.rotation.y = mouse.x * 0.15;
    particles.rotation.x = -mouse.y * 0.08;

    // Slow continuous motion
    particles.rotation.y += 0.0005;

    // Floating effect
    particles.position.y = Math.sin(time * 0.6) * 0.15;

    // Animate light
    cyan.position.x = Math.sin(time * 0.8) * 5;
    cyan.position.z = 5 + Math.cos(time * 0.8);

    pink.position.x = Math.cos(time * 0.5) * -5;
    pink.position.y = 2 + Math.sin(time * 0.5);
    
    renderer.render(scene, camera);

}

animate();


// ==========================================
// Responsive
// ==========================================

window.addEventListener("resize", () => {

    camera.aspect = container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

});