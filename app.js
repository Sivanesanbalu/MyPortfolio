/**
 * SIVANESAN B - PORTFOLIO INTERACTION CONTROLLER 2026
 * Neural Particle Canvas, Typewriter, Sound FX, Filters, and Command Palette
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypewriter();
  initThemeToggle();
  initAudioFx();
  initCustomCursor();
  initSpotlightEffect();
  initProjectFilter();
  initBibtexCopy();
  initNavbarScroll();
  initMobileNav();
  initStatsCounter();
  initCommandPalette();
});

// ==========================================
// 1. NEURAL NETWORK CANVAS PARTICLES
// ==========================================
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 12000), 90);
  const maxDistance = 140;

  const mouse = { x: null, y: null, radius: 180 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      this.baseColor = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(139, 92, 246,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive force
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor + ' 0.8)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 2. TYPEWRITER EFFECT
// ==========================================
function initTypewriter() {
  const element = document.getElementById('typed-title');
  if (!element) return;

  const roles = [
    'AI/ML Engineer & Forward Deployed Engineer (FDE)',
    'Generative AI & Agentic Systems Architect',
    'IEEE-Published LLM Researcher (58% CO2 Cut)',
    'Multilingual Voice AI & Real-Time Translation Specialist',
    'Computer Vision & VLM Application Developer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const speed = 75;
  const delayBetweenRoles = 2000;

  function type() {
    const current = roles[roleIdx];

    if (!isDeleting) {
      element.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenRoles);
        return;
      }
    } else {
      element.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }

    setTimeout(type, isDeleting ? 40 : speed);
  }

  type();
}

// ==========================================
// 3. THEME TOGGLING (DARK / LIGHT)
// ==========================================
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('siva-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', stored);
  updateThemeIcon(stored);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('siva-theme', next);
      updateThemeIcon(next);
      playClickSound(520);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' 
      ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
  }
}

// ==========================================
// 4. SYNTHESIZED WEB AUDIO SOUND FX
// ==========================================
let audioCtx = null;
let soundEnabled = true;

function initAudioFx() {
  const soundToggle = document.getElementById('sound-toggle');

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.classList.toggle('muted', !soundEnabled);
      showToast(soundEnabled ? 'Sound FX Enabled' : 'Sound FX Muted');
      if (soundEnabled) playClickSound(640);
    });
  }

  // Play subtle feedback on button hovers
  document.querySelectorAll('button, .btn-cta, .btn-secondary, .filter-btn, .nav-links a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (soundEnabled) playSoftHoverSound();
    });
    el.addEventListener('click', () => {
      if (soundEnabled) playClickSound(480);
    });
  });
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playClickSound(freq = 440) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Audio policy ignore
  }
}

function playSoftHoverSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {}
}

// ==========================================
// 5. CUSTOM INTERACTIVE CURSOR
// ==========================================
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  if (!cursor || !dot) return;

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function render() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(render);
  }
  render();

  document.querySelectorAll('a, button, input, .project-card, .bento-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

// ==========================================
// 6. CARD MOUSE SPOTLIGHT TRACING
// ==========================================
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.bento-card, .project-card, .pub-hero-card, .timeline-content-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ==========================================
// 7. PROJECT FILTERING
// ==========================================
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projects.forEach(project => {
        const category = project.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          project.style.display = 'flex';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px) scale(0.96)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// ==========================================
// 8. BIBTEX CITATION COPY & TOAST
// ==========================================
function initBibtexCopy() {
  const citeBtn = document.getElementById('btn-copy-cite');
  if (!citeBtn) return;

  const bibtex = `@inproceedings{sivanesan2025ecotransformers,
  title={Eco-Transformers: Carbon-Efficient and Accelerated Inference through Self-Pruning and Activation Freezing in Large Language Models},
  author={Sivanesan, B. and Shriaarthy, E. and Sangeetha, S. and Niranjana, R. S. and Rohini, R. and Vijayalakshmi, N.},
  booktitle={Third International Conference on Next Generation Computing Systems (ICNGCS - 2025)},
  year={2025},
  month={August},
  publisher={IEEE},
  doi={10.1109/ICNGCS64900.2025.11183217}
}`;

  citeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(bibtex).then(() => {
      showToast('✓ IEEE BibTeX Citation Copied to Clipboard!');
      playClickSound(700);
    }).catch(() => {
      showToast('Citation copied!');
    });
  });

  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('apsiva69@gmail.com').then(() => {
        showToast('✓ Email apsiva69@gmail.com copied!');
      });
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================
// 9. NAVBAR SCROLL BLUR
// ==========================================
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
    if (typeof playClickSound === 'function') playClickSound(520);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    }
  });
}

// ==========================================
// 10. STATS COUNTER ANIMATION
// ==========================================
function initStatsCounter() {
  const stats = document.querySelectorAll('[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const prefix = entry.target.getAttribute('data-prefix') || '';
        const suffix = entry.target.getAttribute('data-suffix') || '';
        let current = 0;
        const step = target / 35;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            entry.target.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            entry.target.textContent = `${prefix}${Math.floor(current)}${suffix}`;
          }
        }, 30);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(s => observer.observe(s));
}

// ==========================================
// 11. COMMAND PALETTE (CMD + K)
// ==========================================
function initCommandPalette() {
  const palette = document.getElementById('cmd-palette');
  const input = document.getElementById('cmd-input');
  if (!palette || !input) return;

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      togglePalette();
    }
    if (e.key === 'Escape' && palette.classList.contains('open')) {
      palette.classList.remove('open');
    }
  });

  const closeBtn = document.getElementById('cmd-close');
  if (closeBtn) closeBtn.addEventListener('click', () => palette.classList.remove('open'));

  function togglePalette() {
    palette.classList.toggle('open');
    if (palette.classList.contains('open')) {
      input.value = '';
      input.focus();
    }
  }
}
