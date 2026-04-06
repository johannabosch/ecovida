import "server-only"

import type { FeaturedProject } from "@/lib/featured-project"
import { listSortedPublicImagePaths } from "@/lib/portfolio-images"

type Definition = Omit<FeaturedProject, "images"> & { imageFolder: string }

const definitions: Definition[] = [
  {
    id: "hale-hawaii-ecohome",
    category: "EcoResidential",
    title: "Hale Hawaii EcoHome Project",
    tagline: "Modern design with integrated off-grid systems",
    year: "Built 2023",
    concepts: [
      "Crisp modern plan with integrated photovoltaic, water, and comfort systems",
      "Roof and envelope tuned to trade winds and solar orientation",
      "Outdoor rooms that extend daily living into the landscape",
    ],
    imageFolder: "casa1",
    detail:
      "The Hale Hawaii EcoHome Project pairs a crisp modern plan with integrated off-grid systems for power, water, and comfort. Roofs and envelope are tuned to trade winds and sun; outdoor rooms extend daily living into the landscape. The work demonstrates how ecological performance and refined space can coexist in a residential setting.",
    scrollId: "residences",
  },
  {
    id: "enhanced-ecoliving-hospitality",
    category: "EcoLuxury Wellness Retreat",
    title: "Enhanced ecoliving and natural hospitality",
    tagline: "Natural hospitality and enhanced ecoliving",
    year: "Retreat concept",
    concepts: [
      "Guest rhythm organized around landscape, light, and calm circulation",
      "Shared and private volumes sized for low-impact operations",
      "Wellness framed as place-based daily rhythm, not a bolt-on amenity",
    ],
    imageFolder: "casa3",
    detail:
      "This retreat-forward concept centers natural hospitality: guest experiences, movement, and rest are organized around landscape and light. Shared and private volumes are composed for calm circulation and low-impact operations. The project frames wellness as an everyday rhythm tied to place rather than an add-on amenity.",
    scrollId: "resorts",
  },
  {
    id: "north-shore-yoga-ecoretreat",
    category: "Retreat / Residential",
    title: "North Shore Yoga EcoRetreat",
    tagline: "Elevated ecoliving and low impact harmony",
    year: "Design development",
    concepts: [
      "Studios and lodging arranged for views and onshore breeze",
      "Minimal site disturbance with clear path and outdoor practice zones",
      "Water-wise planting and coastal-ecology-sensitive massing",
    ],
    imageFolder: "casa2",
    detail:
      "North Shore Yoga EcoRetreat balances elevated living with a light footprint: studios and lodging are arranged for views and breeze while minimizing site disturbance. Paths, outdoor practice areas, and water-wise planting reinforce a sense of harmony between built form and coastal ecology.",
  },
  {
    id: "kona-mauka-ecohome",
    category: "EcoResidential",
    title: "Kona Mauka EcoHome",
    tagline: "Ocean view living with spatial eco harmony",
    year: "Built 2022",
    concepts: [
      "Living spaces oriented to ocean prospect with calm inland rooms",
      "Deep overhangs and natural ventilation for comfort without mechanical noise",
      "Material palette chosen to recede against land and sky",
    ],
    imageFolder: "casa4",
    detail:
      "Kona Mauka EcoHome orients living spaces toward ocean views while preserving spatial calm inland. Deep overhangs, natural ventilation, and careful material choices support comfort without competing with the setting. The composition reads as a single gesture: shelter, prospect, and connection to land.",
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
