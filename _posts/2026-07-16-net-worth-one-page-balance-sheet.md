---
title: "Net worth: the one-page personal balance sheet"
description: Every account, debt and pot on one page, totalled quarterly — the single number that shows whether the whole financial machine is actually working.
date: 2026-07-16
---

All the money models in this series watch a *flow*: the
[budget](/articles/build-a-uk-budget-that-survives-real-life/)
watches spending, the
[runway](/articles/emergency-fund-runway-excel/) watches cash,
the [countdown](/articles/pension-countdown-when-could-you-stop/)
watches the pension. Useful gauges, every one. But gauges aren't
the question. The question is: **is the whole machine working?
Are you, overall, getting ahead?** — and no single account can
answer it, because modern money is scattered across a dozen of
them, some of which are debts.

The instrument that answers it is the oldest one in finance,
scaled down to a household: a **balance sheet**. What you own,
what you owe, and the difference — *net worth* — tracked over
time. One page, one hour a quarter.

## The sheet

Two [Tables](/articles/format-as-table-the-feature-that-changes-everything/).
**Own:** every asset with a real value — current account,
savings, ISAs, pensions (the app you
[never open](/articles/pension-countdown-when-could-you-stop/)
knows), the house at an honest estimate, the
[car at what it would actually fetch](/articles/true-cost-of-the-car-tco-excel/).
**Owe:** every debt — mortgage balance
(your [amortisation table](/articles/loan-amortisation-table-excel/)
already knows it), loans, cards, student loan if it's a real
repayment for you. Then:

```
=SUM(Own[Value]) - SUM(Owe[Balance])
```

That's it. That number — positive or negative, and *especially*
its direction of travel — is the machine's output gauge.

Three honesty rules keep it meaningful. **Value things at what
they'd fetch, not what they cost** — the sofa isn't £2,000, and
mostly the sofa isn't on the sheet at all; stick to things with
a market. **Count the pension** even though it's locked — it's
the retirement plan's engine and usually the biggest line;
watching it grow is half the point. **Don't skip the ugly rows**
— the card balance you'd rather not type is the row the sheet
exists for.

## The part that matters: the history

A single snapshot is mildly interesting. The *time series* is
the product. Add a `Snapshots` table — date, total assets, total
debts, net worth — and append one row per quarter (calendar
reminder; it's ten minutes now the sheet exists). Then chart it:
net worth as the
[one honest line](/articles/charts-that-tell-the-truth/), rising
or not.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A net worth line climbing over three years of quarterly snapshots, wobbling through a market dip but trending upward, with assets and debts converging beneath">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .nw{stroke:#0E7A4F;stroke-width:2.6;fill:none;stroke-dasharray:620;stroke-dashoffset:620;animation:nwdraw 6s ease-out infinite}
    .debt{stroke:#8A948D;stroke-width:2;fill:none;stroke-dasharray:6 4}
    @keyframes nwdraw{0%,8%{stroke-dashoffset:620}60%,100%{stroke-dashoffset:0}}
    .dot{opacity:0;animation:nwdot 6s ease-out infinite}
    @keyframes nwdot{0%,55%{opacity:0}65%,100%{opacity:1}}
  </style>
  <line x1="70" y1="20" x2="70" y2="210" class="ax"/>
  <line x1="70" y1="210" x2="620" y2="210" class="ax"/>
  <path d="M70 178 L120 172 L170 160 L220 165 L270 148 L320 142 L370 152 L420 128 L470 118 L520 104 L570 88 L610 78" class="nw"/>
  <path d="M70 60 L200 78 L340 96 L480 118 L610 136" class="debt"/>
  <text x="486" y="108" class="h" fill="#0A5C3B">net worth ↗</text>
  <text x="480" y="150" class="t">debts ↘</text>
  <g class="dot">
    <circle cx="370" cy="152" r="6" fill="#0E7A4F"/>
    <text x="292" y="188" class="t">the dip that didn't matter</text>
  </g>
  <text x="70" y="238" class="t">quarterly dots, three years — the wobble is markets; the slope is you</text>
</svg>
<figcaption>One quarter is noise; twelve are a verdict. The line absorbs market wobbles and shows the only thing the gauges can't: the trend of the whole machine.</figcaption>
</figure>

The chart quietly teaches the two lessons every saver needs.
**Wobbles stop being frightening** — the 2022-style dip that
feels like catastrophe in an ISA app is a dent in a rising line
here, because contributions and debt paydown kept working while
prices fell. And **debt repayment finally *looks like* progress**
— [every overpaid £100](/articles/mortgage-overpay-or-invest-excel/)
moves this number exactly as much as £100 saved, which no bank
statement will ever show you. People who track net worth stop
arguing about
[pots versus paydown](/articles/mortgage-overpay-or-invest-excel/)
emotionally; both feed the same line.

## What it isn't

The number is a gauge, not a scoreboard. It doesn't measure your
worth (terrible name), it moves with markets you don't control,
and comparing yours to anyone else's ignores every circumstance
that matters. Its one honest job is comparison *with your own
past* — four dots a year, drawn from statements in an hour.

Quarterly, not daily: this is deliberately the anti-app. Money
apps want engagement; the balance sheet wants *perspective* —
[the compounding chart's](/articles/compound-growth-isa-tracker-excel/)
timescale, not the news cycle's. One page, four rows a year, one
line that answers the only question the gauges can't: it's
working. Keep going.
