/* ============================================================
   M&I Junk Removal — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Modal ── */
  function initModal() {
    var overlay = document.getElementById('quoteModal');
    if (!overlay) return;
    var closeBtn = overlay.querySelector('.modal-close');

    // Fire after 1.5s if not already dismissed this session
    if (!sessionStorage.getItem('modalDismissed')) {
      setTimeout(function () {
        overlay.classList.add('open');
      }, 1500);
    }

    function closeModal() {
      overlay.classList.remove('open');
      sessionStorage.setItem('modalDismissed', '1');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // Open modal from any "GET FREE QUOTE" button with data-modal
    document.querySelectorAll('[data-modal="quote"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        overlay.classList.add('open');
      });
    });
  }

  /* ── Hamburger / Mobile Nav ── */
  function initHamburger() {
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ── Dropdown Nav ── */
  function initDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
      var btn = dropdown.querySelector('button');
      if (!btn) return;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.toggle('open');
        // Close siblings
        document.querySelectorAll('.nav-dropdown').forEach(function (other) {
          if (other !== dropdown) other.classList.remove('open');
        });
        btn.setAttribute('aria-expanded', isOpen);
      });
    });

    // Close all dropdowns on outside click
    document.addEventListener('click', function () {
      document.querySelectorAll('.nav-dropdown').forEach(function (d) {
        d.classList.remove('open');
      });
    });
  }

  /* ── FAQ Accordion ── */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(function (i) {
          i.classList.remove('open');
        });
        // Toggle clicked
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  /* ── Sticky header shadow on scroll ── */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.5)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.4)';
      }
    }, { passive: true });
  }

  /* ── Contact / Modal form submission (basic) ── */
  function initForms() {
    document.querySelectorAll('.quote-form, .contact-form-el').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = form.querySelector('[type="submit"]');
        if (btn) {
          btn.textContent = 'Sent! We\'ll be in touch.';
          btn.disabled = true;
          btn.style.background = '#2a7a2a';
        }
      });
    });
  }

  /* ── Init all ── */
  document.addEventListener('DOMContentLoaded', function () {
    initModal();
    initHamburger();
    initDropdowns();
    initFAQ();
    initHeaderScroll();
    initForms();
  });
})();
