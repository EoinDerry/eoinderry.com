---
title: "ACLs: The Bouncer at Every Interface"
description: >-
  An access control list is a guest list read from the top, one line at
  a time, ending with an unwritten rule that rejects everyone else.
  Master three ideas and the whole topic folds flat.
date: 2026-06-26
domain: security
---

Every packet that crosses a router does so because nothing stopped
it. An **access control list** is how you change that: a numbered
list of permit and deny statements strapped to an interface, checked
against every packet like a bouncer checking a guest list. The CCNA
asks you to read them, write them, place them, and — most of all —
predict them. Three ideas do almost all the work.

## Idea one: top-down, first match, stop

An ACL is not weighed holistically. The router starts at line one and
takes **the first line that matches — then stops reading**. Nothing
below the match exists for that packet.

<figure class="fig">
<svg viewBox="0 0 720 300" role="img" aria-label="ACL top-down evaluation with implicit deny">
  <defs>
    <marker id="fa1" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0 0 L9 4 L0 8 Z" fill="#94a1b3"/>
    </marker>
  </defs>
  <g font-family="IBM Plex Mono, monospace" font-size="12.5">
    <text x="360" y="26" fill="#e8edf4" text-anchor="middle">packet: source 10.1.1.77 → server 10.9.9.10, tcp/443</text>
    <path d="M360 34 V56" stroke="#26303f" stroke-width="1.5" marker-end="url(#fa1)"/>
    <!-- line 10 -->
    <rect x="90" y="62" width="540" height="34" rx="5" fill="none" stroke="#26303f"/>
    <text x="110" y="84" fill="#94a1b3">10  permit tcp 10.1.2.0 0.0.0.255 any eq 443</text>
    <text x="650" y="84" fill="#5c6a7d" font-size="11">no match ↓</text>
    <!-- line 20 -->
    <rect x="90" y="106" width="540" height="34" rx="5" fill="none" stroke="#26303f"/>
    <text x="110" y="128" fill="#94a1b3">20  deny   ip  10.1.1.0 0.0.0.255 host 10.9.9.9</text>
    <text x="650" y="128" fill="#5c6a7d" font-size="11">no match ↓</text>
    <!-- line 30 matches -->
    <rect x="90" y="150" width="540" height="34" rx="5" fill="rgba(53,224,208,0.08)" stroke="#35e0d0" stroke-width="2"/>
    <text x="110" y="172" fill="#35e0d0">30  permit tcp 10.1.1.0 0.0.0.255 any eq 443</text>
    <text x="650" y="172" fill="#35e0d0" font-size="11">MATCH — stop</text>
    <!-- line 40 never read -->
    <rect x="90" y="194" width="540" height="34" rx="5" fill="none" stroke="#26303f" stroke-dasharray="5 5"/>
    <text x="110" y="216" fill="#5c6a7d">40  deny   ip  10.1.1.0 0.0.0.255 any</text>
    <text x="650" y="216" fill="#5c6a7d" font-size="11">never read</text>
    <!-- implicit deny -->
    <rect x="90" y="238" width="540" height="34" rx="5" fill="rgba(232,176,75,0.06)" stroke="#e8b04b" stroke-dasharray="6 5"/>
    <text x="110" y="260" fill="#e8b04b">--  deny ip any any        (implicit — never shown, always there)</text>
  </g>
</svg>
<figcaption>fig 1 — first match wins; the invisible last line catches everything else</figcaption>
</figure>

Order is therefore everything. The classic blunder: a broad `permit`
placed above a narrow `deny`, so the deny never fires. The rule of
craft that follows: **most specific lines first, broad strokes last.**

## Idea two: the implicit deny

Beneath every ACL's last visible line sits one you never typed and
can never remove: `deny ip any any`. An ACL isn't a filter with a
default of "carry on" — attaching it flips the interface's whole
policy to *deny by default*, and your permits are the exceptions.

Two practical corollaries. First: an ACL with only deny statements
blocks **everything** — the denials match their targets, and the
implicit deny devours the rest. Second: if you attach an ACL to your
management interface and forget to permit your own session's traffic,
you will learn about the implicit deny in the car park. Every network
engineer does this exactly once.

## Idea three: the wildcard mask — a subnet mask photographed in negative

ACLs match ranges using **wildcard masks**, where the bits are
inverted relative to the subnet masks you know: `0` means *must
match*, `255` means *don't care*.

| To match | Wildcard | Reading |
|----------|----------|---------|
| One host 10.1.1.5 | `10.1.1.5 0.0.0.0` | every bit must match (= `host 10.1.1.5`) |
| Subnet 10.1.1.0/24 | `10.1.1.0 0.0.0.255` | first three octets fixed |
| Subnet 172.16.32.0/20 | `172.16.32.0 0.0.15.255` | 255.255.240.0, inverted |
| Everything | `any` | shorthand for `0.0.0.0 255.255.255.255` |

The mechanical rule: **wildcard = 255.255.255.255 minus the subnet
mask**. For /20: 255.255.240.0 → 0.0.15.255. If you can do
[the subnetting method](/articles/subnetting-without-tears/), you can
do wildcards — it's the same skill in a mirror.

## Standard vs extended — and where each one stands guard

**Standard ACLs** (numbers 1–99) match on *source address only*.
**Extended ACLs** (100–199) match source, destination, protocol and
ports — everything in fig 1. That difference dictates placement, and
placement is a guaranteed exam question:

- **Extended ACLs go close to the source.** They're precise, so kill
  the unwanted traffic before it wastes a single hop.
- **Standard ACLs go close to the destination.** They're blunt — all
  they know is who's asking — so applying one early would block that
  source from *everything* beyond the interface, not just the thing
  you meant to protect.

Then the attachment itself, one ACL per interface, per direction:

```
R1(config)# ip access-list extended BLOCK-GUEST-DB
R1(config-ext-nacl)# deny tcp 10.1.50.0 0.0.0.255 host 10.9.9.20 eq 1433
R1(config-ext-nacl)# permit ip any any
R1(config-ext-nacl)# interface gi0/1
R1(config-if)# ip access-group BLOCK-GUEST-DB in
```

Note the closing `permit ip any any` — without it, the implicit deny
turns a one-rule block into a total outage. And note `in`: direction
is from the *router's* point of view, arriving or leaving, another
detail the exam checks by drawing you a topology and asking "which
interface, which direction?" (Answer it by walking the packet's path
and finding the earliest sensible checkpoint.)

## Verification, and the counter that tells the truth

```
R1# show access-lists
Extended IP access list BLOCK-GUEST-DB
    10 deny tcp 10.1.50.0 0.0.0.255 host 10.9.9.20 eq 1433 (147 matches)
    20 permit ip any any (89211 matches)
```

Those match counters are your lie detector. A rule with zero matches
either guards against something that never happens — or it's in the
wrong place, the wrong order, or the wrong direction. When an ACL
"isn't working", the counters almost always confess which.

---

*ACLs are the policy at the fence gates that
[VLANs](/articles/vlans-fences-for-floods/) created. The rest of this
domain — port security, DHCP snooping, AAA — is coming to the
[roadmap](/roadmap/#security) soon.*
