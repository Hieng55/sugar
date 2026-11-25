(() => {
  'use strict';

  const mount = () => {
    if (document.querySelector('.sugar-discount-popup')) return;

    const popup = document.createElement('div');
    popup.className = 'sugar-discount-popup';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-modal', 'true');
    popup.setAttribute('aria-label', 'Sugar Nails discount offers');
    popup.innerHTML = `
      <div class="sugar-discount-popup__panel" role="document">
        <button class="sugar-discount-popup__close" type="button" aria-label="Close discount offers">&times;</button>
        <img
          class="sugar-discount-popup__image"
          src="/assets/sugar-nails-discount-poster.webp?v=20261125"
          alt="Sugar Nails discounts: 10 percent student discount on services over 30 dollars with valid student ID, 15 percent student birthday discount, and 10 percent local customer birthday discount."
          width="1254"
          height="1254"
          decoding="async"
          fetchpriority="high"
        >
      </div>`;

    const closeButton = popup.querySelector('.sugar-discount-popup__close');
    const previousFocus = document.activeElement;
    let closed = false;

    const close = () => {
      if (closed) return;
      closed = true;
      popup.classList.remove('is-open');
      document.body.classList.remove('sugar-discount-open');
      window.setTimeout(() => popup.remove(), 340);
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body) previousFocus.focus();
    };

    closeButton.addEventListener('click', close);
    popup.addEventListener('click', (event) => {
      if (event.target === popup) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !closed) close();
      if (event.key === 'Tab' && !closed) {
        event.preventDefault();
        closeButton.focus();
      }
    });

    document.body.appendChild(popup);

    const open = () => {
      document.body.classList.add('sugar-discount-open');
      window.requestAnimationFrame(() => popup.classList.add('is-open'));
      window.setTimeout(() => closeButton.focus(), 80);
      window.setTimeout(() => {
        if (!closed && !popup.contains(document.activeElement)) closeButton.focus();
      }, 1900);
    };

    if (document.readyState === 'complete') {
      open();
    } else {
      window.addEventListener('load', open, { once: true });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
