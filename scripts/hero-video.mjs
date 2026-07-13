// Зацикленный кинемаграф для hero: реальное фото озера → Kling image-to-video.
// Камера статична, движется только вода/облака/листва — для бесшовной петли.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dir, "../public/videos");
mkdirSync(OUT, { recursive: true });
const KIE = readFileSync("C:/Users/Administrator/tgbot_secrets/.env", "utf8").match(/^KIE_API_KEY=(.+)$/m)[1].trim();
const H = { "Content-Type": "application/json", Authorization: `Bearer ${KIE}` };

// улучшенный кадр героя (raw с GitHub) — уже в репозитории; фолбэк на оригинал
const SRC =
  "https://raw.githubusercontent.com/ReShuLeo/villa-idro/main/public/photos/enhanced/villa-panorama-hero.jpg";
const FALLBACK = "https://villaidro.com/wp-content/uploads/2023/12/villa-panorama-600.jpg";

async function reachable(url) {
  try {
    const r = await fetch(url, { method: "HEAD" });
    return r.ok;
  } catch {
    return false;
  }
}
async function create(body) {
  const r = await fetch("https://api.kie.ai/api/v1/jobs/createTask", { method: "POST", headers: H, body: JSON.stringify(body) });
  const d = await r.json();
  if (!r.ok || !d?.data?.taskId) throw new Error(`create ${r.status} ${JSON.stringify(d).slice(0, 220)}`);
  return d.data.taskId;
}
async function poll(taskId, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 12000));
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

const image = (await reachable(SRC)) ? SRC : FALLBACK;
console.log("источник кадра:", image === SRC ? "enhanced (github raw)" : "original");

const prompt =
  "Cinemagraph of this exact lakeside scene. Only these move, very subtly and slowly: the turquoise lake water gently shimmers and ripples, thin high clouds drift slowly, tree canopies sway softly in a light breeze. The camera is completely LOCKED and static — no zoom, no pan, no push-in. Everything else perfectly still. Photorealistic, warm golden daylight, calm seamless ambient motion for a looping background.";

let vidUrl;
for (const model of ["kling-2.6/video", "kling-2.1/video", "kling-3.0/video"]) {
  try {
    console.log(`Kling ${model} ...`);
    const task = await create({
      model,
      input: { prompt, image_urls: [image], duration: "5", mode: "std", multi_shots: false, sound: false },
    });
    vidUrl = await poll(task, 1200000);
    console.log("\n  видео:", vidUrl);
    break;
  } catch (e) {
    console.log(`\n  ${model} не вышло: ${e.message}`);
  }
}
if (!vidUrl) {
  console.log("ВИДЕО НЕ СОЗДАНО — сайт использует WebGL-hero (это ок).");
  process.exit(1);
}
const buf = Buffer.from(await (await fetch(vidUrl)).arrayBuffer());
writeFileSync(resolve(OUT, "hero.mp4"), buf);
console.log(`ГОТОВО: public/videos/hero.mp4 (${Math.round(buf.length / 1024)} KB)`);
