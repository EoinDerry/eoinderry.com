---
title: "IFERROR, IFNA and the art of failing loudly"
description: Error values are Excel telling you the truth — the field guide to what each one means, and how to handle them without gagging the messenger.
date: 2026-07-16
domain: formulas
---

Nobody likes a sheet full of `#N/A`. So the internet teaches one
reflex: wrap everything in `IFERROR`, replace the ugly cells with
blanks, ship the report. And that reflex has buried more real
problems than any other formula habit — because an error value
isn't Excel misbehaving. It's Excel **telling you the truth** about
something you'd rather know now than in the meeting.

This lesson is the field guide: what each error means, how to
handle the expected ones, and how to keep the unexpected ones
*loud*.

## Read the error — each one is a different sentence

| Error | What Excel is actually saying |
|-------|-------------------------------|
| `#N/A` | "I looked, and it isn't there." A [lookup](/articles/xlookup-the-lookup-to-learn-first/) found no match. |
| `#VALUE!` | "You gave me the wrong *kind* of thing" — text where a number should be, usually [a text-number or costume date](/articles/the-445pm-export-cleaning-messy-data/). |
| `#REF!` | "The cell this pointed at has been deleted." The formula's map has a hole — undo, or repair the reference. |
| `#DIV/0!` | "You divided by zero" — often a blank denominator, a fact worth knowing. |
| `#NAME?` | "I don't recognise that word" — a typo'd function or a [name](/articles/let-and-lambda-formulas-you-can-read/) that doesn't exist. |
| `#SPILL!` | "No room to land" — [something's blocking the spill](/articles/dynamic-arrays-filter-sort-unique/). |

Notice something: **most of these are your data or your typing,
not your logic.** `#VALUE!` is nearly always a cleaning job;
`#NAME?` is a spelling job; `#REF!` is a deletion to undo. Only
`#N/A` is routinely *legitimate* — real data genuinely has gaps —
and that's exactly why it gets special treatment.

## Handle the expected error, precisely

`IFNA` catches **only** `#N/A`:

```
=IFNA(XLOOKUP(A2, Customers, Regions), "Not on file")
```

Now the *expected* failure — an unmatched customer — reads as
information. But a `#VALUE!` from dirty data still comes through
loud, because `IFNA` doesn't catch it. That's the design: **catch
what you anticipated; let the rest scream.**

`IFERROR` catches *everything*, and that's precisely its danger:

```
=IFERROR(anything, "")
```

reads as "whatever goes wrong — wrong kind of data, deleted
references, typos I haven't made yet — show nothing." Wrong
answers with a blank costume. Use `IFERROR` only where any failure
truly has the same meaning (a division that's blank until inputs
arrive, say) — and never, as a policy, to make a report *look*
finished.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="IFNA lets an unexpected VALUE error through as a loud alarm while handling the expected N/A quietly; IFERROR silences both">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .ok{fill:#EAF4EE;stroke:#0E7A4F}
    .bad{fill:#F6E7E2;stroke:#C0392B}
    .alarm{animation:errpulse 2.4s ease-in-out infinite}
    @keyframes errpulse{0%,100%{fill-opacity:1}50%{fill-opacity:0.4}}
  </style>
  <text x="60" y="26" class="h">=IFNA(lookup, "Not on file")   — precise</text>
  <rect x="60" y="40" width="180" height="34" class="ok"/><text x="72" y="62" class="t">Not on file</text>
  <text x="252" y="62" class="t">← expected gap, handled</text>
  <g class="alarm"><rect x="60" y="80" width="180" height="34" class="bad"/><text x="72" y="102" class="h">#VALUE!</text></g>
  <text x="252" y="102" class="t">← dirty data, still LOUD ✓</text>
  <text x="60" y="156" class="h">=IFERROR(lookup, "")   — a gag</text>
  <rect x="60" y="170" width="180" height="34" class="g"/><text x="252" y="192" class="t">← expected gap, hidden</text>
  <rect x="60" y="208" width="180" height="34" class="g"/><text x="252" y="230" class="t">← dirty data, ALSO hidden ✗</text>
</svg>
<figcaption>IFNA answers the question you anticipated and lets everything else stay visible. IFERROR silences the messenger — including the one you needed.</figcaption>
</figure>

## Keep the unexpected loud

Failing loudly is a design choice, and it's cheap:

- **Fix causes before catching symptoms.** A column of `#VALUE!`
  means clean the data; a wall of `#N/A` in a lookup means
  [check the keys](/articles/the-445pm-export-cleaning-messy-data/).
  Wrapping either in a handler is painting over the damp patch.
- **Give totals a tripwire.** A `SUM` over a range quietly ignores
  text but *propagates* errors — which is a feature: the total
  goes `#VALUE!` and someone investigates. If you need a summary
  that survives errors while still reporting them, count them:
  `=SUMPRODUCT(--ISERROR(range))` in a checks row — zero is green,
  anything else names the problem before your reader finds it.
- **Blank is the most dangerous costume.** `IFERROR(x, "")` makes
  failure look like "nothing happened". `IFERROR(x, "CHECK ME")`
  at least fails honestly. Best of all is a
  [conditional format](/articles/conditional-formatting-highlights-not-decoration/)
  that makes the check-cells glow — errors as exceptions,
  spotlighted like any other exception.

The instinct to protect readers from ugly cells is decent — but
readers don't need protecting from *information*; they need
protecting from *wrong numbers wearing tidy clothes*. A report
with one honest `#N/A` is embarrassing; a report that silently
summed 4,970 of 5,000 rows is dangerous.

Errors are stage three of [the path](/roadmap/) because this is
where formulas grow up: real logic, run on real data, fails
sometimes — and mature sheets are the ones that decided *in
advance* which failures are answers and which are alarms.

Catch what you expect with `IFNA`. Let everything else scream.
The scream is the feature.
