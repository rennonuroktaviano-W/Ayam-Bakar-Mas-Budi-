// Generates warm gradient placeholder photos (pure Node, no deps).
// Run: node scripts/generate-placeholders.mjs
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(width, height, rgb) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolor
  const raw = Buffer.alloc(height * (width * 3 + 1));
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 3 + 1);
    raw[rowStart] = 0;
    rgb.copy(raw, rowStart + 1, y * width * 3, (y + 1) * width * 3);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function canvas(w, h) {
  return { w, h, px: Buffer.alloc(w * h * 3) };
}

function setPx(c, x, y, rgb) {
  if (x < 0 || y < 0 || x >= c.w || y >= c.h) return;
  const i = (y * c.w + x) * 3;
  c.px[i] = clamp255(rgb[0]);
  c.px[i + 1] = clamp255(rgb[1]);
  c.px[i + 2] = clamp255(rgb[2]);
}

function getPx(c, x, y) {
  const cx = Math.min(c.w - 1, Math.max(0, x));
  const cy = Math.min(c.h - 1, Math.max(0, y));
  const i = (cy * c.w + cx) * 3;
  return [c.px[i], c.px[i + 1], c.px[i + 2]];
}

// Diagonal gradient base with slight noise so it doesn't look flat.
function gradient(c, from, to, seed = 7) {
  const rand = rng(seed);
  const a = hex(from);
  const b = hex(to);
  for (let y = 0; y < c.h; y++) {
    for (let x = 0; x < c.w; x++) {
      const t = (x / c.w) * 0.45 + (y / c.h) * 0.55;
      const n = (rand() - 0.5) * 7;
      setPx(c, x, y, mix(a, b, t).map((v) => v + n));
    }
  }
}

// Soft radial glow (additive).
function glow(c, cx, cy, radius, color, strength = 0.55) {
  const col = hex(color);
  const r2 = radius * radius;
  for (let y = Math.max(0, cy - radius); y < Math.min(c.h, cy + radius); y++) {
    for (let x = Math.max(0, cx - radius); x < Math.min(c.w, cx + radius); x++) {
      const d2 = (x - cx) ** 2 + (y - cy) ** 2;
      if (d2 > r2) continue;
      const f = (1 - Math.sqrt(d2 / r2)) ** 2 * strength;
      const base = getPx(c, x, y);
      setPx(c, x, y, mix(base, col, f));
    }
  }
}

// Filled ellipse with soft edge (plate / food blob).
function ellipse(c, cx, cy, rx, ry, color, opacity = 1, blur = 0) {
  const col = hex(color);
  const x0 = Math.max(0, Math.floor(cx - rx - blur));
  const x1 = Math.min(c.w, Math.ceil(cx + rx + blur + 1));
  const y0 = Math.max(0, Math.floor(cy - ry - blur));
  const y1 = Math.min(c.h, Math.ceil(cy + ry + blur + 1));
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      const d = Math.sqrt(nx * nx + ny * ny);
      let a = d >= 1 ? 0 : 1 - d ** 6;
      if (blur > 0) a = Math.max(0, Math.min(1, a * (1 - d / (1 + blur / Math.min(rx, ry)))));
      if (a <= 0) continue;
      setPx(c, x, y, mix(getPx(c, x, y), col, a * opacity));
    }
  }
}

// Rounded rectangle (rice box / card block in the photo).
function roundedRect(c, x0, y0, w, h, r, color, opacity = 1) {
  const col = hex(color);
  for (let y = Math.floor(y0) - 1; y < Math.ceil(y0 + h) + 1; y++) {
    for (let x = Math.floor(x0) - 1; x < Math.ceil(x0 + w) + 1; x++) {
      const dx = Math.max(x0 + r - x, 0, x - (x0 + w - r));
      const dy = Math.max(y0 + r - y, 0, y - (y0 + h - r));
      if (Math.sqrt(dx * dx + dy * dy) > r) continue;
      setPx(c, x, y, mix(getPx(c, x, y), col, opacity));
    }
  }
}

