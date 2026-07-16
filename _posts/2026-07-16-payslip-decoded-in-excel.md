---
title: "The payslip, decoded: rebuild yours in Excel"
description: Tax bands, National Insurance, pension relief — one small spreadsheet that explains every line of a UK payslip, and finally answers why the raise felt smaller than promised.
date: 2026-07-16
---

Most people's payslip is a monthly mystery they've agreed not to
investigate. Gross at the top, a smaller number at the bottom,
and between them a set of deductions taken on faith. Which means
most people can't answer basic questions about their own money:
what does a £2,000 raise actually pay? What does upping the
pension *really* cost per month?

A payslip is arithmetic, the arithmetic is banded, and banded
arithmetic is [exactly what Excel is for](/articles/if-ifs-nested-logic-done-cleanly/).
One evening builds a model that answers those questions for good.

*Honesty first: rates and thresholds change at Budgets, and this
guide deliberately teaches the machine, not this year's numbers —
build with the current figures from gov.uk beside you. Personal
quirks (student loans, benefits in kind, Scottish bands, tax
codes that aren't standard) are extra rows on the same skeleton.*

## The machine: marginal bands

The single most misunderstood fact in UK money: **tax bands are
marginal.** Crossing into the 40% band does not tax your whole
salary at 40% — it taxes *the slice above the threshold* at 40%.
Nobody has ever been made poorer by a raise (the folk belief to
the contrary has cost people real money in refused overtime).

Marginal maths in Excel is a small stack of `MAX` slices. With
named cells for the thresholds and rates
([names, always](/articles/named-ranges-formulas-read-like-sentences/)):

```
taxable   = MAX(0, salary - allowance)
basic_tax = MIN(taxable, basic_width) * basic_rate
higher_tax= MAX(0, taxable - basic_width) * higher_rate
```

…and so on if a band above applies. Each line is one slice of
income meeting one rate — readable, checkable, and exactly how
the real calculation works. National Insurance is the same
machine with its own thresholds and rates: build it as a second
small block, not by copying the tax block and hoping.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A salary bar filling through the personal allowance, basic and higher bands, each slice taxed only at its own rate">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .free{fill:#EAF4EE;stroke:#0E7A4F}
    .basic{fill:#9CC8B0;stroke:#0E7A4F}
    .higher{fill:#0E7A4F;stroke:#0A5C3B}
    .lane{fill:#fff;stroke:#E6E4D9}
    .fill{animation:psfill 6s ease-out infinite;transform-origin:70px 0}
    @keyframes psfill{0%,8%{transform:scaleX(0)}60%,92%{transform:scaleX(1)}100%{transform:scaleX(0)}}
    .tick{stroke:#8A948D;stroke-width:1.2;stroke-dasharray:3 3}
  </style>
  <text x="70" y="30" class="h">one salary, three slices — each taxed at ITS OWN rate</text>
  <rect x="70" y="60" width="520" height="56" rx="6" class="lane"/>
  <g class="fill">
    <rect x="70" y="60" width="140" height="56" class="free"/>
    <rect x="210" y="60" width="260" height="56" class="basic"/>
    <rect x="470" y="60" width="120" height="56" class="higher"/>
  </g>
  <line x1="210" y1="52" x2="210" y2="130" class="tick"/>
  <line x1="470" y1="52" x2="470" y2="130" class="tick"/>
  <text x="92" y="92" class="t">0%</text>
  <text x="316" y="92" class="t">20%</text>
  <text x="500" y="92" class="t" fill="#fff">40%</text>
  <text x="76" y="152" class="t">allowance</text>
  <text x="290" y="152" class="t">basic band</text>
  <text x="478" y="152" class="t">the slice above</text>
  <text x="70" y="196" class="h">crossing a line taxes the NEW SLICE only —</text>
  <text x="70" y="218" class="t">a raise is never a pay cut; the folk belief has refused real overtime</text>
</svg>
<figcaption>The bar fills left to right; each segment pays only its own rate. Marginal bands in one picture — the fact that untangles every payslip question.</figcaption>
</figure>

## Assemble the payslip

With both blocks built, the payslip is four rows:

```
pension    = salary * pension_pct
take_home  = salary - pension - income_tax - ni
monthly    = take_home / 12
```

Order matters, and it's where the model starts paying rent:
pension contributions (salary-sacrifice or net-pay arrangements)
come out **before** the tax maths sees your income. Which
produces the model's first revelation: raise your pension by
£100/month and take-home falls by only £60–72 — the state quietly
funds the rest. That number — *your* number, at *your* marginal
rate — is the strongest argument in
[the countdown model's](/articles/pension-countdown-when-could-you-stop/)
favour, and most people have never seen it calculated.

Then interrogate it, the way you now interrogate everything:

- **The raise question.** `salary` +£2,000 → watch `monthly`. At
  the basic rate roughly £113/month arrives; higher rate, ~£97.
  Real numbers end both the cynicism ("hardly worth it" — it is)
  and the fantasy ("£166 a month!" — it isn't).
- **The cliff edges.** The one place "will a raise cost me?" has
  substance isn't the bands — it's withdrawal tapers around
  specific thresholds (personal allowance taper, child benefit
  clawback, childcare eligibility). If your salary sits near one,
  model your specific situation — this is also where
  professional advice earns its fee.
- **The reconciliation.** Put your *actual* payslip beside the
  model. Within [a rounding whisker](/articles/round-and-the-missing-penny/)?
  You understand your pay. A gap? Now you know what question to
  ask payroll — by name, with a number.

The general lesson is the one this whole
[field-notes series](/articles/build-a-uk-budget-that-survives-real-life/)
keeps landing on: systems that take your money arrive looking
like faits accomplis, and a small model turns them back into
arithmetic you can question. The payslip is the one you receive
twelve times a year — decode it once, and every Budget-day
headline for the rest of your life is just new numbers for cells
you already own.
