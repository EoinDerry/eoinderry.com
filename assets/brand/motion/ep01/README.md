# Episode 01 — screen video kit

Everything for recording video #01 ("The 4:45pm export") where the
animated screen plays full-frame and your face sits in the corner.

## What's here

| File | What it is |
|------|------------|
| `ep01-screen-1080p24.webm` | The rendered screen video, **6:12**, 1920×1080, silent — committed at full quality (3.5 Mbps VP8). |
| `ep01-screen.html` | The animation source. Open in a browser and it plays on a loop; open with `?guide=1` to see the face-zone outline while lining up your webcam. |
| `transcript.md` | The read-aloud script with scene timecodes matched to the video. |
| `render.js` | Renders the HTML to frames + WebM (Playwright + ffmpeg). |
| `fonts/` | Brand fonts (Google Fonts, OFL-licensed), local so the render never depends on the network. |

## Recording it (OBS, one pass)

1. Install OBS (free). Create a scene with two sources:
   - **Media Source** → `ep01-screen-1080p24.webm` (untick "loop").
   - **Video Capture Device** → your webcam, dragged to the
     **bottom-right corner** — the video keeps that area clear.
     Size it ≤ 440×400 (open the HTML with `?guide=1` to see the
     exact zone). Optional: add a crop/mask filter for a circle.
2. Put `transcript.md` somewhere glanceable (phone on a stand at
   lens height beats a second monitor — your eyes stay near the
   camera).
3. Start recording, restart the media source (right-click →
   Restart), and read. The scenes hold longer than the text needs —
   if you finish a scene's lines early, breathe; never race it.
4. Fluffed a line? Pause, then re-read *that sentence* — cutting
   pauses later is trivial; matching mid-sentence takes is not.
5. Done. The output file is the video: no editing required beyond
   trimming the ends (and the intro sting from `../intro.html` on
   the front if wanted).

Audio note: room echo is the #1 pilot-video tell. Soft furnishings
beat any microphone upgrade; any lapel or USB mic beats the webcam's.

## Re-rendering the screen video

```bash
node render.js frames ./frames        # ~15 min: 8,928 deterministic frames
ffmpeg -framerate 24 -i frames/f%05d.jpeg \
  -c:v libvpx -b:v 3500k -pix_fmt yuv420p ep01-screen-1080p24.webm
```

Timings live at the top of the HTML's `<script>` (`SCENES`) and
mirror `transcript.md` — change one, change both.
