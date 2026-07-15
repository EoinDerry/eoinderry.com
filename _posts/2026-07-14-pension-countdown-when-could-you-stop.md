---
title: "The pension countdown: when could you afford to stop?"
description: Turn the vaguest question in personal finance into one date on one chart — a small Excel model that shows when work becomes optional.
date: 2026-07-14
---

"When can I retire?" might be the most-asked and least-answered
question in personal finance. Least-answered because the honest
response is a probability cloud — markets, inflation, health, tax
rules — and clouds don't fit in a sentence. So most people never get
past *vaguely hoping it's before 70*.

Here's the reframe that makes it buildable: stop asking when you can
retire and ask **when could the pot cover the life I actually
live?** That's not a cloud. That's four numbers and a copy-down —
the same machinery as the
[compound growth tracker](/articles/compound-growth-isa-tracker-excel/),
pointed at the other end of the journey.

*The usual honesty: this is a model for **seeing the shape** of your
future, not financial advice. Before acting on what it shows you,
that's a conversation for a regulated adviser.*

## The four numbers

1. **Pot today** — everything earmarked for retirement: pensions
   (check the apps you've been ignoring), ISAs if you intend them
   for this. Name the cell `pot_now`.
2. **Monthly contribution** — yours *plus your employer's*, gross.
   Name it `monthly_in`.
3. **Real growth rate** — the long-run assumption *after inflation*.
   Working in real terms is the trick that keeps the model honest:
   a cautious 3–4% real means every figure the model produces is in
   *today's money*, and "£2,000 a month" still means something.
   Name it `growth`.
4. **The life you're paying for** — your essential monthly spend, in
   today's money. If you built
   [the four-number budget](/articles/build-a-uk-budget-that-survives-real-life/),
   you already know it. Name it `monthly_need`.

## The target the pot has to hit

A pot can't just *equal* your spending — it has to survive being
spent from, through crashes, for decades. The rough-and-honest
convention is a **safe withdrawal rate** of about 4% a year (many
people prefer 3.5% for early retirement — the model makes changing
it trivial). Which flips into the memorable version:

```
target = monthly_need × 12 / 4%    (= 25 years of spending)
```

Needing £1,800 a month? `1800 × 12 / 0.04` = **£540,000** in today's
money. Yes, that number is big. Two softeners before you close the
tab: the **state pension** (~£12,000 a year from your late 60s,
verified in two minutes at gov.uk's forecast page) can be modelled
as reducing `monthly_need` from state pension age — it typically
knocks a *third or more* off the target. And every £100 you can
trim from essential spending cuts the target by £30,000. Frugality
is leverage here, not virtue.

## The countdown table

One row per year. Three formulas, copied down:

| Column | Formula (row 2) |
|--------|-----------------|
| Year | `=YEAR(TODAY())+ROWS($A$2:A2)-1` |
| Pot | `=B2*(1+growth) + monthly_in*12` |
| Target | `=monthly_need*12/0.04` |

Start the Pot column with `pot_now`, copy down forty rows, and read
down until Pot first exceeds Target. **That row is your answer** —
or as a formula:

```
=INDEX(Years, MATCH(TRUE, Pots >= Targets, 0))
```

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A pot line curves upward over the years and crosses the flat target line — the crossing year is the answer">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .target{stroke:#8A948D;stroke-width:2;stroke-dasharray:6 4;fill:none}
    .pot{stroke:#0E7A4F;stroke-width:2.6;fill:none;stroke-dasharray:800;stroke-dashoffset:800;animation:potdraw 6s ease-out infinite}
    .mark{animation:markblink 6s ease-out infinite;opacity:0}
    @keyframes potdraw{0%{stroke-dashoffset:800}55%,100%{stroke-dashoffset:0}}
    @keyframes markblink{0%,50%{opacity:0}62%,100%{opacity:1}}
  </style>
  <line x1="70" y1="20" x2="70" y2="210" class="ax"/>
  <line x1="70" y1="210" x2="620" y2="210" class="ax"/>
  <path d="M70 92 L620 92" class="target"/>
  <text x="82" y="82" class="t">target = 25 × annual spend</text>
  <path d="M70 205 C 240 195 380 160 470 92 S 600 30 612 24" class="pot"/>
  <g class="mark">
    <circle cx="470" cy="92" r="7" fill="#0E7A4F"/>
    <line x1="470" y1="92" x2="470" y2="210" stroke="#0E7A4F" stroke-width="1.4" stroke-dasharray="4 4"/>
    <text x="428" y="236" class="h">2041 ← the answer</text>
  </g>
  <text x="560" y="236" class="t">years →</text>
</svg>
<figcaption>The pot curve does the compounding; the target line just waits. Where they cross, work becomes optional — and now it's a date, not a mood.</figcaption>
</figure>

## Now interrogate it

A date on a chart changes the questions you can ask. Because the
inputs are named cells, each what-if is a ten-second edit:

- **Contributions**: what does £100 more a month do to the crossing
  year? (For most people mid-journey: more than they expect.)
- **Growth**: drag it from 3% to 5% and watch how much the answer
  swings — that swing *is* the honest uncertainty, on one screen.
- **The life**: model `monthly_need` dropping at state pension age,
  or a smaller "semi-retired" number from some earlier year. The
  question quietly shifts from "when can I stop?" to *"when could I
  afford to work less?"* — often a decade sooner, and often the
  better question.

The model's real product isn't the date — the date will move. It's
the *sensitivity*: learning which lever is yours to pull. Spending
is usually the strongest one, which is exactly what
[the budget](/articles/build-a-uk-budget-that-survives-real-life/)
measures.

A probability cloud you can't look at becomes a curve, a line, and a
crossing. Excel's whole job, really: turning dread into arithmetic.
