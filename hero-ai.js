/* =====================================
   IMPORTS
===================================== */

import * as THREE from "three";

/* =====================================
   HERO AI BACKGROUND
===================================== */

const container = document.getElementById("hero-3d");

if (!container) {
    console.warn("⚠ Hero 3D container not found.");
} else {
    initHeroScene();
}

function initHeroScene() {

    /* =====================================
       SCENE
    ===================================== */

    const scene = new THREE.Scene();

    /* =====================================
       CAMERA
    ===================================== */

    const camera = new THREE.PerspectiveCamera(
        40,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.set(0, 0, 6);

    /* =====================================
       RENDERER
    ===================================== */

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1.1;

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.background = "transparent";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    /* =====================================
       CLOCK
    ===================================== */

    const clock = new THREE.Clock();

    /* =====================================
       LIGHTS
    ===================================== */

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        2.2
    );

    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
        0xffffff,
        3
    );

    keyLight.position.set(3, 4, 5);

    scene.add(keyLight);

    const blueLight = new THREE.PointLight(
        0x00e5ff,
        5
    );

    blueLight.position.set(
        0,
        2,
        2
    );

    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(
        0x7c3aed,
        4
    );

    purpleLight.position.set(
        -2,
        1,
        -2
    );

    scene.add(purpleLight);

        /* =====================================
       PARTICLES
    ===================================== */

    const particleCount = 1500;

    const particleGeometry =
        new THREE.BufferGeometry();

    const positions = [];
    const scales = [];

    for (let i = 0; i < particleCount; i++) {

        positions.push(

            (Math.random() - 0.5) * 18,
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 14

        );

        scales.push(Math.random());

    }

    particleGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );

    particleGeometry.setAttribute(

        "aScale",

        new THREE.Float32BufferAttribute(
            scales,
            1
        )

    );

    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x00e5ff,

            size: 0.05,

            transparent: true,

            opacity: 0.8,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending

        });

    const particles =
        new THREE.Points(

            particleGeometry,

            particleMaterial

        );

    scene.add(particles);

    /* =====================================
       GLOW SPHERES
    ===================================== */

    const glowGeometry =
        new THREE.SphereGeometry(
            0.08,
            16,
            16
        );

    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x00ffff,

            transparent: true,

            opacity: 0.5

        });

    const glowGroup =
        new THREE.Group();

    for (let i = 0; i < 25; i++) {

        const sphere =
            new THREE.Mesh(

                glowGeometry,

                glowMaterial.clone()

            );

        sphere.position.set(

            (Math.random() - 0.5) * 12,

            (Math.random() - 0.5) * 8,

            (Math.random() - 0.5) * 8

        );

        sphere.userData.speed =
            0.2 + Math.random();

        sphere.userData.offset =
            Math.random() * Math.PI * 2;

        glowGroup.add(sphere);

    }

    scene.add(glowGroup);

    /* =====================================
       MOUSE
    ===================================== */

    const mouse =
        new THREE.Vector2();

    const targetMouse =
        new THREE.Vector2();

    window.addEventListener(

        "mousemove",

        (event) => {

            targetMouse.x =
                (event.clientX / window.innerWidth) * 2 - 1;

            targetMouse.y =
                -(event.clientY / window.innerHeight) * 2 + 1;

        }

    );
        /* =====================================
       ANIMATION LOOP
    ===================================== */

    function animate() {

        requestAnimationFrame(animate);

        const elapsedTime =
            clock.getElapsedTime();

        /* =====================================
           SMOOTH MOUSE
        ===================================== */

        mouse.x +=
            (targetMouse.x - mouse.x) * 0.05;

        mouse.y +=
            (targetMouse.y - mouse.y) * 0.05;

        /* =====================================
           CAMERA MOTION
        ===================================== */

        camera.position.x =
            mouse.x * 0.25;

        camera.position.y =
            mouse.y * 0.20;

        camera.lookAt(0, 0, 0);

        /* =====================================
           PARTICLE ROTATION
        ===================================== */

        particles.rotation.y =
            elapsedTime * 0.05;

        particles.rotation.x =
            Math.sin(elapsedTime * 0.15) * 0.08;

        /* =====================================
           FLOATING PARTICLES
        ===================================== */

        const positionArray =
            particleGeometry.attributes.position.array;

        for (let i = 0; i < positionArray.length; i += 3) {

            positionArray[i + 1] +=
                Math.sin(
                    elapsedTime +
                    positionArray[i]
                ) * 0.0018;

        }

        particleGeometry.attributes.position.needsUpdate =
            true;

        /* =====================================
           GLOW SPHERES
        ===================================== */

        glowGroup.children.forEach((sphere, index) => {

            sphere.position.y +=

                Math.sin(

                    elapsedTime *
                    sphere.userData.speed +

                    sphere.userData.offset

                ) * 0.004;

            sphere.position.x +=

                Math.cos(

                    elapsedTime *
                    sphere.userData.speed +

                    sphere.userData.offset

                ) * 0.002;

            sphere.material.opacity =

                0.35 +

                Math.sin(

                    elapsedTime * 2 +

                    index

                ) * 0.20;

        });

        /* =====================================
           LIGHT ANIMATION
        ===================================== */

        blueLight.position.x =

            Math.sin(elapsedTime * 0.8) * 2;

        blueLight.position.z =

            2 +

            Math.cos(elapsedTime * 0.8);

        blueLight.intensity =

            5 +

            Math.sin(elapsedTime * 2) * 0.6;

        purpleLight.position.x =

            -2 +

            Math.cos(elapsedTime * 0.6) * 0.8;

        purpleLight.intensity =

            4 +

            Math.cos(elapsedTime * 1.4) * 0.4;

        keyLight.position.x =

            3 +

            Math.sin(elapsedTime * 0.5) * 0.5;

        renderer.render(

            scene,

            camera

        );

    }

    animate();
        /* =====================================
       RESIZE FUNCTION
    ===================================== */

    function resize() {

        const width = container.clientWidth;
        const height = container.clientHeight;

        if (width === 0 || height === 0) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

    }

    resize();

    /* =====================================
       WINDOW RESIZE
    ===================================== */

    window.addEventListener(
        "resize",
        resize
    );

    /* =====================================
       RESIZE OBSERVER
    ===================================== */

    const resizeObserver =
        new ResizeObserver(() => {

            resize();

        });

    resizeObserver.observe(container);

    /* =====================================
       TAB VISIBILITY
    ===================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                renderer.setAnimationLoop(null);

            } else {

                renderer.setAnimationLoop(() => {

                    renderer.render(scene, camera);

                });

            }

        }
    );

    /* =====================================
       CLEANUP
    ===================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            resizeObserver.disconnect();

            window.removeEventListener(
                "resize",
                resize
            );

            renderer.dispose();

            particleGeometry.dispose();
            particleMaterial.dispose();

            glowGeometry.dispose();

            glowGroup.children.forEach((mesh) => {

                mesh.geometry.dispose();

                mesh.material.dispose();

            });

            scene.clear();

            console.log("🧹 Hero Scene Cleaned");

        }
    );

    console.log("✅ Hero Background Ready");

}