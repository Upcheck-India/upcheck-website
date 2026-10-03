/**
 * Generates the favicon set and the Open Graph card.
 * Run with: node scripts/generate-social-assets.mjs
 *
 * The OG card is what someone sees when upcheck.in is pasted into WhatsApp,
 * LinkedIn or email, so it carries the name and the one-line positioning
 * rather than just the logo.
 */
import sharp from "sharp";

const PUB = "client/public";
const LOGO = `${PUB}/attached_assets/upcheck-logo.png`;
const POSTER = `${PUB}/attached_assets/hero-poster.jpg`;

const BRAND_DEEP = "#0067B1";
const BRAND_CYAN = "#00C9E4";

/* ---------- favicons ---------- */
// The wordmark is 500x200; a favicon is square, so pad rather than squash it.
const mark = await sharp(LOGO).resize(400, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

for (const size of [32, 180, 192, 512]) {
  const pad = Math.round(size * 0.12);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: await sharp(mark)
          .resize(size - pad * 2, size - pad * 2, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .toBuffer(),
        gravity: "centre",
      },
    ])
    .png()
    .toFile(`${PUB}/favicon-${size}.png`);
}

console.log("favicons: 32, 180, 192, 512");

/* ---------- Open Graph card (1200x630) ---------- */
const W = 1200;
const H = 630;

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#04121C" stop-opacity="0.72"/>
      <stop offset="55%" stop-color="#04121C" stop-opacity="0.86"/>
      <stop offset="100%" stop-color="#04121C" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND_CYAN}"/>
      <stop offset="100%" stop-color="${BRAND_DEEP}"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect x="0" y="0" width="${W}" height="8" fill="url(#rule)"/>

  <text x="80" y="212" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="26" font-weight="700" letter-spacing="5" fill="${BRAND_CYAN}">
    UPCHECK
  </text>

  <text x="80" y="310" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="70" font-weight="800" fill="#ffffff">
    Precision aquaculture
  </text>
  <text x="80" y="392" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="70" font-weight="800" fill="#ffffff">
    for shrimp farmers
  </text>

  <text x="80" y="470" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="30" font-weight="500" fill="#C7DCE8">
    Neerani farm-management app · Neero pond sensor
  </text>

  <rect x="80" y="516" width="250" height="4" fill="url(#rule)"/>
  <text x="80" y="566" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="26" font-weight="600" fill="#8FB3C6">
    upcheck.in
  </text>
</svg>
`);

await sharp(POSTER)
  .resize(W, H, { fit: "cover", position: "centre" })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(`${PUB}/og-image.jpg`);

const { size } = await sharp(`${PUB}/og-image.jpg`).metadata().then(() => import("node:fs")).then((fs) => fs.statSync(`${PUB}/og-image.jpg`));
console.log(`og-image.jpg: ${W}x${H}, ${(size / 1024).toFixed(0)}KB`);
