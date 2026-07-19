---
title: "The renewal ritual: a comparison sheet that pays for itself"
description: Insurance, energy, broadband — loyalty is billed, not rewarded. The one-hour-a-year spreadsheet routine that prices every renewal like a new customer.
date: 2026-07-16
---

There's a price for staying. Insurers, energy suppliers and
broadband companies quietly charge their most loyal customers
the most — the industry phrase is *price walking* — because
loyalty, operationally, means "doesn't check". The renewal
letter is priced on the assumption you'll sigh and accept.

The counter-move isn't haggling talent. It's a **ritual**: one
small spreadsheet, visited for about an hour per renewal, that
prices the market and hands you the number to say on the phone.
People who run it typically claw back £200–500 a year — which,
[priced at your true hourly rate](/articles/what-is-your-hour-worth/),
makes it some of the best-paid work you'll do all year.

## The sheet

One tab per category (insurance, energy, broadband…), each a
small [Table](/articles/format-as-table-the-feature-that-changes-everything/):
date, provider, quoted annual price, key terms (excess, speed,
tie-in), and a notes column. Two rules make it work:

**Rule one: compare totals, not headlines.** Quotes are designed
to resist comparison — one insurer's low premium hides a £750
excess; one tariff's cheap unit rate hides a fat standing
charge ([its own lesson](/articles/energy-bills-decoded-unit-rates-model/)).
So the Table computes a single **annualised, like-for-like
total** for every row — the same
[one-unit discipline](/articles/true-cost-of-the-car-tco-excel/)
that made car costs comparable. A `£/year` column with honest
inputs beats every marketing page ever written.

**Rule two: the sheet remembers.** Last year's premium, who you
switched from, what the retention desk offered when you called —
[history is the leverage](/articles/net-worth-one-page-balance-sheet/).
"Your renewal is £642; I paid £471 last year and Quotezone's
best is £489" is a sentence that ends calls quickly, and only a
sheet remembers all three numbers.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A renewal quote towering over the market quotes gathered beside it, with the counter-offer landing between them">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .bar{fill:#F6E7E2;stroke:#C0392B}
    .mkt{fill:#EAF4EE;stroke:#0E7A4F}
    .deal{fill:#0E7A4F}
    .ax{stroke:#E6E4D9;stroke-width:1}
    .b1{animation:rrup 5.5s ease-out infinite;transform-origin:0 200px}
    .b2{animation:rrup 5.5s ease-out infinite;animation-delay:0.3s;transform-origin:0 200px}
    .b3{animation:rrup 5.5s ease-out infinite;animation-delay:0.6s;transform-origin:0 200px}
    .b4{animation:rrup 5.5s ease-out infinite;animation-delay:1.5s;transform-origin:0 200px}
    @keyframes rrup{0%,10%{transform:scaleY(0)}28%,90%{transform:scaleY(1)}100%{transform:scaleY(0)}}
  </style>
  <line x1="60" y1="200" x2="620" y2="200" class="ax"/>
  <g class="b1"><rect x="80" y="60" width="100" height="140" class="bar"/></g>
  <text x="88" y="46" class="h">£642</text><text x="80" y="224" class="t">"your renewal"</text>
  <g class="b2"><rect x="230" y="110" width="100" height="90" class="mkt"/></g>
  <text x="238" y="96" class="h">£489</text><text x="230" y="224" class="t">market best</text>
  <g class="b3"><rect x="380" y="118" width="100" height="82" class="mkt"/></g>
  <text x="388" y="104" class="h">£471</text><text x="380" y="224" class="t">you, last year</text>
  <g class="b4"><rect x="530" y="104" width="80" height="96" class="deal"/></g>
  <text x="536" y="90" class="h">£495 ✓</text><text x="522" y="224" class="t">retention offer</text>
  <text x="200" y="30" class="t">the letter hopes you'll only ever see the first bar</text>
</svg>
<figcaption>The renewal price is an opening bid priced for someone with no other numbers. The sheet's whole job is making sure you have the other numbers.</figcaption>
</figure>

## The ritual, scripted

1. **The trigger fires.** Renewal dates live in your
   [sinking-funds table](/articles/sinking-funds-smoothing-annual-bills/)
   already — add a
   [`NETWORKDAYS`-style countdown](/articles/working-with-dates-excel/)
   or a calendar reminder ~3 weeks out (insurance quotes are
   cheapest around 3–4 weeks before renewal; last-minute quotes
   are measurably dearer).
2. **Twenty minutes of quotes** — two comparison sites plus one
   direct insurer that avoids them, into the Table, annualised.
3. **One phone call** to the incumbent's retention line with
   your best number. Scripts are unnecessary; the number does
   the talking. They match or beat it more often than not —
   and if not, switching is the point, not the threat.
4. **Log the outcome** — the row you'll negotiate from next year
   — and update the
   [sinking-fund slice](/articles/sinking-funds-smoothing-annual-bills/)
   to the new premium.

The honesty column matters on the way through: cheapest is not
best when the excess doubles or the cover shrinks. The terms
columns exist so that a £40 saving that moves £500 of risk onto
you is *visible* — [the same trade](/articles/emergency-fund-runway-excel/)
you priced when sizing the emergency fund, made on purpose or
not at all.

One sheet, one hour per category per year, several hundred
pounds — every year, compounding into the
[net-worth line](/articles/net-worth-one-page-balance-sheet/)
like everything else. Loyalty is a lovely quality in people.
In utility contracts, it's a billing category — and now you've
built the antidote.
