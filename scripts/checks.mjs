import puppeteer from "puppeteer-core";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "shots");
mkdirSync(OUT, { recursive: true });
const EDGE_PATHS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const edge = EDGE_PATHS.find((p) => existsSync(p));
const URL = "http://localhost:5173";

const browser = await puppeteer.launch({ executablePath: edge, headless: "new" });

// 1) prefers-reduced-motion: seção Experiência deve virar stepper estático
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(URL, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));
  const pinned = await page.evaluate(() => {
    const exp = document.getElementById("experiencia");
    return { hasPinSpacer: !!document.querySelector(".pin-spacer"), bg: getComputedStyle(exp).backgroundColor };
  });
  console.log("PRM check — pin-spacer presente (deve ser false):", pinned.hasPinSpacer, "| bg da seção:", pinned.bg);
  const exp = await page.evaluate(() => {
    const el = document.getElementById("experiencia");
    return el.getBoundingClientRect().top + window.scrollY;
  });
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), exp - 40);
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: join(OUT, "prm-experiencia.png") });
  console.log("shot: prm-experiencia");
  await page.close();
}

// 2) Interações: FAQ abre; slider antes/depois responde
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));

  const book = await page.evaluate(() => {
    const el = document.getElementById("agendar");
    return el.getBoundingClientRect().top + window.scrollY;
  });
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), book - 40);
  await new Promise((r) => setTimeout(r, 600));
  await page.click("#agendar details:first-of-type summary");
  await new Promise((r) => setTimeout(r, 400));
  const open = await page.evaluate(() => document.querySelector("#agendar details").open);
  console.log("FAQ abre ao clicar (deve ser true):", open);
  await page.screenshot({ path: join(OUT, "check-faq-aberto.png") });

  const ba = await page.evaluate(() => {
    const el = document.querySelector("#resultados input[type=range]");
    el.scrollIntoView({ block: "center", behavior: "instant" });
    return !!el;
  });
  await new Promise((r) => setTimeout(r, 700));
  await page.evaluate(() => {
    const input = document.querySelector("#resultados input[type=range]");
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    setter.call(input, 22);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await new Promise((r) => setTimeout(r, 400));
  const clip = await page.evaluate(() => {
    const layers = document.querySelectorAll("#resultados .scene");
    const wrap = layers[1]?.parentElement;
    return wrap?.style.clipPath || "sem clip";
  });
  console.log("Slider antes/depois em 22% — clipPath:", clip, "| range encontrado:", ba);
  await page.screenshot({ path: join(OUT, "check-antes-depois.png") });
  await page.close();
}

await browser.close();
console.log("checks concluídos");
