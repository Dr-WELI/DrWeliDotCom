document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main .section');
  const hero = document.querySelector('.brochure-hero');

  if (hero) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.18;
      const x = (window.scrollY * 0.02);
      hero.style.setProperty('--hero-parallax', `${y}px`);
      hero.style.setProperty('--hero-tilt-x', `${x}px`);
      hero.style.setProperty('transform', `translateY(${Math.min(y * 0.08, 16)}px)`);
    }, { passive: true });

    document.addEventListener('mousemove', (event) => {
      const moveX = (event.clientX / window.innerWidth - 0.5) * 10;
      const moveY = (event.clientY / window.innerHeight - 0.5) * 10;
      hero.style.setProperty('--hero-mouse-x', `${moveX}px`);
      hero.style.setProperty('--hero-mouse-y', `${moveY}px`);
      hero.style.setProperty('--hero-bg-transform', `scale(1.06) translate(${moveX}px, ${moveY}px)`);
      hero.style.setProperty('--hero-overlay-opacity', '0.84');
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach((section) => observer.observe(section));
});
