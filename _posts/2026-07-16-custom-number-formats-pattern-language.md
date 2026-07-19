---
title: "Custom number formats: the pattern language"
description: Behind Ctrl+1 sits a tiny language for dressing values — four sections, a handful of symbols, and displays that do work without touching a single number.
date: 2026-07-16
domain: foundations
---

[The number-formats lesson](/articles/number-formats-costume-not-value/)
established the constitution: values are truth, display is
costume, and the costume can't touch the numbers. This lesson is
the tailoring course. Behind `Ctrl+1 → Custom` sits a small
pattern language — one line of symbols that controls exactly how
a value dresses — and knowing a dozen of its words replaces a
hundred ugly workarounds.

## The grammar: four sections, one line

A custom format is up to four patterns separated by semicolons:

```
positive ; negative ; zero ; text
```

Give fewer and Excel fills sensibly (one pattern covers
everything). The accountant's classic uses all four ideas at
once:

```
#,##0;[Red](#,##0);"—";@
```

Positives with thousands separators; negatives red and
bracketed; zeros as a quiet dash; text passed through (`@` means
"the text itself"). One line, and a column reads like a
published report — while every underlying value stays exactly
what [the formulas](/articles/sum-average-count-basics-done-properly/)
need.

The vocabulary is smaller than it looks: `0` = always show a
digit (pad if needed), `#` = show if present, `,` = thousands
separator, `.` = decimal point, `"text"` = literal text,
`[Red]`/`[Blue]` = colour, `@` = the text value. That's most of
the language.

## The recipes worth stealing

**Units without sin.** `0.0" kg"` displays `2.3 kg` while the
cell holds `2.3` — still summable, still
[chartable](/articles/charts-that-tell-the-truth/). Typing
`2.3 kg` as text is the beginner version; it looks the same and
[breaks every calculation](/articles/the-445pm-export-cleaning-messy-data/).
The format is how you get both.

**Thousands and millions, honestly.** A trailing comma divides
the *display* by a thousand: `#,##0,` shows `48,213,062` as
`48,213`; `#,##0,,"M"` shows it as `48M`. The value never moves
— the honest big-figures trick from
[the first formats lesson](/articles/number-formats-costume-not-value/),
now yours to write.

**Padded IDs.** `00000` displays `42` as `00042` — the answer to
lost leading zeros *when the values are genuinely numbers*. (IDs
that should never be arithmetic at all belong as
[text from import](/articles/csv-encoding-import-what-went-wrong/);
this recipe is for counters you compute.)

**Dates with a day name.** `ddd dd mmm` → `Wed 16 Jul`;
`mmmm yyyy` → `July 2026`. Every date column in a
[print-ready report](/articles/print-and-pdf-sheets-people-can-read/)
deserves a deliberate date costume rather than the default.

**Hiding, carefully.** `;;;` (three semicolons, nothing else)
displays nothing at all — the cell looks empty while holding its
value. Occasionally right (a
[helper flag](/articles/the-checks-row-self-testing-spreadsheets/)
that only [conditional formatting](/articles/conditional-formatting-highlights-not-decoration/)
reads); mostly a trap for the next reader — prefer a hidden
column, which at least announces itself.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One stored value shown wearing several custom format costumes in turn: units, thousands, padded ID, accountancy negative">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .big{font:600 22px 'IBM Plex Mono',monospace;fill:#0E7A4F}
    .g{fill:#fff;stroke:#E6E4D9}
    .core{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4}
    .c1{opacity:0;animation:cnf 8s ease-in-out infinite}
    .c2{opacity:0;animation:cnf 8s ease-in-out infinite;animation-delay:2s}
    .c3{opacity:0;animation:cnf 8s ease-in-out infinite;animation-delay:4s}
    .c4{opacity:0;animation:cnf 8s ease-in-out infinite;animation-delay:6s}
    @keyframes cnf{3%,22%{opacity:1}0%,25%,100%{opacity:0}}
  </style>
  <text x="60" y="30" class="h">the value</text>
  <rect x="60" y="44" width="170" height="64" class="core"/>
  <text x="80" y="84" class="big">-48213.5</text>
  <text x="60" y="140" class="t">held once, never edited</text>
  <path d="M240 76 h64" stroke="#0E7A4F" stroke-width="1.6" fill="none" marker-end="url(#cnfa)"/>
  <defs><marker id="cnfa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="316" y="30" class="h">the costumes</text>
  <rect x="316" y="44" width="300" height="64" class="g"/>
  <g class="c1"><text x="334" y="76" class="big" fill="#C0392B">(48,214)</text><text x="334" y="98" class="t">#,##0;[Red](#,##0)</text></g>
  <g class="c2"><text x="334" y="76" class="big">-48.2 t</text><text x="334" y="98" class="t">0.0" t" — units, still a number</text></g>
  <g class="c3"><text x="334" y="76" class="big">-£48k</text><text x="334" y="98" class="t">£#,##0,"k" — display ÷ 1,000</text></g>
  <g class="c4"><text x="334" y="76" class="big">-48,213.50</text><text x="334" y="98" class="t">#,##0.00 — the plain suit</text></g>
  <text x="60" y="190" class="t">four costumes on rotation; the wardrobe line is one field in Ctrl+1 →</text>
  <text x="60" y="212" class="t">Custom — and SUM sees the same number under every one of them</text>
</svg>
<figcaption>One value, a wardrobe of one-line patterns. The tailoring never touches the number — which is the entire constitution of formatting.</figcaption>
</figure>

## The boundaries

Three, honestly held. **Conditions beyond colour belong to
conditional formatting** — the language allows `[>1000]`-style
tests, but rules written in
[Manage Rules](/articles/conditional-formatting-highlights-not-decoration/)
are visible and maintainable; format-string logic is a message
in a bottle. **Text-heavy displays belong to formulas** — if the
costume needs `TEXT()`-level gymnastics, build the display
string in [its own column](/articles/text-functions-textbefore-textafter/)
and keep the value pure beside it. And **the reader outranks the
tailor**: a format that makes a colleague ask "is that
thousands?" failed, however clever —
[chart-title rules](/articles/charts-that-tell-the-truth/) apply
to number costumes too. Label the units somewhere the eye
lands.

Four sections, a dozen symbols, five recipes. The costume
department turns out to have a workshop — and every stitch of
it obeys the first law you learned:
the value underneath never moves.
