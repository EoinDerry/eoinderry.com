---
title: "Power BI Service: publishing your first dashboard"
description: Desktop built the report; the Service is where it becomes a product — publishing, scheduled refresh, sharing done right, and the licensing small print in plain English.
date: 2026-07-16
---

[The first Power BI lesson](/articles/power-bi-for-excel-people/)
ended with a working report on your machine — and a warning
that *sharing* is where the free ride ends. This lesson is
that second half: the **Power BI Service** (app.powerbi.com),
where a report file becomes a living product — refreshed on
schedule, opened in browsers and phones, and retired from the
[email-an-attachment lifestyle](/articles/excel-on-the-web-sharing-workbooks/)
forever.

## Publish, and what actually happens

In Desktop: `Home → Publish`, pick a workspace. Two things
upload, and the distinction organises everything after: the
**dataset** (your data model — the
[queries](/articles/power-query-combine-monthly-files/), the
[relationships](/articles/power-pivot-and-the-data-model/))
and the **report** (the visual pages pointed at it). One
dataset can feed many reports — the same
[one-truth architecture](/articles/where-files-should-live-onedrive-sharepoint-teams/)
as everything else on this course, and the reason you resist
publishing six near-identical files.

Viewers get the report in a browser: interactive —
[cross-filtering, slicers](/articles/power-bi-for-excel-people/),
drill-down all work — but read-only, on always-current data.
Nobody can
[sort your source sideways](/articles/sorting-and-filtering-without-wrecking-your-data/),
and nobody is ever looking at last month's copy.

## Refresh: the plumbing that makes it live

A published report doesn't magically see your files — refresh
has to be *arranged*, and the arrangement depends on where the
data lives (which is why
[the files-placement lesson](/articles/where-files-should-live-onedrive-sharepoint-teams/)
matters more than ever):

- Sources in **SharePoint/OneDrive** — the happy path: the
  Service reaches them directly. Schedule it: dataset →
  Settings → Scheduled refresh, pick the times, add failure
  notifications — [the flow-history habit](/articles/power-automate-folder-that-fills-itself/)
  in new clothes: silence is never assumed success.
- Sources on **your PC or a server** — you need a **gateway**
  (a small connector service; your IT team usually runs one).
  The honest advice: move the sources to SharePoint instead if
  you can — fewer moving parts, no gateway to babysit.

Done right, the pipeline this course has been assembling runs
end to end without you:
[attachments file themselves](/articles/power-automate-folder-that-fills-itself/)
→ [the recipe shapes them](/articles/power-query-2-unpivot-merge-append/)
→ the dataset refreshes at 07:00 → the report is current when
the first phone opens it.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A report publishing from desktop to the cloud service, refreshing on schedule from SharePoint, and appearing on browser and phone viewers">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .pipe{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#pba2)}
    .p1{stroke-dasharray:120;stroke-dashoffset:120;animation:pbsd 5.5s ease-out infinite}
    .p2{stroke-dasharray:120;stroke-dashoffset:120;animation:pbsd 5.5s ease-out infinite;animation-delay:0.6s}
    .p3{stroke-dasharray:120;stroke-dashoffset:120;animation:pbsd 5.5s ease-out infinite;animation-delay:1.2s}
    @keyframes pbsd{0%,10%{stroke-dashoffset:120}45%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:120}}
    .view{opacity:0;animation:pbsv 5.5s ease-out infinite}
    @keyframes pbsv{0%,50%{opacity:0}64%,92%{opacity:1}100%{opacity:0}}
  </style>
  <defs><marker id="pba2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <rect x="40" y="90" width="130" height="60" rx="8" class="g"/>
  <text x="54" y="114" class="h">Desktop</text><text x="54" y="136" class="t">build &amp; model</text>
  <path d="M170 120 h50" class="pipe p1"/>
  <text x="176" y="108" class="t">publish</text>
  <rect x="230" y="80" width="180" height="80" rx="10" class="acc"/>
  <text x="246" y="106" class="h">the Service</text>
  <text x="246" y="128" class="t">dataset + report</text>
  <text x="246" y="148" class="t">refresh 07:00 ⟳</text>
  <path d="M320 80 q-10 -40 -60 -44" class="pipe p2"/>
  <rect x="150" y="16" width="110" height="30" class="g"/><text x="160" y="36" class="t">SharePoint</text>
  <path d="M410 120 h50" class="pipe p3"/>
  <g class="view">
    <rect x="470" y="70" width="150" height="56" rx="8" class="g"/>
    <text x="484" y="94" class="t">browser: filters,</text>
    <text x="484" y="112" class="t">drill-down, live</text>
    <rect x="470" y="136" width="80" height="70" rx="10" class="g"/>
    <text x="482" y="164" class="t">phone</text>
    <text x="482" y="184" class="t">07:31 ✓</text>
  </g>
  <text x="40" y="226" class="t">build once, publish once, refresh forever — the report becomes a place, not a file</text>
</svg>
<figcaption>Desktop builds, the Service serves. Once refresh is scheduled from a proper home, the report stops being something you send and becomes somewhere people go.</figcaption>
</figure>

## Sharing, and the small print in plain English

Sharing runs through **workspaces** (a team's shelf; give
colleagues Viewer role — the
[minimum-access rule](/articles/excel-on-the-web-sharing-workbooks/)
again) or an **app** (a tidy packaged front door for a wider
audience). The licensing, without the fog: viewing shared
content needs **Pro** licences (~£8/user/month, bundled in
E5), *or* the workspace sits on **Premium/Fabric capacity**
(org-level, viewers free) — small teams: everyone Pro; big
audiences: capacity is the maths. And the one that catches
people: "Publish to web" makes a report **genuinely public on
the internet** — treat it as what it is, publishing, and keep
anything with real data behind the tenant.

Boundaries, as ever, honestly: the Service is a *serving*
layer. Modelling stays in Desktop
([republish to update](/articles/the-inheritable-workbook/) —
and note the file's provenance in your README);
ad-hoc analysis stays in
[Excel, which can connect straight to the published dataset](/articles/power-pivot-and-the-data-model/)
("Analyze in Excel" — pivots against the same single truth);
and a dashboard nobody asked for is still
[a dashboard nobody reads](/articles/building-a-one-page-dashboard/),
however smoothly it refreshes.

Build once, publish once, schedule the plumbing, share the
minimum. The report stops being an artefact you produce
monthly and becomes infrastructure that produces itself —
which was the destination this whole automation arc was
walking toward.
