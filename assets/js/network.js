/* EoinDerry.com — hero network topology
   A living network: drifting nodes, faint links, and packets that hop
   node-to-node along real paths. Canvas 2D, no dependencies, pauses
   when off-screen or when the tab is hidden. Disabled entirely under
   prefers-reduced-motion (CSS hides the canvas; we also never start). */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.getElementById("net-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  var ACCENT = { r: 53, g: 224, b: 208 };
  var NODE_RGB = { r: 148, g: 163, b: 184 };

  var dpr = 1, W = 0, H = 0;
  var nodes = [], links = [], packets = [];
  var mouse = { x: -9999, y: -9999 };
  var running = false, rafId = 0, lastT = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }

  /* ---- build topology ---- */
  function build() {
    nodes = []; links = []; packets = [];

    var area = W * H;
    var target = Math.max(16, Math.min(46, Math.round(area / 26000)));

    // Poisson-ish scatter: reject points too close to existing ones
    var minDist = Math.sqrt(area / target) * 0.62;
    var attempts = 0;
    while (nodes.length < target && attempts < target * 60) {
      attempts++;
      var x = rand(0.02 * W, 0.98 * W);
      var y = rand(0.04 * H, 0.96 * H);
      var ok = true;
      for (var i = 0; i < nodes.length; i++) {
        var dx = nodes[i].x - x, dy = nodes[i].y - y;
        if (dx * dx + dy * dy < minDist * minDist) { ok = false; break; }
      }
      if (!ok) continue;
      var core = Math.random() < 0.18;
      nodes.push({
        x: x, y: y,
        hx: x, hy: y,                       // home position
        vx: rand(-1, 1), vy: rand(-1, 1),   // drift phase seeds
        ph: rand(0, Math.PI * 2),
        spd: rand(0.00012, 0.00030),
        r: core ? rand(2.6, 3.4) : rand(1.3, 2.1),
        core: core,
        amp: rand(6, 16),
        peers: []
      });
    }

    // Link each node to its 2 nearest neighbours (3 for core nodes)
    var seen = {};
    nodes.forEach(function (n, ni) {
      var ds = nodes.map(function (m, mi) {
        var dx = m.x - n.x, dy = m.y - n.y;
        return { i: mi, d: dx * dx + dy * dy };
      }).sort(function (a, b) { return a.d - b.d; });
      var want = n.core ? 3 : 2;
      for (var k = 1; k <= want && k < ds.length; k++) {
        var mi = ds[k].i;
        var key = ni < mi ? ni + "-" + mi : mi + "-" + ni;
        if (seen[key]) continue;
        seen[key] = true;
        links.push({ a: ni, b: mi });
        n.peers.push(mi);
        nodes[mi].peers.push(ni);
      }
    });

    // Seed a few packets
    var pCount = Math.max(3, Math.round(links.length / 9));
    for (var p = 0; p < pCount; p++) spawnPacket(rand(0, 1));
  }

  function spawnPacket(progress) {
    if (!links.length) return;
    var start = Math.floor(rand(0, nodes.length));
    var n = nodes[start];
    if (!n || !n.peers.length) return;
    packets.push({
      from: start,
      to: n.peers[Math.floor(rand(0, n.peers.length))],
      t: progress || 0,
      speed: rand(0.25, 0.55),          // link-lengths per second (at reference length)
      hops: Math.floor(rand(2, 6)),
      life: 1
    });
  }

  /* ---- sizing ---- */
  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  /* ---- frame ---- */
  function frame(t) {
    if (!running) return;
    var dt = Math.min(0.05, (t - lastT) / 1000) || 0.016;
    lastT = t;

    ctx.clearRect(0, 0, W, H);

    // Drift nodes gently around their home points
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.ph += n.spd * 1000 * dt;
      n.x = n.hx + Math.cos(n.ph + n.vx * 7) * n.amp;
      n.y = n.hy + Math.sin(n.ph * 0.9 + n.vy * 7) * n.amp;
    }

    // Links
    for (var l = 0; l < links.length; l++) {
      var a = nodes[links[l].a], b = nodes[links[l].b];
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      var md = Math.hypot(mouse.x - mx, mouse.y - my);
      var boost = Math.max(0, 1 - md / 260);
      var alpha = 0.05 + boost * 0.16;
      ctx.strokeStyle = boost > 0.02
        ? "rgba(" + ACCENT.r + "," + ACCENT.g + "," + ACCENT.b + "," + alpha.toFixed(3) + ")"
        : "rgba(" + NODE_RGB.r + "," + NODE_RGB.g + "," + NODE_RGB.b + "," + alpha.toFixed(3) + ")";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // Packets
    for (var p = packets.length - 1; p >= 0; p--) {
      var pk = packets[p];
      var fa = nodes[pk.from], fb = nodes[pk.to];
      if (!fa || !fb) { packets.splice(p, 1); continue; }
      var len = Math.max(30, Math.hypot(fb.x - fa.x, fb.y - fa.y));
      pk.t += (pk.speed * 140 / len) * dt; // constant pixel speed regardless of link length
      if (pk.t >= 1) {
        pk.hops--;
        if (pk.hops <= 0) {
          // arrival flash then respawn elsewhere
          drawFlash(fb.x, fb.y);
          packets.splice(p, 1);
          spawnPacket(0);
          continue;
        }
        var next = nodes[pk.to].peers.filter(function (q) { return q !== pk.from; });
        pk.from = pk.to;
        pk.to = next.length ? next[Math.floor(rand(0, next.length))] : pk.from;
        pk.t = 0;
        continue;
      }
      var px = fa.x + (fb.x - fa.x) * pk.t;
      var py = fa.y + (fb.y - fa.y) * pk.t;

      // tail
      var tx = fa.x + (fb.x - fa.x) * Math.max(0, pk.t - 0.09);
      var ty = fa.y + (fb.y - fa.y) * Math.max(0, pk.t - 0.09);
      var grad = ctx.createLinearGradient(tx, ty, px, py);
      grad.addColorStop(0, "rgba(" + ACCENT.r + "," + ACCENT.g + "," + ACCENT.b + ",0)");
      grad.addColorStop(1, "rgba(" + ACCENT.r + "," + ACCENT.g + "," + ACCENT.b + ",0.55)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(px, py);
      ctx.stroke();

      // head
      ctx.fillStyle = "rgba(" + ACCENT.r + "," + ACCENT.g + "," + ACCENT.b + ",0.95)";
      ctx.shadowColor = "rgba(" + ACCENT.r + "," + ACCENT.g + "," + ACCENT.b + ",0.9)";
      ctx.shadowBlur = 7;
      ctx.beginPath();
      ctx.arc(px, py, 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Nodes
    for (var j = 0; j < nodes.length; j++) {
      var nd = nodes[j];
      var d = Math.hypot(mouse.x - nd.x, mouse.y - nd.y);
      var glow = Math.max(0, 1 - d / 200);
      var na = 0.28 + glow * 0.6;
      if (glow > 0.05) {
        ctx.fillStyle = "rgba(" + ACCENT.r + "," + ACCENT.g + "," + ACCENT.b + "," + na.toFixed(3) + ")";
        ctx.shadowColor = "rgba(" + ACCENT.r + "," + ACCENT.g + "," + ACCENT.b + ",0.8)";
        ctx.shadowBlur = 9 * glow;
      } else {
        ctx.fillStyle = "rgba(" + NODE_RGB.r + "," + NODE_RGB.g + "," + NODE_RGB.b + "," + na.toFixed(3) + ")";
      }
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, nd.r + glow * 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // core nodes get a faint ring
      if (nd.core) {
        ctx.strokeStyle = "rgba(" + NODE_RGB.r + "," + NODE_RGB.g + "," + NODE_RGB.b + ",0.14)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r + 4.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    rafId = requestAnimationFrame(frame);
  }

  function drawFlash(x, y) {
    ctx.fillStyle = "rgba(" + ACCENT.r + "," + ACCENT.g + "," + ACCENT.b + ",0.28)";
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  /* ---- lifecycle ---- */
  function start() {
    if (running) return;
    running = true;
    lastT = performance.now();
    rafId = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  var hero = canvas.closest(".hero") || canvas;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries[0].isIntersecting ? start() : stop();
    }, { threshold: 0.02 }).observe(hero);
  } else {
    start();
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else if (hero.getBoundingClientRect().bottom > 0) start();
  });

  window.addEventListener("pointermove", function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });
  window.addEventListener("pointerleave", function () {
    mouse.x = -9999; mouse.y = -9999;
  });

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  resize();
})();
