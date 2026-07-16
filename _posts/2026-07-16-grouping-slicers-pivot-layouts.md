---
title: "Grouping, slicers and layouts: making PivotTables presentable"
description: The pivot answered the question — now make it readable. Date grouping, number banding, slicers, and the layout settings everyone hunts for.
date: 2026-07-16
domain: analysis
---

[The first PivotTable lesson](/articles/pivottables-from-first-principles/)
ends with a working answer: drag fields, get totals. This lesson
is the second conversation — the one that starts when you look at
what the pivot produced and think *"right, but I can't send
that."* Three hundred rows of daily dates, a layout only its
mother could love, and filtering that requires knowing where the
tiny dropdown hides. All fixable, with three tools.

## Grouping: the pivot learns "monthly"

Raw transaction dates make a row per day — technically correct,
humanly useless. Right-click any date in the pivot → **Group**,
and choose Months, Quarters, Years (pick several: Years *and*
Months gives you collapsible year sections). Three hundred rows
become twelve. Modern Excel often auto-groups dates on arrival —
the same right-click *ungroups* when it guessed wrong.

The less-known trick: **numbers group too**. Right-click a column
of ages or order values → Group → "starting at 0, by 25" and you
have bands — `0–25, 25–50…` — which turns a pivot into an instant
histogram. (If the bands need uneven or named tiers, that's
[a lookup-table job](/articles/if-ifs-nested-logic-done-cleanly/)
in the source data; pivot grouping does even steps only.)

Grouping fails with one infamous error — *"cannot group that
selection"* — and it means one thing: your date column contains
[text wearing a date costume](/articles/the-445pm-export-cleaning-messy-data/).
The pivot just audited your source data for free. Clean it, refresh,
group.

## Slicers: filters someone can actually see

The pivot's built-in filter dropdown works, and nobody you send
the file to will ever find it. A **slicer** (`PivotTable Analyze →
Insert Slicer`) is the same filter as visible buttons: click
`North`, the pivot filters; Ctrl-click for several; the little
eraser icon clears. For dates there's the **timeline** — a
draggable month strip made for "show me Q2".

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clicking a slicer button filters the pivot table beside it, and one slicer can drive two pivots at once">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .btn{fill:#fff;stroke:#0E7A4F;rx:6}
    .btnon{fill:#0E7A4F;rx:6;animation:slpress 5s ease-in-out infinite}
    @keyframes slpress{0%,10%{fill:#fff}20%,90%{fill:#0E7A4F}100%{fill:#fff}}
    .txton{animation:sltxt 5s ease-in-out infinite}
    @keyframes sltxt{0%,10%{fill:#0E7A4F}20%,90%{fill:#fff}100%{fill:#0E7A4F}}
    .swap1{animation:slswap 5s ease-in-out infinite}
    .swap2{opacity:0;animation:slswap2 5s ease-in-out infinite}
    @keyframes slswap{0%,18%{opacity:1}26%,88%{opacity:0}96%,100%{opacity:1}}
    @keyframes slswap2{0%,18%{opacity:0}26%,88%{opacity:1}96%,100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">slicer</text>
  <rect x="60" y="40" width="130" height="150" rx="8" class="g"/>
  <rect x="74" y="56" width="102" height="30" class="btnon"/><text x="88" y="76" class="t txton">North</text>
  <rect x="74" y="92" width="102" height="30" class="btn"/><text x="88" y="112" class="t">South</text>
  <rect x="74" y="128" width="102" height="30" class="btn"/><text x="88" y="148" class="t">East</text>
  <text x="240" y="26" class="h">the pivot follows the click</text>
  <rect x="240" y="40" width="380" height="150" rx="8" class="g"/>
  <g class="swap1">
    <text x="260" y="76" class="t">All regions      2,340 units</text>
    <text x="260" y="106" class="t">Jan 612 · Feb 540 · Mar 588</text>
    <text x="260" y="136" class="t">Apr 600</text>
  </g>
  <g class="swap2">
    <text x="260" y="76" class="h">North only         812 units</text>
    <text x="260" y="106" class="t">Jan 214 · Feb 188 · Mar 202</text>
    <text x="260" y="136" class="t">Apr 208</text>
    <text x="260" y="170" class="t">…and any second pivot connected via Report Connections follows too</text>
  </g>
</svg>
<figcaption>A filter someone can see, click and un-click — and wire one slicer to several pivots and you've built the interactive heart of a dashboard.</figcaption>
</figure>

The multiplier: right-click a slicer → **Report Connections** and
tick every pivot it should drive. One click filtering four pivots
is the mechanism behind
[the one-page dashboard](/articles/building-a-one-page-dashboard/)
— this is where that page's magic actually lives.

## Layout: the settings everyone hunts for

The pivot's default *Compact* layout stacks all row fields into
one column — fine on screen, wrong for anything downstream. The
fixes live under **Design**:

- **Report Layout → Tabular** (or Outline) — each field gets its
  own labelled column, the shape colleagues expect.
- **Repeat All Item Labels** — fills the blanks Compact leaves in
  outer columns, so the output can be
  [sorted, filtered](/articles/sorting-and-filtering-without-wrecking-your-data/)
  or copied like ordinary data. If you've ever pasted pivot output
  and spent ten minutes filling gaps: this setting, once.
- **Subtotals / Grand Totals** — off unless they answer a real
  question; a wall of subtotal rows is
  [decoration, not signal](/articles/conditional-formatting-highlights-not-decoration/).
- **Value Field Settings → Number Format** — format the *field*,
  not the cells, and the
  [costume](/articles/number-formats-costume-not-value/) survives
  every refresh and re-drag.

While you're in the settings: right-click → PivotTable Options →
untick *Autofit column widths on update*, which ends the
columns-jumping-on-refresh dance everyone tolerates for years.

And the honest boundary, same as ever: layout polishing is for
*presentation*. If you're fighting the pivot to produce a
specific report shape for another system to consume, that's a
sign the job belongs to
[formulas over a Table](/articles/sumifs-and-friends-answers-from-a-list/)
or [Power Query](/articles/power-query-combine-monthly-files/)
instead — pivots are for exploring and summarising, not for
generating fixed-format files.

Group to the grain your reader thinks in, slice so filtering is
visible, lay out tabular with labels repeated. Same pivot, same
data — but now it survives contact with an audience. Stage five
of [the path](/roadmap/) is mostly this: answers were the easy
half; *legible* answers are the job.
