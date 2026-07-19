---
title: "CSV, encoding and the £ that became Â£"
description: The plainest file format in computing, and everything Excel silently does to it on the way in — leading zeros, mangled symbols, date massacres, and the import routine that prevents all of it.
date: 2026-07-16
domain: working-with-data
---

A CSV is the simplest file in computing — values, commas, line
breaks, nothing else. Which makes it genuinely strange that
opening one is among the most dangerous clicks in Excel. The
file is fine; it's the *opening* that wrecks it, because
double-clicking a CSV invites Excel to guess what everything is
— and Excel guesses with confidence.

The greatest hits, every office, every year: phone numbers and
account codes **lose their leading zeros** (`07701…` → `7701…`,
because Excel decided they were numbers); the product code
`MAR1` becomes **1 March**; long IDs collapse into scientific
notation (`8.90051E+15` — and the true digits are *gone*, not
hidden); and `£` arrives as `Â£`, names like `Müller` as
`MÃ¼ller`. None of these are file corruption. All of them are
guesses applied at the door.

## The two-minute theory

Two facts explain everything above.

**Fact one: CSV has no types.** Unlike
[a real workbook](/articles/number-formats-costume-not-value/),
a CSV can't say "this column is text". Every value is just
characters, and *someone* must decide what they are. Left to
itself, Excel decides by pattern: looks numeric → number (bye,
leading zeros), looks date-ish → date
([the costume problem's](/articles/working-with-dates-excel/)
evil twin), too long → scientific. The fix is never a format
applied *after* — the digits are already destroyed — it's
**deciding types at import**.

**Fact two: text has encodings.** Characters are stored as
bytes, and there are several dictionaries for the translation.
Most modern systems write **UTF-8**; Excel, opening a bare CSV,
sometimes assumes an older dictionary — and every character
beyond plain A–Z (£, é, ü, —) turns into the two-character
gibberish of a wrong dictionary: `Â£`, `Ã©`. Nothing is lost;
it's being *read wrong*, and re-reading with the right encoding
restores it perfectly.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The same CSV bytes read through the wrong dictionary produce garbled symbols, and through UTF-8 produce the correct pound sign and accents">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .bad{fill:#F6E7E2;stroke:#C0392B}
    .good{fill:#EAF4EE;stroke:#0E7A4F}
    .sw{opacity:1;animation:csvswap 6s ease-in-out infinite}
    .sw2{opacity:0;animation:csvswap2 6s ease-in-out infinite}
    @keyframes csvswap{0%,35%{opacity:1}48%,88%{opacity:0}100%{opacity:1}}
    @keyframes csvswap2{0%,35%{opacity:0}48%,88%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="30" class="h">the file (bytes — always correct)</text>
  <rect x="60" y="44" width="230" height="40" class="g"/>
  <text x="74" y="70" class="t">C2 A3 33 34 30 · 4D C3 BC …</text>
  <path d="M300 64 h60" stroke="#0E7A4F" stroke-width="1.6" fill="none" marker-end="url(#cva)"/>
  <defs><marker id="cva" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <g class="sw">
    <text x="380" y="30" class="h">wrong dictionary</text>
    <rect x="380" y="44" width="230" height="40" class="bad"/>
    <text x="394" y="70" class="t">Â£340 · MÃ¼ller</text>
    <text x="380" y="116" class="t">every non-ASCII character</text>
    <text x="380" y="136" class="t">doubles into gibberish</text>
  </g>
  <g class="sw2">
    <text x="380" y="30" class="h">read as UTF-8</text>
    <rect x="380" y="44" width="230" height="40" class="good"/>
    <text x="394" y="70" class="t">£340 · Müller</text>
    <text x="380" y="116" class="t">same bytes, right dictionary —</text>
    <text x="380" y="136" class="t">nothing was ever corrupted</text>
  </g>
  <text x="60" y="180" class="t">the file never changes; only the reading does.</text>
  <text x="60" y="202" class="t">choose the dictionary at import and the Â never appears</text>
</svg>
<figcaption>Â£ is not damage — it's one set of bytes read through the wrong dictionary. Import tools let you pick the right one; double-clicking doesn't ask.</figcaption>
</figure>

## The routine: import, never open

So the rule that prevents the whole zoo: **don't double-click
CSVs that matter — import them.** `Data → Get Data → From
Text/CSV` opens the file through
[Power Query](/articles/power-query-combine-monthly-files/),
which asks the two questions double-clicking skips: **File
Origin** (encoding — `65001: UTF-8` fixes the Â£) and, in the
editor, **a type per column** — where account codes are declared
*Text* before Excel ever sees them, dates are told
[their incoming order](/articles/the-445pm-export-cleaning-messy-data/),
and the 16-digit IDs survive intact. Land it in
[a Table](/articles/format-as-table-the-feature-that-changes-everything/),
and — the compounding bonus — the import is now
[a recipe](/articles/power-query-combine-monthly-files/):
next month's file gets the same treatment by refresh, not by
vigilance. (The legacy route,
[Text to Columns' step three](/articles/text-to-columns-and-flash-fill/),
does one-off type-setting too — the query does it *repeatably*.)

Going the other way, two courtesies when *you* export: save as
**CSV UTF-8** (the plain "CSV" option on older Excels writes
the legacy encoding and inflicts the Â£ on the next system),
and remember the export carries
[values in their costumes](/articles/paste-special-values-transpose-multiply/)
— formulas, formats and
[everything else that makes a workbook](/articles/organising-a-workbook-sheets-and-structure/)
stay behind. CSV is a freight container, not a home.

If a mangled file has already happened to you: leading zeros
and long IDs are only recoverable from the *original file*,
re-imported properly — which is the quiet argument for the
[keep-the-original rule](/articles/the-445pm-export-cleaning-messy-data/)
applying to downloads too.

Plainest format in computing; most opinionated doorman. Walk it
through Import, answer the two questions, and the £ stays a £.
