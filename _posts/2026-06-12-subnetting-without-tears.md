---
title: "Subnetting Without Tears: A Method That Sticks"
description: >-
  Forget the magic tables and finger-counting tricks. Subnetting becomes
  easy the moment you stop treating it as arithmetic and start treating
  it as drawing a line through a binary number.
date: 2026-06-12
domain: fundamentals
---

Every CCNA student hits the subnetting wall, and most of them hit it for
the same reason: they were handed a *procedure* before they were given
the *picture*. The procedures work — until the exam asks the question
sideways, and then they collapse. So let's build the picture first.

## One idea: an IP address is a street address with a fold in it

An IPv4 address is 32 bits. The subnet mask does exactly one job: it
folds that address into two parts. Everything to the left of the fold
is the **network** — the street. Everything to the right is the
**host** — the door number.

That's the entire concept. `/24` means "the fold is after bit 24".
Subnetting is nothing more than deciding where the fold goes.

```
192.168.1.130/26

11000000.10101000.00000001.10 | 000010
        network (26 bits)       host (6 bits)
```

Move the fold right and you create more, smaller streets. Move it left
and you merge streets into fewer, bigger ones. Every subnetting question
ever written is asking about that fold — where it is, or what falls on
each side of it.

## The only three numbers you need

From the fold, everything else is derivable on the spot:

| Question | Answer |
|----------|--------|
| How many host bits? | `32 − prefix` |
| How many addresses per subnet? | `2^(host bits)` |
| How many *usable* hosts? | `2^(host bits) − 2` |

For `/26`: host bits = 6, block size = 64, usable = 62. Notice that we
never consulted a table. The famous "magic number" — the block size — is
just `2^(host bits)` wearing a costume.

## Finding the subnet an address lives in

Here's the move that turns a 90-second panic into a 10-second answer.
Take `192.168.1.130/26`:

1. Host bits = 6, so the block size is 64.
2. Subnets in the last octet therefore start at 0, 64, 128, 192.
3. 130 falls between 128 and 192.

So the network is `192.168.1.128`, the broadcast is `192.168.1.191`,
and the usable range is `.129` through `.190`. Done. No binary
conversion at the desk — the binary already did its work when it gave
us the block size.

> **Habit worth building:** whenever you see a prefix, say the block
> size out loud. /25 → 128. /26 → 64. /27 → 32. /28 → 16. /29 → 8.
> /30 → 4. Within a week it's reflex, and reflex is what the exam
> clock rewards.

## Why the two "missing" addresses matter

Every subnet burns its first address (the network itself) and its last
(the broadcast). Students memorise the "minus two" and move on, but
knowing *why* pays off later:

- The **network address** is how routing tables refer to the whole
  street. A router doesn't track your door number; it tracks streets.
- The **broadcast address** is the "everyone on this street" address —
  and understanding it is the seed for understanding ARP, DHCP
  discovery, and why we segment networks at all.

The exceptions prove you understand the rule: a `/31` keeps both
addresses because point-to-point links have no one else to broadcast
to, and a `/32` is a single host — a name for one door with no street
attached.

## Practise the way the exam asks

Three question shapes cover nearly everything you'll face:

1. **"What subnet is this host on?"** — block size, count up, bracket
   the address. The worked example above.
2. **"Which mask gives me N hosts?"** — find the smallest power of two
   that is ≥ N + 2, and that's your host bits. Sixty hosts? 64 = 2⁶,
   so 6 host bits, so `/26`.
3. **"Is this address usable?"** — find the subnet, then check whether
   the address is the network, the broadcast, or something in between.

Ten minutes a day for two weeks beats a six-hour cram, because the goal
isn't knowledge — it's *speed*. On exam day you should resent subnetting
questions only because they're too easy to be worth the marks.

---

*Next in this domain: how those "streets" get advertised between
routers — which is where the [IP Connectivity](/roadmap/#ip-connectivity)
domain picks up the story.*
