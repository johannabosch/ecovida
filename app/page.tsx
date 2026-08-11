import { SeoContent } from "@/components/seo-content"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Recognition } from "@/components/recognition"
import { Principles } from "@/components/principles"
import { Services } from "@/components/services"
import { OurWork } from "@/components/our-work"
import { StudioGallery } from "@/components/studio-gallery"
import { PlanDesignsSection } from "@/components/plan-designs"
import { Consultation } from "@/components/consultation"
import { Resources } from "@/components/resources"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getFeaturedProjects } from "@/lib/get-featured-projects"
import { getPlanDesignCards } from "@/lib/get-plan-designs"
import { listSortedPublicImagePaths } from "@/lib/portfolio-images"

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
  const [otherGalleryImages, templeGalleryImages] = await Promise.all([
    listSortedPublicImagePaths("other"),
    listSortedPublicImagePaths("temple"),
  ])
  const studioGalleryImages = [...otherGalleryImages, ...templeGalleryImages]
  const planDesigns = await getPlanDesignCards()

  return (
    <main className="min-h-screen">
      <SeoContent />
      <Header />
      <Hero />
      <About />
      <OurWork projects={featuredProjects} />
      <StudioGallery images={studioGalleryImages} />
      <PlanDesignsSection plans={planDesigns} />
      <Recognition />
      <Principles />
      <Services />
      <Consultation />
      <Resources />
      <ContactSection />
      <Footer />
    </main>
  )
}
