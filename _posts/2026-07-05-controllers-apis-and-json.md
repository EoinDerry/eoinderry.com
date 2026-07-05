---
title: "Controllers, APIs and JSON: Why the CLI Isn't the Whole Job Anymore"
description: >-
  The automation domain isn't a bolt-on to the CCNA — it's Cisco
  telling you where the industry went. Here's the controller model,
  the APIs that drive it, and the JSON you'll be reading either way.
date: 2026-07-05
domain: automation
---

Every article on this site so far has configured devices the classic
way: one SSH session, one device, one engineer typing. That model
built the internet, and it has a scaling problem you can feel in your
wrists. Three hundred switches need a VLAN added. The traditional
answer is three hundred logins — or a fragile script pretending to be
you in three hundred terminals. The industry's actual answer is the
subject of the exam's final domain: **stop configuring devices, and
start declaring intent to a controller.**

## Two planes, and the big idea

Every network device does two distinguishable jobs. The **data
plane** forwards frames and packets — the silicon-speed work. The
**control plane** decides *how* to forward — routing protocols,
[spanning tree](/articles/spanning-tree-the-loop-that-kills/), ARP,
all the intelligence. Traditionally, every device runs its own
control plane and you negotiate with each one separately.

**Controller-based networking** centralises the intelligence: a
controller (Cisco's Catalyst Center, an SD-WAN orchestrator) holds
the picture of the whole network and programs every device from one
place.

<figure class="fig">
<svg viewBox="0 0 720 320" role="img" aria-label="Traditional per-device management versus controller-based networking">
  <g font-family="IBM Plex Mono, monospace" font-size="12">
    <!-- left: traditional -->
    <text x="180" y="28" fill="#94a1b3" text-anchor="middle">traditional</text>
    <rect x="120" y="44" width="120" height="36" rx="6" fill="none" stroke="#e8edf4" stroke-width="1.5"/>
    <text x="180" y="67" fill="#e8edf4" text-anchor="middle" font-size="11">engineer</text>
    <g stroke="#94a1b3" stroke-width="1.5">
      <line x1="150" y1="80" x2="80" y2="200"/>
      <line x1="172" y1="80" x2="150" y2="200"/>
      <line x1="188" y1="80" x2="210" y2="200"/>
      <line x1="210" y1="80" x2="280" y2="200"/>
    </g>
    <rect x="120" y="137" width="120" height="18" fill="#0a0f19"/>
    <text x="180" y="150" fill="#5c6a7d" text-anchor="middle" font-size="10">ssh × every device</text>
    <g fill="none" stroke="#94a1b3">
      <rect x="50" y="200" width="60" height="30" rx="5"/>
      <rect x="120" y="200" width="60" height="30" rx="5"/>
      <rect x="180" y="200" width="60" height="30" rx="5"/>
      <rect x="250" y="200" width="60" height="30" rx="5"/>
    </g>
    <text x="180" y="260" fill="#5c6a7d" text-anchor="middle" font-size="11">config lives on each box · drift inevitable</text>
    <!-- divider -->
    <line x1="360" y1="30" x2="360" y2="290" stroke="#26303f" stroke-width="1.5" stroke-dasharray="5 6"/>
    <!-- right: controller -->
    <text x="540" y="28" fill="#35e0d0" text-anchor="middle">controller-based</text>
    <rect x="466" y="44" width="148" height="36" rx="6" fill="none" stroke="#e8edf4" stroke-width="1.5"/>
    <text x="540" y="67" fill="#e8edf4" text-anchor="middle" font-size="11">engineer / scripts</text>
    <line x1="540" y1="80" x2="540" y2="112" stroke="#35e0d0" stroke-width="2"/>
    <text x="550" y="100" fill="#35e0d0" font-size="10">northbound API (REST)</text>
    <rect x="465" y="112" width="150" height="40" rx="6" fill="rgba(53,224,208,0.08)" stroke="#35e0d0" stroke-width="2"/>
    <text x="540" y="137" fill="#35e0d0" text-anchor="middle">CONTROLLER</text>
    <g stroke="#35e0d0" stroke-width="1.5">
      <line x1="495" y1="152" x2="440" y2="200"/>
      <line x1="525" y1="152" x2="510" y2="200"/>
      <line x1="555" y1="152" x2="570" y2="200"/>
      <line x1="585" y1="152" x2="640" y2="200"/>
    </g>
    <text x="660" y="180" fill="#35e0d0" font-size="10" text-anchor="end">southbound APIs</text>
    <g fill="none" stroke="#94a1b3">
      <rect x="410" y="200" width="60" height="30" rx="5"/>
      <rect x="480" y="200" width="60" height="30" rx="5"/>
      <rect x="550" y="200" width="60" height="30" rx="5"/>
      <rect x="620" y="200" width="60" height="30" rx="5"/>
    </g>
    <text x="540" y="260" fill="#5c6a7d" text-anchor="middle" font-size="11">intent lives on the controller · devices follow</text>
  </g>
</svg>
<figcaption>fig 1 — same devices, different place for the intelligence</figcaption>
</figure>

The vocabulary in that diagram is directly examinable: the
**northbound API** is how humans and software talk *to* the
controller; the **southbound APIs** (NETCONF, RESTCONF, or plain SSH)
are how the controller talks *down* to the devices. North faces the
users; south faces the metal.

## REST APIs in one honest paragraph

A **REST API** is just HTTP used as a control language. The verbs you
already know from the web become operations: **GET** reads, **POST**
creates, **PUT/PATCH** updates, **DELETE** removes. You authenticate,
you call a URL that names the thing you care about, and the answer
comes back as structured data. That's the whole religion:

```
GET https://controller.example.com/api/v1/network-device
Authorization: Bearer eyJhbGciOi...
```

No screen-scraping, no "expect" scripts parsing CLI banners — a
program asks a precise question and gets a machine-readable answer.
Which raises the question of what machine-readable looks like.

## JSON: the answer to everything (literally)

The exam requires you to *interpret* JSON, and you'll read it weekly
for the rest of your career, so learn its four rules properly:
objects are `{ }` collections of `"key": value` pairs; arrays are
`[ ]` ordered lists; values can be strings, numbers, booleans, null —
or nested objects and arrays; and that's it. There is no rule five.

```json
{
  "device": {
    "hostname": "SW1",
    "mgmtIp": "10.9.9.2",
    "uptime_days": 147,
    "isReachable": true,
    "interfaces": [
      { "name": "Gi0/1", "vlan": 10, "status": "up" },
      { "name": "Gi0/2", "vlan": 20, "status": "down" }
    ]
  }
}
```

Exam questions hand you a blob like that and ask things like "what
type is `interfaces`?" (an array of objects) or "what is the value of
`isReachable`?" (the boolean `true` — *not* the string `"true"`;
quotes are the difference, and yes, they test it). Read JSON the way
you read a routing table: structure first, values second.

## Configuration management: the other half of the domain

Alongside controllers, the blueprint names the config-management
tools — **Ansible, Terraform, Puppet, Chef**. The distinctions the
exam draws are shallow but specific: Ansible is *agentless* (it just
SSHes in, which is why network kit loves it) and pushes configs;
Puppet and Chef traditionally use *agents* installed on the managed
node and pull from a server. Underneath the product names is the idea
that actually matters: **the config lives in files, in version
control, and the tool makes the network match the files.** The
running network becomes a *build artefact*. Config drift — the slow
divergence of three hundred hand-tended switches — simply stops being
possible.

## What this means for you, honestly

Nobody is deleting the CLI. When a link flaps at 2 a.m., an engineer
will still be reading `show` commands off a console — every skill in
[the rest of this series](/roadmap/) stays load-bearing. What changes
is the *ratio*: less typing the same thing into many boxes, more
defining intent once and letting software repeat it perfectly. Cisco
put this domain on the CCNA as a forecast. The engineers who read
JSON as comfortably as they read `show ip route` are the ones the
forecast favours.

---

*This completes first coverage of all six exam domains — the
[roadmap](/roadmap/) now has a lit node in every row. The series
keeps going deeper from here.*
