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

  // ===== Service detail modal =====
  const modal = document.getElementById("serviceModal");
  if (modal) {
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeBtn = document.getElementById("modalCloseBtn");

    const openModal = (card) => {
      modalImg.src = card.dataset.img || "";
      modalImg.alt = card.dataset.title || "";
      modalTitle.textContent = card.dataset.title || "";
      modalDesc.textContent = card.dataset.desc || "";
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };

    document.querySelectorAll(".academy-card[data-title]").forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        openModal(card);
      });
    });

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".nav-toggle");

  if (!navbar || !toggle) return;

  const closeMenu = () => {
    navbar.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu navigasi");
  };

  toggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
  });

  navbar.querySelectorAll(".nav-links a, .contact-btn").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
});