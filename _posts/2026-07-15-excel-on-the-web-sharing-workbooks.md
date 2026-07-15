---
title: "Excel on the web: sharing workbooks without breaking them"
description: Co-authoring killed the email attachment — an honest guide to what browser Excel does brilliantly, what it can't do, and the sharing habits that keep a workbook alive.
date: 2026-07-15
---

Somewhere in your organisation there is a file called
`Budget_FINAL_v7_JMcopy_USE-THIS-ONE.xlsx`, and everyone pretends
that's normal. The email-an-attachment workflow produces exactly
this: five diverging copies, a reply-all asking which is current,
and one person merging changes by eye on a Friday evening.

Microsoft's answer is that a workbook should live in **one place**
(OneDrive or SharePoint) and everyone should visit it — in the
browser or in desktop Excel, at the same time, watching each
other's cursors. This works, genuinely and rather magically. But
browser Excel is not desktop Excel, and pretending otherwise is
how sharing breaks. Here's the honest map.

## What the web version does brilliantly

**Co-authoring** is the headline. Two, five, ten people in one
workbook simultaneously — each cursor a named, coloured box, every
change appearing live for everyone. The version-seven problem
doesn't get solved so much as deleted: there *is* only one file.
It works browser-to-browser, desktop-to-desktop (with AutoSave on)
and mixed.

**The calculation engine is the real one.** Formulas behave
identically —
[XLOOKUP](/articles/xlookup-the-lookup-to-learn-first/),
[SUMIFS](/articles/sumifs-and-friends-answers-from-a-list/),
[dynamic arrays spilling](/articles/dynamic-arrays-filter-sort-unique/),
even [LET and LAMBDA](/articles/let-and-lambda-formulas-you-can-read/).
[Tables](/articles/format-as-table-the-feature-that-changes-everything/),
[PivotTables](/articles/pivottables-from-first-principles/),
charts, [conditional formatting](/articles/conditional-formatting-highlights-not-decoration/),
slicers: all there. A workbook built on the fundamentals travels
to the browser intact.

**Comments beat email.** Right-click → New Comment, `@mention` a
colleague, and they get a notification linking to *that cell*.
"See my email re: cell F14" retires. Threaded, resolvable, and
attached to the thing being discussed.

**Version history replaces v1 through v7.** `File → Info → Version
History`: the file quietly keeps its own past, restorable to any
point. Made braver by it: everyone. Fear of "what if someone
wrecks it" is mostly fear of not having this.

## What it can't do (and what to do instead)

The honest list, current as of writing:

| Missing on the web | The workaround |
|--------------------|----------------|
| **VBA macros** — won't run at all | Office Scripts (the web-native automation) or keep those workbooks desktop-only |
| **Power Query authoring** — refresh mostly limited, can't build queries | Author and [refresh in desktop](/articles/power-query-combine-monthly-files/); everyone else *reads* the output in the browser |
| Power Pivot / the data model | Desktop remains the modelling tool |
| Some paste behaviours, external links, add-ins | Test your specific workbook before relying on it |

The pattern: the web is a superb place to **use** a workbook and a
limited place to **build** its plumbing. Which suggests the
sensible split — build in desktop, share for the browser, and keep
the heavy machinery (queries, macros) in files that don't need
co-authoring.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One workbook in the cloud, with several named cursors editing it live instead of emailing copies around">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .doc{fill:#fff;stroke:#0E7A4F;stroke-width:1.4}
    .cur1{animation:cmove1 5s ease-in-out infinite}
    .cur2{animation:cmove2 5s ease-in-out infinite}
    @keyframes cmove1{0%,100%{transform:translate(0,0)}45%,60%{transform:translate(96px,32px)}}
    @keyframes cmove2{0%,100%{transform:translate(0,0)}40%,55%{transform:translate(-96px,64px)}}
    .dead{opacity:0.5}
  </style>
  <g class="dead">
    <text x="46" y="30" class="h">before</text>
    <rect x="46" y="44" width="150" height="26" class="g"/><text x="56" y="62" class="t">Budget_v5.xlsx</text>
    <rect x="46" y="76" width="150" height="26" class="g"/><text x="56" y="94" class="t">Budget_v6_JM.xlsx</text>
    <rect x="46" y="108" width="150" height="26" class="g"/><text x="56" y="126" class="t">Budget_FINAL_v7…</text>
    <text x="46" y="164" class="t">five copies, zero truth</text>
  </g>
  <text x="330" y="30" class="h">after: one file, everyone in it</text>
  <rect x="330" y="44" width="290" height="150" rx="6" class="doc"/>
  <line x1="330" y1="82" x2="620" y2="82" stroke="#E6E4D9"/>
  <line x1="330" y1="120" x2="620" y2="120" stroke="#E6E4D9"/>
  <line x1="330" y1="158" x2="620" y2="158" stroke="#E6E4D9"/>
  <line x1="427" y1="44" x2="427" y2="194" stroke="#E6E4D9"/>
  <line x1="524" y1="44" x2="524" y2="194" stroke="#E6E4D9"/>
  <g class="cur1">
    <rect x="352" y="92" width="66" height="22" fill="none" stroke="#0E7A4F" stroke-width="2"/>
    <rect x="352" y="80" width="38" height="14" fill="#0E7A4F"/><text x="356" y="91" class="t" fill="#fff">Niamh</text>
  </g>
  <g class="cur2">
    <rect x="540" y="54" width="66" height="22" fill="none" stroke="#8A6D3B" stroke-width="2"/>
    <rect x="540" y="42" width="30" height="14" fill="#8A6D3B"/><text x="544" y="53" class="t" fill="#fff">Sean</text>
  </g>
  <text x="330" y="222" class="t">named cursors, live changes, one version of the truth</text>
</svg>
<figcaption>The attachment era, and what replaced it. The file stops travelling; the people visit instead — and version seven never gets born.</figcaption>
</figure>

## Sharing without regretting it

The Share button works; the habits make it safe.

1. **Share the minimum.** *Can view* unless editing is the point;
   "Anyone with the link" only when you truly mean anyone. For
   outsiders, consider exporting a PDF or a
   [values-only copy](/articles/paste-special-values-transpose-multiply/)
   — a shared workbook exposes its formulas, its hidden sheets,
   and its other tabs.
2. **Protect the structure, not the people.** `Review → Protect
   Sheet` (unlock just the input cells first) turns "please only
   type in the yellow cells" from a plea into a property of the
   file. Pair with
   [data validation](/articles/drop-down-lists-data-validation/)
   on the inputs, and shared editing stops being frightening.
   (This is honesty-by-architecture, not security — sheet
   protection deters accidents, not attackers.)
3. **Separate the workshop from the shop floor.** The shared file
   is the [dashboard and inputs](/articles/building-a-one-page-dashboard/);
   the query-laden, macro-bearing engine room stays yours. Where
   ten people need ten *views* of live data rather than editing
   rights, that's the doorstep of
   [Power BI](/articles/power-bi-for-excel-people/).

## The quiet takeaway

Notice what the browser version rewards: workbooks built on
Tables, real formulas, and visible structure — everything
[the path](/roadmap/) teaches — travel perfectly. Workbooks held
together by macros, mystery links and folklore don't. The web
didn't change what a good spreadsheet is; it just started grading.

One file, living in one place, visited by everyone. Version seven
was never a filename — it was a symptom. Treat the cause.
