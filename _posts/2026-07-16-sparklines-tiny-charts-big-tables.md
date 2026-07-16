---
title: "Sparklines: tiny charts for big tables"
description: A chart in a cell — the word-sized graphic that gives every row of a table its own trend line, and the three settings that make them honest.
date: 2026-07-16
domain: analysis
---

A table tells you *what*; a chart tells you *how it's going*. The
trouble is scale: forty products, each with twelve months of
sales, wants forty trend lines — and forty
[real charts](/articles/charts-that-tell-the-truth/) is a wall
nobody reads. The tool built for exactly this gap is the
**sparkline**: a chart the size of a word, living inside a cell,
one per row.

The name and idea come from Edward Tufte, who defined sparklines
as "small, intense, word-sized graphics" — meant to sit *in the
flow* of a table or sentence, giving numbers their shape without
interrupting the reading. Excel has had them since 2010, three
flavours: **Line** (trend over time), **Column** (magnitudes),
**Win/Loss** (above/below zero, and only that).

## Making them

`Insert → Sparklines → Line`: data range = the twelve month
columns, location = the empty column at the row's end. The
efficient habit — insert *one*, then
[fill-handle it down](/articles/the-fill-handle-excels-pattern-engine/);
sparklines copy like formulas, each row charting itself. Better
again, live inside a
[Table](/articles/structured-references-formulas-inside-tables/)
so new rows sprout their own.

Now every product carries its own twelve-month story in a
centimetre: steady, collapsing, seasonal, recovering — visible at
reading speed, forty rows scanned in the time one chart takes to
decode. That scan is the product: sparklines are for **triage**,
finding *which* rows deserve a real chart.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A table where each row carries its own tiny trend line, with one collapsing row standing out instantly">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .sp{stroke:#0E7A4F;stroke-width:1.8;fill:none}
    .spbad{stroke:#C0392B;stroke-width:1.8;fill:none}
    .d1{stroke-dasharray:130;stroke-dashoffset:130;animation:spdraw 5s ease-out infinite}
    .d2{stroke-dasharray:130;stroke-dashoffset:130;animation:spdraw 5s ease-out infinite;animation-delay:0.3s}
    .d3{stroke-dasharray:130;stroke-dashoffset:130;animation:spdraw 5s ease-out infinite;animation-delay:0.6s}
    .d4{stroke-dasharray:130;stroke-dashoffset:130;animation:spdraw 5s ease-out infinite;animation-delay:0.9s}
    @keyframes spdraw{0%,12%{stroke-dashoffset:130}50%,92%{stroke-dashoffset:0}100%{stroke-dashoffset:130}}
    .flag{opacity:0;animation:spflag 5s ease-out infinite}
    @keyframes spflag{0%,46%{opacity:0}58%,92%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">Product   ·  12 months  ·  trend</text>
  <rect x="60" y="40" width="180" height="38" class="g"/><text x="72" y="64" class="t">Widgets</text>
  <rect x="240" y="40" width="200" height="38" class="g"/><text x="252" y="64" class="t">…monthly cells…</text>
  <rect x="440" y="40" width="160" height="38" class="g"/>
  <path d="M452 68 L472 62 L492 64 L512 56 L532 58 L552 50 L572 46" class="sp d1"/>
  <rect x="60" y="78" width="180" height="38" class="g"/><text x="72" y="102" class="t">Gaskets</text>
  <rect x="240" y="78" width="200" height="38" class="g"/>
  <rect x="440" y="78" width="160" height="38" class="g"/>
  <path d="M452 96 L472 100 L492 94 L512 98 L532 94 L552 98 L572 95" class="sp d2"/>
  <rect x="60" y="116" width="180" height="38" class="g"/><text x="72" y="140" class="t">Flanges</text>
  <rect x="240" y="116" width="200" height="38" class="g"/>
  <rect x="440" y="116" width="160" height="38" class="g"/>
  <path d="M452 124 L472 128 L492 134 L512 138 L532 144 L552 148 L572 150" class="spbad d3"/>
  <g class="flag"><text x="608" y="140" class="h">←</text></g>
  <rect x="60" y="154" width="180" height="38" class="g"/><text x="72" y="178" class="t">Sprockets</text>
  <rect x="240" y="154" width="200" height="38" class="g"/>
  <rect x="440" y="154" width="160" height="38" class="g"/>
  <path d="M452 184 L472 176 L492 180 L512 170 L532 174 L552 166 L572 168" class="sp d4"/>
  <text x="60" y="220" class="t">forty rows scanned at reading speed — Flanges is the afternoon's question</text>
</svg>
<figcaption>One word-sized chart per row. Nobody reads forty charts; everybody notices the one line falling — that's triage, and it's what sparklines are for.</figcaption>
</figure>

## The three settings that make them honest

Sparklines inherit chart ethics with one twist of their own.

**Same axis, or no comparison.** By default each sparkline scales
to *its own* min and max — so a product wobbling between 98 and
102 looks as dramatic as one swinging 0 to 1,000. Fine for
"what's this row's shape?", a lie for "which row is moving
most?". For comparisons: select the group → Sparkline tab → Axis
→ **Same for All Sparklines** (both min and max). This is
[the truncated-axis rule](/articles/charts-that-tell-the-truth/)
in miniature — per-row axes are forty tiny zoomed charts.

**Mark the points that matter.** Tick High Point and Low Point
(and Negative Points for anything crossing zero). A line with its
extremes dotted answers "when?" as well as "how's it going" —
still without a single axis label.

**Handle the gaps deliberately.** Sparkline tab → Edit Data →
Hidden & Empty Cells: blanks can be gaps, zeros, or bridged with
a line. The right answer is
[the same one AVERAGE forced on you](/articles/sum-average-count-basics-done-properly/):
a missing month and a zero month are different facts. Choose,
per dataset, on purpose.

## Where they sit — and where they don't

Sparklines earn their keep in
[dashboards](/articles/building-a-one-page-dashboard/) (a KPI row
with a twelve-month sparkline under each number is the densest
honest information in Excel),
[pivot-adjacent summaries](/articles/grouping-slicers-pivot-layouts/),
and any Table where rows have a time dimension. They coexist
happily with
[conditional formatting](/articles/conditional-formatting-highlights-not-decoration/)
— data bars answer "how big?", sparklines answer "which way?" —
and the pair covers most of what row-level graphics can honestly
do.

Their limits, honestly: no axes means no *values* — a sparkline
says "falling", never "by how much" (keep the numbers beside
them; Tufte's point was always *words and graphics together*).
One series per cell. Invisible in some older viewers. And they're
a *view*, not analysis — a falling line is a question, and
[the real chart](/articles/charts-that-tell-the-truth/) is where
you take it.

A chart the size of a word, one per row, axes shared, extremes
dotted. The big table finally shows its shapes — and the one
line heading the wrong way finds *you*.
