document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(".reveal, .reveal-fade, .reveal-scale");

  if (!("IntersectionObserver" in window)) {
    // Fallback: just show everything if the browser can't observe
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
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
  }

  // ===== Service detail modal (photo gallery) =====
  const modal = document.getElementById("serviceModal");
  if (modal) {
    const modalMainImg = document.getElementById("modalMainImg");
    const modalThumbs = document.getElementById("modalThumbs");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const closeBtn = document.getElementById("modalCloseBtn");

    const openModal = (card) => {
      const images = [
        card.dataset.img1,
        card.dataset.img2,
        card.dataset.img3,
        card.dataset.img4,
        card.dataset.img5,
      ].filter(Boolean);

      const title = card.dataset.title || "";

      modalTitle.textContent = title;
      modalDesc.textContent = card.dataset.desc || "";

      modalThumbs.innerHTML = "";

      if (images.length) {
        modalMainImg.src = images[0];
        modalMainImg.alt = title;

        images.forEach((src, i) => {
          const thumb = document.createElement("div");
          thumb.className = "modal-thumb" + (i === 0 ? " active" : "");
          thumb.innerHTML = `<img src="${src}" alt="${title} - foto ${i + 1}">`;
          thumb.addEventListener("click", () => {
            modalMainImg.src = src;
            modalThumbs.querySelectorAll(".modal-thumb").forEach((t) => t.classList.remove("active"));
            thumb.classList.add("active");
          });
          modalThumbs.appendChild(thumb);
        });
      }

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