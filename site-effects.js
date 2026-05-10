/* site-effects.js — site-wide motion & interaction patterns
   - reveal-on-scroll for cards / sections
   - title slide-up on load (.site-title-reveal)
   - hero parallax glow (.site-hero-parallax)
   - cursor follower for real <a> links inside .site-cursor-zone
   Loads on every page (academic, media, music, enquire, home). Fails silent if elements missing. */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Reveal on scroll --------------------------- */
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    // Auto-tag common card/section selectors so existing pages get the effect for free
    var autoTargets = document.querySelectorAll(
      '.site-card, .site-card-grid > *, ' +
      '.site-section-head, .archive-format, .archive-theme-card, .archive-index-col, ' +
      '.media-story-card, .media-lens > article, .media-why > div, ' +
      '.appointment-card, .research-node, .research-hub, .flagship-project-card, ' +
      '.music-release-card, .music-press-item, ' +
      '.contact-side-card, .contact-choice'
    );
    autoTargets.forEach(function (el) {
      if (!el.classList.contains('site-no-reveal')) {
        el.classList.add('site-reveal');
        io.observe(el);
      }
    });

    // Also observe anything explicitly tagged
    document.querySelectorAll('.site-reveal').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.site-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- 2. Title slide-up on load --------------------- */
  if (!prefersReduced) {
    document.querySelectorAll('.site-title-reveal').forEach(function (el) {
      // wrap each word so they stagger
      var text = el.textContent.trim();
      var words = text.split(/\s+/);
      el.innerHTML = words.map(function (w, i) {
        return '<span style="display:inline-block;transform:translateY(110%);animation:siteTitleUp 1100ms cubic-bezier(.7,.05,.2,1) forwards ' + (200 + i * 90) + 'ms;">' + w + '</span>';
      }).join(' ');
      el.style.overflow = 'hidden';
      el.style.display = 'inline-block';
    });
  }

  /* ---------- 3. Hero parallax (subtle mouse-tracking glow) - */
  if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.site-hero-parallax').forEach(function (hero) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width - 0.5).toFixed(3);
        var y = ((e.clientY - r.top) / r.height - 0.5).toFixed(3);
        hero.style.setProperty('--px', x);
        hero.style.setProperty('--py', y);
      });
      hero.addEventListener('mouseleave', function () {
        hero.style.setProperty('--px', '0');
        hero.style.setProperty('--py', '0');
      });
    });
  }

  /* ---------- 4. Cursor follower (only over real links) ----- */
  if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    var cursor = document.createElement('div');
    cursor.style.cssText = [
      'position:fixed', 'top:0', 'left:0',
      'pointer-events:none', 'z-index:9999',
      'font-family:ui-monospace,Menlo,monospace',
      'font-size:10px', 'letter-spacing:.2em', 'text-transform:uppercase',
      'color:#9E3A43', 'opacity:0',
      'transition:opacity 200ms ease',
      'white-space:nowrap', 'transform:translate(14px,14px)',
      'font-weight:700'
    ].join(';');
    cursor.textContent = '→ open';
    document.body.appendChild(cursor);

    // Only show on real <a> elements inside opted-in zones
    var triggers = document.querySelectorAll(
      '.site-cursor-zone a, ' +
      '.site-card a, ' +
      '.media-story-card[data-url], ' +
      '.contact-social-link, ' +
      'a.site-audience-tile, a.archive-hero-format-chip, a.archive-hero-cta, a.btn-cta'
    );
    triggers.forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.style.opacity = 1; });
      el.addEventListener('mouseleave', function () { cursor.style.opacity = 0; });
    });
    document.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
  }

})();
