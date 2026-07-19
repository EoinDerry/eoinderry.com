---
title: "The checks row: self-testing spreadsheets"
description: Software engineers test their code; spreadsheets can too — the small block of formulas that audits your workbook continuously, and screams before your reader does.
date: 2026-07-16
domain: formulas
---

Every serious spreadsheet error story —
[the copy-down that cost billions](/articles/auditing-formulas-trace-evaluate-trust/),
the report that summed 4,970 of 5,000 rows — shares one feature:
**the workbook knew.** The evidence was sitting in the cells;
no formula was checking. Software engineers solved this problem
decades ago with automated tests. The spreadsheet version is
humbler and just as effective: a **checks block** — a handful of
formulas whose only job is to audit the rest of the file,
continuously, and go red before your reader goes looking.

## The anatomy of a check

Every check is one sentence made testable: *something that must
be true about this workbook.* Written as a formula returning
TRUE/FALSE (or a count of violations, where zero is the pass):

```
=SUM(Report[Amount]) = SUM(Orders[Amount])
```

*The report accounts for every pound in the data.* If a
[filter](/articles/sorting-and-filtering-without-wrecking-your-data/)
quietly excluded rows, a
[lookup dropped the unmatched](/articles/iferror-ifna-failing-loudly/),
or a range stopped a row short — this line turns FALSE the
moment it happens, not the month someone reconciles.

The standard battery, most of which you've met as diagnostics
and now install as permanent residents:

| The claim | The check |
|-----------|-----------|
| Totals reconcile end-to-end | `=ROUND(SUM(a),2)=ROUND(SUM(b),2)` — [pennies respected](/articles/round-and-the-missing-penny/) |
| No text-numbers in the amounts | `=COUNT(col)=COUNTA(col)` — [the COUNT gap](/articles/sum-average-count-basics-done-properly/) |
| Every order matched a customer | `=SUMPRODUCT(--ISNA(matches))=0` |
| No duplicate keys | `=COUNTA(ids)=ROWS(UNIQUE(ids))` — [the counting rule](/articles/removing-duplicates-without-losing-data/) |
| No errors anywhere that matters | `=SUMPRODUCT(--ISERROR(Report))=0` |
| Dates inside the period | `=COUNTIFS(dates,"<"&start)+COUNTIFS(dates,">"&end)=0` |
| The [amortisation lands on zero](/articles/loan-amortisation-table-excel/) | `=ABS(final_balance)<0.01` |

The `IS` family (`ISNUMBER`, `ISTEXT`, `ISBLANK`, `ISNA`) plus
`--` to [turn TRUE/FALSE into countable 1/0](/articles/sumproduct-weighted-averages/)
builds nearly all of them.

## Make it impossible to miss

Checks that hide are checks that fail silently — the exact
disease they exist to cure. So: a **Checks section** at the top
of the [Calc sheet](/articles/organising-a-workbook-sheets-and-structure/)
(or its own tab in a big model), one row per check — plain-
English claim, the formula, and a status cell:

```
=IF(check, "OK", "FAIL")
```

with [conditional formatting](/articles/conditional-formatting-highlights-not-decoration/)
making FAIL glow. Then the master line — the one that travels:

```
=IF(COUNTIF(Checks[Status],"FAIL")=0, "ALL CHECKS PASS ✓",
    COUNTIF(Checks[Status],"FAIL") & " CHECKS FAILING")
```

— displayed **on the output sheet**, beside
[the dashboard's timestamp](/articles/building-a-one-page-dashboard/).
A report that publicly certifies itself changes the
conversation: readers stop spot-auditing your numbers, and you
stop being asked to.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A checks panel of green OK rows where one row flips to a glowing FAIL the moment the data breaks, before the report goes out">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .ok{fill:#EAF4EE;stroke:#0E7A4F}
    .fail{fill:#F6E7E2;stroke:#C0392B}
    .flip{animation:ckflip 6s ease-in-out infinite}
    .flip2{opacity:0;animation:ckflip2 6s ease-in-out infinite}
    @keyframes ckflip{0%,40%{opacity:1}50%,88%{opacity:0}100%{opacity:1}}
    @keyframes ckflip2{0%,40%{opacity:0}50%,88%{opacity:1}100%{opacity:0}}
    .glow{animation:ckglow 1.3s ease-in-out infinite alternate}
    @keyframes ckglow{from{fill-opacity:1}to{fill-opacity:0.45}}
  </style>
  <text x="60" y="26" class="h">CHECKS</text>
  <rect x="60" y="40" width="380" height="32" class="g"/><text x="72" y="61" class="t">report total = data total</text>
  <rect x="440" y="40" width="90" height="32" class="ok"/><text x="462" y="61" class="t">OK</text>
  <rect x="60" y="72" width="380" height="32" class="g"/><text x="72" y="93" class="t">no duplicate order IDs</text>
  <rect x="440" y="72" width="90" height="32" class="ok"/><text x="462" y="93" class="t">OK</text>
  <rect x="60" y="104" width="380" height="32" class="g"/><text x="72" y="125" class="t">all customers matched</text>
  <g class="flip"><rect x="440" y="104" width="90" height="32" class="ok"/><text x="462" y="125" class="t">OK</text></g>
  <g class="flip2"><rect x="440" y="104" width="90" height="32" class="fail glow"/><text x="454" y="125" class="h">FAIL</text></g>
  <g class="flip"><text x="60" y="180" class="h" fill="#0A5C3B">ALL CHECKS PASS ✓</text></g>
  <g class="flip2">
    <text x="60" y="180" class="h" fill="#C0392B">1 CHECK FAILING — new customer in the export, not in the lookup</text>
    <text x="60" y="206" class="t">caught at refresh, fixed in minutes — not discovered by finance in August</text>
  </g>
</svg>
<figcaption>The moment the July export contains a customer the lookup table doesn't, the panel says so. That sentence used to be an email from finance.</figcaption>
</figure>

## The habit that builds the battery

Don't sit down to "write tests" — you won't. Instead, **every
bug you fix becomes a check.** The day a
[text-number](/articles/csv-encoding-import-what-went-wrong/)
skews a total, add the COUNT check; the day an unmatched key
slips through, add the ISNA line. Each incident costs you once
and then guards forever — the workbook accumulates immunity the
way [the cleaning routine](/articles/the-445pm-export-cleaning-messy-data/)
accumulated steps. Five checks catch most disasters; a mature
model carries ten and never mentions them.

This is also, quietly, the professional signature. Anyone can
build a model that's right today.
[The inheritable workbook](/articles/auditing-formulas-trace-evaluate-trust/)
is one that *announces* when it stops being right — under new
data, new months, new hands. A green checks panel is the
cheapest trust a spreadsheet can buy.

The workbook always knows. The checks row is how it learns to
say so — out loud, in red, in time.
