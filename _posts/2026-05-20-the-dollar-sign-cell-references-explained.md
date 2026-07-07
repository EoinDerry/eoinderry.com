---
title: "The $ sign: cell references, finally explained"
description: Relative and absolute references are the first real idea in Excel — understand them once and copy-down stops being a gamble.
date: 2026-05-20
domain: foundations
---

Every Excel formula you'll ever write points at other cells. The `$`
sign controls *how* it points — and it's the first thing in Excel that
people learn as folklore ("just put dollars on it until it works")
instead of as the simple idea it actually is.

Here's the idea, once and properly.

## A reference is a set of directions, not an address

When you write `=B2*C2` in cell **D2**, Excel doesn't store "B2" and
"C2". It stores *"two cells to my left, times one cell to my left."*
Directions, relative to where the formula lives.

That's why copy-down works at all: paste the formula into **D3** and
the directions replay from the new starting point — `=B3*C3`. Nobody
"changed" your formula. It said *relative to me* all along.

<figure class="guide-fig">
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Relative references shift when copied down; absolute references stay locked">
  <style>.t{font:13px 'IBM Plex Mono',monospace;fill:#5A655E}.h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}.g{fill:#fff;stroke:#E6E4D9}.acc{fill:#EAF4EE;stroke:#0E7A4F}.ar{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#a)}</style>
  <defs><marker id="a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="80" y="24" class="h">RELATIVE — directions replay</text>
  <g>
    <rect x="80" y="40" width="150" height="34" class="g"/><text x="92" y="62" class="t">D2 =B2*C2</text>
    <rect x="80" y="74" width="150" height="34" class="acc"/><text x="92" y="96" class="t">D3 =B3*C3</text>
    <rect x="80" y="108" width="150" height="34" class="g"/><text x="92" y="130" class="t">D4 =B4*C4</text>
    <path d="M155 74 v-0" class="ar"/>
    <text x="80" y="170" class="t">copy down → rows move</text>
  </g>
  <text x="370" y="24" class="h">ABSOLUTE — $E$1 stays put</text>
  <g>
    <rect x="370" y="40" width="170" height="34" class="g"/><text x="382" y="62" class="t">D2 =C2*$E$1</text>
    <rect x="370" y="74" width="170" height="34" class="acc"/><text x="382" y="96" class="t">D3 =C3*$E$1</text>
    <rect x="370" y="108" width="170" height="34" class="g"/><text x="382" y="130" class="t">D4 =C4*$E$1</text>
    <rect x="370" y="176" width="90" height="34" class="acc"/><text x="382" y="198" class="t">E1 20%</text>
    <path d="M470 142 q40 30 -8 40" class="ar"/>
    <text x="480" y="200" class="t">every row → same cell</text>
  </g>
</svg>
<figcaption>Copy-down replays directions. The $ pins a direction so it can't move.</figcaption>
</figure>

## The $ is a pin

Sometimes you *don't* want a direction to replay. Classic case: a VAT
rate sitting in one cell.

```
=C2*$E$1
```

`$E$1` means *"always E1, no matter where this formula gets copied."*
The `$` pins whatever sits immediately after it:

| You write | Pinned | Copied down | Copied across |
|-----------|--------|-------------|---------------|
| `E1` | nothing | becomes E2 | becomes F1 |
| `$E1` | the column | becomes $E2 | stays $E1 |
| `E$1` | the row | stays E$1 | becomes F$1 |
| `$E$1` | both | stays $E$1 | stays $E$1 |

That's the entire system. Four variants, one rule: **the dollar pins
the thing after it.**

## The everyday recipe

For 95% of real work you need exactly two moves:

1. **Formulas that walk down a list** — no dollars at all. `=B2*C2`,
   copy down, done.
2. **Formulas that share one setting** (a rate, a threshold, a date) —
   pin it fully: `$E$1`. Better again, give the cell a name (`vat_rate`)
   and write `=C2*vat_rate` — names are absolute by nature and the
   formula reads like a sentence.

The mixed forms (`$E1`, `E$1`) earn their keep later, in two-way grids
— one formula copied both down *and* across, like a times table or a
loan matrix. When you get there: pin the column of your row labels,
pin the row of your column labels. Until then, don't worry about them.

## The F4 habit

While editing a formula, tap **F4** with the cursor on a reference and
Excel cycles it: `E1 → $E$1 → E$1 → $E1 → E1`. Faster than typing
dollars, and it makes experimenting cheap. (Mac: **⌘T**.)

## When a formula "breaks" on copy

Next time a copied formula returns nonsense, don't stare at the maths —
read the references. Nearly always it's one of two stories:

- A shared setting **wasn't pinned**, so each row is pointing one cell
  further away from it (the tell-tale: the first row is right, the
  rest drift).
- Or something was **over-pinned**, so every row is reading the same
  data row (the tell-tale: identical answers all the way down).

Both are five-second fixes once you can read the directions. That's
the real skill — not memorising dollar patterns, but being able to ask
any formula: *where do you think you're pointing?*

It's stage one of [the path](/roadmap/) for a reason. Every lookup,
every SUMIFS, every model you'll ever build stands on this.
