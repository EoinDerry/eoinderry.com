---
title: "Goal Seek: making Excel work backwards"
description: "Every model answers one direction — given these inputs, what result? Goal Seek answers the question you actually have: what input gets the result I want?"
date: 2026-07-16
domain: power-tools
---

Every model you've built on [the path](/roadmap/) runs the same
direction: inputs in, answer out. Set the price, see the margin.
Set the contribution, see
[the retirement year](/articles/pension-countdown-when-could-you-stop/).
But the question in your head usually runs the other way: *what
price gives a 30% margin? What contribution retires me at 60?*
The forwards model answers it only by trial and error — nudge,
look, nudge again.

**Goal Seek** is the trial and error, automated. You name three
things: the formula cell, the value you want it to reach, and
the one input Excel may turn. It nudges at machine speed until
the answer matches.

`Data → What-If Analysis → Goal Seek`:

> **Set cell:** `margin` · **To value:** `0.30` ·
> **By changing cell:** `price`

Two seconds later: the price that produces exactly 30%. That's
the entire tool — three boxes, one solved question.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Goal Seek turns the input dial back and forth, homing in until the output cell hits its target value">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .flow{stroke:#0E7A4F;stroke-width:1.6;fill:none;marker-end:url(#gsa)}
    .dial{animation:gsdial 5s ease-in-out infinite;transform-origin:150px 150px}
    @keyframes gsdial{0%,10%{transform:rotate(-40deg)}30%{transform:rotate(28deg)}48%{transform:rotate(-6deg)}62%{transform:rotate(12deg)}74%,100%{transform:rotate(8deg)}}
    .out{animation:gsout 5s ease-in-out infinite}
    @keyframes gsout{0%,10%{fill:#C0392B}30%{fill:#8A6D3B}48%{fill:#5A655E}74%,100%{fill:#0E7A4F}}
    .lock{opacity:0;animation:gslock 5s ease-in-out infinite}
    @keyframes gslock{0%,70%{opacity:0}80%,100%{opacity:1}}
  </style>
  <defs><marker id="gsa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <text x="80" y="26" class="h">the input, turned…</text>
  <circle cx="150" cy="150" r="52" fill="#fff" stroke="#E6E4D9" stroke-width="2"/>
  <g class="dial"><line x1="150" y1="150" x2="150" y2="106" stroke="#0E7A4F" stroke-width="3.5" stroke-linecap="round"/></g>
  <circle cx="150" cy="150" r="5" fill="#0E7A4F"/>
  <text x="112" y="228" class="t">price = ?</text>
  <path d="M220 150 h100" class="flow"/>
  <rect x="330" y="120" width="140" height="60" rx="8" class="g"/>
  <text x="344" y="146" class="t">the model</text>
  <text x="344" y="166" class="t">(untouched)</text>
  <path d="M470 150 h56" class="flow"/>
  <rect x="530" y="120" width="110" height="60" rx="8" class="acc"/>
  <text x="544" y="146" class="t">margin</text>
  <text x="544" y="170" class="h out">→ 30.0%</text>
  <g class="lock"><text x="530" y="106" class="h">✓ target hit</text></g>
</svg>
<figcaption>You name the target and hand Excel one dial. It turns the dial until the model reads what you asked — trial and error at machine speed.</figcaption>
</figure>

## What it's actually for

The pattern is *threshold questions* — anywhere a target is fixed
and one input is negotiable:

- **Break-even**: units so that `profit = 0` — the canonical use,
  and the first question of any side-project spreadsheet.
- **Money models**: the monthly saving that
  [funds the runway in twelve months](/articles/emergency-fund-runway-excel/);
  the overpayment that
  [ends the mortgage by 2040](/articles/mortgage-overpay-or-invest-excel/);
  the rate at which
  [a loan's payment hits your ceiling](/articles/loan-amortisation-table-excel/).
- **Reverse engineering**: a
  [payslip model](/articles/payslip-decoded-in-excel/) and a known
  take-home — Goal Seek the gross that produces it, and you've
  decoded a job advert's "OTE" in one move.

And one habit makes all of it work: **Goal Seek can only turn a
dial that exists.** It changes *one hard-valued cell* — if the
rate is buried inside a formula as `*1.2`, there's nothing to
turn. Models built the way this series builds them —
[every assumption a named input cell](/articles/named-ranges-formulas-read-like-sentences/)
— are Goal-Seek-ready by construction. If the tool feels
unusable on your sheet, that's the sheet reviewing your
architecture.

## The fine print

Three things worth knowing before you trust it. **It overwrites
the input** — the found value is written into the cell, so note
the original (or Ctrl+Z after reading the answer; better, run
what-ifs on a copy of the inputs block). **One dial, one target**
— it won't split the effort across two inputs or satisfy two
goals; that's Solver, its heavyweight sibling (Excel's free
optimisation add-in — worth meeting the day a real
constrained-optimisation problem walks in, and not before).
**It finds *a* solution, not *the* solution** — on curvy models
(percent changes, [compounding](/articles/compound-growth-isa-tracker-excel/))
start the input near a plausible value; and some targets are
simply unreachable, where it will politely report failure rather
than inventing arithmetic.

If a question is *recurring* rather than one-off — "show me the
required saving at every target date" — stop seeking repeatedly
and lay the scenarios out as
[a Data Table](/articles/data-tables-every-assumption-at-once/),
the next lesson. Goal Seek answers one backwards question
crisply; Data Tables answer a hundred at once.

Set cell, to value, by changing. The model you already built
knew the answer all along — Goal Seek just asks it the question
from the direction you actually care about.
