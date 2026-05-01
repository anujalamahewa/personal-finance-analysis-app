import { readFileSync } from "node:fs";
import { join } from "node:path";

const htmlPath = join(process.cwd(), "src", "app", "ashane-need-analysis.html");
const htmlTemplate = readFileSync(htmlPath, "utf8");

export function getSlideDoc(startSlide = 0): string {
  const safeSlide = Number.isFinite(startSlide) ? Math.max(0, Math.floor(startSlide)) : 0;
  return htmlTemplate.replace(
    "<script>",
    `<script>window.__START_SLIDE__=${safeSlide};</script>\n<script>`
  );
}
