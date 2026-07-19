---
title: "Two incomes, one household: splitting money fairly"
description: Fifty-fifty feels fair and often isn't — the small Excel model that shows what equal, proportional and pooled splitting each really mean for both people.
date: 2026-07-16
---

Every couple sharing a roof eventually has the conversation,
and most have it badly — because it's conducted in vibes.
"We split everything half and half" *sounds* like fairness
itself. Run it through a spreadsheet where one person earns
£3,400 a month and the other £1,900, and a different picture
appears: after equal shares of a £2,200 household, one partner
has £2,300 left and the other £800. Same bills, wildly
different lives.

There's no universally right answer here — but there are three
coherent systems, and a small model that shows *both people*
what each one actually does. The spreadsheet's job isn't to
pick; it's to make the conversation honest.

## The three systems, as formulas

Inputs: each person's take-home
([the payslip model](/articles/payslip-decoded-in-excel/) feeds
this), and the shared monthly cost — the household's
[four-number budget](/articles/build-a-uk-budget-that-survives-real-life/)
plus [the sinking funds](/articles/sinking-funds-smoothing-annual-bills/).

**Equal:** `=shared_cost / 2` each. Simple, and regressive —
the lower earner pays a far larger *share of their income*.

**Proportional:** each pays in the ratio of their take-home:

```
=shared_cost * [@TakeHome] / SUM(TakeHome)
```

On the numbers above: £1,412 and £788. Equal *sacrifice*
instead of equal *pounds* — both partners keep the same
percentage of their own income for themselves.

**Pooled:** all income lands in one pot; the pot pays
everything; personal spending comes as equal allowances. The
fully-merged model — simplest to run, biggest ask in autonomy.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two income bars with the household cost taken equally versus proportionally, showing what remains for each person under each system">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .inc{fill:#EAF4EE;stroke:#0E7A4F}
    .pay{fill:#0E7A4F}
    .sw1{animation:spsw1 6s ease-in-out infinite}
    .sw2{opacity:0;animation:spsw2 6s ease-in-out infinite}
    @keyframes spsw1{0%,35%{opacity:1}48%,88%{opacity:0}100%{opacity:1}}
    @keyframes spsw2{0%,35%{opacity:0}48%,88%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">earns £3,400</text>
  <rect x="60" y="40" width="340" height="44" class="inc"/>
  <text x="470" y="26" class="h">earns £1,900</text>
  <rect x="60" y="130" width="190" height="44" class="inc"/>
  <g class="sw1">
    <rect x="290" y="40" width="110" height="44" class="pay"/><text x="300" y="67" class="t" fill="#fff">pays £1,100</text>
    <rect x="140" y="130" width="110" height="44" class="pay"/><text x="150" y="157" class="t" fill="#fff">pays £1,100</text>
    <text x="60" y="106" class="t">equal: keeps £2,300</text>
    <text x="60" y="196" class="h" fill="#C0392B">equal: keeps £800</text>
    <text x="420" y="157" class="h">50 : 50</text>
    <text x="420" y="180" class="t">same pounds,</text>
    <text x="420" y="200" class="t">unequal lives</text>
  </g>
  <g class="sw2">
    <rect x="259" y="40" width="141" height="44" class="pay"/><text x="269" y="67" class="t" fill="#fff">pays £1,412</text>
    <rect x="171" y="130" width="79" height="44" class="pay"/><text x="174" y="157" class="t" fill="#fff">£788</text>
    <text x="60" y="106" class="t">proportional: keeps £1,988 (58%)</text>
    <text x="60" y="196" class="h" fill="#0A5C3B">proportional: keeps £1,112 (58%)</text>
    <text x="420" y="157" class="h">64 : 36</text>
    <text x="420" y="180" class="t">same share of self,</text>
    <text x="420" y="200" class="t">equal sacrifice</text>
  </g>
</svg>
<figcaption>The same household, two definitions of "fair". The model doesn't pick one — it makes sure both people are looking at the same picture when they do.</figcaption>
</figure>

## What the model surfaces that vibes don't

Build it with both systems side by side —
[a Data-Table-style comparison](/articles/data-tables-every-assumption-at-once/)
of leftover-per-person under each — and the discussable facts
appear: the **leftover ratio** (equal splitting on unequal
incomes routinely leaves one partner with 3–4× the personal
money); the **what-counts-as-shared boundary** (the
[energy model](/articles/energy-bills-decoded-unit-rates-model/),
groceries, the car
[and its true cost](/articles/true-cost-of-the-car-tco-excel/)
— agreeing the list is half the argument, and
[a Table](/articles/format-as-table-the-feature-that-changes-everything/)
with a Shared? column settles it line by line); and the
long-game asymmetries — if one partner's
[pension](/articles/pension-countdown-when-could-you-stop/)
stalls while covering household costs, "fair this month" can be
quietly unfair over decades.
[Net worth is a household line](/articles/net-worth-one-page-balance-sheet/)
too, and the proportional conversation extends to it.

Practicalities that make any system survivable: a **joint
bills account** fed by standing orders (each person's computed
share, updated when
[salaries change](/articles/payslip-decoded-in-excel/) — the
model recalculates in one edit), personal accounts untouched
beyond that, and a *yearly* review rather than a monthly
renegotiation. The system you pick matters less than both
people having seen the same numbers when picking it.

One sheet, three systems, both leftovers visible. The money
conversation every couple dreads turns out to be about forty
minutes long once it's conducted in arithmetic — and the
spreadsheet, as ever, is just the neutral table everyone can
sit at.
