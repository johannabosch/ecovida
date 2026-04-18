import "server-only"

import { listSortedPublicImagePaths } from "@/lib/portfolio-images"

export type PlanDesignCard = {
  /** Folder id (legacy / CMS); not used for image paths when using fixed plan images */
  id: string
  title: string
  description: string
  images: string[]
  /** Plan drawings read best as letterboxed, centered renders use cover */
  imageObjectClassName: string
}

const PLAN_CARD_IMAGES = [
  "/images/plans/plan1.jpg",
  "/images/plans/plan2.jpg",
  "/images/plans/plan3.jpg",
] as const

/** Subfolders of `public/images/plans/` — same order as `PLAN_DESIGN_META`. */
const PLAN_IMAGE_FOLDERS = [
  "PostBeamSeries",
  "QuadEcoDwelling",
  "SingleEcoHome",
] as const

const PLAN_DESIGN_META: Omit<PlanDesignCard, "images" | "imageObjectClassName">[] =
  [
    {
      id: "PostBeamSeries",
      title: "Modern off-grid post and beam series",
      description:
        "Hale Hawaii EcoHome rhythm: clear post-and-beam structure, off-grid-ready planning, calm tropical living.",
    },
    {
      id: "QuadEcoDwelling",
      title: "Quad eco dwelling: interconnected hexagons",
      description:
        "Four linked units with shared services and hex modules tied to the landscape.",
    },
    {
      id: "SingleEcoHome",
      title: "Single eco home",
      description:
        "One-structure residence: efficient footprint, clear circulation, flexible rooms.",
    },
  ]

/** Letterboxed plans / elevations read clearly; keeps Hawaii hex study centered. */
const PLAN_PREVIEW_OBJECT_CLASS = "object-contain object-center"

export async function getPlanDesignCards(): Promise<PlanDesignCard[]> {
  return Promise.all(
    PLAN_DESIGN_META.map(async (meta, index) => {
      const subfolder = PLAN_IMAGE_FOLDERS[index]
      const fromFolder = await listSortedPublicImagePaths(
        `plans/${subfolder}`
      )
      const images =
        fromFolder.length > 0 ? fromFolder : [PLAN_CARD_IMAGES[index]]
      return {
        ...meta,
        images,
        imageObjectClassName: PLAN_PREVIEW_OBJECT_CLASS,
      }
    })
  )
}
