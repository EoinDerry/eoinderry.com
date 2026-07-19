---
title: "Histograms: the shape of your numbers"
description: Averages hide more than they tell — how to see a column's full distribution, why the shape changes decisions, and the three ways Excel draws it.
date: 2026-07-16
domain: analysis
---

Two depots, both averaging 42 orders a day. Same number, same
[KPI tile](/articles/building-a-one-page-dashboard/) — and
completely different businesses: one does 40-to-45 every day
like a metronome; the other swings between 5 and 90 and merely
*averages* out at 42. Staffing, stock, stress — everything
about running them differs, and the average is constitutionally
incapable of saying so.

What says so is the **distribution** — how often each range of
values occurs — and its picture, the **histogram**: values
banded into bins along the bottom, frequency as bars. It's the
chart people skip because it doesn't answer "how much?"; it
answers the better question underneath — *"what's typical, how
spread out, and what's lurking in the tails?"*

## Three ways to draw one

**Fastest:** select the column, `Insert → Statistic Chart →
Histogram`. Excel bins automatically; right-click the axis to
set **bin width** to something a human thinks in (£10, 5
orders, one week). Done in a minute, fine for a look.

**Most control:** count the bins yourself with
[the banding machinery you already own](/articles/approximate-matches-banding-tiers-tax-tables/)
— a small bin Table (From, Label) and one
[COUNTIFS](/articles/sumifs-and-friends-answers-from-a-list/)
per row (`>=` this bin, `<` the next), charted as
[an honest bar chart](/articles/charts-that-tell-the-truth/).
More work, but the bins are *data*, the counts feed
[checks](/articles/the-checks-row-self-testing-spreadsheets/)
(bin counts must sum to `COUNT(all)`), and the whole thing
refreshes with the workbook. (The modern shortcut:
`=FREQUENCY(values, bin_tops)`
[spills](/articles/dynamic-arrays-filter-sort-unique/) every
count at once.)

**Most flexible:** [a pivot](/articles/pivottables-from-first-principles/)
with the value field grouped —
[the number-grouping trick](/articles/grouping-slicers-pivot-layouts/)
— which adds [slicers](/articles/grouping-slicers-pivot-layouts/)
for free: the distribution *by region*, one click each.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two very different histograms that share the same average: one tight and symmetric, one wide with a long tail">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .bar{fill:#0E7A4F}
    .bar2{fill:#9CC8B0}
    .up{animation:hgup 5.5s ease-out infinite;transform-origin:0 200px}
    .u2{animation-delay:0.15s}.u3{animation-delay:0.3s}.u4{animation-delay:0.45s}.u5{animation-delay:0.6s}.u6{animation-delay:0.75s}
    @keyframes hgup{0%,10%{transform:scaleY(0)}30%,90%{transform:scaleY(1)}100%{transform:scaleY(0)}}
    .mean{stroke:#C0392B;stroke-width:1.6;stroke-dasharray:5 4}
  </style>
  <text x="70" y="26" class="h">the metronome — mean 42</text>
  <line x1="60" y1="200" x2="300" y2="200" class="ax"/>
  <g class="up"><rect x="80" y="170" width="30" height="30" class="bar"/></g>
  <g class="up u2"><rect x="114" y="90" width="30" height="110" class="bar"/></g>
  <g class="up u3"><rect x="148" y="60" width="30" height="140" class="bar"/></g>
  <g class="up u4"><rect x="182" y="96" width="30" height="104" class="bar"/></g>
  <g class="up u5"><rect x="216" y="174" width="30" height="26" class="bar"/></g>
  <line x1="163" y1="46" x2="163" y2="200" class="mean"/>
  <text x="390" y="26" class="h">the rollercoaster — mean 42</text>
  <line x1="350" y1="200" x2="620" y2="200" class="ax"/>
  <g class="up"><rect x="360" y="110" width="30" height="90" class="bar2"/></g>
  <g class="up u2"><rect x="394" y="80" width="30" height="120" class="bar2"/></g>
  <g class="up u3"><rect x="428" y="140" width="30" height="60" class="bar2"/></g>
  <g class="up u4"><rect x="462" y="168" width="30" height="32" class="bar2"/></g>
  <g class="up u5"><rect x="496" y="180" width="30" height="20" class="bar2"/></g>
  <g class="up u6"><rect x="530" y="186" width="30" height="14" class="bar2"/></g>
  <line x1="452" y1="46" x2="452" y2="200" class="mean"/>
  <text x="70" y="234" class="t">same red mean line, opposite businesses — the shape was the story all along</text>
</svg>
<figcaption>Two columns, one average, no resemblance. Every decision that depends on "typical" or "worst case" lives in the shape, not the mean.</figcaption>
</figure>

## Reading the shape

Four things to look for, each with a decision attached:

- **Where's the bulk?** The typical case — often *not* the mean.
  Skewed data (money, almost always) drags the mean toward the
  tail; [the median tells the truer centre](/articles/top-n-thinking-large-small-ranking/),
  and the histogram shows you *why* they disagree.
- **How wide?** Spread is risk. The metronome depot staffs to
  45; the rollercoaster needs
  [a buffer policy](/articles/emergency-fund-runway-excel/) —
  same instinct, business edition.
- **One hump or two?** Two humps means **two populations
  wearing one column** — weekday and weekend orders, two
  customer types. Split them
  ([a slicer or a FILTER](/articles/grouping-slicers-pivot-layouts/))
  before averaging anything, or every summary statistic
  [blends two truths into one fiction](/articles/sumproduct-weighted-averages/).
- **What's in the tails?** Outliers — sometimes
  [data errors the checks row should catch](/articles/the-checks-row-self-testing-spreadsheets/)
  (a £84,000 coffee), sometimes the most important rows in the
  file (the whale customer). The histogram won't say which;
  it says *look here*.

The craft note: **bin width is an editorial choice.** Too wide
flattens the story; too narrow shatters it into noise. Try two
or three widths — it's one setting — and, as with
[every chart](/articles/charts-that-tell-the-truth/), pick the
one that shows the shape honestly rather than dramatically.

Averages are the summary you quote. Shapes are the thing you
should look at *before* quoting it — and now the look costs
one minute and one chart.
