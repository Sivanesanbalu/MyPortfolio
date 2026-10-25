/**
 * SIVANESAN B - MOTIONSITES STUDIO EDITION CONTROLLER
 * Character-by-character text physics, Liquid Glass interactions,
 * Live Voice Simulator, Architecture Visualizer & Benchmark Explorer
 */

document.addEventListener('DOMContentLoaded', () => {
  initMotionSitesHero();
  initViewSwitchers();
  initVoiceSimulator();
  initBenchmarkExplorer();
  initModals();
  initMoreReposToggle();
});

// ==========================================
// 1. MOTIONSITES CHARACTER-BY-CHARACTER ENTRANCE
// ==========================================
function initMotionSitesHero() {
  const heading = document.getElementById('animated-hero-heading');
  const subhead = document.getElementById('animated-hero-subhead');
  const actions = document.getElementById('animated-hero-actions');
  const tag = document.getElementById('animated-hero-tag');

  if (heading) {
    // Exact spec from MotionSites VEX:
    // "Engineering tomorrow\nwith vision and action."
    const lines = [
      "Engineering tomorrow",
      "with vision and action."
    ];

    heading.innerHTML = '';
    const charDelay = 30; // ms
    const initialDelay = 200; // ms

    lines.forEach((line, lineIdx) => {
      const lineDiv = document.createElement('div');
      lineDiv.style.display = 'block';

      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        const char = line[charIdx];
        const span = document.createElement('span');
        span.className = 'char-span';
        span.textContent = char === ' ' ? '\u00A0' : char;

        const delay = initialDelay + (lineIdx * 20 * charDelay) + (charIdx * charDelay);
        setTimeout(() => {
          span.classList.add('animate-in');
        }, delay);

        lineDiv.appendChild(span);
      }
      heading.appendChild(lineDiv);
    });
  }

  // Subhead fade in at 800ms
  if (subhead) {
    setTimeout(() => {
      subhead.classList.add('animate-in');
    }, 800);
  }

  // Buttons fade in at 1200ms
  if (actions) {
    setTimeout(() => {
      actions.classList.add('animate-in');
    }, 1200);
  }

  // Right Tag capsule at 1400ms
  if (tag) {
    setTimeout(() => {
      tag.classList.add('animate-in');
    }, 1400);
  }
}

// ==========================================
// 2. PROJECT VIEW SWITCHERS
// ==========================================
function initViewSwitchers() {
  const switchBtns = document.querySelectorAll('.view-switch-btn');
  if (!switchBtns.length) return;

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentCard = btn.closest('.widescreen-project-card');
      if (!parentCard) return;

      const target = btn.getAttribute('data-view');

      // Update active button inside card
      parentCard.querySelectorAll('.view-switch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const overview = parentCard.querySelector('.overview-panel');
      const simulator = parentCard.querySelector('.simulator-panel');
      const architecture = parentCard.querySelector('.architecture-panel');

      if (overview) overview.style.display = target === 'overview' ? 'block' : 'none';
      if (simulator) {
        if (target === 'simulator') {
          simulator.classList.add('active');
          simulator.style.display = 'block';
        } else {
          simulator.classList.remove('active');
          simulator.style.display = 'none';
        }
      }
      if (architecture) {
        if (target === 'architecture') {
          architecture.classList.add('active');
          architecture.style.display = 'block';
        } else {
          architecture.classList.remove('active');
          architecture.style.display = 'none';
        }
      }
    });
  });
}

