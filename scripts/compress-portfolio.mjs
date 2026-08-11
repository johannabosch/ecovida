import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const imagesRoot = path.join(process.cwd(), "public", "images")
const IMAGE_RE = /\.(jpe?g|png|webp)$/i
const SKIP_ROOT = new Set([
  "hero1.jpg",
  "hero2.jpg",
  "hero3.jpg",
  "hero4.jpg",
  "hero5.jpg",
  "hero6.jpeg",
  "hero7.jpeg",
])

/** Keep transparency for brand marks. */
function keepPng(filePath) {
  const base = path.basename(filePath).toLowerCase()
  return base.includes("logo")
}

function isPlansPath(filePath) {
  const rel = path.relative(imagesRoot, filePath).split(path.sep)
  return rel[0] === "plans"
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (entry.isFile() && IMAGE_RE.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function compressFile(inputPath) {
  const relFromImages = path.relative(imagesRoot, inputPath)
  const inRoot = !relFromImages.includes(path.sep)
  if (inRoot && SKIP_ROOT.has(path.basename(inputPath).toLowerCase())) {
    return { skipped: true, reason: "hero" }
  }

  const before = (await fs.stat(inputPath)).size
  const ext = path.extname(inputPath).toLowerCase()
  const plans = isPlansPath(inputPath)
  const maxSide = plans ? 2200 : 1800
  const quality = plans ? 84 : 80

  if (keepPng(inputPath)) {
    const tmp = `${inputPath}.tmp`
    await sharp(inputPath)
      .rotate()
      .resize(maxSide, maxSide, { fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(tmp)
    await fs.rename(tmp, inputPath)
    const after = (await fs.stat(inputPath)).size
    return { before, after, out: relFromImages }
  }

  const base = path.basename(inputPath, ext)
  const dir = path.dirname(inputPath)
  const outPath = path.join(dir, `${base}.jpg`)
  const tmp = `${outPath}.tmp`

  await sharp(inputPath)
    .rotate()
    .resize(maxSide, maxSide, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(tmp)

  await fs.rename(tmp, outPath)

  if (outPath !== inputPath) {
    await fs.unlink(inputPath).catch(() => {})
  }

  const after = (await fs.stat(outPath)).size
  return {
    before,
    after,
    out: path.relative(imagesRoot, outPath),
    converted: ext !== ".jpg" && ext !== ".jpeg",
  }
}

async function compressLogosInPublic() {
  const publicRoot = path.join(process.cwd(), "public")
  const targets = ["logo-full.png", "logo-header.png", "logo.png"]
  for (const name of targets) {
    const file = path.join(publicRoot, name)
    try {
      await fs.access(file)
    } catch {
      continue
    }
    const before = (await fs.stat(file)).size
    const meta = await sharp(file).metadata()
    const maxSide = Math.max(meta.width ?? 0, meta.height ?? 0)
    const tmp = `${file}.tmp`
    let pipeline = sharp(file)
    if (maxSide > 800) {
      pipeline = pipeline.resize(800, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
    }
    await pipeline
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(tmp)
    await fs.rename(tmp, file)
    const after = (await fs.stat(file)).size
    console.log(
      `logo ${name}: ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB`
    )
  }
}

const files = await walk(imagesRoot)
let totalBefore = 0
let totalAfter = 0
let count = 0

console.log(`Compressing ${files.length} portfolio images…\n`)

for (const file of files) {
  const result = await compressFile(file)
  if (result.skipped) continue
  totalBefore += result.before
  totalAfter += result.after
  count += 1
  const saved = Math.max(0, result.before - result.after)
  const pct = result.before > 0 ? Math.round((saved / result.before) * 100) : 0
  console.log(
    `${result.out}: ${Math.round(result.before / 1024)} KB → ${Math.round(result.after / 1024)} KB (−${pct}%)${result.converted ? " [png→jpg]" : ""}`
  )
}

console.log("\n--- Logos ---")
await compressLogosInPublic()

const publicTotal = (
  await fs.readdir(path.join(process.cwd(), "public"), { recursive: true })
).length

const sumDir = async (dir) => {
  let sum = 0
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) sum += await sumDir(full)
    else if (e.isFile()) sum += (await fs.stat(full)).size
  }
  return sum
}

const imagesMb = (await sumDir(path.join(process.cwd(), "public"))) / (1024 * 1024)

console.log(
  `\nDone: ${count} files, ${Math.round(totalBefore / (1024 * 1024))} MB → ${Math.round(totalAfter / (1024 * 1024))} MB saved in portfolio`
)
console.log(`Total public/: ${imagesMb.toFixed(1)} MB`)
