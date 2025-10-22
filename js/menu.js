/* Menu filtering, sorting, and add-to-cart interactions */
window.B2D = window.B2D || {};

(function () {
  const data = window.B2D.data || { menuItems: [] };

  function filterMenu({ category, maxPrice, vegetarian, spicy, searchTerm }) {
    return data.menuItems.filter(item => {
      const matchesCategory = category ? item.category === category : true;
      const matchesPrice = maxPrice ? item.price <= maxPrice : true;
      const matchesVeg = vegetarian ? item.vegetarian : true;
      const matchesSpice = spicy ? item.spiceLevel.toLowerCase() === spicy.toLowerCase() : true;
      const matchesSearch = searchTerm ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchesCategory && matchesPrice && matchesVeg && matchesSpice && matchesSearch;
    });
  }

  function sortMenu(items, sortBy) {
    const sorted = [...items];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
      default:
        sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }

  function renderMenu(items, container) {
    if (!container) return;
    container.innerHTML = items.map(item => `
      <article class="card product-card" data-sku="${item.sku}">
        <figure class="card-image">
          <span class="discount-chip">${item.badges[0] || 'Hot'}</span>
          <img src="${item.image}" alt="${item.name}" loading="lazy"/>
        </figure>
        <header>
          <h3>${item.name}</h3>
          <div class="rating-stars" aria-label="Rated ${item.rating} out of 5">
            ${'★'.repeat(Math.round(item.rating))}
          </div>
        </header>
        <p>${item.description}</p>
        <footer class="stack-sm">
          <div class="flex flex-between">
            <span class="price">${item.priceFormatted}</span>
            <span class="badge ${item.availability === 'in-stock' ? 'badge-success' : 'badge-danger'}">${item.availability === 'in-stock' ? 'In Stock' : 'Limited'}</span>
          </div>
          <div class="quantity-stepper" data-stepper>
            <button type="button" data-step="-1" aria-label="Decrease quantity">-</button>
            <input type="number" value="1" min="1" aria-label="Quantity" />
            <button type="button" data-step="1" aria-label="Increase quantity">+</button>
          </div>
          <button class="button button-primary" data-add-to-cart data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
        </footer>
      </article>
    `).join('');
    window.B2D.ui?.init();
    container.querySelectorAll('[data-add-to-cart]').forEach(button => {
      button.addEventListener('click', event => {
        const qty = Number(button.parentElement.querySelector('input').value) || 1;
        window.B2D.app?.addToCart({
          id: button.dataset.id,
          name: button.dataset.name,
          price: Number(button.dataset.price),
          quantity: qty,
          variant: 'default'
        });
        window.B2D.analytics?.log('add_to_cart', { sku: button.closest('[data-sku]').dataset.sku, quantity: qty });
      });
    });
  }

  function init() {
    const container = document.querySelector('[data-menu-grid]');
    if (!container) return;
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('query') || '';
    let currentItems = initialQuery ? filterMenu({ searchTerm: initialQuery }) : data.menuItems.slice(0, 24);
    renderMenu(currentItems, container);
    if (initialQuery) {
      const searchInput = document.querySelector('[data-menu-filters] input[name="search"]');
      if (searchInput) searchInput.value = initialQuery;
    }

    const filterForm = document.querySelector('[data-menu-filters]');
    const sortSelect = document.querySelector('[data-menu-sort]');
    filterForm?.addEventListener('input', () => {
      const formData = new FormData(filterForm);
      const filters = {
        category: formData.get('category') || undefined,
        maxPrice: formData.get('price') ? Number(formData.get('price')) : undefined,
        vegetarian: formData.get('vegetarian') === 'on',
        spicy: formData.get('spice') || undefined,
        searchTerm: formData.get('search') || undefined
      };
      currentItems = sortMenu(filterMenu(filters), sortSelect?.value);
      renderMenu(currentItems.slice(0, 32), container);
    });

    sortSelect?.addEventListener('change', event => {
      currentItems = sortMenu(currentItems, event.target.value);
      renderMenu(currentItems.slice(0, 32), container);
    });
  }

  window.B2D.menu = { init };
})();
