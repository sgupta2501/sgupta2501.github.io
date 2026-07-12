// Auto-calculates total experience (internships + full-time) from the role
// date ranges below, and renders it into #experience-duration. Update this
// list if roles are added/removed/changed on the Experience page — dates
// here are the source of truth for the calculation, independent of the
// display text in the timeline/detail list.
(function () {
  var roles = [
    { start: '2021-05-01', end: '2021-08-31', months: 2 },   // ICGEB — corrected: actually June–Aug, ~2mo
    { start: '2022-05-01', end: '2022-07-31', months: 2 },   // Dell Technologies — corrected: actually ~2mo
    { start: '2023-01-01', end: '2023-06-30' },   // Bain Capability Network
    { start: '2024-04-01', end: '2024-05-31' },   // Hindustan Unilever
    { start: '2025-05-01', end: null }            // Hero Fincorp — null end = present
  ];

  function monthsBetween(start, end) {
    var months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
    return Math.max(months, 0);
  }

  function render() {
    var el = document.getElementById('experience-duration');
    if (!el) return;

    var today = new Date();
    var totalMonths = roles.reduce(function (sum, role) {
      if (typeof role.months === 'number') return sum + role.months;
      var start = new Date(role.start);
      var end = role.end ? new Date(role.end) : today;
      return sum + monthsBetween(start, end);
    }, 0);

    var years = Math.floor(totalMonths / 12);
    var months = totalMonths % 12;
    var parts = [];
    if (years > 0) parts.push(years + (years === 1 ? ' yr' : ' yrs'));
    if (months > 0 || years === 0) parts.push(months + (months === 1 ? ' mo' : ' mos'));

    el.textContent = parts.join(' ') + ' of experience';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
