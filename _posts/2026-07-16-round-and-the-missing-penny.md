---
title: "ROUND and the case of the missing penny"
description: Why totals are 1p off, why 0.1+0.2 isn't quite 0.3, and the small set of rounding rules that make money maths add up — to the penny, every time.
date: 2026-07-16
domain: formulas
---

Sooner or later, every spreadsheet meets the missing penny. The
invoice says £847.29; your sheet says £847.30. Finance wants to
know why. Nobody's stolen anything — but something *is* wrong, and
it's worth understanding properly, because the fix is a rule you'll
apply for the rest of your career.

## Displayed rounding: the usual suspect

Most missing pennies are
[the costume problem](/articles/number-formats-costume-not-value/).
Three lines each *hold* £10.005; the two-decimal format *shows*
£10.01 three times, which eyeballs to £30.03 — but the values sum
to £30.015, displaying as £30.02. Every visible number is
"right"; the total disagrees with the arithmetic your reader does
in their head.

The rule that ends it: **when a number becomes real — invoiced,
paid, reported — round the value, not the costume.**

```
=ROUND(B2 * 1.2, 2)
```

`ROUND(x, 2)` makes the *stored value* exactly two decimals. Now
the column genuinely contains what it appears to contain, and
sums match sight. The VAT line on an invoice, the per-payslip tax,
the interest each month in
[the amortisation table](/articles/loan-amortisation-table-excel/)
— each gets rounded *at the moment it becomes a real amount of
money*, and totals reconcile to the penny forever after.

The counter-rule matters equally: **don't round intermediate
maths.** Round the monthly interest before charging it, yes —
that's a real amount. But round a growth rate mid-model and
you've injected error that compounds through every later row —
[the pension curve](/articles/pension-countdown-when-could-you-stop/)
drifts for no visible reason. Real amounts: round. Working
figures: leave at full precision.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three cells showing 10.01 but holding 10.005 sum to a surprising total; rounding the values makes the column add up to what it shows">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .ghost{opacity:0;animation:rpg 5.5s ease-in-out infinite}
    @keyframes rpg{0%,22%{opacity:0}36%,86%{opacity:1}96%,100%{opacity:0}}
    .alarm{animation:rppulse 2.6s ease-in-out infinite}
    @keyframes rppulse{0%,100%{opacity:1}50%{opacity:0.4}}
  </style>
  <text x="60" y="26" class="h">shows…       holds…</text>
  <rect x="60" y="40" width="110" height="32" class="g"/><text x="72" y="61" class="t">£10.01</text>
  <g class="ghost"><text x="190" y="61" class="t">10.005</text></g>
  <rect x="60" y="72" width="110" height="32" class="g"/><text x="72" y="93" class="t">£10.01</text>
  <g class="ghost"><text x="190" y="93" class="t">10.005</text></g>
  <rect x="60" y="104" width="110" height="32" class="g"/><text x="72" y="125" class="t">£10.01</text>
  <g class="ghost"><text x="190" y="125" class="t">10.005</text></g>
  <rect x="60" y="140" width="110" height="34" class="g"/><text x="72" y="162" class="h alarm">£30.02 ?!</text>
  <g class="ghost"><text x="190" y="162" class="t">30.015 — of course</text></g>
  <text x="380" y="26" class="h">after ROUND(value, 2)</text>
  <rect x="380" y="40" width="110" height="32" class="acc"/><text x="392" y="61" class="t">£10.01</text>
  <rect x="380" y="72" width="110" height="32" class="acc"/><text x="392" y="93" class="t">£10.01</text>
  <rect x="380" y="104" width="110" height="32" class="acc"/><text x="392" y="125" class="t">£10.01</text>
  <rect x="380" y="140" width="110" height="34" class="acc"/><text x="392" y="162" class="h">£30.03 ✓</text>
  <text x="380" y="205" class="t">the cells now hold what</text>
  <text x="380" y="225" class="t">they show — sums match sight</text>
</svg>
<figcaption>The left column never lied — it just showed costumes over unrounded values. Round at the moment money becomes real, and eyes and arithmetic agree.</figcaption>
</figure>

## The family, and who they're for

`ROUND` rounds halves away from zero (10.005 → 10.01). Its
siblings each have one honest job:

| Function | Job | Typical customer |
|----------|-----|------------------|
| `ROUNDUP(x, 2)` | always up | charges — nobody bills £0.014 as £0.01 |
| `ROUNDDOWN(x, 0)` | always down | "complete units only" — full boxes, whole years of service |
| `MROUND(x, 0.05)` | nearest multiple | cash rounding, 5-minute timesheets |
| `CEILING` / `FLOOR` | multiples, directional | price points (£x.99), pack sizes |
| `INT(x)` | drop the decimals | ages, [whole days from dates](/articles/working-with-dates-excel/) |

The choice among them is a *policy*, not a maths question — up,
down or nearest is somebody's rule about fairness. Which is why
rounding policy belongs visible in the sheet (a comment, or
[a named cell](/articles/named-ranges-formulas-read-like-sentences/)
like `round_to`), not buried as a magic number in a formula.

## And the deeper oddity: 0.1 + 0.2

Occasionally you'll test `=0.1+0.2=0.3` and get `FALSE`, and it's
worth knowing why once: computers store numbers in binary, and
0.1 in binary is a repeating fraction — like ⅓ in decimal. Excel
holds it to about 15 significant digits, so tiny residues like
`0.30000000000000004` exist under the costume. This is every
computer, not an Excel bug — and it's the *other* reason
long chains of unrounded arithmetic drift by a penny.

Practical consequences, both cheap: never compare calculated
decimals with `=` in [logic](/articles/if-ifs-nested-logic-done-cleanly/)
— compare `ROUND(a,2)=ROUND(b,2)`, stating your tolerance; and
treat any reconciliation that's out by less than a penny as
arithmetic residue to be rounded away, while anything out by
*exactly* a tidy amount (1p per row, £0.05 per invoice) is a
**policy mismatch** — your rounding rule differs from their
rounding rule, and now you know where to look.

The missing penny was never missing. It was sitting in the third
decimal place, waiting for someone who knew the difference
between what a cell shows and what it holds — which, as of this
lesson, is you.
