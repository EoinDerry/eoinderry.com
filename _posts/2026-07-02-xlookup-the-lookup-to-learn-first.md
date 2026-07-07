---
title: "XLOOKUP: the lookup you should learn first"
description: Forget the folklore around VLOOKUP — modern Excel has one lookup function that's easier to learn, harder to break, and built for real work.
date: 2026-07-02
domain: lookups
---

Lookups are the moment Excel stops being a calculator and becomes a
database — *"for this order, fetch the customer's region from the other
table."* They're also where most people's confidence goes to die,
because for twenty-five years the answer was `VLOOKUP`, and `VLOOKUP`
is a function with a temper.

If you're learning today, skip the folklore. Learn `XLOOKUP` first.

## The shape of it

```
=XLOOKUP(lookup_value, lookup_array, return_array)
```

In words: **find this, in that column, and give me back the matching
thing from this other column.**

Say sheet `Orders` has customer IDs in column B, and sheet `Customers`
has IDs in column A and regions in column C:

```
=XLOOKUP(B2, Customers!A:A, Customers!C:C)
```

Read it aloud: *find B2 in the customers' ID column, return what's in
the region column.* That's the whole mental model. No counting columns,
no mysterious `FALSE` at the end, no silent catastrophes when someone
inserts a column.

## Why not VLOOKUP?

You'll still meet `VLOOKUP` — in old workbooks, old tutorials, and
offices where it's passed down like a family recipe. It works, but it
has three habits that hurt beginners:

| VLOOKUP habit | What it costs you |
|---------------|-------------------|
| Counts columns by number ("return column 7") | Someone inserts a column and every lookup quietly returns the wrong thing |
| Defaults to *approximate* match | Missing values return plausible-looking nonsense instead of an error |
| Only looks to the right | If the ID column isn't leftmost, you're restructuring your data to please a formula |

`XLOOKUP` fixes all three: it points at columns by *reference*, it
defaults to **exact match**, and it will happily look left, right, or
on another sheet entirely.

## The fourth argument is the polite one

Real data has gaps. When `XLOOKUP` can't find a value, it returns
`#N/A` — correct, but ugly in a report. The optional fourth argument
is a built-in "if not found":

```
=XLOOKUP(B2, Customers!A:A, Customers!C:C, "Unknown")
```

No wrapper function needed. (With `VLOOKUP` you'd be nesting it inside
`IFERROR` and hoping.)

One honest warning: don't use `"Unknown"` to *hide* problems. If a
lookup is failing, the interesting question is why — usually a trailing
space or a text-number, which is exactly what
[the cleaning routine](/articles/the-445pm-export-cleaning-messy-data/)
is for.

## Two lookups at once

Here's where it gets quietly powerful. Because each `XLOOKUP` returns
a *range*, you can point one at the answer of another. A two-way
lookup — find the row for a product, then the column for a month —
is just:

```
=XLOOKUP(A2, Products, XLOOKUP(B2, Months, DataGrid))
```

The inner lookup picks the column; the outer one picks the row within
it. The day you write your first one of these is the day the "power
user" label starts to fit.

## When you inherit VLOOKUP anyway

You will. When it happens, remember the translation:

```
=VLOOKUP(B2, Customers!A:C, 3, FALSE)
```

means

```
=XLOOKUP(B2, Customers!A:A, Customers!C:C)
```

Same result, fewer traps. You don't need to rewrite every old workbook
you meet — but write the new ones with the better tool.

## Where this sits on the path

Lookups are stage four of [the path](/roadmap/) for a reason: they
assume clean data (stage two) and comfortable formula habits (stage
three). If `XLOOKUP` keeps "not finding" things you can plainly see,
it's almost never the lookup — it's a space, a case, or a text-number
in one of the two columns. Clean first, then look up.

One function, one mental model, no folklore. Learn it once and it
stays learned.
