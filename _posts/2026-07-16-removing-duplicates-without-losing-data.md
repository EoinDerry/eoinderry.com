---
title: "Removing duplicates without losing data"
description: Remove Duplicates deletes rows it never shows you — the counting-first routine that finds duplicates, understands them, and only then removes them.
date: 2026-07-16
domain: working-with-data
---

`Data → Remove Duplicates` is one click, and that's the problem.
It keeps the first copy of each duplicate it meets, **silently
deletes the rest**, and reports only a count — "14 duplicate
values removed". Which fourteen? Removed *why*? Were two of them
genuinely different orders that happened to share a name? The
dialog has already closed. The rows are already gone.

Deleting data should never be the first move. The professional
routine is three steps — *find, understand, then remove* — and it
turns the most dangerous click in the Data tab into a safe one.

## First: what is a duplicate, here?

Before any tool, answer the only question that matters: **two rows
are duplicates when *what* matches?** The whole row? The email
address? Name *and* date? Get this wrong and no tool can save you:

- Match on too few columns and you'll delete real data — two
  "John Murphy" rows may be two different orders.
- Match on the whole row and near-duplicates survive —
  `"Dublin"` and `"Dublin "` don't match, which is why
  [the cleaning routine](/articles/the-445pm-export-cleaning-messy-data/)
  **always runs first**. Trim before you compare; invisible
  spaces are how duplicates hide.

Your answer — the *key* — drives everything below.

## Second: count before you cut

Add a helper column that counts each key's appearances:

```
=COUNTIFS([Email], [@Email])
```

(One condition per key column —
[the COUNTIFS pattern](/articles/sumifs-and-friends-answers-from-a-list/).)
Every row now announces its own multiplicity: `1` means unique,
anything higher means *this row has siblings*.
[Filter](/articles/sorting-and-filtering-without-wrecking-your-data/)
to counts above 1 and **look at them** — this is the step Remove
Duplicates skips, and it's where the actual decisions live:

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A count column exposes duplicate rows; the second copy of each pair is highlighted before anything is deleted">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .dup{fill:#F6E7E2;stroke:#C0392B}
    .flag{opacity:0;animation:dflag 5s ease-in-out infinite}
    .f2{animation-delay:0.4s}
    @keyframes dflag{0%,20%{opacity:0}34%,86%{opacity:1}96%,100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">count first — the duplicates identify themselves</text>
  <rect x="60" y="40" width="220" height="32" class="g"/><text x="72" y="61" class="t">niamh@byrne.ie</text>
  <rect x="280" y="40" width="70" height="32" class="g"/><text x="302" y="61" class="t">1</text>
  <rect x="60" y="72" width="220" height="32" class="g"/><text x="72" y="93" class="t">sean@obrien.ie</text>
  <g class="flag"><rect x="280" y="72" width="70" height="32" class="dup"/><text x="302" y="93" class="h">2</text></g>
  <rect x="60" y="104" width="220" height="32" class="g"/><text x="72" y="125" class="t">aoife@murphy.ie</text>
  <rect x="280" y="104" width="70" height="32" class="g"/><text x="302" y="125" class="t">1</text>
  <rect x="60" y="136" width="220" height="32" class="g"/><text x="72" y="157" class="t">sean@obrien.ie</text>
  <g class="flag f2"><rect x="280" y="136" width="70" height="32" class="dup"/><text x="302" y="157" class="h">2</text></g>
  <text x="390" y="61" class="t">=COUNTIFS(...)</text>
  <text x="390" y="100" class="h">filter to &gt;1,</text>
  <text x="390" y="122" class="h">then LOOK:</text>
  <text x="390" y="150" class="t">same order twice?</text>
  <text x="390" y="170" class="t">or two real orders?</text>
  <text x="60" y="212" class="t">no row has been deleted yet — that's the point</text>
</svg>
<figcaption>The count column turns invisible duplicates into visible facts. Deletion becomes a decision you make with your eyes open — not a report you receive.</figcaption>
</figure>

Same order keyed twice? Duplicate — mark it. Two real orders
sharing an email? *Not* a duplicate — your key was too narrow;
widen it and recount. An import run loaded twice? That's not
row-by-row cleanup, that's
[a source problem for the recipe](/articles/power-query-combine-monthly-files/)
to fix upstream.

While deciding which copy to *keep*, the usual rule is "most
recent" or "most complete" —
[sort](/articles/sorting-and-filtering-without-wrecking-your-data/)
by your key then by date descending, and the keeper floats to the
top of each group.

## Third: now remove — with a receipt

Only now is the one-click tool safe, because you know exactly
what it will do. Work on a copy (rule zero never changes), select
the Table, `Remove Duplicates`, tick *only your key columns*, and
the count it reports should **match the number you already
expected**. That agreement is your receipt. If it removed 14 and
you expected 9, stop and find the five.

Prefer never deleting at all? Two civilised alternatives. Keep
every row and add an `IsDuplicate` flag —
`=COUNTIFS(...)>1` wrapped in [an IF](/articles/if-ifs-nested-logic-done-cleanly/)
— then exclude flagged rows in your analysis; the data survives,
the sums are right, and the audit trail is free. Or produce a
clean *copy* and leave the original untouched:
`=UNIQUE(Orders)` [spills](/articles/dynamic-arrays-filter-sort-unique/)
a de-duplicated table that updates itself — removal as a *view*,
not an amputation.

## The habit

Duplicates are stage two of [the path](/roadmap/) because they sit
exactly where clean data meets judgement: the counting is
mechanical, but *what counts as the same thing* is a decision only
someone who understands the data can make. Make it explicitly,
make it before deleting, and keep the receipt.

Count, look, decide — then, and only then, remove. Quick is nice;
recoverable is better.
