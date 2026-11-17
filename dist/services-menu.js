(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards = [...document.querySelectorAll("[data-menu-card]")];
  const booking = document.querySelector(".menu-booking");
  const jump = document.querySelector(".menu-jump__track");
  const links = [...document.querySelectorAll(".menu-jump a")];
  const revealTargets = [...cards, booking].filter(Boolean);
  let currentHref = "";

  revealTargets.forEach((element) => element.setAttribute("data-menu-reveal", ""));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  const linkForCard = (card) => {
    if (!card) return null;
    return `#${card.id}`;
  };

  const updateCatalogState = () => {
    if (!cards.length) return;

    const marker = window.innerHeight * 0.36;
    const activeCard = cards.reduce((closest, card) => {
      const distance = Math.abs(card.getBoundingClientRect().top - marker);
      return !closest || distance < closest.distance ? { card, distance } : closest;
    }, null)?.card;

    const activeHref = linkForCard(activeCard);
    links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === activeHref));
    if (activeHref && activeHref !== currentHref) {
      currentHref = activeHref;
      const activeLink = links.find((link) => link.getAttribute("href") === activeHref);
      if (activeLink && jump && jump.scrollWidth > jump.clientWidth) {
        const left = activeLink.offsetLeft - (jump.clientWidth - activeLink.offsetWidth) / 2;
        jump.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
      }
    }

    const firstTop = cards[0].offsetTop;
    const last = cards[cards.length - 1];
    const catalogSpan = Math.max(1, last.offsetTop + last.offsetHeight - firstTop - window.innerHeight * 0.35);
    const progress = Math.min(1, Math.max(0, (window.scrollY - firstTop + window.innerHeight * 0.45) / catalogSpan));
    jump?.style.setProperty("--menu-progress", progress.toFixed(4));
  };

  let ticking = false;
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateCatalogState();
      ticking = false;
    });
  };

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((item) => item.classList.toggle("is-active", item === link));
    });
  });

  updateCatalogState();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
})();
