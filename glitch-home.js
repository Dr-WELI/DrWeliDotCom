/* =========================================================
   HOMEPAGE GLITCH FX
   - random micro-blocks that flick across the hero
   - periodic "is-glitching" state on the showreel
   - rotating HUD captions
   ========================================================= */

(function () {

  const heroGlitchBlocks = document.getElementById('heroGlitchBlocks');
  const heroGlitchReel = document.getElementById('editorialReel');

  if (heroGlitchBlocks && heroGlitchReel) {
    function spawnHeroGlitchBlock() {
      const block = document.createElement('span');
      block.className = 'hero-glitch-block';

      // Sometimes a thin sliver, sometimes a fat bar
      const tall = Math.random() < 0.18;
      const w = 20 + Math.random() * (tall ? 6 : 140);
      const h = tall ? (40 + Math.random() * 120) : (1 + Math.random() * 4);
      block.style.width = w + 'px';
      block.style.height = h + 'px';
      block.style.left = (Math.random() * 92) + '%';
      block.style.top = (Math.random() * 95) + '%';
      block.style.opacity = (0.55 + Math.random() * 0.45).toFixed(2);

      // Brand chromatic chance: ~25% chance the block is a brand-tone
      const r = Math.random();
      if (r < 0.10) block.style.background = '#ff5145';      // ruby
      else if (r < 0.20) block.style.background = '#7fb0ff'; // sapphire
      else if (r < 0.27) block.style.background = '#f0c66b'; // champagne

      heroGlitchBlocks.appendChild(block);
      setTimeout(() => block.remove(), 600 + Math.random() * 600);
    }

    // More frequent micro-glitches
    setInterval(spawnHeroGlitchBlock, 180);

    // Periodic full-frame glitch flash
    setInterval(() => {
      heroGlitchReel.classList.add('is-glitching');
      setTimeout(() => {
        heroGlitchReel.classList.remove('is-glitching');
      }, 180);
    }, 2400);
  }

  // Rotating HUD captions
  const phrasesA = [
    'LIVE PERFORMANCE',
    'MUSIC & MOVEMENT',
    'STAGE ENERGY',
    'WildWooHoo',
    'KANGAROO TIME'
  ];
  const phrasesB = [
    'SCIENCE STORYTELLING',
    'CULTURAL CONNECTION',
    'PUBLIC ENGAGEMENT',
    'NATURE × ART',
    'GLOBAL PRESS'
  ];

  let i = 0;
  setInterval(() => {
    i = (i + 1) % phrasesA.length;
    const a = document.getElementById('glitchCaptionA');
    const b = document.getElementById('glitchCaptionB');
    if (a && b) {
      a.textContent = phrasesA[i];
      a.setAttribute('data-text', phrasesA[i]);
      b.textContent = phrasesB[i];
      b.setAttribute('data-text', phrasesB[i]);
    }
  }, 2800);

})();
