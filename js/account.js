/* Account area interactions */
window.B2D = window.B2D || {};

(function () {
  function initTabs() {
    const tabs = document.querySelector('[data-account-tabs]');
    if (!tabs) return;
    tabs.querySelectorAll('[role="tab"]').forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.querySelectorAll('[role="tab"]').forEach(t => t.setAttribute('aria-selected', 'false'));
        tab.setAttribute('aria-selected', 'true');
        const panelId = tab.getAttribute('aria-controls');
        tabs.querySelectorAll('[role="tabpanel"]').forEach(panel => panel.hidden = panel.id !== panelId);
      });
    });
  }

  function initAuthModals() {
    const loginButton = document.querySelector('[data-open-login]');
    const modal = document.getElementById('auth-modal');
    if (!loginButton || !modal) return;
    loginButton.addEventListener('click', () => modal.setAttribute('open', ''));
    modal.querySelector('[data-close]')?.addEventListener('click', () => modal.removeAttribute('open'));
    modal.querySelector('form')?.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const email = formData.get('email');
      localStorage.setItem('b2d:user', JSON.stringify({ email }));
      window.B2D.ui?.toast('Signed in successfully', { status: 'success' });
      modal.removeAttribute('open');
    });
  }

  function initLoyalty() {
    const badge = document.querySelector('[data-loyalty-progress]');
    const loyalty = window.B2D.data?.loyalty;
    if (!badge || !loyalty) return;
    const points = Number(localStorage.getItem('b2d:loyalty') || 2400);
    const nextTier = loyalty.tiers.find(tier => tier.threshold > points);
    badge.innerHTML = `
      <p><strong>${points.toLocaleString()} pts</strong> earned</p>
      <p class="muted">${nextTier ? `${(nextTier.threshold - points).toLocaleString()} pts to ${nextTier.name}` : 'Top tier unlocked!'}</p>
    `;
  }

  window.B2D.account = {
    init() {
      initTabs();
      initAuthModals();
      initLoyalty();
    }
  };
})();
