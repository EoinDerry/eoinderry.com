# Episode 01 — The 4:45pm export: cleaning messy data

*Read-aloud transcript, paced at ~130 words per minute. The screen
video (`ep01-screen.mp4`) is timed to these scenes — the timecodes
below say where the screen will be while you read. Don't race it:
each scene holds comfortably past its text. Total runtime **6:12**.*

*Your face overlay lives bottom-right — the screen keeps that corner
clear for the whole video.*

---

## Scene 1 · 0:00–0:50 — Cold open

It's quarter to five. Someone has just exported "the figures" from a
system with a name like an alarm code — and now it's your problem.
The names are in three different cases. Half the numbers won't add
up. And the dates are… decorative.

Here's the thing nobody tells you: cleaning data is a routine, not a
talent. The mess varies; the fixes barely do. This video is the
routine I use every time, in order — so a horrible export becomes a
ten-minute job instead of an evening.

I'm Eoin. This is the first video on the Excel path — and it's about
the file that lands at the worst possible moment.

## Scene 2 · 0:50–1:28 — Rule zero

Rule zero, before anything else: never work on the original. Save a
copy — File, Save As, add "working" to the name. When a cleaning
step goes sideways — and one will — you want the untouched original
one click away. Not a prayer to the undo stack.

And while you're here, turn the data into a proper Table — Control,
T. Tables keep your formulas honest while rows move and shrink
beneath them — which is exactly what happens during a clean-up.

## Scene 3 · 1:28–2:16 — Step one: invisible spaces

Step one: hunt the invisible spaces. The most common reason two
"identical" values don't match is that one of them isn't what it
looks like. "Dublin" with a trailing space is *not* "Dublin".
Imported data is full of trailing spaces, doubled spaces, and —
from web systems especially — the non-breaking space, which looks
like a space but isn't one.

The classic fix, in a helper column: TRIM, wrapped around CLEAN.
TRIM removes leading, trailing and doubled spaces. CLEAN strips the
non-printing characters. And for the sneaky non-breaking space —
character one-six-zero — add a SUBSTITUTE inside.

That one line has rescued more of my afternoons than any other
formula in Excel.

## Scene 4 · 2:16–2:46 — Step two: casing

Step two: fix the casing. "niamh BYRNE" and "SEAN o'brien" want to
be "Niamh Byrne" and "Sean O'Brien". Three functions cover it:
PROPER capitalises every word. UPPER shouts. LOWER whispers.

PROPER isn't perfect — it gives you "O'brien" with a small b, and
"Mcdonald" — but it does ninety-five per cent of the work, and the
exceptions are easy to spot once everything else is consistent.

## Scene 5 · 2:46–3:32 — Step three: numbers that refuse to be numbers

Step three: numbers that refuse to be numbers. If a column of
"numbers" won't sum, they're almost certainly text that *looks* like
numbers. The tell-tale signs: they line up on the left of the cell —
and the status bar shows a count, but no sum, when you select them.

The fastest fix is the paste-special multiply trick. Type a one in
any empty cell, and copy it. Select the stubborn column. Then Paste
Special — Multiply — OK. Multiplying by one forces Excel to evaluate
each entry as a number, and the text-numbers snap back to real ones.

Delete your one — and watch the column sum again.

## Scene 6 · 3:32–4:20 — Step four: dates that are secretly text

Step four: dates that are secretly text. Dates are just numbers
wearing a costume — day counts since the first of January, nineteen
hundred. When an export gives you a date as *text*, sorting breaks,
month grouping breaks, and everything downstream inherits the
damage.

The multiply trick often fixes these too. When it doesn't, Text to
Columns is the reliable workhorse. Select the column — Data — Text
to Columns — click through to step three of the wizard — choose
Date — and tell Excel the *incoming* order: day-month-year, or
month-day-year.

That last setting matters. You're telling Excel how to *read* what
arrived — not how you want it displayed. Displaying it is just a
number format, afterwards.

## Scene 7 · 4:20–5:02 — Step five: duplicates, carefully

Step five: deal with duplicates — carefully. Remove Duplicates is
quick, and quick is dangerous. Before you use it, ask: duplicates
*of what?* Two rows with the same name might be two genuinely
different orders.

The safer routine: add a helper column that counts each key first —
COUNTIFS, on the columns that define "the same thing". Filter for
counts greater than one — and *look* at them. Delete with your eyes
open, not on faith. Because Remove Duplicates keeps the first row it
finds and silently deletes the rest. It never asks which one you
meant to keep.

## Scene 8 · 5:02–5:42 — The routine, on a card

So — the routine, on a card.

One: copy the file; make it a Table. Two: TRIM and CLEAN the text
columns. Three: PROPER or UPPER the casing. Four: multiply-by-one
the fake numbers. Five: Text to Columns the fake dates. Six: count
duplicates before removing them.

Six steps. Same order. Every time. The export that used to eat your
evening becomes a checklist — and eventually, a checklist you'll
automate away entirely with Power Query. That's a later stage of the
path.

## Scene 9 · 5:42–6:12 — Outro

The data doesn't get less messy. You just stop being afraid of it.

The written version of this guide — and the whole Excel path, from
first cell to power user — is free at eoinderry dot com. If this was
useful, subscribe: one video per guide, no filler.

See you in the next one.
