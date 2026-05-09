/* site-clock.js — Live local clock for the ribbon.
   Targets any element with id "siteClock" or "archiveClock".
   Output: HH:MM:SS  CITY (e.g. "14:35:22 SYDNEY") */
(function () {
  var el = document.getElementById('siteClock') || document.getElementById('archiveClock');
  if (!el) return;

  var tzLabel = 'LOCAL';
  try {
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    var parts = tz.split('/');
    tzLabel = (parts[parts.length - 1] || tz).replace(/_/g, ' ').toUpperCase();
  } catch (e) { /* fallback */ }

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var d = new Date();
    el.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '  ' + tzLabel;
  }

  tick();
  setInterval(tick, 1000);
})();
