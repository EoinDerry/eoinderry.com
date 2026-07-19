---
title: "The energy bill, decoded: a usage model in Excel"
description: Standing charges, unit rates, estimated readings — the small model that turns kWh into pounds, prices any tariff against your real usage, and spots the expensive appliances.
date: 2026-07-16
---

Energy bills are engineered to resist arithmetic. A unit rate
in pence, a standing charge in pence-per-day, usage in kWh you
never chose, an "estimated" flag doing quiet work, and a
headline discount computed against a tariff you weren't on.
Most households pay them the way they read terms and conditions
— scroll, sigh, accept.

But underneath, an energy bill is two lines of arithmetic, and
[two lines of arithmetic is a spreadsheet](/articles/payslip-decoded-in-excel/):

```
annual cost = standing_charge_p × 365 / 100
            + unit_rate_p × kwh_per_year / 100
```

That's the whole machine, per fuel. Build it with
[named inputs](/articles/named-ranges-formulas-read-like-sentences/)
and everything about energy pricing becomes checkable.

## Step one: your real usage number

Everything depends on one input most people never look up:
**your annual kWh** (electricity and gas separately). It's on
any bill or in your supplier's app — real, measured, yours.
Failing that, UK "typical household" figures (~2,700 kWh
electricity, ~11,500 kWh gas) start the model, but the whole
point is replacing folklore with
[your measured number](/articles/build-a-uk-budget-that-survives-real-life/)
— comparisons priced on someone else's usage are how "save
£300!" headlines happen to people who then save £40.

While you're in the app: **submit real readings** (or confirm
the smart meter is actually sending them). An `E` on the bill
means the numbers are fiction that gets trued-up later —
usually in winter, [the expensive month](/articles/sinking-funds-smoothing-annual-bills/).

## Step two: the tariff comparison table

One [Table](/articles/format-as-table-the-feature-that-changes-everything/),
one row per tariff — current, the price cap default, any fix
you're quoted: standing charge, unit rate, exit fees, and the
model's output column:

```
=([@StandP] * 365 + [@UnitP] * kwh) / 100
```

Now every tariff is **one comparable £/year against *your*
usage** — the [renewal-ritual move](/articles/renewal-ritual-comparison-sheet/),
applied to the utility where the marketing is thickest. The
table instantly exposes the trade the headline hides: a low
unit rate with a high standing charge suits big users; a low
standing charge suits the frugal — and which one *you* are is
exactly what `kwh` decides. (A
[Data Table sweep](/articles/data-tables-every-assumption-at-once/)
over the kwh input shows the crossover usage where the ranking
flips — one grid, the entire "which tariff" question.)

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two tariff cost lines against usage: the low standing charge tariff wins for small users, the low unit rate wins past the crossover">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .t1{stroke:#0E7A4F;stroke-width:2.4;fill:none;stroke-dasharray:560;stroke-dashoffset:560;animation:enA 5.5s ease-out infinite}
    .t2{stroke:#8A948D;stroke-width:2.2;fill:none;stroke-dasharray:560;stroke-dashoffset:560;animation:enA 5.5s ease-out infinite;animation-delay:0.3s}
    @keyframes enA{0%,8%{stroke-dashoffset:560}55%,100%{stroke-dashoffset:0}}
    .x{opacity:0;animation:enX 5.5s ease-out infinite}
    @keyframes enX{0%,50%{opacity:0}64%,100%{opacity:1}}
    .you{stroke:#C0392B;stroke-width:1.4;stroke-dasharray:4 4}
  </style>
  <line x1="70" y1="20" x2="70" y2="200" class="ax"/>
  <line x1="70" y1="200" x2="620" y2="200" class="ax"/>
  <path d="M70 150 L610 60" class="t1"/>
  <path d="M70 110 L610 96" class="t2"/>
  <text x="80" y="140" class="t" fill="#0A5C3B">Tariff A · cheap standing, dear units</text>
  <text x="80" y="96" class="t">Tariff B · dear standing, cheap units</text>
  <g class="x">
    <circle cx="342" cy="104" r="6" fill="#0E7A4F"/>
    <line x1="342" y1="104" x2="342" y2="200" stroke="#0E7A4F" stroke-width="1.2" stroke-dasharray="4 4"/>
    <text x="300" y="226" class="t">crossover kWh</text>
  </g>
  <line x1="470" y1="30" x2="470" y2="200" class="you"/>
  <text x="440" y="226" class="h" fill="#C0392B">your usage</text>
  <text x="484" y="46" class="t">→ B wins, for YOU</text>
</svg>
<figcaption>Neither tariff is "cheaper" — there's a crossover, and which side your red line falls on is the only comparison that counts.</figcaption>
</figure>

## Step three: price the appliances

The same unit rate answers the household's daily arguments,
because **kWh = kW × hours**:

```
=power_kw * hours * unit_rate / 100
```

A 2 kW heater through an 8-hour evening: ~£4.50 a night, £130 a
month — suddenly a real number in
[the budget](/articles/build-a-uk-budget-that-survives-real-life/)
rather than a vibe. A 10 W lamp left on all week: 4p — not
worth the nagging. The model's quiet service is *ranking*: a
[sorted little table](/articles/top-n-thinking-large-small-ranking/)
of your actual appliances usually shows heat (space, water,
tumble-dryer) as 80% of the story and standby LEDs as noise —
so effort goes
[where the money is](/articles/what-is-your-hour-worth/),
not where the guilt is.

Two closing honesty notes. Winter is not summer: usage is
seasonal, so monthly direct debits smooth an annual reality —
your [sinking-fund instinct](/articles/sinking-funds-smoothing-annual-bills/)
already handles the shape, and the model's annual figure is
the true anchor when a "your payments are increasing" email
arrives mid-year. And unit rates change with the price cap:
date the rows, keep the old ones — the
[history-is-leverage rule](/articles/renewal-ritual-comparison-sheet/)
applies to the utility everyone claims is uncomparable.

Standing charge, unit rate, your kWh. Three named cells, and
the most opaque bill in the drawer becomes the easiest one to
check.
