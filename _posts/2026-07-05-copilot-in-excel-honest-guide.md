---
title: "Copilot in Excel: what it's actually good at (and what it isn't)"
description: An honest working guide to AI inside the spreadsheet — the jobs worth delegating, the ones you shouldn't, and the habit that makes it safe.
date: 2026-07-05
---

Microsoft has put an AI assistant inside Excel, and the marketing
suggests you'll never write a formula again. The tutorials on the
other side suggest it's a gimmick. Both are wrong in useful ways.

I've been using Copilot the way I'd assess any new hire: give it real
work, check everything, notice patterns. Here's the honest report.
*(Requirements note: Copilot needs a Microsoft 365 subscription with
the Copilot add-on, and your data in OneDrive/SharePoint with
AutoSave on — a real barrier for plenty of workplaces. Everything
else on this site works in ordinary Excel; this guide is the
exception, filed accordingly under Field notes.)*

## Where it genuinely earns its seat

- **Explaining formulas you inherited.** Point it at
  `=INDEX(A:A,MATCH(1,(B:B=F1)*(C:C=G1),0))` and ask *"explain this"*.
  Copilot's plain-English read is fast and usually right — the single
  best use for anyone maintaining someone else's workbook.
- **First drafts of formulas you can describe.** "Flag rows where
  Amount is 20% above the average for that Region" produces a
  workable draft in seconds. You review it — always — but it types
  faster than you.
- **Bulk grunt work with clear instructions.** "Add a column
  extracting the domain from the email address", "convert these
  headers to Proper Case". The kind of thing you *can* do, but which
  eats ten minutes you'd rather keep.
- **Suggesting angles on clean data.** Given a well-structured
  [Table](/articles/format-as-table-the-feature-that-changes-everything/),
  "what stands out?" returns two or three chart-plus-sentence starting
  points. Occasionally one is genuinely worth keeping.

## Where it lets you down

- **Messy data.** Merged cells, headers mid-sheet, totals mixed into
  the rows — Copilot flounders on exactly the files that fill real
  inboxes. The [4:45pm cleaning routine](/articles/the-445pm-export-cleaning-messy-data/)
  isn't optional because the AI arrived; it's the *prerequisite* for
  the AI being useful at all.
- **Your numbers and your judgement.** It will confidently summarise;
  it will occasionally confidently miscount. Anything that feeds a
  decision — a report, a price, a pension figure — gets verified
  by a human with a SUMIFS. No exceptions.
- **Knowing what to ask.** Copilot answers questions; it doesn't know
  that the interesting question about your spend data is the Future ÷
  In ratio. Domain sense — the thing [the path](/roadmap/) actually
  teaches — stays your job.

## The habit that makes it safe

One rule covers everything: **treat Copilot like a bright temp on
their first day.** Delegate drafts, never sign-off. Concretely: let
it write the formula, then read the formula like you'd read any
inherited one — *where does it think it's pointing?* If you can't
read the draft, don't ship the draft; that's not an AI rule, it's
the same rule this site applies to everything.

| Delegate freely | Keep on your desk |
|-----------------|-------------------|
| Explaining inherited formulas | Verifying any number that matters |
| Formula and column drafts | Choosing the question |
| Formatting grunt work | Cleaning messy source data |
| "What stands out?" starters | The final read before it ships |

## The quiet takeaway

Six months of use, one conclusion: **Copilot rewards exactly the
skills it was supposed to replace.** Clean Tables, precise column
names, knowing what a right answer roughly looks like — people with
those habits get compounding value from AI; people without them get
confident nonsense faster than ever.

Which is convenient, because those habits are learnable, in order,
for free: [that's the path](/roadmap/). The robot is real and it is
useful — as an amplifier. Something worth amplifying is still on you.
