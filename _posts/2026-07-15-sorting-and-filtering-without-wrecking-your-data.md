---
title: "Sorting and filtering without wrecking your data"
description: The most-used feature in Excel is also the one that quietly scrambles spreadsheets — the one disaster to understand, and the habits that make it impossible.
date: 2026-07-15
domain: working-with-data
---

Sorting has ruined more spreadsheets than any formula ever written.
Not because it's hard — because it's *almost* safe. Used correctly
it's invisible; used wrongly it doesn't error, doesn't warn twice,
and doesn't look wrong. It just quietly marries each customer to
someone else's invoice, and you find out in a meeting.

So before the tips: the one disaster, understood properly, is the
whole lesson.

## The disaster: sorting a selection

A sheet of orders — names in column A, amounts in column B. You
select **column B only** and sort it. Excel sorts *exactly what you
selected*: the amounts reorder, the names stay put, and every row
is now a lie. No error. The numbers still sum. The sheet *looks*
fine.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sorting one selected column reorders it alone, separating each name from its amount">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .bad{fill:#F6E7E2;stroke:#C0392B}
    .v1{animation:swapA 5s ease-in-out infinite}
    .v2{animation:swapB 5s ease-in-out infinite}
    @keyframes swapA{0%,25%{transform:translateY(0)}45%,100%{transform:translateY(64px)}}
    @keyframes swapB{0%,25%{transform:translateY(0)}45%,100%{transform:translateY(-64px)}}
  </style>
  <text x="60" y="26" class="h">names stay…</text>
  <rect x="60" y="40" width="130" height="32" class="g"/><text x="72" y="61" class="t">Aoife</text>
  <rect x="60" y="72" width="130" height="32" class="g"/><text x="72" y="93" class="t">Brendan</text>
  <rect x="60" y="104" width="130" height="32" class="g"/><text x="72" y="125" class="t">Ciara</text>
  <text x="220" y="26" class="h">…amounts sort alone</text>
  <g class="v1"><rect x="220" y="40" width="110" height="32" class="bad"/><text x="232" y="61" class="t">£2,400</text></g>
  <rect x="220" y="72" width="110" height="32" class="bad"/><text x="232" y="93" class="t">£1,100</text>
  <g class="v2"><rect x="220" y="104" width="110" height="32" class="bad"/><text x="232" y="125" class="t">£600</text></g>
  <text x="60" y="180" class="t">Aoife's £2,400 just became Ciara's.</text>
  <text x="60" y="202" class="t">no error. no warning. still sums correctly.</text>
  <text x="420" y="61" class="h">the fix: sort the</text>
  <text x="420" y="83" class="h">whole table, always —</text>
  <text x="420" y="105" class="h">rows move together</text>
  <text x="420" y="150" class="t">Ctrl+T makes it</text>
  <text x="420" y="172" class="t">impossible to get wrong</text>
</svg>
<figcaption>The quiet catastrophe: a sorted column, an unsorted everything-else, and a sheet that looks perfectly healthy.</figcaption>
</figure>

Excel does throw one lifeline — the "expand the selection?" prompt —
and people click through it on reflex. The real fix is structural:
**make the data a
[Table](/articles/format-as-table-the-feature-that-changes-everything/)**
(`Ctrl+T`). Inside a Table, sorting *always* moves whole rows.
The disaster stops being a discipline you maintain and becomes a
mistake the software won't let you make. This is most of why Tables
are stage two of [the path](/roadmap/).

Two supporting habits. **Sort from a single cell**, not a selected
range — click one cell in the column, then sort; Excel takes the
whole block and there's nothing to expand. And for data whose
arrival order *matters* (an export's original sequence, a paste
you might need to undo next week), **add an index column** — `1, 2,
3…` filled down before you touch anything. Sorting by that column
is your undo button, forever.

## Sorting properly

- **Multi-level sorts** live in `Data → Sort`: by Region, *then* by
  Amount descending. The dialog reads top-down, and the order of
  levels is the logic.
- **Custom orders** — Jan/Feb/Mar rather than alphabetical
  Apr/Aug/Dec — are built into the same dialog (Order → Custom
  List). If your months sort alphabetically, this is the cure —
  though if your months are *text at all*, the better cure is
  [real dates](/articles/working-with-dates-excel/).
- If sorting scrambles unexpectedly, check for the classics:
  [text-numbers](/articles/the-445pm-export-cleaning-messy-data/)
  (10 sorts before 9), stray spaces, merged cells. Sorting doesn't
  create mess; it reveals it.

## Filtering: three honest gotchas

Filters (`Ctrl+Shift+L`, or free with every Table) hide rows that
don't match. Wonderfully useful, with three behaviours everyone
learns the hard way:

1. **Your totals ignore the filter.** `SUM` adds hidden rows too.
   The status bar's sum respects what you see, so it disagrees with
   your formula and one of them frightens you. The visible-only
   function is `=SUBTOTAL(9, range)` — a Table's Total Row uses it
   automatically, which is one more argument for Tables.
2. **Pasting onto filtered data goes wrong.** Paste a column onto
   visible rows and the values land on hidden ones too. If you must
   do surgery on a filtered list, work in a helper column with
   [an IF](/articles/if-ifs-nested-logic-done-cleanly/) instead —
   formulas respect rows; pastes don't.
3. **A filter is a view, not an edit.** Colleagues opening "the
   filtered file" are looking at *all* the data minus your
   viewpoint. If the subset is the deliverable, produce it
   honestly with [FILTER](/articles/dynamic-arrays-filter-sort-unique/)
   on another sheet — a living extract that can't be un-hidden by
   a curious click.

## The disciplined version

Sorting and filtering are the tools you use most and think about
least, which is exactly why the habits matter more than the
features: **Table first, sort from one cell, index column when
order is sacred, SUBTOTAL when rows are hidden.** Four reflexes,
and the most-used feature in Excel goes back to being invisible —
in the good way.

The sheet that can't be scrambled is the one you fixed *before*
the sort. Structure first; speed follows.
