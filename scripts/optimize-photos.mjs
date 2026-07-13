// ЗАКОН О ВЕСЕ ФОТО: каждое фото на сайте — web-оптимизировано (mozjpeg, прогрессив, кап по стороне).
// GPT Image 2 отдаёт near-lossless (2–4 МБ) — для веба это яд. Ужимаем ДО деплоя. Идемпотентно
// (повторный прогон уже лёгкие файлы почти не трогает). Запуск: node scripts/optimize-photos.mjs
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const DIR = resolve(__dir, "../public/photos/enhanced");

const MAX_SIDE = 1600;   // хватает для полноэкранного лайтбокса/hero; карточки/превью и подавно
const QUALITY = 74;      // mozjpeg q74 progressive — визуально без потерь для фото, но в ~10× легче

const files = readdirSync(DIR).filter((f) => /\.jpe?g$/i.test(f));
let before = 0, after = 0, changed = 0;

for (const f of files) {
  const p = resolve(DIR, f);
  const sizeBefore = statSync(p).size;
  before += sizeBefore;
  try {
    const buf = await sharp(p)
      .rotate() // учесть EXIF-ориентацию до сброса метаданных
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
    // пишем только если реально легче (идемпотентность — не раздуваем уже сжатые)
    if (buf.length < sizeBefore * 0.97) {
      writeFileSync(p, buf);
      after += buf.length;
      changed++;
      console.log(`✓ ${f}  ${(sizeBefore / 1024 / 1024).toFixed(2)}MB → ${(buf.length / 1024).toFixed(0)}KB`);
    } else {
      after += sizeBefore;
      console.log(`· ${f}  уже лёгкое (${(sizeBefore / 1024).toFixed(0)}KB)`);
    }
  } catch (e) {
    after += sizeBefore;
    console.log(`✗ ${f} — ${e.message}`);
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(`\nГОТОВО. Сжато файлов: ${changed}/${files.length}`);
console.log(`Вес: ${mb(before)}MB → ${mb(after)}MB  (−${(100 - (after / before) * 100).toFixed(0)}%)`);
