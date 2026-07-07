---
title: "See your money grow: a compound growth tracker in Excel"
description: "Build the chart that changes behaviour — your contributions versus what compounding adds on top — with one small table and three formulas."
date: 2026-06-23
---

There is one chart that changes how people save: the line showing what
*they* put in, and the second line showing what the money became. The
gap between them is compounding — interest earning interest — and no
paragraph about it persuades anyone. The chart does.

Banks won't draw it for you. Excel will, in one small table and three
formulas. *(Arithmetic and spreadsheet craft, not financial advice —
growth rates here are assumptions you choose, not promises.)*

## The engine: one row per year

Start a [Table](/articles/format-as-table-the-feature-that-changes-everything/)
with `Year | Paid in | Value`. Three inputs live above it in named
cells: `monthly` (say £200), `rate` (say 5% a year — your assumption,
be modest), and that's it.

**Paid in** — what you'll have contributed by the end of each year:

```
=monthly * 12 * [@Year]
```

**Value** — last year's value, grown one year, plus this year's
contributions grown roughly half a year (they arrive monthly, so on
average they're invested for six months):

```
=B2 * (1 + rate) + monthly * 12 * (1 + rate/2)
```

Copy down 30 rows. That half-year adjustment is the honest touch most
quick calculators skip, and it's one multiplication.

## The chart that does the arguing

Select the Table, insert a line chart, two series: *Paid in* and
*Value*. Format honestly — start the axis at zero.

<figure class="guide-fig">
<svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Contributions grow in a straight line while value curves upward; the widening gap is compound growth">
  <style>.t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}.h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}.ax{stroke:#E6E4D9;stroke-width:1}.paid{stroke:#8A948D;stroke-width:2.2;fill:none;stroke-dasharray:6 4}.val{stroke:#0E7A4F;stroke-width:2.6;fill:none}.gap{fill:#EAF4EE}</style>
  <line x1="70" y1="20" x2="70" y2="210" class="ax"/>
  <line x1="70" y1="210" x2="620" y2="210" class="ax"/>
  <path d="M70 210 L570 90 L570 38 Q 340 148 70 210 Z" class="gap"/>
  <path d="M70 210 L570 90" class="paid"/>
  <path d="M70 210 Q 340 148 570 38" class="val"/>
  <text x="330" y="235" class="t">years →</text>
  <text x="150" y="62" class="h">the gap = compounding</text>
  <path d="M330 70 q70 8 108 34" fill="none" stroke="#0E7A4F" stroke-width="1.4" marker-end="url(#e)"/>
  <defs><marker id="e" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="500" y="34" class="t" fill="#0A5C3B">Value</text>
  <text x="490" y="140" class="t">Paid in</text>
</svg>
<figcaption>Straight line: your effort. Curve: your effort plus time. The shaded gap needs no caption at the dinner table.</figcaption>
</figure>

Early on, the lines hug — this is why people quit saving in year two.
Around year ten they visibly part, and by year twenty the gap is
often bigger than everything you paid in. Same £200 a month all along;
the only ingredient that changed is *time*. Seeing that curve for your
own numbers is worth more than any finance article, including this one.

## Make it yours

- **Track reality against the plan.** Add an `Actual` column and, once
  a year, type in the real balance from your ISA or pension statement.
  Plan versus reality on one chart is the entire personal-finance
  feedback loop in one picture. (UK note: an ISA's £20,000 annual
  allowance means the tracker doubles as a "room left this year"
  check — one extra SUMIFS if you log contributions in a
  [budget-style Spend table](/articles/build-a-uk-budget-that-survives-real-life/).)
- **Ask "what if" properly.** Because `monthly` and `rate` are named
  input cells, questions cost nothing: £250 instead of £200? 4%
  instead of 5%? Change one cell and the whole curve redraws. That's
  the modelling habit — inputs in named cells, formulas everywhere
  else — that separates a calculator from a toy.
- **Play the sequences.** Duplicate the Value column at 3% and 7% and
  you've drawn a fan of futures: modest, expected, lucky. Planning on
  the middle line while *seeing* the lower one is what "realistic
  assumptions" actually looks like.

## The Excel lesson hiding in the money lesson

Notice what this file is: named inputs, one Table, one recursive
formula, one honest chart. No macros, nothing clever. The most
persuasive spreadsheets are usually the simplest ones pointed at a
question you actually care about — and few questions focus the mind
like *what will my money be doing in 2046?*
