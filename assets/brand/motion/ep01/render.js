const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const MODE = process.argv[2] || 'stills';
const OUT = process.argv[3];
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('file:///workspace/eoinderry.com/assets/brand/motion/ep01/ep01-screen.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  if (MODE === 'stills') {
    const times = [2, 16, 55, 120, 200, 250, 285, 325, 355];
    for (const t of times) {
      await page.evaluate(t => window.seekTo(t), t);
      await page.screenshot({ path: path.join(OUT, `t${String(t).padStart(3,'0')}.png`) });
    }
  } else {
    const FPS = 24, DUR = 372, N = FPS * DUR;
    for (let i = 0; i < N; i++) {
      await page.evaluate(t => window.seekTo(t), i / FPS);
      await page.screenshot({ path: path.join(OUT, `f${String(i).padStart(5,'0')}.jpeg`), type: 'jpeg', quality: 88 });
      if (i % 480 === 0) console.log(`frame ${i}/${N}`);
    }
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
