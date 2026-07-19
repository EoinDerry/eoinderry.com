---
title: "Where files should live: OneDrive, SharePoint and Teams"
description: The workbook is good now — its home probably isn't. The three places a Microsoft 365 file can live, what each is for, and the placement rules that end attachment chaos.
date: 2026-07-16
---

You can build a flawless workbook —
[structured](/articles/organising-a-workbook-sheets-and-structure/),
[co-author-ready](/articles/excel-on-the-web-sharing-workbooks/),
[refreshable](/articles/power-query-combine-monthly-files/) —
and still lose the war, because it lives in the wrong place: a
laptop's Documents folder, a personal drive shared by link with
one colleague who left, or an email thread's attachment history.
Microsoft 365 gives files exactly three kinds of home, and most
of the chaos in most organisations is files living in the wrong
one.

## The three homes

**OneDrive** is *yours* — a personal drive in the cloud. Drafts,
scratch models, [your own money sheets](/articles/net-worth-one-page-balance-sheet/),
work-in-progress nobody else needs yet. Its superpower is
being personal: synced, versioned, recoverable. Its trap is the
same thing: when you leave, access dies with your account, and
"shared from OneDrive" is how team-critical files end up owned
by ghosts.

**SharePoint** is *the team's* — document libraries owned by a
site, not a person. Anything a team depends on lives here: the
[monthly report pipeline's folder](/articles/power-automate-folder-that-fills-itself/),
the [master workbook](/articles/excel-on-the-web-sharing-workbooks/),
the [Forms-fed Tables](/articles/forms-to-excel-data-arrives-clean/).
Survives leavers, carries permissions by library or folder, and
is what
[queries should point at](/articles/power-query-combine-monthly-files/)
— a SharePoint path outlives every individual.

**Teams** is — and this is the part that declutters everything —
**a view of SharePoint.** Every Teams channel's Files tab *is* a
SharePoint library underneath. Posting a file "in Teams" files
it there; two names, one storage. Which collapses the three-way
confusion into a two-way choice: *mine (OneDrive) or ours
(SharePoint, possibly worn as Teams).*

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A decision flow: is the file yours or the team's, is it draft or depended-on, routing to OneDrive or SharePoint with Teams as a window onto SharePoint">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .box{fill:#fff;stroke:#E6E4D9}
    .home{fill:#EAF4EE;stroke:#0E7A4F}
    .road{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#wfa)}
    .rd{stroke-dasharray:140;stroke-dashoffset:140;animation:wfdraw 5.5s ease-out infinite}
    .r2{animation-delay:0.5s}
    @keyframes wfdraw{0%,12%{stroke-dashoffset:140}45%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:140}}
    .win{opacity:0;animation:wfwin 5.5s ease-out infinite}
    @keyframes wfwin{0%,48%{opacity:0}62%,92%{opacity:1}100%{opacity:0}}
  </style>
  <defs><marker id="wfa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <rect x="230" y="30" width="200" height="50" rx="8" class="box"/>
  <text x="248" y="52" class="h">who needs this file</text>
  <text x="248" y="70" class="t">if you vanish tomorrow?</text>
  <path d="M230 60 Q 150 70 110 100" class="road rd"/>
  <path d="M430 60 Q 510 70 550 100" class="road rd r2"/>
  <text x="120" y="96" class="t">nobody</text>
  <text x="470" y="96" class="t">the team</text>
  <rect x="40" y="110" width="180" height="56" rx="8" class="home"/>
  <text x="56" y="134" class="h">OneDrive</text>
  <text x="56" y="154" class="t">drafts · personal · WIP</text>
  <rect x="440" y="110" width="180" height="56" rx="8" class="home"/>
  <text x="456" y="134" class="h">SharePoint</text>
  <text x="456" y="154" class="t">the team's system of record</text>
  <g class="win">
    <rect x="456" y="176" width="148" height="34" rx="6" fill="#fff" stroke="#0E7A4F" stroke-dasharray="4 3"/>
    <text x="468" y="198" class="t">Teams = a window</text>
  </g>
  <text x="40" y="220" class="t">one question, two homes — and "email it" is never one of them</text>
</svg>
<figcaption>The whole placement policy is one question about your own disappearance. Teams isn't a third answer — it's SharePoint wearing a chat interface.</figcaption>
</figure>

## The placement rules

1. **The vanish test decides.** Would anyone need this file if
   you left tomorrow? Then it's team property from birth —
   create it in SharePoint, don't "move it later" (later never
   comes; leavers' OneDrives are where reports go to die).
2. **Share the location, not a copy.** Attaching a workbook to
   email forks it —
   [the v7 disease](/articles/excel-on-the-web-sharing-workbooks/)
   in one click. Share a link (with sensible permissions), and
   there stays one file. Inside Teams, the same rule reads:
   *upload to the channel, link in the chat.* Files posted into
   private chats land in personal OneDrives — team files go in
   channels.
3. **Structure beats search, once.** A library needs the same
   [architecture as a workbook](/articles/organising-a-workbook-sheets-and-structure/):
   predictable folders, real names (`2026-07 Sales Report.xlsx`,
   never `FINAL v3`— dates sort, adjectives don't), and the
   discipline that a file has *one* home. Ten minutes of
   library design saves a hundred "where's the…?" messages.
4. **Local copies are for airplanes.** OneDrive/SharePoint sync
   is fine offline plumbing, but "I saved a copy to my desktop
   to work on" recreates 2009. The cloud copy *is* the file;
   [version history](/articles/excel-on-the-web-sharing-workbooks/)
   is the undo; sync handles the train tunnel.

The payoff reaches back through the whole stack: queries that
[never break on a renamed path](/articles/power-query-combine-monthly-files/),
flows that [file attachments](/articles/power-automate-folder-that-fills-itself/)
into a library that outlives everyone, dashboards whose
[one link](/articles/building-a-one-page-dashboard/) is the
report. Files, it turns out, obey the same law as cells:
**one truth, one home, everything else points at it.** You
learned that in
[stage one](/articles/the-grid-mindset-how-excel-thinks/) — it
was never really about cells.
