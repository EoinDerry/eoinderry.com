---
title: "Time arithmetic: timesheets and the 24-hour trap"
description: Why 9:00 to 17:30 is 0.354, why summed hours wrap around at 24, and the three habits that make every timesheet calculation behave.
date: 2026-07-16
domain: formulas
---

[Dates are day-numbers in costume](/articles/working-with-dates-excel/)
— that lesson unlocked the calendar. Times complete the story
with one small extension that explains every timesheet mystery
you'll ever meet: **a time is a fraction of a day.** Noon is
0.5. Six in the morning is 0.25. `17:30` is 0.729…, and a
date-with-time like `16/07/2026 09:00` is just `46,219.375` —
whole days plus the fraction.

Believe that, and time arithmetic is ordinary subtraction:

```
=C2-B2        finish − start  →  0.354…  →  formatted: 8:30
```

Everything that goes wrong with timesheets goes wrong in one of
three places — and each has a one-line fix.

## Trap one: the sum that wraps at 24

Sum a week of 8:30 shifts and Excel reports… `18:30`. The
values are right (the true total is 42.5 hours ≈ 1.77 *days*);
the default time costume shows only the *time-of-day part*,
wrapping past midnight like a clock face. The fix is a
[costume, not a formula](/articles/number-formats-costume-not-value/)
— the square-bracket format:

```
[h]:mm    →  42:30
```

`[h]` means "total hours, don't wrap". The single most useful
fact in timesheet Excel, and it's one custom format
[from the pattern language](/articles/custom-number-formats-pattern-language/).

## Trap two: hours × rate

Pay time is where the fraction bites: `42:30` at £15/hour is
`=total * 15` → about **£26.56**, because the cell *holds* 1.77
days. Convert days to hours first:

```
=total_time * 24 * rate     → 42.5 × 15 = £637.50
```

Multiply by 24 whenever a time must become a *decimal number of
hours* — for pay, for
[charts](/articles/charts-that-tell-the-truth/), for
[weighted averages of shift lengths](/articles/sumproduct-weighted-averages/).
The reverse (÷24) turns decimal hours back into time values.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A week of shifts summing to a value that displays wrongly as 18:30 on a clock face and correctly as 42:30 with the bracket format">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .good{fill:#EAF4EE;stroke:#0E7A4F}
    .bad{fill:#F6E7E2;stroke:#C0392B}
    .hand{animation:ttspin 5s linear infinite;transform-origin:150px 130px}
    @keyframes ttspin{0%{transform:rotate(0)}100%{transform:rotate(720deg)}}
    .rev{opacity:0;animation:ttrev 5s ease-in-out infinite}
    @keyframes ttrev{0%,45%{opacity:0}60%,92%{opacity:1}100%{opacity:0}}
  </style>
  <text x="60" y="26" class="h">Mon–Fri · five 8:30 shifts · =SUM(...)</text>
  <circle cx="150" cy="130" r="52" fill="#fff" stroke="#E6E4D9" stroke-width="2"/>
  <g class="hand"><line x1="150" y1="130" x2="150" y2="88" stroke="#C0392B" stroke-width="3" stroke-linecap="round"/></g>
  <circle cx="150" cy="130" r="4" fill="#C0392B"/>
  <text x="104" y="212" class="t">h:mm wraps the clock</text>
  <rect x="280" y="96" width="150" height="40" class="bad"/>
  <text x="294" y="122" class="h">18:30 ✗</text>
  <g class="rev">
    <rect x="470" y="96" width="150" height="40" class="good"/>
    <text x="484" y="122" class="h">42:30 ✓</text>
    <text x="470" y="160" class="t">format: [h]:mm</text>
    <text x="470" y="182" class="t">value: 1.7708 days —</text>
    <text x="470" y="204" class="t">× 24 × £15 = £637.50</text>
  </g>
  <text x="280" y="160" class="t">same value in both cells;</text>
  <text x="280" y="182" class="t">only the costume differs</text>
</svg>
<figcaption>The sum was never wrong — the clock-face costume wraps at midnight. Square brackets un-wrap it, and ×24 turns it into payable hours.</figcaption>
</figure>

## Trap three: the shift past midnight

`22:00` to `06:00` subtracts to **−0.667** — a negative time,
displayed as `#####`, because plain times carry no date and
Excel thinks you finished before you started. Two honest fixes:
the classic wrap-around formula,

```
=MOD(finish - start, 1)
```

(`MOD` [rolls the negative around a full day](/articles/round-and-the-missing-penny/)
— 8:00, correctly); or, better for anything serious, **store
full date-times** (`16/07 22:00`, `17/07 06:00`) and plain
subtraction just works — the same
[store-the-whole-truth instinct](/articles/the-grid-mindset-how-excel-thinks/)
that runs the entire course. Night-shift-heavy rotas want the
second; the odd late Friday survives on the first.

## The assembly

Put the three fixes together and the working timesheet is
almost disappointingly small: start and finish columns as real
times (entered `9:00`, not `9.00` — the colon is the contract;
a `.` [makes text](/articles/the-445pm-export-cleaning-messy-data/)),
an unpaid-break column to subtract, a daily
`=MOD(finish-start,1)-break`, a `[h]:mm` weekly total, and a
`×24×rate` pay line, [ROUNDed](/articles/round-and-the-missing-penny/)
at the money moment. Add
[NETWORKDAYS](/articles/working-with-dates-excel/) when the
question becomes "working days between dates" rather than hours
— dates and times are one system, and now you hold both halves.

A time is a fraction of a day. One fact, three traps, three
one-line fixes — and the timesheet, humanity's oldest
spreadsheet, finally behaves.
