---
title: "Rent or buy: the honest model"
description: The most emotional question in personal finance, cooled down to unrecoverable costs — a two-column Excel model that compares like with like, at last.
date: 2026-07-16
---

No money question carries more feeling than this one. "Rent is
throwing money away" versus "a mortgage is a millstone" — both
slogans, both wrong as stated, and both usually argued with
numbers that compare the wrong things. The classic mistake is
weighing *rent* against *the whole mortgage payment* — but part
of every mortgage payment
[buys equity back](/articles/loan-amortisation-table-excel/),
and renting frees a deposit
[to compound elsewhere](/articles/compound-growth-isa-tracker-excel/).
Apples, meet orchard.

The model that compares like with like rests on one idea:
**unrecoverable costs** — money that leaves each month and never
comes back, under either roof.

*The standing line, meant more than ever here: this models the
finances of the biggest purchase of most lives. It organises
the decision; a mortgage adviser and your own judgement finish
it. And it deliberately says nothing about the part spreadsheets
can't hold — security, roots, the landlord's boiler.*

## Renting's unrecoverable cost

Easy: the rent. Plus contents insurance, minus nothing — the
deposit you *didn't* spend stays invested, and its return
offsets the rent. Monthly:

```
rent_cost = rent + insurance − (deposit * invest_return / 12)
```

That last term is the one folklore forgets: a £40,000 deposit
earning a real 4% quietly hands the renter £133 a month.

## Owning's unrecoverable cost

Harder, because the headline payment is a blend. The
unrecoverable parts:

```
own_cost = interest + maintenance + buying_costs_monthly
           + ownership_extras − expected_appreciation/12
```

- **Interest, not the payment** — your
  [amortisation table's](/articles/loan-amortisation-table-excel/)
  interest column, which is most of the payment early on. The
  capital slice is *transfer to yourself*, not cost.
- **Maintenance** — the folklore-free estimate is ~1% of the
  property's value per year. Owners fix their own boilers.
- **Buying costs, spread** — stamp duty, legal, survey; £8–15k
  that amortises over your expected years in the house, which is
  why short stays favour renting almost regardless of the rest.
- **Appreciation** — the offset on the owner's side, and the
  model's most dangerous input: real (after-inflation) house
  price growth has long-run averages near 1–3%, not the
  folk-memory double digits. It gets
  [a named cell](/articles/named-ranges-formulas-read-like-sentences/)
  and a hard stare.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two stacked bars of unrecoverable monthly costs, renting versus owning, each with an offsetting credit, landing at comparable totals">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .seg{stroke:#fff;stroke-width:1.5}
    .s1{fill:#0E7A4F}.s2{fill:#6FAE8B}.s3{fill:#9CC8B0}.s4{fill:#C6E0D2}
    .credit{fill:#fff;stroke:#0E7A4F;stroke-dasharray:4 3}
    .d1{opacity:0;animation:rbdrop 6s ease-out infinite}
    .d2{opacity:0;animation:rbdrop 6s ease-out infinite;animation-delay:0.4s}
    .d3{opacity:0;animation:rbdrop 6s ease-out infinite;animation-delay:0.8s}
    .d4{opacity:0;animation:rbdrop 6s ease-out infinite;animation-delay:1.2s}
    @keyframes rbdrop{0%,10%{opacity:0;transform:translateY(-10px)}25%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
  </style>
  <text x="90" y="26" class="h">renting, per month</text>
  <g class="d1"><rect x="90" y="40" width="180" height="80" class="seg s1"/><text x="102" y="84" class="t" fill="#fff">rent £1,150</text></g>
  <g class="d2"><rect x="90" y="120" width="180" height="16" class="seg s3"/><text x="102" y="133" class="t">insurance</text></g>
  <g class="d3"><rect x="90" y="140" width="180" height="30" class="credit"/><text x="102" y="160" class="t">− deposit return £133</text></g>
  <text x="90" y="200" class="h">net ≈ £1,040</text>
  <text x="390" y="26" class="h">owning, per month</text>
  <g class="d1"><rect x="390" y="40" width="180" height="56" class="seg s1"/><text x="402" y="72" class="t" fill="#fff">interest £780</text></g>
  <g class="d2"><rect x="390" y="96" width="180" height="30" class="seg s2"/><text x="402" y="116" class="t" fill="#fff">maintenance £240</text></g>
  <g class="d3"><rect x="390" y="126" width="180" height="22" class="seg s4"/><text x="402" y="142" class="t">buying costs £95</text></g>
  <g class="d4"><rect x="390" y="152" width="180" height="26" class="credit"/><text x="402" y="170" class="t">− appreciation £120</text></g>
  <text x="390" y="200" class="h">net ≈ £995</text>
  <text x="90" y="232" class="t">capital repayment appears in NEITHER bar — it isn't a cost, it's a transfer to yourself</text>
</svg>
<figcaption>Like against like at last: what each roof burns per month. When the bars sit this close, the decision was never really financial.</figcaption>
</figure>

## Reading the model

Build both columns with named inputs and let
[a Data Table](/articles/data-tables-every-assumption-at-once/)
sweep the two assumptions that dominate: **years you'll stay**
(short tenancy → renting wins on buying costs alone; the
crossover is typically 4–7 years) and **appreciation vs
investment return** — the honest admission that the answer
partly depends on two futures nobody knows.
[Sweep them](/articles/data-tables-every-assumption-at-once/),
find where *your* crossover sits, and notice how often the grid
says: *close*. That's the model's real gift — when the
financials are within £100 a month either way, you're released
to decide on the things that actually differ: stability,
flexibility, the garden, the landlord.

And when the bars *aren't* close — a hot market where owning
burns £600 more, a cheap one where it saves £400 — you've
learned something slogans never could: the answer is local,
personal and dated, which is why it belongs in
[your spreadsheet](/articles/build-a-uk-budget-that-survives-real-life/)
and not in anyone's Twitter thread.

Unrecoverable costs, side by side, assumptions on the table.
The most emotional question in money doesn't get less emotional
— it gets *honest*, which is the most a spreadsheet can do,
and exactly what it's for.
