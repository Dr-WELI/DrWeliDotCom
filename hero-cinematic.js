const slides = document.querySelectorAll('.editorial-slide');
let current = 0;

setInterval(() => {
  slides[current].classList.remove('is-active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('is-active');
}, 5000);

/* MARQUEE SPEED REACT TO SCROLL */
const track = document.getElementById('heroMarqueeTrack');
let lastScroll = 0;

window.addEventListener('scroll', () => {
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
