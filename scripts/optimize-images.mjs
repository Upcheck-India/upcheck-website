/**
 * One-off asset optimiser. Run with: node scripts/optimize-images.mjs
 *
 * Writes a .webp beside every PNG/JPG in public/attached_assets that is large
 * enough to be worth it, and caps dimensions at 1920px. Originals are kept so
 * the <img src> fallback still resolves if a browser can't take WebP.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = "client/public/attached_assets";
const MIN_BYTES = 120 * 1024; // below this, WebP rarely pays for the extra file
const MAX_EDGE = 1920;

const files = await readdir(DIR);
const targets = [];

for (const name of files) {
  if (!/\.(png|jpe?g)$/i.test(name)) continue;
  const file = path.join(DIR, name);
  const { size } = await stat(file);
  if (size >= MIN_BYTES) targets.push({ name, file, size });
}

targets.sort((a, b) => b.size - a.size);

let before = 0;
let after = 0;

for (const { name, file, size } of targets) {
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const image = sharp(file);
  const { width = 0, height = 0 } = await image.metadata();
  const resize =
    Math.max(width, height) > MAX_EDGE
      ? { width: width >= height ? MAX_EDGE : undefined, height: height > width ? MAX_EDGE : undefined }
      : null;

  const info = await (resize ? image.resize(resize) : image)
    .webp({ quality: 78, effort: 6 })
    .toFile(out);

  before += size;
  after += info.size;
  const pct = (100 - (info.size / size) * 100).toFixed(0);
  console.log(
    `${name.padEnd(34)} ${(size / 1024).toFixed(0).padStart(5)}KB → ${(info.size / 1024)
      .toFixed(0)
      .padStart(5)}KB  (-${pct}%)`
  );
}

console.log(
  `\n${targets.length} images: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB ` +
    `(saved ${((before - after) / 1024 / 1024).toFixed(1)}MB)`
);
