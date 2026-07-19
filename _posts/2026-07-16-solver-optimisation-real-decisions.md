---
title: "Solver: optimisation for real decisions"
description: Goal Seek's heavyweight sibling — many dials, real constraints, and a best answer instead of just an answer. What it's for, and the modelling habit it demands.
date: 2026-07-16
domain: power-tools
---

[Goal Seek](/articles/goal-seek-excel-backwards/) turns one dial
until one cell hits one target. Real decisions are rarely that
polite: *split the marketing budget across four channels, within
a total, minimum £2k each, to maximise return.* Many dials, hard
limits, and not "a" value but the **best** one. That's
**optimisation**, and Excel has shipped a genuine optimiser for
decades: **Solver** — free, built in, and unknown to almost
everyone who'd benefit.

(One-time setup: `File → Options → Add-ins → Manage: Excel
Add-ins → Go → tick Solver Add-in`. It appears at the right end
of the Data tab.)

## The three-part sentence

Every Solver problem is one sentence with three clauses, and
the dialog is just that sentence as a form:

- **Objective** — one formula cell to maximise, minimise, or
  hit: total return, total cost, total
  [profit from the model you already built](/articles/data-tables-every-assumption-at-once/).
- **Variable cells** — the dials Solver may turn: the four
  channel budgets. (Goal Seek allowed one; Solver takes many.)
- **Constraints** — the rules of reality: `total ≤ 20000`,
  `each ≥ 2000`, quantities as integers where half a lorry
  isn't a thing.

Click Solve, and it searches the space of allowed combinations
for the best objective — trying, adjusting, converging, at
machine speed, through
[the same model your own what-ifs use](/articles/named-ranges-formulas-read-like-sentences/).

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four budget dials adjusting under a total constraint while the objective climbs to its maximum">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .lane{fill:#fff;stroke:#E6E4D9}
    .fill{fill:#0E7A4F}
    .b1{animation:sv1 5.5s ease-in-out infinite;transform-origin:0 0}
    .b2{animation:sv2 5.5s ease-in-out infinite;transform-origin:0 0}
    .b3{animation:sv3 5.5s ease-in-out infinite;transform-origin:0 0}
    .b4{animation:sv4 5.5s ease-in-out infinite;transform-origin:0 0}
    @keyframes sv1{0%,12%{transform:scaleX(0.5)}35%{transform:scaleX(0.9)}55%,90%{transform:scaleX(0.75)}100%{transform:scaleX(0.5)}}
    @keyframes sv2{0%,12%{transform:scaleX(0.5)}35%{transform:scaleX(0.25)}55%,90%{transform:scaleX(0.4)}100%{transform:scaleX(0.5)}}
    @keyframes sv3{0%,12%{transform:scaleX(0.5)}35%{transform:scaleX(0.7)}55%,90%{transform:scaleX(0.95)}100%{transform:scaleX(0.5)}}
    @keyframes sv4{0%,12%{transform:scaleX(0.5)}35%{transform:scaleX(0.45)}55%,90%{transform:scaleX(0.2)}100%{transform:scaleX(0.5)}}
    .obj{animation:svobj 5.5s ease-in-out infinite}
    @keyframes svobj{0%,12%{opacity:0.5}55%,90%{opacity:1}100%{opacity:0.5}}
  </style>
  <text x="60" y="26" class="h">four dials, one total, one objective</text>
  <text x="60" y="62" class="t">search</text><rect x="150" y="46" width="300" height="22" rx="4" class="lane"/><g class="b1"><rect x="150" y="46" width="300" height="22" rx="4" class="fill"/></g>
  <text x="60" y="100" class="t">social</text><rect x="150" y="84" width="300" height="22" rx="4" class="lane"/><g class="b2"><rect x="150" y="84" width="300" height="22" rx="4" class="fill"/></g>
  <text x="60" y="138" class="t">email</text><rect x="150" y="122" width="300" height="22" rx="4" class="lane"/><g class="b3"><rect x="150" y="122" width="300" height="22" rx="4" class="fill"/></g>
  <text x="60" y="176" class="t">print</text><rect x="150" y="160" width="300" height="22" rx="4" class="lane"/><g class="b4"><rect x="150" y="160" width="300" height="22" rx="4" class="fill"/></g>
  <g class="obj">
    <rect x="490" y="84" width="130" height="60" rx="8" fill="#EAF4EE" stroke="#0E7A4F"/>
    <text x="506" y="110" class="t">return</text>
    <text x="506" y="132" class="h">→ MAX</text>
  </g>
  <text x="60" y="216" class="t">Σ dials ≤ £20,000 · each ≥ £2,000 — Solver turns them all, together, legally</text>
</svg>
<figcaption>Goal Seek with many hands and a rulebook. The dials trade against each other until no legal move improves the objective.</figcaption>
</figure>

## What it's honestly for

The everyday wins are humbler than the textbook ones, and
better: **allocation** (budget across channels, hours across
[the studio's own jobs](/articles/what-is-your-hour-worth/),
stock across depots); **selection** — the knapsack shape:
binary yes/no variables choosing which projects fit a budget
for maximum value; **scheduling and mixing** (shifts meeting
[rota rules](/articles/time-arithmetic-timesheets-24-hour-trap/),
cheapest blend meeting a spec); and the personal-finance
version — cheapest way to clear
[several debts](/articles/loan-amortisation-table-excel/) given
a fixed monthly sum, constraints being the minimum payments.

The prerequisite is the one this stage keeps re-teaching:
**Solver can only turn dials that exist.** Objective as one
formula, inputs as
[named cells](/articles/named-ranges-formulas-read-like-sentences/),
constraints as computable quantities — a model built
[the course's way](/articles/data-tables-every-assumption-at-once/)
is Solver-ready by accident. A model with buried constants
gives it nothing to hold.

## Reading the answer like an adult

Three disciplines separate use from misuse. **Check the exit
message**: "found a solution — all constraints satisfied" is a
result; "could not find a feasible solution" means *your rules
contradict each other*, which is a finding about reality worth
having. **Rerun from different starting values** for nonlinear
models — Solver finds *a* peak, and complex landscapes have
several; same-answer-from-elsewhere builds trust, per
[the Goal Seek caveat](/articles/goal-seek-excel-backwards/)
grown up. And **treat the optimum as advice, not scripture** —
it's the best answer *inside your model*; if the recommended
plan feels absurd, the model is missing a constraint the real
world enforces, and saying which one is exactly the
conversation [the checks row](/articles/the-checks-row-self-testing-spreadsheets/)
would want you to have.

(Choosing the engine, briefly: **Simplex LP** for models that
are sums-of-things — fastest and provably optimal; **GRG
Nonlinear** for smooth curves; **Evolutionary** as the patient
last resort. Start with Simplex; escalate only when it
refuses.)

One objective, some dials, the rules of reality. Most people
solve allocation problems by argument and habit — you now own
the third method, and it shows its working.
