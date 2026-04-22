const slides = document.querySelectorAll('.program-slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });
}

if (slides.length > 1) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
}

const toggleBtn = document.getElementById('programMenuToggle');
const menu = document.getElementById('programSecondaryMenu');

if (toggleBtn && menu) {
  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('is-open');
  });
}
