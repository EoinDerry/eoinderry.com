---
title: "DHCP: The Four-Step Handshake Nobody Notices"
description: >-
  Every device you've ever connected to Wi-Fi performed the same
  four-message ritual before it could do anything at all. Meet DORA —
  and the relay trick that lets one server address a whole company.
date: 2026-06-22
domain: ip-services
---

There's a conversation that happens billions of times a day and almost
nobody has ever seen it. A laptop wakes up on a new network knowing
precisely nothing — no address, no gateway, no DNS, not even who to
ask. Within about a second it has all four. The protocol is **DHCP**,
the ritual has four steps, and the exam expects you to know them by
their initials: **DORA**.

## The bootstrap problem

Savour the paradox first, because it explains every design choice: the
client needs an IP address *to communicate*, but needs to communicate
*to get an IP address*. The only tool that works before you have an
identity is the sledgehammer from
[the switching articles](/articles/life-of-a-frame/): **broadcast**.
Shout, and hope someone official is listening.

<figure class="fig">
<svg viewBox="0 0 720 330" role="img" aria-label="DHCP DORA four-message sequence">
  <defs>
    <marker id="da1" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0 0 L9 4 L0 8 Z" fill="#35e0d0"/>
    </marker>
    <marker id="da2" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0 0 L9 4 L0 8 Z" fill="#94a1b3"/>
    </marker>
  </defs>
  <g font-family="IBM Plex Mono, monospace" font-size="13">
    <rect x="70" y="16" width="130" height="34" rx="6" fill="none" stroke="#e8edf4" stroke-width="1.5"/>
    <text x="135" y="38" fill="#e8edf4" text-anchor="middle">Client</text>
    <rect x="520" y="16" width="130" height="34" rx="6" fill="none" stroke="#e8edf4" stroke-width="1.5"/>
    <text x="585" y="38" fill="#e8edf4" text-anchor="middle">DHCP server</text>
    <line x1="135" y1="50" x2="135" y2="310" stroke="#26303f" stroke-width="1.5"/>
    <line x1="585" y1="50" x2="585" y2="310" stroke="#26303f" stroke-width="1.5"/>
    <!-- D -->
    <line x1="135" y1="86" x2="577" y2="86" stroke="#35e0d0" stroke-width="2" marker-end="url(#da1)"/>
    <text x="360" y="76" fill="#35e0d0" text-anchor="middle">D · DISCOVER — broadcast</text>
    <text x="360" y="102" fill="#5c6a7d" text-anchor="middle" font-size="11">"Anyone out there a DHCP server? I'm 0.0.0.0."</text>
    <!-- O -->
    <line x1="585" y1="146" x2="143" y2="146" stroke="#94a1b3" stroke-width="2" marker-end="url(#da2)"/>
    <text x="360" y="136" fill="#94a1b3" text-anchor="middle">O · OFFER</text>
    <text x="360" y="162" fill="#5c6a7d" text-anchor="middle" font-size="11">"I am. How about 10.1.1.50, mask, gateway, DNS, 24h lease?"</text>
    <!-- R -->
    <line x1="135" y1="206" x2="577" y2="206" stroke="#35e0d0" stroke-width="2" marker-end="url(#da1)"/>
    <text x="360" y="196" fill="#35e0d0" text-anchor="middle">R · REQUEST — still broadcast</text>
    <text x="360" y="222" fill="#5c6a7d" text-anchor="middle" font-size="11">"Yes please, I formally request 10.1.1.50."</text>
    <!-- A -->
    <line x1="585" y1="266" x2="143" y2="266" stroke="#94a1b3" stroke-width="2" marker-end="url(#da2)"/>
    <text x="360" y="256" fill="#94a1b3" text-anchor="middle">A · ACK</text>
    <text x="360" y="282" fill="#5c6a7d" text-anchor="middle" font-size="11">"It's yours. Lease starts now."</text>
  </g>
</svg>
<figcaption>fig 1 — Discover, Offer, Request, Acknowledge: client messages are broadcast</figcaption>
</figure>

Two subtleties in that diagram carry exam weight:

- **The Request is still a broadcast.** Odd, since the client now
  knows the server's address — but there may have been *several*
  offers from several servers. Broadcasting the request lets the
  chosen server proceed and politely tells the losers to return their
  offers to the pool.
- **It's a lease, not a gift.** Addresses come with an expiry. The
  client renews at 50% of lease time (unicast this time — it has an
  address now), and if renewal keeps failing, the address eventually
  returns to the pool. That's how networks survive laptops that leave
  and never say goodbye.

## The relay problem — and `ip helper-address`

Broadcasts stop at routers. That's the whole point of
[VLANs and subnets](/articles/vlans-fences-for-floods/) — but it means
a DISCOVER shouted on VLAN 30 can never reach the DHCP server sitting
in the data-centre VLAN. Does every subnet need its own server?

No — the router betrays the broadcast, deliberately. One command on
the interface facing the clients:

```
R1(config)# interface gi0/0.30
R1(config-subif)# ip helper-address 10.9.9.10
```

The router hears the broadcast DISCOVER, repackages it as a **unicast**
to 10.9.9.10, and — crucially — stamps it with the subnet it came from
(the *giaddr* field, populated from the interface address). That stamp
is how one central server knows *which pool* to offer from: a
DISCOVER relayed from 10.1.30.1 gets an offer from the 10.1.30.0/24
pool. One server, every subnet, one line of config per interface.
That single command is among the most-asked pieces of trivia in this
domain, and now you know the *why* underneath it.

## Configuring the server side (routers can do it too)

Small sites often run DHCP on the router itself:

```
R1(config)# ip dhcp excluded-address 10.1.30.1 10.1.30.20
R1(config)# ip dhcp pool VLAN30
R1(dhcp-config)# network 10.1.30.0 255.255.255.0
R1(dhcp-config)# default-router 10.1.30.1
R1(dhcp-config)# dns-server 10.9.9.53
```

The **excluded-address** line is the one candidates forget: carve out
the addresses you've assigned by hand — gateways, printers, servers —
*before* the pool starts handing them to random laptops. `show ip
dhcp binding` lists every lease; `show ip dhcp conflict` lists the
collisions you get when you didn't.

## Why this article sits where it does

DORA is also the doorway to two neighbouring topics. The DISCOVER
being a broadcast is why DHCP behaviour changes at VLAN boundaries
(Network Access domain). And the fact that *any* device can answer a
DISCOVER — including an attacker's laptop offering itself as the
gateway — is the entire reason **DHCP snooping** exists in the
Security domain. The protocols connect; learn them as a web, not a
list.

---

*Previously in this domain:
[NAT](/articles/nat-the-great-address-illusion/) — what happens to
these freshly-leased private addresses the moment they head for the
internet.*
