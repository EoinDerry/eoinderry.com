---
title: "What's your hour actually worth?"
description: The salary is a headline; the hourly rate is the truth — a small Excel model that reprices your commute, your overtime and every "is it worth it?" decision.
date: 2026-07-16
---

Ask someone what they earn and they'll quote the salary. Ask what
an *hour of their life* sells for and almost nobody knows — yet
that's the number every real decision uses. Is the longer commute
worth £4k more? Is Saturday overtime good money? Is it worth three
hours assembling the flat-pack to save £45? Salary can't answer
those. The hourly rate can, and it takes one small sheet.

## The naive number, then the true one

The naive version is division:

```
= salary / 52 / hours_per_week      → £38,000 ≈ £18.75/hr
```

But you don't work `hours_per_week`. You work those hours **plus
everything the job takes that never appears on the contract**: the
commute, the getting-ready, the unpaid overtime, the lunch you eat
at your desk. And you don't receive `salary` — you receive what's
left [after tax](/articles/payslip-decoded-in-excel/), minus the
costs the job itself creates: travel, parking, work clothes, the
convenience food bought because the job ate the cooking time.

So the true rate is:

```
= take_home_pay − job_costs
  ─────────────────────────
  contracted + commute + extra hours
```

Build it with named cells — `take_home_mo`, `job_costs_mo`,
`hours_contract`, `hours_commute`, `hours_extra` — and the model
is four rows and one division.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The advertised hourly rate shrinks step by step as tax, job costs, commute and unpaid hours are applied">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .bar{fill:#0E7A4F}
    .bar2{fill:#6FAE8B}.bar3{fill:#9CC8B0}.bar4{fill:#C6E0D2}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .st{animation:hwstep 6s ease-out infinite}
    .s2{animation-delay:0.5s}.s3{animation-delay:1s}.s4{animation-delay:1.5s}
    @keyframes hwstep{0%,10%{opacity:0;transform:translateY(8px)}24%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
  </style>
  <line x1="70" y1="210" x2="620" y2="210" class="ax"/>
  <g class="st"><rect x="90" y="60" width="90" height="150" class="bar"/><text x="96" y="46" class="h">£18.75</text><text x="90" y="232" class="t">the maths</text></g>
  <g class="st s2"><rect x="230" y="96" width="90" height="114" class="bar2"/><text x="236" y="82" class="h">£14.30</text><text x="230" y="232" class="t">after tax</text></g>
  <g class="st s3"><rect x="370" y="118" width="90" height="92" class="bar3"/><text x="376" y="104" class="h">£12.10</text><text x="370" y="232" class="t">− job costs</text></g>
  <g class="st s4"><rect x="510" y="142" width="90" height="68" class="bar4"/><text x="516" y="128" class="h">£9.40</text><text x="510" y="232" class="t">÷ real hours</text></g>
</svg>
<figcaption>The same job, repriced honestly. Half the advertised rate is a common result — and decisions made with the left bar are made with someone else's number.</figcaption>
</figure>

For a typical £38k job with a 50-minute-each-way commute, £180 of
monthly job costs and a few unpaid hours, the honest rate lands
somewhere near **half** the naive one. That's not a trick of the
model — it's the actual exchange rate between your life and your
payslip.

## What the number is for

Not guilt — *pricing*. Once `true_rate` is a named cell, a whole
family of decisions becomes arithmetic:

- **Job offers.** The £4k raise with a longer commute: rebuild the
  right-hand side with the new hours and costs. It's routinely a
  pay *cut* per hour — visible in one row, invisible in the offer
  letter. A remote role at *lower* salary frequently wins; now you
  can see by how much.
- **Buying back time.** The cleaner, the pre-chopped veg, paying
  for the direct train: anything that buys an hour for less than
  `true_rate` is trading down money you value less for time you
  value more. (And anything that *sells* an hour — overtime at
  flat rate after tax — you can now price too. It's often below
  minimum wage; check before saying yes.)
- **The stuff-vs-time converter.** Divide any price by
  `true_rate`: the £940 phone is 100 working hours at the honest
  rate — two and a half weeks of your life. Some purchases survive
  that conversion easily. It's remarkable how many don't.

This model is also the quiet engine under the others: the
[four-number budget](/articles/build-a-uk-budget-that-survives-real-life/)
tells you what the life costs; this tells you what funds it;
and every £100 of monthly spending you trim is, at £9.40 an hour,
**eleven hours a month you no longer have to sell** — the same
lever that shortens
[the pension countdown](/articles/pension-countdown-when-could-you-stop/),
measured in the only currency that's actually scarce.

One honest caution: don't let the number colonise everything.
Time with people you love, work you do for joy — those aren't
priced in this sheet, and converting them is the failure mode.
The rate exists to sharpen *commercial* decisions: what to sell
your hours for, and what to buy them back at.

One division, honestly fed. You've been quoting your price for
years — this is finding out what it actually was.
