---
title: "Working with dates: the calendar maths Excel already knows"
description: TODAY, EOMONTH and NETWORKDAYS — how dates really work under the hood, and the small set of functions that answer every deadline question.
date: 2026-07-09
domain: formulas
---

Half the questions people bring to Excel are secretly date questions.
*How many days until the deadline? Which invoices are more than 30
days old? What's the last working day of the month?* And half the
pain with dates comes from not knowing one small fact about how Excel
stores them.

Here's the fact: **a date is just a number.** Specifically, the count
of days since 1 January 1900. Today's date is a number in the
46,000s; tomorrow is that number plus one. Everything else — the
slashes, the month names, "14 July 2026" — is a *number format*, a
costume the value wears.

Once you believe that, date maths stops being mysterious:

```
=B2-A2
```

Finish date minus start date. That's it — subtraction gives you days
between, because they're just numbers. No function required.

<figure class="guide-fig">
<svg viewBox="0 0 660 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A timeline showing that dates are day numbers, with EOMONTH jumping the marker to the end of the month">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .ax{stroke:#E6E4D9;stroke-width:2}
    .tick{stroke:#E6E4D9;stroke-width:1.4}
    .dot{fill:#0E7A4F}
    .hop{animation:hop 5s ease-in-out infinite}
    @keyframes hop{0%,25%{transform:translateX(0)}45%,75%{transform:translateX(300px)}95%,100%{transform:translateX(0)}}
  </style>
  <text x="60" y="30" class="h">=EOMONTH(TODAY(), 0)  →  jump to the month's last day</text>
  <line x1="60" y1="120" x2="600" y2="120" class="ax"/>
  <line x1="90" y1="112" x2="90" y2="128" class="tick"/><text x="74" y="150" class="t">1 Jul</text>
  <line x1="240" y1="112" x2="240" y2="128" class="tick"/><text x="216" y="150" class="t">14 Jul</text>
  <line x1="390" y1="112" x2="390" y2="128" class="tick"/><text x="368" y="150" class="t">23 Jul</text>
  <line x1="540" y1="112" x2="540" y2="128" class="tick"/><text x="516" y="150" class="t">31 Jul</text>
  <text x="204" y="180" class="t">TODAY() = 46,217</text>
  <text x="492" y="180" class="t">= 46,234</text>
  <path d="M240 100 q150 -46 300 0" fill="none" stroke="#0E7A4F" stroke-width="1.6" stroke-dasharray="5 4"/>
  <g class="hop">
    <circle cx="240" cy="120" r="7" class="dot"/>
  </g>
</svg>
<figcaption>Underneath the costume, 14 July 2026 is just day number 46,216 — which is why subtraction, sorting and jumping around the calendar all work.</figcaption>
</figure>

## The functions that matter

Excel has dozens of date functions. Real work uses about six.

**`TODAY()`** — the current date, refreshed every time the workbook
recalculates. The moment a sheet contains `TODAY()`, it answers
questions *forever*: an ageing column is just `=TODAY()-B2`, and it's
correct every morning without anyone touching it. (Its sibling
`NOW()` includes the time; you want it less often than you think.)

**`EOMONTH(start, months)`** — the end of a month, any month. The
second argument shifts: `0` is this month's end, `1` is next
month's, `-1` is last month's. Invoices due at month-end plus 30
days? `=EOMONTH(A2,1)`. First day of this month? One day after the
end of last month: `=EOMONTH(TODAY(),-1)+1`. That little idiom reads
oddly the first time and then becomes a reflex.

**`EDATE(start, months)`** — same idea, but same-day-shift: three
months from the 14th is the 14th. Contract renewals, probation ends,
anything anniversary-shaped.

**`NETWORKDAYS(start, end)`** — days between two dates *counting only
Monday to Friday*, with an optional third argument for a holiday
list. This is the deadline function:

```
=NETWORKDAYS(TODAY(), C2, Holidays)
```

where `Holidays` is a small named range of bank holidays you type
once a year. Its partner `WORKDAY(start, days)` goes the other way —
"what date is 10 working days from now?"

**`DATE(year, month, day)`** — builds a date from three numbers.
This is the safe way to *construct* dates in formulas, and it's
forgiving: `=DATE(2026, 13, 1)` happily gives you 1 January 2027.
That forgiveness is a feature — "this month plus one" never overflows.

## The trap that isn't a formula problem

If date maths gives you `#VALUE!`, or sorting puts March after
November, your "dates" are almost certainly **text wearing a date
costume** — the classic export problem. No date function fixes text;
you fix the data first. That's step four of
[the cleaning routine](/articles/the-445pm-export-cleaning-messy-data/),
and it's usually one pass of Text to Columns.

The quick diagnostic: real dates line up on the right of the cell and
change appearance when you change the number format. Text-dates sit
on the left and ignore you.

## A worked example: the ageing column

Put it together — an invoice list in a
[Table](/articles/format-as-table-the-feature-that-changes-everything/),
with a due date in column C:

```
=MAX(0, TODAY()-[@Due])
```

Days overdue, never negative, updating itself daily. Add a status
column with your banding logic and you've built the report your
finance team currently makes by hand every Monday.

Dates sit in stage three of [the path](/roadmap/) because they reward
exactly this kind of small-formula thinking: subtraction, one or two
well-chosen functions, and the knowledge that underneath it all, a
date is only a number counting patiently upward from 1900.

Six functions, one fact, no fear. That's dates done.
