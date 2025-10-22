/* PWA registration */
window.B2D = window.B2D || {};

(function () {
  function init() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(err => {
          console.warn('Service worker registration failed', err);
        });
      });
    }
  }

  window.B2D.pwa = { init };
})();
