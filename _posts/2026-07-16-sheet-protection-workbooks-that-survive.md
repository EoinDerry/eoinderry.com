---
title: "Sheet protection: workbooks that survive other people"
description: Lock the machinery, free the inputs — the protection layers that stop accidental damage, and an honest word about what they don't stop.
date: 2026-07-16
domain: power-tools
---

You've built the model. Named inputs,
[calculated columns](/articles/structured-references-formulas-inside-tables/),
[a checks row](/articles/the-checks-row-self-testing-spreadsheets/),
the works. Then you
[share it](/articles/excel-on-the-web-sharing-workbooks/) — and
within a week someone has typed `4200` over a formula, dragged
a Table sideways, and "tidied" the
[inputs sheet](/articles/organising-a-workbook-sheets-and-structure/)
into abstract art. Nobody meant harm. Spreadsheets are just
open fields, and colleagues wander.

**Sheet protection** builds the fences: which cells accept
hands, which don't. Set up right, it converts "please only type
in the yellow cells" from an email nobody reads into a physical
property of the file.

## The two-step that everyone gets backwards

The confusing part is that protection is two settings, not one
— and the order matters:

1. **Unlock the input cells first.** Every cell is born with a
   `Locked` flag, on by default (`Ctrl+1 → Protection`). The
   flag does *nothing* — until protection turns on, at which
   point every still-locked cell freezes. So: select the cells
   people SHOULD edit — the inputs, the entry columns — and
   *untick Locked*.
2. **Then protect the sheet.** `Review → Protect Sheet`. Now
   the locked majority is read-only, and the unlocked minority
   still takes typing. Tab even walks between unlocked cells
   like a form.

Backwards — protecting first, wondering why nothing is editable
— is everyone's first attempt. Unlock, *then* lock the world.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A worksheet where typing attempts bounce off locked formula cells but land in the unlocked green input cells">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#F4F2EA;stroke:#E6E4D9}
    .in{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1.4}
    .bounce{animation:spb 5s ease-in-out infinite}
    @keyframes spb{0%,18%{opacity:0;transform:translateY(0)}26%{opacity:1;transform:translateY(0)}36%{opacity:1;transform:translateY(-10px)}46%,100%{opacity:0;transform:translateY(-22px)}}
    .land{animation:spl 5s ease-in-out infinite}
    @keyframes spl{0%,50%{opacity:0}62%,90%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">protected sheet — locked grey, unlocked green</text>
  <rect x="60" y="44" width="160" height="36" class="g"/><text x="72" y="67" class="t">=SUM(...)  🔒</text>
  <rect x="220" y="44" width="160" height="36" class="g"/><text x="232" y="67" class="t">=XLOOKUP.. 🔒</text>
  <rect x="380" y="44" width="160" height="36" class="in"/><text x="392" y="67" class="t">rate: 4.5%</text>
  <rect x="60" y="80" width="160" height="36" class="g"/><text x="72" y="103" class="t">=IF(check.. 🔒</text>
  <rect x="220" y="80" width="160" height="36" class="in"/><text x="232" y="103" class="t">units: 120</text>
  <rect x="380" y="80" width="160" height="36" class="g"/><text x="392" y="103" class="t">=PMT(...)  🔒</text>
  <g class="bounce"><text x="96" y="40" class="h" fill="#C0392B">"4200" ✗</text></g>
  <g class="land"><text x="248" y="140" class="h" fill="#0A5C3B">"135" ✓ lands here</text></g>
  <text x="60" y="180" class="t">typing bounces off the machinery and lands in the fields —</text>
  <text x="60" y="202" class="t">the please-only-edit-the-inputs email, enforced by the file itself</text>
</svg>
<figcaption>Locked cells shrug typing off; unlocked cells accept it. The fence does what no amount of cell-colouring convention ever did.</figcaption>
</figure>

Three refinements worth their clicks: the Protect dialog's
checkboxes let you *permit* safe actions on locked sheets
([sorting, filtering](/articles/sorting-and-filtering-without-wrecking-your-data/),
pivot use) — tick what the workflow needs rather than freezing
everything; **Hidden** (Locked's neighbour in `Ctrl+1`) hides a
cell's *formula* from the bar while showing its value — for
the rare genuinely sensitive logic; and **Protect Workbook**
(the button beside it) fences the *structure* — no deleting,
renaming or un-hiding
[of sheets](/articles/organising-a-workbook-sheets-and-structure/)
— which is what actually stops the classic
"deleted the Calc tab" incident.

Pair the fences with the course's other guard rails and entry
becomes genuinely hard to fumble:
[validation](/articles/drop-down-lists-data-validation/)
policing *what* goes in the unlocked cells, protection policing
*where* — and upstream of both, the
[Forms question](/articles/forms-to-excel-data-arrives-clean/):
should this typing be happening in a workbook at all?

## What protection is not

Say it plainly, because the stakes deserve it: **sheet
protection is a fence, not a safe.** The password is trivially
bypassed by anyone motivated — it exists to prevent
*accidents*, not to defeat *adversaries*. Confidential data is
protected by [where the file lives and who it's shared with](/articles/where-files-should-live-onedrive-sharepoint-teams/)
— permissions, not passwords-on-sheets. And never let a
protection password become the only copy of itself: an
un-openable model is
[the inheritance problem](/articles/auditing-formulas-trace-evaluate-trust/)
at its worst. Record it where your successor will look.

The mindset shift, final form: a shared workbook is an
*interface*, and interfaces get designed — inputs open, engine
fenced, structure pinned,
[checks watching](/articles/the-checks-row-self-testing-spreadsheets/).
People wander; good fences mean it no longer matters. That's
not distrust — it's hospitality. The yellow cells are finally,
enforceably, yellow.
