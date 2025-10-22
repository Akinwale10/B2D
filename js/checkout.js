/* Checkout stepper UI */
window.B2D = window.B2D || {};

(function () {
  function initStepper() {
    const stepper = document.querySelector('[data-checkout-steps]');
    if (!stepper) return;
    const steps = Array.from(stepper.querySelectorAll('[data-step]'));
    let current = 0;

    function goTo(index) {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, stepIndex) => {
        step.toggleAttribute('data-active', stepIndex === current);
        step.querySelector('[data-step-panel]').hidden = stepIndex !== current;
        step.querySelector('[data-step-indicator]').setAttribute('aria-current', stepIndex === current ? 'step' : 'false');
      });
    }

    stepper.addEventListener('click', event => {
      const button = event.target.closest('[data-step-next], [data-step-prev]');
      if (!button) return;
      event.preventDefault();
      if (button.hasAttribute('data-step-next')) {
        goTo(current + 1);
      } else if (button.hasAttribute('data-step-prev')) {
        goTo(current - 1);
      }
    });

    goTo(0);
  }

  window.B2D.checkout = {
    init() {
      initStepper();
    }
  };
})();
