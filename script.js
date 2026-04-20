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


// Homepage hero glitch reel
const editorialReel = document.getElementById("editorialReel");

if (editorialReel) {
  const slides = Array.from(editorialReel.querySelectorAll(".editorial-slide"));
  let currentIndex = 0;
  let reelTimer = null;
  let glitchLock = false;

  const holdDuration = 3400;
  const glitchDuration = 580;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
    currentIndex = index;
  }

  function glitchToNextSlide() {
    if (glitchLock || slides.length < 2) return;
    glitchLock = true;

    editorialReel.classList.add("is-glitching");

    window.setTimeout(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, 90);

    window.setTimeout(() => {
      editorialReel.classList.remove("is-glitching");
      glitchLock = false;
    }, glitchDuration);
  }

  function startAutoplay() {
    stopAutoplay();
    reelTimer = window.setInterval(glitchToNextSlide, holdDuration);
  }

  function stopAutoplay() {
    if (reelTimer) {
      window.clearInterval(reelTimer);
      reelTimer = null;
    }
  }

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

  if (!prefersReducedMotion) {
    const particlesWrap = document.createElement("div");
    particlesWrap.className = "music-particles";
    document.body.appendChild(particlesWrap);

    function spawnParticle() {
      const p = document.createElement("span");
      p.className = "music-particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.bottom = `${-10 + Math.random() * 20}px`;
      p.style.animationDuration = `${4 + Math.random() * 6}s`;
      p.style.animationDelay = `${Math.random() * 1.5}s`;
      p.style.opacity = `${0.15 + Math.random() * 0.35}`;
      p.style.transform = `scale(${0.6 + Math.random() * 1.8})`;
      particlesWrap.appendChild(p);

      window.setTimeout(() => {
        p.remove();
      }, 11000);
    }

    for (let i = 0; i < 18; i++) {
      window.setTimeout(spawnParticle, i * 260);
    }

    window.setInterval(spawnParticle, 420);
  }

  requestAnimationFrame(animateGlow);
}

// Homepage refinement interactions
const homeHero = document.querySelector(".home-hero-single");
const homeParticles = document.getElementById("homeParticles");
const homeOrbs = document.querySelectorAll(".home-orb");
const revealItems = document.querySelectorAll(".reveal-up, .reveal-card");
const reducedMotionHome = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

if (homeHero && !reducedMotionHome) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateHomeAtmosphere() {
    if (homeOrbs.length) {
      homeOrbs.forEach((orb, index) => {
        const factor = (index + 1) * 0.006;
        const offsetX = (mouseX - window.innerWidth / 2) * factor;
        const offsetY = (mouseY - window.innerHeight / 2) * factor;
        orb.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      });
    }

    requestAnimationFrame(animateHomeAtmosphere);
  }

  requestAnimationFrame(animateHomeAtmosphere);
}

if (homeParticles && !reducedMotionHome) {
  function spawnHomeParticle() {
    const p = document.createElement("span");
    p.className = "home-particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = `${-10 + Math.random() * 24}px`;
    p.style.animationDuration = `${5 + Math.random() * 7}s`;
    p.style.opacity = `${0.08 + Math.random() * 0.22}`;
    p.style.transform = `scale(${0.8 + Math.random() * 1.8})`;

    homeParticles.appendChild(p);

    window.setTimeout(() => {
      p.remove();
    }, 13000);
  }

  for (let i = 0; i < 16; i++) {
    window.setTimeout(spawnHomeParticle, i * 280);
  }

  window.setInterval(spawnHomeParticle, 650);
}
