// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });
}

// Smooth scroll for same-page links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav?.classList.remove('show');
        toggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

<script>
  // AJAX submit for the POA form
  (function () {
    const form = document.getElementById('poa-form');
    const status = document.getElementById('poa-status');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Sending…';
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          form.reset();
          status.textContent = 'Thanks — I’ll reply shortly.';
        } else {
          status.textContent = 'Something went wrong. Please try again, or email weli@weli.live.';
        }
      } catch (err) {
        status.textContent = 'Network error. Please try again, or email weli@weli.live.';
      }
    });
  })();
</script>

// Year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
