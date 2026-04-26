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

  // add linkedin if missing
  const grid = document.querySelector('.contact-social-grid');
  if (grid && !grid.querySelector('[href*="linkedin"]')) {
    const link = document.createElement('a');
    link.href = 'https://www.linkedin.com/in/dr-weli-weliton-menário-costa-21aa8b224/';
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'contact-social-link';
    link.innerHTML = '<span class="contact-social-icon"></span>';
    grid.appendChild(link);
  }

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

  // ensure engagement form has name + email
  const engagementGrid = document.querySelector('#engagementFields .contact-grid');
  if (engagementGrid && !engagementGrid.querySelector('input[type="email"]')) {
    const nameField = document.createElement('div');
    nameField.className = 'contact-field';
    nameField.innerHTML = '<label>Name</label><input type="text" required>';

    const emailField = document.createElement('div');
    emailField.className = 'contact-field';
    emailField.innerHTML = '<label>Email</label><input type="email" required>';

    engagementGrid.prepend(emailField);
    engagementGrid.prepend(nameField);
  }

  const intentRadios = document.querySelectorAll('input[name="intent"]');
  const musicBlock = document.getElementById('musicFields');
  const engagementBlock = document.getElementById('engagementFields');

  function setIntent(value){
    if (musicBlock) musicBlock.hidden = value !== 'music';
    if (engagementBlock) engagementBlock.hidden = value !== 'engagement';
  }

  intentRadios.forEach(r => {
    r.addEventListener('change', () => {
      setIntent(r.value);
    });
  });

  setIntent('');
});