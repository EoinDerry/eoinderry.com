---
title: "Conditional formatting that highlights, not decorates"
description: The feature everyone uses to paint their sheets — and the small set of rules that make it point at what actually matters instead.
date: 2026-07-11
domain: analysis
---

Conditional formatting has a split personality. Used well, it's a
spotlight: the three overdue invoices glow, the eye lands on them,
done. Used badly, it's wallpaper — every cell a shade of something,
a sheet that looks like a weather map and says nothing.

The difference isn't taste. It's one question, asked before you open
the menu: **what should the reader's eye land on?** If the answer is
"a handful of exceptions", conditional formatting is the right tool.
If the answer is "everything", you don't want formatting — you want
a [chart](/roadmap/) or a
[PivotTable](/articles/pivottables-from-first-principles/).

## The workhorse: highlight the exceptions

Ninety per cent of good conditional formatting is one pattern:
*colour the rows that need a human.* Select your data, `Home →
Conditional Formatting → Highlight Cells Rules`, and the built-ins
cover the common cases — greater than, less than, duplicates, dates
in the last week.

Two disciplines make it work:

1. **One rule, one colour.** A red for "act now" reads instantly.
   Red, amber, yellow, two greens and a purple read as noise. If
   everything is highlighted, nothing is.
2. **Highlight what's *wrong*, not what's fine.** A sheet where 95%
   of cells are green tells you nothing you didn't assume. A sheet
   where three cells are red tells you your afternoon.

<figure class="guide-fig">
<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two versions of the same table: one painted in many colours, one with only the three exceptions highlighted">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .bad1{fill:#F6E3B4;stroke:#E6E4D9}.bad2{fill:#CDE8D6;stroke:#E6E4D9}.bad3{fill:#F3CFC4;stroke:#E6E4D9}.bad4{fill:#D9D4EC;stroke:#E6E4D9}
    .hot{fill:#F3CFC4;stroke:#C0392B;animation:cfpulse 2.6s ease-in-out infinite}
    @keyframes cfpulse{0%,100%{fill-opacity:1}50%{fill-opacity:0.45}}
  </style>
  <text x="60" y="26" class="h">Decoration</text>
  <g>
    <rect x="60" y="40" width="105" height="30" class="bad1"/><rect x="165" y="40" width="105" height="30" class="bad2"/>
    <rect x="60" y="70" width="105" height="30" class="bad3"/><rect x="165" y="70" width="105" height="30" class="bad4"/>
    <rect x="60" y="100" width="105" height="30" class="bad2"/><rect x="165" y="100" width="105" height="30" class="bad1"/>
    <rect x="60" y="130" width="105" height="30" class="bad4"/><rect x="165" y="130" width="105" height="30" class="bad3"/>
    <rect x="60" y="160" width="105" height="30" class="bad1"/><rect x="165" y="160" width="105" height="30" class="bad2"/>
  </g>
  <text x="90" y="215" class="t">where do you look?</text>
  <text x="390" y="26" class="h">Highlighting</text>
  <g>
    <rect x="390" y="40" width="105" height="30" class="g"/><rect x="495" y="40" width="105" height="30" class="g"/>
    <rect x="390" y="70" width="105" height="30" class="g"/><rect x="495" y="70" width="105" height="30" class="hot"/>
    <rect x="390" y="100" width="105" height="30" class="g"/><rect x="495" y="100" width="105" height="30" class="g"/>
    <rect x="390" y="130" width="105" height="30" class="hot"/><rect x="495" y="130" width="105" height="30" class="g"/>
    <rect x="390" y="160" width="105" height="30" class="g"/><rect x="495" y="160" width="105" height="30" class="g"/>
  </g>
  <text x="428" y="215" class="t">there. exactly there.</text>
</svg>
<figcaption>Same table, two philosophies. The right-hand one answers "where should I look?" before you've finished asking it.</figcaption>
</figure>

## Formula rules: where it gets genuinely powerful

The built-ins format a cell based on *its own* value. The real tool
is `New Rule → Use a formula`, which can format a cell — or a whole
row — based on *any* logic. The canonical example, highlighting
entire overdue rows:

Select the data body (say `A2:F500`), then:

```
=AND($E2 < TODAY(), $F2 = "No")
```

Note the dollars, because this is
[reference logic](/articles/the-dollar-sign-cell-references-explained/)
doing the work: `$E2` pins the *column* — every cell in the row
checks column E — while the unpinned row number lets the rule walk
down the sheet. Write the formula as if for the top-left cell of
your selection; Excel replays it for the rest.

If a formula rule misbehaves, it's almost always the dollars. Debug
it by writing the same formula *in a spare column* first — where you
can see the TRUE/FALSE it produces — then paste it into the rule.

## Data bars and colour scales: sparingly, honestly

Data bars (a bar-chart-in-the-cell) are the best of the "paint by
value" options — good for eyeballing magnitudes in a column, as long
as the values are all positive and roughly comparable.

Colour scales — the green-to-red gradient — are the most abused. A
gradient invites the reader to compare *shades*, and humans are bad
at that. Before applying one, ask whether the top-N rule, or simply
sorting the column, answers the question better. Usually it does.

And the icon sets (traffic lights, flags, smiley arrows)? They
compress your data into three buckets you didn't choose, with
thresholds nobody remembers setting. If you need status icons,
compute the status yourself with
[IFS](/articles/if-ifs-nested-logic-done-cleanly/) — then the
buckets are yours, visible, and auditable.

## Keep the rules maintainable

Conditional formatting has a housekeeping problem: rules pile up
invisibly, especially when cells are copied around, and a year later
the sheet has forty overlapping rules and mysterious colours.
Occasionally open `Conditional Formatting → Manage Rules → This
Worksheet` and prune. The discipline mirrors
[the logic rule](/articles/if-ifs-nested-logic-done-cleanly/): if you
can't explain what a rule is for, it goes.

One more: format *Tables*, not ad-hoc ranges. A rule applied to a
[proper Table](/articles/format-as-table-the-feature-that-changes-everything/)
grows with the data; a rule applied to `A2:F500` quietly stops at
row 500 the day the data reaches 501. That's how "the highlighting
missed one" happens — and a highlight that *sometimes* works is
worse than none, because people trust it.

## The test

Stand back from the sheet, squint, and ask what you see first. If
the answer is "the thing that needs doing", the formatting is
working. If the answer is "colours", start deleting rules until
only the spotlight is left.

Attention is the scarcest thing a spreadsheet manages. Spend it like
money.
