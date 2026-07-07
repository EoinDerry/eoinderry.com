---
title: "PivotTables from first principles"
description: The most feared feature in Excel is a drag-and-drop version of a question you already know how to ask. Here's the mental model that makes it click.
date: 2026-06-10
domain: analysis
---

Ask a room of office workers to raise a hand if they use PivotTables
and you'll get 20%. Ask who *wishes* they did and you'll get the rest.
The feature has a reputation: powerful, advanced, "I tried once and it
made something weird."

Here's the secret: if you've ever written a SUMIFS — or even just
*wanted* one — you already understand PivotTables. A PivotTable is a
**whole grid of SUMIFS questions, answered at once, by dragging.**

## The mental model

In the [SUMIFS guide](/articles/sumifs-and-friends-answers-from-a-list/)
the pattern was: *add up this column, where that column matches this
condition.* One formula, one answer.

A PivotTable asks the same thing in bulk: *add up Amount, for **every**
Region crossed with **every** Product.* Rows become one side of the
question, Columns the other, Values the thing being added — and Excel
fills in the entire grid.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A long list of records pivoting into a summary grid">
  <style>.t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}.h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}.g{fill:#fff;stroke:#E6E4D9}.hd{fill:#EAF4EE;stroke:#DCEDE4}.tot{fill:#fff;stroke:#E6E4D9}.ar{stroke:#0E7A4F;stroke-width:1.8;fill:none;marker-end:url(#c)}.b{font:600 12px 'IBM Plex Mono',monospace;fill:#0A5C3B}</style>
  <defs><marker id="c" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="50" y="24" class="h">The list (one row = one sale)</text>
  <g>
    <rect x="50" y="40" width="220" height="26" class="hd"/><text x="60" y="58" class="t">Region  Product  Amount</text>
    <rect x="50" y="66" width="220" height="26" class="g"/><text x="60" y="84" class="t">Cork    Pro        480</text>
    <rect x="50" y="92" width="220" height="26" class="g"/><text x="60" y="110" class="t">Dublin  Lite       220</text>
    <rect x="50" y="118" width="220" height="26" class="g"/><text x="60" y="136" class="t">Cork    Lite       150</text>
    <rect x="50" y="144" width="220" height="26" class="g"/><text x="60" y="162" class="t">Dublin  Pro        610</text>
    <text x="60" y="196" class="t">…2,000 more rows</text>
  </g>
  <path d="M285 120 h60" class="ar"/>
  <text x="288" y="108" class="b">pivot</text>
  <text x="360" y="24" class="h">The answer grid</text>
  <g>
    <rect x="360" y="40" width="250" height="26" class="hd"/><text x="370" y="58" class="t">Sum      Lite    Pro</text>
    <rect x="360" y="66" width="250" height="26" class="g"/><text x="370" y="84" class="t">Cork      150    480</text>
    <rect x="360" y="92" width="250" height="26" class="g"/><text x="370" y="110" class="t">Dublin    220    610</text>
    <rect x="360" y="118" width="250" height="26" class="tot"/><text x="370" y="136" class="b">Total     370  1,090</text>
    <text x="360" y="196" class="t">every cell = one SUMIFS,</text>
    <text x="360" y="214" class="t">answered by dragging</text>
  </g>
</svg>
<figcaption>Rows in, answers out: a PivotTable is a grid of SUMIFS you didn't have to write.</figcaption>
</figure>

## Build your first one, calmly

1. **Start from a Table** ([always a Table](/articles/format-as-table-the-feature-that-changes-everything/)
   — the Pivot then follows the data as it grows). Insert →
   PivotTable → OK.
2. You get a blank canvas and a field list. Nothing weird has
   happened; it's simply waiting for the question.
3. Drag **Region** into *Rows*. Drag **Amount** into *Values*.
   You've just asked "total by region" — the answer's already there.
4. Drag **Product** into *Columns*. Now it's region × product.
5. Drag **Region** *out* and **Month** in. Different question, same
   two seconds. That's why it's called a *pivot*.

The whole skill is learning to hear questions as drags: *"by" = Rows,
"split across" = Columns, "how much/many" = Values.*

## The four settings that fix "it made something weird"

- **It's counting when you want sums.** If Amount arrives as a Count,
  a text value or blank is hiding in the column — fix the data, or
  right-click → Summarise Values By → Sum.
- **The layout looks like a staircase.** Design → Report Layout →
  *Show in Tabular Form* + *Repeat All Item Labels*. This one change
  makes Pivots look like reports instead of puzzles.
- **Stale numbers.** Pivots snapshot the data; right-click → Refresh
  after edits. (New rows are why the source must be a Table.)
- **Ugly date grouping.** Right-click any date → Group → Months and/or
  Years. Ungroup the same way — nothing is ruined, ever.

That last point generalises: **you cannot break the data from inside a
PivotTable.** It's a lens, not an editor. Drag anything anywhere;
worst case, drag it back out.

## When the Pivot earns its keep

The honest heuristic: one question, once → write the SUMIFS. Many
related questions, or the same question every month → build the Pivot,
add a **Slicer** (Insert → Slicer) so the question can be changed by
clicking, and you're most of the way to a dashboard — which is exactly
where [the path](/roadmap/) goes next.
