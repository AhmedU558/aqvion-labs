/**
 * Derives the brand raster set from the single supplied master file.
 *
 *   public/brand/aqvion-mark.png   <- SOURCE OF TRUTH, never modified
 *
 * Everything else is a mechanical derivative: the artwork is only scaled, or
 * has its surrounding black field knocked out to transparency. No geometry,
 * proportion, colour or typography of the mark is altered.
 *
 * Run with:  node scripts/gen-brand-assets.mjs
 * `sharp` is already present in the tree as a Next.js image-optimisation
 * dependency, so this script adds nothing to package.json.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/brand/aqvion-mark.png";
const OUT = "public/brand";

// Measured from the master: the disc is centred at 627,627 with the outer edge
// of the ring at radius 608 (first non-black pixel on the centre row is x=19).
const CENTER = 627;
const RADIUS = 610;
const SIZE = 1254;

const circleMask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
     <circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS}" fill="#fff"/>
   </svg>`,
);

await mkdir(OUT, { recursive: true });

// 1. Transparent-field master, for compositing on any background.
const alpha = await sharp(SRC)
  .ensureAlpha()
  .composite([{ input: circleMask, blend: "dest-in" }])
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(alpha).toFile(`${OUT}/aqvion-mark-alpha.png`);

// 2. Delivery sizes. next/image handles responsive resizing at runtime, so
//    these exist for contexts that cannot use it (OG art, manifests, email).
for (const size of [512, 256, 96]) {
  await sharp(alpha)
    .resize(size, size, { fit: "cover", kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/aqvion-mark-${size}.png`);
}

// 3. App icons. Next.js serves app/icon.png and app/apple-icon.png directly.
await sharp(alpha).resize(64, 64, { kernel: "lanczos3" }).png().toFile("app/icon.png");

// Apple touch icons are composited on an opaque tile by iOS, so this one keeps
// the master's own black field rather than relying on transparency.
await sharp(SRC).resize(180, 180, { kernel: "lanczos3" }).png().toFile("app/apple-icon.png");

console.log("brand assets generated");
