document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal, .reveal-fade, .reveal-scale");

  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything if the browser can't observe
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  revealEls.forEach((el) => observer.observe(el));
});