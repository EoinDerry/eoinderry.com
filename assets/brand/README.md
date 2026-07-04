# Brand assets — eoinderry.com

The mark is a lowercase **"ed" drawn as a network topology**: strokes are
links, dots are nodes, the two letters share a single node where they
meet (two networks, peered), and the cyan dot is a packet in flight
around the "e".

## Files

| File | Use on |
|------|--------|
| `ed-mark.svg` | Dark backgrounds — the primary version |
| `ed-mark-light.svg` | White / light backgrounds |
| `ed-mark-cyan.svg` | Dark backgrounds when you want full-cyan impact |
| `ed-mark-black.svg` | Single-colour print, stamps, engraving |
| `ed-mark-white.svg` | Over photos and video on dark footage |
| `avatar.svg` | Profile pictures — already centred for circular crops |
| `png/` | Pre-rendered PNGs for platforms that won't take SVG |

## Motion (`motion/`)

| File | Use |
|------|-----|
| `eoinderry-intro-1080p60.mp4` | The YouTube intro — 4.6 s, 1080p60, silent. Drop it at the head of a video and add sound design in the edit. |
| `eoinderry-intro-alpha.webm` | Same animation with a transparent background, for overlaying on footage (end screens, lower-thirds software that accepts VP9 alpha). |
| `intro.html` + fonts | The animation source. Open it in a browser and call `SEEK(t)` in the console to scrub. Re-render at any resolution/fps with a headless browser if you ever need 4K. Fonts are included under their SIL Open Font License. |

The sequence: nodes ping into existence, the links draw the letters,
a packet enters at the far-left node, laps the "e" and docks in its
resting place, the wordmark types on, the tagline lands. Cut points:
the mark is fully formed at ~3.1 s if you need a shorter sting.

## Rules of thumb

- **Clear space:** keep at least the height of one node (the dot) clear
  on every side.
- **Minimum size:** 20 px tall. Below that, use the avatar tile so the
  dark background carries the shape.
- **Colours:** cyan `#35e0d0` · off-white `#e8edf4` · ink `#0e1726` ·
  background `#070b12`. On light backgrounds the packet uses the darker
  cyan `#0fbdae` so it passes contrast.
- **Don't** rotate it, outline it, add gradients or shadows, or recolour
  the packet to anything but the brand cyan/white.
- **Wordmark:** pair the mark with "eoinderry" set in Bricolage
  Grotesque SemiBold (the site's display face, free on Google Fonts),
  with ".com" in the muted grey. The site header is the reference.
