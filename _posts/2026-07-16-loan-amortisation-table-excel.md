---
title: "Loan maths: build an amortisation table and see inside any loan"
description: Every loan is the same machine — one small Excel table shows where each payment really goes, what the loan truly costs, and what overpaying actually does.
date: 2026-07-16
---

Every loan you'll ever meet — mortgage, car finance, personal loan
— is the same machine wearing different paperwork. Interest
accrues on the balance; your payment covers the interest and
chips at the rest. That's it. The paperwork, though, shows you a
monthly payment and an APR and hopes you'll stop reading — while
the machine's most important behaviours stay out of sight.

An **amortisation table** is the machine with the cover off: one
row per month, showing exactly where every pound of every payment
goes. It takes ten minutes to build and it permanently changes how
you read loan paperwork.

*Usual honesty: this is for understanding credit, not choosing
it — real agreements have fees and clauses the model can't see.*

## Three functions do the arithmetic

Excel has the loan maths built in. For a £15,000 car loan at 7%
over 5 years — inputs in named cells `loan`, `rate`, `months`:

```
=PMT(rate/12, months, -loan)        → £297.02 per month
```

(The minus sign is loan-convention: money you received is
negative from the lender's view. Feed `PMT` a positive loan and
the answer just arrives negative — same number.)

Its siblings split any single month: `IPMT` gives the interest
share of payment *n*, `PPMT` the capital share. You could stop
here — but the table is where the understanding lives.

## The table: one row per month

Columns: month, opening balance, interest, capital, closing
balance. Row one starts at `loan`; every row after says:

```
interest  =B2 * rate/12
capital   =payment - C2
closing   =B2 - D2
```

Copy down `months` rows — [fill-handle work](/articles/the-fill-handle-excels-pattern-engine/)
— and the closing balance should land on zero at the final row
(within [a rounding whisker](/roadmap/)). If it doesn't, an input
is wrong: the model just audited the paperwork for you.

Now read what the paperwork didn't show:

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stacked area over the loan term: early payments are mostly interest, later payments mostly capital, with the crossover marked">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .cap{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4}
    .intr{fill:#F4F2EA;stroke:#8A948D;stroke-width:1.2}
    .sweep{animation:amsweep 6s ease-out infinite;transform-origin:70px 0}
    @keyframes amsweep{0%{transform:scaleX(0)}55%,100%{transform:scaleX(1)}}
    .mark{opacity:0;animation:ammark 6s ease-out infinite}
    @keyframes ammark{0%,40%{opacity:0}52%,100%{opacity:1}}
  </style>
  <line x1="70" y1="20" x2="70" y2="200" class="ax"/>
  <line x1="70" y1="200" x2="620" y2="200" class="ax"/>
  <g class="sweep">
    <path d="M70 200 L70 60 Q 300 90 610 188 L610 200 Z" class="intr"/>
    <path d="M70 60 Q 300 90 610 188 L610 40 Q 340 52 70 60 Z" class="cap"/>
  </g>
  <text x="120" y="120" class="h">interest</text>
  <text x="440" y="100" class="h" fill="#0A5C3B">capital</text>
  <g class="mark">
    <line x1="300" y1="200" x2="300" y2="78" stroke="#0E7A4F" stroke-width="1.4" stroke-dasharray="4 4"/>
    <text x="312" y="70" class="t">the crossover — before here,</text>
    <text x="312" y="90" class="t">most of each payment is rent on the debt</text>
  </g>
  <text x="540" y="228" class="t">months →</text>
  <text x="70" y="228" class="t">every bar is the same £297 — the split is what changes</text>
</svg>
<figcaption>The payment never changes; its meaning does. Early on you're mostly paying interest — which is why early overpayments punch so far above their weight.</figcaption>
</figure>

**Early payments are mostly interest.** Month one of that car
loan: £87.50 interest, £209.52 capital. The split improves every
month — but on long loans the early years are heavily rent, which
is why a 25-year mortgage's first years barely dent the balance.

**The true cost is the sum of a column.** `=SUM` the interest
column: £2,821 on that £15,000 loan. Not the APR, not a monthly
drip — a single number you can weigh against alternatives, like
[the TCO stack](/articles/true-cost-of-the-car-tco-excel/) it
belongs inside if it's a car.

**Term is the expensive dial.** Rebuild at 7 years and the
payment falls to £226 — but total interest jumps to £4,003.
"Lower monthly payment" usually means *more months of interest*,
and the salesperson's favourite dial is now one you can price.

## What overpaying really does

Add an `extra` column and subtract it in the closing balance.
Watch two things happen: the zero row arrives *early*, and —
because every subsequent month's interest is computed on a
smaller balance — the interest column shrinks all the way down.
A £50/month overpayment on that 5-year loan saves ~£360 of
interest and ends it five months early; on a long mortgage the
same experiment produces numbers people don't believe until
their own table shows them.

Whether overpaying *beats investing the same £50* is
[its own model](/articles/mortgage-overpay-or-invest-excel/) —
this table is the machine both arguments stand on.

Build it once with real paperwork beside you. After that, every
loan offer you ever read is just a row-one you can extend — and
nobody gets to hope you'll stop reading again.
