/* Search autosuggest */
window.B2D = window.B2D || {};

(function () {
  const synonyms = new Map([
    ['chips', 'fries'],
    ['soda', 'soft drink'],
    ['shawarma', 'wrap'],
    ['meatpie', 'pie']
  ]);

  function init(recentSearches = []) {
    const panel = document.querySelector('[data-search-panel]');
    const input = document.querySelector('[data-search-input]');
    if (!panel || !input) return;

    function renderSuggestions(query = '') {
      const normalized = synonyms.get(query.toLowerCase()) || query;
      const results = window.B2D.data?.menuItems
        .filter(item => item.name.toLowerCase().includes(normalized.toLowerCase()))
        .slice(0, 6);
      const categories = window.B2D.data?.categories.filter(cat => cat.name.toLowerCase().includes(normalized.toLowerCase())).slice(0, 3);
      panel.innerHTML = `
        <div class="stack-md">
          <div>
            <h4 class="uppercase">Quick Picks</h4>
            <div class="stack-sm">
              ${recentSearches.slice(0, 4).map(term => `<button type="button" class="button button-secondary" data-search-suggestion>${term}</button>`).join('') || '<p class="muted">No recent searches yet.</p>'}
            </div>
          </div>
          <div>
            <h4 class="uppercase">Popular Items</h4>
            <ul class="stack-sm" role="list">
              ${results.map(item => `<li class="flex gap-md flex-between"><span>${item.name}</span><span class="muted">${item.priceFormatted}</span></li>`).join('') || '<li class="muted">No items found</li>'}
            </ul>
          </div>
          <div>
            <h4 class="uppercase">Categories</h4>
            <div class="flex flex-wrap gap-sm">
              ${categories.map(cat => `<a class="badge" href="menu.html#${cat.id}">${cat.name}</a>`).join('') || '<span class="muted">No categories</span>'}
            </div>
          </div>
          <a class="button button-primary" href="search.html?query=${encodeURIComponent(query)}">See all results</a>
        </div>
      `;
      panel.hidden = false;
    }

    input.addEventListener('focus', () => renderSuggestions(input.value));
    input.addEventListener('input', event => renderSuggestions(event.target.value));
    input.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        panel.hidden = true;
      }
    });
    document.addEventListener('click', event => {
      if (!panel.contains(event.target) && event.target !== input) {
        panel.hidden = true;
      }
    });
    panel.addEventListener('click', event => {
      const suggestion = event.target.closest('[data-search-suggestion]');
      if (suggestion) {
        input.value = suggestion.textContent;
        renderSuggestions(suggestion.textContent);
      }
    });
  }

  window.B2D.search = { init };
})();
