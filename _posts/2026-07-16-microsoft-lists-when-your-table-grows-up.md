---
title: "Microsoft Lists: when your Table grows up"
description: The shared tracker that outgrew its workbook has a natural next home — what Lists is, what it fixes that Excel can't, and the honest map of what you give up.
date: 2026-07-16
---

[The graduation lesson](/articles/when-to-leave-excel-and-what-for/)
named the signals: a workbook that's really a *shared
operational tracker* — assets, requests, onboarding steps, the
team's who-has-what — being
[co-edited](/articles/excel-on-the-web-sharing-workbooks/) into
chaos. The first rung of that graduation ladder deserves its
own lesson, because it's the one an Excel person can climb in
an afternoon: **Microsoft Lists** — in most 365 licences,
sitting unexplored next to
[Forms](/articles/forms-to-excel-data-arrives-clean/).

## What a List is

A List looks like
[a Table](/articles/format-as-table-the-feature-that-changes-everything/)
that moved out and got its own place: columns with **enforced
types** (choice, person, date, number, yes/no), rows, views.
The resemblance is deliberate — `Create a list → From Excel`
imports your existing Table, mapping each column to a real
type. The differences are exactly the ones your shared-tracker
pain has been begging for:

- **Types are law, not advice.** An Excel date column *hopes*
  ([validation](/articles/drop-down-lists-data-validation/)
  helps; pasting defeats it). A List date column *cannot hold*
  `"next Tuesday ish"`. The
  [cleaning stage](/articles/the-445pm-export-cleaning-messy-data/)
  of the path exists because spreadsheets accept anything;
  Lists is what refusing at the door looks like.
- **Nobody can sort it wrong.** Rows are *records*, not cell
  ranges — [the scrambled-column catastrophe](/articles/sorting-and-filtering-without-wrecking-your-data/)
  is structurally impossible, as is overtyping a
  [formula column](/articles/structured-references-formulas-inside-tables/).
- **Views replace copies.** "My open items", "overdue by
  site", a grouped board — each is a saved lens on the *same
  records*. The
  [FINAL_v7 disease](/articles/excel-on-the-web-sharing-workbooks/)
  was people needing different views and making copies to get
  them; Lists makes views free.
- **Per-item everything:** version history, comments,
  attachments, and — via
  [Power Automate](/articles/power-automate-folder-that-fills-itself/),
  where Lists is a first-class citizen — "when a row's status
  changes, notify the owner" in three clicks. Rules that took
  [a checks row](/articles/the-checks-row-self-testing-spreadsheets/)
  plus goodwill in Excel become properties of the system.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A shared workbook tracker with conflicting copies transforming into one List with typed columns and multiple saved views">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .fade{animation:mlfade 6s ease-in-out infinite}
    @keyframes mlfade{0%,30%{opacity:1}45%,88%{opacity:0.15}100%{opacity:1}}
    .show{opacity:0;animation:mlshow 6s ease-in-out infinite}
    @keyframes mlshow{0%,30%{opacity:0}45%,88%{opacity:1}100%{opacity:0}}
  </style>
  <g class="fade">
    <text x="50" y="26" class="h">the tracker workbook</text>
    <rect x="50" y="40" width="180" height="30" class="g"/><text x="60" y="60" class="t">Tracker_FINAL.xlsx</text>
    <rect x="50" y="74" width="180" height="30" class="g"/><text x="60" y="94" class="t">Tracker_Jims_copy.xlsx</text>
    <rect x="50" y="108" width="180" height="30" class="g"/><text x="60" y="128" class="t">status: "done?? asked Pat"</text>
    <text x="50" y="164" class="t">three truths, zero types</text>
  </g>
  <path d="M250 100 h60" stroke="#0E7A4F" stroke-width="1.6" fill="none" marker-end="url(#mla)"/>
  <defs><marker id="mla" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <g class="show">
    <text x="330" y="26" class="h">the List</text>
    <rect x="330" y="40" width="290" height="30" class="acc"/><text x="342" y="60" class="t">Item · Owner👤 · Due📅 · Status▾</text>
    <rect x="330" y="70" width="290" height="26" class="g"/><text x="342" y="88" class="t">Laptop 042 · Niamh · 22 Jul · Open</text>
    <rect x="330" y="96" width="290" height="26" class="g"/><text x="342" y="114" class="t">Badge 117 · Sean · 18 Jul · Done</text>
    <rect x="330" y="132" width="88" height="26" class="g"/><text x="340" y="150" class="t">All items</text>
    <rect x="422" y="132" width="88" height="26" class="g"/><text x="432" y="150" class="t">Mine</text>
    <rect x="514" y="132" width="106" height="26" class="g"/><text x="524" y="150" class="t">Overdue ⚠</text>
    <text x="330" y="192" class="t">one truth, typed columns, three saved views —</text>
    <text x="330" y="212" class="t">and Excel still analyses it by connection</text>
  </g>
</svg>
<figcaption>The tracker stops being a file people fight over and becomes a system people share — while Excel keeps its analysis job, pointed at the List.</figcaption>
</figure>

## What you give up (the honest column)

Lists is a record-keeper, not a workspace. **No real formulas**
— calculated columns exist but are a thin dialect; anything
[SUMIFS-shaped](/articles/sumifs-and-friends-answers-from-a-list/)
or [model-shaped](/articles/data-tables-every-assumption-at-once/)
doesn't belong there. No pivots, no
[charts worth the name](/articles/charts-that-tell-the-truth/),
[clumsy bulk editing](/articles/paste-special-values-transpose-multiply/)
(grid view helps, but Excel it is not), and a few thousand
items is comfortable where
[the data model shrugs at millions](/articles/power-pivot-and-the-data-model/).
The division of labour writes itself, and it's the same one as
every graduation on the path: **Lists holds the truth; Excel
asks it questions** — `Data → Get Data → From SharePoint List`
[connects the query](/articles/power-query-combine-monthly-files/),
and every pivot, chart and
[dashboard](/articles/building-a-one-page-dashboard/) you've
built still works, refreshable, against records nobody can
scramble.

The test for whether a tracker should make the move is one
question deep: **is this data *operated on* by several people,
or *analysed* by one?** Operated → List. Analysed → Table.
Both — which is most of them — List for the operating, Excel
connected for the analysing.

Your Table grew up, moved out, and got a door policy. It still
comes home for the analysis — and honestly, the relationship
has never been better.
