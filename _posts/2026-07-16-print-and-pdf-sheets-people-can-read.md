---
title: "Print and PDF: sheets people can actually read"
description: The report is right; now it has to survive paper — print areas, scaling, repeated headers and the five settings that end the 47-page disaster.
date: 2026-07-16
domain: analysis
---

Every office has the story: someone hits Print on a workbook and
the printer produces forty-seven pages, one of which contains a
single orphaned column called `Notes`. Excel is screen-first —
the grid is infinite, paper isn't — and the bridge between them
is a small set of settings almost nobody is ever taught.

You still need paper more than the paperless office admits: board
packs, warehouse pick lists, anything signed — and **every PDF
you send is "printing"** by another name, governed by exactly the
same settings. A mangled PDF is the modern 47-page disaster, and
it goes to more people.

## First: tell Excel what the page is

Excel doesn't know what part of your sheet is *the report* — the
[data, workings and dashboard layers](/articles/building-a-one-page-dashboard/)
all look like cells to a printer. So say it explicitly. Select
the report range → `Page Layout → Print Area → Set Print Area`.
From now on, printing means *this*, not "everything I've ever
typed, including the scratch column from March".

Then switch `View → Page Break Preview`: the sheet with page
edges drawn as blue lines, draggable. Ten seconds here answers
"where will it break?" before any paper does — and dragging a
stray column inside the nearest break is often the entire fix.

## The scaling triangle

`Page Layout` holds the three-way trade — orientation, scaling,
size. The everyday recipe for wide reports:

1. **Landscape.** Most reports are wider than tall; most disasters
   are portrait.
2. **Width: 1 page** (Scale to Fit), **height: automatic** — the
   sane setting: every column on every page, length flowing as it
   needs. It quietly prevents the orphaned-column page on its own.
3. **"Fit to one page" is a lie** past a point — Excel achieves it
   by shrinking, and a 40-row sheet "fitting" one page prints at
   six-point type nobody can read. Below ~60% scale, change the
   *content*, not the zoom: fewer columns, a
   [summary pivot](/articles/pivottables-from-first-principles/)
   instead of the detail, or an honest second page.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An unplanned print scatters a table across pages including one orphan column; setting width to one page produces tidy stacked pages">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .pg{fill:#fff;stroke:#E6E4D9}
    .pgbad{fill:#fff;stroke:#C0392B;stroke-dasharray:5 3}
    .blk{fill:#EAF4EE;stroke:#0E7A4F}
    .drift{animation:ppdrift 5s ease-in-out infinite}
    @keyframes ppdrift{0%,15%{transform:translateX(0);opacity:1}45%,100%{transform:translateX(26px);opacity:1}}
    .good{opacity:0;animation:ppgood 5s ease-in-out infinite}
    @keyframes ppgood{0%,45%{opacity:0}60%,100%{opacity:1}}
  </style>
  <text x="60" y="26" class="h">unplanned: 47 pages, one orphan</text>
  <rect x="60" y="40" width="120" height="150" class="pg"/>
  <rect x="72" y="52" width="96" height="126" class="blk"/>
  <g class="drift">
    <rect x="192" y="40" width="46" height="150" class="pgbad"/>
    <rect x="200" y="52" width="30" height="126" fill="#F6E7E2" stroke="#C0392B"/>
    <text x="196" y="212" class="t">"Notes"</text>
  </g>
  <text x="380" y="26" class="h">width: 1 page — tidy stack</text>
  <g class="good">
    <rect x="380" y="40" width="120" height="86" class="pg"/>
    <rect x="390" y="50" width="100" height="66" class="blk"/>
    <rect x="380" y="134" width="120" height="86" class="pg"/>
    <rect x="390" y="144" width="100" height="66" class="blk"/>
    <text x="520" y="86" class="t">every column,</text>
    <text x="520" y="106" class="t">every page;</text>
    <text x="520" y="126" class="t">length flows</text>
  </g>
</svg>
<figcaption>The orphan column isn't bad luck — it's an unset width. One setting turns the scatter into a stack.</figcaption>
</figure>

## The two settings that make multi-page reports professional

**Print Titles** (`Page Layout → Print Titles → Rows to repeat at
top`). Point it at your header row, and pages two onward carry
the column names — the paper equivalent of
[freeze panes](/articles/freeze-panes-navigate-big-sheets/), and
the single biggest difference between a print-out that reads as a
report and one that reads as an accident.

**Headers and footers** (`Insert → Header & Footer`): page
numbers as `Page 1 of ?`, the print date, the file name. Paper
has no [version history](/articles/excel-on-the-web-sharing-workbooks/)
— a date in the footer is the only provenance a print-out gets,
and "which version is this?" is a question you can retire for the
cost of one field code.

## PDF, specifically

`File → Export → PDF` obeys everything above — set print area,
scaling and titles *first*, then export, and check the result
before sending (page two is where surprises live). For a
recurring report, the layout work is one-time: settings live with
the sheet, so next month is genuinely just Export. And when the
"report" is really a *live thing people should explore* — filters
to click, [slicers](/articles/grouping-slicers-pivot-layouts/)
to press — question the PDF itself: share
[the workbook](/articles/excel-on-the-web-sharing-workbooks/) or a
[dashboard](/articles/building-a-one-page-dashboard/) instead.
PDF is for documents; interactivity dies in it.

The deeper point is one you've met before on
[the path](/roadmap/): presentation is a *layer*, deliberately
designed, never an afterthought — the same discipline as
[honest charts](/articles/charts-that-tell-the-truth/) and
[highlighting that spotlights](/articles/conditional-formatting-highlights-not-decoration/),
applied to the oldest output device there is.

Print area, landscape, width-one-page, repeated titles, dated
footer. Five settings, ten minutes, and nobody ever hands you
back your own report asking what column H was supposed to be.
