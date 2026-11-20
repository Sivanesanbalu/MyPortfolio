/**
 * Sivanesan portfolio companion — uses the visitor's supplied GLB asset.
 * A single, non-interactive entrance. No substitute sprites or other characters.
 */
(() => {
  if (window.__sivaCompanionInitialized) return;
  window.__sivaCompanionInitialized = true;

  const ASSET = '/assets/suit_full_body_3d_relief.glb';
  const THREE_MODULE = '/assets/three.module-CUzX9mi6.js';
  const LOADER_MODULE = '/assets/GLTFLoader-D67taXcT.js';
  const START_DELAY_MS = 2000;
  const ENTER_MS = 1300;
  const GREETING_MS = 2700;
  const SHY_MS = 1000;
  const EXIT_MS = 1250;
  const initializedAt = performance.now();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.querySelector('#siva-companion-style')) {
    const css = document.createElement('style');
    css.id = 'siva-companion-style';
    css.textContent = `
      #siva-companion {
        position: fixed; left: 0; bottom: max(2vh, 6px);
        height: clamp(260px, 62vh, 610px); width: clamp(180px, 29vw, 380px);
        pointer-events: none !important; z-index: 9998;
        opacity: 0; transform: translate3d(-112%, 0, 0);
        transform-origin: 42% 100%;
        will-change: transform, opacity;
        contain: layout style;
      }
      #siva-companion canvas { display:block; width:100%; height:100%; filter:drop-shadow(0px 10px 22px rgba(0,0,0,.24)); }
      #siva-companion.siva-enter { animation: siva-enter 1.3s cubic-bezier(.23,.72,.21,1) forwards; }
      #siva-companion.siva-shy { animation: siva-shy 1s ease-in-out forwards; }
      #siva-companion.siva-exit { animation: siva-exit 1.25s cubic-bezier(.55,.07,.75,.28) forwards; }
      #siva-companion .siva-speech {
        position:absolute; left: min(75%, 280px); top: 12%;
        width: max-content; max-width: min(220px, 48vw);
        border-radius: 20px 20px 20px 4px;
        padding: 13px 17px; background: #fff7ed; color: #38191d;
        border: 1px solid rgba(255,147,95,.42); box-shadow: 0 12px 30px #200c1633;
        font: 700 clamp(13px, 1.15vw, 16px)/1.45 system-ui, sans-serif;
        letter-spacing: .01em; white-space: normal; text-align: left;
        opacity: 0; transform: translateY(12px) scale(.93);
        transition: opacity .35s ease, transform .35s ease;
      }
      #siva-companion.siva-greeting .siva-speech { opacity: 1; transform: translateY(0) scale(1); }
      #siva-companion .siva-speech::before {
        content: ''; position:absolute; bottom: -8px; left: 12px; width:15px; height:15px;
        background:#fff7ed; border-bottom: 1px solid rgba(255,147,95,.42);
        border-right: 1px solid rgba(255,147,95,.42); transform: rotate(45deg);
      }
      @keyframes siva-enter { 0% {transform: translate3d(-112%,0,0) rotate(-9deg);opacity:0} 55%{opacity:1} 76% {transform:translate3d(10%,0,0) rotate(2deg)} 100%{transform:translate3d(3%,0,0) rotate(0); opacity:1} }
      @keyframes siva-shy { 0%{transform:translate3d(3%,0,0) rotate(0);opacity:1} 32%{transform:translate3d(-1%,7px,0) rotate(-8deg) scale(.97);opacity:1} 100%{transform:translate3d(-5%,3px,0) rotate(-5deg) scale(.96);opacity:1} }
      @keyframes siva-exit { 0%{transform:translate3d(-5%,3px,0) rotate(-5deg) scale(.96);opacity:1} 58% {opacity:1} 100%{transform:translate3d(-117%,8px,0) rotate(-14deg) scale(.96);opacity:0} }
      @media (max-width: 700px) {
        #siva-companion {height: clamp(210px, 47vh, 430px);width:clamp(145px, 43vw, 245px);bottom:1vh}
        #siva-companion .siva-speech {left: 69%;top:15%;max-width: 48vw;padding:10px 12px;font-size:13px;border-radius:15px 15px 15px 4px}
      }
      @media (prefers-reduced-motion: reduce) {
        #siva-companion.siva-enter {animation: siva-enter-reduced .25s ease-out forwards}
        #siva-companion.siva-shy {animation:none;transform:translate3d(3%,0,0);opacity:1}
        #siva-companion.siva-exit {animation:siva-exit-reduced .25s ease-in forwards}
      }
      @keyframes siva-enter-reduced { to{transform:translate3d(3%,0,0);opacity:1} }
      @keyframes siva-exit-reduced { to{transform:translate3d(-112%,0,0);opacity:0} }
    `;
    document.head.append(css);
  }

  const host = document.createElement('aside');
  host.id = 'siva-companion';
  host.setAttribute('aria-hidden','true');
  host.innerHTML = '<div class="siva-speech">Hi! 👋<br>How are you?</div>';
  document.body.append(host);

  let renderer, scene, camera, raf = 0, disposed = false;
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    if (renderer) {renderer.dispose(); renderer.forceContextLoss();}
    host.remove();
  };

  function resize() {
    if (!renderer || !camera) return;
    const width = Math.max(1,host.clientWidth), height = Math.max(1,host.clientHeight);
    renderer.setSize(width, height, false);
    const halfY = 1.40, halfX = halfY * width / height;
    camera.left = -halfX; camera.right = halfX;
    camera.top = halfY; camera.bottom = -halfY;
    camera.updateProjectionMatrix();
  }

  async function start() {
    try {
      // No 2D/emoji fallback: this experience should show only the supplied GLB.
      const testCanvas = document.createElement('canvas');
      if (!(testCanvas.getContext('webgl2') || testCanvas.getContext('webgl'))) {
        cleanup(); return;
      }
      const [THREE, { GLTFLoader }, response] = await Promise.all([
        import(THREE_MODULE), import(LOADER_MODULE), fetch(ASSET, {cache:'force-cache'})
      ]);
      if (!response.ok) throw new Error(`3D asset HTTP ${response.status}`);
      const modelBytes = await response.arrayBuffer();
      const gltf = await new Promise((resolve, reject) => {
        new GLTFLoader().parse(modelBytes, '/assets/', resolve, reject);
      });
      if (disposed) return;

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1,1,1.4,-1.4,.1,100);
      camera.position.set(0, .05, 5);
      camera.lookAt(0,0,0);
      scene.add(new THREE.AmbientLight(0xffffff, 2.2));
      const keyLight = new THREE.DirectionalLight(0xfff3e5, 2.1);
      keyLight.position.set(-2, 4, 5); scene.add(keyLight);

      const person = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(person);
      const size = bounds.getSize(new THREE.Vector3());
      const middle = bounds.getCenter(new THREE.Vector3());
      person.position.sub(middle);
      const scale = 2.5 / Math.max(.001, size.y);
      person.scale.setScalar(scale);
      person.rotation.y = -0.05;
      person.traverse(node => {
        if (node.isMesh) {
          node.frustumCulled = false;
          const materials = Array.isArray(node.material) ? node.material : [node.material];
          for (const material of materials) if (material) material.side = THREE.DoubleSide;
        }
      });
      scene.add(person);
      renderer = new THREE.WebGLRenderer({antialias:true, alpha:true, powerPreference:'low-power'});
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0,0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      host.prepend(renderer.domElement);
      resize(); window.addEventListener('resize',resize,{passive:true});
      renderer.render(scene,camera);

      const elapsed = performance.now() - initializedAt;
      await new Promise(resolve => setTimeout(resolve, Math.max(0, START_DELAY_MS-elapsed)));
      if (disposed) return;
      let frame = 0;
      const animate = () => {
        if (disposed) return;
        // Tiny bashful head-to-body pose rather than fake skeletal walking.
        person.rotation.y = -0.05 + Math.sin(frame*.032)*.06;
        renderer.render(scene,camera);
        frame++;
        raf=requestAnimationFrame(animate);
      };
      animate();
      host.classList.add('siva-enter');
      const enter = reducedMotion ? 250 : ENTER_MS;
      const shy = reducedMotion ? 300 : SHY_MS;
      const exit = reducedMotion ? 250 : EXIT_MS;
      setTimeout(() => host.classList.add('siva-greeting'), enter - Math.min(150,enter/2));
      setTimeout(() => {
        host.classList.remove('siva-greeting','siva-enter');
        host.style.opacity = '1';
        host.classList.add('siva-shy');
      }, enter + GREETING_MS);
      setTimeout(() => {
        host.classList.remove('siva-shy');
        host.classList.add('siva-exit');
      }, enter + GREETING_MS + shy);
      setTimeout(cleanup, enter + GREETING_MS + shy + exit + 100);
    } catch (error) {
      // Do not show a different character when 3D isn't available.
      console.warn('[Portfolio companion] 3D character could not load', error);
      cleanup();
    }
  }
  start();
})();