// Grilled chicken silhouette: plate + body + drumstick + grill marks + char lines.
function chickenPhoto(c, seed = 1, tint = "#7C2D12") {
  gradient(c, "#F7E4C8", "#E9C79A", seed);
  glow(c, c.w * 0.28, c.h * 0.22, c.w * 0.55, "#FFF3D6", 0.5);
  glow(c, c.w * 0.85, c.h * 0.9, c.w * 0.5, "#B45309", 0.3);

  const cx = c.w / 2;
  const cy = c.h * 0.56;
  // shadow under plate
  ellipse(c, cx, cy + c.h * 0.06, c.w * 0.44, c.h * 0.4, "#7C2D12", 0.18, 1.6);
  // plate
  ellipse(c, cx, cy, c.w * 0.4, c.h * 0.38, "#FFFDF8", 0.96);
  ellipse(c, cx, cy, c.w * 0.3, c.h * 0.28, "#F6EEDF", 0.55);
  // char speckles on plate
  const rand = rng(seed * 31 + 5);
  for (let i = 0; i < 220; i++) {
    const ang = rand() * Math.PI * 2;
    const rad = 0.12 + rand() * 0.26;
    const x = cx + Math.cos(ang) * c.w * rad;
    const y = cy + Math.sin(ang) * c.h * rad * 0.95;
    ellipse(c, x, y, 2 + rand() * 3, 2 + rand() * 2, "#8A4B2A", 0.12 + rand() * 0.15);
  }
  // chicken body
  ellipse(c, cx - c.w * 0.02, cy - c.h * 0.02, c.w * 0.24, c.h * 0.19, "#5C2A10", 0.2, 2);
  ellipse(c, cx - c.w * 0.02, cy - c.h * 0.03, c.w * 0.22, c.h * 0.17, tint, 0.95);
  ellipse(c, cx - c.w * 0.07, cy - c.h * 0.08, c.w * 0.1, c.h * 0.07, "#A4522A", 0.4);
  // drumstick
  ellipse(c, cx + c.w * 0.19, cy + c.h * 0.06, c.w * 0.11, c.h * 0.09, "#5C2A10", 0.18, 2);
  ellipse(c, cx + c.w * 0.19, cy + c.h * 0.05, c.w * 0.1, c.h * 0.08, "#B4592C", 0.95);
  ellipse(c, cx + c.w * 0.23, cy + c.h * 0.1, c.w * 0.045, c.h * 0.035, "#F3E3CE", 0.9);
  // grill marks
  for (let i = -2; i <= 2; i++) {
    const x = cx + i * c.w * 0.075 - c.w * 0.02;
    for (let t = 0; t <= 1; t += 0.01) {
      const y = cy - c.h * 0.14 + t * c.h * 0.22;
      const fade = Math.sin(t * Math.PI) * 0.75;
      ellipse(c, x + t * c.w * 0.02, y, 2.4, 2.4, "#2B1207", fade);
    }
  }
  // chili + lime garnish
  ellipse(c, cx - c.w * 0.3, cy + c.h * 0.16, c.w * 0.035, c.h * 0.018, "#DC2626", 0.9);
  ellipse(c, cx - c.w * 0.26, cy + c.h * 0.19, c.w * 0.03, c.h * 0.015, "#DC2626", 0.85);
  ellipse(c, cx + c.w * 0.06, cy + c.h * 0.24, c.w * 0.055, c.h * 0.045, "#84CC16", 0.8);
  ellipse(c, cx + c.w * 0.06, cy + c.h * 0.24, c.w * 0.035, c.h * 0.028, "#FDE68A", 0.7);
  // steam
  for (let s = 0; s < 3; s++) {
    for (let t = 0; t <= 1; t += 0.02) {
      const x = cx + (s - 1) * c.w * 0.11 + Math.sin(t * 6 + s) * c.w * 0.03;
      const y = cy - c.h * 0.26 - t * c.h * 0.22;
      ellipse(c, x, y, 6 + t * 10, 6 + t * 10, "#FFFFFF", 0.1 * (1 - t));
    }
  }
}

