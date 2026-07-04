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

  /* ---- article domain filter ---- */
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

  /* ---- hero terminal ---- */
  var term = document.querySelector("[data-terminal]");
  if (term) {
    var out = term.querySelector("[data-term-output]");
    var screenEl = term.querySelector(".term-screen");
    // Each line: [text, cssClass, perCharDelayMs, pauseAfterMs]
    var script = [
      ["SW1> ",                                             "t-prompt", 0,   500],
      ["enable\n",                                          "",         70,  350],
      ["SW1# ",                                             "t-prompt", 0,   450],
      ["show ip interface brief\n",                         "",         48,  500],
      ["Interface      IP-Address    Status    Protocol\n", "t-dim",    4,   120],
      ["Vlan1          10.0.10.2     up        up\n",       "",         4,   90],
      ["Gi0/1          unassigned    up        up\n",       "",         4,   90],
      ["Gi0/2          unassigned    up        up\n",       "",         4,   400],
      ["SW1# ",                                             "t-prompt", 0,   600],
      ["ping 10.0.10.1\n",                                  "",         60,  420],
      ["!!!!!\n",                                           "t-ok",     150, 200],
      ["Success rate is 100 percent (5/5)\n",               "t-ok",     6,   900],
      ["SW1# ",                                             "t-prompt", 0,   1400],
      ["% Now let's understand WHY that worked.\n",         "t-dim",    34,  2600]
    ];

    var typeLine = function (idx) {
      if (idx >= script.length) {
        // Loop: clear and restart after a beat
        setTimeout(function () {
          out.textContent = "";
          out.innerHTML = "";
          typeLine(0);
        }, 400);
        return;
      }
      var line = script[idx];
      var span = document.createElement("span");
      if (line[1]) span.className = line[1];
      out.appendChild(span);

      if (reducedMotion || line[2] === 0) {
        span.textContent = line[0];
        setTimeout(function () { typeLine(idx + 1); }, reducedMotion ? 0 : line[3]);
        return;
      }
      var i = 0;
      var tick = function () {
        span.textContent = line[0].slice(0, ++i);
        if (screenEl) screenEl.scrollTop = screenEl.scrollHeight;
        if (i < line[0].length) {
          setTimeout(tick, line[2]);
        } else {
          setTimeout(function () { typeLine(idx + 1); }, line[3]);
        }
      };
      tick();
    };

    if (reducedMotion) {
      // Render the finished screen statically
      script.forEach(function (line) {
        var span = document.createElement("span");
        if (line[1]) span.className = line[1];
        span.textContent = line[0];
        out.appendChild(span);
      });
    } else {
      // Start when the terminal scrolls into view
      if ("IntersectionObserver" in window) {
        var started = false;
        var tio = new IntersectionObserver(function (entries) {
          if (!started && entries[0].isIntersecting) {
            started = true;
            setTimeout(function () { typeLine(0); }, 500);
            tio.disconnect();
          }
        }, { threshold: 0.3 });
        tio.observe(term);
      } else {
        typeLine(0);
      }
    }
  }
})();
