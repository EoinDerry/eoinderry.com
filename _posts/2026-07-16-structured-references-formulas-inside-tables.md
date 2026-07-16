---
title: "Structured references: writing formulas inside Tables"
description: Inside a proper Table, formulas stop saying B2:B500 and start saying what they mean — the column-name grammar that makes sheets self-documenting.
date: 2026-07-16
domain: working-with-data
---

The first time you write a formula inside a
[proper Table](/articles/format-as-table-the-feature-that-changes-everything/),
something unexpected happens. You click a cell to reference it,
and instead of `C2`, Excel writes:

```
=[@Amount] * [@Rate]
```

Some people's instinct is to flinch and turn it off. Don't — you've
just met **structured references**, the grammar Tables speak, and
it's the most readable dialect Excel has. This lesson is that
grammar, on one page.

## The grammar, on one page

Given a Table named `Orders` (you *did* name it — top-left of the
ribbon under Table Design; `Table1` is a wasted gift):

| You write | It means |
|-----------|----------|
| `[@Amount]` | Amount, *this row* |
| `Orders[Amount]` | the whole Amount column |
| `Orders[#Totals]` | the totals row |
| `Orders[#Headers]` | the header row |
| `Orders[]` | the whole data body |

The `@` is the heart of it: **"this row"**. `=[@Amount]*[@Rate]`
reads as *this row's amount times this row's rate* — no
[dollar-sign choreography](/articles/the-dollar-sign-cell-references-explained/),
no counting columns, nothing to re-aim when the Table moves or
grows. From outside the Table, the name does the pointing:
`=SUM(Orders[Amount])` from any sheet in the workbook, and it
reads like a sentence — the same kindness as
[named ranges](/articles/named-ranges-formulas-read-like-sentences/),
handed to you free with every column.

## The two behaviours that change your work

**Formulas fill themselves.** Type a formula in one cell of a
Table column and it instantly fills the whole column — and every
row added later inherits it. This is the *calculated column*, and
it retires the
[fill handle](/articles/the-fill-handle-excels-pattern-engine/)
for Table work. One formula per column, everywhere, always —
which also means **one truth per column**: if you find yourself
overwriting a few cells of a calculated column by hand, the
column wants [an IF](/articles/if-ifs-nested-logic-done-cleanly/),
not exceptions. (A little dropdown appears after auto-fill if you
genuinely want it off, once.)

**References stretch.** `=SUM(Orders[Amount])` is immune to the
oldest bug in spreadsheets — the summary formula frozen at
`B2:B500` while the data
[quietly reaches row 501](/articles/conditional-formatting-highlights-not-decoration/).
The column reference *is* the column, today's size, always.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A new row added to a Table: the calculated column fills itself and the SUM over the column stretches to include it">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .hd{fill:#EAF4EE;stroke:#0E7A4F}
    .newr{opacity:0;animation:srnew 5.5s ease-in-out infinite}
    @keyframes srnew{0%,22%{opacity:0;transform:translateY(-6px)}36%,88%{opacity:1;transform:translateY(0)}98%,100%{opacity:0}}
    .tot{animation:srtot 5.5s ease-in-out infinite}
    @keyframes srtot{0%,34%{fill:#5A655E}44%,88%{fill:#0E7A4F}100%{fill:#5A655E}}
  </style>
  <rect x="60" y="40" width="150" height="32" class="hd"/><text x="72" y="61" class="h">Item</text>
  <rect x="210" y="40" width="120" height="32" class="hd"/><text x="222" y="61" class="h">Amount</text>
  <rect x="330" y="40" width="150" height="32" class="hd"/><text x="342" y="61" class="h">Inc VAT</text>
  <rect x="60" y="72" width="150" height="32" class="g"/><text x="72" y="93" class="t">Widgets</text>
  <rect x="210" y="72" width="120" height="32" class="g"/><text x="222" y="93" class="t">200</text>
  <rect x="330" y="72" width="150" height="32" class="g"/><text x="342" y="93" class="t">240</text>
  <rect x="60" y="104" width="150" height="32" class="g"/><text x="72" y="125" class="t">Gaskets</text>
  <rect x="210" y="104" width="120" height="32" class="g"/><text x="222" y="125" class="t">100</text>
  <rect x="330" y="104" width="150" height="32" class="g"/><text x="342" y="125" class="t">120</text>
  <g class="newr">
    <rect x="60" y="136" width="150" height="32" class="g"/><text x="72" y="157" class="t">Flanges  ← new row</text>
    <rect x="210" y="136" width="120" height="32" class="g"/><text x="222" y="157" class="t">50</text>
    <rect x="330" y="136" width="150" height="32" class="hd"/><text x="342" y="157" class="t">60  ← auto-filled</text>
  </g>
  <text x="60" y="205" class="t">elsewhere:  =SUM(Orders[Inc VAT])</text>
  <text x="60" y="228" class="h">= <tspan class="tot">420</tspan>   ← stretched by itself</text>
  <text x="360" y="205" class="t">no formula edited,</text>
  <text x="360" y="228" class="t">no range re-pointed</text>
</svg>
<figcaption>Add a row: the calculated column writes its own formula, and every reference to the Table already includes it. This is the bug class Tables deleted.</figcaption>
</figure>

## The idioms and the honest wrinkles

The everyday combinations:
[`SUMIFS`](/articles/sumifs-and-friends-answers-from-a-list/) over
Table columns (`=SUMIFS(Orders[Amount], Orders[Region], "North")`)
— criteria formulas that survive growth;
[XLOOKUP](/articles/xlookup-the-lookup-to-learn-first/) between
Tables (`=XLOOKUP([@SKU], Prices[SKU], Prices[GBP])`) — a join
that reads like English; and
[spilled functions](/articles/dynamic-arrays-filter-sort-unique/)
pointed at Tables (`=UNIQUE(Orders[Region])`) — the two features
were made for each other, with the one rule that spills must land
*outside* Tables.

The wrinkles, honestly. A structured reference doesn't behave like
`$B$2` when dragged *sideways* — `[@Amount]` shifts to the next
column, which surprises people building
[two-way grids](/articles/the-dollar-sign-cell-references-explained/);
for row-by-row Table work it's simply not an issue. Spaces in
column names force bracket-heavy syntax (`[@[Unit Price]]`) —
name columns `UnitPrice` and the noise disappears. And if the
grammar ever produces something baffling, remember it's still
[the grid](/articles/the-grid-mindset-how-excel-thinks/)
underneath: `Orders[Amount]` is just a range that knows its own
name and size.

The deeper shift is the one running through the whole of
[the path](/roadmap/): every stage replaces *coordinates* with
*meaning* — names over addresses,
[LET-named steps](/articles/let-and-lambda-formulas-you-can-read/)
over nested mystery. Structured references are where that shift
becomes the default rather than a discipline: build on Tables and
your formulas document themselves, whether you were trying or not.

`=[@Amount]*[@Rate]`. Say it out loud. That's what formulas were
supposed to sound like all along.