// Rice box / paket photo.
function paketPhoto(c, seed = 2) {
  gradient(c, "#F3E2C7", "#DFC099", seed);
  glow(c, c.w * 0.3, c.h * 0.2, c.w * 0.5, "#FFF7E3", 0.45);
  const bx = c.w * 0.16;
  const by = c.h * 0.28;
  const bw = c.w * 0.68;
  const bh = c.h * 0.46;
  ellipse(c, c.w / 2, by + bh * 0.9, bw * 0.55, bh * 0.22, "#7C2D12", 0.16, 2);
  // box base
  roundedRect(c, bx, by, bw, bh, c.w * 0.03, "#8B5A2B", 1);
  roundedRect(c, bx, by, bw, bh * 0.42, c.w * 0.03, "#F5E6CC", 1);
  // compartments
  roundedRect(c, bx + bw * 0.06, by + bh * 0.1, bw * 0.5, bh * 0.6, c.w * 0.015, "#7A3B18", 0.85);
  // rice
  for (let i = 0; i < 420; i++) {
    const rand = rng(seed * 17 + i);
    const x = bx + bw * 0.08 + rand() * bw * 0.46;
    const y = by + bh * 0.12 + rand() * bh * 0.56;
    ellipse(c, x, y, 2 + rand() * 2.5, 2 + rand() * 2, "#FFFDF6", 0.85);
  }
  // grilled chicken pieces
  ellipse(c, bx + bw * 0.76, by + bh * 0.3, bw * 0.15, bh * 0.16, "#5C2A10", 0.2, 2);
  ellipse(c, bx + bw * 0.76, by + bh * 0.28, bw * 0.14, bh * 0.14, "#8A4322", 0.95);
  ellipse(c, bx + bw * 0.7, by + bh * 0.58, bw * 0.13, bh * 0.13, "#6B3318", 0.9);
  // sambal & lalapan
  ellipse(c, bx + bw * 0.86, by + bh * 0.58, bw * 0.09, bh * 0.1, "#B91C1C", 0.85);
  ellipse(c, bx + bw * 0.86, by + bh * 0.82, bw * 0.1, bh * 0.09, "#4D7C0F", 0.85);
  ellipse(c, bx + bw * 0.76, by + bh * 0.82, bw * 0.09, bh * 0.08, "#65A30D", 0.8);
  // lid
  roundedRect(c, bx - bw * 0.03, by - bh * 0.22, bw * 1.06, bh * 0.2, c.w * 0.025, "#C98F4B", 0.95);
  glow(c, c.w * 0.2, by - bh * 0.1, c.w * 0.2, "#FFF3D6", 0.35);
}

// Drinks photo.
function drinkPhoto(c, seed = 3, liquid = "#B45309", ice = true) {
  gradient(c, "#EFE0CB", "#D9BC97", seed);
  glow(c, c.w * 0.5, c.h * 0.15, c.w * 0.6, "#FFF8E7", 0.5);
  const cx = c.w / 2;
  const top = c.h * 0.2;
  const bot = c.h * 0.86;
  const rx = c.w * 0.19;
  ellipse(c, cx, bot + c.h * 0.02, rx * 1.5, c.h * 0.05, "#7C2D12", 0.18, 2);
  // glass
  ellipse(c, cx, top, rx, c.h * 0.05, "#FFFFFF", 0.35);
  for (let y = top; y < bot; y++) {
    const t = (y - top) / (bot - top);
    const halfW = rx * (0.82 + t * 0.22);
    const fill = y > top + (bot - top) * 0.22;
    for (let x = Math.round(cx - halfW); x <= Math.round(cx + halfW); x++) {
      const edge = Math.abs(x - cx) / halfW;
      if (edge > 1) continue;
      let col = null;
      if (fill) col = mix(hex(liquid), hex("#FDE68A"), (1 - edge) * 0.25);
      const shade = 0.55 + 0.45 * (1 - edge ** 2);
      setPx(c, x, y, (col || getPx(c, x, y)).map((v) => v * (0.55 + shade * 0.55)));
    }
  }
  // rim + liquid surface
  ellipse(c, cx, top + (bot - top) * 0.22, rx * 0.84, c.h * 0.035, mix(hex(liquid), hex("#FFF7D6"), 0.35), 0.95);
  ellipse(c, cx, top, rx, c.h * 0.05, "#FFFDF8", 0.5);
  ellipse(c, cx, top, rx * 0.84, c.h * 0.038, "#EFE3D0", 0.8);
  if (ice) {
    const rand = rng(seed * 13 + 3);
    for (let i = 0; i < 9; i++) {
      const x = cx + (rand() - 0.5) * rx * 1.2;
      const y = top + (bot - top) * (0.3 + rand() * 0.45);
      roundedRect(c, x - rx * 0.16, y - rx * 0.14, rx * 0.32, rx * 0.28, rx * 0.05, "#FFFFFF", 0.5);
    }
  }
  // straw
  const sx = cx + rx * 0.5;
  for (let y = top - c.h * 0.2; y < top + c.h * 0.2; y++) {
    for (let x = 0; x < c.w * 0.022; x++) {
      setPx(c, sx + x, y, mix(getPx(c, sx + x, y), hex("#DC2626"), 0.9));
    }
  }
}

