---
title: "Matching messy keys: when lookups meet the real world"
description: The lookup is fine — the keys are lying. A field guide to joining two tables that spell the same thing differently, from TRIM to fuzzy matching.
date: 2026-07-16
domain: lookups
---

Here is the moment stage four gets real. Two tables that
obviously describe the same things —
orders here, customers there — and your
[XLOOKUP](/articles/xlookup-the-lookup-to-learn-first/) returns
`#N/A` for rows you can *see* have partners. `"Byrne Ltd"` sits
in both tables. Excel insists it doesn't.

Excel is right. To a lookup, a **key** — the value used to match —
either matches *exactly* or not at all. `"Byrne Ltd "` (trailing
space), `"BYRNE LTD"`, `"Byrne Ltd."` and `"Byrne Limited"` are
four strangers. Humans read intent; lookups read characters. The
craft of joining real-world tables is closing that gap — and it
has an escalation ladder.

## Rung one: hygiene (this fixes most of it)

Before anything clever, run
[the cleaning routine](/articles/the-445pm-export-cleaning-messy-data/)
**on both key columns** — not just one:

```
=TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), " ")))
```

Spaces you can't see are the number-one cause of failed matches;
[text-numbers](/articles/the-445pm-export-cleaning-messy-data/)
are number two (`"1042"` in one table, `1042` in the other —
same digits, different *kinds*; check both columns' alignment).
Case, at least, is free — Excel's lookups ignore it.

The diagnostic that earns its keep forever:

```
=LEN(A2)
```

`"Byrne Ltd"` should be 9 characters. If `LEN` says 10, you've
*found* the invisible passenger. Two LEN columns side by side
settle "why won't these match" in ten seconds.

## Rung two: standardise into a helper key

If the differences are systematic — punctuation, suffixes,
formatting — don't fight them row by row. Build a **key column**
in *both* tables that boils each name down to its essence, then
look up on that:

```
=LOWER(SUBSTITUTE(SUBSTITUTE(TRIM([@Name]), ".", ""), " ltd", ""))
```

Chain [text surgery](/articles/text-functions-textbefore-textafter/)
to strip what varies: dots, `Ltd`/`Limited`, double spaces. The
same recipe on both sides turns four strangers back into one
company. This is honest work, it's auditable — the helper column
*shows* what matched — and it's the pattern behind every
"master data" fix you'll ever do.

<figure class="guide-fig">
<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Messy variants of the same company name funnel through a standardising key formula and meet as one clean key">
  <style>
    .t{font:12.5px 'IBM Plex Mono',monospace;fill:#5A655E}
    .h{font:600 13px 'IBM Plex Mono',monospace;fill:#1C2823}
    .g{fill:#fff;stroke:#E6E4D9}
    .acc{fill:#EAF4EE;stroke:#0E7A4F}
    .fun{stroke:#0E7A4F;stroke-width:1.5;fill:none;marker-end:url(#mka)}
    .v1{animation:mkfun 5.5s ease-in-out infinite}
    .v2{animation:mkfun 5.5s ease-in-out infinite;animation-delay:0.35s}
    .v3{animation:mkfun 5.5s ease-in-out infinite;animation-delay:0.7s}
    @keyframes mkfun{0%,15%{opacity:1;transform:translateX(0)}55%,100%{opacity:0;transform:translateX(40px)}}
    .kout{opacity:0;animation:mkout 5.5s ease-in-out infinite}
    @keyframes mkout{0%,40%{opacity:0}55%,92%{opacity:1}100%{opacity:0}}
  </style>
  <defs><marker id="mka" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#0E7A4F"/></marker></defs>
  <g class="v1"><rect x="50" y="40" width="190" height="32" class="g"/><text x="62" y="61" class="t">"BYRNE LTD "</text></g>
  <g class="v2"><rect x="50" y="80" width="190" height="32" class="g"/><text x="62" y="101" class="t">"Byrne Ltd."</text></g>
  <g class="v3"><rect x="50" y="120" width="190" height="32" class="g"/><text x="62" y="141" class="t">"Byrne Limited"</text></g>
  <rect x="290" y="66" width="180" height="62" rx="8" fill="#fff" stroke="#0E7A4F"/>
  <text x="304" y="92" class="h">the key recipe</text>
  <text x="304" y="114" class="t">trim·lower·strip</text>
  <path d="M470 97 h48" class="fun"/>
  <g class="kout"><rect x="522" y="80" width="120" height="34" class="acc"/><text x="534" y="102" class="h">byrne</text></g>
  <text x="50" y="200" class="t">same recipe on BOTH tables → four strangers become one key,</text>
  <text x="50" y="222" class="t">and the ordinary XLOOKUP works again</text>
</svg>
<figcaption>Don't teach the lookup to be forgiving — teach both tables to speak the same key. The helper column is the honest, auditable version of "fuzzy".</figcaption>
</figure>

## Rung three: wildcards, for contained keys

When one table's key lives *inside* the other's text ("find the
order whose reference contains this code"), lookups accept
wildcards — `*` for anything, `?` for one character:

```
=XLOOKUP("*" & [@Code] & "*", Refs[Reference], Refs[Order], , 2)
```

(The `2` switches XLOOKUP into wildcard mode.) Powerful, and to
be used with the respect owed to anything that can match *more
than you meant* — a short code like `"10"` is contained in
hundreds of references. Wildcards are for keys long enough to be
unambiguous.

## Rung four: know when you've left formula country

True fuzzy matching — `"Jon Smyth"` vs `"John Smith"`, no rule
in common — is not a formula problem. Pretending it is produces
the worst spreadsheets in the world. The honest options:
[Power Query](/articles/power-query-combine-monthly-files/) has a
real **fuzzy merge** (similarity thresholds, ignore-case, a
transformation table for known aliases — and it's repeatable
every month); or fix the *source* so both systems share a real ID.
Every messy-key problem is ultimately a missing-ID problem —
customer numbers exist so names never have to match.

Which points at the lasting rule: **match on IDs when they exist;
build a key column when they don't; reach for fuzzy tools only
when no rule can be written** — and then check their output, row
by sampled row, like the
[duplicates you counted before deleting](/articles/removing-duplicates-without-losing-data/).

The lookup was never broken. The keys were lying — and now you
have the whole ladder for making them tell the truth.
