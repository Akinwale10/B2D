/* Analytics event stubs (GA4 compatible) */
window.B2D = window.B2D || {};

(function () {
  function log(eventName, payload = {}) {
    console.info('[analytics]', eventName, payload);
  }

  window.B2D.analytics = { log };
})();
