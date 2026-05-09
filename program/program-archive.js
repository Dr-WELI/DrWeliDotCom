/* program-archive.js
   Behavior layer for /program/* archive subpages.
   Pairs with program-archive.css.
   ------------------------------------------------------------ */

(function () {
  'use strict';

  /* ---------- Live local clock in utility ribbon -------------- */
  const clockEl = document.getElementById('archiveClock') || document.getElementById('siteClock');
  if (clockEl) {
    let tzLabel = 'LOCAL';
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const parts = tz.split('/');
      tzLabel = (parts[parts.length - 1] || tz).replace(/_/g, ' ').toUpperCase();
    } catch (e) { /* fallback */ }

    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const d = new Date();
      clockEl.textContent =
        pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '  ' + tzLabel;
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

    // Only show on real interactive links (not on info-only cards)
    document.querySelectorAll(
      'a.archive-hero-format-chip, a.site-audience-tile, a.archive-hero-cta, ' +
      'a.archive-index-entry, a.archive-format, a.archive-era, a.btn-cta'
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
