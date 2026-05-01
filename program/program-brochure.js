document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main .section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.18 }
  );
  sections.forEach((section) => observer.observe(section));
});
