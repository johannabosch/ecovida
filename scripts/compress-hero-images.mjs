/**
 * One-off helper: compress hero + logo assets in public/.
 * Run: node scripts/compress-hero-images.mjs
 */
import { readdir, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const publicDir = path.join(process.cwd(), "public")
const imagesDir = path.join(publicDir, "images")

const targets = [
  path.join(imagesDir, "hero1.jpg"),
  path.join(imagesDir, "hero2.jpg"),
  path.join(imagesDir, "hero3.jpg"),
  path.join(imagesDir, "hero4.png"),
  path.join(imagesDir, "hero5.png"),
  path.join(imagesDir, "hero6.jpeg"),
  path.join(imagesDir, "hero7.jpeg"),
  path.join(publicDir, "logo.png"),
  path.join(publicDir, "logo-header.png"),
]

async function compressFile(filePath) {
  const before = (await stat(filePath)).size
  const ext = path.extname(filePath).toLowerCase()
  const tempPath = `${filePath}.tmp`

  let pipeline = sharp(filePath).rotate().resize({
    width: 1920,
    height: 1920,
    fit: "inside",
    withoutEnlargement: true,
  })

  if (ext === ".png") {
    pipeline = pipeline.png({ quality: 80, compressionLevel: 9, palette: true })
  } else {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true })
  }

  await pipeline.toFile(tempPath)
  const { rename, unlink } = await import("node:fs/promises")
  await unlink(filePath)
  await rename(tempPath, filePath)

  const after = (await stat(filePath)).size
  const rel = path.relative(process.cwd(), filePath)
  console.log(`${rel}: ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB`)
}

for (const filePath of targets) {
  try {
    await compressFile(filePath)
  } catch (error) {
    console.warn(`Skipped ${filePath}:`, error.message)
  }
}
