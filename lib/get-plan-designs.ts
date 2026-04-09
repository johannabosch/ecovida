import "server-only"

export type PlanDesignCard = {
  /** Folder id (legacy / CMS); not used for image paths when using fixed plan images */
  id: string
  title: string
  description: string
  images: string[]
}

const PLAN_CARD_IMAGES = [
  "/images/plans/plan1.jpg",
  "/images/plans/plan2.jpg",
  "/images/plans/plan3.jpg",
] as const

const PLAN_DESIGN_META: Omit<PlanDesignCard, "images">[] = [
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

export async function getPlanDesignCards(): Promise<PlanDesignCard[]> {
  return PLAN_DESIGN_META.map((meta, index) => ({
    ...meta,
    images: [PLAN_CARD_IMAGES[index]],
  }))
}
