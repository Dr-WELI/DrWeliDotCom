const toggle = document.getElementById('heroNavToggle');
const nav = document.getElementById('heroSiteNav');

if(toggle && nav){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', open);
  });
}
