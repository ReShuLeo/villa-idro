// ЗАКОН ЯДРА: все фото сайта — перегенерация GPT Image 2 из реального референса,
// единый стиль, чистый дневной свет, суть не менять, каждый кадр уникален.
// Запуск: node scripts/regen-all.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dir, "../public/photos/enhanced");
mkdirSync(OUT, { recursive: true });

const env = readFileSync("C:/Users/Administrator/tgbot_secrets/.env", "utf8");
const KIE = env.match(/^KIE_API_KEY=(.+)$/m)?.[1]?.trim();
if (!KIE) throw new Error("KIE_API_KEY не найден");

const U = "https://villaidro.com/wp-content/uploads";
const apSrc = (l, r) => `${U}/2024/01/apartments-lake-idro-rent-apartment-${l}-${r}-600.jpg`;
const hmSrc = (l, r) => `${U}/2024/01/homes-lake-idro-rent-home-${l}-${r}-600.jpg`;
const vSrc = (name, y = "2024/01") => `${U}/${y}/${name}-600.jpg`;

// per-unit daytime light variation → уникальность, но всегда день
const LIGHTS = [
  "clean bright midday sunlight, airy",
  "soft warm morning light",
  "gentle late-afternoon golden light",
  "bright clear daylight, fresh and crisp",
];

const BASE = `Re-shoot this REAL photo as a world-class professional travel photograph for a premium lakeside villa website.
HARD RULES — obey exactly:
- Same real place. DO NOT change or move architecture, walls, windows, furniture, pool shape, landscape, mountains or objects. Keep composition & perspective. Must stay 100% recognizable.
- KEEP IT DAYTIME. Never turn the scene into night or add colored/red artificial lighting.
- Remove noise, blur, haze, watermarks, on-photo markings/text, clutter and dated look.
- Deliver: crisp focus, natural true colors, balanced contrast, tasteful warm Mediterranean editorial grade, magazine quality.
- Result = the same scene re-photographed by a top professional, not a different place.`;
const INT = `\nINTERIOR: make the room bright, immaculately tidy and inviting with soft natural window light; neatly styled beds/linens; keep every furniture piece, layout and finish exactly as in the source.`;
const EXT = `\nEXTERIOR: clear blue sky, lush greenery, sparkling clean water, pristine surfaces.`;

// stayId → referenceLetter (kind). B/C/D/E берут реф A/F/G/H, но со своей вариацией света и уникальным файлом.
const stays = [
  { id: "ap-a", k: "ap", ref: "a", rooms: ["pool-1", "living-room-3", "dining-area-4", "kitchen-5", "living-room-6", "bedroom-7", "bathroom-8", "shower-9"] },
  { id: "ap-b", k: "ap", ref: "f", rooms: ["pool-1", "dining-area-3", "kitchen-4", "living-room-6", "bedroom-7", "bathroom-8"] },
  { id: "ap-c", k: "ap", ref: "g", rooms: ["pool-1", "living-room-3", "kitchen-4", "living-room-6", "bedroom-7", "bathroom-8"] },
  { id: "ap-d", k: "ap", ref: "h", rooms: ["pool-1", "living-room-3", "dining-area-4", "kitchen-5", "bedroom-7", "bathroom-8"] },
  { id: "ap-e", k: "ap", ref: "a", rooms: ["pool-1", "dining-area-4", "kitchen-5", "living-room-6", "bedroom-7", "shower-9"] },
  { id: "ap-f", k: "ap", ref: "f", rooms: ["pool-1", "corridor-2", "dining-area-3", "kitchen-4", "living-room-6", "bedroom-7", "bathroom-8", "shower-9"] },
  { id: "ap-g", k: "ap", ref: "g", rooms: ["pool-1", "corridor-2", "living-room-3", "kitchen-4", "living-room-6", "bedroom-7", "bathroom-8", "shower-9"] },
  { id: "ap-h", k: "ap", ref: "h", rooms: ["pool-1", "corridor-2", "living-room-3", "dining-area-4", "kitchen-5", "bedroom-7", "bathroom-8", "shower-9"] },
  { id: "hm-a", k: "hm", ref: "a", rooms: ["pool-1", "dining-area-2", "kitchen-3", "living-room-4", "bedroom-1-6", "bathroom-7", "bedroom-2-9", "bedroom-3-10"] },
  { id: "hm-b", k: "hm", ref: "b", rooms: ["pool-1", "dining-area-2", "kitchen-3", "living-room-4", "bedroom-6", "bedroom-1-7", "bedroom-2-9", "bedroom-3-10"] },
  { id: "hm-c", k: "hm", ref: "c", rooms: ["pool-1", "dining-area-2", "kitchen-3", "living-room-4", "bedroom-1-7", "bathroom-1-6", "bedroom-2-9", "bedroom-3-10"] },
  { id: "hm-d", k: "hm", ref: "d", rooms: ["pool-1", "dining-area-2", "kitchen-3", "living-room-4", "bedroom-1-6", "bedroom-1-7", "bedroom-2-9", "bedroom-3-10"] },
];

