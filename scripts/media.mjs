import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const GEN =
  "C:\\Users\\Caldeira\\AppData\\Local\\Temp\\claude\\C--Users-Caldeira-OneDrive-Documentos-GitHub-portifolio3\\18f56807-818c-46dc-a59a-4766019187ba\\scratchpad\\gen";
const OUT = join(process.cwd(), "public", "media");
mkdirSync(OUT, { recursive: true });

const AVIF = { quality: 55 };
const WEBP = { quality: 80 };

const images = [
  { src: "i1-harmonizacao.png", out: "treat-harmonizacao", width: 1080 },
  { src: "i2-laser-v4.png", out: "treat-laser", width: 1080 },
  { src: "i3-corporal.png", out: "treat-corporal", width: 1080 },
  { src: "i4-skincare-v3.png", out: "treat-skincare", width: 1080 },
  { src: "i5-recepcao-v2.png", out: "space-recepcao", width: 1620 },
  { src: "i6-sala.png", out: "space-sala", width: 1080 },
  { src: "i7-detalhe.png", out: "space-detalhe", width: 1080 },
  { src: "i8-retrato-v3.png", out: "team-responsavel", width: 1080 },
  { src: "v1-hero-frame-v2.png", out: "hero-poster", width: 1920 },
];

for (const img of images) {
  const input = sharp(join(GEN, img.src)).resize({ width: img.width });
  const [a, w] = await Promise.all([
    input.clone().avif(AVIF).toFile(join(OUT, `${img.out}.avif`)),
    input.clone().webp(WEBP).toFile(join(OUT, `${img.out}.webp`)),
  ]);
  console.log(
    `${img.out}: avif ${Math.round(a.size / 1024)}KB (${a.width}x${a.height}) | webp ${Math.round(w.size / 1024)}KB`,
  );
}

await sharp(join(GEN, "v1-hero-frame-v2.png"))
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 82 })
  .toFile(join(OUT, "og-image.jpg"));
console.log("og-image.jpg: 1200x630");
