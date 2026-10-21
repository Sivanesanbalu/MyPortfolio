/**
 * SIVANESAN B — MINIMALIST ENGINEERING PORTFOLIO 2026
 * Pure Vanilla JavaScript • Zero 3D dependencies • Fast & Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initThemeToggle();
  initProjectFilter();
  initClipboardActions();
});

// ==========================================
// 1. STICKY HEADER BORDER ON SCROLL
// ==========================================
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ==========================================
// 2. MOBILE NAVIGATION MENU
// ==========================================
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });

  // Close when clicking any nav link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-header')) {
      navMenu.classList.remove('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    }
  });
}

// ==========================================
// 3. THEME TOGGLER (DARK / LIGHT)
// ==========================================
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('siva_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('siva_theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    const icon = themeBtn.querySelector('i');
    if (!icon) return;
    if (theme === 'light') {
      icon.className = 'fa-solid fa-sun';
      themeBtn.title = 'Switch to Dark Theme';
    } else {
      icon.className = 'fa-solid fa-moon';
      themeBtn.title = 'Switch to Light Theme';
    }
  }
}

// ==========================================
// 4. PROJECT CATEGORY FILTER
// ==========================================
function initProjectFilter() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectItems = document.querySelectorAll('.project-item');

  if (!filterPills.length || !projectItems.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      projectItems.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'flex';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// 5. CLIPBOARD ACTIONS (BIBTEX & EMAIL)
// ==========================================
function initClipboardActions() {
  // BibTeX Copy
  const citeBtn = document.getElementById('btn-copy-cite');
  if (citeBtn) {
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
        showToast('✓ IEEE BibTeX Citation Copied');
      }).catch(() => {
        showToast('Citation copied');
      });
    });
  }

  // Email Copy
  const copyEmailBtn = document.getElementById('btn-copy-email');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('apsiva69@gmail.com').then(() => {
        showToast('✓ Email apsiva69@gmail.com copied to clipboard');
      }).catch(() => {
        showToast('Email copied');
      });
    });
  }
}

// ==========================================
// 6. TOAST NOTIFICATION UTILITY
// ==========================================
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
  }, 2800);
}
