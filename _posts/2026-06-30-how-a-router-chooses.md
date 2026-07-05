---
title: "How a Router Chooses: Longest Prefix, Distance, Metric"
description: >-
  Five routes to the same destination, one winner. The router's
  decision process is a strict three-round contest — and once you know
  the rounds, every routing-table question becomes mechanical.
date: 2026-06-30
domain: ip-connectivity
---

A packet arrives. The router looks at the destination address, looks
at its routing table, and forwards. Simple — until the table contains
several routes that could all plausibly carry the packet. The CCNA's
IP Connectivity domain is 25% of the exam, and a healthy slice of it
is this single question: **which route wins?**

The answer is a contest with three rounds, held in a strict order
that candidates constantly get backwards. Learn the order and the
questions solve themselves.

## Round one: longest prefix match — the only round that sees the packet

For each packet, the router finds every route whose network contains
the destination, and picks **the most specific one — the longest
prefix**. This is the supreme rule. Nothing else is even consulted
unless two routes have the *same* prefix length.

<figure class="fig">
<svg viewBox="0 0 720 292" role="img" aria-label="Longest prefix match decision ladder">
  <g font-family="IBM Plex Mono, monospace" font-size="13">
    <text x="360" y="28" fill="#e8edf4" text-anchor="middle">packet → 10.1.1.77</text>
    <path d="M360 38 V60" stroke="#26303f" stroke-width="1.5"/>
    <!-- candidates -->
    <rect x="60" y="66" width="600" height="34" rx="5" fill="none" stroke="#26303f"/>
    <text x="80" y="88" fill="#5c6a7d">0.0.0.0/0        → default        contains .77, least specific</text>
    <rect x="60" y="112" width="600" height="34" rx="5" fill="none" stroke="#26303f"/>
    <text x="80" y="134" fill="#94a1b3">10.0.0.0/8       → via 192.0.2.1  contains .77</text>
    <rect x="60" y="158" width="600" height="34" rx="5" fill="none" stroke="#26303f"/>
    <text x="80" y="180" fill="#94a1b3">10.1.0.0/16      → via 192.0.2.5  contains .77, closer</text>
    <rect x="60" y="204" width="600" height="34" rx="5" fill="rgba(53,224,208,0.08)" stroke="#35e0d0" stroke-width="2"/>
    <text x="80" y="226" fill="#35e0d0">10.1.1.0/24      → via 192.0.2.9  contains .77 — LONGEST PREFIX WINS</text>
    <rect x="60" y="250" width="600" height="34" rx="5" fill="none" stroke="#26303f" stroke-dasharray="5 5"/>
    <text x="80" y="272" fill="#5c6a7d">10.2.2.0/24      → (doesn't contain .77 — never a candidate)</text>
  </g>
</svg>
<figcaption>fig 1 — every containing route is a candidate; the most specific one forwards the packet</figcaption>
</figure>

This is also the entire theory of the **default route**: `0.0.0.0/0`
contains every address, so it matches everything — and, being the
*shortest possible* prefix, it loses to anything more specific. It's
not a special mechanism. It's just the contestant that always shows up
and always comes last, catching whatever nobody else claimed.

## Round two: administrative distance — which *source* do you trust?

Round two isn't about packets at all — it decides which routes get
**into the table** in the first place. If the router learns about the
*same prefix* from two different sources — say, OSPF and a static
route — it can't install both. It believes the source with the lower
**administrative distance (AD)**: a trustworthiness score, lower is
better.

| Source | AD |
|--------|----|
| Connected interface | 0 |
| Static route | 1 |
| External BGP | 20 |
| EIGRP | 90 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |

The values worth memorising cold: **0, 1, 90, 110, 120**. The logic
behind them is honest: nothing outranks what the router can touch
(connected), your explicit instruction (static) beats anything
learned, and among protocols, the more sophisticated the algorithm,
the more it's trusted.

A useful trick lives here too: a static route configured with a
*worse* AD than the routing protocol (`ip route ... 10.0.0.0 ... 250`)
sits dormant until the protocol's route disappears — a **floating
static**, the poor engineer's failover.

## Round three: metric — the tie-breaker within a protocol

Same prefix, same protocol, two paths? Now — and only now — the
protocol's own **metric** decides. OSPF sums interface costs (derived
from bandwidth); RIP counts hops; EIGRP runs its composite formula.
Lower wins. Equal metrics? The router installs both and load-shares —
which is a feature, not a tie it failed to break.

## The three rounds, in one sentence each

1. **Longest prefix** picks between *different* prefixes — per packet.
2. **AD** picks between *sources* offering the *same* prefix — at
   table-install time.
3. **Metric** picks between *paths* within *one source* — also at
   install time.

The classic exam trap inverts rounds one and two: "a static route
(AD 1) to 10.0.0.0/8 and an OSPF route (AD 110) to 10.1.1.0/24 — where
does a packet for 10.1.1.77 go?" Instinct screams *static, AD 1 beats
110!* But AD never competes across different prefixes. The /24 is
longer; OSPF wins. If you feel that instinct twitch in the exam,
you've found the trap.

## Reading it off the router

```
R1# show ip route 10.1.1.77
Routing entry for 10.1.1.0/24
  Known via "ospf 1", distance 110, metric 20
  Last update from 192.0.2.9 on GigabitEthernet0/1
```

That one command answers all three rounds at once: which prefix
matched, who supplied it, at what distance and metric. It's the
routing table explaining its own verdict — and it's the first command
worth typing when a packet is going somewhere you didn't expect.

---

*The routes in this article were static or mysterious "known via
OSPF" entries. How OSPF actually learns them is the
[neighbour-states story](/articles/ospf-neighbours-conversation/) —
and what happens when the gateway itself dies is next:
[HSRP](/articles/hsrp-two-routers-one-address/).*
