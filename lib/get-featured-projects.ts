import "server-only"

import type { FeaturedProject } from "@/lib/featured-project"
import { listSortedPublicImagePaths } from "@/lib/portfolio-images"

type Definition = Omit<FeaturedProject, "images"> & { imageFolder: string }

const definitions: Definition[] = [
  {
    id: "hale-hawaii-ecohome",
    category: "EcoResidential",
    title: "Hale Hawaii EcoHome Project",
    tagline: "Modern off-grid living",
    year: "Built 2023",
    concepts: [
      "Integrated PV, water, and comfort systems",
      "Envelope tuned to trade winds and sun",
      "Outdoor rooms extending daily life",
    ],
    imageFolder: "casa1",
    detail:
      "A modern plan with integrated off-grid systems for power, water, and comfort. Roof and envelope tuned to trade winds and sun; outdoor rooms extend living into the landscape.",
    scrollId: "residences",
  },
  {
    id: "enhanced-ecoliving-hospitality",
    category: "EcoLuxury Wellness Retreat",
    title: "Enhanced ecoliving and natural hospitality",
    tagline: "Retreat concept",
    year: "Concept",
    concepts: [
      "Guest rhythm around landscape and light",
      "Shared and private volumes, low impact",
      "Wellness as daily place-based rhythm",
    ],
    imageFolder: "casa3",
    detail:
      "Retreat-forward hospitality organized around landscape and light. Shared and private volumes composed for calm circulation and low-impact operations.",
    scrollId: "resorts",
  },
  {
    id: "north-shore-yoga-ecoretreat",
    category: "Retreat / Residential",
    title: "North Shore Yoga EcoRetreat",
    tagline: "Elevated ecoliving",
    year: "In development",
    concepts: [
      "Studios and lodging for views and breeze",
      "Minimal site disturbance",
      "Water-wise, ecology-sensitive massing",
    ],
    imageFolder: "casa2",
    detail:
      "Studios and lodging arranged for views and breeze with minimal site disturbance. Outdoor practice zones and water-wise planting tie built form to coastal ecology.",
  },
  {
    id: "kona-mauka-ecohome",
    category: "EcoResidential",
    title: "Kona Mauka EcoHome",
    tagline: "Ocean view eco harmony",
    year: "Built 2022",
    concepts: [
      "Living spaces oriented to ocean prospect",
      "Deep overhangs and natural ventilation",
      "Materials that recede against land and sky",
    ],
    imageFolder: "casa4",
    detail:
      "Living spaces oriented to ocean views with calm inland rooms. Deep overhangs, natural ventilation, and a material palette chosen to recede against land and sky.",
  },
]

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const projects = await Promise.all(
    definitions.map(async (def) => {
      const { imageFolder, ...meta } = def
      const images = await listSortedPublicImagePaths(imageFolder)
      if (images.length === 0) {
        console.warn(
          `[portfolio] No images found in public/images/${imageFolder}. Add files or check the folder name.`
        )
      }
      return { ...meta, images }
    })
  )
  return projects
}
