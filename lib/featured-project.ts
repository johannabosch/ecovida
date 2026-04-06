export type FeaturedProject = {
  id: string
  category: string
  title: string
  tagline: string
  year: string
  concepts: string[]
  images: string[]
  detail: string
  scrollId?: "residences" | "resorts"
}
