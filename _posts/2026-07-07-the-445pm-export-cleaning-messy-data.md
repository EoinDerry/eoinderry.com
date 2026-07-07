---
title: "The 4:45pm export: cleaning messy data without tears"
description: A calm, repeatable routine for the file that lands in your inbox at the worst possible moment — trailing spaces, text-numbers, mangled dates and all.
date: 2026-07-07
domain: working-with-data
---

It's 4:45pm. Someone has exported "the figures" from a system with a
name like an alarm code, and now it's your problem. The names are in
three different cases, half the numbers won't add up, and the dates
are… decorative.

Here's the thing nobody tells you: **cleaning data is a routine, not a
talent.** The mess varies; the fixes barely do. This guide is the
routine I use every time, in order, so that a horrible export becomes a
ten-minute job instead of an evening.

## Rule zero: never work on the original

Before anything else, save a copy. `File → Save As`, add `-working` to
the name. When (not if) a cleaning step goes sideways, you want the
untouched original one click away — not a prayer to the undo stack.

While you're at it, turn the data into a proper Table (`Ctrl+T`).
Tables keep your formulas honest while rows move and shrink beneath
them, which is exactly what happens during a clean-up.

## Step 1: hunt the invisible spaces

The most common reason two "identical" values don't match is that one
of them isn't what it looks like. `"Dublin "` is not `"Dublin"`.
Imported data is full of trailing spaces, doubled spaces, and — from
web systems especially — the *non-breaking* space, which looks like a
space but isn't one.

The classic fix, in a helper column:

```
=TRIM(CLEAN(A2))
```

`TRIM` removes leading, trailing and doubled spaces. `CLEAN` strips
non-printing characters. For the sneaky non-breaking space (character
160), add a substitution:

```
=TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), " ")))
```

That one line has rescued more of my afternoons than any other formula
in Excel.

## Step 2: fix the casing

`niamh BYRNE` and `SEAN o'brien` want to be `Niamh Byrne` and
`Sean O'Brien`. Three functions cover it:

| You want | Use | Result |
|----------|-----|--------|
| Every Word Capitalised | `=PROPER(A2)` | Niamh Byrne |
| ALL CAPS | `=UPPER(A2)` | NIAMH BYRNE |
| all lower | `=LOWER(A2)` | niamh byrne |

`PROPER` isn't perfect — it produces `O'brien` and `Mcdonald` — but it
does 95% of the work, and the exceptions are easy to spot once
everything else is consistent.

## Step 3: numbers that refuse to be numbers

If a column of "numbers" won't sum, they're almost certainly **text
that looks like numbers**. The tell-tale signs: they line up on the
left of the cell, and the status bar shows a *Count* but no *Sum* when
you select them.

The fastest fix is the paste-special multiply trick:

1. Type `1` in any empty cell and copy it.
2. Select the stubborn column.
3. `Paste Special → Multiply → OK`.

Multiplying by 1 forces Excel to evaluate each entry as a number, and
text-numbers snap back to real ones. Delete your `1` and watch the
column sum again. (The formula equivalent is `=VALUE(A2)`, or the
quiet double-negative `=--A2` you'll see in the wild.)

## Step 4: dates that are secretly text

Dates are just numbers wearing a costume — day counts since 1 January
1900. When an export gives you `07/03/2026` as *text*, sorting breaks,
month grouping breaks, and everything downstream inherits the damage.

The multiply trick from step 3 often fixes these too. When it doesn't,
`Text to Columns` is the reliable workhorse:

1. Select the column, then `Data → Text to Columns`.
2. Click through to step 3 of the wizard.
3. Choose **Date** and tell Excel the *incoming* order (DMY, MDY…).
4. Finish.

That last setting matters: you're telling Excel how to *read* what
arrived, not how you want it displayed. Displaying it is just a number
format afterwards.

## Step 5: deal with duplicates — carefully

`Data → Remove Duplicates` is quick, and quick is dangerous. Before
you use it, ask: duplicates *of what*? Two rows with the same name
might be two genuinely different orders.

The safer routine: add a helper column that counts each key first —

```
=COUNTIFS(B:B, B2, D:D, D2)
```

— filter for counts greater than 1, and *look at them*. Delete with
your eyes open, not on faith. (Remove Duplicates keeps the first row
it finds and silently deletes the rest — it never asks which one you
meant to keep.)

## The routine, on a card

> 1. Copy the file; make it a Table.
> 2. `TRIM(CLEAN(…))` the text columns.
> 3. `PROPER` / `UPPER` the casing.
> 4. Multiply-by-1 the fake numbers.
> 5. Text to Columns the fake dates.
> 6. Count duplicates before removing them.

Six steps, same order, every time. The export that used to eat your
evening becomes a checklist — and a checklist you'll eventually
automate away entirely with Power Query, which is a later stage of
[the path](/roadmap/).

The data doesn't get less messy. You just stop being afraid of it.
