---
title: "Percentages without panic"
description: Percent of, percent change, percentage points — the three calculations everyone mixes up, done once, properly, with the formulas that keep them straight.
date: 2026-07-16
domain: foundations
---

No piece of everyday maths causes more quiet workplace anxiety
than percentages. Not because they're hard — because three
*different* calculations all answer to the same name, and mixing
them up produces confident, wrong numbers. Untangle them once and
the panic never comes back.

First, the foundation from
[the number-formats lesson](/articles/number-formats-costume-not-value/):
**a percentage is just a decimal in costume.** `25%` *is* `0.25`.
Excel stores the decimal; the `%` format displays it. Which is why
the formulas below never multiply or divide by 100 — the costume
handles the 100, and formulas that do it themselves end up wrong
by a factor of exactly that.

## Calculation one: X% *of* something

The easy one — *of* means multiply:

```
=B2 * 20%          20% of the amount
=B2 * (1 + 20%)    the amount plus 20% (VAT-style)
=B2 / (1 + 20%)    the amount BEFORE 20% was added
```

That third line deserves a pause, because it's the classic trap:
to remove VAT from a gross price you **divide by 1.2** — you do
not multiply by 80%. A £120 gross price is £100 net; multiplying
by 0.8 gives £96, confidently wrong by £4. The rule: undoing a
percentage increase is a division, because the increase was
applied to the *smaller* number, not the one you're holding.

## Calculation two: percent *change*

The one in every monthly report — *how different is new from
old?*

```
=(new - old) / old
```

The mnemonic is *"difference over original"* — and the
denominator is always the **old** value, because the question is
"changed *from what?*". Format the result as a percentage
([`Ctrl+1`](/articles/keyboard-habits-that-pay-for-themselves/))
and the costume shows `+8.3%` or `−4.1%` untouched.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A price rising 25 percent and falling 20 percent returns to where it started — percentage rises and falls are not symmetric">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .bar{fill:#0E7A4F}.bar2{fill:#9CC8B0}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .b1{animation:pcgrow 5.5s ease-in-out infinite;transform-origin:0 200px}
    .b2{animation:pcgrow 5.5s ease-in-out infinite;animation-delay:0.6s;transform-origin:0 200px}
    .b3{animation:pcgrow 5.5s ease-in-out infinite;animation-delay:1.2s;transform-origin:0 200px}
    @keyframes pcgrow{0%,10%{transform:scaleY(0)}26%,90%{transform:scaleY(1)}100%{transform:scaleY(0)}}
  </style>
  <line x1="60" y1="200" x2="620" y2="200" class="ax"/>
  <g class="b1"><rect x="100" y="100" width="100" height="100" class="bar2"/></g>
  <text x="122" y="86" class="h">£100</text>
  <g class="b2"><rect x="280" y="75" width="100" height="125" class="bar"/></g>
  <text x="302" y="61" class="h">£125</text>
  <g class="b3"><rect x="460" y="100" width="100" height="100" class="bar2"/></g>
  <text x="482" y="86" class="h">£100</text>
  <text x="212" y="150" class="t">+25%</text>
  <text x="396" y="150" class="t">−20%</text>
  <text x="100" y="228" class="t">up 25%, then down only 20% — and you're exactly back where you began</text>
</svg>
<figcaption>Rises and falls aren't symmetric: +25% then −25% would leave you below the start. The denominator changed under you — that's the whole trick.</figcaption>
</figure>

That asymmetry in the figure is worth internalising: a 50% loss
needs a **100% gain** to recover, because the recovery is measured
from the smaller base. It explains everything from investment
maths to why "we cut prices 30%, then raised them 30%" loses
money.

## Calculation three: percentage *points*

The subtle one, and the favourite of misleading headlines. When a
rate moves from 4% to 6%, it has risen **two percentage points**
— but **50 per cent** (`(6−4)/4`). Both statements are true; they
answer different questions. In a sheet this bites when someone
computes percent-change *on numbers that are already
percentages*: margin moving 30% → 33% is "+3 pts" (a subtraction)
or "+10%" (difference over original). Label which one you mean —
`pts` vs `%` in the header — and you'll never watch a meeting
argue about a number that both sides computed correctly.

## The percent-of-total pattern

The other workhorse: each row as a share of the whole.

```
=B2 / SUM($B$2:$B$500)
```

The denominator wears
[full pins](/articles/the-dollar-sign-cell-references-explained/)
so it survives the copy-down — or, in
[a Table](/articles/structured-references-formulas-inside-tables/),
`=[@Amount]/SUM([Amount])`, no pins needed. Sanity check: the
shares must sum to 100%. If they show 99.9%, that's
[display rounding](/articles/round-and-the-missing-penny/), not an
error — resist "fixing" a share by hand, which creates a real one.

And when the percentages themselves need averaging — careful.
The average of 10% and 50% is *not* 30% if one was 10% of ten
thousand and the other 50% of ten. **Never average percentages
with different bases**; recompute from the underlying sums
(one [SUMIFS](/articles/sumifs-and-friends-answers-from-a-list/)
over each, then divide). The percentage is a *view* of two
numbers; when in doubt, go back to the numbers.

Three calculations, one costume, one asymmetry. Percentages
don't get easier than that — they were never hard; they were
just three things wearing one name.
