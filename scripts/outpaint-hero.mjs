// Расширяем аэрофото ШИРЕ (16:9) через GPT Image 2 (KIE), чтобы hero заполнял всю ширину без полос.
// Вход — задеплоенная чистая панорама (без аннотации). Центр (деревня, пляж, озеро) сохраняем.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync("C:/Users/Administrator/tgbot_secrets/.env", "utf8");
const KIE = env.match(/^KIE_API_KEY=(.+)$/m)?.[1]?.trim();
if (!KIE) throw new Error("KIE_API_KEY не найден");

const INPUT = "https://reshuleo.github.io/villa-idro/photos/enhanced/villa-panorama-hero.jpg";
const OUT = resolve(__dir, "../public/photos/enhanced/villa-panorama-wide.jpg");
const prompt = `Extend this REAL aerial photograph of a forested lakeside village on Lake Idro to be WIDER (cinematic 16:9). Add more of the SAME continuous scene on the LEFT and RIGHT: more forested green mountain slope with scattered terracotta-roof houses on the left, more turquoise lake water and pebbly shoreline on the right — a seamless photorealistic continuation of the exact same landscape.
HARD RULES:
- KEEP the central part (the village, the beach, the tree-covered point, the lake, the mountain) EXACTLY as in the source — same perspective, same buildings, same position, 100% recognizable. Only ADD scenery to the sides.
- Bright clean midday daylight, natural true colors, sparkling clean water, magazine travel-photography quality.
- NO text, NO watermarks, NO markings, NO people added.`;

async function createTask() {
  const res = await fetch("https://api.kie.ai/api/v1/jobs/createTask", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KIE}` },
    body: JSON.stringify({ model: "gpt-image-2-image-to-image", input: { input_urls: [INPUT], prompt, aspect_ratio: "16:9" } }),
  });
  const d = await res.json();
  if (!res.ok || !d?.data?.taskId) throw new Error(`create ${res.status} ${JSON.stringify(d).slice(0,200)}`);
  return d.data.taskId;
}
async function poll(taskId) {
  const start = Date.now();
  while (Date.now() - start < 540000) {
    await new Promise(r => setTimeout(r, 6000));
    const res = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, { headers: { Authorization: `Bearer ${KIE}` } });
    const d = await res.json();
    const st = d?.data?.state;
    if (st === "success") {
      const rj = d.data.resultJson; const p = typeof rj === "string" ? JSON.parse(rj) : rj;
      const url = p?.resultUrls?.[0] ?? p?.result_urls?.[0];
      if (!url) throw new Error("no url");
      return url;
    }
    if (st === "fail") throw new Error("fail " + JSON.stringify(d.data?.failMsg ?? "").slice(0,160));
    process.stdout.write(".");
  }
  throw new Error("timeout");
}
console.log("создаю задачу…");
const id = await createTask();
console.log("taskId", id, "— жду результат…");
const url = await poll(id);
console.log("\nготово, качаю:", url.slice(0,80));
const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
writeFileSync(OUT, buf);
console.log("сохранено:", OUT, Math.round(buf.length/1024)+"KB");
