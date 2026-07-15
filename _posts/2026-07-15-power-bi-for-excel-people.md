---
title: "Power BI for Excel people: your first real dashboard"
description: You already know more Power BI than you think — what transfers from Excel, what's genuinely new, and an honest first project that takes an afternoon.
date: 2026-07-15
---

At some point, someone in your organisation will say the words
"can we get this in Power BI?" — usually while pointing at a
perfectly good spreadsheet. Before you nod and open forty browser
tabs, here's the thing the tutorials don't lead with: **if you've
climbed the Excel path, you already know half of Power BI.** It's
made by the same company, out of the same parts, for the same job —
and the parts transfer.

This is the honest orientation: what Power BI is, what carries over,
what's genuinely new, and a first project sized for one afternoon.

## What it actually is

Power BI Desktop is a free Windows application that does three
things in one window:

1. **Gets and cleans data** — using, quite literally,
   [Power Query](/articles/power-query-combine-monthly-files/). Not
   a lookalike: the same engine, same editor, same Applied Steps.
   If you've combined a folder of monthly files in Excel, you
   already hold a Power BI skill.
2. **Relates tables** — more on this below; it's the real new idea.
3. **Builds interactive report pages** — where
   [PivotTable](/articles/pivottables-from-first-principles/)
   thinking (fields dragged into wells, data aggregated on demand)
   becomes charts, maps and slicers that all filter each other.

The division of labour in one line: **Excel is where you *work* a
model; Power BI is where a report goes to be *consumed*** — live,
clickable, on phones, without anyone emailing
`Dashboard_FINAL_v7.xlsx` ever again.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An Excel table flows into a Power BI page where linked dashboard tiles light up together">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .tile{fill:#EAF4EE;stroke:#0E7A4F}
    .pipe{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#pba)}
    .t1{animation:tileup 5s ease-out infinite}
    .t2{animation:tileup 5s ease-out infinite;animation-delay:0.3s}
    .t3{animation:tileup 5s ease-out infinite;animation-delay:0.6s}
    .t4{animation:tileup 5s ease-out infinite;animation-delay:0.9s}
    @keyframes tileup{0%,12%{opacity:0;transform:translateY(10px)}30%,85%{opacity:1;transform:translateY(0)}97%,100%{opacity:0}}
    .bar{fill:#0E7A4F}
  </style>
  <defs><marker id="pba" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="50" y="26" class="h">your Excel Table</text>
  <rect x="50" y="40" width="150" height="26" class="g"/><text x="60" y="58" class="t">Date · Item · £</text>
  <rect x="50" y="66" width="150" height="26" class="g"/><text x="60" y="84" class="t">03/07 · Widgets</text>
  <rect x="50" y="92" width="150" height="26" class="g"/><text x="60" y="110" class="t">04/07 · Gaskets</text>
  <rect x="50" y="118" width="150" height="26" class="g"/><text x="60" y="136" class="t">04/07 · Flanges</text>
  <path d="M220 92 h50" class="pipe"/>
  <text x="222" y="80" class="t">refresh</text>
  <rect x="290" y="36" width="330" height="180" rx="8" fill="#fff" stroke="#E6E4D9"/>
  <text x="306" y="60" class="h">one Power BI page</text>
  <g class="t1"><rect x="306" y="72" width="90" height="56" rx="4" class="tile"/><text x="318" y="96" class="h">£48k</text><text x="318" y="114" class="t">July</text></g>
  <g class="t2"><rect x="404" y="72" width="200" height="56" rx="4" class="tile"/>
    <rect x="416" y="106" width="30" height="14" class="bar"/><rect x="452" y="96" width="30" height="24" class="bar"/><rect x="488" y="86" width="30" height="34" class="bar"/><rect x="524" y="100" width="30" height="20" class="bar"/></g>
  <g class="t3"><rect x="306" y="136" width="90" height="56" rx="4" class="tile"/><text x="318" y="160" class="t">region</text><text x="318" y="178" class="t">slicer ▾</text></g>
  <g class="t4"><rect x="404" y="136" width="200" height="56" rx="4" class="tile"/><text x="416" y="160" class="t">top products…</text><text x="416" y="178" class="t">click any tile →</text></g>
</svg>
<figcaption>Same data, new destination. Every tile is a PivotTable at heart — and clicking any one of them filters all the others. That click is the product.</figcaption>
</figure>

## The one genuinely new idea: the model

In Excel, when data lives in two tables, you reach for
[XLOOKUP](/articles/xlookup-the-lookup-to-learn-first/) and physically
drag columns across. Power BI says: don't. Load both tables, draw a
**relationship** between them (customer ID here equals customer ID
there), and every visual can now use fields from both — no lookup
columns, no duplication.

That mental shift — *relate, don't merge* — is the actual learning
curve of Power BI. It usually takes an Excel person a weekend, and
it's the same idea that later unlocks proper data modelling
anywhere. (You'll also meet **DAX**, the formula language, guarding
this stage like a customs officer. Opening position: write measures
when a card needs a number — `Total Sales = SUM(Sales[Value])` reads
like a sentence — and resist copying clever DAX from forums until a
real report demands it.)

## Your first project, honestly sized

Pick a dataset you already understand — your
[budget transactions](/articles/build-a-uk-budget-that-survives-real-life/)
are ideal, because you know what the answers *should* look like.
Then, in one afternoon:

1. **Load** your transactions Table from the workbook (`Get Data →
   Excel`). Do any cleaning in the query editor — familiar
   territory, [same recipe thinking](/articles/power-query-combine-monthly-files/).
2. **Build four visuals**: a card showing total spend, a bar chart
   by category (sorted — [the chart rules](/articles/charts-that-tell-the-truth/)
   apply verbatim here), a line by month, and a slicer for the
   month. No relationships needed yet; one table is fine for day one.
3. **Click things.** Click a category bar and watch every other
   visual filter to match. This cross-filtering is the moment Power
   BI justifies itself — the interactivity you *can't* build with a
   static chart.

That's a real dashboard, built with roughly 80% recycled Excel
knowledge.

## What they don't tell you in the demo

Fair warnings from the field. *Sharing* is where the free ride ends —
Desktop costs nothing, but publishing dashboards to colleagues needs
Pro licences (bundled with some Microsoft 365 plans, ~£8/user/month
otherwise). Refresh needs plumbing: a published report doesn't
magically see your laptop's files. And plenty of jobs should stay
in Excel — ad-hoc analysis, anything with manual inputs and
judgement, models you interrogate cell by cell. The failure mode of
Power BI enthusiasm is rebuilding a working spreadsheet as a slower
dashboard nobody filters.

The right first move is the afternoon project above: cheap, honest,
and it tells you whether *your* reporting problems are
dashboard-shaped. Many are; some never will be.

You spent the whole [Excel path](/roadmap/) learning to structure
data, aggregate it honestly, and chart it truthfully. Power BI is
those same lessons with a publish button. Go click a bar chart and
watch the room filter — you've earned it.
