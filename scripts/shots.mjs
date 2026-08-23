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
if (!edge) throw new Error("Edge não encontrado");

const URL = "http://localhost:5173";
const errors = [];

const browser = await puppeteer.launch({ executablePath: edge, headless: "new" });

async function capture(page, name) {
  await page.screenshot({ path: join(OUT, name + ".png") });
  console.log("shot:", name);
}

async function jumpTo(page, y, settle = 900) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
  await new Promise((r) => setTimeout(r, settle));
}

async function sectionTop(page, sel) {
  return page.evaluate((s) => {
    const el = document.querySelector(s);
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  }, sel);
}

// ---------- Desktop ----------
{
  const page = await browser.newPage();
  page.on("console", (m) => m.type() === "error" && errors.push("[desktop] " + m.text()));
  page.on("pageerror", (e) => errors.push("[desktop pageerror] " + e.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1600));
  await capture(page, "d01-hero");

  const vh = 900;
  const manifesto = await sectionTop(page, "main > section:nth-of-type(2)");
  await jumpTo(page, manifesto - vh * 0.35);
  await capture(page, "d02-manifesto");

  const treat = await sectionTop(page, "#tratamentos");
  await jumpTo(page, treat - 80);
  await capture(page, "d03-tratamentos-header");
  await jumpTo(page, treat + vh * 0.9);
  await capture(page, "d04-tratamentos-row");

  const exp = await sectionTop(page, "#experiencia");
  await jumpTo(page, exp + 10, 1200);
  await capture(page, "d05-experiencia-inicio");
  await jumpTo(page, exp + vh * 1.3, 1200);
  await capture(page, "d06-experiencia-meio");
  await jumpTo(page, exp + vh * 2.5, 1200);
  await capture(page, "d07-experiencia-fim");

  const res = await sectionTop(page, "#resultados");
  await jumpTo(page, res - 80);
  await capture(page, "d08-resultados");
  const ba = await page.evaluate(() => {
    const el = document.querySelector("#resultados input[type=range]");
    if (!el) return 0;
    return el.getBoundingClientRect().top + window.scrollY;
  });
  await jumpTo(page, ba - 300);
  await capture(page, "d09-antes-depois");

  const team = await sectionTop(page, "#equipe");
  await jumpTo(page, team - 60);
  await capture(page, "d10-equipe");

  const space = await sectionTop(page, "#espaco");
  await jumpTo(page, space - 60);
  await capture(page, "d11-espaco");

  const book = await sectionTop(page, "#agendar");
  await jumpTo(page, book - 40);
  await capture(page, "d12-agendar");

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 800));
  await capture(page, "d13-footer");
  await page.close();
}

// ---------- Mobile ----------
{
  const page = await browser.newPage();
  page.on("console", (m) => m.type() === "error" && errors.push("[mobile] " + m.text()));
  page.on("pageerror", (e) => errors.push("[mobile pageerror] " + e.message));
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1600));
  await capture(page, "m01-hero");

  const treat = await sectionTop(page, "#tratamentos");
  await jumpTo(page, treat - 70);
  await capture(page, "m02-tratamentos");

  const exp = await sectionTop(page, "#experiencia");
  await jumpTo(page, exp - 40);
  await capture(page, "m03-experiencia");

  const res = await sectionTop(page, "#resultados");
  await jumpTo(page, res - 40);
  await capture(page, "m04-resultados");

  const book = await sectionTop(page, "#agendar");
  await jumpTo(page, book - 30);
  await capture(page, "m05-agendar");

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 700));
  await capture(page, "m06-footer");

  // Checagem de overflow horizontal
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  console.log("mobile-horizontal-overflow-px:", overflow);
  await page.close();
}

await browser.close();
console.log(errors.length ? "CONSOLE ERRORS:\n" + errors.join("\n") : "no console errors");
