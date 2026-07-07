---
title: "SUMIFS and friends: getting answers out of a list"
description: "The three questions every list gets asked — how many, how much, on average — and the one formula pattern that answers all of them."
date: 2026-06-26
domain: formulas
---

Every list in every office eventually gets asked the same three
questions: **how many?** **how much?** and **what's typical?** *How
many orders came from Cork? How much did we sell in March? What's the
average order for the new product line?*

Excel has a whole family of functions for this, but they all share one
pattern. Learn the pattern once and the family comes free.

## The pattern

```
=SUMIFS(sum_range, criteria_range1, criteria1, ...)
```

In words: **add up this column, but only for rows where that column
matches this condition.** Suppose your orders live in a Table with
columns `Region`, `Product` and `Amount`:

```
=SUMIFS(Orders[Amount], Orders[Region], "Cork")
```

*Add up Amount, where Region is Cork.* The siblings work identically:

| Question | Function | Example |
|----------|----------|---------|
| How much? | `SUMIFS` | `=SUMIFS(Orders[Amount], Orders[Region], "Cork")` |
| How many? | `COUNTIFS` | `=COUNTIFS(Orders[Region], "Cork")` |
| What's typical? | `AVERAGEIFS` | `=AVERAGEIFS(Orders[Amount], Orders[Region], "Cork")` |

(`COUNTIFS` has no sum range — it's only counting rows — so its
arguments start straight at the criteria.)

## Stacking conditions

The `S` on the end is the whole point: these functions take as many
condition pairs as you like, and *all* of them must hold. Cork sales
of the Pro model, in March:

```
=SUMIFS(Orders[Amount],
        Orders[Region],  "Cork",
        Orders[Product], "Pro",
        Orders[Date],    ">=" & DATE(2026,3,1),
        Orders[Date],    "<"  & DATE(2026,4,1))
```

Each pair reads as *column, condition*. Line them up like that and the
formula reads like a sentence — which is the standard your future self
will thank you for.

## The criteria mini-language

Conditions are written as text, and they have their own small grammar.
The three shapes worth knowing:

| Shape | Example | Means |
|-------|---------|-------|
| Plain value | `"Cork"` | equals Cork |
| Comparison in quotes | `">=500"` | 500 or more |
| Comparison glued to a cell | `">=" & G1` | at least whatever G1 says |

That third shape — quotes around the operator, `&` to glue on the
value — is the one that trips everyone. `">=G1"` compares against the
letters *G1*; `">=" & G1` compares against its value. When a criteria
formula "doesn't work", check this first.

Wildcards work too: `"Pro*"` matches everything that starts with Pro.

## Dates: always brackets, never guesses

For "all of March", resist typing date strings — they mean different
things on different computers. Bracket the month with `DATE`, exactly
as in the stacked example above: *on or after the 1st of March, and
before the 1st of April*. That pair of conditions is unambiguous
everywhere, handles time-stamps correctly, and works for any month by
changing one number.

## When the answer looks wrong

Ninety percent of "SUMIFS is broken" cases are one of these:

1. **The criteria has a trailing space** — `"Cork "` is not `"Cork"`.
   Data cleaning strikes again; see
   [the 4:45pm routine](/articles/the-445pm-export-cleaning-messy-data/).
2. **The amounts are text-numbers** — a sum of text is zero. If the
   column won't sum in the status bar, fix the column, not the formula.
3. **Ranges of different sizes** — every criteria range must be the
   same height as the sum range. Tables make this mistake impossible,
   which is one more reason they're stage two of
   [the path](/roadmap/).

## Where this leads

Once conditions feel natural, two doors open. `IF` and its family let
single cells make decisions; PivotTables (stage five) answer a *whole
grid* of SUMIFS-style questions at once, with drag and drop. But the
mental model — *this column, where that column matches* — is exactly
the one you've just learned.

Three questions, one pattern. That's most of office analysis, honestly.
