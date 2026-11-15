/**
 * SIVANESAN B — PROFESSIONAL PORTFOLIO CONTROLLER
 * Lightweight, robust, and clean interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initResumeModal();
  initCopyActions();
  initNavbarScroll();
});

// 1. Resume Modal
function initResumeModal() {
  const modal = document.getElementById('resume-modal');

  window.openResumeModal = function() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeResumeModal = function() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
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

// 2. Clipboard Copy Actions & Toast
function initCopyActions() {
  // BibTeX Copy
  const citeBtn = document.getElementById('btn-copy-cite');
  if (citeBtn) {
    const bibtex = `@inproceedings{sivanesan2025ecotransformers,
  title={Eco-Transformers: Carbon-Efficient and Accelerated Inference through Self-Pruning and Activation Freezing in Large Language Models},
  author={Sivanesan, B. and Shriaarthy, E. and Sangeetha, S. and Niranjana, R. S. and Rohini, R. and Vijayalakshmi, N.},
  booktitle={Third International Conference on Next Generation Computing Systems (IEEE ICNGCS 2025)},
  year={2025},
  month={August},
  publisher={IEEE},
  doi={10.1109/ICNGCS64900.2025.11183217}
}`;

    citeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibtex).then(() => {
        showToast('✓ IEEE BibTeX Citation copied to clipboard!');
      }).catch(() => {
        showToast('Citation copied!');
      });
    });
  }

  // Email Copy
  const emailBtn = document.getElementById('btn-copy-email');
  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('apsiva69@gmail.com').then(() => {
        showToast('✓ Email apsiva69@gmail.com copied to clipboard!');
      });
    });
  }
}

// 3. Toast Notifications
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
  }, 3000);
}

// 4. Navbar Scroll Shadow
function initNavbarScroll() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.style.borderColor = 'rgba(255, 255, 255, 0.16)';
      nav.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
    } else {
      nav.style.borderColor = 'var(--border-subtle)';
      nav.style.boxShadow = 'none';
    }
  });
}
