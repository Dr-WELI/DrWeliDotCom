/* =========================================================
   HOME HERO — cinematic showreel + marquee + button mouse fx
   ========================================================= */

(function () {

  /* ---------- SHOWREEL: cross-fade + glitch ----------------
     Activate the next slide BEFORE starting the glitch on the
     current one, so the chromatic flash never exposes grey.
     ---------------------------------------------------------- */
  const slides = document.querySelectorAll('.editorial-slide');
  if (slides.length > 1) {
    let current = 0;

    function showSlide(next) {
      // 1. Bring next slide visible underneath
      slides[next].classList.add('is-active');

      // 2. Glitch the current slide on top
      slides[current].classList.add('is-transitioning');

      // 3. After the glitch, retire the current slide
      setTimeout(() => {
        slides[current].classList.remove('is-active', 'is-transitioning');
        current = next;
      }, 600);
    }

    setInterval(() => {
      const next = (current + 1) % slides.length;
      showSlide(next);
    }, 5000);
  }

  /* ---------- MARQUEE: steady continuous loop ---------------
     The previous scroll-modifier was restarting the CSS
     animation on every scroll event, breaking the loop.
     Removed entirely. The animation is purely CSS now.
     ---------------------------------------------------------- */
  // (intentionally empty — see CSS keyframes heroMarquee)

  /* ---------- FRAME COUNTER (HUD micro-detail) -------------- */
  const frameEl = document.getElementById('heroHudFrame');
  if (frameEl) {
    let f = 0;
    setInterval(() => {
      f = (f + 1) % 10000;
      frameEl.textContent = 'FRM ' + String(f).padStart(4, '0');
    }, 80);  // ~12.5 fps — matches the cinematic feel
  }

  /* ---------- BUTTON LIGHT SWEEP (hover position track) ----- */
  document.querySelectorAll('.hero-metal-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--mx', x + '%');
      btn.style.setProperty('--my', y + '%');
    });
  });

})();
