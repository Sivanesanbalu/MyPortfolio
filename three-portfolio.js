/**
 * SIVANESAN B - 3D HOLOGRAPHIC PORTFOLIO ENGINE
 * Powered by Three.js (r128)
 * 
 * Features:
 * 1. 3D Interactive Avatar Stage with Sivanesan's portrait textures
 * 2. Precessing Gyroscopic Cyber-Rings (Torus geometries) & Orbiting Tech Satellites
 * 3. 3D Neural Particle Universe with Scroll-Linked Velocity & Color Morphing
 * 4. Interactive Avatar Mode Switcher (3D Avatar / Real Photo / AI Voice Talk)
 * 5. Full 3D Gyroscopic Mouse Parallax & Click-to-Spin Mechanics
 * 6. 3D Perspective Card Tilt on all project & bento cards
 * 7. Live 3D Cyber HUD with scroll depth & pitch/yaw tracking
 */

(function () {
  'use strict';

  // Wait for DOM & Three.js
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
      console.error('Three.js is not loaded.');
      return;
    }

    init3DAvatarStage();
    init3DGlobalBackground();
    init3DCardTilt();
    init3DCyberHUD();
  });

  // ========================================================
  // 1. 3D INTERACTIVE AVATAR STAGE (HERO)
  // ========================================================
  let avatarMesh = null;
  let ring1 = null;
  let ring2 = null;
  let ring3 = null;
  let satellitesGroup = null;
  let avatarTextures = {};
  let currentAvatarMode = 'stand';

  function init3DAvatarStage() {
    const container = document.getElementById('hero-3d-avatar-stage');
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 440;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- LIGHTS ---
    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 4.5, 12);
    cyanPoint.position.set(2, 2.5, 3);
    scene.add(cyanPoint);

    const purplePoint = new THREE.PointLight(0x8b5cf6, 4.0, 12);
    purplePoint.position.set(-2, -2, 2.5);
    scene.add(purplePoint);

    const rimLight = new THREE.DirectionalLight(0xec4899, 2.2);
    rimLight.position.set(0, 3, -2);
    scene.add(rimLight);

    // --- TEXTURES PRELOAD ---
    const textureLoader = new THREE.TextureLoader();
    const texturePaths = {
      stand: 'assets/avatar/shiva_stand.jpg',
      real: 'assets/profile.png',
      talk: 'assets/avatar/shiva_talk.jpg'
    };

    Object.keys(texturePaths).forEach(key => {
      textureLoader.load(
        texturePaths[key],
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;
          avatarTextures[key] = tex;
          if (key === currentAvatarMode && avatarMesh) {
            avatarMesh.material.map = tex;
            avatarMesh.material.needsUpdate = true;
          }
        },
        undefined,
        (err) => console.warn(`Texture ${key} load fallback`, err)
      );
    });

    // --- 3D AVATAR HOLOGRAPHIC CARD ---
    // Curved/Pill shaped 3D card
    const cardGeo = new THREE.PlaneGeometry(2.3, 2.9, 32, 32);
    
    // Add subtle cylindrical curvature to the card for futuristic depth
    const pos = cardGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = -Math.pow(x / 1.3, 2) * 0.18;
      pos.setZ(i, z);
    }
    cardGeo.computeVertexNormals();

    const cardMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.15,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide
    });

    avatarMesh = new THREE.Mesh(cardGeo, cardMat);
    scene.add(avatarMesh);

    // --- 3D GLOWING FRAME AROUND AVATAR ---
    const frameGeo = new THREE.BufferGeometry();
    const halfW = 1.18, halfH = 1.48;
    const framePoints = [
      new THREE.Vector3(-halfW, -halfH, 0.02),
      new THREE.Vector3(halfW, -halfH, 0.02),
      new THREE.Vector3(halfW, halfH, 0.02),
      new THREE.Vector3(-halfW, halfH, 0.02),
      new THREE.Vector3(-halfW, -halfH, 0.02)
    ];
    frameGeo.setFromPoints(framePoints);
    const frameMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 2 });
    const avatarFrame = new THREE.Line(frameGeo, frameMat);
    avatarMesh.add(avatarFrame);

    // --- CONCENTRIC GYROSCOPIC CYBER RINGS ---
    const ringGeo1 = new THREE.TorusGeometry(1.95, 0.025, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.85 });
    ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.15, 0.018, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.75 });
    ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(2.35, 0.012, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.65 });
    ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring3);

    // --- ORBITING TECH SATELLITES (3D POLYHEDRA) ---
    satellitesGroup = new THREE.Group();
    const satColors = [0x00f0ff, 0x8b5cf6, 0x10b981, 0xf59e0b];
    const satGeos = [
      new THREE.OctahedronGeometry(0.12, 0),
      new THREE.IcosahedronGeometry(0.13, 0),
      new THREE.TetrahedronGeometry(0.14, 0),
      new THREE.BoxGeometry(0.15, 0.15, 0.15)
    ];

    const satellites = [];
    for (let i = 0; i < 4; i++) {
      const satMesh = new THREE.Mesh(
        satGeos[i],
        new THREE.MeshStandardMaterial({
          color: satColors[i],
          wireframe: true,
          emissive: satColors[i],
          emissiveIntensity: 0.4
        })
      );
      satellites.push({
        mesh: satMesh,
        speed: 0.8 + i * 0.25,
        radius: 2.1 + (i % 2) * 0.35,
        yOffset: (i - 1.5) * 0.6,
        phase: (i * Math.PI) / 2
      });
      satellitesGroup.add(satMesh);
    }
    scene.add(satellitesGroup);

    // --- HOLOGRAM SCANLINE PARTICLES ---
    const holoParticleCount = 280;
    const holoGeo = new THREE.BufferGeometry();
    const holoPos = new Float32Array(holoParticleCount * 3);
    for (let i = 0; i < holoParticleCount * 3; i += 3) {
      holoPos[i] = (Math.random() - 0.5) * 3.5;
      holoPos[i + 1] = (Math.random() - 0.5) * 4.2;
      holoPos[i + 2] = (Math.random() - 0.5) * 1.5;
    }
    holoGeo.setAttribute('position', new THREE.BufferAttribute(holoPos, 3));
    const holoMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const holoParticles = new THREE.Points(holoGeo, holoMat);
    scene.add(holoParticles);

    // --- MOUSE PARALLAX TRACKING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - (rect.left + rect.width / 2);
      const clientY = e.clientY - (rect.top + rect.height / 2);
      mouse.targetX = clientX / (window.innerWidth / 2);
      mouse.targetY = clientY / (window.innerHeight / 2);
    });

    // --- CLICK TO EXECUTE 3D SPIN ---
    let spinVelocity = 0;
    container.addEventListener('click', () => {
      spinVelocity = 18;
      // Play soft tech sound
      if (typeof playClickSound === 'function') playClickSound(880);
      showHoloGlitch();
    });

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Handle click spin decay
      if (spinVelocity > 0.01) {
        avatarMesh.rotation.y += spinVelocity * delta;
        spinVelocity *= 0.92;
      } else {
        // Base hover tilt
        avatarMesh.rotation.y = mouse.x * 0.45;
      }
      avatarMesh.rotation.x = -mouse.y * 0.35;

      // Floating gentle bobbing
      avatarMesh.position.y = Math.sin(elapsed * 1.8) * 0.09;

      // Precessing Rings
      if (ring1) {
        ring1.rotation.x += 0.008;
        ring1.rotation.y += 0.012;
      }
      if (ring2) {
        ring2.rotation.y -= 0.010;
        ring2.rotation.z += 0.007;
      }
      if (ring3) {
        ring3.rotation.z += 0.009;
        ring3.rotation.x -= 0.006;
      }

      // Orbiting Satellites
      satellites.forEach(s => {
        const angle = elapsed * s.speed + s.phase;
        s.mesh.position.x = Math.cos(angle) * s.radius;
        s.mesh.position.z = Math.sin(angle) * s.radius;
        s.mesh.position.y = s.yOffset + Math.sin(angle * 2) * 0.2;
        s.mesh.rotation.x += 0.02;
        s.mesh.rotation.y += 0.03;
      });

      // Hologram particle drift
      const hPos = holoGeo.attributes.position.array;
      for (let i = 1; i < hPos.length; i += 3) {
        hPos[i] += 0.006;
        if (hPos[i] > 2.2) hPos[i] = -2.2;
      }
      holoGeo.attributes.position.needsUpdate = true;

      // Scroll-driven reaction on 3D avatar
      const scrollY = window.scrollY;
      const scrollProgress = Math.min(scrollY / 1200, 1);
      camera.position.z = 5.2 - scrollProgress * 0.6;
      camera.position.x = scrollProgress * 0.4;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // Initialize switcher buttons
    initAvatarSwitcher();
  }

  function showHoloGlitch() {
    const container = document.getElementById('hero-3d-avatar-stage');
    if (!container) return;
    container.classList.add('holo-glitch');
    setTimeout(() => container.classList.remove('holo-glitch'), 450);
  }

  function initAvatarSwitcher() {
    const buttons = document.querySelectorAll('.mode-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.getAttribute('data-avatar');
        currentAvatarMode = mode;

        if (avatarTextures[mode] && avatarMesh) {
          avatarMesh.material.map = avatarTextures[mode];
          avatarMesh.material.needsUpdate = true;
          showHoloGlitch();
        }

        if (typeof showToast === 'function') {
          const names = { stand: '3D Cyber Avatar', real: 'Official High-Res Portrait', talk: 'AI Voice Multilingual Avatar' };
          showToast(`⚡ Hologram Mode: ${names[mode] || mode}`);
        }
      });
    });
  }

  // ========================================================
  // 2. 3D GLOBAL UNIVERSE & SCROLL VELOCITY ENGINE
  // ========================================================
  function init3DGlobalBackground() {
    // Check if background canvas exists or create it
    let canvas = document.getElementById('webgl-bg-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'webgl-bg-canvas';
      canvas.className = 'webgl-bg-canvas';
      document.body.prepend(canvas);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false, // Performance optimize for full bleed
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // --- 3D PARTICLE CONSTELLATION ---
    const count = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseCyan = new THREE.Color(0x00f0ff);
    const basePurple = new THREE.Color(0x8b5cf6);
    const basePink = new THREE.Color(0xec4899);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const mixed = Math.random();
      const col = mixed < 0.5 ? baseCyan.clone().lerp(basePurple, mixed * 2) : basePurple.clone().lerp(basePink, (mixed - 0.5) * 2);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    // --- 3D FLOATING POLYHEDRON BACKGROUND ACCENTS ---
    const bgAccents = new THREE.Group();
    const accentGeos = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(0.9, 0),
      new THREE.DodecahedronGeometry(0.7, 0)
    ];

    const accentMeshes = [];
    for (let i = 0; i < 6; i++) {
      const mesh = new THREE.Mesh(
        accentGeos[i % 3],
        new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x00f0ff : 0x8b5cf6,
          wireframe: true,
          transparent: true,
          opacity: 0.12
        })
      );
      mesh.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 16, -4 - Math.random() * 8);
      bgAccents.add(mesh);
      accentMeshes.push(mesh);
    }
    scene.add(bgAccents);

    // --- SCROLL INTERPOLATION & SECTION MORPHING ---
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetCameraY = 0;
    let targetCameraRotZ = 0;

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      scrollVelocity = (currentY - lastScrollY) * 0.003;
      lastScrollY = currentY;

      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalH > 0 ? currentY / totalH : 0;

      // Camera sweeps through space as user traverses portfolio
      targetCameraY = -progress * 14;
      targetCameraRotZ = Math.sin(progress * Math.PI * 2) * 0.08;

      // Color morphing in Eco-Transformers Research section
      const researchSec = document.getElementById('research');
      if (researchSec) {
        const rRect = researchSec.getBoundingClientRect();
        if (rRect.top < window.innerHeight && rRect.bottom > 0) {
          // Inside Eco-Transformers: shift to bright green/cyan
          material.color.setHex(0x10b981);
        } else {
          material.color.setHex(0xffffff);
        }
      }
    }, { passive: true });

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    function renderGlobal() {
      requestAnimationFrame(renderGlobal);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.rotation.z += (targetCameraRotZ - camera.rotation.z) * 0.05;

      // Particle motion + scroll velocity inertia
      starField.rotation.y = elapsed * 0.03 + (lastScrollY * 0.0004);
      starField.rotation.x = Math.sin(elapsed * 0.1) * 0.05;

      // Floating accent polyhedra rotation
      accentMeshes.forEach((mesh, idx) => {
        mesh.rotation.x += 0.004 * (idx + 1);
        mesh.rotation.y += 0.006 * (idx + 1);
      });

      // Decay scroll velocity
      scrollVelocity *= 0.94;

      renderer.render(scene, camera);
    }
    renderGlobal();

    // Window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ========================================================
  // 3. 3D PERSPECTIVE TILT ON CARDS (DYNAMIC GLARE & DEPTH)
  // ========================================================
  function init3DCardTilt() {
    const selector = '.project-card, .bento-card, .pub-hero-card, .skill-category-card, .timeline-content-card';
    const cards = document.querySelectorAll(selector);

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
        const rotateY = ((x - centerX) / centerX) * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px)`;
        card.style.transition = 'transform 0.08s ease-out';

        // Glare highlight
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        card.style.setProperty('--glare-x', `${glareX}%`);
        card.style.setProperty('--glare-y', `${glareY}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
      });
    });
  }

  // ========================================================
  // 4. 3D CYBER HUD & SCROLL TRACKER
  // ========================================================
  function init3DCyberHUD() {
    let hud = document.getElementById('cyber-hud');
    if (!hud) {
      hud = document.createElement('div');
      hud.id = 'cyber-hud';
      hud.className = 'cyber-hud';
      hud.innerHTML = `
        <div class="hud-box">
          <div class="hud-header">
            <span class="hud-blink">●</span>
            <span class="hud-title">3D CORE</span>
          </div>
          <div class="hud-metric">
            <span class="hud-label">DEPTH:</span>
            <span id="hud-depth" class="hud-val">0%</span>
          </div>
          <div class="hud-metric">
            <span class="hud-label">SECTOR:</span>
            <span id="hud-sector" class="hud-val">HERO</span>
          </div>
          <div class="hud-metric">
            <span class="hud-label">STATUS:</span>
            <span class="hud-val text-cyan">ONLINE</span>
          </div>
        </div>
      `;
      document.body.appendChild(hud);
    }

    const depthEl = document.getElementById('hud-depth');
    const sectorEl = document.getElementById('hud-sector');

    const sections = ['hero', 'about', 'research', 'projects', 'skills', 'experience', 'blog', 'contact'];

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = totalH > 0 ? Math.round((currentY / totalH) * 100) : 0;

      if (depthEl) depthEl.textContent = `${pct}%`;

      // Determine active sector
      let activeSector = 'HERO';
      for (const id of sections) {
        const sec = document.getElementById(id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            activeSector = id.toUpperCase();
          }
        }
      }
      if (sectorEl) sectorEl.textContent = activeSector;
    }, { passive: true });
  }

})();
