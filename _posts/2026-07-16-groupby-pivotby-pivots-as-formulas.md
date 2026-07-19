---
title: "GROUPBY and PIVOTBY: pivots as formulas"
description: The newest big idea in Excel — whole summary tables from a single spilling formula, no refresh button, no pivot cache, live like everything else.
date: 2026-07-16
domain: power-tools
---

Every tool has one nagging seam, and
[the PivotTable's](/articles/pivottables-from-first-principles/)
is the **Refresh button**: a pivot is a snapshot, not a formula,
and everyone has shipped a report whose pivot was one refresh
behind the data. Modern Excel (365) closed that seam with two
functions that do a pivot's job the way
[everything else on this stage works](/articles/dynamic-arrays-filter-sort-unique/)
— as formulas that spill, recalculate instantly, and can be
built into other formulas:

```
=GROUPBY(Orders[Region], Orders[Amount], SUM)
```

One line: regions down the side, summed amounts beside them,
totals included — a summary table that is *live*. Add a row to
the Table and the summary already knows;
[no cache, no stale copies](/articles/excel-on-the-web-sharing-workbooks/),
nothing to press.

`PIVOTBY` adds the second dimension — the classic
rows-by-columns grid:

```
=PIVOTBY(Orders[Region], Orders[Month], Orders[Amount], SUM)
```

Regions down, months across, sums in the middle. The third
sibling you already know:
[the spilled UNIQUE + SUMIFS combo](/articles/dynamic-arrays-filter-sort-unique/)
was this idea assembled by hand; GROUPBY is it as a single
verb.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A single GROUPBY formula spilling a summary table, and a new data row instantly updating the spilled result with no refresh">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .src{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4}
    .spill{fill:#fff;stroke:#9CC8B0;stroke-dasharray:4 3}
    .newrow{opacity:0;animation:gbnew 6s ease-in-out infinite}
    @keyframes gbnew{0%,30%{opacity:0;transform:translateY(-6px)}42%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
    .old{animation:gbold 6s ease-in-out infinite}
    .upd{opacity:0;animation:gbupd 6s ease-in-out infinite}
    @keyframes gbold{0%,40%{opacity:1}50%,90%{opacity:0}100%{opacity:1}}
    @keyframes gbupd{0%,40%{opacity:0}50%,90%{opacity:1}100%{opacity:0}}
  </style>
  <text x="50" y="26" class="h">the data</text>
  <rect x="50" y="40" width="200" height="30" class="g"/><text x="62" y="60" class="t">North · 1,240</text>
  <rect x="50" y="70" width="200" height="30" class="g"/><text x="62" y="90" class="t">South ·   860</text>
  <rect x="50" y="100" width="200" height="30" class="g"/><text x="62" y="120" class="t">North ·   500</text>
  <g class="newrow"><rect x="50" y="130" width="200" height="30" class="src"/><text x="62" y="150" class="t">North ·   300  ← typed</text></g>
  <text x="330" y="26" class="h">=GROUPBY(Region, Amount, SUM)</text>
  <rect x="330" y="40" width="280" height="34" class="src"/><text x="342" y="62" class="t">Region      Sum</text>
  <rect x="330" y="74" width="280" height="30" class="spill"/>
  <g class="old"><text x="342" y="94" class="t">North     1,740</text></g>
  <g class="upd"><text x="342" y="94" class="h">North     2,040 ✓</text></g>
  <rect x="330" y="104" width="280" height="30" class="spill"/><text x="342" y="124" class="t">South       860</text>
  <rect x="330" y="134" width="280" height="30" class="spill"/>
  <g class="old"><text x="342" y="154" class="t">Total     2,600</text></g>
  <g class="upd"><text x="342" y="154" class="h">Total     2,900 ✓</text></g>
  <text x="330" y="200" class="t">no Refresh exists — the summary is a</text>
  <text x="330" y="220" class="t">formula, current the instant data changes</text>
</svg>
<figcaption>Type a row; the summary already has it. The pivot's one seam — the refresh — simply doesn't exist in formula-world.</figcaption>
</figure>

## Where they beat pivots — and where they don't

**Formulas win** when the summary is a *component*: feeding
[a chart that must never be stale](/articles/charts-that-tell-the-truth/),
sitting inside [a dashboard's Calc layer](/articles/building-a-one-page-dashboard/),
[wrapped in FILTER](/articles/dynamic-arrays-filter-sort-unique/)
for a criteria-driven summary, nested inside
[LET](/articles/let-and-lambda-formulas-you-can-read/), or —
the quiet killer feature — **any aggregation as the third
argument**, including
[a LAMBDA](/articles/let-and-lambda-formulas-you-can-read/):
`GROUPBY(regions, amounts, LAMBDA(x, PERCENTILE.INC(x, 0.5)))`
gives you *median by region*, something the classic pivot has
refused to do gracefully for thirty years.

**Pivots win** on interactivity and audience:
[slicers, drag-to-regroup](/articles/grouping-slicers-pivot-layouts/),
[Show Values As](/articles/pivot-show-values-as-percent-running-totals/),
drill-down on double-click — exploration by mouse, for people
who will never edit a formula. And at
[data-model scale](/articles/power-pivot-and-the-data-model/),
pivots-on-the-model remain the tool; GROUPBY eats Tables, not
millions of engine rows.

The division falls out neatly: **pivots for exploring and for
audiences; GROUPBY/PIVOTBY for machinery** — the fixed
summaries inside reports that must always be current. A lot of
workbooks want both, doing different jobs, fed by
[the same Table](/articles/structured-references-formulas-inside-tables/).

Two cautions while these functions are young: they need current
365 (a workbook leaning on them
[excludes older Excels](/articles/excel-on-the-web-sharing-workbooks/)
— know your audience), and their argument lists run deeper than
shown here (field headers, sort orders, totals control) — the
[usual advice](/articles/let-and-lambda-formulas-you-can-read/)
applies: learn the simple form cold, add arguments when a real
report asks.

Thirty years ago the pivot made aggregation a drag-and-drop.
This makes it a *word* — and words compose, refresh themselves,
and never go stale. The seam is closed.