// Dessert photo.
function dessertPhoto(c, seed = 4) {
  gradient(c, "#F6E6CE", "#E2C39C", seed);
  glow(c, c.w * 0.35, c.h * 0.2, c.w * 0.55, "#FFF9EA", 0.5);
  const cx = c.w / 2;
  const cy = c.h * 0.6;
  ellipse(c, cx, cy + c.h * 0.1, c.w * 0.34, c.h * 0.3, "#7C2D12", 0.18, 2);
  ellipse(c, cx, cy, c.w * 0.32, c.h * 0.3, "#FFFDF8", 0.96);
  // banana split-ish: three grilled banana halves
  for (const off of [-0.18, 0, 0.18]) {
    ellipse(c, cx + c.w * off, cy - c.h * 0.02, c.w * 0.08, c.h * 0.2, "#92400E", 0.95);
    ellipse(c, cx + c.w * off, cy - c.h * 0.03, c.w * 0.055, c.h * 0.17, "#F5C860", 0.9);
    for (let t = -0.6; t <= 0.6; t += 0.3) {
      ellipse(c, cx + c.w * (off + t * 0.06), cy - c.h * 0.03 + t * c.h * 0.08, 2.5, 6, "#5C2A10", 0.5);
    }
  }
  ellipse(c, cx, cy - c.h * 0.14, c.w * 0.1, c.h * 0.07, "#3F2313", 0.9);
  ellipse(c, cx - c.w * 0.02, cy - c.h * 0.15, c.w * 0.05, c.h * 0.03, "#92400E", 0.6);
  ellipse(c, cx + c.w * 0.13, cy + c.h * 0.12, c.w * 0.07, c.h * 0.045, "#FDE68A", 0.9);
  // ice cream scoop
  ellipse(c, cx + c.w * 0.16, cy - c.h * 0.18, c.w * 0.1, c.h * 0.09, "#FDE68A", 0.95);
  ellipse(c, cx + c.w * 0.14, cy - c.h * 0.2, c.w * 0.05, c.h * 0.04, "#FFF7D6", 0.8);
}

// Kitchen / grill scene.
function kitchenPhoto(c, seed = 5) {
  gradient(c, "#3B2317", "#1C1917", seed);
  glow(c, c.w * 0.5, c.h * 0.72, c.w * 0.6, "#F59E0B", 0.5);
  glow(c, c.w * 0.2, c.h * 0.3, c.w * 0.35, "#7C2D12", 0.35);
  // grill bars
  const barTop = c.h * 0.42;
  const barBot = c.h * 0.72;
  for (let i = 0; i <= 14; i++) {
    const x = (c.w / 14) * i;
    roundedRect(c, x - c.w * 0.012, barTop, c.w * 0.024, barBot - barTop, c.w * 0.01, "#0C0A09", 0.85);
  }
  // coals
  const rand = rng(seed * 91);
  for (let i = 0; i < 160; i++) {
    const x = rand() * c.w;
    const y = barBot + rand() * (c.h * 0.22);
    const r = 4 + rand() * 16;
    ellipse(c, x, y, r, r * 0.7, rand() > 0.5 ? "#EA580C" : "#7C2D12", 0.35 + rand() * 0.35);
  }
  // chicken on grill
  for (const off of [-0.22, 0.06]) {
    ellipse(c, c.w * (0.5 + off), c.h * 0.55, c.w * 0.16, c.h * 0.1, "#3B1A08", 0.9);
    ellipse(c, c.w * (0.5 + off), c.h * 0.54, c.w * 0.14, c.h * 0.085, "#B4592C", 0.95);
  }
  // smoke
  for (let s = 0; s < 4; s++) {
    for (let t = 0; t <= 1; t += 0.02) {
      const x = c.w * (0.2 + s * 0.2) + Math.sin(t * 7 + s * 2) * c.w * 0.06;
      const y = barTop - t * c.h * 0.4;
      ellipse(c, x, y, 10 + t * 26, 10 + t * 26, "#E7E5E4", 0.08 * (1 - t));
    }
  }
  glow(c, c.w * 0.5, c.h * 0.95, c.w * 0.7, "#B45309", 0.2);
}

