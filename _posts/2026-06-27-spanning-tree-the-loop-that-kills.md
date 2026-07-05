---
title: "Spanning Tree: The Loop That Kills Networks"
description: >-
  Add a second link between switches and you've built either resilience
  or a self-sustaining broadcast storm — the only difference is whether
  spanning tree is there to break the loop.
date: 2026-06-27
domain: network-access
---

Every sensible instinct you have about resilience — "one link can
fail, so give me two" — is correct at Layer 3 and catastrophic at
Layer 2. Understanding *why* is the key to the whole spanning tree
topic, so let's break a network on paper before we learn to save it.

## The storm

Recall the switch's two reflexes from
[The Life of a Frame](/articles/life-of-a-frame/): flood unknown and
broadcast frames out of every port, and learn source addresses as
frames arrive. Now wire three switches into a triangle and let one PC
send a single broadcast.

SW1 floods it to SW2 and SW3. SW2 floods its copy to SW3. SW3 floods
*that* copy back to SW1. Which floods it again. Here is the fact the
whole topic hangs on: **an Ethernet frame has no TTL**. An IP packet
carries a hop counter and dies when it expires; a frame is immortal.
Nothing in the header ever says "stop".

So the copies circulate — and multiply, because every pass through
every switch spawns more floods. Within seconds the links are at 100%
carrying the same doomed frames, the switches' MAC tables thrash as
the same source address appears on port after port (**MAC flapping**),
and CPUs saturate. The network doesn't degrade; it *dies*. And because
the broadcast storm eats the very links you'd use to manage the
switches, you're usually driving to the site with a console cable.

One accidental patch-lead between two floor ports can do this to a
building.

## The cure: refuse to use some of your links

The Spanning Tree Protocol's logic is almost insultingly simple: **a
network with no loops is a tree** — one path between any two points.
So the switches jointly compute a tree, and any link that would create
a loop gets put into a **blocking** state: alive, connected, ready —
and forwarding nothing.

<figure class="fig">
<svg viewBox="0 0 720 300" role="img" aria-label="Three-switch triangle with one link blocked by spanning tree">
  <g font-family="IBM Plex Mono, monospace" font-size="12">
    <!-- root -->
    <rect x="290" y="20" width="140" height="46" rx="7" fill="rgba(53,224,208,0.08)" stroke="#35e0d0" stroke-width="2"/>
    <text x="360" y="41" fill="#35e0d0" text-anchor="middle">SW1</text>
    <text x="360" y="58" fill="#35e0d0" text-anchor="middle" font-size="10">ROOT BRIDGE</text>
    <!-- sw2 -->
    <rect x="80" y="200" width="140" height="46" rx="7" fill="none" stroke="#e8edf4" stroke-width="1.6"/>
    <text x="150" y="228" fill="#e8edf4" text-anchor="middle">SW2</text>
    <!-- sw3 -->
    <rect x="500" y="200" width="140" height="46" rx="7" fill="none" stroke="#e8edf4" stroke-width="1.6"/>
    <text x="570" y="228" fill="#e8edf4" text-anchor="middle">SW3</text>
    <!-- links -->
    <line x1="305" y1="66" x2="175" y2="200" stroke="#35e0d0" stroke-width="2.5"/>
    <text x="200" y="125" fill="#94a1b3" font-size="11">forwarding</text>
    <line x1="415" y1="66" x2="545" y2="200" stroke="#35e0d0" stroke-width="2.5"/>
    <text x="520" y="125" fill="#94a1b3" font-size="11" text-anchor="end">forwarding</text>
    <line x1="220" y1="223" x2="500" y2="223" stroke="#e8b04b" stroke-width="2.5" stroke-dasharray="7 6"/>
    <text x="360" y="214" fill="#e8b04b" text-anchor="middle" font-size="11">BLOCKED — loop broken here</text>
    <!-- x mark -->
    <g stroke="#e8b04b" stroke-width="2.5">
      <line x1="352" y1="215" x2="368" y2="231"/>
      <line x1="368" y1="215" x2="352" y2="231"/>
    </g>
    <text x="360" y="278" fill="#5c6a7d" text-anchor="middle" font-size="11">if either forwarding link fails, the blocked port wakes and takes over</text>
  </g>
</svg>
<figcaption>fig 2 — a triangle becomes a tree: same cables, one path</figcaption>
</figure>

The redundancy isn't wasted — it's *parked*. When a forwarding link
fails, spanning tree recalculates and the blocked port starts
forwarding. Classic STP took 30–50 seconds to do this; **Rapid PVST+**
— the flavour on the exam and on Cisco kit — does it in a few seconds
or less.

## How the tree gets chosen (the exam's favourite ritual)

Switches exchange hello messages called **BPDUs**, and three
elections follow, always in this order:

1. **Root bridge.** The switch with the lowest **bridge ID** — priority
   first (default 32768), lowest MAC as the tie-break — becomes the
   root, the trunk of the tree. All its ports forward. In practice:
   *if you don't set a priority, your oldest, sickest switch wins*,
   because old kit has low MACs. Real networks set the core switch's
   priority deliberately.
2. **Root ports.** Every non-root switch picks its one cheapest path
   toward the root (port costs scale with link speed) and marks that
   port as its root port.
3. **Designated ports.** Every link needs exactly one forwarding end;
   the side with the cheapest path to root wins. Whatever is left
   over — neither root nor designated — **blocks**. That's the parked
   port in the diagram.

`show spanning-tree` narrates all of this: who the root is, which
role each port holds, and what it would cost to reach the trunk.

## The two commands that prevent 2 a.m. phone calls

Access ports — the ones facing PCs and printers — should never
participate in tree-building, and STP offers two guard rails the exam
expects you to know:

- **PortFast** skips the listening/learning wait on access ports so a
  freshly-connected PC gets link instantly (and DHCP doesn't time out
  while STP deliberates).
- **BPDU Guard** shuts an access port the instant a BPDU arrives on
  it — because a BPDU on an access port means someone has plugged in
  a switch where a PC belongs. That "someone brought a switch from
  home" scenario is precisely how the storm in act one gets started.

```
SW1(config-if)# spanning-tree portfast
SW1(config-if)# spanning-tree bpduguard enable
```

> **Keep the model small:** frames are immortal, so loops are fatal;
> a tree has no loops, so STP builds one; blocked ports are the price,
> and they're also the spare tyre. Everything else — roles, states,
> timers, elections — is bookkeeping in service of that one idea.

---

*This article assumes the flooding behaviour covered in
[The Life of a Frame](/articles/life-of-a-frame/) — if floods feel
fuzzy, read that first and this one becomes obvious.*
