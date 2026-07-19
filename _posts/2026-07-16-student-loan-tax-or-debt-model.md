---
title: "The student loan: tax or debt? Model it and see"
description: The UK's strangest financial product behaves like a debt for some and a tax for most — one Excel model that tells you which yours is, and why it changes everything.
date: 2026-07-16
---

The UK student loan is the most misunderstood line on any
payslip, because it wears a costume: it's *called* a loan, has
a balance and an interest rate, and produces guilt accordingly.
But it behaves like no debt you've ever met — repayments depend
on **earnings, not the balance**; missing "payments" is
impossible; it can't affect a credit file; and after a fixed
term the remainder **vanishes**, unpaid, without consequence.

Whether *yours* will behave like a debt (you'll repay it, so
the balance matters) or like a tax (you'll pay 9% for decades
and the balance is theatre) is not a matter of opinion. It's
one Excel model — and the answer changes what, if anything, you
should do about it.

*The full disclaimers apply: plans differ (Plan 1/2/4/5,
postgrad), thresholds and rules change at Budgets, and big
decisions here — especially voluntary repayment — are worth
[professional eyes](/articles/pension-countdown-when-could-you-stop/).
Build with your plan's current numbers from gov.uk beside you.*

## The machine

Repayment is [marginal-band arithmetic](/articles/payslip-decoded-in-excel/)
you already own:

```
repay_yr = MAX(0, salary - threshold) * 9%
```

Nine per cent of earnings *above the threshold* — a formula
with no balance in it anywhere. The balance meanwhile runs its
own race, exactly like
[the amortisation table](/articles/loan-amortisation-table-excel/)
but with the payment set by your salary instead of your loan:

| Column | Formula |
|--------|---------|
| Salary | grows at your assumed raise rate |
| Repayment | the 9% line above |
| Interest | `balance × rate` |
| Balance | `prev + interest − repayment` |

One row per year, copied to your plan's write-off horizon
(25–40 years depending on plan). Then read the last row, and
the model hands you one of two verdicts:

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two balance trajectories: a high earner's falling to zero before write-off, and a typical earner's still positive when the write-off guillotine erases it">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .debt{stroke:#0E7A4F;stroke-width:2.4;fill:none;stroke-dasharray:600;stroke-dashoffset:600;animation:sldraw 6s ease-out infinite}
    .tax{stroke:#8A948D;stroke-width:2.4;fill:none;stroke-dasharray:600;stroke-dashoffset:600;animation:sldraw 6s ease-out infinite;animation-delay:0.3s}
    @keyframes sldraw{0%,8%{stroke-dashoffset:600}55%,100%{stroke-dashoffset:0}}
    .guill{opacity:0;animation:slg 6s ease-out infinite}
    @keyframes slg{0%,55%{opacity:0}68%,100%{opacity:1}}
  </style>
  <line x1="70" y1="20" x2="70" y2="200" class="ax"/>
  <line x1="70" y1="200" x2="620" y2="200" class="ax"/>
  <path d="M70 90 C 200 80 300 120 420 198" class="debt"/>
  <text x="150" y="66" class="t" fill="#0A5C3B">high earner: hits zero year 14 — it's a DEBT</text>
  <path d="M70 90 C 250 84 420 70 560 62" class="tax"/>
  <text x="300" y="46" class="t">typical earner: balance grows anyway…</text>
  <g class="guill">
    <line x1="560" y1="30" x2="560" y2="200" stroke="#C0392B" stroke-width="2"/>
    <text x="430" y="234" class="h" fill="#C0392B">write-off: balance erased</text>
    <text x="452" y="90" class="h">…it was a TAX</text>
  </g>
  <text x="580" y="224" class="t">yrs</text>
</svg>
<figcaption>Same loan, two salaries, opposite objects. If the line dies at the guillotine, the balance — and its scary interest — never mattered at all.</figcaption>
</figure>

**Verdict one: the balance dies before the write-off.** You'll
repay in full. It's genuinely a debt, interest genuinely costs
you, and the
[overpay-or-invest machinery](/articles/mortgage-overpay-or-invest-excel/)
becomes relevant. This is mostly the story for high and
fast-rising earners.

**Verdict two: the guillotine falls first** — the story for
*most* graduates on recent plans. Then the mind-bending
conclusions follow: the balance is irrelevant (£20k or £60k,
same 9%, same end date); **the interest rate is irrelevant**
(it inflates a number that gets erased); and *voluntary
repayment is setting fire to money* — every extra pound reduces
a balance that was never going to be repaid anyway. For this
group the loan is precisely a 9% payroll tax with an end date,
and the guilt attached to the growing balance is a costume
reacting to a costume.

## What the model changes

Beyond the peace of mind: the verdict feeds your other sheets.
The 9% belongs in [the payslip model](/articles/payslip-decoded-in-excel/)
(it stacks with tax and NI — a Plan 2 basic-rate payer's
marginal rate is ~37%, which reprices
[overtime and raises](/articles/what-is-your-hour-worth/)).
"Tax" verdicts mean the balance stays *off*
[the net-worth sheet](/articles/net-worth-one-page-balance-sheet/)
— it isn't a debt you owe so much as a tax band you're in.
And borderline cases — the interesting ones — deserve
[a Data Table sweep](/articles/data-tables-every-assumption-at-once/)
over salary growth: seeing at what career trajectory the
verdict flips is exactly the kind of thing
worth knowing *before* making voluntary payments.

The strangest product in UK finance, and the cure is the usual
one: stop reading the costume, model the machine, read the
last row. Tax or debt — yours is one of them, and now you know
which.
