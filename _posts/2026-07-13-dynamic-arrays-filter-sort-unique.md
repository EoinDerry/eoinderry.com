---
title: "Dynamic arrays: FILTER, SORT and UNIQUE — formulas that spill"
description: One formula, many answers. The spill idea behind modern Excel, and the three functions that replace copy-down for whole reports.
date: 2026-07-13
domain: power-tools
---

For thirty years, Excel formulas obeyed one rule: one formula, one
cell, one answer. Need answers in two hundred cells? Copy the
formula two hundred times and hope nobody inserts a row.

Modern Excel quietly repealed the rule. Write one formula that
returns *many* values, and the results **spill** — flowing down (and
across) into neighbouring empty cells, growing and shrinking as the
data changes. This is the biggest change to how Excel *thinks* since
the pivot table, and it comes down to three functions and one
operator.

## The spill idea

Type this next to some data:

```
=UNIQUE(Sales[Region])
```

One formula, in one cell — but the result is the whole de-duplicated
list of regions, spilled downward. Add a new region to the data and
the list grows by itself. Click any cell in the results and Excel
shows a blue border around the *spill range*: one living answer, not
two hundred copies.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A single formula in one cell spills its results into the empty cells below it">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .src{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4}
    .spill{fill:#fff;stroke:#9CC8B0;stroke-dasharray:4 3}
    .s1{animation:spillin 5s ease-out infinite}
    .s2{animation:spillin 5s ease-out infinite;animation-delay:0.35s}
    .s3{animation:spillin 5s ease-out infinite;animation-delay:0.7s}
    .s4{animation:spillin 5s ease-out infinite;animation-delay:1.05s}
    @keyframes spillin{0%{opacity:0;transform:translateY(-8px)}12%,82%{opacity:1;transform:translateY(0)}94%,100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">One formula…</text>
  <rect x="60" y="40" width="280" height="36" class="src"/>
  <text x="72" y="63" class="t">=UNIQUE(Sales[Region])</text>
  <g class="s1"><rect x="60" y="76" width="280" height="36" class="spill"/><text x="72" y="99" class="t">North</text></g>
  <g class="s2"><rect x="60" y="112" width="280" height="36" class="spill"/><text x="72" y="135" class="t">South</text></g>
  <g class="s3"><rect x="60" y="148" width="280" height="36" class="spill"/><text x="72" y="171" class="t">East</text></g>
  <g class="s4"><rect x="60" y="184" width="280" height="36" class="spill"/><text x="72" y="207" class="t">West</text></g>
  <text x="390" y="63" class="h">…many answers</text>
  <text x="390" y="99" class="t">the dashed cells hold no</text>
  <text x="390" y="121" class="t">formula at all — they're</text>
  <text x="390" y="143" class="t">the spill. New data in,</text>
  <text x="390" y="165" class="t">longer list out. Nothing</text>
  <text x="390" y="187" class="t">to copy, nothing to break.</text>
</svg>
<figcaption>The formula lives in the green cell only. Everything below it is spill — a result that resizes itself when the data changes.</figcaption>
</figure>

To *refer* to a spill, point at its top cell and add `#`:
`=COUNTA(E2#)` means "the whole spill starting at E2, however big it
is today." That little hash is the pronoun for "all of it".

## The big three

**`FILTER`** — rows that match a condition. The workhorse:

```
=FILTER(Sales, Sales[Region]="North", "none found")
```

A live, self-updating extract — the report that used to be "filter,
copy, paste into the summary tab, repeat monthly" becomes one
formula. Conditions combine with `*` for AND, `+` for OR:

```
=FILTER(Sales, (Sales[Region]="North") * (Sales[Value]>1000))
```

**`SORT`** — the same data, ordered, without touching the original:

```
=SORT(FILTER(Sales, Sales[Value]>1000), 3, -1)
```

(Sort by the third column, descending.) Because these functions eat
and return whole tables, they nest like sentences.

**`UNIQUE`** — the de-duplicated list, as above. The classic combo
is a self-maintaining summary: `UNIQUE` spills the list of regions,
and a [SUMIFS](/articles/sumifs-and-friends-answers-from-a-list/)
beside it totals each one:

```
=SUMIFS(Sales[Value], Sales[Region], E2#)
```

One formula for the labels, one for the numbers — an entire report
in two cells, and it updates itself. Spilled lists also make
[drop-downs](/articles/drop-down-lists-data-validation/) that grow
with the data: point the validation source at `=$E$2#`.

## #SPILL! and other growing pains

The error you'll meet is `#SPILL!`, and it means something refreshing:
*nothing is wrong with your formula.* The landing area is blocked —
some cell in the way has content (often an invisible space from the
sheet's previous life). Click the error and Excel points at the
squatter; clear it and the spill flows.

Two genuine limitations worth knowing. Spills can't land *inside* a
Table — keep spilling formulas on the summary sheet, pointed *at*
the Table. And spilled results are values you read, not cells you
edit — you can't overwrite row three of a spill, which is exactly
the point: one source of truth, living in one formula.

## Old sheets vs new thinking

Legacy workbooks solved these jobs with copy-down formulas, helper
columns and hidden sheets, and they still work. The difference is
maintenance: a spilled `FILTER` cannot be half-updated. It's either
right everywhere or wrong visibly — and visible wrongness is a gift
in a spreadsheet.

If you're on a perpetual-licence Excel (2019 or older), these
functions are the single best reason to move to Microsoft 365 —
they're the foundation the
[new Excel](/articles/copilot-in-excel-honest-guide/) is being built
on, and `LET` and `LAMBDA` continue the same story further along
[the path](/roadmap/).

One formula, many answers, no folklore. Spill is what Excel always
wanted copy-down to be.
