import "server-only"
import { readdir } from "node:fs/promises"
import { join } from "node:path"

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i

function fileNameFromPath(path: string): string {
  const seg = path.split("/").pop() ?? ""
  try {
    return decodeURIComponent(seg)
  } catch {
    return seg
  }
}

/** Prefer a “cover” file named like the folder (e.g. casa4.jpg in casa4/). */
function sortPortfolioPaths(paths: string[], folder: string): string[] {
  const folderBase = folder.replace(/.*[/\\]/, "").toLowerCase()
  const coverNames = new Set(
    ["jpg", "jpeg", "png", "webp"].map((ext) => `${folderBase}.${ext}`)
  )
  return [...paths].sort((a, b) => {
    const fa = fileNameFromPath(a).toLowerCase()
    const fb = fileNameFromPath(b).toLowerCase()
    const aCover = coverNames.has(fa)
    const bCover = coverNames.has(fb)
    if (aCover !== bCover) return aCover ? -1 : 1
    return fileNameFromPath(a).localeCompare(fileNameFromPath(b), undefined, {
      numeric: true,
      sensitivity: "base",
    })
  })
}

/**
 * Lists all image files in `public/images/<folder>` (non-recursive) and returns
 * public URL paths sorted for display (cover-style name first, then natural order).
 */
export async function listSortedPublicImagePaths(
  folderRelativeToImages: string
): Promise<string[]> {
  const dir = join(process.cwd(), "public", "images", folderRelativeToImages)
  let names: string[]
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    names = entries
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => e.name)
  } catch {
    return []
  }

  const normalizedFolder = folderRelativeToImages.split(/[/\\]+/).join("/")
  const paths = names.map(
    (name) =>
      `/images/${normalizedFolder}/${encodeURIComponent(name)}`
  )
  return sortPortfolioPaths(paths, folderRelativeToImages)
}
