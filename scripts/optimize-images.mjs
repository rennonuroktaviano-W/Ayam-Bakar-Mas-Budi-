// Converts the generated PNG placeholders to WebP and removes the PNGs.
//
//   node scripts/generate-placeholders.mjs   # writes PNGs
//   node scripts/optimize-images.mjs         # PNG -> WebP, deletes PNGs
//
// The generator stays dependency-free on purpose so it can run anywhere;
// this step uses sharp, which Next.js already depends on for image
// optimisation, so there is nothing extra to install.
import { readdirSync, statSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = join(ROOT, "public", "images");

let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.error(
    "sharp tidak tersedia. Jalankan `npm install` dulu (sharp ikut sebagai dependency Next.js).",
  );
  process.exit(1);
}

const files = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (extname(p).toLowerCase() === ".png") files.push(p);
  }
})(IMAGES);

if (files.length === 0) {
  console.log("Tidak ada PNG di public/images. Tidak ada yang perlu dikonversi.");
  process.exit(0);
}

const QUALITY = 82;
let before = 0;
let after = 0;

for (const file of files) {
  const target = join(dirname(file), `${basename(file, ".png")}.webp`);
  const input = readFileSync(file);

  const output = await sharp(input)
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();

  writeFileSync(target, output);
  unlinkSync(file);

  before += input.length;
  after += output.length;

  const pct = ((1 - output.length / input.length) * 100).toFixed(0);
  console.log(
    `${basename(file)}  ${(input.length / 1024).toFixed(0)} KB -> ${(output.length / 1024).toFixed(0)} KB  (-${pct}%)`,
  );
}

console.log(
  `\n${files.length} gambar: ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024 / 1024).toFixed(1)} MB`,
);
console.log("Referensi .png di src/ harus diubah ke .webp.");
