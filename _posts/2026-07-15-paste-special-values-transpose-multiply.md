---
title: "Paste Special: values, transpose and the multiply trick"
description: Behind ordinary paste hides the most useful dialog in Excel — freezing formulas into values, flipping rows to columns, and fixing data by arithmetic.
date: 2026-07-15
domain: working-with-data
---

Copy and paste in Excel carries more than you see. A copied cell
brings its formula, its formatting, its validation rules, its
comment — the whole genetic code — and ordinary paste splices in
all of it. Most paste disasters ("my formatting's gone weird",
"the formula now points at nothing") are just genetics you didn't
mean to transfer.

**Paste Special** — `Ctrl+Alt+V`, or the little dropdown under the
Paste button — is how you choose. It's a dialog full of checkboxes,
but the working set is three moves and a party trick.

## Move one: paste as values

The one everybody needs weekly. A column of
[XLOOKUP](/articles/xlookup-the-lookup-to-learn-first/) results, a
[spilled FILTER](/articles/dynamic-arrays-filter-sort-unique/), a
block of calculations — sometimes you need the *answers* to stop
being formulas: before deleting the source data they point at,
before sending the file to someone who shouldn't see the workings,
before the numbers must become a matter of record.

Copy the range, then paste **Values** onto itself (or elsewhere).
The formulas are gone; the numbers remain, frozen. Keyboard people:
`Ctrl+C`, then `Ctrl+Alt+V`, `V`, Enter — four keystrokes you'll
use a thousand times.

One warning, because freezing is destructive by design: values
can't be un-frozen back into formulas. If the logic took an hour
to build, freeze a *copy* and keep the living sheet. (And if
you're freezing to make a monthly snapshot, that's a sign the real
answer is [a recorded query](/articles/power-query-combine-monthly-files/)
with a proper output table.)

## Move two: transpose

Data arrives sideways — months running down when your report runs
across, or a header row that should be a label column. **Transpose**
flips rows to columns in one paste:

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A row of month cells is copied and pasted transposed, becoming a column">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .ar{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#psa)}
    .c1{animation:pspop 5s ease-out infinite}
    .c2{animation:pspop 5s ease-out infinite;animation-delay:0.25s}
    .c3{animation:pspop 5s ease-out infinite;animation-delay:0.5s}
    .c4{animation:pspop 5s ease-out infinite;animation-delay:0.75s}
    @keyframes pspop{0%,20%{opacity:0;transform:translateX(-10px)}35%,85%{opacity:1;transform:translateX(0)}97%,100%{opacity:0}}
  </style>
  <defs><marker id="psa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="60" y="26" class="h">copied row…</text>
  <rect x="60" y="40" width="90" height="32" class="g"/><text x="72" y="61" class="t">Jan</text>
  <rect x="150" y="40" width="90" height="32" class="g"/><text x="162" y="61" class="t">Feb</text>
  <rect x="240" y="40" width="90" height="32" class="g"/><text x="252" y="61" class="t">Mar</text>
  <rect x="330" y="40" width="90" height="32" class="g"/><text x="342" y="61" class="t">Apr</text>
  <path d="M240 90 q-40 60 -80 62" class="ar"/>
  <text x="256" y="112" class="t">Paste Special → Transpose</text>
  <text x="256" y="132" class="t">(Ctrl+Alt+V, then E)</text>
  <g class="c1"><rect x="60" y="140" width="90" height="24" class="acc"/><text x="72" y="157" class="t">Jan</text></g>
  <g class="c2"><rect x="60" y="164" width="90" height="24" class="acc"/><text x="72" y="181" class="t">Feb</text></g>
  <g class="c3"><rect x="60" y="188" width="90" height="24" class="acc"/><text x="72" y="205" class="t">Mar</text></g>
  <g class="c4"><rect x="60" y="212" width="90" height="24" class="acc"/><text x="72" y="229" class="t">Apr</text></g>
</svg>
<figcaption>Rows become columns, one paste. Ten minutes of retyping — the old way of doing this — retired.</figcaption>
</figure>

Two notes. Transpose pastes a *copy* — the original stays, and the
new block doesn't update when the source changes. If you want a
transposed view that *stays live*, the formula
`=TRANSPOSE(A1:D1)` spills one, and it updates with its source.
And you can't transpose onto a range that overlaps the copy —
paste to clear ground, then tidy.

## Move three: paste arithmetic

The dialog's strangest section — Add, Subtract, Multiply, Divide —
performs arithmetic *between* the clipboard and the destination.
Its famous use is
[the multiply-by-1 trick](/articles/the-445pm-export-cleaning-messy-data/)
that snaps text-numbers back to real ones. But it generalises:

- Copy a cell containing `1000`, select a column, Paste Special →
  **Divide**: the whole column converts to thousands, in place, no
  helper column.
- Copy `1.05`, Paste Special → **Multiply**: every selected price
  rises 5%.

In-place arithmetic is quick and *irreversible in bulk* — the
original numbers are gone (Ctrl+Z willing). For anything with
consequences, the honest version is a helper column and a
[paste-values](/articles/format-as-table-the-feature-that-changes-everything/)
at the end, where the workings stay visible until you choose
otherwise.

## The supporting cast

Worth knowing they exist: **Formats** (paint one cell's look onto
a range — the Format Painter's honest twin), **Column widths**
(make the new report grid match the old one), **Skip blanks**
(paste a patchy column over a full one without blanking the gaps),
and **Paste Link** (paste cells that *reference* the source —
useful, but the moment you're linking between workbooks, consider
whether [a query](/articles/power-query-combine-monthly-files/)
would rot less).

## The habit

Paste Special is a stage-two skill on [the path](/roadmap/) for the
same reason as the rest of the cleaning kit: it's about controlling
*exactly what enters your sheet*. The habit that sticks — when you
copy anything, spend half a second asking *what do I actually want
to arrive: the answer, the recipe, or the outfit?* Ordinary paste
brings all three. Paste Special is the packing list.

Values, Transpose, Multiply. Three checkboxes; a decade of small
rescues.
