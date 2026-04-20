const heroGlitchBlocks = document.getElementById("heroGlitchBlocks");
const heroGlitchReel = document.getElementById("editorialReel");

if (heroGlitchBlocks && heroGlitchReel) {
  function spawnHeroGlitchBlock() {
    const block = document.createElement("span");
    block.className = "hero-glitch-block";

    block.style.width = `${20 + Math.random() * 100}px`;
    block.style.left = `${Math.random() * 90}%`;
    block.style.top = `${Math.random() * 95}%`;

    heroGlitchBlocks.appendChild(block);

    setTimeout(() => block.remove(), 1000);
  }

  setInterval(() => {
    spawnHeroGlitchBlock();
  }, 300);

  setInterval(() => {
    heroGlitchReel.classList.add("is-glitching");
    setTimeout(() => {
      heroGlitchReel.classList.remove("is-glitching");
    }, 150);
  }, 3000);
}
