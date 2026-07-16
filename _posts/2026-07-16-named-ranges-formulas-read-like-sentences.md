---
title: "Named ranges: formulas that read like sentences"
description: The difference between =C2*$E$1 and =C2*vat_rate is the difference between a puzzle and a sentence — naming, the cheapest quality upgrade in Excel.
date: 2026-07-16
domain: formulas
---

Read these two formulas and notice what your brain does:

```
=C2 * $E$1
=C2 * vat_rate
```

The first is a puzzle: *what's in E1? Scroll and find out.* The
second is a sentence. Same calculation, same speed, same
everything — except one of them can be read, checked and trusted
without leaving the cell. That's a **named range**, and it's the
cheapest quality upgrade in Excel: no new functions, no new
concepts, just the decision to call things by their names.

## Naming a cell takes four seconds

Select the cell (or range), click into the **Name Box** — the
little white box left of the formula bar — type `vat_rate`,
Enter. Done. From now on, every formula in the workbook can say
`vat_rate`, and the Name Box's dropdown
[teleports you to it](/articles/keyboard-habits-that-pay-for-themselves/)
from anywhere.

Names are workbook-wide, they can't contain spaces (`vat_rate`,
not `vat rate` — the underscore habit), and they can't collide
with cell addresses (`Q1` is a cell; `qtr1_total` is a name).
Housekeeping lives in `Formulas → Name Manager` — the list of
every name, what it points at, and the *comment field almost
nobody uses* but should: one line saying what the number is and
who sets it.

## Why this is more than cosmetics

**Names are absolute by nature.** `vat_rate` means the same cell
from every formula, everywhere — the whole
[dollar-sign pinning question](/articles/the-dollar-sign-cell-references-explained/)
simply doesn't arise. Half of beginners' `$` mistakes are formulas
that wanted a name.

**Names make wrongness visible.** `=C2*$E$2` — E2 instead of E1 —
looks completely plausible and is silently wrong.
`=C2*vat_raet` fails *instantly* with
[`#NAME?`](/articles/iferror-ifna-failing-loudly/). Naming converts
the worst kind of error (quiet, plausible) into the best kind
(loud, immediate).

**Names gather the knobs in one place.** Every model has settings
— rates, thresholds, targets, [the growth assumption](/articles/pension-countdown-when-could-you-stop/).
Named and parked on one **Inputs sheet**, they become a control
panel: anyone can see what drives the model and turn a knob
without spelunking through formulas. This is the architecture
[the dashboard lesson](/articles/building-a-one-page-dashboard/)
calls the Calc layer, arriving early.

<figure class="guide-fig">
<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The same formula shown as coordinates and as names, with the named version reading as a sentence">
  <style>
    .t{font:13px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .q{opacity:0;animation:nrq 6s ease-in-out infinite}
    .q2{animation-delay:0.5s}.q3{animation-delay:1s}
    @keyframes nrq{0%,8%{opacity:0}18%,42%{opacity:1}52%,100%{opacity:0}}
    .ans{opacity:0;animation:nra 6s ease-in-out infinite}
    @keyframes nra{0%,50%{opacity:0}62%,94%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="30" class="h">the puzzle</text>
  <rect x="60" y="44" width="380" height="40" class="g"/>
  <text x="74" y="70" class="t">=(C2-$E$1) * $E$2 * (1-$F$4)</text>
  <g class="q"><text x="118" y="112" class="t">what's E1?</text></g>
  <g class="q q2"><text x="230" y="112" class="t">…E2?</text></g>
  <g class="q q3"><text x="320" y="112" class="t">…F4??</text></g>
  <text x="60" y="156" class="h">the sentence</text>
  <rect x="60" y="170" width="520" height="40" class="acc"/>
  <text x="74" y="196" class="t">=(C2-cost_base) * margin * (1-discount)</text>
  <g class="ans"><text x="470" y="112" class="h">↓ no questions</text></g>
</svg>
<figcaption>Same formula, two costs of reading. The named version answers its own questions — including the ones your successor would have asked you in 2029.</figcaption>
</figure>

## Where names stop and Tables start

A fair question at this stage of [the path](/roadmap/): with
[structured references](/articles/structured-references-formulas-inside-tables/)
naming every column automatically, what's left for named ranges?
A clean division:

- **Tables name your data** — `Orders[Amount]`, free, always
  current.
- **Named cells name your settings** — `vat_rate`,
  `target_months`, `growth`. Single values, deliberately chosen,
  documented in the Name Manager.
- Named *formulas* (a name whose definition is a calculation) are
  the third act — that's
  [LAMBDA territory](/articles/let-and-lambda-formulas-you-can-read/),
  and the naming instinct you're building here is exactly what
  makes it land later.

The one abuse to avoid: don't name everything. Forty names is a
second address system nobody maintains,
and stale names pointing at deleted cells produce lovely
confusing [`#REF!`s](/articles/iferror-ifna-failing-loudly/). Name
the *settings* — the numbers a human might change — and let
Tables handle the data. A workbook usually wants five to fifteen
names, each earning its line in the Name Manager.

Here's the test worth adopting: open any formula you wrote and
read it aloud. Every coordinate you have to go and look up is a
question your formula makes every future reader answer again.
`=C2*vat_rate` answers it once, for everyone, forever.

Four seconds per name. Sentences instead of puzzles. There is no
cheaper quality you will ever buy in Excel.
