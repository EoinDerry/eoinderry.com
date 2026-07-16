---
title: "Data Tables: test every assumption at once"
description: One input, twenty values, one grid of answers — the what-if tool that turns "it depends" into a table you can point at.
date: 2026-07-16
domain: power-tools
---

Every model has a moment of dishonesty: the growth rate says 5%,
and everyone in the room knows it might be 2% or 8%. The forwards
answer ("£412k") is precise about an assumption that isn't.
[Goal Seek](/articles/goal-seek-excel-backwards/) asks one
backwards question; this lesson's tool answers the braver one —
***what does the answer look like across the whole range of the
assumption?***

A **Data Table** (`Data → What-If Analysis → Data Table` — no
relation to [proper Tables](/articles/format-as-table-the-feature-that-changes-everything/),
an unfortunate naming collision) reruns your entire model once
per candidate value and lays the answers out as a grid.

## One variable: the sensitivity column

Take [the pension model](/articles/pension-countdown-when-could-you-stop/):
`growth` feeds a `pot_at_60` result. Down a column, type the
candidate rates: 2%, 3% … 8%. In the cell one up and one right of
the first rate, reference the result: `=pot_at_60`. Select the
block, `Data Table`, **Column input cell:** `growth`, OK.

Excel now runs the whole model seven times — once per rate,
restoring everything afterwards — and fills the column: the pot
at *every* growth assumption, on one screen. The honest answer
to "what will it be worth?" turns out to be a shape, not a
number — and now you can show the shape.

## Two variables: the grid

The famous version. Rates down the left, years across the top,
and in the **corner cell where they meet**, the reference to the
result. Select the whole block → Data Table → Row input: `years`,
Column input: `growth`:

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A two-variable data table filling with results, one cell per combination of growth rate and years">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .hd{fill:#EAF4EE;stroke:#0E7A4F}
    .corner{fill:#0E7A4F}
    .cell{opacity:0;animation:dtfill 5.5s ease-out infinite}
    .c2{animation-delay:0.15s}.c3{animation-delay:0.3s}.c4{animation-delay:0.45s}.c5{animation-delay:0.6s}.c6{animation-delay:0.75s}.c7{animation-delay:0.9s}.c8{animation-delay:1.05s}.c9{animation-delay:1.2s}
    @keyframes dtfill{0%,15%{opacity:0}30%,90%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">pot at retirement — growth × years, every combination</text>
  <rect x="60" y="40" width="110" height="34" class="corner"/><text x="70" y="62" class="t" fill="#fff">=pot_at_60</text>
  <rect x="170" y="40" width="110" height="34" class="hd"/><text x="196" y="62" class="h">15 yrs</text>
  <rect x="280" y="40" width="110" height="34" class="hd"/><text x="306" y="62" class="h">20 yrs</text>
  <rect x="390" y="40" width="110" height="34" class="hd"/><text x="416" y="62" class="h">25 yrs</text>
  <rect x="60" y="74" width="110" height="34" class="hd"/><text x="86" y="96" class="h">3%</text>
  <rect x="60" y="108" width="110" height="34" class="hd"/><text x="86" y="130" class="h">5%</text>
  <rect x="60" y="142" width="110" height="34" class="hd"/><text x="86" y="164" class="h">7%</text>
  <g class="cell"><rect x="170" y="74" width="110" height="34" class="g"/><text x="188" y="96" class="t">£248k</text></g>
  <g class="cell c2"><rect x="280" y="74" width="110" height="34" class="g"/><text x="298" y="96" class="t">£311k</text></g>
  <g class="cell c3"><rect x="390" y="74" width="110" height="34" class="g"/><text x="408" y="96" class="t">£384k</text></g>
  <g class="cell c4"><rect x="170" y="108" width="110" height="34" class="g"/><text x="188" y="130" class="t">£293k</text></g>
  <g class="cell c5"><rect x="280" y="108" width="110" height="34" class="g"/><text x="298" y="130" class="t">£396k</text></g>
  <g class="cell c6"><rect x="390" y="108" width="110" height="34" class="g"/><text x="408" y="130" class="t">£528k</text></g>
  <g class="cell c7"><rect x="170" y="142" width="110" height="34" class="g"/><text x="188" y="164" class="t">£347k</text></g>
  <g class="cell c8"><rect x="280" y="142" width="110" height="34" class="g"/><text x="298" y="164" class="t">£507k</text></g>
  <g class="cell c9"><rect x="390" y="142" width="110" height="34" class="g"/><text x="408" y="164" class="t">£742k</text></g>
  <text x="60" y="212" class="t">the model ran nine times; the grid is the honest answer —</text>
  <text x="60" y="234" class="t">a range you can plan around, not a point estimate to defend</text>
</svg>
<figcaption>The corner holds the formula; the headers hold the candidates; Excel fills the middle. "It depends" — quantified, on half a screen.</figcaption>
</figure>

Nine model runs, one grid, and the conversation changes: instead
of defending 5%, you point at the row where the plan still works
at 3% — or concede that it doesn't, which is worth knowing *now*.
This grid under
[the overpay-vs-invest comparison](/articles/mortgage-overpay-or-invest-excel/)
(rate × return) or a
[break-even model](/articles/goal-seek-excel-backwards/)
(price × volume) is the single most persuasive screen a
spreadsheet produces — assumptions on the table, literally.

Add [a colour scale](/articles/conditional-formatting-highlights-not-decoration/)
across the grid — this is the one place the green-to-red gradient
genuinely earns its living, because *the comparison across a
smooth surface* is exactly what you're asking the reader to see.

## The fine print

Data Tables have personality; know three things. **The input
cells must be on the same sheet as the table** — a quirk, and
the practical answer is to build sensitivity grids on the model's
sheet or mirror the input locally. **The results are array magic,
not formulas you can edit** — `{=TABLE(...)}` fills the cells;
change the candidates or the model and it recalculates; to remove
it, delete the whole block. **Big tables can be slow** — each
cell is a full model run, and a 20×20 grid on a heavy workbook is
400 recalculations (the classic cure if it drags:
`Formulas → Calculation Options → Automatic Except for Data
Tables`, then F9 when you want the grid refreshed — a switch
worth knowing exists before
[the performance lesson](/articles/slow-workbook-performance-habits/)
formalises it).

And the architecture rule, one more time, because this tool
depends on it completely: a Data Table can only vary **an input
cell that exists**. Models with
[named, single-home assumptions](/articles/named-ranges-formulas-read-like-sentences/)
get sensitivity analysis for free; models with rates buried in
formulas get nothing. Every lesson in this stage keeps landing
on the same door: *put the knobs where hands can reach them.*

One formula, two headers, one fill. The difference between "my
model says £396k" and "here's how the answer moves when the
world does" — and the second one is the only version a careful
reader trusts.
