---
title: "Text surgery: TEXTBEFORE, TEXTAFTER and TEXTSPLIT"
description: Half of your "data" is text that needs taking apart — names, codes, addresses. Modern Excel finally made it read like what you mean.
date: 2026-07-15
domain: formulas
---

A surprising amount of spreadsheet work is not arithmetic at all —
it's surgery on text. The export gives you `SMITH, John - HR` and
the report needs three columns. The product code `UK-2024-0173`
contains the year, if only you could get it out. Every generation
of Excel users has learned to do this; only the current one gets
to do it without pain.

The old way was `LEFT`, `RIGHT`, `MID` and `FIND` nested into
formulas that looked like modem noise:

```
=MID(A2, FIND(",", A2)+2, FIND(" - ", A2)-FIND(",", A2)-2)
```

That extracts the first name. Obviously. Modern Excel (365) replaced
the whole genre with three functions that say what they mean.

## TEXTBEFORE and TEXTAFTER

```
=TEXTBEFORE(A2, ",")      → SMITH
=TEXTAFTER(A2, " - ")     → HR
```

Read them aloud and they're already documented: *the text before
the comma; the text after the dash.* The delimiter can be any
string, and the pieces compose — first name, in the new dialect:

```
=TEXTAFTER(TEXTBEFORE(A2, " - "), ", ")
```

*Before the dash, after the comma.* Same result as the modem
noise, and a colleague can read it on the first pass.

Both take an optional instance number — `TEXTBEFORE(A2, "/", 2)`
takes everything before the *second* slash, and `-1` counts from
the end: `TEXTAFTER(A2, "/", -1)` is "the bit after the last
slash", which is how you get a filename out of a path.

<figure class="guide-fig">
<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One messy string being sliced by TEXTBEFORE, TEXTAFTER and TEXTSPLIT into named parts">
  <style>
    .t{font:13px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .hl1{animation:tsweep 6s ease-in-out infinite}
    .hl2{animation:tsweep 6s ease-in-out infinite;animation-delay:2s}
    .hl3{animation:tsweep 6s ease-in-out infinite;animation-delay:4s}
    @keyframes tsweep{0%,4%{opacity:0}10%,28%{opacity:1}36%,100%{opacity:0}}
  </style>
  <text x="60" y="30" class="h">the string</text>
  <rect x="60" y="44" width="330" height="40" class="g"/>
  <text x="76" y="70" class="t">SMITH, John - HR</text>
  <rect x="72" y="50" width="66" height="28" class="acc" opacity="0" style="animation:tsweep 6s ease-in-out infinite"/>
  <rect x="150" y="50" width="56" height="28" class="acc" opacity="0" style="animation:tsweep 6s ease-in-out infinite;animation-delay:2s"/>
  <rect x="218" y="50" width="42" height="28" class="acc" opacity="0" style="animation:tsweep 6s ease-in-out infinite;animation-delay:4s"/>
  <text x="430" y="58" class="t">=TEXTBEFORE(A2, ",")</text>
  <text x="430" y="80" class="h">→ SMITH</text>
  <text x="60" y="130" class="t">=TEXTAFTER(TEXTBEFORE(A2," - "),", ")</text>
  <text x="60" y="152" class="h">→ John</text>
  <text x="60" y="196" class="t">=TEXTAFTER(A2, " - ")</text>
  <text x="60" y="218" class="h">→ HR</text>
  <text x="430" y="130" class="t">or all at once:</text>
  <text x="430" y="152" class="t">=TEXTSPLIT(A2,</text>
  <text x="430" y="172" class="t">  {", "," - "})</text>
  <text x="430" y="196" class="h">→ SMITH│John│HR</text>
</svg>
<figcaption>Three slices, three readable formulas. The delimiter does the measuring, so the formula survives names of any length.</figcaption>
</figure>

## TEXTSPLIT: all the pieces at once

When you want *every* part, stop slicing and split:

```
=TEXTSPLIT(A2, ", ")
```

One formula, and the pieces
[spill](/articles/dynamic-arrays-filter-sort-unique/) across the
columns to the right — however many there are. Multiple delimiters
go in braces (`{", ", " - "}`), and a second argument splits down
rows instead. It's Text to Columns reborn as a formula: living,
refreshable, and undoable by deleting one cell.

Going the other way, `TEXTJOIN` glues pieces back together with a
delimiter and — its quiet superpower — an *ignore empty* switch:

```
=TEXTJOIN(", ", TRUE, B2:F2)
```

Address lines with gaps become one clean string, no stray commas.

## The two habits that make text work safe

**Trim first.** The classic failure isn't the formula — it's the
delimiter not being what you think.
A `"SMITH ,John"` with the space on the wrong side of the comma
defeats a tidy `TEXTBEFORE(A2, ", ")`. Run the
[cleaning routine](/articles/the-445pm-export-cleaning-messy-data/)
before surgery, and when a split misbehaves, suspect the string,
not the scalpel.

**Numbers that come out of text are text.** Extract `2024` from
`UK-2024-0173` and it *looks* like a year, but it's a text-number —
it won't sum, and it
[won't sort](/articles/sorting-and-filtering-without-wrecking-your-data/)
with real numbers. Wrap the extraction in `VALUE()` (or `--`)
the moment it leaves the string, and give
[real dates](/articles/working-with-dates-excel/) the same respect.

## Where the old guard still stands

`LEFT`, `RIGHT` and `MID` haven't retired — they're right when the
cut is *positional* rather than delimited: fixed-width exports, the
first two characters of a code, an ISBN's check digit. And in older
workbooks (or non-365 Excel) you'll still meet the `FIND`-based
nests; you now know how to read them, and how to replace them the
next time they break — the same courtesy owed to
[inherited VLOOKUPs](/articles/xlookup-the-lookup-to-learn-first/).

Text functions sit in stage three of [the path](/roadmap/) because
they're conditions' quiet partner: half the columns you'll ever
[SUMIFS by](/articles/sumifs-and-friends-answers-from-a-list/) were
carved out of a messier column first.

Say the cut out loud — before this, after that, split on the other
— and there's now a function with exactly that name. Text finally
works the way you'd explain it.
