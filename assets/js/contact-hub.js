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
    .contact-socials{margin-top:18px;display:grid;gap:8px}
    .contact-socials-copy{font-size:.88rem;line-height:1.45;max-width:42ch}
    .contact-social-grid{gap:8px}
    .contact-social-link{min-height:34px;padding:0 10px;gap:7px;font-size:.8rem}
    .contact-social-icon{width:18px;height:18px;display:inline-block;border-radius:5px;background-size:18px 18px;background-position:center;background-repeat:no-repeat;overflow:hidden;flex:0 0 18px}
    .contact-social-icon svg{display:none}
    .contact-social-link[href*="youtube"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=youtube.com&sz=64')}
    .contact-social-link[href*="facebook"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=facebook.com&sz=64')}
    .contact-social-link[href*="instagram"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=instagram.com&sz=64')}
    .contact-social-link[href*="tiktok"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=tiktok.com&sz=64')}
    .contact-social-link[href*="twitter"] .contact-social-icon{background-image:url('https://www.google.com/s2/favicons?domain=x.com&sz=64')}
    .contact-form:has(input[name="intent"][value="music"]:checked) #engagementFields{display:none!important}
    .contact-form:has(input[name="intent"][value="engagement"]:checked) #musicFields{display:none!important}
  `;
  document.head.appendChild(style);

  const intentRadios = document.querySelectorAll('input[name="intent"]');
  const musicBlock = document.getElementById('musicFields');
  const engagementBlock = document.getElementById('engagementFields');
  const preview = document.getElementById('contactPreview');

  function setIntent(value){
    if (musicBlock) musicBlock.hidden = value !== 'music';
    if (engagementBlock) engagementBlock.hidden = value !== 'engagement';
    if (preview) preview.textContent = value ? 'You are enquiring about ' + value : 'Select a direction to tailor the enquiry';
  }

  intentRadios.forEach(r => {
    r.addEventListener('change', () => {
      document.querySelectorAll('.contact-choice').forEach(c => c.classList.remove('is-selected'));
      r.closest('.contact-choice')?.classList.add('is-selected');
      setIntent(r.value);
    });
  });

  setIntent('');
});
