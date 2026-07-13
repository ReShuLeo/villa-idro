// Запекаем указатель «вилла → пляж» ПРЯМО в фото (чтобы всегда совпадал при любом кропе).
// Реальное место дома (по зелёному кружку с оригинала): ~40% x, 42% y. Путь ведёт на сухой песок пляжа.
import sharp from "sharp";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dir, "../public/photos/enhanced/villa-panorama-hero.jpg");
const OUT = resolve(__dir, "../public/photos/enhanced/villa-hero-annotated.jpg");

const meta = await sharp(SRC).metadata();
const W = meta.width, H = meta.height;

// координаты (доли изображения)
const villa = [0.40 * W, 0.42 * H];
const mid = [0.345 * W, 0.565 * H];
const beach = [0.31 * W, 0.71 * H];
const r = Math.round(W * 0.011); // радиус пина

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.55"/>
    </filter>
  </defs>
  <!-- путь: тёмная подложка + золотой пунктир -->
  <path d="M${villa[0]},${villa[1]} Q${mid[0]},${mid[1]} ${beach[0]},${beach[1]}"
        fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="${W*0.009}" stroke-linecap="round"/>
  <path d="M${villa[0]},${villa[1]} Q${mid[0]},${mid[1]} ${beach[0]},${beach[1]}"
        fill="none" stroke="#ffd9ae" stroke-width="${W*0.005}" stroke-linecap="round"
        stroke-dasharray="${W*0.018} ${W*0.013}"/>
  <!-- маркер пляжа -->
  <circle cx="${beach[0]}" cy="${beach[1]}" r="${r*0.85}" fill="#1d7f5f" stroke="#fff" stroke-width="${r*0.35}" filter="url(#sh)"/>
  <!-- пин виллы -->
  <circle cx="${villa[0]}" cy="${villa[1]}" r="${r*1.7}" fill="none" stroke="#ffd9ae" stroke-width="${r*0.28}" stroke-opacity="0.9"/>
  <circle cx="${villa[0]}" cy="${villa[1]}" r="${r}" fill="#1d7f5f" stroke="#fff" stroke-width="${r*0.4}" filter="url(#sh)"/>
  <!-- 50 m -->
  <text x="${mid[0] + W*0.02}" y="${mid[1]}" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="${Math.round(W*0.032)}" fill="#ffd9ae" stroke="#0d2227" stroke-width="${W*0.004}"
        paint-order="stroke" dominant-baseline="middle">50 m</text>
</svg>`;

await sharp(SRC)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .jpeg({ quality: 88 })
  .toFile(OUT);

console.log("готово:", OUT, `${W}x${H}`);
console.log("villa:", villa.map(Math.round), "beach:", beach.map(Math.round));
