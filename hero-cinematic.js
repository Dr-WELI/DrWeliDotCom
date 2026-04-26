const slides = document.querySelectorAll('.editorial-slide');
const reel = document.getElementById('editorialReel');
let current = 0;

if (slides.length > 1) {
  const holdDuration = 5000;
  const glitchDuration = 260;

  setInterval(() => {
    reel?.classList.add('is-glitching-transition');
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');

    window.setTimeout(() => {
      reel?.classList.remove('is-glitching-transition');
    }, glitchDuration);
  }, holdDuration);
}

/* MARQUEE SPEED REACT TO SCROLL */
const track = document.getElementById('heroMarqueeTrack');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  if (!track) return;

  const y = window.scrollY;
  const delta = y - lastScroll;
  lastScroll = y;

  const speed = Math.min(Math.abs(delta) * 0.2, 6);
  track.style.animationDuration = `${24 - speed}s`;
});

/* BUTTON LIGHT SWEEP */
document.querySelectorAll('.hero-metal-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    btn.style.setProperty('--mx', x + '%');
    btn.style.setProperty('--my', y + '%');
  });
});
