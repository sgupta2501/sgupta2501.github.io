// Draws the Education page's flat connector line by measuring the actual
// rendered positions of the first and last dot, then sizing a single div
// to span exactly between their centers. Because the line's left/width
// come directly from measured coordinates (not an estimated/fixed pixel
// value), it cannot overshoot past either end or leave a gap in the
// middle — the two failure modes the earlier CSS-only approach had.
(function () {
  function drawFlatLine(track) {
    var dots = track.querySelectorAll('.timeline-dot');
    if (dots.length < 2) return;

    var trackRect = track.getBoundingClientRect();
    var firstRect = dots[0].getBoundingClientRect();
    var lastRect = dots[dots.length - 1].getBoundingClientRect();

    var firstCenterX = firstRect.left + firstRect.width / 2 - trackRect.left;
    var lastCenterX = lastRect.left + lastRect.width / 2 - trackRect.left;
    var centerY = firstRect.top + firstRect.height / 2 - trackRect.top;

    var line = track.querySelector('.timeline-flat-line');
    if (!line) {
      line = document.createElement('div');
      line.className = 'timeline-flat-line';
      track.appendChild(line);
    }
    line.style.left = firstCenterX + 'px';
    line.style.width = (lastCenterX - firstCenterX) + 'px';
    line.style.top = (centerY - 1.5) + 'px';
  }

  function drawAll() {
    document.querySelectorAll('.timeline-track.flat').forEach(drawFlatLine);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', drawAll);
  } else {
    drawAll();
  }
  window.addEventListener('load', drawAll);
  window.addEventListener('resize', drawAll);
})();
