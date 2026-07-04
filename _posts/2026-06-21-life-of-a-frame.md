---
title: "The Life of a Frame: How a Switch Actually Learns"
description: >-
  Flooding, learning, forwarding — the three behaviours that make a
  switch a switch. Watch one frame cross a network and the whole of
  Layer 2 stops being folklore.
date: 2026-06-21
domain: network-access
---

Ask a room of students what a switch does and you'll hear "it sends
frames to the right port". True — but *how does it know which port is
right?* Nobody configured it. There's no protocol negotiating it. The
answer is one of the most elegant tricks in networking, and once you've
seen it, half the Network Access domain falls into place.

## The switch starts life knowing nothing

Power on a switch and its **MAC address table** is empty. It has no
idea what's plugged in where. So when the first frame arrives — say
PC-A on port `Gi0/1` sending to PC-B — the switch faces a problem: the
destination MAC isn't in its table.

Its response is gloriously humble: **flood it**. Send a copy out of
every port except the one it arrived on. Crude? Yes. But it guarantees
the frame reaches PC-B wherever it is, and it costs the switch nothing
it wasn't willing to spend.

## The trick: learn from the source, forward by the destination

Here's the part students routinely get backwards, so read it twice:

> A switch **learns** from the **source** MAC of frames it receives,
> and **forwards** based on the **destination** MAC.

When PC-A's frame arrived on `Gi0/1`, the switch quietly noted the
*source* address: "MAC `aaaa.aaaa.aaaa` lives out of `Gi0/1`." It
learned that *before* it flooded anything. Then, when PC-B replies, the
switch learns B's location the same way — and this time the reply's
destination (PC-A) is already in the table, so no flood is needed.
It's forwarded out of `Gi0/1` alone.

Two frames. Both hosts learned. The network taught itself.

```
SW1# show mac address-table dynamic
          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    aaaa.aaaa.aaaa    DYNAMIC     Gi0/1
   1    bbbb.bbbb.bbbb    DYNAMIC     Gi0/2
```

That table is the entire intelligence of a switch. Every entry says
"to reach this MAC, use this port" — and every entry was learned by
eavesdropping on source addresses.

## The three verbs, formally

Cisco frames this as three behaviours, and the exam will expect you to
know which one applies when a frame arrives:

1. **Forward** — destination MAC is in the table, and it maps to a
   different port than the frame arrived on. Send it there. Only there.
2. **Flood** — destination MAC is *not* in the table (an **unknown
   unicast**), or it's a broadcast (`ffff.ffff.ffff`). Copy to all
   ports in that VLAN except the arrival port.
3. **Filter** — destination MAC maps to the *same* port the frame
   arrived on (two devices on a hub, say). Drop it; delivering it
   would be pointless.

Notice broadcast is just permanent, deliberate flooding. ARP depends
on it — which is why "how does ARP work?" and "how does a switch work?"
are secretly the same exam topic.

## Ageing: why the table doesn't grow forever

Dynamic entries expire — 300 seconds by default on Cisco switches. If
a host stays silent for five minutes, it's forgotten, and the next
frame for it gets flooded again until it speaks. This matters for two
reasons:

- It keeps the table honest when devices move ports.
- It explains those "why did I capture someone else's traffic for a
  moment?" mysteries in packet captures — you were watching an unknown
  unicast flood.

## Why this design is the seed of everything else in the domain

Hold this model in your head and the rest of the Network Access domain
becomes a series of footnotes to it:

- **VLANs** exist because flooding is expensive, and every host you add
  makes it worse. A VLAN is just a fence around the flood.
- **Spanning tree** exists because flooding plus a physical loop equals
  a frame multiplying forever. STP breaks the loop so learning stays
  sane.
- **Port security** exists because "learn from any source address"
  is beautifully trusting — and attackers noticed.

Each of those gets its own article. But they'll all read easily now,
because they're all answers to problems this one behaviour creates.

---

*Try it yourself: two PCs and a switch in Packet Tracer,
`show mac address-table` before and after a single ping. Watching the
table populate in real time teaches this better than any diagram.*
