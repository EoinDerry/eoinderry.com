---
title: "Text to Columns and Flash Fill: splitting data without formulas"
description: Two built-in tools that take a jammed-together column apart — one by rules, one by imitation — and the honest guide to when each belongs.
date: 2026-07-16
domain: working-with-data
---

Sooner or later a column arrives with too much in it: `Byrne,
Niamh`, `DUB-2024-0173`, a full address in one cell. The grid
creed says [one value per cell](/articles/the-grid-mindset-how-excel-thinks/),
so the column has to come apart — and Excel offers two very
different tools for the job. One follows rules; one imitates
examples. Knowing which to reach for is the actual skill.

## Text to Columns: the rule-follower

`Data → Text to Columns` is the veteran: pick a column, tell it
how to cut, and it slices every row identically.

The wizard's first choice is the one that matters:

- **Delimited** — cut at a character: comma, tab, space, or
  anything you type (a `-`, a `|`). Right for exports and
  jammed-together codes.
- **Fixed width** — cut at positions: characters 1–3, 4–9,
  10–14. Right for old-system exports where every row is padded
  to the same width.

Step three of the wizard is the sleeper feature: a **type for
each new column**. This is where you tell Excel that the third
slice is a *date arriving as DMY* — which is exactly how you
rescue the [dates-as-text plague](/articles/the-445pm-export-cleaning-messy-data/),
and why Text to Columns appears in the cleaning routine even when
nothing needs splitting. (Run it with no delimiters at all and
it simply re-evaluates a column — the multiply-trick's
[respectable cousin](/articles/paste-special-values-transpose-multiply/).)

One warning, learned the hard way by everyone: the slices land in
the columns *to the right*, overwriting whatever lives there.
Insert blank columns first, always.

## Flash Fill: the imitator

Flash Fill (`Ctrl+E`) works the other way round. You don't
describe the rule — you **demonstrate the result**. In the column
beside `Niamh BYRNE`, type what you want: `N. Byrne`. Press
`Ctrl+E`, and Excel studies your example, infers the
transformation, and fills the column in imitation.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One typed example beside messy names, and Flash Fill completing the column by imitation">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .ex{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4}
    .ff1{opacity:0;animation:ffin 5s ease-out infinite;animation-delay:0.6s}
    .ff2{opacity:0;animation:ffin 5s ease-out infinite;animation-delay:0.9s}
    .ff3{opacity:0;animation:ffin 5s ease-out infinite;animation-delay:1.2s}
    @keyframes ffin{0%,16%{opacity:0}30%,88%{opacity:1}98%,100%{opacity:0}}
    .key{opacity:0;animation:ffkey 5s ease-out infinite}
    @keyframes ffkey{0%,4%{opacity:0}10%,26%{opacity:1}34%,100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">the mess</text>
  <rect x="60" y="40" width="200" height="34" class="g"/><text x="72" y="62" class="t">niamh BYRNE</text>
  <rect x="60" y="74" width="200" height="34" class="g"/><text x="72" y="96" class="t">SEAN o'brien</text>
  <rect x="60" y="108" width="200" height="34" class="g"/><text x="72" y="130" class="t">aoife murphy</text>
  <rect x="60" y="142" width="200" height="34" class="g"/><text x="72" y="164" class="t">PADRAIG kelly</text>
  <text x="300" y="26" class="h">your example…</text>
  <rect x="300" y="40" width="180" height="34" class="ex"/><text x="312" y="62" class="t">N. Byrne</text>
  <g class="ff1"><rect x="300" y="74" width="180" height="34" class="g"/><text x="312" y="96" class="t">S. O'Brien</text></g>
  <g class="ff2"><rect x="300" y="108" width="180" height="34" class="g"/><text x="312" y="130" class="t">A. Murphy</text></g>
  <g class="ff3"><rect x="300" y="142" width="180" height="34" class="g"/><text x="312" y="164" class="t">P. Kelly</text></g>
  <g class="key"><rect x="520" y="48" width="90" height="30" rx="5" fill="#fff" stroke="#5A655E"/><text x="532" y="68" class="t">Ctrl+E</text></g>
  <text x="60" y="212" class="t">no rule described — Excel infers the pattern from one demonstration</text>
</svg>
<figcaption>Type one finished example, press Ctrl+E, and the column completes itself by imitation. Magic — which is exactly why it needs checking.</figcaption>
</figure>

It's genuinely brilliant for the transformations that are easy to
show and tedious to describe: initials from names, the digits out
of a postcode, `07701 234567` from a wall of unspaced digits,
reassembling `Byrne, Niamh` as `Niamh Byrne`.

But hold on to what it is: **a guess based on your examples.**
Flash Fill doesn't tell you the rule it inferred, and when a row
breaks the pattern — a double-barrelled surname, a missing middle
part — it improvises silently. So the discipline: give it *two or
three* examples covering the awkward cases, then **spot-check the
weird rows** before trusting the column. And know that the results
are *values*, not formulas — new rows won't update; you'll press
`Ctrl+E` again.

## Which tool, honestly

| Situation | Reach for |
|-----------|-----------|
| Clean delimiter, every row identical | Text to Columns |
| Fixed-width system export | Text to Columns |
| Transformation easier to show than describe | Flash Fill, then spot-check |
| Result must update when data changes | Neither — [TEXTBEFORE / TEXTSPLIT](/articles/text-functions-textbefore-textafter/) |
| Same split, every month, forever | [Power Query](/articles/power-query-combine-monthly-files/) |

That last pair matters as you move along [the path](/roadmap/).
Text to Columns and Flash Fill are *one-off* tools — they edit
this copy of the data, once. The formula functions give you a
split that stays live; Power Query gives you a split that replays
itself on every refresh. The rule of thumb from
[the recipe lesson](/articles/power-query-combine-monthly-files/)
applies verbatim: doing it twice is fine; the third month, it
belongs in the recipe.

One column, one fact — however the data arrived. These two are the
quick way there; the path behind them is what makes it permanent.
