// Зацикленный кинемаграф для hero: реальное фото → GPT Image 2 (публичный URL) → Kling image-to-video.
// Камера статична, движется только вода/облака/листва — для бесшовной петли.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dir, "../public/videos");
mkdirSync(OUT, { recursive: true });
const KIE = readFileSync("C:/Users/Administrator/tgbot_secrets/.env", "utf8").match(/^KIE_API_KEY=(.+)$/m)[1].trim();
const H = { "Content-Type": "application/json", Authorization: `Bearer ${KIE}` };

async function create(body) {
  const r = await fetch("https://api.kie.ai/api/v1/jobs/createTask", { method: "POST", headers: H, body: JSON.stringify(body) });
  const d = await r.json();
  if (!r.ok || !d?.data?.taskId) throw new Error(`create ${r.status} ${JSON.stringify(d).slice(0, 200)}`);
  return d.data.taskId;
}
async function poll(taskId, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 10000));
    const r = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, { headers: H });
    const d = await r.json();
    const st = d?.data?.state;
    if (st === "success") {
      const p = typeof d.data.resultJson === "string" ? JSON.parse(d.data.resultJson) : d.data.resultJson;
      const url = p?.resultUrls?.[0] ?? p?.result_urls?.[0];
      if (!url) throw new Error("no url " + JSON.stringify(d.data).slice(0, 200));
      return url;
    }
    if (st === "fail") throw new Error("fail " + JSON.stringify(d.data?.failMsg ?? "").slice(0, 200));
    process.stdout.write(".");
  }
  throw new Error("timeout");
}

const PANO = "https://villaidro.com/wp-content/uploads/2023/12/villa-panorama-600.jpg";

// 1) улучшаем панораму и получаем ПУБЛИЧНЫЙ url результата
console.log("1/2 GPT Image 2 → публичный кадр...");
const imgTask = await create({
  model: "gpt-image-2-image-to-image",
  input: {
    input_urls: [PANO],
    prompt:
      "Re-shoot this real aerial photo of a lakeside village on Lake Idro as a world-class travel photograph: bright warm golden daylight, clear sky, turquoise clean water, lush greenery, crisp and pristine. Keep architecture, landscape and composition exactly the same. Wide cinematic landscape.",
    aspect_ratio: "3:2",
  },
});
const enhancedUrl = await poll(imgTask, 300000);
console.log("\n  кадр:", enhancedUrl);

// 2) кинемаграф Kling из этого кадра
console.log("2/2 Kling image-to-video (кинемаграф)...");
const vidTask = await create({
  model: "kling-2.6/video",
  input: {
    prompt:
      "Cinemagraph of this exact lakeside scene. Only these move, very subtly and slowly: the turquoise lake water gently shimmers and ripples, thin high clouds drift slowly, tree canopies sway softly in a light breeze. The camera is completely LOCKED and static — no zoom, no pan, no push-in. Everything else perfectly still. Photorealistic, warm golden daylight, calm seamless ambient motion for a looping background.",
    image_urls: [enhancedUrl],
    duration: "5",
    mode: "pro",
    multi_shots: false,
    sound: false,
  },
});
const vidUrl = await poll(vidTask, 1200000);
console.log("\n  видео:", vidUrl);

const buf = Buffer.from(await (await fetch(vidUrl)).arrayBuffer());
writeFileSync(resolve(OUT, "hero.mp4"), buf);
console.log(`ГОТОВО: public/videos/hero.mp4 (${Math.round(buf.length / 1024)} KB)`);
