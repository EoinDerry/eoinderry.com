---
title: "Approximate matches: banding, tiers and tax tables"
description: The lookup mode everyone is warned off is also the right tool for a whole family of problems — grades, commission tiers, postage bands, tax brackets.
date: 2026-07-16
domain: lookups
---

Twice now this course has warned you about approximate matching:
[VLOOKUP's treacherous default](/articles/xlookup-the-lookup-to-learn-first/),
[MATCH's silent one](/articles/index-and-match-for-full-control/).
Exact match, always — that was the rule, and for *finding things*
it stays the rule.

But there's a family of questions where approximate match isn't a
trap — it's the entire point. *Which grade does 74 fall into?
Which commission tier does £8,200 earn? Which postage band is
2.3kg?* These aren't "find this value" questions; they're **"which
band contains this value?"** questions — and banding is what
approximate matching was built for.

## The shape: a threshold table

Every banding problem starts the same way: a small two-column
table, **sorted ascending**, where each row says *"from this value
upward, this answer"*:

| From | Tier |
|-----:|------|
| 0 | Bronze |
| 5,000 | Silver |
| 10,000 | Gold |
| 25,000 | Platinum |

Then the lookup, in modern form:

```
=XLOOKUP([@Sales], Tiers[From], Tiers[Tier], , -1)
```

The `-1` is the whole lesson: **"exact match, or the next
smaller."** £8,200 isn't in the From column, so the lookup slides
*down* to 5,000 — Silver. Read it as *"which threshold did this
value clear?"* and the mode stops feeling dangerous and starts
feeling inevitable.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A value of 8200 slides down a sorted threshold ladder to the highest rung it clears, landing on Silver">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .win{fill:#EAF4EE;stroke:#0E7A4F}
    .ball{fill:#0E7A4F;animation:amdrop 5s ease-in-out infinite}
    @keyframes amdrop{0%,12%{transform:translateY(0)}30%{transform:translateY(48px)}48%,85%{transform:translateY(96px)}100%{transform:translateY(96px);opacity:0}}
    .hit{opacity:0;animation:amhit 5s ease-in-out infinite}
    @keyframes amhit{0%,45%{opacity:0}58%,90%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">£8,200 slides to the rung it cleared</text>
  <rect x="150" y="40" width="270" height="40" class="g"/><text x="164" y="65" class="t">25,000 → Platinum   too high</text>
  <rect x="150" y="88" width="270" height="40" class="g"/><text x="164" y="113" class="t">10,000 → Gold       too high</text>
  <rect x="150" y="136" width="270" height="40" class="win"/><text x="164" y="161" class="h">5,000 → Silver     ✓ cleared</text>
  <rect x="150" y="184" width="270" height="34" class="g" opacity="0.5"/><text x="164" y="206" class="t">0 → Bronze          not reached</text>
  <circle cx="110" cy="60" r="9" class="ball"/>
  <g class="hit">
    <text x="440" y="155" class="h">= "Silver"</text>
    <text x="440" y="180" class="t">next-smaller match:</text>
    <text x="440" y="200" class="t">the banding machine</text>
  </g>
</svg>
<figcaption>Approximate match answers "which threshold did it clear?" — which is exactly what grades, tiers and tax bands ask.</figcaption>
</figure>

## Why this beats the IFS ladder

You met banding once before, as
[an IFS ladder](/articles/if-ifs-nested-logic-done-cleanly/), and
the advice there stands: past a few rungs, **the logic wants to
be a table.** The threshold-table version wins on every axis that
matters — thresholds are *data* someone can see and edit
([in a Table](/articles/structured-references-formulas-inside-tables/),
so new tiers just work); the formula never changes when the
policy does; and the sheet documents the scheme instead of
burying it in nested conditions. When commission tiers change in
January — they always change in January — someone edits four
cells, not four hundred formulas.

The legacy dialects you'll inherit do the same job:
`VLOOKUP(..., TRUE)` and `MATCH(..., 1)` are next-smaller
matchers too, and old-timers' `=LOOKUP(x, table)` is the same
machine again. Now you can read them — and know that their one
absolute requirement is yours as well.

## The two disciplines

**Sorted, ascending, always.** Approximate match walks the
thresholds assuming order; an unsorted table returns confident
nonsense, not errors. Guard it: thresholds live in their own
little Table, sorted, ideally on the
[inputs sheet](/articles/named-ranges-formulas-read-like-sentences/)
— never scattered mid-data where
[a stray sort](/articles/sorting-and-filtering-without-wrecking-your-data/)
can shuffle policy.

**Mind the edges.** Bands are `>=` on the From value — a 74.9
with a "75 = A" threshold is a B, and whether that's right is
*policy*, not maths. Test the exact boundary values, and values
below the first threshold (XLOOKUP returns
[#N/A](/articles/iferror-ifna-failing-loudly/) if nothing was
cleared — often the correct scream; add a 0 row when it isn't).

## The graduation: marginal bands

One caution completes the lesson. Banding answers "which tier
does the *whole* value sit in" — flat-rate schemes, grades,
postage. **Marginal** schemes — income tax, where each *slice*
pays its own rate — need
[the slice-by-slice model](/articles/payslip-decoded-in-excel/)
instead; applying a banded rate to a whole salary is the classic
way to overstate someone's tax by thousands. Which question is
your scheme asking? That's stage-four maturity in one line:
knowing what the lookup *means* before writing it.

Sorted table, `-1`, test the edges. The mode you were warned
about, doing the one job it was always meant to do.
