import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const imagesDir = path.join(process.cwd(), "public", "images")

const heroes = [
  { file: "hero1.jpg", out: "hero1.jpg" },
  { file: "hero2.jpg", out: "hero2.jpg" },
  { file: "hero3.jpg", out: "hero3.jpg" },
  { file: "hero4.png", out: "hero4.jpg" },
  { file: "hero5.png", out: "hero5.jpg" },
  { file: "hero6.jpeg", out: "hero6.jpeg" },
  { file: "hero7.jpeg", out: "hero7.jpeg" },
]

for (const { file, out } of heroes) {
  const input = path.join(imagesDir, file)
  const output = path.join(imagesDir, out)
  const tmp = `${output}.tmp`

  await sharp(input)
    .rotate()
    .resize(1920, 1080, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(tmp)

  await fs.rename(tmp, output)

  if (file !== out) {
    await fs.unlink(input).catch(() => {})
  }

  const { size } = await fs.stat(output)
  console.log(`${out}: ${Math.round(size / 1024)} KB`)
}
