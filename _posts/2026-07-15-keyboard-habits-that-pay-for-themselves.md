---
title: "Keyboard habits that pay for themselves"
description: Not two hundred shortcuts — the dozen keystrokes that remove the mouse from the work you do ten thousand times, learned one habit at a time.
date: 2026-07-15
domain: foundations
---

Watch an experienced Excel person work and something looks wrong:
the sheet is changing faster than their mouse is moving. Selections
leap, formats snap on, whole columns total themselves. It isn't
talent, and it isn't two hundred memorised shortcuts — the honest
number is about a dozen, welded into habit.

The trap with shortcut lists is that they're lists. Nobody adopts
forty keystrokes from a poster. So this is the other approach: the
dozen that matter, in the order they pay, with the instruction to
take **one per week**. A habit a week is fifty a year, and you only
need twelve.

## Getting around (weeks one and two)

The mouse's worst job is travel. From
[the navigation guide](/articles/freeze-panes-navigate-big-sheets/):

- **Ctrl + ↓/↑/←/→** — jump to the edge of the data. The bottom of
  a 10,000-row column in one press.
- **Ctrl + Home** — back to the top corner, from anywhere.

Add **Ctrl + PgDn / PgUp** to walk between sheet tabs — the tab
you're looking for is two presses away, not a squint and a click.

## Selecting (the one that changes everything)

- **Ctrl + Shift + ↓** — select from here to the edge of the data.
  This is the keystroke people gasp at: the whole column, selected
  precisely, in the time the mouse takes to start scrolling.
- **Ctrl + A** — the current data block; press again for the whole
  sheet.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ctrl+Shift+Down selects from the active cell to the bottom of the data in one keystroke">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .key{fill:#fff;stroke:#5A655E;rx:5}
    .sel{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4;transform-origin:170px 40px;animation:kselect 4.5s ease-out infinite}
    @keyframes kselect{0%,18%{transform:scaleY(0.185)}40%,88%{transform:scaleY(1)}100%{transform:scaleY(0.185)}}
    .press{animation:kpress 4.5s ease-out infinite}
    @keyframes kpress{0%,15%{opacity:0.45}22%,30%{opacity:1}40%,100%{opacity:0.45}}
  </style>
  <text x="60" y="26" class="h">one keystroke, whole column</text>
  <g>
    <rect x="170" y="40" width="150" height="32" class="g"/>
    <rect x="170" y="72" width="150" height="32" class="g"/>
    <rect x="170" y="104" width="150" height="32" class="g"/>
    <rect x="170" y="136" width="150" height="32" class="g"/>
    <rect x="170" y="168" width="150" height="32" class="g"/>
  </g>
  <rect x="170" y="40" width="150" height="173" class="sel"/>
  <text x="182" y="61" class="t">1,240</text>
  <text x="182" y="93" class="t">862</text>
  <text x="182" y="125" class="t">2,019</text>
  <text x="182" y="157" class="t">744</text>
  <text x="182" y="189" class="t">1,388</text>
  <g class="press">
    <rect x="390" y="90" width="60" height="34" class="key"/><text x="400" y="112" class="t">Ctrl</text>
    <rect x="458" y="90" width="72" height="34" class="key"/><text x="466" y="112" class="t">Shift</text>
    <rect x="538" y="90" width="42" height="34" class="key"/><text x="552" y="112" class="t">↓</text>
  </g>
  <text x="390" y="156" class="t">from the active cell to the</text>
  <text x="390" y="176" class="t">last filled row — precisely,</text>
  <text x="390" y="196" class="t">instantly, every time</text>
</svg>
<figcaption>The selection races the animation. In real life it's faster — and it never overshoots the way a scrolling mouse does.</figcaption>
</figure>

## Doing (weeks four to eight)

- **Ctrl + T** — turn the block into a
  [proper Table](/articles/format-as-table-the-feature-that-changes-everything/).
  The best three keys in Excel.
- **Alt + =** — AutoSum. Sit under a column of numbers, press it,
  Enter. Totals without typing `=SUM(`.
- **F2** — edit the active cell in place, cursor at the end. Paired
  with **Esc** to back out *without* saving your fumble.
- **F4** — while editing, cycles the `$` pinning on a reference
  ([the dollar-sign system](/articles/the-dollar-sign-cell-references-explained/)
  at typing speed). Bonus career: outside editing, F4 repeats your
  last action — format one cell, then F4 your way down the sheet.
- **Ctrl + 1** — Format Cells, the whole dialog. Number formats
  live here, and you visit more often than you think.

## The specialists (from week nine, as needed)

- **Ctrl + ;** — today's date, as a fixed value (unlike
  [`TODAY()`](/articles/working-with-dates-excel/), it won't change
  tomorrow — right for "logged on" stamps).
- **Ctrl + E** — Flash Fill: type one example of the pattern you
  want (`John Smith` → `J. Smith`), press it, and Excel fills the
  column by imitation. Check its work; it's a clever intern, not
  [a recorded recipe](/articles/power-query-combine-monthly-files/).
- **Ctrl + `** (the backtick, top-left) — show every formula on the
  sheet at once. The auditing X-ray; press again to switch back.

And on the seventh day: **Ctrl + S**. Autosave has made people
casual, and desktop Excel with autosave off is still one crash away
from an afternoon's silence.

## How habits actually form

Three rules from someone who's coached this. **One shortcut a
week** — write the current one on a sticky note on the monitor
edge; when you reach for the mouse to do that job, stop and use the
keys, even though it's slower the first ten times. **Let the
Alt-ribbon teach you the rest** — tap Alt alone and Excel overlays
letters on every ribbon command; any feature is a letter-sequence
away, no memorising required. And **don't collect** — a shortcut
you use daily is an asset; forty you half-remember are a party
trick.

The payoff isn't really speed, though speed comes. It's that the
mechanical layer of Excel stops interrupting the thinking layer —
selections, formats and totals happen at the speed of intention,
and your attention stays on the actual question. That's stage one
of [the path](/roadmap/) in general: make the ten-thousand-times
moves cheap, and everything built on them gets cheaper.

Twelve keys, one a week, a quarter of a year. Then watch someone
watch *you* work.
