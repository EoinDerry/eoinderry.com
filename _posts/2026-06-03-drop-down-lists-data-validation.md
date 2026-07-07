---
title: "Drop-down lists: let people enter only the right thing"
description: Data validation is how a spreadsheet defends itself — build proper drop-downs, cascade them, and stop the typo problem at the door.
date: 2026-06-03
domain: power-tools
---

Half of all messy data is born messy: someone typed `dub`, someone
typed `Dublin `, someone typed `DUBLIN.`, and three months later a
report insists you operate in four cities. You can clean that up every
time it happens — the [4:45pm routine](/articles/the-445pm-export-cleaning-messy-data/)
exists for a reason — or you can stop it at the door.

Drop-down lists are the door.

## The two-minute version

1. Put your allowed values somewhere sensible — a small Table on a
   sheet called `Lists` (say `Dublin`, `Cork`, `Galway`).
2. Select the cells people will type in.
3. **Data → Data Validation → Allow: List**, and point Source at your
   list.

Now the cell offers a drop-down, and anything outside the list is
politely refused. The typo problem doesn't get cleaned — it never
happens.

<figure class="guide-fig">
<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A source list feeding a validated drop-down cell">
  <style>.t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}.h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}.g{fill:#fff;stroke:#E6E4D9}.hd{fill:#EAF4EE;stroke:#DCEDE4}.sel{fill:#fff;stroke:#0E7A4F;stroke-width:1.6}.ar{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#b)}</style>
  <defs><marker id="b" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="60" y="24" class="h">Lists sheet</text>
  <g>
    <rect x="60" y="40" width="130" height="28" class="hd"/><text x="72" y="59" class="t">Region</text>
    <rect x="60" y="68" width="130" height="28" class="g"/><text x="72" y="87" class="t">Dublin</text>
    <rect x="60" y="96" width="130" height="28" class="g"/><text x="72" y="115" class="t">Cork</text>
    <rect x="60" y="124" width="130" height="28" class="g"/><text x="72" y="143" class="t">Galway</text>
  </g>
  <path d="M200 95 h110" class="ar"/>
  <text x="222" y="84" class="t">validation</text>
  <text x="330" y="24" class="h">Entry sheet</text>
  <g>
    <rect x="330" y="60" width="180" height="34" class="sel"/><text x="342" y="82" class="t">Dublin        ▾</text>
    <rect x="330" y="94" width="180" height="92" class="g"/>
    <text x="342" y="116" class="t">Dublin</text>
    <text x="342" y="140" class="t">Cork</text>
    <text x="342" y="164" class="t">Galway</text>
  </g>
  <text x="330" y="215" class="t">"dub", "DUBLIN." → refused at the door</text>
</svg>
<figcaption>One small source Table, one validation rule — and the data is born clean.</figcaption>
</figure>

## Do it properly: source from a Table

Most tutorials have you type values straight into the Source box, or
point at a fixed range like `$A$2:$A$4`. Both rot: add "Belfast" later
and your drop-downs don't know.

Instead, make the source list a **Table** (this is why
[Tables come first](/articles/format-as-table-the-feature-that-changes-everything/)),
then point the validation at it. In current Excel you can reference it
directly in the Source box:

```
=Regions[Region]
```

(In older versions, wrap the column in a named range and use the name.)
Now the drop-down grows when the list grows. Nobody maintains
anything.

## Cascading drop-downs — the party trick that's actually useful

*Choose a region, then see only that region's branches.* Two
validations, where the second list depends on the first choice. The
modern way is beautifully clean — the second validation's source is:

```
=FILTER(Branches[Branch], Branches[Region]=$A2)
```

One Table of branches with their regions, one FILTER, and the second
drop-down reshapes itself to match whatever was picked in A2. (This
leans on dynamic arrays — Excel 2021/365. The old INDIRECT-and-named-
ranges dance still works, but if you have FILTER, use FILTER.)

## Three finishing touches that separate pro sheets

- **Input message** (second tab of the validation dialog): a small
  hint that appears on selection — *"Pick the region from the list."*
  Cheaper than answering the same question weekly.
- **Reject vs warn** (third tab): *Stop* forbids, *Warning* allows
  with a nudge. Use Stop for categories, Warning for things with rare
  legitimate exceptions.
- **Guard the numbers too.** Validation isn't just lists: Allow →
  Whole Number between 0 and 100 ends the negative-percentage genre
  of bug at the door as well.

## The honest limits

Validation checks what's *typed*. Pasting over a validated cell can
smuggle anything in — so for sheets other people fill in, protect the
layout (Review → Protect Sheet, leaving entry cells unlocked). And
validation is not security; it's ergonomics. Its job is to make the
right entry the easy entry.

That's the real lesson of this stage of [the path](/roadmap/): the
best data cleaning is the cleaning that never needs to happen.
