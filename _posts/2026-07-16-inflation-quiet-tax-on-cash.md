---
title: "Inflation: the quiet tax on cash"
description: The £10,000 that becomes £7,400 without moving — real versus nominal in Excel, and the one habit that makes every money model tell the truth.
date: 2026-07-16
---

There's a £10,000 in a savings account somewhere in your family
— being "sensible", earning a little interest, *safe*. Except
run it forward ten years at 3% inflation and its buying power is
about £7,400. Nothing was spent. Nothing was lost to fees or
crashes. The pounds are all still there — they just each buy
less, and nobody sent a statement about it.

That's inflation: a tax with no bill, collected from cash by
default. And because it compounds — the same machinery as
[the growth chart](/articles/compound-growth-isa-tracker-excel/),
pointed the other way — it's exactly the kind of slow arithmetic
human intuition ignores and
a spreadsheet makes undeniable.

## The two-line model

```
nominal  =B2 * (1 + interest)      what the statement says
real     =C2 * (1 + interest) / (1 + inflation)    what it buys
```

One row per year, [copy down](/articles/the-fill-handle-excels-pattern-engine/)
twenty, [chart both lines](/articles/charts-that-tell-the-truth/).
The statement line climbs gently and reassuringly. The
buying-power line — the true one — falls whenever `interest <
inflation`, which for ordinary savings accounts is most of most
decades.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two lines from the same £10,000: the nominal balance creeping up while the real buying power drifts down, the gap between them being inflation's take">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .nom{stroke:#8A948D;stroke-width:2.2;fill:none;stroke-dasharray:600;stroke-dashoffset:600;animation:infdraw 6s ease-out infinite}
    .real{stroke:#0E7A4F;stroke-width:2.6;fill:none;stroke-dasharray:600;stroke-dashoffset:600;animation:infdraw 6s ease-out infinite;animation-delay:0.3s}
    .gap{fill:#F6E7E2;opacity:0;animation:infgap 6s ease-out infinite}
    @keyframes infdraw{0%,6%{stroke-dashoffset:600}55%,100%{stroke-dashoffset:0}}
    @keyframes infgap{0%,50%{opacity:0}64%,100%{opacity:0.85}}
  </style>
  <line x1="70" y1="20" x2="70" y2="210" class="ax"/>
  <line x1="70" y1="210" x2="620" y2="210" class="ax"/>
  <path d="M70 120 L610 92 L610 176 Q 340 148 70 120 Z" class="gap"/>
  <path d="M70 120 L610 92" class="nom"/>
  <path d="M70 120 Q 340 148 610 176" class="real"/>
  <text x="440" y="80" class="t">the statement: £11,046 ✓</text>
  <text x="420" y="200" class="h" fill="#0A5C3B">what it buys: £8,190</text>
  <text x="250" y="140" class="h">inflation's take</text>
  <text x="530" y="234" class="t">10 years →</text>
  <text x="70" y="234" class="t">same account, two truths — only one appears on any statement</text>
</svg>
<figcaption>The grey line is what the bank reports; the green one is what the money can do. The shaded wedge is a tax nobody invoiced.</figcaption>
</figure>

The chart usually lands harder than any lecture — especially on
the family member who's been keeping serious money "safe" for a
decade. It also explains the odd vocabulary money people use:
**nominal** (the pounds on paper) versus **real** (the buying
power), and *real return* — interest minus inflation, roughly —
as the only return worth quoting.

## The habit: build models in today's money

This is the one that upgrades everything else in
[the field notes](/articles/build-a-uk-budget-that-survives-real-life/).
Every long-range model faces a choice: project in *nominal*
pounds (bigger, flattering, meaningless to your 2046 self) or in
**real terms** — using a real growth rate, so every output is in
pounds you can actually judge today.

You've already been doing it —
[the pension countdown](/articles/pension-countdown-when-could-you-stop/)
insisted on a real rate precisely so "£1,800 a month" still means
something at the crossing date. The general rule for any model
that spans decades: **subtract inflation from the growth
assumption, then read every result in today's money.** (The
precise form is `(1+r)/(1+i)−1`; rate-minus-inflation is close
enough for planning, and either belongs in
[a named cell](/articles/named-ranges-formulas-read-like-sentences/)
where [a Data Table can sweep it](/articles/data-tables-every-assumption-at-once/)
— inflation at 2% vs 4% over thirty years is *the* sensitivity
worth staring at.)

## What to actually do about it

The model, not this page, hands you the conclusions — but they
fall out fast:

- **Cash has a job description**: [the runway](/articles/emergency-fund-runway-excel/)
  and [the sinking funds](/articles/sinking-funds-smoothing-annual-bills/)
  — money whose *availability* matters more than its growth, in
  the best-paying accounts you can be bothered to switch to.
  Inflation is the fee you pay for certainty; pay it on months of
  spending, not decades of savings.
- **Long-horizon money needs a real return above zero** —
  historically the reason equities-in-an-ISA and pensions beat
  deposit accounts for retirement, *with* their volatility. (The
  trade-offs are [the countdown's](/articles/pension-countdown-when-could-you-stop/)
  territory, and past a certain pot size, a professional's.)
- **Debts are on your side here** — inflation quietly shrinks a
  fixed mortgage balance in real terms, one of the few respectable
  arguments for the invest side of
  [the overpay question](/articles/mortgage-overpay-or-invest-excel/).

One division per row — that's all "real terms" is. But it's the
difference between models that flatter and models that tell the
truth, and between money that looks safe and money that is.
The quiet tax can't be repealed; it can only be seen — and seen,
planned around. That's what the spreadsheet is for.
