---
title: "TCP vs UDP: Why the Internet Needs Both"
description: >-
  One protocol promises delivery and one promises speed — and the genius
  of the design is that the application, not the network, gets to choose.
date: 2026-06-14
domain: fundamentals
---

Ask a student the difference between TCP and UDP and you'll usually get
the flashcard answer: "TCP is reliable, UDP is unreliable." True, and
almost useless — because it makes UDP sound like a defect. The real
question the exam is probing is *why a sane engineer would ever choose
the unreliable one*. Answer that, and the whole topic clicks.

## Two philosophies of delivery

Imagine sending a fifty-page document to a colleague.

**The TCP way:** you phone ahead ("ready to receive?"), number every
page, send a few at a time, and your colleague confirms each batch. A
page goes missing? They tell you, and you resend it. Slow-ish, chatty,
but the document arrives complete and in order — *guaranteed*.

**The UDP way:** you fire the pages through their letterbox and walk
away. No call, no numbering, no confirmation. Nearly all of them
arrive, almost instantly. If one doesn't — well, you never promised.

Neither is "better". They're different contracts, and applications pick
the contract that matches what they're doing.

## The handshake: TCP's opening ceremony

Before TCP moves a single byte of your data, the two hosts build a
**connection** — an agreement on sequence numbers so both sides can
track exactly what has arrived. It takes three messages, and the exam
loves them:

<figure class="fig">
<svg viewBox="0 0 720 260" role="img" aria-label="TCP three-way handshake sequence diagram">
  <defs>
    <marker id="ah1" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0 0 L9 4 L0 8 Z" fill="#35e0d0"/>
    </marker>
    <marker id="ah2" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0 0 L9 4 L0 8 Z" fill="#94a1b3"/>
    </marker>
  </defs>
  <g font-family="IBM Plex Mono, monospace" font-size="13">
    <!-- lifelines -->
    <rect x="80" y="18" width="120" height="34" rx="6" fill="none" stroke="#e8edf4" stroke-width="1.5"/>
    <text x="140" y="40" fill="#e8edf4" text-anchor="middle">Client</text>
    <rect x="520" y="18" width="120" height="34" rx="6" fill="none" stroke="#e8edf4" stroke-width="1.5"/>
    <text x="580" y="40" fill="#e8edf4" text-anchor="middle">Server</text>
    <line x1="140" y1="52" x2="140" y2="240" stroke="#26303f" stroke-width="1.5"/>
    <line x1="580" y1="52" x2="580" y2="240" stroke="#26303f" stroke-width="1.5"/>
    <!-- 1 SYN -->
    <line x1="140" y1="90" x2="572" y2="90" stroke="#35e0d0" stroke-width="2" marker-end="url(#ah1)"/>
    <text x="360" y="80" fill="#35e0d0" text-anchor="middle">1 · SYN</text>
    <text x="360" y="106" fill="#5c6a7d" text-anchor="middle" font-size="11">"I'd like to talk. My sequence number starts here."</text>
    <!-- 2 SYN-ACK -->
    <line x1="580" y1="145" x2="148" y2="145" stroke="#94a1b3" stroke-width="2" marker-end="url(#ah2)"/>
    <text x="360" y="135" fill="#94a1b3" text-anchor="middle">2 · SYN-ACK</text>
    <text x="360" y="161" fill="#5c6a7d" text-anchor="middle" font-size="11">"Happy to talk. Here's mine — and I've noted yours."</text>
    <!-- 3 ACK -->
    <line x1="140" y1="200" x2="572" y2="200" stroke="#35e0d0" stroke-width="2" marker-end="url(#ah1)"/>
    <text x="360" y="190" fill="#35e0d0" text-anchor="middle">3 · ACK</text>
    <text x="360" y="216" fill="#5c6a7d" text-anchor="middle" font-size="11">"Noted yours too. Connection open — send data."</text>
  </g>
</svg>
<figcaption>fig 1 — the three-way handshake: SYN, SYN-ACK, ACK</figcaption>
</figure>

UDP has no equivalent of this diagram. That's not an omission — it's
the entire product. No handshake means no round trips before the first
byte of real data, no connection state eating memory on the server,
and no teardown afterwards.

## What each protocol actually gives you

| Property | TCP | UDP |
|----------|-----|-----|
| Connection | Yes — established first | None |
| Delivery guarantee | Yes — lost segments resent | No |
| Ordering | Yes — sequence numbers | No |
| Flow control | Yes — windowing | No |
| Header size | 20+ bytes | 8 bytes |
| Speed | Slower to start, steady | Immediate |
| Personality | The accountant | The courier |

The window deserves a sentence, because it's the cleverest part of TCP:
rather than acknowledging every segment (slow), the receiver advertises
how much it's willing to accept in flight — and that window grows and
shrinks with conditions. TCP doesn't just deliver reliably; it
constantly *adapts its speed* to the network. UDP sends at whatever
rate the application feels like, network be damned.

## So who uses what — and why

- **Web, email, file transfer → TCP.** A web page with holes in it is
  broken. Correctness beats latency.
- **Live voice and video → UDP.** A syllable that arrives late is
  *worse* than a syllable that never arrives — resending it would mean
  talking over the present. Drop it and move on.
- **DNS → UDP** (mostly). One tiny question, one tiny answer. Setting
  up a TCP connection for that would triple the work. If the reply is
  too big or fails, it falls back to TCP.
- **DHCP, TFTP, SNMP → UDP.** Small, simple exchanges where the
  application handles its own retries.

> **The pattern worth memorising:** if the *application* can tolerate
> loss or would rather manage reliability itself, it chooses UDP. If it
> can't, it pays TCP's overhead. Reliability isn't free — it's bought
> with round trips, headers and state.

## The port numbers bit

Both protocols share the same addressing trick: **port numbers**, the
door numbers of a single host. The IP address gets the packet to the
right machine; the port gets it to the right *conversation* on that
machine. Well-known ports live from 0–1023, and a handful are
compulsory knowledge:

```
TCP 22  SSH          TCP 80  HTTP         TCP 443 HTTPS
TCP 25  SMTP         TCP 110 POP3         TCP 143 IMAP
UDP 53  DNS          UDP 67/68 DHCP       UDP 69  TFTP
TCP 20/21 FTP        UDP 123 NTP          UDP 161 SNMP
```

Notice DNS sitting in the UDP column and FTP in TCP's — the exam asks
these both as trivia and, more usefully, as "which protocol would this
application use?" questions. If you understand the two contracts, you
can *derive* the answer instead of remembering it.

---

*Elsewhere in this domain: [subnetting without tears](/articles/subnetting-without-tears/)
covers how the IP layer under these protocols carves up the address
space.*
