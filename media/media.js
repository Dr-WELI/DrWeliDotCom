const cards=document.querySelectorAll('.media-story-card');
const filters=document.querySelectorAll('.media-filter');
filters.forEach(btn=>{
 btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('is-active'));
  btn.classList.add('is-active');
  const f=btn.dataset.filter;
  cards.forEach(c=>{
    c.style.display=(f==='all'||c.dataset.type===f)?'flex':'none';
  });
 });
});

document.querySelectorAll('.story-open').forEach(btn=>{
 btn.addEventListener('click',e=>{
  const card=e.target.closest('.media-story-card');
  window.open(card.dataset.url,'_blank');
 });
});

const reveals=document.querySelectorAll('.reveal-media');
const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}})
},{threshold:.2});
reveals.forEach(el=>observer.observe(el));
