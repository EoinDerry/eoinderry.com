---
title: "VLANs: Fences for Floods"
description: >-
  A switch floods by design — and every host you add makes the flooding
  worse. VLANs are the fix: one physical switch carved into several
  logical ones, with a four-byte tag doing all the work.
date: 2026-06-24
domain: network-access
---

In [The Life of a Frame](/articles/life-of-a-frame/) we established the
switch's core habit: when it doesn't know where a destination lives —
or when the frame is a broadcast — it **floods**, copying the frame out
of every port. That habit is what makes a switch self-configuring. It's
also a tax, and the tax rises with every host you plug in.

Every ARP request, every DHCP discover, every "is anyone there?"
chirp from every device interrupts **every other device** in the
network. A hundred hosts sharing one flood zone is noisy. A thousand
is pathological. The flood zone has a formal name — a **broadcast
domain** — and the VLAN is the tool that fences it.

## One switch, several networks

A VLAN (Virtual LAN) tells a switch: *treat these ports as one
network, and those ports as another — and never bridge between them.*
Frames, floods and broadcasts stay inside their own VLAN as strictly
as if you'd bought two separate switches.

<figure class="fig">
<svg viewBox="0 0 720 250" role="img" aria-label="One switch divided into two VLANs">
  <g font-family="IBM Plex Mono, monospace" font-size="12">
    <!-- switch body -->
    <rect x="180" y="90" width="360" height="70" rx="8" fill="none" stroke="#e8edf4" stroke-width="2"/>
    <text x="360" y="83" fill="#94a1b3" text-anchor="middle" font-size="11">one physical switch</text>
    <!-- vlan partition -->
    <line x1="360" y1="90" x2="360" y2="160" stroke="#e8b04b" stroke-width="2" stroke-dasharray="6 5"/>
    <text x="360" y="180" fill="#e8b04b" text-anchor="middle" font-size="11">no bridging between VLANs</text>
    <!-- vlan labels -->
    <rect x="196" y="104" width="150" height="42" rx="5" fill="rgba(53,224,208,0.08)" stroke="#35e0d0"/>
    <text x="271" y="130" fill="#35e0d0" text-anchor="middle">VLAN 10 · SALES</text>
    <rect x="374" y="104" width="150" height="42" rx="5" fill="rgba(148,163,184,0.08)" stroke="#94a1b3"/>
    <text x="449" y="130" fill="#94a1b3" text-anchor="middle">VLAN 20 · ENG</text>
    <!-- hosts top -->
    <rect x="196" y="18" width="64" height="30" rx="5" fill="none" stroke="#35e0d0"/>
    <text x="228" y="38" fill="#35e0d0" text-anchor="middle" font-size="11">PC-A</text>
    <rect x="282" y="18" width="64" height="30" rx="5" fill="none" stroke="#35e0d0"/>
    <text x="314" y="38" fill="#35e0d0" text-anchor="middle" font-size="11">PC-B</text>
    <rect x="374" y="18" width="64" height="30" rx="5" fill="none" stroke="#94a1b3"/>
    <text x="406" y="38" fill="#94a1b3" text-anchor="middle" font-size="11">PC-C</text>
    <rect x="460" y="18" width="64" height="30" rx="5" fill="none" stroke="#94a1b3"/>
    <text x="492" y="38" fill="#94a1b3" text-anchor="middle" font-size="11">PC-D</text>
    <!-- host links -->
    <line x1="228" y1="48" x2="228" y2="104" stroke="#35e0d0" stroke-width="1.5"/>
    <line x1="314" y1="48" x2="314" y2="104" stroke="#35e0d0" stroke-width="1.5"/>
    <line x1="406" y1="48" x2="406" y2="104" stroke="#94a1b3" stroke-width="1.5"/>
    <line x1="492" y1="48" x2="492" y2="104" stroke="#94a1b3" stroke-width="1.5"/>
    <!-- flood note -->
    <text x="271" y="215" fill="#5c6a7d" text-anchor="middle" font-size="11">PC-A's broadcast reaches PC-B only</text>
    <text x="449" y="215" fill="#5c6a7d" text-anchor="middle" font-size="11">C and D never hear it</text>
  </g>
</svg>
<figcaption>fig 1 — two broadcast domains sharing one chassis</figcaption>
</figure>

The configuration is almost anticlimactic:

```
SW1(config)# vlan 10
SW1(config-vlan)# name SALES
SW1(config)# interface range gi0/1 - 12
SW1(config-if-range)# switchport mode access
SW1(config-if-range)# switchport access vlan 10
```

An **access port** belongs to exactly one VLAN. The PC plugged into it
has no idea VLANs exist — it sends ordinary frames, and the switch
quietly files them under VLAN 10. Which raises the real question…

## How VLANs survive the journey between switches

Sales people sit on two floors, on two switches. Frames from VLAN 10
on SW1 must reach VLAN 10 on SW2 — without mixing with VLAN 20 traffic
crossing the same cable. Two links per VLAN would work and scales
horribly. The actual answer is a **trunk**: one link that carries all
VLANs, with each frame labelled so the far switch knows where it
belongs.

The label is the **802.1Q tag** — four bytes inserted *into* the
Ethernet header, of which twelve bits carry the VLAN ID (hence the
4,094 usable VLANs). The receiving switch reads the tag, strips it,
and delivers the frame inside the right fence. Hosts never see a tag
in their lives.

```
SW1(config)# interface gi0/24
SW1(config-if)# switchport mode trunk
SW1(config-if)# switchport trunk allowed vlan 10,20
```

> **The native VLAN wrinkle:** one VLAN per trunk (VLAN 1 by default)
> travels *untagged*. It exists for backwards compatibility, and it's
> examined two ways: the native VLAN must **match on both ends** of a
> trunk, and security guidance says change it to an unused VLAN.
> Mismatched natives quietly leak traffic between VLANs — the exact
> thing VLANs exist to prevent.

## The bill arrives: routing between fences

Here's the consequence students miss: two VLANs are two networks
*at Layer 3 as well*. Different subnets, and no amount of switch
configuration will move a packet between them. Crossing a fence
requires a router — whether that's a "router-on-a-stick" hanging off a
trunk, or (in any modern building) a Layer 3 switch doing
**inter-VLAN routing** in silicon.

That's not a flaw. It's the point. The fence gives you a *policy
chokepoint*: sales traffic can only reach engineering through a
routed hop, and a routed hop is somewhere you can put an access list,
a firewall, a policy. VLANs don't just cut noise — they create the
places where security gets enforced. Which is exactly where
[the ACL article](/roadmap/#security) picks up the story.

## What the exam will do to you

- Give you `show vlan brief` output and ask which ports flood to
  which. (Trace the fences.)
- Describe two PCs in the same VLAN, same switch, different subnets —
  and ask why they can't talk. (Same fence, but Layer 3 still rules.)
- Ask what happens to a frame arriving on a trunk with no tag. (It
  joins the native VLAN.)
- Mismatch something — native VLANs, allowed lists — and ask why users
  are unreachable.

Every one of those unravels from the same thread: a VLAN is a
broadcast-domain fence, the tag is the passport, and Layer 3 is the
only gate between fences.

---

*Coming next in this domain: what happens when you build redundant
links between switches — and why the cure for loops is
[a tree](/articles/spanning-tree-the-loop-that-kills/).*
