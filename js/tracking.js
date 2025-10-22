/* Order tracking timeline */
window.B2D = window.B2D || {};

(function () {
  const stages = ['Placed', 'Accepted', 'Preparing', 'Out for delivery', 'Delivered'];

  function initTimeline() {
    const timeline = document.querySelector('[data-tracking-timeline]');
    if (!timeline) return;
    timeline.innerHTML = stages.map((stage, index) => `
      <li class="stack-sm" data-stage-index="${index}">
        <span class="badge ${index <= 2 ? 'badge-success' : ''}">${stage}</span>
        <p class="muted">${index === 0 ? 'We received your order.' : index === 4 ? 'Enjoy your meal!' : 'Hang tight, rider is on the move.'}</p>
      </li>
    `).join('');
  }

  window.B2D.tracking = {
    init() {
      initTimeline();
    }
  };
})();
