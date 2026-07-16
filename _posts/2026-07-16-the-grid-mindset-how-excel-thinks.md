---
title: "The grid mindset: how Excel actually thinks"
description: Before the formulas, one idea — a sheet is not paper, and the habits that treat it like paper are where most spreadsheet pain begins.
date: 2026-07-16
domain: foundations
---

Everyone's first spreadsheet is secretly a piece of paper. We type
a title where a title would look nice, leave a blank row where a
gap would look tidy, and merge a few cells because the heading
wants centring. It all *looks* right — and it quietly fights every
useful thing Excel will ever try to do for you.

Because a sheet is not paper. It's a **grid of addressable values**
— closer to a city map than a page — and the whole machine works by
one idea: *anything can point at anything else by its address.*
Get that idea early and the rest of [the path](/roadmap/) is
downhill.

## Addresses, not places on a page

Every cell has a name: column letter, row number. `C3` isn't
"roughly there" — it's an exact address that formulas, charts and
other sheets can refer to:

```
=C3*1.2
```

That formula doesn't contain your number. It contains a *pointer*
to wherever the number lives — change `C3` and everything pointing
at it updates itself. This is the entire trick of spreadsheets:
**values live in one place, and everything else refers to them.**
The moment you type the same number twice, you've created two
places for the truth to live, and one of them will eventually be
wrong.

A **range** is just a rectangle of addresses — `A2:C10` — and
functions eat ranges whole: `=SUM(B2:B500)`. Later, ranges grow
names ([and names beat addresses](/articles/the-dollar-sign-cell-references-explained/)),
but the coordinate idea underneath never changes.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A crosshair of column C and row 3 locating cell C3 on the grid, with a formula pointing at that address">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .hd{fill:#EAF4EE;stroke:#E6E4D9}
    .beamv{fill:#EAF4EE;opacity:0;animation:gbeam 5s ease-in-out infinite}
    .beamh{fill:#EAF4EE;opacity:0;animation:gbeam 5s ease-in-out infinite;animation-delay:0.5s}
    .hit{opacity:0;animation:ghit 5s ease-in-out infinite}
    @keyframes gbeam{12%,88%{opacity:0.75}0%,100%{opacity:0}}
    @keyframes ghit{0%,22%{opacity:0}34%,88%{opacity:1}100%{opacity:0}}
  </style>
  <rect x="60" y="40" width="40" height="30" class="hd"/>
  <rect x="100" y="40" width="90" height="30" class="hd"/><text x="136" y="60" class="h">A</text>
  <rect x="190" y="40" width="90" height="30" class="hd"/><text x="226" y="60" class="h">B</text>
  <rect x="280" y="40" width="90" height="30" class="hd"/><text x="316" y="60" class="h">C</text>
  <rect x="370" y="40" width="90" height="30" class="hd"/><text x="406" y="60" class="h">D</text>
  <rect x="60" y="70" width="40" height="32" class="hd"/><text x="74" y="91" class="h">1</text>
  <rect x="60" y="102" width="40" height="32" class="hd"/><text x="74" y="123" class="h">2</text>
  <rect x="60" y="134" width="40" height="32" class="hd"/><text x="74" y="155" class="h">3</text>
  <rect x="60" y="166" width="40" height="32" class="hd"/><text x="74" y="187" class="h">4</text>
  <g>
    <rect x="100" y="70" width="360" height="128" fill="#fff" stroke="#E6E4D9"/>
    <line x1="190" y1="70" x2="190" y2="198" stroke="#E6E4D9"/><line x1="280" y1="70" x2="280" y2="198" stroke="#E6E4D9"/><line x1="370" y1="70" x2="370" y2="198" stroke="#E6E4D9"/>
    <line x1="100" y1="102" x2="460" y2="102" stroke="#E6E4D9"/><line x1="100" y1="134" x2="460" y2="134" stroke="#E6E4D9"/><line x1="100" y1="166" x2="460" y2="166" stroke="#E6E4D9"/>
  </g>
  <rect x="280" y="70" width="90" height="128" class="beamv"/>
  <rect x="100" y="134" width="360" height="32" class="beamh"/>
  <g class="hit">
    <rect x="280" y="134" width="90" height="32" fill="#fff" stroke="#0E7A4F" stroke-width="2.2"/>
    <text x="296" y="155" class="h">742</text>
    <text x="490" y="128" class="h">column C ∩ row 3</text>
    <text x="490" y="152" class="t">=C3*1.2 points</text>
    <text x="490" y="172" class="t">here — forever</text>
  </g>
  <text x="60" y="226" class="t">a sheet is a map: every value has an address, and formulas navigate by it</text>
</svg>
<figcaption>Column meets row; that intersection is the address. Everything Excel does — formulas, charts, lookups — is built on pointing at it.</figcaption>
</figure>

## One value per cell, one idea per column

The grid rewards a particular shape of data, and it's worth
learning as a creed:

- **One value per cell.** `"Cork, 1480"` in one cell is a sentence,
  not data — nothing can sum it, sort it or look it up. Two facts,
  two cells. (When an export jams them together,
  [text surgery](/articles/text-functions-textbefore-textafter/)
  separates them.)
- **One kind of thing per column**, with a header: all dates, all
  amounts, all regions. Columns are the unit Excel *thinks* in.
- **One record per row.** A row is a complete little fact —
  this customer, this date, this amount.
- **No decorative gaps.** Blank rows "for air" split your data
  into islands, and every tool — sorting,
  [Ctrl-jumps](/articles/keyboard-habits-that-pay-for-themselves/),
  [PivotTables](/articles/pivottables-from-first-principles/) —
  stops at the shoreline.

This shape has a name in stage two —
[a proper Table](/articles/format-as-table-the-feature-that-changes-everything/)
— but the instinct starts here, on day one.

## And one habit to renounce

**Merged cells.** They're the purest paper-thinking in Excel —
they centre a heading by *destroying addresses underneath it*, and
they break selection, sorting, copying and filtering forever after.
If you want a heading centred across columns, the civilised option
is `Format Cells → Alignment → Centre Across Selection`: same look,
no casualties. Merged cells in a data area are the first thing I
remove in any workbook I'm asked to rescue — and the most common
single cause of "Excel is being weird".

Presentation isn't banned — it's just a separate concern. Data in
its grid shape first; fonts, borders and
[number formats](/articles/number-formats-costume-not-value/)
painted on top, never *instead of* structure. The sheets that
survive years of use are all built this way, and the ones that
collapse are all, underneath, pieces of paper.

Think in addresses. Keep one truth per cell. Let the map be a map
— and every stage after this one gets easier.
