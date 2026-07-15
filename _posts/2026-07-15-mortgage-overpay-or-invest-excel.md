---
title: "Overpay the mortgage or invest? Build the honest comparison"
description: The £200-a-month question everyone argues about, settled the only way it can be — two columns in Excel and an honest look at what "guaranteed" is worth.
date: 2026-07-15
---

Somewhere right now, two sensible people are arguing about what to
do with a spare £200 a month. One says *overpay the mortgage — be
free of it years early.* The other says *invest it — markets beat
mortgage rates.* Both are right about their own numbers and vague
about the other's, which is why the argument never ends.

Excel ends it — not with a universal answer (there isn't one), but
with *your* numbers side by side, compounding honestly, on one
chart. Two columns, one insight about risk, and the argument
becomes a decision.

*The standing disclaimer, meant sincerely: this is a model for
understanding the trade-off, not financial advice. Big-money moves
deserve a professional who can see your whole picture.*

## The insight that frames everything

An overpayment doesn't just shrink the balance — it earns a
return. Every pound overpaid stops accruing interest at your
mortgage rate, forever. **Overpaying at 4.5% is a guaranteed,
tax-free 4.5% return.** No market wobble, no fund fees, no tax
wrapper needed.

Investing the same pound in a stocks & shares ISA has a *higher
expected* return — the long-run real-world planning number for a
global tracker is perhaps 5–7% before inflation — but it arrives
with volatility: some five-year stretches are wonderful, some are
negative. So the real question is never "which number is bigger?"
It's **"how much expected return would I trade for certainty?"** —
a question about your sleep as much as your spreadsheet. The model
can't answer that part, but it can show you precisely what's being
traded.

## The model: two futures, one row per month

Inputs, named: `balance`, `rate_m` (mortgage rate ÷ 12), `payment`,
`extra` (the disputed £200), `invest_r` (expected return ÷ 12).
Then a table, one row per month, two parallel worlds:

**World A — overpay.** The balance shrinks fast:

```
=B2 * (1 + rate_m) - payment - extra
```

**World B — invest.** The mortgage runs as scheduled, and the
extra compounds in its own column, exactly like
[the ISA tracker](/articles/compound-growth-isa-tracker-excel/):

```
=D2 * (1 + invest_r) + extra
```

Copy down 300 rows. World A's finish line is the month its balance
hits zero (`=MATCH(TRUE, B2:B302<=0, 0)` finds it). The honest
comparison: at *that same month*, World B holds a mortgage balance
*and* an investment pot — its net position is pot minus balance.
If the pot exceeds what's left owing, investing won on the numbers;
the gap is the price certainty would have cost you. Then keep
reading down to see how World B's pot grows once World A is merely
mortgage-free and starting to invest from zero.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two lines over time: the overpaid mortgage balance falling to zero, and the investment pot rising past it, with the gap marked as the price of certainty">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .mort{stroke:#8A948D;stroke-width:2.2;fill:none;stroke-dasharray:520;stroke-dashoffset:520;animation:mline 6s ease-out infinite}
    .pot{stroke:#0E7A4F;stroke-width:2.6;fill:none;stroke-dasharray:560;stroke-dashoffset:560;animation:pline 6s ease-out infinite}
    .note{opacity:0;animation:mnote 6s ease-out infinite}
    @keyframes mline{0%{stroke-dashoffset:520}50%,100%{stroke-dashoffset:0}}
    @keyframes pline{0%{stroke-dashoffset:560}55%,100%{stroke-dashoffset:0}}
    @keyframes mnote{0%,58%{opacity:0}70%,100%{opacity:1}}
  </style>
  <line x1="70" y1="20" x2="70" y2="210" class="ax"/>
  <line x1="70" y1="210" x2="620" y2="210" class="ax"/>
  <path d="M70 60 C 200 80 330 130 450 208" class="mort"/>
  <path d="M70 200 C 220 190 400 140 600 44" class="pot"/>
  <text x="90" y="52" class="t">mortgage balance, overpaying → zero at year 19</text>
  <text x="360" y="90" class="t" fill="#0A5C3B">invested pot, compounding</text>
  <g class="note">
    <line x1="450" y1="208" x2="450" y2="118" stroke="#0E7A4F" stroke-width="1.4" stroke-dasharray="4 4"/>
    <text x="462" y="150" class="h">the gap = what</text>
    <text x="462" y="170" class="h">certainty cost</text>
  </g>
  <text x="560" y="232" class="t">years →</text>
</svg>
<figcaption>Grey falls to freedom; green compounds past it. The dashed gap is the expected price of sleeping soundly — now visible, and yours to judge.</figcaption>
</figure>

## Making it honest

The naive version flatters investing; these four adjustments keep
it truthful. **Test `invest_r` at 2%, 5% and 8%** — the guaranteed
side never changes, the invested side swings wildly; that swing
*is* the risk, on one screen. **Check your overpayment terms** —
most UK fixes allow 10% of the balance per year penalty-free, but
early repayment charges can vaporise years of advantage; one
clause outweighs the whole model. **Respect the tax wrappers** —
inside an ISA or pension, returns are tax-free (a pension adds
relief on the way in, at the price of access); outside them,
taxable, and the comparison tilts toward the mortgage. **And
neither option starts** until the
[runway is funded](/articles/emergency-fund-runway-excel/) and any
expensive debt is gone — a 22% credit card makes this whole
argument academic.

There's also a boring, powerful middle path the binary hides:
**do both.** Split the £200, or overpay to the comfort threshold
("owing less than X") and invest the rest. The model prices any
split — add a `split` cell and let the two worlds share the money.

## What the spreadsheet can't weigh

Run the numbers, then admit what they leave out. Being mortgage-
free changes *behaviour* — people report taking better risks,
worse jobs they love, earlier retirements
([the countdown](/articles/pension-countdown-when-could-you-stop/)
with a smaller `monthly_need`). Meanwhile flexibility has real
option value: an ISA can become a roof repair; a bricked-in
overpayment cannot, at least not cheaply. Neither of these fits in
a cell, and both are allowed to win.

The spreadsheet's job was never to make the choice. It was to
replace two people arguing with two columns compounding — so that
when you do choose certainty, or growth, or half of each, you know
exactly what it cost. That's the only version of this argument
worth having.
