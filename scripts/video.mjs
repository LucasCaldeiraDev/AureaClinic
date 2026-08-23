import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const GEN =
  "C:\\Users\\Caldeira\\AppData\\Local\\Temp\\claude\\C--Users-Caldeira-OneDrive-Documentos-GitHub-portifolio3\\18f56807-818c-46dc-a59a-4766019187ba\\scratchpad\\gen";
const OUT = join(process.cwd(), "public", "media");
mkdirSync(OUT, { recursive: true });

const run = (args) => execFileSync(ffmpegPath, ["-y", "-hide_banner", "-loglevel", "error", ...args]);
const kb = (p) => Math.round(statSync(p).size / 1024);

// Hero: loop leve, sem áudio (orçamento ≤2.5MB — docs/performance-budget.md)
const hero = join(OUT, "hero-loop.mp4");
run(["-i", join(GEN, "v1.mp4"), "-an", "-vf", "scale=1920:1080", "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart", hero]);
console.log(`hero-loop.mp4: ${kb(hero)}KB`);

// Scrub: keyframes densos (-g 4) para seek suave nos dois sentidos (orçamento ≤4MB)
const scrub = join(OUT, "experience-scrub.mp4");
run(["-i", join(GEN, "v2.mp4"), "-an", "-vf", "scale=1920:1080", "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-g", "4", "-pix_fmt", "yuv420p", "-movflags", "+faststart", scrub]);
console.log(`experience-scrub.mp4: ${kb(scrub)}KB`);

// Frames do scrub para o stepper mobile (25/50/75/99%)
const times = ["0.1", "2.6", "5.2", "7.8"];
for (let i = 0; i < times.length; i++) {
  const png = join(GEN, `expframe-${i + 1}.png`);
  run(["-ss", times[i], "-i", scrub, "-frames:v", "1", png]);
  const base = join(OUT, `experience-frame-0${i + 1}`);
  const input = sharp(png).resize({ width: 960 });
  const [a] = await Promise.all([
    input.clone().avif({ quality: 55 }).toFile(`${base}.avif`),
    input.clone().webp({ quality: 80 }).toFile(`${base}.webp`),
  ]);
  console.log(`experience-frame-0${i + 1}: avif ${Math.round(a.size / 1024)}KB`);
}
