/* EoinDerry.com — interface logic (no dependencies) */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- header scroll state ---- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- mobile nav ---- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- article stage filter ---- */
  var filterBtns = document.querySelectorAll("[data-filter]");
  var grid = document.querySelector("[data-post-grid]");
  var emptyMsg = document.querySelector("[data-filter-empty]");
  if (filterBtns.length && grid) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        var want = btn.getAttribute("data-filter");
        var visible = 0;
        grid.querySelectorAll(".post-card").forEach(function (card) {
          var show = want === "all" || card.getAttribute("data-domain") === want;
          card.classList.toggle("is-hidden", !show);
          if (show) visible++;
        });
        if (emptyMsg) emptyMsg.hidden = visible > 0;
      });
    });
  }

  /* ---- newsletter placeholder (until a provider is configured) ---- */
  document.querySelectorAll("[data-news-placeholder]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-news-note]");
      if (note) note.hidden = false;
    });
  });

  /* ---- hero spreadsheet: ordering the data ---- */
  var sheet = document.querySelector("[data-sheet]");
  if (sheet) {
    var rows = sheet.querySelectorAll("[data-sheet-row]");
    var fbCell = sheet.querySelector("[data-fb-cell]");
    var fbInput = sheet.querySelector("[data-fb-input]");
    var statusEl = sheet.querySelector("[data-sheet-status]");
    var savedEl = sheet.querySelector("[data-sheet-saved]");
    var totalEl = sheet.querySelector("[data-sheet-total]");

    var CLEAN = [
      ["Niamh Byrne", "Dublin", "€915"],
      ["Seán O'Brien", "Cork", "€1,480"],
      ["Aoife Murphy", "Galway", "€1,240"],
      ["Pádraig Kelly", "Dublin", "€770"],
      ["Ciara Walsh", "Cork", "€1,105"]
    ];
    var TOTAL = 5510;

    // Remember the messy starting state so the loop can reset
    var messy = [];
    rows.forEach(function (row) {
      messy.push(Array.prototype.map.call(row.querySelectorAll("td"), function (td) {
        return td.innerHTML;
      }));
    });

    var setFinished = function () {
      rows.forEach(function (row, i) {
        row.classList.add("is-clean");
        row.querySelectorAll("td").forEach(function (td, j) {
          td.textContent = CLEAN[i][j];
        });
      });
      if (totalEl) totalEl.textContent = "€5,510";
      if (fbInput) fbInput.textContent = "=SUM(C2:C6)";
      if (fbCell) fbCell.textContent = "C7";
      if (statusEl) statusEl.textContent = "5 rows ordered · Ready";
      if (savedEl) { savedEl.textContent = "Saved ✓"; savedEl.classList.add("is-saved"); }
    };

    if (reducedMotion) {
      setFinished();
    } else {
      var typeText = function (text, done) {
        fbInput.textContent = "";
        var i = 0;
        var tick = function () {
          fbInput.textContent = text.slice(0, ++i);
          if (i < text.length) { setTimeout(tick, 42); } else { setTimeout(done, 350); }
        };
        tick();
      };

      var flash = function (td) {
        td.classList.remove("s-flash");
        void td.offsetWidth; // restart the animation
        td.classList.add("s-flash");
      };

      var selectCell = function (td) {
        sheet.querySelectorAll(".s-select").forEach(function (el) { el.classList.remove("s-select"); });
        if (td) td.classList.add("s-select");
      };

      var cleanRow = function (i, done) {
        var row = rows[i];
        var tds = row.querySelectorAll("td");
        selectCell(tds[0]);
        fbCell.textContent = "A" + (i + 2);
        setTimeout(function () {
          tds.forEach(function (td, j) {
            td.textContent = CLEAN[i][j];
            flash(td);
          });
          row.classList.add("is-clean");
          done();
        }, 180);
      };

      var countUpTotal = function (done) {
        var start = null;
        var dur = 750;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.round(TOTAL * eased);
          totalEl.textContent = "€" + val.toLocaleString("en-IE");
          if (p < 1) { requestAnimationFrame(step); } else { flash(totalEl); done(); }
        };
        requestAnimationFrame(step);
      };

      var reset = function () {
        rows.forEach(function (row, i) {
          row.classList.remove("is-clean");
          row.querySelectorAll("td").forEach(function (td, j) {
            td.innerHTML = messy[i][j];
            td.classList.remove("s-flash");
          });
        });
        totalEl.textContent = "";
        fbInput.textContent = "";
        fbCell.textContent = "A2";
        statusEl.textContent = "Ready";
        savedEl.textContent = "Editing";
        savedEl.classList.remove("is-saved");
        selectCell(null);
      };

      var run = function () {
        statusEl.textContent = "Ready";
        selectCell(rows[0].querySelector("td"));
        fbCell.textContent = "A2";
        setTimeout(function () {
          typeText("=PROPER(TRIM(A2))", function () {
            statusEl.textContent = "Cleaning…";
            var i = 0;
            var next = function () {
              if (i < rows.length) {
                cleanRow(i++, function () { setTimeout(next, 330); });
              } else {
                selectCell(totalEl);
                fbCell.textContent = "C7";
                statusEl.textContent = "Summing…";
                typeText("=SUM(C2:C6)", function () {
                  countUpTotal(function () {
                    selectCell(null);
                    statusEl.textContent = "5 rows ordered · Ready";
                    savedEl.textContent = "Saved ✓";
                    savedEl.classList.add("is-saved");
                    setTimeout(function () { reset(); setTimeout(run, 900); }, 4200);
                  });
                });
              }
            };
            next();
          });
        }, 700);
      };

      if ("IntersectionObserver" in window) {
        var started = false;
        var sio = new IntersectionObserver(function (entries) {
          if (!started && entries[0].isIntersecting) {
            started = true;
            setTimeout(run, 800);
            sio.disconnect();
          }
        }, { threshold: 0.3 });
        sio.observe(sheet);
      } else {
        setTimeout(run, 800);
      }
    }
  }
})();
