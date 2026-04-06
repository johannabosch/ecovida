import "server-only"

export type PlanDesignCard = {
  /** Folder id (legacy / CMS); not used for image paths when using fixed plan images */
  id: string
  title: string
  description: string
  images: string[]
}

const PLAN_CARD_IMAGES = [
  "/images/plan1.jpg",
  "/images/plan2.jpg",
  "/images/plan3.jpg",
] as const

const PLAN_DESIGN_META: Omit<PlanDesignCard, "images">[] = [
  {
    id: "PostBeamSeries",
    title: "Modern off-grid post and beam series",
    description:
      "Structural rhythm and layout logic for our Hale Hawaii EcoHome featured project: post-and-beam clarity, off-grid-ready planning, and calm tropical living.",
  },
  {
    id: "QuadEcoDwelling",
    title: "Quad eco dwelling: interconnected hexagons",
    description:
      "A four-unit eco-ag dwelling system with shared infrastructure and hexagonal modules linked into a coherent landscape strategy.",
  },
  {
    id: "SingleEcoHome",
    title: "Single eco home",
    description:
      "Floor plans for a one-structure eco residence: efficient footprint, legible circulation, and adaptable room layouts.",
  },
]

export async function getPlanDesignCards(): Promise<PlanDesignCard[]> {
  return PLAN_DESIGN_META.map((meta, index) => ({
    ...meta,
    images: [PLAN_CARD_IMAGES[index]],
  }))
}
