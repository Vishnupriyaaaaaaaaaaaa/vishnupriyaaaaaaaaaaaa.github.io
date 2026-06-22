(function () {
  
  const revealEls = document.querySelectorAll(
    ".section-head, .about-text, .about-stats, .skill-block, .work-card, .cert-list li, .contact-lede, .contact-grid"
  );

  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  // Active nav link highlight based on scroll position
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll(".section, .hero");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((sec) => {
    if (sec.id) navObserver.observe(sec);
  });
})();
