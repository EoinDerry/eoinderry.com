---
title: "Office Scripts: automation for the browser era"
description: VBA doesn't run on the web — Office Scripts is what does. The recorder, the honest comparison with macros, and the schedule button that changes everything.
date: 2026-07-16
---

[The macro lesson](/articles/your-first-macro-and-when-not-to/)
ends with an asterisk that grows larger every year: **VBA doesn't
run in the browser.** As workbooks move to
[OneDrive and co-authoring](/articles/excel-on-the-web-sharing-workbooks/),
the classic macro becomes a button that half your colleagues
can't press. Microsoft's successor is **Office Scripts** — the
same record-and-replay idea, rebuilt for the web era — and it
comes with one capability VBA never had that quietly matters
more than everything else.

## Same recorder, new engine

In Excel on the web (or modern desktop), the **Automate tab**:
`Record Actions`, perform your ritual, stop, name it. Identical
workflow to the
[macro recorder](/articles/your-first-macro-and-when-not-to/) —
format the header, sort the
[Table](/articles/format-as-table-the-feature-that-changes-everything/),
hide the workings — and the same rule applies: record calmly,
once, correctly.

The differences under the hood:

| | VBA macro | Office Script |
|---|-----------|---------------|
| Lives in | the .xlsm file | your cloud account (shareable) |
| Runs in | desktop only | browser + desktop |
| Language | VBA | TypeScript |
| Reach | anything, incl. your PC | the workbook, sandboxed |
| Can run unattended? | no | **yes — Power Automate** |

That "sandboxed" row is a feature in both directions: scripts
can't touch your file system or registry, which kills a whole
class of macro-security fear — the browser prompt anxiety of
`.xlsm` attachments doesn't exist here.

## Reading what it wrote (déjà vu, better)

`Automate → your script → Edit` shows the recording as
TypeScript. As with VBA, you're not required to become a
programmer — but the recorded code is noticeably cleaner to
read (`worksheet.getRange("A1").getFormat().getFont().setBold(true)`
— a sentence, if a verbose one), and small edits (changing a
literal, deleting a step) are the same gentle on-ramp. One
genuine improvement: scripts are *typed*, so the editor
underlines mistakes as you make them, before anything runs —
[loud failure](/articles/iferror-ifna-failing-loudly/), brought
forward in time.

## The capability VBA never had

A macro needs a human at the keyboard. An Office Script can be a
**step in a [Power Automate flow](/articles/power-automate-folder-that-fills-itself/)**
— which means it runs *unattended*: on a schedule, or triggered
by an event, against a workbook in the cloud, while nobody's
logged in.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A clock triggers a flow that runs an Office Script against a cloud workbook and posts the result, with no human present">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .pipe{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#osa)}
    .hand{animation:osclock 5s linear infinite;transform-origin:120px 110px}
    @keyframes osclock{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    .st1{opacity:0;animation:osstep 5s ease-in-out infinite;animation-delay:0.8s}
    .st2{opacity:0;animation:osstep 5s ease-in-out infinite;animation-delay:1.6s}
    .st3{opacity:0;animation:osstep 5s ease-in-out infinite;animation-delay:2.4s}
    @keyframes osstep{0%,10%{opacity:0}22%,86%{opacity:1}96%,100%{opacity:0}}
  </style>
  <defs><marker id="osa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="70" y="36" class="h">Mon 07:00</text>
  <circle cx="120" cy="110" r="44" fill="#fff" stroke="#0E7A4F" stroke-width="1.6"/>
  <g class="hand"><line x1="120" y1="110" x2="120" y2="76" stroke="#0E7A4F" stroke-width="2.6" stroke-linecap="round"/></g>
  <circle cx="120" cy="110" r="4" fill="#0E7A4F"/>
  <path d="M172 110 h48" class="pipe"/>
  <g class="st1">
    <rect x="226" y="80" width="160" height="60" rx="8" class="g"/>
    <text x="240" y="106" class="h">the flow</text>
    <text x="240" y="126" class="t">run script →</text>
  </g>
  <path d="M386 110 h48" class="pipe"/>
  <g class="st2">
    <rect x="440" y="80" width="180" height="60" rx="8" class="acc"/>
    <text x="454" y="104" class="h">cloud workbook</text>
    <text x="454" y="126" class="t">sorted · refreshed · tidied</text>
  </g>
  <g class="st3">
    <text x="226" y="196" class="t">…then post the summary to Teams, email the PDF, notify you it ran.</text>
    <text x="226" y="218" class="h">nobody was at a keyboard</text>
  </g>
</svg>
<figcaption>The recording that needed you becomes a step that doesn't. Scheduled, triggered, unattended — the one trick VBA could never learn.</figcaption>
</figure>

That unlocks the endgame for the
[monthly-report pipeline](/articles/power-query-combine-monthly-files/)
this series keeps returning to: attachments
[file themselves](/articles/power-automate-folder-that-fills-itself/),
the script refreshes and tidies the workbook Monday at 07:00,
the flow posts "report's ready" to Teams — and the human
contribution to the whole ritual is *reading the answer*. Every
piece is visible, named, and
[fails loudly](/articles/iferror-ifna-failing-loudly/) into the
flow's run history.

## The honest boundaries

The rules from the macro lesson survive translation intact:
scripts are for *interface rituals and orchestration*;
data shaping still belongs to
[the recipe](/articles/power-query-combine-monthly-files/),
calculations to
[formulas](/articles/let-and-lambda-formulas-you-can-read/).
Coverage has gaps VBA doesn't — scripts can't drive other
applications, pop custom dialogs, or reach outside the workbook
— so the deep VBA estates in legacy files aren't going anywhere
soon; the practical rule of thumb: **new automation on shared
cloud workbooks → script; desktop-only, file-touching, or
inherited → macro stays.** And scripts need work/school 365 —
home licences currently watch from the sidelines.

The arc across these three automation lessons is worth noticing
as [the syllabus](/roadmap/) closes: record the ritual, read
what was recorded, wire it to a trigger, and keep every moving
part where eyes can find it. The tools will keep being renamed.
The shape of good automation — visible, boring, loud when it
breaks — apparently never changes.
