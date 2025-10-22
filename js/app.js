/* Global app bootstrap */
window.B2D = window.B2D || {};

(function () {
  const state = {
    cart: JSON.parse(localStorage.getItem('b2d:cart') || '[]'),
    loyaltyPoints: Number(localStorage.getItem('b2d:loyalty') || 2400),
    recentSearches: JSON.parse(localStorage.getItem('b2d:recent-searches') || '[]'),
    user: JSON.parse(localStorage.getItem('b2d:user') || 'null')
  };

  function saveCart() {
    localStorage.setItem('b2d:cart', JSON.stringify(state.cart));
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  function addToCart(item) {
    const existing = state.cart.find(entry => entry.id === item.id && entry.variant === item.variant);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      state.cart.push({ ...item });
    }
    saveCart();
    window.B2D.ui?.toast(`${item.name} added to cart`, { status: 'success' });
    window.dispatchEvent(new CustomEvent('b2d:cart-updated', { detail: state.cart }));
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter(item => item.id !== id);
    saveCart();
    window.dispatchEvent(new CustomEvent('b2d:cart-updated', { detail: state.cart }));
  }

  function updateCartItem(id, quantity) {
    const target = state.cart.find(item => item.id === id);
    if (target) {
      target.quantity = Math.max(1, quantity);
      saveCart();
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
  }

  function initHeader() {
    const header = document.querySelector('header.site-header');
    if (!header) return;
    const loyaltyBadges = header.querySelectorAll('[data-loyalty-balance]');
    loyaltyBadges.forEach(badge => {
      badge.textContent = `${state.loyaltyPoints.toLocaleString()} pts`;
    });
  }

  function initSearch() {
    const searchInput = document.querySelector('[data-search-input]');
    if (!searchInput) return;
    searchInput.addEventListener('input', event => {
      window.dispatchEvent(new CustomEvent('b2d:search-query', { detail: event.target.value }));
    });
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
          state.recentSearches = [query, ...state.recentSearches.filter(item => item !== query)].slice(0, 6);
          localStorage.setItem('b2d:recent-searches', JSON.stringify(state.recentSearches));
          window.dispatchEvent(new CustomEvent('b2d:search-commit', { detail: query }));
        }
      }
    });
  }

  function initCookieBanner() {
    const banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;
    if (localStorage.getItem('b2d:cookies-consented')) {
      banner.hidden = true;
      return;
    }
    banner.hidden = false;
    banner.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        localStorage.setItem('b2d:cookies-consented', 'true');
        banner.hidden = true;
        window.B2D.ui?.toast('Thanks! We will use cookies to enhance your experience.', { status: 'info' });
      });
    });
  }

  function initNavigationToggle() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav-drawer]');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      nav.toggleAttribute('data-open');
      toggle.setAttribute('aria-expanded', nav.hasAttribute('data-open'));
    });
  }

  window.B2D.app = {
    state,
    addToCart,
    removeFromCart,
    updateCartItem,
    formatCurrency,
    init() {
      initHeader();
      initSearch();
      initCookieBanner();
      initNavigationToggle();
      saveCart();
      window.B2D.ui?.init();
      window.B2D.search?.init(state.recentSearches);
      window.B2D.menu?.init();
      window.B2D.cart?.init();
      window.B2D.checkout?.init();
      window.B2D.account?.init();
      window.B2D.tracking?.init();
      window.B2D.admin?.init();
      window.B2D.pwa?.init();
    }
  };

  document.addEventListener('DOMContentLoaded', () => window.B2D.app.init());
})();
