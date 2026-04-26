document.addEventListener('DOMContentLoaded', () => {
  const fence = String.fromCharCode(96, 96, 96);
  if (document.body.innerHTML.includes(fence)) {
    document.body.innerHTML = document.body.innerHTML.split(fence).join('');
  }

  const socials = document.querySelector('.contact-socials');
  const copyPanel = document.querySelector('.contact-copy');
  if (socials && copyPanel && socials.parentElement !== copyPanel) {
    copyPanel.appendChild(socials);
  }

  document.querySelectorAll('.contact-intro, .contact-socials-copy').forEach(el => {
    el.textContent = el.textContent.replaceAll('—', '-').replace(/\.$/, '');
  });

  const style = document.createElement('style');
  style.textContent = `
    .contact-social-link{justify-content:center;width:36px;height:36px;padding:0}
    .contact-social-icon{width:18px;height:18px;display:inline-block;border-radius:5px;background-size:18px 18px;background-position:center;background-repeat:no-repeat}
    .contact-social-link[href*="youtube"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=youtube.com&sz=64')}
    .contact-social-link[href*="facebook"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=facebook.com&sz=64')}
    .contact-social-link[href*="instagram"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=instagram.com&sz=64')}
    .contact-social-link[href*="tiktok"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=tiktok.com&sz=64')}
    .contact-social-link[href*="twitter"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=x.com&sz=64')}
    .contact-social-link[href*="linkedin"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=linkedin.com&sz=64')}
  `;
  document.head.appendChild(style);

  const form = document.querySelector('.contact-form');
  let intentHidden = form.querySelector('input[name="intent_hidden"]');
  if (!intentHidden) {
    intentHidden = document.createElement('input');
    intentHidden.type = 'hidden';
    intentHidden.name = 'intent_hidden';
    form.appendChild(intentHidden);
  }

  const intentRadios = document.querySelectorAll('input[name="intent"]');
  const musicBlock = document.getElementById('musicFields');
  const engagementBlock = document.getElementById('engagementFields');

  function toggleBlock(block, active) {
    if (!block) return;
    block.hidden = !active;
    block.querySelectorAll('input, select, textarea').forEach(el => {
      el.disabled = !active;
    });
  }

  function setIntent(value) {
    toggleBlock(musicBlock, value === 'music');
    toggleBlock(engagementBlock, value === 'engagement');
    intentHidden.value = value || '';
  }

  intentRadios.forEach(r => {
    r.addEventListener('change', () => {
      document.querySelectorAll('.contact-choice').forEach(c => c.classList.remove('is-selected'));
      r.closest('.contact-choice')?.classList.add('is-selected');
      setIntent(r.value);
    });
  });

  // initial state
  setIntent('');
});