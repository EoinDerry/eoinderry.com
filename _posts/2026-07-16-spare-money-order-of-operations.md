---
title: "Spare money: the order of operations"
description: "The models built one question at a time — runway, debts, pension, ISA — finally assembled into one flowchart: where the next £100 should go, and why."
date: 2026-07-16
---

The field notes in this series each answered one question:
[how long could you last](/articles/emergency-fund-runway-excel/),
[what does the debt really cost](/articles/loan-amortisation-table-excel/),
[when could you stop](/articles/pension-countdown-when-could-you-stop/),
[what does compounding do](/articles/compound-growth-isa-tracker-excel/).
Useful separately — but real life asks them all at once, in the
form of a single practical question: **a spare £100 exists this
month; where does it go?**

Maths, it turns out, has an opinion. Not about your values —
about *ordering*: some destinations strictly beat others while
certain conditions hold, and the conditions are checkable in a
spreadsheet you mostly already own.

*The disclaimers at full volume, because this is the page that
sounds most like advice: it isn't — it's the standard reasoning
framework (you'll find versions of it everywhere serious money
guidance is written), organised so you can check your own
position against it. Wrappers, employer schemes and tax details
are personal; a professional sees the whole board.*

## The ladder, and why each rung is where it is

**1. The minimum-payments floor.** Not a choice — missed
priority bills and defaults poison everything downstream.

**2. A starter buffer** — a month or so of
[crisis floor](/articles/emergency-fund-runway-excel/). Before
any optimising: without a buffer, the first surprise becomes
*new expensive debt*, undoing every rung below.

**3. The employer pension match.** If contributing another 2%
gets your employer's 2%, that's an instant, guaranteed **100%
return** [before the compounding even starts](/articles/payslip-decoded-in-excel/)
— nothing legal beats it. Unclaimed match is a pay cut you
volunteered for.

**4. Expensive debt.** Overpaying a 24% credit card is a
[guaranteed, tax-free 24% return](/articles/mortgage-overpay-or-invest-excel/)
— the [amortisation table](/articles/loan-amortisation-table-excel/)
shows exactly how brutally it compounds in reverse. Everything
above ~8–10% dies here, highest
[true rate](/articles/loan-amortisation-table-excel/) first.
(Cheap debt — the mortgage,
[tax-like student loans](/articles/student-loan-tax-or-debt-model/)
— is *not* this rung; that's rung seven's judgement call.)

**5. The full runway** —
[three to six months](/articles/emergency-fund-runway-excel/),
now affordable because the fires are out.

**6. Long-horizon investing** — pension beyond the match and/or
ISA, [in real terms](/articles/inflation-quiet-tax-on-cash/),
riding [the compounding curve](/articles/compound-growth-isa-tracker-excel/).
This is where the £100 usually lands for someone whose rungs
1–5 are solid — and where it should *not* land for someone
whose aren't.

**7. The judgement rung** — overpay cheap debt vs invest more
vs spend on a life you're deferring:
[the model you already built](/articles/mortgage-overpay-or-invest-excel/),
plus values the sheet can't hold. Reaching rung seven *is* the
win; everything below it was arithmetic.

<figure class="guide-fig">
<svg viewBox="0 0 660 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A hundred pound coin descending a ladder of destinations, stopping at the first rung whose condition is unmet">
  <style>
    .t{font:12px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .done{fill:#EAF4EE;stroke:#0E7A4F}
    .stop{fill:#fff;stroke:#0E7A4F;stroke-width:2}
    .coin{animation:omdrop 6s ease-in-out infinite}
    @keyframes omdrop{0%,10%{transform:translateY(0)}22%{transform:translateY(38px)}34%{transform:translateY(76px)}46%{transform:translateY(114px)}62%,90%{transform:translateY(152px)}100%{transform:translateY(152px);opacity:0}}
    .land{opacity:0;animation:omland 6s ease-in-out infinite}
    @keyframes omland{0%,58%{opacity:0}70%,92%{opacity:1}100%{opacity:0}}
  </style>
  <circle cx="90" cy="42" r="13" fill="#0E7A4F" class="coin"/>
  <text x="83" y="47" class="t" fill="#fff" style="font-weight:600">£</text>
  <rect x="130" y="28" width="360" height="30" class="done"/><text x="142" y="48" class="t">1–2 · floor + starter buffer      ✓ funded</text>
  <rect x="130" y="66" width="360" height="30" class="done"/><text x="142" y="86" class="t">3 · employer match                 ✓ claimed</text>
  <rect x="130" y="104" width="360" height="30" class="done"/><text x="142" y="124" class="t">4 · expensive debt                 ✓ cleared</text>
  <rect x="130" y="142" width="360" height="30" class="done"/><text x="142" y="162" class="t">5 · full runway                    ✓ 5.1 months</text>
  <rect x="130" y="180" width="360" height="30" class="stop"/><text x="142" y="200" class="h">6 · long-horizon investing   ← lands here</text>
  <g class="land"><text x="504" y="200" class="h">✓</text></g>
  <text x="130" y="238" class="t">the coin falls past every satisfied rung and stops at the first open one</text>
</svg>
<figcaption>Each rung has a checkable condition; the £100 stops at the first one that isn't met. No willpower involved — just a ladder and a checklist.</figcaption>
</figure>

## Build it as a status sheet

The point of putting this in Excel isn't the flowchart — it's
**wiring the conditions to your real numbers**. One small tab
on [the net-worth workbook](/articles/net-worth-one-page-balance-sheet/),
one row per rung: the condition as
[a formula](/articles/the-checks-row-self-testing-spreadsheets/)
(`=runway_months >= target_months`, `=MAX(debts_apr) < 0.08`,
match claimed as a yes/no), a status cell, and
[the glow](/articles/conditional-formatting-highlights-not-decoration/)
on the first unmet rung. It's the checks-row pattern pointed at
your life: the sheet *tells you* where the next £100 goes, and
— quarterly, when
[the balance-sheet snapshot](/articles/net-worth-one-page-balance-sheet/)
updates — tells you when the answer changes.

Two humane notes to finish. **The ladder governs spare money,
not all money** — a life that's all rungs and no living fails
[a test spreadsheets can't run](/articles/what-is-your-hour-worth/);
budget the fun *first*, ladder the surplus. And **don't optimise
across rungs** — the classic mistake is investing (rung 6)
while a 22% card burns (rung 4) because investing feels like
progress and debt feels like the past. The ladder exists
precisely because feelings order these things badly and
arithmetic orders them well.

One question — *where does the next £100 go?* — answered once,
wired to your numbers, retired forever. That's this whole
series in a sentence: dread, converted to arithmetic, one
model at a time.
