/* program-archive.js
   Behavior layer for /program/* archive subpages.
   Pairs with program-archive.css.
   ------------------------------------------------------------ */

(function () {
  'use strict';

  /* ---------- Live clock in utility ribbon -------------------- */
  const clockEl = document.getElementById('archiveClock');
  if (clockEl) {
    const tick = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      clockEl.textContent =
        pad(d.getUTCHours()) + ':' +
        pad(d.getUTCMinutes()) + ':' +
        pad(d.getUTCSeconds()) + ' UTC';
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Reveal on scroll ------------------------------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(
      '.archive-section-head, .archive-section-title, .archive-section-meta, ' +
      '.archive-format, .archive-index-col, .archive-outcomes, .archive-proof-item, ' +
      '.archive-dossier-cell'
    ).forEach((el) => {
      el.classList.add('archive-reveal');
      io.observe(el);
    });
  } else {
    // graceful fallback
    document.querySelectorAll('.archive-reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Hero subtle parallax --------------------------- */
  const hero = document.querySelector('.archive-hero');
  if (hero && window.matchMedia('(pointer:fine)').matches) {
    const bg = hero.querySelector('.archive-hero-bg');
    const glow = hero.querySelector('.archive-hero-bg .glow');
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (glow) glow.style.transform = 'translate(' + (x * -24) + 'px, ' + (y * -16) + 'px)';
      if (bg) bg.style.backgroundPosition = (50 + x * 6) + '% ' + (50 + y * 4) + '%';
    });
    hero.addEventListener('mouseleave', () => {
      if (glow) glow.style.transform = '';
      if (bg) bg.style.backgroundPosition = '';
    });
  }

  /* ---------- Custom cursor follower on interactive cards ---- */
  if (window.matchMedia('(pointer:fine)').matches) {
    const cursor = document.createElement('div');
    cursor.style.cssText = [
      'position:fixed', 'top:0', 'left:0',
      'pointer-events:none', 'z-index:200',
      'font-family:ui-monospace,Menlo,monospace',
      'font-size:10px', 'letter-spacing:.2em', 'text-transform:uppercase',
      'color:var(--accent,#9E3A43)', 'opacity:0',
      'transition:opacity 200ms ease',
      'white-space:nowrap', 'transform:translate(14px,14px)',
      'font-weight:700'
    ].join(';');
    cursor.textContent = '→ open';
    document.body.appendChild(cursor);

    document.querySelectorAll(
      '.archive-index-entry, .archive-format, .archive-era, .archive-proof-frame'
    ).forEach((el) => {
      el.addEventListener('mouseenter', () => { cursor.style.opacity = 1; });
      el.addEventListener('mouseleave', () => { cursor.style.opacity = 0; });
    });
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
  }

  /* ---------- Era click — visual emphasis -------------------- */
  document.querySelectorAll('.archive-era').forEach((era) => {
    era.addEventListener('click', () => {
      document.querySelectorAll('.archive-era').forEach((e) => e.classList.remove('is-active'));
      era.classList.add('is-active');
    });
  });

})();
