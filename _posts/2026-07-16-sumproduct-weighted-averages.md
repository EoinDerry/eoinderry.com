---
title: "SUMPRODUCT and the weighted average"
description: The average that respects size — why AVERAGE lies about blended rates, and the one function that multiplies-then-adds its way to the true answer.
date: 2026-07-16
domain: formulas
---

Here's a wrong number that ships in reports every day. Three
products: one sells 10 units at 90% margin, two sell 5,000
units each at 12%. "Average margin: 38%" — says
[`AVERAGE`](/articles/sum-average-count-basics-done-properly/),
and it's not lying about what it did: it averaged three numbers.
It's lying about the *business*, where margin lives on ten
thousand real units, almost all of them at 12%. The true
blended margin is about 12.1%.

The disease has one name — **averaging things that carry
different weights** — and one cure: the weighted average, whose
whole machine in Excel is a single elegant function.

## SUMPRODUCT: multiply pairs, then add

```
=SUMPRODUCT(Units, Margin) / SUM(Units)
```

`SUMPRODUCT` walks two ranges in parallel, multiplies each pair,
and sums the results — `10×90% + 5,000×12% + 5,000×12%` — which
is precisely "total margin earned". Divide by total units, and
every unit votes once, instead of every *row* voting once.
That's the entire idea: **AVERAGE gives each row a vote;
weighted averages give each unit a vote.**

Where the disease appears, the same one-liner cures it: blended
interest across accounts of different sizes (weight by
balance), average class score across groups of different sizes
(weight by headcount), portfolio return (weight by holding),
[average margin by region](/articles/percentages-without-panic/)
— the percentages lesson warned you never to average
percentages with different bases; this is the machine that
does it right.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three margin values shown as equal votes under AVERAGE versus sized by their units under SUMPRODUCT, landing on very different answers">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .eq{fill:#F6E7E2;stroke:#C0392B}
    .wt{fill:#EAF4EE;stroke:#0E7A4F}
    .p1{animation:swpop 5.5s ease-out infinite}
    .p2{animation:swpop 5.5s ease-out infinite;animation-delay:0.3s}
    .p3{animation:swpop 5.5s ease-out infinite;animation-delay:0.6s}
    @keyframes swpop{0%,10%{opacity:0;transform:translateY(8px)}25%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">AVERAGE — every row votes equally</text>
  <g class="p1"><rect x="60" y="40" width="70" height="46" class="eq"/><text x="74" y="68" class="t">90%</text></g>
  <g class="p2"><rect x="140" y="40" width="70" height="46" class="eq"/><text x="154" y="68" class="t">12%</text></g>
  <g class="p3"><rect x="220" y="40" width="70" height="46" class="eq"/><text x="234" y="68" class="t">12%</text></g>
  <text x="320" y="68" class="h" fill="#C0392B">→ "38%"</text>
  <text x="60" y="130" class="h">SUMPRODUCT — every unit votes</text>
  <g class="p1"><rect x="60" y="144" width="14" height="46" class="wt"/><text x="58" y="212" class="t">10 @90%</text></g>
  <g class="p2"><rect x="84" y="144" width="240" height="46" class="wt"/><text x="150" y="172" class="t">5,000 @12%</text></g>
  <g class="p3"><rect x="334" y="144" width="240" height="46" class="wt"/><text x="400" y="172" class="t">5,000 @12%</text></g>
  <text x="404" y="212" class="h" fill="#0A5C3B">→ 12.1% — the truth</text>
</svg>
<figcaption>Same three rows, two elections. The top one gives a ten-unit product a third of the say; the bottom one sizes every vote — and the answer moves by 26 points.</figcaption>
</figure>

## The second life: conditions as arithmetic

SUMPRODUCT has a folkloric second career worth understanding,
because you'll inherit it. Before
[SUMIFS](/articles/sumifs-and-friends-answers-from-a-list/)
existed, conditional sums were written as:

```
=SUMPRODUCT((Region="North") * (Year=2026) * Amount)
```

The trick: comparisons produce TRUE/FALSE, arithmetic treats
them as 1/0, so multiplying by a condition *zeroes out the
non-matching rows*. It still works, and it still does the few
things SUMIFS can't (OR-logic with `+`, calculations inside the
condition). But the modern rule of thumb: **SUMIFS for
criteria, SUMPRODUCT for weights** — and when you meet the old
incantation in an inherited workbook, you now
[read it as arithmetic](/articles/index-and-match-for-full-control/),
not magic.

## The two honesty checks

**Weights must be the real quantity.** Weighting margin by
*revenue* answers a different question than weighting by
*units* — sometimes each is right; decide which question you're
answering before choosing the column, and label the result
("unit-weighted margin"). An unlabelled weighted average invites
[the percentage-points argument's](/articles/percentages-without-panic/)
cousin: two people, both correct, about different questions.

**Blanks are zero-weight rows, not missing ones.** SUMPRODUCT
happily multiplies a blank as zero — a row with units but no
margin contributes nothing to the top *and* full weight to the
bottom, silently dragging the answer down. The
[checks-row instinct](/articles/the-checks-row-self-testing-spreadsheets/)
applies: `COUNTBLANK` the margin column before trusting the
blend, and decide what a gap
[actually means](/articles/sum-average-count-basics-done-properly/).

One multiply-then-add, one division, one labelled answer. The
average that respects size — and the end of the 38% that never
existed.