// Team photo.
function teamPhoto(c, seed = 6) {
  gradient(c, "#F1DFC2", "#D9B98E", seed);
  glow(c, c.w * 0.5, c.h * 0.2, c.w * 0.6, "#FFF7E6", 0.45);
  // wall tiles hint
  for (let y = c.h * 0.08; y < c.h * 0.5; y += c.h * 0.09) {
    for (let x = 0; x < c.w; x += c.w * 0.12) {
      roundedRect(c, x + 3, y + 3, c.w * 0.12 - 6, c.h * 0.09 - 6, 6, "#FFFDF7", 0.12);
    }
  }
  const people = [
    { x: 0.28, shirt: "#B02A1B", skin: "#E8B98C" },
    { x: 0.5, shirt: "#E8590C", skin: "#D9A273" },
    { x: 0.72, shirt: "#1C1917", skin: "#EFC79C" },
  ];
  for (const p of people) {
    const cx = c.w * p.x;
    ellipse(c, cx, c.h * 0.36, c.w * 0.075, c.h * 0.09, "#B98A5E", 0.9);
    ellipse(c, cx, c.h * 0.34, c.w * 0.07, c.h * 0.085, p.skin, 1);
    ellipse(c, cx, c.h * 0.28, c.w * 0.072, c.h * 0.05, "#2B1B10", 0.9);
    ellipse(c, cx, c.h * 0.36, c.w * 0.012, c.h * 0.008, "#1C1917", 0.9);
    ellipse(c, cx - c.w * 0.026, c.h * 0.33, c.w * 0.012, c.h * 0.008, "#1C1917", 0.9);
    ellipse(c, cx + c.w * 0.026, c.h * 0.33, c.w * 0.012, c.h * 0.008, "#1C1917", 0.9);
    ellipse(c, cx, c.h * 0.35, c.w * 0.024, c.h * 0.012, p.skin, 1);
    // body
    for (let y = c.h * 0.44; y < c.h; y++) {
      const t = (y - c.h * 0.44) / (c.h * 0.56);
      const halfW = c.w * (0.1 + t * 0.075);
      for (let x = Math.round(cx - halfW); x <= Math.round(cx + halfW); x++) {
        const edge = Math.abs(x - cx) / halfW;
        if (edge > 1) continue;
        setPx(c, x, y, mix(hex(p.skin), hex(p.shirt), Math.min(1, t * 3.2)));
      }
    }
    ellipse(c, cx, c.h * 0.47, c.w * 0.07, c.h * 0.02, "#F5E6CC", 0.9);
  }
}

// Interior / location photo.
function interiorPhoto(c, seed = 7) {
  gradient(c, "#2A1B12", "#4A2C1A", seed);
  glow(c, c.w * 0.5, c.h * 0.3, c.w * 0.5, "#F59E0B", 0.32);
  // tables
  for (let i = 0; i < 3; i++) {
    const x = c.w * (0.2 + i * 0.3);
    const y = c.h * (0.62 + (i % 2) * 0.08);
    ellipse(c, x, y + c.h * 0.08, c.w * 0.13, c.h * 0.03, "#000000", 0.35, 2);
    roundedRect(c, x - c.w * 0.13, y - c.h * 0.02, c.w * 0.26, c.h * 0.06, c.w * 0.02, "#8B5A2B", 0.9);
    roundedRect(c, x - c.w * 0.02, y + c.h * 0.03, c.w * 0.04, c.h * 0.12, 4, "#5C3A1A", 0.9);
    ellipse(c, x - c.w * 0.06, y - c.h * 0.03, c.w * 0.022, c.h * 0.02, "#FFFDF8", 0.8);
    ellipse(c, x + c.w * 0.07, y - c.h * 0.03, c.w * 0.02, c.h * 0.018, "#EA580C", 0.7);
  }
  // pendant lamps
  for (let i = 0; i < 3; i++) {
    const x = c.w * (0.25 + i * 0.25);
    glow(c, x, c.h * 0.28, c.w * 0.16, "#FDE68A", 0.5);
    ellipse(c, x, c.h * 0.28, c.w * 0.035, c.h * 0.025, "#FDE68A", 0.95);
  }
  for (let i = 0; i < 3; i++) {
    const x = c.w * (0.25 + i * 0.25);
    roundedRect(c, x - 1, 0, 2, c.h * 0.25, 1, "#0C0A09", 0.8);
  }
  glow(c, c.w * 0.5, c.h * 1.02, c.w * 0.8, "#B45309", 0.25);
}

