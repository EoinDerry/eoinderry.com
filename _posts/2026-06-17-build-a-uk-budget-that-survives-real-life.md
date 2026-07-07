---
title: "Build a UK budget spreadsheet that survives real life"
description: Not a 40-category template — a four-number budget you'll still be filling in next February, built with Tables and one SUMIFS.
date: 2026-06-17
---

Search "budget spreadsheet" and you'll find templates with forty
categories, colour-coded tabs for each month, and a cell for "gym —
sub-category: swimming". They're lovely. They're also abandoned by
February, because their real cost isn't money — it's *maintenance*.

This guide builds the opposite: a budget with **four numbers**, one
list, and one formula family. It's an Excel lesson wearing a money
costume — everything here comes straight from
[the path](/roadmap/) — and it survives real life because there's
almost nothing to maintain.

*(The usual honesty note: this is arithmetic and spreadsheet craft,
not financial advice.)*

## The four numbers

Every workable budget answers four questions:

| # | Number | Meaning |
|---|--------|---------|
| 1 | **In** | what lands in the account each month |
| 2 | **Fixed** | what leaves whether you like it or not — rent/mortgage, council tax, energy, insurance, subscriptions |
| 3 | **Flexible** | what you actually spent on living — food, fuel, fun |
| 4 | **Future** | what moved to savings, ISA, pension top-ups, overpayments |

If **In − Fixed − Flexible − Future ≈ 0**, you understand your month.
That's the whole game. Categories beyond that are decoration — add
them later if the data earns it.

<figure class="guide-fig">
<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Income flowing into fixed, flexible and future pots">
  <style>.t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}.h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}.box{fill:#fff;stroke:#E6E4D9;rx:10}.acc{fill:#EAF4EE;stroke:#0E7A4F}.ar{stroke:#0E7A4F;stroke-width:1.8;fill:none;marker-end:url(#d)}.b{font:600 13px 'IBM Plex Mono',monospace;fill:#0A5C3B}</style>
  <defs><marker id="d" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <rect x="40" y="85" width="150" height="56" rx="10" class="acc"/>
  <text x="58" y="110" class="b">IN</text><text x="58" y="130" class="t">£2,400</text>
  <path d="M200 96 q60 -50 130 -26" class="ar"/>
  <path d="M200 113 h130" class="ar"/>
  <path d="M200 130 q60 50 130 26" class="ar"/>
  <rect x="345" y="30" width="180" height="50" rx="10" class="box"/>
  <text x="360" y="52" class="h">FIXED</text><text x="360" y="70" class="t">£1,310 · leaves anyway</text>
  <rect x="345" y="90" width="180" height="50" rx="10" class="box"/>
  <text x="360" y="112" class="h">FLEXIBLE</text><text x="360" y="130" class="t">£640 · the living</text>
  <rect x="345" y="150" width="180" height="50" rx="10" class="box"/>
  <text x="360" y="172" class="h">FUTURE</text><text x="360" y="190" class="t">£450 · pays you later</text>
  <text x="40" y="205" class="t">In − Fixed − Flexible − Future ≈ 0 → you understand the month</text>
</svg>
<figcaption>Four numbers. If they reconcile, the budget is doing its one job.</figcaption>
</figure>

## The build (20 minutes, honestly)

**Sheet 1 — `Spend`.** One [Table](/articles/format-as-table-the-feature-that-changes-everything/),
four columns: `Date | What | Pot | Amount`. `Pot` gets a
[drop-down](/articles/drop-down-lists-data-validation/) allowing
exactly three values: Fixed, Flexible, Future. Entering a line takes
ten seconds, and the drop-down means totals can never be derailed by
a typo.

**Sheet 2 — `Month`.** The four numbers:

```
=SUMIFS(Spend[Amount], Spend[Pot], "Fixed",
        Spend[Date], ">=" & $B$1,
        Spend[Date], "<"  & EDATE($B$1, 1))
```

…where `B1` holds the first of the month. Copy the pattern for
Flexible and Future, type your income above, subtract. (Every piece
of that formula — the criteria pairs, the date brackets, the pinned
`$B$1` — is covered in the
[SUMIFS guide](/articles/sumifs-and-friends-answers-from-a-list/) and
the [$ sign guide](/articles/the-dollar-sign-cell-references-explained/).
This is where the path pays rent.)

**That's the entire system.** No tab-per-month: months are just a
filter on one long Table — which means next January you do *nothing*
except keep typing rows.

## Making it survive

- **Fill in weekly, not daily.** Ten minutes on a Sunday with your
  banking app open. Daily budgeting is how February happens.
- **Don't chase pennies.** If the reconciliation lands within £20,
  you understand your month; move on. Precision is the enemy of
  persistence.
- **Watch the ratio, not the total.** The interesting number over
  time is Future ÷ In — the share of the month that's working for the
  later you. Even seeing it hover at 5% is knowledge most people
  never have.
- **Let categories *emerge*.** After three months, a PivotTable on
  the `What` column (
  [you know how now](/articles/pivottables-from-first-principles/))
  will tell you if a real category deserves splitting out of
  Flexible. Data first, categories second — the opposite of the
  40-category template.

The spreadsheet isn't the point. The point is that four numbers,
honestly kept, beat forty categories abandoned — in budgets and, as
it happens, in most things Excel touches.
