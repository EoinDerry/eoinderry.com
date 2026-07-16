---
title: "Slow workbook? The performance habits"
description: Why sheets grind — the four real causes of Excel slowness, the ten-minute diagnosis, and the habits that keep big workbooks feeling small.
date: 2026-07-16
domain: power-tools
---

Every office has one: the workbook people open and then go and
make tea. Ten seconds on every edit, a minute to open, fans
roaring. And because slowness arrives gradually, everyone treats
it as weather — unfortunate, unfixable, endured.

It's not weather. Excel slowness has about four real causes,
they're diagnosable in minutes, and — better — the habits that
prevent them are things this
[whole syllabus](/roadmap/) has already taught you for other
reasons. This lesson connects them.

## Cause one: the used range has bloated

Excel tracks a rectangle from A1 to the furthest cell ever
touched — the *used range* — and sizes everything (calculation,
saving, scrollbars) to it. One accidental format applied to
column entirety, one stray keystroke parked in row 1,048,000, and
the sheet's rectangle is a million rows of nothing.

Diagnose with **Ctrl+End**: where does Excel *think* the data
ends? If it lands far beyond reality, select the excess rows and
columns, **delete them** (delete, not just clear), and save. This
one fix has "repaired" more legendary slow files than any other —
and it's why the habit of formatting *ranges* rather than
[whole columns](/articles/conditional-formatting-highlights-not-decoration/)
pays quietly forever.

## Cause two: volatile formulas, everywhere

Most formulas recalculate only when their inputs change. A small
set — `NOW()`, `TODAY()`, `OFFSET`, `INDIRECT`, `RAND()` — are
**volatile**: they recalculate on *every* edit, and drag every
formula that depends on them along. One `TODAY()` is fine.
`TODAY()` [copied down](/articles/the-fill-handle-excels-pattern-engine/)
an ageing column of 80,000 rows, each feeding three more
formulas, means every keystroke anywhere re-runs a quarter of a
million calculations.

The fixes are old friends: **one** `TODAY()` in a
[named cell](/articles/named-ranges-formulas-read-like-sentences/)
(`as_of`), referenced everywhere; `INDIRECT`/`OFFSET` retired in
favour of [structured references](/articles/structured-references-formulas-inside-tables/)
and [XLOOKUP](/articles/xlookup-the-lookup-to-learn-first/),
which do their jobs without the volatility.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One edit ripples through a chain of volatile formulas versus barely touching a well-structured sheet">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .hot{fill:#F6E7E2;stroke:#C0392B}
    .cool{fill:#EAF4EE;stroke:#0E7A4F}
    .r1{animation:pfrip 4.5s ease-out infinite}
    .r2{animation:pfrip 4.5s ease-out infinite;animation-delay:0.2s}
    .r3{animation:pfrip 4.5s ease-out infinite;animation-delay:0.4s}
    .r4{animation:pfrip 4.5s ease-out infinite;animation-delay:0.6s}
    .r5{animation:pfrip 4.5s ease-out infinite;animation-delay:0.8s}
    @keyframes pfrip{0%,10%{opacity:0.25}18%,30%{opacity:1}44%,100%{opacity:0.25}}
    .calm{animation:pfcalm 4.5s ease-out infinite}
    @keyframes pfcalm{0%,10%{opacity:0.4}18%,30%{opacity:1}44%,100%{opacity:0.4}}
  </style>
  <text x="60" y="26" class="h">volatile chain — one keystroke, everything recalculates</text>
  <g class="r1"><rect x="60" y="40" width="100" height="32" class="hot"/><text x="70" y="61" class="t">edit ✎</text></g>
  <g class="r2"><rect x="170" y="40" width="100" height="32" class="hot"/><text x="180" y="61" class="t">NOW()</text></g>
  <g class="r3"><rect x="280" y="40" width="100" height="32" class="hot"/><text x="290" y="61" class="t">OFFSET…</text></g>
  <g class="r4"><rect x="390" y="40" width="100" height="32" class="hot"/><text x="400" y="61" class="t">80k rows</text></g>
  <g class="r5"><rect x="500" y="40" width="100" height="32" class="hot"/><text x="510" y="61" class="t">…wait.</text></g>
  <text x="60" y="122" class="h">structured sheet — one keystroke, one dependency</text>
  <g class="calm"><rect x="60" y="136" width="100" height="32" class="cool"/><text x="70" y="157" class="t">edit ✎</text></g>
  <rect x="170" y="136" width="100" height="32" class="g"/><text x="180" y="157" class="t">as_of</text>
  <rect x="280" y="136" width="100" height="32" class="g"/><text x="290" y="157" class="t">Table col</text>
  <rect x="390" y="136" width="100" height="32" class="g"/><text x="400" y="157" class="t">SUMIFS</text>
  <rect x="500" y="136" width="100" height="32" class="g"/><text x="510" y="157" class="t">instant ✓</text>
  <text x="60" y="212" class="t">same data, same answers — the difference is what each edit wakes up</text>
</svg>
<figcaption>Slowness is rarely the data's size; it's how much machinery each keystroke wakes. Volatility is the alarm wired to everything.</figcaption>
</figure>

## Cause three: formulas doing a database's job

Ten thousand [whole-column lookups](/articles/index-and-match-for-full-control/),
[SUMIFS over A:A](/articles/sumifs-and-friends-answers-from-a-list/)
instead of a Table column, twenty helper columns re-deriving the
same cleaning — formula sprawl where *data preparation* should
be. The stage-six answer you already own:
[the recipe](/articles/power-query-combine-monthly-files/). Move
import-and-clean into Power Query (which handles millions of rows
without breaking sweat), land a tidy Table, and let formulas do
only the *thinking* layer. Precise ranges (`Orders[Amount]`, not
`A:A`) finish the job — the
[shared-MATCH pattern](/articles/index-and-match-for-full-control/)
alone can cut a heavy sheet's lookup cost by whatever multiple of
columns it was repeating.

## Cause four: the archaeology layer

Slow files are usually also *old* files: twelve "backup" sheets
(each a full copy),
[conditional-formatting rules bred by years of pasting](/articles/conditional-formatting-highlights-not-decoration/),
[names pointing at deleted ranges](/articles/named-ranges-formulas-read-like-sentences/),
invisible shapes from a decade of pastes-from-web. Run the digs:
Name Manager (delete the `#REF!`s), Manage Rules (prune), and
`.xlsx` archaeology's bluntest instrument — copy the *live*
sheets to a fresh workbook and compare file sizes. A 40MB file
that becomes 4MB just told you where the weight was.

## The order of operations

When a real slow file lands on you: **Ctrl+End first** (thirty
seconds, biggest single win), then hunt volatiles, then the
whole-column references, then the archaeology. While operating,
`Formulas → Calculation Options → Manual` with F9-to-recalculate
makes the patient workable on the table — just *put it back to
Automatic after*; a manual-calc file in innocent hands shows
stale numbers with total confidence, which is a
[worse disease than slowness](/articles/iferror-ifna-failing-loudly/).

The quiet moral: performance isn't a specialist topic bolted on
the end — it's the same architecture this syllabus has preached
throughout ([Tables](/articles/format-as-table-the-feature-that-changes-everything/),
names, recipes, one home per fact), *measured in seconds instead
of clarity*. Workbooks built the boring way are fast the way
tidy kitchens are clean: not through heroics, but because
nothing's in the wrong place. Cup of tea optional again.