// Logo mark (square, transparent-ish background -> solid warm).
function logoMark(c) {
  gradient(c, "#E8590C", "#B02A1B", 11);
  glow(c, c.w * 0.35, c.h * 0.3, c.w * 0.7, "#FFD8A8", 0.45);
  const cx = c.w / 2;
  const cy = c.h * 0.54;
  // flame
  for (let t = 0; t <= 1; t += 0.005) {
    const y = cy + c.h * 0.24 - t * c.h * 0.46;
    const halfW = c.w * 0.2 * Math.sin(t * Math.PI) ** 0.7 * (1 - t * 0.15);
    for (let x = Math.round(cx - halfW); x <= Math.round(cx + halfW); x++) {
      const edge = Math.abs(x - cx) / halfW;
      if (edge > 1) continue;
      const col = mix(hex("#FDE68A"), hex("#EA580C"), Math.min(1, t * 1.4 + edge * 0.3));
      setPx(c, x, Math.round(y), col);
    }
  }
  // grill bars under flame
  for (let i = -1; i <= 1; i++) {
    roundedRect(c, cx + i * c.w * 0.13 - c.w * 0.02, c.h * 0.8, c.w * 0.04, c.h * 0.06, c.w * 0.02, "#1C1917", 0.9);
  }
}

const jobs = [
  ["menu/ayam-bakar-madu.png", (c) => chickenPhoto(c, 1, "#8A4322"), 800, 600],
  ["menu/ayam-bakar-pedas-manis.png", (c) => chickenPhoto(c, 2, "#9A3412"), 800, 600],
  ["menu/ayam-bakar-taliwang.png", (c) => chickenPhoto(c, 3, "#7C2D12"), 800, 600],
  ["menu/ayam-bakar-kecap.png", (c) => chickenPhoto(c, 4, "#6B3318"), 800, 600],
  ["menu/paket-hemat-1.png", (c) => paketPhoto(c, 12), 800, 600],
  ["menu/paket-keluarga.png", (c) => paketPhoto(c, 13), 800, 600],
  ["menu/paket-berdua.png", (c) => paketPhoto(c, 14), 800, 600],
  ["menu/tahu-tempe-bakar.png", (c) => chickenPhoto(c, 15, "#B45309"), 800, 600],
  ["menu/lalapan-sambal.png", (c) => paketPhoto(c, 16), 800, 600],
  ["menu/terong-bakar.png", (c) => chickenPhoto(c, 17, "#92400E"), 800, 600],
  ["menu/es-teh-manis.png", (c) => drinkPhoto(c, 18, "#B45309"), 800, 600],
  ["menu/es-jeruk.png", (c) => drinkPhoto(c, 19, "#EA580C"), 800, 600],
  ["menu/jus-alpukat.png", (c) => drinkPhoto(c, 20, "#65A30D"), 800, 600],
  ["menu/pisang-bakar.png", (c) => dessertPhoto(c, 21), 800, 600],
  ["menu/es-krim.png", (c) => dessertPhoto(c, 22), 800, 600],
  ["hero-ayam-bakar.png", (c) => chickenPhoto(c, 23, "#8A4322"), 1200, 900],
  ["dapur-bakar.png", (c) => kitchenPhoto(c, 24), 1000, 750],
  ["tim-kitchen.png", (c) => teamPhoto(c, 25), 1000, 750],
  ["ruang-makan.png", (c) => interiorPhoto(c, 26), 1200, 800],
  ["paket-banner.png", (c) => paketPhoto(c, 27), 1200, 700],
  ["promo-nasi-box.png", (c) => paketPhoto(c, 28), 1000, 600],
  ["logo-mark.png", (c) => logoMark(c), 256, 256],
];

for (const [name, draw, w, h] of jobs) {
  const c = canvas(w, h);
  draw(c);
  const path = join(OUT, name);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, encodePng(w, h, c.px));
  console.log("wrote", name);
}
console.log(`\n${jobs.length} placeholder images -> public/images`);
