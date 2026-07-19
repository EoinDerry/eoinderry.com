---
title: "Power Query II: unpivot, merge and append"
description: The recipe's three power moves — unstacking cross-tabs into proper data, joining tables without lookups, and stacking sources into one — each impossible or painful in the grid.
date: 2026-07-16
domain: power-tools
---

[The first Power Query lesson](/articles/power-query-combine-monthly-files/)
sold the idea: transformations recorded once, replayed on
refresh. This one is about the three transformations worth the
ticket price on their own — the moves that are painful or
impossible in the grid, and one-click steps in the editor.

## Unpivot: the report that should have been data

The most valuable button in the whole editor. Data constantly
arrives *cross-tabbed* — products down the side, **months
across the top** — because that's how humans like to *read* it.
But [everything you've built](/articles/pivottables-from-first-principles/)
wants it *long*: one row per product-month, with a Month column.
Cross-tab in, analysis blocked: you can't
[SUMIFS by month](/articles/sumifs-and-friends-answers-from-a-list/)
when month is twelve column headers, and January's arrival as a
*new column* breaks every formula pointed at the old shape.

In the editor: select the identifier columns (Product),
right-click → **Unpivot Other Columns**. The twelve month
columns collapse into two — Attribute (the month) and Value —
and the cross-tab becomes proper data. "Other columns" is the
phrasing that future-proofs it: when the next file carries a
thirteenth month, it unpivots too, *because you never named the
months*. A whole genre of copy-paste-transpose misery, deleted.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A wide cross-tab of months as columns folding into a long table of product, month and value rows">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .hd{fill:#EAF4EE;stroke:#0E7A4F}
    .fold{animation:uqfold 5.5s ease-in-out infinite}
    @keyframes uqfold{0%,25%{opacity:1}42%,88%{opacity:0.2}100%{opacity:1}}
    .long{opacity:0;animation:uqlong 5.5s ease-in-out infinite}
    @keyframes uqlong{0%,30%{opacity:0}46%,88%{opacity:1}100%{opacity:0}}
  </style>
  <g class="fold">
    <text x="50" y="26" class="h">how it reads (wide)</text>
    <rect x="50" y="40" width="90" height="28" class="hd"/><text x="60" y="59" class="t">Product</text>
    <rect x="140" y="40" width="60" height="28" class="hd"/><text x="150" y="59" class="t">Jan</text>
    <rect x="200" y="40" width="60" height="28" class="hd"/><text x="210" y="59" class="t">Feb</text>
    <rect x="260" y="40" width="60" height="28" class="hd"/><text x="270" y="59" class="t">Mar</text>
    <rect x="50" y="68" width="90" height="28" class="g"/><text x="60" y="87" class="t">Widgets</text>
    <rect x="140" y="68" width="60" height="28" class="g"/><text x="150" y="87" class="t">120</text>
    <rect x="200" y="68" width="60" height="28" class="g"/><text x="210" y="87" class="t">98</text>
    <rect x="260" y="68" width="60" height="28" class="g"/><text x="270" y="87" class="t">143</text>
  </g>
  <path d="M340 80 h50" stroke="#0E7A4F" stroke-width="1.6" fill="none" marker-end="url(#uqa)"/>
  <defs><marker id="uqa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="336" y="64" class="t">unpivot</text>
  <g class="long">
    <text x="410" y="26" class="h">how it works (long)</text>
    <rect x="410" y="40" width="210" height="26" class="hd"/><text x="420" y="58" class="t">Product · Month · Value</text>
    <rect x="410" y="66" width="210" height="24" class="g"/><text x="420" y="83" class="t">Widgets · Jan · 120</text>
    <rect x="410" y="90" width="210" height="24" class="g"/><text x="420" y="107" class="t">Widgets · Feb ·  98</text>
    <rect x="410" y="114" width="210" height="24" class="g"/><text x="420" y="131" class="t">Widgets · Mar · 143</text>
    <text x="410" y="164" class="t">one row per fact —</text>
    <text x="410" y="184" class="t">pivots, SUMIFS and charts</text>
    <text x="410" y="204" class="t">all work again</text>
  </g>
  <text x="50" y="130" class="t">readable, but unanalysable —</text>
  <text x="50" y="150" class="t">"month" is trapped in the headers</text>
  <text x="50" y="204" class="t">humans read wide; machines need long. unpivot is the translator</text>
</svg>
<figcaption>Cross-tabs are presentation wearing a data costume. Unpivot Other Columns turns reading-shape into working-shape — and survives next month's new column.</figcaption>
</figure>

(The pivot's own job — going back from long to readable-wide —
already belongs to
[the PivotTable](/articles/pivottables-from-first-principles/).
The two tools are a matched pair: store long, present wide.)

## Merge: the join, done upstream

**Merge Queries** is
[the lookup](/articles/xlookup-the-lookup-to-learn-first/)
performed at the recipe layer: match Orders to Customers on
the key, expand the columns you want, done — before the data
ever reaches a sheet. When to prefer it over in-sheet lookups:
when the join is *structural* (every refresh, forever) rather
than exploratory; when there are
[hundreds of thousands of rows](/articles/slow-workbook-performance-habits/)
of lookup formulas to avoid; and when you need **join kinds** —
left, inner, full outer, or *left anti* ("rows with no match"),
which turns
[the comparing-two-lists routine](/articles/comparing-two-lists-new-missing-changed/)
into a refreshable query that labels new/gone/changed by
itself. This is also where
[fuzzy matching](/articles/matching-messy-keys-between-tables/)
properly lives — thresholds, transformation tables, repeatable.

## Append: the stack

**Append Queries** stacks tables with matching columns — this
year's file atop last year's, the
[folder-combine's](/articles/power-query-combine-monthly-files/)
manual cousin for sources that live in different places or
shapes. The one discipline: normalise the columns *first*
(names and [types](/articles/csv-encoding-import-what-went-wrong/)
must agree; the editor's rename/retype steps are exactly for
this), and add a Source column so
[the audit trail survives](/articles/removing-duplicates-without-losing-data/)
the stacking.

## The senior habit

The trio shares one mental model worth naming: **shape at the
recipe layer, think at the sheet layer.** Unpivot fixes shape,
merge fixes relationships, append fixes fragmentation — all
before a single cell exists, all replayed
[per refresh](/articles/power-automate-folder-that-fills-itself/),
all documented in Applied Steps that read
[like a checklist](/articles/your-first-macro-and-when-not-to/).
The workbooks that stay fast, small and
[auditable](/articles/the-checks-row-self-testing-spreadsheets/)
are the ones whose sheets receive *finished* data — and these
three buttons are how data gets finished.

Unpivot when headers hold facts. Merge when tables belong
together. Append when one table arrived in pieces. Three moves,
learned once — recorded forever.
