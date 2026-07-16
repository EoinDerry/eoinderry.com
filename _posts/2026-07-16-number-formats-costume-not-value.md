---
title: "Number formats: changing the costume, not the value"
description: Why 0.1 can display as 10%, £0.10 or 12:24am — and why understanding the difference between a value and its outfit prevents years of confusion.
date: 2026-07-16
domain: foundations
---

Here is a fact that quietly explains half the "Excel is lying to
me" moments you'll ever have: **what a cell shows and what a cell
holds are two different things.** The cell holds a value. The
*number format* dresses it for display. Change the format and the
costume changes — the value underneath never does.

Type `0.1` into a cell, then dress it four ways:

| Format | The cell shows | The cell holds |
|--------|----------------|----------------|
| General | 0.1 | 0.1 |
| Percentage | 10% | 0.1 |
| Currency | £0.10 | 0.1 |
| Time | 02:24 | 0.1 |

Same value, four outfits. Every formula pointing at that cell sees
`0.1` regardless — formulas read values, never costumes. Once this
clicks, a whole family of mysteries dissolves.

## The mysteries, dissolved

**"Excel changed my number!"** — No: it re-dressed it. Type
`07/03` and Excel decides you meant a date, *stores a date*, and
formats accordingly. (Dates, remember,
[are just day-numbers in costume](/articles/working-with-dates-excel/)
— format a date as General and the serial number looks back at
you. Nothing is broken; you're seeing backstage.)

**"The total is 1p off."** — Display rounding. The cells *show*
two decimals but *hold* full precision: £10.005 and £10.005
display as £10.01 and £10.01, but sum to £20.01, not £20.02. The
costume rounds; the values don't. (What to do about it — `ROUND`
and friends — is [a stage-three lesson](/roadmap/) of its own.)

**"It shows #### now."** — The column is too narrow for the
costume, nothing more. Widen it, or double-click the column edge.

**"It's a number but it won't sum."** — The reverse disease: a
*text* value wearing a number's costume. No format will fix text;
that's [a cleaning job](/articles/the-445pm-export-cleaning-messy-data/).
Format changes how values dress — it cannot change what they are.

<figure class="guide-fig">
<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One stored value 0.1 cycling through costumes: 10 percent, ten pence, a time — the value beneath never changing">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .big{font:600 26px 'IBM Plex Mono',monospace;fill:#0E7A4F}
    .g{fill:#fff;stroke:#E6E4D9}
    .core{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4}
    .c1{opacity:0;animation:nfcyc 6s ease-in-out infinite}
    .c2{opacity:0;animation:nfcyc 6s ease-in-out infinite;animation-delay:2s}
    .c3{opacity:0;animation:nfcyc 6s ease-in-out infinite;animation-delay:4s}
    @keyframes nfcyc{4%,29%{opacity:1}0%,33%,100%{opacity:0}}
  </style>
  <text x="60" y="30" class="h">the value (backstage)</text>
  <rect x="60" y="46" width="180" height="70" class="core"/>
  <text x="92" y="90" class="big">0.1</text>
  <text x="60" y="146" class="t">never changes;</text>
  <text x="60" y="166" class="t">every formula</text>
  <text x="60" y="186" class="t">sees this</text>
  <path d="M250 81 h70" stroke="#0E7A4F" stroke-width="1.6" marker-end="url(#nfa)"/>
  <defs><marker id="nfa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="340" y="30" class="h">the display (costume)</text>
  <rect x="340" y="46" width="180" height="70" class="g"/>
  <g class="c1"><text x="380" y="90" class="big">10%</text><text x="340" y="146" class="t">Percentage</text></g>
  <g class="c2"><text x="368" y="90" class="big">£0.10</text><text x="340" y="146" class="t">Currency</text></g>
  <g class="c3"><text x="368" y="90" class="big">02:24</text><text x="340" y="146" class="t">Time</text></g>
  <text x="340" y="186" class="t">changes freely; costs nothing</text>
</svg>
<figcaption>One value, three costumes on rotation. Formatting is presentation — reversible, harmless, and never the reason your maths is wrong.</figcaption>
</figure>

## Driving the wardrobe

Everything lives in **`Ctrl+1` → Number** (one of
[the twelve keys](/articles/keyboard-habits-that-pay-for-themselves/)).
The working set: *Number* with a thousands separator for general
figures; *Currency* for money; *Percentage* — noting that typing
`10%` directly stores `0.1`, which is exactly what your formulas
want to multiply by; *Date*, where the same underlying day-number
can display as `14/07/2026` or `Jul-26` for free; and *Text*, the
one to avoid for anything you'll calculate with.

Two costume-room warnings. Typing a `£` sign yourself sometimes
creates *text* in older versions — let the format add symbols, you
just type digits. And "format the cell as Number" **cannot cure a
text-number** — the costume changes nothing underneath; only
[re-evaluation](/articles/paste-special-values-transpose-multiply/)
does.

## The 5% that's custom

Behind the presets sits a small pattern language (`Ctrl+1` →
Custom) — `#,##0;[Red](#,##0);"—"` gives you black positives, red
bracketed negatives, a dash for zero, all without touching a
value. Accountants live here. You need perhaps two recipes:
that one, and `#,##0,` with a trailing comma, which *displays* in
thousands while *holding* the full number — the honest way to
present big figures (never divide your actual data by 1,000 for
cosmetics; you'd be editing values to change a costume, the exact
sin in reverse).

The deeper lesson is [the grid mindset](/articles/the-grid-mindset-how-excel-thinks/)
applied to appearance: **values are the truth; display is a
courtesy to the reader.** Keep the two separate in your head and
you'll format fearlessly — because you'll know, always, that the
costume can't touch the numbers.
