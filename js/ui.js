/* UI controls: drawer, modal, tabs, accordion, toasts */
window.B2D = window.B2D || {};

(function () {
  const toasts = [];
  let toastContainer;

  function ensureToastContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
  }

  function toast(message, options = {}) {
    ensureToastContainer();
    const toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    toastEl.innerHTML = `<strong>${options.title || 'B2D KITCHEN'}</strong><span>${message}</span>`;
    toastContainer.appendChild(toastEl);
    toasts.push(toastEl);
    setTimeout(() => {
      toastEl.classList.add('fade-out');
      toastEl.addEventListener('transitionend', () => toastEl.remove(), { once: true });
    }, options.duration || 3600);
  }

  function bindTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(tablist => {
      const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const controls = tab.getAttribute('aria-controls');
          tabs.forEach(t => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
          tabs.forEach(t => document.getElementById(t.getAttribute('aria-controls')).hidden = t !== tab);
          document.getElementById(controls).hidden = false;
        });
      });
    });
  }

  function bindAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(accordion => {
      accordion.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
          const expanded = button.getAttribute('aria-expanded') === 'true';
          button.setAttribute('aria-expanded', String(!expanded));
          const panel = document.getElementById(button.getAttribute('aria-controls'));
          if (panel) panel.hidden = expanded;
        });
      });
    });
  }

  function bindDrawers() {
    document.querySelectorAll('[data-drawer-target]').forEach(trigger => {
      const targetId = trigger.getAttribute('data-drawer-target');
      const drawer = document.getElementById(targetId);
      if (!drawer) return;
      trigger.addEventListener('click', () => {
        drawer.toggleAttribute('open');
        drawer.querySelector('[data-close]')?.focus();
      });
      drawer.querySelectorAll('[data-close]').forEach(closeButton => {
        closeButton.addEventListener('click', () => drawer.removeAttribute('open'));
      });
      drawer.addEventListener('click', event => {
        if (event.target === drawer) {
          drawer.removeAttribute('open');
        }
      });
    });
  }

  function bindModals() {
    document.querySelectorAll('[data-modal-target]').forEach(trigger => {
      const targetId = trigger.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (!modal) return;
      trigger.addEventListener('click', () => {
        modal.setAttribute('open', '');
        modal.querySelector('[data-close]')?.focus();
      });
      modal.querySelectorAll('[data-close]').forEach(closeButton => {
        closeButton.addEventListener('click', () => modal.removeAttribute('open'));
      });
      modal.addEventListener('click', event => {
        if (event.target === modal) {
          modal.removeAttribute('open');
        }
      });
    });
  }

  function bindQuantitySteppers() {
    document.querySelectorAll('[data-stepper]').forEach(stepper => {
      const input = stepper.querySelector('input');
      const minus = stepper.querySelector('[data-step="-1"]');
      const plus = stepper.querySelector('[data-step="1"]');
      minus?.addEventListener('click', () => {
        const value = Math.max(Number(input.value) - 1, Number(input.min) || 1);
        input.value = value;
        input.dispatchEvent(new Event('change'));
      });
      plus?.addEventListener('click', () => {
        const value = Math.min(Number(input.value) + 1, Number(input.max) || 99);
        input.value = value;
        input.dispatchEvent(new Event('change'));
      });
    });
  }

  window.B2D.ui = {
    init() {
      bindTabs();
      bindAccordions();
      bindDrawers();
      bindModals();
      bindQuantitySteppers();
    },
    toast
  };
})();
