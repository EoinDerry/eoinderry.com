---
title: "NAT: The Great Address Illusion"
description: >-
  The internet ran out of addresses decades ago, and the workaround
  became the architecture: how one public IP hides an entire building,
  and the four confusing terms that describe it.
date: 2026-06-19
domain: ip-services
---

IPv4 has about 4.3 billion addresses. Humanity has vastly more
devices. The arithmetic stopped working in the 1990s, and the fix that
carried the internet through the decades since is a magnificent hack:
let everyone use the same **private addresses** indoors, and translate
at the border. That translation is **NAT** — Network Address
Translation — and your CCNA expects you to understand it, configure
it, and survive its terminology.

## Private indoors, public outdoors

RFC 1918 reserves three ranges that will never be routed on the public
internet: `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`. Every
office and home on Earth reuses them freely — your `10.1.1.50` and my
`10.1.1.50` never collide, because those addresses never leave the
building. When your packet heads for the internet, the border router
swaps the private source address for the router's own **public** one,
and remembers the swap so the reply can find its way back.

That memory — the **translation table** — is the entire mechanism.
NAT is just consistent lying plus a good notebook.

## PAT: the version that actually runs the world

Plain one-to-one NAT (one private address ↔ one public address) is
rare — it would need a public address per host, which is the shortage
we started with. The workhorse is **PAT** — Port Address Translation,
"NAT overload" in Cisco-speak — where *hundreds* of inside hosts share
**one** public address, kept distinct by translating the source
**port** as well:

<figure class="fig">
<svg viewBox="0 0 720 300" role="img" aria-label="PAT translating two inside hosts through one public address">
  <g font-family="IBM Plex Mono, monospace" font-size="12">
    <!-- hosts -->
    <rect x="30" y="40" width="150" height="36" rx="5" fill="none" stroke="#94a1b3"/>
    <text x="105" y="63" fill="#94a1b3" text-anchor="middle" font-size="11">10.1.1.50 :3311</text>
    <rect x="30" y="200" width="150" height="36" rx="5" fill="none" stroke="#94a1b3"/>
    <text x="105" y="223" fill="#94a1b3" text-anchor="middle" font-size="11">10.1.1.51 :3311</text>
    <!-- router -->
    <rect x="280" y="108" width="160" height="60" rx="8" fill="rgba(53,224,208,0.08)" stroke="#35e0d0" stroke-width="2"/>
    <text x="360" y="133" fill="#35e0d0" text-anchor="middle">NAT router</text>
    <text x="360" y="152" fill="#35e0d0" text-anchor="middle" font-size="11">public 203.0.113.7</text>
    <!-- internet -->
    <rect x="560" y="112" width="130" height="52" rx="8" fill="none" stroke="#e8edf4" stroke-width="1.6"/>
    <text x="625" y="143" fill="#e8edf4" text-anchor="middle">internet</text>
    <!-- flows in -->
    <line x1="180" y1="58" x2="280" y2="122" stroke="#94a1b3" stroke-width="1.6"/>
    <line x1="180" y1="218" x2="280" y2="154" stroke="#94a1b3" stroke-width="1.6"/>
    <!-- flows out -->
    <line x1="440" y1="130" x2="560" y2="130" stroke="#35e0d0" stroke-width="2"/>
    <text x="500" y="121" fill="#35e0d0" text-anchor="middle" font-size="10">203.0.113.7:20001</text>
    <line x1="440" y1="150" x2="560" y2="150" stroke="#35e0d0" stroke-width="2"/>
    <text x="500" y="167" fill="#35e0d0" text-anchor="middle" font-size="10">203.0.113.7:20002</text>
    <!-- table -->
    <rect x="150" y="255" width="420" height="34" rx="5" fill="none" stroke="#26303f"/>
    <text x="360" y="277" fill="#5c6a7d" text-anchor="middle" font-size="11">table: 10.1.1.50:3311 ↔ :20001 · 10.1.1.51:3311 ↔ :20002</text>
  </g>
</svg>
<figcaption>fig 1 — two hosts, identical source ports, one public IP: the translated port keeps them separate</figcaption>
</figure>

Both hosts even chose the same source port — no matter. The router
assigns each flow its own public-side port and logs the mapping. With
~64,000 ports to hand out, one public address comfortably fronts an
office. This is what your home router has been doing, silently, your
entire life.

## The four terms designed to hurt you

Cisco names every address from the *router's* point of view, on two
axes: **inside/outside** (whose address is it?) and **local/global**
(as seen from where?).

| Term | Meaning | In fig 1 |
|------|---------|----------|
| Inside local | Your host, as seen indoors | 10.1.1.50 |
| Inside global | Your host, as the internet sees it | 203.0.113.7 |
| Outside global | The remote server's real address | the web server |
| Outside local | The remote server, as seen indoors | usually the same |

Ninety per cent of exam questions live on the first two rows. The
mnemonic that sticks: **"inside local" = the LAN sticker; "inside
global" = the passport photo.** Same host, different documents.

## Configuring PAT in four moves

```
R1(config)# interface gi0/0
R1(config-if)# ip nat inside
R1(config)# interface gi0/1
R1(config-if)# ip nat outside
R1(config)# access-list 1 permit 10.1.1.0 0.0.0.255
R1(config)# ip nat inside source list 1 interface gi0/1 overload
```

Read the last line the way the router does: "translate sources
matching list 1, to the address of gi0/1, and *overload* it" —
overload being the keyword that turns on port translation. Forget it
and only one host works at a time, which is also a classic
troubleshooting question. Verification is one command with a very
readable output:

```
R1# show ip nat translations
Pro  Inside global      Inside local     Outside local    Outside global
tcp  203.0.113.7:20001  10.1.1.50:3311   198.51.100.9:443 198.51.100.9:443
```

## What NAT costs

Honesty section. NAT breaks the internet's original symmetry: an
outside host cannot initiate a connection *inward*, because there's no
table entry until an inside host creates one. For security that's an
accidental bonus; for anything peer-to-peer it's a tax the whole
industry pays in workarounds. Static NAT entries (one fixed
inside↔outside mapping) exist to punch specific holes — the mail
server, the VPN concentrator — and IPv6's vast address space exists,
in part, so that one day none of this pantomime is necessary. The exam
still expects you to appreciate both truths: NAT saved IPv4, and NAT
is a workaround, not a virtue.

---

*NAT hands out disguises; DHCP hands out the addresses themselves —
that's [the DORA handshake](/articles/dhcp-the-dora-handshake/),
next in this domain.*
