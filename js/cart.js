/* Cart drawer and page interactions */
window.B2D = window.B2D || {};

(function () {
  function calculateTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const delivery = subtotal >= 8000 ? 0 : 800;
    const total = subtotal - discount + delivery;
    return { subtotal, discount, delivery, total };
  }

  function renderCart(container, cart) {
    if (!container) return;
    if (cart.length === 0) {
      container.innerHTML = '<p>Your cart is empty. Explore the menu to add delicious meals.</p>';
      return;
    }
    const placeholderImage = window.B2D.data?.PLACEHOLDER_IMAGE || '';
    container.innerHTML = cart.map(item => `
      <article class="card stack-sm" data-cart-item="${item.id}">
        <div class="flex gap-md">
          <img src="${placeholderImage}" alt="${item.name}" width="96" height="96" style="border-radius: var(--radius-sm); object-fit: cover;"/>
          <div class="stack-sm">
            <h3>${item.name}</h3>
            <p class="muted">Variant: ${item.variant}</p>
            <div class="flex flex-between gap-md">
              <div class="quantity-stepper" data-stepper>
                <button type="button" data-step="-1" aria-label="Decrease quantity">-</button>
                <input type="number" value="${item.quantity}" min="1" aria-label="Quantity" />
                <button type="button" data-step="1" aria-label="Increase quantity">+</button>
              </div>
              <strong>${window.B2D.app?.formatCurrency(item.price * item.quantity)}</strong>
            </div>
            <button class="button button-ghost" data-remove="${item.id}">Remove</button>
          </div>
        </div>
      </article>
    `).join('');
    window.B2D.ui?.init();
    container.querySelectorAll('[data-remove]').forEach(button => {
      button.addEventListener('click', () => window.B2D.app?.removeFromCart(button.dataset.remove));
    });
    container.querySelectorAll('[data-cart-item]').forEach(itemEl => {
      const input = itemEl.querySelector('input');
      input.addEventListener('change', () => window.B2D.app?.updateCartItem(itemEl.dataset.cartItem, Number(input.value)));
    });
  }

  function updateSummary(summaryEl, cart) {
    if (!summaryEl) return;
    const totals = calculateTotals(cart);
    summaryEl.querySelector('[data-subtotal]').textContent = window.B2D.app?.formatCurrency(totals.subtotal);
    summaryEl.querySelector('[data-delivery]').textContent = totals.delivery === 0 ? 'Free' : window.B2D.app?.formatCurrency(totals.delivery);
    summaryEl.querySelector('[data-total]').textContent = window.B2D.app?.formatCurrency(totals.total);
  }

  function init() {
    const drawerContainer = document.querySelector('[data-cart-items]');
    const summary = document.querySelector('[data-cart-summary]');
    renderCart(drawerContainer, window.B2D.app?.state.cart || []);
    updateSummary(summary, window.B2D.app?.state.cart || []);

    window.addEventListener('b2d:cart-updated', event => {
      renderCart(drawerContainer, event.detail);
      updateSummary(summary, event.detail);
    });

    document.querySelectorAll('[data-apply-coupon]').forEach(button => {
      button.addEventListener('click', () => {
        const input = document.querySelector('[name="coupon"]');
        const code = input?.value.trim().toUpperCase();
        const coupon = window.B2D.data?.coupons.find(c => c.code === code);
        if (coupon) {
          window.B2D.ui?.toast(`Coupon ${coupon.code} applied!`, { status: 'success' });
          window.B2D.analytics?.log('apply_coupon', { code: coupon.code });
        } else {
          window.B2D.ui?.toast('Coupon not found or expired.', { status: 'error' });
        }
      });
    });
  }

  window.B2D.cart = { init };
})();
