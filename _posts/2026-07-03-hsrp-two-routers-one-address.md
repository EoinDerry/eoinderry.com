---
title: "HSRP: Two Routers, One Address"
description: >-
  Every host on the LAN trusts a single default gateway — a single
  point of failure with excellent PR. First-hop redundancy protocols
  fix it with a small, elegant lie.
date: 2026-07-03
domain: ip-connectivity
---

Here's an uncomfortable audit of a typical office network: redundant
core switches, redundant WAN links, redundant power — and every single
PC configured with **one** default gateway address. If the router
holding that address dies, every host on the floor is stranded, and
not one of them will do anything about it. PCs don't run routing
protocols. They were told the gateway is 10.1.1.1, and they will keep
sending frames to a corpse until someone reboots their faith.

The fix is a **First-Hop Redundancy Protocol (FHRP)**, and the one
Cisco examines is **HSRP** — the Hot Standby Router Protocol. Its
trick is beautifully dishonest: if hosts insist on trusting a single
address, *make the address immortal* by letting routers take turns
being it.

## The virtual router

Two real routers share the segment. Neither gives its own address to
the hosts. Instead, HSRP invents a third, **virtual** router — a
virtual IP address and a matching virtual MAC address — and that
virtual identity is what every PC uses as its gateway.

<figure class="fig">
<svg viewBox="0 0 720 310" role="img" aria-label="HSRP virtual gateway shared by an active and standby router">
  <g font-family="IBM Plex Mono, monospace" font-size="12">
    <!-- virtual router -->
    <rect x="270" y="18" width="180" height="52" rx="7" fill="rgba(53,224,208,0.08)" stroke="#35e0d0" stroke-width="2" stroke-dasharray="7 5"/>
    <text x="360" y="40" fill="#35e0d0" text-anchor="middle">VIRTUAL GATEWAY</text>
    <text x="360" y="58" fill="#35e0d0" text-anchor="middle" font-size="11">10.1.1.1 · 0000.0c07.ac05</text>
    <!-- real routers -->
    <rect x="90" y="120" width="180" height="52" rx="7" fill="none" stroke="#e8edf4" stroke-width="1.6"/>
    <text x="180" y="142" fill="#e8edf4" text-anchor="middle">R1 · 10.1.1.2</text>
    <text x="180" y="160" fill="#35e0d0" text-anchor="middle" font-size="11">ACTIVE — answers as .1</text>
    <rect x="450" y="120" width="180" height="52" rx="7" fill="none" stroke="#e8edf4" stroke-width="1.6"/>
    <text x="540" y="142" fill="#e8edf4" text-anchor="middle">R2 · 10.1.1.3</text>
    <text x="540" y="160" fill="#e8b04b" text-anchor="middle" font-size="11">STANDBY — listening</text>
    <!-- links from virtual to real -->
    <line x1="310" y1="70" x2="200" y2="120" stroke="#35e0d0" stroke-width="2"/>
    <line x1="410" y1="70" x2="520" y2="120" stroke="#26303f" stroke-width="2" stroke-dasharray="5 5"/>
    <!-- hello exchange -->
    <line x1="270" y1="146" x2="450" y2="146" stroke="#94a1b3" stroke-width="1.5" stroke-dasharray="3 4"/>
    <text x="360" y="138" fill="#94a1b3" text-anchor="middle" font-size="10">hellos · 224.0.0.102</text>
    <!-- hosts -->
    <rect x="150" y="238" width="90" height="34" rx="5" fill="none" stroke="#94a1b3"/>
    <text x="195" y="260" fill="#94a1b3" text-anchor="middle" font-size="11">PC-A</text>
    <rect x="315" y="238" width="90" height="34" rx="5" fill="none" stroke="#94a1b3"/>
    <text x="360" y="260" fill="#94a1b3" text-anchor="middle" font-size="11">PC-B</text>
    <rect x="480" y="238" width="90" height="34" rx="5" fill="none" stroke="#94a1b3"/>
    <text x="525" y="260" fill="#94a1b3" text-anchor="middle" font-size="11">PC-C</text>
    <text x="360" y="298" fill="#5c6a7d" text-anchor="middle" font-size="11">every host: gateway = 10.1.1.1 — none of them know or care which router that is</text>
  </g>
</svg>
<figcaption>fig 1 — the hosts trust an address that no single router owns</figcaption>
</figure>

At any moment one router is **active** — it answers ARP for the
virtual IP and forwards everything sent to the virtual MAC. The other
is **standby**, doing nothing but listening to the active router's
multicast hellos (to 224.0.0.102, every 3 seconds by default). Miss
hellos for the hold time — 10 seconds — and the standby concludes the
active is dead, assumes the virtual identity, and starts forwarding.

The masterstroke is the **virtual MAC** (`0000.0c07.acXX`, where XX is
the HSRP group number in hex). Because the *MAC itself* moves to the
new active router, the PCs' ARP caches remain perfectly correct
through the failover. The hosts notice nothing. Convergence happens
entirely on the router side; the client side never even blinks.

## The configuration is four lines

```
R1(config)# interface gi0/0
R1(config-if)# ip address 10.1.1.2 255.255.255.0
R1(config-if)# standby 5 ip 10.1.1.1
R1(config-if)# standby 5 priority 110
R1(config-if)# standby 5 preempt
```

R2 gets the same `standby 5 ip`, keeps the default priority (100),
and the higher priority wins the active role. Two details carry most
of the exam weight:

- **Preempt is off by default.** Without `preempt`, a recovered
  ex-active router with the better priority politely stays standby
  forever. If a question shows the "wrong" router active despite a
  higher priority, the missing word is *preempt*.
- **Priority beats address, but only at election time.** Ties break
  on the higher interface IP. And the election only re-runs when the
  active fails or someone preempts — HSRP is not constantly
  re-adjudicating.

## The family, for one exam question's worth of attention

The blueprint says "first hop redundancy protocols" plural, so know
the roster: **HSRP** (Cisco's, the one above), **VRRP** (the open
standard, same idea, active/standby become master/backup), and
**GLBP** (Cisco again, adds load-balancing across gateways rather
than leaving standby idle). The concept — virtual IP, virtual MAC,
hellos, failover — is identical across all three; learn it once.

> **Design note worth carrying to work:** HSRP protects against a
> *router* failing, not a *path* failing. If the active router's WAN
> link dies but its LAN interface stays up, it remains active — and
> becomes a black hole. That's what interface tracking (decrementing
> priority when an uplink drops) exists for, and why grown-up HSRP
> configs always track something.

---

*This closes the loop opened in
[How a Router Chooses](/articles/how-a-router-chooses/): that article
was about routers picking paths; this one is about hosts surviving
the death of the only path they know.*
