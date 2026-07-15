---
title: "Charts that tell the truth"
description: A chart is a sentence about your data. How to pick the right one, strip the clutter, and avoid the axis tricks that make honest numbers lie.
date: 2026-07-12
domain: analysis
---

A chart is a sentence. Before you make one, you should be able to
say the sentence out loud: *"sales grew steadily until March, then
stalled."* If you can't say it, you don't need a chart yet — you
need to look at the data longer. If you can say it, the chart's only
job is to make that sentence land in two seconds, honestly.

Most bad charts fail one of those two words. They either don't
*land* (clutter, wrong type) or they aren't *honest* (axis games).
Both are fixable with a small set of habits.

## Pick the chart by the sentence, not the gallery

Excel offers you sunbursts, radar charts and 3-D cones. Ignore the
gallery and match the *shape of your sentence*:

| Your sentence sounds like… | Use |
|----------------------------|-----|
| "X is bigger than Y" | Bar chart, sorted |
| "It changed over time" | Line chart |
| "These two things move together" | Scatter plot |
| "It's made up of parts" | Stacked bar — or just a table |

That covers perhaps 95% of working life. Notice what's missing: pie
charts survive only for "one number dominates" with two or three
slices, because humans can't compare angles. And anything 3-D exists
to make numbers *feel* impressive rather than *be* readable — the
tilt literally distorts the values. A useful reflex: the fancier the
chart type, the more suspicious the sentence.

Two small craft rules with outsized payoff. **Sort your bars** —
alphabetical order answers no question anyone asked; sorted by value,
the ranking is the chart. And **label lines directly** at their ends
instead of using a legend — every legend lookup is a round trip your
reader shouldn't pay for.

## The axis is where charts lie

Here is the one piece of chart ethics everyone should know. **A bar
chart's value axis must start at zero.** A bar encodes its value in
its *length* — start the axis at 480 and a difference of 4% looks
like a factor of three.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The same two values shown on a truncated axis, where the difference looks huge, and on a zero-based axis, where it looks like what it is">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1.6}
    .bar{fill:#0E7A4F}
    .bar2{fill:#8FBFA6}
    .grow1{animation:grow1 5s ease-in-out infinite;transform-origin:0 200px}
    .grow2{animation:grow2 5s ease-in-out infinite;transform-origin:0 200px}
    @keyframes grow1{0%,15%{transform:scaleY(0)}40%,100%{transform:scaleY(1)}}
    @keyframes grow2{0%,25%{transform:scaleY(0)}50%,100%{transform:scaleY(1)}}
  </style>
  <text x="70" y="26" class="h">Axis starts at 480 — "lying"</text>
  <line x1="70" y1="200" x2="290" y2="200" class="ax"/>
  <line x1="70" y1="40" x2="70" y2="200" class="ax"/>
  <g class="grow1"><rect x="100" y="60" width="60" height="140" class="bar"/></g>
  <g class="grow2"><rect x="190" y="150" width="60" height="50" class="bar2"/></g>
  <text x="106" y="222" class="t">A: 520</text>
  <text x="196" y="222" class="t">B: 500</text>
  <text x="46" y="204" class="t">480</text>
  <text x="390" y="26" class="h">Axis starts at 0 — the truth</text>
  <line x1="390" y1="200" x2="610" y2="200" class="ax"/>
  <line x1="390" y1="40" x2="390" y2="200" class="ax"/>
  <g class="grow1"><rect x="420" y="52" width="60" height="148" class="bar"/></g>
  <g class="grow2"><rect x="510" y="58" width="60" height="142" class="bar2"/></g>
  <text x="426" y="222" class="t">A: 520</text>
  <text x="516" y="222" class="t">B: 500</text>
  <text x="374" y="204" class="t">0</text>
</svg>
<figcaption>Identical data. The left chart is how "4% ahead" becomes a headline. Check the axis before you believe any bar chart — including your own.</figcaption>
</figure>

Line charts get more latitude — a line encodes its value in
*position*, not length, so zooming the axis to show the shape of a
trend is legitimate. Latitude is not immunity: a line zoomed until
routine noise looks like a cliff is the same trick in a different
coat. If the wiggle only matters at 10× zoom, say so on the chart.

Excel's part in this: it *auto-truncates* axes when values sit far
from zero. It's not malicious, but it means honest people publish
lying bar charts by default. Check `Format Axis → Minimum` and set
it to 0 yourself.

## Delete your way to a good chart

Excel's default chart arrives wearing everything it owns: gridlines,
legend, border, tick marks, a title that says "Chart Title". The
craft is subtraction. My routine, in order:

1. **Delete the legend** — label the data directly.
2. **Fade or delete gridlines** — if precise values matter, add data
   labels to the few points that matter instead.
3. **Mute every colour except the story.** One series in brand
   colour, the comparison series in grey — the
   [compound-growth chart](/articles/compound-growth-isa-tracker-excel/)
   is exactly this pattern.
4. **Retitle with the sentence.** Not "Sales 2025–2026" but "Sales
   stalled in March". The title is the one part everyone reads;
   spend it.

Each deletion raises the signal. A chart is finished not when
there's nothing left to add, but when there's nothing left to take
away — and yes, that's borrowed from an aviator, and yes, it's true
about spreadsheets.

## Wire it to living data

A chart built on `A2:B13` is a snapshot that rots. Build charts on a
[Table](/articles/format-as-table-the-feature-that-changes-everything/)
or a [PivotTable](/articles/pivottables-from-first-principles/) and
new rows flow in automatically — the July report becomes "refresh,
read, send". Static ranges are how offices end up with a chart
titled Q3 that quietly still shows Q2.

Charts sit in stage five of [the path](/roadmap/) because they come
*after* clean data and honest aggregation — a chart can only be as
truthful as the table underneath it.

Say the sentence. Pick the shape. Zero the axis. Delete the rest.
