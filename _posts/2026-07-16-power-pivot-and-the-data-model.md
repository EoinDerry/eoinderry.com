---
title: "Power Pivot and the data model: beyond a million rows"
description: The engine hiding inside Excel since 2010 — real table relationships, tens of millions of rows, and measures that outgrow SUMIFS, without leaving the workbook.
date: 2026-07-16
domain: power-tools
---

Two limits eventually find every serious Excel user. The hard
one: a sheet stops at 1,048,576 rows, and modern exports laugh
at that. The soft one: your workbook has five related tables
held together with
[lookups](/articles/matching-messy-keys-between-tables/), and
every analysis starts by dragging columns between them. Both
limits fall to the same tool — one that's been hiding inside
Excel since 2010: **Power Pivot and the data model**.

The idea in one sentence: instead of data living *on sheets*,
it lives in an in-memory engine *behind* the workbook — where
tables hold tens of millions of rows, relate to each other
properly, and feed [PivotTables](/articles/pivottables-from-first-principles/)
that work across all of them at once.

## Loading: the recipe grows a destination

You already know the front door.
[Power Query](/articles/power-query-combine-monthly-files/)
imports and cleans as usual — the only change is the last step:
`Close & Load To… → Only Create Connection` + **Add this data to
the Data Model**. The rows never land on a sheet (they couldn't;
there may be four million of them) — they land in the engine,
compressed hard. A file that would be absurd as cells is
routinely a modest .xlsx as a model.

Enable the **Power Pivot tab** (File → Options → Add-ins → COM
Add-ins) and its window shows what you've loaded — a data view
with no row limit and no
[fear of someone sorting it wrong](/articles/sorting-and-filtering-without-wrecking-your-data/),
because model tables aren't editable cells. The workbook becomes
what the
[architecture lesson](/articles/building-a-one-page-dashboard/)
always wanted: a thin visible layer over an engine.

## Relating: the lookup you stop writing

In Power Pivot's **Diagram View**, drag `Orders[CustomerID]`
onto `Customers[ID]`. That line is a **relationship** — and it
replaces the lookup column entirely. Build a pivot from the data
model and the field list offers *every* table: Region from
Customers as rows, Amount from Orders as values, and the
relationship joins them on the fly. No
[XLOOKUP](/articles/xlookup-the-lookup-to-learn-first/) columns
duplicating data, no
[stretched references](/articles/structured-references-formulas-inside-tables/)
— the join *is* the model.

If this sounds like
[the Power BI lesson's](/articles/power-bi-for-excel-people/)
"relate, don't merge" — it's not similar, it's *identical*: the
same engine (VertiPaq), the same modelling, the same DAX. Power
Pivot is where an Excel person learns Power BI's hard part
without leaving the spreadsheet.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two related tables in the data model feeding one pivot, replacing a lookup column, with row counts far beyond the sheet limit">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .tbl{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .rel{stroke:#0E7A4F;stroke-width:2;fill:none}
    .reldraw{stroke-dasharray:120;stroke-dashoffset:120;animation:ppr 5.5s ease-out infinite}
    @keyframes ppr{0%,15%{stroke-dashoffset:120}45%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:120}}
    .out{opacity:0;animation:ppo 5.5s ease-out infinite}
    @keyframes ppo{0%,45%{opacity:0}60%,92%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">the model (behind the workbook)</text>
  <rect x="60" y="40" width="170" height="90" rx="8" class="tbl"/>
  <text x="74" y="64" class="h">Orders</text>
  <text x="74" y="86" class="t">4.2M rows</text>
  <text x="74" y="108" class="t">CustomerID · Amount</text>
  <rect x="60" y="150" width="170" height="70" rx="8" class="tbl"/>
  <text x="74" y="174" class="h">Customers</text>
  <text x="74" y="196" class="t">ID · Region</text>
  <path d="M145 130 v20" class="rel reldraw"/>
  <circle cx="145" cy="140" r="3.5" fill="#0E7A4F"/>
  <text x="158" y="145" class="t">relationship</text>
  <path d="M230 130 q80 0 120 0" fill="none" stroke="#0E7A4F" stroke-width="1.6" marker-end="url(#ppa)"/>
  <defs><marker id="ppa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <g class="out">
    <rect x="370" y="60" width="250" height="140" rx="8" class="acc"/>
    <text x="386" y="88" class="h">one pivot, both tables</text>
    <text x="386" y="116" class="t">North    £1.42M</text>
    <text x="386" y="138" class="t">South    £1.18M</text>
    <text x="386" y="160" class="t">East     £0.97M</text>
    <text x="386" y="186" class="t">no lookup column exists</text>
  </g>
</svg>
<figcaption>Four million rows the grid could never hold, joined by a drawn line instead of a written lookup — and the pivot on top neither knows nor cares.</figcaption>
</figure>

## Measures: the step past SUMIFS

The model's third gift is **measures** — calculations defined
once, in DAX, that work in any pivot at any grouping:

```
Total Sales := SUM(Orders[Amount])
Margin % := DIVIDE([Total Sales] - [Total Cost], [Total Sales])
```

The second one is the point. A margin isn't summable — you can't
add up percentages by region and get the year
([the averaging trap](/articles/percentages-without-panic/)) —
but a measure *recomputes* at whatever level the pivot shows:
right by region, right by month, right at grand total. That's
the class of answer
[SUMIFS](/articles/sumifs-and-friends-answers-from-a-list/)
can't give and calculated columns give wrongly. Start exactly
there: ratios that must be right at every level. (DAX runs deep
— time intelligence, share-of-total — but the
[LAMBDA rule](/articles/let-and-lambda-formulas-you-can-read/)
applies: learn it when a real report demands it.)

## When to reach for it — and when not

The honest triggers: data past a few hundred thousand rows;
[a slow workbook](/articles/slow-workbook-performance-habits/)
whose weight is lookup columns; three-plus related tables; or
ratios that must survive regrouping. Below those, plain
[Tables and pivots](/articles/pivottables-from-first-principles/)
stay simpler to share and audit — and above a certain point
(dashboards for an audience, refresh schedules) the same skills
[graduate to Power BI](/articles/when-to-leave-excel-and-what-for/)
unchanged.

The million-row ceiling was never Excel's edge — it was the
*grid's* edge. The engine behind it has been waiting all along,
and everything this course taught — recipes, relationships,
honest aggregation — turns out to have been the syllabus for it.
