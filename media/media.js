const reveals=document.querySelectorAll('.reveal-media');
const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}})
},{threshold:.2});
reveals.forEach(el=>observer.observe(el));
