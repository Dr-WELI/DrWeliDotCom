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

/* ============================================================================
   WELI 2026-06-21: 3D warp starfield (stars travelling toward the camera).
   Two mounts: (1) behind the mobile nav menu(s) .site-nav while open (.show),
   and (2) a fixed subtle backdrop on the music page. Self-contained; honours
   prefers-reduced-motion. Inline-styled canvases (no per-page CSS needed).
   ========================================================================== */
(function () {
  if (!window.requestAnimationFrame) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function makeWarp(container, opts) {
    opts = opts || {};
    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;z-index:' + (opts.z != null ? opts.z : 0) + ';' + (opts.opacity != null ? 'opacity:' + opts.opacity + ';' : '');
    if (opts.prepend && container.firstChild) container.insertBefore(canvas, container.firstChild);
    else container.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, cx = 0, cy = 0, stars = [], raf = null, running = false;
    var N = opts.count || 220, SPEED = opts.speed || 0.0062, COLOR = opts.color || '160,205,255';
    function size() {
      var r = container.getBoundingClientRect();
      w = opts.fullscreen ? window.innerWidth : (r.width || window.innerWidth);
      h = opts.fullscreen ? window.innerHeight : (r.height || window.innerHeight);
      cx = w / 2; cy = h / 2; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(s) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = Math.random() * 0.9 + 0.1; s.pz = s.z; return s; }
    function init() { stars = []; for (var i = 0; i < N; i++) stars.push(spawn({})); }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      var k = Math.max(w, h) * 0.72;
      for (var i = 0; i < N; i++) {
        var s = stars[i]; s.pz = s.z; s.z -= SPEED;
        if (s.z <= 0.02) { spawn(s); continue; }
        var sx = cx + (s.x / s.z) * k, sy = cy + (s.y / s.z) * k;
        if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) { spawn(s); continue; }
        var px = cx + (s.x / s.pz) * k, py = cy + (s.y / s.pz) * k, t = 1 - s.z;
        ctx.strokeStyle = 'rgba(' + COLOR + ',' + Math.min(0.85, t * 0.9 + 0.08) + ')';
        ctx.lineWidth = Math.max(0.5, t * 1.8);
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    }
    function drawStatic() { var k = Math.max(w, h) * 0.72; ctx.clearRect(0, 0, w, h); for (var i = 0; i < N; i++) { var s = stars[i]; var sx = cx + (s.x / s.z) * k, sy = cy + (s.y / s.z) * k; if (sx < 0 || sx > w || sy < 0 || sy > h) continue; ctx.fillStyle = 'rgba(' + COLOR + ',' + Math.min(0.7, 1 - s.z) + ')'; var z = Math.max(1, (1 - s.z) * 2); ctx.fillRect(sx, sy, z, z); } }
    function start() { size(); if (!stars.length) init(); if (reduce) { drawStatic(); return; } if (running) return; running = true; raf = requestAnimationFrame(frame); if (!opts.fullscreen) setTimeout(size, 380); }
    function stop() { running = false; if (raf) { cancelAnimationFrame(raf); raf = null; } if (ctx) ctx.clearRect(0, 0, w, h); }
    window.addEventListener('resize', function () { if (running || reduce) { size(); if (reduce) drawStatic(); } });
    return { start: start, stop: stop };
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('.site-nav'), function (nav) {
      if (getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
      nav.style.isolation = 'isolate';
      var warp = makeWarp(nav, { prepend: true, z: -1, count: 190 });
      if (nav.classList.contains('show')) warp.start();
      new MutationObserver(function () { if (nav.classList.contains('show')) warp.start(); else warp.stop(); })
        .observe(nav, { attributes: true, attributeFilter: ['class'] });
    });
    if (document.body.classList.contains('music-page')) {
      var host = document.createElement('div');
      host.setAttribute('aria-hidden', 'true');
      host.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
      document.body.insertBefore(host, document.body.firstChild);
      makeWarp(host, { z: 0, count: 240, speed: 0.0042, opacity: 0.6, color: '150,200,255', fullscreen: true }).start();
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
