// Draws a smooth curved connector through each .timeline-dot inside a
// .timeline-wrap, so the "wave" always matches however many entries a page
// has and reflows correctly on resize / mobile breakpoints.
(function () {
  function drawTimeline(wrap) {
    var dots = Array.prototype.slice.call(wrap.querySelectorAll('.timeline-dot'));
    if (dots.length < 2) return;

    var wrapRect = wrap.getBoundingClientRect();
    var points = dots.map(function (dot) {
      var r = dot.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - wrapRect.left,
        y: r.top + r.height / 2 - wrapRect.top
      };
    });

    // Build a smooth path through the points using simple cubic bezier
    // segments (Catmull-Rom-ish: control points derived from neighbors).
    var d = 'M ' + points[0].x + ' ' + points[0].y;
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[i === 0 ? 0 : i - 1];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      var c1x = p1.x + (p2.x - p0.x) / 6;
      var c1y = p1.y + (p2.y - p0.y) / 6;
      var c2x = p2.x - (p3.x - p1.x) / 6;
      var c2y = p2.y - (p3.y - p1.y) / 6;

      d += ' C ' + c1x + ' ' + c1y + ', ' + c2x + ' ' + c2y + ', ' + p2.x + ' ' + p2.y;
    }

    var svg = wrap.querySelector('.timeline-svg');
    if (!svg) return;
    svg.setAttribute('viewBox', '0 0 ' + wrapRect.width + ' ' + wrapRect.height);
    var path = svg.querySelector('path');
    if (!path) {
      path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      svg.appendChild(path);
    }
    path.setAttribute('d', d);
  }

  function drawAll() {
    document.querySelectorAll('.timeline-track').forEach(drawTimeline);
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', drawAll);
  } else {
    drawAll();
  }
  window.addEventListener('resize', debounce(drawAll, 120));
  window.addEventListener('load', drawAll);
})();
