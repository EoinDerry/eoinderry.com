---
title: "Organising a workbook: sheets, tabs and structure"
description: Inside one file, architecture still matters — the sheet-per-job rule, tab hygiene, linking between sheets, and the workbook shapes that age well.
date: 2026-07-16
domain: foundations
---

Open a workbook someone has lived in for three years and you can
read their working life in the tab bar: `Sheet1`, `Sheet1 (2)`,
`FINAL`, `FINAL new`, `dont use`, and a mysterious `xx`. Nothing
in it is *wrong*, exactly — but nobody, including the author,
knows where anything lives. Workbook organisation is the
[grid mindset](/articles/the-grid-mindset-how-excel-thinks/) one
level up: a file, like a sheet, has an architecture, and the
habits cost nothing at the start and everything when skipped.

## One sheet, one job

The organising rule of the whole course, applied to tabs: **each
sheet does one kind of thing.** The mature shape, which you've
met as [the dashboard's three layers](/articles/building-a-one-page-dashboard/),
generalises to any workbook:

- **Inputs** — the [named settings](/articles/named-ranges-formulas-read-like-sentences/)
  a human might change, in one place, labelled.
- **Data** — one [Table](/articles/format-as-table-the-feature-that-changes-everything/)
  per sheet, nothing else on it. Data sheets are warehouses, not
  workshops.
- **Calc** — the working layer: lookups, summaries, staging.
- **Output** — what people see: the report, the
  [print-ready page](/articles/print-and-pdf-sheets-people-can-read/),
  the chart sheet.

A small model might merge Calc and Output; a personal tracker
might be two tabs. The rule isn't "four sheets" — it's that when
you add something, there's an obviously right tab for it, and
when a colleague opens the file, the tab names *are* the
documentation.

## Tab hygiene: thirty seconds each, permanent payoff

**Name every sheet** the moment it exists (double-click the tab)
— `Orders`, `Inputs`, `Monthly Report`, never `Sheet7`. Short,
because tab space is precious; specific, because `Data2` is a
promise of future confusion. **Colour with meaning** (right-click
→ Tab Colour): one scheme, used sparingly — say, green for
inputs, grey for reference, red for do-not-touch. Four colours
with rules beat eight colours with vibes —
[the highlighting principle](/articles/conditional-formatting-highlights-not-decoration/)
again. **Order tabs left-to-right as a reader** would want them:
outputs first, machinery behind. And **hide the plumbing**
(right-click → Hide) — staging sheets and
[reference tables](/articles/approximate-matches-banding-tiers-tax-tables/)
confuse more than they inform. (Hiding is tidiness, not
[security](/articles/excel-on-the-web-sharing-workbooks/) —
anyone can unhide.)

<figure class="guide-fig">
<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A chaotic tab bar of Sheet1 copies reorganising itself into named, colour-coded tabs in reading order">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .tab{fill:#fff;stroke:#E6E4D9}
    .bad{animation:wofade 6s ease-in-out infinite}
    @keyframes wofade{0%,30%{opacity:1}45%,88%{opacity:0.15}100%{opacity:1}}
    .good{opacity:0;animation:woshow 6s ease-in-out infinite}
    @keyframes woshow{0%,30%{opacity:0}45%,88%{opacity:1}100%{opacity:0}}
    .in{fill:#EAF4EE;stroke:#0E7A4F}
    .dat{fill:#F4F2EA;stroke:#8A948D}
    .out{fill:#fff;stroke:#0E7A4F;stroke-width:1.6}
  </style>
  <text x="60" y="30" class="h">the archaeology</text>
  <g class="bad">
    <rect x="60" y="44" width="80" height="30" class="tab"/><text x="70" y="64" class="t">Sheet1</text>
    <rect x="142" y="44" width="98" height="30" class="tab"/><text x="152" y="64" class="t">Sheet1 (2)</text>
    <rect x="242" y="44" width="70" height="30" class="tab"/><text x="252" y="64" class="t">FINAL</text>
    <rect x="314" y="44" width="100" height="30" class="tab"/><text x="324" y="64" class="t">FINAL new</text>
    <rect x="416" y="44" width="94" height="30" class="tab"/><text x="426" y="64" class="t">dont use</text>
    <rect x="512" y="44" width="46" height="30" class="tab"/><text x="524" y="64" class="t">xx</text>
  </g>
  <text x="60" y="130" class="h">the architecture</text>
  <g class="good">
    <rect x="60" y="144" width="110" height="30" class="out"/><text x="70" y="164" class="t">Report</text>
    <rect x="172" y="144" width="110" height="30" class="in"/><text x="182" y="164" class="t">Inputs</text>
    <rect x="284" y="144" width="100" height="30" class="dat"/><text x="294" y="164" class="t">Orders</text>
    <rect x="386" y="144" width="110" height="30" class="dat"/><text x="396" y="164" class="t">Customers</text>
    <rect x="498" y="144" width="80" height="30" class="tab"/><text x="508" y="164" class="t">Calc</text>
    <text x="60" y="204" class="t">reader first, machinery behind — the tab bar becomes the documentation</text>
  </g>
</svg>
<figcaption>Same file, reorganised. The second tab bar answers "where does X live?" before anyone asks — which is the entire job of structure.</figcaption>
</figure>

## Linking between sheets (and between workbooks)

Cross-sheet references are ordinary references wearing a prefix
— `=Orders!B2`, or better,
[`=SUM(Orders[Amount])`](/articles/structured-references-formulas-inside-tables/),
which doesn't care what sheet the Table lives on. Point-and-click
builds them: start the formula, click the other tab, click the
cell. Two habits keep them healthy: **flow one way** — outputs
read from calc, calc reads from data; the moment sheets read
from *each other* you've built circular spaghetti that
[the auditing arrows](/articles/auditing-formulas-trace-evaluate-trust/)
will one day have to untangle. And **links between separate
workbooks are a last resort** — they break silently when files
move or get renamed, and the honest alternative for feeding one
workbook from another is
[a query](/articles/power-query-combine-monthly-files/), which
declares its source and refreshes on purpose.

Navigation, for when the file grows anyway: right-click the tab
navigation arrows for the jump-to-sheet list; `Ctrl+PgUp/PgDn`
[to walk tabs](/articles/keyboard-habits-that-pay-for-themselves/);
and for genuinely big workbooks, a first-tab index of links
(`Insert → Link → Place in This Document`) costs five minutes
and reads as professionalism forever.

One job per sheet, names that document, flow in one direction.
Structure is the cheapest feature you'll ever add to a file —
and like every foundation on [the path](/roadmap/), it was never
about tidiness. It's about the next person — who is usually
you, later, in a hurry.
