---
title: "Building a one-page dashboard (that stays one page)"
description: The difference between a dashboard and a decorated spreadsheet is architecture — three layers, five components, and the discipline of a single screen.
date: 2026-07-15
domain: analysis
---

Everyone wants "a dashboard". What they usually get is a decorated
spreadsheet: fourteen charts on a rainbow background, three of them
contradicting each other, refreshed by a person who has learned to
dread Mondays. The difference between that and a real dashboard
isn't design flair. It's architecture — and a ruthless answer to
one question: **what decisions is this page for?**

A dashboard is not a place to show data. It's a place where someone
looks for *at most a minute* and knows whether things are fine and
where to poke if they aren't. One minute, one page. Everything else
follows from taking that seriously.

## The three-layer architecture

The single biggest cause of dashboard rot is mixing storage,
calculation and display on one sheet. Separate them — three sheets,
three jobs:

1. **Data** — one proper
   [Table](/articles/format-as-table-the-feature-that-changes-everything/)
   (or a [Power Query output](/articles/power-query-combine-monthly-files/)
   if the data arrives monthly). Nobody ever types on this sheet;
   data *lands* here.
2. **Calc** — the aggregation layer:
   [PivotTables](/articles/pivottables-from-first-principles/) and
   [SUMIFS](/articles/sumifs-and-friends-answers-from-a-list/)
   working over the Table, plus the handful of named cells
   (targets, thresholds) the display compares against.
3. **Dashboard** — the one visible page. Charts, KPI cells and
   slicers pointing at Calc. No raw data, and ideally no arithmetic
   beyond a reference — if a number needs computing, it computes on
   Calc where there's room to audit it.

When the data doubles, you extend one Table. When a chart misleads,
you fix one layer. The rainbow version has these three jobs braided
through forty cells, which is why nobody dares touch it.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The one-page layout assembles itself: KPI row on top, main trend chart, breakdown chart and slicer below">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .tile{fill:#EAF4EE;stroke:#0E7A4F}
    .page{fill:#fff;stroke:#E6E4D9}
    .bar{fill:#0E7A4F}
    .d1{animation:dbup 5.5s ease-out infinite}
    .d2{animation:dbup 5.5s ease-out infinite;animation-delay:0.35s}
    .d3{animation:dbup 5.5s ease-out infinite;animation-delay:0.7s}
    .d4{animation:dbup 5.5s ease-out infinite;animation-delay:1.05s}
    @keyframes dbup{0%,10%{opacity:0;transform:translateY(10px)}26%,88%{opacity:1;transform:translateY(0)}98%,100%{opacity:0}}
  </style>
  <rect x="120" y="20" width="420" height="216" rx="8" class="page"/>
  <text x="138" y="44" class="h">one screen — reads top-left to bottom-right</text>
  <g class="d1">
    <rect x="138" y="56" width="120" height="48" rx="4" class="tile"/><text x="150" y="78" class="h">£312k</text><text x="150" y="96" class="t">sales ↑4%</text>
    <rect x="266" y="56" width="120" height="48" rx="4" class="tile"/><text x="278" y="78" class="h">61 days</text><text x="278" y="96" class="t">debtors →</text>
    <rect x="394" y="56" width="126" height="48" rx="4" class="tile"/><text x="406" y="78" class="h">3 late</text><text x="406" y="96" class="t">orders ⚠</text>
  </g>
  <g class="d2">
    <rect x="138" y="114" width="248" height="108" rx="4" class="tile"/>
    <path d="M154 200 L200 184 L246 190 L292 168 L338 158 L368 138" fill="none" stroke="#0E7A4F" stroke-width="2.2"/>
    <text x="154" y="134" class="t">trend, 13 months</text>
  </g>
  <g class="d3">
    <rect x="394" y="114" width="126" height="70" rx="4" class="tile"/>
    <rect x="406" y="158" width="18" height="18" class="bar"/><rect x="430" y="146" width="18" height="30" class="bar"/><rect x="454" y="132" width="18" height="44" class="bar"/>
    <text x="406" y="134" class="t">by region</text>
  </g>
  <g class="d4">
    <rect x="394" y="192" width="126" height="30" rx="4" class="tile"/><text x="406" y="212" class="t">month ▾ slicer</text>
  </g>
  <text x="20" y="90" class="t">KPIs first —</text>
  <text x="20" y="108" class="t">fine or not?</text>
  <text x="20" y="160" class="t">then trend,</text>
  <text x="20" y="178" class="t">then detail</text>
</svg>
<figcaption>The reading order is the design: verdict numbers top-left, the main trend beneath, breakdowns and controls in the corner. One minute, answered.</figcaption>
</figure>

## The five components

- **A KPI row** across the top: three to five numbers, each with a
  comparison (vs last month, vs target — a raw number answers
  nothing). Big font, plain cells. The ⚠ status comes from
  [an IFS](/articles/if-ifs-nested-logic-done-cleanly/) on Calc,
  not from someone remembering to colour a cell.
- **One main chart** — the trend that matters most, built by
  [the truth rules](/articles/charts-that-tell-the-truth/): sorted,
  zero-based, direct labels, one colour plus grey.
- **One or two breakdowns** — smaller charts or a top-five list
  (a spilled
  [SORT/FILTER](/articles/dynamic-arrays-filter-sort-unique/) does
  self-updating top-fives beautifully).
- **Slicers** for the one or two dimensions people genuinely ask
  about. Insert a slicer from any pivot, then right-click → *Report
  Connections* to wire it to every pivot on the page — one click,
  whole dashboard filters. That interactivity is most of what
  people mean when they say "dashboard".
- **A timestamp**: a cell saying when the data was last refreshed.
  Costs nothing; saves every argument that starts "is this current?"

And [conditional formatting](/articles/conditional-formatting-highlights-not-decoration/)
exactly where it belongs: on the exceptions, nowhere else. A
dashboard is the highest-stakes venue for the highlighting-not-
decorating rule — it's the page executives see.

## The disciplines that keep it alive

**One page means one page.** Every addition must evict something —
that's the feature, not the constraint. The moment "just one more
chart" wins, you're six weeks from the rainbow. Park the overflow
on a second sheet ("Detail") and link to it.

**The Monday routine should be: refresh, glance, send.** If
updating the dashboard involves pasting, retyping or "fixing the
ranges", the plumbing is wrong — Tables and queries exist so that
[new data flows through](/articles/power-query-combine-monthly-files/)
untouched. A dashboard you maintain by hand is a report with
ambitions.

**Prototype on paper first.** Sketch the page, show the person
it's for, and ask what they'd decide differently for each element.
Anything that changes no decision comes off the sketch. Cheapest
iteration you'll ever do.

This is stage five of [the path](/roadmap/) working as one system —
Tables feeding pivots feeding honest charts, with names, logic and
formatting each doing their one job. If those pieces are solid, the
dashboard is mostly assembly. If they aren't, no amount of design
will save it.

One page. One minute. Every pixel earning its place — or leaving.
