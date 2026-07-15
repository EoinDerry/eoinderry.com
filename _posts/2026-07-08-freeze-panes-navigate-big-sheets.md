---
title: "Freeze panes and friends: navigating big sheets without getting lost"
description: The five-minute set of moves — freeze panes, split view and keyboard jumps — that make a ten-thousand-row sheet feel small.
date: 2026-07-08
domain: foundations
---

There's a moment every Excel user knows: you scroll down a big sheet
to check something, and the headers vanish. Now you're staring at
column J, row 4,082, trying to remember whether J was *Net* or
*Gross*. So you scroll back up to look, scroll back down, and lose
your row instead.

None of this is a skill problem. It's a setup problem, and the setup
takes about five minutes to learn — once.

## Freeze panes: pin the headers, free the data

`View → Freeze Panes` keeps chosen rows and columns on screen while
everything else scrolls beneath them. The menu offers three options,
and the first one confuses everybody:

| Option | What it does |
|--------|--------------|
| **Freeze Top Row** | Row 1 stays put. The everyday choice. |
| **Freeze First Column** | Column A stays put. |
| **Freeze Panes** | Everything *above and left of the selected cell* stays put. |

That third option is the powerful one. Click in **B2** and choose
Freeze Panes: row 1 *and* column A are both pinned. Click in **C4**
first: rows 1–3 and columns A–B are pinned. The rule is worth saying
out loud — *select the first cell you want to scroll, then freeze.*

<figure class="guide-fig">
<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A frozen header row and label column stay put while the data rows scroll beneath them">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 12.5px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .frz{fill:#EAF4EE;stroke:#0E7A4F}
    .scroll{animation:fpscroll 6s linear infinite}
    @keyframes fpscroll{0%{transform:translateY(0)}100%{transform:translateY(-108px)}}
  </style>
  <text x="60" y="22" class="h">Row 1 + column A frozen (selected B2, then Freeze Panes)</text>
  <clipPath id="fpclip"><rect x="60" y="76" width="520" height="144"/></clipPath>
  <g clip-path="url(#fpclip)">
    <g class="scroll">
      <g><rect x="140" y="76" width="150" height="36" class="g"/><text x="152" y="99" class="t">Widgets</text>
      <rect x="290" y="76" width="140" height="36" class="g"/><text x="302" y="99" class="t">1,240</text>
      <rect x="430" y="76" width="150" height="36" class="g"/><text x="442" y="99" class="t">Mar</text></g>
      <g><rect x="140" y="112" width="150" height="36" class="g"/><text x="152" y="135" class="t">Gaskets</text>
      <rect x="290" y="112" width="140" height="36" class="g"/><text x="302" y="135" class="t">862</text>
      <rect x="430" y="112" width="150" height="36" class="g"/><text x="442" y="135" class="t">Mar</text></g>
      <g><rect x="140" y="148" width="150" height="36" class="g"/><text x="152" y="171" class="t">Flanges</text>
      <rect x="290" y="148" width="140" height="36" class="g"/><text x="302" y="171" class="t">2,019</text>
      <rect x="430" y="148" width="150" height="36" class="g"/><text x="442" y="171" class="t">Apr</text></g>
      <g><rect x="140" y="184" width="150" height="36" class="g"/><text x="152" y="207" class="t">Sprockets</text>
      <rect x="290" y="184" width="140" height="36" class="g"/><text x="302" y="207" class="t">744</text>
      <rect x="430" y="184" width="150" height="36" class="g"/><text x="442" y="207" class="t">Apr</text></g>
      <g><rect x="140" y="220" width="150" height="36" class="g"/><text x="152" y="243" class="t">Widgets</text>
      <rect x="290" y="220" width="140" height="36" class="g"/><text x="302" y="243" class="t">1,388</text>
      <rect x="430" y="220" width="150" height="36" class="g"/><text x="442" y="243" class="t">May</text></g>
      <g><rect x="140" y="256" width="150" height="36" class="g"/><text x="152" y="279" class="t">Gaskets</text>
      <rect x="290" y="256" width="140" height="36" class="g"/><text x="302" y="279" class="t">910</text>
      <rect x="430" y="256" width="150" height="36" class="g"/><text x="442" y="279" class="t">May</text></g>
      <g><rect x="140" y="292" width="150" height="36" class="g"/><text x="152" y="315" class="t">Flanges</text>
      <rect x="290" y="292" width="140" height="36" class="g"/><text x="302" y="315" class="t">1,876</text>
      <rect x="430" y="292" width="150" height="36" class="g"/><text x="442" y="315" class="t">Jun</text></g>
    </g>
  </g>
  <rect x="140" y="40" width="150" height="36" class="frz"/><text x="152" y="63" class="h">Product</text>
  <rect x="290" y="40" width="140" height="36" class="frz"/><text x="302" y="63" class="h">Units</text>
  <rect x="430" y="40" width="150" height="36" class="frz"/><text x="442" y="63" class="h">Month</text>
  <rect x="60" y="40" width="80" height="36" class="frz"/><text x="72" y="63" class="h">Row</text>
  <rect x="60" y="76" width="80" height="144" class="frz" opacity="0.55"/>
  <text x="72" y="120" class="t">A</text>
  <text x="72" y="160" class="t">stays</text>
  <text x="72" y="200" class="t">put</text>
</svg>
<figcaption>The green cells never move. The data scrolls forever underneath — and you always know what column J is.</figcaption>
</figure>

One habit to go with it: freeze panes the moment a sheet grows past
one screen, not when you first get lost. It's the spreadsheet
equivalent of putting your glasses in the same place every night.

## Split view: two places at once

Freezing pins headers. **Splitting** shows two (or four) independent
views of the *same* sheet — `View → Split`. Drag the grey bar to
taste, and each pane scrolls on its own.

Where it earns its keep: checking totals at row 5,000 against inputs
at row 12 without bouncing between them, or comparing this month's
block against January's. Same data, two windows, zero scrolling
gymnastics. Click Split again to remove it.

Related and even better for two *different* sheets: `View → New
Window`, then `View → Arrange All`. Same workbook, side by side —
the honest answer to "how do I look at two tabs at once?"

## The keyboard jumps

Scrolling is for browsing. For *getting somewhere*, the keyboard is
ten times faster:

- **Ctrl + ↓ / ↑ / ← / →** — jump to the edge of the data block in
  that direction. Ctrl+↓ from a header lands on the last filled row,
  instantly. (It stops at the first blank cell, which also makes it a
  fine way to *find* gaps.)
- **Ctrl + Home** — back to A1 (or to your frozen corner, which is a
  nice touch). **Ctrl + End** — the last used cell on the sheet.
- **Ctrl + Shift + ↓** — jump *and select* on the way. This is how
  you select a 10,000-row column in half a second.

And the one almost nobody uses: the **Name Box**, that little white
box left of the formula bar. Type `AZ5000` and press Enter — you're
there. Type a name you've defined and you're there too, even from
another sheet.

## When "big sheet" is the actual problem

A word of honesty. If your sheet is slow to open, has forty tabs, or
scrolls for minutes — navigation tricks are treating the symptom.
Usually the real fix is structure: one proper
[Table](/articles/format-as-table-the-feature-that-changes-everything/)
per kind of data, summaries built with
[PivotTables](/articles/pivottables-from-first-principles/) instead of
hand-made monthly tabs. Big *data* is normal; big *sprawl* is a smell.

But that's a later stage of [the path](/roadmap/). For now: freeze at
B2, learn the Ctrl-jumps, and stop losing your row. Five minutes,
repaid every working day for the rest of your life.
