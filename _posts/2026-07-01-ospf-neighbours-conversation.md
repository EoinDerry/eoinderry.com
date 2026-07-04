---
title: "OSPF Neighbour States, Explained as a Conversation"
description: >-
  Down, Init, 2-Way, ExStart, Exchange, Loading, Full — seven states
  that read like alphabet soup until you realise they're just two
  routers being introduced, agreeing on rules, and swapping notes.
date: 2026-07-01
domain: ip-connectivity
---

The OSPF neighbour state machine is a rite of passage. Seven states,
usually presented as a list to memorise, usually forgotten by Friday.
But the states aren't arbitrary — they're the only sensible way two
routers *could* become neighbours. Play it out as a conversation and
you'll never need the flashcards again.

## The setting

Two routers, R1 and R2, on the same segment. Each is running OSPF and
multicasting Hello packets to `224.0.0.5` every 10 seconds, the way a
lighthouse sweeps its beam — not aimed at anyone, just announcing
"I exist, here are my details."

## Act one: the introduction

**Down.** R1 has heard nothing from R2. Not an error — just the
starting line. Every neighbour you've ever formed began at Down.

**Init.** R1 receives a Hello from R2. "Someone's out there." But look
inside that Hello: R2 lists the neighbours *it* has heard from, and R1
isn't on the list yet. The conversation is still one-way — I can hear
you, but I don't know that you can hear me.

**2-Way.** A Hello arrives from R2 with **R1's own Router ID inside
it**. That changes everything: R1 now knows R2 can hear *it*. Both
directions confirmed. This is the handshake completing — and it's the
state where DR/BDR election happens on multi-access networks.

> **Exam trap:** on Ethernet segments, two DROTHER routers stop here
> *permanently*. "Stuck in 2-Way" between non-DR routers isn't a
> fault — it's the design. They save their full conversations for the
> DR and BDR.

## Act two: agreeing how to talk

**ExStart.** The routers are about to exchange their link-state
databases, but first they need ground rules: who speaks first, and
what sequence numbers to use. The higher Router ID becomes the master
of the exchange. Think of two colleagues agreeing an agenda before a
meeting — brief, procedural, essential.

**Exchange.** Now they swap **Database Description (DBD) packets** —
not the full database, just the table of contents. "Here's a summary
of every LSA I hold." Each router checks the other's list against its
own, noting anything it's missing or anything newer than its copy.

## Act three: filling the gaps

**Loading.** Each router requests the specific entries it lacks —
Link-State Request out, Link-State Update back, acknowledgements
throughout. This is the librarian phase: comparing catalogues, then
fetching only the missing books.

**Full.** Databases identical. The adjacency is complete, and only now
does OSPF do the thing we actually wanted: run Dijkstra's SPF algorithm
over that shared database and install routes. Neighbours in Full are
what `show ip ospf neighbor` should show you on a healthy network:

```
R1# show ip ospf neighbor

Neighbor ID     Pri   State           Dead Time   Address         Interface
2.2.2.2           1   FULL/DR         00:00:36    10.0.12.2       Gi0/0
```

## Why troubleshooting maps straight onto the states

Here's the payoff for learning it as a story: **where the conversation
stalls tells you what's wrong.**

| Stuck at | The conversation failed at | Usual suspects |
|----------|---------------------------|----------------|
| Down | Nothing heard at all | Interface down, OSPF not enabled, ACL blocking 224.0.0.5 |
| Init | They can't hear us | One-way traffic; often an ACL or mismatched authentication |
| 2-Way | (Often not a fault) | DROTHER–DROTHER on a LAN is normal here |
| ExStart/Exchange | Agreeing rules | **MTU mismatch** — the classic; also duplicate Router IDs |
| Loading | Fetching LSAs | Corrupted/mismatched LSAs, packet loss |

Note what's *not* in the table: Hello parameter mismatches — timers,
area ID, subnet mask, authentication — prevent the relationship from
ever leaving Down/Init, because the Hellos are rejected on arrival.
The exam loves asking which parameters must match. The conversation
model gives you the answer: anything carried in the Hello, checked at
the introduction stage.

## The whole story in five lines

- **Down → Init → 2-Way:** can we hear each other? (Hellos)
- **ExStart:** who leads, and what are the rules? (master/slave)
- **Exchange:** what do you know? (DBD summaries)
- **Loading:** send me what I'm missing. (LSR/LSU)
- **Full:** we know the same things. Now let's route. (SPF)

Two routers being introduced, agreeing on rules, and swapping notes
until their maps match. That's OSPF adjacency — and no flashcard
required.

---

*Coming later in this domain: why the DR exists at all — and what
happens to this conversation on point-to-point links where nobody
needs one.*
