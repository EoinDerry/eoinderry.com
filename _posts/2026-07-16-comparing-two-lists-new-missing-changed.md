---
title: "Comparing two lists: what's new, what's missing, what changed"
description: This month's export versus last month's — the three-question routine that turns every list-comparison job into ten minutes of formulas.
date: 2026-07-16
domain: working-with-data
---

It might be the most common real-world Excel task never taught
anywhere: **two versions of a list, and someone needs to know
what's different.** This month's customer export versus last
month's. The finance system's invoices versus the bank's. Who's
on the new rota but not the old. Eyeballing two thousand rows is
not a method — and the actual method is three questions, each
one formula.

Setup first, as ever: both lists as
[proper Tables](/articles/format-as-table-the-feature-that-changes-everything/)
(`ThisMonth`, `LastMonth`),
[keys cleaned on both sides](/articles/matching-messy-keys-between-tables/)
— a comparison inherits every invisible-space problem a lookup
does, so `TRIM` before you trust anything below.

## Question one and two: who's new, who's gone?

The membership test is `COUNTIF` — *does this key appear in the
other list?* Add a column to each Table:

```
In ThisMonth:  =COUNTIF(LastMonth[ID], [@ID]) = 0     → new
In LastMonth:  =COUNTIF(ThisMonth[ID], [@ID]) = 0     → gone
```

`TRUE` in the first column: appeared this month.
`TRUE` in the second: vanished since last month. Two columns,
[filter to TRUE](/articles/sorting-and-filtering-without-wrecking-your-data/),
done — joiners and leavers, ten seconds after the formulas fill.
The modern one-liner does the same as a
[spilled list](/articles/dynamic-arrays-filter-sort-unique/):

```
=FILTER(ThisMonth[ID], COUNTIF(LastMonth[ID], ThisMonth[ID]) = 0)
```

— "IDs this month that last month never heard of", self-updating.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two lists side by side with connecting lines for matches, a new row appearing only on the right and a missing row only on the left">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .new{fill:#EAF4EE;stroke:#0E7A4F}
    .gone{fill:#F6E7E2;stroke:#C0392B}
    .match{stroke:#9CC8B0;stroke-width:1.6;stroke-dasharray:140;stroke-dashoffset:140;animation:cldraw 5.5s ease-out infinite}
    .m2{animation-delay:0.3s}.m3{animation-delay:0.6s}
    @keyframes cldraw{0%,10%{stroke-dashoffset:140}40%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:140}}
    .flag{opacity:0;animation:clflag 5.5s ease-out infinite}
    @keyframes clflag{0%,42%{opacity:0}55%,90%{opacity:1}100%{opacity:0}}
  </style>
  <text x="70" y="26" class="h">last month</text>
  <rect x="70" y="40" width="150" height="32" class="g"/><text x="82" y="61" class="t">C-1001</text>
  <rect x="70" y="76" width="150" height="32" class="g"/><text x="82" y="97" class="t">C-1002</text>
  <rect x="70" y="112" width="150" height="32" class="gone"/><text x="82" y="133" class="t">C-1003</text>
  <rect x="70" y="148" width="150" height="32" class="g"/><text x="82" y="169" class="t">C-1004</text>
  <text x="440" y="26" class="h">this month</text>
  <rect x="440" y="40" width="150" height="32" class="g"/><text x="452" y="61" class="t">C-1001</text>
  <rect x="440" y="76" width="150" height="32" class="g"/><text x="452" y="97" class="t">C-1002</text>
  <rect x="440" y="112" width="150" height="32" class="g"/><text x="452" y="133" class="t">C-1004</text>
  <rect x="440" y="148" width="150" height="32" class="new"/><text x="452" y="169" class="t">C-1005</text>
  <line x1="220" y1="56" x2="440" y2="56" class="match"/>
  <line x1="220" y1="92" x2="440" y2="92" class="match m2"/>
  <line x1="220" y1="164" x2="440" y2="128" class="match m3"/>
  <g class="flag">
    <text x="240" y="133" class="h" fill="#C0392B">← gone</text>
    <text x="352" y="169" class="h" fill="#0A5C3B">new →</text>
  </g>
  <text x="70" y="216" class="t">two COUNTIFs draw every one of these lines — and flag the two that don't exist</text>
</svg>
<figcaption>Matches pair off; the leftovers are the answer. New, gone — two formulas, and the eyeballing career ends.</figcaption>
</figure>

## Question three: who changed?

The subtle one — present in both lists, but *different*. For
rows that match on key, fetch the old value and compare:

```
=[@Amount] <> XLOOKUP([@ID], LastMonth[ID], LastMonth[Amount])
```

`TRUE` flags every account whose amount moved. Wrap the
comparison per-column and you have a change report; the fetched
old value beside the new one
([IFNA-guarded](/articles/iferror-ifna-failing-loudly/) for the
genuinely new rows) gives the *before → after* your reader
actually wants. Comparing many columns at once? Concatenate a
fingerprint on each side —
`=TEXTJOIN("|",, [@Amount], [@Region], [@Status])` — and compare
one fingerprint instead of five columns; any difference anywhere
trips it. Numbers being compared deserve
[the ROUND guard](/articles/round-and-the-missing-penny/):
`<>` on unrounded pennies reports changes nobody made.

For a fast visual pass instead of formulas:
[conditional formatting's](/articles/conditional-formatting-highlights-not-decoration/)
duplicate/unique rules across both key columns light up the
strays — good for a one-off eyeball, no audit trail. And the
built-in worth knowing exists: `Home → Find & Select → Go To
Special` has nothing for this, but **Inquire's Compare Files**
(Professional versions) diffs whole workbooks cell by cell —
the heavyweight for "what did they change in v7".

## When it's monthly, it's a merge

The formulas are perfect for a one-off. The third month running
the same comparison, the
[usual rule](/articles/power-query-combine-monthly-files/) fires:
this is [a Power Query merge](/articles/power-query-combine-monthly-files/)
— join the two files on the key with a *full outer* join, and
the query itself labels every row `new`, `gone` or `both`,
refreshed each month with
[no formulas to maintain](/articles/power-automate-folder-that-fills-itself/).
Same three questions; the recipe just asks them for you.

New, gone, changed. Every list comparison you'll ever be handed
is those three questions wearing a deadline — and now each one
is a formula you can type from memory.
