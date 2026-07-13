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

const vx = villa[0], vy = villa[1];
const rx = W * 0.05, ry = H * 0.05;       // обводка здания
const pinTipY = vy - ry;                   // булавка касается верха обводки
const pinR = W * 0.019;                     // радиус головки булавки
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="sh" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity="0.55"/>
    </filter>
  </defs>
  <!-- путь: тёмная подложка + золотой пунктир, из-под обводки к пляжу -->
  <path d="M${vx},${vy + ry} Q${mid[0]},${mid[1]} ${beach[0]},${beach[1]}"
        fill="none" stroke="#000" stroke-opacity="0.4" stroke-width="${W*0.0095}" stroke-linecap="round"/>
  <path d="M${vx},${vy + ry} Q${mid[0]},${mid[1]} ${beach[0]},${beach[1]}"
        fill="none" stroke="#ffd9ae" stroke-width="${W*0.0055}" stroke-linecap="round"
        stroke-dasharray="${W*0.02} ${W*0.014}"/>
  <!-- маркер пляжа -->
  <circle cx="${beach[0]}" cy="${beach[1]}" r="${W*0.014}" fill="#1d7f5f" stroke="#fff" stroke-width="${W*0.006}" filter="url(#sh)"/>
  <!-- обводка здания (кружок как на карте) -->
  <ellipse cx="${vx}" cy="${vy}" rx="${rx*1.18}" ry="${ry*1.18}" fill="#ffd9ae" fill-opacity="0.14"/>
  <ellipse cx="${vx}" cy="${vy}" rx="${rx}" ry="${ry}" fill="none" stroke="#ffd9ae" stroke-width="${W*0.005}" filter="url(#sh)"/>
  <!-- булавка (map pin) над зданием, остриём вниз к зданию -->
  <g transform="translate(${vx}, ${pinTipY})" filter="url(#sh)">
    <path d="M0,0 C ${-pinR*0.5},${-pinR*1.7} ${-pinR},${-pinR*2.2} ${-pinR},${-pinR*3.4}
             A ${pinR},${pinR} 0 1 1 ${pinR},${-pinR*3.4}
             C ${pinR},${-pinR*2.2} ${pinR*0.5},${-pinR*1.7} 0,0 Z"
          fill="#1d7f5f" stroke="#fff" stroke-width="${W*0.004}"/>
    <circle cx="0" cy="${-pinR*3.4}" r="${pinR*0.42}" fill="#fff"/>
  </g>
  <!-- 50 m -->
  <text x="${mid[0] + W*0.022}" y="${mid[1]}" font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="${Math.round(W*0.033)}" fill="#ffd9ae" stroke="#0d2227" stroke-width="${W*0.0045}"
        paint-order="stroke" dominant-baseline="middle">50 m</text>
</svg>`;

await sharp(SRC)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .jpeg({ quality: 88 })
  .toFile(OUT);

console.log("готово:", OUT, `${W}x${H}`);
console.log("villa:", villa.map(Math.round), "beach:", beach.map(Math.round));
