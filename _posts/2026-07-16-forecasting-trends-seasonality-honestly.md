---
title: "Forecasting: trends and seasonality, honestly"
description: Excel will extend any line into the future with total confidence — how to make a defensible forecast, show its uncertainty, and know when not to.
date: 2026-07-16
domain: analysis
---

At some point someone looks at your
[trend chart](/articles/charts-that-tell-the-truth/) and asks the
inevitable question: *"so what will it be next quarter?"* Excel
will answer instantly — it will extend any line into the future
with machine confidence and zero shame. The skill isn't getting
a forecast; it's getting one you can defend, with its
uncertainty attached, and knowing the cases where the honest
answer is "this data can't say."

## What a forecast actually claims

Every statistical forecast makes the same quiet claim: **the
future will keep behaving like the past.** That's it — no tool in
Excel knows about your new competitor, the price rise, or the
pandemic. So the first honesty check is human: has something
changed that the history can't know? If yes, the model's job is
*context*, not prophecy. With that said, plenty of series really
do keep behaving — utilisation, steady sales, web traffic — and
for those, two tools cover working life.

## Tool one: TREND, for straight-ish lines

For a series that grows or shrinks steadily, the workhorse is:

```
=TREND(Sales, Months, NextMonths)
```

— fit the best straight line through history, read it forward
([spilling](/articles/dynamic-arrays-filter-sort-unique/) one
value per future month). Chart people know the same thing as a
*trendline* (right-click the series → Add Trendline), which
comes with the honesty gauge attached: **R²** (tick "Display
R-squared"). Near 1, the line explains the data; near 0.5,
you're drawing confident lines through weather. Show the R²
or don't show the trendline.

## Tool two: FORECAST.ETS, for seasonal shapes

Most business series aren't lines — they breathe: December
peaks, August slumps, weekly rhythm. Fitting a line through
seasonality gives an answer that's wrong *twice a year in
opposite directions*. Modern Excel's answer:

```
=FORECAST.ETS(next_date, Sales, Dates)
```

— exponential smoothing that detects and replays the seasonal
pattern. Its companion is the one that separates honest
forecasts from decoration:

```
=FORECAST.ETS.CONFINT(next_date, Sales, Dates)
```

— the ± band around the point estimate. Or skip the formulas:
**`Data → Forecast Sheet`** builds all of it — forecast, upper,
lower, chart — in one dialog. It's the most underused honest
button in Excel.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A seasonal history line continues into a forecast whose confidence band fans wider the further it reaches">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .hist{stroke:#0E7A4F;stroke-width:2.4;fill:none}
    .fc{stroke:#0E7A4F;stroke-width:2.2;fill:none;stroke-dasharray:6 4}
    .band{fill:#EAF4EE;opacity:0;animation:fcband 6s ease-out infinite}
    .fcl{stroke-dasharray:220;stroke-dashoffset:220;animation:fcdraw 6s ease-out infinite}
    @keyframes fcdraw{0%,20%{stroke-dashoffset:220}60%,100%{stroke-dashoffset:0}}
    @keyframes fcband{0%,35%{opacity:0}60%,100%{opacity:1}}
    .now{stroke:#8A948D;stroke-width:1.2;stroke-dasharray:4 4}
  </style>
  <line x1="60" y1="20" x2="60" y2="210" class="ax"/>
  <line x1="60" y1="210" x2="620" y2="210" class="ax"/>
  <path d="M60 150 L100 120 L140 160 L180 110 L220 150 L260 96 L300 140 L340 84 L380 128" class="hist"/>
  <line x1="380" y1="30" x2="380" y2="210" class="now"/>
  <text x="330" y="234" class="t">today</text>
  <path d="M380 128 L420 74 L460 118 L500 64 L540 108 L580 54 Q 350 100 380 128 Z" fill="none"/>
  <path d="M380 128 L420 60 L460 100 L500 40 L540 86 L580 26 L580 88 L540 132 L500 92 L460 140 L420 92 Z" class="band"/>
  <path d="M380 128 L420 74 L460 118 L500 64 L540 108 L580 54" class="fc fcl"/>
  <text x="440" y="30" class="h">the fan is the honesty</text>
  <text x="90" y="60" class="t">the rhythm repeats…</text>
  <text x="420" y="200" class="t">…probably, within THIS range</text>
</svg>
<figcaption>A defensible forecast has three parts: the pattern, the projection, and the widening band that admits how far confidence reaches.</figcaption>
</figure>

## The honesty rules

Four disciplines make forecasting respectable:

1. **Always show the band.** A point forecast ("December: 1,240")
   invites false precision; a band ("1,050–1,430, 95%") shows
   the claim's real size. If the band is embarrassingly wide,
   that *is* the finding.
2. **Feed it enough history.** Seasonal detection needs at least
   two full cycles — ideally three. Twelve months of data cannot
   establish a yearly rhythm; it can only assume one.
3. **Short reach only.** The fan widens for a reason —
   forecasting three months from three years of data is
   respectable; forecasting three years is astrology with
   [confidence intervals](/articles/data-tables-every-assumption-at-once/).
4. **Backtest before you trust.** Hide the last six months, run
   the forecast, compare with what actually happened. Five
   minutes, and now you know how this method performs *on this
   series* — the difference between "Excel said" and "the model,
   which was within 6% over the backtest, says".

And a data note from
[the cleaning stage](/articles/working-with-dates-excel/):
FORECAST.ETS needs real dates on a regular rhythm — text dates or
gappy months break it, and the fix is the usual one, upstream.

## What forecasting is for

Not prophecy — *planning ranges*. Stock to hold, staff to
rota, [the budget's](/articles/build-a-uk-budget-that-survives-real-life/)
next-quarter expectation, the sanity line on a target ("the
trend says 1,100; the target says 1,500; the gap is the
conversation"). Wired into
[the dashboard](/articles/building-a-one-page-dashboard/) with
its band drawn honestly, a forecast turns arguments about
optimism into arguments about assumptions — which are the only
arguments a spreadsheet can actually settle.

The line extends either way. The craft is the fan around it.
