/**
 * Sivanesan's full-body GLB greeting.
 * Motion is procedural because this particular photo-relief GLB has no armature or animation clips.
 * Never substitute a cartoon, emoji, or other character for the supplied model.
 */
(() => {
  if (window.__sivaCompanionInitialized) return;
  window.__sivaCompanionInitialized = true;

  const ASSET = '/assets/suit_full_body_3d_relief.glb';
  const THREE_MODULE = '/assets/three.module-CUzX9mi6.js';
  const LOADER_MODULE = '/assets/GLTFLoader-D67taXcT.js';
  const START_DELAY_MS = 2000;
  const WALK_MS = 2450;
  const GREETING_MS = 2600;
  const SHY_MS = 900;
  const RUN_MS = 900;
  const pageStartedAt = performance.now();
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reducedMotion = motionPreference.matches;
  const enterTime = reducedMotion ? 320 : WALK_MS;
  const shyTime = reducedMotion ? 350 : SHY_MS;
  const exitTime = reducedMotion ? 320 : RUN_MS;

  if (!document.getElementById('siva-companion-style')) {
    const style = document.createElement('style');
    style.id = 'siva-companion-style';
    style.textContent = `
      #siva-companion {
        position: fixed;
        left: clamp(12px, 8vw, 145px);
        bottom: clamp(6px, 1.5vh, 16px);
        width: clamp(145px, 18vw, 250px);
        height: clamp(235px, 44vh, 410px);
        box-sizing: border-box;
        pointer-events: none !important;
        overflow: visible;
        z-index: 80;
        opacity: 0;
        transform: translate3d(-165%, 0, 0);
        transform-origin: 45% 100%;
        will-change: transform, opacity;
      }
      #siva-companion.siva-present {opacity:1; transform:translate3d(0,0,0)}
      #siva-companion canvas {
        position:absolute; inset:0; z-index:2;
        display:block; width:100%; height:100%;
        filter:drop-shadow(0 7px 11px rgba(18,4,8,.25));
      }
      #siva-companion .siva-ground {
        position:absolute; width:42%; height:5%; bottom:6%; left:29%; z-index:1;
        border-radius:50%; background:rgba(20,5,10,.25); filter:blur(8px);
        transform:scale(1.05);
      }
      #siva-companion .siva-speech {
        position:absolute; left:77%; top:6%; z-index:3;
        width:max-content; max-width:min(215px,42vw);
        border-radius:18px 18px 18px 5px;
        padding:12px 16px;
        background:#fff7ed; color:#38191d;
        border:1px solid rgba(255,147,95,.4);
        box-shadow:0 10px 28px rgba(32,12,22,.2);
        font:700 clamp(13px,1vw,16px)/1.45 system-ui,sans-serif;
        letter-spacing:.01em; white-space:normal; text-align:left;
        opacity:0; transform:translateY(10px) scale(.94);
        transition:opacity .32s ease,transform .32s ease;
      }
      #siva-companion.siva-greeting .siva-speech,
      #siva-companion.siva-shy .siva-speech { opacity:1; transform:translateY(0) scale(1) }
      #siva-companion .siva-speech::after {
        content:''; position:absolute; bottom:-7px; left:13px;
        width:13px; height:13px; transform:rotate(45deg);
        background:#fff7ed;
        border-right:1px solid rgba(255,147,95,.4);
        border-bottom:1px solid rgba(255,147,95,.4);
      }
      #siva-companion.siva-walking {
        animation:siva-walk-in 2.45s cubic-bezier(.28,.47,.38,1) both;
      }
      #siva-companion.siva-shy {
        animation:siva-shy-retreat .9s ease-in-out both;
      }
      #siva-companion.siva-running {
        animation:siva-run-away .9s cubic-bezier(.55,.17,.9,.72) both;
      }
      @keyframes siva-walk-in {
        0% {transform:translate3d(-165%,0,0) rotate(-3deg);opacity:0}
        12% {opacity:1}
        83% {transform:translate3d(-7%,0,0) rotate(1deg);opacity:1}
        100% {transform:translate3d(0,0,0) rotate(0);opacity:1}
      }
      @keyframes siva-shy-retreat {
        0% {transform:translate3d(0,0,0) rotate(0);opacity:1}
        42% {transform:translate3d(-2%,6px,0) rotate(-4deg) scale(.985);opacity:1}
        100% {transform:translate3d(-6%,2px,0) rotate(-3deg) scale(.97);opacity:1}
      }
      @keyframes siva-run-away {
        0% {transform:translate3d(-6%,2px,0) rotate(-3deg) scale(.97);opacity:1}
        35% {opacity:1}
        100% {transform:translate3d(-170%,2px,0) rotate(-10deg) scale(.94);opacity:0}
      }
      @media (max-width:700px) {
        #siva-companion {
          left:6px;
          bottom:6px;
          width:clamp(130px,33vw,190px);
          height:clamp(210px,36vh,315px);
        }
        #siva-companion .siva-speech {
          left:78%; top:9%; max-width:44vw;
          padding:9px 12px; font-size:12px;
          border-radius:14px 14px 14px 4px;
        }
      }
      @media (prefers-reduced-motion:reduce) {
        #siva-companion.siva-walking {animation:siva-fade-in .32s ease-out both}
        #siva-companion.siva-shy {animation:none;transform:translate3d(0,0,0);opacity:1}
        #siva-companion.siva-running {animation:siva-fade-out .32s ease-in both}
        #siva-companion .siva-speech {transition:none}
      }
      @keyframes siva-fade-in {from {opacity:0;transform:translate3d(0,0,0)} to {opacity:1;transform:translate3d(0,0,0)}}
      @keyframes siva-fade-out {from {opacity:1;transform:translate3d(0,0,0)} to {opacity:0;transform:translate3d(0,0,0)}}
    `;
    document.head.appendChild(style);
  }

  const host = document.createElement('aside');
  host.id = 'siva-companion';
  host.setAttribute('aria-hidden', 'true');
  host.innerHTML = '<div class="siva-ground"></div><div class="siva-speech">Hi! 👋<br>How are you?</div>';
  document.body.appendChild(host);

  let renderer, camera, scene, person;
  let baseY = 0, modelWidth = 0, modelHeight = 0;
  let raf = 0, disposed = false, phase = 'idle', phaseStart = 0;
  const timers = [];
  const after = (ms, fn) => timers.push(setTimeout(() => {if (!disposed) fn();}, ms));

  function cleanup() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    for (const timer of timers) clearTimeout(timer);
    window.removeEventListener('resize', resize);
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
    }
    host.remove();
  }

  function resize() {
    if (!renderer || !camera) return;
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    // Fit both the hair and the shoes, with 20-25% safe breathing room.
    // These bounds are the dimensions *after* uniform scaling.
    const ratio = width / height;
    const halfY = Math.max(1.38, modelHeight * .62, modelWidth * .68 / ratio);
    camera.left = -halfY * ratio;
    camera.right = halfY * ratio;
    camera.top = halfY;
    camera.bottom = -halfY;
    camera.updateProjectionMatrix();
  }

  function setPhase(value) {
    phase = value;
    phaseStart = performance.now();
  }

  function render(now) {
    if (disposed || !renderer || !person) return;
    const t = (now - phaseStart) / 1000;
    person.position.y = baseY;
    person.rotation.x = 0;
    person.rotation.y = -.03;
    person.rotation.z = 0;

    if (!reducedMotion && phase === 'walk') {
      // The supplied GLB has no rig: simulate footsteps using gentle bounce and weight shift.
      const step = t * Math.PI * 4.1;
      person.position.y = baseY + Math.abs(Math.sin(step)) * .042;
      person.rotation.z = Math.sin(step) * .023;
      person.rotation.y = -.03 + Math.sin(step) * .048;
    } else if (!reducedMotion && phase === 'run') {
      const step = t * Math.PI * 9.5;
      person.position.y = baseY + Math.abs(Math.sin(step)) * .07;
      person.rotation.z = -.075 + Math.sin(step) * .033;
      person.rotation.y = -.055 + Math.sin(step) * .06;
    } else if (!reducedMotion && phase === 'shy') {
      const ease = Math.min(1, t / .45);
      person.position.y = baseY - Math.sin(ease * Math.PI) * .032;
      person.rotation.y = -.08 - ease * .11;
      person.rotation.z = -ease * .047;
    } else if (!reducedMotion) {
      person.position.y = baseY + Math.sin(t * 2.0) * .005;
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  }

  async function start() {
    try {
      const canvasProbe = document.createElement('canvas');
      if (!canvasProbe.getContext('webgl2') && !canvasProbe.getContext('webgl')) {
        cleanup();
        return;
      }
      // Load all dependencies immediately while the 2-second hidden delay is running.
      const [THREE, {GLTFLoader}, response] = await Promise.all([
        import(THREE_MODULE), import(LOADER_MODULE), fetch(ASSET, {cache:'force-cache'})
      ]);
      if (!response.ok) throw new Error(`3D asset HTTP ${response.status}`);
      const data = await response.arrayBuffer();
      const model = await new Promise((resolve, reject) => {
        new GLTFLoader().parse(data, '/assets/', resolve, reject);
      });
      if (disposed) return;

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1,1,1.38,-1.38,.1,100);
      camera.position.set(0, 0, 6);
      camera.lookAt(0,0,0);
      scene.add(new THREE.AmbientLight(0xffffff, 2.0));
      const light = new THREE.DirectionalLight(0xfff3e5, 2.0);
      light.position.set(-2,4,5);
      scene.add(light);

      person = model.scene;
      const bounds = new THREE.Box3().setFromObject(person);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      // The old code only subtracted `center` BEFORE scaling, pushing the head
      // out of frame. Translate by the *scaled* center, then fit the camera.
      const scale = 2.12 / Math.max(.001, size.y);
      person.scale.setScalar(scale);
      person.position.copy(center).multiplyScalar(-scale);
      baseY = person.position.y;
      modelWidth = size.x * scale;
      modelHeight = size.y * scale;
      person.traverse(mesh => {
        if (!mesh.isMesh) return;
        mesh.frustumCulled = false;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const material of materials) if (material) material.side = THREE.DoubleSide;
      });
      scene.add(person);

      renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, powerPreference:'low-power'});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0,0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.16;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.prepend(renderer.domElement);
      resize();
      window.addEventListener('resize', resize, {passive:true});
      renderer.render(scene, camera);

      await new Promise(resolve => setTimeout(resolve, Math.max(0, START_DELAY_MS - (performance.now() - pageStartedAt))));
      if (disposed) return;
      setPhase('walk');
      raf = requestAnimationFrame(render);
      host.classList.add('siva-present', 'siva-walking');
      after(enterTime - 150, () => host.classList.add('siva-greeting'));
      after(enterTime + GREETING_MS, () => {
        host.classList.remove('siva-walking', 'siva-greeting');
        host.classList.add('siva-shy');
        setPhase('shy');
      });
      after(enterTime + GREETING_MS + shyTime, () => {
        host.classList.remove('siva-shy');
        host.classList.add('siva-running');
        setPhase('run');
      });
      after(enterTime + GREETING_MS + shyTime + exitTime + 120, cleanup);
    } catch (error) {
      console.warn('[Portfolio companion] Your 3D model could not be shown', error);
      cleanup();
    }
  }
  start();
})();