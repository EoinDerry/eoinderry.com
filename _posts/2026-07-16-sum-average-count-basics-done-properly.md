---
title: "SUM, AVERAGE and COUNT: the basics, done properly"
description: Five functions carry half of all spreadsheet work — and three quiet behaviours of theirs explain most of the wrong answers beginners meet.
date: 2026-07-16
domain: foundations
---

Five functions do more work than the rest of Excel put together:
`SUM`, `AVERAGE`, `COUNT`, `MIN`, `MAX`. Most people meet them in
their first hour and assume there's nothing left to learn — and
then spend years being occasionally, mysteriously wrong. The
functions are simple. Their *quiet behaviours* aren't, and this
lesson is really about those.

## The shape they all share

```
=SUM(B2:B500)
```

A function name, and a range to eat. All five take the same diet —
a range, several ranges, or a whole column (`B:B`). The everyday
shortcut is **AutoSum**: sit in the cell under a column of numbers,
press `Alt + =`, Enter. Excel guesses the range — *check the
dancing border agrees with your intention* — and writes the `SUM`
for you. Change `SUM` to `AVERAGE` and the rest of the family works
identically.

Before writing any of them, though, use the free version: **select
the numbers and read the status bar**, bottom right. Sum, average
and count, live, no formula — the fastest sanity check in Excel,
and how you'll later catch a formula lying.

## Quiet behaviour one: blanks and text are invisible

`SUM` ignores anything that isn't a number — blanks, text, a
stray `"n/a"`. Usually that's mercy. But it means a column
containing [text-numbers](/articles/the-445pm-export-cleaning-messy-data/)
sums *only the real ones*, silently. A total that's wrong by
exactly the amount of a few rows is the classic symptom; the
status-bar count telling you fewer numbers than rows is the
confirmation.

`AVERAGE` inherits the same manners with a sharper edge: it
divides by the count of *numbers*, not rows. Five sales and three
blank months average over five — probably what you want. But a
**zero and a blank are different facts**: a shop that took £0 in
March pulls the average down; a shop with no March data doesn't.
Decide which truth each empty cell represents, and type the zero
when zero is what happened.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AVERAGE divides by the count of numbers, so a blank and a zero give different answers">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .z{fill:#EAF4EE;stroke:#0E7A4F}
    .pulse{animation:avpulse 4.5s ease-in-out infinite}
    @keyframes avpulse{0%,100%{opacity:1}50%{opacity:0.35}}
  </style>
  <text x="70" y="26" class="h">blank March</text>
  <rect x="70" y="40" width="120" height="30" class="g"/><text x="82" y="60" class="t">Jan   200</text>
  <rect x="70" y="70" width="120" height="30" class="g"/><text x="82" y="90" class="t">Feb   100</text>
  <rect x="70" y="100" width="120" height="30" class="g pulse"/><text x="82" y="120" class="t">Mar    —</text>
  <text x="70" y="164" class="t">=AVERAGE(...)</text>
  <text x="70" y="188" class="h">= 150   (÷ 2)</text>
  <text x="380" y="26" class="h">zero March</text>
  <rect x="380" y="40" width="120" height="30" class="g"/><text x="392" y="60" class="t">Jan   200</text>
  <rect x="380" y="70" width="120" height="30" class="g"/><text x="392" y="90" class="t">Feb   100</text>
  <rect x="380" y="100" width="120" height="30" class="z pulse"/><text x="392" y="120" class="t">Mar     0</text>
  <text x="380" y="164" class="t">=AVERAGE(...)</text>
  <text x="380" y="188" class="h">= 100   (÷ 3)</text>
  <text x="70" y="222" class="t">same-looking column, different divisor — decide what an empty cell MEANS</text>
</svg>
<figcaption>AVERAGE counts numbers, not rows. A blank is "no data"; a zero is "it happened and it was nothing" — and the answers differ by a third.</figcaption>
</figure>

## Quiet behaviour two: COUNT counts numbers

The one that catches everybody. `COUNT` counts **numbers only** —
point it at a column of names and it cheerfully returns zero. What
you usually want is its sibling:

| Question | Function |
|----------|----------|
| How many numbers? | `=COUNT(A:A)` |
| How many filled cells of any kind? | `=COUNTA(A:A)` |
| How many blanks? | `=COUNTBLANK(A2:A500)` |
| How many matching a condition? | [`=COUNTIF(S)`](/articles/sumifs-and-friends-answers-from-a-list/) — stage three |

`COUNTA` against `COUNT` is also a free data-quality probe: run
both on an "amounts" column, and any gap between them is exactly
the number of text-numbers hiding in it.

## Quiet behaviour three: a total is a claim

`MIN` and `MAX` need no manual — but they make good auditors.
Under any big `SUM`, I'll often keep a scratch `MIN` and `MAX`
while building: a minimum of `-4,872` in a column that should only
hold prices, or a maximum with two extra digits, is a data error
announcing itself early. (Stage three's
[error-handling lesson](/articles/if-ifs-nested-logic-done-cleanly/)
turns this instinct into formulas; for now the habit is enough.)

Then the two rules that keep totals honest for life. **Never type
a grand total** — if the cell says `=SUM(...)` it's always current;
if someone typed `12,480` it was correct once, in the past.
And **never sum a range that includes another sum** — subtotals
inside your range get counted twice, the oldest double-count in
accounting. Keep subtotals in their own column or, better, let
[Tables](/articles/format-as-table-the-feature-that-changes-everything/)
and [PivotTables](/articles/pivottables-from-first-principles/)
manage subtotals for you — that's precisely what they're for.

Five functions, three quiet behaviours, two rules. That's the
foundation poured — and every "Excel got it wrong" from here on is
worth re-reading this list before blaming the machine. It's stage
one of [the path](/roadmap/) because the machine is almost never
wrong — it's answering, precisely, a question slightly different
from the one you thought you asked.
