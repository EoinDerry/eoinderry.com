---
title: "The inheritable workbook"
description: Every workbook outlives its author's attention — the documentation habits, naming and structure that let a stranger open your file and run it without you.
date: 2026-07-16
domain: power-tools
---

Here is the fate of every useful workbook: it outlives your
attention. You change roles, go on leave, or simply forget —
and someone else opens the file cold. At that moment your model
is exactly as good as a stranger's ability to run it. Most
workbooks fail this test not through bad formulas but through
**missing context**: what is this, what feeds it, what do I
press, what must I never touch?

The engineering world calls the fix *documentation* and makes
it sound like homework. In a workbook it's about an hour of
habits — most of which you've already built without noticing.

## What you already did

Walk the course backwards and the inheritable workbook is
mostly assembled:
[sheets named for their jobs](/articles/organising-a-workbook-sheets-and-structure/),
reading order left to right;
[settings as named cells](/articles/named-ranges-formulas-read-like-sentences/)
with comments in the Name Manager;
[formulas that read like sentences](/articles/structured-references-formulas-inside-tables/)
instead of coordinates;
[a checks panel](/articles/the-checks-row-self-testing-spreadsheets/)
that says out loud whether the file is healthy;
[recipes whose steps are named](/articles/power-query-combine-monthly-files/);
[inputs fenced from machinery](/articles/sheet-protection-workbooks-that-survive/);
a [refresh-and-read routine](/articles/building-a-one-page-dashboard/)
instead of ritual surgery. Every one of those was sold as a
kindness to future-you. Your successor is future-you with less
context — same beneficiary, bigger need.

What's left is the part no structure can carry: the **README
sheet**.

## The README sheet: one tab, five answers

First tab in the file, plain text, five headings:

1. **What this is** — two sentences. "Monthly consolidation of
   depot sales; produces the one-page report on the Dashboard
   tab. Owner: [you]. Since: 2026."
2. **What feeds it** — every source, by location:
   [the SharePoint folder](/articles/where-files-should-live-onedrive-sharepoint-teams/)
   the exports land in, the
   [Forms list](/articles/forms-to-excel-data-arrives-clean/),
   [the flow that files attachments](/articles/power-automate-folder-that-fills-itself/).
   Data lineage is the first thing an inheritor can't guess.
3. **How to run it** — the monthly routine as numbered steps.
   "1. Check the flow filed this month's export. 2. Data →
   Refresh All. 3. Checks panel must read ALL PASS. 4. Export
   Dashboard [to PDF](/articles/print-and-pdf-sheets-people-can-read/)."
   If the steps embarrass you by their number, that's
   [the automation backlog](/articles/office-scripts-macros-browser-era/),
   documented for free.
4. **What never to touch** — the two or three genuinely fragile
   things, named honestly. Every workbook has them; only the
   author knows where they are.
5. **Decisions and history** — a dated line per change:
   "2026-07: VAT handling moved into query, per finance."
   Ten seconds per entry; it's the file's
   [decision log](/articles/removing-duplicates-without-losing-data/),
   and the answer to "why is it like this?", which is the
   question inheritors ask most and records answer best.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A README tab answering the five questions a stranger asks, with the rest of the workbook's tabs behind it">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .q1{opacity:0;animation:rmq 6s ease-out infinite}
    .q2{opacity:0;animation:rmq 6s ease-out infinite;animation-delay:0.5s}
    .q3{opacity:0;animation:rmq 6s ease-out infinite;animation-delay:1s}
    .q4{opacity:0;animation:rmq 6s ease-out infinite;animation-delay:1.5s}
    .q5{opacity:0;animation:rmq 6s ease-out infinite;animation-delay:2s}
    @keyframes rmq{0%,8%{opacity:0;transform:translateX(-8px)}20%,90%{opacity:1;transform:translateX(0)}100%{opacity:0}}
  </style>
  <rect x="60" y="40" width="400" height="170" rx="8" class="acc"/>
  <text x="78" y="68" class="h">README</text>
  <g class="q1"><text x="78" y="96" class="t">1 · what this is, who owns it</text></g>
  <g class="q2"><text x="78" y="120" class="t">2 · what feeds it (paths, flows, forms)</text></g>
  <g class="q3"><text x="78" y="144" class="t">3 · how to run it: refresh → checks → send</text></g>
  <g class="q4"><text x="78" y="168" class="t">4 · what never to touch (and why)</text></g>
  <g class="q5"><text x="78" y="192" class="t">5 · decision log, dated</text></g>
  <rect x="480" y="60" width="120" height="26" class="g"/><text x="490" y="78" class="t">Dashboard</text>
  <rect x="480" y="90" width="120" height="26" class="g"/><text x="490" y="108" class="t">Inputs</text>
  <rect x="480" y="120" width="120" height="26" class="g"/><text x="490" y="138" class="t">Data</text>
  <rect x="480" y="150" width="120" height="26" class="g"/><text x="490" y="168" class="t">Calc</text>
  <text x="480" y="204" class="t">the machinery,</text>
  <text x="480" y="222" class="t">already self-naming</text>
</svg>
<figcaption>One tab, five answers — the difference between a workbook someone can run next month and one that retires with you.</figcaption>
</figure>

## The test, and the honest limit

The proof is empirical: **the handover rehearsal.** Ask a
colleague to produce the monthly output using only the file —
you sit silent. Every question they ask is a missing line in
the README; every hesitation marks
[a fragile spot deserving a fence](/articles/sheet-protection-workbooks-that-survive/)
or [a check](/articles/the-checks-row-self-testing-spreadsheets/).
Twenty minutes, and the file's real documentation debt is a
written list.

And the limit, from
[the graduation lesson](/articles/when-to-leave-excel-and-what-for/):
some workbooks fail the rehearsal *structurally* — too much
tacit judgement, too many exceptions. That's not a
documentation problem; it's the signal the process needs a
[system](/articles/microsoft-lists-when-your-table-grows-up/),
and the README you attempted becomes the specification for it.

An hour of writing, one rehearsal, and your work survives your
holiday — which is, in the end, the professional bar: not
"it works", but **"it works without me."**
