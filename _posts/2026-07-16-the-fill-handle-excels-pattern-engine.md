---
title: "The fill handle: Excel's pattern engine"
description: The little green square in the corner of every selection is how one formula becomes a thousand — and how dates, series and patterns write themselves.
date: 2026-07-16
domain: foundations
---

In the bottom-right corner of every selection sits a small green
square. Most people discover by accident that dragging it copies
the cell — and stop there, having found perhaps a fifth of what
it does. That square is the **fill handle**, and it's really a
pattern engine: show it the start of a pattern and it continues
the pattern, for ten rows or a hundred thousand.

## Copy-down: how one formula becomes a column

Its first job is the one that makes spreadsheets spreadsheets.
Write `=B2*C2` in D2, drag the handle down, and every row gets
the formula *re-aimed at its own row* — `=B3*C3`, `=B4*C4` — the
[relative-reference replay](/articles/the-dollar-sign-cell-references-explained/)
in action. One formula, written once, working everywhere.

Two upgrades on the drag, in the order you'll come to love them:

- **Double-click the handle** instead of dragging. The fill runs
  down *as far as the neighbouring column has data* — a
  50,000-row column filled in the time a drag would cover twenty.
  This is the single best five-second upgrade in beginner Excel.
- **Stop needing it at all.** Inside a
  [proper Table](/articles/format-as-table-the-feature-that-changes-everything/),
  a formula typed in one cell fills its entire column
  automatically, and new rows inherit it. The fill handle is how
  you work *before* Tables; Tables are why you'll eventually
  drag less.

## Series: the handle can count

Type `1` and drag: you get `1, 1, 1` — a copy. Type `1` and `2`,
select **both**, and drag: `3, 4, 5…` — a series. Given two cells,
the handle infers the step, and it extrapolates anything with a
rhythm: `10, 20` → `30, 40`; `Q1, Q2` → `Q3, Q4`; `Jan` → `Feb,
Mar`; `Monday` → the week; `04/07/2026` → daily dates forever.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dragging the fill handle continues patterns: numbers step, months advance, formulas re-aim per row">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .src{fill:#EAF4EE;stroke:#0E7A4F}
    .fh{fill:#0E7A4F}
    .f1{animation:fillin 5s ease-out infinite}
    .f2{animation:fillin 5s ease-out infinite;animation-delay:0.3s}
    .f3{animation:fillin 5s ease-out infinite;animation-delay:0.6s}
    @keyframes fillin{0%,22%{opacity:0}36%,88%{opacity:1}98%,100%{opacity:0}}
    .hnd{animation:fhslide 5s ease-out infinite}
    @keyframes fhslide{0%,20%{transform:translateY(0)}70%,100%{transform:translateY(96px)}}
  </style>
  <text x="70" y="26" class="h">1, 2 … the step is the pattern</text>
  <rect x="70" y="40" width="110" height="32" class="src"/><text x="82" y="61" class="t">1</text>
  <rect x="70" y="72" width="110" height="32" class="src"/><text x="82" y="93" class="t">2</text>
  <g class="f1"><rect x="70" y="104" width="110" height="32" class="g"/><text x="82" y="125" class="t">3</text></g>
  <g class="f2"><rect x="70" y="136" width="110" height="32" class="g"/><text x="82" y="157" class="t">4</text></g>
  <g class="f3"><rect x="70" y="168" width="110" height="32" class="g"/><text x="82" y="189" class="t">5</text></g>
  <g class="hnd"><rect x="174" y="98" width="9" height="9" class="fh"/></g>
  <text x="280" y="26" class="h">months advance</text>
  <rect x="280" y="40" width="110" height="32" class="src"/><text x="292" y="61" class="t">Jan</text>
  <g class="f1"><rect x="280" y="72" width="110" height="32" class="g"/><text x="292" y="93" class="t">Feb</text></g>
  <g class="f2"><rect x="280" y="104" width="110" height="32" class="g"/><text x="292" y="125" class="t">Mar</text></g>
  <text x="470" y="26" class="h">formulas re-aim</text>
  <rect x="470" y="40" width="130" height="32" class="src"/><text x="480" y="61" class="t">=B2*C2</text>
  <g class="f1"><rect x="470" y="72" width="130" height="32" class="g"/><text x="480" y="93" class="t">=B3*C3</text></g>
  <g class="f2"><rect x="470" y="104" width="130" height="32" class="g"/><text x="480" y="125" class="t">=B4*C4</text></g>
</svg>
<figcaption>One engine, three patterns: steps, sequences and re-aimed formulas. Show it the rhythm; it does the typing.</figcaption>
</figure>

The steering wheel is the small **Auto Fill Options** button that
appears after every fill — it flips a fill between *Copy Cells*
and *Fill Series* when Excel guessed the wrong one, and offers
*Fill Weekdays* for dates (a payroll favourite). Right-drag the
handle for the same menu up front. And the fill that copies a
formula but drags its formatting along, wrecking your borders:
Auto Fill Options → **Fill Without Formatting**. That one button
answers about three separate beginner miseries.

The other steering input is the [$ sign](/articles/the-dollar-sign-cell-references-explained/):
a fill re-aims *unpinned* references and respects pinned ones.
If a fill goes wrong, it's nearly always a pin missing or a pin
too many — read the references, not the maths.

## Custom rhythms and the modern successors

Excel knows months and weekdays out of the box. Teach it your own
sequences — site names, team rota, product tiers — in `File →
Options → Advanced → Edit Custom Lists`, and the handle (and
[custom sort orders](/articles/sorting-and-filtering-without-wrecking-your-data/))
learn your world.

Two neighbours complete the picture. **Flash Fill** (`Ctrl+E`) is
the handle's clever cousin — it imitates *transformations* by
example rather than continuing series;
[it gets its own lesson](/articles/text-to-columns-and-flash-fill/)
with its own warnings. And **SEQUENCE** is the formula-native way
to generate series in modern Excel —
`=SEQUENCE(12)` [spills](/articles/dynamic-arrays-filter-sort-unique/)
1 to 12 with nothing dragged, which matters once your sheets start
building themselves.

One more habit while you're here: the handle also **clears**.
Select a filled range, drag the handle *upward* through it, and
the cells empty — tidier than delete-and-repair when trimming a
series.

Small square, big share of every working day. Learn the
double-click, meet the options button, and let the patterns write
themselves — stage one of [the path](/roadmap/) is full of these
ten-thousand-times moves, and this is the most literal of them.
