---
title: "INDEX and MATCH: the lookup with the hood open"
description: XLOOKUP is still the one to learn first — but INDEX and MATCH is the pair you'll inherit, and the mental model that makes every lookup make sense.
date: 2026-07-15
domain: lookups
---

If you've read [the XLOOKUP guide](/articles/xlookup-the-lookup-to-learn-first/),
you know my position: learn `XLOOKUP` first, and don't apologise
for it. So why an article on `INDEX` and `MATCH`, the pair that
ruled the power-user world for twenty years?

Two reasons. You *will* inherit workbooks built on it — it was the
professional's choice for decades, and those files run payrolls
today. And more interestingly: `INDEX`/`MATCH` is a lookup **with
the hood open**. `XLOOKUP` does find-and-fetch in one sealed unit;
`INDEX` and `MATCH` are the find and the fetch as separate parts,
and seeing the parts separately is what makes *every* lookup —
including `XLOOKUP` — stop being magic.

## The two parts

**`MATCH` answers one question: *where?***

```
=MATCH("Widgets", A2:A100, 0)     → 7
```

Find "Widgets" in this column; it's the 7th item. Not the value —
the *position*. (The `0` means exact match. Always write it;
the default is the same approximate-match trap
[VLOOKUP set](/articles/xlookup-the-lookup-to-learn-first/) for a
generation.)

**`INDEX` answers the other: *what's at?***

```
=INDEX(C2:C100, 7)                → £2,340
```

Give me the 7th item of this column. That's the entire function:
a range and a position in it.

Snap them together and the position flows from one into the other:

```
=INDEX(C2:C100, MATCH("Widgets", A2:A100, 0))
```

*What's in the price column at the row where the product column
says Widgets?* — a lookup, assembled from parts you can test
separately. And that's the debugging superpower: when a lookup
fails, put the `MATCH` alone in a spare cell. Position or `#N/A`,
the fault is instantly on one side of the hood or the other —
almost always the `MATCH`, and almost always
[a space or a text-number](/articles/the-445pm-export-cleaning-messy-data/).

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MATCH finds the row position down one column, INDEX retrieves the value at that position in another; together they form a crosshair on the grid">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .scan{fill:#EAF4EE;stroke:#0E7A4F;opacity:0;animation:mscan 5.5s ease-in-out infinite}
    .s2{animation-delay:0.4s}.s3{animation-delay:0.8s}
    .hit{opacity:0;animation:mhit 5.5s ease-in-out infinite}
    @keyframes mscan{6%{opacity:0.8}14%{opacity:0}100%{opacity:0}}
    @keyframes mhit{0%,22%{opacity:0}32%,88%{opacity:1}98%,100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">MATCH scans… → position 3</text>
  <rect x="60" y="40" width="140" height="34" class="g"/><text x="72" y="62" class="t">Gaskets</text>
  <rect x="60" y="74" width="140" height="34" class="g"/><text x="72" y="96" class="t">Flanges</text>
  <rect x="60" y="108" width="140" height="34" class="g"/><text x="72" y="130" class="t">Widgets</text>
  <rect x="60" y="142" width="140" height="34" class="g"/><text x="72" y="164" class="t">Sprockets</text>
  <rect x="60" y="40" width="140" height="34" class="scan"/>
  <rect x="60" y="74" width="140" height="34" class="scan s2"/>
  <g class="hit"><rect x="60" y="108" width="140" height="34" class="acc"/></g>
  <rect x="330" y="40" width="140" height="34" class="g"/><text x="342" y="62" class="t">£1,100</text>
  <rect x="330" y="74" width="140" height="34" class="g"/><text x="342" y="96" class="t">£860</text>
  <rect x="330" y="108" width="140" height="34" class="g"/><text x="342" y="130" class="t">£2,340</text>
  <rect x="330" y="142" width="140" height="34" class="g"/><text x="342" y="164" class="t">£790</text>
  <g class="hit">
    <rect x="330" y="108" width="140" height="34" class="acc"/>
    <path d="M204 125 h122" stroke="#0E7A4F" stroke-width="1.6" stroke-dasharray="5 4"/>
    <text x="500" y="130" class="h">← INDEX, row 3</text>
  </g>
  <text x="60" y="212" class="t">the find and the fetch, as separate parts — testable separately</text>
</svg>
<figcaption>MATCH walks the left column and reports "position 3"; INDEX collects whatever sits third in the right column. Two small ideas, one lookup.</figcaption>
</figure>

## Where the open hood earns its keep

**Two-way lookups read beautifully.** One `MATCH` finds the row, a
second finds the column, and `INDEX` takes the grid and both
positions:

```
=INDEX(DataGrid, MATCH(A2, Products, 0), MATCH(B2, Months, 0))
```

Row-finder, column-finder, grid — a crosshair, written exactly the
way you'd describe it. (XLOOKUP's
[nested version](/articles/xlookup-the-lookup-to-learn-first/) does
the same job; this one, many people find easier to *read*.)

**One MATCH can feed many INDEXes.** Looking up eight columns for
the same customer? Put the `MATCH` in a helper cell once, and let
eight cheap `INDEX`es share it. Tidier to audit, and on big sheets
genuinely faster — the expensive part of any lookup is the search,
and this does one search instead of eight.

**It never counts columns.** Like `XLOOKUP` — and unlike `VLOOKUP` —
the pair points at ranges by reference, so inserting columns breaks
nothing. Old workbooks built on `INDEX`/`MATCH` have quietly
survived renovations that killed their `VLOOKUP` cousins. There's a
lesson in that beyond lookups.

## Translating the inheritance

When you meet it in the wild:

```
=INDEX(Sheet2!C:C, MATCH(A2, Sheet2!A:A, 0))
```

is precisely

```
=XLOOKUP(A2, Sheet2!A:A, Sheet2!C:C)
```

Fetch column, find column — the same two ranges, opposite order.
No need to rewrite working formulas; every need to understand them
before touching them. The rule from
[the VLOOKUP days](/articles/xlookup-the-lookup-to-learn-first/)
applies unchanged: read the old dialect, write in the new one.

## The honest recommendation

Nothing here changes the advice: new workbooks, `XLOOKUP`, no
apology. Learn `INDEX`/`MATCH` for the three occasions that
actually call for it — inherited files, the shared-`MATCH`
efficiency pattern, and colleagues (or Excel versions) that
haven't met `XLOOKUP` yet. That's stage four of
[the path](/roadmap/) done properly: not collecting lookups like
stamps, but knowing what *where* and *what's-at* mean everywhere.

Open the hood once. Every lookup you ever meet afterwards is just
those two questions wearing different syntax.
