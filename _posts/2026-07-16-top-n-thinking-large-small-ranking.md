---
title: "Top-N thinking: LARGE, SMALL and ranking done right"
description: Biggest five, worst three, top 10% — the small function family for answering rank questions, and the modern spill idiom that keeps the answers live.
date: 2026-07-16
domain: formulas
---

After totals and averages, the next question a list gets asked
is almost always positional: *top five customers, three worst
months, the second-biggest order, are we in the top 10%?* Rank
questions. Excel has a compact family for them, plus one modern
idiom that has quietly replaced half the old ways — and, as
usual, a couple of honesty rules about what a rank actually
means.

## The family

[`MAX` and `MIN`](/articles/sum-average-count-basics-done-properly/)
you know. Their generalisation:

```
=LARGE(Sales[Amount], 2)     second biggest
=SMALL(Sales[Amount], 3)     third smallest
```

`LARGE(range, k)` is "the k-th biggest" — so `LARGE(..., 1)` *is*
`MAX`, and a top-five block is `LARGE` against k = 1…5 (feed it
`SEQUENCE(5)` and [it spills](/articles/dynamic-arrays-filter-sort-unique/)
all five at once).

The other direction — *where does this value stand?* — is:

```
=RANK.EQ([@Amount], Sales[Amount])     → 7  (7th biggest)
```

And percentile standing, for "top 10%" questions:

```
=PERCENTRANK.INC(Sales[Amount], [@Amount])   → 0.93
```

— this value beats 93% of the list. The reverse,
`=PERCENTILE.INC(range, 0.9)`, gives the *threshold* the top
10% clears — the honest way to set a cut-off, and the natural
partner of [a banding table](/articles/approximate-matches-banding-tiers-tax-tables/).

## The modern idiom: the live top-five table

The old way to show "top five customers" was LARGE for the
values and a fragile
[INDEX/MATCH](/articles/index-and-match-for-full-control/) to
fetch the names. The modern way is one readable formula:

```
=TAKE(SORT(Customers, 2, -1), 5)
```

*Sort the table by column two, descending; take the first five
rows.* Names, values, whole rows — spilled, and **live**: new
data in, the league table re-ranks itself. This block is the
beating heart of half the
[one-page dashboards](/articles/building-a-one-page-dashboard/)
worth building, and it retires an entire generation of folklore.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An unsorted list flows through SORT and TAKE and emerges as a top-five league table that re-ranks when values change">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .r1{opacity:0;animation:tnr 5.5s ease-out infinite}
    .r2{opacity:0;animation:tnr 5.5s ease-out infinite;animation-delay:0.25s}
    .r3{opacity:0;animation:tnr 5.5s ease-out infinite;animation-delay:0.5s}
    @keyframes tnr{0%,25%{opacity:0;transform:translateY(-6px)}40%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">the list (any order)</text>
  <rect x="60" y="40" width="170" height="30" class="g"/><text x="72" y="60" class="t">Murphy   1,240</text>
  <rect x="60" y="70" width="170" height="30" class="g"/><text x="72" y="90" class="t">Byrne    4,180</text>
  <rect x="60" y="100" width="170" height="30" class="g"/><text x="72" y="120" class="t">Walsh      962</text>
  <rect x="60" y="130" width="170" height="30" class="g"/><text x="72" y="150" class="t">Kelly    2,731</text>
  <rect x="60" y="160" width="170" height="30" class="g"/><text x="72" y="180" class="t">O'Brien  3,455</text>
  <text x="260" y="110" class="t">=TAKE(SORT(…, -1), 3)</text>
  <path d="M240 118 h180" stroke="#0E7A4F" stroke-width="1.6" fill="none" marker-end="url(#tna)"/>
  <defs><marker id="tna" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="440" y="26" class="h">the podium (live)</text>
  <g class="r1"><rect x="440" y="40" width="180" height="34" class="acc"/><text x="452" y="62" class="h">1  Byrne    4,180</text></g>
  <g class="r2"><rect x="440" y="74" width="180" height="34" class="acc"/><text x="452" y="96" class="t">2  O'Brien  3,455</text></g>
  <g class="r3"><rect x="440" y="108" width="180" height="34" class="acc"/><text x="452" y="130" class="t">3  Kelly    2,731</text></g>
  <text x="440" y="180" class="t">new data → new podium,</text>
  <text x="440" y="200" class="t">nothing re-written</text>
</svg>
<figcaption>Sort, take, done — whole rows, not just values, and the league table maintains itself. The old LARGE-plus-lookup dance retires with honour.</figcaption>
</figure>

## The honesty rules of ranking

**Ties are a decision.** Two customers on 4,180: `RANK.EQ` gives
both rank 2 and *skips* rank 3 — standard sports ranking, but
say so, or add a tiebreaker column (rank by amount, then
alphabetically) so the league table is deterministic. The
old LARGE-then-MATCH folklore *breaks* on ties — it fetches the
same name twice — which is one more reason the SORT idiom wins.

**Top-five hides the shape.** A podium where first place is 4,180
and fifth is 4,020 tells a different story from one where fifth
is 300 — and the podium alone can't say which. Pair rank tables
with the whole distribution
([next lesson's histogram](/articles/histograms-distributions-shape-of-numbers/))
or at least a share-of-total column
([the percent pattern](/articles/percentages-without-panic/)):
"top five = 71% of revenue" is a finding; "here are five names"
is a list.

**Percentiles beat averages for skewed data.** "Average order
£412" and "median order £96" describe the same list when a few
whales dominate — `MEDIAN` *is* `PERCENTILE(…, 0.5)`, and for
anything money-shaped it's usually the truer centre. When the
two disagree wildly, that disagreement is the interesting fact.

Rank, threshold, share, shape — four small tools, one instinct:
position questions deserve real functions, not a
[sort](/articles/sorting-and-filtering-without-wrecking-your-data/)
and a squint. The squint doesn't update on refresh. The
formulas do.
