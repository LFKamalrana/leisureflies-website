/* LeisureFlies — visa checklist behaviour.
   Two jobs: filter the list by the visitor's employment profile, and count
   how many documents they've ticked off. No storage, no dependencies. */

(function () {
  'use strict';

  var root = document.querySelector('[data-checklist]');
  if (!root) return;

  var buttons = Array.prototype.slice.call(document.querySelectorAll('.profile-opts button'));
  var counter = document.querySelector('[data-count]');
  var totalEl = document.querySelector('[data-total]');
  var resetBtn = document.querySelector('.stub-reset');

  function filtered() {
    return Array.prototype.slice.call(root.querySelectorAll('[data-for]'));
  }

  function applyProfile(profile) {
    filtered().forEach(function (el) {
      var list = el.getAttribute('data-for').split(/\s+/);
      var show = list.indexOf('all') > -1 || list.indexOf(profile) > -1;
      el.hidden = !show;
      if (!show) {
        var box = el.querySelector('input[type="checkbox"]');
        if (box) box.checked = false;
      }
    });

    // Hide a section whose items are all filtered out.
    Array.prototype.slice.call(root.querySelectorAll('.sec')).forEach(function (sec) {
      var items = sec.querySelectorAll('.docs > li');
      if (!items.length) return;
      var visible = Array.prototype.slice.call(items).some(function (li) { return !li.hidden; });
      sec.hidden = !visible;
    });

    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.profile === profile));
    });

    count();
  }

  function count() {
    var boxes = Array.prototype.slice.call(root.querySelectorAll('input[type="checkbox"]'))
      .filter(function (b) { return !b.closest('[hidden]'); });
    var done = boxes.filter(function (b) { return b.checked; }).length;
    if (counter) counter.textContent = done;
    if (totalEl) totalEl.textContent = boxes.length;
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { applyProfile(b.dataset.profile); });
  });

  root.addEventListener('change', function (e) {
    if (e.target.type === 'checkbox') count();
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      root.querySelectorAll('input[type="checkbox"]').forEach(function (b) { b.checked = false; });
      count();
    });
  }

  // Open the sponsor block automatically when printing, so nothing is lost.
  var sponsor = document.querySelector('details.sponsor');
  if (sponsor && window.matchMedia) {
    window.addEventListener('beforeprint', function () { sponsor.open = true; });
  }

  applyProfile(buttons.length ? buttons[0].dataset.profile : 'all');
})();
