---
title: "Power Query: combine twelve monthly files in one click"
description: The end of copy-paste consolidation — point Excel at a folder, record the clean-up once, and refresh forever.
date: 2026-07-14
domain: power-tools
---

Somewhere in your organisation there is a person whose monthly ritual
is this: open twelve files called things like `Sales_Jan_FINAL_v2`,
copy each one, paste it into a master sheet, fix the headers that
came along for the ride, and pray nobody sends a thirteenth file
called `Jan_REVISED`.

Power Query exists to delete that ritual. It's been hiding inside
Excel since 2016 — `Data → Get & Transform` — and it does one thing
supremely well: **fetch data from somewhere, clean it the same way
every time, and land it in your workbook as a refreshable table.**

The key idea is worth sitting with for a second. Power Query doesn't
edit your data — it *records a recipe*. Every step you take is
written down, in order, and replayed from scratch on every refresh.
[The 4:45pm cleaning routine](/articles/the-445pm-export-cleaning-messy-data/)
is a checklist you run by hand; Power Query is the same checklist
that runs itself.

## The folder trick

The headline act. Put the twelve monthly exports in one folder, then:

1. `Data → Get Data → From File → From Folder` — pick the folder.
2. Click **Combine & Transform Data**. Excel asks which sheet or
   table to read from each file, using the first file as the sample.
3. The Power Query editor opens with every file already stacked into
   one table — plus a `Source.Name` column telling you which file
   each row came from. (Keep it: it's your month column, and your
   audit trail.)
4. Do your cleaning *once*, in the editor — remove the junk rows,
   fix the types, rename the columns.
5. `Close & Load`. One table, all twelve months.

Now the part that changes the job. Next month, file thirteen lands
in the folder. You open the workbook and press **Refresh**
(`Ctrl+Alt+F5`). That's it. The recipe re-reads the folder, finds
thirteen files, replays every cleaning step, and the master table —
and every [PivotTable](/articles/pivottables-from-first-principles/)
and [chart](/articles/charts-that-tell-the-truth/) built on it —
updates. The ritual is now a keystroke.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Twelve monthly files flow through a recorded recipe of steps into one clean refreshable table">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .file{fill:#fff;stroke:#E6E4D9}
    .out{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4}
    .pipe{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#pqa)}
    .fl{animation:pqslide 4.8s ease-in-out infinite}
    .f2{animation-delay:0.3s}.f3{animation-delay:0.6s}
    @keyframes pqslide{0%,10%{transform:translateX(0);opacity:1}55%{transform:translateX(150px);opacity:0}100%{transform:translateX(150px);opacity:0}}
  </style>
  <defs><marker id="pqa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="46" y="26" class="h">the folder</text>
  <g class="fl"><rect x="46" y="44" width="120" height="30" class="file"/><text x="56" y="64" class="t">Sales_Jan.xlsx</text></g>
  <g class="fl f2"><rect x="46" y="82" width="120" height="30" class="file"/><text x="56" y="102" class="t">Sales_Feb.xlsx</text></g>
  <g class="fl f3"><rect x="46" y="120" width="120" height="30" class="file"/><text x="56" y="140" class="t">Sales_Mar.xlsx</text></g>
  <text x="52" y="176" class="t">…nine more</text>
  <rect x="250" y="58" width="170" height="112" rx="8" fill="#fff" stroke="#0E7A4F"/>
  <text x="266" y="82" class="h">the recipe</text>
  <text x="266" y="106" class="t">1 remove top rows</text>
  <text x="266" y="126" class="t">2 fix data types</text>
  <text x="266" y="146" class="t">3 rename columns</text>
  <path d="M186 114 h56" class="pipe"/>
  <path d="M428 114 h56" class="pipe"/>
  <rect x="492" y="76" width="132" height="76" class="out"/>
  <text x="506" y="102" class="h">ONE table</text>
  <text x="506" y="126" class="t">12 months</text>
  <text x="506" y="144" class="t">refreshable</text>
  <text x="250" y="212" class="t">next month: drop file 13 in the folder, press Refresh, done</text>
</svg>
<figcaption>Files in, recipe replayed, one clean table out. The recipe is recorded once and runs identically forever — that's the whole product.</figcaption>
</figure>

## Reading the editor without fear

The Power Query editor looks like a new application, and technically
it is. You only need three landmarks:

- **Applied Steps** (right-hand panel) — the recipe itself. Every
  click adds a step; click any step to see the data as it looked at
  that moment; delete a step to un-decide it. It's undo history that
  never expires.
- **The formula bar** shows each step in M, Power Query's language.
  You don't need to write M — but seeing that each step *is* a
  formula demystifies the whole thing.
- **Data types** — the little icon on each column header. Get these
  right (`123` number, calendar date, `ABC` text) and half the
  classic import problems — the
  [text-numbers, the costume dates](/articles/the-445pm-export-cleaning-messy-data/)
  — are fixed at the door, permanently.

The habits that keep queries healthy are the spreadsheet habits
you already have: rename steps so the recipe reads like instructions
to a colleague, remove columns you don't need *early*, and let the
query land in a proper
[Table](/articles/format-as-table-the-feature-that-changes-everything/).

## What belongs in Power Query (and what doesn't)

A useful division of labour for the modern workbook:

| Job | Tool |
|-----|------|
| Fetching and combining files | Power Query |
| Cleaning that's the same every month | Power Query |
| Judgement calls, one-off fixes | You, in the sheet |
| Analysis and reporting | PivotTables, [formulas](/articles/sumifs-and-friends-answers-from-a-list/), charts |

If you catch yourself doing the same transformation two months
running, that's the signal: it belongs in the recipe. If a fix needs
a human decision, it doesn't.

Power Query sits in stage six of [the path](/roadmap/) — not because
it's hard (it's genuinely friendlier than nested formulas) but
because its payoff compounds when the downstream layers are already
solid. It is also, quietly, the best career move on the whole path:
the person who turns the monthly ritual into a Refresh button is the
person the office starts calling *the Excel person*.

Twelve files, one click. The thirteenth file is someone else's
problem now — specifically, the recipe's.
