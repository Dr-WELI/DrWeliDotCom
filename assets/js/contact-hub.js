document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = document.body.innerHTML.replaceAll('```', '');

  document.querySelectorAll('.contact-intro, .contact-socials-copy').forEach(el => {
    el.textContent = el.textContent.replaceAll('—', ',').replace(/\.$/, '');
  });

  const icons = {
    YT: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C15 3.6 12 3.6 12 3.6s-3 0-6.3.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S2.2 9 2.2 10.8v1.7c0 1.8.2 3.6.2 3.6s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 6.1.3 6.1.3s3 0 6.3-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.2-1.8.2-3.6v-1.7c0-1.8-.2-3.6-.2-3.6ZM10.2 14.7V8.6l5.7 3.1-5.7 3Z"/></svg>',
    FB: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2.5V4.2C16.1 4.1 14.8 4 13.3 4 10.2 4 8 5.9 8 9.3V12H4.7v4.2H8V24h4.2v-7.8h3.3L16 12h-3.8V9.7c0-1.2.3-1.7 1.8-1.7Z"/></svg>',
    IG: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 2a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5-2.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"/></svg>',
    TT: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.7 2c.4 3 2.1 4.8 5.1 5v3.4c-1.7.2-3.2-.4-5-1.4v6.4c0 8.1-8.8 10.6-12.4 4.8-2.3-3.7-.9-10.2 6.5-10.4v3.6c-.6.1-1.3.2-1.8.5-1.7.8-2.6 2.4-2.1 4 .9 3 6 3.9 6-2V2h3.7Z"/></svg>',
    X: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.4 10.5 22.2 2h-1.9l-6.7 7.3L8.2 2H2l8.2 11-8.2 9h1.9l7.1-7.8 5.7 7.8H23l-8.6-11.5Zm-2.5 2.8-.8-1.1L4.5 3.4h2.8l5.3 7.5.8 1.1 6.9 9.7h-2.8l-5.6-8.4Z"/></svg>'
  };

  document.querySelectorAll('.contact-social-link').forEach(link => {
    const badge = link.querySelector('.contact-social-icon');
    if (!badge) return;
    const key = badge.textContent.trim();
    if (icons[key]) badge.innerHTML = icons[key];
  });

  const intentRadios = document.querySelectorAll('input[name="intent"]');
  const musicBlock = document.getElementById('musicFields');
  const engagementBlock = document.getElementById('engagementFields');
  const preview = document.getElementById('contactPreview');

  function updatePreview(){
    const intent = document.querySelector('input[name="intent"]:checked')?.value || '';
    if (preview) preview.textContent = intent ? 'You are enquiring about ' + intent : 'Select a direction to tailor the enquiry';
  }

  intentRadios.forEach(r => {
    r.addEventListener('change', () => {
      document.querySelectorAll('.contact-choice').forEach(c => c.classList.remove('is-selected'));
      r.closest('.contact-choice')?.classList.add('is-selected');
      if (musicBlock) musicBlock.hidden = false;
      if (engagementBlock) engagementBlock.hidden = r.value === 'music';
      updatePreview();
    });
  });

  updatePreview();
});