const jobs = [];
stays.forEach((s, si) => {
  const light = LIGHTS[si % LIGHTS.length];
  s.rooms.forEach((r, ri) => {
    const src = s.k === "ap" ? apSrc(s.ref, r) : hmSrc(s.ref, r);
    const interior = !r.includes("pool");
    jobs.push({
      out: `enh-${s.id}-${ri}.jpg`,
      src,
      ratio: "4:3",
      prompt: `${BASE}${interior ? INT : EXT}\nLighting mood: ${light}.`,
    });
  });
});

// villa amenities & lake blocks (то, что реально показано на сайте)
const amen = [
  ["villa-pool-1", vSrc("villa-pool-1", "2023/12"), EXT],
  ["villa-pool-3", vSrc("villa-pool-3", "2023/12"), EXT],
  ["villa-pool-4", vSrc("villa-pool-4", "2023/12"), EXT],
  ["grill-2", vSrc("villa-idro-lake-grill-2"), EXT],
  ["grill-3", vSrc("villa-idro-lake-grill-3"), EXT],
  ["playground-2", vSrc("villa-idro-lake-childrens-playground-2"), EXT],
  ["parking", `${U}/2024/01/villa-idro-lake-parking.jpg`, EXT],
  ["storage", vSrc("villa-idro-lake-place-for-boats-mattresses-bicycles"), INT],
  ["pingpong", vSrc("villa-idro-lake-ping-pong-table"), EXT],
  ["beach-volleyball", vSrc("villa-idro-lake-beach-volleyball"), EXT],
  ["beach-bar", vSrc("villa-idro-lake-beach-bar"), EXT],
  ["park-alpine", vSrc("villa-idro-lake-natural-park-alpine-trails-1"), EXT],
  ["park-river", vSrc("villa-idro-lake-natural-park-mineral-water-river-2"), EXT],
  ["park-tunnel", vSrc("villa-idro-lake-natural-park-defense-tunnel-5"), EXT],
  ["sport-windsurf", vSrc("villa-idro-lake-sport-windsurfing-yachting-4"), EXT],
  ["sport-kite", vSrc("villa-idro-lake-sport-kiting-5"), EXT],
  ["sport-climb", vSrc("villa-idro-lake-sport-climbing-3"), EXT],
];
amen.forEach(([name, src, mode]) =>
  jobs.push({ out: `enh-${name}.jpg`, src, ratio: "3:2", prompt: `${BASE}${mode}\nLighting mood: ${LIGHTS[0]}.` })
);

async function createTask(job) {
  const res = await fetch("https://api.kie.ai/api/v1/jobs/createTask", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KIE}` },
    body: JSON.stringify({
      model: "gpt-image-2-image-to-image",
      input: { input_urls: [job.src], prompt: job.prompt, aspect_ratio: job.ratio },
    }),
  });
  const data = await res.json();
  if (!res.ok || !data?.data?.taskId) throw new Error(`create ${res.status} ${JSON.stringify(data).slice(0, 160)}`);
  return data.data.taskId;
}
async function poll(taskId, timeoutMs = 300000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 6000));
    const res = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${KIE}` },
    });
    const data = await res.json();
    const st = data?.data?.state;
    if (st === "success") {
      const rj = data.data.resultJson;
      const p = typeof rj === "string" ? JSON.parse(rj) : rj;
      const url = p?.resultUrls?.[0] ?? p?.result_urls?.[0];
      if (!url) throw new Error("no url");
      return url;
    }
    if (st === "fail") throw new Error("fail " + JSON.stringify(data.data?.failMsg ?? "").slice(0, 120));
  }
  throw new Error("timeout");
}
async function run(job) {
  if (existsSync(resolve(OUT, job.out))) return "skip";
  const taskId = await createTask(job);
  const url = await poll(taskId);
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(resolve(OUT, job.out), buf);
  return Math.round(buf.length / 1024) + "KB";
}

const CONC = 3;
let done = 0,
  fail = 0,
  idx = 0;
const total = jobs.length;
console.log(`Всего задач: ${total}`);
async function worker() {
  while (idx < jobs.length) {
    const job = jobs[idx++];
    try {
      const r = await run(job);
      done++;
      console.log(`[${done + fail}/${total}] ✓ ${job.out} ${r}`);
    } catch (e) {
      fail++;
      console.log(`[${done + fail}/${total}] ✗ ${job.out} — ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: CONC }, worker));
console.log(`ГОТОВО. Успех: ${done}, ошибок: ${fail}`);
