---
title: "The true cost of the car: an ownership model in Excel"
description: The sticker price is the smallest lie in motoring — a one-sheet model that turns any car decision into pounds per month, comparable at a glance.
date: 2026-07-15
---

Ask what a car costs and you'll be told its price. But the price is
just the ticket in the window — the real number is what the car
takes from you *per month of your life*, and the two are so loosely
related that the cheaper-to-buy car is routinely the dearer one to
own. Depreciation, insurance, fuel, tax, servicing, the MOT, the
finance — motoring is a subscription wearing a price tag.

Excel is the right tool for exactly this shape of problem: several
flows of money, different rhythms, one honest answer. The model is
one sheet, ten inputs, three formulas — and once built, it prices
*any* car decision for the rest of your life.

## The idea: everything becomes £/month

The trick that makes wildly different costs comparable is forcing
them all through the same unit. Some costs are monthly already
(finance, charging). Some are annual (insurance, tax, servicing —
divide by 12). And the big ones only show up when you *sell* —
which is where most gut-feel goes wrong.

**Depreciation is the headline act.** What the car costs you in
capital is not its price — it's the price *minus what you'll get
back*, spread over the years you keep it:

```
=(price - resale_value) / years / 12
```

A £26,000 car sold for £13,000 after four years cost £271 a month
in depreciation alone — silently, with no direct debit to remind
you. A £9,000 car that's worth £5,500 three years later cost £97.
That gap outweighs almost any difference at the pump, and it's the
number the window ticket is designed to keep you from computing.

## The model

One column of named inputs — `price`, `resale_value`, `years`,
`miles_per_year`, `p_per_mile` (fuel or electricity),
`insurance_yr`, `tax_yr`, `service_yr`, `finance_mo`, plus a
`contingency_yr` for the repairs that always come (a few hundred
pounds honest; zero is a lie you tell yourself). Then:

```
depreciation_mo = (price - resale_value) / years / 12
running_mo      = miles_per_year * p_per_mile / 100 / 12
fixed_mo        = (insurance_yr + tax_yr + service_yr + contingency_yr) / 12
```

```
true_cost_mo = depreciation_mo + running_mo + fixed_mo + finance_mo
```

Lay two or three candidate cars side by side as columns — same
rows, one column per car — and the comparison stops being vibes.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A cost iceberg: the visible sticker price above the waterline, and the larger stack of depreciation, insurance, fuel and servicing beneath it">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .w{fill:#fff;stroke:#E6E4D9}
    .seg{stroke:#fff;stroke-width:1.5}
    .s1{fill:#0E7A4F}.s2{fill:#3E9268}.s3{fill:#6FAE8B}.s4{fill:#9CC8B0}.s5{fill:#C6E0D2}
    .drop{animation:tcodrop 6s ease-out infinite}
    .d2{animation-delay:0.4s}.d3{animation-delay:0.8s}.d4{animation-delay:1.2s}.d5{animation-delay:1.6s}
    @keyframes tcodrop{0%,12%{opacity:0;transform:translateY(-12px)}28%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
  </style>
  <text x="60" y="30" class="h">what you see</text>
  <rect x="60" y="44" width="180" height="44" class="w"/>
  <text x="74" y="72" class="t">"£26,000"</text>
  <text x="330" y="30" class="h">what it takes, per month (4 yrs)</text>
  <g class="drop"><rect x="330" y="44" width="271" height="40" class="seg s1"/><text x="342" y="69" class="t" fill="#fff">depreciation £271</text></g>
  <g class="drop d2"><rect x="330" y="84" width="110" height="34" class="seg s2"/><text x="342" y="106" class="t" fill="#fff">insurance £92</text></g>
  <g class="drop d3"><rect x="330" y="118" width="96" height="34" class="seg s3"/><text x="342" y="140" class="t" fill="#fff">fuel £80</text></g>
  <g class="drop d4"><rect x="330" y="152" width="66" height="34" class="seg s4"/><text x="342" y="174" class="t">service £55</text></g>
  <g class="drop d5"><rect x="330" y="186" width="46" height="34" class="seg s5"/><text x="342" y="208" class="t">tax £38</text></g>
  <text x="60" y="130" class="t">the ticket answers</text>
  <text x="60" y="150" class="t">"can I buy it?"</text>
  <text x="60" y="182" class="h">the stack answers</text>
  <text x="60" y="202" class="h">"can I run it?" — £536/mo</text>
</svg>
<figcaption>The ticket is one number; ownership is a stack. Depreciation usually tops it — the cost with no direct debit and no receipt.</figcaption>
</figure>

## Making the inputs honest

The model is arithmetic; the value is in the research, which takes
one evening. **Resale value** — look up 3–4-year-old versions of
the exact car on the used market right now; that *is* your answer,
no crystal ball needed. **Insurance** — run a real quote, not last
year's number. **Pence per mile** — from your real consumption:
a 40 mpg diesel at 150p/litre is ~17p/mile; an EV charged at home
at 7p/kWh is ~2p, at public rapids ~15p — which is why *where you
charge* matters more than *what you drive* in an EV comparison.
And check the servicing schedule for the lumpy items (cambelt,
battery health check) — `contingency_yr` is where those live.

Then let the model earn its keep with what-ifs, because every
input is a named cell: keep the car six years instead of four
(depreciation per month falls — the strongest argument for buying
at three years old and holding); double the mileage (the £/mile
cars reshuffle); drop to one car (the number that funds a lot of
taxis and train tickets).

## The same three formulas, everywhere

This model is [the budget's](/articles/build-a-uk-budget-that-survives-real-life/)
missing line item — transport is most households' second or third
biggest cost, usually entered as "fuel" and undercounted by half.
The monthly figure feeds your
[crisis floor](/articles/emergency-fund-runway-excel/) honestly,
and if the what-ifs free up £150 a month, the
[pension countdown](/articles/pension-countdown-when-could-you-stop/)
just moved closer — the leverage of a cheaper life, compounding
again.

*As with every money model here: this prices the decision, it
doesn't finance it — finance agreements and their small print
deserve professional eyes.*

The car will still be a want as much as a maths problem — that's
allowed. But want it with the stack in view, not just the ticket.
£536 a month is a different question than "£26,000?", and it's the
real one.
