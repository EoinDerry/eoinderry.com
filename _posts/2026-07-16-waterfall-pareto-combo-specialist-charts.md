---
title: "Waterfall, Pareto and combo: the specialist charts worth knowing"
description: Three chart types beyond the basic four that earn their keep — what each one is actually for, and the honesty rules that keep them from becoming decoration.
date: 2026-07-16
domain: analysis
---

[The chart lesson's](/articles/charts-that-tell-the-truth/) rule
stands: bar, line, scatter and the occasional stacked bar cover
95% of honest working life, and exotic charts are usually a
sentence that hasn't been thought through. This lesson is about
the other 5% — three specialist types with a genuine sentence
of their own, plus the craft that stops each becoming
decoration.

## Waterfall: "how did we get from A to B?"

Some sentences are *journeys*: opening profit, plus this, minus
that, equals closing profit. Bars can't say it — they show
states, not steps — and the **waterfall** exists precisely for
it: each contribution floats as a rise or fall from where the
last one ended, with anchored totals at the ends.

`Insert → Waterfall`, then the one setting everyone misses:
double-click each genuine total (opening, closing) and tick
**Set as Total**, so it drops to the axis instead of floating.
Where it earns its keep: profit bridges, budget-to-actual
explanations,
[net-worth change over a year](/articles/net-worth-one-page-balance-sheet/)
(saved this, market did that, spent the other) — anywhere the
audience's real question is *"what happened between these two
numbers?"*

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A waterfall chart building step by step from opening profit through gains and losses to closing profit">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .tot{fill:#1C2823}
    .up{fill:#0E7A4F}
    .dn{fill:#C0392B}
    .conn{stroke:#8A948D;stroke-width:1;stroke-dasharray:3 3}
    .w1{opacity:0;animation:wfstep 6s ease-out infinite}
    .w2{opacity:0;animation:wfstep 6s ease-out infinite;animation-delay:0.5s}
    .w3{opacity:0;animation:wfstep 6s ease-out infinite;animation-delay:1s}
    .w4{opacity:0;animation:wfstep 6s ease-out infinite;animation-delay:1.5s}
    .w5{opacity:0;animation:wfstep 6s ease-out infinite;animation-delay:2s}
    @keyframes wfstep{0%,8%{opacity:0;transform:translateY(8px)}20%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
  </style>
  <line x1="60" y1="210" x2="620" y2="210" class="ax"/>
  <g class="w1"><rect x="80" y="120" width="70" height="90" class="tot"/><text x="84" y="232" class="t">opening</text></g>
  <g class="w2"><rect x="185" y="70" width="70" height="50" class="up"/><line x1="150" y1="120" x2="185" y2="120" class="conn"/><text x="192" y="232" class="t">sales ↑</text></g>
  <g class="w3"><rect x="290" y="70" width="70" height="34" class="dn"/><line x1="255" y1="70" x2="290" y2="70" class="conn"/><text x="294" y="232" class="t">costs ↓</text></g>
  <g class="w4"><rect x="395" y="104" width="70" height="26" class="dn"/><line x1="360" y1="104" x2="395" y2="104" class="conn"/><text x="404" y="232" class="t">fx ↓</text></g>
  <g class="w5"><rect x="500" y="130" width="70" height="80" class="tot"/><line x1="465" y1="130" x2="500" y2="130" class="conn"/><text x="504" y="232" class="t">closing</text></g>
  <text x="80" y="40" class="h">the journey between two truths, one step at a time</text>
</svg>
<figcaption>States at the ends, steps between. The waterfall answers the meeting's actual question — "what changed?" — before anyone asks it.</figcaption>
</figure>

## Pareto: "which few causes are most of the problem?"

Complaint categories, defect types, spending buckets — count
them, and a familiar shape emerges: a vital few dominate. The
**Pareto chart** (`Insert → Statistic Chart → Pareto`, sibling
of [the histogram](/articles/histograms-distributions-shape-of-numbers/))
makes the case in one image:
[sorted](/articles/charts-that-tell-the-truth/) bars for the
counts, plus a cumulative-percent line — so you can say "the
top three categories are 78% of everything" and point.

It's [top-N thinking](/articles/top-n-thinking-large-small-ranking/)
and [running totals](/articles/pivot-show-values-as-percent-running-totals/)
fused into one honest picture, and its natural habitat is the
prioritisation meeting: not "here are eleven problems" but
"here is where effort pays" — the
[80/20 instinct](/articles/energy-bills-decoded-unit-rates-model/)
with evidence attached.

## Combo: two series that belong together but don't share units

Revenue in pounds against margin in percent; units sold against
returns rate. One axis can't hold both — and stretching one
series to share the other's axis is
[a lie by scaling](/articles/charts-that-tell-the-truth/). The
**combo chart** (`Insert → Combo`) gives each series its own
mark (columns for the money, a line for the rate) and, when
needed, a **secondary axis**.

That secondary axis is the sharpest tool in this lesson and
the easiest to cut yourself on: two axes means the reader
can't compare *heights* between series, only *shapes* — and a
mischievous axis range can manufacture any correlation you
like. The honesty rules: only when units genuinely differ;
label both axes loudly; start bars' axis
[at zero as always](/articles/charts-that-tell-the-truth/);
and if the sentence is really "these two move together",
consider [the scatter plot](/articles/charts-that-tell-the-truth/),
which says it without axis games.

## The specialist's rule

Same as the generalist's, applied at a higher price point:
**say the sentence first.** "We went from X to Y because…" →
waterfall. "Three causes are most of it" → Pareto. "The rate
tells a different story from the total" → combo. If the
sentence isn't one of those, the basic four were already
enough — and a specialist chart without its sentence is just
[decoration](/articles/conditional-formatting-highlights-not-decoration/)
with better vocabulary.

Three new tools, three specific sentences, one unchanged
principle. The gallery didn't get more honest — you got more
precise.
