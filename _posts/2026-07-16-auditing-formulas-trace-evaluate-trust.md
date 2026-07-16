---
title: "Auditing formulas: trace, evaluate, trust"
description: Someone else's workbook, a number that looks wrong, a meeting in an hour — the built-in tools that let you read any sheet's plumbing without guessing.
date: 2026-07-16
domain: formulas
---

The situation arrives in every working life: a workbook you
didn't build, a bottom-line number that looks wrong, and someone
asking you to confirm it. Staring at cells hoping for insight is
not a method. Excel ships a proper toolkit for exactly this —
`Formulas → Formula Auditing` — and almost nobody opens it. This
lesson is that toolbox, in the order a real audit uses it.

## First: see all the machinery at once

**`Ctrl + `** ` (the backtick, top-left of the keyboard) flips the
whole sheet to formula view — every cell showing its workings
instead of its result. Thirty seconds of scrolling answers the
structural questions: where do formulas live, where are the
[hard-typed numbers hiding among them](/articles/sum-average-count-basics-done-properly/),
does column D do the same thing all the way down?

That last question has a dedicated detector. **`Go To Special →
Row differences`** (F5 → Special) flags cells that differ from
their row's pattern — which is how you find the one cell in five
hundred where someone once typed `4200` over the formula and
"fixed" a report forever. Inside a
[Table](/articles/structured-references-formulas-inside-tables/),
calculated columns make this class of rot impossible; in the
wild workbooks you audit, it's endemic.

## Then: follow the wires

Select the suspicious cell and **Trace Precedents** draws blue
arrows from every cell that feeds it. Click again: the feeders'
feeders. The number's whole ancestry, on screen — and the
surprises are immediate: an arrow from a forgotten sheet, a
range that [stops a row short](/articles/structured-references-formulas-inside-tables/),
an arrow from a cell containing a *number* where a rate
[should have had a name](/articles/named-ranges-formulas-read-like-sentences/).

**Trace Dependents** points the other way — *who uses this
cell?* — and is the tool for the question that precedes every
edit of a strange workbook: "if I change this, what breaks?"
(A dashed arrow to a little grid icon means "something on
another sheet" — double-click the arrow to jump there.)

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Precedent arrows light up one by one, tracing a suspicious total back through its feeder cells to a hard-typed number">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .bad{fill:#F6E7E2;stroke:#C0392B}
    .wire{stroke:#0E7A4F;stroke-width:1.8;fill:none;marker-end:url(#aua)}
    .w1{stroke-dasharray:200;stroke-dashoffset:200;animation:audraw 5.5s ease-out infinite}
    .w2{stroke-dasharray:200;stroke-dashoffset:200;animation:audraw 5.5s ease-out infinite;animation-delay:0.7s}
    .w3{stroke-dasharray:200;stroke-dashoffset:200;animation:audraw 5.5s ease-out infinite;animation-delay:1.4s}
    @keyframes audraw{0%,10%{stroke-dashoffset:200}40%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:200}}
    .reveal2{opacity:0;animation:aurev 5.5s ease-out infinite}
    @keyframes aurev{0%,38%{opacity:0}50%,90%{opacity:1}100%{opacity:0}}
  </style>
  <defs><marker id="aua" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <rect x="470" y="90" width="150" height="40" class="g"/><text x="482" y="115" class="h">Total £84,120?</text>
  <rect x="250" y="40" width="150" height="36" class="g"/><text x="262" y="63" class="t">=SUM(Q1)</text>
  <rect x="250" y="150" width="150" height="36" class="g"/><text x="262" y="173" class="t">=SUM(Q2)</text>
  <path d="M400 62 q40 20 66 40" class="wire w1"/>
  <path d="M400 164 q40 -18 66 -40" class="wire w1"/>
  <rect x="60" y="150" width="150" height="36" class="g"/><text x="72" y="173" class="t">=B4*rate</text>
  <path d="M210 168 h36" class="wire w2"/>
  <g class="reveal2">
    <rect x="60" y="40" width="150" height="36" class="bad"/><text x="72" y="63" class="h">4200  ← typed!</text>
    <path d="M210 58 h36" class="wire w3"/>
    <text x="60" y="220" class="t">three arrows in: a hard-typed number where a formula should be — found, not guessed</text>
  </g>
</svg>
<figcaption>Trace Precedents draws the number's ancestry. The audit isn't cleverness — it's following wires until one of them surprises you.</figcaption>
</figure>

## Then: watch it think

For the formula itself, three levels of magnification. **F9** —
select any fragment *inside* the formula bar and press F9: that
piece evaluates in place ([Esc, not Enter](/articles/keyboard-habits-that-pay-for-themselves/),
or the evaluation is pasted in permanently — the auditor's classic
own goal). **Evaluate Formula** does the same thing formally —
stepping through the calculation one operation at a time, the
debugger nobody knows Excel has, and the fastest way to see *which*
part of a [nested condition](/articles/if-ifs-nested-logic-done-cleanly/)
went sideways. And the **Watch Window** pins any cell's live value
on screen while you edit elsewhere — change an input on sheet one,
watch the bottom line on sheet nine react (or damningly, not).

For [errors specifically](/articles/iferror-ifna-failing-loudly/),
**Error Checking → Trace Error** jumps straight to the origin of
a cascade: fix the one `#VALUE!` at the source and forty
downstream errors evaporate.

## The audit, as a routine

Ten minutes, in order, before trusting any inherited number:

1. `Ctrl+`` ` — where's the machinery? Any numbers where formulas
   should be?
2. Row differences on the money columns — any broken patterns?
3. Trace Precedents on the bottom line — does the ancestry make
   sense? Any feeders that are typed constants?
4. F9 the suspicious fragments; Evaluate the genuinely weird one.
5. Check the ranges: do the SUMs
   [reach the last row](/articles/structured-references-formulas-inside-tables/)?

And the closing move every audit deserves: leave the workbook
*more* auditable than you found it — a
[name](/articles/named-ranges-formulas-read-like-sentences/) on
the magic number you unearthed, a comment on the fragile bit, a
[LET](/articles/let-and-lambda-formulas-you-can-read/) where the
nesting defeated you. Auditing is how you earn trust in other
people's sheets; building sheets that *don't need this toolkit*
is how they'll trust yours.

Blue arrows, a backtick, and F9. You never have to stare at a
spreadsheet hoping again.
