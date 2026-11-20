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
  const WALK_MS = 3100;
  const GREETING_MS = 2600;
  const SHY_MS = 900;
  const RUN_MS = 1150;
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
        animation:siva-walk-in 3.1s linear both;
      }
      #siva-companion.siva-shy {
        animation:siva-shy-retreat .9s ease-in-out both;
      }
      #siva-companion.siva-running {
        animation:siva-run-away 1.15s cubic-bezier(.42,.0,.72,1) both;
      }
      @keyframes siva-walk-in {
        0% {transform:translate3d(-165%,0,0);opacity:0}
        10% {opacity:1}
        25% {transform:translate3d(-124%,0,0);opacity:1}
        50% {transform:translate3d(-77%,0,0);opacity:1}
        75% {transform:translate3d(-30%,0,0);opacity:1}
        92% {transform:translate3d(-3%,0,0);opacity:1}
        100% {transform:translate3d(0,0,0);opacity:1}
      }
      @keyframes siva-shy-retreat {
        0% {transform:translate3d(0,0,0) rotate(0);opacity:1}
        42% {transform:translate3d(-2%,6px,0) rotate(-4deg) scale(.985);opacity:1}
        100% {transform:translate3d(-6%,2px,0) rotate(-3deg) scale(.97);opacity:1}
      }
      @keyframes siva-run-away {
        0% {transform:translate3d(-6%,2px,0) rotate(-3deg) scale(.97);opacity:1}
        25% {transform:translate3d(-34%,0,0) rotate(-5deg) scale(.97);opacity:1}
        62% {transform:translate3d(-98%,0,0) rotate(-5deg) scale(.96);opacity:1}
        100% {transform:translate3d(-170%,0,0) rotate(-6deg) scale(.96);opacity:0}
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

  let renderer, camera, scene, person, legRig = null;
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

  /**
   * The original photograph relief has no authored bones or animation clips.
   * Add a conservative seven-bone 2.5D skeleton with ankle pivots. The model
   * remains the user's original asset; the movement is deliberately subtle to
   * avoid the tearing caused by trying to make a flat photograph take long steps.
   */
  function buildLegRig(THREE, model) {
    const root = new THREE.Bone(); root.name = 'Root';
    const leftHip = new THREE.Bone(); leftHip.name = 'LeftHip';
    const leftKnee = new THREE.Bone(); leftKnee.name = 'LeftKnee';
    const leftAnkle = new THREE.Bone(); leftAnkle.name = 'LeftAnkle';
    const rightHip = new THREE.Bone(); rightHip.name = 'RightHip';
    const rightKnee = new THREE.Bone(); rightKnee.name = 'RightKnee';
    const rightAnkle = new THREE.Bone(); rightAnkle.name = 'RightAnkle';
    // Coordinates are verified against the original relief's 1.78m Y extent.
    leftHip.position.set(-.105, .84, 0);
    rightHip.position.set(.105, .84, 0);
    leftKnee.position.y = -.41;
    rightKnee.position.y = -.41;
    leftAnkle.position.y = -.36;
    rightAnkle.position.y = -.36;
    leftHip.add(leftKnee); leftKnee.add(leftAnkle);
    rightHip.add(rightKnee); rightKnee.add(rightAnkle);
    root.add(leftHip, rightHip);
    model.add(root);
    model.updateMatrixWorld(true);
    const skeleton = new THREE.Skeleton([
      root, leftHip, leftKnee, leftAnkle,
      rightHip, rightKnee, rightAnkle
    ]);
    skeleton.calculateInverses();
    const clamp01 = n => Math.max(0, Math.min(1, n));
    const smooth = (edge0, edge1, x) => {
      const v = clamp01((x - edge0) / (edge1 - edge0));
      return v * v * (3 - 2 * v);
    };
    const meshes = [];
    model.traverse(node => {if (node.isMesh && !node.isSkinnedMesh) meshes.push(node);});
    for (const original of meshes) {
      const geometry = original.geometry.clone();
      const positions = geometry.getAttribute('position');
      const indices = new Uint16Array(positions.count * 4);
      const weights = new Float32Array(positions.count * 4);
      for (let i=0;i<positions.count;i++) {
        const x = positions.getX(i), y = positions.getY(i);
        const lower = 1 - smooth(.78, .91, y);
        const armGuard = 1 - smooth(.22, .29, Math.abs(x));
        // Keep the central seam and the suit attached while legs move.
        const seamGuard = smooth(.004, .023, Math.abs(x));
        const mobile = lower * armGuard * seamGuard;
        const belowKnee = 1 - smooth(.41, .59, y);
        const belowAnkle = 1 - smooth(.075, .22, y);
        const hip = mobile * (1 - belowKnee);
        const knee = mobile * belowKnee * (1 - belowAnkle);
        const ankle = mobile * belowKnee * belowAnkle;
        const offset = i*4;
        const base = x < 0 ? 1 : 4;
        indices[offset] = 0;
        indices[offset+1] = base;
        indices[offset+2] = base+1;
        indices[offset+3] = base+2;
        weights[offset] = 1 - mobile;
        weights[offset+1] = hip;
        weights[offset+2] = knee;
        weights[offset+3] = ankle;
      }
      geometry.setAttribute('skinIndex',new THREE.Uint16BufferAttribute(indices,4));
      geometry.setAttribute('skinWeight',new THREE.Float32BufferAttribute(weights,4));
      const mesh = new THREE.SkinnedMesh(geometry,original.material);
      mesh.name=original.name;
      mesh.position.copy(original.position);
      mesh.quaternion.copy(original.quaternion);
      mesh.scale.copy(original.scale);
      mesh.frustumCulled=false;
      mesh.renderOrder=original.renderOrder;
      original.parent.add(mesh);
      original.parent.remove(original);
      mesh.updateMatrixWorld(true);
      mesh.bind(skeleton);
    }
    return {leftHip,leftKnee,leftAnkle,rightHip,rightKnee,rightAnkle};
  }

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const smoothstep = t => {t=clamp(t,0,1);return t*t*(3-2*t);};

  // Natural foot cadence: the support foot is planted for 62% of each step.
  // During the remaining 38% the opposite foot lifts, swings, and sets down.
  // The ankle is counter-rotated so the shoe doesn't spin with the shin.
  function footTrack(cycle, fast) {
    const phase = ((cycle % 1) + 1) % 1;
    const stanceShare = fast ? .53 : .62;
    const reach = fast ? .118 : .087;
    const lift = fast ? .125 : .072;
    if (phase < stanceShare) {
      const t = phase/stanceShare;
      return {z:reach*(1-2*t),y:.085,roll:t>.80?(t-.80)/.20*.075:0,swing:false};
    }
    const t=(phase-stanceShare)/(1-stanceShare);
    return {z:reach*(-1+2*smoothstep(t)),y:.085+lift*Math.pow(Math.sin(Math.PI*t),1.4),roll:-.075*Math.sin(Math.PI*t),swing:true};
  }

  function solveFoot(hip,knee,ankle,cycle,fast,intensity) {
    if(!hip||!knee||!ankle) return;
    const track=footTrack(cycle,fast);
    const hipHeight=.84;
    const thigh=.41,shin=.36;
    // Small forward/backwards movement in Z, without giving away the flatness
    // of the original photograph. Two-bone inverse kinematics prevents feet
    // from sweeping around like pendulums.
    const z=track.z*intensity;
    const dy=track.y-hipHeight;
    const length=clamp(Math.hypot(z,dy),.015,thigh+shin-.0001);
    const direction=Math.atan2(-z,-dy);
    const reachAngle=Math.acos(clamp((thigh*thigh+length*length-shin*shin)/(2*thigh*length),-1,1));
    const kneeAngle=Math.acos(clamp((length*length-thigh*thigh-shin*shin)/(2*thigh*shin),-1,1));
    hip.rotation.x=(direction-reachAngle)*intensity;
    knee.rotation.x=kneeAngle*intensity;
    ankle.rotation.x=(-(hip.rotation.x+knee.rotation.x)*.85+track.roll)*intensity;
    // Just a few degrees of lateral weight shift, not the previous 30 degree
    // leg spreading. The character is dressed in a fitted suit.
    hip.rotation.z=.019*Math.sin(cycle*Math.PI*2)*intensity;
    knee.rotation.z=-hip.rotation.z*.4;
    ankle.rotation.z=-hip.rotation.z*.6;
    return track;
  }

  function poseLegs(stepCycles, fast, intensity) {
    if(!legRig)return;
    solveFoot(legRig.leftHip,legRig.leftKnee,legRig.leftAnkle,stepCycles,fast,intensity);
    solveFoot(legRig.rightHip,legRig.rightKnee,legRig.rightAnkle,stepCycles+.5,fast,intensity);
  }

  function render(now) {
    if(disposed||!renderer||!person)return;
    const t=(now-phaseStart)/1000;
    person.position.y=baseY;
    person.position.x=0;
    person.rotation.x=0;
    person.rotation.y=0;
    person.rotation.z=0;
    if(!reducedMotion && phase==='walk') {
      // Four steps and a soft settle, synchronized with the CSS translation.
      const progress=clamp(t/(WALK_MS/1000),0,1);
      const fade=1-smoothstep((progress-.83)/.17);
      const cycles=progress*2.2;
      poseLegs(cycles,false,fade);
      person.position.y=baseY+Math.abs(Math.sin(cycles*Math.PI*2))*.009*fade;
      person.position.x=Math.sin(cycles*Math.PI*2)*.010*fade;
      person.rotation.y=-.065+Math.sin(cycles*Math.PI*2)*.022*fade;
      person.rotation.z=-.012*fade+Math.sin(cycles*Math.PI*2)*.008*fade;
    } else if(!reducedMotion && phase==='run') {
      const progress=clamp(t/(RUN_MS/1000),0,1);
      const cycles=progress*2.7;
      poseLegs(cycles,true,1);
      person.position.y=baseY+Math.abs(Math.sin(cycles*Math.PI*2))*.018;
      person.position.x=Math.sin(cycles*Math.PI*2)*.012;
      person.rotation.y=.07+Math.sin(cycles*Math.PI*2)*.022;
      person.rotation.z=-.045+Math.sin(cycles*Math.PI*2)*.010;
    } else if(!reducedMotion && phase==='shy') {
      poseLegs(0,false,0);
      const x=smoothstep(t/.52);
      person.rotation.y=-.085-x*.09;
      person.rotation.z=-x*.045;
      person.position.y=baseY-Math.sin(x*Math.PI)*.018;
    } else {
      poseLegs(0,false,0);
      if(!reducedMotion)person.position.y=baseY+Math.sin(t*2)*.003;
    }
    renderer.render(scene,camera);
    raf=requestAnimationFrame(render);
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
      // Convert the photo-relief meshes to a soft procedural leg skeleton.
      legRig = buildLegRig(THREE, person);
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