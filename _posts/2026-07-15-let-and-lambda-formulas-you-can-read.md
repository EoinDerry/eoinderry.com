---
title: "LET and LAMBDA: formulas you can read"
description: The two functions that turned Excel formulas from one-liners into legible, reusable logic — name your steps, then name the whole recipe.
date: 2026-07-15
domain: power-tools
---

There is a moment in every improver's life when a formula crosses
the line from *long* to *illegible* — usually the third time the
same `XLOOKUP` appears inside its own error check. For decades the
only options were "live with it" or "helper columns". Both are
honourable. But modern Excel added a third: **name things**.

`LET` names the steps inside one formula. `LAMBDA` names the whole
formula so anyone can reuse it. Together they're the difference
between formulas you decode and formulas you *read* — and they're
easier than their reputations suggest.

## LET: name your steps

The classic mess — a lookup you need to test, trim and reuse:

```
=IF(XLOOKUP(TRIM(A2),Prices[SKU],Prices[GBP])="", 0,
    XLOOKUP(TRIM(A2),Prices[SKU],Prices[GBP]) * (1+VAT))
```

The same lookup, written twice; the logic, buried. With `LET`, you
declare *name, value* pairs, then one final expression that uses
them:

```
=LET(
  sku,    TRIM(A2),
  price,  XLOOKUP(sku, Prices[SKU], Prices[GBP]),
  IF(price="", 0, price * (1+VAT))
)
```

Read it top to bottom: *here's the cleaned key; here's its price;
if there's no price, zero, otherwise price plus VAT.* The steps
have names, the lookup runs **once** (faster, on big sheets
noticeably), and next February you'll understand it in one pass.

That's the entire function. Pairs of name-then-value, final answer
last. It's [the naming instinct](/articles/the-dollar-sign-cell-references-explained/)
— `vat_rate` beating `$E$1` — applied *inside* the formula.

## LAMBDA: name the whole recipe

`LET` tidies one cell. `LAMBDA` goes further: it wraps logic into
a **function with your name on it**, usable anywhere in the
workbook.

Say three different sheets compute a runway:
`=IF(floor=0, 0, ROUND(cash/floor, 1))`. Wrap it once:

```
=LAMBDA(cash, floor, IF(floor=0, 0, ROUND(cash/floor, 1)))
```

Then `Formulas → Name Manager → New`, name it `RUNWAY`, paste that
as the definition — and every sheet can now write:

```
=RUNWAY(B2, C2)
```

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sprawling repeated formula collapses into a short named function call">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .mess{animation:lfade 6s ease-in-out infinite}
    .clean{animation:lshow 6s ease-in-out infinite}
    @keyframes lfade{0%,30%{opacity:1}50%,85%{opacity:0.18}100%{opacity:1}}
    @keyframes lshow{0%,30%{opacity:0}50%,85%{opacity:1}100%{opacity:0}}
  </style>
  <g class="mess">
    <rect x="50" y="40" width="560" height="34" class="g"/>
    <text x="62" y="62" class="t">=IF(XLOOKUP(TRIM(A2),P[SKU],P[GBP])="",0,XLOOKUP(TRIM(A2),…</text>
    <rect x="50" y="78" width="560" height="34" class="g"/>
    <text x="62" y="100" class="t">=IF(XLOOKUP(TRIM(A3),P[SKU],P[GBP])="",0,XLOOKUP(TRIM(A3),…</text>
    <rect x="50" y="116" width="560" height="34" class="g"/>
    <text x="62" y="138" class="t">=IF(XLOOKUP(TRIM(A4),P[SKU],P[GBP])="",0,XLOOKUP(TRIM(A4),…</text>
  </g>
  <g class="clean">
    <rect x="50" y="40" width="260" height="34" class="acc"/>
    <text x="62" y="62" class="h">=PRICE_INC_VAT(A2)</text>
    <rect x="50" y="78" width="260" height="34" class="acc"/>
    <text x="62" y="100" class="h">=PRICE_INC_VAT(A3)</text>
    <rect x="50" y="116" width="260" height="34" class="acc"/>
    <text x="62" y="138" class="h">=PRICE_INC_VAT(A4)</text>
    <text x="340" y="100" class="t">← the logic lives once,</text>
    <text x="352" y="120" class="t">in the Name Manager</text>
  </g>
  <text x="50" y="196" class="t">same workbook, same answers — but now the formula says what it does,</text>
  <text x="50" y="216" class="t">and fixing the VAT logic means editing ONE definition</text>
</svg>
<figcaption>Before and after LAMBDA. The sprawl doesn't just look better — it has one home, one fix, and a name a colleague can search for.</figcaption>
</figure>

The payoff is the same one software people discovered decades ago:
**logic that exists once can only be wrong once.** When the VAT
treatment changes, you edit one definition and every cell using
`PRICE_INC_VAT` is correct — versus hunting seventy pasted copies,
of which you'll find sixty-eight.

## The workflow that makes LAMBDA humane

Nobody writes a `LAMBDA` cold inside the cramped Name Manager box.
The civilised route:

1. Build the logic **as a `LET`** in a spare cell, with test inputs
   pointing at real cells. Debug it where you can see it.
2. When it's right, wrap it: change the outer `LET` variables that
   were inputs into `LAMBDA` parameters.
3. Test in-sheet — a `LAMBDA` can be called inline while you check
   it: `=LAMBDA(x,y,…)(B2,C2)`.
4. *Then* paste into Name Manager, name it in CAPS (so it reads
   like a built-in), and add the comment field saying what it does.

Delete the scaffolding cell and the workbook now has a custom
function with no VBA, no macros, no security warnings — it travels
inside the file like any formula.

## Where the boundaries are

Honest edges, as ever. If a `LET` has a dozen steps, the logic
probably wants to be **columns** — helper columns are still the
most auditable structure in Excel, because you can *see* every
intermediate value ([the clever-cell rule](/articles/if-ifs-nested-logic-done-cleanly/)
hasn't been repealed). If the job is reshaping whole datasets, it
wants [Power Query](/articles/power-query-combine-monthly-files/),
not a heroic formula. And `LAMBDA`'s companion functions — `MAP`,
`BYROW`, `REDUCE` — are genuinely powerful and genuinely a rabbit
hole; meet them *after* the basics have paid rent.

`LET` and `LAMBDA` sit at the far end of [the path](/roadmap/), but
the idea they carry is the whole path in miniature: every stage —
[Tables](/articles/format-as-table-the-feature-that-changes-everything/),
named ranges, [readable lookups](/articles/xlookup-the-lookup-to-learn-first/)
— has been about replacing *cryptic* with *named*. This is just the
same kindness, extended to your logic.

Name the steps. Then name the recipe. Future-you sends thanks.
