// Фото-протокол: реальное фото → GPT Image 2 (KIE) → премиальная доработка без изменения места.
// Запуск: node scripts/enhance-photos.mjs [--only <name>]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dir, "../public/photos/enhanced");
mkdirSync(OUT_DIR, { recursive: true });

const env = readFileSync("C:/Users/Administrator/tgbot_secrets/.env", "utf8");
const KIE_KEY = env.match(/^KIE_API_KEY=(.+)$/m)?.[1]?.trim();
if (!KIE_KEY) throw new Error("KIE_API_KEY не найден");

const BASE_PROMPT = `Professionally enhance this real photograph for a premium lake-resort website.
Goal: warm golden-hour natural light, clear pleasant sky, rich but realistic colors, crisp details, gentle contrast — editorial travel-photography grade.
STRICT RULES (must follow exactly):
- This is a real existing place. DO NOT change, move, add or remove any buildings, landscape, mountains, trees, pool shape, furniture, equipment or objects.
- Keep the exact same composition, perspective and place — it must stay 100% recognizable to someone who has been there.
- Remove only digital noise, haze and accidental visual clutter of the photo itself.
- The result must look like the same photo re-shot by a professional photographer, not a different place.`;

const JOBS = [
  { src: "https://villaidro.com/wp-content/uploads/2023/12/villa-panorama-600.jpg", out: "villa-panorama-hero.jpg", ratio: "3:2" },
  { src: "https://villaidro.com/wp-content/uploads/2023/12/villa-pool-2-600.jpg", out: "villa-pool-2.jpg", ratio: "3:2" },
  { src: "https://villaidro.com/wp-content/uploads/2023/12/villa-pool-1-600.jpg", out: "villa-pool-1.jpg", ratio: "3:2" },
  { src: "https://villaidro.com/wp-content/uploads/2024/01/villa-idro-lake-beach-wild-600.jpg", out: "beach-wild.jpg", ratio: "3:2" },
  { src: "https://villaidro.com/wp-content/uploads/2024/01/villa-idro-lake-beach-public-600.jpg", out: "beach-public.jpg", ratio: "3:2" },
  { src: "https://villaidro.com/wp-content/uploads/2024/01/villa-idro-lake-grill-1-600.jpg", out: "grill-1.jpg", ratio: "3:2" },
  { src: "https://villaidro.com/wp-content/uploads/2024/01/villa-idro-lake-childrens-playground-1-600.jpg", out: "playground-1.jpg", ratio: "3:2" },
  { src: "https://villaidro.com/wp-content/uploads/2024/01/apartments-lake-idro-rent-apartment-a-living-room-3-600.jpg", out: "apartment-a-living.jpg", ratio: "3:2", interior: true },
  { src: "https://villaidro.com/wp-content/uploads/2024/01/homes-lake-idro-rent-home-a-living-room-4-600.jpg", out: "home-a-living.jpg", ratio: "3:2", interior: true },
  { src: "https://villaidro.com/wp-content/uploads/2024/01/villa-idro-lake-washing-machine-600.jpg", out: "washing-machine.jpg", ratio: "3:2", interior: true },
];

const INTERIOR_ADD = `\nThis is an interior photo: make it look bright, tidy and welcoming (hotel-magazine grade), but keep every piece of furniture, layout and finish exactly as it is.`;

async function createTask(job) {
  const res = await fetch("https://api.kie.ai/api/v1/jobs/createTask", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KIE_KEY}` },
    body: JSON.stringify({
      model: "gpt-image-2-image-to-image",
      input: {
        input_urls: [job.src],
        prompt: BASE_PROMPT + (job.interior ? INTERIOR_ADD : ""),
        aspect_ratio: job.ratio,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok || !data?.data?.taskId) throw new Error(`createTask failed: ${res.status} ${JSON.stringify(data)}`);
  return data.data.taskId;
}

async function poll(taskId, timeoutMs = 300000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 6000));
    const res = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${KIE_KEY}` },
    });
    const data = await res.json();
    const state = data?.data?.state;
    if (state === "success") {
      const resultJson = data.data.resultJson;
      const parsed = typeof resultJson === "string" ? JSON.parse(resultJson) : resultJson;
      const url = parsed?.resultUrls?.[0] ?? parsed?.result_urls?.[0];
      if (!url) throw new Error(`success но нет URL: ${JSON.stringify(data.data)}`);
      return url;
    }
    if (state === "fail") throw new Error(`task failed: ${JSON.stringify(data.data?.failMsg ?? data.data)}`);
    process.stdout.write(".");
  }
  throw new Error("poll timeout");
}

async function download(url, outName) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(resolve(OUT_DIR, outName), buf);
  return buf.length;
}

const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;
const queue = only ? JOBS.filter((j) => j.out.includes(only)) : JOBS;

for (const job of queue) {
  if (existsSync(resolve(OUT_DIR, job.out))) {
    console.log(`SKIP (есть): ${job.out}`);
    continue;
  }
  try {
    console.log(`→ ${job.out}`);
    const taskId = await createTask(job);
    console.log(`  taskId: ${taskId}`);
    const url = await poll(taskId);
    const size = await download(url, job.out);
    console.log(`\n  ✓ ${job.out} (${Math.round(size / 1024)} KB)`);
  } catch (e) {
    console.error(`\n  ✗ ${job.out}: ${e.message}`);
  }
}
console.log("Готово.");
