---
title: "Forms to Excel: data that arrives already clean"
description: The upstream fix for messy spreadsheets — collect with Microsoft Forms instead of circulating a workbook, and every response lands as a clean Table row.
date: 2026-07-16
---

Whole stages of [the path](/roadmap/) exist because of how data
*arrives*: [cleaning routines](/articles/the-445pm-export-cleaning-messy-data/)
for the exports, [validation](/articles/drop-down-lists-data-validation/)
for the typists, [duplicate hunts](/articles/removing-duplicates-without-losing-data/)
for the copy-pasters. All downstream repairs. This lesson is the
upstream fix: when the data comes *from people* — sign-ups,
requests, audits, returns — stop circulating a spreadsheet and
put a **form** in front of them.

The emailed-workbook ritual fails the same way everywhere:
twelve copies come back (three renamed, one
[re-sorted into scramble](/articles/sorting-and-filtering-without-wrecking-your-data/),
one with a helpfully added column), and someone consolidates by
hand. The people weren't the problem — the *interface* was. A
spreadsheet says "here are ten thousand cells, behave"; a form
asks one question at a time and refuses wrong answers.

## The setup, in ten minutes

Microsoft Forms lives at forms.microsoft.com in most 365
licences. Build the questions, then apply the only rule that
matters: **constrain everything you'll ever want to
[count, sum or group by](/articles/sumifs-and-friends-answers-from-a-list/).**

- Department, site, category → **Choice** — no `"Finanace"`, no
  `dub` vs `Dublin`; categories arrive
  [drop-down clean](/articles/drop-down-lists-data-validation/)
  because the typo was never possible.
- Quantities, costs → **Number** with a restriction (between 0
  and 1,000) — no
  [text-numbers](/articles/the-445pm-export-cleaning-messy-data/),
  no "about 5".
- Dates → the **date picker** — no `07/03` ambiguity,
  no [costume dates](/articles/working-with-dates-excel/).
- Free text → the one Long Answer box every form deserves, kept
  for the genuinely unstructured.

The instinct you built cleaning data tells you exactly what to
lock down: every field you've ever had to repair is a field the
form should constrain.

## The magic half: where responses land

Create the form **from inside Excel** — a workbook on
OneDrive/SharePoint, `Insert → Forms → New Form` (or start in
Forms and choose "Open in Excel" on the Responses tab, keeping
the *sync to workbook* option). Every submission now lands, live,
as a new row in a real
[Table](/articles/format-as-table-the-feature-that-changes-everything/)
— timestamped, typed, and growing downward forever.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A phone form's constrained answers travel into a growing Excel table row by row">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .fly{opacity:0;animation:fmfly 5.5s ease-in-out infinite}
    @keyframes fmfly{0%,18%{opacity:0;transform:translate(0,0)}30%{opacity:1;transform:translate(0,0)}55%,85%{opacity:1;transform:translate(258px,26px)}98%,100%{opacity:0}}
    .newrow{opacity:0;animation:fmrow 5.5s ease-in-out infinite}
    @keyframes fmrow{0%,52%{opacity:0}62%,90%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">the form (phone)</text>
  <rect x="60" y="40" width="150" height="180" rx="12" class="g"/>
  <text x="76" y="70" class="t">Site:</text>
  <rect x="76" y="78" width="118" height="24" class="acc"/><text x="84" y="95" class="t">Dublin ▾</text>
  <text x="76" y="126" class="t">Units:</text>
  <rect x="76" y="134" width="118" height="24" class="acc"/><text x="84" y="151" class="t">42</text>
  <g class="fly"><rect x="76" y="180" width="118" height="26" rx="6" fill="#0E7A4F"/><text x="104" y="198" class="t" fill="#fff">Submit</text></g>
  <text x="340" y="26" class="h">the Table (live workbook)</text>
  <rect x="340" y="40" width="280" height="30" class="acc"/><text x="352" y="60" class="h">When · Site · Units</text>
  <rect x="340" y="70" width="280" height="30" class="g"/><text x="352" y="90" class="t">09:14 · Cork · 17</text>
  <rect x="340" y="100" width="280" height="30" class="g"/><text x="352" y="120" class="t">10:02 · Galway · 25</text>
  <g class="newrow">
    <rect x="340" y="130" width="280" height="30" class="acc"/><text x="352" y="150" class="t">10:31 · Dublin · 42  ← just landed</text>
  </g>
  <text x="340" y="196" class="t">typed, timestamped, impossible</text>
  <text x="340" y="216" class="t">to mis-spell — nothing to clean</text>
</svg>
<figcaption>One question at a time on their side; one clean Table row on yours. The 4:45pm cleaning routine, made permanently unnecessary for this data.</figcaption>
</figure>

Downstream, everything you've built just works: a
[PivotTable](/articles/pivottables-from-first-principles/) on the
response Table with
[a slicer](/articles/grouping-slicers-pivot-layouts/), refreshed
as answers arrive; [FILTER](/articles/dynamic-arrays-filter-sort-unique/)
views of today's submissions; a
[dashboard](/articles/building-a-one-page-dashboard/) fed by a
form. Add [a flow](/articles/power-automate-folder-that-fills-itself/)
if someone should be pinged when a response needs action.

## The honest edges

Where forms are the wrong tool: **updating** existing records —
forms append, they don't edit (correction workflows need the
shared-workbook or proper-app world); grids where respondents
must see *each other's* rows (that's
[a shared workbook](/articles/excel-on-the-web-sharing-workbooks/)
with protection); and anything beyond ~10k responses or needing
approval chains — by then you've outgrown into Microsoft Lists
or a real database,
[the graduation path is normal](/articles/power-bi-for-excel-people/).
Also: the synced Table is append-only plumbing — don't insert
columns *inside* it (add your
[calculated columns](/articles/structured-references-formulas-inside-tables/)
to its right, or better, in a query), and treat the Form's
question wording as a schema: renaming questions renames columns,
with downstream consequences.

The mindset shift is the real lesson. Every messy dataset was
once a collection moment that could have been designed. You now
know both halves — the downstream repairs *and* the upstream
prevention — and the professional instinct is always the same:
**push cleanliness as far upstream as it will go.** The cheapest
data to clean is the data that never got dirty.
