---
title: "Power Automate: the folder that fills itself"
description: The monthly report's last manual step is saving the email attachment — a no-code flow that catches it automatically, and an honest map of where to stop.
date: 2026-07-16
---

If you built [the one-click consolidation](/articles/power-query-combine-monthly-files/),
your monthly report now assembles itself from a folder. Which
leaves exactly one manual step in the whole pipeline: **someone
still has to save the email attachment into that folder.** Every
month. Without going on holiday.

Power Automate exists to delete steps like that one. It's the
plumbing layer of Microsoft 365 — *when this happens, do that* —
and this single flow is the best first project in it: small,
genuinely useful, and finished in fifteen minutes.

## The shape of a flow

A flow has two halves. A **trigger** — the event that starts it —
and **actions** — what happens next. Ours:

> **When** an email arrives with an attachment, from the finance
> system's address → **save** the attachment to the reports
> folder on OneDrive/SharePoint.

Build it at make.powerautomate.com (it's in most Microsoft 365
work licences — the tile you've scrolled past for years):

1. **Create → Automated cloud flow**, trigger: *When a new email
   arrives (V3)*.
2. Open *Advanced options* on the trigger and make it precise:
   **From** = the sender that mails the export, **Has Attachment**
   = Yes, **Subject Filter** if the sender mails other things too.
   Precision here is the whole game — you're writing the
   [drop-down-list](/articles/drop-down-lists-data-validation/) of
   emails allowed to feed your report.
3. Action: **Create file (OneDrive/SharePoint)** → folder = your
   reports folder, name = the attachment's name, content = the
   attachment's content. Wrapped, automatically, in a loop over
   each attachment.

Turn it on. From now on the export files *appear* in the folder,
and next time you open the workbook, Refresh finds them — months
of them, whether you were at your desk or on a beach.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An arriving email's attachment is carried automatically into the reports folder, which the workbook refresh then reads">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .pipe{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#paa)}
    .mail{animation:pamail 5.5s ease-in-out infinite}
    @keyframes pamail{0%,8%{opacity:0;transform:translateY(-14px)}20%,34%{opacity:1;transform:translateY(0)}44%,100%{opacity:0}}
    .att{opacity:0;animation:paatt 5.5s ease-in-out infinite}
    @keyframes paatt{0%,30%{opacity:0;transform:translateX(0)}42%{opacity:1;transform:translateX(0)}62%,88%{opacity:1;transform:translateX(210px)}100%{opacity:0}}
  </style>
  <defs><marker id="paa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="50" y="26" class="h">inbox</text>
  <rect x="50" y="40" width="170" height="120" rx="8" class="g"/>
  <g class="mail">
    <rect x="66" y="58" width="138" height="40" class="g"/>
    <text x="76" y="76" class="t">finance-system@…</text>
    <text x="76" y="92" class="t">"June export" 📎</text>
  </g>
  <g class="att">
    <rect x="86" y="112" width="120" height="30" class="acc"/>
    <text x="96" y="132" class="t">Sales_Jun.xlsx</text>
  </g>
  <text x="240" y="106" class="t">the flow:</text>
  <text x="240" y="124" class="t">right sender?</text>
  <text x="240" y="142" class="t">→ save file</text>
  <text x="330" y="26" class="h">reports folder</text>
  <rect x="330" y="40" width="140" height="120" rx="8" class="g"/>
  <text x="344" y="70" class="t">Sales_Apr.xlsx</text>
  <text x="344" y="92" class="t">Sales_May.xlsx</text>
  <path d="M480 100 h52" class="pipe"/>
  <text x="544" y="26" class="h">workbook</text>
  <rect x="544" y="40" width="76" height="120" rx="8" class="acc"/>
  <text x="554" y="96" class="t">Refresh</text>
  <text x="554" y="116" class="t">reads all</text>
  <text x="50" y="212" class="t">nobody saved anything — the trigger fired, the action filed it, the recipe read it</text>
</svg>
<figcaption>Email in, file filed, refresh fed. The last manual step of the monthly report, retired by one trigger and one action.</figcaption>
</figure>

## Three habits that keep flows trustworthy

Automation you can't see fail is automation you'll stop trusting.

- **Tell yourself it worked.** Add a step: *Send a mobile
  notification* or a Teams message — "June export filed". Thirty
  seconds of setup buys you the same comfort as
  [the backup engineer's daily check](/articles/power-query-combine-monthly-files/):
  silence is never assumed to be success.
- **Let failures be loud.** The flow's run history shows every
  execution, green or red; the service emails you when runs fail
  repeatedly. Glance at the history the first few months —
  [the IFNA principle](/articles/iferror-ifna-failing-loudly/),
  applied to plumbing.
- **Name it for the person who inherits it.** "When finance mails
  the export, file it for the sales report" beats "Untitled flow
  3" — the same kindness as
  [a named range](/articles/let-and-lambda-formulas-you-can-read/).

## Where to stop (the honest part)

Power Automate can do vastly more — approvals, Teams posts,
[Forms responses into Tables](/articles/forms-to-excel-data-arrives-clean/),
writing rows into Excel directly. Some of it you should take;
some is a trap for the enthusiastic. The line that's served me:
**automate the *transport* of data; keep the *transformation* in
Power Query, and the *thinking* in the workbook.** A flow that
moves files is transparent and nearly unbreakable. A flow that
edits spreadsheet rows one by one is a fragile robot doing a
job the [recipe](/articles/power-query-combine-monthly-files/)
does better in bulk — slower to debug, easier to double-fire,
harder to audit.

And the trigger-precision rule has a security face: this flow
files attachments *from one trusted sender*. Resist the tempting
general version ("save every attachment I receive") — you'd be
piping the whole world's spam into the folder your report
[trustingly reads](/articles/power-query-combine-monthly-files/).

One trigger, one action, one notification. The pipeline now runs
from the finance system's Send button to your refreshed dashboard
— and the only monthly job left is reading the thing.
