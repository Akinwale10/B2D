/* Admin interactions */
window.B2D = window.B2D || {};

(function () {
  function renderAdminTables() {
    document.querySelectorAll('[data-admin-table]').forEach(table => {
      const dataset = table.getAttribute('data-admin-table');
      const rows = mockRows(dataset);
      table.querySelector('tbody').innerHTML = rows.map(row => `
        <tr>
          ${row.map(cell => `<td>${cell}</td>`).join('')}
        </tr>
      `).join('');
    });
  }

  function mockRows(type) {
    switch (type) {
      case 'orders':
        return Array.from({ length: 6 }, (_, index) => [
          `#B2D-${9800 + index}`,
          'Kemi Jacobs',
          `${3 + index} items`,
          window.B2D.app?.formatCurrency(8500 + index * 750),
          '<span class="status-chip status-ready">Paid</span>',
          `<span class="status-chip status-${index % 2 ? 'preparing' : 'out'}">${index % 2 ? 'Preparing' : 'Out for delivery'}</span>`,
          '10:45 AM'
        ]);
      case 'menu-items':
        return Array.from({ length: 6 }, (_, index) => [
          `Signature Burger ${index + 1}`,
          'Burgers',
          window.B2D.app?.formatCurrency(4200 + index * 150),
          index % 2 ? 'Visible' : 'Hidden',
          'Last updated 2h ago'
        ]);
      case 'customers':
        return Array.from({ length: 6 }, (_, index) => [
          `Customer ${index + 1}`,
          `customer${index + 1}@mail.ng`,
          `${index * 2 + 1} orders`,
          `${(index + 3) * 500} pts`,
          'Lagos'
        ]);
      case 'categories':
        return Array.from({ length: 5 }, (_, index) => [
          `Category ${index + 1}`,
          'Icon',
          'Description coming soon'
        ]);
      case 'inventory':
        return Array.from({ length: 5 }, (_, index) => [
          `SKU-${100 + index}`,
          `${20 - index}`,
          '10',
          index % 2 ? '<span class="status-chip status-ready">OK</span>' : '<span class="status-chip status-canceled">Low</span>'
        ]);
      case 'coupons':
        return Array.from({ length: 4 }, (_, index) => [
          ['HOTDEAL10','MEALCOMBO250','FREESHIP','WEEKEND'][index % 4],
          'Seasonal offer',
          index % 2 ? 'Percent' : 'Fixed',
          '₦5,000',
          `${20 - index} uses left`
        ]);
      case 'reservations':
        return Array.from({ length: 4 }, (_, index) => [
          `Guest ${index + 1}`,
          `${index + 2}`,
          `2024-08-2${index}`,
          ['Lekki','Ikeja','VI'][index % 3],
          index % 2 ? '<span class="status-chip status-ready">Confirmed</span>' : '<span class="status-chip status-preparing">Pending</span>'
        ]);
      case 'users':
        return Array.from({ length: 4 }, (_, index) => [
          `Admin ${index + 1}`,
          `admin${index + 1}@b2d.ng`,
          ['Admin','Manager','Staff'][index % 3],
          'Active'
        ]);
      default:
        return Array.from({ length: 5 }, (_, index) => [`Item ${index + 1}`, 'Details pending']);
    }
  }

  function initKpiCards() {
    document.querySelectorAll('[data-kpi]').forEach(card => {
      const metric = card.getAttribute('data-kpi');
      const values = {
        orders: '248',
        revenue: window.B2D.app?.formatCurrency(1280000),
        basket: '₦6,450 avg',
        top: 'Fire Grill Burger'
      };
      card.querySelector('strong').textContent = values[metric];
    });
  }

  window.B2D.admin = {
    init() {
      renderAdminTables();
      initKpiCards();
    }
  };
})();
