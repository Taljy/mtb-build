import sharp from "sharp";
import path from "path";

const SOURCE = "Inspiration";
const TARGET = "public/sheets";

const mapping = [
  { src: "1 - 17.jpeg", out: "kicker-material.jpeg",      w: 1920, q: 85 },
  { src: "1 - 13.jpeg", out: "kicker-brand.jpeg",          w: 1600, q: 80 },
  { src: "1 - 14.jpeg", out: "kicker-seitenansicht.jpeg",  w: 1600, q: 80 },
  { src: "1 - 15.jpeg", out: "kicker-3d.jpeg",             w: 1600, q: 80 },
  { src: "1 - 16.jpeg", out: "kicker-grundriss.jpeg",      w: 1600, q: 80 },
];

for (const m of mapping) {
  const meta = await sharp(path.join(SOURCE, m.src)).metadata();
  await sharp(path.join(SOURCE, m.src))
    .resize({ width: m.w, withoutEnlargement: true })
    .jpeg({ quality: m.q, mozjpeg: true })
    .toFile(path.join(TARGET, m.out));
  console.log(`✓ ${m.out}  (${meta.width}×${meta.height})`);
}
