// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("show");
  });
}

// Smooth scroll for same-page links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId.length > 1) {
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        nav?.classList.remove("show");
        toggle?.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// Year in footer
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


// Editorial homepage reel
const editorialReel = document.getElementById("editorialReel");

if (editorialReel) {
  const slides = Array.from(editorialReel.querySelectorAll(".editorial-slide"));
  const prevBtn = document.getElementById("editorialPrev");
  const nextBtn = document.getElementById("editorialNext");

  let currentIndex = 0;
  let reelTimer = null;
  const interval = 5200;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);

      const img = slide.querySelector("img");
      if (img) {
        img.style.animation = "none";
        void img.offsetWidth;
        if (i === index) {
          img.style.animation = "heroKenBurns 7s ease-in-out forwards";
        }
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    reelTimer = window.setInterval(nextSlide, interval);
  }

  function stopAutoplay() {
    if (reelTimer) {
      window.clearInterval(reelTimer);
      reelTimer = null;
    }
  }

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    startAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    startAutoplay();
  });

  editorialReel.addEventListener("mouseenter", stopAutoplay);
  editorialReel.addEventListener("mouseleave", startAutoplay);
  editorialReel.addEventListener("focusin", stopAutoplay);
  editorialReel.addEventListener("focusout", startAutoplay);

  showSlide(0);
  startAutoplay();
}

// WELI music world interactions
const musicWorld = document.getElementById("musicWorld");
const musicCursorGlow = document.getElementById("musicCursorGlow");

if (musicWorld && musicCursorGlow) {
  const interactiveItems = musicWorld.querySelectorAll(".music-interactive");
  const orbs = musicWorld.querySelectorAll(".music-orb");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  function handlePointerMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    musicCursorGlow.style.opacity = "1";
  }

  function handlePointerLeave() {
    musicCursorGlow.style.opacity = "0";
  }

  document.addEventListener("pointermove", handlePointerMove);
  document.addEventListener("pointerleave", handlePointerLeave);

  interactiveItems.forEach((item) => {
    item.addEventListener("pointermove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      item.style.setProperty("--mx", `${x}px`);
      item.style.setProperty("--my", `${y}px`);
      item.classList.add("is-hovered");
    });

    item.addEventListener("pointerenter", () => {
      item.classList.add("is-hovered");
    });

    item.addEventListener("pointerleave", () => {
      item.classList.remove("is-hovered");
    });
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    musicCursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;

    if (!prefersReducedMotion && orbs.length) {
      orbs.forEach((orb, index) => {
        const factor = (index + 1) * 0.008;
        const offsetX = (mouseX - window.innerWidth / 2) * factor;
        const offsetY = (mouseY - window.innerHeight / 2) * factor;
        orb.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });
    }

    requestAnimationFrame(animateGlow);
  }

  requestAnimationFrame(animateGlow);
}
