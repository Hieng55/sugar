(() => {
  'use strict';

  const loader = document.getElementById('sugarLoader');
  if (!loader) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const startedAt = performance.now();
  const minimumTime = reducedMotion ? 120 : 900;
  const maximumTime = 2800;
  const exitTime = reducedMotion ? 20 : 950;
  let dismissed = false;

  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;

    const elapsed = performance.now() - startedAt;
    window.setTimeout(() => {
      loader.classList.add('is-hidden');
      loader.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('sugar-loader-active');
      window.setTimeout(() => loader.remove(), exitTime);
    }, Math.max(0, minimumTime - elapsed));
  };

  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss, { once: true });
  }

  window.setTimeout(dismiss, maximumTime);
})();
