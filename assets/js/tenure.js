// Computes an ongoing tenure ("X years, Y months") for any element with a
// data-tenure-since="YYYY-MM-DD" attribute, calculated against the
// visitor's current date — so it stays accurate without needing a rebuild.
// Reusable for any future "since [date]" entry, not just one specific use.
(function () {
  function monthsBetween(start, end) {
    var months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (end.getDate() < start.getDate()) months -= 1;
    return Math.max(months, 0);
  }

  function render() {
    var els = document.querySelectorAll('[data-tenure-since]');
    if (!els.length) return;
    var today = new Date();

    els.forEach(function (el) {
      var start = new Date(el.getAttribute('data-tenure-since'));
      var totalMonths = monthsBetween(start, today);
      var years = Math.floor(totalMonths / 12);
      var months = totalMonths % 12;
      var parts = [];
      if (years > 0) parts.push(years + (years === 1 ? ' year' : ' years'));
      if (months > 0 || years === 0) parts.push(months + (months === 1 ? ' month' : ' months'));
      el.textContent = parts.join(', ');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
