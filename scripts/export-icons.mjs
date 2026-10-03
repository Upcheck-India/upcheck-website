/**
 * Upcheck Pond icon set — build tooling.
 *
 * Reads every icons/*.svg and:
 *   1. Regenerates icons/preview.html (native 24px, 2x 48px, dark section)
 *      so the whole set can be reviewed in a browser.
 *   2. Exports tinted PNGs for other websites and mobile apps into
 *      icons/export/:
 *        - android/<scheme>/mipmap-{mdpi..xxxhdpi}/<name>.png  (24/36/48/72/96)
 *        - ios/<scheme>/<name>@{1,2,3}x.png                   (24/48/72)
 *      Two colour schemes: "brand" (deep blue stroke + cyan accent) and
 *      "white" (white stroke + cyan accent, for dark surfaces).
 *
 * Raw SVGs in icons/ stay the source of truth — this script only reads them.
 * Run: npm run icons:export
 */
import { readdir, readFile, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ICONS_DIR = path.resolve("icons");
const EXPORT_DIR = path.join(ICONS_DIR, "export");

const SCHEMES = {
  brand: { stroke: "#0067B1", accent: "#00C9E4" },
  white: { stroke: "#FFFFFF", accent: "#00C9E4" },
};

const ANDROID_DENSITIES = {
  mdpi: 24,
  hdpi: 36,
  xhdpi: 48,
  xxhdpi: 72,
  xxxhdpi: 96,
};

const IOS_SCALES = [1, 2, 3];
const BASE = 24;

/** Inline the set's accent CSS variable and currentColor into concrete colours. */
function tint(svg, { stroke, accent }) {
  return svg
    .replace(/style="fill:var\(--uc-accent,#00C9E4\)"/g, `fill="${accent}"`)
    .replace(/currentColor/g, stroke);
}

async function loadIcons() {
  const files = (await readdir(ICONS_DIR)).filter(
    (f) => f.endsWith(".svg")
  );
  const icons = [];
  for (const file of files.sort()) {
    const name = path.basename(file, ".svg");
    const svg = await readFile(path.join(ICONS_DIR, file), "utf8");
    icons.push({ name, svg });
  }
  return icons;
}

async function exportPngs(icons) {
  let count = 0;
  for (const [scheme, colors] of Object.entries(SCHEMES)) {
    for (const { name, svg } of icons) {
      const tinted = Buffer.from(tint(svg, colors));

      for (const [density, size] of Object.entries(ANDROID_DENSITIES)) {
        const dir = path.join(EXPORT_DIR, "android", scheme, `mipmap-${density}`);
        await mkdir(dir, { recursive: true });
        await sharp(tinted).resize(size, size).png().toFile(path.join(dir, `${name}.png`));
        count++;
      }

      for (const scale of IOS_SCALES) {
        const dir = path.join(EXPORT_DIR, "ios", scheme);
        await mkdir(dir, { recursive: true });
        await sharp(tinted)
          .resize(BASE * scale, BASE * scale)
          .png()
          .toFile(path.join(dir, `${name}@${scale}x.png`));
        count++;
      }
    }
  }
  return count;
}

function card(svg, name, width) {
  const sized = svg.replace(/\swidth="24"/, ` width="${width}"`).replace(/\sheight="24"/, ` height="${width}"`);
  return `    <div class="icon-card">\n      ${sized.trim()}\n      <span class="label">${name}</span>\n    </div>`;
}

async function buildPreview(icons) {
  const native = icons.map(({ name, svg }) => card(svg, name, 24)).join("\n");
  const doubled = icons.map(({ name, svg }) => card(svg, name, 48)).join("\n");
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Upcheck — Pond Icon Set Preview</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    color: #1a1a1a;
    background: #fafafa;
    --uc-accent: #00C9E4;
  }
  h1 { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.25rem; }
  .subtitle { color: #666; font-size: 0.9rem; margin-bottom: 2rem; }
  .spec {
    background: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    margin-bottom: 2rem;
    font-size: 0.85rem;
    color: #444;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }
  .spec span { white-space: nowrap; }
  .spec strong { color: #1a1a1a; }
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e5e5e5;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }
  .icon-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 0.5rem;
    border-radius: 8px;
    background: #fff;
    border: 1px solid #e5e5e5;
    transition: border-color 0.15s;
    color: #0067B1;
  }
  .icon-card:hover { border-color: #00C9E4; }
  .icon-card svg { flex-shrink: 0; }
  .icon-card .label {
    font-size: 0.7rem;
    color: #666;
    text-align: center;
    word-break: break-all;
  }
  .dark-section {
    background: #0f172a;
    border-radius: 12px;
    padding: 2rem;
    margin-top: 2rem;
  }
  .dark-section h2 { color: #fff; border-bottom-color: #334155; }
  .dark-section .icon-card {
    background: #1e293b;
    border-color: #334155;
    color: #fff;
  }
  .dark-section .icon-card:hover { border-color: #00C9E4; }
  .dark-section .icon-card .label { color: #94a3b8; }
  .size-label {
    font-size: 0.75rem;
    color: #999;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
</head>
<body>

<h1>Upcheck Pond Icons</h1>
<p class="subtitle">${icons.length} icons · pond-duotone style · accent var(--uc-accent) = #00C9E4</p>

<div class="spec">
  <span><strong>Grid:</strong> 24px</span>
  <span><strong>Stroke:</strong> 1.75px</span>
  <span><strong>Caps:</strong> round</span>
  <span><strong>Joins:</strong> round</span>
  <span><strong>Corner radius:</strong> 2px</span>
  <span><strong>Padding:</strong> 2px</span>
  <span><strong>Accent:</strong> one filled water shape per icon</span>
</div>

<h2>Native Size <span class="size-label">(24px)</span></h2>
<div class="grid">
${native}
</div>

<h2>2× Size <span class="size-label">(48px)</span></h2>
<div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));">
${doubled}
</div>

<div class="dark-section">
  <h2>Dark Background <span class="size-label">(48px)</span></h2>
  <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));">
${doubled}
  </div>
</div>

</body>
</html>
`;
  await writeFile(path.join(ICONS_DIR, "preview.html"), html);
}

async function main() {
  const icons = await loadIcons();
  if (icons.length === 0) throw new Error("No SVGs found in icons/");

  await rm(EXPORT_DIR, { recursive: true, force: true });
  const pngCount = await exportPngs(icons);
  await buildPreview(icons);

  console.log(`Built preview.html and exported ${pngCount} PNGs for ${icons.length} icons.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
