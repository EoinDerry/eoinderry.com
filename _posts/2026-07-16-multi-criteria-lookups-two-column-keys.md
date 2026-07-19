---
title: "Multi-criteria lookups: when the key is two columns"
description: Product AND month, name AND site — the three honest ways to look up on more than one condition, and which to use when.
date: 2026-07-16
domain: lookups
---

Every lookup so far has assumed a luxury: one column that
identifies the row. Real tables are frequently messier — the
price depends on *product and month*; the employee is
identified by *name and site* (two John Murphys, different
depots). One condition can't find the row, and stage four's
final trick is looking up on several — which Excel does three
honest ways.

## Way one: the ampersand key

`XLOOKUP` matches one array — so *make* one array that carries
both conditions, by gluing on the fly:

```
=XLOOKUP([@Product] & "|" & [@Month],
         Prices[Product] & "|" & Prices[Month],
         Prices[GBP])
```

Both sides concatenate into `Widgets|Jul`, and the lookup is
ordinary again. The `|` separator matters more than it looks:
without it, `"AB"+"C"` and `"A"+"BC"` both glue to `"ABC"` —
two different rows, one key. Any character that can't appear in
the data works; the pipe is tradition.

This is also the pattern to *store*: a *key column* in the data
(`=[@Product] & "|" & [@Month]`) makes the join visible,
reusable and
[debuggable](/articles/matching-messy-keys-between-tables/) —
the same helper-key move you used on messy names, now used for
composite ones.

## Way two: multiply the conditions

The [SUMPRODUCT worldview](/articles/sumproduct-weighted-averages/)
— conditions are 1s and 0s — gives a glue-free version:

```
=XLOOKUP(1, (Prices[Product]=[@Product]) * (Prices[Month]=[@Month]),
         Prices[GBP])
```

Each condition is an array of 1/0; multiplied, only the row
passing *both* holds a 1; look up the 1. Reads oddly the first
time, then becomes a favourite — no helper, `*` for AND,
`+` [for OR](/articles/if-ifs-nested-logic-done-cleanly/), and
conditions that aren't equality at all (`(Dates>=start) *
(Dates<=end)` finds the row *in a range*, which the ampersand
can't).

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two condition columns of ones and zeros multiplying into a single column where only the row matching both holds a one, which the lookup finds">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .one{fill:#EAF4EE;stroke:#0E7A4F}
    .win{fill:#0E7A4F}
    .s1{opacity:0;animation:mcshow 5.5s ease-out infinite}
    .s2{opacity:0;animation:mcshow 5.5s ease-out infinite;animation-delay:0.7s}
    .s3{opacity:0;animation:mcshow 5.5s ease-out infinite;animation-delay:1.4s}
    @keyframes mcshow{0%,12%{opacity:0}25%,90%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">product=Widgets   ×   month=Jul   =   the row</text>
  <g class="s1">
    <rect x="60" y="44" width="90" height="32" class="one"/><text x="98" y="65" class="t">1</text>
    <rect x="60" y="76" width="90" height="32" class="g"/><text x="98" y="97" class="t">0</text>
    <rect x="60" y="108" width="90" height="32" class="one"/><text x="98" y="129" class="t">1</text>
    <rect x="60" y="140" width="90" height="32" class="g"/><text x="98" y="161" class="t">0</text>
  </g>
  <text x="170" y="110" class="h">×</text>
  <g class="s2">
    <rect x="200" y="44" width="90" height="32" class="g"/><text x="238" y="65" class="t">0</text>
    <rect x="200" y="76" width="90" height="32" class="one"/><text x="238" y="97" class="t">1</text>
    <rect x="200" y="108" width="90" height="32" class="one"/><text x="238" y="129" class="t">1</text>
    <rect x="200" y="140" width="90" height="32" class="g"/><text x="238" y="161" class="t">0</text>
  </g>
  <text x="310" y="110" class="h">=</text>
  <g class="s3">
    <rect x="340" y="44" width="90" height="32" class="g"/><text x="378" y="65" class="t">0</text>
    <rect x="340" y="76" width="90" height="32" class="g"/><text x="378" y="97" class="t">0</text>
    <rect x="340" y="108" width="90" height="32" class="win"/><text x="378" y="129" class="t" fill="#fff">1</text>
    <rect x="340" y="140" width="90" height="32" class="g"/><text x="378" y="161" class="t">0</text>
    <text x="452" y="122" class="h">← XLOOKUP(1, …)</text>
    <text x="452" y="146" class="t">finds the only row</text>
    <text x="452" y="166" class="t">that passed both</text>
  </g>
  <text x="60" y="212" class="t">AND is multiplication; OR is addition — logic as arithmetic, one more time</text>
</svg>
<figcaption>Each condition votes 1 or 0; multiplication keeps only the row that got every vote. The lookup then just fetches the 1.</figcaption>
</figure>

## Way three: FILTER, when "the row" might be rows

Both patterns above assume exactly one match. When several rows
can legitimately pass — all of Widgets' July *transactions* —
the honest tool is
[FILTER](/articles/dynamic-arrays-filter-sort-unique/) with the
same multiplied conditions, spilling every match. And when the
question is really "what's the *total* for product and month",
skip lookups entirely:
[SUMIFS was built for exactly that](/articles/sumifs-and-friends-answers-from-a-list/).
Choosing between them is the stage-four maturity test:
**lookup = fetch one fact · FILTER = fetch the rows · SUMIFS =
aggregate them.** Most "multi-criteria lookup problems" in the
wild are secretly the third.

## The traps, known in advance

Duplicate composite keys are the big one: if `Widgets|Jul`
appears twice, every method silently returns the *first* —
right by luck, wrong by silence. Guard it with
[a checks-row line](/articles/the-checks-row-self-testing-spreadsheets/):
`=ROWS(keys)=ROWS(UNIQUE(keys))`. Both key columns need
[the same hygiene as any join](/articles/matching-messy-keys-between-tables/)
— trim both sides, mind
[text-numbers](/articles/csv-encoding-import-what-went-wrong/)
in one table meeting real numbers in the other. And on
[very large sheets](/articles/slow-workbook-performance-habits/),
the array patterns cost more than plain lookups — a stored key
column computes once, versus glue rebuilt in every formula;
past a few related tables, that's the doorstep of
[the data model](/articles/power-pivot-and-the-data-model/),
where relationships make the whole question disappear.

Glue for the simple case, multiply for the flexible one, FILTER
when many rows may answer, SUMIFS when it was aggregation all
along. Four tools, one question first: *what, exactly, am I
asking for?* — which was always the real stage-four skill.
