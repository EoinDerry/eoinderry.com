---
title: "Your first macro (and when not to record one)"
description: The macro recorder turns a fiddly manual routine into a button — how to record one properly, read what it wrote, and the honest map of what belongs to Power Query instead.
date: 2026-07-16
domain: power-tools
---

There's a moment near the end of [the path](/roadmap/) when you
notice you perform a little ritual — the same eight clicks, every
time, on every file. Format the header,
[set the print area](/articles/print-and-pdf-sheets-people-can-read/),
hide the workings, save as PDF. None of it is *thinking*; all of
it is time. Excel has had an answer since 1993: **record it
once, replay it forever.**

That's a macro — your actions written down as VBA code — and the
recorder means your first one requires no programming at all.

## Recording one, properly

First, the one-time setup: macros need the **Developer tab**
(File → Options → Customize Ribbon → tick Developer) and a
workbook saved as **.xlsm** — the macro-enabled format. (That
security prompt when opening macro files exists because macros
can do *anything*; respect it in both directions — enable your
own, question strangers'.)

Then: `Developer → Record Macro`, name it (`Tidy_For_Print`, not
`Macro1` — [the naming rule](/articles/named-ranges-formulas-read-like-sentences/)
follows you everywhere), optionally a shortcut key, and **Record**.
Perform your ritual — calmly, correctly, once. **Stop Recording.**
Done: `Alt+F8` (or your shortcut) now replays the whole ritual in
half a second.

One recording habit separates macros that last from macros that
break next Tuesday: **relative vs absolute**. The recorder
normally writes exact addresses — "select C7" — so the macro
only works on sheets shaped exactly like today's. The `Use
Relative References` toggle records *movements* instead ("two
cells right"). Rule of thumb: formatting a fixed report layout,
absolute is fine; doing something "wherever I'm standing",
toggle relative first. When a macro misbehaves, this toggle is
the first suspect —
[the $-sign lesson](/articles/the-dollar-sign-cell-references-explained/),
reincarnated.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A recorded ritual of clicks compressed into a single button press that replays every step instantly">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .rec{fill:#C0392B}
    .step{opacity:0.4;animation:mcstep 5.5s ease-in-out infinite}
    .s2{animation-delay:0.3s}.s3{animation-delay:0.6s}.s4{animation-delay:0.9s}
    @keyframes mcstep{0%,8%{opacity:0.4}14%,22%{opacity:1}30%,100%{opacity:0.4}}
    .press{opacity:0;animation:mcpress 5.5s ease-in-out infinite}
    @keyframes mcpress{0%,45%{opacity:0}55%,92%{opacity:1}100%{opacity:0}}
    .zap{opacity:0;animation:mczap 5.5s ease-in-out infinite}
    @keyframes mczap{0%,55%{opacity:0}62%,90%{opacity:1}96%,100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">recorded once…</text>
  <circle cx="220" cy="20" r="6" class="rec"/>
  <g class="step"><rect x="60" y="40" width="180" height="30" class="g"/><text x="72" y="60" class="t">1 format header</text></g>
  <g class="step s2"><rect x="60" y="72" width="180" height="30" class="g"/><text x="72" y="92" class="t">2 hide workings</text></g>
  <g class="step s3"><rect x="60" y="104" width="180" height="30" class="g"/><text x="72" y="124" class="t">3 set print area</text></g>
  <g class="step s4"><rect x="60" y="136" width="180" height="30" class="g"/><text x="72" y="156" class="t">4 export PDF</text></g>
  <text x="330" y="26" class="h">…replayed forever</text>
  <g class="press"><rect x="330" y="80" width="170" height="44" rx="8" class="acc"/><text x="348" y="108" class="h">▶ Tidy_For_Print</text></g>
  <g class="zap">
    <text x="520" y="94" class="t">all four steps,</text>
    <text x="520" y="114" class="t">half a second,</text>
    <text x="520" y="134" class="t">zero fumbles</text>
  </g>
  <text x="60" y="212" class="t">the ritual still happens — you just stopped being the one performing it</text>
</svg>
<figcaption>Eight clicks become one button. The recorder writes the code; you supply the ritual — once, carefully, and never again.</figcaption>
</figure>

## Read what it wrote

Press `Alt+F11` and look at your recording in the VBA editor —
not to become a programmer, but because two minutes of reading
demystifies the whole thing: your clicks, as sentences
(`Range("A1").Font.Bold = True`). Two small edits are safe and
educational — deleting the noise lines the recorder logs
(`.Select` chains, scrolling), and changing a literal value.
That's the same skill as
[reading a recorded query's steps](/articles/power-query-combine-monthly-files/),
and it's how recording becomes, eventually, writing. Attach the
macro to a button (`Insert → Shapes`, right-click → Assign Macro)
and your ritual now ships with a UI.

## When *not* to record one

The honest half of the lesson, because macro enthusiasm has
wrecked more workbooks than it's saved. The modern rule:

| The job | The right tool |
|---------|----------------|
| Import, clean, combine, refresh data | [Power Query](/articles/power-query-combine-monthly-files/) — repeatable *and* inspectable, no code |
| Calculations, even gnarly ones | [Formulas, LET, LAMBDA](/articles/let-and-lambda-formulas-you-can-read/) — live, auditable |
| Moving files, sending alerts | [Power Automate](/articles/power-automate-folder-that-fills-itself/) |
| Needs to run in the browser | [Office Scripts](/articles/office-scripts-macros-browser-era/) — VBA doesn't run on the web, full stop |
| Fiddly *interface* rituals — formatting, printing, layout | **Macros. This is the niche.** |

VBA's honest niche in a modern workbook is the last row: driving
Excel's *interface* — the clicks themselves. It's also the legacy
layer you'll inherit (decades of workbooks run on it, which is
why reading recorder output matters even if you never write a
line). But a macro is a black box to everyone who can't read it
— invisible in the sheet,
[unauditable by arrow](/articles/auditing-formulas-trace-evaluate-trust/),
mute on the web. Every job a visible tool can do, the visible
tool should do.

Record the ritual, read the recording, assign the button — and
keep the machinery where people can see it for everything else.
Automation was never the goal; *attention back for thinking* was.
The button is just the receipt.
