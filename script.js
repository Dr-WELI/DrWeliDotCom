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

// Smooth scroll
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

// YEAR
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// =============================
// MUSIC STREAM SWITCHER
// =============================

const streamFrame = document.getElementById("musicStreamFrame");
const streamButtons = document.querySelectorAll(".music-stream-switch");
const playerTitle = document.getElementById("musicPlayerTitle");
const playerKicker = document.getElementById("musicPlayerKicker");
const playerDesc = document.getElementById("musicPlayerDescription");
const playerArt = document.getElementById("musicPlayerArt");
const playerSource = document.getElementById("musicPlayerSource");
const playerOpen = document.getElementById("musicPlayerOpen");
const mobileDockTitle = document.getElementById("musicMobileDockTitle");

if (streamFrame && streamButtons.length) {
  streamButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const embed = btn.dataset.streamEmbed;
      const source = btn.dataset.streamSource;
      const title = btn.dataset.streamTitle;
      const kicker = btn.dataset.streamKicker;
      const desc = btn.dataset.streamDescription;
      const art = btn.dataset.streamArt;
      const link = btn.dataset.streamLink;

      if (embed) streamFrame.src = embed;
      if (title && playerTitle) playerTitle.textContent = title;
      if (kicker && playerKicker) playerKicker.textContent = kicker;
      if (desc && playerDesc) playerDesc.textContent = desc;
      if (art && playerArt) playerArt.src = art;
      if (source && playerSource) playerSource.textContent = source;
      if (link && playerOpen) playerOpen.href = link;
      if (title && mobileDockTitle) mobileDockTitle.textContent = title;

      streamButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
}

// =============================
// EXISTING INTERACTIONS
// =============================

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

  document.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    musicCursorGlow.style.opacity = "1";
  });

  document.addEventListener("pointerleave", () => {
    musicCursorGlow.style.opacity = "0";
  });

  interactiveItems.forEach((item) => {
    item.addEventListener("pointermove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty("--mx", `${x}px`);
      item.style.setProperty("--my", `${y}px`);
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
