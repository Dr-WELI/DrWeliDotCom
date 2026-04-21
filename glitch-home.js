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

const phrasesA = [
  "LIVE PERFORMANCE",
  "MUSIC & MOVEMENT",
  "STAGE ENERGY"
];

const phrasesB = [
  "SCIENCE STORYTELLING",
  "CULTURAL CONNECTION",
  "PUBLIC ENGAGEMENT"
];

let i = 0;

setInterval(() => {
  i = (i + 1) % phrasesA.length;

  const a = document.getElementById("glitchCaptionA");
  const b = document.getElementById("glitchCaptionB");

  if(a && b){
    a.textContent = phrasesA[i];
    a.setAttribute("data-text", phrasesA[i]);

    b.textContent = phrasesB[i];
    b.setAttribute("data-text", phrasesB[i]);
  }
}, 2800);
