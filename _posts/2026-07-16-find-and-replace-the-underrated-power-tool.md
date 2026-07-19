---
title: "Find & Replace: the underrated power tool"
description: Ctrl+F is the tip of something bigger — wildcards, format hunting, workbook-wide sweeps, and the replace jobs that fix a thousand cells in one click.
date: 2026-07-16
domain: foundations
---

Everyone knows `Ctrl+F`. Almost nobody clicks **Options** on the
dialog it opens — and behind that button sits one of Excel's
most capable tools, quietly able to sweep a whole workbook,
hunt by format, and repair a thousand cells in a click. Find &
Replace is a foundations lesson with power-tool reach, which is
exactly why it earns its place on
[the path](/roadmap/) early.

## Find, properly

The Options that change the game:

- **Within: Workbook** — search every sheet at once. The answer
  to "where did I put that customer?" across
  [a multi-tab file](/articles/organising-a-workbook-sheets-and-structure/),
  and the **Find All** list below it is clickable — a results
  panel that jumps you cell to cell.
- **Look in: Formulas vs Values** — the distinction
  [you already understand](/articles/number-formats-costume-not-value/):
  search what cells *hold* or what they *show*. Hunting a
  hard-typed `1042` that should be a formula? Formulas. Hunting
  what the reader sees? Values.
- **Match entire cell contents** — finds `Cork` but not
  `Corkscrew`; the difference between surgical and sloppy.
- **Match case** — off by default, occasionally everything.

And the two wildcards, which work here and
[in lookups alike](/articles/matching-messy-keys-between-tables/):
`*` for any run of characters, `?` for exactly one. `B?rne`
catches Byrne and Barne; `*Ltd` catches everything ending Ltd.
To search for a *literal* asterisk or question mark, prefix a
tilde: `~*`.

## Replace: bulk repair, with the safety catch

Replace is Find with consequences, and it does honest cleaning
work at speed: the rogue `.` in `dub.`
[before the region sums](/articles/sumifs-and-friends-answers-from-a-list/),
a renamed product across four sheets, double spaces to single
(the poor cousin of
[TRIM](/articles/the-445pm-export-cleaning-messy-data/), but
in-place). Two of its best tricks are barely known:

- **Replace with nothing** strips characters wholesale — find
  `£`, replace with empty, and pasted-from-web
  [text-numbers](/articles/the-445pm-export-cleaning-messy-data/)
  become summable. (Cleaner than retyping; still check the
  column sums after.)
- **Replace formats** — set a *format* in Find, another in
  Replace, leave the text boxes empty: every manually-yellowed
  cell becomes un-yellowed. This is how you unpick years of
  hand-painted highlighting on the way to
  [rules that mean something](/articles/conditional-formatting-highlights-not-decoration/).

<figure class="guide-fig">
<svg viewBox="0 0 660 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A workbook-wide replace sweeps through many cells at once, fixing every variant in one pass">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .fix{fill:#EAF4EE;stroke:#0E7A4F}
    .sweep{animation:frsweep 5s ease-in-out infinite}
    @keyframes frsweep{0%,12%{transform:translateX(0)}70%,100%{transform:translateX(430px)}}
    .c1{animation:frfix 5s ease-in-out infinite;animation-delay:0.6s}
    .c2{animation:frfix 5s ease-in-out infinite;animation-delay:1.2s}
    .c3{animation:frfix 5s ease-in-out infinite;animation-delay:1.8s}
    @keyframes frfix{0%,10%{opacity:0}20%,90%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">Replace All: "dub." → "Dublin"   (Within: Workbook)</text>
  <rect x="60" y="48" width="140" height="34" class="g"/><text x="72" y="70" class="t">dub.</text>
  <g class="c1"><rect x="60" y="48" width="140" height="34" class="fix"/><text x="72" y="70" class="t">Dublin</text></g>
  <rect x="230" y="48" width="140" height="34" class="g"/><text x="242" y="70" class="t">dub.</text>
  <g class="c2"><rect x="230" y="48" width="140" height="34" class="fix"/><text x="242" y="70" class="t">Dublin</text></g>
  <rect x="400" y="48" width="140" height="34" class="g"/><text x="412" y="70" class="t">dub.</text>
  <g class="c3"><rect x="400" y="48" width="140" height="34" class="fix"/><text x="412" y="70" class="t">Dublin</text></g>
  <g class="sweep"><rect x="52" y="40" width="18" height="50" rx="4" fill="#0E7A4F" opacity="0.25"/></g>
  <text x="60" y="130" class="h">…and the safety catch:</text>
  <text x="60" y="158" class="t">1  Find All first — READ the list of what will change</text>
  <text x="60" y="182" class="t">2  then Replace All — and check the count it reports</text>
  <text x="60" y="206" class="t">3  Ctrl+Z reverses the whole sweep if the count surprises you</text>
</svg>
<figcaption>One pass, every variant, whole workbook. The discipline is the order: see the list, then pull the trigger, then read the receipt.</figcaption>
</figure>

The safety catch matters because Replace All is
[Remove Duplicates' cousin](/articles/removing-duplicates-without-losing-data/):
fast, silent, and happy to change things you forgot matched.
`dub` also lives inside `Dubrovnik`. So the routine is always:
**Find All first** and read what's about to change; *entire cell
contents* on when the value stands alone; Replace All; then
**read the count** — "47 replacements" when you expected 30 is
a finding, not a success. One Ctrl+Z reverses the sweep while
you work out why.

One boundary keeps the tool honest: Find & Replace edits *this
data, once*. The moment a replace becomes monthly ritual —
every export needs the same `dub.` fixed — it stops being a
foundations move and becomes
[a recorded step in the recipe](/articles/power-query-combine-monthly-files/),
where it replays itself and
[nobody has to remember](/articles/your-first-macro-and-when-not-to/).
Same instinct as ever: twice by hand is fine; the third time is
automation's job.

`Ctrl+F`, then Options, then the tilde when the data fights
back. The dialog you've used a thousand times had a second life
waiting the whole time.
