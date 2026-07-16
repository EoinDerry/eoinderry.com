---
title: "Sinking funds: the end of the expensive month"
description: Car insurance, Christmas, the MOT — annual costs aren't surprises, they're bad rhythm. One small Excel table smooths them into a single monthly number.
date: 2026-07-16
---

Every year contains the same ambushes. Car insurance lands in
March, the MOT and its repairs in June, Christmas in December —
and each one arrives with the same little lie attached: *"this is
an unusually expensive month."* It isn't. It's a completely usual
month in a system with bad rhythm: costs that occur *yearly*,
colliding with a budget that thinks *monthly*.

[The four-number budget](/articles/build-a-uk-budget-that-survives-real-life/)
gets wobbled by exactly these hits, and the classic patch —
raiding [the emergency fund](/articles/emergency-fund-runway-excel/)
— is wrong on principle: the MOT is not an emergency, it's an
appointment. The proper tool is older than spreadsheets, and it's
called a **sinking fund**: money set aside monthly, in advance,
toward a known future bill. Excel makes it a ten-row table.

## The table

One row per annual (or irregular) cost, in a
[proper Table](/articles/format-as-table-the-feature-that-changes-everything/):

| Item | Annual cost | Due month | Monthly slice |
|------|------------:|-----------|---------------:|
| Car insurance | £680 | Mar | `=[@Annual]/12` |
| MOT + servicing | £420 | Jun | £35 |
| Christmas | £600 | Dec | £50 |
| Home insurance | £310 | Sep | £26 |
| TV licence | £170 | Apr | £14 |
| **Total** | **£2,180** | | **£182** |

That bottom-right number is the entire product: **£182 a month is
what your "annual surprises" actually cost.** Not zero in the
good months and £680 in March — £182, every month, as fixed as
rent. Move that amount to a separate savings pot by standing
order on payday, pay every annual bill *from the pot*, and the
expensive month ceases to exist as a category.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Twelve months of spiky annual bills flattening into one identical monthly contribution">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .spike{fill:#F6E7E2;stroke:#C0392B;stroke-width:1}
    .flat{fill:#EAF4EE;stroke:#0E7A4F;stroke-width:1}
    .s{animation:sfswap 6s ease-in-out infinite}
    .f{opacity:0;animation:sfswap2 6s ease-in-out infinite}
    @keyframes sfswap{0%,30%{opacity:1}42%,88%{opacity:0.15}100%{opacity:1}}
    @keyframes sfswap2{0%,30%{opacity:0}42%,88%{opacity:1}100%{opacity:0}}
  </style>
  <line x1="60" y1="200" x2="620" y2="200" class="ax"/>
  <g class="s">
    <rect x="70" y="192" width="30" height="8" class="spike"/>
    <rect x="115" y="192" width="30" height="8" class="spike"/>
    <rect x="160" y="90" width="30" height="110" class="spike"/>
    <rect x="205" y="172" width="30" height="28" class="spike"/>
    <rect x="250" y="192" width="30" height="8" class="spike"/>
    <rect x="295" y="132" width="30" height="68" class="spike"/>
    <rect x="340" y="192" width="30" height="8" class="spike"/>
    <rect x="385" y="192" width="30" height="8" class="spike"/>
    <rect x="430" y="150" width="30" height="50" class="spike"/>
    <rect x="475" y="192" width="30" height="8" class="spike"/>
    <rect x="520" y="192" width="30" height="8" class="spike"/>
    <rect x="565" y="103" width="30" height="97" class="spike"/>
  </g>
  <g class="f">
    <rect x="70" y="170" width="30" height="30" class="flat"/><rect x="115" y="170" width="30" height="30" class="flat"/>
    <rect x="160" y="170" width="30" height="30" class="flat"/><rect x="205" y="170" width="30" height="30" class="flat"/>
    <rect x="250" y="170" width="30" height="30" class="flat"/><rect x="295" y="170" width="30" height="30" class="flat"/>
    <rect x="340" y="170" width="30" height="30" class="flat"/><rect x="385" y="170" width="30" height="30" class="flat"/>
    <rect x="430" y="170" width="30" height="30" class="flat"/><rect x="475" y="170" width="30" height="30" class="flat"/>
    <rect x="520" y="170" width="30" height="30" class="flat"/><rect x="565" y="170" width="30" height="30" class="flat"/>
    <text x="240" y="150" class="h">£182, every month, no ambushes</text>
  </g>
  <text x="160" y="226" class="t">Mar</text><text x="295" y="226" class="t">Jun</text><text x="430" y="226" class="t">Sep</text><text x="565" y="226" class="t">Dec</text>
</svg>
<figcaption>Same year, same bills, same total. The only thing that changed is the rhythm — and the rhythm was the whole problem.</figcaption>
</figure>

## The two refinements that make it real

**Mid-year starts need a catch-up column.** Start in July with
insurance due in March: eight months to save £680 means £85/month
until the renewal, then it relaxes to £57.
[EOMONTH and a little date maths](/articles/working-with-dates-excel/)
compute months-remaining; `=[@Annual]/months_left` does the rest.
The first year is the steep one — every year after, you're the
person for whom renewal quotes are boring.

**Check the pot against the calendar.** A second worth-it column:
cumulative-due versus cumulative-saved, and a
[conditional-formatting spotlight](/articles/conditional-formatting-highlights-not-decoration/)
on any month where the pot would run dry. Christmas in December
and insurance in March both being *fully funded* depends on the
order the bills land — the sheet sees the collision in July;
your bank balance would have discovered it live.

## Why this beats "being careful"

The sinking fund isn't a savings technique, it's an *information*
technique. The £182 was always being spent — the table just moves
the knowledge of it from December-you (panicking) to January-you
(planning). And it upgrades the rest of the system: the
[runway's crisis floor](/articles/emergency-fund-runway-excel/)
becomes honest because annual costs are now in it pro-rata; the
emergency fund stops being raided for appointments and goes back
to guarding against genuine surprises; and renewal season turns
adversarial in your favour — with the pot already full, the
insurance renewal isn't a crisis to accept but
[a quote to shop](/articles/true-cost-of-the-car-tco-excel/).

It also quietly deletes the most corrosive money feeling there
is: being *behind*. You can't be behind on a bill you've been
paying yourself for eleven months.

Ten rows, one division, one standing order. The expensive month
was never expensive — it was just poorly scheduled, and
scheduling is a solved problem in a spreadsheet.
