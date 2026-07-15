---
title: "Runway: the emergency-fund number that actually matters"
description: Not "three to six months' salary" — a two-formula Excel model that tells you how long your life could run with the income switched off.
date: 2026-07-15
---

Every personal-finance article says the same thing: *keep three to
six months in an emergency fund.* Almost nobody can say what the
sentence means for them in pounds — three months of *what*? Salary?
Spending? Spending after you've cancelled what you'd cancel in a
crisis?

Pilots have a cleaner word for this: **runway**. How long the
engine can be off before things get serious. It's a division sum,
it's honest, and it fits in a spreadsheet smaller than this
paragraph.

```
runway (months) = accessible cash ÷ essential monthly spend
```

The rest of this guide is making those two numbers true — which is
where the "three to six months of salary" folklore quietly falls
apart.

## Number one: essential monthly spend

Not your income, and not your normal spending — your **crisis
floor**: what one month costs when the income stops and you behave
accordingly. Rent or mortgage, utilities, food, transport, insurance,
minimum debt payments, the subscriptions you'd genuinely keep.

If you built
[the four-number budget](/articles/build-a-uk-budget-that-survives-real-life/),
this is your Bills number plus a slice of Life — one honest
afternoon's work with
[SUMIFS](/articles/sumifs-and-friends-answers-from-a-list/) over
your real transactions. Measured beats estimated: most people's
guess is off by 20% or more, and the direction of the error is never
the flattering one.

The salary version of the folklore fails here. Two people on the
same £2,800 take-home can have crisis floors of £1,400 and £2,600 —
the *same* fund gives one of them nearly twice the runway. Runway is
about your costs, not your worth.

## Number two: accessible cash

Money counts toward runway only if it's **reachable in days without
penalty or loss**: instant-access savings, cash ISAs, the current
account surplus. Not the pension (locked), not the stocks & shares
ISA (a crash and a job loss like to travel together — ask 2008), not
the credit card (that's borrowing with a countdown, not runway).

## The model

Six named cells and you're done — `cash`, `floor`, and:

```
=cash / floor                        → runway_months
=target_months * floor               → target_fund
=MAX(0, target_fund - cash)          → gap
=IF(gap=0, "Funded ✓",
   "£" & TEXT(monthly_saving,"#,##0") & "/mo → " &
   TEXT(gap/monthly_saving,"0.0") & " months to funded")
```

Set `target_months` to taste: three is a floor for steady salaried
work, six if income is variable or one income covers a household,
more if you're contracting or your industry wobbles. The point of
the model is that changing your mind is a one-cell edit.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A runway bar showing months of cover filling toward a six-month target, with the funded gap marked">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .lane{fill:#fff;stroke:#E6E4D9}
    .fill{fill:#0E7A4F;animation:rwfill 5.5s ease-in-out infinite;transform-origin:80px 0}
    .tick{stroke:#E6E4D9;stroke-width:1.2}
    @keyframes rwfill{0%,8%{transform:scaleX(0)}55%,88%{transform:scaleX(1)}100%{transform:scaleX(0)}}
  </style>
  <text x="80" y="30" class="h">runway = cash ÷ crisis floor</text>
  <rect x="80" y="70" width="480" height="52" rx="6" class="lane"/>
  <g class="fill"><rect x="80" y="70" width="300" height="52" rx="6"/></g>
  <line x1="160" y1="62" x2="160" y2="130" class="tick"/><text x="148" y="152" class="t">1m</text>
  <line x1="240" y1="62" x2="240" y2="130" class="tick"/><text x="228" y="152" class="t">2m</text>
  <line x1="320" y1="62" x2="320" y2="130" class="tick"/><text x="308" y="152" class="t">3m</text>
  <line x1="400" y1="62" x2="400" y2="130" class="tick"/><text x="388" y="152" class="t">4m</text>
  <line x1="480" y1="62" x2="480" y2="130" class="tick"/><text x="468" y="152" class="t">5m</text>
  <line x1="560" y1="56" x2="560" y2="136" stroke="#1C2823" stroke-width="2"/>
  <text x="522" y="152" class="h">target 6m</text>
  <text x="80" y="196" class="t">£6,300 cash ÷ £1,680 floor = 3.75 months of engine-off flying</text>
  <text x="80" y="218" class="t">gap to target: £3,780 → at £250/mo, funded in 15 months</text>
</svg>
<figcaption>One bar, marked in months. Watching it fill toward the target line is the entire motivational apparatus — no forty-tab tracker required.</figcaption>
</figure>

## Why months beat pounds

A fund measured in pounds is a number with no feelings attached —
£6,300 is just… an amount. The same fund expressed as *3.75 months
of my actual life* is information your gut can use. It changes both
directions, too:

- **Building:** every £250 saved visibly buys you *days*. The bar
  moves. Progress you can see is progress that continues — the same
  psychology as
  [the compounding gap chart](/articles/compound-growth-isa-tracker-excel/).
- **Spending cuts:** trimming the crisis floor by £100 doesn't just
  save £100 — it makes *every pound already saved* cover more time.
  The denominator is the quiet lever, and it's the same lever that
  shortens
  [the pension countdown](/articles/pension-countdown-when-could-you-stop/).
  A cheaper life needs less rescue and less retirement. One fact,
  two payoffs.

## When (not) to spend it

Last discipline, worth a cell comment in the sheet: the fund is for
**involuntary, income-shaped events** — job loss, the boiler, the
clutch, the emergency flight home. It is not for sales, weddings, or
"it's technically an emergency that the holiday is this cheap".
Spend it on a real one without guilt (that's the job); refill it
before resuming any other saving.

Runway first, then investing. An engine-off glide you've already
measured is what makes every riskier, longer-term number — the ISA,
the pension model, all of it — survivable when real life shows up.

Two numbers, one division, months not pounds. Folklore retired.