// ==========================================
// 3. LIVE CALL VOICE SIMULATOR (Flagship)
// ==========================================
function initVoiceSimulator() {
  const playBtn = document.getElementById('sim-play-btn');
  const canvas = document.getElementById('sim-canvas');
  const latencyBadge = document.getElementById('sim-latency-badge');
  const stage1 = document.getElementById('sim-st-1');
  const stage2 = document.getElementById('sim-st-2');
  const stage3 = document.getElementById('sim-st-3');
  const stage4 = document.getElementById('sim-st-4');
  const telBtn = document.getElementById('sim-tel-btn');
  const telBox = document.getElementById('sim-tel-box');

  if (!playBtn || !canvas) return;

  const ctx = canvas.getContext('2d');
  let isPlaying = false;
  let animId = null;

  if (telBtn && telBox) {
    telBtn.addEventListener('click', () => {
      telBox.classList.toggle('active');
      telBtn.textContent = telBox.classList.contains('active')
        ? 'Hide WebSocket Frame'
        : 'View WebSocket Frame';
    });
  }

  function drawWave(amp = 0) {
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00f0ff';
    ctx.beginPath();

    const slices = 50;
    const sliceWidth = w / slices;
    let x = 0;

    for (let i = 0; i < slices; i++) {
      const v = amp > 0 ? Math.sin((i * 0.3) + Date.now() * 0.01) * amp : 0;
      const y = (h / 2) + v;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }
    ctx.stroke();
  }

  drawWave(0);

  function startWave() {
    function loop() {
      drawWave(10);
      animId = requestAnimationFrame(loop);
    }
    loop();
  }

  function stopWave() {
    if (animId) cancelAnimationFrame(animId);
    drawWave(0);
  }

  function speakHindi(msg) {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(msg);
        utter.lang = 'hi-IN';
        window.speechSynthesis.speak(utter);
      }
    } catch(e) {}
  }

  playBtn.addEventListener('click', () => {
    if (isPlaying) return;
    isPlaying = true;
    playBtn.disabled = true;
    playBtn.textContent = 'Streaming Audio Pipeline...';

    const stages = [stage1, stage2, stage3, stage4];
    stages.forEach(s => { if (s) s.style.borderColor = 'rgba(255,255,255,0.1)'; });

    startWave();

    setTimeout(() => {
      if (stage1) stage1.style.borderColor = '#00f0ff';
      if (latencyBadge) latencyBadge.textContent = '22 ms';
    }, 150);

    setTimeout(() => {
      if (stage1) stage1.style.borderColor = '#10b981';
      if (stage2) stage2.style.borderColor = '#00f0ff';
      if (latencyBadge) latencyBadge.textContent = '140 ms';
    }, 600);

    setTimeout(() => {
      if (stage2) stage2.style.borderColor = '#10b981';
      if (stage3) stage3.style.borderColor = '#00f0ff';
      if (latencyBadge) latencyBadge.textContent = '224 ms';
    }, 1100);

    setTimeout(() => {
      if (stage3) stage3.style.borderColor = '#10b981';
      if (stage4) stage4.style.borderColor = '#00f0ff';
      if (latencyBadge) latencyBadge.textContent = '356 ms (Sub-Second Latency)';
      speakHindi('नमस्ते, इस उपकरण की कीमत और उपलब्धता बताइए');
    }, 1600);

    setTimeout(() => {
      if (stage4) stage4.style.borderColor = '#10b981';
      stopWave();
      isPlaying = false;
      playBtn.disabled = false;
      playBtn.textContent = 'Re-run Call Audio Simulation';
    }, 2800);
  });
}

// ==========================================
// 4. ECO-TRANSFORMERS BENCHMARK EXPLORER
// ==========================================
function initBenchmarkExplorer() {
  const tabs = document.querySelectorAll('.bench-model-tab');
  const co2El = document.getElementById('bench-co2');
  const speedEl = document.getElementById('bench-speed');
  const pplEl = document.getElementById('bench-ppl');

  if (!tabs.length) return;

  const data = {
    'falcon': { co2: '-58%', speed: '+56%', ppl: '14.2 ➔ 14.3 (<0.8%)' },
    'neo':    { co2: '-54%', speed: '+51%', ppl: '13.1 ➔ 13.2 (<0.8%)' },
    'opt':    { co2: '-56%', speed: '+53%', ppl: '12.8 ➔ 12.9 (<0.7%)' },
    'gpt2':   { co2: '-52%', speed: '+49%', ppl: '18.5 ➔ 18.7 (<1.0%)' }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const model = tab.getAttribute('data-model');
      const val = data[model] || data['falcon'];

      if (co2El) co2El.textContent = val.co2;
      if (speedEl) speedEl.textContent = val.speed;
      if (pplEl) pplEl.textContent = val.ppl;
    });
  });
}

// ==========================================
// 5. MODAL LOGIC
// ==========================================
function initModals() {
  const modal = document.getElementById('resume-modal');
  window.openResumeModal = function() {
    if (modal) modal.classList.add('active');
  };
  window.closeResumeModal = function() {
    if (modal) modal.classList.remove('active');
  };

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeResumeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResumeModal();
  });
}

// ==========================================
// 6. TOGGLE EXPANDABLE TOP 10 REPOSITORIES
// ==========================================
function initMoreReposToggle() {
  const toggleBtn = document.getElementById('toggle-more-repos-btn');
  const container = document.getElementById('more-repos-container');

  if (!toggleBtn || !container) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = container.style.display === 'none' || container.style.display === '';

    if (isHidden) {
      container.style.display = 'grid';
      toggleBtn.innerHTML = `
        <i class="fa-brands fa-github" style="color: var(--accent-cyan);"></i>
        <span>Show Less Repositories</span>
        <i class="fa-solid fa-chevron-up" style="font-size: 0.8rem; margin-left: 0.5rem;"></i>
      `;
    } else {
      container.style.display = 'none';
      toggleBtn.innerHTML = `
        <i class="fa-brands fa-github" style="color: var(--accent-cyan);"></i>
        <span>Explore 7 More Engineering Repositories (Top 10)</span>
        <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; margin-left: 0.5rem;"></i>
      `;
      toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
