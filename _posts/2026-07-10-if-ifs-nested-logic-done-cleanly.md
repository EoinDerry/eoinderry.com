---
title: "IF, IFS and nested logic, done cleanly"
description: Conditions are where formulas start to think — and where formulas start to sprawl. The habits that keep decision logic readable.
date: 2026-07-10
domain: formulas
---

`IF` is the first formula that makes Excel feel less like a
calculator and more like a colleague — *if the invoice is overdue,
say so; otherwise leave it alone.* It's also the first formula that
grows out of control, because nesting is easy and stopping is hard.
Everyone has opened a workbook containing an eleven-deep `IF` tower
that one person understood, once, in 2019.

This guide is the version where your logic stays readable — to
colleagues, and to you in six months.

## The shape of IF

```
=IF(test, value_if_true, value_if_false)
```

Read it as a sentence: *if this is true, give me that; otherwise,
give me the other thing.*

```
=IF([@Due] < TODAY(), "Overdue", "OK")
```

The test can compare anything — numbers, dates, text — and the two
outcomes can be text, numbers, or whole formulas of their own. Three
arguments, one decision. Kept to one decision, `IF` never hurts
anybody.

## Two conditions: AND and OR, not nesting

The first sprawl happens when people need two conditions and reach
for a second `IF`. Don't — combine the tests instead:

```
=IF(AND([@Due] < TODAY(), [@Paid] = "No"), "Chase", "OK")
```

`AND(…)` is true when *every* test inside it passes; `OR(…)` when
*any* does. One `IF`, one readable sentence: "chase it if it's
overdue *and* unpaid." Nesting a second `IF` produces the same
answer and half the clarity.

## Ladders: this is what IFS is for

The other classic is the *ladder* — grading, banding, tiering:

```
=IF(A2>=90,"A",IF(A2>=80,"B",IF(A2>=70,"C",IF(A2>=60,"D","F"))))
```

It works, but it's a staircase you read with your finger on the
screen. Modern Excel has `IFS`, which is the same ladder laid flat —
test, result, test, result:

```
=IFS(A2>=90,"A", A2>=80,"B", A2>=70,"C", A2>=60,"D", TRUE,"F")
```

Two things to know. **Order matters** — `IFS` returns the first test
that passes, so ladders go top-down (or bottom-up, consistently).
And there's no built-in "otherwise", so the final `TRUE, "F"` pair is
the idiom for a catch-all. Miss it and unmatched values return
`#N/A`.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A value travels down an IFS ladder and stops at the first test that passes">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .win{fill:#EAF4EE;stroke:#0E7A4F}
    .ball{fill:#0E7A4F;animation:ifsdrop 4.5s ease-in-out infinite}
    @keyframes ifsdrop{0%,10%{transform:translateY(0);opacity:1}30%{transform:translateY(52px)}55%,80%{transform:translateY(104px);opacity:1}95%,100%{transform:translateY(104px);opacity:0}}
  </style>
  <text x="60" y="26" class="h">A2 = 74 falls through the ladder…</text>
  <rect x="150" y="44" width="260" height="40" class="g"/><text x="164" y="69" class="t">A2 &gt;= 90 → "A"   ✗ keep falling</text>
  <rect x="150" y="96" width="260" height="40" class="g"/><text x="164" y="121" class="t">A2 &gt;= 80 → "B"   ✗ keep falling</text>
  <rect x="150" y="148" width="260" height="40" class="win"/><text x="164" y="173" class="h">A2 &gt;= 70 → "C"   ✓ stop here</text>
  <rect x="150" y="200" width="260" height="34" class="g" opacity="0.55"/><text x="164" y="222" class="t">A2 &gt;= 60 → "D"   never tested</text>
  <circle cx="110" cy="64" r="8" class="ball"/>
  <text x="440" y="171" class="h">= "C"</text>
  <text x="440" y="195" class="t">first pass wins —</text>
  <text x="440" y="213" class="t">order is the logic</text>
</svg>
<figcaption>IFS returns the first test that passes and never looks at the rest. Get the ladder in order and the formula is the documentation.</figcaption>
</figure>

## When the ladder should be a table instead

Here's the senior-person move. If your bands have more than four or
five rungs — commission tiers, postage brackets, tax bands — the
logic doesn't belong in a formula at all. It belongs in a small
**lookup table** on the sheet, where anyone can see and change it:

```
=XLOOKUP(A2, Bands[Threshold], Bands[Grade], , -1)
```

That last `-1` means "exact match or next smaller" — exactly what
banding needs. When the thresholds change (they always change),
someone edits a *table*, not a formula copied down 8,000 rows. The
logic becomes data. This is the same instinct as
[XLOOKUP replacing folklore](/articles/xlookup-the-lookup-to-learn-first/):
put the moving parts where people can see them.

## Keeping the true/false paths honest

Three small habits that keep conditional formulas trustworthy:

1. **Return real values, not formatting.** `"Overdue"` in a cell can
   be counted with `COUNTIF` and summed with
   [SUMIFS](/articles/sumifs-and-friends-answers-from-a-list/);
   a red fill can't. Compute the status, then let conditional
   formatting *display* it.
2. **Never bury numbers in the logic.** `=IF(A2>0.15, …)` hides the
   15% where nobody will find it. Put the threshold in a cell, name
   it, and write `=IF(A2>margin_floor, …)` — the
   [$-pinning idea](/articles/the-dollar-sign-cell-references-explained/)
   applied to decisions.
3. **If you're past three levels deep, stop.** Either `IFS` flattens
   it, a lookup table replaces it, or — honestly — the logic wants a
   helper column. Two readable columns beat one clever cell every
   single time. Nobody audits a clever cell.

## Where this sits

Conditions are stage three of [the path](/roadmap/) — the hinge
between "Excel stores my numbers" and "Excel answers my questions."
Learn the one-decision `IF`, flatten ladders with `IFS`, promote real
rule-sets to tables, and your logic will survive contact with other
people.

The test of a good formula isn't whether it works. It's whether the
next person can tell *why*.
