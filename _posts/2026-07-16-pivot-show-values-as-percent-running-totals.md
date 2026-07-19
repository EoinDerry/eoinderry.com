---
title: "Show Values As: the pivot's second brain"
description: Percent of total, running totals, difference from last month — the right-click menu that turns a pivot of raw sums into a pivot of insight, no formulas required.
date: 2026-07-16
domain: analysis
---

There's a moment with every [PivotTable](/articles/pivottables-from-first-principles/)
where the sums are right and the insight still hasn't arrived.
North: £1.42M. South: £1.18M. Fine — but is North *growing*?
What *share* is that? How does the year *accumulate*? You can
haul the pivot's output into
[percent formulas](/articles/percentages-without-panic/) by
hand, and most people do, monthly, forever.

The pivot already knows how. Right-click any value → **Show
Values As** — the most underused menu in Excel — and the same
field answers a different *kind* of question, recomputed live
through every
[slicer click](/articles/grouping-slicers-pivot-layouts/) and
refresh.

## The four settings that carry working life

**% of Grand Total / % of Column Total.** Every value becomes
its share — the
[percent-of-total pattern](/articles/percentages-without-panic/)
with zero formulas and zero
[pinning](/articles/the-dollar-sign-cell-references-explained/).
The trick that unlocks it fully: **drag the value field in
twice** — once as plain Sum, once shown as % of total. Amount
and share, side by side, one refresh.

**Difference From / % Difference From (previous).** Set the
base field to your
[grouped months](/articles/grouping-slicers-pivot-layouts/),
base item to *(previous)*, and the pivot writes the
month-on-month change column — the exact
["new minus old over old"](/articles/percentages-without-panic/)
you'd have built by hand, computed at every level and immune to
[the stretched-range bug](/articles/structured-references-formulas-inside-tables/)
because there are no ranges.

**Running Total In.** Cumulative revenue through the year,
month by month — the year-to-date line every
[dashboard](/articles/building-a-one-page-dashboard/) wants,
and the natural partner of a target line on
[the chart](/articles/charts-that-tell-the-truth/).

**Rank.** [The league table](/articles/top-n-thinking-large-small-ranking/),
as a pivot column — re-ranked on refresh, ties handled, no
LARGE folklore.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One pivot column of sums transforming into share of total, change versus last month and running total views of the same numbers">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .v1{opacity:0;animation:svshow 7.5s ease-in-out infinite}
    .v2{opacity:0;animation:svshow 7.5s ease-in-out infinite;animation-delay:2.5s}
    .v3{opacity:0;animation:svshow 7.5s ease-in-out infinite;animation-delay:5s}
    @keyframes svshow{3%,28%{opacity:1}0%,33%,100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">the sums (always there)</text>
  <rect x="60" y="40" width="200" height="30" class="g"/><text x="72" y="60" class="t">Jan   41,200</text>
  <rect x="60" y="70" width="200" height="30" class="g"/><text x="72" y="90" class="t">Feb   38,900</text>
  <rect x="60" y="100" width="200" height="30" class="g"/><text x="72" y="120" class="t">Mar   46,300</text>
  <rect x="60" y="130" width="200" height="30" class="g"/><text x="72" y="150" class="t">Apr   44,100</text>
  <text x="330" y="26" class="h">…shown as (one right-click)</text>
  <rect x="330" y="40" width="290" height="120" class="acc"/>
  <g class="v1">
    <text x="346" y="66" class="h">% of column total</text>
    <text x="346" y="92" class="t">Jan 24.2% · Feb 22.8%</text>
    <text x="346" y="114" class="t">Mar 27.2% · Apr 25.8%</text>
    <text x="346" y="146" class="t">shares that always sum to 100%</text>
  </g>
  <g class="v2">
    <text x="346" y="66" class="h">% difference from previous</text>
    <text x="346" y="92" class="t">Feb −5.6% · Mar +19.0%</text>
    <text x="346" y="114" class="t">Apr −4.8%</text>
    <text x="346" y="146" class="t">the month-on-month story</text>
  </g>
  <g class="v3">
    <text x="346" y="66" class="h">running total</text>
    <text x="346" y="92" class="t">Jan 41.2k · Feb 80.1k</text>
    <text x="346" y="114" class="t">Mar 126.4k · Apr 170.5k</text>
    <text x="346" y="146" class="t">year-to-date, self-accumulating</text>
  </g>
  <text x="60" y="200" class="t">same field, three questions — and every view survives slicers,</text>
  <text x="60" y="222" class="t">refresh and regrouping, because nothing was ever a cell formula</text>
</svg>
<figcaption>One column of sums, three lenses from one right-click menu. The formulas you used to rebuild every month were a setting all along.</figcaption>
</figure>

## Why this beats formulas-on-pivot-output

The monthly ritual this replaces — copy the pivot,
[paste values](/articles/paste-special-values-transpose-multiply/),
add percent columns — breaks in all the familiar ways: it's
stale by the next refresh, its ranges
[stop a row short](/articles/the-checks-row-self-testing-spreadsheets/)
when a region appears, and the percent-of-total maths goes
quietly wrong when someone filters. Show Values As recomputes
*inside* the aggregation, so the shares are right at every
grouping — the same virtue you'll later meet as
[measures in the data model](/articles/power-pivot-and-the-data-model/),
of which this menu is the friendly foothill. (When you outgrow
it — ratios of two different fields, time-intelligence beyond
"previous" — that's precisely the
[DAX doorway](/articles/power-pivot-and-the-data-model/).)

Two crafts notes. **Label the lens.** A column headed "Sum of
Amount" that's secretly % of total is a
[chart-crime](/articles/charts-that-tell-the-truth/) in table
form — retitle the field ("Share %", "vs prev month") so the
reader knows which question is being answered. And **percent
views deserve percent costumes** — set it in
[Value Field Settings → Number Format](/articles/grouping-slicers-pivot-layouts/)
so the lens survives refresh, per
[the usual rule](/articles/number-formats-costume-not-value/).

Sums answer "how much". Shares, changes, cumulations and ranks
answer "so what". The second brain was in the right-click menu
the whole time — and it refreshes with everything else.
