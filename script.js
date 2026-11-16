(() => {
  "use strict";

  if (window.ScrollCraft) {
    window.ScrollCraft.mount(document.body);
  }

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const rail = document.querySelector("[data-services-rail]");
  const previousButton = document.querySelector("[data-services-prev]");
  const nextButton = document.querySelector("[data-services-next]");
  const progress = document.querySelector("[data-sugar-progress]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    mobileMenu.hidden = true;
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      mobileMenu.hidden = open;
    });

    mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  if (rail) {
    const cardStep = () => {
      const card = rail.querySelector(".service-card");
      return card ? card.getBoundingClientRect().width + 24 : rail.clientWidth * 0.8;
    };

    const updateProgress = () => {
      if (!progress) return;
      const max = rail.scrollWidth - rail.clientWidth;
      const ratio = max > 0 ? Math.min(1, Math.max(0, rail.scrollLeft / max)) : 0;
      const value = `${ratio * 100}%`;
      progress.parentElement.style.setProperty("--track", value);
    };

    previousButton?.addEventListener("click", () => rail.scrollBy({ left: -cardStep(), behavior: reduceMotion.matches ? "auto" : "smooth" }));
    nextButton?.addEventListener("click", () => rail.scrollBy({ left: cardStep(), behavior: reduceMotion.matches ? "auto" : "smooth" }));
    rail.addEventListener("scroll", updateProgress, { passive: true });

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    rail.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      dragging = true;
      startX = event.clientX;
      startScroll = rail.scrollLeft;
      rail.classList.add("is-dragging");
      rail.setPointerCapture(event.pointerId);
    });

    rail.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      rail.scrollLeft = startScroll - (event.clientX - startX);
    });

    const stopDragging = (event) => {
      if (!dragging) return;
      dragging = false;
      rail.classList.remove("is-dragging");
      if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId);
    };

    rail.addEventListener("pointerup", stopDragging);
    rail.addEventListener("pointercancel", stopDragging);
    updateProgress();
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
})();
